import { Medicine, User } from "@/data/interfaces";
import { atom, useAtom } from "jotai";

type UsersDialogType = "add" | "edit" | "delete" | "view" | "suspend" | "activate"

export const openUsersDialogAtom = atom<UsersDialogType | null>(null);
export const currentUserAtom = atom<User | null>(null);

export const useUsersDialog = () => {
  const [open, setOpen] = useAtom(openUsersDialogAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  return { open, setOpen, currentUser, setCurrentUser };
}

type MedicinesDialogType = "add" | "edit" | "delete"

export const openMedicinesDialogAtom = atom<MedicinesDialogType | null>(null);
export const currentMedicineAtom = atom<Medicine | null>(null);

export const useMedicinesDialog = () => {
  const [open, setOpen] = useAtom(openMedicinesDialogAtom);
  const [currentMedicine, setCurrentMedicine] = useAtom(currentMedicineAtom);

  return { open, setOpen, currentMedicine, setCurrentMedicine };
}