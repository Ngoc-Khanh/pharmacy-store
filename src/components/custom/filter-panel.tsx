import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

interface FilterPanelProps {
  type: 'categories' | 'suppliers' | 'price';
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FilterPanel({ title, onClose, children }: FilterPanelProps) {
  return (
    <div className="mb-6 p-4 bg-background/80 backdrop-blur-sm border rounded-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-5 duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-lg text-emerald-500">{title}</h3>
        <X
          className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={onClose}
        />
      </div>
      {children}
    </div>
  );
}

interface PriceFilterPanelProps {
  priceRange: [number, number];
  displayPriceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  onReset: () => void;
  minPrice: number;
  maxPrice: number;
}

export function PriceFilterPanel({
  priceRange,
  displayPriceRange,
  onPriceChange,
  onReset,
  minPrice,
  maxPrice
}: PriceFilterPanelProps) {
  return (
    <FilterPanel type="price" title="Khoảng giá" onClose={() => { }}>
      <div className="px-4 py-6 mb-2">
        <div className="text-center mb-4 text-sm font-medium">
          {displayPriceRange[0].toLocaleString()}₫ - {displayPriceRange[1].toLocaleString()}₫
        </div>
        <Slider
          value={priceRange}
          min={minPrice}
          max={maxPrice}
          step={10000}
          onValueChange={(value) => onPriceChange(value as [number, number])}
          className="[&_.react-aria-Thumb]:border-emerald-500 [&_.react-aria-Thumb]:focus-visible:ring-emerald-500 [&_.react-aria-Range]:bg-emerald-500"
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">{minPrice.toLocaleString()}₫</span>
          <span className="text-xs text-muted-foreground">{maxPrice.toLocaleString()}₫</span>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs text-muted-foreground hover:text-emerald-500"
        >
          Đặt lại
        </Button>
      </div>
    </FilterPanel>
  );
}