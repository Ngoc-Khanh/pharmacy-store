import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  selectedCategories: string[];
  selectedSuppliers: string[];
  minRating: number;
  status: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK" | null;
  priceRange: [number, number];
  displayPriceRange: [number, number];
  onCategoryToggle: (category: string) => void;
  onSupplierToggle: (supplier: string) => void;
  onRatingReset: () => void;
  onStatusToggle: () => void;
  onPriceReset: () => void;
  onResetAll: () => void;
  minPrice: number;
  maxPrice: number;
}

export function ActiveFilters({
  selectedCategories,
  selectedSuppliers,
  minRating,
  status,
  priceRange,
  displayPriceRange,
  onCategoryToggle,
  onSupplierToggle,
  onRatingReset,
  onStatusToggle,
  onPriceReset,
  onResetAll,
  minPrice,
  maxPrice
}: ActiveFiltersProps) {
  const hasActiveFilters = selectedCategories.length > 0 ||
    selectedSuppliers.length > 0 ||
    minRating > 0 ||
    status !== null ||
    priceRange[0] > minPrice ||
    priceRange[1] < maxPrice;

  if (!hasActiveFilters) return null;

  // Function to get readable status text
  const getStatusText = (status: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK" | null) => {
    switch (status) {
      case "IN-STOCK": return "Còn hàng";
      case "OUT-OF-STOCK": return "Hết hàng";
      case "LOW-STOCK": return "Sắp hết hàng";
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

      {selectedSuppliers.map(supplier => (
        <Badge key={supplier} variant="secondary" className="flex items-center gap-1">
          Nhà cung cấp: {supplier}
          <X
            className="h-3 w-3 cursor-pointer ml-1"
            onClick={() => onSupplierToggle(supplier)}
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
          className={`flex items-center gap-1 ${status === "IN-STOCK" ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" :
              status === "OUT-OF-STOCK" ? "border-red-200 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
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
