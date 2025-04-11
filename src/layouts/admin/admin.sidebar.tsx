import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { useUser } from "@/providers/user.provider";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpCircleIcon } from "lucide-react";
import { AdminUser } from "./admin.user";
import { Link } from "react-router-dom";
import { routes } from "@/config";

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
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>

      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <AdminUser user={user} />
        ) : (
          <div className="flex mb-2 items-center justify-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="truncate h-2 w-[100px]" />
              <Skeleton className="truncate h-2 w-[150px]" />
            </div>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
