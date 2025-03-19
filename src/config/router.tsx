import { MainAddressesPage, MainProfilePage } from "@/app/main/account";
import { AccountLayout, MainLayout } from "@/layouts";
import { LoginPage, RegisterPage } from "@/app/auth";
import { RouteObject } from "react-router-dom";
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
            element: <div>Main Invoices Page's</div>,
          },
          {
            path: routes.mainInvoicesDetails(":id"),
            element: <div>Main Invoices Detail's Page</div>,
          },
          {
            path: routes.mainProfile,
            element: <MainProfilePage />,
          },
          {
            path: routes.mainChangePwd,
            element: <div>Main Change Password Page's</div>,
          },
          {
            path: routes.mainOrders,
            element: <div>Main Orders Page's</div>,
          },
          {
            path: routes.mainOrderDetails(":id"),
            element: <div>Main Order Detail's Page</div>,
          },
          {
            path: routes.mainAddresses,
            element: <MainAddressesPage />,
          },
        ]
      }
    ]
  }
]