import { useCategoriesDialog } from "@/atoms/dialog.atom";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { CategoriesAPI } from "@/services/api/categories.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCategory: Category;
}

export default function CategoriesDeleteDialog({ open, onOpenChange, currentCategory }: Props) {
  const queryClient = useQueryClient();
  const { setCurrentCategory } = useCategoriesDialog();
  const [slugConfirmation, setSlugConfirmation] = useState("");
  const [showError, setShowError] = useState(false);

  const isConfirmed = slugConfirmation === currentCategory.slug;

  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: () => CategoriesAPI.CategoriesDelete(currentCategory.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Đã xóa danh mục thành công", {
        className: "bg-white dark:bg-slate-800 dark:text-white border-emerald-100 dark:border-slate-700",
      });
      onOpenChange(false);
      setTimeout(() => {
        setCurrentCategory(null);
        setSlugConfirmation("");
        setShowError(false);
      }, 300);
    },
    onError: (error) => {
      toast.error("Không thể xóa danh mục, vui lòng thử lại", {
        className: "bg-white dark:bg-slate-800 dark:text-white border-rose-100 dark:border-slate-700",
        description: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
      });
    },
  });

  const handleDelete = () => {
    if (!isConfirmed) {
      setShowError(true);
      return;
    }
    deleteCategory();
  };

  return (
    <AlertDialog open={open} onOpenChange={(newOpen) => {
      onOpenChange(newOpen);
      if (!newOpen) {
        setSlugConfirmation("");
        setShowError(false);
      }
    }}>
      <AlertDialogContent className="sm:max-w-[440px] p-0 overflow-hidden bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/30">
        <div className="bg-rose-50 dark:bg-rose-900/20 p-4 border-b border-rose-100 dark:border-rose-900/30">
          <AlertDialogHeader className="text-left space-y-1">
            <AlertDialogTitle className="text-lg font-medium flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <Trash2 className="h-5 w-5" />
              Xóa danh mục
            </AlertDialogTitle>
            <AlertDialogDescription className="text-rose-600/90 dark:text-rose-400/90">
              Hành động này sẽ xóa vĩnh viễn danh mục và không thể khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <div className="p-4 space-y-4">
          <div className="border border-rose-100 dark:border-rose-800/30 rounded-md bg-rose-50/50 dark:bg-rose-900/10 p-3">
            <div className="flex items-start gap-2.5">
              <TriangleAlert className="h-5 w-5 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-rose-700 dark:text-rose-400 text-sm">Hãy chắc chắn bạn muốn xóa</h4>
                <p className="text-sm text-rose-600/80 dark:text-rose-400/80 mt-1">
                  Danh mục <span className="font-semibold text-rose-700 dark:text-rose-300">"{currentCategory.title}"</span> sẽ bị xóa vĩnh viễn.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Nhập <span className="font-semibold text-rose-600 dark:text-rose-400">{currentCategory.slug}</span> để xác nhận:
            </h4>
            <Input
              value={slugConfirmation}
              onChange={(e) => {
                setSlugConfirmation(e.target.value);
                if (showError) setShowError(false);
              }}
              className={cn(
                "border-slate-200 dark:border-slate-700 focus:border-rose-200 dark:focus:border-rose-700 focus:ring-rose-500/20",
                showError && "border-rose-300 dark:border-rose-700 bg-rose-50/50 dark:bg-rose-900/20"
              )}
              placeholder={currentCategory.slug}
            />
            {showError && (
              <p className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                Vui lòng nhập chính xác slug để xác nhận
              </p>
            )}
          </div>
        </div>

        <AlertDialogFooter className="p-4 pt-0 flex sm:justify-end gap-2">
          <AlertDialogCancel className="mt-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700">
            Hủy bỏ
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmed || isPending}
            className={cn(
              "bg-rose-500 hover:bg-rose-600 text-white",
              !isConfirmed && "opacity-70 cursor-not-allowed"
            )}
          >
            {isPending ? "Đang xóa..." : "Xóa danh mục"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}