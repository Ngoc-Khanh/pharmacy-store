import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, Search } from "lucide-react";

interface CategoryToolbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  totalProducts: number;
  hasActiveFilters: boolean;
}

export function CategoryToolbar({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  totalProducts,
  hasActiveFilters
}: CategoryToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
      {/* Left side - Results info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Hiển thị {totalProducts} sản phẩm
          </span>
        </div>
        {hasActiveFilters && (
          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700">
            Đã áp dụng bộ lọc
          </Badge>
        )}
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-lg mx-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-white dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:border-emerald-400 dark:focus-within:border-emerald-500 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-11 h-11 text-gray-400 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors duration-200">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm thuốc, vitamin, thực phẩm chức năng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-3 pr-4 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
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
          
          {/* Search suggestions/hints */}
          {searchQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg backdrop-blur-sm z-50 max-h-60 overflow-y-auto">
              <div className="p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Gợi ý tìm kiếm</div>
                <div className="space-y-1">
                  {['Paracetamol', 'Vitamin C', 'Thuốc ho', 'Thuốc đau đầu'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchQuery(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors duration-150"
                    >
                      <Search className="inline w-3 h-3 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
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
          <Select defaultValue="default">
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
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-emerald-600 dark:text-emerald-400'
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
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-emerald-600 dark:text-emerald-400'
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