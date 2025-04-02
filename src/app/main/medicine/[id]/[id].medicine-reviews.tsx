import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface Review {
  name: string;
  avatar: string;
  rating: number;
  time: string;
  content: string;
}

interface MedicineDetailsReviewsProps {
  star: number;
  reviewCount: number;
  reviews: Review[];
}

export function MedicineDetailsReviews({ star, reviewCount, reviews }: MedicineDetailsReviewsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-12"
    >
      <div className="p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/80 dark:to-slate-900/30 rounded-2xl shadow-lg border">
        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-8 pb-2 border-b border-emerald-100 dark:border-emerald-900/50">
            Đánh giá từ khách hàng ({reviewCount})
          </h3>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="md:w-1/3 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center"
            >
              <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 mb-4">
                {star.toFixed(1)}
              </div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-7 w-7 ${i < Math.round(star) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">{reviewCount} đánh giá</p>
              <div className="pt-6 border-t">
                <p className="text-sm text-center mb-4">Bạn đã dùng sản phẩm này?</p>
                <Button variant="outline" className="w-full text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                  Viết đánh giá
                </Button>
              </div>
            </motion.div>

            <div className="md:w-2/3">
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4 ring-2 ring-emerald-100 dark:ring-emerald-900/30">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-lg">{review.name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">{review.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.content}</p>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="mt-8 bg-white dark:bg-slate-800 shadow-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                Xem tất cả đánh giá <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
