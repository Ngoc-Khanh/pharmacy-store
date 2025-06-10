import { OrderAdminChangeStatusDto } from '@/data/dto';
import { OrderStatus } from '@/data/enum';
import { StoreAPI } from '@/services/api/store.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useOrderMutations = () => {
  const queryClient = useQueryClient();

  const updateOrderStatus = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus.CANCELLED | OrderStatus.COMPLETED }) => {
      const statusData: OrderAdminChangeStatusDto = { status };
      return StoreAPI.UpdateOrderStatus(orderId, statusData);
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      const messages = {
        [OrderStatus.COMPLETED]: 'Đơn hàng đã được xác nhận hoàn thành!',
        [OrderStatus.CANCELLED]: 'Đơn hàng đã được hủy thành công!',
      };
      
      toast.success(messages[status] || 'Cập nhật đơn hàng thành công!');
    },
    onError: (_, { status }) => {
      const messages = {
        [OrderStatus.COMPLETED]: 'Có lỗi xảy ra khi xác nhận đơn hàng',
        [OrderStatus.CANCELLED]: 'Có lỗi xảy ra khi hủy đơn hàng',
      };
      
      toast.error(messages[status] || 'Có lỗi xảy ra khi cập nhật đơn hàng');
    }
  });

  const confirmOrder = (orderId: string) => {
    updateOrderStatus.mutate({ orderId, status: OrderStatus.COMPLETED });
  };

  const cancelOrder = (orderId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
      updateOrderStatus.mutate({ orderId, status: OrderStatus.CANCELLED });
    }
  };

  return {
    confirmOrder,
    cancelOrder,
    isLoading: updateOrderStatus.isPending,
    isConfirming: updateOrderStatus.isPending && updateOrderStatus.variables?.status === OrderStatus.COMPLETED,
    isCancelling: updateOrderStatus.isPending && updateOrderStatus.variables?.status === OrderStatus.CANCELLED,
  };
};