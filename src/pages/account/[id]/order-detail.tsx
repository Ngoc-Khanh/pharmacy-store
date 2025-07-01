import { OrderDetailsSkeleton, OrderTimeline } from "@/components/pages/account";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { routes, siteConfig } from "@/config";
import { OrderDetails as OrderDetailsType } from "@/data/interfaces";
import { formatPaymentMethod } from "@/lib/format-payment-method";
import { StatusBadge } from "@/lib/order-status-badge";
import { formatCurrency } from "@/lib/utils";
import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { ArrowLeft, BanknoteIcon, CalendarIcon, MapPinIcon, ShoppingBagIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, isError } = useQuery<OrderDetailsType>({
    queryKey: ["orderDetails", id],
    queryFn: () => StoreAPI.OrderDetails(id || ""),
    enabled: !!id,
  });

  console.log(order);

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (isError || !order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Không thể tải thông tin đơn hàng</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Vui lòng thử lại sau hoặc liên hệ hỗ trợ</p>
        <Button asChild className="mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-sm dark:shadow-green-900/20 rounded-full">
          <Link to={routes.store.account.orders}>Quay lại danh sách đơn hàng</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = format(new Date(order.createdAt), "PPP", { locale: vi });

  return (
    <>
      <Helmet>
        <title>{`Đơn hàng #${id?.slice(-6)} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="container max-w-4xl py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <Button
              asChild
              variant="ghost"
              className="self-start flex items-center text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 -ml-3"
            >
              <Link to={routes.store.account.orders}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại đơn hàng
              </Link>
            </Button>
            <StatusBadge status={order.status} />
          </div>

          <Card className="overflow-hidden border-0 dark:border dark:border-green-950/30 shadow-xl dark:shadow-lg rounded-2xl mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50/70 dark:from-green-950/30 dark:to-emerald-950/20 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-400 dark:from-green-400 dark:to-emerald-500 rounded-full"></div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      Đơn hàng #{id?.slice(-6)}
                    </h1>
                  </div>
                  <p className="mt-2 ml-3 text-gray-500 dark:text-gray-400 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    Đặt hàng ngày {formattedDate}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Phương thức thanh toán</div>
                  <div className="mt-1 flex items-center justify-end gap-2">
                    <BanknoteIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{formatPaymentMethod(order.paymentMethod)}</span>
                  </div>
                </div>
              </div>
            </div>

            <OrderTimeline status={order.status} />

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  Địa chỉ giao hàng
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
                  <div className="font-medium text-gray-800 dark:text-gray-200">{order.shippingAddress.name}</div>
                  <div className="text-gray-600 dark:text-gray-300 mt-2">{order.shippingAddress.phone}</div>
                  <div className="text-gray-500 dark:text-gray-400 mt-1">
                    {order.shippingAddress.addressLine1},{" "}
                    {order.shippingAddress.addressLine2 ? ` ${order.shippingAddress.addressLine2}, ` : ''}
                    {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <BanknoteIcon className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  Thông tin thanh toán
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800/60 shadow-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(order.subTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                    <span>Phí vận chuyển:</span>
                    <span>{formatCurrency(order.shippingFee)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 mb-2">
                      <span>Giảm giá:</span>
                      <span>- {formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                  <div className="flex justify-between font-bold text-gray-800 dark:text-gray-100">
                    <span>Tổng cộng:</span>
                    <span className="text-green-700 dark:text-green-400">{formatCurrency(order.totalPrice)}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="p-6 pt-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <ShoppingBagIcon className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Sản phẩm đã đặt
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <motion.div
                    key={item.medicineId}
                    className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800/60 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center">
                        {item.medicine.thumbnail ? (
                          <img
                            src={item.medicine.thumbnail.url}
                            alt={item.medicine.thumbnail.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 flex items-center justify-center">
                            <ShoppingBagIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">{item.medicine.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.medicine.description ?
                            item.medicine.description.slice(0, 50) + (item.medicine.description.length > 50 ? '...' : '') :
                            "Thuốc chính hãng"}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <Badge variant="outline" className="bg-green-50/80 hover:bg-green-100/80 dark:bg-green-900/30 dark:hover:bg-green-900/40 text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 border-green-200 hover:border-green-300 dark:border-green-800/50 dark:hover:border-green-700/60 px-2.5 py-0.5 transition-colors duration-200">
                            {formatCurrency(item.price)} / đơn vị
                          </Badge>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            Số lượng: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right self-end sm:self-center flex flex-col items-end justify-center mt-3 sm:mt-0">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Thành tiền</div>
                      <div className="font-semibold text-green-700 dark:text-green-400 text-lg">
                        {formatCurrency(item.itemTotal)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
} 