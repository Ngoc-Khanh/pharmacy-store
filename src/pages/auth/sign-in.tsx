import { PasswordInput } from "@/components/custom";
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
import { BriefcaseMedical, User, Loader2 } from "lucide-react";
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
      <div className="w-full max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Link
            to={routes.store.root}
            className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative group"
            style={{
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.1)'
            }}
          >
            <BriefcaseMedical className="w-8 h-8 text-white drop-shadow-lg" />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>
          
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            style={{
              textShadow: '0 0 20px rgba(34, 197, 94, 0.2)'
            }}
          >
            Đăng nhập
          </TextAnimate>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn
          </p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div 
              className="bg-white/20 dark:bg-gray-900/20 rounded-2xl border border-white/30 dark:border-gray-800/30 p-6 shadow-lg backdrop-blur-md relative"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 40px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Subtle glow border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-50" />
              
              <div className="space-y-4 relative z-10">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tài khoản
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 group-focus-within:text-green-500 transition-colors duration-200 drop-shadow-sm" />
                          <Input
                            {...field}
                            placeholder="Email hoặc tên đăng nhập"
                            tabIndex={1}
                            className="pl-11 h-12 bg-white/50 dark:bg-gray-800/30 border-gray-300/50 dark:border-gray-700/50 focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-500/20 rounded-lg transition-all backdrop-blur-sm focus:shadow-lg focus:shadow-green-500/10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Mật khẩu
                        </FormLabel>
                        <Link
                          to={routes.auth.forgotPassword}
                          className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors hover:drop-shadow-sm"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="group">
                          <PasswordInput
                            {...field}
                            placeholder="Nhập mật khẩu"
                            tabIndex={2}
                            className="h-12 focus:shadow-lg focus:shadow-green-500/10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-6 h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
                disabled={isLoading}
                tabIndex={3}
                style={{
                  boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1)'
                }}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin drop-shadow-sm" />
                      Đang đăng nhập...
                    </div>
                  ) : (
                    <span className="drop-shadow-sm">Đăng nhập</span>
                  )}
                </div>
              </Button>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chưa có tài khoản?{" "}
                <Link
                  to={routes.auth.register}
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors hover:drop-shadow-sm"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}