import { routes } from "@/config";
import { AccountLayout, StoreLayout } from "@/layouts";
import { ProfilePage } from "@/pages/account";
import { ForgotPasswordPage, ResetPasswordPage, SignInPage, SignUpPage, VerifyAccountPage } from "@/pages/auth";
import { CategoryPage, RootPage } from "@/pages/store";
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
      { element: <AccountLayout />, children: [
        { path: routes.store.account.root, element: <ProfilePage /> },
        { path: routes.store.account.addresses, element: <div>Addresses</div> },
        { path: routes.store.account.changePwd, element: <div>Password</div> },
        { path: routes.store.account.cart, element: <div>Cart</div> },
        { path: routes.store.account.orders, element: <div>Orders</div> },
        { path: routes.store.account.invoices, element: <div>Invoices</div> },
      ] },
    ]
  },

  // ERROR PAGES
  { path: '*', element: <div>404 Page's</div> },
]