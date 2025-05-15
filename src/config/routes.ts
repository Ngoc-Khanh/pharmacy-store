const baseRoutes = {
  // AUTHENTICATION ROUTES
  auth: {
    login: "/sign-in",
    register: "/sign-up",
    forgotPassword: "/forgot-password",
  },

  // MAIN ROUTES
  store: {
    root: "/",
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
  [baseRoutes.store.root]: "Home",

  // ADMIN NAME ROUTES
  [baseRoutes.admin.root]: "Admin",
  [baseRoutes.admin.dashboard]: "Dashboard",
  [baseRoutes.admin.settings.root]: "Settings",
};

export const routes = {
  ...baseRoutes,
};
