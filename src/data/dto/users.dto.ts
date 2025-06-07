import { AccountRole, AccountStatus } from "../enum";

export type AddUserDto = {
  username: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  phone: string;
  role: AccountRole;
  status: AccountStatus;
}

export type ChangeStatusUserDto = {
  status: AccountStatus;
}
