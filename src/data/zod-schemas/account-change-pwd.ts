"use client";

import { z } from "zod";

export const accountChangePwdSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    new_password: z
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    new_password_confirmation: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .max(255),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type AccountChangePwd = z.infer<typeof accountChangePwdSchema>;
