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

// Tạo badge với màu sắc tương ứng với trạng thái đơn hàng
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig = {
    [OrderStatus.PENDING]: { 
      color: "bg-green-50 text-green-700 border-green-200", 
      label: "Chờ xác nhận",
      icon: <ClockIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.PROCESSING]: { 
      color: "bg-blue-50 text-blue-600 border-blue-200", 
      label: "Đang xử lý",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.SHIPPED]: { 
      color: "bg-indigo-50 text-indigo-600 border-indigo-200", 
      label: "Đang giao hàng",
      icon: <Truck className="w-3 h-3 mr-1" />
    },
    [OrderStatus.DELIVERED]: { 
      color: "bg-teal-50 text-teal-600 border-teal-200", 
      label: "Đã giao hàng",
      icon: <ShoppingBagIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.CANCELLED]: { 
      color: "bg-rose-50 text-rose-600 border-rose-200", 
      label: "Đã hủy",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.COMPLETED]: { 
      color: "bg-green-50 text-green-700 border-green-200", 
      label: "Hoàn thành",
      icon: <CheckCircle2Icon className="w-3 h-3 mr-1" />
    },
  };

  const config = statusConfig[status];
  return (
    <Badge className={`${config.color} px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-sm`}>
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
        <Badge variant="destructive" className="px-4 py-1.5 rounded-full shadow-sm">
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
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
                  isActive ? "bg-gradient-to-r from-green-600 to-green-500 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                <StepIcon className={`w-6 h-6 ${isActive ? "" : "opacity-60"}`} />
              </div>
              <p className={`text-xs mt-3 font-medium ${isActive ? "text-green-700" : "text-gray-400"}`}>
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
                    isPast ? "bg-gradient-to-r from-green-600 to-green-500" : "bg-gray-200"
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

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, isError } = useQuery<OrderDetailsType>({
    queryKey: ["orderDetails", id],
    queryFn: () => StoreAPI.OrderDetails(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6 p-6">
        <div className="h-8 bg-green-50 rounded-full w-1/3"></div>
        <div className="h-64 bg-green-50 rounded-lg"></div>
        <div className="h-32 bg-green-50 rounded-lg"></div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">Không thể tải thông tin đơn hàng</h2>
        <p className="mt-2 text-gray-500">Vui lòng thử lại sau hoặc liên hệ hỗ trợ</p>
        <Button asChild className="mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-sm rounded-full">
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
              className="gap-1 group hover:bg-green-50 hover:text-green-700 hover:border-green-200 rounded-full shadow-sm"
            >
              <Link to={routes.store.account.orders}>
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại danh sách
              </Link>
            </Button>
            <StatusBadge status={order.status} />
          </div>

          <Card className="mb-6 overflow-hidden border-0 shadow-md rounded-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-green-700 flex items-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-400 rounded-full mr-3 shadow-sm"></div>
                    Đơn hàng #{id?.slice(-6)}
                  </CardTitle>
                  <p className="text-gray-500 text-sm flex items-center mt-2 ml-4">
                    <CalendarIcon className="mr-1.5 h-4 w-4 text-green-500" /> {formattedDate}
                  </p>
                </div>
                <div className="flex flex-col sm:items-end">
                  <p className="text-sm font-medium text-gray-700">Phương thức thanh toán</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <BanknoteIcon className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                    {formatPaymentMethod(order.paymentMethod)}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <OrderTimeline status={order.status} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2 text-green-500" />
                    Địa chỉ giao hàng
                  </h3>
                  <Card className="bg-gradient-to-r from-green-50/50 to-white border-0 shadow-sm rounded-xl overflow-hidden">
                    <CardContent className="p-4">
                      <div className="border-l-2 border-green-200 pl-3">
                        <p className="font-medium text-gray-800">{order.shippingAddress.name}</p>
                        <p className="text-sm text-gray-500 mt-1.5">{order.shippingAddress.phone}</p>
                        <p className="text-sm text-gray-500 mt-1.5">
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
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                    <BanknoteIcon className="h-4 w-4 mr-2 text-green-500" />
                    Tổng quan đơn hàng
                  </h3>
                  <Card className="bg-gradient-to-r from-green-50/50 to-white border-0 shadow-sm rounded-xl overflow-hidden">
                    <CardContent className="p-4">
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Tạm tính</span>
                          <span className="font-medium text-gray-700">{formatCurrency(order.subTotal)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Phí vận chuyển</span>
                          <span className="font-medium text-gray-700">{formatCurrency(order.shippingFee)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between items-center text-green-600">
                            <span className="text-sm flex items-center">
                              <CheckCircle2Icon className="h-3.5 w-3.5 mr-1.5" />
                              Giảm giá
                            </span>
                            <span className="font-medium">-{formatCurrency(order.discount)}</span>
                          </div>
                        )}
                        <Separator className="my-3" />
                        <div className="flex justify-between items-center pt-1">
                          <span className="font-medium text-gray-700">Tổng thanh toán</span>
                          <span className="font-bold text-lg text-green-700">{formatCurrency(order.totalPrice)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-medium text-gray-700 mb-5 flex items-center">
                  <ShoppingBagIcon className="h-4 w-4 mr-2 text-green-500" />
                  Chi tiết sản phẩm
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <motion.div 
                      key={item.medicineId}
                      className="flex items-center p-4 border border-green-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)"
                      }}
                    >
                      <div className="h-18 w-18 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center overflow-hidden p-1 shadow-sm">
                        {item.medicine.thumbnail?.url ? (
                          <img 
                            src={item.medicine.thumbnail.url} 
                            alt={item.medicine.thumbnail.alt} 
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <ShoppingBagIcon className="h-8 w-8 text-green-600" />
                        )}
                      </div>
                      <div className="ml-5 flex-1">
                        <div className="font-medium text-gray-800">{item.medicine.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Mã sản phẩm: {item.medicineId.slice(0, 8)}...
                        </div>
                        <div className="text-sm text-gray-500 mt-1.5 flex items-center">
                          <span className="inline-block mr-3 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs">
                            {formatCurrency(item.price)} × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-700 bg-green-50/70 px-3 py-1.5 rounded-lg">{formatCurrency(item.itemTotal)}</div>
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