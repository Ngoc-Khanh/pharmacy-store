import { routes } from "@/config/routes";
import { AccountLayout, AdminLayout, StoreLayout } from "@/layouts";
import { LoginPage, RegisterPage } from "@/page/auth";
import { RootPage } from "@/page/store";
import { AddressesPage, ChangePasswordPage, RootAccountPage } from "@/page/store/account";
import CategoriesPage from "@/page/store/categories/page";
import MedicinesPage from "@/page/store/medicines";
import MedicineDetailsPage from "@/page/store/medicines/[id]";

import { Navigate, RouteObject } from "react-router-dom";

export const reactRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={routes.store.root} />,
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
        path: routes.admin.settings.root,
        element: <div>Settings Page's</div>,
      }
    ]
  }
]