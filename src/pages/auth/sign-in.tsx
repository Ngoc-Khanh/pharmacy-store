import { PasswordInput } from "@/components/custom/password-input";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routeNames, routes, siteConfig } from "@/config";
import { CredentialsForm, credentialsSchema } from "@/data/schemas";
import { AuthLayout } from "@/layouts";
import { AuthAPI } from "@/services/v1";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { BriefcaseMedical, Loader2, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: AuthAPI.fetchLogin,
    onSuccess: (res) => {
      localStorage.setItem(siteConfig.auth.jwt_key, res.accessToken);
      setIsLoading(false);
      toast.success("Đăng nhập thành công!", { description: "Đang chuyển hướng đến trang chủ..." });
      setTimeout(() => {
        window.location.href = routes.store.root;
      }, 1000);
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (err.response?.status === 401) {
        toast.error("Tài khoản hoặc mật khẩu không hợp lệ!", { description: "Vui lòng thử lại..." });
      } else {
        toast.error(err.message, { description: "Đăng nhập thất bại!" });
      }
      setIsLoading(false);
    }
  });

  const form = useForm<CredentialsForm>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      account: import.meta.env.DEV ? "testver1@customer.com" : "",
      password: import.meta.env.DEV ? "Test@123" : "",
    },
  });

  const onSubmit = (data: CredentialsForm) => {
    setIsLoading(true);
    loginMutation.mutate(data, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <AuthLayout title={routeNames[routes.auth.login]}>
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
                  Đăng nhập
                </TextAnimate>
                
                <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn
                </div>
              </div>

              <div className="space-y-5 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm">
                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                        Tài khoản
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="Email hoặc tên đăng nhập"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                          Mật khẩu
                        </FormLabel>
                        <Link
                          to={routes.auth.forgotPassword}
                          className="text-sm text-green-600 dark:text-green-400 hover:underline underline-offset-4 hover:opacity-75 transition-all duration-200"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <PasswordInput
                            {...field}
                            placeholder="Nhập mật khẩu"
                            tabIndex={2}
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
                  tabIndex={3}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 text-white">
                      <Loader2 className="animate-spin" />
                      Đang đăng nhập...
                    </div>
                  ) : (
                    <span className="text-white text-base">Đăng nhập</span>
                  )}
                </Button>

                <div className="flex items-center justify-center pt-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Chưa có tài khoản?{" "}
                    <Link
                      to={routes.auth.register}
                      className="text-green-600 dark:text-green-400 hover:underline underline-offset-4 hover:opacity-75 transition-all duration-200 font-medium"
                    >
                      Đăng ký ngay
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}