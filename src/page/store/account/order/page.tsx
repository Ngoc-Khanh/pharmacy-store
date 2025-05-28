import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderStatus } from "@/data/enum";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FilterIcon, Package, Search, ShoppingBag, TruckIcon, Clock, Calendar, ClipboardList, AlertCircle, X, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { OrderCard } from "./order.card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => StoreAPI.OrdersUserList(),
  });

  // Lọc đơn hàng theo từ khóa tìm kiếm và trạng thái
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Nhóm đơn hàng theo trạng thái
  const pendingOrders = orders?.filter(o =>
    o.status === OrderStatus.PENDING ||
    o.status === OrderStatus.PROCESSING ||
    o.status === OrderStatus.SHIPPED
  );
  const deliveredOrders = orders?.filter(o =>
    o.status === OrderStatus.DELIVERED
  );
  const completedOrders = orders?.filter(o =>
    o.status === OrderStatus.COMPLETED
  );
  const cancelledOrders = orders?.filter(o =>
    o.status === OrderStatus.CANCELLED
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Order Skeleton Loader Component
  const OrderCardSkeleton = () => (
    <Card className="overflow-hidden border border-emerald-100 dark:border-emerald-800/30 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 bg-emerald-100/60 dark:bg-emerald-900/30" />
                <Skeleton className="h-4 w-40 bg-emerald-100/60 dark:bg-emerald-900/30" />
              </div>
            </div>
          </div>
          <Skeleton className="h-7 w-28 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30" />
        </div>
        
        <div className="mt-6 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-2 rounded-md bg-emerald-100/60 dark:bg-emerald-900/30" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40 bg-emerald-100/60 dark:bg-emerald-900/30" />
                  <Skeleton className="h-3 w-20 bg-emerald-100/60 dark:bg-emerald-900/30" />
                </div>
              </div>
              <Skeleton className="h-5 w-24 bg-emerald-100/60 dark:bg-emerald-900/30" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-emerald-100/60 dark:border-emerald-900/40 flex justify-end gap-3">
          <Skeleton className="h-9 w-28 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30" />
        </div>
      </div>
    </Card>
  );

  // EmptyOrdersState Component
  const EmptyOrdersState = ({ title, description, icon: Icon }: { title: string, description: string, icon: LucideIcon }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-4"
    >
      <div className="mx-auto w-20 h-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
        <Icon className="w-10 h-10" />
      </div>
      <h2 className="mt-2 text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-center text-muted-foreground max-w-md mx-auto">{description}</p>
      <Button 
        asChild
        size="lg" 
        className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
      >
        <a href={routes.store.medicines} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Tiếp tục mua sắm
        </a>
      </Button>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>{`${routeNames[routes.store.account.orders]} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="container py-10 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Header section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">Đơn hàng của bạn</h1>
            </div>
            <p className="text-muted-foreground ml-13 pl-0.5">
              {isLoading ? 
                <Skeleton className="h-4 w-40" /> : 
                (orders && orders.length > 0 ? 
                  `Bạn có ${orders.length} đơn hàng` : 
                  'Bạn chưa có đơn hàng nào')}
            </p>
            </div>

          {isLoading ? (
            // Loading state
            <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-40" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-5 p-4">
                  {[1, 2, 3].map((i) => (
                    <OrderCardSkeleton key={i} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : isError ? (
            <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="mx-auto w-20 h-20 bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-10 w-10" />
                </div>
                <h2 className="mt-2 text-xl font-semibold">Không thể tải đơn hàng</h2>
                <p className="mt-3 text-center text-muted-foreground max-w-md mx-auto">Có lỗi xảy ra khi tải danh sách đơn hàng. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
                <Button className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" onClick={() => window.location.reload()}>
                  Thử lại
                    </Button>
              </CardContent>
            </Card>
          ) : !orders || orders.length === 0 ? (
            <Card className="border-dashed bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-900/30 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 mb-4">
                  <ShoppingBag className="h-10 w-10" />
                    </div>
                <h2 className="mt-2 text-xl font-semibold">Bạn chưa có đơn hàng nào</h2>
                <p className="mt-3 text-center text-muted-foreground max-w-md mx-auto">
                  Lịch sử đơn hàng của bạn sẽ xuất hiện ở đây. Hãy khám phá và mua sắm ngay!
                </p>
                <Button asChild size="lg" className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                  <a href={routes.store.medicines} className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Tiếp tục mua sắm
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm đơn hàng..."
                    className="pl-9 w-full focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400 border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900/50 dark:placeholder:text-gray-500 bg-white/80 dark:bg-gray-800/80 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      onClick={() => setSearchTerm("")}
                    >
                      <span className="sr-only">Clear</span>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-3 items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[200px] focus:ring-emerald-500 dark:focus:ring-emerald-400 border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900/50 bg-white/80 dark:bg-gray-800/80 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FilterIcon className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                      <SelectValue placeholder="Lọc theo trạng thái" />
                    </div>
                  </SelectTrigger>
                    <SelectContent className="rounded-lg border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900">
                    <SelectItem value="all">Tất cả đơn hàng</SelectItem>
                    <SelectItem value={OrderStatus.PENDING}>Chờ xác nhận</SelectItem>
                    <SelectItem value={OrderStatus.PROCESSING}>Đang xử lý</SelectItem>
                    <SelectItem value={OrderStatus.SHIPPED}>Đang giao hàng</SelectItem>
                    <SelectItem value={OrderStatus.DELIVERED}>Đã giao hàng</SelectItem>
                    <SelectItem value={OrderStatus.COMPLETED}>Hoàn thành</SelectItem>
                    <SelectItem value={OrderStatus.CANCELLED}>Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
                  
                  {(searchTerm || statusFilter !== "all") && (
                        <Button 
                      className="border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                          variant="outline"
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                          }}
                        >
                          <FilterIcon className="w-4 h-4 mr-2" /> Xóa bộ lọc
                        </Button>
                  )}
                </div>
              </div>

              {searchTerm || statusFilter !== "all" ? (
                <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Đơn hàng đã lọc
                      {filteredOrders && filteredOrders.length > 0 && (
                        <Badge variant="outline" className="ml-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/40 dark:text-emerald-400 dark:hover:text-emerald-300 dark:border-emerald-800/40 dark:hover:border-emerald-700/60 transition-colors duration-200">
                          {filteredOrders.length}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-25rem)] pr-0">
                      <div className="divide-y divide-emerald-100 dark:divide-emerald-800/30">
                        {filteredOrders && filteredOrders.length > 0 ? (
                          filteredOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <div className="mx-auto w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                              <ClipboardList className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Không tìm thấy đơn hàng nào</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">Không có đơn hàng nào phù hợp với bộ lọc hiện tại.</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-t border-emerald-100 dark:border-emerald-800/30">
                    <Button variant="outline" asChild className="border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-800/30">
                      <a href={routes.store.medicines} className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Tiếp tục mua sắm
                      </a>
                    </Button>
                  </CardFooter>
                    </Card>
              ) : (
                <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Đơn hàng của bạn
                      <Badge variant="outline" className="ml-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/40 dark:text-emerald-400 dark:hover:text-emerald-300 dark:border-emerald-800/40 dark:hover:border-emerald-700/60 transition-colors duration-200">
                        {orders.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                  <Tabs defaultValue="all" className="w-full">
                      <div className="p-4 pt-6 pb-0 bg-gradient-to-r from-emerald-50/70 to-emerald-50/50 dark:from-emerald-950/30 dark:to-emerald-950/20 border-b border-emerald-100/80 dark:border-emerald-900/30 overflow-hidden">
                        <TabsList className="grid grid-cols-5 gap-1 sm:gap-1.5 w-full max-w-3xl mx-auto bg-white/60 dark:bg-gray-800/40 p-1 sm:p-1.5 rounded-xl shadow-sm border border-emerald-100/80 dark:border-emerald-900/30">
                          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 dark:data-[state=active]:from-emerald-500 dark:data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                          <span className="flex items-center justify-center gap-1.5">
                            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline text-xs sm:text-sm">Tất cả</span>
                          </span>
                        </TabsTrigger>
                        <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-500 dark:data-[state=active]:from-amber-500 dark:data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                          <span className="flex items-center justify-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline text-xs sm:text-sm">Xử lý</span>
                          </span>
                          {pendingOrders && pendingOrders.length > 0 && (
                            <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-amber-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 shadow-sm dark:shadow-none transition-colors duration-200">
                              {pendingOrders.length}
                            </Badge>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="delivered" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-teal-500 dark:data-[state=active]:from-teal-500 dark:data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                          <span className="flex items-center justify-center gap-1.5">
                            <TruckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline text-xs sm:text-sm">Đã giao</span>
                          </span>
                          {deliveredOrders && deliveredOrders.length > 0 && (
                            <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-teal-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 shadow-sm dark:shadow-none transition-colors duration-200">
                              {deliveredOrders.length}
                            </Badge>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 dark:data-[state=active]:from-emerald-500 dark:data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                          <span className="flex items-center justify-center gap-1.5">
                            <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline text-xs sm:text-sm">Hoàn thành</span>
                          </span>
                          {completedOrders && completedOrders.length > 0 && (
                            <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 shadow-sm dark:shadow-none transition-colors duration-200">
                              {completedOrders.length}
                            </Badge>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="cancelled" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-500 dark:data-[state=active]:from-red-500 dark:data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                          <span className="flex items-center justify-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline text-xs sm:text-sm">Đã hủy</span>
                          </span>
                          {cancelledOrders && cancelledOrders.length > 0 && (
                            <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-rose-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-red-700 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 shadow-sm dark:shadow-none transition-colors duration-200">
                              {cancelledOrders.length}
                            </Badge>
                          )}
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    
                      <ScrollArea className="h-[calc(100vh-25rem)] pr-0">
                    <div className="p-4">
                      <TabsContent value="all" className="space-y-4 mt-2">
                        <motion.div variants={container} initial="hidden" animate="show">
                          {orders && orders.length > 0 ? (
                            orders.map((order) => <OrderCard key={order.id} order={order} />)
                          ) : (
                            <EmptyOrdersState 
                              title="Chưa có đơn hàng nào"
                              description="Lịch sử đơn hàng của bạn sẽ xuất hiện ở đây. Hãy khám phá và mua sắm ngay!"
                              icon={Package}
                            />
                          )}
                        </motion.div>
                      </TabsContent>
                      
                      <TabsContent value="pending" className="space-y-4 mt-2">
                        <motion.div variants={container} initial="hidden" animate="show">
                          {pendingOrders && pendingOrders.length > 0 ? (
                            pendingOrders.map((order) => <OrderCard key={order.id} order={order} />)
                          ) : (
                            <EmptyOrdersState 
                              title="Không có đơn hàng đang xử lý"
                              description="Các đơn hàng đang chờ xác nhận, đang xử lý hoặc đang giao sẽ xuất hiện ở đây"
                              icon={Clock}
                            />
                          )}
                        </motion.div>
                      </TabsContent>
                      
                      <TabsContent value="delivered" className="space-y-4 mt-2">
                        <motion.div variants={container} initial="hidden" animate="show">
                          {deliveredOrders && deliveredOrders.length > 0 ? (
                            deliveredOrders.map((order) => <OrderCard key={order.id} order={order} showConfirmButton={true} />)
                          ) : (
                            <EmptyOrdersState 
                              title="Không có đơn hàng đã giao"
                              description="Đơn hàng đã được giao đến bạn sẽ xuất hiện ở đây"
                              icon={TruckIcon}
                            />
                          )}
                        </motion.div>
                      </TabsContent>
                      
                      <TabsContent value="completed" className="space-y-4 mt-2">
                        <motion.div variants={container} initial="hidden" animate="show">
                          {completedOrders && completedOrders.length > 0 ? (
                            completedOrders.map((order) => <OrderCard key={order.id} order={order} />)
                          ) : (
                            <EmptyOrdersState 
                              title="Không có đơn hàng hoàn thành"
                              description="Đơn hàng đã hoàn thành sẽ xuất hiện ở đây"
                              icon={Package}
                            />
                          )}
                        </motion.div>
                      </TabsContent>
                      
                      <TabsContent value="cancelled" className="space-y-4 mt-2">
                        <motion.div variants={container} initial="hidden" animate="show">
                          {cancelledOrders && cancelledOrders.length > 0 ? (
                            cancelledOrders.map((order) => <OrderCard key={order.id} order={order} />)
                          ) : (
                            <EmptyOrdersState 
                              title="Không có đơn hàng đã hủy"
                              description="Đơn hàng đã hủy sẽ xuất hiện ở đây"
                              icon={Calendar}
                            />
                          )}
                        </motion.div>
                      </TabsContent>
                    </div>
                      </ScrollArea>
                  </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-t border-emerald-100 dark:border-emerald-800/30">
                    <Button variant="outline" asChild className="border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-800/30">
                      <a href={routes.store.medicines} className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Tiếp tục mua sắm
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}
