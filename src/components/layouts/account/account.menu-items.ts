import { routeNames, routes } from "@/config";
import { Lock, MapPin, User } from "lucide-react";

export const menuItems = [
  {
    title: "Account",
    items: [
      {
        label: routeNames[routes.store.account.root],
        icon: User,
        href: routes.store.account.root,
      },
      {
        label: routeNames[routes.store.account.addresses],
        icon: MapPin,
        href: routes.store.account.addresses,
      },
      {
        label: routeNames[routes.store.account.changePwd],
        icon: Lock,
        href: routes.store.account.changePwd,
      },
    ],
  },
  {
    title: "Mua sắm",
    items: [
      // {
      //   label: "My Orders",
      //   icon: Package,
      //   href: routes.account.orders,
      // },
      // {
      //   label: "My Invoices",
      //   icon: Heart,
      //   href: routes.account.invoices,
      // },
      // {
      //   label: "My Store",
      //   icon: Store,
      //   // href: routes.mainStore,
      // },
    ],
  },
];