import { Heart, Star, ShoppingCart, ArrowUpRight, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MedicineAPI } from "@/services/api/medicine.api";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { routes } from "@/config";

export default function BestSeller() {
  const { data: popularMedicine, isLoading } = useQuery({
    queryKey: ["popular-medicine"],
    queryFn: MedicineAPI.getPorpularMedicine,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <Badge variant="outline" className="border-green-200 dark:border-green-800">
              Khuyến mãi đặc biệt
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Sản phẩm bán chạy</h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400">
              Những sản phẩm được tin dùng và đánh giá cao từ khách hàng của chúng tôi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Skeleton loading UI
            Array(4).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="border-0 shadow-sm overflow-hidden">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <Skeleton className="w-full h-full" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-[80%] mb-2" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-24" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : (
            popularMedicine?.map((product, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <Link to={routes.medicineDetails(product.id)} className="block">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
                      <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
                        <img src={product.thumbnail.imageUrl} alt={product.thumbnail.imageAlt} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:via-green-500/0 group-hover:to-green-500/5 transition-colors duration-500"></div>
                    </div>
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                      -{product.variants.discountPercent}%
                    </div>
                    <Button size="icon" variant="ghost" className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/90 dark:bg-gray-950/90 hover:bg-white dark:hover:bg-gray-950 shadow-sm">
                      <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.ratings.star}</span>
                      </div>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <div className="text-xs text-gray-500 dark:text-gray-400">{product.ratings.reviewCount} đánh giá</div>
                    </div>
                    <h3 className="font-medium mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-lg">{product.variants.price.toLocaleString('vi-VN')}</div>
                      <div className="text-sm text-gray-500 line-through">{product.variants.originalPrice.toLocaleString('vi-VN')}</div>
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" className="group border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/50 hover:border-green-300 dark:hover:border-green-700 shine-effect">
                      <span>Thêm vào giỏ</span>
                      <ShoppingCart className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    </Button>
                    <Button variant="default" className="bg-green-600 hover:bg-green-700 group shine-effect" asChild>
                      <Link to={routes.medicineDetails(product.id)}>
                        <span>Xem chi tiết</span>
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="group" disabled={isLoading}>
            Xem tất cả sản phẩm
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </section>
  )
}
