import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AddMedicineDto } from "@/data/dto";
import { Category, Medicine } from "@/data/interfaces";
import { medicineSchema, MedicineSchema } from "@/data/schemas";
import { cn } from "@/lib/utils";
import { CategoriesAPI } from "@/services/api/categories.api";
import { MedicineAPI } from "@/services/api/medicine.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Helper function to generate a slug from a string
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

interface Props {
  currentMedicine?: Medicine,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

const steps = [
  { id: "basic-info", name: "Thông tin cơ bản", step: 1 },
  { id: "variants", name: "Biến thể", step: 2 },
  { id: "details", name: "Chi tiết", step: 3 },
  { id: "usage-guide", name: "Hướng dẫn sử dụng", step: 4 },
];

export default function MedicinesActionDialog({ currentMedicine, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const isEdit = !!currentMedicine;
  const [activeStep, setActiveStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.CategoriesList,
    enabled: open,
  });

  const form = useForm<MedicineSchema>({
    resolver: zodResolver(medicineSchema),
    defaultValues: isEdit ? {
      ...currentMedicine,
      categoryId: currentMedicine.category?.id || "",
      isEdit,
    } : {
      categoryId: "",
      name: "",
      slug: "",
      thumbnail: {
        publicId: "",
        url: "",
        alt: "",
      },
      description: "",
      variants: {
        price: 0,
        limitQuantity: 0,
        stockStatus: "IN-STOCK",
        originalPrice: 0,
        discountPercent: 0,
        isFeatured: false,
        isActive: true,
      },
      details: {
        ingredients: "",
        usage: [""],
        parameters: {
          origin: "",
          packaging: "",
        },
      },
      usageguide: {
        dosage: {
          adult: "",
          child: "",
        },
        directions: [""],
        precautions: [""],
      },
      isEdit,
    }
  });

  // Auto-generate slug when name changes
  useEffect(() => {
    if (!isEdit) {
      const subscription = form.watch((value, { name }) => {
        if (name === 'name') {
          const generatedSlug = generateSlug(value.name || "");
          form.setValue('slug', generatedSlug);
        }
      });
      
      return () => subscription.unsubscribe();
    }
  }, [form, isEdit]);

  // Simulate file upload
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
          form.setValue('thumbnail.alt', file.name);
          form.setValue('thumbnail.publicId', `img_${Date.now()}`);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  // API integration
  const saveMutation = useMutation({
    mutationFn: async (data: MedicineSchema) => {
      // Convert form data to DTO
      const medicineDto: AddMedicineDto = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId,
        thumbnail: data.thumbnail,
        variants: {
          ...data.variants,
          // Ensure these boolean fields are never undefined
          isFeatured: data.variants.isFeatured ?? false,
          isActive: data.variants.isActive ?? true
        },
        details: data.details,
        usageguide: data.usageguide
      };
      
      if (isEdit && currentMedicine) {
        return await MedicineAPI.MedicineUpdate(currentMedicine.id, medicineDto);
      } else {
        return await MedicineAPI.MedicineCreate(medicineDto);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      toast.success(isEdit ? "Cập nhật thuốc thành công" : "Thêm thuốc mới thành công");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`Lỗi: ${error instanceof Error ? error.message : 'Không thể lưu thuốc'}`);
    }
  });

  const handleNext = async () => {
    setIsSubmitting(true);
    
    const fieldsToValidate = getFieldsByStep(activeStep);
    const typedFields = fieldsToValidate as Array<keyof MedicineSchema>;
    
    setTimeout(async () => {
      const isValid = await form.trigger(typedFields);
      if (isValid) {
        setActiveStep((prev) => Math.min(prev + 1, steps.length));
      }
      setIsSubmitting(false);
    }, 500);
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: MedicineSchema) => {
    saveMutation.mutate(data);
  };

