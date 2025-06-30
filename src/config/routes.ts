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
    consultation: "/store/consultation",
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
  [baseRoutes.store.consultation]: "Tư vấn thuốc AI",
  [baseRoutes.store.checkout]: "Thanh toán",
  [baseRoutes.store.checkoutSuccess(":id")]: "Thanh toán thành công",

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
};

export const routes = {
  ...baseRoutes,
};
