import { create } from "zustand";

type ModalView = "login" | "signup" | "closed";

type AuthModalState = {
  modalView: ModalView;
  openModal: (view: "login" | "signup") => void;
  closeModal: () => void;
  switchToLogin: () => void;
  switchToSignup: () => void;
};

export const useAuthModalStore = create<AuthModalState>((set) => ({
  modalView: "closed",
  openModal: (view) => set({ modalView: view }),
  closeModal: () => set({ modalView: "closed" }),
  switchToLogin: () => set({ modalView: "login" }),
  switchToSignup: () => set({ modalView: "signup" })
}));
