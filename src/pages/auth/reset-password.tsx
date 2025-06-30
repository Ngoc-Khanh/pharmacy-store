import { PasswordInput } from "@/components/custom/password-input";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config";
import { ResetPasswordDto } from "@/data/dto";
import { ResetPasswordForm, resetPasswordSchema } from "@/data/schemas";
import { AuthLayout } from "@/layouts";
import { AuthAPI } from "@/services/v1";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, BriefcaseMedical, CheckCircle, CheckCircle2, Loader2, Lock, ShieldCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const passwordRequirements = [
  { id: "length", label: "Ít nhất 8 ký tự", regex: /.{8,}/ },
  { id: "lowercase", label: "Ít nhất 1 chữ cái thường", regex: /[a-z]/ },
  { id: "uppercase", label: "Ít nhất 1 chữ cái in hoa", regex: /[A-Z]/ },
  { id: "digit", label: "Ít nhất 1 chữ số", regex: /\d/ },
  { id: "special", label: "Ít nhất 1 ký tự đặc biệt", regex: /[@$!%*?&]/ },
];

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirements, setRequirements] = useState<{ [key: string]: boolean }>({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    special: false,
  });

  const {
    data: tokenData,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useQuery({
    queryKey: ["checkResetToken", token],
    queryFn: () => AuthAPI.checkTokenResetPassword(token!),
    enabled: !!token,
    retry: false,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: AuthAPI.resetPassword,
    onSuccess: () => {
      setIsLoading(false);
      setResetSuccess(true);
      toast.success("Mật khẩu đã được đặt lại thành công!", {
        description: "Bạn có thể đăng nhập với mật khẩu mới.",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
      setIsLoading(false);
      if (err.response?.status === 400) {
        toast.error("Token không hợp lệ hoặc đã hết hạn!", {
          description: "Vui lòng yêu cầu đặt lại mật khẩu mới.",
          icon: <XCircle className="h-5 w-5 text-red-500" />,
        });
      } else {
        toast.error("Có lỗi xảy ra!", {
          description: "Vui lòng thử lại sau.",
          icon: <XCircle className="h-5 w-5 text-red-500" />,
        });
      }
    },
  });

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      resetToken: token || "",
      password: "",
      passwordConfirmation: "",
    },
  });

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

  const getStrengthLabel = () => {
    if (passwordStrength <= 20) return "Rất yếu";
    if (passwordStrength <= 40) return "Yếu";
    if (passwordStrength <= 60) return "Trung bình";
    if (passwordStrength <= 80) return "Mạnh";
    return "Rất mạnh";
  };

  const onSubmit = (data: ResetPasswordForm) => {
    setIsLoading(true);
    const resetPasswordData: ResetPasswordDto = {
      resetToken: token!,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    };
    resetPasswordMutation.mutate(resetPasswordData);
  };

  if (!token) {
    return (
      <AuthLayout title={"Đặt lại mật khẩu"}>
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col items-center gap-6">
            <Link
              to={routes.store.root}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/60 dark:to-orange-900/60 text-red-600 dark:text-red-400 shadow-md hover:shadow-lg transition-all duration-300">
                <XCircle className="size-6" />
              </div>
              <span className="sr-only">Pharmacity Inc.</span>
            </Link>

            <div className="text-center space-y-4">
              <TextAnimate
                animation="blurInUp"
                by="character"
                className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400"
              >
                Liên kết không hợp lệ
              </TextAnimate>
              
              <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Liên kết đặt lại mật khẩu không hợp lệ. Vui lòng yêu cầu đặt lại mật khẩu mới.
              </div>
            </div>

            <div className="space-y-4 w-full max-w-sm">
              <Link to={routes.auth.forgotPassword}>
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium"
                >
                  Yêu cầu đặt lại mật khẩu
                </Button>
              </Link>
              
              <Link to={routes.auth.login}>
                <Button
                  variant="ghost"
                  className="w-full text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isTokenLoading) {
    return (
      <AuthLayout title={"Đặt lại mật khẩu"}>
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/60 dark:to-teal-900/60 text-green-600 dark:text-green-400 shadow-md">
              <Loader2 className="size-6 animate-spin" />
            </div>

            <div className="text-center space-y-4">
              <TextAnimate
                animation="blurInUp"
                by="character"
                className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400"
              >
                Đang xác thực...
              </TextAnimate>
              
              <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Đang kiểm tra tính hợp lệ của liên kết đặt lại mật khẩu...
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isTokenError) {
    return (
      <AuthLayout title={"Đặt lại mật khẩu"}>
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col items-center gap-6">
            <Link
              to={routes.store.root}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/60 dark:to-orange-900/60 text-red-600 dark:text-red-400 shadow-md hover:shadow-lg transition-all duration-300">
                <XCircle className="size-6" />
              </div>
              <span className="sr-only">Pharmacity Inc.</span>
            </Link>

            <div className="text-center space-y-4">
              <TextAnimate
                animation="blurInUp"
                by="character"
                className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400"
              >
                Token không hợp lệ
              </TextAnimate>
              
              <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. 
                Vui lòng yêu cầu đặt lại mật khẩu mới.
              </div>
            </div>

            <div className="space-y-4 w-full max-w-sm">
              <Link to={routes.auth.forgotPassword}>
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium"
                >
                  Yêu cầu đặt lại mật khẩu
                </Button>
              </Link>
              
              <Link to={routes.auth.login}>
                <Button
                  variant="ghost"
                  className="w-full text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (resetSuccess) {
    return (
      <AuthLayout title={"Đặt lại mật khẩu thành công"}>
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col items-center gap-6">
            <Link
              to={routes.store.root}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/60 dark:to-teal-900/60 text-green-600 dark:text-green-400 shadow-md hover:shadow-lg transition-all duration-300">
                <BriefcaseMedical className="size-6" />
              </div>
              <span className="sr-only">Pharmacity Inc.</span>
            </Link>

            <div className="text-center space-y-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/60 dark:to-teal-900/60 text-green-600 dark:text-green-400 shadow-lg mx-auto"
              >
                <CheckCircle className="size-8" />
              </motion.div>

              <TextAnimate
                animation="blurInUp"
                by="character"
                className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400"
              >
                Đặt lại mật khẩu thành công!
              </TextAnimate>
              
              <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Mật khẩu của bạn đã được đặt lại thành công. 
                Bạn có thể đăng nhập với mật khẩu mới ngay bây giờ.
              </div>
            </div>

            <div className="space-y-4 w-full max-w-sm">
              <Link to={routes.auth.login}>
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium"
                >
                  Đăng nhập ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Main reset password form
  return (
    <AuthLayout title={"Đặt lại mật khẩu"}>
      <div className="flex flex-col gap-6 relative z-10">
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
          
          <Badge variant="outline" className="border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 px-3 py-1 text-sm rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
            <motion.span
              className="flex items-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}>
              <ShieldCheck className="h-3.5 w-3.5 mr-2 text-green-600 dark:text-green-400" />
              Bảo mật tài khoản
            </motion.span>
          </Badge>
          
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400"
          >
            Đặt lại mật khẩu
          </TextAnimate>
          
          <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            {tokenData?.email && (
              <p className="text-sm mb-2">
                Đặt lại mật khẩu cho: <span className="font-semibold text-green-600 dark:text-green-400">{tokenData.email}</span>
              </p>
            )}
            Tạo mật khẩu mạnh để bảo vệ tài khoản của bạn
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm">
              {/* New Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Mật khẩu mới
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <PasswordInput
                          {...field}
                          placeholder="Nhập mật khẩu mới"
                          className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-green-400 dark:focus:border-green-600 rounded-lg pl-10"
                          onChange={(e) => {
                            field.onChange(e);
                            setPasswordValue(e.target.value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Strength Indicator */}
              {passwordValue && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Độ mạnh mật khẩu:</span>
                    <span className={`text-xs font-medium ${passwordStrength > 60 ? 'text-green-600 dark:text-green-400' : passwordStrength > 40 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {getStrengthLabel()}
                    </span>
                  </div>
                  <Progress value={passwordStrength} className="h-1.5 w-full bg-gray-100 dark:bg-gray-800">
                    <div className={`h-full ${getStrengthColor()} transition-all duration-500 rounded-full`} style={{ width: `${passwordStrength}%` }} />
                  </Progress>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                </motion.div>
              )}

              <Separator className="bg-gray-100 dark:bg-gray-800" />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Xác nhận mật khẩu mới
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <PasswordInput
                          {...field}
                          placeholder="Nhập lại mật khẩu mới"
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
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Loader2 className="animate-spin" />
                    Đang đặt lại mật khẩu...
                  </div>
                ) : (
                  <span className="text-white text-base">Đặt lại mật khẩu</span>
                )}
              </Button>

              <div className="flex items-center justify-center pt-2">
                <Link
                  to={routes.auth.login}
                  className="text-green-600 dark:text-green-400 hover:underline underline-offset-4 hover:opacity-75 transition-all duration-200 font-medium flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Quay lại đăng nhập
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}