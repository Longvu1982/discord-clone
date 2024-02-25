import React, { ReactNode } from "react";
import CustomTooltip from "../tooltip/custom-tooltip";
import { MemberRole } from "@prisma/client";
import { ShieldCheck, ShieldPlus } from "lucide-react";

const BadgeMap = {
  [MemberRole.ADMIN]: (
    <div className="text-green-700">
      <ShieldCheck className=" h-5" />
    </div>
  ),
  [MemberRole.MODERATOR]: (
    <div>
      <ShieldPlus color="#c65102" className=" h-5" />
    </div>
  ),
  [MemberRole.GUEST]: <></>,
};

const UserBadge = ({ role }: { role: MemberRole | undefined }) => {
  if (!role) return null;
  return (
    <CustomTooltip content={role} side="top">
      {BadgeMap[role] as ReactNode}
    </CustomTooltip>
  );
};

export default UserBadge;
