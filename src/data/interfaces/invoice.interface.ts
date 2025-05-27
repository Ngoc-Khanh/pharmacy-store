import { InvoiceStatus, PaymentMethod } from "../enum";

export interface Invoice {
  readonly id: string;
  readonly orderId: string;
  invoiceNumber: string;
  items: InvoiceItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  issuedAt: string;
  status: InvoiceStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface InvoiceItem {
  medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
}