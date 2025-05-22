import { activeStepAtom, steps } from "@/atoms/stepper.atom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Medicine } from "@/data/interfaces";
import { medicineSchema, MedicineSchema } from "@/data/schemas";
import { MedicineAPI } from "@/services/api/medicine.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { ArrowLeft, ArrowRight, Loader2, Pill, Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ActionStepFour } from "./medicines.action-step-four";
import { ActionStepOne } from "./medicines.action-step-one";
import { ActionStepThree } from "./medicines.action-step-three";
import { ActionStepTwo } from "./medicines.action-step-two";

interface MedicinesActionDialogProps {
  currentMedicine?: Medicine,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

export default function MedicinesActionDialog({ currentMedicine, open, onOpenChange }: MedicinesActionDialogProps) {
  const queryClient = useQueryClient();
  const isEdit = !!currentMedicine;
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MedicineSchema>({
    resolver: zodResolver(medicineSchema),
    defaultValues: isEdit ? {
      ...currentMedicine,
      isEdit,
    } : {
      categoryId: "",
      name: "",
      thumbnail: {
        url: "",
      },
      description: "",
      variants: {
        price: 10000,
        limitQuantity: 1,
        stockStatus: "IN-STOCK",
        originalPrice: 10000,
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
  })

  // Add effect to automatically calculate price when originalPrice or discountPercent changes
  useEffect(() => {
    const originalPrice = form.watch('variants.originalPrice');
    const discountPercent = form.watch('variants.discountPercent');

    if (originalPrice && discountPercent >= 0) {
      const calculatedPrice = originalPrice * (1 - discountPercent / 100);
      form.setValue('variants.price', Math.round(calculatedPrice));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('variants.originalPrice'), form.watch('variants.discountPercent')]);

  const addMedicineMutation = useMutation({
    mutationFn: MedicineAPI.MedicineCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      toast.success(isEdit ? "Cập nhật thuốc thành công" : "Thêm thuốc mới thành công");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`Lỗi: ${error instanceof Error ? error.message : 'Không thể lưu thuốc'}`);
    }
  })

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
    if (!isEdit) addMedicineMutation.mutate(data);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
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
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="border-teal-200 hover:bg-teal-50 text-teal-700 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </Button>
              )}

              <div className="flex justify-end gap-2 flex-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-teal-200 hover:bg-teal-50 text-teal-700"
                >
                  Hủy
                </Button>

                {activeStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-teal-600 hover:bg-teal-700 flex items-center gap-1.5"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Tiếp theo
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={addMedicineMutation.isPending}
                    className="bg-teal-600 hover:bg-teal-700 flex items-center gap-1.5"
                  >
                    {addMedicineMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : isEdit ? (
                      <>
                        <Save className="w-4 h-4" />
                        Cập nhật
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Thêm thuốc
                      </>
                    )}
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