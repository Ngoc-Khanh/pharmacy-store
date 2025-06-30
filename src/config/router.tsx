import { routes } from "@/config";
import { StoreLayout } from "@/layouts";
import { ForgotPasswordPage, ResetPasswordPage, SignInPage, SignUpPage, VerifyAccountPage } from "@/pages/auth";
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
      { path: routes.store.root, element: <div>Store Home Page's</div> },
    ]
  },

  // ERROR PAGES
  { path: '*', element: <div>404 Page's</div> },
]