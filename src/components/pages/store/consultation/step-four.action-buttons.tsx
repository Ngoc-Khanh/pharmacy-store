import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Home, Package, RotateCcw, ShoppingCart } from "lucide-react";

interface StepFourActionButtonsProps {
  isLoading?: boolean;
  onPlaceOrder: () => void;
  onViewCart: () => void;
  onBackToConsultation: () => void;
  onContinueShopping: () => void;
  onGoHome: () => void;
  disabled?: boolean;
}

export const StepFourActionButtons = ({ 
  isLoading = false,
  onPlaceOrder,
  onViewCart,
  onBackToConsultation,
  onContinueShopping,
  onGoHome,
  disabled = false
}: StepFourActionButtonsProps) => (
  <>
    {/* Main Action Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Button
        onClick={onPlaceOrder}
        disabled={disabled || isLoading}
        className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white h-14 text-base font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
      >
        {isLoading ? (
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
        onClick={onViewCart}
        className="border-2 border-teal-200 hover:border-teal-300 hover:bg-teal-50 dark:border-teal-800 dark:hover:border-teal-700 dark:hover:bg-teal-950/50 h-14 text-base font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
      >
        <Eye className="w-5 h-5" />
        Xem giỏ hàng
      </Button>
    </motion.div>

    {/* Secondary Actions */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6 }}
      className="flex justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onBackToConsultation}
        className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        Quay lại tư vấn
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onContinueShopping}
        className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all"
      >
        <Package className="w-4 h-4" />
        Tiếp tục mua sắm
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onGoHome}
        className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
      >
        <Home className="w-4 h-4" />
        Về trang chủ
      </Button>
    </motion.div>
  </>
) 