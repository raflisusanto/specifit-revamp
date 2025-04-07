import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  uid: string | null;
  setAuthState: (isLoggedIn: boolean, uid: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  uid: null,
  setAuthState: (isLoggedIn, uid) => set({ isLoggedIn, uid }),
}));
