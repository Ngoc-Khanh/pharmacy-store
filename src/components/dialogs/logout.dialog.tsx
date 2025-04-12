import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { routes, siteConfig } from "@/config";
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
      loading: "Logging out...",
      success: () => {
        onClose();
        window.location.href = routes.login;
        return "Logged out successfully";
      },
      error: "Failed to log out",
    });
  }, [onClose]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? <br />
            You will need to log in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}