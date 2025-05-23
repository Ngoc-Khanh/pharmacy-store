import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { StockStatus } from "@/data/enum";
import { Medicine } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { Box, Calendar, CheckCircle2, CircleDot, Pill, Tag } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  medicine: Medicine;
}

export function MedicinesAdminDetailSidebar({ medicine }: Props) {
  const getStockConfig = (status?: string) => {
    if (status === StockStatus.OUT_OF_STOCK) return {
      variant: "destructive",
      label: "Hết hàng",
      icon: <CircleDot className="h-3 w-3" />,
      bg: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
      hover: "hover:bg-red-200 dark:hover:bg-red-950/60"
    };
    if (status === StockStatus.PRE_ORDER) return {
      variant: "warning",
      label: "Đặt trước",
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
    <div className="md:col-span-2 space-y-6">
      {/* Product Image Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-none bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
          <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-950/60 dark:to-teal-900/60 flex items-center justify-center relative">
            {medicine.thumbnail.url ? (
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
            {medicine.variants.isFeatured && (
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
                    medicine.variants.stockStatus === StockStatus.OUT_OF_STOCK
                      ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400"
                      : medicine.variants.stockStatus === StockStatus.PRE_ORDER
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
                  {medicine.variants.limitQuantity || 'Không giới hạn'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>Ngày thêm:</span>
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {medicine.createdAt
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
                {formattedPrice(medicine.variants.price || 0)}
              </span>
            </div>

            {medicine.variants.originalPrice && medicine.variants.originalPrice > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Giá gốc:</span>
                <span className="text-sm line-through text-slate-500 dark:text-slate-400">
                  {formattedPrice(medicine.variants.originalPrice)}
                </span>
              </div>
            )}

            {medicine.variants.discountPercent && medicine.variants.discountPercent > 0 && (
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
  )
}