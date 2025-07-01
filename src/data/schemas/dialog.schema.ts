import { z } from "zod";

export const addressesSchema = z.object({
  id: z.string().readonly(),
  name: z.string(),
  phone: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().nullable().optional(),
  city: z.string(),
  state: z.string().nullable().optional(),
  country: z.string(),
  postalCode: z.string(),
  isDefault: z.boolean(),
  createdAt: z.coerce.string().readonly(),
  updatedAt: z.coerce.string().readonly(),
});

export type AddressSchema = z.infer<typeof addressesSchema>;
export const addressesListSchema = z.array(addressesSchema);