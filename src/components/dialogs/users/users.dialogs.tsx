import { UsersActionDialog } from "./users.action-dialog";
import { UsersChangeStatusDialog } from "./users.change-status-dialog";
import { UsersDeleteDialog } from "./users.delete-dialog";
import { ViewUsersDialog } from "./users.view-dialogs";
import { useUsers } from "@/providers/users.provider";


export default function UsersDialogs() {
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

          <UsersChangeStatusDialog
            key={`user-ban-${currentUser.id}`}
            open={open === "ban"}
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
          />
        </>
      )}
    </>
  )
}