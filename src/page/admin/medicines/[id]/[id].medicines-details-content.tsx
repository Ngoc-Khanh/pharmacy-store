import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Medicine } from "@/data/interfaces";
import { Box, FileText, Heart, MessageSquare, Pill, Star, Tag, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  medicine: Medicine;
}

export function MedicinesAdminDetailContent({ medicine }: Props) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
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
                      <span className="font-bold text-blue-600 dark:text-blue-400">{medicine?.ratings?.reviewCount || 0}</span>
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
  )
}