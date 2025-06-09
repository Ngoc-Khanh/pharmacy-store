import {
  currentStepAtom,
  formDataAtom,
  goToStepAtom,
  isFirstStepAtom,
  isLastStepAtom,
  isStep1ValidAtom,
  nextStepAtom,
  patientAgeAtom,
  patientGenderAtom,
  prevStepAtom,
  resetFormAtom,
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
  const isValid = useAtomValue(isStep1ValidAtom);
  const nextStep = useSetAtom(nextStepAtom)

  return {
    symptoms,
    setSymptoms,
    patientAge,
    setPatientAge,
    patientGender,
    setPatientGender,
    isValid,
    nextStep,
  };
};
