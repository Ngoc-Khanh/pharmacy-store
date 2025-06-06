import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStats } from "@/data/interfaces";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, DollarSign, Pill, ShoppingCart, TrendingUp, UserPlus, Users } from "lucide-react";

interface DashboardStatisticsCardProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export function DashboardStatisticsCard({ stats, isLoading }: DashboardStatisticsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Users Statistics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 dark:from-blue-950/30 dark:to-cyan-950/30 dark:border-blue-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Tổng người dùng</CardTitle>
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
              {isLoading ? <Skeleton className="h-8 w-16 bg-blue-200/50 dark:bg-blue-700/30" /> : stats.overview.totalUsers.total.toLocaleString()}
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {stats.overview.totalUsers.customers} khách hàng
              </Badge>
              <Badge variant="secondary" className="text-xs bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                {stats.overview.totalUsers.pharmacists} dược sĩ
              </Badge>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <UserPlus className="h-3 w-3 text-green-600" />
              <span className="text-green-600 dark:text-green-400">+{stats.todayStats.newCustomers} khách hàng mới hôm nay</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Medicines Statistics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Tổng thuốc</CardTitle>
            <Pill className="h-5 w-5 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-300">
              {isLoading ? <Skeleton className="h-8 w-16 bg-green-200/50 dark:bg-green-700/30" /> : stats.overview.totalMedicines.total.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              <CheckCircle2 className="h-3 w-3 text-green-600" />
              <span className="text-green-600 dark:text-green-400">{stats.overview.totalMedicines.inStock} có sẵn</span>
              {stats.overview.totalMedicines.outOfStock > 0 && (
                <>
                  <span className="mx-1">•</span>
                  <AlertTriangle className="h-3 w-3 text-red-600" />
                  <span className="text-red-600 dark:text-red-400">{stats.overview.totalMedicines.outOfStock} hết hàng</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders Statistics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100 dark:from-purple-950/30 dark:to-indigo-950/30 dark:border-purple-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-300">Tổng đơn hàng</CardTitle>
            <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800 dark:text-purple-300">
              {isLoading ? <Skeleton className="h-8 w-16 bg-purple-200/50 dark:bg-purple-700/30" /> : stats.overview.totalOrders.total.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs">
              <Clock className="h-3 w-3 text-amber-600" />
              <span className="text-amber-600 dark:text-amber-400">{stats.overview.totalOrders.pending} chờ xử lý</span>
              <span className="mx-1">•</span>
              <CheckCircle2 className="h-3 w-3 text-green-600" />
              <span className="text-green-600 dark:text-green-400">{stats.overview.totalOrders.completed} hoàn thành</span>
              <span className="mx-1">•</span>
              <AlertTriangle className="h-3 w-3 text-red-600" />
              <span className="text-red-600 dark:text-red-400">{stats.overview.totalOrders.cancelled} đã hủy</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <TrendingUp className="h-3 w-3 text-blue-600" />
              <span className="text-blue-600 dark:text-blue-400">+{stats.todayStats.ordersToday} đơn hàng hôm nay</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue Statistics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 border-orange-100 dark:from-orange-950/30 dark:to-red-950/30 dark:border-orange-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-300">Tổng doanh thu</CardTitle>
            <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800 dark:text-orange-300">
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-orange-200/50 dark:bg-orange-700/30" />
              ) : (
                `${(stats.overview.totalRevenue).toLocaleString()} VNĐ`
              )}
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <DollarSign className="h-3 w-3 text-blue-600" />
              <span className="text-blue-600 dark:text-blue-400">+{stats.todayStats.revenueToday.toLocaleString()} VNĐ hôm nay</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}