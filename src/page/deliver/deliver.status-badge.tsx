import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/data/enum";
import { AlertCircle, CheckCircle, Clock, Truck } from "lucide-react";
import React from "react";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<OrderStatus, { className: string; icon: React.ReactElement; text: string }> = {
    [OrderStatus.PROCESSING]: {
      className: "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 shadow-sm",
      icon: <Clock className="w-3 h-3 mr-1" />,
      text: "Đang xử lý"
    },
    [OrderStatus.SHIPPED]: {
      className: "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200 shadow-sm",
      icon: <Truck className="w-3 h-3 mr-1" />,
      text: "Đang giao hàng"
    },
    [OrderStatus.DELIVERED]: {
      className: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200 shadow-sm",
      icon: <CheckCircle className="w-3 h-3 mr-1" />,
      text: "Đã giao hàng"
    },
    [OrderStatus.PENDING]: {
      className: "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200 shadow-sm",
      icon: <Clock className="w-3 h-3 mr-1" />,
      text: "Chờ xử lý"
    },
    [OrderStatus.CANCELLED]: {
      className: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200 shadow-sm",
      icon: <AlertCircle className="w-3 h-3 mr-1" />,
      text: "Đã hủy"
    },
    [OrderStatus.COMPLETED]: {
      className: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm",
      icon: <CheckCircle className="w-3 h-3 mr-1" />,
      text: "Hoàn thành"
    }
  };

  const config = statusConfig[status];
  if (!config) return null;

  return (
    <Badge className={`${config.className} font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:shadow-md`}>
      <span className="flex items-center">
        {config.icon}
        {config.text}
      </span>
    </Badge>
  );
} 