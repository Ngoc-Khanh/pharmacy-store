import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut, Truck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { routeNames, routes, siteConfig } from "@/config";

interface LoadingStateProps {
  onLogout: () => void;
}

export function LoadingState({ onLogout }: LoadingStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/30">
      <Helmet>
        <title>{routeNames[routes.deliver.root]} | {siteConfig.name}</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Quản lý giao hàng
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Quản lý và cập nhật trạng thái các đơn hàng</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-6"
          />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Đang tải dữ liệu</h3>
          <p className="text-gray-500 dark:text-gray-400">Vui lòng chờ trong giây lát...</p>
        </motion.div>
      </div>
    </div>
  );
} 