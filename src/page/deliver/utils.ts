import { OrderStatus } from "@/data/enum";

// Hàm helper để chuyển đổi status string thành OrderStatus enum
export const normalizeStatus = (status: string | OrderStatus): OrderStatus => {
  if (typeof status === 'string') {
    // Chuyển đổi string sang OrderStatus enum
    switch(status.toUpperCase()) {
      case 'PROCESSING': return OrderStatus.PROCESSING;
      case 'SHIPPED': return OrderStatus.SHIPPED;
      case 'DELIVERED': return OrderStatus.DELIVERED;
      default: return OrderStatus.PROCESSING; // Giá trị mặc định
    }
  }
  return status as OrderStatus;
};

// Format date utility function
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('vi-VN');
}; 