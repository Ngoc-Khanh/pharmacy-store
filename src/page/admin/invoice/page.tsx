import { invoicesColumns, InvoicesDataTable } from "@/components/table/invoices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config";
import { InvoiceStatus } from "@/data/enum";
import { Invoice } from "@/data/interfaces";
import { InvoiceAPI } from "@/services/api/invoice.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CreditCard, FileText, Clock, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function InvoicesAdminPage() {
  const { data: invoicesList, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: InvoiceAPI.InvoiceList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const invoicesData: Invoice[] = invoicesList || [];

  // Calculate statistics
  const totalInvoices = invoicesData.length;
  
  const paidInvoices = invoicesData.filter(
    (invoice: Invoice) => invoice.status === InvoiceStatus.PAID
  ).length;
  
  const pendingInvoices = invoicesData.filter(
    (invoice: Invoice) => invoice.status === InvoiceStatus.PENDING
  ).length;
  
  // Calculate total revenue (sum of paid invoices)
  const totalRevenue = invoicesData
    .filter((invoice: Invoice) => invoice.status === InvoiceStatus.PAID)
    .reduce((sum: number, invoice: Invoice) => sum + invoice.totalPrice, 0);

  return (
    <>
      <Helmet>
        <title>{`Quản lý hóa đơn | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="flex flex-col gap-6 p-1 md:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-emerald-950 dark:text-emerald-50">
                Quản lý hóa đơn
              </h1>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                Xem và quản lý hóa đơn của khách hàng
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-emerald-100 dark:border-emerald-800/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Tổng số hóa đơn
                </CardTitle>
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
                    {totalInvoices}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-emerald-100 dark:border-emerald-800/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Doanh thu
                </CardTitle>
                <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-7 w-32" />
                ) : (
                  <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-emerald-100 dark:border-emerald-800/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Đã thanh toán
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
                    {paidInvoices}
                    <span className="text-sm font-normal text-emerald-600 dark:text-emerald-400 ml-1">
                      /{totalInvoices}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-emerald-100 dark:border-emerald-800/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Chờ thanh toán
                </CardTitle>
                <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
                    {pendingInvoices}
                    <span className="text-sm font-normal text-emerald-600 dark:text-emerald-400 ml-1">
                      /{totalInvoices}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white/50 dark:bg-slate-950/50 rounded-xl p-4 md:p-6 shadow-sm border border-emerald-50 dark:border-emerald-900/30"
        >
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full max-w-md" />
              <Skeleton className="h-96 w-full" />
            </div>
          ) : (
            <InvoicesDataTable 
              columns={invoicesColumns} 
              data={invoicesData} 
            />
          )}
        </motion.div>
      </div>
    </>
  );
}
