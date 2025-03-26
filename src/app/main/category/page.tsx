import { useState, useEffect } from 'react';
import { Star, SearchIcon, Truck, Filter, X, Sparkles, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

// Add this CSS for custom scrollbar
import "./style.css";

// Định nghĩa theme colors - đồng bộ màu sắc
const THEME = {
  primary: 'from-emerald-500 to-teal-500',
  primaryHover: 'from-emerald-600 to-teal-600',
  primaryText: 'text-emerald-500',
  primaryBg: 'bg-emerald-500',
  secondary: 'from-teal-500 to-cyan-500',
  accent: 'from-blue-500 to-indigo-500',
}

// Mock data for demonstration
const CATEGORIES = [
  "Thuốc kê đơn",
  "Thuốc không kê đơn",
  "Vitamin & TPCN",
  "Chăm sóc cá nhân",
  "Thiết bị y tế",
  "Mẹ & Bé",
  "Thảo dược"
];

const BRANDS = [
  "Pharmacity",
  "DHG Pharma",
  "Dược Hậu Giang",
  "Sanofi",
  "GlaxoSmithKline",
  "Abbott",
  "Pfizer",
  "MSD"
];

// Predefined price range
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

const MOCK_PRODUCTS = Array(20).fill(null).map((_, i) => ({
  id: i + 1,
  name: `${["Paracetamol", "Vitamin C", "Thuốc ho", "Dầu gió", "Thuốc đau đầu"][i % 5]} ${i + 1}`,
  price: Math.floor(Math.random() * 500000) + 20000,
  rating: Math.floor(Math.random() * 5) + 1,
  image: `/products/product-${(i % 4) + 1}.jpg`,
  brand: BRANDS[Math.floor(Math.random() * (BRANDS.length - 1)) + 1],
  category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1))],
  inStock: Math.random() > 0.2,
  discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0
}));

