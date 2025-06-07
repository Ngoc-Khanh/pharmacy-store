import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { AccountRole, InvoiceStatus, OrderStatus, StockStatus } from "@/data/enum";
import { CategoriesAPI } from "@/services/api/categories.api";
import { InvoiceAPI } from "@/services/api/invoice.api";
import { MedicineAPI } from "@/services/api/medicine.api";
import { OrderAPI } from "@/services/api/order.api";
import { SupplierAPI } from "@/services/api/supplier.api";
import { UsersAPI } from "@/services/api/users.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  Crown,
  DollarSign,
  FolderTree,
  Package,
  PieChart,
  Pill,
  Plus,
  Receipt,
  ShoppingCart,
  TrendingUp,
  Users
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis
} from "recharts";

export default function TestPage() {
  // Fetch data from various APIs
  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: UsersAPI.UsersList,
    refetchOnWindowFocus: false,
  });

  const { data: medicinesData, isLoading: isLoadingMedicines } = useQuery({
    queryKey: ["dashboard-medicines"],
    queryFn: () => MedicineAPI.MedicineList(1, 1000),
    refetchOnWindowFocus: false,
  });

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["dashboard-orders"],
    queryFn: OrderAPI.OrderList,
    refetchOnWindowFocus: false,
  });

  const { data: invoicesData, isLoading: isLoadingInvoices } = useQuery({
    queryKey: ["dashboard-invoices"],
    queryFn: InvoiceAPI.InvoiceList,
    refetchOnWindowFocus: false,
  });

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["dashboard-categories"],
    queryFn: CategoriesAPI.CategoriesList,
    refetchOnWindowFocus: false,
  });

  const { data: suppliersData, isLoading: isLoadingSuppliers } = useQuery({
    queryKey: ["dashboard-suppliers"],
    queryFn: SupplierAPI.SuppliersList,
    refetchOnWindowFocus: false,
  });

  // Mock top customers data - replace with actual API call
  const topCustomersData = {
    top_customers: [
      {
        rank: 1,
        customer_id: "68431c3cc1f7e38b780d0dc6",
        customer_info: {
          username: "test1",
          email: "testver1@customer.com",
          firstname: "Test",
          lastname: "ver1",
          phone: "+8483945873",
          profile_image: {
            public_id: null,
            url: "./avatars/2.jpg",
            alt: "test1-alt"
          }
        },
        total_orders: 1,
        total_spent: 91000,
        average_order_value: 91000,
        first_order_date: "2025-06-06T16:52:11.533000Z",
        last_order_date: "2025-06-06T16:52:11.533000Z",
        completed_orders: 1,
        cancelled_orders: 0
      },
      {
        rank: 2,
        customer_id: "68431c3cc1f7e38b780d0dc7",
        customer_info: {
          username: "customer2",
          email: "customer2@example.com",
          firstname: "Nguyễn",
          lastname: "Văn A",
          phone: "+8483945874",
          profile_image: {
            public_id: null,
            url: "./avatars/3.jpg",
            alt: "customer2-alt"
          }
        },
        total_orders: 3,
        total_spent: 275000,
        average_order_value: 91667,
        first_order_date: "2025-05-15T10:30:00.000000Z",
        last_order_date: "2025-06-05T14:20:00.000000Z",
        completed_orders: 3,
        cancelled_orders: 0
      },
      {
        rank: 3,
        customer_id: "68431c3cc1f7e38b780d0dc8",
        customer_info: {
          username: "customer3",
          email: "customer3@example.com",
          firstname: "Trần",
          lastname: "Thị B",
          phone: "+8483945875",
          profile_image: {
            public_id: null,
            url: "./avatars/4.jpg",
            alt: "customer3-alt"
          }
        },
        total_orders: 2,
        total_spent: 180000,
        average_order_value: 90000,
        first_order_date: "2025-05-20T09:15:00.000000Z",
        last_order_date: "2025-06-01T16:45:00.000000Z",
        completed_orders: 2,
        cancelled_orders: 0
      }
    ],
    summary: {
      period: "all",
      total_customers_analyzed: 3,
      top_customers_total_spent: 546000,
      percentage_of_total_revenue: 85.2
    }
  };

  // Calculate statistics
  const stats = {
    users: {
      total: usersData?.data?.length || 0,
      customers: usersData?.data?.filter(user => user.role === AccountRole.CUSTOMER)?.length || 0,
      pharmacists: usersData?.data?.filter(user => user.role === AccountRole.PHARMACIST)?.length || 0,
      admins: usersData?.data?.filter(user => user.role === AccountRole.ADMIN)?.length || 0,
    },
    medicines: {
      total: medicinesData?.data?.length || 0,
      inStock: medicinesData?.data?.filter(med => med.variants?.stockStatus === StockStatus.IN_STOCK)?.length || 0,
      outOfStock: medicinesData?.data?.filter(med => med.variants?.stockStatus === StockStatus.OUT_OF_STOCK)?.length || 0,
      preOrder: medicinesData?.data?.filter(med => med.variants?.stockStatus === StockStatus.PRE_ORDER)?.length || 0,
    },
    orders: {
      total: ordersData?.data?.length || 0,
      pending: ordersData?.data?.filter(order => order.status === OrderStatus.PENDING)?.length || 0,
      processing: ordersData?.data?.filter(order => order.status === OrderStatus.PROCESSING)?.length || 0,
      delivered: ordersData?.data?.filter(order => order.status === OrderStatus.DELIVERED)?.length || 0,
      cancelled: ordersData?.data?.filter(order => order.status === OrderStatus.CANCELLED)?.length || 0,
      totalRevenue: ordersData?.data?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0,
    },
    invoices: {
      total: invoicesData?.length || 0,
      paid: invoicesData?.filter(invoice => invoice.status === InvoiceStatus.PAID)?.length || 0,
      pending: invoicesData?.filter(invoice => invoice.status === InvoiceStatus.PENDING)?.length || 0,
      cancelled: invoicesData?.filter(invoice => invoice.status === InvoiceStatus.CANCELLED)?.length || 0,
    },
    categories: categoriesData?.length || 0,
    suppliers: suppliersData?.length || 0,
  };

  // Chart data
  const orderStatusData = [
    { name: "Chờ xác nhận", value: stats.orders.pending, color: "#f59e0b" },
    { name: "Đang xử lý", value: stats.orders.processing, color: "#3b82f6" },
    { name: "Đã giao", value: stats.orders.delivered, color: "#10b981" },
    { name: "Đã hủy", value: stats.orders.cancelled, color: "#ef4444" },
  ];
  const revenueData = [
    { month: "T1", revenue: 45000000 },
    { month: "T2", revenue: 52000000 },
    { month: "T3", revenue: 48000000 },
    { month: "T4", revenue: 61000000 },
    { month: "T5", revenue: 55000000 },
    { month: "T6", revenue: 67000000 },
  ];

  const isLoading = isLoadingUsers || isLoadingMedicines || isLoadingOrders || isLoadingInvoices || isLoadingCategories || isLoadingSuppliers;

  const chartConfig = {
    revenue: {
      label: "Doanh thu",
      color: "hsl(var(--chart-1))",
    },
    orders: {
      label: "Đơn hàng",
      color: "hsl(var(--chart-2))",
    },
    medicines: {
      label: "Thuốc",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.dashboard]} | {siteConfig.name}</title>
      </Helmet>
      
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 rounded-xl p-6 shadow-sm border border-teal-100 dark:border-teal-800/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-teal-100 dark:bg-teal-800/30 p-2.5 rounded-lg">
                  <BarChart3 size={28} className="text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
                  Dashboard Quản Trị
                </h2>
              </div>
              <p className="text-teal-600/90 dark:text-teal-400/80 ml-[52px]">
                Tổng quan hoạt động và thống kê hệ thống Pharmacity Store
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="default" className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link to={routes.admin.medicines}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thuốc
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                <Link to={routes.admin.orders}>
                  <Activity className="h-4 w-4 mr-2" />
                  Xem đơn hàng
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Users Statistics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 dark:from-blue-950/30 dark:to-cyan-950/30 dark:border-blue-900/50 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Tổng người dùng</CardTitle>
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                  {isLoading ? <Skeleton className="h-8 w-16 bg-blue-200/50 dark:bg-blue-700/30" /> : stats.users.total.toLocaleString()}
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {stats.users.customers} khách hàng
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                    {stats.users.pharmacists} dược sĩ
                  </Badge>
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
            <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-900/50 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Tổng thuốc</CardTitle>
                <Pill className="h-5 w-5 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                  {isLoading ? <Skeleton className="h-8 w-16 bg-green-200/50 dark:bg-green-700/30" /> : stats.medicines.total.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span className="text-green-600 dark:text-green-400">{stats.medicines.inStock} có sẵn</span>
                  {stats.medicines.outOfStock > 0 && (
                    <>
                      <span className="mx-1">•</span>
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                      <span className="text-red-600 dark:text-red-400">{stats.medicines.outOfStock} hết hàng</span>
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
            <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100 dark:from-purple-950/30 dark:to-indigo-950/30 dark:border-purple-900/50 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-300">Tổng đơn hàng</CardTitle>
                <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                  {isLoading ? <Skeleton className="h-8 w-16 bg-purple-200/50 dark:bg-purple-700/30" /> : stats.orders.total.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <Clock className="h-3 w-3 text-amber-600" />
                  <span className="text-amber-600 dark:text-amber-400">{stats.orders.pending} chờ xử lý</span>
                  <span className="mx-1">•</span>
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span className="text-green-600 dark:text-green-400">{stats.orders.delivered} hoàn thành</span>
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
            <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 border-orange-100 dark:from-orange-950/30 dark:to-red-950/30 dark:border-orange-900/50 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-300">Doanh thu</CardTitle>
                <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-800 dark:text-orange-300">
                  {isLoading ? (
                    <Skeleton className="h-8 w-20 bg-orange-200/50 dark:bg-orange-700/30" />
                  ) : (
                    `${(stats.orders.totalRevenue / 1000000).toFixed(1)}M`
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600 dark:text-green-400">+12.5% từ tháng trước</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  Doanh thu 6 tháng gần đây
                </CardTitle>
                <CardDescription>
                  Biểu đồ thể hiện xu hướng doanh thu của nhà thuốc
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M VNĐ`, "Doanh thu"]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#0d9488" 
                      fill="#0d9488" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Status Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  Trạng thái đơn hàng
                </CardTitle>
                <CardDescription>
                  Phân bố trạng thái các đơn hàng hiện tại
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <RechartsPieChart>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value: number, name: string) => [`${value} đơn`, name]}
                    />
                    <RechartsPieChart data={orderStatusData} cx="50%" cy="50%" outerRadius={60}>
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {orderStatusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Customers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                Khách hàng thân thiết
              </CardTitle>
              <CardDescription>
                Top khách hàng có tổng chi tiêu cao nhất ({topCustomersData.summary.percentage_of_total_revenue}% tổng doanh thu)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomersData.top_customers.map((customer) => (
                  <div 
                    key={customer.customer_id} 
                    className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white font-bold text-sm shadow-md">
                        {customer.rank}
                      </div>
                      
                      {/* Customer Avatar & Info */}
                      <Avatar className="h-12 w-12 ring-2 ring-yellow-200 dark:ring-yellow-800">
                        <AvatarImage 
                          src={customer.customer_info.profile_image.url} 
                          alt={customer.customer_info.profile_image.alt}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-yellow-100 to-amber-100 text-yellow-800">
                          {customer.customer_info.firstname?.[0]}{customer.customer_info.lastname?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="font-semibold text-sm">
                          {customer.customer_info.firstname} {customer.customer_info.lastname}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          @{customer.customer_info.username} • {customer.customer_info.phone}
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-green-600 dark:text-green-400">
                            {customer.completed_orders} đơn hoàn thành
                          </span>
                          {customer.cancelled_orders > 0 && (
                            <span className="text-red-600 dark:text-red-400">
                              {customer.cancelled_orders} đơn hủy
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Customer Stats */}
                    <div className="text-right space-y-1">
                      <div className="font-bold text-lg text-amber-700 dark:text-amber-400">
                        {(customer.total_spent / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {customer.total_orders} đơn hàng
                      </div>
                      <div className="text-xs text-muted-foreground">
                        TB: {(customer.average_order_value / 1000).toFixed(0)}K/đơn
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-lg border border-teal-100 dark:border-teal-800/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                      {topCustomersData.summary.total_customers_analyzed}
                    </div>
                    <div className="text-xs text-teal-600 dark:text-teal-400">
                      Khách hàng phân tích
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                      {(topCustomersData.summary.top_customers_total_spent / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-teal-600 dark:text-teal-400">
                      Tổng chi tiêu
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                      {topCustomersData.summary.percentage_of_total_revenue}%
                    </div>
                    <div className="text-xs text-teal-600 dark:text-teal-400">
                      % Tổng doanh thu
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Statistics */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-medium">Danh mục</CardTitle>
                <FolderTree className="h-5 w-5 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : stats.categories}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tổng số danh mục sản phẩm
                </p>
                <Button asChild variant="ghost" size="sm" className="mt-2 p-0 h-auto text-amber-600 hover:text-amber-700">
                  <Link to={routes.admin.categories} className="flex items-center gap-1">
                    Quản lý <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Suppliers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-medium">Nhà cung cấp</CardTitle>
                <Building2 className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : stats.suppliers}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tổng số nhà cung cấp
                </p>
                <Button asChild variant="ghost" size="sm" className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700">
                  <Link to={routes.admin.suppliers} className="flex items-center gap-1">
                    Quản lý <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-medium">Hóa đơn</CardTitle>
                <Receipt className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : stats.invoices.total}
                </div>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    {stats.invoices.paid} đã thanh toán
                  </Badge>
                </div>
                <Button asChild variant="ghost" size="sm" className="mt-2 p-0 h-auto text-green-600 hover:text-green-700">
                  <Link to={routes.admin.invoices} className="flex items-center gap-1">
                    Quản lý <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.55 }}
        >
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" />
                Truy cập nhanh
              </CardTitle>
              <CardDescription>
                Các tính năng quản lý thường dùng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                <Button asChild variant="outline" className="h-16 flex-col gap-2">
                  <Link to={routes.admin.users}>
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Người dùng</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-16 flex-col gap-2">
                  <Link to={routes.admin.medicines}>
                    <Pill className="h-5 w-5" />
                    <span className="text-sm">Thuốc</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-16 flex-col gap-2">
                  <Link to={routes.admin.orders}>
                    <Package className="h-5 w-5" />
                    <span className="text-sm">Đơn hàng</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-16 flex-col gap-2">
                  <Link to={routes.admin.invoices}>
                    <Receipt className="h-5 w-5" />
                    <span className="text-sm">Hóa đơn</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                Khách hàng hàng đầu
              </CardTitle>
              <CardDescription>
                Danh sách khách hàng mua sắm nhiều nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <div className="space-y-4">
                  {/* {usersData?.data
                    ?.filter(user => user.role === AccountRole.CUSTOMER)
                    ?.sort((a, b) => b.totalSpent - a.totalSpent)
                    ?.slice(0, 5)
                    ?.map((user) => (
                      <div key={user.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-500 dark:text-gray-400 text-xs">
                            Tổng chi tiêu
                          </div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200">
                            {(user.totalSpent || 0).toLocaleString()} VNĐ
                          </div>
                        </div>
                      </div>
                    ))} */}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}