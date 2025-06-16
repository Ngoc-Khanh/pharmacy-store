import { useState, useCallback } from 'react';

export interface StepFormData {
  symptom: string;
  patientAge: number;
  patientGender: 'nam' | 'nữ' | 'khác';
  aiResponse?: {
    primary_diagnosis: {
      diagnosis_name: string;
      confidence_percentage: number;
      description: string;
      reasons: string[];
    };
    alternative_diagnoses: Array<{
      diagnosis_name: string;
      confidence_percentage: number;
      description: string;
      reasons: string[];
    }>;
    general_advice: string[];
    severity_level: 'nhẹ' | 'trung bình' | 'nghiêm trọng';
    related_symptoms: string[];
    recommended_actions: string[];
  };
  selectedMedicines: string[];
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  shippingInfo: {
    area: string;
    fee: number;
    estimatedTime: string;
  };
  orderTotal: number;
}

export const useStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StepFormData>({
    symptom: '',
    patientAge: 25,
    patientGender: 'nam',
    selectedMedicines: [],
    customerInfo: {
      name: '',
      phone: '',
      address: '',
      paymentMethod: '',
    },
    shippingInfo: {
      area: '',
      fee: 0,
      estimatedTime: '',
    },
    orderTotal: 0,
  });

  const totalSteps = 6;

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, []);

  const updateFormData = useCallback((data: Partial<StepFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setFormData({
      symptom: '',
      patientAge: 25,
      patientGender: 'nam',
      selectedMedicines: [],
      customerInfo: {
        name: '',
        phone: '',
        address: '',
        paymentMethod: '',
      },
      shippingInfo: {
        area: '',
        fee: 0,
        estimatedTime: '',
      },
      orderTotal: 0,
    });
  }, []);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return {
    currentStep,
    totalSteps,
    formData,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    resetForm,
    isFirstStep,
    isLastStep,
  };
}; 