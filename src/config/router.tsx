import { routes } from "@/config";
import { AccountLayout, StoreLayout } from "@/layouts";
import { AddressesPage, CartPage, ChangePasswordPage, InvoicesPage, OrdersPage, ProfilePage } from "@/pages/account";
import { InvoiceDetailPage, OrderDetailPage } from "@/pages/account/[id]";
import { ForgotPasswordPage, ResetPasswordPage, SignInPage, SignUpPage, VerifyAccountPage } from "@/pages/auth";
import { CategoryPage, CheckoutPage, ConsultationPage, RootPage } from "@/pages/store";
import { CheckoutSuccessfulPage, MedicineDetailPage } from "@/pages/store/[id]";
import { Navigate, RouteObject } from "react-router-dom";

export const reactRouter: RouteObject[] = [
  // ROOT PAGES
  { path: '/', element: <Navigate to={routes.store.root} /> },

  // AUTHENTICATION PAGES
  { path: routes.auth.login, element: <SignInPage /> },
  { path: routes.auth.register, element: <SignUpPage /> },
  { path: routes.auth.verifyAccount(":id"), element: <VerifyAccountPage /> },
  { path: routes.auth.forgotPassword, element: <ForgotPasswordPage /> },
  { path: routes.auth.resetPassword(":token"), element: <ResetPasswordPage /> },

  // STORE PAGES
  {
    element: <StoreLayout />, children: [
      { path: routes.store.root, element: <RootPage /> },
      { path: routes.store.categories, element: <CategoryPage /> },
      { path: routes.store.medicines, element: <div>Medicine</div> },
      { path: routes.store.medicineDetails(":id"), element: <MedicineDetailPage /> },
      { path: routes.store.consultation, element: <ConsultationPage /> },
      { path: routes.store.checkout, element: <CheckoutPage /> },
      { path: routes.store.checkoutSuccess(":id"), element: <CheckoutSuccessfulPage /> },

      { element: <AccountLayout />, children: [
        { path: routes.store.account.root, element: <ProfilePage /> },
        { path: routes.store.account.addresses, element: <AddressesPage /> },
        { path: routes.store.account.changePwd, element: <ChangePasswordPage /> },
        { path: routes.store.account.cart, element: <CartPage /> },
        { path: routes.store.account.orders, element: <OrdersPage /> },
        { path: routes.store.account.orderDetails(":id"), element: <OrderDetailPage /> },
        { path: routes.store.account.invoices, element: <InvoicesPage /> },
        { path: routes.store.account.invoiceDetails(":id"), element: <InvoiceDetailPage /> },
      ] },
    ]
  },

  // ERROR PAGES
  { path: '*', element: <div>404 Page's</div> },
]