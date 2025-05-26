import { Tabs, TabsContent } from "@/components/ui/tabs";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderAdminChangeStatusDto } from "@/data/dto";
import { OrderStatus } from "@/data/enum";
import { StoreAPI } from "@/services/api/store.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { DeliverHeader } from "./deliver.header";
import { ErrorState } from "./deliver-error-state";
import { LoadingState } from "./deliver.loading-state";
import { LoginForm } from "./deliver.login-form";
import { OrderList } from "./deliver.order-list";
import { TabsNavigation } from "./deliver.tabs-navigation";
import { normalizeStatus } from "./utils";

export default function DeliverPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['orders', 'deliver'],
    queryFn: StoreAPI.OrderDeliverList,
    enabled: isLoggedIn, // Only fetch when logged in
  });

  // Mutation for updating order status
  const updateOrderMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      const statusDto: OrderAdminChangeStatusDto = { status };
      return StoreAPI.UpdateOrderStatus(orderId, statusDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'deliver'] });
    },
  });

  // Lọc đơn hàng với status đã được chuẩn hóa
  const processingOrders = orders.filter(order => normalizeStatus(order.status) === OrderStatus.PROCESSING);
  const shippedOrders = orders.filter(order => normalizeStatus(order.status) === OrderStatus.SHIPPED);
  const deliveredOrders = orders.filter(order => normalizeStatus(order.status) === OrderStatus.DELIVERED);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("Đã đăng xuất");
  };

  const updateOrderStatus = async (orderId: string, currentStatus: OrderStatus) => {
    // Xác định trạng thái mới dựa trên trạng thái hiện tại
    let newStatus: OrderStatus;
    
    if (currentStatus === OrderStatus.PROCESSING) {
      newStatus = OrderStatus.SHIPPED;
    } else if (currentStatus === OrderStatus.SHIPPED) {
      newStatus = OrderStatus.DELIVERED;
    } else {
      toast.error("Không thể cập nhật trạng thái cho đơn hàng này");
      return;
    }

    try {
      // Hiển thị thông báo đang xử lý
      toast.loading("Đang cập nhật trạng thái đơn hàng...");
      
      // Gọi mutation để cập nhật trạng thái
      await updateOrderMutation.mutateAsync({ orderId, status: newStatus });
      
      // Cập nhật thành công
      toast.success(`Đơn hàng ${orderId} đã được chuyển sang ${
        newStatus === OrderStatus.SHIPPED ? "đang giao hàng" : "đã giao hàng"
      }`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Không thể cập nhật trạng thái đơn hàng");
    }
  };

  // If not logged in, show login form
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }
  
  // Show loading state
  if (isLoading) {
    return <LoadingState onLogout={handleLogout} />;
  }

  // Show error state
  if (isError) {
    return <ErrorState onLogout={handleLogout} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/30">
      <Helmet>
        <title>{routeNames[routes.deliver.root]} | {siteConfig.name}</title>
      </Helmet>
      
      {/* Header */}
      <DeliverHeader onLogout={handleLogout} onRefresh={refetch} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Tabs defaultValue="processing" className="w-full">
            {/* Tab Navigation */}
            <TabsNavigation 
              processingCount={processingOrders.length}
              shippingCount={shippedOrders.length}
              deliveredCount={deliveredOrders.length}
            />
            
            {/* Tab Contents */}
            <TabsContent value="processing" className="space-y-4">
              <OrderList 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                orders={processingOrders as any}
                onUpdateStatus={updateOrderStatus}
                isPending={updateOrderMutation.isPending}
                type="processing"
              />
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <OrderList 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                orders={shippedOrders as any}
                onUpdateStatus={updateOrderStatus}
                isPending={updateOrderMutation.isPending}
                type="shipping"
              />
            </TabsContent>
            
            <TabsContent value="delivered" className="space-y-4">
              <OrderList 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                orders={deliveredOrders as any}
                onUpdateStatus={updateOrderStatus}
                isPending={updateOrderMutation.isPending}
                type="delivered"
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
