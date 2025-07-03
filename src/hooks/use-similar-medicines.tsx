import { AiAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";

export function useSimilarMedicines(medicineId: string) {
  return useQuery({
    queryKey: ["similar-medicines", medicineId],
    queryFn: () => AiAPI.AiMedicineSimilarity(medicineId),
    enabled: !!medicineId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
} 