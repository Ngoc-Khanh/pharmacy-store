import { accountDto } from "@/data/dto/account.dto";
import { User } from "@/data/interfaces";
import { apiPatch } from "../api";
import { SRO } from "@/data/sro";

export const AccountAPI = {
  async updateAccount(account: accountDto) {
    const res = await apiPatch<accountDto, SRO<User>>("v2/account/update-account", account);
    return res.data.data;
  }
}