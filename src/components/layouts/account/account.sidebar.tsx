"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { menuItems } from "./account.menu-items";

export function AccountSidebar() {
  const { pathname } = useLocation()

  return (
    <div className="w-72 space-y-6">
      <div className="bg-white/90 dark:bg-gray-950/90 shadow-xl dark:shadow-green-900/5 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sticky top-6">
        <h2 className="text-xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
          Tài khoản của tôi
        </h2>

        {menuItems.map((section, index) => (
          <div key={`section-${index}`} className="space-y-2 mb-6 last:mb-0">
            <h3 className="text-sm font-semibold px-3 text-gray-600 dark:text-gray-400">{section.title}</h3>
            {section.items.map((item, itemIndex) => (
              <Link
                key={`${section.title}-${itemIndex}-${item.href}`}
                to={item.href ?? ""}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium shadow-md"
                    : "hover:bg-green-50 dark:hover:bg-green-950/30 text-gray-700 dark:text-gray-300",
                )}
              >
                <item.icon className={cn(
                  "w-4 h-4",
                  pathname === item.href
                    ? "text-white"
                    : "text-green-600 dark:text-green-400"
                )} />
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}