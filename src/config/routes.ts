const baseRoutes = {
  // AUTHENTICATION ROUTES
  login: "/sign-in",
  register: "/sign-up",
  forgotPassword: "/forgot-password",

  // MAIN ROUTES
  home: "/",
  category: "/category",
  medicineDetails: (id: string) => `/medicine/${id}/details`,
  medicineDetailsBase: "/medicine/details",
  checkout: "/checkout",
  checkoutSuccess: "/checkout/success",

  // ACCOUNT MAIN ROUTES
  account: {
    main: "/account",
    orders: "/account/orders",
    profile: "/account/profile",
    settings: "/account/settings",
    invoices: "/account/invoices",
    addresses: "/account/addresses",
    changePwd: "/account/change-password",
    orderDetails: (id: string) => `/account/orders/${id}`,
    invoicesDetails: (id: string) => `/account/invoices/${id}`,
  },

  // ADMIN ROUTES
  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    medicines: "/admin/medicines",
    settings: "/admin/settings",
  },

  // mainSettings: "/account",
  // mainProfile: "/account/profile",
  // mainChangePwd: "/account/change-password",
  // mainOrders: "/account/orders",
  // mainOrderDetails: (id: string) => `/account/orders/${id}`,
  // mainInvoices: "/account/invoices",
  // mainInvoicesDetails: (id: string) => `/account/invoices/${id}`,
  // mainAddresses: "/account/addresses",

  // ERROR ROUTES
  generalError: "/500",
  notfoundError: "/404",
  maintenanceError: "/503",
  unauthorizedError: "/401",
};

export const routeNames = {
  // MAIN NAME ROUTES
  [baseRoutes.home]: "Home",
  [baseRoutes.account.profile]: "Profile",
  [baseRoutes.account.addresses]: "Addresses",
  [baseRoutes.account.changePwd]: "Change Password",
  [baseRoutes.category]: "Category",
  [baseRoutes.medicineDetailsBase]: "Medicine Details",
  [baseRoutes.checkout]: "Checkout",
  [baseRoutes.checkoutSuccess]: "Order Confirmation",
  
  // AUTHENTICATION NAME ROUTES
  [baseRoutes.admin.dashboard]: "Dashboard",
  [baseRoutes.admin.users]: "Users",
  [baseRoutes.admin.medicines]: "Medicines",
  [baseRoutes.admin.settings]: "Settings",
};

export const routes = {
  ...baseRoutes,
};
