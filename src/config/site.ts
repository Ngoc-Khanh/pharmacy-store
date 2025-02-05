import { SidebarData } from "@/data/types/sidebar.type";
import { routeNames, routes } from "./routes";
import { LayoutDashboard } from "lucide-react";

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

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: routeNames[routes.adminDashboard],
          url: routes.adminDashboard,
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          title: "Auth",
          // icon: IconLockAccess,
          items: [
            {
              title: "Sign In",
              url: "/sign-in",
            },
            {
              title: "Sign In (2 Col)",
              url: "/sign-in-2",
            },
            {
              title: "Sign Up",
              url: "/sign-up",
            },
            {
              title: "Forgot Password",
              url: "/forgot-password",
            },
            {
              title: "OTP",
              url: "/otp",
            },
          ],
        },
        {
          title: "Errors",
          // icon: IconBug,
          items: [
            {
              title: "Unauthorized",
              url: "/401",
              // icon: IconLock,
            },
            {
              title: "Forbidden",
              url: "/403",
              // icon: IconUserOff,
            },
            {
              title: "Not Found",
              url: "/404",
              // icon: IconError404,
            },
            {
              title: "Internal Server Error",
              url: "/500",
              // icon: IconServerOff,
            },
            {
              title: "Maintenance Error",
              url: "/503",
              // icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          // icon: IconSettings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              // icon: IconUserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              // icon: IconTool,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              // icon: IconPalette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              // icon: IconNotification,
            },
            {
              title: "Display",
              url: "/settings/display",
              // icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/help-center",
          // icon: IconHelp,
        },
      ],
    },
  ],
};
