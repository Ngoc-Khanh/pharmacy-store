import { hasAdminAccessAtom, isActiveUserAtom, isAuthenticatedAtom, userAtom, userLoadingAtom } from "@/atoms"
import { useAtomValue } from "jotai"

export const useAuth = () => {
  const user = useAtomValue(userAtom)
  const isActive = useAtomValue(isActiveUserAtom)
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const isLoading = useAtomValue(userLoadingAtom)
  const hasAdminAccess = useAtomValue(hasAdminAccessAtom)

  return {
    user,
    isActive,
    isAuthenticated,
    isLoading,
    hasAdminAccess,
  }
}