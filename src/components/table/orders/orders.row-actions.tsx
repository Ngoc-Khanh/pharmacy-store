import { useOrdersDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@/data/enum";
import { OrderAdmin } from "@/data/interfaces";
import { Row } from "@tanstack/react-table";
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  FileText,
  MoreHorizontal,
  PackageCheck,
  Trash
} from "lucide-react";

interface OrderRowActionsProps {
  row: Row<OrderAdmin>;
}

export function OrderRowActions({ row }: OrderRowActionsProps) {
  const { setOpen, setCurrentOrder } = useOrdersDialog();
  const order = row.original;
  const orderStatus = order.status as OrderStatus;

  // Check if order can be confirmed (only PENDING orders)
  const canConfirm = orderStatus === OrderStatus.PENDING;

  // Check if order can be marked as delivered (only SHIPPED or PROCESSING orders)
  const canDeliver = orderStatus === OrderStatus.SHIPPED || orderStatus === OrderStatus.PROCESSING;

  // Check if order can be cancelled (not CANCELLED, DELIVERED or COMPLETED)
  const canCancel = orderStatus !== OrderStatus.CANCELLED &&
    orderStatus !== OrderStatus.DELIVERED &&
    orderStatus !== OrderStatus.COMPLETED;

  const handleViewDetails = () => {
    setCurrentOrder(order);
    setOpen("view");
  };

  const handleConfirmOrder = () => {
    setCurrentOrder(order);
    setOpen("confirm");
  };

  const handleCompleteOrder = () => {
    setCurrentOrder(order);
    setOpen("complete");
  };

  const handleCancelOrder = () => {
    setCurrentOrder(order);
    setOpen("cancel");
  };

  return (
    <div className="flex justify-end items-center gap-1">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-full data-[state=open]:bg-teal-50 dark:data-[state=open]:bg-teal-900/20 data-[state=open]:text-teal-500 dark:data-[state=open]:text-teal-400 transition-all duration-200"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Mở menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px] bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-800/30 shadow-lg rounded-lg overflow-hidden p-1.5"
          sideOffset={5}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-0.5"
          >
            <DropdownMenuItem
              onClick={handleViewDetails}
              className="cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-teal-50 dark:hover:bg-teal-900/20 text-slate-700 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-300 rounded-md group transition-colors"
            >
              <div className="rounded-full bg-teal-50 dark:bg-teal-900/30 p-1 group-hover:bg-teal-100 dark:group-hover:bg-teal-800/30 transition-colors">
                <Eye className="h-3.5 w-3.5 text-teal-500 dark:text-teal-400" />
              </div>
              <span>Xem chi tiết</span>
            </DropdownMenuItem>

            {canConfirm && (
              <DropdownMenuItem
                onClick={handleConfirmOrder}
                className="cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 rounded-md group transition-colors"
              >
                <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 p-1 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 transition-colors">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                </div>
                <span>Xác nhận đơn</span>
              </DropdownMenuItem>
            )}

            {canDeliver && (
              <DropdownMenuItem
                onClick={handleCompleteOrder}
                className="cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 text-slate-700 hover:text-green-600 dark:text-slate-300 dark:hover:text-green-300 rounded-md group transition-colors"
              >
                <div className="rounded-full bg-green-50 dark:bg-green-900/30 p-1 group-hover:bg-green-100 dark:group-hover:bg-green-800/30 transition-colors">
                  <PackageCheck className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
                </div>
                <span>Hoàn thành đơn</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                // Generate invoice
              }}
              className="cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300 rounded-md group transition-colors"
            >
              <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-1 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/30 transition-colors">
                <FileText className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
              </div>
              <span>Xuất hóa đơn</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1.5 bg-teal-100/70 dark:bg-teal-800/30" />

            {canCancel && (
              <DropdownMenuItem
                onClick={handleCancelOrder}
                className="cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-700 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300 rounded-md group transition-colors"
              >
                <div className="rounded-full bg-rose-50 dark:bg-rose-900/30 p-1 group-hover:bg-rose-100 dark:group-hover:bg-rose-800/30 transition-colors">
                  <AlertCircle className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
                </div>
                <span>Hủy đơn hàng</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                setCurrentOrder(order);
                setOpen("delete");
              }}
              className="cursor-pointer flex items-center gap-2 py-1.5 px-2 text-sm hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-700 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300 rounded-md group transition-colors"
            >
              <div className="rounded-full bg-rose-50 dark:bg-rose-900/30 p-1 group-hover:bg-rose-100 dark:group-hover:bg-rose-800/30 transition-colors">
                <Trash className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
              </div>
              <span>Xóa đơn hàng</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}