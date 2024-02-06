import { create } from "zustand";

interface ModalStoreType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
