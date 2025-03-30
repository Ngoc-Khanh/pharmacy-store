import { Medicine } from "@/data/interfaces"
import { apiGet } from "@/services/api"
import { SROList } from "@/data/sro"

export const MedicineAPI = {
  async getPorpularMedicine() {
    const res = await apiGet<SROList<Medicine>>("v2/medicine/popular-medicine")
    return res.data.data
  }
}