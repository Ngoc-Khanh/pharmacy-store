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
          src={item.medicine.thumbnail.url}
          alt={item.medicine.thumbnail.alt || item.medicine.name}
          className={`h-full w-full object-contain transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link
              to={routes.store.medicineDetails(item.medicine.id)}
              className="font-medium text-lg hover:text-emerald-600 hover:underline transition-colors"
            >
              {item.medicine.name}
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