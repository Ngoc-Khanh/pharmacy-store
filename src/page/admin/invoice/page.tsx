import { invoicesColumns, InvoicesDataTable } from "@/components/table/invoices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { routeNames, routes, siteConfig } from "@/config";
import { InvoiceStatus } from "@/data/enum";
import { Invoice } from "@/data/interfaces";
import { InvoiceAPI } from "@/services/api/invoice.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  FileText, Clock, CheckCircle2, Ban, ChevronUp, 
  Receipt, DollarSign, ArrowDown, ArrowUpDown, RefreshCw
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { InvoicePrimaryButtons } from "./invoice.primary-buttons";
import InvoicesDialogs from "@/components/dialogs/invoices";

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
  
  const cancelledInvoices = invoicesData.filter(
    (invoice: Invoice) => invoice.status === InvoiceStatus.CANCELLED
  ).length;

  const refundedInvoices = invoicesData.filter(
    (invoice: Invoice) => invoice.status === InvoiceStatus.REFUNDED
  ).length;
  
  // Calculate total revenue (sum of paid invoices)
  const totalRevenue = invoicesData
    .filter((invoice: Invoice) => invoice.status === InvoiceStatus.PAID)
    .reduce((sum: number, invoice: Invoice) => sum + invoice.totalPrice, 0);

  // Calculate average invoice value
  const averageInvoiceValue = totalInvoices > 0 && paidInvoices > 0
    ? totalRevenue / paidInvoices 
    : 0;

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.invoices] || "Quản lý hóa đơn"} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/20 shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-100 dark:bg-emerald-800/30 p-2.5 rounded-lg">
              <Receipt size={28} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300">Quản lý hóa đơn</h2>
          </div>
          <p className="text-emerald-600/90 dark:text-emerald-400/80 ml-[52px]">
            Quản lý hóa đơn và giao dịch tài chính của khách hàng tại Pharmacity Store
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
          {/* Invoice Count Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/20 shadow-md col-span-1"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng số hóa đơn</h3>
              <ArrowUpDown size={16} className="text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {isLoading ? <Skeleton className="h-8 w-16" /> : totalInvoices}
            </p>
            <div className="mt-3 text-xs text-emerald-600/80 dark:text-emerald-500/80 font-medium flex items-center gap-1">
              <ChevronUp size={14} className="text-emerald-500" />
              Tăng 8% so với tháng trước
            </div>
          </motion.div>

          {/* Revenue Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/20 shadow-md col-span-1"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Doanh thu</h3>
              <DollarSign size={16} className="text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                new Intl.NumberFormat('vi-VN', { 
                  style: 'currency', 
                  currency: 'VND',
                  maximumFractionDigits: 0
                }).format(totalRevenue)
              )}
            </p>
            <div className="mt-3 text-xs text-emerald-600/80 dark:text-emerald-500/80 font-medium flex items-center gap-1">
              <ChevronUp size={14} className="text-emerald-500" />
              Tăng 12% so với tháng trước
            </div>
          </motion.div>

          {/* Average Value Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/20 shadow-md col-span-1"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Giá trị trung bình</h3>
              <DollarSign size={16} className="text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {isLoading ? (
                <Skeleton className="h-8 w-28" />
              ) : (
                new Intl.NumberFormat('vi-VN', { 
                  style: 'currency', 
                  currency: 'VND',
                  maximumFractionDigits: 0
                }).format(averageInvoiceValue)
              )}
            </p>
            <div className="mt-3 text-xs text-emerald-600/80 dark:text-emerald-500/80 font-medium flex items-center gap-1">
              <ArrowDown size={14} className="text-emerald-500" />
              Mỗi hóa đơn đã thanh toán
            </div>
          </motion.div>

          {/* Management Card with Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-blue-100 dark:border-blue-800/20 shadow-md col-span-1 md:col-span-1 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="w-full md:w-auto">
              <h3 className="text-base font-medium text-blue-700 dark:text-blue-400">Quản lý hóa đơn</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Tạo và xuất báo cáo hóa đơn
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <InvoicePrimaryButtons />
            </div>
          </motion.div>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          {/* Paid Invoices Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-900/30 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Đã thanh toán</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 bg-green-200/50 dark:bg-green-700/30" />
                  ) : (
                    <>
                      {paidInvoices}
                      <span className="text-sm font-normal text-green-600 dark:text-green-400 ml-1">
                        /{totalInvoices}
                      </span>
                    </>
                  )}
                </div>
                <div className="w-full bg-green-100 dark:bg-green-950/50 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-500 dark:bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${totalInvoices ? (paidInvoices / totalInvoices) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-green-600/90 dark:text-green-400/90 mt-2">
                  <span className="font-medium">{Math.round((paidInvoices / (totalInvoices || 1)) * 100)}%</span> hóa đơn đã thanh toán
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Invoices Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100 dark:from-amber-950/30 dark:to-yellow-950/30 dark:border-amber-900/30 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-300">Chờ thanh toán</CardTitle>
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-800 dark:text-amber-300">
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 bg-amber-200/50 dark:bg-amber-700/30" />
                  ) : (
                    <>
                      {pendingInvoices}
                      <span className="text-sm font-normal text-amber-600 dark:text-amber-400 ml-1">
                        /{totalInvoices}
                      </span>
                    </>
                  )}
                </div>
                <div className="w-full bg-amber-100 dark:bg-amber-950/50 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-amber-500 dark:bg-amber-500 h-1.5 rounded-full"
                    style={{ width: `${totalInvoices ? (pendingInvoices / totalInvoices) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-amber-600/90 dark:text-amber-400/90 mt-2">
                  <span className="font-medium">{Math.round((pendingInvoices / (totalInvoices || 1)) * 100)}%</span> hóa đơn đang chờ thanh toán
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cancelled Invoices Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-rose-50 to-red-50 border-rose-100 dark:from-rose-950/30 dark:to-red-950/30 dark:border-rose-900/30 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-rose-800 dark:text-rose-300">Đã hủy</CardTitle>
                <Ban className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-800 dark:text-rose-300">
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 bg-rose-200/50 dark:bg-rose-700/30" />
                  ) : (
                    <>
                      {cancelledInvoices}
                      <span className="text-sm font-normal text-rose-600 dark:text-rose-400 ml-1">
                        /{totalInvoices}
                      </span>
                    </>
                  )}
                </div>
                <div className="w-full bg-rose-100 dark:bg-rose-950/50 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-rose-500 dark:bg-rose-500 h-1.5 rounded-full"
                    style={{ width: `${totalInvoices ? (cancelledInvoices / totalInvoices) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-rose-600/90 dark:text-rose-400/90 mt-2">
                  <span className="font-medium">{Math.round((cancelledInvoices / (totalInvoices || 1)) * 100)}%</span> hóa đơn đã bị hủy
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Refunded Invoices Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100 dark:from-blue-950/30 dark:to-sky-950/30 dark:border-blue-900/30 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-300">Đã hoàn tiền</CardTitle>
                <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 bg-blue-200/50 dark:bg-blue-700/30" />
                  ) : (
                    <>
                      {refundedInvoices}
                      <span className="text-sm font-normal text-blue-600 dark:text-blue-400 ml-1">
                        /{totalInvoices}
                      </span>
                    </>
                  )}
                </div>
                <div className="w-full bg-blue-100 dark:bg-blue-950/50 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-blue-500 dark:bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${totalInvoices ? (refundedInvoices / totalInvoices) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600/90 dark:text-blue-400/90 mt-2">
                  <span className="font-medium">{Math.round((refundedInvoices / (totalInvoices || 1)) * 100)}%</span> hóa đơn đã hoàn tiền
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Table Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="flex items-center gap-2"
          >
            <div className="bg-emerald-100/50 dark:bg-emerald-900/30 p-1.5 rounded-full">
              <FileText size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Danh sách hóa đơn</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Quản lý và theo dõi tất cả giao dịch thanh toán</p>
            </div>
          </motion.div>
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900/30"
        >
          {isLoading ? (
            <div className="p-6 space-y-6">
              <Skeleton className="h-10 w-full max-w-md" />
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          ) : (
            <div className="p-4 md:p-6">
              <InvoicesDataTable
                columns={invoicesColumns}
                data={invoicesData}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Invoice Dialogs */}
      <InvoicesDialogs />
    </div>
  );
}
