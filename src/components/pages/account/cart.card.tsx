import { memo, useState } from "react";
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { routes } from "@/config";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CartItem = memo(({ item, onQuantityChange, onRemove }: { item: any, onQuantityChange: any, onRemove: any }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-5 p-5 hover:bg-green-50/50 dark:hover:bg-green-950/10 transition-colors duration-200"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-green-100 dark:border-green-800/30 flex items-center justify-center p-2">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 rounded-lg" />
        )}
        <img
          src={item.medicine?.thumbnail?.url || ""}
          alt={item.medicine?.thumbnail?.alt || item.medicine?.name || "Thuốc"}
          className={`h-full w-full object-contain transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = `
              <div class="h-full w-full bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/20 flex items-center justify-center">
                <svg class="h-8 w-8 text-teal-500 dark:text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/>
                </svg>
              </div>
            `;
          }}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link
              to={routes.store.medicineDetails(item.medicine?.id || "")}
              className="font-medium text-lg hover:text-emerald-600 hover:underline transition-colors"
            >
              {item.medicine?.name || "Tên thuốc không xác định"}
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-emerald-50 text-xs font-normal text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                {item.medicine.category?.title || 'Không có danh mục'}
              </Badge>
            </div>
          </div>
          <div className="font-semibold text-lg text-emerald-600 dark:text-emerald-400">
            {formatCurrency(item.medicine.variants.price)}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-md p-1 border border-emerald-100 dark:border-emerald-800/30">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-800/30 text-emerald-700 dark:text-emerald-400"
              onClick={() => onQuantityChange(item.medicine.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              className="h-8 w-16 text-center bg-white dark:bg-gray-900 border-0"
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.medicine.id, parseInt(e.target.value))}
              min={1}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-800/30 text-emerald-700 dark:text-emerald-400"
              onClick={() => onQuantityChange(item.medicine.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            onClick={() => onRemove(item.medicine.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa
          </Button>
        </div>
      </div>
    </motion.div>
  );
});