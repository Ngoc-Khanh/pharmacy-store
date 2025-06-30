import { routes } from "@/config/routes";
import { StoreLayout } from "@/layouts";
import { SignInPage } from "@/pages/auth";
import { Navigate, RouteObject } from "react-router-dom";

export const reactRouter: RouteObject[] = [
  // ROOT PAGES
  { path: '/', element: <Navigate to={routes.store.root} /> },

  // AUTHENTICATION PAGES
  { path: routes.auth.login, element: <SignInPage /> },
  { path: routes.auth.register, element: <div>Register Page's</div> },
  { path: routes.auth.forgotPassword, element: <div>Forgot Password Page's</div> },

  // STORE PAGES
  {
    element: <StoreLayout />, children: [
      { path: routes.store.root, element: <div>Store Home Page's</div> },
    ]
  },

  // ERROR PAGES
  { path: '*', element: <div>404 Page's</div> },
]