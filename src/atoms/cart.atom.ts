import { isAuthenticatedAtom } from "@/atoms";
import { CartItem, MedicineResponse } from "@/data/interfaces";
import { AccountAPI } from "@/services/v1";
import { atom } from "jotai";
import { toast } from "sonner";

// Atom để theo dõi state gọi API (chỉ sử dụng nội bộ, không dùng cho loading UI)
export const cartApiLoadingAtom = atom(false);

// Atom để theo dõi lỗi
export const cartErrorAtom = atom<string | null>(null);

// `cartAtom` lưu trữ danh sách sản phẩm trong giỏ hàng
export const cartAtom = atom<CartItem[]>([]);

// Khởi tạo giỏ hàng từ API - đây là nơi duy nhất cần hiển thị loading
export const initCartAtom = atom(
  null,
  async (get, set) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    const isAuthenticated = get(isAuthenticatedAtom);
    if (!isAuthenticated) {
      // Nếu chưa đăng nhập, không thực hiện bất kỳ API call nào
      set(cartAtom, []);
      return;
    }

    // Chỉ cần loading khi lần đầu khởi tạo
    const isLoading = get(cartApiLoadingAtom);
    if (isLoading) return; // Tránh gọi API nhiều lần

    try {
      set(cartApiLoadingAtom, true);
      set(cartErrorAtom, null);
      const cartData = await AccountAPI.CartList();
      // Đảm bảo items tồn tại và là mảng trước khi cập nhật
      set(cartAtom, cartData?.items?.filter(item => item?.medicine?.id) || []);
    } catch (error) {
      console.error("Không thể tải giỏ hàng", error);
      set(cartErrorAtom, "Không thể tải giỏ hàng");
      toast.error("Không thể tải giỏ hàng. Vui lòng làm mới trang.");
    } finally {
      set(cartApiLoadingAtom, false);
    }
  }
);

// `cartItemCountAtom` tính tổng số lượng sản phẩm trong giỏ hàng
export const cartItemCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((count: number, item: CartItem) => count + (item?.quantity || 0), 0);
});

// `cartTotalPriceAtom` tính tổng giá trị của các sản phẩm trong giỏ hàng
export const cartTotalPriceAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total: number, item: CartItem) => {
    // Thêm kiểm tra null để tránh truy cập thuộc tính của undefined
    if (!item?.medicine?.variants?.price) return total;
    return total + (item.medicine.variants.price * (item.quantity || 1));
  }, 0);
});

// Queue để lưu các thao tác cần sync với server
const syncQueue: Array<() => Promise<void>> = [];
let isSyncing = false;

// Hàm đồng bộ hóa với server
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const syncWithServer = async (set: (atom: any, value: unknown) => void) => {
  if (isSyncing || syncQueue.length === 0) return;
  
  isSyncing = true;
  
  while (syncQueue.length > 0) {
    const operation = syncQueue.shift();
    if (operation) {
      try {
        await operation();
        // Delay nhỏ giữa các API call để tránh spam server
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error("Lỗi đồng bộ với server:", error);
        // Không hiển thị toast error ở đây vì user đã thấy thay đổi trong UI
      }
    }
  }
  
  // Sau khi sync xong, fetch lại cart từ server để đảm bảo consistency
  try {
    const latestCartData = await AccountAPI.CartList();
    set(cartAtom, latestCartData?.items?.filter(item => item?.medicine?.id) || []);
  } catch (error) {
    console.error("Lỗi fetch cart sau sync:", error);
  }
  
  isSyncing = false;
};

