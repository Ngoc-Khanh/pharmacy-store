"use client";

import { InvoiceStatus, PaymentMethod } from "@/data/enum";
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
  Truck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceDetailsItem } from "@/data/interfaces/invoice.interface";
import { cn } from "@/lib/utils";

export default function InvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: invoice, isLoading, error } = useQuery({
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
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case InvoiceStatus.PENDING:
        return "bg-amber-100 text-amber-800 border-amber-200";
      case InvoiceStatus.CANCELLED:
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const downloadInvoice = () => {
    if (!invoice) return;
    toast.success(`Hóa đơn ${invoice.invoiceNumber} đang được tải xuống.`);
    // Implement actual download functionality here
  };

  const goBack = () => {
    navigate(-1);
  };

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
      <div className="py-4 px-2">
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
        <div className="space-y-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-80 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="py-4 px-2">
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            className="mr-4 rounded-full p-2 h-9 w-9"
            onClick={goBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Chi Tiết Hóa Đơn</h1>
        </div>
        <Card className="shadow-lg border-0 rounded-xl bg-white relative">
          <CardContent className="p-12 text-center">
            <Info className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Đã xảy ra lỗi
            </h2>
            <p className="text-gray-600 mb-6">{error instanceof Error ? error.message : "Không thể tải thông tin hóa đơn"}</p>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={goBack}
            >
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-4 px-2">
      {/* Pharmacy-themed decorative elements */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex items-center"
      >
        <Button
          variant="ghost"
          className="mr-4 rounded-full p-2 h-9 w-9 hover:bg-teal-50 text-teal-700"
          onClick={goBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <Receipt className="h-6 w-6 text-teal-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Chi Tiết Hóa Đơn #{invoice.invoiceNumber}</h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Invoice Summary */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-1"
        >
          <Card className="shadow-md border-0 rounded-xl bg-white">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
              <div className="flex items-center">
                <Receipt className="h-5 w-5 text-teal-600 mr-2" />
                <CardTitle className="text-lg text-teal-800">Thông Tin Hóa Đơn</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Mã hóa đơn</p>
                  <p className="text-lg font-semibold text-teal-700">#{invoice.invoiceNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Mã đơn hàng</p>
                  <p className="text-lg font-semibold text-gray-900">{invoice.orderId}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Ngày phát hành</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-teal-600 mr-2" />
                    <p className="text-gray-800">{formatDate(invoice.issuedAt)}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Trạng thái</p>
                  <Badge
                    className={cn(
                      "font-medium px-3 py-1.5 text-sm border",
                      getStatusColor(invoice.status)
                    )}
                  >
                    {getStatusLabel(invoice.status)}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Phương thức thanh toán</p>
                  <div className="flex items-center mt-1 text-gray-800">
                    {getPaymentIcon(invoice.paymentMethod)}
                    <span>{getPaymentMethodLabel(invoice.paymentMethod)}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Tổng tiền</p>
                  <p className="text-2xl font-bold text-teal-700">{formatCurrency(invoice.totalPrice)}</p>
                </div>

                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
                  onClick={downloadInvoice}
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Tải Xuống Hóa Đơn
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information Card */}
          <motion.div 
            variants={itemVariants}
            className="mt-6"
          >
            <Card className="shadow-md border-0 rounded-xl bg-white">
              <CardHeader className="bg-blue-50 border-b border-blue-100 py-4">
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-blue-600 mr-2" />
                  <CardTitle className="text-lg text-blue-800">Thông Tin Bổ Sung</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Bảo mật thanh toán</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Thông tin thanh toán của bạn được mã hóa và bảo vệ an toàn.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <Truck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Theo dõi đơn hàng</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Bạn có thể theo dõi tình trạng giao hàng trong mục "Đơn hàng của tôi".
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <BadgeCheck className="h-4 w-4 text-blue-600" />
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
        </motion.div>

        {/* Right Column - Invoice Items & Details */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-2"
        >
          <Card className="shadow-md border-0 rounded-xl bg-white h-full">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-teal-600 mr-2" />
                  <CardTitle className="text-lg text-teal-800">Chi Tiết Sản Phẩm</CardTitle>
                </div>
                <p className="text-sm text-teal-700">
                  Tổng: {invoice.items.reduce((sum: number, item: InvoiceDetailsItem) => sum + item.quantity, 0)} sản phẩm
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="w-[50%] py-4 text-teal-800">Sản Phẩm</TableHead>
                      <TableHead className="py-4 text-teal-800 text-center">Số Lượng</TableHead>
                      <TableHead className="py-4 text-teal-800 text-right">Đơn Giá</TableHead>
                      <TableHead className="py-4 text-teal-800 text-right">Thành Tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {invoice.items.map((item: InvoiceDetailsItem) => (
                        <motion.tr
                          key={item.medicineId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="group hover:bg-teal-50/40 transition-colors duration-150"
                        >
                          <TableCell>
                            <div className="flex items-center">
                              {item.medicine.thumbnail ? (
                                <div className="h-12 w-12 mr-3 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                                  <img 
                                    src={item.medicine.thumbnail.url || ""} 
                                    alt={item.medicine.thumbnail.alt} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-12 w-12 mr-3 rounded bg-teal-100 flex items-center justify-center flex-shrink-0">
                                  <Pill className="h-6 w-6 text-teal-600" />
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium text-gray-900 line-clamp-1">
                                  {item.medicine.name}
                                </h4>
                                <p className="text-sm text-gray-500 line-clamp-1">
                                  {/* {item.medicine.supplier.name || "Không có thông tin nhà sản xuất"} */}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            <span className="px-2.5 py-1 bg-gray-100 rounded text-gray-800">
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
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(invoice.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Phí vận chuyển</span>
                    <span>0 ₫</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Khuyến mãi</span>
                    <span>0 ₫</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Tổng cộng</span>
                    <span className="text-teal-700">{formatCurrency(invoice.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start"
          >
            <div className="p-2 bg-blue-100 rounded-full mr-3 mt-0.5">
              <Clipboard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Cần hỗ trợ hoặc hoàn trả?</h4>
              <p className="text-sm text-blue-700">
                Nếu bạn có thắc mắc về hóa đơn, sản phẩm, hoặc cần hỗ trợ hoàn trả, vui lòng liên hệ đội ngũ chăm sóc khách hàng của chúng tôi qua email <strong>hotro@pharmacity.vn</strong> hoặc gọi số <strong>1800 6821</strong> trong vòng 7 ngày kể từ ngày mua hàng.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 