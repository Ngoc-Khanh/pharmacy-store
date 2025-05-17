// Order status types
export type OrderStatus = "processing" | "shipping" | "delivered" | "cancelled";

// Payment status types
export type PaymentStatus = "paid" | "pending" | "refunded";

// Order timeline event
export interface OrderTimelineEvent {
  date: string;
  status: string;
  title: string;
  description: string;
}

// Order item
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  thumbnail: string;
}

// Customer info
export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

// Shipping info
export interface ShippingInfo {
  address: string;
  city: string;
  method: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
}

// Tracking info
export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
}

// Order data structure
export interface Order {
  id: string;
  date: string;
  status: OrderStatus | string;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  customer: CustomerInfo;
  shippingInfo: ShippingInfo;
  items: OrderItem[];
  timeline: OrderTimelineEvent[];
  trackingInfo?: TrackingInfo;
  cancelReason?: string;
}

// Order history filter
export type OrderHistoryFilter = "active" | "completed" | "cancelled";

// Component props
export interface OrderHistoryProps {
  status: OrderHistoryFilter;
  onSelectOrder: (orderId: string) => void;
}

export interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
} 