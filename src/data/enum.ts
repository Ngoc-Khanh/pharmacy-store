export enum StockStatus {
  IN_STOCK = "IN-STOCK",
  OUT_OF_STOCK = "OUT-OF-STOCK",
  PRE_ORDER = "PRE-ORDER",
}

export enum AccountRole {
  ADMIN = "admin",
  PHARMACIST = "pharmacist",
  CUSTOMER = "customer",
}

export enum AccountStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  PENDING = "pending",
}

export enum PaymentMethod {
  COD = "COD",
  CREDIT_CARD = "CREDIT-CARD",
  BANK_TRANSFER = "BANK-TRANSFER",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum InvoiceStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}
