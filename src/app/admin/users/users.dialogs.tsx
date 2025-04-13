import { ViewUsersDialog, UsersActionDialog, UsersDeleteDialog } from "@/components/dialogs/users";
import { useUsers } from "@/providers/users.provider";

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
        </>
      )}
    </>
  )
}