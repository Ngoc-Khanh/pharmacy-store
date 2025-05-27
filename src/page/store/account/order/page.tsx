import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { FilterIcon, Package, Search, ShoppingBag, TruckIcon, Clock, Calendar, ClipboardList, AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { OrderCard } from "./order.card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
    <Card className="overflow-hidden border border-green-100/60 dark:border-green-900/50 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-green-100/60 dark:bg-green-900/30" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 bg-green-100/60 dark:bg-green-900/30" />
                <Skeleton className="h-4 w-40 bg-green-100/60 dark:bg-green-900/30" />
              </div>
            </div>
          </div>
          <Skeleton className="h-7 w-28 rounded-full bg-green-100/60 dark:bg-green-900/30" />
        </div>
        
        <div className="mt-6 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-2 rounded-md bg-green-100/60 dark:bg-green-900/30" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40 bg-green-100/60 dark:bg-green-900/30" />
                  <Skeleton className="h-3 w-20 bg-green-100/60 dark:bg-green-900/30" />
                </div>
              </div>
              <Skeleton className="h-5 w-24 bg-green-100/60 dark:bg-green-900/30" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-green-100/60 dark:border-green-900/40 flex justify-end gap-3">
          <Skeleton className="h-9 w-28 rounded-full bg-green-100/60 dark:bg-green-900/30" />
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
      <div className="mx-auto w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 border border-green-100 dark:border-green-800/30 shadow-sm">
        <Icon className="w-8 h-8 text-green-500 dark:text-green-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{description}</p>
      <Button 
        className="mt-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-md hover:shadow-lg rounded-full"
      >
        <ShoppingBag className="w-4 h-4 mr-2" /> Mua sắm ngay
      </Button>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>{`${routeNames[routes.store.account.orders]} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="container py-8">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center">
                <div className="w-1.5 h-12 bg-gradient-to-b from-green-500 to-emerald-400 dark:from-green-400 dark:to-emerald-500 rounded-full mr-3 shadow-sm dark:shadow-green-900/30"></div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                  Đơn hàng của tôi
                </h1>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-2 pl-4 ml-4">Xem và quản lý tất cả đơn hàng dễ dàng</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className={cn(
                "relative sm:static transition-all duration-300 ease-in-out",
                isSearchVisible ? "w-full fixed inset-x-4 top-20 z-20" : ""
              )}>
                {isSearchVisible && (
                  <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 pb-6 sm:hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Tìm kiếm đơn hàng</p>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-500 dark:text-green-400" />
                      <Input
                        type="search"
                        placeholder="Nhập mã đơn hàng..."
                        className="pl-9 w-full focus-visible:ring-green-500 dark:focus-visible:ring-green-400 border-green-100 dark:border-green-900/50 dark:bg-gray-900/50 dark:placeholder:text-gray-500 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                <div className={cn("relative group", isSearchVisible ? "hidden sm:block" : "block")}>
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-500 dark:text-green-400" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm đơn hàng..."
                    className="pl-9 w-full sm:w-[260px] focus-visible:ring-green-500 dark:focus-visible:ring-green-400 border-green-100 dark:border-green-900/50 dark:bg-gray-900/50 dark:placeholder:text-gray-500 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm"
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
              </div>

              <div className="flex gap-3">
                {!isSearchVisible && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="sm:hidden h-10 w-10 rounded-full border-green-100 dark:border-green-900/50 bg-white/80 dark:bg-gray-900/80 text-green-500 dark:text-green-400 shadow-sm"
                    onClick={() => setIsSearchVisible(true)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                )}
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[200px] focus:ring-green-500 dark:focus:ring-green-400 rounded-full border-green-100 dark:border-green-900/50 dark:bg-gray-900/50 bg-white/80 dark:bg-gray-800/80 shadow-sm">
                    <div className="flex items-center gap-2">
                      <FilterIcon className="h-4 w-4 text-green-500 dark:text-green-400" />
                      <SelectValue placeholder="Lọc theo trạng thái" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-green-100 dark:border-green-900/50 dark:bg-gray-900">
                    <SelectItem value="all">Tất cả đơn hàng</SelectItem>
                    <SelectItem value={OrderStatus.PENDING}>Chờ xác nhận</SelectItem>
                    <SelectItem value={OrderStatus.PROCESSING}>Đang xử lý</SelectItem>
                    <SelectItem value={OrderStatus.SHIPPED}>Đang giao hàng</SelectItem>
                    <SelectItem value={OrderStatus.DELIVERED}>Đã giao hàng</SelectItem>
                    <SelectItem value={OrderStatus.COMPLETED}>Hoàn thành</SelectItem>
                    <SelectItem value={OrderStatus.CANCELLED}>Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <OrderCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <Card className="p-8 text-center border border-red-100/80 dark:border-red-900/30 shadow-md dark:shadow-lg dark:shadow-red-950/10 rounded-xl bg-gradient-to-r from-red-50/50 to-red-50/30 dark:from-red-950/30 dark:to-red-950/10">
              <div className="mx-auto w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 border border-red-100 dark:border-red-800/30 shadow-sm">
                <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Không thể tải đơn hàng</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">Có lỗi xảy ra khi tải danh sách đơn hàng. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
              <Button className="mt-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-md hover:shadow-lg rounded-full" onClick={() => window.location.reload()}>
                Thử lại
              </Button>
            </Card>
          ) : (
            <>
              {searchTerm || statusFilter !== "all" ? (
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4 mt-4"
                >
                  {filteredOrders && filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <Card className="overflow-hidden border border-green-100/60 dark:border-green-900/50 shadow-md rounded-xl">
                      <div className="p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 border border-green-100 dark:border-green-800/30 shadow-sm">
                          <ClipboardList className="w-8 h-8 text-green-500 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Không tìm thấy đơn hàng nào</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Không có đơn hàng nào phù hợp với bộ lọc hiện tại.</p>
                        <Button 
                          className="mt-6 border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-full"
                          variant="outline"
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                          }}
                        >
                          <FilterIcon className="w-4 h-4 mr-2" /> Xóa bộ lọc
                        </Button>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ) : (
                <Card className="overflow-hidden border border-green-100/60 dark:border-green-900/50 shadow-md dark:shadow-lg rounded-xl">
                  <Tabs defaultValue="all" className="w-full">
                    <div className="p-4 pt-6 pb-0 bg-gradient-to-r from-green-50/70 to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/20 border-b border-green-100/80 dark:border-green-900/30 overflow-hidden">
                      <TabsList className="grid grid-cols-5 gap-1 sm:gap-1.5 w-full max-w-3xl mx-auto bg-white/60 dark:bg-gray-800/40 p-1 sm:p-1.5 rounded-xl shadow-sm border border-green-100/80 dark:border-green-900/30">
                        <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 dark:data-[state=active]:from-green-500 dark:data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
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
                            <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white dark:bg-gray-800 text-amber-700 dark:text-amber-400 shadow-sm dark:shadow-none">
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
                            <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white dark:bg-gray-800 text-teal-700 dark:text-teal-400 shadow-sm dark:shadow-none">
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
                            <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 shadow-sm dark:shadow-none">
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
                            <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white dark:bg-gray-800 text-red-700 dark:text-red-400 shadow-sm dark:shadow-none">
                              {cancelledOrders.length}
                            </Badge>
                          )}
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    
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
                  </Tabs>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}
