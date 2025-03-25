import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddresses } from "@/providers/addresses.provider";
import { AccountAPI } from "@/services/api/account.api";
import { AddressSchema } from "@/data/zod-schemas";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Trash, CheckCircle } from "lucide-react";
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
      toast.success("Đã đặt địa chỉ mặc định thành công");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      toast.error("Không thể đặt địa chỉ mặc định");
    },
  });

  const handleAction = (action: "delete" | "edit") => {
    setCurrentAddress(address);
    setOpen(action);
  };

  const { isDefault, id } = address;
  const isPending = setDefaultAddressMutation.isPending;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleAction("edit")}
        className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30"
      >
        <Edit className="h-4 w-4 mr-1" />
        Sửa
      </Button>
      
      {!isDefault && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
            onClick={() => handleAction("delete")}
          >
            <Trash className="h-4 w-4 mr-1" />
            Xóa
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => setDefaultAddressMutation.mutate(id)}
            disabled={isPending}
            className="border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/50 text-green-600 dark:text-green-400"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                Đang đặt...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Đặt làm mặc định
              </>
            )}
          </Button>
        </>
      )}
    </div>
  )
}
