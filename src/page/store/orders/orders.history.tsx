import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, TruckIcon, AlertCircle, CheckCircle } from "lucide-react";
import { Order, OrderHistoryFilter, OrderHistoryProps } from "./orders.types";

// Mock data for orders - in real app this would come from API
const mockOrders: Record<OrderHistoryFilter, Order[]> = {
  active: [
    {
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
    {
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
    }
  ],
  completed: [
    {
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
    }
  ],
  cancelled: [
    {
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
  ]
};

export function OrderHistory({ status, onSelectOrder }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setOrders(mockOrders[status]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [status]);

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

  // Return appropriate badge for order status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          <Clock className="h-3 w-3 mr-1" /> Đang xử lý
        </Badge>;
      case 'shipping':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
          <TruckIcon className="h-3 w-3 mr-1" /> Đang giao hàng
        </Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" /> Đã giao hàng
        </Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          <AlertCircle className="h-3 w-3 mr-1" /> Đã hủy
        </Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
          <Package className="h-3 w-3 mr-1" /> {status}
        </Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="border border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-48" />
                <div className="flex items-center space-x-4 pt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4">
              <div className="flex w-full items-center justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-28" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center p-10 text-center">
          <Package className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-xl font-medium">Không có đơn hàng nào</h3>
          <p className="text-muted-foreground">
            Bạn chưa có đơn hàng nào trong danh mục này
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Đơn hàng {order.id}</h3>
                {getStatusBadge(order.status)}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Ngày đặt: {formatDate(order.date)}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">Sản phẩm:</span>
                  <span className="text-sm">{order.totalItems} sản phẩm</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">Thanh toán:</span>
                  <span className="text-sm">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t bg-muted/20 px-6 py-4">
            <div className="flex w-full items-center justify-between">
              <div className="font-medium">
                Tổng tiền: {formatCurrency(order.totalAmount)}
              </div>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onSelectOrder(order.id)}
              >
                Xem chi tiết
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 