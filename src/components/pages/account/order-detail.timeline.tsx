import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/data/enums";
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
      hoverColor: "hover:from-green-600 hover:to-emerald-500",
      darkHoverColor: "dark:hover:from-green-500 dark:hover:to-emerald-600",
      bgLight: "bg-green-50",
      bgDark: "bg-green-900/20",
      hoverBgLight: "hover:bg-green-100",
      hoverBgDark: "dark:hover:bg-green-900/30"
    },
    {
      status: OrderStatus.PROCESSING,
      label: "Đang xử lý",
      icon: ClockIcon,
      color: "from-blue-500 to-cyan-400",
      darkColor: "from-blue-400 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-500",
      darkHoverColor: "dark:hover:from-blue-500 dark:hover:to-cyan-600",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-900/20",
      hoverBgLight: "hover:bg-blue-100",
      hoverBgDark: "dark:hover:bg-blue-900/30"
    },
    {
      status: OrderStatus.SHIPPED,
      label: "Đang giao hàng",
      icon: Truck,
      color: "from-indigo-500 to-purple-400",
      darkColor: "from-indigo-400 to-purple-500",
      hoverColor: "hover:from-indigo-600 hover:to-purple-500",
      darkHoverColor: "dark:hover:from-indigo-500 dark:hover:to-purple-600",
      bgLight: "bg-indigo-50",
      bgDark: "bg-indigo-900/20",
      hoverBgLight: "hover:bg-indigo-100",
      hoverBgDark: "dark:hover:bg-indigo-900/30"
    },
    {
      status: OrderStatus.DELIVERED,
      label: "Đã giao hàng",
      icon: MapPinIcon,
      color: "from-teal-500 to-cyan-400",
      darkColor: "from-teal-400 to-cyan-500",
      hoverColor: "hover:from-teal-600 hover:to-cyan-500",
      darkHoverColor: "dark:hover:from-teal-500 dark:hover:to-cyan-600",
      bgLight: "bg-teal-50",
      bgDark: "bg-teal-900/20",
      hoverBgLight: "hover:bg-teal-100",
      hoverBgDark: "dark:hover:bg-teal-900/30"
    },
    {
      status: OrderStatus.COMPLETED,
      label: "Hoàn thành",
      icon: CheckCircle2Icon,
      color: "from-green-500 to-emerald-400",
      darkColor: "from-green-400 to-emerald-500",
      hoverColor: "hover:from-green-600 hover:to-emerald-500",
      darkHoverColor: "dark:hover:from-green-500 dark:hover:to-emerald-600",
      bgLight: "bg-green-50",
      bgDark: "bg-green-900/20",
      hoverBgLight: "hover:bg-green-100",
      hoverBgDark: "dark:hover:bg-green-900/30"
    },
  ];

  // Bỏ qua nếu đơn hàng đã hủy
  if (status === OrderStatus.CANCELLED) {
    return (
      <div className="flex items-center justify-center py-8">
        <Badge variant="destructive" className="px-6 py-2 rounded-full text-sm shadow-md flex items-center gap-2 hover:bg-red-600 transition-colors duration-200">
          <Package className="h-4 w-4" /> Đơn hàng đã bị hủy
        </Badge>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((step) => step.status === status);

  return (
    <div className="py-6 px-4 md:px-6 relative">
      {/* Timeline horizontal line */}
      <div className="absolute top-[64px] left-1 right-0 h-1.5 bg-gray-200 dark:bg-gray-700 z-0 mx-4 md:mx-8" />

      {/* Active timeline line */}
      <motion.div
        className="absolute top-[64px] left-1 h-1.5 bg-green-500 dark:bg-green-400 z-0 mx-4 md:mx-8"
        initial={{ width: 0 }}
        animate={{
          width: currentStepIndex >= 0 ?
            `${(currentStepIndex / (steps.length - 1)) * 90}%` : 0
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Timeline steps */}
      <div className="relative z-10 flex justify-between">
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
                className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 ${isActive ?
                  `bg-gradient-to-br ${step.color} ${step.hoverColor} dark:${step.darkColor} ${step.darkHoverColor}` :
                  "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                  } shadow-md ${isActive ?
                    "text-white ring-4 ring-white dark:ring-gray-800" :
                    "text-gray-400 dark:text-gray-500 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                  } ${isCurrent ?
                    "ring-offset-2 ring-offset-green-50 dark:ring-offset-gray-900" : ""
                  } cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/20"
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
                <StepIcon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400'}`} />
              </motion.div>

              <div className="h-2"></div>

              <motion.div
                className={`rounded-full transition-all duration-300 ${isActive ? `${step.bgLight} ${step.hoverBgLight} dark:${step.bgDark} ${step.hoverBgDark}` : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800/50'} px-3 py-1 cursor-pointer`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
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
    </div>
  );
};