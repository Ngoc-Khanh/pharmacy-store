import { useUsers } from "@/providers/users.provider";
import { Dialog } from "@/components/ui/dialog";
import { Users } from "@/data/zod-schemas";

interface Props {
  currentUser?: Users;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



export function UsersActionDialog({ currentUser, open, onOpenChange }: Props) {
  const { setOpen } = useUsers();
  const isEdit = !!currentUser;
  

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >

    </Dialog>
  )
}