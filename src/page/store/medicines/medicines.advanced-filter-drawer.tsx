import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { StockStatus } from "@/data/enum";

import { Sparkles, Star } from "lucide-react";

interface MedicinesAdvancedFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  priceRange: [number, number];
  displayPriceRange: [number, number];
  minRating: number;
  status: StockStatus | null;
  onCategoryToggle: (category: string) => void;
  onPriceChange: (value: [number, number]) => void;
  onRatingChange: (rating: number) => void;
  onStatusToggle: (status?: StockStatus | null) => void;
  onReset: () => void;
  categories: string[];
  minPrice: number;
  maxPrice: number;
}

export function MedicinesAdvancedFilterDrawer({
  open,
  onOpenChange,
  selectedCategories,
  priceRange,
  displayPriceRange,
  minRating,
  status,
  onCategoryToggle,
  onPriceChange,
  onRatingChange,
  onStatusToggle,
  onReset,
  categories,
  minPrice,
  maxPrice
}: MedicinesAdvancedFilterDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="rounded-t-xl">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-center text-lg font-bold text-emerald-500">
            <Sparkles className="h-5 w-5 inline-block mr-2 text-yellow-500" />
            Bộ lọc nâng cao
          </DrawerTitle>
          <DrawerDescription className="text-center">
            Tùy chỉnh tìm kiếm để tìm sản phẩm phù hợp nhất. Chọn nhiều danh mục để mở rộng tìm kiếm.
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="p-6 max-h-[70vh]">
          <div className="space-y-6">
            {/* Categories - Now supporting multiple selections */}
            <div>
              <h4 className="font-medium mb-3 flex items-center justify-between text-emerald-500">
                <span>Danh mục</span>
                <span className="text-xs text-muted-foreground">
                  {selectedCategories.length > 0 
                    ? `${selectedCategories.length} đã chọn` 
                    : 'Chọn nhiều danh mục'
                  }
                </span>
              </h4>
              <div className="max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => onCategoryToggle(category)}
                      className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                        ${selectedCategories.includes(category)
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                        }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              {selectedCategories.length > 0 && (
                <div className="mt-3 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">
                    Tìm kiếm trong: {selectedCategories.join(', ')}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      selectedCategories.forEach(cat => onCategoryToggle(cat));
                    }}
                    className="text-xs text-red-500 hover:text-white hover:bg-red-500"
                  >
                    Xóa tất cả
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-muted/50" />

          {/* Price range */}
          <div>
            <h4 className="font-medium mb-3 text-emerald-500 flex justify-between">
              <span>Khoảng giá</span>
              <span className="text-sm font-normal text-muted-foreground">
                {displayPriceRange[0].toLocaleString()}₫ - {displayPriceRange[1].toLocaleString()}₫
              </span>
            </h4>
            <div className="px-2 py-6">
              <Slider
                value={priceRange}
                min={minPrice}
                max={maxPrice}
                step={10000}
                onValueChange={(value) => onPriceChange(value as [number, number])}
                className="[&_.react-aria-Thumb]:border-emerald-500 [&_.react-aria-Thumb]:focus-visible:ring-emerald-500 [&_.react-aria-Range]:bg-emerald-500"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">{minPrice.toLocaleString()}₫</span>
                <span className="text-xs text-muted-foreground">{maxPrice.toLocaleString()}₫</span>
              </div>
            </div>
          </div>

          <Separator className="bg-muted/50" />

          {/* Rating filter */}
          <div>
            <h4 className="font-medium mb-3 text-emerald-500">Đánh giá</h4>
            <div className="flex flex-wrap gap-2">
              <div
                onClick={() => onRatingChange(0)}
                className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                    ${minRating === 0
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                  }`}
              >
                Tất cả
              </div>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  onClick={() => onRatingChange(rating === minRating ? 0 : rating)}
                  className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all flex items-center gap-2
                      ${minRating === rating
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                    }`}
                >
                  <div className="flex">
                    {Array(rating).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span>+</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-muted/50" />

          {/* Availability */}
          <div>
            <h4 className="font-medium mb-3 text-emerald-500">Trạng thái sản phẩm</h4>
            <div className="flex flex-wrap gap-2">
              <div
                onClick={() => onStatusToggle(null)}
                className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                  ${status === null
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                  }`}
              >
                Tất cả
              </div>
              <div
                onClick={() => onStatusToggle(StockStatus.IN_STOCK)}
                className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                  ${status === StockStatus.IN_STOCK
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                  }`}
              >
                Còn hàng
              </div>
              <div
                onClick={() => onStatusToggle(StockStatus.OUT_OF_STOCK)}
                className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                  ${status === StockStatus.OUT_OF_STOCK
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                  }`}
              >
                Hết hàng
              </div>
              <div
                onClick={() => onStatusToggle(StockStatus.PRE_ORDER)}
                className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                  ${status === StockStatus.PRE_ORDER
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                  }`}
              >
                Đặt trước
              </div>
            </div>
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t">
          <Button onClick={onReset} variant="outline" className="w-full">
            Xóa tất cả
          </Button>
          <DrawerClose asChild>
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
              Áp dụng bộ lọc
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
