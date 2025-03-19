"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { menuItems } from "./account.menu-items";

export function AccountSidebar() {
  const { pathname } = useLocation()

  return (
    <div className="w-64 p-4 space-y-6 border-r">
      {menuItems.map((section, index) => (
        <div key={`section-${index}`} className="space-y-2">
          <h3 className="text-sm font-semibold px-3">{section.title}</h3>
          {section.items.map((item, itemIndex) => (
            <Link
              key={`${section.title}-${itemIndex}-${item.href}`}
              to={item.href ?? ""}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}