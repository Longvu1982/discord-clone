import React, { ReactNode } from "react";
import CustomTooltip from "../tooltip/custom-tooltip";
import { BadgeMap } from "@/lib/types";
import { MemberRole } from "@prisma/client";

const UserBadge = ({ role }: { role: MemberRole | undefined }) => {
  if (!role) return null;
  return (
    <CustomTooltip content={role} side="top">
      {BadgeMap[role] as ReactNode}
    </CustomTooltip>
  );
};

export default UserBadge;
