import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, FileText, MapPin, ShoppingBag, Truck, CreditCard, CalendarDays, InfoIcon, RefreshCcw } from "lucide-react";
import { Order, OrderDetailProps, OrderTimelineEvent } from "./orders.types";
import { motion } from "framer-motion";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { cn } from "@/lib/utils";

// Mock data - in a real app this would come from an API call
const mockOrdersData: Record<string, Order> = {
  "ORD-1001": {
    id: "ORD-1001",
    date: "2023-11-10T14:30:00",
    status: "processing",
    totalItems: 3,
    subtotal: 520000,
    shippingFee: 40000,
    totalAmount: 560000,
    paymentMethod: "Thanh toán khi nhận hàng",
    paymentStatus: "pending",
    customer: {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@example.com"
    },
    shippingInfo: {
      address: "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1",
      city: "TP. Hồ Chí Minh",
      method: "Standard Delivery",
      estimatedDelivery: "2023-11-15"
    },
    items: [
      {
        id: "MED-101",
        name: "Paracetamol 500mg",
        quantity: 1,
        price: 35000,
        thumbnail: "https://placehold.co/80x80/22c55e/FFFFFF/png?text=P"
      },
      {
        id: "MED-203",
        name: "Vitamin C 1000mg",
        quantity: 2,
        price: 165000,
        thumbnail: "https://placehold.co/80x80/0ea5e9/FFFFFF/png?text=VC"
      },
      {
        id: "MED-305",
        name: "Probiotics 30 viên",
        quantity: 1,
        price: 195000,
        thumbnail: "https://placehold.co/80x80/a855f7/FFFFFF/png?text=PRO"
      }
    ],
    timeline: [
      { date: "2023-11-10T14:30:00", status: "placed", title: "Đơn hàng đã được tạo", description: "Đơn hàng của bạn đã được tiếp nhận" },
      { date: "2023-11-10T15:45:00", status: "confirmed", title: "Đơn hàng đã được xác nhận", description: "Dược sĩ đã xác nhận đơn hàng của bạn" },
      { date: "2023-11-11T10:20:00", status: "processing", title: "Đơn hàng đang được xử lý", description: "Đơn hàng của bạn đang được đóng gói" }
    ]
  },
  "ORD-1002": {
    id: "ORD-1002",
    date: "2023-11-12T09:15:00",
    status: "shipping",
    totalItems: 2,
    subtotal: 320000,
    shippingFee: 30000,
    totalAmount: 350000,
    paymentMethod: "Thẻ tín dụng",
    paymentStatus: "paid",
    customer: {
      name: "Trần Thị B",
      phone: "0907654321",
      email: "tranthib@example.com"
    },
    shippingInfo: {
      address: "456 Đường Lê Lợi, Phường Bến Thành, Quận 1",
      city: "TP. Hồ Chí Minh",
      method: "Express Delivery",
      estimatedDelivery: "2023-11-14"
    },
    items: [
      {
        id: "MED-405",
        name: "Dầu gió xanh",
        quantity: 1,
        price: 45000,
        thumbnail: "https://placehold.co/80x80/ec4899/FFFFFF/png?text=DG"
      },
      {
        id: "MED-501",
        name: "Thuốc bổ gan",
        quantity: 1,
        price: 305000,
        thumbnail: "https://placehold.co/80x80/f97316/FFFFFF/png?text=TBG"
      }
    ],
    timeline: [
      { date: "2023-11-12T09:15:00", status: "placed", title: "Đơn hàng đã được tạo", description: "Đơn hàng của bạn đã được tiếp nhận" },
      { date: "2023-11-12T10:30:00", status: "confirmed", title: "Đơn hàng đã được xác nhận", description: "Dược sĩ đã xác nhận đơn hàng của bạn" },
      { date: "2023-11-12T14:20:00", status: "processing", title: "Đơn hàng đang được xử lý", description: "Đơn hàng của bạn đang được đóng gói" },
      { date: "2023-11-13T09:45:00", status: "shipping", title: "Đơn hàng đang được giao", description: "Đơn hàng của bạn đã được giao cho đơn vị vận chuyển" }
    ],
    trackingInfo: {
      carrier: "GiaoHangNhanh",
      trackingNumber: "GHN1234567890",
      trackingUrl: "https://tracking.giaohangnhanh.vn"
    }
  },
  "ORD-985": {
    id: "ORD-985",
    date: "2023-10-25T11:20:00",
    status: "delivered",
    totalItems: 4,
    subtotal: 750000,
    shippingFee: 30000,
    totalAmount: 780000,
    paymentMethod: "Ví điện tử MoMo",
    paymentStatus: "paid",
    customer: {
      name: "Lê Văn C",
      phone: "0903456789",
      email: "levanc@example.com"
    },
    shippingInfo: {
      address: "789 Đường Phan Xích Long, Phường 7, Quận Phú Nhuận",
      city: "TP. Hồ Chí Minh",
      method: "Standard Delivery",
      deliveredAt: "2023-10-28T14:35:00"
    },
    items: [
      {
        id: "MED-201",
        name: "Thuốc trị đau dạ dày",
        quantity: 1,
        price: 210000,
        thumbnail: "https://placehold.co/80x80/f43f5e/FFFFFF/png?text=DDG"
      },
      {
        id: "MED-305",
        name: "Dầu gội dược liệu",
        quantity: 1,
        price: 190000,
        thumbnail: "https://placehold.co/80x80/84cc16/FFFFFF/png?text=DG"
      },
      {
        id: "MED-402",
        name: "Thuốc nhỏ mắt",
        quantity: 2,
        price: 190000,
        thumbnail: "https://placehold.co/80x80/06b6d4/FFFFFF/png?text=TM"
      }
    ],
    timeline: [
      { date: "2023-10-25T11:20:00", status: "placed", title: "Đơn hàng đã được tạo", description: "Đơn hàng của bạn đã được tiếp nhận" },
      { date: "2023-10-25T13:30:00", status: "confirmed", title: "Đơn hàng đã được xác nhận", description: "Dược sĩ đã xác nhận đơn hàng của bạn" },
      { date: "2023-10-26T09:15:00", status: "processing", title: "Đơn hàng đang được xử lý", description: "Đơn hàng của bạn đang được đóng gói" },
      { date: "2023-10-26T15:40:00", status: "shipping", title: "Đơn hàng đang được giao", description: "Đơn hàng của bạn đã được giao cho đơn vị vận chuyển" },
      { date: "2023-10-28T14:35:00", status: "delivered", title: "Đơn hàng đã được giao", description: "Đơn hàng của bạn đã được giao thành công" }
    ]
  },
  "ORD-972": {
    id: "ORD-972",
    date: "2023-10-15T16:45:00",
    status: "cancelled",
    totalItems: 2,
    subtotal: 450000,
    shippingFee: 0,
    totalAmount: 450000,
    paymentMethod: "Thẻ tín dụng",
    paymentStatus: "refunded",
    customer: {
      name: "Phạm Thị D",
      phone: "0905678901",
      email: "phamthid@example.com"
    },
    shippingInfo: {
      address: "101 Đường CMT8, Phường 4, Quận 3",
      city: "TP. Hồ Chí Minh",
      method: "Standard Delivery"
    },
    items: [
      {
        id: "MED-601",
        name: "Thuốc kháng sinh",
        quantity: 1,
        price: 350000,
        thumbnail: "https://placehold.co/80x80/8b5cf6/FFFFFF/png?text=KS"
      },
      {
        id: "MED-702",
        name: "Siro ho trẻ em",
        quantity: 1,
        price: 100000,
        thumbnail: "https://placehold.co/80x80/fb7185/FFFFFF/png?text=SIRO"
      }
    ],
    timeline: [
      { date: "2023-10-15T16:45:00", status: "placed", title: "Đơn hàng đã được tạo", description: "Đơn hàng của bạn đã được tiếp nhận" },
      { date: "2023-10-15T17:30:00", status: "confirmed", title: "Đơn hàng đã được xác nhận", description: "Dược sĩ đã xác nhận đơn hàng của bạn" },
      { date: "2023-10-16T10:15:00", status: "cancelled", title: "Đơn hàng đã bị hủy", description: "Đơn hàng đã bị hủy do: Hết hàng" }
    ],
    cancelReason: "Hết hàng"
  }
};

