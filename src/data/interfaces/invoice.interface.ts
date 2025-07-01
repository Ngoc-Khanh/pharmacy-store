import { InvoiceStatus, PaymentMethod } from "@/data/enums";
import { MedicineResponse } from "@/data/interfaces";

export interface InvoiceResponse {
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
  user?: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address?: string;
  };
  order: {
    shippingFee: string;
    discount: string;
    shippingAddress: {
      readonly id: string;
      name: string;
      phone: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      isDefault: boolean;
    };
  };
}

export interface InvoiceDetailsItem {
  readonly medicineId: string;
  quantity: number;
  price: number;
  itemTotal: number;
  medicine: MedicineResponse;
}