import { credentialsDto } from "@/data/dto";
import { apiPost } from "../api"
import { SRO } from "@/data/sro";

export const AuthAPI = {
  async fetchLogin(crendentials: credentialsDto) {
    const res = await apiPost<credentialsDto, SRO<Credential>>("v2/auth/credentials", crendentials);
    return res.data.data;
  }
}