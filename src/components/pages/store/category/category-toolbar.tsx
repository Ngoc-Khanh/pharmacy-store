import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, Search } from "lucide-react";
import type { MedicineFilterParams } from "@/data/interfaces";
import { useState, useEffect } from "react";

interface CategoryToolbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  totalProducts: number;
  hasActiveFilters: boolean;
  sortBy?: MedicineFilterParams['sort_by'];
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (sortField: MedicineFilterParams['sort_by'], order?: 'asc' | 'desc') => void;
}

export function CategoryToolbar({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  totalProducts,
  hasActiveFilters,
  sortBy = 'created_at',
  sortOrder = 'desc',
  onSortChange
}: CategoryToolbarProps) {
  
  // Local state cho search input (để user có thể gõ mà không trigger search ngay lập tức)
  const [localSearchValue, setLocalSearchValue] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sync local search value với props khi searchQuery thay đổi từ bên ngoài (như từ URL params)
  useEffect(() => {
    setLocalSearchValue(searchQuery);
  }, [searchQuery]);

  // Handle search on Enter key press
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(localSearchValue.trim());
      setShowSuggestions(false);
    }
  };

  // Handle search button click (icon search)
  const handleSearchClick = () => {
    setSearchQuery(localSearchValue.trim());
    setShowSuggestions(false);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setLocalSearchValue('');
    setSearchQuery('');
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearchValue(suggestion);
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Tạo sort value từ sortBy và sortOrder
  const getSortValue = () => {
    if (sortBy === 'price_asc') return 'price-asc';
    if (sortBy === 'price_desc') return 'price-desc';
    if (sortBy === 'rating_desc') return 'rating-desc';
    if (sortBy === 'popular') return 'popular';
    if (sortBy === 'name' && sortOrder === 'asc') return 'name-asc';
    if (sortBy === 'name' && sortOrder === 'desc') return 'name-desc';
    if (sortBy === 'created_at' && sortOrder === 'desc') return 'newest';
    return 'default';
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    if (!onSortChange) return;

    switch (value) {
      case 'default':
      case 'newest':
        onSortChange('created_at', 'desc');
        break;
      case 'price-asc':
        onSortChange('price_asc');
        break;
      case 'price-desc':
        onSortChange('price_desc');
        break;
      case 'rating-desc':
        onSortChange('rating_desc');
        break;
      case 'popular':
        onSortChange('popular');
        break;
      case 'name-asc':
        onSortChange('name', 'asc');
        break;
      case 'name-desc':
        onSortChange('name', 'desc');
        break;
      default:
        onSortChange('created_at', 'desc');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
      {/* Left side - Results info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Hiển thị {totalProducts} sản phẩm
          </span>
        </div>
        {hasActiveFilters && (
          <Badge variant="outline" className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700">
            Đã áp dụng bộ lọc
          </Badge>
        )}
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-lg mx-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-white dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:border-teal-400 dark:focus-within:border-teal-500 transition-all duration-300">
            <div className="flex items-center">
              <button
                onClick={handleSearchClick}
                className="flex items-center justify-center w-11 h-11 text-gray-400 dark:text-gray-500 group-focus-within:text-teal-500 dark:group-focus-within:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors duration-200"
                title="Tìm kiếm (hoặc nhấn Enter)"
              >
                <Search className="h-4 w-4" />
              </button>
              <input
                type="text"
                placeholder="Gõ từ khóa và nhấn Enter để tìm kiếm..."
                value={localSearchValue}
                onChange={(e) => {
                  setLocalSearchValue(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => setShowSuggestions(localSearchValue.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="flex-1 py-3 pr-4 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
              {localSearchValue && (
                <button
                  onClick={handleClearSearch}
                  className="flex items-center justify-center w-8 h-8 mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  title="Xóa tìm kiếm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Search suggestions/hints - Chỉ hiện khi có local search value và showSuggestions = true */}
          {showSuggestions && localSearchValue.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg backdrop-blur-sm z-50 max-h-60 overflow-y-auto">
              <div className="p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Gợi ý tìm kiếm (nhấn Enter hoặc click để áp dụng)
                </div>
                <div className="space-y-1">
                  {['Paracetamol', 'Vitamin C', 'Thuốc ho', 'Thuốc đau đầu'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors duration-150"
                    >
                      <Search className="inline w-3 h-3 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
                
                {/* Current search hint */}
                {localSearchValue !== searchQuery && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-xs text-amber-600 dark:text-amber-400 mb-2">
                      💡 Nhấn Enter để tìm kiếm "{localSearchValue}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Sắp xếp:</span>
          <Select value={getSortValue()} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-sm">
              <SelectValue placeholder="Chọn cách sắp xếp" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <SelectItem value="default">Mặc định</SelectItem>
              <SelectItem value="price-asc">Giá tăng dần</SelectItem>
              <SelectItem value="price-desc">Giá giảm dần</SelectItem>
              <SelectItem value="rating-desc">Đánh giá cao nhất</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="name-asc">Tên A-Z</SelectItem>
              <SelectItem value="name-desc">Tên Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Hiển thị:</span>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`h-8 w-8 p-0 rounded-md transition-all duration-200 ${viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-teal-600 dark:text-teal-400'
                  : 'hover:bg-white/50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`h-8 w-8 p-0 rounded-md transition-all duration-200 ${viewMode === 'list'
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-teal-600 dark:text-teal-400'
                  : 'hover:bg-white/50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 