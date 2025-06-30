import { fetchUserProfileAtom, tokenAtom } from "@/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const token = useAtomValue(tokenAtom);
  const fetchUserProfile = useSetAtom(fetchUserProfileAtom);

  useEffect(() => {
    if (token) fetchUserProfile();
  }, [token, fetchUserProfile]);

  return <>{children}</>
}