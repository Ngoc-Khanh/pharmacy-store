import { Category, Medicine } from "@/data/interfaces";
import { PaginatedResponse, SRO } from "@/data/sro";
import { apiGet } from "../api";

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
    const res = await apiGet<SRO<PaginatedResponse<Medicine>>>("v1/store/medicines");
    return res.data;
  },

  async CategoriesRoot() {
    const res = await apiGet<SRO<Category[]>>("v1/store/categories");
    return res.data.data;
  },
};
