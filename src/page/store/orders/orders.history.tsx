import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, TruckIcon, AlertCircle, CheckCircle, CalendarIcon, CreditCard } from "lucide-react";
import { Order, OrderHistoryFilter, OrderHistoryProps } from "./orders.types";
import { motion, AnimatePresence } from "framer-motion";

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
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30 flex items-center">
          <Clock className="h-3 w-3 mr-1" /> Đang xử lý
        </Badge>;
      case 'shipping':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30 flex items-center">
          <TruckIcon className="h-3 w-3 mr-1" /> Đang giao hàng
        </Badge>;
      case 'delivered':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30 flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" /> Đã giao hàng
        </Badge>;
      case 'cancelled':
        return <Badge className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" /> Đã hủy
        </Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700/50 flex items-center">
          <Package className="h-3 w-3 mr-1" /> {status}
        </Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="border-emerald-100/50 dark:border-emerald-800/30 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col">
                <div className="p-6 space-y-3">
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
                <div className="border-t border-emerald-100/50 dark:border-emerald-800/30 bg-emerald-50/30 dark:bg-emerald-900/5 px-6 py-4">
                  <div className="flex w-full items-center justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="border-emerald-100/50 dark:border-emerald-800/30 shadow-sm overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100/70 dark:bg-emerald-900/20 flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="mb-2 text-xl font-medium">Không có đơn hàng nào</h3>
          <p className="text-muted-foreground max-w-md">
            Bạn chưa có đơn hàng nào trong danh mục này. Hãy mua thêm sản phẩm để chăm sóc sức khỏe của bạn.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-emerald-100/50 dark:border-emerald-800/30 shadow-sm overflow-hidden hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-700/30 transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Đơn hàng {order.id}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="flex items-center text-muted-foreground gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <p className="text-sm">
                        {formatDate(order.date)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="flex items-center gap-2 text-sm bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded-md">
                        <Package className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-medium">{order.totalItems} sản phẩm</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm bg-emerald-50/50 dark:bg-emerald-900/10 p-2 rounded-md">
                        <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  <CardFooter className="border-t border-emerald-100 dark:border-emerald-800/30 bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-950/10 dark:to-teal-950/10 px-6 py-4">
                    <div className="flex w-full items-center justify-between">
                      <div className="font-medium text-emerald-700 dark:text-emerald-400">
                        Tổng tiền: {formatCurrency(order.totalAmount)}
                      </div>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                        onClick={() => onSelectOrder(order.id)}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 