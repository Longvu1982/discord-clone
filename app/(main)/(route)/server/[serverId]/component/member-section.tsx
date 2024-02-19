"use client";
import UserAvatar from "@/components/custom/user/UserAvatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "@/hooks/use-p-router";
import { cn } from "@/lib/utils";
import { Member, Profile } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { FC } from "react";

interface MemberSectionProps {
  members: (Member & { profile?: Profile })[];
  serverId: string;
}

const MemberSection: FC<MemberSectionProps> = ({ members, serverId }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <Accordion type="single" collapsible className="mb-4 px-1">
      <AccordionItem value="text">
        <AccordionTrigger className="justify-start text-xs py-0 text-zinc-400 gap-1">
          MEMBERS ({members.length})
        </AccordionTrigger>

        <AccordionContent className="px-2 py-1 space-y-2 mt-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() =>
                router.push(`/server/${serverId}/direct/${member.profile?.id}`)
              }
            >
              <UserAvatar className="w-7 h-7" src={member.profile?.imageUrl} />
              <span
                className={cn(
                  "text-xs text-zinc-400",
                  params.profileId === member.profile?.id &&
                    "text-zinc-700 dark:text-zinc-200 font-semibold"
                )}
              >
                {member.profile?.name}
              </span>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MemberSection;
