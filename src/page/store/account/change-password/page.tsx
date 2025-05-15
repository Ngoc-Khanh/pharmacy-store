import { PasswordInput } from "@/components/custom/password-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { routeNames, routes, siteConfig } from "@/config";
import { AccountAPI } from "@/services/api/account.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { CheckCircle2, Lock, Save, ShieldCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Mật khẩu hiện tại phải có ít nhất 6 ký tự"),
    newPassword: z.string()
      .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 chữ số và 1 ký tự đặc biệt"
      ),
    newPasswordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Mật khẩu không khớp",
    path: ["newPasswordConfirmation"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const passwordRequirements = [
  { id: "length", label: "Ít nhất 8 ký tự", regex: /.{8,}/ },
  { id: "lowercase", label: "Ít nhất 1 chữ cái thường", regex: /[a-z]/ },
  { id: "uppercase", label: "Ít nhất 1 chữ cái in hoa", regex: /[A-Z]/ },
  { id: "digit", label: "Ít nhất 1 chữ số", regex: /\d/ },
  { id: "special", label: "Ít nhất 1 ký tự đặc biệt", regex: /[@$!%*?&]/ },
];

export default function ChangePasswordPage() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");
  const [requirements, setRequirements] = useState<{ [key: string]: boolean }>({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    special: false,
  });

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
  });

  // Calculate password strength and validate requirements
  useEffect(() => {
    if (!passwordValue) {
      setPasswordStrength(0);
      return;
    }

    const newRequirements = {} as { [key: string]: boolean };
    let metCount = 0;

    passwordRequirements.forEach(req => {
      const isMet = req.regex.test(passwordValue);
      newRequirements[req.id] = isMet;
      if (isMet) metCount++;
    });

    setRequirements(newRequirements);
    setPasswordStrength((metCount / passwordRequirements.length) * 100);
  }, [passwordValue]);

  // Get color for password strength indicator
  const getStrengthColor = () => {
    if (passwordStrength <= 20) return "bg-red-500";
    if (passwordStrength <= 40) return "bg-orange-500";
    if (passwordStrength <= 60) return "bg-yellow-500";
    if (passwordStrength <= 80) return "bg-blue-500";
    return "bg-green-500";
  };

  // Get label for password strength
  const getStrengthLabel = () => {
    if (passwordStrength <= 20) return "Rất yếu";
    if (passwordStrength <= 40) return "Yếu";
    if (passwordStrength <= 60) return "Trung bình";
    if (passwordStrength <= 80) return "Mạnh";
    return "Rất mạnh";
  };

  const ChangePasswordMutation = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: AccountAPI.changePassword,
    onSuccess: () => {
      toast.success("Mật khẩu của bạn đã được cập nhật thành công.", {
        description: "Vui lòng sử dụng mật khẩu mới khi đăng nhập lần sau.",
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      });

      // Reset form and states after successful update
      form.reset();
      setPasswordValue("");
      setPasswordStrength(0);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi cập nhật mật khẩu của bạn.", {
        description: "Vui lòng thử lại sau hoặc liên hệ hỗ trợ.",
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });
    }
  });

  function onSubmit(data: PasswordFormValues) {
    ChangePasswordMutation.mutate(data);
  }

  // Use the loading state from the mutation
  const isLoading = ChangePasswordMutation.isPending;

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <Helmet>
        <title>{`${routeNames[routes.store.account.changePwd]} | ${siteConfig.name}`}</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <Badge variant="outline" className="border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 px-3 py-1 text-sm rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
            <motion.span
              className="flex items-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}>
              <Lock className="h-3.5 w-3.5 mr-2 text-green-600 dark:text-green-400" />
              Bảo mật tài khoản
            </motion.span>
          </Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            Đổi mật khẩu
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
            Thay đổi mật khẩu định kỳ để bảo vệ tài khoản của bạn
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent dark:from-green-950/20 pointer-events-none" />

        <section className="space-y-6 relative">
          <header className="flex items-center justify-between gap-4">
            <div className="items-center justify-center">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Bảo mật tài khoản</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mật khẩu mạnh giúp bảo vệ thông tin cá nhân của bạn
              </p>
            </div>
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 shadow-md">
              <ShieldCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>
          </header>
        </section>

        <Separator className="bg-gray-100 dark:bg-gray-800" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6">
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
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700 transition-all duration-300 hover:shadow-sm focus:shadow-md"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </header>
            </motion.section>

            <Separator className="bg-gray-100 dark:bg-gray-800" />

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-6">
              <header className="flex items-center justify-between">
                <div className="items-center justify-center">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Mật khẩu mới</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mật khẩu mới phải đáp ứng các yêu cầu bảo mật
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-4">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập mật khẩu mới"
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700 transition-all duration-300 hover:shadow-sm focus:shadow-md"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setPasswordValue(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {passwordValue && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Độ mạnh mật khẩu:</span>
                        <span className={`text-xs font-medium ${passwordStrength > 60 ? 'text-green-600 dark:text-green-400' : passwordStrength > 40 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                          {getStrengthLabel()}
                        </span>
                      </div>
                      <Progress value={passwordStrength} className="h-1.5 w-full bg-gray-100 dark:bg-gray-800">
                        <div className={`h-full ${getStrengthColor()} transition-all duration-500 rounded-full`} style={{ width: `${passwordStrength}%` }} />
                      </Progress>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {passwordRequirements.map((req) => (
                          <div key={req.id} className="flex items-center">
                            {requirements[req.id] ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500 dark:text-green-400 mr-2" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 mr-2" />
                            )}
                            <span className={`text-xs ${requirements[req.id] ? 'text-green-700 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'}`}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </header>
            </motion.section>

            <Separator className="bg-gray-100 dark:bg-gray-800" />

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-6">
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
                    name="newPasswordConfirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            placeholder="Nhập lại mật khẩu mới"
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800 focus:border-green-300 dark:focus:border-green-700 transition-all duration-300 hover:shadow-sm focus:shadow-md"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </header>
            </motion.section>

            <Separator className="bg-gray-100 dark:bg-gray-800" />

            <motion.div
              className="flex justify-end space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect group relative overflow-hidden">
                <div className="relative z-10 flex items-center">
                  <Save className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                  {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                </div>
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-20 bg-white" />
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}

