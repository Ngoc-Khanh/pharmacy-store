import { atom } from "jotai";
import { Medicine } from "@/data/interfaces/medicine.interface";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  quantity: number;
  timestamp: string;
  unread: boolean;
  slug: string;
}

export const cartAtom = atom<CartItem[]>([]);

// Helper function to add/update items in cart
export function addToCart(
  currentCart: CartItem[],
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice: number;
    discountPercent: number;
    quantity: number;
    slug: string;
  }
): CartItem[] {
  // Check if item already exists in cart
  const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
  
  if (existingItemIndex >= 0) {
    // Update existing item quantity
    return currentCart.map((cartItem, index) => 
      index === existingItemIndex 
        ? { 
            ...cartItem, 
            quantity: cartItem.quantity + item.quantity,
            timestamp: "Just now",
            unread: true
          } 
        : cartItem
    );
  } else {
    // Add new item to cart
    return [
      ...currentCart,
      {
        ...item,
        timestamp: "Just now",
        unread: true
      }
    ];
  }
}

// Helper function to create a cart item from medicine data
export function createCartItem(medicine: Medicine, quantity: number): Omit<CartItem, "timestamp" | "unread"> {
  return {
    id: medicine.id,
    name: medicine.name,
    image: medicine.thumbnail.imageUrl,
    price: medicine.variants.price,
    originalPrice: medicine.variants.originalPrice,
    discountPercent: medicine.variants.discountPercent,
    quantity,
    slug: medicine.slug
  };
}