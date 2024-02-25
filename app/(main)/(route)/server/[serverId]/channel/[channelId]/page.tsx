import { db } from "@/lib/db";
import React from "react";
import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import ChatSection from "@/components/chat/chat-section";

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
      <ChatSection>
        <ChatHeader
          serverId={params.serverId}
          type="channel"
          name={channel?.name ?? ""}
        />
        <ChatMessages
          name={channel?.name ?? ""}
          type={"conversation"}
          apiUrl={"/api/messages"}
          socketUrl={"api/socket/messages"}
          chatId={channel?.id ?? ""}
          socketQuery={{
            channelId: params.channelId,
            serverId: params.serverId,
          }}
          paramKey={"channelId"}
          paramValue={channel?.id ?? ""}
        />
        <ChatInput
          query={{ serverId: params.serverId, channelId: params.channelId }}
          apiUrl="/api/socket/messages"
          type="conversation"
          name={channel?.name ?? ""}
        />
      </ChatSection>
    </div>
  );
};

export default ChannelPage;
