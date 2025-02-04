export const siteConfig = {
  // SETTING SITE CONFIG
  name: "Pharmacy Store",
  url: "https://krug.com",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Your trusted pharmacy for quality medications and health care products.",
  // OWNER INFO
  links: {
    facebook: "https://www.facebook.com/ngockhanh2k3",
    github: "https://github.com/Ngoc-Khanh",
  },

  // AUTH JWT
  auth: {
    jwt_key: "ACCESS_TOKEN",
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
      import.meta.env.VITE_BACKEND_API_BASE_URL || "http://localhost:8000",
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
