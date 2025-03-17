import { Credential, User } from "@/data/interfaces";
import { credentialsDto } from "@/data/dto";
import { apiGet, apiPost } from "../api";
import { SRO } from "@/data/sro";

export const AuthAPI = {
  async fetchLogin(crendentials: credentialsDto) {
    const res = await apiPost<credentialsDto, SRO<Credential>>("v2/auth/credentials", crendentials);
    return res.data.data;
  },

  async getProfile() {
    const res = await apiGet<SRO<User>>("v2/auth/me");
    return res.data.data;
  }
}