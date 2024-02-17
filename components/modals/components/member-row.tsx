import UserAvatar from "@/components/custom/user/UserAvatar";
import UserBadge from "@/components/custom/user/user-badge";
import { useUser } from "@clerk/nextjs";
import { Member, Profile } from "@prisma/client";
import { FC } from "react";
import MemberMenu from "./member-menu";

interface MemberRowProps {
  member: Member & { profile?: Profile };
}

const MemberRow: FC<MemberRowProps> = ({ member }) => {
  const { user } = useUser();
  return (
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
          <UserBadge role={member.role} />
        </div>
        <span className="text-zinc-400 text-sm">{member.profile?.email}</span>
      </div>
      {user?.id !== member.profile?.userId && <MemberMenu member={member} />}
    </div>
  );
};

export default MemberRow;
