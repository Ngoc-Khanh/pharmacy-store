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
      // First refetch data, then close the dialog
      refetch();
      // Use a timeout to ensure the state is updated properly
      setTimeout(() => {
        onOpenChange(false);
        // Reset form after dialog is closed
        setTimeout(() => form.reset(), 100);
      }, 100);
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
      // First refetch data, then close the dialog
      refetch();
      // Use a timeout to ensure the state is updated properly
      setTimeout(() => {
        onOpenChange(false);
        // Reset form after dialog is closed
        setTimeout(() => form.reset(), 100);
      }, 100);
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

  // Handle dialog close properly
  const handleCloseDialog = () => {
    // Use timeout to ensure it doesn't interfere with any ongoing actions
    setTimeout(() => {
      onOpenChange(false);
    }, 0);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          // Only handle closing the dialog here, not opening
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
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEdit ? "Update the address here. " : "Create new address here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-200px)] md:h-[500px] w-full pr-4 -mr-4 py-2">
          <Form {...form}>
            <form
              id={`address-form-${isEdit ? "edit" : "add"}`}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-1"
            >
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Name <span className="text-destructive">*</span>
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
                          Phone Number <span className="text-destructive">*</span>
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

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Address Details
                </h3>
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Address Line 1 <span className="text-destructive">*</span>
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
                      <FormLabel className="font-medium">Address Line 2</FormLabel>
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
                          City <span className="text-destructive">*</span>
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
                        <FormLabel className="font-medium">State <span className="text-destructive">*</span></FormLabel>
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

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 pb-1 border-b">
                  <span className="h-4 w-1 bg-primary rounded-full"></span>
                  Additional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Postal Code <span className="text-destructive">*</span></FormLabel>
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
                        <FormLabel className="font-medium">Country <span className="text-destructive">*</span></FormLabel>
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
                        <FormLabel className="font-medium">Default Address</FormLabel>
                        <FormDescription className="text-xs">
                          Make this your primary address for shipping
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
            Cancel
          </Button>
          <Button
            type="submit"
            form={`address-form-${isEdit ? "edit" : "add"}`}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            {isEdit ? "Update" : "Save"} Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
