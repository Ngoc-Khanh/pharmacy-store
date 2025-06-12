import { isActiveUserAtom, userAtom } from "@/atoms/auth.atom";
import { StoreFooter, StoreHeader } from "@/components/layouts/store";
import { routes } from "@/config";
import { useAtomValue } from "jotai";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";

export default function StoreLayout() {
  const user = useAtomValue(userAtom)
  const isAccountActive = useAtomValue(isActiveUserAtom);
  const isLoggedIn = !!user;

  if (isLoggedIn && !isAccountActive) return <Navigate to={routes.errors.notActive} replace />;

  return (
    <div vaul-drawer-wrapper="">
      <div className="relative flex min-h-svh flex-col bg-background">
        <div data-wrapper="" className="border-grid flex flex-1 flex-col">
          <StoreHeader />
          <main className="flex flex-1 flex-col">
            <Outlet />
          </main>
          <StoreFooter />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
}
