"use client";

import { useEffect, useState } from "react";
import { StoreAPI } from "@/services/api/store.api";
import { Invoice } from "@/data/interfaces";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Eye, FileDown, Search, Pill, Receipt, ShoppingCart, Stethoscope, Clipboard } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const data = await StoreAPI.InvoiceList();
      setInvoices(data);
    } catch (error) {
      toast.error("Không thể tải hóa đơn của bạn. Vui lòng thử lại sau.");
      console.error("Failed to fetch invoices:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
          </svg>
        );
      case PaymentMethod.BANK_TRANSFER:
        return (
          <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
          </svg>
        );
      case PaymentMethod.COD:
        return (
          <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
          </svg>
        );
      default:
        return <Receipt className="h-4 w-4 mr-1.5" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM, yyyy", { locale: vi });
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

  const viewInvoiceDetails = (invoiceId: string) => {
    navigate(`/account/invoice/${invoiceId}`);
  };

  const downloadInvoice = (invoice: Invoice) => {
    toast.success(`Hóa đơn ${invoice.invoiceNumber} đang được tải xuống.`);
    // Implement actual download functionality here
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(invoice.issuedAt).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Pharmacy-themed decorative element */}
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
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between"
      >
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="bg-teal-100 p-2.5 rounded-full shadow-sm">
            <Receipt className="h-6 w-6 text-teal-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hóa Đơn Của Tôi</h1>
            <p className="text-gray-600 text-sm">Quản lý và xem lịch sử mua hàng của bạn</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-64">
          <Input
            placeholder="Tìm kiếm hóa đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border border-gray-200 rounded-full shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </motion.div>

      <Card className="shadow-lg border-0 overflow-hidden rounded-xl bg-white relative">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
          <div className="absolute -right-6 -top-6 w-32 h-32">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-teal-900">
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          </div>
          <div className="absolute left-20 bottom-10">
            <Stethoscope className="w-40 h-40 text-teal-900" />
          </div>
        </div>

        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100 relative z-10">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center">
                <Pill className="h-5 w-5 text-teal-600 mr-2" />
                <CardTitle className="text-xl text-teal-800">Hóa Đơn Dược Phẩm</CardTitle>
              </div>
              <CardDescription className="text-teal-700 mt-1">
                Theo dõi lịch sử mua thuốc và thanh toán của bạn
              </CardDescription>
            </div>
            <div className="hidden md:flex items-center space-x-3 text-sm text-teal-700">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mr-1.5"></div>
                <span>Đã thanh toán</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-400 mr-1.5"></div>
                <span>Chờ thanh toán</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-rose-400 mr-1.5"></div>
                <span>Đã hủy</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 relative z-10">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : filteredInvoices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center"
            >
              <div className="bg-teal-50 p-6 rounded-full mb-5 border border-teal-100 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy hóa đơn</h3>
              <p className="mt-1 text-gray-500 max-w-md">
                {searchTerm
                  ? "Chúng tôi không thể tìm thấy hóa đơn phù hợp với tìm kiếm của bạn. Vui lòng thử từ khóa khác."
                  : "Bạn chưa có hóa đơn nào. Hóa đơn sẽ xuất hiện tại đây sau khi bạn mua hàng từ nhà thuốc của chúng tôi."}
              </p>
              {!searchTerm && (
                <Button 
                  className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate("/store/medicines")}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Mua Thuốc Ngay
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="w-[140px] py-4 text-teal-800">Mã Hóa Đơn</TableHead>
                      <TableHead className="py-4 text-teal-800">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-teal-600" />
                          <span>Ngày Tạo</span>
                        </div>
                      </TableHead>
                      <TableHead className="py-4 text-teal-800">Phương Thức Thanh Toán</TableHead>
                      <TableHead className="text-right py-4 text-teal-800">Tổng Tiền</TableHead>
                      <TableHead className="py-4 text-teal-800">Trạng Thái</TableHead>
                      <TableHead className="text-right py-4 text-teal-800">Thao Tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice, index) => (
                      <motion.tr
                        variants={itemVariants}
                        key={invoice.id}
                        className={cn(
                          "group hover:bg-teal-50/40 transition-colors duration-150",
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        )}
                      >
                        <TableCell className="font-medium text-teal-700">
                          #{invoice.invoiceNumber}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-700">
                            {formatDate(invoice.issuedAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getPaymentIcon(invoice.paymentMethod)}
                            <span>{getPaymentMethodLabel(invoice.paymentMethod)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-gray-900">
                          {formatCurrency(invoice.totalPrice)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "font-medium rounded-full px-3 py-1 text-xs border",
                              getStatusColor(invoice.status)
                            )}
                          >
                            {getStatusLabel(invoice.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-teal-700 border-teal-200 hover:bg-teal-50 rounded-full transition-all duration-200"
                              onClick={() => viewInvoiceDetails(invoice.id)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Xem
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-cyan-700 border-cyan-200 hover:bg-cyan-50 rounded-full transition-all duration-200"
                              onClick={() => downloadInvoice(invoice)}
                            >
                              <FileDown className="h-3.5 w-3.5 mr-1" />
                              Tải Xuống
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {!isLoading && filteredInvoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-center text-sm text-gray-500"
        >
          Hiển thị {filteredInvoices.length} {filteredInvoices.length === 1 ? 'hóa đơn' : 'hóa đơn'}
        </motion.div>
      )}

      {/* Help note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start max-w-2xl mx-auto"
      >
        <div className="p-2 bg-blue-100 rounded-full mr-3 mt-0.5">
          <Clipboard className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium text-blue-800 mb-1">Cần giúp đỡ với hóa đơn?</h4>
          <p className="text-sm text-blue-700">
            Nếu bạn có thắc mắc về hóa đơn hoặc cần hỗ trợ, vui lòng liên hệ đội ngũ chăm sóc khách hàng của chúng tôi qua email <strong>hotro@pharmacity.vn</strong> hoặc gọi số <strong>1800 6821</strong>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
