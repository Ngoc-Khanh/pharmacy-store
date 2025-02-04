import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { User } from "@/data/interfaces/user.interface";
import { getAccessToken } from "@/lib/get-token";
import { AuthAPI } from "@/services/api/auth.api";
import { siteConfig } from "@/config";

interface StateUserType {
  user: User | null;
  token: string;
  setUser: Dispatch<SetStateAction<User | null>>;
  setToken: (token: string) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const StateUser = React.createContext<StateUserType>({
  user: null,
  token: "",
  setUser: () => { },
  setToken: () => { },
})

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string>(getAccessToken());

  const updateToken = useCallback((newToken: string) => {
    setToken(newToken);
    if (newToken) localStorage.setItem(siteConfig.auth.jwt_key, newToken);
    else localStorage.removeItem(siteConfig.auth.jwt_key);
  }, []);

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
    <StateUser.Provider value={contextValue}>{children}</StateUser.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateUser = () => React.useContext(StateUser);