import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface StepFiveSuccessHeaderProps {
  invoiceNumber?: string;
  orderId: string;
}

export const StepFiveSuccessHeader = ({ invoiceNumber, orderId }: StepFiveSuccessHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full mb-6 shadow-xl"
    >
      <CheckCircle className="w-12 h-12 text-teal-600 dark:text-teal-400" />
    </motion.div>

    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4"
    >
      Đặt hàng thành công!
    </motion.h2>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="space-y-3"
    >
      <p className="text-muted-foreground text-xl">
        Đơn hàng của bạn đã được xác nhận và đang được xử lý
      </p>
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          {invoiceNumber ? 'Mã hóa đơn:' : 'Mã đơn hàng:'}
        </span>
        <Badge 
          variant="outline" 
          className="font-mono text-base px-4 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50 border-teal-200 dark:border-teal-700"
        >
          #{invoiceNumber || orderId}
        </Badge>
      </div>
    </motion.div>
  </motion.div>
) 