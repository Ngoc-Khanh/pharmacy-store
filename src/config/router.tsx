import { RouteObject } from "react-router-dom";
import { routes } from "@/config/routes";
import { LoginPage } from "@/page/auth";

export const reactRouter: RouteObject[] = [
  // AUTHENTICATION PAGES
  {
    path: routes.auth.login,
    element: <LoginPage />,
  },
  {
    path: routes.auth.register,
    element: <div>Register Page's</div>,
  },
  {
    path: routes.auth.forgotPassword,
    element: <div>Forgot Password Page's</div>,
  },
]