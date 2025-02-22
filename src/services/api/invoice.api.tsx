import { UserInvoice } from "@/data/interfaces";
import { SROList } from "@/data/sro";
import { apiGet } from "../api";

export const InvoiceAPI = {
  async getUserInvoices() {
    const res = await apiGet<SROList<UserInvoice>>("v2/invoices/user-invoices");
    return res.data.data;
  }
}