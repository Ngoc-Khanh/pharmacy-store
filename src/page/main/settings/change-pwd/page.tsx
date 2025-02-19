import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { AccountChangePwd, accountChangePwdSchema } from "@/data/zod-schemas";
import { PasswordInput } from "@/components/custom/password-input";
import { AccountAPI } from "@/services/api/account.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/custom/loading";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useStateUser } from "@/providers";
import { useForm } from "react-hook-form";
import { siteConfig } from "@/config";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const { user } = useStateUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AccountChangePwd>({
    resolver: zodResolver(accountChangePwdSchema),
  });

  const changePwdMutation = useMutation({
    mutationFn: AccountAPI.changePwd,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const onSubmit = (data: AccountChangePwd) => {
    setIsLoading(true);
    changePwdMutation.mutate(data, {
      onSettled: () => setIsLoading(false),
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Change Password | {siteConfig.name}</title>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        {user ? (
          <Card>
            <CardHeader className="items-center justify-center">
              <h1 className="text-2xl font-bold">Change Password</h1>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <Form {...form}>
                  <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="current_password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <PasswordInput {...field} placeholder="Your current password" tabIndex={1} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="new_password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <PasswordInput {...field} placeholder="Your new password" tabIndex={2} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="new_password_confirmation"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Password Confirmation</FormLabel>
                          <FormControl>
                            <PasswordInput {...field} placeholder="Confirm yout new password" tabIndex={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <span>Change Password</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}