import { ChatServer } from "@prisma/client";
import { create } from "zustand";

interface ModalStoreType {
  isOpen: boolean;
  type: "create server" | "invite people";
  data: ChatServer;
  openModal: (
    type?: "create server" | "invite people",
    data?: ChatServer
  ) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  type: "create server",
  data: {} as ChatServer,
  openModal: (
    type: ModalStoreType["type"] = "create server",
    data = {} as ChatServer
  ) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
