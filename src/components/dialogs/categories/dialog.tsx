import { useCategoriesDialog } from "@/atoms/dialog.atom";
import CategoriesActionDialog from "./categories.action-dialog";

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
        
        
      )}
    </>
  )
}