import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseMedical, Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/custom/password-input";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/layouts/auth";
import { AuthAPI } from "@/services/api/auth.api";
import { routes, siteConfig } from "@/config";
import OAuth from "./oauth";
import { CredentialsForm, credentialsSchema } from "@/data/zod-schemas";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: AuthAPI.fetchLogin,
    onSuccess: (res) => {
      localStorage.setItem(siteConfig.auth.jwt_key, res.accessToken);
      setIsLoading(false);
      toast.success("Login successful!", { description: "Redirecting to dashboard..." });
      setTimeout(() => {
        window.location.href = routes.home;
      }, 1000);
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (err.response?.status === 401) {
        toast.error("Invalid account or password!", { description: "Please try again..." });
      } else {
        toast.error(err.message, { description: "Login failed!" });
      }
      setIsLoading(false);
    }
  });

  const form = useForm<CredentialsForm>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      account: "admin@pharmacity.com",
      password: "123456",
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
    <AuthLayout title="Login">
      <div className="flex flex-col gap-6 relative z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-3">
                <Link
                  to={routes.home}
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
                  Welcome to Pharmacity Store
                </TextAnimate>
                <div className="text-gray-500 dark:text-gray-400 text-center">
                  Sign in to access your account and manage your health needs
                </div>
              </div>
              
              <div className="space-y-5 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm">
                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Account</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="Username or Email"
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
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Password</FormLabel>
                        <Link
                          to={routes.forgotPassword}
                          className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <PasswordInput
                            {...field}
                            placeholder="********"
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
                      Please wait...
                    </div>
                  ) : (
                    <span className="text-white text-base">Sign In</span>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="text-gray-500 dark:text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link
                      to={routes.register}
                      className="text-green-600 dark:text-green-400 hover:underline underline-offset-4 hover:opacity-75 transition-all duration-200 font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <OAuth className="mt-4 hidden" />
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}