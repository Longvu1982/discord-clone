import { ChannelType, ChatServer, MemberRole } from "@prisma/client";
import { redirect, useParams } from "next/navigation";
import { FC } from "react";
import { ServerSideHeader } from "./server-side-header";
import initProfile from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { channel } from "diagnostics_channel";

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

  if (!currentServer) return null;

  return (
    <div>
      <ServerSideHeader server={currentServer} role={role} />
    </div>
  );
};

export default ServerSideBar;
