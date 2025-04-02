import { FilterPanel, PriceFilterPanel } from "@/components/custom/filter-panel";
import { AdvancedFilterDrawer } from "./category.advanced-filter-drawer";
import { CategorySearchAndFilter } from "./category.search-and-filter";
import { ActiveFilters } from "./category.active-filters";
import { CategoryAPI } from "@/services/api/category.api";
import { MedicineAPI } from "@/services/api/medicine.api";
import { SupplierAPI } from "@/services/api/supplier.api";
import { routeNames, routes, siteConfig } from "@/config";
import { MedicineCard } from "./category.medicine-card";
import { CategorySkeleton } from "./category.skeleton";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 5000000;

export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [minRating, setMinRating] = useState(0);
  const [status, setStatus] = useState<"IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK" | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [hoveredMedicineId, setHoveredMedicineId] = useState<string | null>(null);

  // For readable price display
  const [displayPriceRange, setDisplayPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

  // Filter drawer states
  const [activeFilter, setActiveFilter] = useState<'categories' | 'suppliers' | 'price' | 'advanced' | null>(null);

  // Update display price with delay to prevent flickering during sliding
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayPriceRange(priceRange);
    }, 100);
    return () => clearTimeout(timeout);
  }, [priceRange]);

  const { data: medicines } = useQuery({
    queryKey: ['medicines'],
    queryFn: MedicineAPI.getAllMedicine,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoryAPI.getAllCategory,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: SupplierAPI.getAllSupplier,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const filteredMedicines = medicines?.filter(medicine => {
    if (searchTerm && !medicine.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedCategories.length > 0) {
      if (!medicine.category) return false;
      if (!selectedCategories.includes(medicine.category.name)) return false;
    }
    if (selectedSuppliers.length > 0) {
      if (!medicine.supplier) return false;
      if (!selectedSuppliers.includes(medicine.supplier.name)) return false;
    }
    if (medicine.variants.price < priceRange[0] || medicine.variants.price > priceRange[1]) return false;
    if (status && status !== medicine.variants.stockStatus) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.variants.price - b.variants.price;
      case 'price-desc': return b.variants.price - a.variants.price;
      case 'rating': return b.ratings.reviewCount - a.ratings.reviewCount;
      default: return 0;
    }
  })

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle supplier selection
  const toggleSupplier = (supplier: string) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplier)
        ? prev.filter(s => s !== supplier)
        : [...prev, supplier]
    );
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedSuppliers([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setMinRating(0);
    setStatus(null);
    setSortBy('relevance');
  };

  // Toggle status
  const toggleStatus = (newStatus?: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK" | null) => {
    setStatus(newStatus !== undefined ? newStatus : null);
  };

  const toggleFilterDrawer = (filter: 'categories' | 'suppliers' | 'price' | 'advanced' | null) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Helmet>
        <title>{routeNames[routes.category]} | {siteConfig.name}</title>
      </Helmet>
      {/* Header section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-500 inline-block text-transparent bg-clip-text">
          {routeNames[routes.category]}
        </h1>
        <p className="text-muted-foreground mt-2">
          Tìm kiếm thuốc theo nhu cầu của bạn. Chúng tôi có hơn 3,000+ sản phẩm từ các thương hiệu uy tín.
        </p>
      </div>

      {/* Search and filter section */}
      <CategorySearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategories={selectedCategories}
        selectedSuppliers={selectedSuppliers}
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
                onClick={() => toggleCategory(category.name)}
                className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                  ${selectedCategories.includes(category.name)
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                  }`}
              >
                {category.name}
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

      {activeFilter === 'suppliers' && (
        <FilterPanel type="suppliers" title="Nhà cung cấp" onClose={() => setActiveFilter(null)}>
          <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {suppliers?.map((supplier) => (
              <div
                key={supplier.id}
                onClick={() => toggleSupplier(supplier.name)}
                className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                  ${selectedSuppliers.includes(supplier.name)
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                  }`}
              >
                {supplier.name}
              </div>
            ))}
          </div>
          {selectedSuppliers.length > 0 && (
            <div className="mt-3 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSuppliers([])}
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
      <ActiveFilters
        selectedCategories={selectedCategories}
        selectedSuppliers={selectedSuppliers}
        minRating={minRating}
        status={status}
        priceRange={priceRange}
        displayPriceRange={displayPriceRange}
        onCategoryToggle={toggleCategory}
        onSupplierToggle={toggleSupplier}
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
          Hiển thị {filteredMedicines?.length} sản phẩm
        </p>
      </div>

      {/* Medicine grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {filteredMedicines ? (
          filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              hoveredMedicineId={hoveredMedicineId}
              onHover={setHoveredMedicineId}
            />
          ))
        ) : (
          <CategorySkeleton />
        )}
      </div>

      {/* Empty state */}
      {filteredMedicines?.length === 0 && (
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
      )}

      {/* Advanced filter drawer */}
      <AdvancedFilterDrawer
        open={activeFilter === 'advanced'}
        onOpenChange={(open) => setActiveFilter(open ? 'advanced' : null)}
        selectedCategories={selectedCategories}
        selectedSuppliers={selectedSuppliers}
        priceRange={priceRange}
        displayPriceRange={displayPriceRange}
        minRating={minRating}
        status={status}
        onCategoryToggle={toggleCategory}
        onSupplierToggle={toggleSupplier}
        onPriceChange={setPriceRange}
        onRatingChange={setMinRating}
        onStatusToggle={toggleStatus}
        onReset={resetFilters}
        categories={categories?.map(c => c.name) || []}
        suppliers={suppliers?.map(s => s.name) || []}
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
      />
    </div>
  )
}
