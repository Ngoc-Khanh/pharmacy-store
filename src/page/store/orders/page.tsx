import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderHistory } from "./orders.history";
import { OrderDetail } from "./orders.detail";
import { OrdersHeader } from "./orders.header";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, PackageCheck, PackageX } from "lucide-react";

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
    <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 dark:from-gray-950 dark:to-emerald-950/10 min-h-screen pb-12">
      <Helmet>
        <title>{`Đơn hàng của tôi | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="container py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <OrdersHeader />

          {selectedOrderId ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <OrderDetail
                orderId={selectedOrderId}
                onBack={handleBackToList}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-8"
            >
              <Card className="shadow-sm border-emerald-100 dark:border-emerald-800/30 overflow-hidden">
                <CardContent className="p-0">
                  <Tabs defaultValue="active" className="w-full">
                    <div className="px-6 pt-6 border-b border-emerald-100 dark:border-emerald-800/30 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                      <TabsList className="bg-white/60 dark:bg-gray-900/60 border border-emerald-100 dark:border-emerald-800/30 p-1 mb-6">
                        <TabsTrigger
                          value="active"
                          className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-600 data-[state=active]:shadow-sm flex items-center gap-2"
                        >
                          <ClipboardList className="w-4 h-4" />
                          Đơn hàng hiện tại
                        </TabsTrigger>
                        <TabsTrigger
                          value="completed"
                          className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-600 data-[state=active]:shadow-sm flex items-center gap-2"
                        >
                          <PackageCheck className="w-4 h-4" />
                          Đơn hàng đã hoàn thành
                        </TabsTrigger>
                        <TabsTrigger
                          value="cancelled"
                          className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-600 data-[state=active]:shadow-sm flex items-center gap-2"
                        >
                          <PackageX className="w-4 h-4" />
                          Đơn hàng đã hủy
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <div className="p-6">
                      <TabsContent value="active" className="m-0 mt-0">
                        <OrderHistory
                          status="active"
                          onSelectOrder={handleOrderSelect}
                        />
                      </TabsContent>
                      <TabsContent value="completed" className="m-0 mt-0">
                        <OrderHistory
                          status="completed"
                          onSelectOrder={handleOrderSelect}
                        />
                      </TabsContent>
                      <TabsContent value="cancelled" className="m-0 mt-0">
                        <OrderHistory
                          status="cancelled"
                          onSelectOrder={handleOrderSelect}
                        />
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 