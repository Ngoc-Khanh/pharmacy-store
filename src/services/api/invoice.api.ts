import { Invoice } from "@/data/interfaces"
import { SRO } from "@/data/sro"
import { apiGet } from "../api"

export const InvoiceAPI = {
  async InvoiceList() {
    const res = await apiGet<SRO<Invoice[]>>("v1/admin/invoices/list")
    return res.data.data
  }
}