import { routeNames, routes, siteConfig } from "@/config";
import { DashboardAPI } from "@/services/api/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { DashboardCharts } from "./dashboard.chart";
import { DashboardHeader } from "./dashboard.header";
import { DashboardStatisticsCard } from "./dashboard.statistics";
import { OrderStatus } from "@/data/enum";

export default function DashboardAdminPage() {
  const { data: dashboardStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: DashboardAPI.DashboardStats,
    refetchOnWindowFocus: false,
  })

  const { data: chartData, isLoading: isLoadingChart } = useQuery({
    queryKey: ["dashboard-chart"],
    queryFn: () => DashboardAPI.DashboardChartWithSelectYear(new Date().getFullYear()),
    refetchOnWindowFocus: false,
  })
  const { data: chartOrdersStatus, isLoading: isLoadingOrdersStatus } = useQuery({
    queryKey: ["dashboard-chart-orders-status"],
    queryFn: DashboardAPI.DashboardChartOrdersStatus,
    refetchOnWindowFocus: false,
  })

  const stats = dashboardStats || {
    overview: {
      totalOrders: {
        total: 0,
        pending: 0,
        completed: 0,
        cancelled: 0,
      },
      totalRevenue: 0,
      totalUsers: {
        total: 0,
        customers: 0,
        pharmacists: 0,
      },
      totalMedicines: {
        total: 0,
        inStock: 0,
        outOfStock: 0,
      },
    },
    todayStats: {
      ordersToday: 0,
      revenueToday: 0,
      newCustomers: 0,
    },
  }

  const revenueChartData = chartData || [];

  const orderStatusData = (chartOrdersStatus || []).map(item => {
    const statusMap: Record<string, { name: string; color: string }> = {
      [OrderStatus.PENDING]: { name: 'Chờ xác nhận', color: '#f59e0b' },
      [OrderStatus.PROCESSING]: { name: 'Đang xử lý', color: '#3b82f6' },
      [OrderStatus.SHIPPED]: { name: 'Đang giao', color: '#f97316' },
      [OrderStatus.DELIVERED]: { name: 'Đã giao', color: '#10b981' },
      [OrderStatus.COMPLETED]: { name: 'Hoàn thành', color: '#059669' },
      [OrderStatus.CANCELLED]: { name: 'Đã hủy', color: '#ef4444' },
    };
    
    const statusInfo = statusMap[item.status] || { name: item.status, color: '#6b7280' };
    
    return {
      name: statusInfo.name,
      value: item.count,
      color: statusInfo.color,
    };
  });

  const isLoading = isLoadingStats || isLoadingChart || isLoadingOrdersStatus;

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.dashboard]} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Headers */}
        <DashboardHeader />

        {/* Statistics Cards */}
        <DashboardStatisticsCard stats={stats} isLoading={isLoading} />

        {/* Charts Section */}
        <DashboardCharts revenueData={revenueChartData} ordersData={orderStatusData} isLoading={isLoading} />
      </div>
    </div>
  );
}