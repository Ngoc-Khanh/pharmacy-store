import { CartItem, Medicine } from "@/data/interfaces";
import { atom } from "jotai";

// `cartAtom` là một atom của Jotai lưu trữ một mảng `CartItem`, khởi tạo rỗng.
// `CartItem` định nghĩa cấu trúc sản phẩm trong giỏ hàng.
export const cartAtom = atom<CartItem[]>([]);

// `cartItemCountAtom` là một atom của Jotai tính tổng số lượng sản phẩm trong giỏ hàng.
// Nó dùng `get` để lấy trạng thái `cartAtom` và `reduce` để tính tổng `quantity`.
export const cartItemCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((count, item) => count + item.quantity, 0);
});

// `cartTotalPriceAtom` là một atom của Jotai tính tổng giá trị của các sản phẩm trong giỏ hàng.
// Nó dùng `get` để lấy trạng thái `cartAtom` và `reduce` để tính tổng giá.
export const cartTotalPriceAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => {
    return total + item.medicine.variants.price * item.quantity;
  }, 0);
});

// `addToCartAtom` là một atom của Jotai để thêm sản phẩm vào giỏ hàng hoặc cập nhật số lượng nếu đã tồn tại.
// Nó dùng `get` để lấy trạng thái hiện tại của giỏ hàng và `set` để cập nhật.
export const addToCartAtom = atom(
  null,
  (get, set, { medicine, quantity }: { medicine: Medicine; quantity: number }) => {
    const cart = get(cartAtom);
    const existingItem = cart.find(item => item.medicine.id === medicine.id);

    if (existingItem) {
      // Sản phẩm đã tồn tại, cập nhật số lượng
      set(cartAtom, cart.map(item =>
        item.medicine.id === medicine.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      set(cartAtom, [...cart, { medicine, quantity }]);
    }
  }
);

// `updateCartItemQuantityAtom` là một atom của Jotai để cập nhật số lượng của một sản phẩm cụ thể trong giỏ hàng.
// Nó dùng `get` để lấy trạng thái hiện tại của giỏ hàng và `set` để cập nhật.
export const updateCartItemQuantityAtom = atom(
  null,
  (get, set, update: { medicineId: string; quantity: number }) => {
    const cart = get(cartAtom);
    const updatedCart = cart.map(item =>
      item.medicine.id === update.medicineId
      ? { ...item, quantity: update.quantity }
      : item
    );
    set(cartAtom, updatedCart);
  }
);

// `removeFromCartAtom` là một atom của Jotai để xóa một sản phẩm khỏi giỏ hàng bằng `medicineId`.
// Nó dùng `get` để lấy trạng thái hiện tại của giỏ hàng và `set` để cập nhật.
export const removeFromCartAtom = atom(
  null,
  (get, set, medicineId: string) => {
    const cart = get(cartAtom);
    set(cartAtom, cart.filter(item => item.medicine.id !== medicineId));
  }
);

// `clearCartAtom` là một atom của Jotai để xóa tất cả sản phẩm khỏi giỏ hàng.
// Nó dùng `set` để đặt lại trạng thái giỏ hàng thành một mảng rỗng.
export const clearCartAtom = atom(
  null,
  (_, set) => {
    set(cartAtom, []);
  }
);