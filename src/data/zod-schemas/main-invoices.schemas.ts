import { Banknote, CreditCard, Nfc } from "lucide-react";
import { z } from "zod";

const mainInvoicesStatusSchema = z.union([
  z.literal("draft"),
  z.literal("pending"),
  z.literal("paid"),
  z.literal("cancelled"),
]);

export type MainInvoicesStatus = z.infer<typeof mainInvoicesStatusSchema>;

const mainInvoicesPayments = z.union([
  z.literal("cash"),
  z.literal("credit"),
  z.literal("debit"),
]);

const mainInvoicesSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  client: z.string(),
  order_id: z.string(),
  name: z.string(),
  period: z.string(),
  amount: z.number(),
  status: mainInvoicesStatusSchema,
  method: mainInvoicesPayments,
  created_at: z.string(),
});

export type MainInvoices = z.infer<typeof mainInvoicesSchema>;

export const mainInvoicesListSchema = z.array(mainInvoicesSchema);  

export const callTypes = new Map<MainInvoicesStatus, string>([
  [
    "paid",
    "bg-green-200 text-green-700 border-green-400 dark:bg-green-700 dark:text-green-200 dark:border-green-500",
  ], // Đã thanh toán
  [
    "pending",
    "bg-yellow-200 text-yellow-800 border-yellow-400 dark:bg-yellow-700 dark:text-yellow-200 dark:border-yellow-500",
  ], // Đang chờ
  [
    "cancelled",
    "bg-red-100 text-red-700 border-red-400 dark:bg-red-700 dark:text-red-200 dark:border-red-500",
  ], // Chưa thanh toán
  [
    "draft",
    "bg-gray-200 text-gray-700 border-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500",
  ], // Đã hủy
]);

export const invoiceTypes = [
  {
    label: "Cash",
    value: "cash",
    icon: Banknote,
  },
  {
    label: "Credit",
    value: "credit",
    icon: CreditCard,
  },
  {
    label: "Debit",
    value: "debit",
    icon: Nfc,
  },
];