export function OrderDetail({ orderId, onBack }: OrderDetailProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setOrder(mockOrdersData[orderId]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [orderId]);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'placed':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30">Đã đặt hàng</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30">Đã xác nhận</Badge>;
      case 'processing':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30">Đang xử lý</Badge>;
      case 'shipping':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">Đang giao hàng</Badge>;
      case 'delivered':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30">Đã giao hàng</Badge>;
      case 'cancelled':
        return <Badge className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30">Đã thanh toán</Badge>;
      case 'pending':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">Chờ thanh toán</Badge>;
      case 'refunded':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/30">Đã hoàn tiền</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get step icon based on status
  const getStepIcon = (status: string) => {
    switch (status) {
      case 'placed':
        return <ShoppingBag className="h-4 w-4 text-white" />;
      case 'confirmed':
        return <FileText className="h-4 w-4 text-white" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-white" />;
      case 'shipping':
        return <Truck className="h-4 w-4 text-white" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-white" />;
      case 'cancelled':
        return <InfoIcon className="h-4 w-4 text-white" />;
      default:
        return <Clock className="h-4 w-4 text-white" />;
    }
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <Skeleton className="h-[200px] rounded-xl" />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] rounded-xl" />
          <Skeleton className="h-[300px] rounded-xl" />
        </div>
        
        <div className="flex justify-end gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </motion.div>
    );
  }

  if (!order) {
    return (
      <Alert variant="destructive" className="border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20">
        <AlertTitle className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5" />
          Không tìm thấy đơn hàng
        </AlertTitle>
        <AlertDescription>
          Không thể tìm thấy thông tin cho đơn hàng {orderId}. Vui lòng kiểm tra lại.
        </AlertDescription>
      </Alert>
    );
  }

  // Get the current active step index
  const getActiveStep = () => {
    if (!order || !order.timeline) return 1;
    return order.timeline.length;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-6xl mx-auto"
    >
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại đơn hàng
        </Button>
        {order.status === 'cancelled' && (
          <Badge className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30 py-1.5 shadow-sm">
            <InfoIcon className="h-4 w-4 mr-1" />
            Đơn hàng đã bị hủy
          </Badge>
        )}
      </div>

      {/* Order info header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-teal-50/50 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-teal-950/10 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/30 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">
              Đơn hàng #{order.id}
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Đặt hàng ngày {formatDate(order.date)}</span>
            </div>
          </div>
        </div>

        {order.status === 'shipping' && order.trackingInfo && (
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md transition-all hover:shadow-lg">
            <a 
              href={order.trackingInfo.trackingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Truck className="h-4 w-4" />
              Theo dõi đơn hàng
            </a>
          </Button>
        )}
      </motion.div>
      
      {/* Order status timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-md overflow-hidden rounded-xl">
          <CardHeader className="bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-teal-50/50 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-teal-950/10 border-b border-emerald-100 dark:border-emerald-800/30 py-5">
            <CardTitle className="flex items-center gap-2 text-xl text-emerald-800 dark:text-emerald-300">
              <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Trạng thái đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-b from-white to-emerald-50/20 dark:from-gray-900 dark:to-emerald-950/5">
            <Timeline 
              defaultValue={getActiveStep()} 
              orientation="horizontal"
              className="px-2"
            >
              {order.timeline.map((event: OrderTimelineEvent, index) => (
                <TimelineItem 
                  key={index} 
                  step={index + 1}
                  className="transition-all"
                >
                  <TimelineHeader>
                    <TimelineSeparator />
                    <TimelineDate className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1.5">
                      <CalendarDays className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500 dark:text-emerald-400" />
                      {formatDate(event.date)}
                    </TimelineDate>
                    <TimelineTitle className="flex items-center gap-2 font-medium text-emerald-800 dark:text-emerald-300">
                      {event.title}
                      {getStatusBadge(event.status)}
                    </TimelineTitle>
                    <TimelineIndicator className={cn(
                      "flex items-center justify-center shadow-md",
                      index + 1 <= getActiveStep() 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white dark:from-emerald-600 dark:to-teal-700" 
                        : "bg-gray-200 dark:bg-gray-700"
                    )}>
                      {getStepIcon(event.status)}
                    </TimelineIndicator>
                  </TimelineHeader>
                  <TimelineContent className="text-gray-700 dark:text-gray-300 mt-2">
                    {event.description}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Order items */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-md overflow-hidden rounded-xl">
          <CardHeader className="bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-teal-50/50 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-teal-950/10 border-b border-emerald-100 dark:border-emerald-800/30 py-5">
            <CardTitle className="flex items-center gap-2 text-xl text-emerald-800 dark:text-emerald-300">
              <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Chi tiết đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-b from-white to-emerald-50/20 dark:from-gray-900 dark:to-emerald-950/5">
            <div className="space-y-5">
              {order.items.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30 bg-white dark:bg-gray-900/80 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/10 transition-colors shadow-sm hover:shadow-md"
                >
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-lg overflow-hidden border border-emerald-100 dark:border-emerald-800/30 shadow-sm bg-white dark:bg-gray-800 p-1 flex items-center justify-center">
                      <img 
                        src={item.thumbnail} 
                        alt={item.name}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-lg text-emerald-800 dark:text-emerald-300">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Đơn giá: {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Số lượng</p>
                    <p className="font-medium bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20 px-3 py-1.5 rounded-full text-emerald-700 dark:text-emerald-400 shadow-sm">{item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Thành tiền</p>
                    <p className="font-medium text-emerald-700 dark:text-emerald-400">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Separator className="my-6 bg-emerald-100 dark:bg-emerald-800/30" />
            
            <div className="space-y-3 p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Tạm tính</p>
                <p>{formatCurrency(order.subtotal)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Phí vận chuyển</p>
                <p>{formatCurrency(order.shippingFee)}</p>
              </div>
              <Separator className="my-3 bg-emerald-200/50 dark:bg-emerald-800/30" />
              <div className="flex justify-between font-medium">
                <p className="text-emerald-800 dark:text-emerald-300">Tổng cộng</p>
                <p className="text-lg text-emerald-700 dark:text-emerald-400 font-semibold">{formatCurrency(order.totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Customer and shipping info */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-md overflow-hidden rounded-xl h-full">
          <CardHeader className="bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-teal-50/50 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-teal-950/10 border-b border-emerald-100 dark:border-emerald-800/30 py-5">
            <CardTitle className="flex items-center gap-2 text-xl text-emerald-800 dark:text-emerald-300">
              <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Thông tin giao hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-b from-white to-emerald-50/20 dark:from-gray-900 dark:to-emerald-950/5 h-full">
            <div className="space-y-4 h-full">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                <p className="font-medium mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <MapPin className="h-4 w-4" />
                  Địa chỉ giao hàng
                </p>
                <p className="text-muted-foreground">{order.shippingInfo.address}</p>
                <p className="text-muted-foreground">{order.shippingInfo.city}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                <p className="font-medium mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <Truck className="h-4 w-4" />
                  Phương thức vận chuyển
                </p>
                <p className="text-muted-foreground">{order.shippingInfo.method}</p>
              </div>
              {order.status === 'delivered' && order.shippingInfo.deliveredAt && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                  <p className="font-medium mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    Thời gian giao hàng
                  </p>
                  <p className="text-muted-foreground">{formatDate(order.shippingInfo.deliveredAt)}</p>
                </div>
              )}
              {(order.status === 'processing' || order.status === 'shipping') && order.shippingInfo.estimatedDelivery && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                  <p className="font-medium mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <Clock className="h-4 w-4" />
                    Dự kiến giao hàng
                  </p>
                  <p className="text-muted-foreground">{order.shippingInfo.estimatedDelivery}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-md overflow-hidden rounded-xl h-full">
          <CardHeader className="bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-teal-50/50 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-teal-950/10 border-b border-emerald-100 dark:border-emerald-800/30 py-5">
            <CardTitle className="flex items-center gap-2 text-xl text-emerald-800 dark:text-emerald-300">
              <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Thông tin thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-b from-white to-emerald-50/20 dark:from-gray-900 dark:to-emerald-950/5 h-full">
            <div className="space-y-4 h-full">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                <p className="font-medium mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <FileText className="h-4 w-4" />
                  Khách hàng
                </p>
                <p className="text-muted-foreground">{order.customer.name}</p>
                <p className="text-muted-foreground">{order.customer.email}</p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                <p className="font-medium mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <CreditCard className="h-4 w-4" />
                  Phương thức thanh toán
                </p>
                <p className="text-muted-foreground">{order.paymentMethod}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                <p className="font-medium mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <InfoIcon className="h-4 w-4" />
                  Trạng thái thanh toán
                </p>
                <div className="mt-1">{getPaymentStatusBadge(order.paymentStatus)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Actions footer */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-end gap-4 mt-8 pb-8"
      >
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        
        {order.status === 'delivered' && (
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md transition-all hover:shadow-lg">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Mua lại
          </Button>
        )}
        
        {(order.status === 'processing' || order.status === 'placed' || order.status === 'confirmed') && (
          <Button variant="destructive" className="shadow-md hover:shadow-lg transition-all">
            <InfoIcon className="h-4 w-4 mr-2" />
            Hủy đơn hàng
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
} 