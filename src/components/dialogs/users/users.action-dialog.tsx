import { PasswordInput } from "@/components/custom/password-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/data/interfaces";
import { UserSchema, usersSchema } from "@/data/schemas";
import { cn } from "@/lib/utils";
import { UsersAPI } from "@/services/api/users.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { motion } from 'framer-motion';
import { KeyRound, LockKeyhole, Mail, Phone, RefreshCw, ShieldCheck, Sparkles, ToggleLeft, UserCircle, User as UserIcon } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  currentUser?: User,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

export function UsersActionDialog({ currentUser, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const isEdit = !!currentUser;
  const form = useForm<UserSchema>({
    resolver: zodResolver(usersSchema),
    defaultValues: isEdit ? {
      ...currentUser,
      isEdit,
    } : {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      role: "customer",
      status: "active",
      password: "",
      passwordConfirmation: "",
      isEdit,
    }
  })

  const isPasswordTouched = !!form.formState.dirtyFields.password;

  const addUserMutataion = useMutation({
    mutationFn: UsersAPI.UserAdd,
    onSuccess: () => {
      toast.success("Thêm người dùng thành công");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Thêm người dùng thất bại");
    }
  })

  const updateUserMutation = useMutation({
    mutationFn: (values: UserSchema) => {
      if (!currentUser?.id) throw new Error("Cần có USER ID để cập nhật");
      return UsersAPI.UserUpdate(currentUser.id, values);
    },
    onSuccess: () => {
      toast.success("Cập nhật người dùng thành công");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Cập nhật người dùng thất bại");
    }
  })

  const isPending = addUserMutataion.isPending || updateUserMutation.isPending;

  const onSubmit = useCallback((values: UserSchema) => {
    if (!isEdit) addUserMutataion.mutate(values);
    else updateUserMutation.mutate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, onOpenChange, addUserMutataion, updateUserMutation, form]);

  const generateRandomPassword = useCallback(() => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";

    // Ensure at least one of each character type
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]; // Uppercase
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]; // Lowercase
    password += "0123456789"[Math.floor(Math.random() * 10)]; // Number
    password += "!@#$%^&*()_+"[Math.floor(Math.random() * 12)]; // Special char

    // Fill the rest randomly
    for (let i = 0; i < length - 4; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    form.setValue("password", password);
    form.setValue("passwordConfirmation", password);
    form.trigger(["password", "passwordConfirmation"]);

    toast.success("Đã tạo mật khẩu ngẫu nhiên!", {
      description: "Mật khẩu mới đã được tạo và điền vào form.",
      duration: 3000,
    });
  }, [form]);

  const formSectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * custom,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden rounded-xl border border-primary/10 shadow-lg">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-primary/60"></div>

        <DialogHeader className="p-6 pb-0 space-y-2">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold tracking-tight">
                {isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                {isEdit ? "Cập nhật thông tin người dùng trong hệ thống" : "Tạo tài khoản người dùng mới trong hệ thống"}
              </DialogDescription>
            </div>
          </motion.div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6 py-4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
            <div className="grid gird-cols-1 gap-6">
              <motion.div
                custom={1}
                variants={formSectionVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <UserIcon className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium text-blue-600 dark:text-blue-400">Thông tin cá nhân</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          Tên
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              className="pl-9 transition-all border-input/50 focus:border-primary/50 group-hover:border-primary/30"
                              placeholder="John"
                              {...field}
                            />
                            <UserCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary/70 transition-colors" />
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
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          Họ
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              className="pl-9 transition-all border-input/50 focus:border-primary/50 group-hover:border-primary/30"
                              placeholder="Doe"
                              {...field}
                            />
                            <UserCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary/70 transition-colors" />
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
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <UserCircle className="h-3.5 w-3.5 text-muted-foreground" />
                          Username
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              className="pl-9 transition-all border-input/50 focus:border-primary/50 group-hover:border-primary/30"
                              placeholder="johndoe"
                              {...field}
                            />
                            <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary/70 transition-colors" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>

              <motion.div
                custom={2}
                variants={formSectionVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Mail className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium text-green-600 dark:text-green-400">Thông Tin Liên Hệ</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              className="pl-9 transition-all border-input/50 focus:border-primary/50 group-hover:border-primary/30"
                              placeholder="john.doe@example.com"
                              type="email"
                              {...field}
                            />
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary/70 transition-colors" />
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
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          Số điện thoại
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Input
                              className="pl-9 transition-all border-input/50 focus:border-primary/50 group-hover:border-primary/30"
                              placeholder="+1234567890"
                              {...field}
                            />
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary/70 transition-colors" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>

              <motion.div
                custom={3}
                variants={formSectionVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium text-purple-600 dark:text-purple-400">Thông tin tài khoản</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                          Vai trò
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <div className="relative group">
                              <SelectTrigger className="pl-9 transition-all border-input/50 focus:border-primary/50 group-hover:border-primary/30">
                                <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary/70 transition-colors" />
                                <SelectValue placeholder="Chọn vai trò" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent className="border border-primary/10">
                            <SelectItem value="admin">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 border-red-200 dark:border-red-800 shadow-sm">
                                  Quản trị viên
                                </Badge>
                                <span className="text-xs text-muted-foreground">Quyền truy cập hệ thống đầy đủ</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="pharmacist">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200 dark:border-blue-800 shadow-sm">
                                  Dược sĩ
                                </Badge>
                                <span className="text-xs text-muted-foreground">Quyền truy cập kho và đơn thuốc</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="customer">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300 border-green-200 dark:border-green-800 shadow-sm">
                                  Khách hàng
                                </Badge>
                                <span className="text-xs text-muted-foreground">Quyền truy cập mua sắm cơ bản</span>
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
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <ToggleLeft className="h-3.5 w-3.5 text-muted-foreground" />
                          Trạng thái
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <div className="relative group">
                              <SelectTrigger className="pl-9 transition-all border-input/50 focus:border-primary/50 group-hover:border-primary/30">
                                <ToggleLeft className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary/70 transition-colors" />
                                <SelectValue placeholder="Chọn trạng thái" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent className="border border-primary/10">
                            <SelectItem value="active">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300 border-none shadow-sm">
                                  Hoạt động
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="suspended">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-300 border-none shadow-sm">
                                  Tạm dừng
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="pending">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 border-none shadow-sm">
                                  Đang chờ
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
              </motion.div>

              <motion.div
                custom={4}
                variants={formSectionVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <KeyRound className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-medium text-amber-600 dark:text-amber-400">Bảo mật</h3>
                  <div className="flex-1" />
                  {!isEdit && (
                    <Button
                      type="button"
                      onClick={generateRandomPassword}
                      className="h-7 relative overflow-hidden group bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-700"
                      title="Tạo mật khẩu ngẫu nhiên an toàn"
                    >
                      <div className="flex items-center gap-1.5 px-2 z-10 relative">
                        <RefreshCw className="h-3 w-3" />
                        <span className="text-xs font-medium">Tạo mật khẩu</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 dark:via-amber-700/20 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 z-0"></div>
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                          {isEdit ? "Mật khẩu mới" : "Mật khẩu"}
                          {isEdit && <span className="text-xs text-muted-foreground ml-1">(Tùy chọn)</span>}
                        </FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl className="flex-1">
                            <div className="relative group">
                              <PasswordInput
                                className={cn(
                                  "pl-9 transition-all", 
                                  isEdit 
                                    ? "border-input/30 focus:border-primary/50 group-hover:border-primary/30"
                                    : "border-input/50 focus:border-primary/50 group-hover:border-primary/30"
                                )}
                                placeholder={isEdit ? "Để trống nếu không thay đổi" : "e.g., S3cur3P@ssw0rd"}
                                {...field}
                              />
                              <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 group-hover:text-primary/70 transition-colors" />
                            </div>
                          </FormControl>
                        </div>
                        {!isEdit && (
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Mật khẩu nên có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="flex items-center gap-1.5 text-sm font-medium">
                          <LockKeyhole className="h-3.5 w-3.5 text-muted-foreground" />
                          Xác nhận mật khẩu
                          {isEdit && <span className="text-xs text-muted-foreground ml-1">(Tùy chọn)</span>}
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <PasswordInput
                              className={cn(
                                "pl-9 transition-all",
                                isEdit && !isPasswordTouched
                                  ? "bg-muted/30 border-input/20 text-muted-foreground/70"
                                  : !isPasswordTouched 
                                    ? "bg-muted/50 border-input/30" 
                                    : "border-input/50 focus:border-primary/50 group-hover:border-primary/30"
                              )}
                              disabled={!isPasswordTouched}
                              placeholder={isEdit ? "Để trống nếu không thay đổi" : "e.g., S3cur3P@ssw0rd"}
                              {...field}
                            />
                            <LockKeyhole className={cn(
                              "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
                              !isPasswordTouched
                                ? "text-muted-foreground/40"
                                : "text-muted-foreground/70 group-hover:text-primary/70"
                            )} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            </div>
          </form>

          <div className="p-4 bg-muted/30 border-t border-border/50 backdrop-blur-sm">
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="transition-all duration-200 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isPending}
                className={cn(
                  "transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden",
                  isPending ? "opacity-80 cursor-not-allowed" : "",
                  isEdit
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gradient-to-r from-primary to-primary/90 hover:opacity-90"
                )}
              >
                <motion.span
                  initial={{ y: 2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-1.5 relative z-10"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isEdit ? "Đang cập nhật..." : "Đang tạo..."}
                    </>
                  ) : (
                    <>
                      {isEdit ? "Cập nhật người dùng" : "Tạo người dùng mới"}
                      <Sparkles className="h-3.5 w-3.5" />
                    </>
                  )}
                </motion.span>
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}