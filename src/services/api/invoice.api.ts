import { InvoiceCreateWithNoOrderDto, InvoiceUpdateStatusDto } from "@/data/dto"
import { Invoice, InvoiceDetails } from "@/data/interfaces"
import { SRO } from "@/data/sro"
import { apiDelete, apiGet, apiPost, apiPut } from "../api"

export const InvoiceAPI = {
  async InvoiceList() {
    const res = await apiGet<SRO<Invoice[]>>("v1/admin/invoices/list")
    return res.data.data
  },

  async InvoiceCreateWithNoOrder(dto: InvoiceCreateWithNoOrderDto) {
    const res = await apiPost<InvoiceCreateWithNoOrderDto, SRO<Invoice>>("v1/admin/invoices/create-with-no-order", dto)
    return res.data.data
  },

  async InvoiceDelete(id: string) {
    const res = await apiDelete<SRO<Invoice>>(`v1/admin/invoices/${id}/delete`)
    return res.data.data;
  },
  async InvoiceGetById(id: string) {
    const res = await apiGet<SRO<InvoiceDetails>>(`v1/admin/invoices/${id}/details`)
    return res.data.data;
  },

  async InvoiceUpdateStatus(id: string, dto: InvoiceUpdateStatusDto) {
    const res = await apiPut<InvoiceUpdateStatusDto, SRO<Invoice>>(`v1/admin/invoices/${id}/update-status`, dto)
    return res.data.data;
  }
} 