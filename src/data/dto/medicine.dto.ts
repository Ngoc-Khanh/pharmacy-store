export type AddMedicineDto = {
  categoryId: string;
  name: string;
  slug?: string;
  description: string;
  thumbnail?: {
    publicId?: string;
    url: string;
    alt: string;
  };
  variants: {
    price: number;
    limitQuantity: number;
    stockStatus: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK";
    originalPrice: number;
    discountPercent: number;
    isFeatured: boolean;
    isActive: boolean;
  }
  details: {
    ingredients: string;
    usage: string[];
    parameters: {
      origin: string;
      packaging: string;
    };
  }
  usageguide: {
    dosage: {
      adult: string;
      child: string;
    };
    directions: string[];
    precautions: string[];
  }
}