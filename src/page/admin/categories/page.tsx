import CategoriesDialogs from "@/components/dialogs/categories";
import CategoriesDataTable, { categoriesColumns } from "@/components/table/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { Category } from "@/data/interfaces";
import { CategoriesAPI } from "@/services/api/categories.api";
import { useQuery } from "@tanstack/react-query";

import { FolderOpenDot, FolderSearch, FolderTree, Package, ShieldAlert } from "lucide-react";
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
      <div className="flex-1 space-y-5 p-6 pt-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <FolderTree className="h-8 w-8 text-primary" />
              Quản lý danh mục
            </h2>
            <p className="text-muted-foreground mt-1 max-w-3xl">
              Thêm, sửa và quản lý danh mục phân loại sản phẩm để tạo cấu trúc cho cửa hàng của bạn.
            </p>
          </div>
          <CategoriesPrimaryButtons />
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-cyan-50 border-green-100 dark:from-green-950/30 dark:to-cyan-950/30 dark:border-green-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Tổng danh mục</CardTitle>
              <FolderTree className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : totalCategories}
              </div>
              <p className="text-xs text-green-600/90 dark:text-green-400/90">
                Tất cả danh mục đã tạo trong hệ thống
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Có sản phẩm</CardTitle>
              <FolderSearch className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : categoriesWithProducts}
              </div>
              <p className="text-xs text-blue-600/90 dark:text-blue-400/90">
                <span className="font-medium">{Math.round((categoriesWithProducts / totalCategories) * 100)}%</span> danh mục đã có sản phẩm
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100 dark:from-orange-950/30 dark:to-amber-950/30 dark:border-orange-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-300">Chưa có sản phẩm</CardTitle>
              <FolderOpenDot className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800 dark:text-orange-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : categoriesNoProducts}
              </div>
              <p className="text-xs text-orange-600/90 dark:text-orange-400/90">
                <span className="font-medium">{Math.round((categoriesNoProducts / totalCategories) * 100)}%</span> danh mục cần thêm sản phẩm
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-br from-rose-50 to-red-50 border-rose-100 dark:from-rose-950/30 dark:to-red-950/30 dark:border-rose-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-rose-800 dark:text-rose-300">Đã ẩn</CardTitle>
              <ShieldAlert className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-800 dark:text-rose-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : inactiveCategories}
              </div>
              <p className="text-xs text-rose-600/90 dark:text-rose-400/90">
                <span className="font-medium">{Math.round((inactiveCategories / totalCategories) * 100)}%</span> danh mục đang bị ẩn
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100 dark:from-violet-950/30 dark:to-purple-950/30 dark:border-violet-900/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-violet-800 dark:text-violet-300">Tổng sản phẩm</CardTitle>
              <Package className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-violet-800 dark:text-violet-300">
                {isLoading ? <Skeleton className="h-8 w-16" /> : totalProducts}
              </div>
              <p className="text-xs text-violet-600/90 dark:text-violet-400/90">
                <span className="font-medium">~{Math.round(totalProducts / (categoriesWithProducts || 1))}</span> sản phẩm/danh mục
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table */}
        <div className="grid gap-4 md:grid-cols-1">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <CategoriesDataTable columns={categoriesColumns} data={categoriesData} />
          )}
        </div>
      </div>
      <CategoriesDialogs />
    </div>
  )
}