import { z } from "zod";

export const categoriesSchema = z.object({
  title: z.string().min(1, { message: "Tên danh mục là bắt buộc" }),
  description: z.string().min(1, { message: "Mô tả là bắt buộc" }),
  isActive: z.boolean().optional(),
  isEdit: z.boolean().optional(),
})

export type CategoriesSchema = z.infer<typeof categoriesSchema>;
