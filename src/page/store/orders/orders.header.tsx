import { Package } from "lucide-react";
import { motion } from "framer-motion";

export function OrdersHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col space-y-3"
    >
      <div className="inline-flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
          <Package className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Đơn hàng của tôi
        </h1>
      </div>
      <p className="text-muted-foreground max-w-2xl pl-1">
        Theo dõi và quản lý tất cả đơn hàng của bạn. Bạn có thể xem chi tiết, theo dõi trạng thái và lịch sử các đơn hàng tại đây.
      </p>
    </motion.div>
  );
} 