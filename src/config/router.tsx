import { routes } from "@/config/routes";
import { AccountLayout, AdminLayout, StoreLayout } from "@/layouts";
import { MedicinesAdminDetailPage, MedicinesAdminPage, OrdersAdminPage, SuppliersAdminPage, UsersAdminPage } from "@/page/admin";
import CategoriesAdminPage from "@/page/admin/categories";
import { LoginPage, RegisterPage } from "@/page/auth";
import ComingSoonPage from "@/page/coming-soon";
import DeliverPage from "@/page/deliver";
import { CategoriesPage, CheckoutPage, CheckoutSuccessPage, MedicinesDetailPage, MedicinesPage, RootPage } from "@/page/store";
import { AddressesPage, CartPage, ChangePasswordPage, InvoiceDetailsPage, InvoicePage, OrderPage, RootAccountPage } from "@/page/store/account";
import { OrderDetails } from "@/page/store/account/order";

import { Navigate, RouteObject } from "react-router-dom";

export const reactRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={routes.store.root} />,
  },
  {
    path: routes.admin.root,
    element: <Navigate to={routes.admin.dashboard} />,
  },
  {
    path: routes.store.account.settings,
    element: <Navigate to={routes.store.account.root} />,
  },
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
    element: <div>Forgot Password</div>,
  },

  {
    element: <StoreLayout />,
    children: [
      {
        path: routes.store.root,
        element: <RootPage />,
      },
      {
        path: routes.store.categories,
        element: <CategoriesPage />,
      },
      {
        path: routes.store.medicines,
        element: <MedicinesPage />,
      },
      {
        path: routes.store.medicineDetails(":id"),
        element: <MedicinesDetailPage />,
      },
      {
        path: routes.store.checkout,
        element: <CheckoutPage />,
      },
      {
        path: routes.store.checkoutSuccess(":id"),
        element: <CheckoutSuccessPage />,
      },
      {
        element: <AccountLayout />,
        children: [
          {
            path: routes.store.account.root,
            element: <RootAccountPage />,
          },
          {
            path: routes.store.account.addresses,
            element: <AddressesPage />,
          },
          {
            path: routes.store.account.changePwd,
            element: <ChangePasswordPage />,
          },
          {
            path: routes.store.account.cart,
            element: <CartPage />,
          },
          {
            path: routes.store.account.orders,
            element: <OrderPage />,
          },
          {
            path: routes.store.account.orderDetails(":id"),
            element: <OrderDetails />,
          },
          {
            path: routes.store.account.invoices,
            element: <InvoicePage />,
          },
          {
            path: routes.store.account.invoiceDetails(":id"),
            element: <InvoiceDetailsPage />,
          }
        ]
      }
    ]
  },

  // ADMIN PAGES
  {
    element: <AdminLayout />,
    children: [
      {
        path: routes.admin.dashboard,
        element: <div>Dashboard</div>,
      },
      {
        path: routes.admin.users,
        element: <UsersAdminPage />,
      },
      {
        path: routes.admin.categories,
        element: <CategoriesAdminPage />,
      },
      {
        path: routes.admin.medicines,
        element: <MedicinesAdminPage />,
      },
      {
        path: routes.admin.medicineDetails(":id"),
        element: <MedicinesAdminDetailPage />,
      },
      {
        path: routes.admin.suppliers,
        element: <SuppliersAdminPage />,
      },
      {
        path: routes.admin.orders,
        element: <OrdersAdminPage />,
      },
      {
        path: routes.admin.invoices,
        element: <div>Invoices</div>,
      },
      {
        path: "/admin/test",
        element: <div>Test</div>,
      },
      {
        path: routes.admin.settings.root,
        element: <div>Settings</div>,
      }
    ]
  },

  // DELIVER PAGES
  {
    path: routes.deliver.root,
    element: <DeliverPage />,
  },

  // ERROR ROUTER
  { path: routes.generalError, element: <div>General Error Page's</div> },
  { path: routes.notfoundError, element: <div>Not Found Error Page's</div> },
  { path: routes.maintenanceError, element: <div>Maintenance Error Page's</div> },
  { path: routes.unauthorizedError, element: <div>Unanthorized Error Page's</div> },

  // FALLBACK 404 ROUTER
  { path: "*", element: <div>Not Found Error Page's</div> },

  {
    path: "/coming-soon",
    element: <ComingSoonPage />,
  },

  {
    path: "/test",
    element: <CartPage />,
  }
]