import { z } from "zod";

const userStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("banned"),
])
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([
  z.literal("admin"),
  z.literal("pharmacist"),
  z.literal("customer"),
])

export const addressSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string(),
    isDefault: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
)

export type Addresses = z.infer<typeof addressSchema>;

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  profileImage: z.object({
    publicId: z.string(),
    url: z.string(),
  }),
  role: userRoleSchema,
  status: userStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  addresses: addressSchema,
})

export type Users = z.infer<typeof userSchema>;