import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SearchIcon } from "lucide-react";

interface MedicinesSearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  priceRange: [number, number];
  onFilterClick: (filter: 'categories' | 'price' | 'advanced' | null) => void;
  activeFilter: 'categories' | 'price' | 'advanced' | null;
  sortBy: string;
  onSortChange: (value: string) => void;
  minPrice: number;
  maxPrice: number;
}

export function MedicinesSearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedCategories,
  priceRange,
  onFilterClick,
  activeFilter,
  sortBy,
  onSortChange,
  minPrice,
  maxPrice,
}: MedicinesSearchAndFilterProps) {
  return (
    <div className="flex flex-col gap-2 mb-6 md:flex-row md:items-center">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo tên thuốc..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-background/50 border-muted"
        />
      </div>

      {/* Mobile filter trigger */}
      <div className="flex gap-2 md:hidden">
        <Button
          variant="outline"
          className="flex-1 border-muted"
          onClick={() => onFilterClick('advanced')}
        >
          <Filter className="h-4 w-4" />
          Bộ lọc
        </Button>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="flex-1 border-muted">
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="oldest">Cũ nhất</SelectItem>
            <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
            <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
            <SelectItem value="name-asc">Tên: A-Z</SelectItem>
            <SelectItem value="name-desc">Tên: Z-A</SelectItem>
            <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop filter options */}
      <div className="hidden md:flex gap-2">
        <Button
          variant={activeFilter === 'categories' ? 'default' : 'outline'}
          onClick={() => onFilterClick('categories')}
          className={activeFilter === 'categories'
            ? 'bg-emerald-500 hover:bg-emerald-600'
            : 'border-muted hover:border-emerald-500 hover:text-white'
          }
        >
          <Filter className="h-4 w-4" />
          Danh mục
          {selectedCategories.length > 0 && (
            <Badge className="bg-white text-emerald-500">{selectedCategories.length}</Badge>
          )}
        </Button>
      </div>

      <Button
        variant={activeFilter === 'price' ? 'default' : 'outline'}
        onClick={() => onFilterClick('price')}
        className={activeFilter === 'price'
          ? 'bg-emerald-500 hover:bg-emerald-600'
          : 'border-muted hover:border-emerald-500 hover:text-emerald-500'
        }
      >
        <Filter className={`h-4 w-4 ${activeFilter === 'price' ? 'text-white' : ''}`} />
        Giá
        {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
          <Badge className="bg-white text-emerald-500">✓</Badge>
        )}
      </Button>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] border-muted">
          <SelectValue placeholder="Sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Mới nhất</SelectItem>
          <SelectItem value="oldest">Cũ nhất</SelectItem>
          <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
          <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
          <SelectItem value="name-asc">Tên: A-Z</SelectItem>
          <SelectItem value="name-desc">Tên: Z-A</SelectItem>
          <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant={activeFilter === 'advanced' ? 'default' : 'outline'}
        onClick={() => onFilterClick('advanced')}
        className={activeFilter === 'advanced'
          ? 'bg-emerald-500 hover:bg-emerald-600'
          : 'border-muted hover:border-emerald-500 hover:text-white'
        }
      >
        <Filter className={`h-4 w-4 ${activeFilter === 'advanced' ? 'text-white' : ''}`} />
        Bộ lọc nâng cao
      </Button>
    </div>
  )
}
