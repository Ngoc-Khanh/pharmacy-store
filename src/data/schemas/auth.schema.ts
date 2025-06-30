"use client";

import { z } from "zod";

export const credentialsSchema = z.object({
  account: z
    .string()
    .min(1, { message: "Vui lòng nhập email hoặc tên đăng nhập!" })
    .min(3, { message: "Email hoặc tên đăng nhập phải có ít nhất 3 ký tự!" })
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length >= 3,
      {
        message: "Email hoặc tên đăng nhập không hợp lệ",
      }
    ),
  password: z
    .string()
    .min(1, { message: "Vui lòng nhập mật khẩu!" })
});

export type CredentialsForm = z.infer<typeof credentialsSchema>;

export const registrationSchema = z
  .object({
    firstname: z
      .string({ required_error: "Họ là bắt buộc" })
      .trim()
      .min(1, "Họ không được để trống")
      .min(2, "Họ phải có ít nhất 2 ký tự")
      .max(50, "Họ không được quá 50 ký tự")
      .regex(/^[a-zA-ZÀ-ỹ\s]*$/, "Họ chỉ được chứa chữ cái và khoảng trắng"),
    lastname: z
      .string({ required_error: "Tên là bắt buộc" })
      .trim()
      .min(1, "Tên không được để trống")
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được quá 50 ký tự")
      .regex(/^[a-zA-ZÀ-ỹ\s]*$/, "Tên chỉ được chứa chữ cái và khoảng trắng"),
    username: z
      .string({ required_error: "Tên đăng nhập là bắt buộc" })
      .trim()
      .min(1, "Tên đăng nhập không được để trống")
      .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
      .max(30, "Tên đăng nhập không được quá 30 ký tự")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang"
      )
      .refine(
        (username) => !username.startsWith("_") && !username.endsWith("_"),
        "Tên đăng nhập không được bắt đầu hoặc kết thúc bằng dấu gạch dưới"
      ),
    email: z
      .string({ required_error: "Email là bắt buộc" })
      .trim()
      .email("Địa chỉ email không hợp lệ")
      .toLowerCase()
      .max(255, "Email không được quá 255 ký tự")
      .refine(
        (email) => !email.includes(".."),
        "Email không được chứa hai dấu chấm liên tiếp"
      ),
    phone: z
      .string({ required_error: "Số điện thoại là bắt buộc" })
      .trim()
      .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
      .max(15, "Số điện thoại không được quá 15 chữ số")
      .regex(
        /^\+?[1-9]\d{1,14}$/,
        "Số điện thoại không hợp lệ. Định dạng: +84901234567 hoặc 0901234567"
      )
      .refine(
        (phone) => {
          // Loại bỏ dấu + và kiểm tra độ dài
          const cleanPhone = phone.replace(/^\+/, "");
          return cleanPhone.length >= 10 && cleanPhone.length <= 15;
        },
        "Số điện thoại phải có từ 10 đến 15 chữ số"
      ),
    password: z
      .string({ required_error: "Mật khẩu là bắt buộc" })
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(128, "Mật khẩu không được quá 128 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải chứa ít nhất: 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@$!%*?&)"
      )
      .refine(
        (password) => !/(.)\1{2,}/.test(password),
        "Mật khẩu không được chứa 3 ký tự giống nhau liên tiếp"
      )
      .refine(
        (password) => !/^(.+?)\1+$/.test(password),
        "Mật khẩu không được lặp lại cùng một mẫu"
      ),
    passwordConfirmation: z
      .string({ required_error: "Xác nhận mật khẩu là bắt buộc" })
      .min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Mật khẩu không khớp",
    path: ["passwordConfirmation"],
  });

export type RegistrationForm = z.infer<typeof registrationSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .min(1, "Email không được để trống"),
})

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(1, "Token đặt lại mật khẩu không hợp lệ"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 chữ số và 1 ký tự đặc biệt"
      ),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Mật khẩu không khớp",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;