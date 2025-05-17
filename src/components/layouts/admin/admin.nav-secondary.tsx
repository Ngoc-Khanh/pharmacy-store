import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function AdminNavSecondary({
  items,
  title = "Support",
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    badge?: string
  }[]
  title?: string
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const location = useLocation();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent className="border-t border-slate-200 dark:border-slate-700/50 mt-1 pt-1">
        {title && (
          <h3 className="px-2 mb-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        )}
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url ||
              (item.url !== '#' && item.url !== '/' && location.pathname.startsWith(item.url));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="group py-0.5"
                >
                  <Link
                    to={item.url}
                    className={`flex w-full items-center gap-1.5 px-2 ${isActive ? "text-teal-700 dark:text-teal-300" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                  >
                    {item.icon && (
                      <item.icon className="size-3" />
                    )}
                    <span className={`truncate text-xs ${isActive ? "font-medium" : ""}`}>
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className={`ml-auto text-[8px] px-0.5 ${isActive ? "text-teal-700 dark:text-teal-300" : "text-slate-500 dark:text-slate-400"
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
                {isActive && (
                  <motion.div
                    layoutId="secondaryNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-2 bg-teal-600 dark:bg-teal-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}