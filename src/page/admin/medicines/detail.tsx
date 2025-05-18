import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { routes, siteConfig } from '@/config';
import { MedicineAPI } from '@/services/api/medicine.api';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Box, 
  Calendar, 
  CheckCircle2, 
  CircleDot, 
  Edit, 
  FileText, 
  Pill, 
  Tag, 
  Trash, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function MedicinesDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: medicine, isLoading } = useQuery({
    queryKey: ['medicine', id],
    queryFn: () => {
      // Using the MedicineList temporarily instead of MedicineDetail 
      // since the API doesn't have the detail method yet
      return MedicineAPI.MedicineList().then(medicines => 
        medicines.find(m => m.id === id) || null
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!id
  });

  const getStockConfig = (status?: string) => {
    if (status === "OUT-OF-STOCK") return {
      variant: "destructive",
      label: "Hết hàng",
      icon: <CircleDot className="h-3 w-3" />,
      bg: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
      hover: "hover:bg-red-200 dark:hover:bg-red-950/60"
    };
    if (status === "LOW-STOCK") return {
      variant: "warning",
      label: "Sắp hết hàng",
      icon: <CircleDot className="h-3 w-3 text-amber-500" />,
      bg: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
      hover: "hover:bg-amber-200 dark:hover:bg-amber-950/60"
    };
    return {
      variant: "outline",
      label: "Còn hàng",
      icon: <CircleDot className="h-3 w-3 text-teal-500" />,
      bg: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400",
      hover: "hover:bg-teal-200 dark:hover:bg-teal-950/60"
    };
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{isLoading ? 'Đang tải...' : `${medicine?.name || 'Chi tiết thuốc'}`} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                size="icon"
                className="h-9 w-9 border-teal-200 dark:border-teal-800/30 hover:bg-teal-50 hover:border-teal-300 dark:hover:bg-teal-900/20 transition-colors shadow-sm"
                onClick={() => navigate(routes.admin.medicines)}
              >
                <ArrowLeft className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </Button>
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight">Chi tiết thuốc</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline"
                className="gap-2 border-teal-200 hover:border-teal-300 hover:bg-teal-50 text-teal-600 dark:border-teal-800/30 dark:hover:bg-teal-900/20 dark:text-teal-400 shadow-sm"
              >
                <Edit size={16} className="stroke-[2.5px]" />
                <span>Chỉnh sửa</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline"
                className="gap-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 dark:border-red-800/30 dark:hover:bg-red-900/20 dark:text-red-400 shadow-sm"
              >
                <Trash size={16} className="stroke-[2.5px]" />
                <span>Xóa</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-7">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
            <div className="md:col-span-5 space-y-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-60 w-full rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-7">
            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              {/* Product Image Card */}
              <Card className="overflow-hidden border-teal-100 dark:border-teal-800/30 shadow-md">
                <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-950/60 dark:to-teal-900/60 flex items-center justify-center">
                  {medicine?.thumbnail?.url ? (
                    <img 
                      src={medicine.thumbnail.url} 
                      alt={medicine.thumbnail.alt || medicine.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Pill className="h-20 w-20 text-teal-600 dark:text-teal-400" />
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Badge 
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 text-xs",
                          medicine?.variants?.stockStatus === "OUT-OF-STOCK" 
                            ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400"
                            : medicine?.variants?.stockStatus === "LOW-STOCK"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950/30 dark:text-amber-400"
                            : "bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-950/30 dark:text-teal-400"
                        )}
                      >
                        {getStockConfig(medicine?.variants?.stockStatus).icon}
                        <span>{getStockConfig(medicine?.variants?.stockStatus).label}</span>
                      </Badge>
                      
                      {medicine?.variants?.isFeatured && (
                        <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white border-0 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Nổi bật</span>
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Box className="h-4 w-4" />
                        <span>Giới hạn:</span>
                      </div>
                      <span className="font-medium">{medicine?.variants?.limitQuantity || 'Không giới hạn'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Ngày thêm:</span>
                      </div>
                      <span className="font-medium">
                        {medicine?.createdAt 
                          ? new Date(medicine.createdAt).toLocaleDateString('vi-VN') 
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Price Card */}
              <Card className="border-teal-100 dark:border-teal-800/30 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Thông tin giá</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Giá hiện tại:</span>
                    <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                      {formattedPrice(medicine?.variants?.price || 0)}
                    </span>
                  </div>
                  
                  {medicine?.variants?.originalPrice && medicine.variants.originalPrice > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Giá gốc:</span>
                      <span className="text-sm line-through text-muted-foreground">
                        {formattedPrice(medicine.variants.originalPrice)}
                      </span>
                    </div>
                  )}
                  
                  {medicine?.variants?.discountPercent && medicine.variants.discountPercent > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Giảm giá:</span>
                      <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white dark:bg-cyan-600 dark:hover:bg-cyan-500">
                        {medicine.variants.discountPercent}%
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-5">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-muted/50 p-0 h-11">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/20 dark:data-[state=active]:text-teal-400 rounded-none h-11 px-4"
                  >
                    Tổng quan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="variants" 
                    className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/20 dark:data-[state=active]:text-teal-400 rounded-none h-11 px-4"
                  >
                    Biến thể
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sales" 
                    className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/20 dark:data-[state=active]:text-teal-400 rounded-none h-11 px-4"
                  >
                    Số liệu bán hàng
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/20 dark:data-[state=active]:text-teal-400 rounded-none h-11 px-4"
                  >
                    Đánh giá
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 pt-4">
                  <Card className="border-teal-100 dark:border-teal-800/30 shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col space-y-1.5">
                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-950/60 dark:to-teal-900/60 flex items-center justify-center">
                            <Pill className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                          </div>
                          {medicine?.name || 'Thuốc không xác định'}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          ID: {medicine?.id || 'N/A'}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                          Mô tả sản phẩm
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {medicine?.description || 'Không có mô tả cho sản phẩm này.'}
                        </p>
                      </div>
                      
                      <Separator className="bg-teal-100 dark:bg-teal-800/30" />
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <Tag className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                            Danh mục
                          </h3>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 rounded-md">
                              <AvatarFallback className="rounded-md bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                                {medicine?.category?.title?.substring(0, 2).toUpperCase() || 'BR'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {medicine?.category?.title || 'Danh mục không xác định'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                            Loại thuốc
                          </h3>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 rounded-md">
                              <AvatarFallback className="rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                {medicine?.details?.ingredients?.substring(0, 2).toUpperCase() || 'MF'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {medicine?.details?.ingredients || 'Không có thông tin'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="bg-teal-100 dark:bg-teal-800/30" />
                      
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                          Thống kê
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <Card className="border-teal-100 dark:border-teal-800/30">
                            <CardContent className="p-3 flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Đánh giá sao</span>
                              <span className="font-semibold">{medicine?.ratings?.star || 0}</span>
                            </CardContent>
                          </Card>
                          <Card className="border-teal-100 dark:border-teal-800/30">
                            <CardContent className="p-3 flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Lượt thích</span>
                              <span className="font-semibold">{medicine?.ratings?.liked || 0}</span>
                            </CardContent>
                          </Card>
                          <Card className="border-teal-100 dark:border-teal-800/30">
                            <CardContent className="p-3 flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Lượt đánh giá</span>
                              <span className="font-semibold">{medicine?.ratings?.reviewCount || medicine?.ratings?.review_count || 0}</span>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Variants Tab */}
                <TabsContent value="variants" className="pt-4">
                  <Card className="border-teal-100 dark:border-teal-800/30 shadow-md">
                    <CardHeader>
                      <CardTitle>Biến thể sản phẩm</CardTitle>
                      <CardDescription>Quản lý các loại, kích thước và đóng gói của sản phẩm này</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border border-teal-100 dark:border-teal-800/30 overflow-hidden shadow-sm">
                        {/* Variant table or list would go here */}
                        <div className="p-8 text-center text-muted-foreground">
                          Chức năng này đang được phát triển
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Sales Tab */}
                <TabsContent value="sales" className="pt-4">
                  <Card className="border-teal-100 dark:border-teal-800/30 shadow-md">
                    <CardHeader>
                      <CardTitle>Số liệu bán hàng</CardTitle>
                      <CardDescription>Xem thống kê và doanh số bán hàng cho sản phẩm này</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border border-teal-100 dark:border-teal-800/30 overflow-hidden shadow-sm">
                        {/* Sales charts and data would go here */}
                        <div className="p-8 text-center text-muted-foreground">
                          Chức năng này đang được phát triển
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="pt-4">
                  <Card className="border-teal-100 dark:border-teal-800/30 shadow-md">
                    <CardHeader>
                      <CardTitle>Đánh giá từ khách hàng</CardTitle>
                      <CardDescription>Xem và quản lý đánh giá của khách hàng cho sản phẩm này</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border border-teal-100 dark:border-teal-800/30 overflow-hidden shadow-sm">
                        {/* Reviews would go here */}
                        <div className="p-8 text-center text-muted-foreground">
                          Chức năng này đang được phát triển
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 