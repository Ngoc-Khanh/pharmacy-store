import { User } from "./user.interface";

export interface UserInvoice {
  id: string;
  client: string;
  user_id: string;
  order_id: string;
  name: string;
  period: string;
  amount: number;
  status: "paid" | "pending" | "cancelled" | "draft";
  method: "cash" | "credit" | "debit";
  user: User;
  created_at: string;
  payment_date: string;
}