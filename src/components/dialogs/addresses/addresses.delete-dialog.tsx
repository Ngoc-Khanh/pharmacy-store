import { Alert, AlertDescription, AlertTitle } from "@/components/custom/alert";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AccountAPI } from "@/services/api/account.api";
import { AddressSchema } from "@/data/zod-schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  currentAddress: AddressSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddressesDeleteDialog({ currentAddress, open, onOpenChange }: Props) {
  const [value, setValue] = useState("");

  const { refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: AccountAPI.getAddresses,
    enabled: false
  });

  const deleteAddressMutation = useMutation({
    mutationFn: AccountAPI.deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      onOpenChange(false);
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete address");
    }
  });

  const handleDelete = () => {
    const trimmedValue = value.trim();
    if (trimmedValue !== currentAddress.name) return;
    deleteAddressMutation.mutate(currentAddress.id);
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentAddress.name}
      title={
        <span className="text-destructive">
          <TriangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={24}
          />{" "}
          Delete Address
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure want to delete{" "}
            <span className="font-bold">{currentAddress.name}</span>
            <br />
            This action will remove the address{" "}
            <span className="font-bold">
              {currentAddress.name.toUpperCase()}
            </span>{" "}
            from your account. This cannot be undone.
          </p>

          <Label className="my-2">
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type the address name to confirm."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              This action cannot be undone. This will permanently delete the
              address.
            </AlertDescription>
          </Alert>
        </div>
      }
    />
  )
}