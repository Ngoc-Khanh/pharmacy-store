import { Supplier } from "@/data/interfaces";
import { SROList } from "@/data/sro";
import { apiGet } from "@/services/api";

export const SupplierAPI = {
  async getAllSupplier() {
    const res = await apiGet<SROList<Supplier>>('v2/supplier/supplier-list');
    return res.data.data;
  }
}