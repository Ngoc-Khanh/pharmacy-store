import { PatientGender } from "@/data/enum";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

// Các atom cho từng trường dữ liệu form
export const symptomsAtom = atomWithReset('');
export const patientAgeAtom = atomWithReset(0);
export const patientGenderAtom = atomWithReset<PatientGender>(PatientGender.MALE);

// Các atom cho trạng thái tiến trình
export const currentStepAtom = atomWithReset(1);
export const totalStepsAtom = atom(6);

// Các atom cho việc lưu trữ dữ liệu form
export const formDataAtom = atom(
  (get) => ({
    symptoms: get(symptomsAtom),
    patientAge: get(patientAgeAtom),
    patientGender: get(patientGenderAtom),
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
  (get, set) => {
    set(currentStepAtom, 1);
    set(symptomsAtom, '');
    set(patientAgeAtom, 0);
    set(patientGenderAtom, PatientGender.MALE);
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