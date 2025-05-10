import { Credential } from "@/data/interfaces";
import { credentialsDto } from "@/data/dto";
import { apiPost } from "../api";
import { SRO } from "@/data/sro";

export const AuthAPI = {
  async fetchLogin(credential: credentialsDto) {
    const response = await apiPost<credentialsDto, SRO<Credential>>("/v1/auth/credentials", credential);
    return response.data.data;
  }
}