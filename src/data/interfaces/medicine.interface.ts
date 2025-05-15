import { Category } from "./category.interface";

export interface Medicine {
  readonly id: string;
  name: string;
  slug: string;
  priority?: number;
  thumbnail: Thumbnail;
  description: string;
  variants: Variant;
  ratings: Ratings;
  category: Category;
  // supplier: Supplier;
  details: Details;
  usageguide: UsageGuide;
  readonly createdAt?: string; 
  readonly updatedAt?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}

interface Thumbnail {
  publicId?: string;
  url: string | null;
  alt: string;
}

interface Ratings {
  star: number;
  liked: number;
  reviewCount?: number;
  review_count?: number;
}

interface Variant {
  price: number;
  limitQuantity?: number;
  limit_quantity?: number;
  stockStatus?: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK";
  stock_status?: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK";
  originalPrice?: number;
  original_price?: string | number;
  discountPercent?: number;
  discount_percent?: number;
  isFeatured?: boolean;
  is_featured?: boolean;
  isActive?: boolean;
  is_active?: boolean;
}

export interface Details {
  ingredients: string;
  usage: string[];
  parameter?: Parameters;
  paramaters?: Parameters;
}

interface Parameters {
  origin: string;
  packaging: string;
}

export interface UsageGuide {
  dosage: {
    adult: string;
    child: string;
  };
  directions: string[];
  precautions: string[];
}