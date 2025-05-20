import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { StoreAPI } from "@/services/api/store.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { routes } from "@/config";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  Package, 
  Pill, 
  Stethoscope, 
  Tablets, 
  Apple, 
  Heart, 
  Baby, 
  Droplets, 
  Dumbbell, 
  ShieldCheck, 
  Flower2,
  Search,
  LayoutGrid,
  List
} from "lucide-react";

// Map of category names to their respective icons
const categoryIcons: Record<string, React.ElementType> = {
  "Thuốc kê đơn": Pill,
  "Thuốc không kê đơn": Tablets,
  "Thực phẩm chức năng": Package,
  "Thiết bị y tế": Stethoscope,
  "Vitamin & Khoáng chất": Apple,
  "Chăm sóc cá nhân": Droplets,
  "Sức khỏe tim mạch": Heart,
  "Sản phẩm cho mẹ và bé": Baby,
  "Thể thao & Dinh dưỡng": Dumbbell,
  "Miễn dịch & Chống viêm": ShieldCheck,
  "Y học cổ truyền": Flower2,
  "default": ShoppingBag
};

type ViewMode = "grid" | "list";

function CategorySkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <>
      {Array(viewMode === "grid" ? 10 : 5).fill(0).map((_, index) => (
        <Card key={index} className="bg-white dark:bg-gray-950 border-0 shadow-sm">
          <CardContent className={`p-6 ${viewMode === "list" ? "flex flex-row items-center" : "flex flex-col items-center text-center"}`}>
            <Skeleton className={`rounded-full w-16 h-16 ${viewMode === "list" ? "mr-6" : "mb-4"}`} />
            <div className={`${viewMode === "list" ? "flex-1" : "w-full"}`}>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export function CategoriesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: StoreAPI.CategoryRoot,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Filter categories based on search term
  const filteredCategories = categories?.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Featured categories for banner
  const featuredCategories = categories?.slice(0, 3) || [];

  // Animation variants for the categories
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 md:px-6">
        {/* Featured Categories Banner */}
        {!isLoading && featuredCategories.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Danh mục nổi bật</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCategories.map((category, index) => {
                const CategoryIcon = categoryIcons[category.title] || categoryIcons.default;
                const gradients = [
                  "from-emerald-500 to-teal-400",
                  "from-blue-500 to-indigo-400",
                  "from-purple-500 to-pink-400"
                ];
                
                return (
                  <motion.div 
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`${routes.store.medicines}?category=${category.slug}`} className="block h-full">
                      <div className={`relative overflow-hidden rounded-xl h-40 bg-gradient-to-r ${gradients[index % gradients.length]} p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300`}>
                        <div className="absolute -right-8 -bottom-8 opacity-20">
                          <CategoryIcon className="w-40 h-40" />
                        </div>
                        <div className="z-10">
                          <Badge variant="outline" className="bg-white/10 border-white/20 text-white mb-2">
                            Danh mục nổi bật
                          </Badge>
                          <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        </div>
                        <Button variant="outline" className="self-start mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                          Khám phá
                        </Button>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Badge variant="outline" className="border-primary/20 dark:border-primary/30 px-3 py-1.5 text-sm font-medium">
            Danh mục sản phẩm
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Tất cả danh mục
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Khám phá đa dạng các danh mục sản phẩm y tế và dược phẩm của chúng tôi.
          </p>
          
          {/* Search and view toggle */}
          <div className="w-full max-w-4xl mt-6 flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                className="py-3 pl-10 pr-4 block w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="grid" className="h-10" onValueChange={(value) => setViewMode(value as ViewMode)}>
              <TabsList className="bg-muted h-10">
                <TabsTrigger value="grid" className="h-8 px-3">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Lưới
                </TabsTrigger>
                <TabsTrigger value="list" className="h-8 px-3">
                  <List className="h-4 w-4 mr-2" />
                  Danh sách
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {isLoading ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6" 
            : "flex flex-col space-y-4"
          }>
            <CategorySkeleton viewMode={viewMode} />
          </div>
        ) : !filteredCategories || filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              {searchTerm ? "Không tìm thấy danh mục" : "Chưa có danh mục nào"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? "Hãy thử tìm kiếm với từ khóa khác" : "Danh mục sẽ sớm được cập nhật"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCategories
              .filter(category => category.isActive === true)
              .map((category) => {
                const CategoryIcon = categoryIcons[category.title] || categoryIcons.default;
                
              return (
                <motion.div key={category.id} variants={itemVariants}>
                  <Link to={`${routes.store.root}?category=${category.slug}`} className="block h-full">
                    <Card className="bg-white dark:bg-gray-950 border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden h-full">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-colors duration-300">
                          <CategoryIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h3 className="font-medium text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {category.description || `Khám phá các sản phẩm trong danh mục ${category.title}`}
                        </p>
                        
                        <div className="mt-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Xem danh mục
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCategories.map((category) => {
              const CategoryIcon = categoryIcons[category.title] || categoryIcons.default;
              
              return (
                <motion.div key={category.id} variants={itemVariants}>
                  <Link to={`${routes.store.root}?category=${category.slug}`} className="block w-full">
                    <Card className="bg-white dark:bg-gray-950 border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden">
                      <CardContent className="p-6 flex flex-row items-center">
                        <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mr-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-colors duration-300">
                          <CategoryIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {category.description || `Khám phá các sản phẩm trong danh mục ${category.title}`}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Xem danh mục
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
} 