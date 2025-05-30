import { userAtom } from "@/atoms/auth.atom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { routes } from "@/config";
import AuthLayout from "@/layouts/auth.layout";
import { AuthAPI } from "@/services/api/auth.api";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function VerifyAccountPage() {
  const user = useAtomValue(userAtom);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [canResend, setCanResend] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCountdown = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(60);
    setCanResend(false);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError(null);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (!/^\d*$/.test(pasteData.join(""))) return;
    const newOtp = [...otp];
    for (let i = 0; i < Math.min(6, pasteData.length); i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    const lastFilledIndex = Math.min(5, pasteData.length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
    setActiveInput(lastFilledIndex);
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      setError(null);
      await AuthAPI.fetchResendVerifyAccount();
      startCountdown();
      setError("Mã xác minh mới đã được gửi đến email của bạn");
      toast.success("Mã xác minh mới đã được gửi đến email của bạn");
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
      setActiveInput(0);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Không thể gửi lại mã xác minh. Vui lòng thử lại sau.";
      setError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async () => {
    if (otp.some(digit => digit === "")) {
      setError("Vui lòng nhập đầy đủ mã 6 chữ số");
      return;
    }
    
    try {
      setIsVerifying(true);
      setError(null);
      const verificationCode = otp.join("");
      await AuthAPI.fetchVerifyAccount({ verificationCode });
      toast.success("Tài khoản đã được xác minh thành công");
      window.location.href = routes.store.root;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Mã xác minh không hợp lệ. Vui lòng thử lại.";
      setError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <AuthLayout title={`Xác minh tài khoản ${user?.email}`}>
      <Card className="shadow-md border-opacity-50">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Xác minh tài khoản</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Nhập mã 6 chữ số đã được gửi đến email của bạn
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.97 }}
                className="w-12"
              >
                <Input
                  ref={(el) => el && (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`h-14 text-center text-xl font-semibold ${activeInput === index
                    ? "border-green-600 ring-2 ring-green-600/50 dark:border-green-500 dark:ring-green-500/50" 
                    : ""
                  }`}
                  autoComplete="one-time-code"
                />
              </motion.div>
            ))}
          </div>
          
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center text-sm ${error.includes("gửi") ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                }`}
            >
              {error}
            </motion.p>
          )}
          
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Không nhận được mã?{" "}
            {canResend ? (
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi lại mã"
                )}
              </Button>
            ) : (
              <span>
                Gửi lại mã trong <span className="font-semibold">{countdown}s</span>
              </span>
            )}
          </p>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="default"
            className="w-full font-semibold bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600" 
            size="lg"
            onClick={handleVerify}
            disabled={isVerifying || otp.some(digit => digit === "")}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xác minh...
              </>
            ) : (
              <>
                Xác minh tài khoản
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
