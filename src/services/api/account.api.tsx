import { UserAddress } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiDelete, apiGet } from "../api";

export const AccountAPI = {
  async getAddresses() {
    const res = await apiGet<SRO<UserAddress[]>>("v2/users/addresses");
    return res.data.data;
  },

  async deleteAddress(id: string) {
    const res = await apiDelete<SRO<UserAddress>>(`v2/users/delete-address/${id}`);
    return res.data.data;
  },
};

