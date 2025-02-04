import { Credentials } from "@/data/interfaces/auth.interface";
import { credentialsDto } from "@/data/dto/auth.dto";
import { apiPost } from "../api"
import { SRO } from "@/data/sro";

export const AuthAPI = {
  async fetchLogin(credentials: credentialsDto) {
    const res = await apiPost<credentialsDto, SRO<Credentials>>("v1/auth/credentials", credentials);
    return res.data.data;
  }
}