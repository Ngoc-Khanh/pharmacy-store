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
    checkoutSuccess: (id: string) => `/store/checkout/${id}/success`,
    account: {
      settings: "/store/account/settings",
      root: "/store/account",
      addresses: "/store/account/addresses",
      changePwd: "/store/account/change-password",
      cart: "/store/account/cart",
      orders: "/store/account/orders",
      orderDetails: (id: string) => `/store/account/orders/${id}/details`,
      invoices: "/store/account/invoices",
    },
  },

  admin: {
    root: "/admin",
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    categories: "/admin/categories",
    medicines: "/admin/medicines",
    medicineDetails: (id: string) => `/admin/medicines/${id}/details`,
    suppliers: "/admin/suppliers",
    orders: "/admin/orders",
    invoices: "/admin/invoices",
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
  [baseRoutes.store.checkout]: "Thanh toán",
  [baseRoutes.store.checkoutSuccess(":id")]: "Thanh toán thành công",
  [baseRoutes.store.account.orders]: "Đơn hàng của tôi",
  [baseRoutes.store.account.orderDetails(":id")]: "Chi tiết đơn hàng",

  // ADMIN NAME ROUTES
  [baseRoutes.admin.root]: "Admin",
  [baseRoutes.admin.dashboard]: "Bảng điều khiển",
  [baseRoutes.admin.settings.root]: "Cài đặt",
  [baseRoutes.admin.users]: "Quản lý người dùng",
  [baseRoutes.admin.categories]: "Quản lý danh mục",
  [baseRoutes.admin.medicines]: "Quản lý dược phẩm",
  [baseRoutes.admin.medicineDetails(":id")]: "Chi tiết dược phẩm",
  [baseRoutes.admin.suppliers]: "Quản lý nhà cung cấp",
  [baseRoutes.admin.orders]: "Quản lý đơn hàng",
  [baseRoutes.admin.invoices]: "Quản lý hóa đơn",
  
  // STORE NAME ROUTES
  [baseRoutes.store.account.root]: "Tài khoản",
  [baseRoutes.store.account.addresses]: "Địa chỉ",
  [baseRoutes.store.account.changePwd]: "Đổi mật khẩu",
  [baseRoutes.store.account.cart]: "Giỏ hàng",
  [baseRoutes.store.account.orders]: "Đơn hàng của tôi",
  [baseRoutes.store.account.invoices]: "Hóa đơn",
};

export const routes = {
  ...baseRoutes,
};
