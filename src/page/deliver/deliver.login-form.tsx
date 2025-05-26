import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Shield, Truck, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState(
    import.meta.env.DEV ? "deliver" : ""
  );
  const [password, setPassword] = useState(
    import.meta.env.DEV ? "Deliver@123": ""
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple validation
    if (username === "deliver" && password === "Deliver@123") {
      toast.success("Đăng nhập thành công!", {
        description: "Chào mừng bạn đến với hệ thống giao hàng"
      });
      onLogin();
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      toast.error("Đăng nhập thất bại!", {
        description: "Vui lòng kiểm tra lại thông tin đăng nhập"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50/30 dark:from-green-950/60 dark:via-emerald-950/40 dark:to-teal-950/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.05),transparent_40%)]" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-green-200/20 to-emerald-300/15 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-teal-200/20 to-cyan-300/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-8 pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center justify-center mb-4"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Hệ thống giao hàng
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
              Đăng nhập để quản lý đơn hàng và giao hàng
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-2"
            >
              <label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Tên đăng nhập
              </label>
              <Input 
                id="username" 
                placeholder="Nhập tên đăng nhập" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 rounded-xl transition-colors"
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
              />
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="space-y-2"
            >
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Mật khẩu
              </label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Nhập mật khẩu" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 rounded-xl transition-colors"
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
              />
            </motion.div>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button 
              className="w-full h-12 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              onClick={handleLogin}
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
} 