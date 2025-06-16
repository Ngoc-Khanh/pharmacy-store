import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useStep6 } from "@/hooks/use-step-form";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Star,
  MessageCircle,
  RotateCcw,
  Home,
  ShoppingBag,
  FileText,
  ThumbsUp,
  Heart,
  Sparkles,
  Bot,
  HelpCircle,
  Send,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const Step6Feedback = () => {
  const navigate = useNavigate();
  const { 
    feedbackRating, 
    setFeedbackRating, 
    feedbackComment, 
    setFeedbackComment,
    isValid,
    resetForm,
    placedOrder 
  } = useStep6();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSelect = (rating: number) => {
    setFeedbackRating(rating);
  };

  const handleSubmitFeedback = async () => {
    if (!isValid) {
      toast.error("Vui lòng đánh giá dịch vụ trước khi gửi");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement feedback submission API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success("Cảm ơn bạn đã góp ý! Ý kiến của bạn rất quan trọng với chúng tôi.");
    } catch {
      toast.error("Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewConsultation = () => {
    resetForm();
    toast.success("Bắt đầu tư vấn mới");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/profile/orders");
  };

  const handleContinueShopping = () => {
    navigate("/medicines");
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "Rất không hài lòng";
      case 2: return "Không hài lòng";
      case 3: return "Bình thường";
      case 4: return "Hài lòng";
      case 5: return "Rất hài lòng";
      default: return "";
    }
  };

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 1: return "text-red-500";
      case 2: return "text-orange-500";
      case 3: return "text-yellow-500";
      case 4: return "text-green-500";
      case 5: return "text-emerald-500";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Success Summary */}
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
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full mb-6 shadow-lg"
        >
          <Award className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-3"
        >
          Tư vấn hoàn tất! 🎉
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <p className="text-muted-foreground text-lg">
            Cảm ơn bạn đã tin tưởng dịch vụ tư vấn AI của Pharmacity
          </p>
          {placedOrder && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Đơn hàng:</span>
              <Badge variant="outline" className="font-mono text-sm px-3 py-1">
                #{placedOrder.id}
              </Badge>
              <span className="text-sm font-semibold text-emerald-600">
                {formatCurrency(placedOrder.totalPrice || 0)}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-purple-200 dark:border-purple-800/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">
                Đánh giá trải nghiệm tư vấn
              </h3>
            </div>

            <div className="space-y-6">
              {/* Rating Stars */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Bạn cảm thấy thế nào về dịch vụ tư vấn AI?
                </p>
                
                <div className="flex justify-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="ghost"
                      size="lg"
                      onClick={() => handleRatingSelect(rating)}
                      className={`hover:bg-yellow-100 dark:hover:bg-yellow-900/20 p-2 transition-all duration-200 ${
                        feedbackRating && rating <= feedbackRating
                          ? 'scale-110'
                          : ''
                      }`}
                    >
                      <Star 
                        className={`w-8 h-8 transition-colors ${
                          feedbackRating && rating <= feedbackRating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300 hover:text-yellow-400'
                        }`} 
                      />
                    </Button>
                  ))}
                </div>

                {feedbackRating && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className={`font-medium ${getRatingColor(feedbackRating)}`}>
                      {getRatingText(feedbackRating)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {feedbackRating}/5 sao
                    </Badge>
                  </motion.div>
                )}
              </div>

              {/* Feedback Comment */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <label className="text-sm font-medium">
                    Chia sẻ thêm về trải nghiệm của bạn (tùy chọn)
                  </label>
                </div>
                <Textarea
                  placeholder="Bạn có thể chia sẻ điều gì bạn thích hoặc gợi ý cải thiện dịch vụ..."
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Submit Feedback */}
              <div className="flex justify-center">
                <Button
                  onClick={handleSubmitFeedback}
                  disabled={!isValid || isSubmitting}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Gửi đánh giá
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                Bước tiếp theo
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* New Consultation */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-green-200 dark:border-green-700 cursor-pointer hover:border-green-300 dark:hover:border-green-600 transition-colors"
                onClick={handleStartNewConsultation}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    <Bot className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-medium text-green-700 dark:text-green-300">
                    Tư vấn mới
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Bắt đầu một phiên tư vấn AI mới cho các triệu chứng khác
                </p>
                <Button variant="outline" size="sm" className="w-full border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:border-green-600">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Tư vấn lại
                </Button>
              </motion.div>

              {/* Get Help */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-orange-200 dark:border-orange-700 cursor-pointer hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                    <HelpCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="font-medium text-orange-700 dark:text-orange-300">
                    Cần hỗ trợ thêm?
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Liên hệ với dược sĩ chuyên nghiệp để được tư vấn trực tiếp
                </p>
                <Button variant="outline" size="sm" className="w-full border-orange-200 hover:border-orange-300 hover:bg-orange-50 dark:border-orange-700 dark:hover:border-orange-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat với dược sĩ
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
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

      {/* Thank You Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="text-center py-6"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <ThumbsUp className="w-5 h-5 text-emerald-600" />
          <span className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
            Cảm ơn bạn đã sử dụng Pharmacity!
          </span>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Chúng tôi cam kết mang đến dịch vụ tư vấn AI tốt nhất và những sản phẩm chất lượng cao. 
          Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi.
        </p>
      </motion.div>
    </div>
  );
};
