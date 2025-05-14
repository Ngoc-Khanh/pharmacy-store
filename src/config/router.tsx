import { LoginPage, RegisterPage } from "@/page/auth";
import { AdminLayout, StoreLayout } from "@/layouts";
import { RouteObject } from "react-router-dom";
import { routes } from "@/config/routes";

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
  
  {
    element: <StoreLayout />,
    children: [
      {
        path: routes.store.root,
        element: <div>Store Page's</div>,
      }
    ]
  },

  // ADMIN PAGES
  {
    element: <AdminLayout />,
    children: [
      {
        path: routes.admin.dashboard,
        element: <div>Dashboard Page's</div>,
      }
    ]
  }
]