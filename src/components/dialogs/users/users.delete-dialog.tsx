import { Alert, AlertDescription, AlertTitle } from "@/components/custom/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Shield, TriangleAlert, Trash2, User, UserX } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { UsersAPI } from "@/services/api/users.api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users } from "@/data/zod-schemas";
import { memo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  currentUser: Users;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UsersDeleteDialog = memo(function UsersDeleteDialog({ currentUser, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => UsersAPI.deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully.");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete user.");
    },
  });

  const handleDelete = () => {
    if (value.trim() !== currentUser.email) return;
    deleteUserMutation.mutate(currentUser.id || "");
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
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentUser.email}
      title={
        <motion.div 
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 text-destructive"
        >
          <UserX className="h-5 w-5 stroke-destructive" /> Delete User
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
                Warning
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-3">
                  This action <span className="font-semibold">cannot be undone</span>. This will permanently delete the user
                  account and remove all associated data from our servers.
                </p>
                <p>All data associated with this account will be permanently deleted, including:</p>
                <ul className="ml-6 mt-1 list-disc text-sm">
                  <li>User profile and personal information</li>
                  <li>Order history and prescription records</li>
                  <li>Account preferences and settings</li>
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-border p-4"
          >
            <Label className="mb-2 block font-medium">
              Please type <span className="font-mono text-destructive">{currentUser.email}</span> to confirm:
            </Label>
            <div className="relative">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={currentUser.email}
                className={cn(
                  "pr-8 transition-all",
                  value.trim() === currentUser.email
                    ? "border-destructive text-destructive"
                    : "border-border"
                )}
              />
              {value.trim() === currentUser.email && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-2.5 top-2.5"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </motion.div>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              We require confirmation to prevent accidental deletions.
            </p>
          </motion.div>
        </div>
      }
      confirmText="Permanently Delete"
      destructive
    />
  )
})