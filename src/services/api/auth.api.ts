import { credentialsDto, registrationDto, verifyAccountDto } from "@/data/dto";
import { Credential, User } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet, apiPost } from "../api";

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
  },

  async fetchVerifyAccount(otp: verifyAccountDto) {
    const res = await apiPost<verifyAccountDto, SRO<Credential>>("/v1/auth/verify-email", otp);
    return res.data.data;
  },

  async fetchResendVerifyAccount() {
    const res = await apiPost<object, SRO<Credential>>("/v1/auth/resend-verification-email", {});
    return res.data.data;
  }
}