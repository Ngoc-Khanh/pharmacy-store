import { z } from "zod";

export const supplierSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  address: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
