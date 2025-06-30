"use client";

import { z } from "zod";

// Constants for validation
const VALIDATION_REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  vietnamese_name: /^[a-zA-ZÀ-ỹ\s]*$/,
  username: /^[a-zA-Z0-9_-]+$/,
  phone: /^\+?[1-9]\d{1,14}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  repeated_chars: /(.)\1{2,}/,
  repeated_pattern: /^(.+?)\1+$/,
} as const;

const VALIDATION_LIMITS = {
  name: { min: 2, max: 50 },
  username: { min: 3, max: 30 },
  email: { max: 255 },
  phone: { min: 10, max: 15 },
  password: { min: 8, max: 128 },
  account: { min: 3 },
} as const;

const VALIDATION_MESSAGES = {
  required: {
    firstname: "Họ là bắt buộc",
    lastname: "Tên là bắt buộc", 
    username: "Tên đăng nhập là bắt buộc",
    email: "Email là bắt buộc",
    phone: "Số điện thoại là bắt buộc",
    password: "Mật khẩu là bắt buộc",
    passwordConfirmation: "Xác nhận mật khẩu là bắt buộc",
  },
  invalid: {
    email: "Địa chỉ email không hợp lệ",
    phone: "Số điện thoại không hợp lệ. Định dạng: +84901234567 hoặc 0901234567",
    password: "Mật khẩu phải chứa ít nhất: 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@$!%*?&)",
    username: "Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang",
    name: "chỉ được chứa chữ cái và khoảng trắng",
  },
  passwordMismatch: "Mật khẩu không khớp",
  resetToken: "Token đặt lại mật khẩu không hợp lệ",
} as const;

// Reusable validation helpers
const createStringField = (config: {
  required_error: string;
  min?: number;
  max?: number;
  regex?: RegExp;
  regexMessage?: string;
  customValidations?: Array<{
    validator: (value: string) => boolean;
    message: string;
  }>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let field: any = z
    .string({ required_error: config.required_error })
    .trim()
    .min(1, `${config.required_error.split(' ')[0]} không được để trống`);

  if (config.min) {
    field = field.min(config.min, `${config.required_error.split(' ')[0]} phải có ít nhất ${config.min} ký tự`);
  }

  if (config.max) {
    field = field.max(config.max, `${config.required_error.split(' ')[0]} không được quá ${config.max} ký tự`);
  }

  if (config.regex && config.regexMessage) {
    field = field.regex(config.regex, config.regexMessage);
  }

  if (config.customValidations) {
    config.customValidations.forEach(({ validator, message }) => {
      field = field.refine(validator, message);
    });
  }

  return field;
};

const createPasswordField = (isForReset = false) => {
  const passwordMessage = isForReset 
    ? "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 chữ số và 1 ký tự đặc biệt"
    : VALIDATION_MESSAGES.invalid.password;

  return createStringField({
    required_error: VALIDATION_MESSAGES.required.password,
    min: VALIDATION_LIMITS.password.min,
    max: VALIDATION_LIMITS.password.max,
    regex: VALIDATION_REGEX.password,
    regexMessage: passwordMessage,
    customValidations: [
      {
        validator: (password) => !VALIDATION_REGEX.repeated_chars.test(password),
        message: "Mật khẩu không được chứa 3 ký tự giống nhau liên tiếp",
      },
      {
        validator: (password) => !VALIDATION_REGEX.repeated_pattern.test(password),
        message: "Mật khẩu không được lặp lại cùng một mẫu",
      },
    ],
  });
};

const createEmailField = () => 
  z.string({ required_error: VALIDATION_MESSAGES.required.email })
    .trim()
    .email(VALIDATION_MESSAGES.invalid.email)
    .toLowerCase()
    .max(VALIDATION_LIMITS.email.max, `Email không được quá ${VALIDATION_LIMITS.email.max} ký tự`)
    .refine(
      (email) => !email.includes(".."),
      "Email không được chứa hai dấu chấm liên tiếp"
    );

const createPhoneField = () =>
  createStringField({
    required_error: VALIDATION_MESSAGES.required.phone,
    min: VALIDATION_LIMITS.phone.min,
    max: VALIDATION_LIMITS.phone.max,
    regex: VALIDATION_REGEX.phone,
    regexMessage: VALIDATION_MESSAGES.invalid.phone,
    customValidations: [
      {
        validator: (phone) => {
          const cleanPhone = phone.replace(/^\+/, "");
          return cleanPhone.length >= VALIDATION_LIMITS.phone.min && 
                 cleanPhone.length <= VALIDATION_LIMITS.phone.max;
        },
        message: `Số điện thoại phải có từ ${VALIDATION_LIMITS.phone.min} đến ${VALIDATION_LIMITS.phone.max} chữ số`,
      },
    ],
  });

const createNameField = (fieldName: 'firstname' | 'lastname') =>
  createStringField({
    required_error: VALIDATION_MESSAGES.required[fieldName],
    min: VALIDATION_LIMITS.name.min,
    max: VALIDATION_LIMITS.name.max,
    regex: VALIDATION_REGEX.vietnamese_name,
    regexMessage: `${fieldName === 'firstname' ? 'Họ' : 'Tên'} ${VALIDATION_MESSAGES.invalid.name}`,
  });

const createUsernameField = () =>
  createStringField({
    required_error: VALIDATION_MESSAGES.required.username,
    min: VALIDATION_LIMITS.username.min,
    max: VALIDATION_LIMITS.username.max,
    regex: VALIDATION_REGEX.username,
    regexMessage: VALIDATION_MESSAGES.invalid.username,
    customValidations: [
      {
        validator: (username) => !username.startsWith("_") && !username.endsWith("_"),
        message: "Tên đăng nhập không được bắt đầu hoặc kết thúc bằng dấu gạch dưới",
      },
    ],
  });

const createPasswordConfirmationRefine = () => ({
  message: VALIDATION_MESSAGES.passwordMismatch,
  path: ["passwordConfirmation" as const],
});

// Schemas
export const credentialsSchema = z.object({
  account: z
    .string()
    .min(1, "Vui lòng nhập email hoặc tên đăng nhập!")
    .min(VALIDATION_LIMITS.account.min, `Email hoặc tên đăng nhập phải có ít nhất ${VALIDATION_LIMITS.account.min} ký tự!`)
    .refine(
      (value) => VALIDATION_REGEX.email.test(value) || value.length >= VALIDATION_LIMITS.account.min,
      { message: "Email hoặc tên đăng nhập không hợp lệ" }
    ),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu!"),
});

export const registrationSchema = z
  .object({
    firstname: createNameField('firstname'),
    lastname: createNameField('lastname'),
    username: createUsernameField(),
    email: createEmailField(),
    phone: createPhoneField(),
    password: createPasswordField(),
    passwordConfirmation: z
      .string({ required_error: VALIDATION_MESSAGES.required.passwordConfirmation })
      .min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine(
    (data) => data.password === data.passwordConfirmation,
    createPasswordConfirmationRefine()
  );

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .min(1, "Email không được để trống"),
});

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(1, VALIDATION_MESSAGES.resetToken),
    password: createPasswordField(true),
    passwordConfirmation: z.string(),
  })
  .refine(
    (data) => data.password === data.passwordConfirmation,
    createPasswordConfirmationRefine()
  );

// Types
export type CredentialsForm = z.infer<typeof credentialsSchema>;
export type RegistrationForm = z.infer<typeof registrationSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;