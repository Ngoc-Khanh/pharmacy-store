import { Medicine } from "@/data/interfaces"
import { SRO, SROList } from "@/data/sro"
import { apiGet } from "@/services/api"

export const MedicineAPI = {
  async getPorpularMedicine() {
    const res = await apiGet<SROList<Medicine>>("v2/medicine/popular-medicine")
    return res.data.data
  },

  async getAllMedicine() {
    const res = await apiGet<SROList<Medicine>>("v2/medicine/medicine-list")
    return res.data.data
  },

  async getMedicineById(id: string) {
    const res = await apiGet<SRO<Medicine>>(`v2/medicine/detail/${id}`)
    return res.data.data
  },
}