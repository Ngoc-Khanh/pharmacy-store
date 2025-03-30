import { Category } from "@/data/interfaces"
import { apiGet } from "@/services/api"
import { SRO } from "@/data/sro"

export const CategoryAPI = {
  async getAllCategory() {
    const res = await apiGet<SRO<Category[]>>("v2/category/category-list")
    return res.data.data
  }
}