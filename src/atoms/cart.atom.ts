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
  return cart.reduce((count, item) => count + (item?.quantity || 0), 0);
});

// `cartTotalPriceAtom` tính tổng giá trị của các sản phẩm trong giỏ hàng
export const cartTotalPriceAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => {
    // Thêm kiểm tra null để tránh truy cập thuộc tính của undefined
    if (!item?.medicine?.variants?.price) return total;
    return total + (item.medicine.variants.price * (item.quantity || 1));
  }, 0);
});

// `addToCartAtom` thêm sản phẩm vào giỏ hàng - sử dụng Optimistic Update
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
    
    // Lưu lại trạng thái hiện tại để có thể hoàn tác nếu API lỗi
    const currentCart = get(cartAtom);
    
    try {
      // Tìm sản phẩm đã tồn tại trong giỏ hàng
      const existingItem = currentCart.find(item => item?.medicine?.id === medicine.id);
      
      // Cập nhật state ngay lập tức (Optimistic Update)
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

      // Gọi API trong background để lưu vào database
      set(cartApiLoadingAtom, true);
      await AccountAPI.AddToCart({
        medicineId: medicine.id,
        quantity: quantity
      });
      
      // Fetch lại dữ liệu giỏ hàng từ server để đảm bảo state khớp với server
      const latestCartData = await AccountAPI.CartList();
      set(cartAtom, latestCartData?.items?.filter(item => item?.medicine?.id) || []);
    } catch (error) {
      console.error("Không thể thêm vào giỏ hàng", error);
      // Nếu API thất bại, khôi phục lại trạng thái ban đầu
      set(cartAtom, currentCart);
      set(cartErrorAtom, "Không thể thêm vào giỏ hàng");
      toast.error("Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      set(cartApiLoadingAtom, false);
    }
  }
);

// `updateCartItemQuantityAtom` cập nhật số lượng của một sản phẩm - sử dụng Optimistic Update
export const updateCartItemQuantityAtom = atom(
  null,
  async (get, set, update: { medicineId: string; quantity: number }) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    const isAuthenticated = get(isAuthenticatedAtom);
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để cập nhật giỏ hàng");
      return;
    }

    if (!update?.medicineId) {
      console.error("ID sản phẩm không hợp lệ", update);
      toast.error("Không thể cập nhật giỏ hàng do dữ liệu không hợp lệ");
      return;
    }
    
    // Lưu lại trạng thái hiện tại để có thể hoàn tác nếu API lỗi
    const currentCart = get(cartAtom);
    
    try {
      // Tìm sản phẩm trong giỏ hàng hiện tại
      const existingItem = currentCart.find(item => item?.medicine?.id === update.medicineId);
      if (!existingItem) {
        toast.error("Sản phẩm không tồn tại trong giỏ hàng");
        return;
      }
      
      // Cập nhật state ngay lập tức (Optimistic Update)
      const updatedCart = currentCart.map(item =>
        item.medicine.id === update.medicineId
          ? { ...item, quantity: update.quantity }
          : item
      );
      set(cartAtom, updatedCart);

      // Gọi API trong background để lưu vào database
      set(cartApiLoadingAtom, true);
      
      // Loại bỏ sản phẩm cũ và thêm lại với số lượng mới
      await AccountAPI.RemoveFromCart(update.medicineId);
      await AccountAPI.AddToCart({
        medicineId: update.medicineId,
        quantity: update.quantity
      });
      
      // Fetch lại dữ liệu giỏ hàng từ server để đảm bảo state khớp với server
      const latestCartData = await AccountAPI.CartList();
      set(cartAtom, latestCartData?.items?.filter(item => item?.medicine?.id) || []);
    } catch (error) {
      console.error("Không thể cập nhật giỏ hàng", error);
      // Khôi phục lại trạng thái ban đầu nếu API thất bại
      set(cartAtom, currentCart);
      set(cartErrorAtom, "Không thể cập nhật giỏ hàng");
      toast.error("Không thể cập nhật giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      set(cartApiLoadingAtom, false);
    }
  }
);

// `removeFromCartAtom` xóa sản phẩm khỏi giỏ hàng - sử dụng Optimistic Update
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
    
    // Lưu lại trạng thái hiện tại để có thể hoàn tác nếu API lỗi
    const currentCart = get(cartAtom);
    
    try {
      // Cập nhật state ngay lập tức (Optimistic Update)
      set(cartAtom, currentCart.filter(item => item?.medicine?.id !== medicineId));

      // Gọi API trong background để lưu vào database
      set(cartApiLoadingAtom, true);
      await AccountAPI.RemoveFromCart(medicineId);
      
      // Fetch lại dữ liệu giỏ hàng từ server để đảm bảo state khớp với server
      const latestCartData = await AccountAPI.CartList();
      set(cartAtom, latestCartData?.items?.filter(item => item?.medicine?.id) || []);
    } catch (error) {
      console.error("Không thể xóa khỏi giỏ hàng", error);
      // Khôi phục lại trạng thái ban đầu nếu API thất bại
      set(cartAtom, currentCart);
      set(cartErrorAtom, "Không thể xóa khỏi giỏ hàng");
      toast.error("Không thể xóa khỏi giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      set(cartApiLoadingAtom, false);
    }
  }
);

// `clearCartAtom` xóa tất cả sản phẩm khỏi giỏ hàng - sử dụng Optimistic Update
export const clearCartAtom = atom(
  null,
  async (get, set) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    const isAuthenticated = get(isAuthenticatedAtom);
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để xóa giỏ hàng");
      return;
    }
    
    // Lưu lại trạng thái hiện tại để có thể hoàn tác nếu API lỗi
    const currentCart = get(cartAtom);
    
    try {
      // Cập nhật state ngay lập tức (Optimistic Update)
      set(cartAtom, []);
      
      // Gọi API trong background để lưu vào database
      set(cartApiLoadingAtom, true);
      
      // Xóa từng sản phẩm trong giỏ hàng một cách tuần tự
      for (const item of currentCart) {
        if (item?.medicine?.id) {
          try {
            await AccountAPI.RemoveFromCart(item.medicine.id);
            // Thêm một khoảng thời gian nhỏ giữa các lần gọi API để tránh quá tải
            await new Promise(resolve => setTimeout(resolve, 300)); 
          } catch (itemError) {
            console.error(`Lỗi khi xóa sản phẩm ${item.medicine.id}:`, itemError);
            // Tiếp tục với sản phẩm tiếp theo ngay cả khi xóa sản phẩm hiện tại bị lỗi
          }
        }
      }
      
      // Fetch lại dữ liệu giỏ hàng từ server sau khi đã xóa tất cả
      const latestCartData = await AccountAPI.CartList();
      set(cartAtom, latestCartData?.items?.filter(item => item?.medicine?.id) || []);
      
      toast.success("Đã xóa tất cả sản phẩm trong giỏ hàng");
    } catch (error) {
      console.error("Không thể xóa giỏ hàng", error);
      // Khôi phục lại trạng thái ban đầu nếu API thất bại
      set(cartAtom, currentCart);
      set(cartErrorAtom, "Không thể xóa giỏ hàng");
      toast.error("Không thể xóa giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      set(cartApiLoadingAtom, false);
    }
  }
);