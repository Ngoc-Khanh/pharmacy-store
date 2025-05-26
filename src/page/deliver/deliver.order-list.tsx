import { OrderStatus } from "@/data/enum";
import { OrderDeliverItem } from "@/data/interfaces";
import { AnimatePresence } from "framer-motion";
import { EmptyState } from "./deliver.empty-state";
import { OrderCard } from "./deliver.order-card";

interface OrderListProps {
  orders: Array<{
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
  }>;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  isPending: boolean;
  type: "processing" | "shipping" | "delivered";
}

export function OrderList({ orders, onUpdateStatus, isPending, type }: OrderListProps) {
  return (
    <AnimatePresence>
      {orders.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        orders.map((order, index) => (
          <OrderCard
            key={order.id}
            order={order}
            onUpdateStatus={onUpdateStatus}
            isPending={isPending}
            type={type}
            index={index}
          />
        ))
      )}
    </AnimatePresence>
  );
} 