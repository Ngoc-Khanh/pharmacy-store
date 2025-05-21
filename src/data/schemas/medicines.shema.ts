import { z } from "zod";

export const medicineSchema = z.object({
  categoryId: z.string().min(1, { message: "Danh mục là bắt buộc" }),
  name: z.string().min(1, { message: "Tên thuốc là bắt buộc" }),
  slug: z.string().min(1, { message: "Slug là bắt buộc" }),
  thumbnail: z.optional(z.object({
    publicId: z.string().min(1, { message: "Public ID là bắt buộc" }),
    url: z.string().min(1, { message: "URL là bắt buộc" }),
    alt: z.string().min(1, { message: "Alt là bắt buộc" }),
  })),
  description: z.string().min(1, { message: "Mô tả là bắt buộc" }),
  variants: z.object({
    price: z.number().min(1, { message: "Giá là bắt buộc" }),
    limitQuantity: z.number().min(1, { message: "Số lượng là bắt buộc" }),
    stockStatus: z.enum(["IN-STOCK", "OUT-OF-STOCK", "LOW-STOCK"], { message: "Trạng thái là bắt buộc" }),
    originalPrice: z.number().min(1, { message: "Giá gốc là bắt buộc" }),
    discountPercent: z.number().min(1, { message: "Phần trăm giảm giá là bắt buộc" }),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
  details: z.object({
    ingredients: z.string().min(1, { message: "Thành phần là bắt buộc" }),
    usage: z.array(z.string()).min(1, { message: "Cách sử dụng là bắt buộc" }),
    parameters: z.object({
      origin: z.string().min(1, { message: "Xuất xứ là bắt buộc" }),
      packaging: z.string().min(1, { message: "Đóng gói là bắt buộc" }),
    }),
  }),
  usageguide: z.object({
    dosage: z.object({
      adult: z.string().min(1, { message: "Dánh cho người lớn là bắt buộc" }),
      child: z.string().min(1, { message: "Dánh cho trẻ em là bắt buộc" }),
    }),
    directions: z.array(z.string()).min(1, { message: "Hướng dẫn sử dụng là bắt buộc" }),
    precautions: z.array(z.string()).min(1, { message: "Các lưu ý là bắt buộc" }),
  }),
  isEdit: z.boolean().optional(),
});

export type MedicineSchema = z.infer<typeof medicineSchema>;
