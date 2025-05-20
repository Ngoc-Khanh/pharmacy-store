import { Category, Medicine, User } from "@/data/interfaces";
import { atom, useAtom } from "jotai";

type UsersDialogType = "add" | "edit" | "delete" | "view" | "suspend" | "activate"

export const openUsersDialogAtom = atom<UsersDialogType | null>(null);
export const currentUserAtom = atom<User | null>(null);

export const useUsersDialog = () => {
  const [open, setOpen] = useAtom(openUsersDialogAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  return { open, setOpen, currentUser, setCurrentUser };
}

type CategoriesDialogType = "add" | "edit" | "delete"

export const openCategoriesDialogAtom = atom<CategoriesDialogType | null>(null);
export const currentCategoryAtom = atom<Category | null>(null);

export const useCategoriesDialog = () => {
  const [open, setOpen] = useAtom(openCategoriesDialogAtom);
  const [currentCategory, setCurrentCategory] = useAtom(currentCategoryAtom);

  return { open, setOpen, currentCategory, setCurrentCategory };
}

type MedicinesDialogType = "add" | "edit" | "delete"

export const openMedicinesDialogAtom = atom<MedicinesDialogType | null>(null);
export const currentMedicineAtom = atom<Medicine | null>(null);

export const useMedicinesDialog = () => {
  const [open, setOpen] = useAtom(openMedicinesDialogAtom);
  const [currentMedicine, setCurrentMedicine] = useAtom(currentMedicineAtom);

  return { open, setOpen, currentMedicine, setCurrentMedicine };
}