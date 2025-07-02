import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Star } from "lucide-react";
import { useState } from "react";

export const StepFiveFeedbackSection = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    // TODO: Send rating to backend
    console.log('[StepFiveFeedbackSection] Rating selected:', rating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
    >
      <Card className="border-purple-200 dark:border-purple-800/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
              <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              Cảm ơn bạn đã tin tưởng Pharmacity! 🎉
            </h3>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Đánh giá trải nghiệm tư vấn AI để giúp chúng tôi cải thiện dịch vụ
          </p>

          {/* Rating Stars */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRatingSelect(rating)}
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(null)}
                className="p-3 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors"
              >
                <Star 
                  className={`w-10 h-10 transition-colors ${
                    (hoveredRating ? rating <= hoveredRating : rating <= (selectedRating || 0))
                      ? "text-yellow-500 fill-yellow-500" 
                      : "text-gray-300 dark:text-gray-600"
                  }`} 
                />
              </motion.button>
            ))}
          </div>

          {/* Rating feedback */}
          {selectedRating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <p className="text-base font-medium text-purple-700 dark:text-purple-300">
                  {selectedRating === 5 && "🌟 Xuất sắc! Cảm ơn bạn đã đánh giá 5 sao"}
                  {selectedRating === 4 && "🎉 Tuyệt vời! Chúng tôi sẽ tiếp tục cải thiện"}
                  {selectedRating === 3 && "👍 Tốt! Chia sẻ thêm ý kiến để chúng tôi hoàn thiện hơn"}
                  {selectedRating === 2 && "🤝 Cảm ơn phản hồi, chúng tôi sẽ cải thiện dịch vụ"}
                  {selectedRating === 1 && "🙏 Xin lỗi vì trải nghiệm chưa tốt, chúng tôi sẽ làm tốt hơn"}
                </p>
              </div>
            </motion.div>
          )}

          {/* Feedback options */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant="outline"
              className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:border-purple-700 dark:hover:bg-purple-950/50 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Góp ý thêm
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Chúng tôi sẽ liên hệ với bạn nếu cần hỗ trợ thêm về đơn hàng 📞
            <br />
            <span className="font-medium">Hotline: 1900-1234</span> | 
            <span className="font-medium"> Email: support@pharmacity.vn</span>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 