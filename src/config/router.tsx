import { RouteObject } from "react-router-dom";
import { routes } from "@/config/routes";
import { LoginPage, RegisterPage } from "@/page/auth";

export const reactRouter: RouteObject[] = [
  // AUTHENTICATION PAGES
  {
    path: routes.auth.login,
    element: <LoginPage />,
  },
  {
    path: routes.auth.register,
    element: <RegisterPage />,
  },
  {
    path: routes.auth.forgotPassword,
    element: <div>Forgot Password Page's</div>,
  },
]