import { StockStatus } from '@/data/enums';
import { MedicineResponse } from '@/data/interfaces';
import { motion } from 'motion/react';

interface MedicineDetailImageProps {
  imageUrl: MedicineResponse["thumbnail"]["url"];
  imageAlt: MedicineResponse["thumbnail"]["alt"];
  discountPercent?: MedicineResponse["variants"]["discountPercent"];
  stockStatus: MedicineResponse["variants"]["stockStatus"];
}

export function MedicineDetailImage({ imageUrl, imageAlt, discountPercent, stockStatus }: MedicineDetailImageProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/30 p-6 shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-inner">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Discount Badge */}
      {discountPercent && discountPercent > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="absolute top-10 left-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full shadow-lg"
        >
          -{discountPercent}%
        </motion.div>
      )}

      {/* Stock Status */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
        className={`absolute top-10 right-10 px-3 py-1.5 rounded-full shadow-lg ${stockStatus === StockStatus.IN_STOCK
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          : stockStatus === StockStatus.PRE_ORDER
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
            : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
          }`}
      >
        {stockStatus === StockStatus.IN_STOCK
          ? "Còn hàng"
          : stockStatus === StockStatus.PRE_ORDER
            ? "Đặt trước"
            : "Hết hàng"}
      </motion.div>
    </motion.div>
  )
}