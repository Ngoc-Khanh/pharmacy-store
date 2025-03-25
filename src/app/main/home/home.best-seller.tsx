import { Heart, Star, ShoppingCart, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BestSeller() {
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
          {[
            { name: "Vitamin C 1000mg", price: "120.000đ", rating: 4.8, reviews: 124, discount: "15%" },
            { name: "Paracetamol 500mg", price: "35.000đ", rating: 4.9, reviews: 256, discount: "10%" },
            { name: "Omega-3 Fish Oil", price: "180.000đ", rating: 4.7, reviews: 98, discount: "20%" },
            { name: "Probiotics 10 tỷ", price: "220.000đ", rating: 4.6, reviews: 76, discount: "5%" },
          ].map((product, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">💊</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:via-green-500/0 group-hover:to-green-500/5 transition-colors duration-500"></div>
                </div>
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                  -{product.discount}
                </div>
                <Button size="icon" variant="ghost" className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/90 dark:bg-gray-950/90 hover:bg-white dark:hover:bg-gray-950 shadow-sm">
                  <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <div className="text-xs text-gray-500 dark:text-gray-400">{product.reviews} đánh giá</div>
                </div>
                <h3 className="font-medium mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">{product.name}</h3>
                <div className="font-bold text-lg">{product.price}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full group border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/50 hover:border-green-300 dark:hover:border-green-700 shine-effect">
                  <span className="mr-2">Thêm vào giỏ</span>
                  <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="group">
            Xem tất cả sản phẩm
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </section>
  )
}
