import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "../useAuthStore";
import { auth } from "@/config/firebase";
import { router } from "expo-router";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

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

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn]);

  return <>{children}</>;
};
