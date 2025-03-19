import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddresses } from "@/providers/addresses.provider";
import { AccountAPI } from "@/services/api/account.api";
import { AddressSchema } from "@/data/zod-schemas";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  address: AddressSchema;
}

export default function AddressesButtonPrimary({ address }: Props) {
  const { setOpen, setCurrentAddress } = useAddresses();
  const queryClient = useQueryClient();

  const setDefaultAddressMutation = useMutation({
    mutationFn: AccountAPI.setDefaultAddress,
    onSuccess: () => {
      toast.success("Default address set successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      toast.error("Failed to set default address");
    },
  });

  const handleAction = (action: "delete" | "edit") => {
    setCurrentAddress(address);
    setOpen(action);
  };

  const { isDefault, id } = address;
  const isPending = setDefaultAddressMutation.isPending;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant="link"
          size="sm"
          onClick={() => handleAction("edit")}
        >
          Edit
        </Button>
        {!isDefault && (
          <Button
            variant="link"
            size="sm"
            className="text-red-500"
            onClick={() => handleAction("delete")}
          >
            Delete
          </Button>
        )}
      </div>
      {!isDefault && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setDefaultAddressMutation.mutate(id)}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Setting...
            </>
          ) : (
            "Set as Default"
          )}
        </Button>
      )}
    </div>
  )
}
