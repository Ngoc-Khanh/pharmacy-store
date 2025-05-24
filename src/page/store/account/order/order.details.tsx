import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { routes, siteConfig } from "@/config";
import { OrderStatus, PaymentMethod } from "@/data/enum";
import { OrderDetails as OrderDetailsType } from "@/data/interfaces";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarIcon, MapPinIcon, Package, Truck, ClockIcon, ShoppingBagIcon, BanknoteIcon, CheckCircle2Icon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { vi } from "date-fns/locale";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Tạo badge với màu sắc tương ứng với trạng thái đơn hàng
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig = {
    [OrderStatus.PENDING]: { 
      color: "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800", 
      label: "Chờ xác nhận",
      icon: <ClockIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.PROCESSING]: { 
      color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900", 
      label: "Đang xử lý",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.SHIPPED]: { 
      color: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900", 
      label: "Đang giao hàng",
      icon: <Truck className="w-3 h-3 mr-1" />
    },
    [OrderStatus.DELIVERED]: { 
      color: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-900", 
      label: "Đã giao hàng",
      icon: <ShoppingBagIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.CANCELLED]: { 
      color: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900", 
      label: "Đã hủy",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.COMPLETED]: { 
      color: "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800", 
      label: "Hoàn thành",
      icon: <CheckCircle2Icon className="w-3 h-3 mr-1" />
    },
  };

  const config = statusConfig[status];
  return (
    <Badge className={`${config.color} px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-sm dark:shadow-none`}>
      {config.icon} {config.label}
    </Badge>
  );
};

// Định dạng phương thức thanh toán
const formatPaymentMethod = (method: string) => {
  switch (method) {
    case PaymentMethod.COD:
      return "Thanh toán khi nhận hàng";
    case PaymentMethod.CREDIT_CARD:
      return "Thẻ tín dụng";
    case PaymentMethod.BANK_TRANSFER:
      return "Chuyển khoản ngân hàng";
    default:
      return method;
  }
};

