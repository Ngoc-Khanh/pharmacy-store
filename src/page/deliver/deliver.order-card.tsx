import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatus } from "@/data/enum";
import { OrderDeliverItem } from "@/data/interfaces";
import { motion } from "framer-motion";
import { CheckCircle, Clock, MapPin, Package, Phone, Truck, User } from "lucide-react";
import { StatusBadge } from "./deliver.status-badge";
import { formatDate, normalizeStatus } from "./utils";

interface OrderCardProps {
  order: {
    id: string;
    status: OrderStatus | string;
    createdAt: string;
    totalPrice: number;
    items: OrderDeliverItem[];
    shippingAddress?: {
      name?: string;
      phone?: string;
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      country?: string;
      postalCode?: string;
    };
    use?: {
      firstname?: string;
      lastname?: string;
      phone?: string;
    };
  };
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  isPending: boolean;
  type: "processing" | "shipping" | "delivered";
  index: number;
}

export function OrderCard({ order, onUpdateStatus, isPending, type, index }: OrderCardProps) {
  const status = normalizeStatus(order.status);
  
  const getCardStyles = () => {
    switch (type) {
      case "processing":
        return {
          accentColor: "from-blue-500 to-indigo-600",
          headerBg: "from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20",
          iconBg: "from-blue-500 to-indigo-600",
          iconElement: <Package className="w-6 h-6 text-white" />,
          sectionBg: "from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20",
          badgeBg: "from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-200",
          totalColor: "from-blue-600 to-indigo-600",
          footerBg: "from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20",
          buttonColor: "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
          buttonText: "Bắt đầu giao hàng",
          buttonIcon: <Truck className="w-5 h-5 mr-2" />
        };
      case "shipping":
        return {
          accentColor: "from-amber-500 to-orange-600",
          headerBg: "from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20",
          iconBg: "from-amber-500 to-orange-600",
          iconElement: <Truck className="w-6 h-6 text-white" />,
          sectionBg: "from-gray-50 to-amber-50/30 dark:from-gray-800 dark:to-amber-900/20",
          badgeBg: "from-amber-100 to-orange-100 text-amber-800 dark:from-amber-900 dark:to-orange-900 dark:text-amber-200",
          totalColor: "from-amber-600 to-orange-600",
          footerBg: "from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20",
          buttonColor: "from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700",
          buttonText: "Xác nhận đã giao hàng",
          buttonIcon: <CheckCircle className="w-5 h-5 mr-2" />
        };
      case "delivered":
        return {
          accentColor: "from-emerald-500 to-green-600",
          headerBg: "from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20",
          iconBg: "from-emerald-500 to-green-600",
          iconElement: <CheckCircle className="w-6 h-6 text-white" />,
          sectionBg: "from-gray-50 to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20",
          badgeBg: "from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900 dark:to-green-900 dark:text-emerald-200",
          totalColor: "from-emerald-600 to-green-600",
          footerBg: "from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20",
          buttonColor: "",
          buttonText: "",
          buttonIcon: null
        };
    }
  };
  
  const styles = getCardStyles();
  
  // Helper function to get customer name
  const getCustomerName = () => {
    if (order.shippingAddress?.name) return order.shippingAddress.name;
    if (order.use && (order.use.firstname || order.use.lastname)) {
      return `${order.use.firstname || ''} ${order.use.lastname || ''}`.trim();
    }
    return "Khách hàng";
  };
  
  // Helper function to get customer phone
  const getCustomerPhone = () => {
    return order.shippingAddress?.phone || order.use?.phone || "Không có số điện thoại";
  };
  
  // Helper function to get customer address
  const getCustomerAddress = () => {
    if (!order.shippingAddress?.addressLine1) return "Không có địa chỉ";
    
    let address = order.shippingAddress.addressLine1;
    if (order.shippingAddress.addressLine2) address += `, ${order.shippingAddress.addressLine2}`;
    if (order.shippingAddress.city) address += `, ${order.shippingAddress.city}`;
    if (order.shippingAddress.country) address += `, ${order.shippingAddress.country}`;
    if (order.shippingAddress.postalCode) address += ` ${order.shippingAddress.postalCode}`;
    
    return address;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`mb-4 overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg ${type === 'delivered' ? 'opacity-90' : ''}`}>
        <div className={`absolute w-1 h-full bg-gradient-to-b ${styles.accentColor} left-0 top-0 rounded-r-full`}></div>
        <CardHeader className={`pb-3 bg-gradient-to-r ${styles.headerBg}`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${styles.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                {styles.iconElement}
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Đơn hàng #{order.id}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  {formatDate(order.createdAt)}
                </CardDescription>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>
        </CardHeader>
        <CardContent className="pb-4 space-y-4">
          <div className={`bg-gradient-to-r ${styles.sectionBg} p-4 rounded-xl border border-gray-100 dark:border-gray-700`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Thông tin khách hàng</h4>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {getCustomerName()}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-green-500" />
                {getCustomerPhone()}
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>{getCustomerAddress()}</span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gradient-to-r from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 bg-gradient-to-br ${styles.iconBg} rounded-lg flex items-center justify-center`}>
                <Package className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Sản phẩm</h4>
            </div>
            <ul className="space-y-2">
              {order.items.map((item: OrderDeliverItem, idx) => (
                <li key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {item.medicine?.name || "Sản phẩm"}
                  </span>
                  <Badge className={`bg-gradient-to-r ${styles.badgeBg} font-semibold`}>
                    x{item.quantity}
                  </Badge>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Tổng cộng:</span>
              <p className={`font-bold text-xl bg-gradient-to-r ${styles.totalColor} bg-clip-text text-transparent`}>
                {order.totalPrice.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </div>
          
          {type === "delivered" && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Đã giao hàng thành công</span>
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                Đơn hàng đã được giao thành công đến khách hàng
              </p>
            </div>
          )}
        </CardContent>
        
        {type !== "delivered" && (
          <CardFooter className={`bg-gradient-to-r ${styles.footerBg} border-t border-gray-100 dark:border-gray-700`}>
            <Button 
              className={`w-full h-12 bg-gradient-to-r ${styles.buttonColor} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
              onClick={() => onUpdateStatus(order.id, status)}
              disabled={isPending}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isPending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                styles.buttonIcon
              )}
              {isPending ? "Đang xử lý..." : styles.buttonText}
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
} 