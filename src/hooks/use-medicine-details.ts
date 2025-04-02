import { MedicineAPI } from "@/services/api/medicine.api";
import { useQuery } from "@tanstack/react-query";

export const useMedicineDetails = (id: string) => {
  return useQuery({
    queryKey: ["medicine", id],
    queryFn: () => MedicineAPI.getMedicineById(id),
    enabled: !!id,
  });
}; 