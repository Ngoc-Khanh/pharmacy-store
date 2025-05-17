import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle, Clock, FileText, MapPin, ShoppingBag, Truck } from "lucide-react";
import { Order, OrderDetailProps, OrderTimelineEvent } from "./orders.types";

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
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Đã đặt hàng</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Đã xác nhận</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Đang xử lý</Badge>;
      case 'shipping':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Đang giao hàng</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Đã giao hàng</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Đã thanh toán</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Chờ thanh toán</Badge>;
      case 'refunded':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Đã hoàn tiền</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get step icon based on status
  const getStepIcon = (status: string) => {
    switch (status) {
      case 'placed':
        return <ShoppingBag className="h-5 w-5" />;
      case 'confirmed':
        return <FileText className="h-5 w-5" />;
      case 'processing':
        return <Clock className="h-5 w-5" />;
      case 'shipping':
        return <Truck className="h-5 w-5" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'cancelled':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
        </div>
        
        <Skeleton className="h-[300px] rounded-xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Không tìm thấy đơn hàng</AlertTitle>
        <AlertDescription>
          Không thể tìm thấy thông tin cho đơn hàng {orderId}. Vui lòng kiểm tra lại.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại đơn hàng
        </Button>
        {order.status === 'cancelled' && (
          <Badge variant="destructive">Đơn hàng đã bị hủy</Badge>
        )}
      </div>

      {/* Order info header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            Đơn hàng #{order.id}
          </h2>
          <p className="text-muted-foreground">
            Đặt hàng ngày {formatDate(order.date)}
          </p>
        </div>

        {order.status === 'shipping' && order.trackingInfo && (
          <Button variant="outline">
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
      </div>
      
      {/* Order status timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Trạng thái đơn hàng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {order.timeline.map((event: OrderTimelineEvent, index) => (
              <li key={index} className="mb-8 ml-6 last:mb-0">
                <span className={cn(
                  "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900",
                  index === order.timeline.length - 1 ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                )}>
                  {getStepIcon(event.status)}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-2 font-medium text-sm">
                    {event.title}
                    {getStatusBadge(event.status)}
                  </h3>
                  <time className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(event.date)}
                  </time>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {event.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      
      {/* Order items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-green-600" />
            Chi tiết đơn hàng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src={item.thumbnail} 
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Đơn giá: {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Số lượng</p>
                  <p>{item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Thành tiền</p>
                  <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Tạm tính</p>
              <p>{formatCurrency(order.subtotal)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Phí vận chuyển</p>
              <p>{formatCurrency(order.shippingFee)}</p>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <p>Tổng cộng</p>
              <p className="text-lg">{formatCurrency(order.totalAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Customer and shipping info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Thông tin giao hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Địa chỉ giao hàng</p>
                <p className="text-muted-foreground">{order.shippingInfo.address}</p>
                <p className="text-muted-foreground">{order.shippingInfo.city}</p>
              </div>
              <div>
                <p className="font-medium">Phương thức vận chuyển</p>
                <p className="text-muted-foreground">{order.shippingInfo.method}</p>
              </div>
              {order.status === 'delivered' && order.shippingInfo.deliveredAt && (
                <div>
                  <p className="font-medium">Thời gian giao hàng</p>
                  <p className="text-muted-foreground">{formatDate(order.shippingInfo.deliveredAt)}</p>
                </div>
              )}
              {(order.status === 'processing' || order.status === 'shipping') && order.shippingInfo.estimatedDelivery && (
                <div>
                  <p className="font-medium">Dự kiến giao hàng</p>
                  <p className="text-muted-foreground">{order.shippingInfo.estimatedDelivery}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Thông tin thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Khách hàng</p>
                <p className="text-muted-foreground">{order.customer.name}</p>
                <p className="text-muted-foreground">{order.customer.email}</p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
              <div>
                <p className="font-medium">Phương thức thanh toán</p>
                <p className="text-muted-foreground">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="font-medium">Trạng thái thanh toán</p>
                <div className="mt-1">{getPaymentStatusBadge(order.paymentStatus)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Actions footer */}
      <CardFooter className="flex justify-end gap-4 mt-4 px-0">
        <Button 
          variant="ghost" 
          onClick={onBack}
        >
          Quay lại
        </Button>
        
        {order.status === 'delivered' && (
          <Button>
            Mua lại
          </Button>
        )}
        
        {(order.status === 'processing' || order.status === 'placed' || order.status === 'confirmed') && (
          <Button variant="destructive">
            Hủy đơn hàng
          </Button>
        )}
      </CardFooter>
    </div>
  );
} 