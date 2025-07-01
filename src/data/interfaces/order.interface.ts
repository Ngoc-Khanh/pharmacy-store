import { OrderStatus } from "@/data/enums";
import { MedicineResponse, UserAddress } from "@/data/interfaces";

export interface OrderResponse {
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
  medicine: MedicineResponse;
}