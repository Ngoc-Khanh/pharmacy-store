import { Empty } from "@/components/empty";
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
import { FilterIcon, Package, Search, ShoppingBag, TruckIcon } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { OrderCard } from "./order.card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const completedOrders = orders?.filter(o =>
    o.status === OrderStatus.DELIVERED ||
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
    <Card className="overflow-hidden border border-green-100/60 dark:border-green-900/50 shadow-sm dark:shadow-md dark:shadow-green-950/10 hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200 rounded-xl">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-32 bg-green-100/60 dark:bg-green-900/30" />
              <Skeleton className="h-6 w-24 rounded-full bg-green-100/60 dark:bg-green-900/30" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 bg-green-100/60 dark:bg-green-900/30" />
              <Skeleton className="h-4 w-24 bg-green-100/60 dark:bg-green-900/30" />
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <Skeleton className="h-6 w-28 bg-green-100/60 dark:bg-green-900/30" />
            <Skeleton className="h-4 w-20 bg-green-100/60 dark:bg-green-900/30" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-100/60 dark:border-green-900/40">
          <div className="flex flex-wrap gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-lg bg-green-100/60 dark:bg-green-900/30" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-green-100/60 dark:bg-green-900/30" />
                  <Skeleton className="h-3 w-16 bg-green-100/60 dark:bg-green-900/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-100/60 dark:border-green-900/40 flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-full bg-green-100/60 dark:bg-green-900/30" />
            <Skeleton className="h-9 w-24 rounded-full bg-green-100/60 dark:bg-green-900/30" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full bg-green-100/60 dark:bg-green-900/30" />
            <Skeleton className="h-4 w-20 bg-green-100/60 dark:bg-green-900/30" />
          </div>
        </div>
      </div>
    </Card>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center">
                <div className="w-1.5 h-12 bg-gradient-to-b from-green-500 to-green-400 dark:from-green-500 dark:to-green-600 rounded-full mr-3 shadow-sm dark:shadow-green-900/30"></div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                  Đơn hàng của tôi
                </h1>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-2 pl-4.5 ml-4">Xem và quản lý tất cả đơn hàng dễ dàng</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-500 dark:text-green-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm đơn hàng..."
                  className="pl-9 w-full sm:w-[240px] focus-visible:ring-green-500 dark:focus-visible:ring-green-400 border-green-100 dark:border-green-900/50 dark:bg-gray-900/50 dark:placeholder:text-gray-500 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] focus:ring-green-500 dark:focus:ring-green-400 rounded-full border-green-100 dark:border-green-900/50 dark:bg-gray-900/50">
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

          {isLoading ? (
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <OrderCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <Card className="p-8 text-center border-0 dark:border dark:border-green-950/20 shadow-sm dark:shadow-lg dark:shadow-green-950/10 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Không thể tải đơn hàng</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Vui lòng thử lại sau hoặc liên hệ hỗ trợ</p>
              <Button className="mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-sm dark:shadow-green-900/20 rounded-full" onClick={() => window.location.reload()}>
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
                    <Empty
                      title="Không tìm thấy đơn hàng nào"
                      description="Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc của bạn"
                      icon={Package}
                      className="bg-gradient-to-r from-green-50 to-green-50/30 dark:from-green-950/30 dark:to-green-950/10 rounded-xl py-16"
                    />
                  )}
                </motion.div>
              ) : (
                <div className="bg-white dark:bg-gray-900/30 p-1 rounded-2xl shadow-sm dark:shadow-md dark:shadow-green-950/10 border border-green-100/50 dark:border-green-900/50">
                  <Tabs defaultValue="all" className="w-full mt-2">
                    <TabsList className="grid grid-cols-4 gap-1 w-full max-w-lg mx-auto mb-6 bg-green-50 dark:bg-green-950/30 p-1 rounded-xl">
                      <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 dark:data-[state=active]:from-green-500 dark:data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg">
                        Tất cả
                      </TabsTrigger>
                      <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 dark:data-[state=active]:from-green-500 dark:data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg">
                        Đang xử lý
                        {pendingOrders && pendingOrders.length > 0 && (
                          <Badge variant="secondary" className="ml-1.5 bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 shadow-sm dark:shadow-none">
                            {pendingOrders.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 dark:data-[state=active]:from-green-500 dark:data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg">
                        Hoàn thành
                      </TabsTrigger>
                      <TabsTrigger value="cancelled" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 dark:data-[state=active]:from-green-500 dark:data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg">
                        Đã hủy
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4 px-2 pb-2">
                      <motion.div variants={container} initial="hidden" animate="show">
                        {orders && orders.length > 0 ? (
                          orders.map((order) => <OrderCard key={order.id} order={order} />)
                        ) : (
                          <Empty 
                            title="Chưa có đơn hàng nào"
                            description="Lịch sử đơn hàng của bạn sẽ xuất hiện ở đây"
                            icon={Package}
                            className="bg-gradient-to-r from-green-50 to-green-50/30 dark:from-green-950/30 dark:to-green-950/10 rounded-xl py-16"
                          />
                        )}
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="pending" className="space-y-4 px-2 pb-2">
                      <motion.div variants={container} initial="hidden" animate="show">
                        {pendingOrders && pendingOrders.length > 0 ? (
                          pendingOrders.map((order) => <OrderCard key={order.id} order={order} />)
                        ) : (
                          <Empty 
                            title="Không có đơn hàng đang xử lý"
                            description="Các đơn hàng đang chờ xác nhận, đang xử lý hoặc đang giao hàng sẽ xuất hiện ở đây"
                            icon={TruckIcon}
                            className="bg-gradient-to-r from-green-50 to-green-50/30 dark:from-green-950/30 dark:to-green-950/10 rounded-xl py-16"
                          />
                        )}
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="completed" className="space-y-4 px-2 pb-2">
                      <motion.div variants={container} initial="hidden" animate="show">
                        {completedOrders && completedOrders.length > 0 ? (
                          completedOrders.map((order) => <OrderCard key={order.id} order={order} />)
                        ) : (
                          <Empty 
                            title="Không có đơn hàng hoàn thành"
                            description="Các đơn hàng đã hoàn thành của bạn sẽ xuất hiện ở đây"
                            icon={ShoppingBag}
                            className="bg-gradient-to-r from-green-50 to-green-50/30 dark:from-green-950/30 dark:to-green-950/10 rounded-xl py-16"
                          />
                        )}
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="cancelled" className="space-y-4 px-2 pb-2">
                      <motion.div variants={container} initial="hidden" animate="show">
                        {cancelledOrders && cancelledOrders.length > 0 ? (
                          cancelledOrders.map((order) => <OrderCard key={order.id} order={order} />)
                        ) : (
                          <Empty 
                            title="Không có đơn hàng đã hủy"
                            description="Các đơn hàng đã hủy của bạn sẽ xuất hiện ở đây"
                            icon={Package}
                            className="bg-gradient-to-r from-green-50 to-green-50/30 dark:from-green-950/30 dark:to-green-950/10 rounded-xl py-16"
                          />
                        )}
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}
