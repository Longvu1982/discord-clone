import { Channel, ChatServer, Member, Profile } from "@prisma/client";
import { create } from "zustand";
type ModalData = ChatServer & {
  members?: (Member & { profile?: Profile })[];
  channels?: Channel[];
};

type ModalType =
  | "create-server"
  | "edit-server"
  | "invite-people"
  | "manage-members"
  | "create-channel";
interface ModalStoreType {
  isOpen: boolean;
  type: ModalType;
  data: ModalData;
  openModal: (type?: ModalType, data?: ChatServer) => void;
  setData: (data: ModalData) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  type: "create-server",
  data: {} as ModalData,
  setData: (data: ModalData) => set({ data }),
  openModal: (type: ModalType = "create-server", data = {} as ModalData) =>
    set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
