"use client";

import { z } from "zod";

export const credentialsSchema = z.object({
  account: z
    .string()
    .min(3, { message: "Email or username must be at least 3 characters!" })
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length >= 3,
      {
        message: "Invalid email address or username format",
      }
    ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters!" }),
});

export type CredentialsForm = z.infer<typeof credentialsSchema>;

export const registrationSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters"),
    email: z.string().trim().email("Invalid email address").toLowerCase(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationForm = z.infer<typeof registrationSchema>;
