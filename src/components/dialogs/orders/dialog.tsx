import { useOrdersDialog } from "@/atoms/dialog.atom";
import { OrderStatus } from "@/data/enum";
import { OrdersChangeStatusDialog } from "./orders.change-status-dialog";
import { OrdersDeleteDialog } from "./orders.delete-dialog";
import { OrdersViewDetails } from "./orders.view-details";

export default function OrdersDialogs() {
  const { open, setOpen, currentOrder, setCurrentOrder } = useOrdersDialog();

  const handleOpenChange = (isOpen: boolean, type?: string) => {
    if (!isOpen) {
      setOpen(null);
      if (!type) {
        setTimeout(() => {
          setCurrentOrder(null);
        }, 300);
      }
    }
  };

  return (
    <>
      <OrdersDeleteDialog
        currentOrder={currentOrder || undefined}
        open={open === "delete"}
        onOpenChange={(isOpen) => handleOpenChange(isOpen, "delete")}
      />

      <OrdersViewDetails
        orderId={currentOrder?.id}
        open={open === "view"}
        onOpenChange={(isOpen) => handleOpenChange(isOpen, "view")}
      />

      <OrdersChangeStatusDialog
        currentOrder={currentOrder || undefined}
        open={open === "confirm"}
        onOpenChange={(isOpen) => handleOpenChange(isOpen, "confirm")}
        mode={OrderStatus.PROCESSING}
      />

      <OrdersChangeStatusDialog
        currentOrder={currentOrder || undefined}
        open={open === "complete"}
        onOpenChange={(isOpen) => handleOpenChange(isOpen, "complete")}
        mode={OrderStatus.COMPLETED}
      />

      <OrdersChangeStatusDialog
        currentOrder={currentOrder || undefined}
        open={open === "cancel"}
        onOpenChange={(isOpen) => handleOpenChange(isOpen, "cancel")}
        mode={OrderStatus.CANCELLED}
      />
    </>
  )
}