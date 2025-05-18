import { useUsersDialog } from "@/atoms/dialog.atom";
import { UsersActionDialog } from "./users.action-dialog";
import { UsersChangeStatusDialog } from "./users.change-status-dialog";
import { ViewUsersDialog } from "./users.view-dialogs";

export default function UsersDialogs() {
  const { open, setOpen, currentUser, setCurrentUser } = useUsersDialog();

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
          <UsersActionDialog
            key={`user-edit-${currentUser.id}`}
            open={open === "edit"}
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

          <UsersChangeStatusDialog
            key={`user-suspend-${currentUser.id}`}
            open={open === "suspend"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentUser(null);
                }, 300);
              }
            }}
            currentUser={currentUser}
            mode="suspend"
          />

          <UsersChangeStatusDialog
            key={`user-activate-${currentUser.id}`}
            open={open === "activate"}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null);
                setTimeout(() => {
                  setCurrentUser(null);
                }, 300);
              }
            }}
            currentUser={currentUser}
            mode="activate"
          />
        </>
      )}
    </>
  )
}