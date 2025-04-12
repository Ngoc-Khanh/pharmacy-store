import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ViewUsersDialog, UsersActionDialog, UsersDeleteDialog } from "@/components/dialogs/users";
import { useUsers } from "@/providers/users.provider";
import { User } from "lucide-react";

export function UsersDialogs() {
  const { open, setOpen, currentUser, setCurrentUser } = useUsers();

  return (
    <>
      <UsersActionDialog
        key="user-add"
        open={open === "add"}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null);
          else setOpen("add");
        }}
      />

      {currentUser && (
        <>
          <ViewUsersDialog
            key={`user-view-${currentUser.id}`}
            open={open === "view"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentUser(null);
                }, 300);
              }
            }}
            currentUser={currentUser}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentUser.id}`}
            open={open === "delete"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentUser(null);
                }, 300);
              }
            }}
            currentUser={currentUser}
          />
        </>
      )}
    </>
  )
}