import { OrderStatus } from "../enum";
import { Medicine } from "./medicine.interface";
import { User, UserAddress } from "./user.interface";

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

export interface OrderAdminDetails {
  readonly id: string;
  readonly userId: string;
  status: OrderStatus;
  items: OrderAdminDetailsItem[];
  subTotal: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
  shippingAddress: UserAddress;
  paymentMethod: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface OrderDeliver {
  readonly id: string;
  readonly userId: string;
  status: OrderStatus;
  items: OrderDeliverItem[];
  subTotal: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
  shippingAddress: UserAddress;
  paymentMethod: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  use: User;
}

export interface OrderDeliverItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
  medicine: Medicine;
}

export interface OrderAdminDetailsItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
  medicine: Medicine;
}

export interface OrderItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
  medicine: {
    name: string;
    thumbnail: {
      publicId: string;
      url: string;
      alt: string;
    };
  };
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
