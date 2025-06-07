import { z } from "zod";
import { AccountRole, AccountStatus } from "../enum";

export const usersSchema = z.object({
  username: z.string().min(1, { message: "Tên người dùng là bắt buộc" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().min(1, { message: "Số điện thoại là bắt buộc" }),
  firstname: z.string().min(1, { message: "Tên là bắt buộc" }),
  lastname: z.string().min(1, { message: "Họ là bắt buộc" }),
  status: z.nativeEnum(AccountStatus, {
    message: "Trạng thái không hợp lệ",
  }),
  role: z.nativeEnum(AccountRole, {
    message: "Vai trò không hợp lệ",
  }),
  password: z.string().optional(),
  passwordConfirmation: z.string().optional(),
  isEdit: z.boolean().optional(),
}).superRefine(({ isEdit, password, passwordConfirmation }, ctx) => {
  // Trường hợp tạo mới: password là bắt buộc
  if (!isEdit) {
    if (!password || password === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu là bắt buộc",
        path: ["password"],
      });
      return; // Không cần kiểm tra các điều kiện khác nếu không có mật khẩu
    }
  }
  
  // Chỉ validate mật khẩu nếu có nhập mật khẩu (tạo mới hoặc edit có nhập mật khẩu mới)
  if (password && password !== "") {
    if (password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 8 ký tự",
        path: ["password"],
      });
    }
    if (!password.match(/[a-z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ cái thường",
        path: ["password"],
      });
    }
    if (!password.match(/[A-Z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ cái viết hoa",
        path: ["password"],
      });
    }
    if (!password.match(/[0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ số",
        path: ["password"],
      });
    }
    if (!password.match(/[!@#$%^&*()_+{}[\]\]:;<>,.?~/-]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt",
        path: ["password"],
      });
    }
    
    // Kiểm tra xác nhận mật khẩu chỉ khi đã nhập mật khẩu
    if (!passwordConfirmation || passwordConfirmation === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Xác nhận mật khẩu là bắt buộc",
        path: ["passwordConfirmation"],
      });
    } else if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu không khớp",
        path: ["passwordConfirmation"],
      });
    }
  }
});

export type UserSchema = z.infer<typeof usersSchema>;