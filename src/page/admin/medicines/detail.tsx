import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { routes, siteConfig } from '@/config';
import { cn } from '@/lib/utils';
import { MedicineAPI } from '@/services/api/medicine.api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Box,
  Calendar,
  CheckCircle2,
  CircleDot,
  Edit,
  FileText,
  Heart,
  MessageSquare,
  Pill,
  Star,
  Tag,
  Trash,
  TrendingUp,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

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
      <div className="flex-1 space-y-6 p-8 pt-6 bg-slate-50/50 dark:bg-slate-900/20 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/30"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                size="icon"
                className="h-10 w-10 rounded-full border-teal-200 dark:border-teal-800/30 hover:bg-teal-50 hover:border-teal-300 dark:hover:bg-teal-900/20 transition-all shadow-sm"
                onClick={() => navigate(routes.admin.medicines)}
              >
                <ArrowLeft className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </Button>
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-400">Chi tiết thuốc</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Xem và quản lý thông tin sản phẩm</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline"
                className="gap-2 border-teal-200 hover:border-teal-300 hover:bg-teal-50 text-teal-600 dark:border-teal-800/30 dark:hover:bg-teal-900/20 dark:text-teal-400 shadow-sm rounded-lg h-10 px-4"
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
                className="gap-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 dark:border-red-800/30 dark:hover:bg-red-900/20 dark:text-red-400 shadow-sm rounded-lg h-10 px-4"
              >
                <Trash size={16} className="stroke-[2.5px]" />
                <span>Xóa</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-7">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
            <div className="md:col-span-5 space-y-6">
              <Skeleton className="h-10 w-1/3 rounded-lg" />
              <Skeleton className="h-6 w-1/4 rounded-lg" />
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-60 w-full rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-7">
            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              {/* Product Image Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="overflow-hidden border-none bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
                  <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-950/60 dark:to-teal-900/60 flex items-center justify-center relative">
                    {medicine?.thumbnail?.url ? (
                      <img 
                        src={medicine.thumbnail.url} 
                        alt={medicine.thumbnail.alt || medicine.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="p-10 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-full">
                        <Pill className="h-24 w-24 text-teal-600 dark:text-teal-400" />
                      </div>
                    )}
                    {medicine?.variants?.isFeatured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white border-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-sm">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Nổi bật</span>
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge 
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full shadow-sm",
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
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <Box className="h-4 w-4" />
                          <span>Giới hạn:</span>
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-200">
                          {medicine?.variants?.limitQuantity || 'Không giới hạn'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span>Ngày thêm:</span>
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-200">
                          {medicine?.createdAt 
                            ? new Date(medicine.createdAt).toLocaleDateString('vi-VN') 
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="border-none bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600 p-4">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Thông tin giá
                    </CardTitle>
                  </div>
                  <CardContent className="space-y-4 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Giá hiện tại:</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-400">
                        {formattedPrice(medicine?.variants?.price || 0)}
                      </span>
                    </div>
                    
                    {medicine?.variants?.originalPrice && medicine.variants.originalPrice > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Giá gốc:</span>
                        <span className="text-sm line-through text-slate-500 dark:text-slate-400">
                          {formattedPrice(medicine.variants.originalPrice)}
                        </span>
                      </div>
                    )}
                    
                    {medicine?.variants?.discountPercent && medicine.variants.discountPercent > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Giảm giá:</span>
                        <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 px-2.5 py-1 rounded-full shadow-sm">
                          -{medicine.variants.discountPercent}%
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Main Content */}
            <motion.div 
              className="md:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-white dark:bg-slate-800 p-1 h-12 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/30 mb-5">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white dark:data-[state=active]:from-teal-600 dark:data-[state=active]:to-cyan-600 data-[state=active]:border-none rounded-lg h-10 transition-all duration-200"
                  >
                    Tổng quan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="variants" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white dark:data-[state=active]:from-teal-600 dark:data-[state=active]:to-cyan-600 data-[state=active]:border-none rounded-lg h-10 transition-all duration-200"
                  >
                    Biến thể
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sales" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white dark:data-[state=active]:from-teal-600 dark:data-[state=active]:to-cyan-600 data-[state=active]:border-none rounded-lg h-10 transition-all duration-200"
                  >
                    Số liệu bán hàng
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white dark:data-[state=active]:from-teal-600 dark:data-[state=active]:to-cyan-600 data-[state=active]:border-none rounded-lg h-10 transition-all duration-200"
                  >
                    Đánh giá
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 pt-0">
                  <Card className="border-none bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col space-y-1.5">
                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-cyan-600 dark:to-teal-600 flex items-center justify-center shadow-sm">
                            <Pill className="h-5 w-5 text-white" />
                          </div>
                          <span className="bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
                            {medicine?.name || 'Thuốc không xác định'}
                          </span>
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-500 dark:text-slate-400 ml-[52px]">
                          ID: <span className="font-mono">{medicine?.id || 'N/A'}</span>
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium flex items-center gap-2 text-slate-700 dark:text-slate-200">
                          <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                          Mô tả sản phẩm
                        </h3>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-100 dark:border-slate-700/30">
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {medicine?.description || 'Không có mô tả cho sản phẩm này.'}
                          </p>
                        </div>
                      </div>
                      
                      <Separator className="bg-slate-200 dark:bg-slate-700/50" />
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <Tag className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                            Danh mục
                          </h3>
                          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-100 dark:border-slate-700/30">
                            <Avatar className="h-10 w-10 rounded-lg">
                              <AvatarFallback className="rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white dark:from-teal-600 dark:to-cyan-600 shadow-sm">
                                {medicine?.category?.title?.substring(0, 2).toUpperCase() || 'BR'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-slate-700 dark:text-slate-200">
                              {medicine?.category?.title || 'Danh mục không xác định'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                            Loại thuốc
                          </h3>
                          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-100 dark:border-slate-700/30">
                            <Avatar className="h-10 w-10 rounded-lg">
                              <AvatarFallback className="rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white dark:from-amber-600 dark:to-orange-600 shadow-sm">
                                {medicine?.details?.ingredients?.substring(0, 2).toUpperCase() || 'MF'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-slate-700 dark:text-slate-200">
                              {medicine?.details?.ingredients || 'Không có thông tin'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="bg-slate-200 dark:bg-slate-700/50" />
                      
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium flex items-center gap-2 text-slate-700 dark:text-slate-200">
                          <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                          Thống kê
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <Card className="border border-slate-100 dark:border-slate-700/30 bg-slate-50 dark:bg-slate-800/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                  <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                </div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">Đánh giá</span>
                              </div>
                              <span className="font-bold text-amber-600 dark:text-amber-400">{medicine?.ratings?.star || 0}</span>
                            </CardContent>
                          </Card>
                          <Card className="border border-slate-100 dark:border-slate-700/30 bg-slate-50 dark:bg-slate-800/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                                  <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                                </div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">Thích</span>
                              </div>
                              <span className="font-bold text-rose-600 dark:text-rose-400">{medicine?.ratings?.liked || 0}</span>
                            </CardContent>
                          </Card>
                          <Card className="border border-slate-100 dark:border-slate-700/30 bg-slate-50 dark:bg-slate-800/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                  <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-sm text-slate-600 dark:text-slate-300">Đánh giá</span>
                              </div>
                              <span className="font-bold text-blue-600 dark:text-blue-400">{medicine?.ratings?.reviewCount || medicine?.ratings?.review_count || 0}</span>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Variants Tab */}
                <TabsContent value="variants" className="pt-0">
                  <Card className="border-none bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Box className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        Biến thể sản phẩm
                      </CardTitle>
                      <CardDescription>Quản lý các loại, kích thước và đóng gói của sản phẩm này</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 overflow-hidden p-8 bg-slate-50 dark:bg-slate-800/50 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700/50 mx-auto flex items-center justify-center mb-4">
                          <Box className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">Chức năng này đang được phát triển</p>
                        <Button variant="outline" className="rounded-full border-teal-200 hover:border-teal-300 text-teal-600 dark:border-teal-800/30 dark:text-teal-400">
                          Sắp ra mắt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Sales Tab */}
                <TabsContent value="sales" className="pt-0">
                  <Card className="border-none bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        Số liệu bán hàng
                      </CardTitle>
                      <CardDescription>Xem thống kê và doanh số bán hàng cho sản phẩm này</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 overflow-hidden p-8 bg-slate-50 dark:bg-slate-800/50 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700/50 mx-auto flex items-center justify-center mb-4">
                          <TrendingUp className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">Chức năng này đang được phát triển</p>
                        <Button variant="outline" className="rounded-full border-teal-200 hover:border-teal-300 text-teal-600 dark:border-teal-800/30 dark:text-teal-400">
                          Sắp ra mắt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="pt-0">
                  <Card className="border-none bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        Đánh giá từ khách hàng
                      </CardTitle>
                      <CardDescription>Xem và quản lý đánh giá của khách hàng cho sản phẩm này</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 overflow-hidden p-8 bg-slate-50 dark:bg-slate-800/50 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700/50 mx-auto flex items-center justify-center mb-4">
                          <MessageSquare className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">Chức năng này đang được phát triển</p>
                        <Button variant="outline" className="rounded-full border-teal-200 hover:border-teal-300 text-teal-600 dark:border-teal-800/30 dark:text-teal-400">
                          Sắp ra mắt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 