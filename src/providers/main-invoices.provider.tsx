import useDialogState from "@/hooks/use-dialog-state";
import { MainInvoices } from "@/data/zod-schemas";
import * as React from "react"

type MainInvoicesDialogType = "view" | "download";

interface MainInvoicesContextType {
  open: MainInvoicesDialogType | null;
  setOpen: (str: MainInvoicesDialogType | null) => void;
  currentRow: MainInvoices | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<MainInvoices | null>>;
}

const MainInvoicesContext = React.createContext<MainInvoicesContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function MainInvoicesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<MainInvoicesDialogType>(null);
  const [currentRow, setCurrentRow] = React.useState<MainInvoices | null>(null);
  return (
    <MainInvoicesContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </MainInvoicesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMainInvoices() {
  const mainInvoicesContext = React.useContext(MainInvoicesContext);
  if (!mainInvoicesContext) throw new Error("useMainInvoices must be used within <MainInvoicesProvider>");
  return mainInvoicesContext;
}