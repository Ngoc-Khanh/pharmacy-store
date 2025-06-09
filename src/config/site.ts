import { Building2, FileText, FolderIcon, LayoutDashboardIcon, Package, PillIcon, SettingsIcon, UsersIcon } from "lucide-react";
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

export const sidebarItem = {
  navMain: [
    {
      title: routeNames[routes.admin.dashboard],
      url: routes.admin.dashboard,
      icon: LayoutDashboardIcon,
    },
    {
      title: routeNames[routes.admin.users],
      url: routes.admin.users,
      icon: UsersIcon,
    },
    {
      title: routeNames[routes.admin.categories],
      url: routes.admin.categories,
      icon: FolderIcon,
    },
    {
      title: routeNames[routes.admin.medicines],
      url: routes.admin.medicines,
      icon: PillIcon,
    },
    {
      title: routeNames[routes.admin.suppliers],
      url: routes.admin.suppliers,
      icon: Building2,
    },
    {
      title: routeNames[routes.admin.orders],
      url: routes.admin.orders,
      icon: Package,
    },
    {
      title: routeNames[routes.admin.invoices],
      url: routes.admin.invoices,
      icon: FileText,
    }
  ],
  navSecondary: [
    {
      title: routeNames[routes.admin.settings.root],
      url: routes.admin.settings.root,
      icon: SettingsIcon,
    },
  ],
}