import { MemberRole } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BadgeMap } from "./types";
import CustomTooltip from "@/components/custom/tooltip/custom-tooltip";
import { ReactNode } from "react";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const renderBadge = (role: MemberRole | undefined) => {
  if (!role) return null;
  console.log(role);
  return (
    <CustomTooltip content={role} side="top">
      {BadgeMap[role] as ReactNode}
    </CustomTooltip>
  );
};
