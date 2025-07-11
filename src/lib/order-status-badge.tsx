import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/data/enums";
import { CheckCircle2Icon, Clock, ClockIcon, Package, ShoppingBag, ShoppingBagIcon, Truck, TruckIcon } from "lucide-react";

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig = {
    [OrderStatus.PENDING]: {
      color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
      hoverColor: "hover:bg-amber-100/70 hover:text-amber-800 hover:border-amber-300 dark:hover:bg-amber-900/50 dark:hover:text-amber-300 dark:hover:border-amber-700/60",
      label: "Chờ xác nhận",
      icon: <ClockIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.PROCESSING]: {
      color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/50",
      hoverColor: "hover:bg-blue-100/70 hover:text-blue-800 hover:border-blue-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-300 dark:hover:border-blue-700/60",
      label: "Đang xử lý",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.SHIPPED]: {
      color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/50",
      hoverColor: "hover:bg-indigo-100/70 hover:text-indigo-800 hover:border-indigo-300 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-300 dark:hover:border-indigo-700/60",
      label: "Đang giao hàng",
      icon: <Truck className="w-3 h-3 mr-1" />
    },
    [OrderStatus.DELIVERED]: {
      color: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800/50",
      hoverColor: "hover:bg-teal-100/70 hover:text-teal-800 hover:border-teal-300 dark:hover:bg-teal-900/50 dark:hover:text-teal-300 dark:hover:border-teal-700/60",
      label: "Đã giao hàng",
      icon: <ShoppingBagIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.CANCELLED]: {
      color: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50",
      hoverColor: "hover:bg-rose-100/70 hover:text-rose-800 hover:border-rose-300 dark:hover:bg-rose-900/50 dark:hover:text-rose-300 dark:hover:border-rose-700/60",
      label: "Đã hủy",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.COMPLETED]: {
      color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/50",
      hoverColor: "hover:bg-green-100/70 hover:text-green-800 hover:border-green-300 dark:hover:bg-green-900/50 dark:hover:text-green-300 dark:hover:border-green-700/60",
      label: "Hoàn thành",
      icon: <CheckCircle2Icon className="w-3 h-3 mr-1" />
    },
  };

  const config = statusConfig[status];
  return (
    <Badge className={`${config.color} ${config.hoverColor} px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-sm border dark:shadow-none transition-colors duration-200 cursor-pointer`}>
      {config.icon} {config.label}
    </Badge>
  );
};

export const OrderStatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />;
    case OrderStatus.PROCESSING:
      return <Package className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
    case OrderStatus.SHIPPED:
      return <TruckIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />;
    case OrderStatus.DELIVERED:
    case OrderStatus.COMPLETED:
      return <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />;
    case OrderStatus.CANCELLED:
      return <Package className="h-5 w-5 text-rose-500 dark:text-rose-400" />;
    default:
      return <Package className="h-5 w-5 text-green-600 dark:text-green-400" />;
  }
};