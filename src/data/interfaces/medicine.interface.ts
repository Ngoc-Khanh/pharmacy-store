import { Category, Supplier } from "@/data/interfaces";

export interface Medicine {
  readonly id: string;
  name: string;
  slug: string;
  priority: number;
  thumbnail: Thumbnail;
  description: string;
  variants: Variant;
  ratings: Ratings;
  category: Category;
  supplier: Supplier;
  readonly createdAt: string; 
  readonly updatedAt: string;
}

interface Thumbnail {
  imageUrl: string;
  imageAlt: string;
}

interface Variant {
  price: number;
  limitQuantity: number;
  stockStatus: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK";
  originalPrice: number;
  discountPercent: number;
  isDiscounted: boolean;
  isFeatured: boolean;
  isActive: boolean; 
}

interface Ratings {
  star: number;
  liked: number;
  reviewCount: number;
}

