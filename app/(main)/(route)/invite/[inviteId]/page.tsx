import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import React from "react";

const InviteLayout = async ({ params }: { params: { inviteId: string } }) => {
  const profile = await initProfile();
  if (!profile) return redirect("/");

  const existingServer = await db.chatServer.findFirst({
    where: {
      inviteCode: params.inviteId,
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (existingServer) return redirect(`/server/${existingServer.id}`);

  const server = await db.chatServer.update({
    where: {
      inviteCode: params.inviteId,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) return redirect(`/server/${server.id}`);

  return <></>;
};

export default InviteLayout;
