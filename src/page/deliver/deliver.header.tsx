import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut, RefreshCw, Truck } from "lucide-react";

interface DeliverHeaderProps {
  onLogout: () => void;
  onRefresh: () => void;
}

export function DeliverHeader({ onLogout, onRefresh }: DeliverHeaderProps) {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-green-100 dark:border-green-900/50 shadow-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Quản lý giao hàng
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Quản lý và cập nhật trạng thái các đơn hàng
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Button
              variant="outline"
              onClick={onRefresh}
              className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-xl px-4 py-2 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
            <Button 
              variant="outline" 
              className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl px-4 py-2 transition-all duration-200"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 