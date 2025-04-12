import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useUsers } from "@/providers/users.provider";
import { User } from "lucide-react";

import { ViewUsersDialog } from "./users.view-dialogs";

export function UsersDialogs() {
  const { open, setOpen, currentUser, setCurrentUser } = useUsers();

  return (
    <>
      {currentUser && (
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
      )}

      <Dialog
        open={open === "add"}
        onOpenChange={() => open === "add" && setOpen(null)}
      >
        <DialogContent className="sm:max-w-[650px] md:max-w-[750px] rounded-xl p-6 shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">Add New User</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Create a new user account in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8">
            <div className="flex flex-col items-center justify-center gap-3 bg-muted/20 p-6 rounded-lg">
              <User className="h-12 w-12 text-muted-foreground/60" />
              <p className="text-base text-muted-foreground">User add form will be implemented here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open === "edit"}
        onOpenChange={() => open === "edit" && setOpen(null)}
      >
        <DialogContent className="sm:max-w-[650px] md:max-w-[750px] rounded-xl p-6 shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">Edit User</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Update user information and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8">
            <div className="flex flex-col items-center justify-center gap-3 bg-muted/20 p-6 rounded-lg">
              <User className="h-12 w-12 text-muted-foreground/60" />
              <p className="text-base text-muted-foreground">User edit form will be implemented here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open === "delete"}
        onOpenChange={() => open === "delete" && setOpen(null)}
      >
        <DialogContent className="sm:max-w-[500px] rounded-xl p-6 shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-red-500">Delete User</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="flex flex-col items-center justify-center gap-3 bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
              <User className="h-12 w-12 text-red-400" />
              <p className="text-base text-red-600 dark:text-red-400">Delete confirmation will be implemented here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}