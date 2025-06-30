import { UserResponse } from "@/data/interfaces";

export interface Credential {
  accessToken: string;
  user: UserResponse;
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