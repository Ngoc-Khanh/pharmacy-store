import { Medicines } from "@/data/zod-schemas";
import React, { useContext, useState } from "react";

type MedicineDialogType = "add" | "edit" | "delete";

interface MedicineContextType {
  open: MedicineDialogType | null;
  setOpen: (str: MedicineDialogType | null) => void;
  currentMedicine: Medicines | null;
  setCurrentMedicine: React.Dispatch<React.SetStateAction<Medicines | null>>;
}

const MedicineContext = React.createContext<MedicineContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const MedicineProvider = ({ children }: Props) => {
  const [open, setOpen] = useState<MedicineDialogType | null>(null);
  const [currentMedicine, setCurrentMedicine] = useState<Medicines | null>(null);

  return (
    <MedicineContext.Provider value={{ open, setOpen, currentMedicine, setCurrentMedicine }}>
      {children}
    </MedicineContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMedicine = () => {
  const medicinesContext = useContext(MedicineContext);
  if (!medicinesContext) throw new Error("useMedicine must be used within a <MedicineProvider>");
  return medicinesContext;
}