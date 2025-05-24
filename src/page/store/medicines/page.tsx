import { FilterPanel, PriceFilterPanel } from "@/components/custom/filter-panel";
import { Button } from "@/components/ui/button";
import { routeNames, routes, siteConfig } from "@/config";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MedicinesActiveFilters } from "./medicines.active-filters";
import { MedicinesAdvancedFilterDrawer } from "./medicines.advanced-filter-drawer";
import { MedicineCard } from "./medicines.card";
import { MedicinesSearchAndFilter } from "./medicines.search-and-filter";
import { MedicinesSkeleton } from "./medicines.skeleton";

const MIN_PRICE = 0;
const MAX_PRICE = 5000000;

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [minRating, setMinRating] = useState(0);
  const [status, setStatus] = useState<"IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK" | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [hoveredMedicineId, setHoveredMedicineId] = useState<string | null>(null);

  // For readable price display
  const [displayPriceRange, setDisplayPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

  // Filter drawer states
  const [activeFilter, setActiveFilter] = useState<'categories' | 'price' | 'advanced' | null>(null);

  // Update display price with delay to prevent flickering during sliding
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayPriceRange(priceRange);
    }, 100);
    return () => clearTimeout(timeout);
  }, [priceRange]);

  const { data: medicines, isLoading: isLoadingMedicines } = useQuery({
    queryKey: ['medicines'],
    queryFn: StoreAPI.MedicinesRoot,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  // Handle Laravel pagination structure
  const medicinesData = medicines?.data?.data || [];
  const paginationInfo = medicines?.data ? {
    currentPage: medicines.data.currentPage,
    lastPage: medicines.data.lastPage,
    total: medicines.data.total,
    perPage: medicines.data.perPage
  } : null;

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: StoreAPI.CategoryRoot,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const filteredMedicines = Array.isArray(medicinesData)
    ? medicinesData.filter(medicine => {
      if (searchTerm && !medicine.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedCategories.length > 0) {
        if (!medicine.category) return false;
        if (!selectedCategories.includes(medicine.category.title)) return false;
      }
      const price = medicine.variants.price;
      if (price < priceRange[0] || price > priceRange[1]) return false;

      const stockStatus = medicine.variants.stockStatus;
      if (status && status !== stockStatus) return false;
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.variants.price - b.variants.price;
        case 'price-desc': return b.variants.price - a.variants.price;
        case 'rating': {
          const reviewCountA = a.ratings.reviewCount || 0;
          const reviewCountB = b.ratings.reviewCount || 0;
          return reviewCountB - reviewCountA;
        }
        default: return 0;
      }
    })
    : [];

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setMinRating(0);
    setStatus(null);
    setSortBy('relevance');
  };

  // Toggle status
  const toggleStatus = (newStatus?: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK" | null) => {
    setStatus(newStatus !== undefined ? newStatus : null);
  };

  const toggleFilterDrawer = (filter: 'categories' | 'price' | 'advanced' | null) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Helmet>
        <title>{routeNames[routes.store.medicines]} | {siteConfig.name}</title>
      </Helmet>
      {/* Header section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-500 inline-block text-transparent bg-clip-text">
          {routeNames[routes.store.medicines]}
        </h1>
        <p className="text-muted-foreground mt-2">
          Tìm kiếm thuốc theo nhu cầu của bạn. Chúng tôi có hơn 3,000+ sản phẩm từ các thương hiệu uy tín.
        </p>
      </div>

      {/* Search and filter section */}
      <MedicinesSearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
        onFilterClick={toggleFilterDrawer}
        activeFilter={activeFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
      />

      {/* Filter Panels */}
      {activeFilter === 'categories' && (
        <FilterPanel type="categories" title="Danh mục sản phẩm" onClose={() => setActiveFilter(null)}>
          <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {categories?.map((category) => (
              <div
                key={category.id}
                onClick={() => toggleCategory(category.title)}
                className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                  ${selectedCategories.includes(category.title)
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                  }`}
              >
                {category.title}
              </div>
            ))}
          </div>
          {selectedCategories.length > 0 && (
            <div className="mt-3 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategories([])}
                className="text-xs text-muted-foreground text-red-500 hover:text-white hover:bg-red-500"
              >
                Xóa tất cả
              </Button>
            </div>
          )}
        </FilterPanel>
      )}

      {activeFilter === 'price' && (
        <PriceFilterPanel
          priceRange={priceRange}
          displayPriceRange={displayPriceRange}
          onPriceChange={setPriceRange}
          onReset={() => setPriceRange([MIN_PRICE, MAX_PRICE])}
          minPrice={MIN_PRICE}
          maxPrice={MAX_PRICE}
        />
      )}

      {/* Active filters display */}
      <MedicinesActiveFilters
        selectedCategories={selectedCategories}
        minRating={minRating}
        status={status}
        priceRange={priceRange}
        displayPriceRange={displayPriceRange}
        onCategoryToggle={toggleCategory}
        onRatingReset={() => setMinRating(0)}
        onStatusToggle={() => toggleStatus(null)}
        onPriceReset={() => setPriceRange([MIN_PRICE, MAX_PRICE])}
        onResetAll={resetFilters}
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
      />

      {/* Results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {isLoadingMedicines 
            ? 'Đang tải danh sách thuốc...' 
            : `Hiển thị ${filteredMedicines?.length || 0} sản phẩm${paginationInfo ? ` (tổng ${paginationInfo.total})` : ''}`
          }
        </p>
      </div>

      {/* Medicine grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {isLoadingMedicines ? (
          <MedicinesSkeleton />
        ) : filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              hoveredMedicineId={hoveredMedicineId}
              onHover={setHoveredMedicineId}
            />
          ))
        ) : (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center py-12 bg-background/50 backdrop-blur-sm rounded-lg border border-muted">
              <div className="h-24 w-24 mb-4 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">Không tìm thấy sản phẩm</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Không có sản phẩm nào phù hợp với bộ lọc hiện tại. Vui lòng thử lại với các bộ lọc khác.
              </p>
              <Button onClick={resetFilters} className={`bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600`}>
                Xóa tất cả bộ lọc
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Advanced filter drawer */}
      <MedicinesAdvancedFilterDrawer
        open={activeFilter === 'advanced'}
        onOpenChange={(open) => setActiveFilter(open ? 'advanced' : null)}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
        displayPriceRange={displayPriceRange}
        minRating={minRating}
        status={status}
        onCategoryToggle={toggleCategory}
        onPriceChange={setPriceRange}
        onRatingChange={setMinRating}
        onStatusToggle={toggleStatus}
        onReset={resetFilters}
        categories={categories?.map(c => c.title) || []}
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
      />
    </div>
  )
}
