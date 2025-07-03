import { CategoryFilters, CategoryProductsGrid, CategoryToolbar } from "@/components/pages/store/category";
import type { MedicineFilterParams } from "@/data/interfaces";
import { useCart } from "@/hooks/use-cart";
import { StoreAPI } from "@/services/v1";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State từ URL params
  const [viewMode, setViewMode] = useState<'grid' | 'list'>((searchParams.get('view') as 'grid' | 'list') || 'grid');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('max_price')) || 1000000);
  const [minPrice, setMinPrice] = useState(Number(searchParams.get('min_price')) || 0);
  const [selectedRating, setSelectedRating] = useState<number[]>(
    searchParams.get('min_rating') ? [Number(searchParams.get('min_rating'))] : []
  );
  const [selectedSupplier, setSelectedSupplier] = useState(searchParams.get('supplier') || 'all');
  const [sortBy, setSortBy] = useState<MedicineFilterParams['sort_by']>(
    (searchParams.get('sort_by') as MedicineFilterParams['sort_by']) || 'created_at'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    (searchParams.get('sort_order') as 'asc' | 'desc') || 'desc'
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  // UI state (không lưu trong URL)
  const [hoveredMedicineId, setHoveredMedicineId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  // Hook để quản lý giỏ hàng
  const { addToCart } = useCart();

  // Function để cập nhật URL params
  const updateUrlParams = useCallback((updates: Partial<{
    category: string;
    supplier: string;
    min_price: number;
    max_price: number;
    min_rating: number;
    sort_by: string;
    sort_order: string;
    search: string;
    view: string;
  }>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '' || 
          (key === 'category' && value === 'all') ||
          (key === 'supplier' && value === 'all') ||
          (key === 'min_price' && value === 0) ||
          (key === 'max_price' && value === 1000000) ||
          (key === 'min_rating' && value === 0) ||
          (key === 'sort_by' && value === 'created_at') ||
          (key === 'sort_order' && value === 'desc') ||
          (key === 'view' && value === 'grid')) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });
    
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  // Tạo params cho API từ current state
  const getApiParams = useCallback((): MedicineFilterParams => ({
    s: searchQuery || undefined,
    page: 1,
    limit: 12,
    category_id: selectedCategory !== 'all' ? selectedCategory : undefined,
    supplier_id: selectedSupplier !== 'all' ? selectedSupplier : undefined,
    min_price: minPrice > 0 ? minPrice : undefined,
    max_price: maxPrice < 1000000 ? maxPrice : undefined,
    min_rating: selectedRating.length > 0 ? Math.min(...selectedRating) : undefined,
    sort_by: sortBy,
    sort_order: sortOrder,
  }), [searchQuery, selectedCategory, selectedSupplier, minPrice, maxPrice, selectedRating, sortBy, sortOrder]);

  const {
    data: medicines,
    isLoading: isLoadingMedicines,
    isFetchingNextPage: isFetchingNextPageMedicines,
    hasNextPage: hasNextPageMedicines,
    fetchNextPage: fetchNextPageMedicines
  } = useInfiniteQuery({
    queryKey: ["medicines", getApiParams()],
    queryFn: ({ pageParam = 1 }) => StoreAPI.MedicineList({
      ...getApiParams(),
      page: pageParam,
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageUrl ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 phút
    refetchOnWindowFocus: false,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: StoreAPI.CategoryRoot,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  // Ref cho infinite scroll medicines
  const medicinesObserverRef = useRef<IntersectionObserver | null>(null);

  // Setup intersection observer cho medicines infinite scroll
  const lastMedicineRef = useCallback((node: HTMLDivElement | null) => {
    if (isFetchingNextPageMedicines) return;
    if (medicinesObserverRef.current) medicinesObserverRef.current.disconnect();
    medicinesObserverRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPageMedicines) {
        fetchNextPageMedicines();
      }
    });
    if (node) medicinesObserverRef.current.observe(node);
  }, [isFetchingNextPageMedicines, hasNextPageMedicines, fetchNextPageMedicines]);

  // Suppliers data
  const {
    data: suppliersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingSuppliers,
    error: suppliersError
  } = useInfiniteQuery({
    queryKey: ["suppliers"],
    queryFn: ({ pageParam = 1 }) => StoreAPI.SupplierList({
      page: pageParam,
      limit: 10
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageUrl ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Flatten suppliers data và thêm option "All"
  const allSuppliers = suppliersData?.pages?.flatMap(page => page.data) || [];
  const suppliersWithAll = [
    { id: 'all', name: 'Tất cả nhà sản xuất' },
    ...allSuppliers
  ];

  // Handlers với URL update
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateUrlParams({ category });
  };

  const handleSupplierChange = (supplier: string) => {
    setSelectedSupplier(supplier);
    updateUrlParams({ supplier });
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    updateUrlParams({ min_price: min, max_price: max });
  };

  const handleRatingChange = (ratings: number[]) => {
    setSelectedRating(ratings);
    updateUrlParams({ min_rating: ratings.length > 0 ? Math.min(...ratings) : 0 });
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    updateUrlParams({ search });
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    updateUrlParams({ view: mode });
  };

  // Clear filters function
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSupplier('all');
    setMinPrice(0);
    setMaxPrice(1000000);
    setSelectedRating([]);
    setSortBy('created_at');
    setSortOrder('desc');
    setSearchQuery('');
    
    // Clear URL params
    setSearchParams(new URLSearchParams());
  };

  // Add to cart function
  const handleAddToCart = async (medicineId: string) => {
    setAddingToCartId(medicineId);
    
    try {
      // Tìm thông tin medicine từ danh sách medicines
      const medicine = medicines?.pages?.flatMap(page => page.data)?.find(m => m.id === medicineId);
      
      if (!medicine) {
        console.error('Không tìm thấy sản phẩm với ID:', medicineId);
        return;
      }

      // Thêm vào giỏ hàng với số lượng mặc định là 1
      await addToCart({
        medicine,
        quantity: 1
      });
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    } finally {
      setAddingToCartId(null);
    }
  };

  // Calculate filter states
  const hasActiveFilters = selectedCategory !== 'all' || selectedRating.length > 0 || 
                          maxPrice < 1000000 || minPrice > 0 || selectedSupplier !== 'all' || searchQuery !== '';
  const totalProducts = medicines?.pages?.reduce((total, page) => total + page.data.length, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CategoryFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              maxPrice={maxPrice}
              setMaxPrice={(price: number) => handlePriceChange(minPrice, price)}
              selectedRating={selectedRating}
              setSelectedRating={handleRatingChange}
              selectedSupplier={selectedSupplier}
              setSelectedSupplier={handleSupplierChange}
              categories={categories}
              suppliersWithAll={suppliersWithAll}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isLoadingSuppliers={isLoadingSuppliers}
              suppliersError={suppliersError}
              clearFilters={clearFilters}
            />
          </div>

          {/* Products Area */}
          <div className="lg:col-span-4">
            <CategoryToolbar
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
              viewMode={viewMode}
              setViewMode={handleViewModeChange}
              totalProducts={totalProducts}
              hasActiveFilters={hasActiveFilters}
            />

            <CategoryProductsGrid
              medicines={medicines}
              isLoading={isLoadingMedicines}
              isFetchingNextPage={isFetchingNextPageMedicines}
              viewMode={viewMode}
              hoveredMedicineId={hoveredMedicineId}
              addingToCartId={addingToCartId}
              onHover={setHoveredMedicineId}
              onAddToCart={handleAddToCart}
              lastMedicineRef={lastMedicineRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 