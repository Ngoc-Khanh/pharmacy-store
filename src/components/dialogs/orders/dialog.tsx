import { useOrdersDialog } from "@/atoms/dialog.atom";
import { OrderStatus } from "@/data/enum";
import { OrdersChangeStatusDialog } from "./orders.change-status-dialog";

export default function OrdersDialogs() {
  const { open, setOpen, currentOrder, setCurrentOrder } = useOrdersDialog();

  // Reset current order when dialog closes
  const handleOpenChange = (isOpen: boolean, type?: string) => {
    if (!isOpen) {
      setOpen(null);
      // Only reset current order if dialog fully closes
      if (!type) {
        setTimeout(() => {
          setCurrentOrder(null);
        }, 300);
      }
    }
  };

  return (
    <>
      {/* Dialog for confirming order (change to PROCESSING) */}
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

      {/* Dialog for cancelling order (change to CANCELLED) */}
      <OrdersChangeStatusDialog
        currentOrder={currentOrder || undefined}
        open={open === "cancel"}
        onOpenChange={(isOpen) => handleOpenChange(isOpen, "cancel")}
        mode={OrderStatus.CANCELLED}
      />
    </>
  )
}