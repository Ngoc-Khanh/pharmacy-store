import { OrderStatus, PaymentMethod } from "../enum";

export type PlaceOrderDto = {
  shippingAddressId: string;
  paymentMethod: PaymentMethod;
}

export type OrderAdminChangeStatusDto = {
  status: OrderStatus.CANCELLED | OrderStatus.COMPLETED;
}
