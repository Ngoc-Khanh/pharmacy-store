import { BriefcaseMedical, Loader2, Mail, Lock, User, Phone, Users } from "lucide-react";
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
import { TextAnimate } from "@/components/magicui/text-animate";
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
    <AuthLayout title="Đăng ký">
      <div className="flex flex-col gap-6 relative z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-3">
                <Link
                  to={routes.store.root}
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/60 dark:to-teal-900/60 text-green-600 dark:text-green-400 shadow-md hover:shadow-lg transition-all duration-300">
                    <BriefcaseMedical className="size-6" />
                  </div>
                  <span className="sr-only">Pharmacity Inc.</span>
                </Link>
                <TextAnimate
                  animation="blurInUp"
                  by="character"
                  className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400"
                >
                  Đăng ký tài khoản mới
                </TextAnimate>
                <div className="text-gray-500 dark:text-gray-400 text-center">
                  Tham gia Pharmacy Store để quản lý sức khỏe của bạn một cách dễ dàng
                </div>
              </div>
              
              <div className="space-y-5 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Họ</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="Nguyễn"
                              tabIndex={1}
                              className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-green-400 dark:focus:border-green-600 rounded-lg pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Tên</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="Văn A"
                              tabIndex={2}
                              className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-green-400 dark:focus:border-green-600 rounded-lg pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Tên đăng nhập</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="username"
                            tabIndex={3}
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-green-400 dark:focus:border-green-600 rounded-lg pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="example@email.com"
                            tabIndex={4}
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-green-400 dark:focus:border-green-600 rounded-lg pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Số điện thoại</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="+84123456789"
                            tabIndex={5}
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-green-400 dark:focus:border-green-600 rounded-lg pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <PasswordInput
                            {...field}
                            placeholder="********"
                            tabIndex={6}
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-green-400 dark:focus:border-green-600 rounded-lg pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <PasswordInput
                            {...field}
                            placeholder="********"
                            tabIndex={7}
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-green-400 dark:focus:border-green-600 rounded-lg pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect py-6"
                  disabled={isLoading}
                  tabIndex={8}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 text-white">
                      <Loader2 className="animate-spin" />
                      Vui lòng chờ...
                    </div>
                  ) : (
                    <span className="text-white text-base">Đăng ký</span>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="text-gray-500 dark:text-gray-400">
                    Đã có tài khoản?{" "}
                    <Link
                      to={routes.auth.login}
                      className="text-green-600 dark:text-green-400 hover:underline underline-offset-4 hover:opacity-75 transition-all duration-200 font-medium"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
