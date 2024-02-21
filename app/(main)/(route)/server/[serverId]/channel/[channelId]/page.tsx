import { db } from "@/lib/db";
import React from "react";
import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";

const ChannelPage = async ({
  params,
}: {
  params: {
    channelId: string;
    serverId: string;
  };
}) => {
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        serverId={params.serverId}
        type="channel"
        name={channel?.name ?? ""}
      />
      {/* <ChatMessages /> */}
      <ChatInput
        query={{ serverId: params.serverId, channelId: params.channelId }}
        apiUrl="/api/socket/messages"
        type="conversation"
        name={channel?.name ?? ""}
      />
    </div>
  );
};

export default ChannelPage;