import { useMedicinesDialog } from "@/atoms/dialog.atom";

import MedicinesActionDialog from "./medicines.action-dialog";
import MedicinesDeleteDialog from "./medicines.delete-dialog";

export default function MedicinesDialogs() {
  const { open, setOpen, currentMedicine, setCurrentMedicine } = useMedicinesDialog();

  return (
    <>
      <MedicinesActionDialog
        key="medicine-add"
        open={open === "add"}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null);
          else setOpen("add");
        }}
      />

      {currentMedicine && (
        <>
          <MedicinesActionDialog
            key={`medicine-edit-${currentMedicine.id}`}
            open={open === "edit"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentMedicine(null);
                }, 300);
              }
            }}
            currentMedicine={currentMedicine}
          />

          <MedicinesDeleteDialog
            key={`medicine-delete-${currentMedicine.id}`}
            open={open === "delete"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentMedicine(null);
                }, 300);
              }
            }}
            currentMedicine={currentMedicine}
          />
        </>
      )}
    </>
  )
}