import { InvoiceStatus, PaymentMethod } from "../enum";

export type InvoiceCreateWithNoOrderDto = {
  userId: string;
  invoiceNumber: string;
  items: {
    medicineId: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: PaymentMethod;
  issuedAt: string;
  status: InvoiceStatus;
}

export type InvoiceUpdateStatusDto = {
  status: InvoiceStatus;
}