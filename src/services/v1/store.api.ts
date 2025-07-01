import { CategoryResponse, MedicineResponse } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet } from "@/services/api";

export const StoreAPI = {
  async CategoryRoot() {
    const res = await apiGet<SRO<CategoryResponse[]>>("v1/store/categories");
    return res.data.data;
  },

  async PopularMedicine() {
    const res = await apiGet<SRO<MedicineResponse[]>>("v1/store/popular-medicine");
    return res.data.data;
  },
};