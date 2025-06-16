import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InvoiceDetails } from "@/data/interfaces";
import { useStep5 } from "@/hooks/use-step-form";
import { formatCurrency } from "@/lib/utils";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  FileText,
  Home,
  MapPin,
  Package,
  Phone,
  Receipt,
  ShoppingBag,
  Star,
  Truck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Step5Invoice = () => {
  const navigate = useNavigate();
  const { placedOrder, selectedPaymentMethod, nextStep } = useStep5();

  // Fetch invoice details using the placed order ID
  const { data: invoice, isLoading: isLoadingInvoice, error: invoiceError } = useQuery<InvoiceDetails>({
    queryKey: ['invoice-details', placedOrder?.id],
    queryFn: () => StoreAPI.InvoiceDetailsWithOrderId(placedOrder!.id),
    enabled: !!placedOrder?.id,
    refetchOnWindowFocus: false,
  });

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/profile/orders");
  };

  const handleContinueShopping = () => {
    navigate("/medicines");
  };

  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download functionality
    console.log("Download invoice for order:", placedOrder?.id);
  };

  // Loading state
  if (isLoadingInvoice) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Đang tải hóa đơn...</h3>
        <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
      </div>
    );
  }

  // Error state
  if (invoiceError || !placedOrder) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Không tìm thấy thông tin hóa đơn</h3>
        <p className="text-gray-500 mb-4">Vui lòng thử lại hoặc liên hệ hỗ trợ</p>
        <Button onClick={handleGoHome} variant="outline">
          Về trang chủ
        </Button>
      </div>
    );
  }



  const paymentMethodNames = {
    COD: "Thanh toán khi nhận hàng",
    BANK_TRANSFER: "Chuyển khoản ngân hàng",
    CREDIT_CARD: "Thẻ tín dụng/ghi nợ"
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-6 shadow-lg"
        >
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3"
        >
          Đặt hàng thành công!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <p className="text-muted-foreground text-lg">
            Đơn hàng của bạn đã được xác nhận
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">
              {invoice ? 'Mã hóa đơn:' : 'Mã đơn hàng:'}
            </span>
            <Badge variant="outline" className="font-mono text-sm px-3 py-1">
              #{invoice ? invoice.invoiceNumber : placedOrder.id}
            </Badge>
          </div>
        </motion.div>
      </motion.div>

      {/* Invoice Details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-green-200 dark:border-green-800/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                  Hóa đơn điện tử
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadInvoice}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Tải xuống
              </Button>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-muted-foreground">
                    {invoice ? 'Ngày phát hành:' : 'Ngày đặt hàng:'}
                  </span>
                  <span className="font-medium">
                    {invoice
                      ? (invoice.issuedAt ? format(new Date(invoice.issuedAt), "dd/MM/yyyy HH:mm", { locale: vi }) : 'Không xác định')
                      : (placedOrder.createdAt ? format(new Date(placedOrder.createdAt), "dd/MM/yyyy HH:mm", { locale: vi }) : 'Không xác định')
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-muted-foreground">Phương thức thanh toán:</span>
                  <span className="font-medium">
                    {invoice
                      ? paymentMethodNames[invoice.paymentMethod as keyof typeof paymentMethodNames]
                      : paymentMethodNames[selectedPaymentMethod as keyof typeof paymentMethodNames]
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-muted-foreground">Trạng thái:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300">
                    {invoice ? (invoice.status || 'Đang xử lý') : (placedOrder.status || 'Đang xử lý')}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-sm text-muted-foreground">Địa chỉ giao hàng:</span>
                    <div className="font-medium text-sm">
                      {invoice ? (
                        <>
                          <p>{invoice.order?.shippingAddress?.name || 'Không xác định'}</p>
                          <p className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {invoice.order?.shippingAddress?.phone || 'Không có số điện thoại'}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {invoice.order?.shippingAddress?.addressLine1 || 'Địa chỉ không xác định'}
                            {invoice.order?.shippingAddress?.addressLine2 && `, ${invoice.order.shippingAddress.addressLine2}`}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {invoice.order?.shippingAddress?.city || 'Thành phố'}, {invoice.order?.shippingAddress?.country || 'Quốc gia'}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>{placedOrder.shippingAddress?.name || 'Không xác định'}</p>
                          <p className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {placedOrder.shippingAddress?.phone || 'Không có số điện thoại'}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
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

            <Separator className="my-4" />

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-green-600" />
                <h4 className="text-lg font-semibold">Chi tiết đơn hàng</h4>
                <Badge variant="outline" className="ml-auto">
                  {invoice
                    ? (invoice.items?.length || 0)
                    : (placedOrder.items?.length || 0)
                  } sản phẩm
                </Badge>
              </div>

              <div className="space-y-3">
                {(invoice?.items || placedOrder.items) && (invoice?.items || placedOrder.items).length > 0 ? (
                  (invoice?.items || placedOrder.items).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <img
                        src={item.medicine?.thumbnail?.url || '/placeholder-medicine.png'}
                        alt={item.medicine?.thumbnail?.alt || item.medicine?.name || 'Medicine'}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-medicine.png';
                        }}
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">
                          {item.medicine?.name || 'Tên thuốc không xác định'}
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          Số lượng: {item.quantity || 0}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {formatCurrency(item.itemTotal || 0)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(item.price || 0)} x {item.quantity || 0}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Không có sản phẩm nào trong đơn hàng</p>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Order Total */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="space-y-2"
            >
              {invoice ? (
                <>
                  {invoice.order?.shippingFee && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Phí vận chuyển:</span>
                      <span>{formatCurrency(parseFloat(invoice.order.shippingFee) || 0)}</span>
                    </div>
                  )}
                  {invoice.order?.discount && parseFloat(invoice.order.discount) > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Giảm giá:</span>
                      <span className="text-green-600">-{formatCurrency(parseFloat(invoice.order.discount) || 0)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-green-700 dark:text-green-300">Tổng cộng:</span>
                    <span className="text-green-600 dark:text-green-400">
                      {formatCurrency(invoice.totalPrice || 0)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Tạm tính:</span>
                    <span>{formatCurrency(placedOrder.subTotal || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Phí vận chuyển:</span>
                    <span>{formatCurrency(placedOrder.shippingFee || 0)}</span>
                  </div>
                  {(placedOrder.discount || 0) > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Giảm giá:</span>
                      <span className="text-green-600">-{formatCurrency(placedOrder.discount || 0)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-green-700 dark:text-green-300">Tổng cộng:</span>
                    <span className="text-green-600 dark:text-green-400">
                      {formatCurrency(placedOrder.totalPrice || 0)}
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delivery Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Card className="border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                Thông tin giao hàng
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70">
                <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">Chuẩn bị hàng</h4>
                <p className="text-xs text-muted-foreground">1-2 giờ</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70">
                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">Đang giao hàng</h4>
                <p className="text-xs text-muted-foreground">1-2 ngày</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70">
                <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">Giao thành công</h4>
                <p className="text-xs text-muted-foreground">Dự kiến 2-3 ngày</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                💡 <strong>Lưu ý:</strong> Bạn sẽ nhận được SMS/Email thông báo khi đơn hàng được vận chuyển và giao thành công.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feedback Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="text-center"
      >
        <Button
          onClick={nextStep}
          className="bg-purple-600 hover:bg-purple-700 text-white h-12 text-base font-medium px-8 flex items-center justify-center gap-2 mx-auto"
        >
          <Star className="w-5 h-5" />
          Đánh giá trải nghiệm
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Giúp chúng tôi cải thiện dịch vụ bằng đánh giá của bạn
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Button
          onClick={handleViewOrders}
          className="bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Xem đơn hàng
        </Button>

        <Button
          variant="outline"
          onClick={handleContinueShopping}
          className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-950/50 h-12 text-base font-medium flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Tiếp tục mua sắm
        </Button>

        <Button
          variant="outline"
          onClick={handleGoHome}
          className="border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-950/50 h-12 text-base font-medium flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Về trang chủ
        </Button>
      </motion.div>

      {/* Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        <Card className="border-purple-200 dark:border-purple-800/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-3">
              Cảm ơn bạn đã tin tưởng Pharmacity! 🎉
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              Đánh giá trải nghiệm tư vấn AI để giúp chúng tôi cải thiện dịch vụ
            </p>

            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-yellow-100 dark:hover:bg-yellow-900/20 p-1"
                >
                  <Star className="w-5 h-5 text-gray-300 hover:text-yellow-500 transition-colors" />
                </Button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Chúng tôi sẽ liên hệ với bạn nếu cần hỗ trợ thêm về đơn hàng
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
