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

  return (
    <div className="h-full flex-1 flex flex-col">
      <ChatHeader
        imageUrl={profile?.imageUrl}
        serverId={params.serverId}
        name={profile?.name ?? ""}
        type="direct"
      />
      <ChatMessages
        imageUrl={profile?.imageUrl}
        name={profile?.name ?? ""}
        apiUrl={"/api/direct-messages"}
        chatId={conversation?.id ?? ""}
        paramKey={"conversationId"}
        paramValue={conversation?.id ?? ""}
      />
      <ChatInput
        query={{ conversationId: conversation?.id }}
        apiUrl="/api/socket/direct-messages"
        type="direct"
        name={profile?.name ?? ""}
      />
    </div>
  );
};

export default Page;
