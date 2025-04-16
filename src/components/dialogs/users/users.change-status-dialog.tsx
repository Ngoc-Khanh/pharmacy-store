import { Alert, AlertDescription, AlertTitle } from "@/components/custom/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Ban, Clock, Shield, TriangleAlert, User } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { UsersAPI } from "@/services/api/users.api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users } from "@/data/zod-schemas";
import { memo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  currentUser: Users;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const UsersChangeStatusDialog = memo(function UsersBanDialog({ currentUser, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const [confirmValue, setConfirmValue] = useState("");
  const [reason, setReason] = useState("");
  const isConfirmValid = confirmValue.trim() === currentUser.email;
  const isReasonEmpty = !reason.trim();
  const isBanned = currentUser.status === "banned";

  const changeStatusMutation = useMutation({
    mutationFn: () => UsersAPI.changeStatusUser(
      currentUser.id || "", 
      { status: isBanned ? "active" : "banned" }
    ),
    onSuccess: () => {
      toast.success(
        isBanned 
          ? `User ${currentUser.firstName} ${currentUser.lastName} has been unbanned.`
          : `User ${currentUser.firstName} ${currentUser.lastName} has been banned.`
      );
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message || `Failed to ${isBanned ? "unban" : "ban"} user.`);
    },
  });

  const handleChangeStatus = () => {
    if (!isConfirmValid || (!isBanned && isReasonEmpty)) return;
    changeStatusMutation.mutate();
  };

  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 border-red-200 dark:border-red-800";
      case "pharmacist":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300 border-green-200 dark:border-green-800";
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleChangeStatus}
      disabled={!isConfirmValid || (!isBanned && isReasonEmpty) || changeStatusMutation.isPending}
      isLoading={changeStatusMutation.isPending}
      title={
        <motion.div
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 text-destructive"
        >
          {isBanned ? (
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 stroke-destructive" />
              Unban User Account
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Ban className="h-5 w-5 stroke-destructive" />
              Ban User Account
            </div>
          )}
        </motion.div>
      }
      desc={
        <div className="space-y-5">
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:text-left">
              <Avatar className="mb-3 h-16 w-16 border-2 border-destructive/20 sm:mb-0 sm:mr-4">
                {currentUser.profileImage ? (
                  <AvatarImage src={currentUser.profileImage.url} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                ) : (
                  <AvatarFallback className="bg-destructive/10">
                    <User className="h-8 w-8 text-destructive" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentUser.email}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      getRoleBadgeStyles(currentUser.role || "customer"),
                      "flex items-center gap-1"
                    )}
                  >
                    <Shield className="h-3 w-3" />
                    {currentUser.role?.toUpperCase()}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                  >
                    <Clock className="h-3 w-3" />
                    Active since {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}
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
            <Alert variant="destructive" className="border-destructive/30">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-1.5 font-medium">
                {isBanned ? "Notice" : "Warning"}
              </AlertTitle>
              <AlertDescription className="mt-2">
                {isBanned ? (
                  <p className="mb-3">
                    This action will <span className="font-semibold">restore user access</span> to the Pharmacity Store.
                    The user will regain the ability to:
                    <ul className="ml-6 mt-1 list-disc text-sm">
                      <li>Log in to their account</li>
                      <li>Place new orders and access existing ones</li>
                      <li>Participate in consultations and support chats</li>
                      <li>Access all platform features</li>
                    </ul>
                  </p>
                ) : (
                  <>
                    <p className="mb-3">
                      This action will temporarily <span className="font-semibold">restrict user access</span> to the Pharmacity Store.
                      The user will be unable to:
                    </p>
                    <ul className="ml-6 mt-1 list-disc text-sm">
                      <li>Log in to their account</li>
                      <li>Place new orders or access existing ones</li>
                      <li>Participate in consultations or support chats</li>
                      <li>Access any platform features until unbanned</li>
                    </ul>
                  </>
                )}
              </AlertDescription>
            </Alert>
          </motion.div>

          {!isBanned && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg border border-border p-4"
            >
              <Label htmlFor="ban-reason" className="mb-2 block font-medium">
                Reason for banning
              </Label>
              <Textarea
                id="ban-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a detailed reason for banning this user..."
                className={cn(
                  "min-h-24 resize-none transition-all",
                  isReasonEmpty ? "border-destructive/50" : "border-border"
                )}
              />
              {isReasonEmpty && (
                <p className="mt-1.5 text-xs text-destructive">
                  A detailed reason is required for accountability and future reference
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border border-border p-4"
          >
            <Label className="mb-2 block font-medium">
              Please type <span className="font-mono text-destructive">{currentUser.email}</span> to confirm:
            </Label>
            <div className="relative">
              <Input
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
                placeholder={currentUser.email}
                className={cn(
                  "pr-8 transition-all",
                  isConfirmValid
                    ? "border-destructive text-destructive"
                    : "border-border"
                )}
              />
              {isConfirmValid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-2.5 top-2.5"
                >
                  {isBanned ? (
                    <User className="h-4 w-4 text-destructive" />
                  ) : (
                    <Ban className="h-4 w-4 text-destructive" />
                  )}
                </motion.div>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              This confirmation helps prevent accidental actions against user accounts.
            </p>
          </motion.div>
        </div>
      }
      confirmText={
        changeStatusMutation.isPending ? (
          <span className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Processing...
          </span>
        ) : isBanned ? "Unban User" : "Ban User"
      }
      destructive
    />
  );
});