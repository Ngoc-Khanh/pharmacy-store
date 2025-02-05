import { RouteObject } from "react-router-dom";
import { LoginPage } from "@/layouts/auth";
import { routes } from "@/config/routes";
import MainLayout from "@/layouts/main";
import AdminLayout from "@/layouts/admin";

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

  // MAIN PAGES
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: routes.home,
        element: <div>Home's Page</div>,
      },
    ],
  },

  // ADMIN PAGES
  {
    element: <AdminLayout />,
    children: [
      {
        index: true,
        path: routes.adminDashboard,
        element: <div>Admin Dashboard's Page</div>,
      },
    ],
  },
]