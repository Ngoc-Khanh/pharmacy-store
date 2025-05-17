import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderHistory } from "./orders.history";
import { OrderDetail } from "./orders.detail";
import { OrdersHeader } from "./orders.header";

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // When an order is selected from the history list
  const handleOrderSelect = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  // Back to order list
  const handleBackToList = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>{`Đơn hàng của tôi | ${siteConfig.name}`}</title>
      </Helmet>

      <OrdersHeader />

      {selectedOrderId ? (
        <OrderDetail 
          orderId={selectedOrderId} 
          onBack={handleBackToList}
        />
      ) : (
        <div className="mt-6">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Đơn hàng hiện tại</TabsTrigger>
              <TabsTrigger value="completed">Đơn hàng đã hoàn thành</TabsTrigger>
              <TabsTrigger value="cancelled">Đơn hàng đã hủy</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <OrderHistory 
                status="active" 
                onSelectOrder={handleOrderSelect} 
              />
            </TabsContent>
            <TabsContent value="completed">
              <OrderHistory 
                status="completed" 
                onSelectOrder={handleOrderSelect} 
              />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrderHistory 
                status="cancelled" 
                onSelectOrder={handleOrderSelect} 
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 