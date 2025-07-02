import { Card, CardContent } from "@/components/ui/card";
import { CategoryProductCard } from "./category-product-card";
import { MedicineResponse } from "@/data/interfaces";
import { InfiniteData } from "@tanstack/react-query";
import { Paginated } from "@/data/sro";

interface ProductsGridProps {
  medicines: InfiniteData<Paginated<MedicineResponse>> | undefined;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  viewMode: 'grid' | 'list';
  hoveredMedicineId: string | null;
  addingToCartId: string | null;
  onHover: (id: string | null) => void;
  onAddToCart: (id: string) => Promise<void>;
  lastMedicineRef: (node: HTMLDivElement | null) => void;
}

const ProductSkeleton = () => (
  <Card className="animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
    <CardContent className="p-6">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </CardContent>
  </Card>
);

const EmptyState = () => (
  <div className="text-center py-20 text-gray-500 dark:text-gray-400">
    <div className="mb-4">
      <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
    </div>
    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Không có sản phẩm</p>
    <p className="text-gray-500 dark:text-gray-400">Hiện tại chưa có sản phẩm nào để hiển thị</p>
  </div>
);

const LoadingIndicator = () => (
  <div className="col-span-full flex justify-center py-8">
    <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      <span>Đang tải thêm sản phẩm...</span>
    </div>
  </div>
);

export function CategoryProductsGrid({
  medicines,
  isLoading,
  isFetchingNextPage,
  viewMode,
  hoveredMedicineId,
  addingToCartId,
  onHover,
  onAddToCart,
  lastMedicineRef
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!medicines?.pages || medicines.pages.length === 0) {
    return <EmptyState />;
  }

  const gridClasses = viewMode === 'grid'
    ? 'grid-cols-1 md:grid-cols-3 xl:grid-cols-4'
    : 'grid-cols-1';

  return (
    <div className={`grid gap-6 ${gridClasses}`}>
      {medicines.pages.map((page, pageIndex) => (
        page.data.map((medicine, medicineIndex) => {
          const isLast = pageIndex === medicines.pages.length - 1 && medicineIndex === page.data.length - 1;
          const isHovered = hoveredMedicineId === medicine.id;
          const isAddingToCart = addingToCartId === medicine.id;

          return (
            <CategoryProductCard
              key={medicine.id}
              medicine={medicine}
              isHovered={isHovered}
              isAddingToCart={isAddingToCart}
              onHover={onHover}
              onAddToCart={onAddToCart}
              lastRef={isLast ? lastMedicineRef : undefined}
            />
          );
        })
      ))}

      {/* Loading more indicator */}
      {isFetchingNextPage && <LoadingIndicator />}
    </div>
  );
} 