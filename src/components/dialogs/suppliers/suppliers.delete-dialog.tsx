import { useSuppliersDialog } from "@/atoms/dialog.atom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Supplier } from "@/data/interfaces";
import { SupplierAPI } from "@/services/api/supplier.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  currentSupplier: Supplier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SuppliersDeleteDialog({ currentSupplier, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const { setCurrentSupplier } = useSuppliersDialog();
  const [nameConfirmation, setNameConfirmation] = useState("");
  const [showError, setShowError] = useState(false);

  const isConfirmed = nameConfirmation === currentSupplier.name;

  const { mutate: deleteSupplier, isPending } = useMutation({
    mutationFn: () => SupplierAPI.DeleteSupplier(currentSupplier.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Đã xóa nhà cung cấp thành công", {
        className: "bg-white dark:bg-slate-800 dark:text-white border-emerald-100 dark:border-slate-700",
      });
      
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => {
          setCurrentSupplier(null);
          setNameConfirmation("");
          setShowError(false);
        }, 300);
      }, 1000);
    },
    onError: (error) => {
      toast.error("Không thể xóa nhà cung cấp, vui lòng thử lại", {
        className: "bg-white dark:bg-slate-800 dark:text-white border-rose-100 dark:border-slate-700",
        description: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định",
      });
    },
  });

  const handleConfirmDelete = () => {
    if (isConfirmed) deleteSupplier();
    else setShowError(true);
  };

  return (
    <AlertDialog open={open} onOpenChange={(newOpen) => {
      if (isPending) return;
      
      onOpenChange(newOpen);
      if (!newOpen) {
        setNameConfirmation("");
        setShowError(false);
      }
    }}>
      <AlertDialogContent className="sm:max-w-md overflow-hidden p-0 gap-0 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="bg-rose-50 dark:bg-rose-950/20 p-4 border-b border-rose-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/30">
              <Trash2 className="h-5 w-5 text-rose-500 dark:text-rose-400" />
            </div>
            <AlertDialogHeader className="p-0 space-y-1">
              <AlertDialogTitle className="text-rose-600 dark:text-rose-400 text-xl">
                Xóa nhà cung cấp
              </AlertDialogTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
                Thao tác này sẽ xóa vĩnh viễn dữ liệu nhà cung cấp
              </p>
            </AlertDialogHeader>
          </div>
        </div>
        
        <div className="p-6">
          <AlertDialogDescription className="space-y-4 text-slate-700 dark:text-slate-300">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-lg p-3 flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Bạn có chắc chắn muốn xóa nhà cung cấp <span className="font-semibold">{currentSupplier.name}</span>? 
                Hành động này không thể hoàn tác và có thể ảnh hưởng đến dữ liệu liên quan.
              </p>
            </div>
            
            <div className="pt-2">
              <Label htmlFor="confirm-name" className="text-sm font-medium block mb-2">
                Nhập tên nhà cung cấp để xác nhận xóa:
              </Label>
              <Input
                id="confirm-name"
                value={nameConfirmation}
                onChange={(e) => {
                  setNameConfirmation(e.target.value);
                  if (showError) setShowError(false);
                }}
                placeholder={currentSupplier.name}
                className={`transition-all ${showError ? 'border-rose-500 focus-visible:ring-rose-500 bg-rose-50 dark:bg-rose-950/20' : ''}`}
              />
              {showError && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-rose-500 mt-1.5 flex items-center gap-1.5"
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  Tên nhà cung cấp không khớp. Vui lòng nhập chính xác.
                </motion.p>
              )}
            </div>
          </AlertDialogDescription>
        </div>
        
        <AlertDialogFooter className="p-4 border-t border-slate-200 dark:border-slate-700 gap-2 sm:gap-0 bg-slate-50 dark:bg-slate-900/40">
          <AlertDialogCancel asChild>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto border-slate-300 dark:border-slate-700"
              disabled={isPending}
            >
              Hủy
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button 
              onClick={handleConfirmDelete}
              disabled={!isConfirmed || isPending} 
              variant="destructive"
              className="w-full sm:w-auto transition-all"
            >
              {isPending ? (
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </motion.div>
              ) : (
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xác nhận xóa
                </motion.div>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
