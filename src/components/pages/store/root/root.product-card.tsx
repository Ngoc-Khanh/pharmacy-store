import { Icons } from "@/components/custom/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config";
import { MedicineResponse } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";

interface RootProductCardProps {
  className?: string;
  medicine: MedicineResponse;
  index?: number;
}

// Component hiển thị star rating chi tiết
function StarRating({ rating, className }: { rating: number; className?: string }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Thêm các star đầy
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
    );
  }
  
  // Thêm half star nếu có
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className="h-3.5 w-3.5 text-gray-300" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
        </div>
      </div>
    );
  }
  
  // Thêm các star trống
  const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="h-3.5 w-3.5 text-gray-300" />
    );
  }
  
  return (
    <div className={cn("flex items-center", className)}>
      {stars}
    </div>
  );
}

export function RootProductCard({ className, medicine, index = 0, ...props }: RootProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn("", className)}
      {...props}
    >
      <Card className="rounded-xl border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white/80 backdrop-blur-sm dark:bg-gray-900/60 h-full flex flex-col border-gray-100/80 dark:border-gray-800/50">
        <Link to={routes.store.medicineDetails(medicine.id)} className="block flex-1">
          <CardContent className="relative p-0 overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 flex items-center justify-center overflow-hidden">
              <img
                src={medicine.thumbnail.url}
                alt={medicine.thumbnail.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {medicine.variants.discountPercent && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                -{medicine.variants.discountPercent}%
              </div>
            )}
          </CardContent>

          <CardHeader className="p-5">
            <div className="flex items-center mb-3">
              <div className="flex items-center bg-yellow-50 dark:bg-yellow-950/30 px-2.5 py-1 rounded-md shadow-sm">
                <StarRating rating={medicine.ratings.star} className="mr-1.5" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  {medicine.ratings.star}
                </span>
              </div>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="text-xs text-gray-500 dark:text-gray-400">
                ({medicine.ratings.reviewCount} đánh giá)
              </div>
            </div>
            
            <CardTitle className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
              {medicine.name}
            </CardTitle>

            <div className="hidden md:block mb-3">
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {medicine.description}
              </CardDescription>
            </div>

            <div className="flex items-baseline gap-2">
              <div className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
                {medicine.variants.price.toLocaleString('vi-VN')}₫
              </div>
              {medicine.variants.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  {medicine.variants.originalPrice.toLocaleString('vi-VN')}₫
                </div>
              )}
            </div>
          </CardHeader>
        </Link>

        <CardFooter className="p-5 pt-0 mt-auto">
          <div className="flex gap-3 w-full">
            <Suspense
              fallback={
                <Button className="rounded-full p-0 h-9 w-9" disabled>
                  <Icons.basket className="h-4 w-4" />
                </Button>
              }
            >
              <Button
                size="icon"
                className="rounded-full h-9 w-9 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 border-0 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Icons.basket className="h-4 w-4" />
              </Button>
              {/* <AddToCartButton productId={medicine.id} /> */}
            </Suspense>

            <Button
              variant="default"
              className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 group border-0 hover:shadow-md transition-all duration-200 flex-1"
              asChild
            >
              <Link to={routes.store.medicineDetails(medicine.id)}>
                <span>Chi tiết</span>
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </CardFooter>
        
        <div className="h-1 w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Card>
    </motion.div>
  );
}
