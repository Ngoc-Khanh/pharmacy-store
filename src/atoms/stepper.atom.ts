import { atom } from "jotai";

export const steps = [
  { id: "basic-info", title: "Thông tin cơ bản", step: 1 },
  { id: "variants", title: "Biến thể", step: 2 },
  { id: "details", title: "Chi tiết", step: 3 },
  { id: "usage-guide", title: "Hướng dẫn sử dụng", step: 4 },
];

export const activeStepAtom = atom<number>(1);