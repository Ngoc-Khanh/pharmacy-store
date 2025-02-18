"use client";

import { z } from "zod";

export const accountFormSchema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }).max(255),
  fullName: z.string().nonempty({ message: 'Name is required' }).max(255),
  email: z.string({ message: 'Email is required' }).email(),
  phone: z.string({ message: 'Phone is required' }).max(15),
  dob: z.string({ message: 'Date of birth is required' }).nonempty().max(255),
  address: z.string().nonempty({ message: 'Address is required' }).max(255),
});

export type AccountForm = z.infer<typeof accountFormSchema>;