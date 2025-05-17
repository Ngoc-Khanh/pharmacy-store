import { Package } from "lucide-react";

export function OrdersHeader() {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
        <Package className="h-8 w-8 text-green-600" />
        Đơn hàng của tôi
      </h1>
      <p className="text-muted-foreground">
        Theo dõi và quản lý tất cả đơn hàng của bạn tại đây
      </p>
    </div>
  );
} 