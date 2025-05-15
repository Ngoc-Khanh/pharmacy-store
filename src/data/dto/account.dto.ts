import { ProfileImage } from "@/data/interfaces/user.interface";

export type UpdateProfileDto = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  profileImage?: ProfileImage;
}
