import { AddCategoryDto } from "@/data/dto";
import { Category } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiDelete, apiGet, apiPatch, apiPost } from "../api";

export const CategoriesAPI = {
  async CategoriesList() {
    const res = await apiGet<SRO<Category[]>>("/v1/admin/categories");
    return res.data.data;
  },

  async CategoriesCreate(data: AddCategoryDto) {
    const res = await apiPost<AddCategoryDto, SRO<Category>>("/v1/admin/categories/create", data);
    return res.data.data;
  },

  async CategoriesUpdate(id: string, data: AddCategoryDto) {
    const res = await apiPatch<AddCategoryDto, SRO<Category>>(`/v1/admin/categories/update/${id}`, data);
    return res.data.data;
  },
  
  async CategoriesDelete(id: string) {
    const res = await apiDelete<SRO<Category>>(`/v1/admin/categories/delete/${id}`);
    return res.data.data;
  }
} 