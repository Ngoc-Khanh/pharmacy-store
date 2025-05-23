import { OrderStatus } from "../enum";
import { UserAddress } from "./user.interface";

export interface Order {
  readonly id: string;
  readonly userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subTotal: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
  shippingAddress: UserAddress;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
}