// Hiển thị timeline trạng thái đơn hàng
const OrderTimeline = ({ status }: { status: OrderStatus }) => {
  const steps = [
    { status: OrderStatus.PENDING, label: "Đã đặt hàng", icon: Package, color: "text-green-700" },
    { status: OrderStatus.PROCESSING, label: "Đang xử lý", icon: ClockIcon, color: "text-blue-600" },
    { status: OrderStatus.SHIPPED, label: "Đang giao hàng", icon: Truck, color: "text-indigo-600" },
    { status: OrderStatus.DELIVERED, label: "Đã giao hàng", icon: MapPinIcon, color: "text-teal-600" },
    { status: OrderStatus.COMPLETED, label: "Hoàn thành", icon: CheckCircle2Icon, color: "text-green-700" },
  ];

  // Bỏ qua nếu đơn hàng đã hủy
  if (status === OrderStatus.CANCELLED) {
    return (
      <div className="flex items-center justify-center py-6">
        <Badge variant="destructive" className="px-4 py-1.5 rounded-full shadow-sm dark:shadow-none">
          Đơn hàng đã bị hủy
        </Badge>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((step) => step.status === status);

  return (
    <div className="py-8">
      <div className="relative flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index <= currentStepIndex;
          
          return (
            <motion.div 
              key={step.status} 
              className="flex flex-col items-center z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div 
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  isActive 
                    ? "bg-gradient-to-r from-green-600 to-green-500 dark:from-green-500 dark:to-green-600 text-white shadow-md dark:shadow-green-900/30" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 shadow-sm dark:shadow-none"
                }`}
              >
                <StepIcon className={`w-6 h-6 ${isActive ? "" : "opacity-60"}`} />
              </div>
              <p className={`text-xs mt-3 font-medium ${isActive ? "text-green-700 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}`}>
                {step.label}
              </p>
            </motion.div>
          );
        })}
        
        {/* Connector lines */}
        <div className="absolute top-7 left-0 right-0 h-1 -z-0">
          <div className="relative h-full flex">
            {steps.map((_, index) => {
              if (index === steps.length - 1) return null;
              
              const isPast = index < currentStepIndex;
              
              return (
                <div 
                  key={index} 
                  className={`flex-1 h-full ${
                    isPast 
                      ? "bg-gradient-to-r from-green-600 to-green-500 dark:from-green-500 dark:to-green-600" 
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// OrderDetailsSkeleton component
const OrderDetailsSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-10 w-32 rounded-full bg-green-100/60 dark:bg-green-950/30" />
      <Skeleton className="h-8 w-28 rounded-full bg-green-100/60 dark:bg-green-950/30" />
    </div>

    <Card className="overflow-hidden border-0 shadow-md dark:shadow-none dark:border dark:border-green-950/30 rounded-xl">
      <div className="bg-green-50/70 dark:bg-green-950/30 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48 bg-green-100/60 dark:bg-green-900/30 rounded-lg" />
            <Skeleton className="h-4 w-36 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
            <Skeleton className="h-4 w-40 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="py-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-14 h-14 rounded-full bg-green-100/60 dark:bg-green-900/30" />
                <Skeleton className="mt-3 h-4 w-16 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Skeleton className="h-6 w-36 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
            <Skeleton className="h-32 w-full bg-green-100/60 dark:bg-green-900/30 rounded-xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-36 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
            <Skeleton className="h-32 w-full bg-green-100/60 dark:bg-green-900/30 rounded-xl" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-40 bg-green-100/60 dark:bg-green-900/30 rounded-md" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full bg-green-100/60 dark:bg-green-900/30 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, isError } = useQuery<OrderDetailsType>({
    queryKey: ["orderDetails", id],
    queryFn: () => StoreAPI.OrderDetails(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (isError || !order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Không thể tải thông tin đơn hàng</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Vui lòng thử lại sau hoặc liên hệ hỗ trợ</p>
        <Button asChild className="mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-sm dark:shadow-green-900/20 rounded-full">
          <Link to={routes.store.account.orders}>Quay lại danh sách đơn hàng</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = format(new Date(order.createdAt), "PPP", { locale: vi });

  return (
    <>
      <Helmet>
        <title>{`Đơn hàng #${id?.slice(-6)} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="container max-w-4xl py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Button 
              asChild 
              variant="outline" 
              className="gap-1 group hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950/40 dark:hover:text-green-400 hover:border-green-200 dark:hover:border-green-800 rounded-full shadow-sm dark:shadow-none"
            >
              <Link to={routes.store.account.orders}>
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại danh sách
              </Link>
            </Button>
            <StatusBadge status={order.status} />
          </div>

          <Card className="mb-6 overflow-hidden border-0 dark:border dark:border-green-950/20 shadow-md dark:shadow-lg dark:shadow-green-950/10 rounded-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-950/40 dark:to-green-950/20 py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-green-700 dark:text-green-400 flex items-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-400 dark:from-green-500 dark:to-green-600 rounded-full mr-3 shadow-sm dark:shadow-green-900/30"></div>
                    Đơn hàng #{id?.slice(-6)}
                  </CardTitle>
                  <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-2 ml-4">
                    <CalendarIcon className="mr-1.5 h-4 w-4 text-green-500 dark:text-green-400" /> {formattedDate}
                  </p>
                </div>
                <div className="flex flex-col sm:items-end">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phương thức thanh toán</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <BanknoteIcon className="h-3.5 w-3.5 mr-1.5 text-green-500 dark:text-green-400" />
                    {formatPaymentMethod(order.paymentMethod)}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <OrderTimeline status={order.status} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
                    Địa chỉ giao hàng
                  </h3>
                  <Card className="bg-gradient-to-r from-green-50/50 to-white dark:from-green-950/20 dark:to-transparent border-0 dark:border dark:border-green-950/20 shadow-sm dark:shadow-none rounded-xl overflow-hidden">
                    <CardContent className="p-4">
                      <div className="border-l-2 border-green-200 dark:border-green-800 pl-3">
                        <p className="font-medium text-gray-800 dark:text-gray-200">{order.shippingAddress.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">{order.shippingAddress.phone}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                          {order.shippingAddress.addressLine1}, 
                          {order.shippingAddress.addressLine2 ? `${order.shippingAddress.addressLine2}, ` : ''}
                          <br />
                          {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                    <BanknoteIcon className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
                    Tổng quan đơn hàng
                  </h3>
                  <Card className="bg-gradient-to-r from-green-50/50 to-white dark:from-green-950/20 dark:to-transparent border-0 dark:border dark:border-green-950/20 shadow-sm dark:shadow-none rounded-xl overflow-hidden">
                    <CardContent className="p-4">
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Tạm tính</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{formatCurrency(order.subTotal)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Phí vận chuyển</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{formatCurrency(order.shippingFee)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                            <span className="text-sm flex items-center">
                              <CheckCircle2Icon className="h-3.5 w-3.5 mr-1.5" />
                              Giảm giá
                            </span>
                            <span className="font-medium">-{formatCurrency(order.discount)}</span>
                          </div>
                        )}
                        <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                        <div className="flex justify-between items-center pt-1">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Tổng thanh toán</span>
                          <span className="font-bold text-lg text-green-700 dark:text-green-400">{formatCurrency(order.totalPrice)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-5 flex items-center">
                  <ShoppingBagIcon className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
                  Chi tiết sản phẩm
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <motion.div 
                      key={item.medicineId}
                      className="flex items-center p-4 border border-green-100 dark:border-green-900/50 rounded-xl bg-white dark:bg-gray-900/30 shadow-sm dark:shadow-md dark:shadow-green-950/10 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-green-950/20 transition-all duration-300"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)"
                      }}
                    >
                      <div className="h-16 w-16 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/50 rounded-lg flex items-center justify-center overflow-hidden p-1 shadow-sm dark:shadow-green-950/30">
                        {item.medicine.thumbnail?.url ? (
                          <img 
                            src={item.medicine.thumbnail.url} 
                            alt={item.medicine.thumbnail.alt} 
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <ShoppingBagIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <div className="ml-5 flex-1">
                        <div className="font-medium text-gray-800 dark:text-gray-200">{item.medicine.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Mã sản phẩm: {item.medicineId.slice(0, 8)}...
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 flex items-center">
                          <span className="inline-block mr-3 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs">
                            {formatCurrency(item.price)} × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-700 dark:text-green-400 bg-green-50/70 dark:bg-green-900/40 px-3 py-1.5 rounded-lg">{formatCurrency(item.itemTotal)}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
} 