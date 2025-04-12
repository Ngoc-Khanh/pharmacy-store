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
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  profileImage: z.object({
    publicId: z.string(),
    url: z.string(),
  }).optional(),
  role: userRoleSchema.optional(),
  status: userStatusSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  addresses: addressSchema.optional(),
})

export type Users = z.infer<typeof userSchema>;