import { AuthAPI } from "@/services/api/auth.api";
import { getAccessToken } from "@/lib/get-token";
import { User } from "@/data/interfaces";
import { siteConfig } from "@/config";
import { atom } from "jotai";

// Atom lưu trữ thông tin user
export const userAtom = atom<User | null>(null);
// Atom lưu trữ token
export const tokenAtom = atom<string>(getAccessToken());
// Atom cho việc cập nhật token
export const updateTokenAtom = atom(null, (_, set, newToken: string) => {
  set(tokenAtom, newToken);
  if (newToken) localStorage.setItem(siteConfig.auth.jwt_key, newToken);
  else localStorage.removeItem(siteConfig.auth.jwt_key);
});

// Atom để fetch thông tin user
export const fetchUserProfileAtom = atom(null, async (get, set) => {
  const token = get(tokenAtom);
  if (token) {
    try {
      const userData = await AuthAPI.fetchUserProfile();
      set(userAtom, userData);
    } catch {
      set(userAtom, null);
      set(updateTokenAtom, "");
    }
  }
});

// Atom kiểm tra trạng thái đăng nhập
export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));
