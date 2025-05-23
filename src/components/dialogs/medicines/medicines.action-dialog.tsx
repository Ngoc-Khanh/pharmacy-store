import { activeStepAtom, steps } from "@/atoms/stepper.atom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Stepper, StepperItem } from "@/components/ui/stepper";
import { StockStatus } from "@/data/enum";
import { Medicine } from "@/data/interfaces";
import { medicineSchema, MedicineSchema } from "@/data/schemas";
import { MedicineAPI } from "@/services/api/medicine.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from 'framer-motion';
import { useAtom } from "jotai";
import { ChevronLeft, ChevronRight, Pill, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ActionStepFour } from "./medicines.action-step-four";
import { ActionStepOne } from "./medicines.action-step-one";
import { ActionStepThree } from "./medicines.action-step-three";
import { ActionStepTwo } from "./medicines.action-step-two";

interface Props {
  currentMedicine?: Medicine,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

export default function MedicinesActionDialog({ currentMedicine, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const isEdit = !!currentMedicine;
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);

  const form = useForm<MedicineSchema>({
    resolver: zodResolver(medicineSchema),
    defaultValues: isEdit ? {
      ...currentMedicine,
      isEdit
    } : {
      categoryId: "",
      supplierId: "",
      name: "",
      description: "",
      variants: {
        price: 10000,
        limitQuantity: 1,
        stockStatus: StockStatus.IN_STOCK,
        originalPrice: 10000,
        discountPercent: 0,
        isFeatured: false,
        isActive: true,
      },
      details: {
        ingredients: "",
        usage: [""],
        paramaters: {
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
  })

  // Auto-calculate price based on originalPrice and discountPercent
  const originalPrice = form.watch("variants.originalPrice");
  const discountPercent = form.watch("variants.discountPercent");
  
  useEffect(() => {
    if (originalPrice && discountPercent >= 0) {
      const calculatedPrice = originalPrice * (1 - discountPercent / 100);
      form.setValue("variants.price", Number(calculatedPrice.toFixed(0)));
    }
  }, [originalPrice, discountPercent, form]);

  const addMedicineMutation = useMutation({
    mutationFn: MedicineAPI.MedicineCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      toast.success("Thêm thuốc mới thành công");
      setActiveStep(1);
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Thêm thuốc thất bại");
    }
  })

  const updateMedicineMutation = useMutation({
    mutationFn: (values: MedicineSchema) => {
      if (!currentMedicine?.id) throw new Error("Cần có ID thuốc để cập nhật");
      return MedicineAPI.MedicineUpdate(currentMedicine.id, values);
    },
    onSuccess: () => {
      toast.success("Cập nhật thuốc thành công");
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    onError: () => {
      toast.error("Cập nhật thuốc thất bại");
    }
  })

  const handleSubmit = async (values: MedicineSchema) => {
    try {
      const isValid = await form.trigger();
      if (!isValid) {
        toast.error("Vui lòng kiểm tra lại thông tin");
        return;
      }
      if (isEdit) updateMedicineMutation.mutate(values);
      else addMedicineMutation.mutate(values);
    } catch {
      toast.error("Có lỗi xảy ra khi xử lý biểu mẫu");
    }
  }

  const renderCurrentStep = () => {
    switch (activeStep) {
      case 1:
        return <ActionStepOne form={form} />;
      case 2:
        return <ActionStepTwo form={form} />;
      case 3:
        return <ActionStepThree form={form} />;
      case 4:
        return <ActionStepFour form={form} />;
      default:
        return null;
    }
  };

  const getFieldsByStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["categoryId", "supplierId", "name", "description"];
      case 2:
        return ["variants.originalPrice", "variants.discountPercent", "variants.limitQuantity", "variants.stockStatus"];
      case 3:
        return ["details.ingredients", "details.paramaters.origin", "details.paramaters.packaging"];
      case 4:
        return ["usageguide.dosage.adult", "usageguide.dosage.child", "usageguide.directions", "usageguide.precautions"];
      default:
        return [];
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
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white border-teal-100 shadow-md">
        <DialogHeader className="bg-gradient-to-r from-teal-600/90 to-emerald-500/90 text-white p-6 -m-6 mb-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="bg-white/90 p-2 rounded-full shadow-sm">
              <Pill className="h-6 w-6 text-teal-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              {isEdit ? "Cập nhật thuốc" : "Thêm thuốc mới"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-white/90 mt-2">
            {isEdit ? "Cập nhật thông tin thuốc trong hệ thống" : "Thêm thông tin thuốc mới vào hệ thống"}
          </DialogDescription>

          <div className="mx-auto w-full mt-8 mb-2 text-center">
            <Stepper value={activeStep} className="items-start mt-4 gap-4">
              {steps.map(({ step, title }) => (
                <StepperItem key={step} step={step} className="flex-1 pointer-events-none">
                  <div className="w-full flex-col items-start gap-2 rounded select-none">
                    <div
                      className={`h-1.5 w-full transition-all duration-300 rounded-full ${activeStep >= step
                        ? "bg-white shadow-sm"
                        : "bg-white/30"
                        }`}
                    >
                      <span className="sr-only">{step}</span>
                    </div>
                    <div className="space-y-0.5 pt-1.5">
                      <span
                        className={`transition-all duration-300 text-sm font-medium ${activeStep === step
                          ? "text-white"
                          : activeStep > step
                            ? "text-white/80"
                            : "text-white/60"
                          }`}
                      >
                        {title}
                      </span>
                    </div>
                  </div>
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (activeStep === 4) {
                form.handleSubmit(handleSubmit, () => {
                  toast.error("Vui lòng kiểm tra lại thông tin");
                })();
              }
            }} 
            className="space-y-6 py-4"
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentStep()}
            </motion.div>

            <DialogFooter className="mt-8 pt-4 border-t border-teal-50 flex flex-col sm:flex-row gap-2">
              {activeStep > 1 && (
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => setActiveStep(activeStep - 1)}
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Quay lại
                </Button>
              )}
              
              <div className="flex-1" />

              {activeStep < 4 ? (
                <Button
                  variant="default"
                  className="bg-teal-600 hover:bg-teal-700 flex items-center gap-1"
                  onClick={async () => {
                    const fields = getFieldsByStep(activeStep);
                    const result = await form.trigger(fields as Array<keyof MedicineSchema>);
                    if (result) {
                      setActiveStep(activeStep + 1);
                    } else {
                      toast.error("Vui lòng điền đầy đủ thông tin");
                    }
                  }}
                  type="button"
                >
                  Tiếp theo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="bg-teal-600 hover:bg-teal-700 flex items-center gap-1"
                  type="button"
                  onClick={() => form.handleSubmit(handleSubmit)()}
                  disabled={addMedicineMutation.isPending || updateMedicineMutation.isPending}
                >
                  {(addMedicineMutation.isPending || updateMedicineMutation.isPending) ? (
                    "Đang xử lý..."
                  ) : (
                    <>
                      {isEdit ? "Cập nhật" : "Tạo mới"}
                      <Save className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}