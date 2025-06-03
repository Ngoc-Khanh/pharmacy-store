import { credentialsDto, forgotPasswordDto, registrationDto, resetPasswordDto, verifyAccountDto } from "@/data/dto";
import { CheckTokenResetPassword, Credential, User } from "@/data/interfaces";
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
  },

  async fetchForgotPassword(email: forgotPasswordDto) {
    const res = await apiPost<forgotPasswordDto, SRO<object>>("/v1/auth/forgot-password", email);
    return res.data.data;
  },

  async checkTokenResetPassword(token: string) {
    const res = await apiGet<SRO<CheckTokenResetPassword>>(`/v1/auth/verify-reset-token/${token}`);
    return res.data.data;
  },

  async resetPassword(data: resetPasswordDto) {
    const res = await apiPost<resetPasswordDto, SRO<object>>("/v1/auth/reset-password", data);
    return res.data.data;
  }
}