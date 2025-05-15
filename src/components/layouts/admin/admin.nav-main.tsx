import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AdminNavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    badge?: string
  }[]
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 py-2">
        <SidebarMenu>
          {items.map((item) => {
            // Check if current pathname matches or starts with the item URL
            const isActive = location.pathname === item.url ||
              (item.url !== '#' && item.url !== '/' && location.pathname.startsWith(item.url));

            return (
              <SidebarMenuItem key={item.title} className="relative">
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                  className={`group transition-all duration-200 ${isActive
                      ? "bg-primary/15 text-primary hover:bg-primary/20"
                      : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {item.icon && (
                      <div className={`flex h-6 w-6 items-center justify-center rounded transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        }`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                    )}
                    <span className={`font-medium ${isActive ? "text-primary" : ""}`}>{item.title}</span>
                    {item.badge && (
                      <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        }`}>
                        {item.badge}
                      </span>
                    )}
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
