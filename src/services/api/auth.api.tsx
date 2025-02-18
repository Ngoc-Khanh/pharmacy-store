import { Credentials, User } from "@/data/interfaces";
import { credentialsDto } from "@/data/dto";
import { apiGet, apiPost } from "../api"
import { SRO } from "@/data/sro";

export const AuthAPI = {
  async fetchLogin(credentials: credentialsDto) {
    const res = await apiPost<credentialsDto, SRO<Credentials>>("v2/auth/credentials", credentials);
    return res.data.data;
  },

  async getProfile() {
    const res = await apiGet<SRO<User>>("v2/auth/me");
    return res.data.data;
  }
}