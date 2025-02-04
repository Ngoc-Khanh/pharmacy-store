import { siteConfig } from "@/config";

export const getAccessToken = () => {
  return localStorage.getItem(siteConfig.auth.jwt_key) || "";
};
