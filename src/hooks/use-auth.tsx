import { fetchUserProfile, hasAdminAccessAtom, isActiveUserAtom, isAuthenticatedAtom, userAtom } from "@/atoms"
import { useQuery } from "@tanstack/react-query"
import { useAtomValue } from "jotai"

export const useAuth = () => {
  const user = useAtomValue(userAtom)
  const isActive = useAtomValue(isActiveUserAtom)
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const hasAdminAccess = useAtomValue(hasAdminAccessAtom)

  const { isLoading, refetch, isFetching } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
    enabled: false, // Không tự động fetch khi hook được gọi
  })

  return {
    user,
    isActive,
    isAuthenticated,
    isLoading: isLoading || isFetching,
    hasAdminAccess,
    refetchProfile: refetch,
  }
}