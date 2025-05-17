import { Medicine } from "./medicine.interface";

export interface Cart {
  user_id: string;
  items: CartItem[];
  total: number;
}

export interface CartItem {
  medicine_id?: string;
  medicine: Medicine;
  quantity: number;
}