import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressSchema } from "@/data/schemas";
import { AccountAPI } from "@/services/v1";
import { useMutation, useQuery } from "@tanstack/react-query";

import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  currentAddress: AddressSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressDeleteDialog({ currentAddress, open, onOpenChange }: Props) {
  const [value, setValue] = useState("");

  const { refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: AccountAPI.getAddresses,
    enabled: false
  });

  const deleteAddressMutation = useMutation({
    mutationFn: AccountAPI.deleteAddress,
    onSuccess: async () => {
      onOpenChange(false);
      try {
        await refetch();
        toast.success("Địa chỉ đã được xóa thành công");
      } catch {
        toast.error("Có lỗi khi cập nhật danh sách địa chỉ");
      }
    },
    onError: () => {
      toast.error("Xóa địa chỉ thất bại");
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
        <div className="flex items-center space-x-2 text-destructive">
          <TriangleAlert className="h-6 w-6 stroke-destructive" />
          <span className="text-lg font-semibold">Xóa Địa Chỉ</span>
        </div>
      }
      desc={
        <div className="space-y-5 py-2">
          <div className="rounded-lg border border-muted bg-muted/20 p-4 shadow-sm">
            <p className="text-base">
              Bạn có chắc chắn muốn xóa{" "}
              <span className="font-bold text-primary">{currentAddress.name}</span>?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Hành động này sẽ xóa địa chỉ{" "}
              <span className="font-medium">
                {currentAddress.name.toUpperCase()}
              </span>{" "}
              khỏi tài khoản của bạn.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-delete" className="font-medium">
              Để xác nhận, hãy nhập <span className="font-bold text-destructive">"{currentAddress.name}"</span>
            </Label>
            <Input
              id="confirm-delete"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-input/60 transition-colors focus-visible:border-destructive focus-visible:ring-1 focus-visible:ring-destructive/30"
              placeholder={`Nhập "${currentAddress.name}" để xác nhận`}
            />
          </div>

          <Alert variant="destructive" className="border-destructive/50 bg-destructive/5">
            <AlertTitle className="flex items-center font-medium">
              <TriangleAlert className="mr-2" size={16} />
              Cảnh Báo
            </AlertTitle>
            <AlertDescription className="pt-1 text-sm">
              Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn địa chỉ khỏi tài khoản của bạn.
            </AlertDescription>
          </Alert>
        </div>
      }
    />
  )
}