const baseRoutes = {
  // AUTHENTICATION ROUTES
  login: "/sign-in",
  register: "/sign-up",
  forgotPassword: "/forgot-password",

  // MAIN ROUTES
  home: "/",

  admin: "/admin",

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
};

export const routes = {
  ...baseRoutes,
};
