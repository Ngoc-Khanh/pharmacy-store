import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AdminUserSkeleton } from "./admin.user-skeleton";
import { BriefcaseMedical } from "lucide-react";
import { AdminNavUser } from "./admin.nav-user";
import { userAtom } from "@/atoms/auth.atom";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { routes } from "@/config";

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
        {/*  */}
        {/*  */}
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
