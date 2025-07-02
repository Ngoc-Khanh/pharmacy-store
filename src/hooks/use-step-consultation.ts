import {
  consultationIdAtom,
  currentStepAtom,
  feedbackCommentAtom,
  feedbackRatingAtom,
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
  selectedAddressIdAtom,
  selectedMedicinesAtom,
  selectedPaymentMethodAtom,
  symptomsAtom,
  totalStepsAtom,
} from "@/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { BotMessageSquare, CheckCircle2, FileText, Pill, Star, User } from "lucide-react";

/**
 * Custom hook sử dụng Jotai atoms thay thế cho useStepForm
 * Tối ưu performance bằng cách chỉ subscribe vào atoms cần thiết
 */
export const useStepConsultation = () => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const totalSteps = useAtomValue(totalStepsAtom);
  const isFirstStep = useAtomValue(isFirstStepAtom);
  const isLastStep = useAtomValue(isLastStepAtom);

  // Hành động (không trigger re-render)
  const nextStep = useSetAtom(nextStepAtom);
  const prevStep = useSetAtom(prevStepAtom);
  const goToStep = useSetAtom(goToStepAtom);

  // Validation States
  const isStep1Valid = useAtomValue(isStep1ValidAtom);

  return {
    currentStep,
    setCurrentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    validataion: {
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
  const [selectedMedicines, setSelectedMedicines] = useAtom(
    selectedMedicinesAtom
  );
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
  const [selectedAddressId, setSelectedAddressId] = useAtom(
    selectedAddressIdAtom
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useAtom(
    selectedPaymentMethodAtom
  );
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
  const goToStep = useSetAtom(goToStepAtom);
  const placedOrder = useAtomValue(placedOrderAtom);

  return {
    feedbackRating,
    setFeedbackRating,
    feedbackComment,
    setFeedbackComment,
    isValid,
    goToStep,
    placedOrder,
  };
};

export const stepTitles = [
  {
    title: 'Mô tả triệu chứng',
    description: 'Chia sẻ triệu chứng với AI',
    icon: BotMessageSquare,
    color: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    title: 'Gợi ý thuốc',
    description: 'Xem đề xuất từ AI',
    icon: Pill,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'Thông tin đặt hàng',
    description: 'Nhập thông tin cá nhân',
    icon: User,
    color: 'text-teal-600 dark:text-teal-400'
  },
  {
    title: 'Xác nhận đặt hàng',
    description: 'Thuốc đã thêm vào giỏ hàng',
    icon: CheckCircle2,
    color: 'text-cyan-600 dark:text-cyan-400'
  },
  {
    title: 'Hóa đơn điện tử',
    description: 'Chi tiết đơn hàng đã đặt',
    icon: FileText,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'Góp ý & Đánh giá',
    description: 'Đánh giá trải nghiệm',
    icon: Star,
    color: 'text-purple-600 dark:text-purple-400'
  }
];