  const getFieldsByStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["categoryId", "name", "description"];
      case 2:
        return ["variants.price", "variants.stockStatus", "variants.limitQuantity"];
      case 3:
        return ["details.ingredients", "details.parameters.origin", "details.parameters.packaging"];
      case 4:
        return ["usageguide.dosage.adult", "usageguide.dosage.child"];
      default:
        return [];
    }
  };

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
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          form.reset();
          setActiveStep(1);
        }
        onOpenChange(state);
      }}
    >
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Cập nhật thuốc" : "Thêm thuốc mới"}
          </DialogTitle>
          
          <div className="w-full mt-6 mb-4">
            <div className="mx-auto max-w-xl space-y-4 text-center">
              <Stepper value={activeStep} onValueChange={setActiveStep} className="items-start gap-4">
                {steps.map((step) => (
                  <StepperItem key={step.id} step={step.step} className="flex-1">
                    <StepperTrigger className="w-full flex-col items-start gap-2 rounded">
                      <StepperIndicator 
                        className={cn(
                          "bg-border h-1 w-full",
                          activeStep === step.step && "bg-blue-500",
                          activeStep > step.step && "bg-green-500"
                        )}
                      >
                        <span className="sr-only">{step.name}</span>
                      </StepperIndicator>
                      <div className="space-y-0.5">
                        <StepperTitle>{step.name}</StepperTitle>
                      </div>
                    </StepperTrigger>
                  </StepperItem>
                ))}
              </Stepper>
            </div>
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Information */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục thuốc" />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên thuốc</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên thuốc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (tự động)</FormLabel>
                      <FormControl>
                        <Input placeholder="thuoc-abc-xyz" {...field} readOnly className="bg-slate-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mô tả ngắn về thuốc" 
                          className="min-h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel className="block mb-2">Hình ảnh</FormLabel>
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 transition-all duration-200",
                      form.getValues("thumbnail.url") 
                        ? "border-green-300 bg-green-50" 
                        : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                    )}
                  >
                    {form.getValues("thumbnail.url") ? (
                      <div className="relative">
                        <img 
                          src={form.getValues("thumbnail.url")} 
                          alt={form.getValues("thumbnail.alt")} 
                          className="mx-auto h-40 object-contain rounded"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="absolute -top-2 -right-2 rounded-full h-8 w-8 p-0"
                          onClick={() => {
                            form.setValue("thumbnail.url", "");
                            form.setValue("thumbnail.alt", "");
                            form.setValue("thumbnail.publicId", "");
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center cursor-pointer text-center h-40">
                        {isUploading ? (
                          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        ) : (
                          <>
                            <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              Kéo thả hình ảnh vào đây hoặc nhấp để tải lên
                            </p>
                          </>
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
                  {form.formState.errors.thumbnail && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.thumbnail.message}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 2: Variants */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="variants.price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá bán (VNĐ)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="100000" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="variants.originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá gốc (VNĐ)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="120000" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="variants.discountPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giảm giá (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="10" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="variants.limitQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số lượng tối đa</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="100" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="variants.stockStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái kho</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IN-STOCK">Còn hàng</SelectItem>
                          <SelectItem value="LOW-STOCK">Sắp hết hàng</SelectItem>
                          <SelectItem value="OUT-OF-STOCK">Hết hàng</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 p-4 bg-slate-50 rounded-lg">
                  <FormField
                    control={form.control}
                    name="variants.isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Sản phẩm nổi bật</FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="variants.isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Sản phẩm kích hoạt</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            {/* Step 3: Details */}
            {activeStep === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="details.ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thành phần</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Nhập thành phần của thuốc" 
                          className="min-h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <FormLabel className="block mb-3 font-medium">Cách sử dụng</FormLabel>
                  {form.getValues("details.usage").map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <FormField
                        control={form.control}
                        name={`details.usage.${index}` as `details.usage.${number}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder={`Cách sử dụng ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeArrayItem("details.usage", index)}
                        className="shrink-0"
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => addArrayItem("details.usage", "")}
                    className="mt-2"
                  >
                    + Thêm cách sử dụng
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="details.parameters.origin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xuất xứ</FormLabel>
                        <FormControl>
                          <Input placeholder="Việt Nam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="details.parameters.packaging"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Đóng gói</FormLabel>
                        <FormControl>
                          <Input placeholder="Hộp 30 viên" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            {/* Step 4: Usage Guide */}
            {activeStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg mb-6">
                  <FormField
                    control={form.control}
                    name="usageguide.dosage.adult"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Liều dùng cho người lớn</FormLabel>
                        <FormControl>
                          <Input placeholder="Ngày 2 viên sau bữa ăn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="usageguide.dosage.child"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Liều dùng cho trẻ em</FormLabel>
                        <FormControl>
                          <Input placeholder="Ngày 1 viên sau bữa ăn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="border border-slate-200 p-4 rounded-lg mb-4">
                  <FormLabel className="block mb-3 font-medium">Hướng dẫn sử dụng</FormLabel>
                  {form.getValues("usageguide.directions").map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <FormField
                        control={form.control}
                        name={`usageguide.directions.${index}` as `usageguide.directions.${number}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder={`Hướng dẫn ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeArrayItem("usageguide.directions", index)}
                        className="shrink-0"
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => addArrayItem("usageguide.directions", "")}
                    className="mt-2"
                  >
                    + Thêm hướng dẫn
                  </Button>
                </div>
                
                <div className="border border-slate-200 p-4 rounded-lg">
                  <FormLabel className="block mb-3 font-medium">Lưu ý</FormLabel>
                  {form.getValues("usageguide.precautions").map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <FormField
                        control={form.control}
                        name={`usageguide.precautions.${index}` as `usageguide.precautions.${number}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder={`Lưu ý ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeArrayItem("usageguide.precautions", index)}
                        className="shrink-0"
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => addArrayItem("usageguide.precautions", "")}
                    className="mt-2"
                  >
                    + Thêm lưu ý
                  </Button>
                </div>
              </div>
            )}
            
            <DialogFooter className="flex justify-between mt-6 pt-4 border-t">
              {activeStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBack}
                >
                  Quay lại
                </Button>
              )}
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Hủy
                </Button>
                
                {activeStep < steps.length ? (
                  <Button 
                    type="button" 
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Tiếp theo
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={saveMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {saveMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isEdit ? "Cập nhật" : "Thêm thuốc"}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}