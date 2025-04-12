import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { AdminSecondaryNav } from "./admin.nav-secondary";
import { AdminUserSkeleton } from "./admin.user-skeleton";
import { useUser } from "@/providers/user.provider";
import { AdminNavMain } from "./admin.nav-main";
import { BriefcaseMedical } from "lucide-react";
import { routes, sidebarItem } from "@/config";
import { AdminUser } from "./admin.user";
import { Link } from "react-router-dom";

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              asChild
            >
              <Link to={routes.admin.dashboard}>
                <BriefcaseMedical className="h-5 w-5" />
                <span className="text-base font-semibold">Pharmacy Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain items={sidebarItem.navMain} />
        <AdminSecondaryNav items={sidebarItem.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <AdminUser user={user} />
        ) : (
          <AdminUserSkeleton />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
