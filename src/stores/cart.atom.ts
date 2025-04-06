import { Medicine } from "@/data/interfaces";
import { atom } from "jotai";
export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export const cartAtom = atom<CartItem[]>([]);

export const cartItemCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((count, item) => count + item.quantity, 0);
});

export const cartTotalPriceAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => {
    return total + item.medicine.variants.price * item.quantity;
  }, 0);
});

export const addToCartAtom = atom(
  null,
  (get, set, { medicine, quantity }: { medicine: Medicine, quantity: number }) => {
    const cart = get(cartAtom);
    const existingItemIndex = cart.findIndex(item => item.medicine.id === medicine.id);
    if (existingItemIndex >= 0) {
      // Sản phẩm đã tồn tại, cập nhật số lượng
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity
      };
      set(cartAtom, updatedCart);
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      set(cartAtom, [...cart, { medicine, quantity }]);
    }
  }
)

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

export const removeFromCartAtom = atom(
  null,
  (get, set, medicineId: string) => {
    const cart = get(cartAtom);
    set(cartAtom, cart.filter(item => item.medicine.id !== medicineId));
  }
);

export const clearCartAtom = atom(
  null,
  (_, set) => {
    set(cartAtom, []);
  }
);