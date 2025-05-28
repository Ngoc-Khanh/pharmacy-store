import { InvoiceStatus, PaymentMethod } from "../enum";
import { Medicine } from "./medicine.interface";

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

export interface InvoiceDetails {
  readonly id: string;
  readonly orderId: string;
  readonly userId: string;
  readonly invoiceNumber: string;
  items: InvoiceDetailsItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  issuedAt: string;
  status: InvoiceStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface InvoiceDetailsItem {
  readonly medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
  medicine: Medicine;
}
