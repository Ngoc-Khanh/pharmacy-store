import { Pill, Activity, Shield, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Product() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="border-green-200 dark:border-green-800">
              Danh mục sản phẩm
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Khám phá sản phẩm</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Chúng tôi cung cấp đa dạng sản phẩm từ thuốc kê đơn, thuốc không kê đơn đến thực phẩm chức năng.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {[
            { name: "Thuốc kê đơn", icon: <Pill className="h-8 w-8" />, items: "1,200+" },
            { name: "Thuốc không kê đơn", icon: <Activity className="h-8 w-8" />, items: "800+" },
            { name: "Vitamin & TPCN", icon: <Shield className="h-8 w-8" />, items: "500+" },
            { name: "Chăm sóc cá nhân", icon: <Heart className="h-8 w-8" />, items: "300+" },
            { name: "Thiết bị y tế", icon: <Activity className="h-8 w-8" />, items: "150+" },
            { name: "Mẹ & Bé", icon: <Heart className="h-8 w-8" />, items: "400+" },
            { name: "Thảo dược", icon: <Shield className="h-8 w-8" />, items: "250+" },
            { name: "Sức khỏe tinh thần", icon: <Activity className="h-8 w-8" />, items: "100+" },
          ].map((category, index) => (
            <Card key={index} className="bg-white dark:bg-gray-950 border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center relative">
                <div className="p-3 rounded-full bg-green-50 dark:bg-green-950 mb-4 group-hover:bg-green-100 dark:group-hover:bg-green-900 transition-colors duration-300 relative z-10">
                  <div className="text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-1 relative z-10 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">{category.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 relative z-10">{category.items} sản phẩm</p>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-100/0 dark:from-green-950/0 dark:to-green-900/0 group-hover:from-green-50 group-hover:to-green-100/50 dark:group-hover:from-green-950/50 dark:group-hover:to-green-900/30 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-green-100/0 dark:bg-green-900/0 rounded-full -mr-10 -mb-10 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-all duration-500 ease-in-out group-hover:scale-150"></div>
                <div className="absolute top-0 left-0 w-20 h-20 bg-green-100/0 dark:bg-green-900/0 rounded-full -ml-10 -mt-10 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-all duration-500 ease-in-out group-hover:scale-150"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button className="group bg-green-600 hover:bg-green-700 text-white">
            Xem tất cả danh mục
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </section>
  )
}
