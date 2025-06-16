import {
  consultationIdAtom,
  currentStepAtom,
  feedbackCommentAtom,
  feedbackRatingAtom,
  formDataAtom,
  goToStepAtom,
  isFirstStepAtom,
  isLastStepAtom,
  isStep1ValidAtom,
  isStep2ValidAtom,
  isStep6ValidAtom,
  nextStepAtom,
  patientAgeAtom,
  patientGenderAtom,
  placedOrderAtom,
  prevStepAtom,
  resetFormAtom,
  selectedAddressIdAtom,
  selectedMedicinesAtom,
  selectedPaymentMethodAtom,
  symptomsAtom,
  totalStepsAtom,
} from "@/atoms/consulation.atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

/**
 * Custom hook sử dụng Jotai atoms thay thế cho useStepForm
 * Tối ưu performance bằng cách chỉ subscribe vào atoms cần thiết
 */
export const useStepForm = () => {
  // Chỉ subscribe vào currentStep atom
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  // Các giá trị read-only
  const totalSteps = useAtomValue(totalStepsAtom);
  const formData = useAtomValue(formDataAtom);
  const isFirstStep = useAtomValue(isFirstStepAtom);
  const isLastStep = useAtomValue(isLastStepAtom);

  // Hành động (không trigger re-render)
  const nextStep = useSetAtom(nextStepAtom);
  const prevStep = useSetAtom(prevStepAtom);
  const goToStep = useSetAtom(goToStepAtom);
  const resetForm = useSetAtom(resetFormAtom);

  // Kiểm tra tính hợp lệ của States
  const isStep1Valid = useAtomValue(isStep1ValidAtom);

  return {
    currentStep,
    setCurrentStep,
    totalSteps,
    formData,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    isFirstStep,
    isLastStep,
    validation: {
      isStep1Valid,
    },
  };
};

/**
 * Hook cho individual step components
 * Chỉ subscribe vào atoms mà component đó cần
 */
export const useStep1 = () => {
  const [symptoms, setSymptoms] = useAtom(symptomsAtom);
  const [patientAge, setPatientAge] = useAtom(patientAgeAtom);
  const [patientGender, setPatientGender] = useAtom(patientGenderAtom);
  const [consultationId, setConsultationId] = useAtom(consultationIdAtom);
  const isValid = useAtomValue(isStep1ValidAtom);
  const nextStep = useSetAtom(nextStepAtom);

  return {
    symptoms,
    setSymptoms,
    patientAge,
    setPatientAge,
    patientGender,
    setPatientGender,
    consultationId,
    setConsultationId,
    isValid,
    nextStep,
  };
};

export const useStep2 = () => {
  const consultationId = useAtomValue(consultationIdAtom);
  const [selectedMedicines, setSelectedMedicines] = useAtom(selectedMedicinesAtom);
  const isValid = useAtomValue(isStep2ValidAtom);
  const nextStep = useSetAtom(nextStepAtom);
  const prevStep = useSetAtom(prevStepAtom);

  return {
    consultationId,
    selectedMedicines,
    setSelectedMedicines,
    isValid,
    nextStep,
    prevStep,
  };
};

export const useStep3 = () => {
  const [selectedAddressId, setSelectedAddressId] = useAtom(selectedAddressIdAtom);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useAtom(selectedPaymentMethodAtom);
  const selectedMedicines = useAtomValue(selectedMedicinesAtom);
  const nextStep = useSetAtom(nextStepAtom);
  const prevStep = useSetAtom(prevStepAtom);

  return {
    selectedAddressId,
    setSelectedAddressId,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    selectedMedicines,
    nextStep,
    prevStep,
  };
};

export const useStep5 = () => {
  const [placedOrder, setPlacedOrder] = useAtom(placedOrderAtom);
  const selectedMedicines = useAtomValue(selectedMedicinesAtom);
  const selectedAddressId = useAtomValue(selectedAddressIdAtom);
  const selectedPaymentMethod = useAtomValue(selectedPaymentMethodAtom);
  const nextStep = useSetAtom(nextStepAtom);
  const prevStep = useSetAtom(prevStepAtom);

  return {
    placedOrder,
    setPlacedOrder,
    selectedMedicines,
    selectedAddressId,
    selectedPaymentMethod,
    nextStep,
    prevStep,
  };
};

export const useStep6 = () => {
  const [feedbackRating, setFeedbackRating] = useAtom(feedbackRatingAtom);
  const [feedbackComment, setFeedbackComment] = useAtom(feedbackCommentAtom);
  const isValid = useAtomValue(isStep6ValidAtom);
  const resetForm = useSetAtom(resetFormAtom);
  const goToStep = useSetAtom(goToStepAtom);
  const placedOrder = useAtomValue(placedOrderAtom);

  return {
    feedbackRating,
    setFeedbackRating,
    feedbackComment,
    setFeedbackComment,
    isValid,
    resetForm,
    goToStep,
    placedOrder,
  };
};
