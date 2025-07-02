import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InvoiceDetails, OrderResponse } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import {
  Calendar,
  CreditCard,
  Clock,
  MapPin,
  Phone,
  Receipt,
  Download,
  Package
} from "lucide-react";

interface StepFiveInvoiceSectionProps {
  invoice?: InvoiceDetails;
  placedOrder: OrderResponse;
  selectedPaymentMethod: string;
  onDownloadInvoice: () => void;
}

export const StepFiveInvoiceSection = ({ 
  invoice, 
  placedOrder, 
  selectedPaymentMethod, 
  onDownloadInvoice 
}: StepFiveInvoiceSectionProps) => {
  const paymentMethodNames = {
    COD: "Thanh toán khi nhận hàng",
    BANK_TRANSFER: "Chuyển khoản ngân hàng", 
    CREDIT_CARD: "Thẻ tín dụng/ghi nợ"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Card className="border-teal-200 dark:border-teal-800/50 shadow-xl bg-gradient-to-br from-teal-50/30 to-emerald-50/30 dark:from-teal-950/20 dark:to-emerald-950/20">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-xl">
                <Receipt className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                Hóa đơn điện tử
              </h3>
            </div>
            <Button
              variant="outline"
              onClick={onDownloadInvoice}
              className="flex items-center gap-2 border-teal-200 hover:border-teal-300 hover:bg-teal-50 dark:border-teal-800 dark:hover:border-teal-700 dark:hover:bg-teal-950/50"
            >
              <Download className="w-4 h-4" />
              Tải xuống
            </Button>
          </div>

          {/* Order Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Order Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-4">
                Thông tin đơn hàng
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                  <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {invoice ? 'Ngày phát hành' : 'Ngày đặt hàng'}
                    </span>
                    <p className="font-semibold">
                      {invoice
                        ? (invoice.issuedAt ? format(new Date(invoice.issuedAt), "dd/MM/yyyy HH:mm", { locale: vi }) : 'Không xác định')
                        : (placedOrder.createdAt ? format(new Date(placedOrder.createdAt), "dd/MM/yyyy HH:mm", { locale: vi }) : 'Không xác định')
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                  <CreditCard className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Phương thức thanh toán
                    </span>
                    <p className="font-semibold">
                      {invoice
                        ? paymentMethodNames[invoice.paymentMethod as keyof typeof paymentMethodNames]
                        : paymentMethodNames[selectedPaymentMethod as keyof typeof paymentMethodNames]
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                  <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Trạng thái</span>
                    <div className="mt-1">
                      <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300 border-teal-300 dark:border-teal-700">
                        {invoice ? (invoice.status || 'Đang xử lý') : (placedOrder.status || 'Đang xử lý')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Shipping Address */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-4">
                Địa chỉ giao hàng
              </h4>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1" />
                  <div className="flex-1">
                    {invoice ? (
                      <>
                        <p className="font-semibold text-lg mb-2">
                          {invoice.order?.shippingAddress?.name || 'Không xác định'}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">
                            {invoice.order?.shippingAddress?.phone || 'Không có số điện thoại'}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          {invoice.order?.shippingAddress?.addressLine1 || 'Địa chỉ không xác định'}
                          {invoice.order?.shippingAddress?.addressLine2 && `, ${invoice.order.shippingAddress.addressLine2}`}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {invoice.order?.shippingAddress?.city || 'Thành phố'}, {invoice.order?.shippingAddress?.country || 'Quốc gia'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-lg mb-2">
                          {placedOrder.shippingAddress?.name || 'Không xác định'}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">
                            {placedOrder.shippingAddress?.phone || 'Không có số điện thoại'}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          {placedOrder.shippingAddress?.addressLine1 || 'Địa chỉ không xác định'}
                          {placedOrder.shippingAddress?.addressLine2 && `, ${placedOrder.shippingAddress.addressLine2}`}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {placedOrder.shippingAddress?.city || 'Thành phố'}, {placedOrder.shippingAddress?.country || 'Quốc gia'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Order Items */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg">
                  <Package className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h4 className="text-xl font-semibold">Chi tiết đơn hàng</h4>
              </div>
              <Badge variant="outline" className="text-base px-4 py-2">
                {invoice
                  ? (invoice.items?.length || 0)
                  : (placedOrder.items?.length || 0)
                } sản phẩm
              </Badge>
            </div>

            <div className="space-y-4">
              {(invoice?.items || placedOrder.items) && (invoice?.items || placedOrder.items).length > 0 ? (
                (invoice?.items || placedOrder.items).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-teal-200/50 dark:border-teal-800/50 hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={item.medicine?.thumbnail?.url || '/placeholder-medicine.png'}
                        alt={item.medicine?.thumbnail?.alt || item.medicine?.name || 'Medicine'}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-medicine.png';
                        }}
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {item.quantity || 0}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-base text-teal-700 dark:text-teal-300 truncate">
                        {item.medicine?.name || 'Tên thuốc không xác định'}
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Số lượng: {item.quantity || 0} hộp
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-xl text-teal-600 dark:text-teal-400">
                        {formatCurrency(item.itemTotal || 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.price || 0)} × {item.quantity || 0}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Không có sản phẩm nào trong đơn hàng</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Order Total */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="space-y-4"
          >
            {invoice ? (
              <>
                {invoice.order?.shippingFee && (
                  <div className="flex justify-between items-center text-base">
                    <span className="text-muted-foreground">Phí vận chuyển:</span>
                    <span className="font-medium">{formatCurrency(parseFloat(invoice.order.shippingFee) || 0)}</span>
                  </div>
                )}
                {invoice.order?.discount && parseFloat(invoice.order.discount) > 0 && (
                  <div className="flex justify-between items-center text-base">
                    <span className="text-muted-foreground">Giảm giá:</span>
                    <span className="text-emerald-600 font-medium">-{formatCurrency(parseFloat(invoice.order.discount) || 0)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-xl">
                  <span className="text-xl font-bold text-teal-700 dark:text-teal-300">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {formatCurrency(invoice.totalPrice || 0)}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center text-base">
                  <span className="text-muted-foreground">Tạm tính:</span>
                  <span className="font-medium">{formatCurrency(placedOrder.subTotal || 0)}</span>
                </div>
                <div className="flex justify-between items-center text-base">
                  <span className="text-muted-foreground">Phí vận chuyển:</span>
                  <span className="font-medium">{formatCurrency(placedOrder.shippingFee || 0)}</span>
                </div>
                {(placedOrder.discount || 0) > 0 && (
                  <div className="flex justify-between items-center text-base">
                    <span className="text-muted-foreground">Giảm giá:</span>
                    <span className="text-emerald-600 font-medium">-{formatCurrency(placedOrder.discount || 0)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-xl">
                  <span className="text-xl font-bold text-teal-700 dark:text-teal-300">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {formatCurrency(placedOrder.totalPrice || 0)}
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 