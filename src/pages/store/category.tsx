import { StoreAPI } from "@/services/v1";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { CategoryFilters, CategoryToolbar, CategoryProductsGrid } from "@/components/pages/store/category";
import { useCart } from "@/hooks/use-cart";

export default function CategoryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string>('all');
  const [hoveredMedicineId, setHoveredMedicineId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Hook để quản lý giỏ hàng
  const { addToCart } = useCart();

  const {
    data: medicines,
    isLoading: isLoadingMedicines,
    isFetchingNextPage: isFetchingNextPageMedicines,
    hasNextPage: hasNextPageMedicines,
    fetchNextPage: fetchNextPageMedicines
  } = useInfiniteQuery({
    queryKey: ["medicines"],
    queryFn: ({ pageParam = 1 }) => StoreAPI.MedicineList({
      page: pageParam,
      limit: 12 // Số lượng medicines mỗi trang
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageUrl ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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

  // Clear filters function
  const clearFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(1000000);
    setSelectedRating([]);
    setSelectedSupplier('all');
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
  const hasActiveFilters = selectedCategory !== 'all' || selectedRating.length > 0 || maxPrice < 1000000 || selectedSupplier !== 'all';
  const totalProducts = medicines?.pages?.reduce((total, page) => total + page.data.length, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CategoryFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedSupplier={selectedSupplier}
              setSelectedSupplier={setSelectedSupplier}
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
              setSearchQuery={setSearchQuery}
              viewMode={viewMode}
              setViewMode={setViewMode}
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