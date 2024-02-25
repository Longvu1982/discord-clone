import { MemberRole, Message, Profile } from "@prisma/client";
import { ShieldCheck, ShieldPlus } from "lucide-react";

export type MessageExtended = Message & {
  profile?: Profile;
  messages: (Message & { profile?: Profile })[];
};
