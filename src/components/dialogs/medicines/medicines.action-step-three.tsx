import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MedicineSchema } from "@/data/schemas"
import { motion } from "framer-motion";
import { ClipboardList, Factory, GlassWater, ListChecks, Package } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

interface ActionStepThreeProps {
  form: UseFormReturn<MedicineSchema>
}

export function ActionStepThree({ form }: ActionStepThreeProps) {
  // Helper function to add a new item to an array in form data
  const addArrayItem = (path: 'details.usage' | 'usageguide.directions' | 'usageguide.precautions', value: string) => {
    const currentValues = form.getValues(path) as string[];
    form.setValue(path, [...currentValues, value], { shouldValidate: true });
  };

  // Helper function to remove an item from an array in form data
  const removeArrayItem = (path: 'details.usage' | 'usageguide.directions' | 'usageguide.precautions', index: number) => {
    const currentValues = form.getValues(path) as string[];
    if (currentValues.length > 1) {
      form.setValue(
        path,
        currentValues.filter((_, i) => i !== index),
        { shouldValidate: true }
      );
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
        <ClipboardList className="h-5 w-5 text-teal-600" />
        <h3 className="text-lg font-medium text-teal-800">Thông tin chi tiết</h3>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
        <FormField
          control={form.control}
          name="details.ingredients"
          render={({ field }) => (
            <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
              <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                <GlassWater className="h-4 w-4" /> Thành phần
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập thành phần của thuốc"
                  className="min-h-32 border-teal-200 focus:border-teal-400 focus:ring-teal-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.01 }} 
        className="bg-gradient-to-r from-teal-50/80 to-cyan-50/80 p-5 rounded-lg shadow-sm border border-teal-100"
      >
        <h4 className="text-teal-700 font-medium mb-4 pb-2 border-b border-teal-100 flex items-center gap-1">
          <ListChecks className="h-4 w-4" /> Cách sử dụng
        </h4>
        <div className="space-y-2">
          {form.getValues("details.usage").map((_, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FormField
                control={form.control}
                name={`details.usage.${index}` as `details.usage.${number}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder={`Cách sử dụng ${index + 1}`} 
                        {...field} 
                        className="border-teal-200 focus:border-teal-400 focus:ring-teal-200 bg-white/90"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem("details.usage", index)}
                className="shrink-0 border-red-200 hover:bg-red-50 hover:text-red-500 hover:border-red-300"
              >
                -
              </Button>
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem("details.usage", "")}
            className="mt-2 bg-white/80 border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-400"
          >
            + Thêm cách sử dụng
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
          <FormField
            control={form.control}
            name="details.parameters.origin"
            render={({ field }) => (
              <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
                <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                  <Factory className="h-4 w-4" /> Xuất xứ
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Việt Nam" 
                    {...field} 
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
            name="details.parameters.packaging"
            render={({ field }) => (
              <FormItem className="transition-all duration-200 hover:bg-teal-50/50 p-3 rounded-lg">
                <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                  <Package className="h-4 w-4" /> Đóng gói
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Hộp 30 viên" 
                    {...field} 
                    className="border-teal-200 focus:border-teal-400 focus:ring-teal-200"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}