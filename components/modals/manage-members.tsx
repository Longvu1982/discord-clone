import useModalStore from "@/hooks/store/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import MemberRow from "./components/member-row";

const ManageMembers = () => {
  const open = useModalStore((state) => state.isOpen);
  const type = useModalStore((state) => state.type);
  const data = useModalStore((state) => state.data);
  const closeModal = useModalStore((state) => state.closeModal);

  const members = data.members ?? [];

  return (
    <div>
      <Dialog
        open={open && type === "manage-members"}
        onOpenChange={closeModal}
      >
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="bg-white text-black p-0 overflow-hidden"
        >
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Manage members
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Delete members from the group or change their roles as Moderator.
              <p className="text-indigo-600 font-semibold mt-1">
                {members.length} Members
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8 px-6">
            <ScrollArea className="max-h-[420px] py-4">
              {members.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMembers;
