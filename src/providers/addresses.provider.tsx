import useDialogState from "@/hooks/use-dialog-state";
import { AddressSchema } from "@/data/zod-schemas";
import * as React from "react";

type AddressesDialogType = "add" | "edit" | "delete";

interface AddressesContextType {
  open: AddressesDialogType | null;
  setOpen: (str: AddressesDialogType | null) => void;
  currentAddress: AddressSchema | null;
  setCurrentAddress: React.Dispatch<React.SetStateAction<AddressSchema | null>>;
}

const AddressesContext = React.createContext<AddressesContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function AddressesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<AddressesDialogType>(null);
  const [currentAddress, setCurrentAddress] = React.useState<AddressSchema | null>(null);
  return (
    <AddressesContext.Provider value={{ open, setOpen, currentAddress, setCurrentAddress }}>
      {children}
    </AddressesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAddresses = () => {
  const addressesContext = React.useContext(AddressesContext);
  if (!addressesContext) throw new Error("useAddresses has to be used within <AddressesContext>");
  return addressesContext;
}