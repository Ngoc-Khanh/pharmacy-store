import { ProductFilters } from "./product.filters";
import { ProductGrid } from "./product.grid";

export default function ProductsPage() {
  return (
    <div className="border-grid">
      <div className="flex-1 p-4">
        <div className="p-6">
          <div className="flex gap-6">
            <ProductFilters />
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}