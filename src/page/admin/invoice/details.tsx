import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { InvoiceUpdateStatusDto } from "@/data/dto";
import { InvoiceDetails } from "@/data/interfaces";
import { InvoiceAPI } from "@/services/api/invoice.api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Receipt, Clock, Ban, FileText, CheckCircle2, 
  RefreshCw, PackageCheck, User, CreditCard, Calendar, Edit, Save
} from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function InvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<InvoiceStatus | null>(null);
  
  // Fetch invoice details
  const { data: invoice, isLoading, error } = useQuery<InvoiceDetails>({
    queryKey: ["invoice", id],
    queryFn: () => id ? InvoiceAPI.InvoiceGetById(id) : null,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: (dto: InvoiceUpdateStatusDto) => {
      if (!id) throw new Error("Invoice ID is required");
      return InvoiceAPI.InvoiceUpdateStatus(id, dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice", id] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Cập nhật trạng thái hóa đơn thành công!");
      setEditingStatus(false);
    },
    onError: (error) => {
      toast.error("Lỗi khi cập nhật trạng thái: " + error.message);
    }
  });

  // Handle status update
  const handleStatusUpdate = () => {
    if (!newStatus) {
      toast.error("Vui lòng chọn trạng thái mới");
      return;
    }

    updateStatusMutation.mutate({ status: newStatus });
  };

  // Start editing status
  const startEditingStatus = () => {
    if (invoice) {
      setNewStatus(invoice.status);
      setEditingStatus(true);
    }
  };

  // Get status badge style
  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/40 gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Đã thanh toán
          </Badge>
        );
      case InvoiceStatus.PENDING:
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/40 gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Chờ thanh toán
          </Badge>
        );
      case InvoiceStatus.CANCELLED:
        return (
          <Badge className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/40 gap-1.5">
            <Ban className="h-3.5 w-3.5" />
            Đã hủy
          </Badge>
        );
      case InvoiceStatus.REFUNDED:
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/40 gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Đã hoàn tiền
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  // Get payment method text
  const getPaymentMethodText = (method: PaymentMethod) => {
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

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="flex-col md:flex">
        <Helmet>
          <title>Đang tải... | {siteConfig.name}</title>
        </Helmet>
        <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-[500px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // If error or no invoice found, show error message
  if (error || !invoice) {
    return (
      <div className="flex-col md:flex">
        <Helmet>
          <title>Không tìm thấy hóa đơn | {siteConfig.name}</title>
        </Helmet>
        <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">Không tìm thấy hóa đơn</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Không thể tìm thấy hóa đơn với ID: {id}</p>
            <Button asChild>
              <Link to="/admin/invoices">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách hóa đơn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>Hóa đơn #{invoice.invoiceNumber} | {siteConfig.name}</title>
      </Helmet>
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/admin/invoices")}
            className="gap-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          
          <div className="flex items-center gap-3">
            {!editingStatus ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={startEditingStatus}
                className="gap-1 border-emerald-200 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800/40 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/20"
              >
                <Edit className="h-4 w-4" />
                Cập nhật trạng thái
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleStatusUpdate}
                disabled={updateStatusMutation.isPending}
                className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Save className="h-4 w-4" />
                {updateStatusMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            )}

            <Button 
              variant="outline" 
              size="sm"
              className="gap-1 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:border-blue-800/40 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
            >
              <FileText className="h-4 w-4" />
              In hóa đơn
            </Button>
          </div>
        </div>

        {/* Invoice Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/20 shadow-sm p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 dark:bg-emerald-800/30 p-2.5 rounded-lg">
                <Receipt size={28} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300">
                  Hóa đơn #{invoice.invoiceNumber}
                </h2>
                <p className="text-emerald-600/90 dark:text-emerald-400/80">
                  ID: {invoice.id}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              {editingStatus ? (
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value as InvoiceStatus)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={InvoiceStatus.PENDING}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>Chờ thanh toán</span>
                      </div>
                    </SelectItem>
                    <SelectItem value={InvoiceStatus.PAID}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Đã thanh toán</span>
                      </div>
                    </SelectItem>
                    <SelectItem value={InvoiceStatus.CANCELLED}>
                      <div className="flex items-center gap-2">
                        <Ban className="h-4 w-4 text-rose-500" />
                        <span>Đã hủy</span>
                      </div>
                    </SelectItem>
                    <SelectItem value={InvoiceStatus.REFUNDED}>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-blue-500" />
                        <span>Đã hoàn tiền</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                getStatusBadge(invoice.status)
              )}
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Phát hành: {formatDate(new Date(invoice.issuedAt))}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Invoice Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Invoice Information */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <FileText className="h-5 w-5 text-emerald-500" />
                    Thông tin hóa đơn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Mã hóa đơn</h4>
                      <p className="text-base font-medium text-emerald-600 dark:text-emerald-400">#{invoice.invoiceNumber}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Mã đơn hàng</h4>
                      <p className="text-base font-medium">{invoice.orderId || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Ngày phát hành</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <p>{formatDate(new Date(invoice.issuedAt))}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Phương thức thanh toán</h4>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-slate-400" />
                        <p>{getPaymentMethodText(invoice.paymentMethod)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Invoice Items */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <PackageCheck className="h-5 w-5 text-emerald-500" />
                    Sản phẩm mua
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-md">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                      <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Sản phẩm
                          </th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Số lượng
                          </th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Đơn giá
                          </th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Thành tiền
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-950/30 divide-y divide-slate-200 dark:divide-slate-800">
                        {invoice.items.map((item, index) => (
                          <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">
                              {item.medicine?.name || `Sản phẩm #${item.medicineId}`}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-900 dark:text-slate-200">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-900 dark:text-slate-200">
                              {formatCurrency(item.price)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-emerald-600 dark:text-emerald-400">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-slate-50 dark:bg-slate-900/50 font-medium">
                        <tr>
                          <td colSpan={3} className="px-4 py-3 text-sm text-right text-slate-900 dark:text-slate-200">
                            Tổng cộng:
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-emerald-700 dark:text-emerald-400 font-bold">
                            {formatCurrency(invoice.totalPrice)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Customer Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="md:col-span-1 space-y-6"
          >
            {/* Customer Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <User className="h-5 w-5 text-emerald-500" />
                  Thông tin khách hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoice.user ? (
                  <>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tên khách hàng</h4>
                      <p className="text-base font-medium">{invoice.user.fullName}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</h4>
                      <p className="text-base">{invoice.user.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Số điện thoại</h4>
                      <p className="text-base">{invoice.user.phone || "N/A"}</p>
                    </div>
                    {invoice.user.address && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Địa chỉ</h4>
                        <p className="text-base">{invoice.user.address}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                    Không có thông tin khách hàng
                  </p>
                )}
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full mt-2"
                    disabled={!invoice.user}
                    asChild
                  >
                    <Link to={invoice.user ? `/admin/users/${invoice.user.id}` : "#"}>
                      <User className="h-4 w-4 mr-2" />
                      Xem chi tiết khách hàng
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Status Update Dialog */}
      <Dialog open={editingStatus} onOpenChange={setEditingStatus}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhật trạng thái hóa đơn</DialogTitle>
            <DialogDescription>
              Chọn trạng thái mới cho hóa đơn #{invoice.invoiceNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select value={newStatus || undefined} onValueChange={(value) => setNewStatus(value as InvoiceStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={InvoiceStatus.PENDING}>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>Chờ thanh toán</span>
                  </div>
                </SelectItem>
                <SelectItem value={InvoiceStatus.PAID}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Đã thanh toán</span>
                  </div>
                </SelectItem>
                <SelectItem value={InvoiceStatus.CANCELLED}>
                  <div className="flex items-center gap-2">
                    <Ban className="h-4 w-4 text-rose-500" />
                    <span>Đã hủy</span>
                  </div>
                </SelectItem>
                <SelectItem value={InvoiceStatus.REFUNDED}>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-blue-500" />
                    <span>Đã hoàn tiền</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingStatus(false)}>Hủy</Button>
            <Button 
              onClick={handleStatusUpdate}
              disabled={updateStatusMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {updateStatusMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 