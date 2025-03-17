import { LoginPage, RegisterPage } from "@/app/auth";
import { RouteObject } from "react-router-dom";
import { MainLayout } from "@/layouts/main";
import { routes } from "@/config/routes";

export const reactRouter: RouteObject[] = [
  // AUTHENTICATION PAGES
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.register,
    element: <RegisterPage />,
  },
  {
    path: routes.forgotPassword,
    element: <div>Forgot Password Page's</div>,
  },

  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: routes.home,
        element: <div>Home Page's</div>,
      }
    ]
  }
]