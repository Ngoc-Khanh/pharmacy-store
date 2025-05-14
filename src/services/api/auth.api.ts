import { credentialsDto, registrationDto } from "@/data/dto";
import { Credential, User } from "@/data/interfaces";
import { apiGet, apiPost } from "../api";
import { SRO } from "@/data/sro";

export const AuthAPI = {
  async fetchLogin(credential: credentialsDto) {
    const res = await apiPost<credentialsDto, SRO<Credential>>("/v1/auth/credentials", credential);
    return res.data.data;
  },
  
  async fetchRegister(registration: registrationDto) {
    const res = await apiPost<registrationDto, SRO<Credential>>("/v1/auth/register", registration);
    return res.data.data;
  },

  async fetchUserProfile() {
    const res = await apiGet<SRO<User>>("/v1/auth/me");
    return res.data.data;
  }
}