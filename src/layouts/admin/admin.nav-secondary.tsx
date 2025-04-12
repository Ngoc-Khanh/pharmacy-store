import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function AdminSecondaryNav({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent className="border-t border-primary/10 pt-4 mt-2">
        <h3 className="px-4 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Support</h3>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild
                className="transition-all duration-200 hover:bg-primary/10 hover:text-foreground group"
              >
                <Link 
                  to={item.url}
                  className="flex w-full items-center gap-3"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground group-hover:text-foreground">
                    <item.icon className="size-4 shrink-0" />
                  </div>
                  <span className="truncate text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}