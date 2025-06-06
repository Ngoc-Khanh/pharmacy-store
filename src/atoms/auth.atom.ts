import { AuthAPI } from "@/services/api/auth.api";
import { getAccessToken } from "@/lib/get-token";
import { User } from "@/data/interfaces";
import { siteConfig } from "@/config";
import { atom } from "jotai";
import { AccountRole, AccountStatus } from "@/data/enum";

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

// Atom kiểm tra xem người dùng đã được kích hoạt hay chưa
export const isActiveUserAtom = atom((get) => get(userAtom)?.status === AccountStatus.ACTIVE);

// Atom kiểm tra xem người dùng có phải là quản trị viên hay không
export const isAdminUserAtom = atom((get) => get(userAtom)?.role === AccountRole.ADMIN);

// Atom kiểm tra xem người dùng có phải là dược sĩ hay không
export const isPharmacistUserAtom = atom((get) => get(userAtom)?.role === AccountRole.PHARMACIST);

// Atom kiểm tra xem người dùng có phải là khách hàng hay không
export const isCustomerUserAtom = atom((get) => get(userAtom)?.role === AccountRole.CUSTOMER);