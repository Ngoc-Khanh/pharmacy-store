import { fetchUserProfile, tokenAtom, updateTokenAtom, userAtom } from "@/atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const token = useAtomValue(tokenAtom);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(updateTokenAtom);

  const { data: userData, error } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 phút
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (error) {
      setUser(null);
      setToken("");
    }
  }, [error, setUser, setToken]);

  return <>{children}</>;
}