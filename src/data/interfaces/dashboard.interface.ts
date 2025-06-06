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