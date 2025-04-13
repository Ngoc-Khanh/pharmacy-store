import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Users } from "@/data/zod-schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback } from "react";
import { toast } from "sonner";
import { PasswordInput } from "@/components/custom/password-input";
import { motion } from "motion/react";
import { 
  User, Mail, Phone, UserCircle, 
  ShieldCheck, ToggleLeft, KeyRound, 
  LockKeyhole, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UsersAPI } from "@/services/api/users.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  role: z.enum(["admin", "pharmacist", "customer"], { message: "Role is required" }),
  status: z.enum(["active", "inactive", "banned"], { message: "Status is required" }),
  password: z.string().transform((pwd) => pwd.trim()),
  password_confirmation: z.string().transform((pwd) => pwd.trim()),
  isEdit: z.boolean(),
}).superRefine(({ isEdit, password, password_confirmation }, ctx) => {
  if (!isEdit || (isEdit && password !== "")) {
    if (password === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required.",
        path: ["password"],
      });
    }

    if (password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 6 characters long.",
        path: ["password"],
      });
    }

    if (!password.match(/[a-z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one lowercase letter.",
        path: ["password"],
      });
    }

    if (!password.match(/\d/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one number.",
        path: ["password"],
      });
    }

    if (password !== password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match.",
        path: ["password_confirmation"],
      });
    }
  }
});
type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentUser?: Users;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentUser, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const isEdit = !!currentUser;
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit ? {
      ...currentUser,
      password: "",
      password_confirmation: "",
      isEdit,
    } : {
      username: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      role: "customer",
      status: "active",
      password: "",
      password_confirmation: "",
      isEdit,
    }
  });

  const isPasswordTouched = !!form.formState.dirtyFields.password;

  const addUserMutation = useMutation({
    mutationFn: UsersAPI.addNewUsers,
    onSuccess: () => {
      toast.success("User created successfully");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to create user");
    }
  })

  const editUserMutation = useMutation({
    mutationFn: (values: UserForm) => {
      if (!currentUser?.id) throw new Error("User ID is required");
      return UsersAPI.updateUsers(currentUser.id, values);
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to update user");
    }
  })

  const onSubmit = useCallback((values: UserForm) => {
    if (!isEdit) addUserMutation.mutate(values);
    else editUserMutation.mutate(values);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, onOpenChange, form, addUserMutation, editUserMutation]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="mb-4 text-left">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            {isEdit ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the user here. " : "Create new user here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <h3 className="mb-4 font-medium text-sm text-muted-foreground">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          First Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input className="pl-8" placeholder="John" {...field} />
                            <UserCircle className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input className="pl-8" placeholder="Doe" {...field} />
                            <UserCircle className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <UserCircle className="h-3.5 w-3.5 text-muted-foreground" />
                          Username
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input className="pl-8" placeholder="johndoe" {...field} />
                            <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <h3 className="mb-4 font-medium text-sm text-muted-foreground">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input className="pl-8" placeholder="john.doe@example.com" type="email" {...field} />
                            <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
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
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          Phone
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input className="pl-8" placeholder="+1234567890" {...field} />
                            <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <h3 className="mb-4 font-medium text-sm text-muted-foreground">Account Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                          Role
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <div className="relative">
                              <SelectTrigger className="pl-8">
                                <ShieldCheck className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 border-red-200 dark:border-red-800">
                                  Admin
                                </Badge>
                                <span className="text-xs text-muted-foreground">Full system access</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="pharmacist">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                  Pharmacist
                                </Badge>
                                <span className="text-xs text-muted-foreground">Inventory and prescription access</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="customer">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300 border-green-200 dark:border-green-800">
                                  Customer
                                </Badge>
                                <span className="text-xs text-muted-foreground">Basic shopping access</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <ToggleLeft className="h-3.5 w-3.5 text-muted-foreground" />
                          Status
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <div className="relative">
                              <SelectTrigger className="pl-8">
                                <ToggleLeft className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300 border-none">
                                  Active
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="inactive">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-300 border-none">
                                  Inactive
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="banned">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 border-none">
                                  Banned
                                </Badge>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <h3 className="mb-4 font-medium text-sm text-muted-foreground">Security</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                          {isEdit ? "New Password" : "Password"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <PasswordInput
                              className="pl-8"
                              placeholder="e.g., S3cur3P@ssw0rd"
                              {...field}
                            />
                            <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="flex items-center gap-1.5">
                          <LockKeyhole className="h-3.5 w-3.5 text-muted-foreground" />
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <PasswordInput
                              className="pl-8"
                              disabled={!isPasswordTouched}
                              placeholder="e.g., S3cur3P@ssw0rd"
                              {...field}
                            />
                            <LockKeyhole className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator />
            
            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="transition-all duration-200 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className={cn(
                  "transition-all duration-200",
                  isEdit 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-primary hover:opacity-90"
                )}
              >
                <motion.span
                  initial={{ y: 2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-1.5"
                >
                  {isEdit ? "Update User" : "Create User"}
                  <Sparkles className="h-3.5 w-3.5" />
                </motion.span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}