import { isAuthenticatedAtom } from "@/atoms/auth.atom";
import { AdminHeader, AdminSidebar } from "@/components/layouts/admin";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { routes } from "@/config";

import { useAtomValue } from "jotai";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";

export default function AdminLayout() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  if (!isAuthenticated) return <Navigate to={routes.auth.login} />;

  return (
    <SidebarProvider>
      <AdminSidebar variant="inset" />
      <SidebarInset>
        <AdminHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
      <ScrollRestoration />
    </SidebarProvider>
  );
}