"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { ProductSearch } from "./product.search";

const products = [
  {
    id: 1,
    title: "Test1",
    category: "Test1",
    price: 1200,
    image: ""
  },
  {
    id: 2,
    title: "Test1",
    category: "Test1",
    price: 850,
    image: ""
  },
  {
    id: 3,
    title: "Test1",
    category: "Test1",
    price: 1499,
    image: ""
  },
  {
    id: 4,
    title: "Test1",
    category: "Test1",
    price: 450,
    image: ""
  },
]

export function ProductGrid() {
  return (
    <div className="flex-1">
      <div className="mb-6 flex items-center justify-between gap-2">
        <ProductSearch />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date (Newest first)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Date (Newest first)</SelectItem>
            <SelectItem value="oldest">Date (Oldest first)</SelectItem>
            <SelectItem value="price-high">Price (High to Low)</SelectItem>
            <SelectItem value="price-low">Price (Low to High)</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg border bg-white">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="mt-2 flex justify-between">
              <div>
                <h3 className="text-sm font-medium">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <p className="text-sm font-medium">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}