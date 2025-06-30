
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { routes, siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import { AlertTriangle, LogOut, X } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

export function LogOutDialog({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleLogout = useCallback(() => {
    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Sonner" }), 1000)
      );
    localStorage.removeItem(siteConfig.auth.jwt_key);
    toast.promise(promise(), {
      loading: "Đang đăng xuất...",
      success: () => {
        onClose();
        window.location.href = routes.auth.login;
        return "Đăng xuất thành công";
      },
      error: "Đăng xuất thất bại",
    });
  }, [onClose]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md shadow-xl dark:shadow-emerald-900/5 bg-white dark:bg-zinc-900 p-0 overflow-hidden rounded-xl border border-emerald-100/50 dark:border-emerald-800/20">
        <div className="absolute top-3 right-3 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-7 w-7 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 pt-8 pb-6 px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-white dark:bg-zinc-800 shadow-md rounded-full p-3 mb-4 border border-emerald-200/50 dark:border-emerald-800/30">
              <AlertTriangle className="h-6 w-6 text-amber-500 dark:text-amber-400" />
            </div>
            <AlertDialogHeader className="space-y-2">
              <AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Bạn có chắc chắn muốn đăng xuất?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400 max-w-[300px] mx-auto">
                Bạn sẽ cần đăng nhập lại để truy cập tài khoản của mình.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </div>

        <div className="p-6 pt-4 flex flex-col sm:flex-row gap-3 bg-white dark:bg-zinc-900">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium sm:flex-1"
          >
            Hủy bỏ
          </Button>
          
          <Button 
            onClick={handleLogout}
            className={cn(
              "relative sm:flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
              "text-white font-medium shadow-md hover:shadow-lg transition-all gap-2 overflow-hidden"
            )}
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
            <motion.div 
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%", opacity: 0.5 }}
              animate={{ x: "100%", opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