// `addToCartAtom` thêm sản phẩm vào giỏ hàng - UX tối ưu với optimistic update
export const addToCartAtom = atom(
  null,
  async (get, set, { medicine, quantity }: { medicine: MedicineResponse; quantity: number }) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    const isAuthenticated = get(isAuthenticatedAtom);
    if (!isAuthenticated) {
      const error = new Error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      toast.error(error.message);
      throw error;
    }

    if (!medicine?.id) {
      console.error("Đối tượng sản phẩm không hợp lệ", medicine);
      const error = new Error("Không thể thêm vào giỏ hàng do dữ liệu không hợp lệ");
      toast.error(error.message);
      throw error;
    }
    
    // Lấy trạng thái hiện tại
    const currentCart = get(cartAtom);
    
    // Tìm sản phẩm đã tồn tại trong giỏ hàng
    const existingItem = currentCart.find(item => item?.medicine?.id === medicine.id);
    
    // Cập nhật state ngay lập tức (Optimistic Update) - User thấy thay đổi ngay
    if (existingItem) {
      // Nếu sản phẩm đã tồn tại, cập nhật số lượng
      set(cartAtom, currentCart.map(item =>
        item.medicine.id === medicine.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      set(cartAtom, [...currentCart, { medicine, quantity }]);
    }

    // Hiển thị thông báo thành công ngay lập tức
    toast.success(`Đã thêm ${medicine.name} vào giỏ hàng`);

    // Thêm vào queue để sync với server trong background
    syncQueue.push(async () => {
      await AccountAPI.AddToCart({
        medicineId: medicine.id,
        quantity: quantity
      });
    });

    // Bắt đầu sync trong background (không block UI)
    syncWithServer(set);
  }
);

// `updateCartItemQuantityAtom` cập nhật số lượng của một sản phẩm - UX tối ưu
export const updateCartItemQuantityAtom = atom(
  null,
  async (get, set, update: { medicineId: string; quantity: number }) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    const isAuthenticated = get(isAuthenticatedAtom);
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để cập nhật giỏ hàng");
      return;
    }

    if (!update?.medicineId || update.quantity < 0) {
      console.error("Dữ liệu cập nhật không hợp lệ", update);
      toast.error("Không thể cập nhật giỏ hàng do dữ liệu không hợp lệ");
      return;
    }
    
    // Lấy trạng thái hiện tại
    const currentCart = get(cartAtom);
    
    // Tìm sản phẩm trong giỏ hàng hiện tại
    const existingItem = currentCart.find(item => item?.medicine?.id === update.medicineId);
    if (!existingItem) {
      toast.error("Sản phẩm không tồn tại trong giỏ hàng");
      return;
    }
    
    // Nếu quantity = 0, xóa sản phẩm
    if (update.quantity === 0) {
      set(cartAtom, currentCart.filter(item => item.medicine.id !== update.medicineId));
      
      // Thêm vào queue để xóa trên server
      syncQueue.push(async () => {
        await AccountAPI.RemoveFromCart(update.medicineId);
      });
    } else {
      // Cập nhật state ngay lập tức
      set(cartAtom, currentCart.map(item =>
        item.medicine.id === update.medicineId
          ? { ...item, quantity: update.quantity }
          : item
      ));
      
      // Thêm vào queue để sync với server
      syncQueue.push(async () => {
        await AccountAPI.RemoveFromCart(update.medicineId);
        await AccountAPI.AddToCart({
          medicineId: update.medicineId,
          quantity: update.quantity
        });
      });
    }

    // Sync trong background
    syncWithServer(set);
  }
);

// `removeFromCartAtom` xóa sản phẩm khỏi giỏ hàng - UX tối ưu
export const removeFromCartAtom = atom(
  null,
  async (get, set, medicineId: string) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    const isAuthenticated = get(isAuthenticatedAtom);
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng");
      return;
    }

    if (!medicineId) {
      console.error("ID sản phẩm không hợp lệ");
      toast.error("Không thể xóa khỏi giỏ hàng do dữ liệu không hợp lệ");
      return;
    }
    
    // Lấy trạng thái hiện tại
    const currentCart = get(cartAtom);
    
    // Tìm sản phẩm để lấy tên hiển thị
    const itemToRemove = currentCart.find(item => item?.medicine?.id === medicineId);
    
    // Cập nhật state ngay lập tức
    set(cartAtom, currentCart.filter(item => item?.medicine?.id !== medicineId));

    // Hiển thị thông báo
    if (itemToRemove) {
      toast.success(`Đã xóa ${itemToRemove.medicine.name} khỏi giỏ hàng`);
    }

    // Thêm vào queue để sync với server
    syncQueue.push(async () => {
      await AccountAPI.RemoveFromCart(medicineId);
    });

    // Sync trong background
    syncWithServer(set);
  }
);

// `clearCartAtom` xóa tất cả sản phẩm khỏi giỏ hàng - UX tối ưu
export const clearCartAtom = atom(
  null,
  async (get, set) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    const isAuthenticated = get(isAuthenticatedAtom);
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để xóa giỏ hàng");
      return;
    }
    
    // Lấy trạng thái hiện tại
    const currentCart = get(cartAtom);
    
    // Cập nhật state ngay lập tức
    set(cartAtom, []);
    
    toast.success("Đã xóa tất cả sản phẩm trong giỏ hàng");
    
    // Thêm vào queue để sync với server
    for (const item of currentCart) {
      if (item?.medicine?.id) {
        syncQueue.push(async () => {
          await AccountAPI.RemoveFromCart(item.medicine.id);
        });
      }
    }

    // Sync trong background
    syncWithServer(set);
  }
);

// `clearCartAfterPaymentAtom` xóa giỏ hàng sau khi thanh toán thành công
export const clearCartAfterPaymentAtom = atom(
  null,
  async (_, set) => {
    console.log("🛒 clearCartAfterPayment triggered");
    
    // Xóa giỏ hàng trong state ngay lập tức
    set(cartAtom, []);
    
    // Reset error state
    set(cartErrorAtom, null);
    
    console.log("🛒 Cart cleared after payment success");
    // Không cần thông báo toast ở đây vì thường có thông báo thanh toán thành công rồi
  }
);

// `forceRefreshCartAtom` làm mới giỏ hàng từ server (dùng khi cần đồng bộ)
export const forceRefreshCartAtom = atom(
  null,
  async (get, set) => {
    const isAuthenticated = get(isAuthenticatedAtom);
    if (!isAuthenticated) return;

    try {
      const cartData = await AccountAPI.CartList();
      set(cartAtom, cartData?.items?.filter(item => item?.medicine?.id) || []);
      set(cartErrorAtom, null);
    } catch (error) {
      console.error("Không thể làm mới giỏ hàng", error);
      set(cartErrorAtom, "Không thể làm mới giỏ hàng");
    }
  }
);