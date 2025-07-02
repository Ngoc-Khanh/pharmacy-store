import { 
  addToCartAtom, 
  cartApiLoadingAtom, 
  cartAtom, 
  cartErrorAtom, 
  cartItemCountAtom, 
  cartTotalPriceAtom, 
  clearCartAtom, 
  clearCartAfterPaymentAtom,
  forceRefreshCartAtom,
  initCartAtom, 
  removeFromCartAtom, 
  updateCartItemQuantityAtom 
} from "@/atoms";
import { useAtom } from "jotai";

export function useCart() {
  const [cart] = useAtom(cartAtom);
  const [itemCount] = useAtom(cartItemCountAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);
  const [, addToCart] = useAtom(addToCartAtom);
  const [, updateItemQuantity] = useAtom(updateCartItemQuantityAtom);
  const [, removeItem] = useAtom(removeFromCartAtom);
  const [, clearCart] = useAtom(clearCartAtom);
  const [, clearCartAfterPayment] = useAtom(clearCartAfterPaymentAtom);
  const [, forceRefreshCart] = useAtom(forceRefreshCartAtom);
  const [, initCart] = useAtom(initCartAtom);
  const [isInitializing] = useAtom(cartApiLoadingAtom);
  const [error] = useAtom(cartErrorAtom);

  return {
    cart,
    itemCount,
    totalPrice,
    addToCart,
    updateItemQuantity,
    removeItem,
    clearCart,
    clearCartAfterPayment,
    forceRefreshCart,
    initCart,
    isInitializing,
    error,
  }
}