import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { OrderAdmin } from "@/data/interfaces";
import { OrderAPI } from "@/services/api/order.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { memo, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  currentOrder?: OrderAdmin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrdersDeleteDialog = memo(function OrdersDeleteDialog({ currentOrder, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const [confirmId, setConfirmId] = useState("");
  
  const deleteOrderMutation = useMutation({
    mutationFn: (id: string) => OrderAPI.OrderDelete(id),
    onSuccess: () => {
      toast.success(`Đơn hàng ${currentOrder?.id} đã được xóa thành công.`);
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa đơn hàng. Vui lòng thử lại sau.");
    },
  })
 
  if (!currentOrder) return null;

  const handleDelete = () => {
    deleteOrderMutation.mutate(currentOrder.id || "");
  }

  // Check if the entered ID matches the order ID
  const isConfirmValid = confirmId === currentOrder.id;

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(newOpen) => {
        // Reset the confirmation input when dialog closes
        if (!newOpen) {
          setConfirmId("");
        }
        onOpenChange(newOpen);
      }}
      title="Xóa đơn hàng"
      desc={
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Bạn có chắc chắn muốn xóa đơn hàng này?</span>
          </div>
          <p className="text-muted-foreground">
            Đơn hàng <span className="font-medium">{currentOrder.id}</span> sẽ bị xóa vĩnh viễn. 
            Hành động này không thể hoàn tác.
          </p>
          {currentOrder.user && (
            <p className="text-sm text-muted-foreground mt-1">
              Khách hàng: <span className="font-medium">{currentOrder.user.firstname} {currentOrder.user.lastname}</span>
            </p>
          )}
          {currentOrder.totalPrice && (
            <p className="text-sm text-muted-foreground">
              Tổng tiền: <span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentOrder.totalPrice)}</span>
            </p>
          )}
        </div>
      }
      children={
        <div className="space-y-2 py-2">
          <Label htmlFor="confirm-id" className="font-medium text-destructive">
            Nhập mã đơn hàng để xác nhận xóa
          </Label>
          <Input 
            id="confirm-id"
            placeholder={`Nhập "${currentOrder.id}" để xác nhận`}
            value={confirmId}
            onChange={(e) => setConfirmId(e.target.value)}
            className={!isConfirmValid && confirmId ? "border-destructive" : ""}
          />
          {!isConfirmValid && confirmId && (
            <p className="text-xs text-destructive">Mã đơn hàng không chính xác</p>
          )}
        </div>
      }
      handleConfirm={handleDelete}
      confirmText="Xóa đơn hàng"
      cancelBtnText="Hủy"
      isLoading={deleteOrderMutation.isPending}
      destructive={true}
      disabled={!isConfirmValid}
    />
  )
})
