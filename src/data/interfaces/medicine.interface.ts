import { Category } from "./category.interface";

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
  // supplier: Supplier;
  details: Details;
  usageguide: UsageGuide;
  readonly createdAt: string; 
  readonly updatedAt: string;
}

interface Thumbnail {
  publicId: string;
  url: string;
  alt: string;
}

interface Ratings {
  star: number;
  liked: number;
  reviewCount: number;
}

interface Variant {
  price: number;
  limitQuantity: number;
  stockStatus: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK";
  originalPrice: number;
  discountPercent: number;
  isFeatured: boolean;
  isActive: boolean; 
}

export interface Details {
  ingredients: string;
  usage: string[];
  parameter: Parameters;
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