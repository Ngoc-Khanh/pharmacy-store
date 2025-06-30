import { UserResponse } from "@/data/interfaces";

export interface CredentialResponse {
  accessToken: string;
  user: UserResponse;
}

export interface CheckTokenResetPasswordResponse {
  email: string;
  resetToken: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}