import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Home, MessageCircleQuestion, ShoppingBag, Star } from "lucide-react";

interface StepFiveActionButtonsProps {
  onViewOrders: () => void;
  onContinueShopping: () => void;
  onGoHome: () => void;
  onNextStep: () => void;
  onAskAgain?: () => void;
}

export const StepFiveActionButtons = ({ 
  onViewOrders, 
  onContinueShopping, 
  onGoHome, 
  onNextStep,
  onAskAgain
}: StepFiveActionButtonsProps) => (
  <>
    {/* Ask Again & Feedback Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Ask Again Button */}
      {onAskAgain && (
        <Button
          onClick={onAskAgain}
          className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white h-14 text-lg font-medium px-8 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
        >
          <MessageCircleQuestion className="w-6 h-6" />
          Hỏi lại
        </Button>
      )}

      {/* Feedback Button */}
      <Button
        onClick={onNextStep}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-14 text-lg font-medium px-8 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
      >
        <Star className="w-6 h-6" />
        Đánh giá trải nghiệm
      </Button>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.25 }}
      className="text-center"
    >
      <p className="text-sm text-muted-foreground">
        {onAskAgain ? 'Có thể đặt câu hỏi mới hoặc ' : ''}Giúp chúng tôi cải thiện dịch vụ bằng đánh giá của bạn 🌟
      </p>
    </motion.div>

    {/* Main Action Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <Button
        onClick={onViewOrders}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-14 text-base font-medium flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all"
      >
        <FileText className="w-5 h-5" />
        Xem đơn hàng
      </Button>

      <Button
        variant="outline"
        onClick={onContinueShopping}
        className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/50 h-14 text-base font-medium flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all"
      >
        <ShoppingBag className="w-5 h-5" />
        Tiếp tục mua sắm
      </Button>

      <Button
        variant="outline"
        onClick={onGoHome}
        className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-950/50 h-14 text-base font-medium flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all"
      >
        <Home className="w-5 h-5" />
        Về trang chủ
      </Button>
    </motion.div>
  </>
) 