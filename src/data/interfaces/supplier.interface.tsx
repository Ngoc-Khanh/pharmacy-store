export interface Supplier {
  readonly id: string;
  name: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}