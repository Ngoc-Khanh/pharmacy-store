import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  currentStepAtom,
  totalStepsAtom,
  formDataAtom,
  nextStepAtom,
  prevStepAtom,
  goToStepAtom,
  resetFormAtom,
  isFirstStepAtom,
  isLastStepAtom,
  isStep1ValidAtom,
  isStep2ValidAtom,
  isStep3ValidAtom,
  symptomAtom,
  patientAgeAtom,
  patientGenderAtom,
  aiResponseAtom,
  isLoadingAIResponseAtom,
  selectedMedicinesAtom,
  isLoadingMedicinesAtom,
  orderTotalAtom,
  customerInfoAtom
} from '../atoms/test.atom';

/**
 * Custom hook sử dụng Jotai atoms thay thế cho useStepForm
 * Tối ưu performance bằng cách chỉ subscribe vào atoms cần thiết
 */
export const useStepFormWithJotai = () => {
  // Chỉ subscribe vào currentStep atom
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  
  // Read-only values
  const totalSteps = useAtomValue(totalStepsAtom);
  const formData = useAtomValue(formDataAtom);
  const isFirstStep = useAtomValue(isFirstStepAtom);
  const isLastStep = useAtomValue(isLastStepAtom);
  
  // Actions (không trigger re-render)
  const nextStep = useSetAtom(nextStepAtom);
  const prevStep = useSetAtom(prevStepAtom);
  const goToStep = useSetAtom(goToStepAtom);
  const resetForm = useSetAtom(resetFormAtom);
  
  // Validation states
  const isStep1Valid = useAtomValue(isStep1ValidAtom);
  const isStep2Valid = useAtomValue(isStep2ValidAtom);
  const isStep3Valid = useAtomValue(isStep3ValidAtom);

  // Helper function to update specific form data (legacy compatibility)
  const updateFormData = () => {
    // This would be implemented using individual atom setters
    // For now, keeping as placeholder for migration
    console.warn('updateFormData should be replaced with specific atom setters');
  };

  return {
    currentStep,
    setCurrentStep,
    totalSteps,
    formData,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    resetForm,
    isFirstStep,
    isLastStep,
    validation: {
      isStep1Valid,
      isStep2Valid,
      isStep3Valid,
    }
  };
};

/**
 * Hook cho individual step components
 * Chỉ subscribe vào atoms mà component đó cần
 */
export const useStep1 = () => {
  const [symptom, setSymptom] = useAtom(symptomAtom);
  const [patientAge, setPatientAge] = useAtom(patientAgeAtom);
  const [patientGender, setPatientGender] = useAtom(patientGenderAtom);
  const [aiResponse, setAiResponse] = useAtom(aiResponseAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAIResponseAtom);
  const isValid = useAtomValue(isStep1ValidAtom);
  const nextStep = useSetAtom(nextStepAtom);

  return {
    symptom,
    setSymptom,
    patientAge,
    setPatientAge,
    patientGender,
    setPatientGender,
    aiResponse,
    setAiResponse,
    isLoading,
    setIsLoading,
    isValid,
    nextStep,
  };
};

export const useStep2 = () => {
  const [selectedMedicines, setSelectedMedicines] = useAtom(selectedMedicinesAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingMedicinesAtom);
  const aiResponse = useAtomValue(aiResponseAtom);
  const isValid = useAtomValue(isStep2ValidAtom);
  const nextStep = useSetAtom(nextStepAtom);
  const prevStep = useSetAtom(prevStepAtom);
  const setOrderTotal = useSetAtom(orderTotalAtom);

  return {
    selectedMedicines,
    setSelectedMedicines,
    isLoading,
    setIsLoading,
    aiResponse,
    isValid,
    nextStep,
    prevStep,
    setOrderTotal,
  };
};

export const useStep3 = () => {
  const [customerInfo, setCustomerInfo] = useAtom(customerInfoAtom);
  const isValid = useAtomValue(isStep3ValidAtom);
  const nextStep = useSetAtom(nextStepAtom);
  const prevStep = useSetAtom(prevStepAtom);

  return {
    customerInfo,
    setCustomerInfo,
    isValid,
    nextStep,
    prevStep,
  };
}; 