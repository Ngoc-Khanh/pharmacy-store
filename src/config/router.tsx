import { routes } from "@/config/routes";
import { AccountLayout, AdminLayout, StoreLayout } from "@/layouts";
import { DashboardAdminPage, InvoicesAdminPage, MedicinesAdminDetailPage, MedicinesAdminPage, OrdersAdminPage, SuppliersAdminPage, UsersAdminPage } from "@/page/admin";
import CategoriesAdminPage from "@/page/admin/categories";
import TestPage from "@/page/admin/dashboard/test";
import { InvoiceDetailsPage } from "@/page/admin/invoice";
import { ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage, VerifyAccountPage } from "@/page/auth";
import ComingSoonPage from "@/page/coming-soon";
import DeliverPage from "@/page/deliver";
import { NotActivePage } from "@/page/error";
import { CategoriesPage, CheckoutPage, CheckoutSuccessPage, MedicinesDetailPage, MedicinesPage, RootPage } from "@/page/store";
import { AddressesPage, CartPage, ChangePasswordPage, InvoicePage, OrderDetailsPage, OrderPage, RootAccountPage, InvoiceDetailsPage as StoreInvoiceDetailsPage } from "@/page/store/account";

import { Navigate, RouteObject } from "react-router-dom";

export const reactRouter: RouteObject[] = [
  {
    path: routes.root,
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
    path: routes.auth.verifyAccount(":id"),
    element: <VerifyAccountPage />,
  },
  {
    path: routes.auth.forgotPassword,
    element: <ForgotPasswordPage />,
  },
  {
    path: routes.auth.resetPassword(":token"),
    element: <ResetPasswordPage />,
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
            element: <OrderDetailsPage />,
          },
          {
            path: routes.store.account.invoices,
            element: <InvoicePage />,
          },
          {
            path: routes.store.account.invoiceDetails(":id"),
            element: <StoreInvoiceDetailsPage />,
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
        element: <DashboardAdminPage />,
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
        element: <InvoicesAdminPage />,
      },
      {
        path: routes.admin.invoiceDetails(":id"),
        element: <InvoiceDetailsPage />,
      },
      {
        path: "/admin/test",
        element: <TestPage />,
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
  { path: routes.errors.general, element: <div>General Error Page's</div> },
  { path: routes.errors.notfound, element: <div>Not Found Error Page's</div> },
  { path: routes.errors.maintenance, element: <div>Maintenance Error Page's</div> },
  { path: routes.errors.notActive, element: <NotActivePage /> },

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