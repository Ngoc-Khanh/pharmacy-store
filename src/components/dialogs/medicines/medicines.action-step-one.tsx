"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category, Supplier } from "@/data/interfaces";
import { MedicineSchema } from "@/data/schemas";
import { CategoriesAPI } from "@/services/api/categories.api";
import { SupplierAPI } from "@/services/api/supplier.api";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { Pill } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ActionStepOneProps {
  form: UseFormReturn<MedicineSchema>;
}

export function ActionStepOne({ form }: ActionStepOneProps) {

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.CategoriesList,
  });

  const { data: suppliers = [], isLoading: isSuppliersLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: SupplierAPI.SuppliersList,
  });

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
        name="supplierId"
        render={({ field }) => (
          <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
            <FormLabel className="text-teal-700 font-medium">Nhà cung cấp</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-teal-200 focus:border-teal-400 focus:ring-teal-200">
                  <SelectValue placeholder={isSuppliersLoading ? "Đang tải..." : "Chọn nhà cung cấp"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {suppliers.map((supplier: Supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
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
    </motion.div>
  )
}