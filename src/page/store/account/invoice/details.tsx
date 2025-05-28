"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { routes, siteConfig } from "@/config";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { InvoiceDetails, InvoiceDetailsItem } from "@/data/interfaces";
import { cn, formatCurrency } from "@/lib/utils";
import { StoreAPI } from "@/services/api/store.api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ArrowLeft, 
  BadgeCheck, 
  Calendar, 
  Clipboard, 
  FileDown, 
  Info, 
  Package, 
  Pill, 
  Receipt, 
  ShieldCheck, 
  Truck
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function InvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: invoice, isLoading, error } = useQuery<InvoiceDetails>({
    queryKey: ['invoice', id],
    queryFn: () => StoreAPI.InvoiceDetails(id || ''),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case InvoiceStatus.PENDING:
        return "bg-amber-100 text-amber-700 border-amber-200";
      case InvoiceStatus.CANCELLED:
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusLabel = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return "Đã thanh toán";
      case InvoiceStatus.PENDING:
        return "Chờ thanh toán";
      case InvoiceStatus.CANCELLED:
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
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

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return (
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
        );
      case PaymentMethod.BANK_TRANSFER:
        return (
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
          </svg>
        );
      case PaymentMethod.COD:
        return (
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
        );
      default:
        return <Receipt className="h-5 w-5 mr-2" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM, yyyy 'lúc' HH:mm", { locale: vi });
    } catch {
      return dateString;
    }
  };

  const downloadInvoice = () => {
    if (!invoice) return;
    toast.success(`Hóa đơn ${invoice.invoiceNumber} đang được tải xuống.`);
    // Implement actual download functionality here
  };

  const goBack = () => {
    navigate(routes.store.account.invoices);
  };

  // Animation variants
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="py-8 px-4 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            className="mr-4 rounded-full p-2 h-9 w-9"
            onClick={goBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-[600px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="py-8 px-4 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            className="mr-4 rounded-full p-2 h-9 w-9 hover:bg-rose-50 text-rose-600"
            onClick={goBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Chi Tiết Hóa Đơn</h1>
        </div>
        <Card className="shadow-lg border-0 rounded-xl bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 to-rose-400"></div>
          <CardContent className="p-10 text-center">
            <div className="rounded-full bg-rose-100 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <Info className="h-8 w-8 text-rose-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Đã xảy ra lỗi
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{error instanceof Error ? error.message : "Không thể tải thông tin hóa đơn"}</p>
            <Button
              className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-2 rounded-full"
              onClick={goBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Hóa đơn #${invoice.invoiceNumber} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="py-8 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex items-center"
        >
          <Button
            variant="ghost"
            className="mr-4 rounded-full p-2 h-10 w-10 hover:bg-teal-50 text-teal-600 shadow-sm"
            onClick={goBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <div className="mr-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full h-12 w-12 flex items-center justify-center text-white shadow-md">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chi Tiết Hóa Đơn</h1>
              <p className="text-sm font-medium text-teal-600">#{invoice.invoiceNumber}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Invoice Summary */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="md:col-span-1 space-y-6"
          >
            <Card className="shadow-md border-0 rounded-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400"></div>
              <CardHeader className="bg-gradient-to-b from-teal-50 to-white border-b border-teal-100 pb-4 pt-5">
                <div className="flex items-center">
                  <div className="bg-white rounded-full p-2 shadow-sm mr-3">
                    <Receipt className="h-5 w-5 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-teal-800">Thông Tin Hóa Đơn</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-medium text-gray-500 mb-1">Mã hóa đơn</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">#{invoice.invoiceNumber}</p>
                    <Badge
                      className={cn(
                        "font-medium px-3 py-1.5 text-sm rounded-full shadow-sm",
                        getStatusColor(invoice.status),
                        invoice.status === InvoiceStatus.PAID ? "hover:bg-emerald-50 hover:text-emerald-700" : 
                        invoice.status === InvoiceStatus.PENDING ? "hover:bg-amber-50 hover:text-amber-700" :
                        "hover:bg-rose-50 hover:text-rose-700"
                      )}
                    >
                      {getStatusLabel(invoice.status)}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Mã đơn hàng</p>
                  <div className="flex items-center bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                    <Clipboard className="h-4 w-4 text-teal-600 mr-2" />
                    <p className="text-base font-medium text-gray-900">
                      {invoice.orderId || "Mua trực tiếp"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Ngày phát hành</p>
                  <div className="flex items-center bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                    <Calendar className="h-4 w-4 text-teal-600 mr-2" />
                    <p className="text-gray-800">{formatDate(invoice.issuedAt)}</p>
                  </div>
                </div>

                <Separator className="bg-gray-200" />

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Phương thức thanh toán</p>
                  <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-sm">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm mr-3 border border-blue-100">
                      {getPaymentIcon(invoice.paymentMethod)}
                    </div>
                    <span className="text-gray-900 font-medium">{getPaymentMethodLabel(invoice.paymentMethod)}</span>
                  </div>
                </div>

                <Separator className="bg-gray-200" />

                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-4 shadow-sm border border-teal-100">
                  <p className="text-sm font-medium text-teal-700 mb-1">Tổng tiền</p>
                  <p className="text-3xl font-bold text-teal-700">{formatCurrency(invoice.totalPrice)}</p>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-medium shadow-md rounded-full h-12 transition-all duration-200"
                  onClick={downloadInvoice}
                >
                  <FileDown className="h-5 w-5 mr-2" />
                  Tải Xuống Hóa Đơn
                </Button>
              </CardContent>
            </Card>
            
            {/* Additional Information Card */}
            <Card className="shadow-md border-0 rounded-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <CardHeader className="bg-gradient-to-b from-blue-50 to-white border-b border-blue-100 pb-4 pt-5">
                <div className="flex items-center">
                  <div className="bg-white rounded-full p-2 shadow-sm mr-3">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-blue-800">Thông Tin Bổ Sung</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start p-3 rounded-lg transition-colors duration-200 hover:bg-blue-50 border border-transparent hover:border-blue-100">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-full mr-3 flex-shrink-0 shadow-sm">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Bảo mật thanh toán</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Thông tin thanh toán của bạn được mã hóa và bảo vệ an toàn.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-3 rounded-lg transition-colors duration-200 hover:bg-blue-50 border border-transparent hover:border-blue-100">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-full mr-3 flex-shrink-0 shadow-sm">
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Theo dõi đơn hàng</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Bạn có thể theo dõi tình trạng giao hàng trong mục "Đơn hàng của tôi".
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-3 rounded-lg transition-colors duration-200 hover:bg-blue-50 border border-transparent hover:border-blue-100">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-full mr-3 flex-shrink-0 shadow-sm">
                      <BadgeCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Sản phẩm chất lượng</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Tất cả thuốc và sản phẩm y tế đều được đảm bảo chất lượng và nguồn gốc.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Invoice Items & Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="md:col-span-2"
          >
            <Card className="shadow-md border-0 rounded-xl overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
              <CardHeader className="bg-gradient-to-b from-teal-50 to-white border-b border-teal-100 pb-4 pt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-white rounded-full p-2 shadow-sm mr-3">
                      <Package className="h-5 w-5 text-teal-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-teal-800">Chi Tiết Sản Phẩm</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 px-3 py-1.5 rounded-full shadow-sm">
                    {invoice.items.reduce((sum: number, item: InvoiceDetailsItem) => sum + item.quantity, 0)} sản phẩm
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200 bg-gray-50">
                        <TableHead className="w-[50%] py-4 text-gray-700 font-medium">Sản Phẩm</TableHead>
                        <TableHead className="py-4 text-gray-700 text-center font-medium">Số Lượng</TableHead>
                        <TableHead className="py-4 text-gray-700 text-right font-medium">Đơn Giá</TableHead>
                        <TableHead className="py-4 text-gray-700 text-right font-medium">Thành Tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {invoice.items.map((item: InvoiceDetailsItem, index: number) => (
                          <motion.tr
                            key={item.medicineId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                              "group hover:bg-gray-50 transition-colors duration-150",
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                            )}
                          >
                            <TableCell className="py-4">
                              <div className="flex items-center">
                                {item.medicine.thumbnail ? (
                                  <div className="h-14 w-14 mr-4 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 shadow-sm">
                                    <img 
                                      src={item.medicine.thumbnail.url || ""} 
                                      alt={item.medicine.thumbnail.alt} 
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-14 w-14 mr-4 rounded-lg bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <Pill className="h-6 w-6 text-teal-600" />
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-gray-900 truncate mb-1 group-hover:text-teal-700 transition-colors">
                                    {item.medicine.name}
                                  </h4>
                                  <p className="text-sm text-gray-500 truncate">
                                    {item.medicine.description?.substring(0, 50) || "Không có mô tả"}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="inline-flex items-center justify-center px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 border border-gray-200 shadow-sm font-medium min-w-[40px]">
                                {item.quantity}
                              </span>
                            </TableCell>
                            <TableCell className="text-right font-medium text-gray-800">
                              {formatCurrency(item.price)}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-teal-700">
                              {formatCurrency(item.itemTotal)}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>

                {/* Total Calculation */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
                  <div className="space-y-4 max-w-md ml-auto">
                    <div className="flex justify-between items-center text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <span className="font-medium">Tạm tính</span>
                      <span className="font-semibold">{formatCurrency(invoice.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <span className="font-medium">Phí vận chuyển</span>
                      <span className="font-semibold">0 ₫</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <span className="font-medium">Khuyến mãi</span>
                      <span className="font-semibold">0 ₫</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold bg-teal-50 p-4 rounded-lg shadow-sm border border-teal-200">
                      <span className="text-gray-900">Tổng cộng</span>
                      <span className="text-teal-700">{formatCurrency(invoice.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Note */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex items-start shadow-sm"
            >
              <div className="p-3 bg-white rounded-full mr-4 flex-shrink-0 shadow-sm border border-blue-200">
                <Clipboard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Cần hỗ trợ hoặc hoàn trả?</h4>
                <p className="text-sm text-blue-700">
                  Nếu bạn có thắc mắc về hóa đơn, sản phẩm, hoặc cần hỗ trợ hoàn trả, vui lòng liên hệ đội ngũ chăm sóc khách hàng của chúng tôi qua email <span className="font-semibold">hotro@pharmacity.vn</span> hoặc gọi số <span className="font-semibold">1800 6821</span> trong vòng 7 ngày kể từ ngày mua hàng.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 