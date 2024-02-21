import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import initConversation from "@/lib/conversation";
import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({
  params,
}: {
  params: {
    profileId: string;
    serverId: string;
  };
}) => {
  const currentProfile = await initProfile();
  if (!currentProfile) return redirect("/");

  const profile = await db.profile.findUnique({
    where: { id: params.profileId },
  });

  const conversation = await initConversation(currentProfile.id, profile?.id);

  const messages = await db.conversation.findFirst({
    where: {
      id: conversation?.id,
    },
    include: {
      directMessages: true,
    },
  });

  return (
    <div className="h-full flex-1 flex flex-col">
      <ChatHeader
        imageUrl={profile?.imageUrl}
        serverId={params.serverId}
        name={profile?.name ?? ""}
        type="direct"
      />
      {/* <ChatMessages /> */}
      <ChatInput
        query={{}}
        apiUrl=""
        type="direct"
        name={profile?.name ?? ""}
      />
    </div>
  );
};

export default Page;
