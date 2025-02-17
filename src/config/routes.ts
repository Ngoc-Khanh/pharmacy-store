const baseRoutes = {
  // AUTHENTICATION ROUTES
  login: "/sign-in",
  register: "/sign-up",
  forgotPassword: "/forgot-password",

  // MAIN ROUTES
  home: "/",
  products: "/products",
  details: (id: string) => `/products/${id}`,

  admin: "/admin",
  adminDashboard: "/admin/dashboard",

  // ACCOUNT MAIN ROUTES
  mainSettings: "/account",
  mainInvoices: "/account/invoices",
  mainProfile: "/account/profile",
  mainChangePwd: "/account/change-password",

  // SETTINGS ADMIN ROUTES
  settingsProfile: "admin/settings/profile",
  settingsPreferences: "admin/settings/preferences",

  // ERROR ROUTES
  generalError: "/500",
  notfoundError: "/404",
  maintenanceError: "/503",
  unauthorizedError: "/401",
};

export const routeNames = {
  // MAIN NAME ROUTES
  [baseRoutes.home]: "Home",

  // AUTHENTICATION NAME ROUTES
  [baseRoutes.admin]: "Admin",
  [baseRoutes.adminDashboard]: "Dashboard",
};

export const routes = {
  ...baseRoutes,
};
