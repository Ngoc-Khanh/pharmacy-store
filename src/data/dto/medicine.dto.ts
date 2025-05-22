export type AddMedicineDto = {
  categoryId: string;
  name: string;
  description: string;
  thumbnail?: {
    url: string;
  };
  variants: {
    price: number;
    limitQuantity: number;
    stockStatus: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK";
    originalPrice: number;
    discountPercent: number;
    isFeatured?: boolean;
    isActive?: boolean;
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