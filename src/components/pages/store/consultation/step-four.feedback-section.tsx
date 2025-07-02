import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Star } from "lucide-react";
import { useState } from "react";

export const StepFourFeedbackSection = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    // TODO: Send rating to backend
    console.log('Rating selected:', rating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8 }}
    >
      <Card className="border-purple-200 dark:border-purple-800/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
              Hài lòng với tư vấn AI?
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            Đánh giá trải nghiệm để giúp chúng tôi cải thiện dịch vụ tư vấn thông minh
          </p>
          
          {/* Rating Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRatingSelect(rating)}
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(null)}
                className="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors"
              >
                <Star 
                  className={`w-8 h-8 transition-colors ${
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
              className="mb-4"
            >
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {selectedRating === 5 && "Xuất sắc! Cảm ơn bạn đã đánh giá 5 sao ⭐"}
                {selectedRating === 4 && "Tuyệt vời! Chúng tôi sẽ tiếp tục cải thiện 🎉"}
                {selectedRating === 3 && "Tốt! Chia sẻ thêm ý kiến để chúng tôi hoàn thiện hơn"}
                {selectedRating === 2 && "Cảm ơn phản hồi, chúng tôi sẽ cải thiện dịch vụ"}
                {selectedRating === 1 && "Xin lỗi vì trải nghiệm chưa tốt, chúng tôi sẽ làm tốt hơn"}
              </p>
            </motion.div>
          )}

          {/* Feedback button */}
          <Button
            variant="outline"
            size="sm"
            className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:border-purple-700 dark:hover:bg-purple-950/50 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Góp ý thêm
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 