import { accountChangePwdDto, accountDto } from "@/data/dto";
import { User } from "@/data/interfaces";
import { apiPatch } from "../api";
import { SRO } from "@/data/sro";

export const AccountAPI = {
  async updateAccount(account: accountDto) {
    const res = await apiPatch<accountDto, SRO<User>>("v2/account/update-account", account);
    return res.data.data;
  },

  async changePwd(account: accountChangePwdDto) {
    const res = await apiPatch<accountChangePwdDto, SRO<User>>("v2/account/change-password", account);
    return res.data.data;
  }
}