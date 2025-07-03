export interface ListParams {
  s?: string;
  page?: number;
  limit?: number;
}

export interface MedicineFilterParams extends ListParams {
  category_id?: string;
  supplier_id?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  sort_by?: 'name' | 'created_at' | 'updated_at' | 'price_asc' | 'price_desc' | 'rating_desc' | 'popular';
  sort_order?: 'asc' | 'desc';
}