import { categorySchema } from "./category.schema";
import { supplierSchema } from "./supplier.schema";
import { z } from "zod";

const stockStatusSchema = z.union([
  z.literal("IN-STOCK"),
  z.literal("OUT-OF-STOCK"),
  z.literal("LOW-STOCK"),
])

const variantSchema = z.object({
  price: z.number(),
  limitQuantity: z.number(),
  stockStatus: stockStatusSchema,
  originalPrice: z.number(),
  discountPercent: z.number(),
  isDiscounted: z.boolean(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
})

const ratingsSchema = z.object({
  star: z.number(),
  liked: z.number(),
  reviewCount: z.number(),
})

const detailsSchema = z.object({
  ingredients: z.string(),
  usage: z.array(z.string()),
  parameter: z.object({
    origin: z.string(),
    packaging: z.string(),
  }),
})

const usageGuideSchema = z.object({
  dosage: z.object({
    adult: z.string(),
    child: z.string(),
  }),
  directions: z.array(z.string()),
  precautions: z.array(z.string()),
})

export const medicineSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  priority: z.number(),
  thumbnail: z.object({
    imageUrl: z.string(),
    imageAlt: z.string(),
  }),
  description: z.string(),
  variants: variantSchema,
  ratings: ratingsSchema,
  category: categorySchema,
  supplier: supplierSchema,
  details: detailsSchema,
  usageguide: usageGuideSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type Medicines = z.infer<typeof medicineSchema>;
