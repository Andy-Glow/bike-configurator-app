import { create } from "zustand";

interface AuthState {
  isAuthOpen: boolean;
  toggleAuth: (isOpen?: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthOpen: false,
  // Открывает или закрывает окно
  toggleAuth: (isOpen) =>
    set((state) => ({
      isAuthOpen: isOpen !== undefined ? isOpen : !state.isAuthOpen,
    })),
}));
