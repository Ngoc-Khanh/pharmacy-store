"use client";

import { User, CreditCard, MapPin, Bell, Package, Heart, Store, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Account",
    items: [
      {
        label: "My Profile",
        icon: User,
        href: "/account/profile",
      },
      {
        label: "Bank & Cards",
        icon: CreditCard,
        href: "/account/payment",
      },
      {
        label: "Addresses",
        icon: MapPin,
        href: "/account/addresses",
      },
      {
        label: "Notifications",
        icon: Bell,
        href: "/account/notifications",
      },
      {
        label: "Change Password",
        icon: Lock,
        href: "/account/change-password",
      },
    ],
  },
  {
    title: "Shopping",
    items: [
      {
        label: "My Orders",
        icon: Package,
        href: "/profile/orders",
      },
      {
        label: "My Wishlist",
        icon: Heart,
        href: "/profile/wishlist",
      },
      {
        label: "My Store",
        icon: Store,
        href: "/profile/store",
      },
    ],
  },
]

export function AccountSidebar() {
  const { pathname } = useLocation()

  return (
    <div className="w-64 p-4 space-y-6 border-r">
      {menuItems.map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-sm font-semibold px-3">{section.title}</h3>
          {section.items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
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
