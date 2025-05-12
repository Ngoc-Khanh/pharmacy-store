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