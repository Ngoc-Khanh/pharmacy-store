export enum StockStatus {
  IN_STOCK = "IN-STOCK",
  OUT_OF_STOCK = "OUT-OF-STOCK",
  PRE_ORDER = "PRE-ORDER",
}

export enum AccountRole {
  ADMIN = "ADMIN",
  PHARMACIST = "PHARMACIST",
  CUSTOMER = "CUSTOMER",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
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

export enum PatientGender {
  MALE = "Nam",
  FEMALE = "Nữ",
  OTHER = "Khác",
}

export enum SeverityLevel {
  LOW = "nhẹ",
  MEDIUM = "trung bình",
  HIGH = "nghiêm trọng",
  VERY_HIGH = "rất nghiêm trọng",
}
