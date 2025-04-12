import { Users } from "@/data/zod-schemas";
import { createContext, useContext, useState } from "react";

type UsersDialogType = "add" | "edit" | "delete" | "view" | "ban" | "activate";

interface UsersContextType {
  open: UsersDialogType | null;
  setOpen: (str: UsersDialogType | null) => void;
  currentUser: Users | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Users | null>>;
}

const UsersContext = createContext<UsersContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function UsersProvider({ children }: Props) {
  const [open, setOpen] = useState<UsersDialogType | null>(null);
  const [currentUser, setCurrentUser] = useState<Users | null>(null);

  return (
    <UsersContext.Provider value={{ open, setOpen, currentUser, setCurrentUser }}>
      {children}
    </UsersContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const usersContext = useContext(UsersContext);
  if (!usersContext) throw new Error("useUsers must be used within a <UsersProvider>");
  return usersContext;
}
