import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatus, PaymentMethod } from "@/data/enum";
import { OrderAdminDetailsItem } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { OrderAPI } from "@/services/api/order.api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Clock,
  CreditCard,
  Info,
  MapPin,
  Package,
  Pill,
  ShoppingBag,
  Truck,
  XCircle
} from "lucide-react";
import { memo } from "react";

interface OrdersViewDetailsProps {
  orderId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrdersViewDetails = memo(function OrdersViewDetails({ 
  orderId, 
  open, 
  onOpenChange 
}: OrdersViewDetailsProps) {
  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => (orderId ? OrderAPI.OrderDetail(orderId) : null),
    enabled: !!orderId && open,
  });

  const getStatusConfig = (status?: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return {
          label: "Chờ xử lý",
          color: "bg-gradient-to-r from-yellow-50 to-amber-100 text-amber-600 border-amber-200/50 dark:from-yellow-900/20 dark:to-amber-800/20 dark:text-amber-300 dark:border-amber-700/30",
          icon: <Clock className="h-3.5 w-3.5 mr-1" />
        };
      case OrderStatus.PROCESSING:
        return {
          label: "Đang xử lý",
          color: "bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-600 border-blue-200/50 dark:from-blue-900/20 dark:to-indigo-800/20 dark:text-blue-300 dark:border-blue-700/30",
          icon: <Clock className="h-3.5 w-3.5 mr-1" />
        };
      case OrderStatus.SHIPPED:
        return {
          label: "Đang giao hàng",
          color: "bg-gradient-to-r from-indigo-50 to-purple-100 text-indigo-600 border-indigo-200/50 dark:from-indigo-900/20 dark:to-purple-800/20 dark:text-indigo-300 dark:border-indigo-700/30",
          icon: <Truck className="h-3.5 w-3.5 mr-1" />
        };
      case OrderStatus.DELIVERED:
        return {
          label: "Đã giao hàng",
          color: "bg-gradient-to-r from-teal-50 to-emerald-100 text-emerald-600 border-emerald-200/50 dark:from-teal-900/20 dark:to-emerald-800/20 dark:text-emerald-300 dark:border-emerald-700/30",
          icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
        };
      case OrderStatus.COMPLETED:
        return {
          label: "Hoàn thành",
          color: "bg-gradient-to-r from-green-50 to-teal-100 text-teal-600 border-teal-200/50 dark:from-green-900/20 dark:to-teal-800/20 dark:text-teal-300 dark:border-teal-700/30",
          icon: <ShoppingBag className="h-3.5 w-3.5 mr-1" />
        };
      case OrderStatus.CANCELLED:
        return {
          label: "Đã hủy",
          color: "bg-gradient-to-r from-red-50 to-rose-100 text-rose-600 border-rose-200/50 dark:from-red-900/20 dark:to-rose-800/20 dark:text-rose-300 dark:border-rose-700/30",
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />
        };
      default:
        return {
          label: "Không xác định",
          color: "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-600 border-slate-200/50 dark:from-slate-800/30 dark:to-slate-700/30 dark:text-slate-300 dark:border-slate-600/30",
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />
        };
    }
  };

  const getPaymentMethodDisplay = (method?: string) => {
    switch (method) {
      case PaymentMethod.COD:
        return {
          label: "Thanh toán khi nhận hàng",
          color: "text-amber-600 dark:text-amber-400",
          icon: <Banknote className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        };
      case PaymentMethod.CREDIT_CARD:
        return {
          label: "Thẻ tín dụng",
          color: "text-blue-600 dark:text-blue-400",
          icon: <CreditCard className="h-4 w-4 text-blue-500 dark:text-blue-400" />
        };
      case PaymentMethod.BANK_TRANSFER:
        return {
          label: "Chuyển khoản ngân hàng",
          color: "text-green-600 dark:text-green-400",
          icon: <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
        };
      default:
        return {
          label: "Không xác định",
          color: "text-slate-600 dark:text-slate-400",
          icon: <AlertCircle className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        };
    }
  };

  const statusConfig = getStatusConfig(orderDetails?.status);
  const paymentMethodConfig = getPaymentMethodDisplay(orderDetails?.paymentMethod);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl w-full p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <SheetHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="h-8 w-8 rounded-full"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <SheetTitle className="text-xl font-semibold flex items-center gap-1.5">
                    <Package className="h-5 w-5 text-teal-500" />
                    {isLoading ? (
                      <Skeleton className="w-32 h-7" />
                    ) : (
                      <span>
                        Đơn hàng #{orderDetails?.id.slice(0, 8)}
                      </span>
                    )}
                  </SheetTitle>
                  <SheetDescription className="mt-1">
                    {isLoading ? (
                      <Skeleton className="w-48 h-5" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <CalendarClock className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500">
                          {orderDetails?.createdAt 
                            ? format(new Date(orderDetails.createdAt), "PPP", { locale: vi }) 
                            : "Không có dữ liệu"}
                        </span>
                      </div>
                    )}
                  </SheetDescription>
                </div>
              </div>
              {!isLoading && orderDetails?.status && (
                <div className="flex items-center">
                  <div className={`flex items-center justify-center px-3 py-1.5 text-xs font-medium border rounded-full shadow-sm ${statusConfig.color}`}>
                    {statusConfig.icon}
                    {statusConfig.label}
                  </div>
                </div>
              )}
            </SheetHeader>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 px-6 py-4">
            {isLoading ? (
              <OrderDetailsLoading />
            ) : orderDetails ? (
              <div className="space-y-6">
                {/* Order summary */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 rounded-lg p-4 border border-teal-100/50 dark:border-teal-800/30 shadow-sm">
                  <h3 className="text-sm font-medium text-teal-700 dark:text-teal-300 flex items-center gap-1.5 mb-3">
                    <Info className="h-4 w-4" />
                    Tổng quan đơn hàng
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Tạm tính:</span>
                      <span>{formatCurrency(orderDetails.subTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Phí vận chuyển:</span>
                      <span>{formatCurrency(orderDetails.shippingFee)}</span>
                    </div>
                    {orderDetails.discount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Giảm giá:</span>
                        <span className="text-red-500 dark:text-red-400">-{formatCurrency(orderDetails.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-teal-100 dark:border-teal-800/30 mt-2">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Tổng tiền:</span>
                      <span className="font-semibold text-teal-600 dark:text-teal-400">{formatCurrency(orderDetails.totalPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment method */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-3">
                    {paymentMethodConfig.icon}
                    Phương thức thanh toán
                  </h3>
                  <p className={`text-sm ${paymentMethodConfig.color}`}>{paymentMethodConfig.label}</p>
                </div>

                {/* Shipping address */}
                {orderDetails.shippingAddress && (
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-3">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      Địa chỉ giao hàng
                    </h3>
                    <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      <p className="font-medium text-slate-800 dark:text-slate-200">{orderDetails.shippingAddress.name}</p>
                      <p>{orderDetails.shippingAddress.phone}</p>
                      <p>{orderDetails.shippingAddress.addressLine1}</p>
                      {orderDetails.shippingAddress.addressLine2 && (
                        <p>{orderDetails.shippingAddress.addressLine2}</p>
                      )}
                      <p>
                        {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state && `${orderDetails.shippingAddress.state}, `}
                        {orderDetails.shippingAddress.country} {orderDetails.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                )}

                {/* Order items */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-3">
                    <ShoppingBag className="h-4 w-4 text-slate-500" />
                    Sản phẩm đã đặt ({orderDetails.items.length})
                  </h3>
                  <div className="space-y-4 mt-3">
                    {orderDetails.items.map((item, index) => (
                      <OrderItemCard key={index} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <AlertCircle className="h-10 w-10 text-slate-400 mb-2" />
                <p className="text-slate-600 dark:text-slate-400">Không tìm thấy thông tin đơn hàng</p>
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenChange(false)}
                  className="mt-4"
                >
                  Đóng
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
});

function OrderItemCard({ item }: { item: OrderAdminDetailsItem }) {
  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
        {item.medicine.thumbnail && item.medicine.thumbnail.url ? (
          <img 
            src={item.medicine.thumbnail.url} 
            alt={item.medicine.thumbnail.alt} 
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-800">
            <Pill className="h-6 w-6 text-slate-400" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {item.medicine.name}
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {item.quantity} x {formatCurrency(item.price)}
            </p>
          </div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {formatCurrency(item.itemTotal)}
          </p>
        </div>
      </div>
    </div>
  );
}

function OrderDetailsLoading() {
  return (
    <div className="space-y-6">
      {/* Order summary skeleton */}
      <div className="rounded-lg p-4 border border-slate-200 dark:border-slate-800">
        <Skeleton className="h-5 w-36 mb-4" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>

      {/* Payment method skeleton */}
      <div className="rounded-lg p-4 border border-slate-200 dark:border-slate-800">
        <Skeleton className="h-5 w-40 mb-3" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Shipping address skeleton */}
      <div className="rounded-lg p-4 border border-slate-200 dark:border-slate-800">
        <Skeleton className="h-5 w-36 mb-3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Order items skeleton */}
      <div className="rounded-lg p-4 border border-slate-200 dark:border-slate-800">
        <Skeleton className="h-5 w-40 mb-4" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="flex-1">
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 