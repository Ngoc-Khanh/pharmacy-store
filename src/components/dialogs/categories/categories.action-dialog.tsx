import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/data/interfaces";
import { categoriesSchema, CategoriesSchema } from "@/data/schemas";
import { CategoriesAPI } from "@/services/api/categories.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  currentCategory?: Category,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

export default function CategoriesActionDialog({ currentCategory, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const isEdit = !!currentCategory;
  const form = useForm<CategoriesSchema>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: isEdit ? {
      ...currentCategory,
      isEdit,
    } : {
      title: "",
      description: "",
      isActive: true,
      isEdit,
    }
  })

  const addCategoryMutation = useMutation({
    mutationFn: CategoriesAPI.CategoriesCreate,
    onSuccess: () => {
      toast.success("Thêm danh mục thành công");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (values: CategoriesSchema) => {
      if (!currentCategory?.id) throw new Error("Cần có ID danh mục để cập nhật");
      return CategoriesAPI.CategoriesUpdate(currentCategory.id, {
        ...values,
        isActive: values.isActive ?? true
      });
    },
    onSuccess: () => {
      toast.success("Cập nhật danh mục thành công");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  })

  const isPending = addCategoryMutation.isPending || updateCategoryMutation.isPending;

  const onSubmit = useCallback((values: CategoriesSchema) => {
    if (!isEdit) addCategoryMutation.mutate({...values, isActive: values.isActive ?? true});
    else updateCategoryMutation.mutate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, onOpenChange, addCategoryMutation, updateCategoryMutation, form]);


  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 shadow-lg">
        <DialogHeader className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40">
          <DialogTitle className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">
            {isEdit ? "Cập nhật danh mục" : "Thêm danh mục"}
          </DialogTitle>
          <DialogDescription className="text-emerald-600/80 dark:text-emerald-400/80 text-base">
            {isEdit ? "Chỉnh sửa thông tin danh mục sản phẩm" : "Tạo danh mục sản phẩm mới cho cửa hàng"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium">
                    Tên danh mục
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập tên danh mục" 
                      {...field} 
                      className="border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-emerald-500/80">
                    Tên danh mục sẽ hiển thị trên trang web
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium">
                    Mô tả
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Mô tả ngắn về danh mục này" 
                      className="min-h-[120px] border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-emerald-200 dark:border-emerald-800 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-emerald-700 dark:text-emerald-300 font-medium">
                      Trạng thái hoạt động
                    </FormLabel>
                    <FormDescription className="text-sm text-emerald-500/80">
                      Danh mục có hiển thị trên cửa hàng hay không
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-emerald-600"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950/50"
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang xử lý...</span>
                  </div>
                ) : isEdit ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}