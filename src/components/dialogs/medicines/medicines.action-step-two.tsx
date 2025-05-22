"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MedicineSchema } from "@/data/schemas";
import { motion } from "framer-motion";
import { Calculator, Package, Tag, Tags } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ActionStepTwoProps {
  form: UseFormReturn<MedicineSchema>
}

export function ActionStepTwo({ form }: ActionStepTwoProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-teal-100">
        <Tags className="h-5 w-5 text-teal-600" />
        <h3 className="text-lg font-medium text-teal-800">Giá và trạng thái</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
          <FormField
            control={form.control}
            name="variants.originalPrice"
            render={({ field }) => (
              <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
                <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                  <Tag className="h-4 w-4" /> Giá gốc (VNĐ)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="120000"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    className="border-teal-200 focus:border-teal-400 focus:ring-teal-200"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
          <FormField
            control={form.control}
            name="variants.discountPercent"
            render={({ field }) => (
              <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
                <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                  <Calculator className="h-4 w-4" /> Giảm giá (%)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="10"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    className="border-teal-200 focus:border-teal-400 focus:ring-teal-200"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
          <FormField
            control={form.control}
            name="variants.price"
            render={({ field }) => (
              <FormItem className="transition-all duration-200 p-3 rounded-lg">
                <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                  <Tags className="h-4 w-4" /> Giá bán (VNĐ) - Tự động tính
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100000"
                    {...field}
                    readOnly
                    className="bg-teal-50/50 border-teal-200 text-teal-800 font-medium"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
          <FormField
            control={form.control}
            name="variants.limitQuantity"
            render={({ field }) => (
              <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
                <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                  <Package className="h-4 w-4" /> Số lượng tối đa
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    className="border-teal-200 focus:border-teal-400 focus:ring-teal-200"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
        <FormField
          control={form.control}
          name="variants.stockStatus"
          render={({ field }) => (
            <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
              <FormLabel className="text-teal-700 font-medium">Trạng thái kho</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-teal-200 focus:border-teal-400 focus:ring-teal-200">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="IN-STOCK" className="text-green-600 font-medium">Còn hàng</SelectItem>
                  <SelectItem value="LOW-STOCK" className="text-amber-600 font-medium">Sắp hết hàng</SelectItem>
                  <SelectItem value="OUT-OF-STOCK" className="text-red-600 font-medium">Hết hàng</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.01 }} 
        className="p-5 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg shadow-sm border border-teal-100"
      >
        <h4 className="text-teal-800 font-medium mb-4 pb-2 border-b border-teal-100">Tùy chọn hiển thị</h4>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <FormField
            control={form.control}
            name="variants.isFeatured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-teal-500"
                  />
                </FormControl>
                <div>
                  <FormLabel className="text-teal-700 font-medium">Sản phẩm nổi bật</FormLabel>
                  <p className="text-xs text-teal-500">Hiển thị trên trang chủ và các mục đề xuất</p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="variants.isActive"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-teal-500"
                  />
                </FormControl>
                <div>
                  <FormLabel className="text-teal-700 font-medium">Sản phẩm kích hoạt</FormLabel>
                  <p className="text-xs text-teal-500">Hiển thị sản phẩm cho khách hàng</p>
                </div>
              </FormItem>
            )}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}