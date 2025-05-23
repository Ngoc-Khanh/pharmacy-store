import { Supplier } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet } from "../api";

export const SupplierAPI = {
  async SuppliersList() {
    const res = await apiGet<SRO<Supplier[]>>("/v1/admin/suppliers");
    return res.data.data;
  }
}