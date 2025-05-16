const baseRoutes = {
  // AUTHENTICATION ROUTES
  auth: {
    login: "/sign-in",
    register: "/sign-up",
    forgotPassword: "/forgot-password",
  },

  // MAIN ROUTES
  store: {
    root: "/store",
    categories: "/store/categories",
    medicines: "/store/medicines",
    medicineDetails: (id: string) => `/store/medicines/${id}/details`,
    checkout: "/store/checkout",
    account: {
      root: "/store/account",
      addresses: "/store/account/addresses",
      changePwd: "/store/account/change-password",
    },
  },

  admin: {
    root: "/admin",
    dashboard: "/admin/dashboard",
    settings: {
      root: "/admin/settings",
    }
  },

  // ERROR ROUTES
  generalError: "/500",
  notfoundError: "/404",
  maintenanceError: "/503",
  unauthorizedError: "/401",
};

export const routeNames = {
  // MAIN NAME ROUTES
  [baseRoutes.store.root]: "Trang chủ",
  [baseRoutes.store.categories]: "Danh mục",
  [baseRoutes.store.medicines]: "Dược phẩm",

  // ADMIN NAME ROUTES
  [baseRoutes.admin.root]: "Admin",
  [baseRoutes.admin.dashboard]: "Dashboard",
  [baseRoutes.admin.settings.root]: "Settings",

  // STORE NAME ROUTES
  [baseRoutes.store.account.root]: "Tài khoản",
  [baseRoutes.store.account.addresses]: "Địa chỉ",
  [baseRoutes.store.account.changePwd]: "Đổi mật khẩu",
};

export const routes = {
  ...baseRoutes,
};
