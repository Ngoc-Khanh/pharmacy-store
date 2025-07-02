import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, Eye, ShoppingCart, Truck } from "lucide-react";

export const StepFourNextSteps = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2 }}
  >
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
            Bước tiếp theo
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800/50 hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Eye className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-300">
              Kiểm tra giỏ hàng
            </h4>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
              Xem lại và chỉnh sửa số lượng theo nhu cầu
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/50 hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <ShoppingCart className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <h4 className="font-semibold text-sm mb-2 text-amber-700 dark:text-amber-300">
              Đặt hàng
            </h4>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
              Hoàn tất thông tin và thanh toán an toàn
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/50 hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Truck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h4 className="font-semibold text-sm mb-2 text-emerald-700 dark:text-emerald-300">
              Nhận hàng
            </h4>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
              Giao hàng tận nơi trong 1-2 ngày làm việc
            </p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
) 