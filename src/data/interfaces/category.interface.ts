export interface Category {
  readonly id: string;
  title: string;
  slug: string;
  description: string;
  isActive?: boolean;
  readonly updatedAt: string;
  readonly createdAt: string;
}

