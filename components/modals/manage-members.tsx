import useModalStore from "@/hooks/store/use-modal-store";
import { useUser } from "@clerk/nextjs";
import { MoreVertical, ShieldCheck, ShieldPlus } from "lucide-react";
import UserAvatar from "../custom/user-avatar/UserAvatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { MemberRole } from "@prisma/client";
import { renderBadge } from "@/lib/utils";

const ManageMembers = () => {
  const { user } = useUser();
  const open = useModalStore((state) => state.isOpen);
  const type = useModalStore((state) => state.type);
  const data = useModalStore((state) => state.data);
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  const members = data.members ?? [];

  console.log(members);

  console.log(user?.id);
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
              <p className="text-indigo-400 font-semibold mt-1">
                {members.length} Members
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8 px-6">
            <ScrollArea className="max-h-[420px] py-4">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-2 mb-4">
                  <UserAvatar src={member.profile?.imageUrl} />
                  <div className="flex flex-col text-sm">
                    <div className="flex items-center">
                      <span className="text-zinc-800 font-semibold">
                        {member.profile?.name}
                      </span>
                      {user?.id === member.profile?.userId && (
                        <span className="ml-2 text-green-700 text-xs font-semibold">
                          Current
                        </span>
                      )}
                      {renderBadge(member.role)}
                    </div>
                    <span className="text-zinc-400 text-sm">
                      {member.profile?.email}
                    </span>
                  </div>
                  <Button autoFocus={false} className="ml-auto" variant="link">
                    <MoreVertical className="ml-auto text-zinc-500 h-5" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMembers;
