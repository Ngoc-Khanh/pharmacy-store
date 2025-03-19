import { UserAddress } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet } from "../api";

export const AccountAPI = {
  async getAddresses() {
    const res = await apiGet<SRO<UserAddress[]>>("v2/users/addresses");
    return res.data.data;
  },
};

