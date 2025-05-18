import { useUsersDialog } from "@/atoms/dialog.atom";
import { UsersActionDialog } from "./users.action-dialog";
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
        </>
      )}
    </>
  )
}