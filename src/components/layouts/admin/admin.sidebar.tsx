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
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-700/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to={routes.admin.dashboard} className="text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200">
                <BriefcaseMedical className="h-5 w-5 text-teal-600 dark:text-teal-400" />
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
      <SidebarFooter className="border-t border-slate-200 dark:border-slate-700/50">
        {user ? (
          <AdminNavUser user={user} />
        ) : (
          <AdminUserSkeleton />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
