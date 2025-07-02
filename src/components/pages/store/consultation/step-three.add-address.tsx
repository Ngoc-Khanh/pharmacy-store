import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AddressSchema } from "@/data/schemas";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface StepThreeAddAddressProps {
  form: UseFormReturn<AddressSchema>;
  onSubmit: (data: AddressSchema) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const StepThreeAddAddress = ({ form, onSubmit, onCancel, isSubmitting }: StepThreeAddAddressProps) => (
  <Card className="border-teal-200 dark:border-teal-800">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300">Thêm địa chỉ mới</h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên người nhận *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập tên người nhận" 
                      className="border-teal-200 dark:border-teal-700 focus:border-teal-400 focus:ring-teal-400/20"
                      {...field} 
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
                  <FormLabel>Số điện thoại *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập số điện thoại" 
                      className="border-teal-200 dark:border-teal-700 focus:border-teal-400 focus:ring-teal-400/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nhập địa chỉ cụ thể" 
                    className="border-teal-200 dark:border-teal-700 focus:border-teal-400 focus:ring-teal-400/20"
                    {...field} 
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
                <FormLabel>Địa chỉ bổ sung</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Căn hộ, tầng, tòa nhà..." 
                    className="border-teal-200 dark:border-teal-700 focus:border-teal-400 focus:ring-teal-400/20"
                    {...field} 
                    value={field.value || ""} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thành phố *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Thành phố" 
                      className="border-teal-200 dark:border-teal-700 focus:border-teal-400 focus:ring-teal-400/20"
                      {...field} 
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
                  <FormLabel>Tỉnh/Bang</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Tỉnh/Bang" 
                      className="border-teal-200 dark:border-teal-700 focus:border-teal-400 focus:ring-teal-400/20"
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
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã bưu điện *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Mã bưu điện" 
                      className="border-teal-200 dark:border-teal-700 focus:border-teal-400 focus:ring-teal-400/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quốc gia *</FormLabel>
                <FormControl>
                  <Input 
                    className="border-teal-200 dark:border-teal-700 focus:border-teal-400 focus:ring-teal-400/20"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-teal-200 dark:border-teal-700 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Đặt làm địa chỉ mặc định</FormLabel>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Địa chỉ này sẽ được chọn tự động cho các đơn hàng tiếp theo
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-teal-200 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/30"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isSubmitting ? "Đang thêm..." : "Thêm địa chỉ"}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>
)