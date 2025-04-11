import { MainAddressesPage, MainChangePwdPage, MainProfilePage } from "@/app/main/account";
import { CheckoutPage, CheckoutSuccessPage } from "@/app/main/checkout";
import { AccountLayout, AdminLayout, MainLayout } from "@/layouts";
import { MedicineDetailsPage } from "@/app/main/medicine";
import { LoginPage, RegisterPage } from "@/app/auth";
import CategoryPage from "@/app/main/category";
import { RouteObject } from "react-router-dom";
import { routes } from "@/config/routes";
import HomePage from "@/app/main/home";

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
        element: <HomePage />,
      },
      {
        path: routes.category,
        element: <CategoryPage />,
      },
      {
        path: routes.medicineDetails(":id"),
        element: <MedicineDetailsPage />,
      },
      {
        path: routes.checkout,
        element: <CheckoutPage />,
      },
      {
        path: routes.checkoutSuccess,
        element: <CheckoutSuccessPage />,
      },
      {
        element: <AccountLayout />,
        children: [
          {
            path: routes.account.main,
            element: <div>Main Settings Page's</div>,
          },
          {
            path: routes.account.invoices,
            element: <div>Main Invoices Page's</div>,
          },
          {
            path: routes.account.invoicesDetails(":id"),
            element: <div>Main Invoices Detail's Page</div>,
          },
          {
            path: routes.account.profile,
            element: <MainProfilePage />,
          },
          {
            path: routes.account.changePwd,
            element: <MainChangePwdPage />,
          },
          {
            path: routes.account.orders,
            element: <div>Main Orders Page's</div>,
          },
          {
            path: routes.account.orderDetails(":id"),
            element: <div>Main Order Detail's Page</div>,
          },
          {
            path: routes.account.addresses,
            element: <MainAddressesPage />,
          },
        ]
      }
    ]
  },

  {
    element: <AdminLayout />,
    children: [
      {
        index: true,
        path: routes.admin.dashboard,
        element: <div>Admin Dashboard Page's</div>,
      }
    ]
  }
]