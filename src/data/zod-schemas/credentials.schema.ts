"use client";

import { z } from "zod";

export const credentialsFormSchema = z.object({
  account: z
    .string()
    .min(1, { message: "Email or username is required!" })
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length >= 3,
      {
        message:
          "Invalid email address or username must be at least 3 characters!",
      }
    ),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

export type CredentialsData = z.infer<typeof credentialsFormSchema>;
