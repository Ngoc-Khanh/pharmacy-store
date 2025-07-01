import { OrderStatus, PaymentMethod } from "@/data/enums";

export type SaveCartDto = {
  medicineId: string;
  quantity: number;
}

export type PlaceOrderDto = {
  shippingAddressId: string;
  paymentMethod: PaymentMethod;
}

export type OrderChangeStatusDto = {
  status: OrderStatus;
}
