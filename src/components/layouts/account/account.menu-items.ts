import { routeNames, routes } from "@/config";
import { FileText, Lock, MapPin, Package, ShoppingCart, User } from "lucide-react";

export const menuItems = [
  {
    title: "Tài khoản",
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
      {
        label: "Giỏ hàng",
        icon: ShoppingCart,
        href: routes.store.account.cart,
      },
      {
        label: "Đơn hàng",
        icon: Package,
        href: routes.store.account.orders,
      },
      {
        label: "Hóa đơn",
        icon: FileText,
        href: routes.store.account.invoices,
      },
    ],
  },
];
