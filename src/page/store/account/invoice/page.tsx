"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config";
import { routeNames, routes } from "@/config/routes";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { Invoice } from "@/data/interfaces/invoice.interface";
import { formatCurrency } from "@/lib/utils";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertCircle, CalendarIcon, ChevronLeft, ClipboardList, CreditCard, FileCheck, FileClock, FileX, FilterIcon, LucideIcon, Receipt, Search, X } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// Function to format payment method
const formatPaymentMethod = (method: PaymentMethod) => {
  switch (method) {
    case PaymentMethod.CREDIT_CARD:
      return "Thẻ tín dụng";
    case PaymentMethod.BANK_TRANSFER:
      return "Chuyển khoản";
    case PaymentMethod.COD:
      return "Thanh toán khi nhận hàng";
    default:
      return "Khác";
  }
};

// Custom invoice card component that resembles order card
const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800/40 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100 dark:border-emerald-800/30 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center shadow-sm">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Hóa đơn #{invoice.invoiceNumber}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                  {new Date(invoice.issuedAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <Badge className={`px-3 py-1.5 rounded-full text-xs font-medium 
            ${invoice.status === InvoiceStatus.PAID 
              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800/50 hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/60 dark:hover:text-green-300" 
              : invoice.status === InvoiceStatus.PENDING 
                ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50 hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900/60 dark:hover:text-amber-300" 
                : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50 hover:bg-rose-100 hover:text-rose-800 dark:hover:bg-rose-900/60 dark:hover:text-rose-300"}`
          }>
            {invoice.status === InvoiceStatus.PAID 
              ? <><FileCheck className="w-3 h-3 mr-1" /> Đã thanh toán</> 
              : invoice.status === InvoiceStatus.PENDING 
                ? <><FileClock className="w-3 h-3 mr-1" /> Chờ thanh toán</> 
                : <><FileX className="w-3 h-3 mr-1" /> Đã hủy</>}
          </Badge>
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-gradient-to-b from-emerald-400 to-cyan-400 dark:from-emerald-500 dark:to-cyan-500 rounded-full"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Tổng cộng</h4>
                <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(invoice.totalPrice)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm">{formatPaymentMethod(invoice.paymentMethod)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-indigo-400 dark:from-blue-500 dark:to-indigo-500 rounded-full"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Số sản phẩm</h4>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">{invoice.items.length} sản phẩm</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.orderId ? `Đơn hàng #${invoice.orderId.slice(-6)}` : 'Mua trực tiếp'}
            </span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-emerald-100/60 dark:border-emerald-900/40 flex justify-end gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-800/50 dark:text-emerald-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300"
            asChild
          >
            <Link to={routes.store.account.invoiceDetails(invoice.id)}>
              <Search className="mr-1.5 h-3.5 w-3.5" />
              Xem chi tiết
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function InvoicePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: invoices, isLoading, isError } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => StoreAPI.InvoiceList(),
  });

  // Lọc hóa đơn theo từ khóa tìm kiếm và trạng thái
  const filteredInvoices = invoices?.filter(invoice => {
    const matchesSearch = searchTerm === "" ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Nhóm hóa đơn theo trạng thái
  const pendingInvoices = invoices?.filter(i => i.status === InvoiceStatus.PENDING);
  const paidInvoices = invoices?.filter(i => i.status === InvoiceStatus.PAID);
  const cancelledInvoices = invoices?.filter(i => i.status === InvoiceStatus.CANCELLED);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Invoice Skeleton Loader Component
  const InvoiceCardSkeleton = () => (
    <Card className="overflow-hidden border border-emerald-100 dark:border-emerald-800/30 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 bg-emerald-100/60 dark:bg-emerald-900/30" />
                <Skeleton className="h-4 w-40 bg-emerald-100/60 dark:bg-emerald-900/30" />
              </div>
            </div>
          </div>
          <Skeleton className="h-7 w-28 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30" />
        </div>
        
        <div className="mt-6 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-2 rounded-md bg-emerald-100/60 dark:bg-emerald-900/30" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40 bg-emerald-100/60 dark:bg-emerald-900/30" />
                  <Skeleton className="h-3 w-20 bg-emerald-100/60 dark:bg-emerald-900/30" />
                </div>
              </div>
              <Skeleton className="h-5 w-24 bg-emerald-100/60 dark:bg-emerald-900/30" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-emerald-100/60 dark:border-emerald-900/40 flex justify-end gap-3">
          <Skeleton className="h-9 w-28 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30" />
        </div>
      </div>
    </Card>
  );

  // EmptyInvoicesState Component
  const EmptyInvoicesState = ({ title, description, icon: Icon }: { title: string, description: string, icon: LucideIcon }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-4"
    >
      <div className="mx-auto w-20 h-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
        <Icon className="w-10 h-10" />
      </div>
      <h2 className="mt-2 text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-center text-muted-foreground max-w-md mx-auto">{description}</p>
      <Button 
        asChild
        size="lg" 
        className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
      >
        <a href={routes.store.medicines} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Tiếp tục mua sắm
        </a>
      </Button>
    </motion.div>
  );

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
            // Loading state
            <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-40" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-5 p-4">
                  {[1, 2, 3].map((i) => (
                    <InvoiceCardSkeleton key={i} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : isError ? (
            <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="mx-auto w-20 h-20 bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-10 w-10" />
                </div>
                <h2 className="mt-2 text-xl font-semibold">Không thể tải hóa đơn</h2>
                <p className="mt-3 text-center text-muted-foreground max-w-md mx-auto">Có lỗi xảy ra khi tải danh sách hóa đơn. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
                <Button className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" onClick={() => window.location.reload()}>
                  Thử lại
                </Button>
              </CardContent>
            </Card>
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
              <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm hóa đơn..."
                    className="pl-9 w-full focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400 border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900/50 dark:placeholder:text-gray-500 bg-white/80 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      onClick={() => setSearchTerm("")}
                    >
                      <span className="sr-only">Clear</span>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-3 items-center">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[200px] focus:ring-emerald-500 dark:focus:ring-emerald-400 border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900/50 bg-white/80 shadow-sm">
                      <div className="flex items-center gap-2">
                        <FilterIcon className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                        <SelectValue placeholder="Lọc theo trạng thái" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-emerald-100 dark:border-emerald-900/50 dark:bg-gray-900">
                      <SelectItem value="all">Tất cả hóa đơn</SelectItem>
                      <SelectItem value={InvoiceStatus.PENDING}>Chờ thanh toán</SelectItem>
                      <SelectItem value={InvoiceStatus.PAID}>Đã thanh toán</SelectItem>
                      <SelectItem value={InvoiceStatus.CANCELLED}>Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {(searchTerm || statusFilter !== "all") && (
                    <Button 
                      className="border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                    >
                      <FilterIcon className="w-4 h-4 mr-2" /> Xóa bộ lọc
                    </Button>
                  )}
                </div>
              </div>

              {searchTerm || statusFilter !== "all" ? (
                <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Hóa đơn đã lọc
                      {filteredInvoices && filteredInvoices.length > 0 && (
                        <Badge variant="outline" className="ml-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/40 dark:text-emerald-400 dark:hover:text-emerald-300 dark:border-emerald-800/40 dark:hover:border-emerald-700/60 transition-colors duration-200">
                          {filteredInvoices.length}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-25rem)] pr-0">
                      <div className="divide-y divide-emerald-100 dark:divide-emerald-800/30">
                        {filteredInvoices && filteredInvoices.length > 0 ? (
                          filteredInvoices.map((invoice) => (
                            <InvoiceCard key={invoice.id} invoice={invoice} />
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <div className="mx-auto w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
                              <ClipboardList className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Không tìm thấy hóa đơn nào</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">Không có hóa đơn nào phù hợp với bộ lọc hiện tại.</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-t border-emerald-100 dark:border-emerald-800/30">
                    <Button variant="outline" asChild className="border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-800/30">
                      <a href={routes.store.medicines} className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Tiếp tục mua sắm
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="border-emerald-100 dark:border-emerald-800/30 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-b border-emerald-100 dark:border-emerald-800/30">
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Hóa đơn của bạn
                      <Badge variant="outline" className="ml-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/40 dark:text-emerald-400 dark:hover:text-emerald-300 dark:border-emerald-800/40 dark:hover:border-emerald-700/60 transition-colors duration-200">
                        {invoices.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="all" className="w-full">
                      <div className="p-4 pt-6 pb-0 bg-gradient-to-r from-emerald-50/70 to-emerald-50/50 dark:from-emerald-950/30 dark:to-emerald-950/20 border-b border-emerald-100/80 dark:border-emerald-900/30 overflow-hidden">
                        <TabsList className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full max-w-3xl mx-auto bg-white/60 dark:bg-gray-800/40 p-1 sm:p-1.5 rounded-xl shadow-sm border border-emerald-100/80 dark:border-emerald-900/30">
                          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 dark:data-[state=active]:from-emerald-500 dark:data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                            <span className="flex items-center justify-center gap-1.5">
                              <Receipt className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline text-xs sm:text-sm">Tất cả</span>
                            </span>
                          </TabsTrigger>
                          <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-500 dark:data-[state=active]:from-amber-500 dark:data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                            <span className="flex items-center justify-center gap-1.5">
                              <FileClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline text-xs sm:text-sm">Chờ thanh toán</span>
                            </span>
                            {pendingInvoices && pendingInvoices.length > 0 && (
                              <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-amber-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 shadow-sm dark:shadow-none transition-colors duration-200">
                                {pendingInvoices.length}
                              </Badge>
                            )}
                          </TabsTrigger>
                          <TabsTrigger value="paid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 dark:data-[state=active]:from-emerald-500 dark:data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                            <span className="flex items-center justify-center gap-1.5">
                              <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline text-xs sm:text-sm">Đã thanh toán</span>
                            </span>
                            {paidInvoices && paidInvoices.length > 0 && (
                              <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 shadow-sm dark:shadow-none transition-colors duration-200">
                                {paidInvoices.length}
                              </Badge>
                            )}
                          </TabsTrigger>
                          <TabsTrigger value="cancelled" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-500 dark:data-[state=active]:from-red-500 dark:data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 font-medium py-1.5">
                            <span className="flex items-center justify-center gap-1.5">
                              <FileX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline text-xs sm:text-sm">Đã hủy</span>
                            </span>
                            {cancelledInvoices && cancelledInvoices.length > 0 && (
                              <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0 min-w-4 flex items-center justify-center bg-white hover:bg-rose-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-red-700 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 shadow-sm dark:shadow-none transition-colors duration-200">
                                {cancelledInvoices.length}
                              </Badge>
                            )}
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <ScrollArea className="h-[calc(100vh-25rem)] pr-0">
                        <div className="p-4">
                          <TabsContent value="all" className="space-y-4 mt-2">
                            <motion.div variants={container} initial="hidden" animate="show">
                              {invoices && invoices.length > 0 ? (
                                invoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
                              ) : (
                                <EmptyInvoicesState 
                                  title="Chưa có hóa đơn nào"
                                  description="Lịch sử hóa đơn của bạn sẽ xuất hiện ở đây. Hãy khám phá và mua sắm ngay!"
                                  icon={Receipt}
                                />
                              )}
                            </motion.div>
                          </TabsContent>
                          
                          <TabsContent value="pending" className="space-y-4 mt-2">
                            <motion.div variants={container} initial="hidden" animate="show">
                              {pendingInvoices && pendingInvoices.length > 0 ? (
                                pendingInvoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
                              ) : (
                                <EmptyInvoicesState 
                                  title="Không có hóa đơn chờ thanh toán"
                                  description="Các hóa đơn đang chờ thanh toán sẽ xuất hiện ở đây"
                                  icon={FileClock}
                                />
                              )}
                            </motion.div>
                          </TabsContent>
                          
                          <TabsContent value="paid" className="space-y-4 mt-2">
                            <motion.div variants={container} initial="hidden" animate="show">
                              {paidInvoices && paidInvoices.length > 0 ? (
                                paidInvoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
                              ) : (
                                <EmptyInvoicesState 
                                  title="Không có hóa đơn đã thanh toán"
                                  description="Hóa đơn đã thanh toán sẽ xuất hiện ở đây"
                                  icon={FileCheck}
                                />
                              )}
                            </motion.div>
                          </TabsContent>
                          
                          <TabsContent value="cancelled" className="space-y-4 mt-2">
                            <motion.div variants={container} initial="hidden" animate="show">
                              {cancelledInvoices && cancelledInvoices.length > 0 ? (
                                cancelledInvoices.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} />)
                              ) : (
                                <EmptyInvoicesState 
                                  title="Không có hóa đơn đã hủy"
                                  description="Hóa đơn đã hủy sẽ xuất hiện ở đây"
                                  icon={FileX}
                                />
                              )}
                            </motion.div>
                          </TabsContent>
                        </div>
                      </ScrollArea>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-t border-emerald-100 dark:border-emerald-800/30">
                    <Button variant="outline" asChild className="border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-800/30">
                      <a href={routes.store.medicines} className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Tiếp tục mua sắm
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}
