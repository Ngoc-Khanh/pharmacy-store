import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AdminNavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-3 py-2">
        <SidebarMenu>
          {items.map((item) => {
            // Check if current pathname matches or starts with the item URL
            const isActive = location.pathname === item.url ||
              (item.url !== '#' && item.url !== '/' && location.pathname.startsWith(item.url));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                  className={`group transition-all duration-200 ${
                    isActive 
                      ? "bg-primary/15 text-primary hover:bg-primary/20" 
                      : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    {item.icon && (
                      <div className={`flex h-6 w-6 items-center justify-center rounded ${
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                    )}
                    <span className={`font-medium ${isActive ? "text-primary" : ""}`}>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}