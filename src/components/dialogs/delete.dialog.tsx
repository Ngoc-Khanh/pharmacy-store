import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ConfirmDialog } from "../custom/confirm-dialog";
import { TriangleAlert } from "lucide-react";
import { User } from "@/data/interfaces";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { toast } from "sonner";


interface Props {
  currentRow: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteDialogs({ currentRow, open, onOpenChange }: Props) {
  // const quertClient = useQueryClient();
  const [value, setValue] = useState("");

  // const deleteProductMutation = useMutation({
  //   mutationFn: (id: string | number) => ProductApi.deleteProduct(id),
  //   onSuccess: () => {
  //     toast.success("Product deleted successfully.");
  //     onOpenChange(false);
  //     quertClient.invalidateQueries({ queryKey: ["products"] });
  //   },
  //   onError: (error) => {
  //     toast.error(error.message || "Failed to delete product.");
  //   }
  // })

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return;
    toast.success("User deleted successfully.");
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className="text-destructive">
          <TriangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={24}
          />{" "}
          Delete Product
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure want to delete{" "}
            <span className="font-bold">{currentRow.username}</span>
            <br />
            This action will remove the user working{" "}
            <span className="font-bold">
              {currentRow.username.toUpperCase()}
            </span>{" "}
            from the website. This cannot be undone.
          </p>

          <Label className="my-2 space-y-2">
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type the username to confirm."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              This action cannot be undone. This will permanently delete the
              user.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
