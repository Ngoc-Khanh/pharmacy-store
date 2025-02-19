export type accountDto = {
  email: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export type accountChangePwdDto = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}