import { FileText, Lock, MapPin, Package, ShoppingCart, User } from "lucide-react";
import { routeNames, routes } from "./routes";

export const siteConfig = {
  // SETTING SITE CONFIG
  name: "Pharmacity Store",
  url: import.meta.env.VITE_APP_URL || "http://localhost:5173",
  description:
    "Your trusted pharmacy for quality medications and health care products.",
  // OWNER INFO
  links: {
    facebook: "https://www.facebook.com/ngockhanh2k3",
    github: "https://github.com/Ngoc-Khanh",
  },

  // AUTH JWT
  auth: {
    jwt_key: "access_token",
  },

  // CONFIG LOCALES
  locale: {
    locale_key: "locale",
    default: "en",
    languages: [],
  },

  backend: {
    // BASE API URL
    base_api_url:
      import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000",
    llm_ai_url:
      import.meta.env.VITE_LLM_API_URL || "http://localhost:5000",
    // BASE HEADERS
    base_headers: {
      "Content-Type": "application/json",
    },
  },
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const mainNav = [
  {
    title: "Trang chủ",
    href: routes.store.root,
  },
  {
    title: "Danh mục",
    href: routes.store.categories,
  },
  {
    title: "AI Chẩn đoán",
    href: routes.store.consultation,
  },
  {
    title: "Tài khoản",
    href: routes.store.account.root,
  },
  {
    title: "Giỏ hàng",
    href: routes.store.account.cart,
  },
  {
    title: "Đơn hàng",
    href: routes.store.account.orders,
  },
  {
    title: "Hóa đơn",
    href: routes.store.account.invoices,
  }
]

export const accountMenus = [
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