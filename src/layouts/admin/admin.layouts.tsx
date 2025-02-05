import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { NavBreadcrumb } from "./nav-breadcrumb";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { siteConfig } from "@/config";

export default function AdminLayout() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | {siteConfig.name}</title>
      </Helmet>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <NavBreadcrumb />
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}