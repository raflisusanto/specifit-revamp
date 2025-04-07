import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "../useAuthStore";
import { auth } from "@/config/firebase";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setAuthState = useAuthStore((state) => state.setAuthState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState(true, user.uid);
      } else {
        setAuthState(false, null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};
