import { routes } from "@/config/routes";
import { AccountLayout, AdminLayout, StoreLayout } from "@/layouts";
import { MedicinesAdminPage, MedicinesDetailPage, UsersAdminPage } from "@/page/admin";
import CategoriesAdminPage from "@/page/admin/categories";
import TestPage from "@/page/admin/categories/test";
import { LoginPage, RegisterPage } from "@/page/auth";
import { CategoriesPage, MedicineDetailsPage, MedicinesPage, OrdersPage, RootPage } from "@/page/store";
import { AddressesPage, CartPage, ChangePasswordPage, RootAccountPage } from "@/page/store/account";

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
    element: <div>Forgot Password Page's</div>,
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
        element: <MedicineDetailsPage />,
      },
      {
        path: routes.store.checkout,
        element: <div>Checkout Page's</div>,
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
            element: <OrdersPage />,
          },
          {
            path: routes.store.account.invoices,
            element: <div>Invoices Page's</div>,
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
        element: <div>Dashboard Page's</div>,
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
        element: <MedicinesDetailPage />,
      },
      {
        path: "/admin/test",
        element: <TestPage />,
      },
      {
        path: routes.admin.settings.root,
        element: <div>Settings Page's</div>,
      }
    ]
  },

  // ERROR ROUTER
  { path: routes.generalError, element: <div>General Error Page's</div> },
  { path: routes.notfoundError, element: <div>Not Found Error Page's</div> },
  { path: routes.maintenanceError, element: <div>Maintenance Error Page's</div> },
  { path: routes.unauthorizedError, element: <div>Unanthorized Error Page's</div> },

  // FALLBACK 404 ROUTER
  { path: "*", element: <div>Not Found Error Page's</div> },

  {
    path: "/test",
    element: <CartPage />,
  }
]