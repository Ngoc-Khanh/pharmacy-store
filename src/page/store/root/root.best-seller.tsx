import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/config";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

export function BestSeller() {
  const { data: popularMedicine, isLoading } = useQuery({
    queryKey: ["popular-medicine"],
    queryFn: StoreAPI.PopularMedicine,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <section className="w-full py-16 md:py-28 bg-gradient-to-b from-white via-green-50/30 to-blue-50/20 dark:from-gray-950 dark:via-green-950/20 dark:to-blue-950/10 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="absolute -top-40 right-10 w-96 h-96 bg-green-200/40 dark:bg-green-800/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-blue-200/40 dark:bg-blue-800/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-6 text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/60 px-4 py-1.5 text-sm rounded-full shadow-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-green-600 dark:text-green-400" />
              <span className="font-medium">Khuyến mãi đặc biệt</span>
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 pb-1">
              Sản phẩm bán chạy
            </h2>
            <p className="max-w-[700px] text-gray-600 dark:text-gray-300 text-lg md:text-xl/relaxed mx-auto font-light">
              Những sản phẩm được tin dùng và đánh giá cao từ khách hàng của chúng tôi.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            // Skeleton loading UI
            Array(4).fill(0).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="rounded-xl border-0 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 h-full">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                      <Skeleton className="w-full h-full" />
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center mb-2">
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-6 w-[80%] mb-2" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            popularMedicine?.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="rounded-xl border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white/80 backdrop-blur-sm dark:bg-gray-900/60 h-full flex flex-col border-gray-100/80 dark:border-gray-800/50">
                  <Link to={routes.store.medicineDetails(product.id)} className="block flex-1">
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.thumbnail.url || ""}
                          alt={product.thumbnail.alt}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                        -{product.variants.discountPercent}%
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 left-3 h-9 w-9 rounded-full bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 shadow-md border-0 hover:scale-110 transition-all duration-200"
                      >
                        <Heart className="h-4.5 w-4.5 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200" />
                      </Button>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center bg-yellow-50 dark:bg-yellow-950/30 px-2.5 py-1 rounded-md shadow-sm">
                          <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                          <span className="text-sm font-medium ml-1 text-amber-700 dark:text-amber-400">{product.ratings.star}</span>
                        </div>
                        <Separator orientation="vertical" className="mx-2 h-4" />
                        <div className="text-xs text-gray-500 dark:text-gray-400">{product.ratings.reviewCount} đánh giá</div>
                      </div>
                      <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">{product.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <div className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">{product.variants.price.toLocaleString('vi-VN')}đ</div>
                        <div className="text-sm text-gray-500 line-through">{product.variants.originalPrice?.toLocaleString('vi-VN')}đ</div>
                      </div>
                    </CardContent>
                  </Link>
                  <CardFooter className="p-5 pt-0 mt-auto">
                    <div className="flex gap-3 w-full">
                      <Button
                        variant="default"
                        className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 group border-0 hover:shadow-md transition-all duration-200 w-full"
                        asChild
                      >
                        <Link to={routes.store.medicineDetails(product.id)}>
                          <span>Chi tiết</span>
                          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                  <div className="h-1 w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="group px-6 py-6 rounded-full border-green-300 dark:border-green-700 bg-white/80 dark:bg-gray-900/60 hover:bg-green-50 dark:hover:bg-green-950/30 text-green-700 dark:text-green-400 font-medium text-lg shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
            disabled={isLoading}
            asChild
          >
            <Link to={routes.store.medicines}>
              Xem tất cả sản phẩm
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

