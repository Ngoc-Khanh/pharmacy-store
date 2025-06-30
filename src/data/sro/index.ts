export type SRO<T = unknown> = {
  data: T;
  message: string;
  status: number;
  locale: string;
  error: string | null;
};

export interface Paginated<T = unknown> {
  currentPage: number;
  data: T[];
  firstPageUrl: string;
  from: number;
  lastPage: number;
  lastPageUrl: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  nextPageUrl: string | null;
  path: string;
  perPage: number;
  prevPageUrl: string | null;
  to: number;
  total: number;
}