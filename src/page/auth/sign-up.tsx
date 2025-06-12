import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CheckCircle2, Loader2, Lock, Mail, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { PasswordInput } from "@/components/custom/password-input";
import { PhoneInput } from "@/components/custom/phone-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routeNames, routes, siteConfig } from "@/config";
import { RegistrationForm, registrationSchema } from "@/data/schemas";
import AuthLayout from "@/layouts/auth.layout";
import { AuthAPI } from "@/services/api/auth.api";

const passwordRequirements = [
  { id: "length", label: "Ít nhất 8 ký tự", regex: /.{8,}/, weight: 2 },
  { id: "lowercase", label: "Ít nhất 1 chữ cái thường", regex: /[a-z]/, weight: 1 },
  { id: "uppercase", label: "Ít nhất 1 chữ cái in hoa", regex: /[A-Z]/, weight: 1 },
  { id: "digit", label: "Ít nhất 1 chữ số", regex: /\d/, weight: 1 },
  { id: "special", label: "Ít nhất 1 ký tự đặc biệt (@$!%*?&)", regex: /[@$!%*?&]/, weight: 2 },
  { id: "noSpaces", label: "Không chứa khoảng trắng", regex: /^\S*$/, weight: 1 },
];

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirements, setRequirements] = useState<{ [key: string]: boolean }>({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    special: false,
    noSpaces: false,
  });

  const registerMutation = useMutation({
    mutationFn: AuthAPI.fetchRegister,
    onSuccess: (res) => {
      localStorage.setItem(siteConfig.auth.jwt_key, res.accessToken);
      setIsLoading(false);
      toast.success("Đăng ký thành công!", { description: "Đang chuyển hướng..." });
      setTimeout(() => {
        window.location.href = routes.auth.verifyAccount(res.user.id);
      }, 1000);
    },
    onError: (err: AxiosError) => {
      console.log(err);
      if (err.response?.status === 409) {
        toast.error("Email hoặc tên đăng nhập đã tồn tại!", { description: "Vui lòng thử lại với thông tin khác..." });
      } else {
        toast.error(err.message, { description: "Đăng ký thất bại!" });
      }
      setIsLoading(false);
    }
  });

  // Calculate password strength and validate requirements
  useEffect(() => {
    if (!passwordValue) {
      setPasswordStrength(0);
      setRequirements({
        length: false,
        lowercase: false,
        uppercase: false,
        digit: false,
        special: false,
        noSpaces: false,
      });
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

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: RegistrationForm) => {
    // Check if password meets all requirements
    const allRequirementsMet = Object.values(requirements).every(req => req);

    if (!allRequirementsMet) {
      toast.error("Mật khẩu không đủ yêu cầu!", {
        description: "Vui lòng đảm bảo mật khẩu đáp ứng tất cả các yêu cầu."
      });
      return;
    }

    setIsLoading(true);
    console.log(data);
    registerMutation.mutate(data);
  };

  return (
    <AuthLayout title={routeNames[routes.auth.register]} useModernLayout={true}>
      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        <div className="text-center mb-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Đăng ký tài khoản</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Tạo tài khoản để truy cập vào Pharmacy Store
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Họ</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                        <Input
                          {...field}
                          placeholder="Nguyễn"
                          className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Tên</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                        <Input
                          {...field}
                          placeholder="Văn A"
                          className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
            </div>

            {/* Username field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Tên đăng nhập</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                      <Input
                        {...field}
                        placeholder="username"
                        className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="example@email.com"
                        className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Phone field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Số điện thoại</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      placeholder="+84123456789"
                      defaultCountry="VN"
                      international
                      className="h-10 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Password fields */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                        <PasswordInput
                          {...field}
                          placeholder="********"
                          className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                          onChange={(e) => {
                            field.onChange(e);
                            setPasswordValue(e.target.value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />

                    {/* Password requirements */}
                    {passwordValue && (
                      <div className="mt-3 space-y-3">
                        {/* Progress bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Độ mạnh mật khẩu</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {Math.round(passwordStrength)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${passwordStrength >= 100 ? 'bg-green-500' :
                                  passwordStrength >= 67 ? 'bg-blue-500' :
                                    passwordStrength >= 34 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                        </div>

                        {/* Requirements checklist */}
                        <div className="space-y-2">
                          {passwordRequirements.map((req) => (
                            <div key={req.id} className="flex items-center gap-2">
                              {requirements[req.id] ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                              )}
                              <span className={`text-xs ${requirements[req.id]
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                {req.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700 dark:text-gray-300 text-sm">Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500 z-10" />
                        <PasswordInput
                          {...field}
                          placeholder="********"
                          className="h-10 pl-9 border-gray-200 dark:border-gray-800 bg-transparent dark:bg-transparent focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 rounded-lg text-gray-800 dark:text-gray-200 text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />
            </div>

            {/* Agreement text - optional */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <Link to="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400">
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link to="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400">
                Chính sách bảo mật
              </Link>{" "}
              của chúng tôi.
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-md font-medium transition-all duration-200 ease-in-out transform hover:translate-y-[-1px] hover:shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading || !Object.values(requirements).every(req => req)}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Đăng ký"
              )}
            </Button>

            {/* Login link */}
            <div className="text-center text-xs text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{" "}
              <Link to={routes.auth.login} className="font-medium text-green-600 hover:text-green-500 dark:text-green-500 dark:hover:text-green-400 hover:underline transition-colors">
                Đăng nhập
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
