import { ProfileImage } from "@/data/interfaces";

export type AddAddressDto = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  country: string;
  postalCode: string;
  isDefault: boolean;
};

export type UpdateProfileDto = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  profileImage?: ProfileImage;
}

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export type CartItemDto = {
  medicineId: string;
  quantity: number;
}