import { MedicineResponse } from "@/data/interfaces";

export interface CartResponse {
  user_id: string;
  items: CartItem[];
  total: number;
}

export interface CartItem {
  medicine_id?: string;
  medicine: MedicineResponse;
  quantity: number;
}