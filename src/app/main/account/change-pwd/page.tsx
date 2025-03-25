"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { PasswordInput } from "@/components/custom/password-input"
import { routeNames, routes, siteConfig } from "@/config"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Helmet } from "react-helmet-async"
import { ShieldCheck } from "lucide-react"
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

      toast.success("Your password has been updated.");

      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl min-h-screen">
      <Helmet>
        <title>{`${routeNames[routes.account.changePwd]} | ${siteConfig.name}`}</title>
      </Helmet>
      <h1 className="text-3xl font-bold">Change Password</h1>
      <div className="mt-6 space-y-6">
        <section className="space-y-6">
          <header className="flex items-center justify-between gap-4">
            <div className="items-center justify-center">
              <h3 className="font-medium">Account Security</h3>
              <p className="text-sm text-muted-foreground">
                Change your password periodically to protect your account
              </p>
            </div>
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
          </header>
        </section>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section className="space-y-6">
              <header className="flex items-center justify-between">
                <div className="items-center justify-center">
                  <h3 className="font-medium">Current Password</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your current password to verify
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
                            placeholder="Enter new password"
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

            <Separator />

            <section className="space-y-6">
              <header className="flex items-center justify-between">
                <div className="items-center justify-center">
                  <h3 className="font-medium">New Password</h3>
                  <p className="text-sm text-muted-foreground">
                    New password must meet security requirements
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
                            placeholder="Enter new password"
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

            <Separator />

            <section className="space-y-6">
              <header className="flex items-center justify-between">
                <div className="items-center justify-center">
                  <h3 className="font-medium">Confirm New Password</h3>
                  <p className="text-sm text-muted-foreground">
                    Re-enter your new password to confirm
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
                            placeholder="Enter new password"
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

            <Separator />

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
