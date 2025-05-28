"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config";
import { routeNames, routes } from "@/config/routes";
import { useInvoiceFilter } from "@/hooks/use-invoice-filter";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, Receipt } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { FilteredInvoiceList } from "./filtered.invoice-list";
import { InvoiceErrorState } from "./invoice.error-state";
import { InvoiceFilterBar } from "./invoice.filter-bar";
import { InvoiceLoadingState } from "./invoice.loading-state";
import { InvoiceTabs } from "./invoice.tabs";

export default function InvoicePage() {
  const { data: invoices, isLoading, isError } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => StoreAPI.InvoiceList(),
  });

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredInvoices,
    pendingInvoices,
    paidInvoices,
    cancelledInvoices,
    clearFilters
  } = useInvoiceFilter(invoices);

  return (
    <>
      <Helmet>
        <title>{`${routeNames[routes.store.account.invoices]} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="container py-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Header section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                <Receipt className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">Hóa đơn của bạn</h1>
            </div>
            <p className="text-muted-foreground ml-13 pl-0.5">
              {isLoading ?
                <Skeleton className="h-4 w-40" /> :
                (invoices && invoices.length > 0 ?
                  `Bạn có ${invoices.length} hóa đơn` :
                  'Bạn chưa có hóa đơn nào')}
            </p>
          </div>

          {isLoading ? (
            <InvoiceLoadingState />
          ) : isError ? (
            <InvoiceErrorState />
          ) : !invoices || invoices.length === 0 ? (
            <Card className="border-dashed bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-900/30 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 mb-4">
                  <Receipt className="h-10 w-10" />
                </div>
                <h2 className="mt-2 text-xl font-semibold">Bạn chưa có hóa đơn nào</h2>
                <p className="mt-3 text-center text-muted-foreground max-w-md mx-auto">
                  Lịch sử hóa đơn của bạn sẽ xuất hiện ở đây. Hãy khám phá và mua sắm ngay!
                </p>
                <Button asChild size="lg" className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                  <a href={routes.store.medicines} className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Tiếp tục mua sắm
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <InvoiceFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                clearFilters={clearFilters}
              />

              {searchTerm || statusFilter !== "all" ? (
                <FilteredInvoiceList invoices={filteredInvoices} />
              ) : (
                <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <InvoiceTabs
                      invoices={invoices}
                      pendingInvoices={pendingInvoices}
                      paidInvoices={paidInvoices}
                      cancelledInvoices={cancelledInvoices}
                    />
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}
