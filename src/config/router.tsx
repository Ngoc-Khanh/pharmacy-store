import { RouteObject } from "react-router-dom";
import { routes } from "@/config/routes";

export const reactRouter: RouteObject[] = [
  // AUTHENTICATION PAGES
  {
    path: routes.login,
    element: <div>Login Page's</div>,
  },
  {
    path: routes.register,
    element: <div>Register Page's</div>,
  },
  {
    path: routes.forgotPassword,
    element: <div>Forgot Password Page's</div>,
  },

  {
    path: routes.home,
    element: <div>Home Page's</div>,
  }
]