import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingBag, Package, Pill, Stethoscope, Tablets, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/config";
import { Skeleton } from "@/components/ui/skeleton";
import { StoreAPI } from "@/services/api/store.api";

function CategorySkeleton() {
  return (
    <>
      {Array(8).fill(0).map((_, index) => (
        <Card key={index} className="bg-white dark:bg-gray-950 border-0 shadow-sm overflow-hidden group">
          <CardContent className="p-6 flex flex-col items-center text-center relative">
            <Skeleton className="p-3 rounded-full w-16 h-16 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

const categoryIcons: Record<string, React.ElementType> = {
  "Thuốc kê đơn": Pill,
  "Thuốc không kê đơn": Tablets,
  "Thực phẩm chức năng": Package,
  "Thiết bị y tế": Stethoscope,
  "Vitamin & Khoáng chất": Apple,
  "default": ShoppingBag
};

export function Categories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: StoreAPI.CategoryRoot,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <div className="space-y-2">
            <Badge variant="outline" className="border-primary/20 dark:border-primary/30 px-3 py-1.5 text-sm font-medium">
              Danh mục sản phẩm
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Khám phá sản phẩm
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Chúng tôi cung cấp đa dạng sản phẩm từ thuốc kê đơn, thuốc không kê đơn đến thực phẩm chức năng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {isLoading ? (
            <CategorySkeleton />
          ) : !categories || categories.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Không có danh mục nào</p>
            </div>
          ) : (
            categories.map((category, index) => {
              // Xác định icon dựa trên tên danh mục
              const CategoryIcon = categoryIcons[category.title] || categoryIcons.default;

              return (
                <Link key={index} to={`${routes.store.root}?category=${category.title}`} className="h-full">
                  <div className="h-full">
                    <Card className="bg-white dark:bg-gray-950 border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden h-full flex flex-col">
                      <CardContent className="p-6 flex flex-col items-center text-center relative flex-1">
                        <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-colors duration-300 relative z-10">
                          <div className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                            <CategoryIcon size={24} />
                          </div>
                        </div>
                        <h3 className="font-medium text-lg mb-1 relative z-10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 relative z-10 line-clamp-2 flex-1">
                          {category.description || `Khám phá các sản phẩm trong danh mục ${category.title}`}
                        </p>

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/0 dark:from-emerald-900/0 dark:to-emerald-900/0 group-hover:from-emerald-50 group-hover:to-emerald-100/50 dark:group-hover:from-emerald-900/10 dark:group-hover:to-emerald-800/20 transition-all duration-300"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-100/0 dark:bg-emerald-800/0 rounded-full -mr-12 -mb-12 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/20 transition-all duration-500 ease-in-out group-hover:scale-150"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-100/0 dark:bg-emerald-800/0 rounded-full -ml-10 -mt-10 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/20 transition-all duration-500 ease-in-out group-hover:scale-150"></div>
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        <div className="flex justify-center mt-10">
          <Button className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300" asChild>
            <Link to={routes.store.categories} className="flex items-center gap-2">
              Xem tất cả danh mục
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
