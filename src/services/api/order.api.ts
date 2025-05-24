import { OrderAdminChangeStatusDto } from "@/data/dto";
import { OrderAdmin, OrderAdminDetails } from "@/data/interfaces";
import { Paginated, SRO } from "@/data/sro";
import { apiDelete, apiGet, apiPatch } from "../api";

export const OrderAPI = {
  async OrderList() {
    const res = await apiGet<SRO<Paginated<OrderAdmin>>>("/v1/admin/orders");
    return res.data.data;
  },

  async OrderDetail(orderId: string) {
    const res = await apiGet<SRO<OrderAdminDetails>>(`/v1/admin/orders/${orderId}/details`);
    return res.data.data;
  },

  async OrderChangeStatus(data: OrderAdminChangeStatusDto, orderId: string) {
    const res = await apiPatch<OrderAdminChangeStatusDto, SRO<OrderAdmin>>(`/v1/admin/orders/${orderId}/status`, data);
    return res.data.data;
  },

  async OrderDelete(orderId: string) {
    const res = await apiDelete<SRO<OrderAdmin>>(`/v1/admin/orders/${orderId}/delete`);
    return res.data.data;
  }
}