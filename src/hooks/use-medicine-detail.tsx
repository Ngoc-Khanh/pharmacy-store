import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";

export const useMedicineDetail = (id: string) => {
  return useQuery({
    queryKey: ["medicine-detail", id],
    queryFn: () => StoreAPI.MedicineDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}