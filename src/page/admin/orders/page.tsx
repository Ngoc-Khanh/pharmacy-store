import OrdersDialogs from "@/components/dialogs/orders";
import OrdersDataTable, { ordersColumns } from "@/components/table/orders";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderAPI } from "@/services/api/order.api";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpDown, Calendar, Clock, FileSpreadsheet, ShoppingCart } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function AdminOrdersPage() {
  const { data: ordersList, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderAPI.OrderList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const ordersData = ordersList?.data || [];

  // Get today's orders count
  const todayOrders = ordersData.filter(order => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.orders]} | {siteConfig.name}</title>
      </Helmet>

      <div className="flex-1 space-y-6 p-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-xl border border-indigo-100 dark:border-indigo-800/20 shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-100 dark:bg-indigo-800/30 p-2.5 rounded-lg">
              <ShoppingCart size={28} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-indigo-800 dark:text-indigo-300">Quản lý đơn hàng</h2>
          </div>
          <p className="text-indigo-600/90 dark:text-indigo-400/80 ml-[52px]">
            Xem và quản lý tất cả đơn hàng từ khách hàng tại Pharmacity Store
          </p>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/20 shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng đơn hàng</h3>
              <ArrowUpDown size={16} className="text-indigo-500" />
            </div>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {isLoading ? "..." : ordersData.length}
            </p>
            <div className="mt-3 text-xs text-indigo-600/80 dark:text-indigo-500/80 font-medium flex items-center gap-1">
              <ArrowDown size={14} className="text-emerald-500" />
              Đã cập nhật
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-purple-100 dark:border-purple-800/20 shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Đơn hàng hôm nay</h3>
              <Calendar size={16} className="text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {isLoading ? "..." : todayOrders.length}
            </p>
            <div className="mt-3 text-xs text-purple-600/80 dark:text-purple-500/80 font-medium flex items-center gap-1">
              <Clock size={14} className="text-purple-500" />
              Cập nhật theo thời gian thực
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-blue-100 dark:border-blue-800/20 shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Báo cáo đơn hàng</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">Xuất báo cáo</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800/30 font-medium transition-all shadow-sm w-full md:w-auto justify-center"
            >
              <FileSpreadsheet size={18} />
              <span>Tải xuống</span>
            </motion.button>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </motion.div>
          ) : (
            <OrdersDataTable columns={ordersColumns} data={ordersData} />
          )}
        </div>
      </div>
      <OrdersDialogs />
    </div>
  );
}
