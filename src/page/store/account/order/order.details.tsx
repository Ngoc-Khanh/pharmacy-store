import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { routes, siteConfig } from "@/config";
import { OrderStatus, PaymentMethod } from "@/data/enum";
import { OrderDetails as OrderDetailsType } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { ArrowLeft, BanknoteIcon, CalendarIcon, CheckCircle2Icon, ClockIcon, MapPinIcon, Package, ShoppingBagIcon, Truck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

// Tạo badge với màu sắc tương ứng với trạng thái đơn hàng
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig = {
    [OrderStatus.PENDING]: { 
      color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
      label: "Chờ xác nhận",
      icon: <ClockIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.PROCESSING]: { 
      color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/50",
      label: "Đang xử lý",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.SHIPPED]: { 
      color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/50",
      label: "Đang giao hàng",
      icon: <Truck className="w-3 h-3 mr-1" />
    },
    [OrderStatus.DELIVERED]: { 
      color: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800/50",
      label: "Đã giao hàng",
      icon: <ShoppingBagIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.CANCELLED]: { 
      color: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50",
      label: "Đã hủy",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.COMPLETED]: { 
      color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/50",
      label: "Hoàn thành",
      icon: <CheckCircle2Icon className="w-3 h-3 mr-1" />
    },
  };

  const config = statusConfig[status];
  return (
    <Badge className={`${config.color} px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-sm border dark:shadow-none`}>
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
    { 
      status: OrderStatus.PENDING, 
      label: "Đã đặt hàng", 
      icon: Package,
      color: "from-green-500 to-emerald-400",
      darkColor: "from-green-400 to-emerald-500",
      bgLight: "bg-green-50",
      bgDark: "bg-green-900/20"
    },
    { 
      status: OrderStatus.PROCESSING, 
      label: "Đang xử lý", 
      icon: ClockIcon,
      color: "from-blue-500 to-cyan-400",
      darkColor: "from-blue-400 to-cyan-500",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-900/20"
    },
    { 
      status: OrderStatus.SHIPPED, 
      label: "Đang giao hàng", 
      icon: Truck,
      color: "from-indigo-500 to-purple-400",
      darkColor: "from-indigo-400 to-purple-500",
      bgLight: "bg-indigo-50",
      bgDark: "bg-indigo-900/20"
    },
    { 
      status: OrderStatus.DELIVERED, 
      label: "Đã giao hàng", 
      icon: MapPinIcon,
      color: "from-teal-500 to-cyan-400",
      darkColor: "from-teal-400 to-cyan-500",
      bgLight: "bg-teal-50",
      bgDark: "bg-teal-900/20"
    },
    { 
      status: OrderStatus.COMPLETED, 
      label: "Hoàn thành", 
      icon: CheckCircle2Icon,
      color: "from-green-500 to-emerald-400",
      darkColor: "from-green-400 to-emerald-500",
      bgLight: "bg-green-50",
      bgDark: "bg-green-900/20"
    },
  ];

  // Bỏ qua nếu đơn hàng đã hủy
  if (status === OrderStatus.CANCELLED) {
    return (
      <div className="flex items-center justify-center py-8">
        <Badge variant="destructive" className="px-6 py-2 rounded-full text-sm shadow-md flex items-center gap-2">
          <Package className="h-4 w-4" /> Đơn hàng đã bị hủy
        </Badge>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((step) => step.status === status);

  return (
    <div className="py-10 px-4 md:px-6 rounded-xl overflow-hidden relative bg-gradient-to-br from-green-50/70 to-emerald-50/40 dark:from-green-950/20 dark:to-emerald-950/10 border border-green-100/50 dark:border-green-900/30 shadow-sm">
      {/* Đường ngang nối các bước */}
      <div className="absolute top-[74px] left-[10%] right-[10%] md:left-[15%] md:right-[15%] h-1 bg-gray-200 dark:bg-gray-700 rounded-full z-0 mx-auto"></div>
      
      {/* Đường ngang đã hoàn thành */}
      <motion.div 
        className="absolute top-[74px] left-[10%] md:left-[15%] h-1 bg-gradient-to-r from-green-500 to-green-400 dark:from-green-400 dark:to-green-500 rounded-full z-0"
        initial={{ width: 0 }}
        animate={{ 
          width: currentStepIndex >= 0 ? 
            `${currentStepIndex / (steps.length - 1) * 80}%` : 0 
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Các bước của quy trình */}
      <div className="relative z-10 flex justify-between max-w-4xl mx-auto px-2">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <motion.div 
              key={step.status} 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.div 
                className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full ${
                  isActive ? 
                    `bg-gradient-to-br ${step.color} dark:${step.darkColor}` : 
                    "bg-white dark:bg-gray-800"
                } shadow-md ${
                  isActive ? 
                    "text-white ring-4 ring-white dark:ring-gray-800" : 
                    "text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-gray-700"
                } ${
                  isCurrent ? 
                    "ring-offset-2 ring-offset-green-50 dark:ring-offset-gray-900" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCurrent && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 0.3, 0.7] 
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                <StepIcon className="w-7 h-7 md:w-8 md:h-8" />
              </motion.div>
              
              <div className="h-2"></div>
              
              <motion.div 
                className={`rounded-full ${isActive ? `${step.bgLight} dark:${step.bgDark}` : 'bg-transparent'} px-3 py-1`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
              >
                <p className={`text-xs md:text-sm font-medium text-center ${
                  isActive ? 
                    "text-gray-800 dark:text-gray-100" : 
                    "text-gray-500 dark:text-gray-400"
                }`}>
                  {step.label}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile scrollbar hint */}
      <div className="mt-6 flex justify-center md:hidden">
        <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700"></div>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <Button
              asChild
              variant="ghost"
              className="self-start flex items-center text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 -ml-3"
            >
              <Link to={routes.store.account.orders}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại đơn hàng
              </Link>
            </Button>
            <StatusBadge status={order.status} />
          </div>

          <Card className="overflow-hidden border-0 dark:border dark:border-green-950/30 shadow-xl dark:shadow-lg rounded-2xl mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50/70 dark:from-green-950/30 dark:to-emerald-950/20 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-400 dark:from-green-400 dark:to-emerald-500 rounded-full"></div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      Đơn hàng #{id?.slice(-6)}
                    </h1>
                  </div>
                  <p className="mt-2 ml-3 text-gray-500 dark:text-gray-400 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    Đặt hàng ngày {formattedDate}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Phương thức thanh toán</div>
                  <div className="mt-1 flex items-center justify-end gap-2">
                    <BanknoteIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{formatPaymentMethod(order.paymentMethod)}</span>
                  </div>
                </div>
              </div>
            </div>

            <OrderTimeline status={order.status} />
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  Địa chỉ giao hàng
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
                  <div className="font-medium text-gray-800 dark:text-gray-200">{order.shippingAddress.name}</div>
                  <div className="text-gray-600 dark:text-gray-300 mt-2">{order.shippingAddress.phone}</div>
                  <div className="text-gray-500 dark:text-gray-400 mt-1">
                    {order.shippingAddress.addressLine1}, 
                    {order.shippingAddress.addressLine2 ? ` ${order.shippingAddress.addressLine2}, ` : ''} 
                    {order.shippingAddress.city}, {order.shippingAddress.country}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <BanknoteIcon className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  Thông tin thanh toán
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(order.subTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                    <span>Phí vận chuyển:</span>
                    <span>{formatCurrency(order.shippingFee)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 mb-2">
                      <span>Giảm giá:</span>
                      <span>- {formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                  <div className="flex justify-between font-bold text-gray-800 dark:text-gray-100">
                    <span>Tổng cộng:</span>
                    <span className="text-green-700 dark:text-green-400">{formatCurrency(order.totalPrice)}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="p-6 pt-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <ShoppingBagIcon className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Sản phẩm đã đặt
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <motion.div 
                    key={item.medicineId}
                    className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800/60 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center">
                        {item.medicine.thumbnail?.url ? (
                          <img 
                            src={item.medicine.thumbnail.url} 
                            alt={item.medicine.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 flex items-center justify-center">
                            <ShoppingBagIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">{item.medicine.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.medicine.description ? 
                            item.medicine.description.slice(0, 50) + (item.medicine.description.length > 50 ? '...' : '') : 
                            "Thuốc chính hãng"}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <Badge variant="outline" className="bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50 px-2.5 py-0.5">
                            {formatCurrency(item.price)} / đơn vị
                          </Badge>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            Số lượng: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right self-end sm:self-center flex flex-col items-end justify-center mt-3 sm:mt-0">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Thành tiền</div>
                      <div className="font-semibold text-green-700 dark:text-green-400 text-lg">
                        {formatCurrency(item.itemTotal)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <Button
              asChild
              variant="outline"
              className="border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-full w-full sm:w-auto"
            >
              <Link to={routes.store.account.orders}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách đơn hàng
              </Link>
            </Button>
            
            {order.status === OrderStatus.DELIVERED && (
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-md hover:shadow-lg rounded-full w-full sm:w-auto"
              >
                <CheckCircle2Icon className="mr-2 h-4 w-4" />
                Xác nhận đã nhận hàng
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
} 