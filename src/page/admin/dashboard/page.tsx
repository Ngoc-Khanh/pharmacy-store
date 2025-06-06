import { routeNames, routes, siteConfig } from "@/config";
import { DashboardAPI } from "@/services/api/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { DashboardHeader } from "./dashboard.header";
import { DashboardStatisticsCard } from "./dashboard.statistics";

export default function DashboardAdminPage() {
  const { data: dashboardStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: DashboardAPI.DashboardStats,
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

  const isLoading = isLoadingStats;

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
      </div>
    </div>
  );
}