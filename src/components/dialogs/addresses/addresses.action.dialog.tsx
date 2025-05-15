"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { AddAddressDto } from "@/data/dto";
import { AddressSchema } from "@/data/schemas";
import { AccountAPI } from "@/services/api/account.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  currentAddress?: AddressSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressesActionDialog({ currentAddress, open, onOpenChange }: Props) {
  const isEdit = !!currentAddress;

  const { refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: AccountAPI.getAddresses,
    enabled: false
  });

  const formSchema = z.object({
    name: z.string().min(1, "Tên là bắt buộc"),
    phone: z.string().min(1, "Số điện thoại là bắt buộc"),
    addressLine1: z.string().min(1, "Địa chỉ là bắt buộc"),
    addressLine2: z.string().nullable().optional(),
    city: z.string().min(1, "Thành phố là bắt buộc"),
    state: z.string().nullable().optional(),
    country: z.string().min(1, "Quốc gia là bắt buộc"),
    postalCode: z.string().min(1, "Mã bưu điện là bắt buộc"),
    isDefault: z.boolean(),
  });

  const form = useForm<AddAddressDto>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        isDefault: currentAddress.isDefault || false,
        addressLine1: currentAddress.addressLine1 || "",
        addressLine2: currentAddress.addressLine2 || "",
        city: currentAddress.city || "",
        state: currentAddress.state || "",
        postalCode: currentAddress.postalCode || "",
        country: currentAddress.country || "",
        name: currentAddress.name || "",
        phone: currentAddress.phone || "",
      }
      : {
        name: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        isDefault: false,
      },
  });

  const addAddressMutation = useMutation({
    mutationFn: AccountAPI.addAddress,
    onSuccess: () => {
      toast.success("Địa chỉ đã được thêm thành công");
      refetch();
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => form.reset(), 100);
      }, 100);
    },
    onError: (error) => {
      toast.error(error.message || "Thêm địa chỉ thất bại");
    },
  });

  const editAddressMutation = useMutation({
    mutationFn: (data: AddAddressDto & { id: string }) => {
      return AccountAPI.editAddress(data.id, data);
    },
    onSuccess: () => {
      toast.success("Địa chỉ đã được cập nhật thành công");
      refetch();
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => form.reset(), 100);
      }, 100);
    },
    onError: (error) => {
      toast.error(error.message || "Cập nhật địa chỉ thất bại");
    },
  });

  const onSubmit = (data: AddAddressDto) => {
    if (isEdit && currentAddress) {
      editAddressMutation.mutate({ ...data, id: currentAddress.id });
    } else {
      addAddressMutation.mutate(data);
    }
  }

  const handleCloseDialog = () => {
    setTimeout(() => {
      onOpenChange(false);
    }, 0);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          handleCloseDialog();
        } else {
          onOpenChange(state);
        }
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-6">
        <button
          onClick={handleCloseDialog}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Đóng"
        >
          <X className="h-4 w-4" />
        </button>
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEdit ? "Cập nhật địa chỉ tại đây. " : "Tạo địa chỉ mới tại đây. "}
            Nhấn lưu khi bạn hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-200px)] md:h-[500px] w-full pr-4 -mr-4 py-2">
          <Form {...form}>
            <form
              id={`address-form-${isEdit ? "edit" : "add"}`}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-1"
            >
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Tên <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Krug"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Số điện thoại <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1234567890"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Chi tiết địa chỉ
                </h3>
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Địa chỉ dòng 1 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St"
                          autoComplete="off"
                          className="focus-visible:ring-primary"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Địa chỉ dòng 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apt 1"
                          autoComplete="off"
                          className="focus-visible:ring-primary"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Thành phố <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Hà Nội"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Tỉnh <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="HN"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Chi tiết bổ sung
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Mã bưu điện <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10001"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Quốc gia <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Việt Nam"
                            autoComplete="off"
                            className="focus-visible:ring-primary"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm hover:border-primary transition-colors">
                      <div className="space-y-1">
                        <FormLabel className="font-medium">Địa chỉ mặc định</FormLabel>
                        <FormDescription className="text-xs">
                          Đặt làm địa chỉ chính cho việc giao hàng
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className="sm:justify-between gap-3 pt-4 mt-2 border-t">
          <Button
            variant="outline"
            type="button"
            onClick={handleCloseDialog}
            className="sm:order-1 w-full sm:w-auto"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            form={`address-form-${isEdit ? "edit" : "add"}`}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            {isEdit ? "Cập nhật" : "Lưu"} địa chỉ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
