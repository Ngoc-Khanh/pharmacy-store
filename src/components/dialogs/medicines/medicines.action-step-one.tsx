"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/data/interfaces";
import { MedicineSchema } from "@/data/schemas";
import { cn } from "@/lib/utils";
import { CategoriesAPI } from "@/services/api/categories.api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ImagePlus, Loader2, Pill } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface ActionStepOneProps {
  form: UseFormReturn<MedicineSchema>;
}

export function ActionStepOne({ form }: ActionStepOneProps) {
  const [isUploading, setIsUploading] = useState(false);

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.CategoriesList,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);

      // Simulate upload with timeout
      setTimeout(() => {
        // In a real app, you would upload to a server and get back a URL
        const reader = new FileReader();
        reader.onload = () => {
          form.setValue('thumbnail.url', reader.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-teal-100">
        <Pill className="h-5 w-5 text-teal-600" />
        <h3 className="text-lg font-medium text-teal-800">Thông tin sản phẩm</h3>
      </div>

      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
            <FormLabel className="text-teal-700 font-medium">Danh mục</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-teal-200 focus:border-teal-400 focus:ring-teal-200">
                  <SelectValue placeholder={isCategoriesLoading ? "Đang tải..." : "Chọn danh mục thuốc"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category: Category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
            <FormLabel className="text-teal-700 font-medium">Tên thuốc</FormLabel>
            <FormControl>
              <Input 
                placeholder="Nhập tên thuốc" 
                {...field} 
                className="border-teal-200 focus:border-teal-400 focus:ring-teal-200"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
            <FormLabel className="text-teal-700 font-medium">Mô tả</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Mô tả ngắn về thuốc, thành phần, công dụng..."
                className="min-h-32 border-teal-200 focus:border-teal-400 focus:ring-teal-200"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <motion.div 
        className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg"
        whileHover={{ scale: 1.01 }}
      >
        <FormLabel className="block mb-2 text-teal-700 font-medium">Hình ảnh sản phẩm</FormLabel>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 transition-all duration-300",
            form.getValues("thumbnail.url")
              ? "border-teal-400 bg-teal-50/50"
              : "border-teal-200 hover:border-teal-400 hover:bg-teal-50/80"
          )}
        >
          {form.getValues("thumbnail.url") ? (
            <div className="relative">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={form.getValues("thumbnail.url")}
                className="mx-auto h-48 object-contain rounded shadow-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute -top-2 -right-2 rounded-full h-8 w-8 p-0 bg-white border-teal-300 hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-colors"
                onClick={() => {
                  form.setValue("thumbnail.url", "");
                }}
              >
                ×
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer text-center h-48 transition-all hover:scale-[1.01]">
              {isUploading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <Loader2 className="w-10 h-10 text-teal-500 animate-spin mb-2" />
                  <p className="text-teal-500 font-medium">Đang tải lên...</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                    <ImagePlus className="w-8 h-8 text-teal-600" />
                  </div>
                  <p className="text-sm text-teal-700 font-medium mb-1">
                    Thêm hình ảnh thuốc
                  </p>
                  <p className="text-xs text-teal-500">
                    Kéo thả hình ảnh vào đây hoặc nhấp để tải lên
                  </p>
                </motion.div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}