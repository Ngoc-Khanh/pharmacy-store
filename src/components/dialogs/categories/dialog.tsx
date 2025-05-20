import { useCategoriesDialog } from "@/atoms/dialog.atom";
import CategoriesActionDialog from "./categories.action-dialog";
import CategoriesChangeStatus from "./categories.change-status";
import CategoriesDeleteDialog from "./categories.delete-dialog";

export default function CategoriesDialogs() {
  const { open, setOpen, currentCategory, setCurrentCategory } = useCategoriesDialog();

  return (
    <>
      <CategoriesActionDialog
        key="category-add"
        open={open === "add"}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null);
          else setOpen("add");
        }}
      />

      {currentCategory && (
        <>
          <CategoriesActionDialog
            key={`category-edit-${currentCategory.id}`}
            open={open === "edit"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentCategory(null);
                }, 300);
              }
            }}
            currentCategory={currentCategory}
          />

          <CategoriesChangeStatus
            key={`category-status-${currentCategory.id}`}
            open={open === "status"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentCategory(null);
                }, 300);
              }
            }}
            currentCategory={currentCategory}
            active={!currentCategory.isActive}
          />

          <CategoriesDeleteDialog
            key={`category-delete-${currentCategory.id}`}
            open={open === "delete"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentCategory(null);
                }, 300);
              }
            }}
            currentCategory={currentCategory}
          />
        </>
      )}
    </>
  )
}