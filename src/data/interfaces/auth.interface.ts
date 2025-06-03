import { User } from "@/data/interfaces";

export interface Credential {
  accessToken: string;
  user: User;
}

export interface CheckTokenResetPassword {
  email: string;
  resetToken: string;
}