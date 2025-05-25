import CategoriesDialogs from "@/components/dialogs/categories";
import CategoriesDataTable, { categoriesColumns } from "@/components/table/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { Category } from "@/data/interfaces";
import { CategoriesAPI } from "@/services/api/categories.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FolderOpenDot, FolderSearch, FolderTree, Package, ShieldAlert, Archive } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { CategoriesPrimaryButtons } from "./categories.primary-buttons";

// Extend Category interface for display purposes (UI-specific properties)
interface ExtendedCategory extends Category {
  productCount?: number;
}

export default function CategoriesAdminPage() {
  const { data: categoriesList, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.CategoriesList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const categoriesData = categoriesList || [];

  const displayCategories = categoriesData.length > 0 ? categoriesData : [];

  const totalCategories = displayCategories.length;
  const categoriesWithProducts = displayCategories.filter(cat => ((cat as ExtendedCategory).productCount || 0) > 0).length;
  const categoriesNoProducts = displayCategories.filter(cat => ((cat as ExtendedCategory).productCount || 0) === 0).length;
  const totalProducts = displayCategories.reduce((sum, cat) => sum + ((cat as ExtendedCategory).productCount || 0), 0);
  const inactiveCategories = displayCategories.filter(cat => cat.isActive === false).length;

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.categories]} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-xl p-6 shadow-sm border border-amber-100 dark:border-amber-800/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-100 dark:bg-amber-800/30 p-2.5 rounded-lg">
              <FolderTree size={28} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-amber-800 dark:text-amber-300">
              Quản lý danh mục
            </h2>
          </div>
          <p className="text-amber-600/90 dark:text-amber-400/80 ml-[52px]">
            Thêm, sửa và quản lý danh mục phân loại sản phẩm để tạo cấu trúc cho hệ thống Pharmacity Store
          </p>
        </motion.div>
        
        {/* Stats */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="col-span-1"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border-amber-100 dark:from-orange-950/30 dark:to-amber-950/30 dark:border-amber-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-300">Tổng danh mục</CardTitle>
                <Archive className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-800 dark:text-amber-300">
                  {isLoading ? <Skeleton className="h-8 w-16 bg-amber-200/50 dark:bg-amber-700/30" /> : totalCategories}
                </div>
                <p className="text-xs text-amber-600/90 dark:text-amber-400/90 mt-1">
                  Tất cả danh mục đã tạo trong hệ thống
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="col-span-1"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100 dark:from-blue-950/30 dark:to-sky-950/30 dark:border-blue-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Có sản phẩm</CardTitle>
                <FolderSearch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                  {isLoading ? <Skeleton className="h-8 w-16 bg-blue-200/50 dark:bg-blue-700/30" /> : categoriesWithProducts}
                </div>
                <p className="text-xs text-blue-600/90 dark:text-blue-400/90 mt-1">
                  <span className="font-medium">{Math.round((categoriesWithProducts / (totalCategories || 1)) * 100)}%</span> danh mục đã có sản phẩm
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="col-span-1"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-100 dark:from-yellow-950/30 dark:to-amber-950/30 dark:border-yellow-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Chưa có sản phẩm</CardTitle>
                <FolderOpenDot className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">
                  {isLoading ? <Skeleton className="h-8 w-16 bg-yellow-200/50 dark:bg-yellow-700/30" /> : categoriesNoProducts}
                </div>
                <p className="text-xs text-yellow-600/90 dark:text-yellow-400/90 mt-1">
                  <span className="font-medium">{Math.round((categoriesNoProducts / (totalCategories || 1)) * 100)}%</span> danh mục cần thêm sản phẩm
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="col-span-1"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-rose-50 to-red-50 border-rose-100 dark:from-rose-950/30 dark:to-red-950/30 dark:border-rose-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-rose-800 dark:text-rose-300">Đã ẩn</CardTitle>
                <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-800 dark:text-rose-300">
                  {isLoading ? <Skeleton className="h-8 w-16 bg-rose-200/50 dark:bg-rose-700/30" /> : inactiveCategories}
                </div>
                <p className="text-xs text-rose-600/90 dark:text-rose-400/90 mt-1">
                  <span className="font-medium">{Math.round((inactiveCategories / (totalCategories || 1)) * 100)}%</span> danh mục đang bị ẩn
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="col-span-1"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100 dark:from-violet-950/30 dark:to-purple-950/30 dark:border-violet-900/50 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-violet-800 dark:text-violet-300">Tổng sản phẩm</CardTitle>
                <Package className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-violet-800 dark:text-violet-300">
                  {isLoading ? <Skeleton className="h-8 w-16 bg-violet-200/50 dark:bg-violet-700/30" /> : totalProducts}
                </div>
                <p className="text-xs text-violet-600/90 dark:text-violet-400/90 mt-1">
                  <span className="font-medium">~{Math.round(totalProducts / (categoriesWithProducts || 1))}</span> sản phẩm/danh mục
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Categories Table */}
        <div className="grid gap-6 grid-cols-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="bg-amber-100/50 dark:bg-amber-900/30 p-1.5 rounded-full">
                <FolderTree size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Danh sách tất cả danh mục</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Quản lý và sắp xếp các danh mục sản phẩm</p>
              </div>
            </motion.div>
            <CategoriesPrimaryButtons />
          </div>
          
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <CategoriesDataTable columns={categoriesColumns} data={categoriesData} />
            </motion.div>
          )}
        </div>
      </div>
      <CategoriesDialogs />
    </div>
  )
}