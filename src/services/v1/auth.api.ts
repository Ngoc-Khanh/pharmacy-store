import { CredentialsDto, ForgotPasswordDto, RegistrationDto, ResetPasswordDto, VerifyAccountDto } from "@/data/dto";
import { CheckTokenResetPasswordResponse, CredentialResponse, RefreshTokenResponse, UserResponse } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet, apiPost } from "@/services/api";

export const AuthAPI = {
  async fetchLogin(credential: CredentialsDto) {
    const res = await apiPost<CredentialsDto, SRO<CredentialResponse>>("/v1/auth/credentials", credential);
    return res.data.data;
  },
  
  async fetchRegister(registration: RegistrationDto) {
    const res = await apiPost<RegistrationDto, SRO<CredentialResponse>>("/v1/auth/register", registration);
    return res.data.data;
  },

  async fetchUserProfile() {
    const res = await apiGet<SRO<UserResponse>>("/v1/auth/me");
    return res.data.data;
  },

  async refreshTokenUser() {
    const res = await apiPost<Record<string, never>, SRO<RefreshTokenResponse>>("v1/auth/refresh-token", {});
    return res.data.data;
  },

  async fetchVerifyAccount(otp: VerifyAccountDto) {
    const res = await apiPost<VerifyAccountDto, SRO<CredentialResponse>>("/v1/auth/verify-email", otp);
    return res.data.data;
  },

  async fetchResendVerifyAccount() {
    const res = await apiPost<object, SRO<CredentialResponse>>("/v1/auth/resend-verification-email", {});
    return res.data.data;
  },

  async fetchForgotPassword(email: ForgotPasswordDto) {
    const res = await apiPost<ForgotPasswordDto, SRO<object>>("/v1/auth/forgot-password", email);
    return res.data.data;
  },

  async checkTokenResetPassword(token: string) {
    const res = await apiGet<SRO<CheckTokenResetPasswordResponse>>(`/v1/auth/verify-reset-token/${token}`);
    return res.data.data;
  },

  async resetPassword(data: ResetPasswordDto) {
    const res = await apiPost<ResetPasswordDto, SRO<object>>("/v1/auth/reset-password", data);
    return res.data.data;
  }
}