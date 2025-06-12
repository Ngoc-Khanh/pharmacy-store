import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StockStatus } from "@/data/enum";

import { X } from "lucide-react";

interface MedicinesActiveFiltersProps {
  selectedCategories: string[];
  minRating: number;
  status: StockStatus | null;
  priceRange: [number, number];
  displayPriceRange: [number, number];
  onCategoryToggle: (category: string) => void;
  onRatingReset: () => void;
  onStatusToggle: () => void;
  onPriceReset: () => void;
  onResetAll: () => void;
  minPrice: number;
  maxPrice: number;
}

export function MedicinesActiveFilters({
  selectedCategories,
  minRating,
  status,
  priceRange,
  displayPriceRange,
  onCategoryToggle,
  onRatingReset,
  onStatusToggle,
  onPriceReset,
  onResetAll,
  minPrice,
  maxPrice
}: MedicinesActiveFiltersProps) {
  const hasActiveFilters = selectedCategories.length > 0 ||
    minRating > 0 ||
    status !== null ||
    priceRange[0] > minPrice ||
    priceRange[1] < maxPrice;

  if (!hasActiveFilters) return null;

  // Function to get readable status text
  const getStatusText = (status: StockStatus | null) => {
    switch (status) {
      case StockStatus.IN_STOCK: return "Còn hàng";
      case StockStatus.OUT_OF_STOCK: return "Hết hàng";
      case StockStatus.PRE_ORDER: return "Đặt trước";
      default: return "";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {selectedCategories.map(category => (
        <Badge key={category} variant="secondary" className="flex items-center gap-1">
          Danh mục: {category}
          <X
            className="h-3 w-3 cursor-pointer ml-1"
            onClick={() => onCategoryToggle(category)}
          />
        </Badge>
      ))}


      {minRating > 0 && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Đánh giá: ≥{minRating}⭐
          <X className="h-3 w-3 cursor-pointer ml-1" onClick={onRatingReset} />
        </Badge>
      )}

      {status && (
        <Badge
          variant="secondary"
          className={`flex items-center gap-1 ${status === StockStatus.IN_STOCK ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" :
            status === StockStatus.OUT_OF_STOCK ? "border-red-200 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
              "border-blue-200 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
        >
          Trạng thái: {getStatusText(status)}
          <X className="h-3 w-3 cursor-pointer ml-1" onClick={onStatusToggle} />
        </Badge>
      )}

      {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Giá: {displayPriceRange[0].toLocaleString()}₫ - {displayPriceRange[1].toLocaleString()}₫
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={onPriceReset}
          />
        </Badge>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onResetAll}
        className="text-xs hover:text-emerald-500"
      >
        Xóa bộ lọc
      </Button>
    </div>
  )
}
