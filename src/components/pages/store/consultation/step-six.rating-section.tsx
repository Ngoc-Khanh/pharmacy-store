import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Star, MessageCircle, Send, Heart } from "lucide-react";
import { useState } from "react";

interface StepSixRatingSectionProps {
  feedbackRating: number | null;
  setFeedbackRating: (rating: number) => void;
  feedbackComment: string;
  setFeedbackComment: (comment: string) => void;
  onSubmitFeedback: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

export const StepSixRatingSection = ({
  feedbackRating,
  setFeedbackRating,
  feedbackComment,
  setFeedbackComment,
  onSubmitFeedback,
  isValid,
  isSubmitting
}: StepSixRatingSectionProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "Rất không hài lòng 😞";
      case 2: return "Không hài lòng 😕";
      case 3: return "Bình thường 😐";
      case 4: return "Hài lòng 😊";
      case 5: return "Rất hài lòng 🤩";
      default: return "";
    }
  };

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 1: return "text-red-500";
      case 2: return "text-orange-500";
      case 3: return "text-yellow-500";
      case 4: return "text-teal-500";
      case 5: return "text-emerald-500";
      default: return "text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Card className="border-purple-200 dark:border-purple-800/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
              <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              Đánh giá trải nghiệm tư vấn
            </h3>
          </div>

          <div className="space-y-8">
            {/* Rating Stars */}
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Bạn cảm thấy thế nào về dịch vụ tư vấn AI của chúng tôi?
              </p>

              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFeedbackRating(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(null)}
                    className="p-3 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-all duration-200"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${(hoveredRating ? rating <= hoveredRating : feedbackRating && rating <= feedbackRating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300 hover:text-yellow-400'
                        }`}
                    />
                  </motion.button>
                ))}
              </div>

              {feedbackRating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <span className={`text-lg font-semibold ${getRatingColor(feedbackRating)}`}>
                    {getRatingText(feedbackRating)}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-base px-3 py-1 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/50 dark:to-orange-950/50 border-yellow-300 dark:border-yellow-700"
                  >
                    {feedbackRating}/5 ⭐
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Feedback Comment */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Chia sẻ thêm về trải nghiệm của bạn
                </label>
                <Badge variant="secondary" className="text-xs">Tùy chọn</Badge>
              </div>

              <Textarea
                placeholder="Bạn có thể chia sẻ điều gì bạn thích hoặc gợi ý cải thiện dịch vụ tư vấn AI... 
• Tính chính xác của kết quả tư vấn
• Giao diện và trải nghiệm sử dụng  
• Độ hữu ích của lời khuyên
• Những điểm cần cải thiện"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                rows={5}
                className="resize-none text-base leading-relaxed border-purple-200 dark:border-purple-800 focus:border-purple-400 dark:focus:border-purple-600"
              />
              <p className="text-sm text-muted-foreground">
                Góp ý của bạn giúp chúng tôi phát triển AI tư vấn thông minh hơn 🤖
              </p>
            </div>

            {/* Submit Feedback */}
            <div className="flex justify-center">
              <Button
                onClick={onSubmitFeedback}
                disabled={!isValid || isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-14 px-8 text-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                    />
                    Đang gửi đánh giá...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    Gửi đánh giá & hoàn tất
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
