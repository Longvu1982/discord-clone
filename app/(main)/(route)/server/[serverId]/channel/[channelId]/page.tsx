import { db } from "@/lib/db";
import React from "react";
import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import ChatSection from "@/components/chat/chat-section";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components/media-room";

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
        {channel?.type === ChannelType.TEXT && (
          <>
            <ChatMessages
              name={channel?.name ?? ""}
              apiUrl={"/api/messages"}
              chatId={channel?.id ?? ""}
              paramKey={"channelId"}
              paramValue={channel?.id ?? ""}
            />
            <ChatInput
              query={{ serverId: params.serverId, channelId: params.channelId }}
              apiUrl="/api/socket/messages"
              type="conversation"
              name={channel?.name ?? ""}
            />
          </>
        )}
        {channel?.type === ChannelType.AUDIO && (
          <MediaRoom audio video={false} chatId={channel.id} />
        )}
        {channel?.type === ChannelType.VIDEO && (
          <MediaRoom video audio chatId={channel.id} />
        )}
      </ChatSection>
    </div>
  );
};

export default ChannelPage;
