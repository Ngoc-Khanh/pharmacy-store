import { siteConfig } from "@/config";

export const getLocale = () => {
  return (
    localStorage.getItem(siteConfig.locale.locale_key) ||
    siteConfig.locale.default
  );
};
