import { MemberRole } from "@prisma/client";
import { ShieldCheck, ShieldPlus } from "lucide-react";

export const BadgeMap = {
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
