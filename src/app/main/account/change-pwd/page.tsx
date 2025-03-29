"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { PasswordInput } from "@/components/custom/password-input"
import { routeNames, routes, siteConfig } from "@/config"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Save, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"
import * as z from "zod"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
    newPassword: z.string()
      .min(8, "New password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePwdPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordFormValues) {
    try {
      setIsLoading(true);
      // TODO: Implement password change logic here
      console.log(data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Mật khẩu của bạn đã được cập nhật.");

      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi cập nhật mật khẩu của bạn.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>{`${routeNames[routes.account.changePwd]} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <Badge variant="outline" className="border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 px-3 py-1 text-sm rounded-full">
            <span className="flex items-center">
              <Lock className="h-3.5 w-3.5 mr-2 text-green-600 dark:text-green-400" />
              Bảo mật tài khoản
            </span>
          </Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            Đổi mật khẩu
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
            Thay đổi mật khẩu định kỳ để bảo vệ tài khoản của bạn
          </p>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
        <section className="space-y-6">
          <header className="flex items-center justify-between gap-4">
            <div className="items-center justify-center">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Bảo mật tài khoản</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mật khẩu mạnh giúp bảo vệ thông tin cá nhân của bạn
              </p>
            </div>
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-950">
              <ShieldCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section className="space-y-6">
              <header className="flex items-center justify-between">
                <div className="items-center justify-center">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Mật khẩu hiện tại</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nhập mật khẩu hiện tại của bạn để xác minh
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập mật khẩu hiện tại"
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </header>
            </section>

            <Separator className="bg-gray-100 dark:bg-gray-800" />

            <section className="space-y-6">
              <header className="flex items-center justify-between">
                <div className="items-center justify-center">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Mật khẩu mới</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mật khẩu mới phải đáp ứng các yêu cầu bảo mật
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập mật khẩu mới"
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </header>
            </section>

            <Separator className="bg-gray-100 dark:bg-gray-800" />

            <section className="space-y-6">
              <header className="flex items-center justify-between">
                <div className="items-center justify-center">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Xác nhận mật khẩu mới</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nhập lại mật khẩu mới của bạn để xác nhận
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập lại mật khẩu mới"
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </header>
            </section>

            <Separator className="bg-gray-100 dark:bg-gray-800" />

            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect group">
                <Save className="h-4 w-4 transition-transform group-hover:scale-110" />
                {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
