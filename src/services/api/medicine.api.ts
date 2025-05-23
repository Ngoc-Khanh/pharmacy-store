import { AddMedicineDto } from "@/data/dto";
import { Medicine } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiDelete, apiGet, apiPatch, apiPost } from "../api";

export const MedicineAPI = {
  async MedicineList() {
    const res = await apiGet<SRO<Medicine[]>>("/v1/admin/medicines");
    return res.data.data;
  },

  async MedicineCreate(data: AddMedicineDto) {
    const res = await apiPost<AddMedicineDto, SRO<Medicine>>("/v1/admin/medicines/add", data);
    return res.data.data;
  },

  async MedicineUpdate(id: string, data: AddMedicineDto) {
    const res = await apiPatch<AddMedicineDto, SRO<Medicine>>(`/v1/admin/medicines/update/${id}`, data);
    return res.data.data;
  },

  async MedicineDelete(id: string) {
    const res = await apiDelete<SRO<Medicine>>(`/v1/admin/medicines/delete/${id}`);
    return res.data.data;
  },
};
