import { StockStatus } from "../enum";
import { Category } from "./category.interface";
import { Supplier } from "./supplier.interface";

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
  supplier: Supplier;
  details: Details;
  usageguide: UsageGuide;
  // Additional fields that might come from Laravel API
  price?: number; // Direct price field from Laravel
  stock?: number; // Stock quantity from Laravel
  category_id?: string; // Category ID from Laravel
  readonly created_at?: string; // Laravel snake_case
  readonly updated_at?: string; // Laravel snake_case
  readonly createdAt?: string; 
  readonly updatedAt?: string;
}

interface Thumbnail {
  publicId?: string;
  url: string;
  alt: string;
}

interface Ratings {
  star: number;
  liked: number;
  reviewCount?: number;
}

interface Variant {
  price: number;
  limitQuantity?: number;
  stockStatus?: StockStatus;
  originalPrice?: number;
  discountPercent?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface Details {
  ingredients: string;
  usage: string[];
  paramaters?: Paramaters;
}

interface Paramaters {
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