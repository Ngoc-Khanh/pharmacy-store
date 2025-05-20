import { useCategoriesDialog } from "@/atoms/dialog.atom";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Category } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { CategoriesAPI } from "@/services/api/categories.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, CheckCircle2, Clock, ShieldCheck, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  currentCategory?: Category;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  active?: boolean;
}

export default function CategoriesChangeStatus({ currentCategory, open, onOpenChange, active = true }: Props) {
  const queryClient = useQueryClient();
  const { setCurrentCategory } = useCategoriesDialog();
  const [isActive, setIsActive] = useState(currentCategory?.isActive || active);
  
  const statusText = isActive ? "kích hoạt" : "vô hiệu hóa";
  const statusTitle = isActive ? "Kích hoạt danh mục" : "Vô hiệu hóa danh mục";
  
  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: () => {
      if (!currentCategory) throw new Error("Không tìm thấy danh mục");
      return CategoriesAPI.CategoriesUpdate(currentCategory.id, {
        title: currentCategory.title,
        description: currentCategory.description,
        isActive: isActive
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(`Đã ${statusText} danh mục thành công`, {
        className: "bg-white dark:bg-slate-800 dark:text-white border-emerald-100 dark:border-slate-700",
      });
      onOpenChange(false);
      setTimeout(() => {
        setCurrentCategory(null);
      }, 300);
    },
    onError: (error) => {
      toast.error(`Không thể ${statusText} danh mục, vui lòng thử lại`, {
        className: "bg-white dark:bg-slate-800 dark:text-white border-rose-100 dark:border-slate-700",
        description: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
      });
    },
  });

  if (!currentCategory) return null;

  const handleConfirm = () => {
    updateStatus();
  };

  const bgColor = isActive 
    ? "bg-emerald-50 dark:bg-emerald-900/20" 
    : "bg-amber-50 dark:bg-amber-900/20";
    
  const borderColor = isActive 
    ? "border-emerald-100 dark:border-emerald-900/30" 
    : "border-amber-100 dark:border-amber-900/30";
    
  const textColor = isActive 
    ? "text-emerald-700 dark:text-emerald-400" 
    : "text-amber-700 dark:text-amber-400";

  return (
    <AlertDialog open={open} onOpenChange={(newOpen) => {
      onOpenChange(newOpen);
      if (!newOpen) {
        setTimeout(() => {
          setIsActive(currentCategory?.isActive || active);
        }, 300);
      }
    }}>
      <AlertDialogContent className="sm:max-w-[440px] p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className={`p-4 border-b ${borderColor} ${bgColor}`}>
          <AlertDialogHeader className="text-left space-y-1">
            <AlertDialogTitle className="text-lg font-medium flex items-center gap-2">
              {isActive ? (
                <ShieldCheck className={`h-5 w-5 ${textColor}`} />
              ) : (
                <Ban className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              )}
              <span className={textColor}>{statusTitle}</span>
            </AlertDialogTitle>
            <AlertDialogDescription className={cn(
              isActive ? "text-emerald-600/90 dark:text-emerald-400/90" : "text-amber-600/90 dark:text-amber-400/90"
            )}>
              {isActive 
                ? "Kích hoạt danh mục sẽ cho phép người dùng xem và truy cập." 
                : "Vô hiệu hóa danh mục sẽ ẩn khỏi giao diện người dùng."}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        
        <div className="p-4 space-y-4">
          <div className={cn(
            "border rounded-md p-3 flex items-start gap-3",
            isActive 
              ? "border-emerald-100 dark:border-emerald-800/30 bg-emerald-50/50 dark:bg-emerald-900/10" 
              : "border-amber-100 dark:border-amber-800/30 bg-amber-50/50 dark:bg-amber-900/10"
          )}>
            <div className="flex-shrink-0 p-1.5 rounded-full bg-white dark:bg-slate-800">
              <Tag className={cn(
                "h-5 w-5",
                isActive ? "text-emerald-500" : "text-amber-500"
              )} />
            </div>
            <div>
              <h4 className={cn(
                "font-medium text-sm",
                isActive ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"
              )}>
                Thông tin danh mục
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                <strong className="font-medium">Tiêu đề:</strong> {currentCategory.title}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <strong className="font-medium">Slug:</strong> {currentCategory.slug}
              </p>
              <div className="mt-3 flex items-center">
                <div className="flex items-center gap-1.5 mr-3">
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    Trạng thái:
                  </span>
                  {currentCategory.isActive ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Đang hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      <Clock className="h-3 w-3 mr-1" />
                      Đã vô hiệu hóa
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 pb-1">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Thay đổi trạng thái
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Bật hoặc tắt để thay đổi trạng thái
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className={cn(
                isActive 
                  ? "bg-emerald-500 data-[state=checked]:bg-emerald-500" 
                  : "bg-amber-500 data-[state=unchecked]:bg-amber-500"
              )}
            />
          </div>
        </div>
        
        <AlertDialogFooter className="p-4 pt-0 flex sm:justify-end gap-2">
          <AlertDialogCancel className="mt-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700">
            Hủy bỏ
          </AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            disabled={isPending}
            className={cn(
              "text-white",
              isActive 
                ? "bg-emerald-500 hover:bg-emerald-600" 
                : "bg-amber-500 hover:bg-amber-600"
            )}
          >
            {isPending ? "Đang xử lý..." : isActive ? "Kích hoạt danh mục" : "Vô hiệu hóa danh mục"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}