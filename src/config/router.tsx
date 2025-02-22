import { ChangePasswordPage, HomePage, ProductPage, ProfilePage, InvoicesPage } from "@/page/main";
import { AdminLayout, MainLayout, AccountLayout } from "@/layouts";
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

  // MAIN PAGES
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: routes.home,
        element: <HomePage />,
      },
      {
        path: routes.products,
        element: <ProductPage />,
      },
      {
        path: routes.details(":id"),
        element: <div>Product Detail's Page</div>,
      },
      {
        element: <AccountLayout />,
        children: [
          {
            path: routes.mainSettings,
            element: <div>Main Settings Page's</div>,
          },
          {
            path: routes.mainInvoices,
            element: <InvoicesPage />,
          },
          {
            path: routes.mainInvoicesDetails(":id"),
            element: <div>Main Invoices Detail's Page</div>,
          },
          {
            path: routes.mainProfile,
            element: <ProfilePage />,
          },
          {
            path: routes.mainChangePwd,
            element: <ChangePasswordPage />,
          },
          {
            path: routes.mainOrders,
            element: <div>Main Orders Page's</div>,
          },
          {
            path: routes.mainOrderDetails(":id"),
            element: <div>Main Order Detail's Page</div>,
          },
        ],
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