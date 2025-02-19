"use client";

import { z } from "zod";

export const accountChangePwdSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    newPassword: z
      .string()
      .min(1, { message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .max(255),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type AccountChangePwd = z.infer<typeof accountChangePwdSchema>;
