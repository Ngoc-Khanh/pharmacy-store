import { User, CreditCard, MapPin, Bell, Package, Heart, Store, Lock } from "lucide-react";
import { routeNames, routes } from "@/config";

export const menuItems = [
  {
    title: "Account",
    items: [
      {
        label: routeNames[routes.mainProfile],
        icon: User,
        href: routes.mainProfile,
      },
      {
        label: "Bank & Cards",
        icon: CreditCard,
        // href: routes.mainPayment,
      },
      {
        label: routeNames[routes.mainAddresses],
        icon: MapPin,
        href: routes.mainAddresses,
      },
      {
        label: "Notifications",
        icon: Bell,
        // href: routes.mainNotifications,
      },
      {
        label: "Change Password",
        icon: Lock,
        href: routes.mainChangePwd,
      },
    ],
  },
  {
    title: "Shopping",
    items: [
      {
        label: "My Orders",
        icon: Package,
        href: routes.mainOrders,
      },
      {
        label: "My Invoices",
        icon: Heart,
        href: routes.mainInvoices,
      },
      {
        label: "My Store",
        icon: Store,
        // href: routes.mainStore,
      },
    ],
  },
];