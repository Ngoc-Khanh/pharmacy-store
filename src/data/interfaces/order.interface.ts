import { OrderStatus } from "../enum";
import { Medicine } from "./medicine.interface";
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
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface OrderAdmin extends Order {
  user: {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    profileImage: {
      publicId: string;
      url: string;
      alt: string;
    };
  };
}

export interface OrderItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
}

export interface OrderDetails {
  readonly id: string;
  readonly userId: string;
  status: OrderStatus;
  items: OrderDetailsItem[];
  subTotal: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
  shippingAddress: UserAddress;
  paymentMethod: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface OrderDetailsItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
  medicine: Medicine;
}