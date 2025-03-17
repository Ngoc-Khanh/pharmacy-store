import { User } from "./user.interface";

export interface Credential {
  access_token: string;
  user: User;
}
