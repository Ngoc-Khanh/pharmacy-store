import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

// Individual form field atoms
export const symptomAtom = atomWithReset('');
export const patientAgeAtom = atomWithReset(25);
export const patientGenderAtom = atomWithReset<'nam' | 'nữ' | 'khác'>('nam');

// AI Response atom
export const aiResponseAtom = atomWithReset<{
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
} | undefined>(undefined);

// Medicine selection atoms
export const selectedMedicinesAtom = atomWithReset<string[]>([]);

// Customer information atoms
export const customerNameAtom = atomWithReset('');
export const customerPhoneAtom = atomWithReset('');
export const customerAddressAtom = atomWithReset('');
export const paymentMethodAtom = atomWithReset('');

// Shipping information atoms
export const shippingAreaAtom = atomWithReset('');
export const shippingFeeAtom = atomWithReset(0);
export const estimatedTimeAtom = atomWithReset('');

// Order total atom
export const orderTotalAtom = atomWithReset(0);

// Current step atom
export const currentStepAtom = atomWithReset(1);
export const totalStepsAtom = atom(6);

// Computed atoms
export const customerInfoAtom = atom(
  (get) => ({
    name: get(customerNameAtom),
    phone: get(customerPhoneAtom),
    address: get(customerAddressAtom),
    paymentMethod: get(paymentMethodAtom),
  }),
  (get, set, newValue: { name: string; phone: string; address: string; paymentMethod: string }) => {
    set(customerNameAtom, newValue.name);
    set(customerPhoneAtom, newValue.phone);
    set(customerAddressAtom, newValue.address);
    set(paymentMethodAtom, newValue.paymentMethod);
  }
);

export const shippingInfoAtom = atom(
  (get) => ({
    area: get(shippingAreaAtom),
    fee: get(shippingFeeAtom),
    estimatedTime: get(estimatedTimeAtom),
  }),
  (get, set, newValue: { area: string; fee: number; estimatedTime: string }) => {
    set(shippingAreaAtom, newValue.area);
    set(shippingFeeAtom, newValue.fee);
    set(estimatedTimeAtom, newValue.estimatedTime);
  }
);

// Comprehensive form data atom (for compatibility)
export const formDataAtom = atom(
  (get) => ({
    symptom: get(symptomAtom),
    patientAge: get(patientAgeAtom),
    patientGender: get(patientGenderAtom),
    aiResponse: get(aiResponseAtom),
    selectedMedicines: get(selectedMedicinesAtom),
    customerInfo: get(customerInfoAtom),
    shippingInfo: get(shippingInfoAtom),
    orderTotal: get(orderTotalAtom),
  })
);

// Step navigation atoms
export const isFirstStepAtom = atom((get) => get(currentStepAtom) === 1);
export const isLastStepAtom = atom((get) => get(currentStepAtom) === get(totalStepsAtom));

export const nextStepAtom = atom(
  null,
  (get, set) => {
    const current = get(currentStepAtom);
    const total = get(totalStepsAtom);
    if (current < total) {
      set(currentStepAtom, current + 1);
    }
  }
);

export const prevStepAtom = atom(
  null,
  (get, set) => {
    const current = get(currentStepAtom);
    if (current > 1) {
      set(currentStepAtom, current - 1);
    }
  }
);

export const goToStepAtom = atom(
  null,
  (get, set, step: number) => {
    const total = get(totalStepsAtom);
    if (step >= 1 && step <= total) {
      set(currentStepAtom, step);
    }
  }
);

// Reset all atoms
export const resetFormAtom = atom(
  null,
  (get, set) => {
    set(currentStepAtom, 1);
    set(symptomAtom, '');
    set(patientAgeAtom, 25);
    set(patientGenderAtom, 'nam');
    set(aiResponseAtom, undefined);
    set(selectedMedicinesAtom, []);
    set(customerNameAtom, '');
    set(customerPhoneAtom, '');
    set(customerAddressAtom, '');
    set(paymentMethodAtom, '');
    set(shippingAreaAtom, '');
    set(shippingFeeAtom, 0);
    set(estimatedTimeAtom, '');
    set(orderTotalAtom, 0);
  }
);

// Loading states
export const isLoadingAIResponseAtom = atomWithReset(false);
export const isLoadingMedicinesAtom = atomWithReset(false);

// Validation atoms
export const isStep1ValidAtom = atom((get) => {
  const symptom = get(symptomAtom);
  const age = get(patientAgeAtom);
  const gender = get(patientGenderAtom);
  return symptom.trim().length > 5 && age > 0 && gender;
});

export const isStep2ValidAtom = atom((get) => {
  const selectedMedicines = get(selectedMedicinesAtom);
  return selectedMedicines.length > 0;
});

export const isStep3ValidAtom = atom((get) => {
  const customerInfo = get(customerInfoAtom);
  return customerInfo.name.trim() && 
         customerInfo.phone.trim() && 
         customerInfo.address.trim() && 
         customerInfo.paymentMethod;
}); 