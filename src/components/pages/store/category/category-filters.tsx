import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CategoryResponse } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { useCallback, useRef } from "react";

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  minPrice?: number;
  setMinPrice?: (value: number) => void;
  selectedRating: number[];
  setSelectedRating: (value: number[]) => void;
  selectedSupplier: string;
  setSelectedSupplier: (value: string) => void;
  categories: CategoryResponse[];
  suppliersWithAll: { id: string; name: string }[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isLoadingSuppliers: boolean;
  suppliersError: Error | null;
  clearFilters: () => void;
}

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-sm">{title}</h4>
    {children}
  </div>
);

const PriceSlider = ({ 
  minPrice = 0, 
  maxPrice, 
  setMinPrice, 
  setMaxPrice 
}: { 
  minPrice?: number; 
  maxPrice: number; 
  setMinPrice?: (value: number) => void; 
  setMaxPrice: (value: number) => void; 
}) => {
  const maxPriceLimit = 1000000;

  const handlePriceChange = (values: number[]) => {
    if (values.length === 2) {
      // Dual range slider
      if (setMinPrice) setMinPrice(values[0]);
      setMaxPrice(values[1]);
    } else {
      // Single range slider (backward compatibility)
      setMaxPrice(values[0]);
    }
  };

  // Use dual range if setMinPrice is provided
  const sliderValues = setMinPrice ? [minPrice, maxPrice] : [maxPrice];

  return (
    <div className="space-y-4">
      <div className="px-2 py-3">
        <Slider
          value={sliderValues}
          onValueChange={handlePriceChange}
          max={maxPriceLimit}
          min={0}
          step={10000}
          className="w-full [&_[role=slider]]:bg-teal-600 [&_[role=slider]]:border-teal-600 dark:[&_[role=slider]]:bg-teal-500 dark:[&_[role=slider]]:border-teal-500 [&_.bg-primary]:bg-teal-600 dark:[&_.bg-primary]:bg-teal-500 [&_.bg-primary\\/20]:bg-teal-200 dark:[&_.bg-primary\\/20]:bg-teal-800/30"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
        <span>0đ</span>
        <span>1,000,000đ</span>
      </div>
      
      {setMinPrice ? (
        // Dual range display
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center space-y-1">
          <div>
            Từ: <span className="font-medium text-teal-600 dark:text-teal-400">{formatCurrency(minPrice)}</span>
          </div>
          <div>
            Đến: <span className="font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(maxPrice)}</span>
          </div>
        </div>
      ) : (
        // Single range display (backward compatibility)
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Tối đa: <span className="font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(maxPrice)}</span>
        </div>
      )}
    </div>
  );
};

export function CategoryFilters({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  minPrice = 0,
  setMinPrice,
  selectedRating,
  setSelectedRating,
  selectedSupplier,
  setSelectedSupplier,
  categories,
  suppliersWithAll,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  isLoadingSuppliers,
  suppliersError,
  clearFilters
}: FilterSidebarProps) {
  // Observer ref cho infinite scroll suppliers
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Callback để load more suppliers khi scroll đến cuối
  const loadMoreSuppliers = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Setup intersection observer để detect khi user scroll đến cuối select
  const lastSupplierRef = useCallback((node: HTMLDivElement | null) => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        loadMoreSuppliers();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isFetchingNextPage, hasNextPage, loadMoreSuppliers]);

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) setSelectedRating([...selectedRating, rating]);
    else setSelectedRating(selectedRating.filter(r => r !== rating));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}>
        ★
      </span>
    ));
  };

  // Tính tổng số thuốc cho mục "Tất cả"
  const totalMedicines = categories.reduce((sum, category) => sum + (category.totalMedicines || 0), 0);
  const allSuppliers = suppliersWithAll.filter(s => s.id !== 'all');

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg sticky top-28">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Bộ lọc</h3>
          <Button
            onClick={clearFilters}
            variant="outline"
            size="sm"
            className="text-teal-600 dark:text-teal-400 border-teal-300 dark:border-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-400 dark:hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-300"
          >
            Xóa tất cả
          </Button>
        </div>

        <div className="space-y-6">
          {/* Category */}
          <FilterSection title="Danh mục">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-teal-400 dark:hover:border-teal-500 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500 dark:focus:ring-teal-400">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectItem value="all" className="text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                  Tất cả ({totalMedicines})
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                    {category.title} ({category.totalMedicines || 0})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Nhà sản xuất */}
          <FilterSection title="Nhà sản xuất">
            <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-teal-400 dark:hover:border-teal-500 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-teal-500 dark:focus:ring-teal-400">
                <SelectValue placeholder="Chọn nhà sản xuất" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
                {suppliersWithAll.map((supplier, index) => {
                  const isLast = index === allSuppliers.length; // Last actual supplier (not including "All")
                  return (
                    <SelectItem
                      key={supplier.id}
                      value={supplier.id}
                      className="text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                      ref={isLast ? lastSupplierRef : undefined}
                    >
                      {supplier.name}
                    </SelectItem>
                  );
                })}

                {/* Loading indicator */}
                {isFetchingNextPage && (
                  <div className="p-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang tải...</span>
                    </div>
                  </div>
                )}

                {/* Error state */}
                {suppliersError && (
                  <div className="p-2 text-center text-sm text-red-500 dark:text-red-400">
                    Lỗi tải dữ liệu
                  </div>
                )}

                {/* No more data indicator */}
                {!hasNextPage && allSuppliers.length > 0 && (
                  <div className="p-2 text-center text-xs text-gray-400 dark:text-gray-500">
                    Đã tải hết dữ liệu
                  </div>
                )}
              </SelectContent>
            </Select>

            {/* Loading state cho lần đầu load */}
            {isLoadingSuppliers && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Đang tải danh sách nhà sản xuất...
              </div>
            )}
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Khoảng giá">
            <PriceSlider 
              minPrice={minPrice} 
              maxPrice={maxPrice} 
              setMinPrice={setMinPrice} 
              setMaxPrice={setMaxPrice} 
            />
          </FilterSection>

          {/* Rating */}
          <FilterSection title="Đánh giá">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRating.includes(rating)}
                    onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                    className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 dark:data-[state=checked]:bg-teal-500 dark:data-[state=checked]:border-teal-500"
                  />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex">
                      {renderStars(rating)}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">từ {rating} sao</span>
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>
        </div>
      </CardContent>
    </Card>
  );
} 