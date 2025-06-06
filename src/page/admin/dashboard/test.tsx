import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { routeNames, routes, siteConfig } from "@/config";
import { UsersAPI } from "@/services/api/users.api";
import { MedicineAPI } from "@/services/api/medicine.api";
import { OrderAPI } from "@/services/api/order.api";
import { InvoiceAPI } from "@/services/api/invoice.api";
import { CategoriesAPI } from "@/services/api/categories.api";
import { SupplierAPI } from "@/services/api/supplier.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  Users, 
  Pill, 
  ShoppingCart, 
  Receipt, 
  FolderTree,
  Building2,
  TrendingUp,
  Activity,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  BarChart3,
  PieChart
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart as RechartsPieChart,
  Cell
} from "recharts";
import { InvoiceStatus, OrderStatus, StockStatus } from "@/data/enum";

export default function DashboardAdminPage() {
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

  // Calculate statistics
  const stats = {
    users: {
      total: usersData?.data?.length || 0,
      customers: usersData?.data?.filter(user => user.role === "customer")?.length || 0,
      pharmacists: usersData?.data?.filter(user => user.role === "pharmacist")?.length || 0,
      admins: usersData?.data?.filter(user => user.role === "admin")?.length || 0,    },    medicines: {
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
      </div>
    </div>
  );
}