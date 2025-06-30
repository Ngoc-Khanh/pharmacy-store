import { routes } from "./routes";

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
]