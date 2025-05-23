import { Category, Medicine, Order } from "@/data/interfaces";
import { Paginated, SRO } from "@/data/sro";
import { apiGet, apiPost } from "../api";
import { PlaceOrderDto } from "@/data/dto";

export const StoreAPI = {
  async CategoryRoot() {
    const res = await apiGet<SRO<Category[]>>("v1/store/categories");
    return res.data.data;
  },

  async PopularMedicine() {
    const res = await apiGet<SRO<Medicine[]>>("v1/store/popular-medicine");
    return res.data.data;
  },

  async MedicinesRoot() {
    const res = await apiGet<SRO<Paginated<Medicine>>>("v1/store/medicines");
    return res.data;
  },

  async MedicineDetails(id: string) {
    const res = await apiGet<SRO<Medicine>>(`v1/store/medicines/${id}/details`);
    return res.data.data;
  },

  async CategoriesRoot() {
    const res = await apiGet<SRO<Category[]>>("v1/store/categories");
    return res.data.data;
  },

  async PlaceOrder(data: PlaceOrderDto) {
    const res = await apiPost<PlaceOrderDto, SRO<Order>>("v1/store/orders/add", data);
    return res.data.data;
  },
};
