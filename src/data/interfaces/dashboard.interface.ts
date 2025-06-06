import { OrderStatus } from "../enum";

export interface DashboardStats {
  overview: Overview;
  todayStats: TodayStats;
}

export interface Overview {
  totalOrders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  totalRevenue: number;
  totalUsers: {
    total: number;
    customers: number;
    pharmacists: number;
  };
  totalMedicines: {
    total: number;
    inStock: number;
    outOfStock: number;
  };
}

export interface TodayStats {
  ordersToday: number;
  revenueToday: number;
  newCustomers: number;
}

export interface DashboardChartData {
  month: "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "T8" | "T9" | "T10" | "T11" | "T12";
  revenue: number;
}

export interface DashboardChartOrdersStatus {
  status: OrderStatus,
  count: number;
}