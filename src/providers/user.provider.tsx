import { siteConfig } from "@/config";
import { User } from "@/data/interfaces";
import { getAccessToken } from "@/lib/get-token";
import { AuthAPI } from "@/services/api/auth.api";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type UserProviderProps = {
  children: React.ReactNode;
}

type UserProviderState = {
  user: User | null;
  token: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: (token: string) => void;
}

const initialState: UserProviderState = {
  user: null,
  token: "",
  setUser: () => null,
  setToken: () => null,
}

const UserProviderContext = React.createContext<UserProviderState>(initialState);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(getAccessToken());

  const updateToken = useCallback((newToken: string) => {
    setToken(newToken);
    if (newToken) localStorage.setItem(siteConfig.auth.jwt_key, newToken);
    else localStorage.removeItem(siteConfig.auth.jwt_key);
  }, [])

  useEffect(() => {
    if (token) {
      AuthAPI.getProfile()
        .then((response) => {
          setUser(response);
        })
        .catch(() => {
          setUser(null);
          updateToken("");
        });
    }
  }, [token, updateToken]);

  const contextValue = useMemo(
    () => ({
      user,
      token,
      setUser,
      setToken: updateToken,
    }),
    [user, token, setUser, updateToken]
  );

  return (
    <UserProviderContext.Provider value={contextValue}>{children}</UserProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => React.useContext(UserProviderContext);