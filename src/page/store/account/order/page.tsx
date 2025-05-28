import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderStatus } from "@/data/enum";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { OrderFilteredView } from "./order.filtered.view";
import { OrderSearch } from "./order.search";
import { OrderTabs } from "./order.tabs";

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => StoreAPI.OrdersUserList(),
  });

  // Lọc đơn hàng theo từ khóa tìm kiếm và trạng thái
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Nhóm đơn hàng theo trạng thái
  const pendingOrders = orders?.filter(o =>
    o.status === OrderStatus.PENDING ||
    o.status === OrderStatus.PROCESSING ||
    o.status === OrderStatus.SHIPPED
  );
  const deliveredOrders = orders?.filter(o =>
    o.status === OrderStatus.DELIVERED
  );
  const completedOrders = orders?.filter(o =>
    o.status === OrderStatus.COMPLETED
  );
  const cancelledOrders = orders?.filter(o =>
    o.status === OrderStatus.CANCELLED
  );

  return (
    <>
      <Helmet>
        <title>{`${routeNames[routes.store.account.orders]} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="container py-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Header section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">Đơn hàng của bạn</h1>
            </div>
            <p className="text-muted-foreground ml-13 pl-0.5">
              {isLoading ?
                <Skeleton className="h-4 w-40" /> :
                (orders && orders.length > 0 ?
                  `Bạn có ${orders.length} đơn hàng` :
                  'Bạn chưa có đơn hàng nào')}
            </p>
          </div>

          {/* Search and filter section */}
          {(!isLoading && orders && orders.length > 0) && (
            <OrderSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          )}

          {/* Content section - either filtered view or tabs */}
          {isLoading || isError || !orders ? (
            <OrderTabs
              orders={[]}
              pendingOrders={[]}
              deliveredOrders={[]}
              completedOrders={[]}
              cancelledOrders={[]}
              isLoading={isLoading}
              isError={isError}
            />
          ) : searchTerm || statusFilter !== "all" ? (
            <OrderFilteredView filteredOrders={filteredOrders || []} />
          ) : (
            <OrderTabs
              orders={orders}
              pendingOrders={pendingOrders || []}
              deliveredOrders={deliveredOrders || []}
              completedOrders={completedOrders || []}
              cancelledOrders={cancelledOrders || []}
              isLoading={isLoading}
              isError={isError}
            />
          )}
        </motion.div>
      </div>
    </>
  );
}
