import OrdersDialogs from "@/components/dialogs/orders";
import OrdersDataTable, { ordersColumns } from "@/components/table/orders";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderAPI } from "@/services/api/order.api";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function AdminOrdersPage() {
  const { data: ordersList, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderAPI.OrderList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const ordersData = ordersList?.data || [];

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.orders]} | {siteConfig.name}</title>
      </Helmet>

      <div className="flex-1 space-y-5 p-6 pt-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              Quản lý đơn hàng
            </h2>
            <p className="text-muted-foreground mt-1 max-w-3xl">
              Xem và quản lý tất cả đơn hàng trong hệ thống
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <OrdersDataTable columns={ordersColumns} data={ordersData} />
          )}
        </div>
      </div>
      <OrdersDialogs />
    </div>
  );
}
