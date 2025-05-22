import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MedicineSchema } from "@/data/schemas";
import { motion } from "framer-motion";
import { Baby, FilePlus2, FileWarning, PenLine, PersonStanding } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ActionStepFourProps {
  form: UseFormReturn<MedicineSchema>
}

export function ActionStepFour({ form }: ActionStepFourProps) {
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
        <PenLine className="h-5 w-5 text-teal-600" />
        <h3 className="text-lg font-medium text-teal-800">Hướng dẫn sử dụng thuốc</h3>
      </div>

      <motion.div 
        whileHover={{ scale: 1.01 }} 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-teal-50/80 to-blue-50/80 p-5 rounded-lg shadow-sm border border-teal-100"
      >
        <FormField
          control={form.control}
          name="usageguide.dosage.adult"
          render={({ field }) => (
            <FormItem className="transition-all duration-200 hover:bg-white/50 p-3 rounded-lg">
              <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                <PersonStanding className="h-4 w-4" /> Liều dùng cho người lớn
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ngày 2 viên sau bữa ăn" 
                  {...field} 
                  className="border-teal-200 focus:border-teal-400 focus:ring-teal-200 bg-white/90"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usageguide.dosage.child"
          render={({ field }) => (
            <FormItem className="transition-all duration-200 hover:bg-white/50 p-3 rounded-lg">
              <FormLabel className="text-teal-700 font-medium flex items-center gap-1">
                <Baby className="h-4 w-4" /> Liều dùng cho trẻ em
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ngày 1 viên sau bữa ăn" 
                  {...field} 
                  className="border-teal-200 focus:border-teal-400 focus:ring-teal-200 bg-white/90"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.01 }} 
        className="p-5 bg-gradient-to-r from-teal-50/80 to-emerald-50/80 rounded-lg shadow-sm border border-teal-100"
      >
        <h4 className="text-teal-700 font-medium mb-4 pb-2 border-b border-teal-100 flex items-center gap-1">
          <FilePlus2 className="h-4 w-4" /> Hướng dẫn sử dụng
        </h4>
        <div className="space-y-2">
          {form.getValues("usageguide.directions").map((_, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FormField
                control={form.control}
                name={`usageguide.directions.${index}` as `usageguide.directions.${number}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder={`Hướng dẫn ${index + 1}`} 
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
                onClick={() => removeArrayItem("usageguide.directions", index)}
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
            onClick={() => addArrayItem("usageguide.directions", "")}
            className="mt-2 bg-white/80 border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-400"
          >
            + Thêm hướng dẫn
          </Button>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.01 }} 
        className="p-5 bg-gradient-to-r from-amber-50/80 to-teal-50/80 rounded-lg shadow-sm border border-amber-100"
      >
        <h4 className="text-amber-700 font-medium mb-4 pb-2 border-b border-amber-100 flex items-center gap-1">
          <FileWarning className="h-4 w-4" /> Lưu ý quan trọng
        </h4>
        <div className="space-y-2">
          {form.getValues("usageguide.precautions").map((_, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FormField
                control={form.control}
                name={`usageguide.precautions.${index}` as `usageguide.precautions.${number}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder={`Lưu ý ${index + 1}`} 
                        {...field} 
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 bg-white/90"
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
                onClick={() => removeArrayItem("usageguide.precautions", index)}
                className="shrink-0 border-amber-200 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300"
              >
                -
              </Button>
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem("usageguide.precautions", "")}
            className="mt-2 bg-white/80 border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-400"
          >
            + Thêm lưu ý
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}