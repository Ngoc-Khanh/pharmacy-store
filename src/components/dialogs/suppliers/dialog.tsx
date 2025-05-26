import { useSuppliersDialog } from "@/atoms/dialog.atom";
import SuppliersActionsSheet from "./suppliers.actions-sheet";
import SuppliersDeleteDialog from "./suppliers.delete-dialog";
import SuppliersViewDialog from "./suppliers.view-dialog";

export default function SuppliersDialogs() {
  const { open, setOpen, currentSupplier, setCurrentSupplier } = useSuppliersDialog();

  return (
    <>
      <SuppliersActionsSheet
        key="supplier-add"
        open={open === "add"}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null);
          else setOpen("add");
        }}
      />

      {currentSupplier && (
        <>
          <SuppliersActionsSheet
            key={`supplier-edit-${currentSupplier.id}`}
            open={open === "edit"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentSupplier(null);
                }, 300);
              }
            }}
            currentSupplier={currentSupplier}
          />

          <SuppliersViewDialog
            key={`supplier-view-${currentSupplier.id}`}
            open={open === "view"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentSupplier(null);
                }, 300);
              }
            }}
            currentSupplier={currentSupplier}
          />

          <SuppliersDeleteDialog
            key={`supplier-delete-${currentSupplier.id}`}
            open={open === "delete"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentSupplier(null);
                }, 300);
              }
            }}
            currentSupplier={currentSupplier}
          />
        </>
      )}
    </>
  )
}