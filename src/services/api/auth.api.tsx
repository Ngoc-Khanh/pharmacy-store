import { Credentials } from "@/data/interfaces/auth.interface";
import { User } from "@/data/interfaces/user.interface";
import { credentialsDto } from "@/data/dto/auth.dto";
import { apiGet, apiPost } from "../api"
import { SRO } from "@/data/sro";

export const AuthAPI = {
  async fetchLogin(credentials: credentialsDto) {
    const res = await apiPost<credentialsDto, SRO<Credentials>>("v1/auth/credentials", credentials);
    return res.data.data;
  },

  async getProfile() {
    const res = await apiGet<SRO<User>>("v1/auth/profile");
    return res.data.data;
  }
}