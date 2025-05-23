import { StockStatus } from "../enum";

export type AddMedicineDto = {
  categoryId: string;
  supplierId: string;
  name: string;
  description: string;
  variants: {
    limitQuantity: number;
    stockStatus: StockStatus;
    originalPrice: number;
    discountPercent: number;
    isFeatured?: boolean;
    isActive?: boolean;
  }
  details: {
    ingredients: string;
    usage: string[];
    paramaters: {
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