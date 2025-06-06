const baseRoutes = {
  // ROOT ROUTES
  root: "/",

  // AUTHENTICATION ROUTES
  auth: {
    login: "/sign-in",
    register: "/sign-up",
    verifyAccount: (id: string) => `/${id}/verify-account`,
    forgotPassword: "/forgot-password",
    resetPassword: (token: string) => `/store/${token}/reset-password`,
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
      invoiceDetails: (id: string) => `/store/account/invoice/${id}/details`,
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
    invoiceDetails: (id: string) => `/admin/invoice/${id}`,
    settings: {
      root: "/admin/settings",
    }
  },

  deliver: {
    root: "/deliver",
  },

  // ERROR ROUTES
  errors: {
    root: "/errors",
    general: "/500",
    notfound: "/404",
    maintenance: "/503",
    unauthorized: "/401",
    notActive: "/errors/401/not-active",
  },
};

export const routeNames = {
  // AUTH NAME ROUTES
  [baseRoutes.auth.login]: "Đăng nhập",
  [baseRoutes.auth.register]: "Đăng ký",
  [baseRoutes.auth.verifyAccount(":id")]: "Xác thực tài khoản",
  [baseRoutes.auth.forgotPassword]: "Quên mật khẩu",
  
  // MAIN NAME ROUTES
  [baseRoutes.store.root]: "Trang chủ",
  [baseRoutes.store.categories]: "Danh mục",
  [baseRoutes.store.medicines]: "Dược phẩm",
  [baseRoutes.store.checkout]: "Thanh toán",
  [baseRoutes.store.checkoutSuccess(":id")]: "Thanh toán thành công",

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
  [baseRoutes.admin.invoiceDetails(":id")]: "Chi tiết hóa đơn",
  
  // STORE NAME ROUTES
  [baseRoutes.store.account.root]: "Tài khoản",
  [baseRoutes.store.account.addresses]: "Địa chỉ",
  [baseRoutes.store.account.changePwd]: "Đổi mật khẩu",
  [baseRoutes.store.account.cart]: "Giỏ hàng",
  [baseRoutes.store.account.orders]: "Đơn hàng của tôi",
  [baseRoutes.store.account.orderDetails(":id")]: "Chi tiết đơn hàng",
  [baseRoutes.store.account.invoices]: "Hóa đơn của tôi",
  [baseRoutes.store.account.invoiceDetails(":id")]: "Chi tiết hóa đơn",

  // ERROR NAME ROUTES
  [baseRoutes.errors.root]: "Lỗi",
  [baseRoutes.errors.general]: "Lỗi hệ thống",
  [baseRoutes.errors.notfound]: "Không tìm thấy",
  [baseRoutes.errors.maintenance]: "Bảo trì hệ thống",
  [baseRoutes.errors.unauthorized]: "Không có quyền truy cập",
  [baseRoutes.errors.notActive]: "Tài khoản chưa được kích hoạt",
  
  // DELIVER NAME ROUTES
  [baseRoutes.deliver.root]: "Giao hàng",
};

export const routes = {
  ...baseRoutes,
};
