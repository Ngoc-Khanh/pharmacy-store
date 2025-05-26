import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Supplier } from "@/data/interfaces";
import { supplierSchema, SupplierSchema } from "@/data/schemas";
import { SupplierAPI } from "@/services/api/supplier.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Building2, CirclePlus, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Prop {
  currentSupplier?: Supplier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SuppliersActionsSheet({ currentSupplier, open, onOpenChange }: Prop) {
  const queryClient = useQueryClient();
  const isEdit = !!currentSupplier;
  const form = useForm<SupplierSchema>({
    resolver: zodResolver(supplierSchema),
    defaultValues: isEdit ? {
      ...currentSupplier,
      isEdit,
    } : {
      name: "",
      address: "",
      contactPhone: "",
      contactEmail: "",
      isEdit,
    }
  })

  const addSupplierMutation = useMutation({
    mutationFn: SupplierAPI.CreateSupplier,
    onSuccess: () => {
      toast.success("Thêm nhà cung cấp thành công");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    }
  })

  const updateSupplierMutation = useMutation({
    mutationFn: (values: SupplierSchema) => {
      if (!currentSupplier?.id) throw new Error("Cần có ID nhà cung cấp để cập nhật");
      return SupplierAPI.UpdateSupplier(currentSupplier.id, values);
    },
    onSuccess: () => {
      toast.success("Cập nhật nhà cung cấp thành công");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    }
  })

  const isPending = addSupplierMutation.isPending || updateSupplierMutation.isPending;

  const onSubmit = useCallback((values: SupplierSchema) => {
    if (!isEdit) addSupplierMutation.mutate(values);
    else updateSupplierMutation.mutate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, onOpenChange, addSupplierMutation, updateSupplierMutation, form]);

  return (
    <Sheet
      open={open}
      onOpenChange={(state) => {
        if (!isPending) {
          form.reset();
          onOpenChange(state);
        }
      }}
    >
      <SheetContent className="sm:max-w-xl w-full p-0 overflow-hidden border-l-emerald-100 dark:border-l-emerald-950">
        <div className="flex flex-col h-full">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="px-6 py-5 border-b bg-gradient-to-r from-emerald-600 to-teal-500 shadow-md"
          >
            <SheetHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 text-white shadow-sm transition-all duration-200 hover:scale-105"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <SheetTitle className="text-2xl font-semibold flex items-center gap-2 text-white">
                    <CirclePlus className="h-6 w-6" />
                    {isEdit ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp"}
                  </SheetTitle>
                  <SheetDescription className="mt-1 text-white/90">
                    {isEdit ? "Cập nhật thông tin của nhà cung cấp" : "Thêm nhà cung cấp mới vào hệ thống"}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </motion.div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <div className="space-y-6 p-6 flex-1 overflow-y-auto">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="bg-white dark:bg-gray-800/40 p-4 rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                        <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-emerald-500" />
                          Tên nhà cung cấp
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập tên nhà cung cấp"
                            className="border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 rounded-md mt-1.5 bg-emerald-50/50 dark:bg-emerald-950/30"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-sm text-emerald-500/80 mt-1.5">
                          Tên nhà cung cấp sẽ hiển thị trên trang web
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Address Field */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="bg-white dark:bg-gray-800/40 p-4 rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                        <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-emerald-500" />
                          Địa chỉ
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập địa chỉ của nhà cung cấp"
                            className="border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 rounded-md mt-1.5 bg-emerald-50/50 dark:bg-emerald-950/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Contact Phone Field */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem className="bg-white dark:bg-gray-800/40 p-4 rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                        <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4 text-emerald-500" />
                          Số điện thoại liên hệ
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập số điện thoại liên hệ"
                            className="border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 rounded-md mt-1.5 bg-emerald-50/50 dark:bg-emerald-950/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Contact Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem className="bg-white dark:bg-gray-800/40 p-4 rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                        <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4 text-emerald-500" />
                          Email liên hệ
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Nhập email liên hệ"
                            className="border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 rounded-md mt-1.5 bg-emerald-50/50 dark:bg-emerald-950/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              {/* Footer with buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 border-t mt-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/80"
              >
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950 rounded-full px-5 font-medium transition-all hover:shadow-sm"
                    onClick={() => onOpenChange(false)}
                    disabled={isPending}
                  >
                    Hủy
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white rounded-full px-5 font-medium transition-all hover:shadow-md"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {isEdit ? "Đang cập nhật..." : "Đang thêm..."}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <CirclePlus className="h-4 w-4" />
                        {isEdit ? "Cập nhật" : "Thêm mới"}
                      </div>
                    )}
                  </Button>
                </div>
              </motion.div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}