import { Loader2, Mail, Lock, User, Phone, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegistrationForm, registrationSchema } from "@/data/schemas";
import { PasswordInput } from "@/components/custom/password-input";
import { AuthAPI } from "@/services/api/auth.api";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth.layout";
import { routes, siteConfig } from "@/config";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const registerMutation = useMutation({
    mutationFn: AuthAPI.fetchRegister,
    onSuccess: (res) => {
      localStorage.setItem(siteConfig.auth.jwt_key, res.accessToken);
      setIsLoading(false);
      toast.success("Đăng ký thành công!", { description: "Đang chuyển hướng đến trang chủ..." });
      setTimeout(() => {
        window.location.href = routes.store.root;
      }, 1000);
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (err.response?.status === 409) {
        toast.error("Email hoặc tên đăng nhập đã tồn tại!", { description: "Vui lòng thử lại với thông tin khác..." });
      } else {
        toast.error(err.message, { description: "Đăng ký thất bại!" });
      }
      setIsLoading(false);
    }
  });

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: RegistrationForm) => {
    setIsLoading(true);
    console.log(data);
    registerMutation.mutate(data);
  };

  return (
    <AuthLayout title="Đăng ký" useModernLayout={true}>
      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        <div className="text-center mb-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Đăng ký tài khoản</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Tạo tài khoản để truy cập vào Pharmacy Store
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Họ</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                        <Input
                          {...field}
                          placeholder="Nguyễn"
                          className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Tên</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                        <Input
                          {...field}
                          placeholder="Văn A"
                          className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
            </div>

            {/* Username field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Tên đăng nhập</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                      <Input
                        {...field}
                        placeholder="username"
                        className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="example@email.com"
                        className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Phone field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Số điện thoại</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                      <Input
                        {...field}
                        placeholder="+84123456789"
                        className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Password fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                        <PasswordInput
                          {...field}
                          placeholder="********"
                          className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                        <PasswordInput
                          {...field}
                          placeholder="********"
                          className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
            </div>

            {/* Agreement text - optional */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <Link to="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400">
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link to="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400">
                Chính sách bảo mật
              </Link>{" "}
              của chúng tôi.
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-md font-medium transition-all duration-200 ease-in-out transform hover:translate-y-[-1px] hover:shadow-lg text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Đăng ký"
              )}
            </Button>

            {/* Login link */}
            <div className="text-center text-xs text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{" "}
              <Link to={routes.auth.login} className="font-medium text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400 hover:underline transition-colors">
                Đăng nhập
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
