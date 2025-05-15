import { isAuthenticatedAtom } from "@/atoms/auth.atom";
import { AccountSidebar } from "@/components/layouts/account";
import { routes } from "@/config";

import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

export default function AccountLayout() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  if (!isAuthenticated) return <Navigate to={routes.auth.login} />

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950/30 dark:via-teal-950/30 dark:to-blue-950/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      {/* Animated circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="container-wrapper relative z-10 h-full overflow-y-auto">
        <div className="container flex py-6">
          <AccountSidebar />
          <div className="flex-1 pl-6 min-h-screen mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}