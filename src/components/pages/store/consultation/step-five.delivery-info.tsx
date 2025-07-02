import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";

export const StepFiveDeliveryInfo = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2 }}
  >
    <Card className="border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
            <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            Thông tin giao hàng
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/50 hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h4 className="font-semibold text-base mb-2 text-amber-700 dark:text-amber-300">
              Chuẩn bị hàng
            </h4>
            <p className="text-sm text-amber-600/80 dark:text-amber-400/80">
              1-2 giờ làm việc
            </p>
            <div className="mt-3 w-full bg-amber-200 dark:bg-amber-800 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full w-full"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800/50 hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-base mb-2 text-blue-700 dark:text-blue-300">
              Đang giao hàng
            </h4>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
              1-2 ngày làm việc
            </p>
            <div className="mt-3 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/50 hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h4 className="font-semibold text-base mb-2 text-emerald-700 dark:text-emerald-300">
              Giao thành công
            </h4>
            <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">
              Dự kiến 2-3 ngày
            </p>
            <div className="mt-3 w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full w-0"></div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg mt-1">
              <Package className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h5 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">
                📱 Thông báo giao hàng
              </h5>
              <p className="text-sm text-teal-700 dark:text-teal-300">
                Bạn sẽ nhận được <strong>SMS và Email</strong> thông báo khi:
              </p>
              <ul className="text-sm text-teal-600 dark:text-teal-400 mt-2 space-y-1">
                <li>• Đơn hàng được xác nhận và chuẩn bị</li>
                <li>• Đơn hàng được bàn giao cho đối tác vận chuyển</li>
                <li>• Đơn hàng đã được giao thành công</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
) 