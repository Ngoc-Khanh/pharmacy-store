import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: StoreAPI.CategoryRoot,
    staleTime: 1000 * 60 * 60 * 24,
    
  });
}