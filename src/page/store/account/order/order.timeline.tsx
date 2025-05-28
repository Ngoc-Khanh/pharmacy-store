import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/data/enum";

import { motion } from 'framer-motion';
import { CheckCircle2Icon, ClockIcon, MapPinIcon, Package, Truck } from "lucide-react";

interface OrderTimelineProps {
  status: OrderStatus;
}

export const OrderTimeline = ({ status }: OrderTimelineProps) => {
  const steps = [
    {
      status: OrderStatus.PENDING,
      label: "Đã đặt hàng",
      icon: Package,
      color: "from-green-500 to-emerald-400",
      darkColor: "from-green-400 to-emerald-500",
      bgLight: "bg-green-50",
      bgDark: "bg-green-900/20"
    },
    {
      status: OrderStatus.PROCESSING,
      label: "Đang xử lý",
      icon: ClockIcon,
      color: "from-blue-500 to-cyan-400",
      darkColor: "from-blue-400 to-cyan-500",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-900/20"
    },
    {
      status: OrderStatus.SHIPPED,
      label: "Đang giao hàng",
      icon: Truck,
      color: "from-indigo-500 to-purple-400",
      darkColor: "from-indigo-400 to-purple-500",
      bgLight: "bg-indigo-50",
      bgDark: "bg-indigo-900/20"
    },
    {
      status: OrderStatus.DELIVERED,
      label: "Đã giao hàng",
      icon: MapPinIcon,
      color: "from-teal-500 to-cyan-400",
      darkColor: "from-teal-400 to-cyan-500",
      bgLight: "bg-teal-50",
      bgDark: "bg-teal-900/20"
    },
    {
      status: OrderStatus.COMPLETED,
      label: "Hoàn thành",
      icon: CheckCircle2Icon,
      color: "from-green-500 to-emerald-400",
      darkColor: "from-green-400 to-emerald-500",
      bgLight: "bg-green-50",
      bgDark: "bg-green-900/20"
    },
  ];

  // Bỏ qua nếu đơn hàng đã hủy
  if (status === OrderStatus.CANCELLED) {
    return (
      <div className="flex items-center justify-center py-8">
        <Badge variant="destructive" className="px-6 py-2 rounded-full text-sm shadow-md flex items-center gap-2">
          <Package className="h-4 w-4" /> Đơn hàng đã bị hủy
        </Badge>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((step) => step.status === status);

  return (
    <div className="py-10 px-4 md:px-6 rounded-xl overflow-hidden relative bg-gradient-to-br from-green-50/70 to-emerald-50/40 dark:from-green-950/20 dark:to-emerald-950/10 border border-green-100/50 dark:border-green-900/30 shadow-sm">
      {/* Đường ngang nối các bước */}
      <div className="absolute top-[74px] left-[10%] right-[10%] md:left-[15%] md:right-[15%] h-1 bg-gray-200 dark:bg-gray-700 rounded-full z-0 mx-auto"></div>

      {/* Đường ngang đã hoàn thành */}
      <motion.div
        className="absolute top-[74px] left-[10%] md:left-[15%] h-1 bg-gradient-to-r from-green-500 to-green-400 dark:from-green-400 dark:to-green-500 rounded-full z-0"
        initial={{ width: 0 }}
        animate={{
          width: currentStepIndex >= 0 ?
            `${currentStepIndex / (steps.length - 1) * 80}%` : 0
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Các bước của quy trình */}
      <div className="relative z-10 flex justify-between max-w-4xl mx-auto px-2">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <motion.div
              key={step.status}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.div
                className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full ${isActive ?
                    `bg-gradient-to-br ${step.color} dark:${step.darkColor}` :
                    "bg-white dark:bg-gray-800"
                  } shadow-md ${isActive ?
                    "text-white ring-4 ring-white dark:ring-gray-800" :
                    "text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-gray-700"
                  } ${isCurrent ?
                    "ring-offset-2 ring-offset-green-50 dark:ring-offset-gray-900" : ""
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 0.3, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                <StepIcon className="w-7 h-7 md:w-8 md:h-8" />
              </motion.div>

              <div className="h-2"></div>

              <motion.div
                className={`rounded-full ${isActive ? `${step.bgLight} dark:${step.bgDark}` : 'bg-transparent'} px-3 py-1`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
              >
                <p className={`text-xs md:text-sm font-medium text-center ${isActive ?
                    "text-gray-800 dark:text-gray-100" :
                    "text-gray-500 dark:text-gray-400"
                  }`}>
                  {step.label}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile scrollbar hint */}
      <div className="mt-6 flex justify-center md:hidden">
        <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};