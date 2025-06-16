import { PatientGender, PaymentMethod } from "@/data/enum";
import { Medicine, Order } from "@/data/interfaces";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

// Các atom cho từng trường dữ liệu form
export const symptomsAtom = atomWithReset('');
export const patientAgeAtom = atomWithReset(0);
export const patientGenderAtom = atomWithReset<PatientGender>(PatientGender.MALE);

export const consultationIdAtom = atomWithReset<string | null>(null);

// Chọn thuốc atoms
export const selectedMedicinesAtom = atomWithReset<Medicine[]>([]);

// Step 3 atoms - Order information
export const selectedAddressIdAtom = atomWithReset<string | null>(null);
export const selectedPaymentMethodAtom = atomWithReset<PaymentMethod>(PaymentMethod.COD);

// Step 5 atoms - Order result
export const placedOrderAtom = atomWithReset<Order | null>(null);

// Step 6 atoms - Feedback
export const feedbackRatingAtom = atomWithReset<number | null>(null);
export const feedbackCommentAtom = atomWithReset('');

// Các atom cho trạng thái tiến trình
export const currentStepAtom = atomWithReset(1);
export const totalStepsAtom = atom(6);

// Các atom cho việc lưu trữ dữ liệu form
export const formDataAtom = atom(
  (get) => ({
    symptoms: get(symptomsAtom),
    patientAge: get(patientAgeAtom),
    patientGender: get(patientGenderAtom),
    selectedMedicines: get(selectedMedicinesAtom),
  })
)

// Các bước tiến trình atoms
export const isFirstStepAtom = atom((get) => get(currentStepAtom) === 1);
export const isLastStepAtom = atom((get) => get(currentStepAtom) === get(totalStepsAtom));

export const nextStepAtom = atom(
  null,
  (get, set) => {
    const current = get(currentStepAtom);
    const total = get(totalStepsAtom);
    if (current < total) set(currentStepAtom, current + 1);
  }
)

export const prevStepAtom = atom(
  null,
  (get, set) => {
    const current = get(currentStepAtom)
    if (current > 1) set(currentStepAtom, current - 1);
  }
)

// Các atom cho việc reset form
export const resetFormAtom = atom(
  null,
  (_get, set) => {
    set(currentStepAtom, 1);
    set(symptomsAtom, '');
    set(patientAgeAtom, 0);
    set(patientGenderAtom, PatientGender.MALE);
    set(selectedMedicinesAtom, []);
    set(selectedAddressIdAtom, null);
    set(selectedPaymentMethodAtom, PaymentMethod.COD);
    set(placedOrderAtom, null);
    set(feedbackRatingAtom, null);
    set(feedbackCommentAtom, '');
    set(consultationIdAtom, null);
  }
)

export const goToStepAtom = atom(
  null,
  (get, set, step: number) => {
    const total = get(totalStepsAtom);
    if (step >= 1 && step <= total) set(currentStepAtom, step);
  }
)

// Các atom để kiểm tra tính hợp lệ
export const isStep1ValidAtom = atom((get) => {
  const symptoms = get(symptomsAtom);
  const age = get(patientAgeAtom);
  const gender = get(patientGenderAtom);
  return symptoms.trim().length > 5 && age > 0 && gender;
})

export const isStep2ValidAtom = atom((get) => {
  const selectedMedicines = get(selectedMedicinesAtom);
  return selectedMedicines.length > 0;
})

export const isStep6ValidAtom = atom((get) => {
  const rating = get(feedbackRatingAtom);
  return rating !== null && rating > 0;
})