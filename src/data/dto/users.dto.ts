export type AddUserDto = {
  username: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  phone: string;
  role: "admin" | "pharmacist" | "customer";
  status: "active" | "suspended" | "pending";
}

export type ChangeStatusUserDto = {
  status: "suspended" | "active";
}
