import { PaymentMethod } from "@/data/enums";

export const formatPaymentMethod = (method: string) => {
  switch (method) {
    case PaymentMethod.COD:
      return "Thanh toán khi nhận hàng";
    case PaymentMethod.CREDIT_CARD:
      return "Thẻ tín dụng";
    case PaymentMethod.BANK_TRANSFER:
      return "Chuyển khoản ngân hàng";
    default:
      return method;
  }
};