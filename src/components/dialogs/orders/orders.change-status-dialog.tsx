import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { OrderStatus } from "@/data/enum";
import { OrderAdmin } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { OrderAPI } from "@/services/api/order.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { AlertCircle, Banknote, Calendar, CheckCircle2, CreditCard, Package, ShoppingBag, User, XCircle } from "lucide-react";
import { memo, useState } from "react";
import { toast } from "sonner";

interface Props {
  currentOrder?: OrderAdmin;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mode: OrderStatus;
}

export const OrdersChangeStatusDialog = memo(function OrdersChangeStatusDialog({ currentOrder, open, onOpenChange, mode }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return {
          title: "Xác nhận đơn hàng",
          description: "Bạn có chắc chắn muốn xác nhận đơn hàng này?",
          confirmText: "Xác nhận đơn hàng",
          icon: <CheckCircle2 className="h-10 w-10 text-teal-500" />,
          color: "text-teal-600 dark:text-teal-400",
          bgColor: "bg-teal-50 dark:bg-teal-900/20",
          borderColor: "border-teal-100 dark:border-teal-800/30",
          iconBg: "bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/20",
          iconBorder: "border-teal-100/50 dark:border-teal-800/20",
          destructive: false,
          status: OrderStatus.PROCESSING,
        };
      case OrderStatus.CANCELLED:
        return {
          title: "Hủy đơn hàng",
          description: "Bạn có chắc chắn muốn hủy đơn hàng này? Thao tác này không thể hoàn tác.",
          confirmText: "Hủy đơn hàng",
          icon: <XCircle className="h-10 w-10 text-rose-500" />,
          color: "text-rose-600 dark:text-rose-400",
          bgColor: "bg-rose-50 dark:bg-rose-900/20",
          borderColor: "border-rose-100 dark:border-rose-800/30",
          iconBg: "bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/30 dark:to-red-900/20",
          iconBorder: "border-rose-100/50 dark:border-rose-800/20",
          destructive: true,
          status: OrderStatus.CANCELLED,
        };
      case OrderStatus.COMPLETED:
        return {
          title: "Hoàn thành đơn hàng",
          description: "Bạn có chắc chắn muốn đánh dấu đơn hàng này là đã hoàn thành?",
          confirmText: "Xác nhận hoàn thành",
          icon: <ShoppingBag className="h-10 w-10 text-green-500" />,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-100 dark:border-green-800/30",
          iconBg: "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/20",
          iconBorder: "border-green-100/50 dark:border-green-800/20",
          destructive: false,
          status: OrderStatus.COMPLETED,
        };
      default:
        return {
          title: "Thay đổi trạng thái đơn hàng",
          description: "Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này?",
          confirmText: "Xác nhận",
          icon: <AlertCircle className="h-10 w-10 text-amber-500" />,
          color: "text-amber-600 dark:text-amber-400",
          bgColor: "bg-amber-50 dark:bg-amber-900/20",
          borderColor: "border-amber-100 dark:border-amber-800/30",
          iconBg: "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/20",
          iconBorder: "border-amber-100/50 dark:border-amber-800/20",
          destructive: false,
          status: mode, // Fallback to provided mode
        };
    }
  };

  const orderStatusMutation = useMutation({
    mutationFn: async () => {
      if (!currentOrder) return null;

      // Get the actual status to send based on the mode
      const statusConfig = getStatusConfig(mode);
      const statusToSend = statusConfig.status;

      // Log for debugging
      console.log(`Changing order status to: ${statusToSend}`);

      return await OrderAPI.OrderChangeStatus(
        { status: statusToSend },
        currentOrder.id
      );
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      let successMessage = "";
      
      switch (mode) {
        case OrderStatus.PROCESSING:
          successMessage = "Đơn hàng đã được xác nhận thành công!";
          break;
        case OrderStatus.CANCELLED:
          successMessage = "Đơn hàng đã được hủy thành công!";
          break;
        case OrderStatus.COMPLETED:
          successMessage = "Đơn hàng đã được đánh dấu hoàn thành!";
          break;
        default:
          successMessage = "Đã cập nhật trạng thái đơn hàng!";
      }

      toast.success(successMessage, {
        description: `Mã đơn hàng: #${currentOrder?.id.slice(0, 8)}...`,
        duration: 5000,
      });
      
      // Refetch orders data
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Error changing order status:", error);
      toast.error("Có lỗi xảy ra khi thay đổi trạng thái đơn hàng", {
        description: "Vui lòng thử lại sau",
        duration: 5000,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleConfirm = () => {
    orderStatusMutation.mutate();
  };

  const { 
    title, 
    description, 
    confirmText, 
    icon, 
    color, 
    bgColor, 
    borderColor, 
    iconBg, 
    iconBorder, 
    destructive,
    status 
  } = getStatusConfig(mode);

  if (!currentOrder) return null;

  // Helper function to render appropriate icon in confirm button
  const renderStatusIcon = () => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return <CheckCircle2 className="h-4 w-4" />;
      case OrderStatus.COMPLETED:
        return <ShoppingBag className="h-4 w-4" />;
      case OrderStatus.CANCELLED:
        return <XCircle className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center text-center pb-2">
          <div className={`flex items-center justify-center p-3 rounded-full mb-2 ${iconBg} shadow-sm border ${iconBorder}`}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              {icon}
            </motion.div>
          </div>
          <motion.span 
            className={`text-lg font-semibold ${color}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {title}
          </motion.span>
        </div>
      }
      desc={
        <motion.div 
          className="text-center mt-0 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{description}</p>
          
          <div className={`${bgColor} p-3 rounded-lg mt-3 text-left border ${borderColor} shadow-sm`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="rounded-lg bg-white dark:bg-slate-800 p-1.5 shadow-sm">
                <Package className="h-4 w-4 text-slate-700 dark:text-slate-300" />
              </div>
              <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                Thông tin đơn hàng
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1 mt-0.5 flex-shrink-0">
                  <Package className="h-3 w-3 text-teal-500 dark:text-teal-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Mã đơn hàng
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 truncate">
                    #{currentOrder.id.slice(0, 12)}...
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1 mt-0.5 flex-shrink-0">
                  <User className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Khách hàng
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 truncate">
                    {currentOrder.user.firstname} {currentOrder.user.lastname}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1 mt-0.5 flex-shrink-0">
                  <Calendar className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Ngày đặt hàng
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {format(new Date(currentOrder.createdAt), "dd/MM/yyyy", { locale: vi })} ({format(new Date(currentOrder.createdAt), "HH:mm", { locale: vi })})
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1 mt-0.5 flex-shrink-0">
                  {currentOrder.paymentMethod === "COD" ? (
                    <Banknote className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                  ) : (
                    <CreditCard className="h-3 w-3 text-green-500 dark:text-green-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Tổng tiền
                  </span>
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                    {formatCurrency(currentOrder.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      }
      confirmText={
        <span className="flex items-center justify-center gap-1.5">
          {renderStatusIcon()}
          {confirmText}
        </span>
      }
      cancelBtnText="Hủy bỏ"
      destructive={destructive}
      handleConfirm={handleConfirm}
      isLoading={isLoading}
      className="max-w-sm"
    />
  );
});
