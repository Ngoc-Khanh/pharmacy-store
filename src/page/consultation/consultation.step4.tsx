import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceOrderDto } from "@/data/dto";
import { useStep2, useStep3, useStep5 } from "@/hooks/use-step-form";
import { formatCurrency } from "@/lib/utils";
import { StoreAPI } from "@/services/api/store.api";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  ShoppingCart, 
  ArrowRight, 
  RotateCcw, 
  Eye,
  Package,
  Clock,
  Truck,
  Star,
  Heart,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Step4Confirmation = () => {
  const navigate = useNavigate();
  const { selectedMedicines, prevStep } = useStep2();
  const { selectedAddressId, selectedPaymentMethod } = useStep3();
  const { setPlacedOrder, nextStep } = useStep5();

  // Calculate total price
  const totalPrice = selectedMedicines.reduce((sum, medicine) => sum + medicine.variants.price, 0);

  // Place order mutation
  const placeOrderMutation = useMutation({
    mutationFn: StoreAPI.PlaceOrder,
    onSuccess: (order) => {
      setPlacedOrder(order);
      nextStep(); // Go to step 5 to show invoice
    },
    onError: (error: Error) => {
      console.error('Place order error:', error);
    },
  });

  const handlePlaceOrder = () => {
    if (!selectedAddressId || !selectedPaymentMethod) {
      return;
    }

    const orderData: PlaceOrderDto = {
      shippingAddressId: selectedAddressId,
      paymentMethod: selectedPaymentMethod,
    };

    placeOrderMutation.mutate(orderData);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const handleContinueShopping = () => {
    navigate("/medicines");
  };

  const handleBackToConsultation = () => {
    prevStep();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
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
          Thêm vào giỏ hàng thành công!
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg"
        >
          Thuốc đã được thêm vào giỏ hàng của bạn
        </motion.p>
      </motion.div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-green-200 dark:border-green-800/50 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                Tóm tắt đơn hàng
              </h3>
            </div>
            
            <div className="space-y-3 mb-4">
              {selectedMedicines.map((medicine, index) => (
                <motion.div
                  key={medicine.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-green-200/50 dark:border-green-800/50"
                >
                  <img
                    src={medicine.thumbnail.url}
                    alt={medicine.thumbnail.alt || medicine.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-medicine.png';
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-green-700 dark:text-green-300">
                      {medicine.name}
                    </h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      Số lượng: 1
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(medicine.variants.price)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Separator className="my-4" />
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-between items-center"
            >
              <span className="text-lg font-semibold text-green-700 dark:text-green-300">
                Tổng cộng:
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(totalPrice)}
              </span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Bước tiếp theo
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-medium text-sm mb-1">Kiểm tra giỏ hàng</h4>
                <p className="text-xs text-muted-foreground">Xem lại và chỉnh sửa số lượng</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShoppingCart className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h4 className="font-medium text-sm mb-1">Đặt hàng</h4>
                <p className="text-xs text-muted-foreground">Hoàn tất thông tin và thanh toán</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-medium text-sm mb-1">Nhận hàng</h4>
                <p className="text-xs text-muted-foreground">Giao hàng tận nơi trong 1-2 ngày</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Button
          onClick={handlePlaceOrder}
          disabled={!selectedAddressId || !selectedPaymentMethod || placeOrderMutation.isPending}
          className="bg-green-600 hover:bg-green-700 text-white h-12 text-base font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {placeOrderMutation.isPending ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Đang đặt hàng...
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Đặt hàng ngay
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleViewCart}
          className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-950/50 h-12 text-base font-medium flex items-center justify-center gap-2"
        >
          <Eye className="w-5 h-5" />
          Xem giỏ hàng
        </Button>
      </motion.div>

      {/* Additional Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="flex justify-center gap-4 pt-4"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToConsultation}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          Quay lại tư vấn
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleContinueShopping}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <Package className="w-4 h-4" />
          Tiếp tục mua sắm
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoHome}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <Home className="w-4 h-4" />
          Về trang chủ
        </Button>
      </motion.div>

      {/* Satisfaction & Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <Card className="border-purple-200 dark:border-purple-800/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                Hài lòng với tư vấn AI?
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Đánh giá trải nghiệm để giúp chúng tôi cải thiện dịch vụ
            </p>
            
            <div className="flex justify-center gap-2">
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
