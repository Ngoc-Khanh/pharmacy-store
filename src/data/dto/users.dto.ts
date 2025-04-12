export type AddUserDto = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "admin" | "pharmacist" | "customer";
  status: "active" | "inactive" | "banned";
}

