import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { routes } from "@/config";
import { Order } from "@/data/interfaces";
import { motion } from "framer-motion";
import { AlertCircle, Calendar, ChevronLeft, Clock, Package, ShoppingBag, TruckIcon } from "lucide-react";
import { OrderCard } from "./order.card";
import { EmptyOrdersState } from "./order.empty-state";

// Define the props interface based on the existing code structure
interface OrderTabsProps {
  orders: Order[];
  pendingOrders: Order[];
  deliveredOrders: Order[];
  completedOrders: Order[];
  cancelledOrders: Order[];
  isLoading: boolean;
  isError: boolean;
}

export function OrderTabs({
  orders,
  pendingOrders,
  deliveredOrders,
  completedOrders,
  cancelledOrders,
  isLoading,
  isError
}: OrderTabsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
          <div className="flex items-center gap-2">
            <div className="h-6 w-40 bg-emerald-100 dark:bg-emerald-800/30 animate-pulse rounded" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 flex items-center justify-center">
            <div className="h-8 w-full max-w-md bg-emerald-50 dark:bg-emerald-900/20 animate-pulse rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
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
    );
  }

  if (!orders || orders.length === 0) {
    return (
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
    );
  }

  return (
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
  );
} 