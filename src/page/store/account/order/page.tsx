import { Empty } from "@/components/empty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Order } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check, Clock, CreditCard, FilterIcon, Leaf, Package, Search, ShoppingBag, TruckIcon } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// Tạo badge với màu sắc tương ứng với trạng thái đơn hàng
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig = {
    [OrderStatus.PENDING]: { 
      color: "bg-green-50 text-green-700 border-green-200", 
      label: "Chờ xác nhận",
      icon: <Clock className="w-3 h-3 mr-1" />
    },
    [OrderStatus.PROCESSING]: { 
      color: "bg-blue-50 text-blue-600 border-blue-200", 
      label: "Đang xử lý",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.SHIPPED]: { 
      color: "bg-indigo-50 text-indigo-600 border-indigo-200", 
      label: "Đang giao hàng",
      icon: <TruckIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.DELIVERED]: { 
      color: "bg-teal-50 text-teal-600 border-teal-200", 
      label: "Đã giao hàng",
      icon: <ShoppingBag className="w-3 h-3 mr-1" />
    },
    [OrderStatus.CANCELLED]: { 
      color: "bg-rose-50 text-rose-600 border-rose-200", 
      label: "Đã hủy",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.COMPLETED]: { 
      color: "bg-green-50 text-green-700 border-green-200", 
      label: "Hoàn thành",
      icon: <Check className="w-3 h-3 mr-1" />
    },
  };

  const config = statusConfig[status];
  return (
    <Badge className={`${config.color} px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-sm`}>
      {config.icon} {config.label}
    </Badge>
  );
};

// Biểu tượng cho từng trạng thái đơn hàng
const OrderStatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <Clock className="h-5 w-5 text-green-600" />;
    case OrderStatus.PROCESSING:
      return <Package className="h-5 w-5 text-blue-500" />;
    case OrderStatus.SHIPPED:
      return <TruckIcon className="h-5 w-5 text-indigo-500" />;
    case OrderStatus.DELIVERED:
    case OrderStatus.COMPLETED:
      return <ShoppingBag className="h-5 w-5 text-green-600" />;
    case OrderStatus.CANCELLED:
      return <Package className="h-5 w-5 text-rose-500" />;
    default:
      return <Package className="h-5 w-5 text-green-600" />;
  }
};

// Định dạng phương thức thanh toán
const formatPaymentMethod = (method: string) => {
  switch (method) {
    case "COD":
      return "Thanh toán khi nhận hàng";
    case "CREDIT-CARD":
      return "Thẻ tín dụng";
    case "BANK-TRANSFER":
      return "Chuyển khoản ngân hàng";
    default:
      return method;
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy", { locale: vi });
  const formattedTime = format(new Date(order.createdAt), "HH:mm", { locale: vi });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)"
      }}
      className="rounded-xl overflow-hidden"
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="border-b border-border p-4 flex justify-between items-center bg-gradient-to-r from-green-50 to-green-50/30">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-2.5 rounded-full shadow-sm flex items-center justify-center">
              <OrderStatusIcon status={order.status} />
            </div>
            <div>
              <h3 className="font-medium text-base text-gray-800">Đơn hàng #{order.id.slice(-6)}</h3>
              <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-4 mt-1.5">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1.5 opacity-70" /> {formattedDate}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1.5 opacity-70" /> {formattedTime}
                </span>
                <span className="flex items-center">
                  <CreditCard className="h-3 w-3 mr-1.5 opacity-70" /> {formatPaymentMethod(order.paymentMethod)}
                </span>
              </div>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <CardContent className="p-4 bg-white">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="space-y-1 md:w-2/3">
              <div className="text-sm text-gray-500 mb-3 flex items-center">
                <ShoppingBag className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                {order.items.length} {order.items.length === 1 ? 'sản phẩm' : 'sản phẩm'}
              </div>
              <div className="space-y-3 border-l-2 border-green-100 pl-3">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.medicineId} className="text-sm flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-green-400 mr-2.5 shadow-sm"></div>
                      <span className="text-gray-700 font-medium">
                        ID: {item.medicineId.slice(0, 8)}...
                      </span>
                      <span className="text-gray-500 ml-2">
                        × {item.quantity}
                      </span>
                    </div>
                    <div className="font-medium text-green-700">{formatCurrency(item.itemTotal)}</div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="text-xs text-green-600 font-medium ml-4 italic flex items-center">
                    <Leaf className="h-3 w-3 mr-1.5 text-green-500" />
                    +{order.items.length - 2} sản phẩm khác
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end justify-between">
              <div className="text-right px-4 py-2 bg-green-50/50 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Tổng thanh toán</div>
                <div className="font-bold text-lg text-green-700">{formatCurrency(order.totalPrice)}</div>
              </div>
              <Button 
                asChild 
                className="mt-4 w-full md:w-auto group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-sm hover:shadow" 
                size="sm"
              >
                <Link to={routes.store.account.orderDetails(order.id)}>
                  Xem chi tiết <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

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
                <div className="w-1.5 h-12 bg-gradient-to-b from-green-500 to-green-400 rounded-full mr-3 shadow-sm"></div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                  Đơn hàng của tôi
                </h1>
              </div>
              <p className="text-gray-500 mt-2 pl-4.5 ml-4">Xem và quản lý tất cả đơn hàng dễ dàng</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-500" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm đơn hàng..."
                  className="pl-9 w-full sm:w-[240px] focus-visible:ring-green-500 border-green-100 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] focus:ring-green-500 rounded-full border-green-100">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4 text-green-500" />
                    <SelectValue placeholder="Lọc theo trạng thái" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-lg border-green-100">
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
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-green-50 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <Card className="p-8 text-center border-0 shadow-sm rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700">Không thể tải đơn hàng</h2>
              <p className="mt-2 text-gray-500">Vui lòng thử lại sau hoặc liên hệ hỗ trợ</p>
              <Button className="mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-sm rounded-full" onClick={() => window.location.reload()}>
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
                      className="bg-gradient-to-r from-green-50 to-green-50/30 rounded-xl py-16"
                    />
                  )}
                </motion.div>
              ) : (
                <div className="bg-white p-1 rounded-2xl shadow-sm border border-green-100/50">
                  <Tabs defaultValue="all" className="w-full mt-2">
                    <TabsList className="grid grid-cols-4 gap-1 w-full max-w-lg mx-auto mb-6 bg-green-50 p-1 rounded-xl">
                      <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-lg">
                        Tất cả
                      </TabsTrigger>
                      <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-lg">
                        Đang xử lý
                        {pendingOrders && pendingOrders.length > 0 && (
                          <Badge variant="secondary" className="ml-1.5 bg-white text-green-700 shadow-sm">
                            {pendingOrders.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-lg">
                        Hoàn thành
                      </TabsTrigger>
                      <TabsTrigger value="cancelled" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-lg">
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
                            className="bg-gradient-to-r from-green-50 to-green-50/30 rounded-xl py-16"
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
                            className="bg-gradient-to-r from-green-50 to-green-50/30 rounded-xl py-16"
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
                            className="bg-gradient-to-r from-green-50 to-green-50/30 rounded-xl py-16"
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
                            className="bg-gradient-to-r from-green-50 to-green-50/30 rounded-xl py-16"
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
