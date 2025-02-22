import { User, CreditCard, MapPin, Bell, Package, Heart, Store, Lock } from "lucide-react";

export const menuItems = [
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
        href: "/account/orders",
      },
      {
        label: "My Invoices",
        icon: Heart,
        href: "/account/invoices",
      },
      {
        label: "My Store",
        icon: Store,
        href: "/account/store",
      },
    ],
  },
];
