import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { UsersAPI } from "@/services/api/users.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AccountRole } from "@/data/enum";
import { motion } from "framer-motion";
import { Clock, Shield, Trash2, TriangleAlert } from "lucide-react";
import { memo, useState } from "react";
import { toast } from "sonner";

interface Props {
  currentUser: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UsersDeleteDialog = memo(function UsersDeleteDialog({ currentUser, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const isConfirmValid = value.trim() === currentUser.email;

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => UsersAPI.UserDelete(id),
    onSuccess: () => {
      toast.success(`Người dùng ${currentUser.firstname} ${currentUser.lastname} đã được xóa thành công.`);
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa người dùng. Vui lòng thử lại sau.");
    },
  });

  const handleDelete = () => {
    if (!isConfirmValid) return;
    deleteUserMutation.mutate(currentUser.id || "");
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
      handleConfirm={handleDelete}
      disabled={!isConfirmValid || deleteUserMutation.isPending}
      isLoading={deleteUserMutation.isPending}
      title={
        <motion.div 
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 text-rose-600 dark:text-rose-500"
        >
          <Trash2 className="h-5 w-5 stroke-rose-600 dark:stroke-rose-500" /> Xóa Tài Khoản Người Dùng
        </motion.div>
      }
      desc={
        <div className="space-y-5">
          <div className="rounded-lg border border-rose-200 dark:border-rose-800/30 bg-rose-50/50 dark:bg-rose-950/10 p-4">
            <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:text-left">
              <Avatar className="mb-3 h-16 w-16 border-2 border-rose-200 dark:border-rose-800/40 sm:mb-0 sm:mr-4">
                {currentUser.profileImage ? (
                  <AvatarImage src={currentUser.profileImage.url} alt={`${currentUser.firstname} ${currentUser.lastname}`} />
                ) : (
                  <AvatarFallback className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300">
                    {`${currentUser.firstname?.[0] || ''}${currentUser.lastname?.[0] || ''}`.toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {currentUser.firstname} {currentUser.lastname}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentUser.email}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      getRoleBadgeStyles(currentUser.role || "customer"),
                      "flex items-center gap-1"
                    )}
                  >
                    <Shield className="h-3 w-3" />
                    {currentUser.role === AccountRole.ADMIN
                      ? "Quản trị viên"
                      : currentUser.role === AccountRole.PHARMACIST
                      ? "Dược sĩ"
                      : "Khách hàng"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400 border-sky-200 dark:border-sky-800/50"
                  >
                    <Clock className="h-3 w-3" />
                    Tham gia {new Date(currentUser.createdAt || Date.now()).toLocaleDateString('vi-VN')}
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
            <Alert variant="destructive" className="border-rose-200/70 dark:border-rose-800/30 bg-rose-50/60 dark:bg-rose-950/10 text-rose-700 dark:text-rose-400">
              <TriangleAlert className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <AlertTitle className="flex items-center gap-1.5 font-medium">
                Cảnh báo: Hành động không thể hoàn tác
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-3">
                  Hành động này sẽ <span className="font-semibold">xóa vĩnh viễn</span> tài khoản người dùng
                  và tất cả dữ liệu liên quan của họ khỏi hệ thống Pharmacity Store.
                </p>
                <p>Dữ liệu sau sẽ bị xóa vĩnh viễn:</p>
                <ul className="ml-6 mt-1 list-disc text-sm space-y-1">
                  <li>Thông tin cá nhân và hồ sơ người dùng</li>
                  <li>Lịch sử đơn hàng và hồ sơ kê đơn thuốc</li>
                  <li>Tùy chọn và cài đặt tài khoản</li>
                  <li>Lịch sử tư vấn và liên hệ với dược sĩ</li>
                </ul>
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
              Vui lòng nhập <span className="font-mono text-rose-600 dark:text-rose-500">{currentUser.email}</span> để xác nhận:
            </Label>
            <div className="relative">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={currentUser.email}
                className={cn(
                  "pr-8 transition-all focus:border-rose-500/50 hover:border-rose-400/30",
                  isConfirmValid
                    ? "border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400"
                    : "border-border/50"
                )}
              />
              {isConfirmValid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-2.5 top-2.5"
                >
                  <Trash2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                </motion.div>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Xác nhận này giúp ngăn chặn các hành động xóa tài khoản vô tình hoặc không mong muốn.
            </p>
          </motion.div>
        </div>
      }
      confirmText={
        deleteUserMutation.isPending ? (
          <span className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Đang xử lý...
          </span>
        ) : "Xóa Vĩnh Viễn"
      }
      destructive
    />
  )
})