import { useQuery } from "@tanstack/react-query";
import { StoreAPI } from "@/services/api/store.api";

export const useMedicineDetails = (id: string) => {
  return useQuery({
    queryKey: ["medicine", id],
    queryFn: () => StoreAPI.MedicineDetails(id),
    enabled: !!id,
  });
}; 