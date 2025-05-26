import { motion } from "framer-motion";
import { CheckCircle, Package, Truck } from "lucide-react";

type EmptyStateType = "processing" | "shipping" | "delivered";

interface EmptyStateProps {
  type: EmptyStateType;
}

export function EmptyState({ type }: EmptyStateProps) {
  const config = {
    processing: {
      icon: <Package className="w-10 h-10 text-blue-500 dark:text-blue-400" />,
      title: "Không có đơn hàng",
      description: "Không có đơn hàng nào đang chờ giao",
      bgColor: "from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50"
    },
    shipping: {
      icon: <Truck className="w-10 h-10 text-amber-500 dark:text-amber-400" />,
      title: "Không có đơn hàng",
      description: "Không có đơn hàng nào đang giao",
      bgColor: "from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50"
    },
    delivered: {
      icon: <CheckCircle className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />,
      title: "Chưa có đơn hàng",
      description: "Chưa có đơn hàng nào đã giao",
      bgColor: "from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50"
    }
  };

  const { icon, title, description, bgColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg"
    >
      <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${bgColor} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </motion.div>
  );
} 