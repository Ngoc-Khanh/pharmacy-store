import { User, CreditCard, MapPin, Bell, Package, Heart, Store, Lock } from "lucide-react";
import { routeNames, routes } from "@/config";

export const menuItems = [
  {
    title: "Account",
    items: [
      {
        label: routeNames[routes.account.profile],
        icon: User,
        href: routes.account.profile,
      },
      {
        label: "Bank & Cards",
        icon: CreditCard,
        // href: routes.mainPayment,
      },
      {
        label: routeNames[routes.account.addresses],
        icon: MapPin,
        href: routes.account.addresses,
      },
      {
        label: "Notifications",
        icon: Bell,
        // href: routes.mainNotifications,
      },
      {
        label: "Change Password",
        icon: Lock,
        href: routes.account.changePwd,
      },
    ],
  },
  {
    title: "Shopping",
    items: [
      {
        label: "My Orders",
        icon: Package,
        href: routes.account.orders,
      },
      {
        label: "My Invoices",
        icon: Heart,
        href: routes.account.invoices,
      },
      {
        label: "My Store",
        icon: Store,
        // href: routes.mainStore,
      },
    ],
  },
];