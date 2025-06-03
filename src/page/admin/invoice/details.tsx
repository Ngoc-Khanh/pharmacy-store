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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { siteConfig } from "@/config";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { InvoiceUpdateStatusDto } from "@/data/dto";
import { InvoiceDetails, InvoiceDetailsItem } from "@/data/interfaces";
import { InvoiceAPI } from "@/services/api/invoice.api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Receipt, Clock, Ban, FileText, CheckCircle2, 
  RefreshCw, PackageCheck, User, CreditCard, Calendar, Edit, Save,
  Download, Copy, AlertTriangle, Info, Phone, Mail, MapPin,
  Package, DollarSign, Hash, X
} from "lucide-react";
import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function InvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<InvoiceStatus | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Fetch invoice details
  const { data: invoice, isLoading, error, refetch } = useQuery<InvoiceDetails>({
    queryKey: ["invoice", id],
    queryFn: () => {
      if (!id) throw new Error("No ID provided");
      return InvoiceAPI.InvoiceGetById(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
      setShowConfirmDialog(false);
    },    onError: (error: Error) => {
      toast.error("Lỗi khi cập nhật trạng thái: " + (error?.message || "Vui lòng thử lại"));
    }
  });

  // Handle status update with confirmation
  const handleStatusUpdate = useCallback(() => {
    if (!newStatus) {
      toast.error("Vui lòng chọn trạng thái mới");
      return;
    }

    // Show confirmation for critical status changes
    if (newStatus === InvoiceStatus.CANCELLED || newStatus === InvoiceStatus.REFUNDED) {
      setShowConfirmDialog(true);
      return;
    }

    updateStatusMutation.mutate({ status: newStatus });
  }, [newStatus, updateStatusMutation]);

  // Confirm status update
  const confirmStatusUpdate = useCallback(() => {
    if (newStatus) {
      updateStatusMutation.mutate({ status: newStatus });
    }
  }, [newStatus, updateStatusMutation]);

  // Start editing status
  const startEditingStatus = useCallback(() => {
    if (invoice) {
      setNewStatus(invoice.status);
      setEditingStatus(true);
    }
  }, [invoice]);

  // Cancel editing
  const cancelEditing = useCallback(() => {
    setEditingStatus(false);
    setNewStatus(null);
  }, []);

  // Copy invoice ID to clipboard
  const copyInvoiceId = useCallback(() => {
    if (invoice?.id) {
      navigator.clipboard.writeText(invoice.id);
      toast.success("Đã sao chép ID hóa đơn");
    }
  }, [invoice?.id]);

  // Print invoice
  const printInvoice = useCallback(() => {
    window.print();
  }, []);

  // Get status badge style with improved design
  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/40 gap-1.5 px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Đã thanh toán
          </Badge>
        );
      case InvoiceStatus.PENDING:
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/40 gap-1.5 px-3 py-1">
            <Clock className="h-3.5 w-3.5" />
            Chờ thanh toán
          </Badge>
        );
      case InvoiceStatus.CANCELLED:
        return (
          <Badge className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/40 gap-1.5 px-3 py-1">
            <Ban className="h-3.5 w-3.5" />
            Đã hủy
          </Badge>
        );
      case InvoiceStatus.REFUNDED:
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/40 gap-1.5 px-3 py-1">
            <RefreshCw className="h-3.5 w-3.5" />
            Đã hoàn tiền
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="px-3 py-1">
            {status}
          </Badge>
        );
    }
  };

  // Get payment method with icon
  const getPaymentMethodDisplay = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-blue-500" />
            <span>Thẻ tín dụng</span>
          </div>
        );
      case PaymentMethod.BANK_TRANSFER:
        return (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span>Chuyển khoản</span>
          </div>
        );
      case PaymentMethod.COD:
        return (
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-orange-500" />
            <span>Thanh toán khi nhận hàng</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <span>Khác</span>
          </div>
        );
    }
  };

  // Loading skeleton with better design
  if (isLoading) {
    return (
      <TooltipProvider>
        <div className="flex-col md:flex">
          <Helmet>
            <title>Đang tải... | {siteConfig.name}</title>
          </Helmet>
          <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-24" />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
            <Skeleton className="h-32 w-full rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-96 w-full rounded-xl" />
              </div>
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  // Error state with retry option
  if (error || !invoice) {
    return (
      <TooltipProvider>
        <div className="flex-col md:flex">
          <Helmet>
            <title>Không tìm thấy hóa đơn | {siteConfig.name}</title>
          </Helmet>
          <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-md"
            >
              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-rose-500" />
              </div>
              <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">
                Không tìm thấy hóa đơn
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {error ? "Có lỗi xảy ra khi tải hóa đơn" : `Không thể tìm thấy hóa đơn với ID: ${id}`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => refetch()} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Thử lại
                </Button>
                <Button asChild>
                  <Link to="/admin/invoices">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại danh sách
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex-col md:flex">
        <Helmet>
          <title>Hóa đơn #{invoice.invoiceNumber} | {siteConfig.name}</title>
        </Helmet>
        <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
          {/* Header with Back Button and Actions */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/admin/invoices")}
              className="gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách
            </Button>
            
            <div className="flex flex-wrap items-center gap-3">
              <AnimatePresence mode="wait">
                {!editingStatus ? (
                  <motion.div
                    key="edit-button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={startEditingStatus}
                          className="gap-2 border-emerald-200 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800/40 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/20"
                        >
                          <Edit className="h-4 w-4" />
                          Cập nhật trạng thái
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Thay đổi trạng thái hóa đơn</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                ) : (
                  <motion.div
                    key="save-buttons"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={cancelEditing}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Hủy
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={handleStatusUpdate}
                      disabled={updateStatusMutation.isPending || !newStatus}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Save className="h-4 w-4" />
                      {updateStatusMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={printInvoice}
                    className="gap-2 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:border-blue-800/40 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                  >
                    <Download className="h-4 w-4" />
                    In hóa đơn
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>In hoặc tải xuống hóa đơn</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.div>

          {/* Invoice Header Banner - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-cyan-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/20 shadow-sm p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 dark:bg-emerald-800/30 p-3 rounded-xl shadow-sm">
                  <Receipt size={32} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300">
                    Hóa đơn #{invoice.invoiceNumber}
                  </h1>
                  <div className="flex items-center gap-2 text-emerald-600/90 dark:text-emerald-400/80">
                    <Hash className="h-4 w-4" />
                    <span className="text-sm font-mono">ID: {invoice.id}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-emerald-100 dark:hover:bg-emerald-800/30"
                          onClick={copyInvoiceId}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Sao chép ID hóa đơn</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3">
                <AnimatePresence mode="wait">
                  {editingStatus ? (
                    <motion.div
                      key="status-select"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Select value={newStatus || undefined} onValueChange={(value) => setNewStatus(value as InvoiceStatus)}>
                        <SelectTrigger className="w-[220px] bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800">
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
                    </motion.div>
                  ) : (
                    <motion.div
                      key="status-badge"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getStatusBadge(invoice.status)}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>Phát hành: {formatDate(new Date(invoice.issuedAt))}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status Change Alert */}
          <AnimatePresence>
            {editingStatus && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
                  <Info className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-700 dark:text-amber-400">
                    Bạn đang chỉnh sửa trạng thái hóa đơn. Hãy chọn trạng thái mới và nhấn "Lưu thay đổi" để cập nhật.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Invoice Details */}
            <div className="xl:col-span-2 space-y-6">
              {/* Invoice Information Card - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <FileText className="h-5 w-5 text-emerald-500" />
                      Thông tin hóa đơn
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Mã hóa đơn</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                            #{invoice.invoiceNumber}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Mã đơn hàng</h4>
                        <p className="text-base font-medium">{invoice.orderId || "N/A"}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Ngày phát hành</h4>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <p className="font-medium">{formatDate(new Date(invoice.issuedAt))}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Phương thức thanh toán</h4>
                        {getPaymentMethodDisplay(invoice.paymentMethod)}
                      </div>
                    </div>

                    <Separator />
                    
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Tổng tiền hóa đơn</span>
                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(invoice.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Invoice Items Table - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <PackageCheck className="h-5 w-5 text-emerald-500" />
                        Sản phẩm ({invoice.items.length} mặt hàng)
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Sản phẩm
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Số lượng
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Đơn giá
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Thành tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {invoice.items.map((item: InvoiceDetailsItem, index: number) => (
                            <motion.tr 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-150"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg">
                                    <Package className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">
                                      {item.medicine?.name || `Sản phẩm #${item.medicineId}`}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                  {item.quantity}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-100">
                                {formatCurrency(item.price)}
                              </td>
                              <td className="px-6 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(item.price * item.quantity)}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-slate-50 dark:bg-slate-900/50 border-t-2 border-slate-200 dark:border-slate-800">
                            <td colSpan={3} className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-slate-100">
                              Tổng cộng:
                            </td>
                            <td className="px-6 py-4 text-right text-xl font-bold text-emerald-600 dark:text-emerald-400">
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

            {/* Right Column - Customer Information - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="xl:col-span-1 space-y-6"
            >
              <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <User className="h-5 w-5 text-emerald-500" />
                    Thông tin khách hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {invoice.user ? (
                    <>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tên khách hàng</h4>
                          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                            {invoice.user.fullName}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</h4>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-400" />
                            <p className="text-base">{invoice.user.email}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Số điện thoại</h4>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-slate-400" />
                            <p className="text-base">{invoice.user.phone || "Chưa cập nhật"}</p>
                          </div>
                        </div>
                        
                        {invoice.user.address && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Địa chỉ</h4>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-slate-400 mt-1 flex-shrink-0" />
                              <p className="text-base">{invoice.user.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full gap-2 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 dark:hover:bg-emerald-900/20 dark:hover:border-emerald-800 dark:hover:text-emerald-400"
                        asChild
                      >
                        <Link to={`/admin/users/${invoice.user.id}`}>
                          <User className="h-4 w-4" />
                          Xem chi tiết khách hàng
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <User className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">
                        Không có thông tin khách hàng
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Xác nhận thay đổi trạng thái
              </DialogTitle>
              <DialogDescription>
                Bạn đang thay đổi trạng thái hóa đơn #{invoice.invoiceNumber} thành "
                <span className="font-semibold">
                  {newStatus === InvoiceStatus.CANCELLED ? "Đã hủy" : "Đã hoàn tiền"}
                </span>
                ". Hành động này có thể ảnh hưởng đến dữ liệu báo cáo.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                  {newStatus === InvoiceStatus.CANCELLED 
                    ? "Hủy hóa đơn sẽ đánh dấu giao dịch này là không hợp lệ."
                    : "Hoàn tiền sẽ yêu cầu xử lý bổ sung từ phòng kế toán."
                  }
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Hủy bỏ
              </Button>
              <Button 
                onClick={confirmStatusUpdate}
                disabled={updateStatusMutation.isPending}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                {updateStatusMutation.isPending ? "Đang xử lý..." : "Xác nhận thay đổi"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Simple Status Update Dialog */}
        <Dialog open={editingStatus && !showConfirmDialog} onOpenChange={setEditingStatus}>
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
              <Button variant="outline" onClick={cancelEditing}>Hủy</Button>
              <Button 
                onClick={handleStatusUpdate}
                disabled={updateStatusMutation.isPending || !newStatus}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {updateStatusMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
