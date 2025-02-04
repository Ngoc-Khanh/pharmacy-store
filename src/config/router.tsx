import { RouteObject } from "react-router-dom";
import { LoginPage } from "@/layouts/auth";
import { routes } from "@/config/routes";

export const reactRouter: RouteObject[] = [
  // AUTHENTICATION PAGES
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.register,
    element: <div>Register Page's</div>,
  },
  {
    path: routes.forgotPassword,
    element: <div>Forgot Password Page's</div>,
  },
]