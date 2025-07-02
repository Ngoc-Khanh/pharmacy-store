export interface CategoryResponse {
  readonly id: string;
  title: string;
  slug: string;
  description: string;
  isActive?: boolean;
  totalMedicines?: number;
  readonly updatedAt: string;
  readonly createdAt: string;
}