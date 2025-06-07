import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddUserDto } from "@/data/dto";
import { AccountRole, AccountStatus } from "@/data/enum";
import { User } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { UsersAPI } from "@/services/api/users.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { Ban, Check, Clock, Shield, TriangleAlert, UserCheck } from "lucide-react";
import { memo, useState } from "react";
import { toast } from "sonner";

interface Props {
  currentUser?: User;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mode?: "suspend" | "activate";
}

export const UsersChangeStatusDialog = memo(function UsersChangeStatusDialog({ currentUser, open, onOpenChange, mode = "suspend" }: Props) {
  const queryClient = useQueryClient();
  const [confirmValue, setConfirmValue] = useState("");
  const isConfirmValid = confirmValue.trim() === currentUser?.email;
  const isActivating = mode === "activate";

  const changeStatusMutation = useMutation({
    mutationFn: () => UsersAPI.UserUpdate(
      currentUser?.id || "", 
      { status: isActivating ? AccountStatus.ACTIVE : AccountStatus.SUSPENDED } as AddUserDto
    ),
    onSuccess: () => {
      toast.success(
        isActivating 
          ? `Người dùng ${currentUser?.firstname} ${currentUser?.lastname} đã được mở khóa.`
          : `Người dùng ${currentUser?.firstname} ${currentUser?.lastname} đã bị khóa.`
      );
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message || `Không thể ${isActivating ? "mở khóa" : "khóa"} người dùng.`);
    },
  });

  const handleChangeStatus = () => {
    if (!isConfirmValid) return;
    changeStatusMutation.mutate();
  };

  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-900/50";
      case "pharmacist":
        return "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200 dark:border-sky-900/50";
      default:
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50";
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleChangeStatus}
      disabled={!isConfirmValid || changeStatusMutation.isPending}
      isLoading={changeStatusMutation.isPending}
      title={
        <motion.div
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`flex items-center gap-2 ${isActivating ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}
        >
          {isActivating ? (
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 stroke-emerald-600 dark:stroke-emerald-400" />
              Mở Khóa Tài Khoản Người Dùng
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 stroke-amber-600 dark:stroke-amber-400" />
              Khóa Tài Khoản Người Dùng
            </div>
          )}
        </motion.div>
      }
      desc={
        <div className="space-y-5">
          <div className={`rounded-lg border ${isActivating ? "border-emerald-200 dark:border-emerald-800/30 bg-emerald-50/50 dark:bg-emerald-950/10" : "border-amber-200 dark:border-amber-800/30 bg-amber-50/50 dark:bg-amber-950/10"} p-4`}>
            <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:text-left">
              <Avatar className={`mb-3 h-16 w-16 border-2 ${isActivating ? "border-emerald-200 dark:border-emerald-800/40" : "border-amber-200 dark:border-amber-800/40"} sm:mb-0 sm:mr-4`}>
                {currentUser?.profileImage ? (
                  <AvatarImage src={currentUser?.profileImage.url} alt={`${currentUser?.firstname} ${currentUser?.lastname}`} />
                ) : (
                  <AvatarFallback className={isActivating ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"}>
                    {`${currentUser?.firstname?.[0] || ''}${currentUser?.lastname?.[0] || ''}`.toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {currentUser?.firstname} {currentUser?.lastname}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentUser?.email}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      getRoleBadgeStyles(currentUser?.role || AccountRole.CUSTOMER),
                      "flex items-center gap-1"
                    )}
                  >
                    <Shield className="h-3 w-3" />
                    {currentUser?.role === AccountRole.ADMIN
                      ? "Quản trị viên"
                      : currentUser?.role === AccountRole.PHARMACIST
                        ? "Dược sĩ"
                        : "Khách hàng"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400 border-sky-200 dark:border-sky-800/50"
                  >
                    <Clock className="h-3 w-3" />
                    Tham gia {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Alert 
              variant={isActivating ? "default" : "destructive"} 
              className={isActivating 
                ? "border-emerald-200/70 dark:border-emerald-800/30 bg-emerald-50/60 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400" 
                : "border-amber-200/70 dark:border-amber-800/30 bg-amber-50/60 dark:bg-amber-950/10 text-amber-700 dark:text-amber-400"
              }
            >
              {isActivating ? (
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              )}
              <AlertTitle className="flex items-center gap-1.5 font-medium">
                {isActivating ? "Thông Báo" : "Cảnh Báo"}
              </AlertTitle>
              <AlertDescription className="mt-2">
                {isActivating ? (
                  <p className="mb-3">
                    Hành động này sẽ <span className="font-semibold">khôi phục quyền truy cập của người dùng</span> vào Pharmacity Store.
                    Người dùng sẽ có thể:
                    <ul className="ml-6 mt-2 list-disc text-sm space-y-1">
                      <li>Đăng nhập vào tài khoản của họ</li>
                      <li>Đặt hàng mới và truy cập các đơn hàng hiện có</li>
                      <li>Tham gia vào các cuộc tư vấn và trò chuyện hỗ trợ</li>
                      <li>Truy cập tất cả các tính năng của nền tảng</li>
                    </ul>
                  </p>
                ) : (
                  <>
                    <p className="mb-3">
                      Hành động này sẽ tạm thời <span className="font-semibold">hạn chế quyền truy cập của người dùng</span> vào Pharmacity Store.
                      Người dùng sẽ không thể:
                    </p>
                    <ul className="ml-6 mt-2 list-disc text-sm space-y-1">
                      <li>Đăng nhập vào tài khoản của họ</li>
                      <li>Đặt hàng mới hoặc truy cập các đơn hàng hiện có</li>
                      <li>Tham gia vào các cuộc tư vấn hoặc trò chuyện hỗ trợ</li>
                      <li>Truy cập bất kỳ tính năng nào của nền tảng cho đến khi được mở khóa</li>
                    </ul>
                  </>
                )}
              </AlertDescription>
            </Alert>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-border/50 bg-card/40 p-4"
          >
            <Label className="mb-2 block font-medium">
              Vui lòng nhập <span className="font-mono text-foreground/90">{currentUser?.email}</span> để xác nhận:
            </Label>
            <div className="relative">
              <Input
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
                placeholder={currentUser?.email}
                className={cn(
                  "pr-8 transition-all focus:border-emerald-500/50 hover:border-emerald-400/30",
                  isConfirmValid
                    ? isActivating 
                      ? "border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400" 
                      : "border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400"
                    : "border-border/50"
                )}
              />
              {isConfirmValid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-2.5 top-2.5"
                >
                  {isActivating ? (
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Ban className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  )}
                </motion.div>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Xác nhận này giúp ngăn chặn các hành động vô tình đối với tài khoản người dùng.
            </p>
          </motion.div>
        </div>
      }
      confirmText={
        changeStatusMutation.isPending ? (
          <span className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Đang xử lý...
          </span>
        ) : isActivating ? "Mở Khóa Người Dùng" : "Khóa Người Dùng"
      }
    />
  );
});