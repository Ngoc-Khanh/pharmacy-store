import { PaymentMethod } from "../enum";

export type PlaceOrderDto = {
  shippingAddressId: string;
  paymentMethod: PaymentMethod;
}