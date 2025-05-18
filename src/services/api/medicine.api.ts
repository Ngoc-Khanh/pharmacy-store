import { Medicine } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet } from "../api";

export const MedicineAPI = {
  async MedicineList() {
    const res = await apiGet<SRO<Medicine[]>>("/v1/admin/medicines");
    return res.data.data;
  }
}