import { AddressSchema } from "@/data/schemas";
import { atom, useAtom } from "jotai";

type AddressesDialogType = "add" | "edit" | "delete";

export const addressesDialogAtom = atom<AddressesDialogType | null>(null);
export const currentAddressAtom = atom<AddressSchema | null>(null);

export const useAddresses = () => {
  const [open, setOpen] = useAtom(addressesDialogAtom);
  const [currentAddress, setCurrentAddress] = useAtom(currentAddressAtom);
  
  return {
    open,
    setOpen,
    currentAddress,
    setCurrentAddress,
  };
};
