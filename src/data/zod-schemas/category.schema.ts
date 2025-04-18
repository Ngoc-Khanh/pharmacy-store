import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})