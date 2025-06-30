import { cartApiLoadingAtom, cartAtom, cartErrorAtom, cartItemCountAtom, cartTotalPriceAtom, clearCartAtom, initCartAtom, removeFromCartAtom, updateCartItemQuantityAtom } from "@/atoms";
import { useAtom } from "jotai";

export function useCart() {
  const [cart] = useAtom(cartAtom);
  const [itemCount] = useAtom(cartItemCountAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);
  const [, updateItemQuantity] = useAtom(updateCartItemQuantityAtom);
  const [, removeItem] = useAtom(removeFromCartAtom);
  const [, clearCart] = useAtom(clearCartAtom);
  const [, initCart] = useAtom(initCartAtom);
  const [isInitializing] = useAtom(cartApiLoadingAtom);
  const [error] = useAtom(cartErrorAtom);

  return {
    cart,
    itemCount,
    totalPrice,
    updateItemQuantity,
    removeItem,
    clearCart,
    initCart,
    isInitializing,
    error,
  }
}