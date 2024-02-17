import { Channel, ChatServer, Member, Profile } from "@prisma/client";
import { create } from "zustand";
type ModalType =
  | "create-server"
  | "edit-server"
  | "invite-people"
  | "manage-members";
interface ModalStoreType {
  isOpen: boolean;
  type: ModalType;
  data: ChatServer & {
    members?: (Member & { profile?: Profile })[];
    channels?: Channel[];
  };
  openModal: (type?: ModalType, data?: ChatServer) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  type: "create-server",
  data: {} as ChatServer,
  openModal: (type: ModalType = "create-server", data = {} as ChatServer) =>
    set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
