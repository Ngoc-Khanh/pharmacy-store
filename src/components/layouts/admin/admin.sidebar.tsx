import { userAtom } from "@/atoms/auth.atom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { routes } from "@/config";

import { sidebarItem } from "@/config/site";
import { useAtomValue } from "jotai";
import { BriefcaseMedical } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminNavMain, AdminNavSecondary, AdminNavUser, AdminUserSkeleton } from "./index";

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAtomValue(userAtom);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
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
        <AdminNavSecondary items={sidebarItem.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <AdminNavUser user={user} />
        ) : (
          <AdminUserSkeleton />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
