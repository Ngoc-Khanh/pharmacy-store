"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AddressSchema } from "@/data/zod-schemas";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AccountAPI } from "@/services/api/account.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { AddAddressDto } from "@/data/dto";
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
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    addressLine1: z.string().min(1, "Address is required"),
    addressLine2: z.string().nullable().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().nullable().optional(),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
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
      toast.success("Address added successfully");
      form.reset();
      onOpenChange(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add address");
    },
  });

  const editAddressMutation = useMutation({
    mutationFn: (data: AddAddressDto & { id: string }) => {
      return AccountAPI.editAddress(data.id, data);
    },
    onSuccess: () => {
      toast.success("Address updated successfully");
      form.reset();
      onOpenChange(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update address");
    },
  });

  const onSubmit = (data: AddAddressDto) => {
    if (isEdit && currentAddress) {
      editAddressMutation.mutate({ ...data, id: currentAddress.id });
    } else {
      addAddressMutation.mutate(data);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? "Edit Address" : "Add New Address"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the address here. " : "Create new address here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[30rem] w-full pr-4 -mr-4 py-1">
          <Form {...form}>
            <form
              id={`address-form-${isEdit ? "edit" : "add"}`}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Krug"
                            autoComplete="off"
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
                        <FormLabel>
                          Phone Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1234567890"
                            autoComplete="off"
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

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Address Details</h3>
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Address Line 1 <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St"
                          autoComplete="off"
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
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apt 1"
                          autoComplete="off"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          City <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Hà Nội"
                            autoComplete="off"
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
                        <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="HN"
                            autoComplete="off"
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

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Additional Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10001"
                            autoComplete="off"
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
                        <FormLabel>Country <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Việt Nam"
                            autoComplete="off"
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Default Address</FormLabel>
                        <FormDescription className="text-xs">
                          Make this your primary address for shipping
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
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
        <DialogFooter>
          <Button type="submit" form={`address-form-${isEdit ? "edit" : "add"}`}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
