import { OrderChangeStatusDto, PlaceOrderDto } from "@/data/dto";
import { CategoryResponse, InvoiceDetails, InvoiceResponse, MedicineResponse, OrderDetails, OrderResponse } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet, apiPost } from "@/services/api";

export const StoreAPI = {
  async CategoryRoot() {
    const res = await apiGet<SRO<CategoryResponse[]>>("v1/store/categories");
    return res.data.data;
  },

  async PopularMedicine() {
    const res = await apiGet<SRO<MedicineResponse[]>>("v1/store/popular-medicine");
    return res.data.data;
  },

  async MedicineDetails(id: string) {
    const res = await apiGet<SRO<MedicineResponse>>(`v1/store/medicines/${id}/details`);
    return res.data.data;
  },

  async CategoriesRoot() {
    const res = await apiGet<SRO<CategoryResponse[]>>("v1/store/categories");
    return res.data.data;
  },

  async UpdateOrderStatus(orderId: string, status: OrderChangeStatusDto) {
    const res = await apiPost<OrderChangeStatusDto, SRO<OrderResponse>>(`v1/store/deliver/orders/${orderId}/update-status`, status);
    return res.data.data;
  },

  async OrdersUserList() {
    const res = await apiGet<SRO<OrderResponse[]>>("v1/store/orders");
    console.log("API Response:", res);
    return res.data.data;
  },

  async OrderDetails(id: string) {
    const res = await apiGet<SRO<OrderDetails>>(`v1/store/orders/${id}/details`);
    return res.data.data;
  },

  async PlaceOrder(data: PlaceOrderDto) {
    const res = await apiPost<PlaceOrderDto, SRO<OrderResponse>>("v1/store/orders/add", data);
    return res.data.data;
  },
  
  async InvoiceList() {
    const res = await apiGet<SRO<InvoiceResponse[]>>('v1/store/invoices/list');
    return res.data.data;
  },

  async InvoiceDetails(id: string) {
    const res = await apiGet<SRO<InvoiceDetails>>(`v1/store/invoices/${id}/details`);
    return res.data.data;
  },
  
  async InvoiceDetailsWithOrderId(id: string) {
    const res = await apiGet<SRO<InvoiceDetails>>(`v1/store/invoices/${id}/details-with-orders-id`);
    return res.data.data;
  }
};