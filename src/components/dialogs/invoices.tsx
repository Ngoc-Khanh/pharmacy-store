import { useInvoicesDialog } from "@/atoms/dialog.atom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceStatus, PaymentMethod } from "@/data/enum";
import { InvoiceUpdateStatusDto } from "@/data/dto";
import { InvoiceDetails } from "@/data/interfaces";
import { InvoiceAPI } from "@/services/api/invoice.api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ban, CheckCircle2, Clock, FileSpreadsheet, Plus, RefreshCw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function InvoicesDialogs() {
  const { open, setOpen, currentInvoice, setCurrentInvoice } = useInvoicesDialog();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newStatus, setNewStatus] = useState<InvoiceStatus | null>(null);
  
  const closeDialog = () => {
    setOpen(null);
    setCurrentInvoice(null);
    setNewStatus(null);
  };

  // Fetch invoice details when view dialog is opened with an ID
  const { data: invoiceDetails, isLoading } = useQuery<InvoiceDetails | null>({
    queryKey: ["invoice", currentInvoice?.id],
    queryFn: async () => {
      if (!currentInvoice?.id) return null;
      const invoice = await InvoiceAPI.InvoiceGetById(currentInvoice.id);
      return invoice as InvoiceDetails;
    },
    enabled: open === "view" && !!currentInvoice?.id,
    refetchOnWindowFocus: false,
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: (dto: InvoiceUpdateStatusDto) => {
      if (!currentInvoice?.id) throw new Error("Invoice ID is required");
      return InvoiceAPI.InvoiceUpdateStatus(currentInvoice.id, dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice", currentInvoice?.id] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Cập nhật trạng thái hóa đơn thành công!");
      closeDialog();
    },
    onError: (error) => {
      toast.error("Lỗi khi cập nhật trạng thái: " + error.message);
    }
  });

  // Set initial status when invoice details are loaded
  useEffect(() => {
    if (invoiceDetails && open === "view") {
      setNewStatus(invoiceDetails.status);
    }
  }, [invoiceDetails, open]);

  // Navigate to detailed invoice page
  const handleViewDetails = () => {
    if (currentInvoice?.id) {
      navigate(`/admin/invoice/${currentInvoice.id}`);
      closeDialog();
    }
  };

  // Handle status update
  const handleStatusUpdate = () => {
    if (!newStatus || !currentInvoice?.id) {
      toast.error("Vui lòng chọn trạng thái mới");
      return;
    }

    updateStatusMutation.mutate({ status: newStatus });
  };

  return (
    <>
      {/* Add Invoice Dialog */}
      <Dialog open={open === "add"} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xl">
              <Plus className="h-5 w-5" />
              Tạo hóa đơn mới
            </DialogTitle>
            <DialogDescription>
              Tạo hóa đơn mới cho khách hàng với thông tin chi tiết bên dưới.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="orderId" className="text-right">
                Order ID
              </Label>
              <Input
                id="orderId"
                placeholder="Nhập ID đơn hàng"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="invoiceNumber" className="text-right">
                Số hóa đơn
              </Label>
              <Input
                id="invoiceNumber"
                placeholder="Tự động tạo"
                className="col-span-3"
                disabled
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Phương thức thanh toán
              </Label>
              <Select>
                <SelectTrigger id="paymentMethod" className="col-span-3">
                  <SelectValue placeholder="Chọn phương thức thanh toán" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentMethod.CREDIT_CARD}>Thẻ tín dụng</SelectItem>
                  <SelectItem value={PaymentMethod.BANK_TRANSFER}>Chuyển khoản</SelectItem>
                  <SelectItem value={PaymentMethod.COD}>Thanh toán khi nhận hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Trạng thái
              </Label>
              <Select>
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={InvoiceStatus.PAID}>Đã thanh toán</SelectItem>
                  <SelectItem value={InvoiceStatus.PENDING}>Chờ thanh toán</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Hủy</Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Tạo hóa đơn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      <Dialog open={open === "view"} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xl">
              <FileSpreadsheet className="h-5 w-5" />
              Chi tiết hóa đơn
            </DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết của hóa đơn.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="space-y-4 py-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : invoiceDetails ? (
            <div className="space-y-4 py-2">
              {/* Invoice basic info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Mã hóa đơn</h4>
                  <p className="text-base font-medium">#{invoiceDetails.invoiceNumber}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Ngày tạo</h4>
                  <p className="text-base">{formatDate(new Date(invoiceDetails.issuedAt))}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Khách hàng</h4>
                  <p className="text-base">{invoiceDetails.userId ? "ID: " + invoiceDetails.userId : "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng tiền</h4>
                  <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(invoiceDetails.totalPrice)}
                  </p>
                </div>
              </div>

              {/* Status update section */}
              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-md p-4 mt-4">
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Cập nhật trạng thái</h4>
                <div className="flex items-center gap-4">
                  <Select value={newStatus || undefined} onValueChange={(value) => setNewStatus(value as InvoiceStatus)}>
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
                  <Button 
                    onClick={handleStatusUpdate}
                    disabled={updateStatusMutation.isPending || newStatus === invoiceDetails.status}
                    className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1.5"
                    size="sm"
                  >
                    <Save className="h-4 w-4" />
                    {updateStatusMutation.isPending ? "Đang lưu..." : "Cập nhật"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              Không tìm thấy thông tin hóa đơn
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={closeDialog}>Đóng</Button>
            {invoiceDetails && (
              <Button 
                onClick={handleViewDetails} 
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Xem chi tiết đầy đủ
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 