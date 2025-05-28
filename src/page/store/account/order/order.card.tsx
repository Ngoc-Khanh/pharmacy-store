import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { routes } from '@/config';
import { OrderAdminChangeStatusDto } from '@/data/dto';
import { OrderStatus } from '@/data/enum';
import { Order } from '@/data/interfaces';
import { formatCurrency } from '@/lib/utils';
import { StoreAPI } from '@/services/api/store.api';

import { formatPaymentMethod } from '@/lib/format-payment-method';
import { OrderStatusIcon, StatusBadge } from '@/lib/status-badge';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle, Clock, CreditCard, Leaf, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const OrderCard = ({ order, showConfirmButton = false }: { order: Order; showConfirmButton?: boolean }) => {
  const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy", { locale: vi });
  const formattedTime = format(new Date(order.createdAt), "HH:mm", { locale: vi });
  const queryClient = useQueryClient();
  // Mutation để xác nhận đơn hàng hoàn thành
  const confirmOrderMutation = useMutation({
    mutationFn: (orderId: string) => {
      const statusData: OrderAdminChangeStatusDto = {
        status: OrderStatus.COMPLETED
      };
      return StoreAPI.UpdateOrderStatus(orderId, statusData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Đơn hàng đã được xác nhận hoàn thành!');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xác nhận đơn hàng');
    }
  });

  const handleConfirmOrder = () => {
    confirmOrderMutation.mutate(order.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)"
      }}
      className="rounded-xl overflow-hidden"
    >
      <Card className="overflow-hidden border-0 dark:border dark:border-green-900/50 shadow-sm dark:shadow-md dark:shadow-green-950/10 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-green-950/20 transition-all duration-300">
        <div className="border-b border-border dark:border-green-900/30 p-4 flex justify-between items-center bg-gradient-to-r from-green-50 to-green-50/30 dark:from-green-950/40 dark:to-green-950/20">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-800/40 dark:to-green-900/60 p-2.5 rounded-full shadow-sm dark:shadow-green-950/30 flex items-center justify-center">
              <OrderStatusIcon status={order.status} />
            </div>
            <div>
              <h3 className="font-medium text-base text-gray-800 dark:text-gray-100">Đơn hàng #{order.id.slice(-6)}</h3>
              <div className="flex flex-wrap items-center text-xs text-muted-foreground dark:text-gray-400 gap-4 mt-1.5">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1.5 opacity-70" /> {formattedDate}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1.5 opacity-70" /> {formattedTime}
                </span>
                <span className="flex items-center">
                  <CreditCard className="h-3 w-3 mr-1.5 opacity-70" /> {formatPaymentMethod(order.paymentMethod)}
                </span>
              </div>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <CardContent className="p-4 bg-white dark:bg-gray-900/30">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="space-y-1 md:w-2/3">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                <ShoppingBag className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                {order.items.length} {order.items.length === 1 ? 'sản phẩm' : 'sản phẩm'}
              </div>
              <div className="space-y-3 border-l-2 border-green-100 dark:border-green-800 pl-3">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.medicineId} className="text-sm flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-green-400 dark:from-green-400 dark:to-green-500 mr-2.5 shadow-sm dark:shadow-green-900/30"></div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">
                        {item.medicine.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        × {item.quantity}
                      </span>
                    </div>
                    <div className="font-medium text-green-700 dark:text-green-400">{formatCurrency(item.itemTotal)}</div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium ml-4 italic flex items-center">
                    <Leaf className="h-3 w-3 mr-1.5 text-green-500 dark:text-green-400" />
                    +{order.items.length - 2} sản phẩm khác
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end justify-between">
              <div className="text-right px-4 py-2 bg-green-50/50 dark:bg-green-900/30 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tổng thanh toán</div>
                <div className="font-bold text-lg text-green-700 dark:text-green-400">{formatCurrency(order.totalPrice)}</div>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-2 w-full md:w-auto">
                {showConfirmButton && order.status === OrderStatus.DELIVERED && (
                  <Button
                    onClick={handleConfirmOrder}
                    disabled={confirmOrderMutation.isPending}
                    className="group bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 dark:from-teal-500 dark:to-teal-600 dark:hover:from-teal-600 dark:hover:to-teal-700 text-white shadow-sm dark:shadow-teal-900/20 hover:shadow"
                    size="sm"
                  >
                    {confirmOrderMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Xác nhận hoàn thành
                      </>
                    )}
                  </Button>
                )}

                <Button
                  asChild
                  className="group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-sm dark:shadow-green-900/20 hover:shadow"
                  size="sm"
                >
                  <Link to={routes.store.account.orderDetails(order.id)}>
                    Xem chi tiết <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};