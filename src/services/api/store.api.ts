import { PlaceOrderDto } from "@/data/dto";
import { Category, Medicine, Order, OrderDeliver, OrderDetails } from "@/data/interfaces";
import { Paginated, SRO } from "@/data/sro";
import { apiGet, apiPost } from "../api";

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

  async OrdersUserList() {
    const res = await apiGet<SRO<Order[]>>("v1/store/orders");
    console.log("API Response:", res);
    return res.data.data;
  },

  async OrderDetails(id: string) {
    const res = await apiGet<SRO<OrderDetails>>(`v1/store/orders/${id}/details`);
    return res.data.data;
  },

  async PlaceOrder(data: PlaceOrderDto) {
    const res = await apiPost<PlaceOrderDto, SRO<Order>>("v1/store/orders/add", data);
    return res.data.data;
  },

  async OrderDeliverList() {
    const res = await apiGet<SRO<OrderDeliver[]>>("v1/store/deliver/orders");
    return res.data.data;
  },
};
