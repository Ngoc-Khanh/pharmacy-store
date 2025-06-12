import { FilterPanel, PriceFilterPanel } from "@/components/custom/filter-panel";
import { Button } from "@/components/ui/button";
import { routeNames, routes, siteConfig } from "@/config";
import { Medicine } from "@/data/interfaces";
import { Paginated } from "@/data/sro";
import { StoreAPI } from "@/services/api/store.api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { StockStatus } from "@/data/enum";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { MedicinesActiveFilters } from "./medicines.active-filters";
import { MedicinesAdvancedFilterDrawer } from "./medicines.advanced-filter-drawer";
import { MedicineCard } from "./medicines.card";
import { MedicinesSearchAndFilter } from "./medicines.search-and-filter";
import { MedicinesSkeleton } from "./medicines.skeleton";

const MIN_PRICE = 0;
const MAX_PRICE = 5000000;
const ITEMS_PER_PAGE = 20;



export default function MedicinesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get filter params from URL
  const categoryFromUrl = searchParams.get('category');
  const searchTermFromUrl = searchParams.get('search') || '';
  const minPriceFromUrl = searchParams.get('minPrice');
  const maxPriceFromUrl = searchParams.get('maxPrice');
  const minRatingFromUrl = searchParams.get('minRating');
  const statusFromUrl = searchParams.get('status') as StockStatus | null;
  const sortByFromUrl = searchParams.get('sortBy') || 'newest';
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceFromUrl ? parseInt(minPriceFromUrl) : MIN_PRICE,
    maxPriceFromUrl ? parseInt(maxPriceFromUrl) : MAX_PRICE
  ]);
  const [minRating, setMinRating] = useState(minRatingFromUrl ? parseInt(minRatingFromUrl) : 0);
  const [status, setStatus] = useState<StockStatus | null>(statusFromUrl);
  const [sortBy, setSortBy] = useState(sortByFromUrl);
  const [hoveredMedicineId, setHoveredMedicineId] = useState<string | null>(null);

  // For readable price display
  const [displayPriceRange, setDisplayPriceRange] = useState<[number, number]>([
    minPriceFromUrl ? parseInt(minPriceFromUrl) : MIN_PRICE,
    maxPriceFromUrl ? parseInt(maxPriceFromUrl) : MAX_PRICE
  ]);

  // Filter drawer states
  const [activeFilter, setActiveFilter] = useState<'categories' | 'price' | 'advanced' | null>(null);

  // Query categories to match slug to category title
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: StoreAPI.CategoryRoot,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Update URL with current filter state
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Handle search term
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    
    // Handle categories - support multiple categories
    if (selectedCategories.length > 0 && categories) {
      const categorySlugs = selectedCategories
        .map(catTitle => categories.find(cat => cat.title === catTitle)?.slug)
        .filter(Boolean);
      if (categorySlugs.length > 0) {
        params.set('category', categorySlugs.join(','));
      }
    } else {
      params.delete('category');
    }
    
    // Handle price range
    if (priceRange[0] > MIN_PRICE) {
      params.set('minPrice', priceRange[0].toString());
    } else {
      params.delete('minPrice');
    }
    
    if (priceRange[1] < MAX_PRICE) {
      params.set('maxPrice', priceRange[1].toString());
    } else {
      params.delete('maxPrice');
    }
    
    // Handle rating
    if (minRating > 0) {
      params.set('minRating', minRating.toString());
    } else {
      params.delete('minRating');
    }
    
    // Handle status
    if (status) {
      params.set('status', status.toString());
    } else {
      params.delete('status');
    }
    
    // Handle sort
    if (sortBy !== 'newest') {
      params.set('sortBy', sortBy);
    } else {
      params.delete('sortBy');
    }
    
    // Remove page param for infinite scroll
    params.delete('page');
    
    setSearchParams(params);
  };

  // Set selected categories from URL parameter when categories are loaded
  useEffect(() => {
    if (categoryFromUrl && categories) {
      const categoryList = categoryFromUrl.split(',');
      const matchedCategories = categoryList
        .map(slug => categories.find(cat => cat.slug === slug.trim()))
        .filter(Boolean)
        .map(cat => cat!.title);
      
      if (matchedCategories.length > 0) {
        setSelectedCategories(matchedCategories);
      }
    }
  }, [categoryFromUrl, categories]);

  // Update display price with delay to prevent flickering during sliding
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayPriceRange(priceRange);
    }, 100);
    return () => clearTimeout(timeout);
  }, [priceRange]);

  // Update URL when filters change
  useEffect(() => {
    if (categories) {
      updateUrlWithFilters();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategories, priceRange, minRating, status, sortBy, categories]);

  // Infinite query for medicines
  const {
    data: medicinesInfiniteData,
    isLoading: isLoadingMedicines,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Paginated<Medicine>>({
    queryKey: ['medicines-infinite', searchTerm, categoryFromUrl, priceRange, minRating, status, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      StoreAPI.MedicinesRoot(
        pageParam as number,
        ITEMS_PER_PAGE,
        {
          search: searchTerm || undefined,
          category: selectedCategories.length > 0 && categories
            ? selectedCategories
                .map(catTitle => categories.find(cat => cat.title === catTitle)?.slug)
                .filter(Boolean) as string[]
            : undefined,
          minPrice: priceRange[0] > MIN_PRICE ? priceRange[0] : undefined,
          maxPrice: priceRange[1] < MAX_PRICE ? priceRange[1] : undefined,
          minRating: minRating > 0 ? minRating : undefined,
          status: status || undefined,
          sortBy: sortBy || 'newest',
        }
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Paginated<Medicine>) => {
      if (lastPage.currentPage < lastPage.lastPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Flatten medicine data from all pages
  const medicinesData = medicinesInfiniteData?.pages?.flatMap((page: Paginated<Medicine>) => page.data) || [];
  const totalMedicines = medicinesInfiniteData?.pages?.[0]?.total || 0;

  // Intersection Observer for infinite scroll
  const lastMedicineElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMedicines) return;
      if (!node) return;
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      
      observer.observe(node);
      return () => observer.disconnect();
    },
    [isLoadingMedicines, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setMinRating(0);
    setStatus(null);
    setSortBy('newest');
    
    // Reset URL params
    const params = new URLSearchParams();
    setSearchParams(params);
  };

  // Toggle status
  const toggleStatus = (newStatus?: StockStatus | null) => {
    setStatus(newStatus !== undefined ? newStatus : null);
  };

  const toggleFilterDrawer = (filter: 'categories' | 'price' | 'advanced' | null) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  }

  // Handle search change with debounce
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

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
        onSearchChange={handleSearchChange}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
        onFilterClick={toggleFilterDrawer}
        activeFilter={activeFilter}
        sortBy={sortBy}
        onSortChange={handleSortChange}
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
            : `Hiển thị ${medicinesData.length || 0} sản phẩm${totalMedicines > 0 ? ` (tổng ${totalMedicines})` : ''}`
          }
        </p>
      </div>

      {/* Medicine grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {isLoadingMedicines && medicinesData.length === 0 ? (
          <MedicinesSkeleton />
        ) : medicinesData.length > 0 ? (
          medicinesData.map((medicine, index) => (
            <div
              key={medicine.id}
              ref={index === medicinesData.length - 1 ? lastMedicineElementRef : null}
            >
              <MedicineCard
                medicine={medicine}
                hoveredMedicineId={hoveredMedicineId}
                onHover={setHoveredMedicineId}
              />
            </div>
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

      {/* Loading indicator for infinite scroll */}
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Đang tải thêm sản phẩm...</span>
          </div>
        </div>
      )}

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
