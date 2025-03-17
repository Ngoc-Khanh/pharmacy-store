import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CredentialsForm, credentialsSchema } from "@/data/zod-schemas";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { PasswordInput } from "@/components/custom/password-input";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BriefcaseMedical, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/services/api/auth.api";
import { Input } from "@/components/ui/input";
import { routes, siteConfig } from "@/config";
import { AuthLayout } from "@/layouts/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import OAuth from "./oauth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: AuthAPI.fetchLogin,
    onSuccess: (res) => {
      localStorage.setItem(siteConfig.auth.jwt_key, res.accessToken);
      setIsLoading(false);
      setTimeout(() => {
        window.location.href = routes.home;
      }, 1000);
    },
    onError: (err) => {
      console.log(err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((err as any)?.response?.status === 401) {
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
      <div className="flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2
              ">
                <a
                  href={routes.home}
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md">
                    <BriefcaseMedical className="size-6" />
                  </div>
                  <span className="sr-only">Pharmacity Inc.</span>
                </a>
                <TextAnimate
                  animation="blurInUp"
                  by="character"
                  className="text-xl font-bold"
                >
                  Welcome to Pharmacity Store.
                </TextAnimate>
                <div>
                  Don&apos;t have an account?{" "}
                  <Link
                    to={routes.register}
                    className="underline underline-offset-4 hover:opacity-75"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your account"
                        tabIndex={1}
                      />
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
                      <FormLabel>Password</FormLabel>
                      <Link
                        to={routes.forgotPassword}
                        className="text-sm font-medium text-muted-foreground hover:text-primary"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="********"
                        tabIndex={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <RainbowButton
                type="submit"
                className="w-full"
                disabled={isLoading}
                tabIndex={3}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 text-white dark:text-black">
                    <Loader2 className="animate-spin" />
                    Please wait...
                  </div>
                ) : (
                  <span className="text-white dark:text-black">Login</span>
                )}
              </RainbowButton>
            </div>
            <OAuth className="hidden mt-2" />
          </form>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </Form>
      </div>
    </AuthLayout>
  )
}