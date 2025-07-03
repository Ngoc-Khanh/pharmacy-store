import { StockStatus } from "@/data/enums";
import { CategoryResponse, SupplierResponse } from "@/data/interfaces";

export interface MedicineResponse {
  readonly id: string;
  name: string;
  slug: string;
  priority?: number;
  thumbnail: Thumbnail;
  description: string;
  variants: Variant;
  ratings: Ratings;
  category: CategoryResponse;
  supplier: SupplierResponse;
  details: Details;
  usageguide: UsageGuide;
  readonly createdAt?: string; 
  readonly updatedAt?: string;
}

export interface Thumbnail {
  publicId?: string;
  url: string;
  alt: string;
}

interface Ratings {
  star: number;
  liked: number;
  reviewCount?: number;
}

export interface Variant {
  price: number;
  quantity?: number;
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