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
    firstname: z.string().trim().min(1, "Họ không được để trống"),
    lastname: z.string().trim().min(1, "Tên không được để trống"),
    username: z
      .string()
      .trim()
      .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
    email: z.string().trim().email("Địa chỉ email không hợp lệ").toLowerCase(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, "Số điện thoại không hợp lệ"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt"
      ),
      passwordConfirmation: z.string(),
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