export default function CategoryPage() {
  // States for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  
  // For readable price display
  const [displayPriceRange, setDisplayPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

  // Update display price with delay to prevent flickering during sliding
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayPriceRange(priceRange);
    }, 100);
    return () => clearTimeout(timeout);
  }, [priceRange]);

  // Filter products based on current filters
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    // Search filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    // Rating filter
    if (minRating > 0 && product.rating < minRating) return false;
    
    // Stock filter
    if (inStockOnly && !product.inStock) return false;
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price; 
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('relevance');
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className={`text-3xl font-bold tracking-tight bg-gradient-to-r ${THEME.primary} inline-block text-transparent bg-clip-text`}>
          Danh mục thuốc
        </h1>
        <p className="text-muted-foreground mt-2">
          Tìm kiếm thuốc theo nhu cầu của bạn. Chúng tôi có hơn 3,000+ sản phẩm từ các thương hiệu uy tín.
        </p>
      </div>

      {/* Search and filter section */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên thuốc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50 backdrop-blur-sm border-muted"
          />
        </div>
        
        {/* Mobile filter trigger */}
        <div className="flex gap-2 md:hidden">
          <Button 
            variant="outline" 
            className="flex-1 border-muted"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Bộ lọc
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1 border-muted">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Phổ biến</SelectItem>
              <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
              <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
              <SelectItem value="rating">Đánh giá</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Desktop filter options */}
        <div className="hidden md:flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(true)} 
            className={`border-muted hover:border-emerald-500 hover:${THEME.primaryText}`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Danh mục
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(true)} 
            className={`border-muted hover:border-emerald-500 hover:${THEME.primaryText}`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Thương hiệu
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(true)} 
            className={`border-muted hover:border-emerald-500 hover:${THEME.primaryText}`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Giá
          </Button>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-muted">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Phổ biến</SelectItem>
              <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
              <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
              <SelectItem value="rating">Đánh giá</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(true)} 
            className={`border-muted hover:border-emerald-500 hover:${THEME.primaryText}`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Bộ lọc nâng cao
          </Button>
        </div>
      </div>

      {/* Active filters display */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0 || minRating > 0 || inStockOnly || priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategories.map(category => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              Danh mục: {category}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => toggleCategory(category)} 
              />
            </Badge>
          ))}
          
          {selectedBrands.map(brand => (
            <Badge key={brand} variant="secondary" className="flex items-center gap-1">
              Thương hiệu: {brand}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => toggleBrand(brand)} 
              />
            </Badge>
          ))}
          
          {minRating > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Đánh giá: ≥{minRating}⭐
              <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => setMinRating(0)} />
            </Badge>
          )}
          
          {inStockOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Còn hàng
              <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => setInStockOnly(false)} />
            </Badge>
          )}
          
          {(priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Giá: {displayPriceRange[0].toLocaleString()}₫ - {displayPriceRange[1].toLocaleString()}₫
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => setPriceRange([MIN_PRICE, MAX_PRICE])} 
              />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters} 
            className="text-xs hover:text-emerald-500"
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Hiển thị {filteredProducts.length} sản phẩm
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="overflow-hidden h-full flex flex-col group bg-background/50 backdrop-blur-sm border-muted hover:border-emerald-500/20 transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={`https://placehold.co/300x300/e2e8f0/1e293b?text=${encodeURIComponent(product.name)}`} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Discount badge */}
              {product.discount > 0 && (
                <Badge className={`absolute top-2 left-2 ${THEME.primaryBg} text-white hover:bg-emerald-600`}>
                  -{product.discount}%
                </Badge>
              )}
              
              {/* Stock badge */}
              {!product.inStock && (
                <Badge variant="destructive" className="absolute top-2 right-2">
                  Hết hàng
                </Badge>
              )}
              
              {/* Quick action buttons */}
              <div className={`absolute right-2 top-2 transition-all duration-300 flex flex-col gap-2 ${hoveredProductId === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md">
                  <Heart className="h-4 w-4 text-gray-600" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md">
                  <ShoppingCart className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
            
            <CardContent className="flex flex-col flex-grow p-4">
              <div className="mb-1 text-sm text-muted-foreground">{product.brand}</div>
              <h3 className="font-medium line-clamp-2 hover:text-emerald-500 cursor-pointer mb-2 transition-colors group-hover:text-emerald-500">{product.name}</h3>
              
              <div className="flex items-center mt-auto">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({product.rating}.0)</span>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  {product.discount > 0 && (
                    <span className="text-sm line-through text-muted-foreground">
                      {Math.floor(product.price / (1 - product.discount / 100)).toLocaleString()}₫
                    </span>
                  )}
                  <span className="font-bold text-emerald-500">{product.price.toLocaleString()}₫</span>
                </div>
                {product.inStock ? (
                  <div className="flex items-center text-xs text-emerald-500">
                    <Truck className="h-3 w-3 mr-1" />
                    <span>Có sẵn</span>
                  </div>
                ) : (
                  <div className="flex items-center text-xs text-gray-400">
                    <span>Liên hệ</span>
                  </div>
                )}
              </div>
              
              {/* Hover showing button */}
              <div className={`mt-3 transition-all duration-300 ${hoveredProductId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button className={`w-full text-sm h-8 bg-gradient-to-r ${THEME.primary} hover:${THEME.primaryHover}`}>
                  Thêm vào giỏ
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
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
          <Button onClick={resetFilters} className={`bg-gradient-to-r ${THEME.primary} hover:${THEME.primaryHover}`}>
            Xóa tất cả bộ lọc
          </Button>
        </div>
      )}

      {/* Advanced filter drawer */}
      <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DrawerContent className="rounded-t-xl">
          <DrawerHeader className="border-b">
            <DrawerTitle className="text-center text-lg font-bold text-emerald-500">
              <Sparkles className="h-5 w-5 inline-block mr-2 text-yellow-500" />
              Bộ lọc nâng cao
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Tùy chỉnh tìm kiếm để tìm sản phẩm phù hợp nhất
            </DrawerDescription>
          </DrawerHeader>
          
          <ScrollArea className="p-6 max-h-[70vh]">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3 flex items-center justify-between text-emerald-500">
                  <span>Danh mục</span>
                  <span className="text-xs text-muted-foreground">{selectedCategories.length} đã chọn</span>
                </h4>
                <div className="max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <div 
                        key={category}
                        onClick={() => toggleCategory(category)}
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
              </div>
              
              <Separator className="bg-muted/50" />
              
              {/* Brands */}
              <div>
                <h4 className="font-medium mb-3 flex items-center justify-between text-emerald-500">
                  <span>Thương hiệu</span>
                  <span className="text-xs text-muted-foreground">{selectedBrands.length} đã chọn</span>
                </h4>
                <div className="max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="flex flex-wrap gap-2">
                    {BRANDS.map((brand) => (
                      <div 
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={`px-3 py-2 text-sm rounded-full border cursor-pointer transition-all
                          ${selectedBrands.includes(brand)
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'border-muted hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10'
                          }`}
                      >
                        {brand}
                      </div>
                    ))}
                  </div>
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
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={10000}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="[&_.react-aria-Thumb]:border-emerald-500 [&_.react-aria-Thumb]:focus-visible:ring-emerald-500 [&_.react-aria-Range]:bg-emerald-500"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{MIN_PRICE.toLocaleString()}₫</span>
                    <span className="text-xs text-muted-foreground">{MAX_PRICE.toLocaleString()}₫</span>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-muted/50" />
              
              {/* Rating filter */}
              <div>
                <h4 className="font-medium mb-3 text-emerald-500">Đánh giá</h4>
                <div className="flex flex-wrap gap-2">
                  <div
                    onClick={() => setMinRating(0)} 
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
                      onClick={() => setMinRating(rating === minRating ? 0 : rating)}
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
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-emerald-500">Chỉ hiển thị sản phẩm còn hàng</h4>
                <Switch 
                  checked={inStockOnly}
                  onCheckedChange={setInStockOnly}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>
            </div>
          </ScrollArea>
          
          <DrawerFooter className="border-t">
            <Button onClick={resetFilters} variant="outline" className="w-full">
              Xóa tất cả
            </Button>
            <DrawerClose asChild>
              <Button className={`w-full bg-gradient-to-r ${THEME.primary} hover:${THEME.primaryHover}`}>
                Áp dụng bộ lọc
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
