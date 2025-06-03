export type credentialsDto = {
  /**
   * Account can be either an email or a username
   */
  account: string; 
  password: string;
}

export type registrationDto = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export type verifyAccountDto = {
  verificationCode: string;
}

export type forgotPasswordDto = {
  email: string;
}

export type resetPasswordDto = {
  resetToken: string;
  password: string;
  passwordConfirmation: string;
}