export interface User {
  readonly id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  profileImage: ProfileImage | string;
  role: "admin" | "pharmacist" | "customer";
  status: "active" | "suspended" | "pending";
  addresses: UserAddress[];
  lastLoginAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ProfileImage {
  public_id: string;
  url: string;
}

export interface UserAddress {
  readonly id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null | undefined;
  city: string;
  state?: string | null | undefined;
  country: string;
  postalCode: string;
  isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
