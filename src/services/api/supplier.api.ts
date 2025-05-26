import { Supplier } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiDelete, apiGet, apiPost, apiPut } from "../api";
import { CreateSupplierDto } from "@/data/dto";

export const SupplierAPI = {
  async SuppliersList() {
    const res = await apiGet<SRO<Supplier[]>>("v1/admin/suppliers");
    return res.data.data;
  },

  async CreateSupplier(data: CreateSupplierDto) {
    const res = await apiPost<CreateSupplierDto, SRO<Supplier>>("v1/admin/suppliers/add", data);
    return res.data.data;
  },

  async UpdateSupplier(id: string, data: CreateSupplierDto) {
    const res = await apiPut<CreateSupplierDto, SRO<Supplier>>(`v1/admin/suppliers/update/${id}`, data);
    return res.data.data;
  },

  async DeleteSupplier(id: string) {
    const res = await apiDelete<SRO<Supplier>>(`v1/admin/suppliers/delete/${id}`);
    return res.data.data;
  }
}