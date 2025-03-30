import { CategoryAPI } from "@/services/api/category.api";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/config";

export default function Product() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryAPI.getAllCategory,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="border-primary/20 dark:border-primary/30">
              Danh mục sản phẩm
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Khám phá sản phẩm</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Chúng tôi cung cấp đa dạng sản phẩm từ thuốc kê đơn, thuốc không kê đơn đến thực phẩm chức năng.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {categories?.map((category, index) => (
            <Card key={index} className="bg-white dark:bg-gray-950 border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center relative">
                <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 mb-4 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300 relative z-10">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight />
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-1 relative z-10 group-hover:text-primary transition-colors duration-300">{category.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 relative z-10">{category.description}</p>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 dark:from-primary/0 dark:to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 dark:group-hover:from-primary/10 dark:group-hover:to-primary/5 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/0 dark:bg-primary/0 rounded-full -mr-10 -mb-10 group-hover:bg-primary/10 dark:group-hover:bg-primary/5 transition-all duration-500 ease-in-out group-hover:scale-150"></div>
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary/0 dark:bg-primary/0 rounded-full -ml-10 -mt-10 group-hover:bg-primary/10 dark:group-hover:bg-primary/5 transition-all duration-500 ease-in-out group-hover:scale-150"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link to={routes.category}>
              Xem tất cả danh mục
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
