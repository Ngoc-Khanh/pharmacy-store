export type CredentialsDto = {
  account: string;
  password: string;
}

export type RegistrationDto = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export type VerifyAccountDto = {
  verificationCode: string;
}

export type ForgotPasswordDto = {
  email: string;
}

export type ResetPasswordDto = {
  resetToken: string;
  password: string;
  passwordConfirmation: string;
}