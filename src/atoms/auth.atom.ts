import { siteConfig } from "@/config";
import { AccountRole, AccountStatus } from "@/data/enums";
import { UserResponse } from "@/data/interfaces";
import { getAccessToken } from "@/lib/get-token";
import { AuthAPI } from "@/services/v1";
import { atom } from "jotai";

// Atom lưu trữ thông tin user
export const userAtom = atom<UserResponse | null>(null);
// Atom lưu trữ token
export const tokenAtom = atom<string>(getAccessToken());
// Atom cho trạng thái loading của user
export const userLoadingAtom = atom<boolean>(false);
// Atom cho việc cập nhật token
export const updateTokenAtom = atom(null, (_, set, newToken: string) => {
  set(tokenAtom, newToken);
  if (newToken) localStorage.setItem(siteConfig.auth.jwt_key, newToken);
  else localStorage.removeItem(siteConfig.auth.jwt_key);
});

export const logoutAtom = atom(null, (_, set) => {
  set(updateTokenAtom, "");
  set(userAtom, null);
});

// Atom để fetch thông tin user
export const fetchUserProfileAtom = atom(null, async (get, set) => {
  const token = get(tokenAtom);
  if (token) {
    set(userLoadingAtom, true);
    try {
      const userData = await AuthAPI.fetchUserProfile();
      set(userAtom, userData);
    } catch {
      set(userAtom, null);
      set(updateTokenAtom, "");
    } finally {
      set(userLoadingAtom, false);
    }
  }
});

// Atom kiểm tra trạng thái đăng nhập
export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));

// Atom kiểm tra xem người dùng đã được kích hoạt hay chưa
export const isActiveUserAtom = atom(
  (get) => get(userAtom)?.status === AccountStatus.ACTIVE
);

// Atom kiểm tra xem người dùng có phải là quản trị viên hay không
export const isAdminUserAtom = atom(
  (get) => get(userAtom)?.role === AccountRole.ADMIN
);

// Atom kiểm tra xem người dùng có phải là dược sĩ hay không
export const isPharmacistUserAtom = atom(
  (get) => get(userAtom)?.role === AccountRole.PHARMACIST
);

// Atom kiểm tra xem người dùng có phải là khách hàng hay không
export const isCustomerUserAtom = atom(
  (get) => get(userAtom)?.role === AccountRole.CUSTOMER
);

// Atom kiểm tra xem người dùng có quyền truy cập admin hay không (admin hoặc pharmacist)
export const hasAdminAccessAtom = atom(
  (get) => {
    const user = get(userAtom);
    return user?.role === AccountRole.ADMIN || user?.role === AccountRole.PHARMACIST;
  }
);