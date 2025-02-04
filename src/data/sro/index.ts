export type SRO<T = unknown> = {
  data: T;
  message: string;
  status: number;
  locale: string;
  error: string | null;
};
