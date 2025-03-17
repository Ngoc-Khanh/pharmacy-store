import { User } from "./user.interface";

export interface Credential {
  accessToken: string;
  user: User;
}
