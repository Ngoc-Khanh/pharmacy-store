export interface User {
  readonly id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string;
  role: "admin" | "pharmacist" | "customer";
  status: "active" | "inactive" | "blocked";
  addresses: UserAddress[];
  readonly createdAt: string;
  readonly updatedAt: string;
  lastLoginAt?: string;
}

export interface UserAddress {
  readonly id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
