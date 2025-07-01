import { AddressSchema } from "@/data/schemas";
import { atom, useAtom } from "jotai";

type DialogBaseType = "add" | "edit" | "delete";

export type AddressDialogType = DialogBaseType;

export const addressesDialogAtom = atom<AddressDialogType | null>(null);
export const currentAddressAtom = atom<AddressSchema | null>(null);

export const useAddress = () => {
  const [open, setOpen] = useAtom(addressesDialogAtom);
  const [currentAddress, setCurrentAddress] = useAtom(currentAddressAtom);
  return { open, setOpen, currentAddress, setCurrentAddress };
};