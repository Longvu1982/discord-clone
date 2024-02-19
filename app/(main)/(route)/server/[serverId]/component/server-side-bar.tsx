import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { ChannelType } from "@prisma/client";
import { Hash } from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";
import { ServerSideHeader } from "./server-side-header";
import { useRouter } from "@/hooks/use-p-router";
import ChannelSection from "./channel-sections";
import MemberSection from "./member-section";

interface ServerSideBarProps {
  serverId?: string;
}

const ServerSideBar: FC<ServerSideBarProps> = async ({ serverId }) => {
  const profile = await initProfile();
  if (!profile) return redirect("/");

  const currentServer = await db.chatServer.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const role = currentServer?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  const textChannels = currentServer?.channels?.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = currentServer?.channels?.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = currentServer?.channels?.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  console.log(textChannels);

  if (!currentServer) return null;

  return (
    <div>
      <div className="mb-4">
        <ServerSideHeader server={currentServer} role={role} />
      </div>

      <ChannelSection
        channels={textChannels ?? []}
        name="Text channel"
        serverId={serverId ?? ""}
      />

      <ChannelSection
        channels={audioChannels ?? []}
        name="Audio channel"
        serverId={serverId ?? ""}
      />

      <ChannelSection
        channels={videoChannels ?? []}
        name="Video channel"
        serverId={serverId ?? ""}
      />

      <MemberSection
        serverId={serverId ?? ""}
        members={currentServer.members ?? []}
      />
    </div>
  );
};

export default ServerSideBar;
