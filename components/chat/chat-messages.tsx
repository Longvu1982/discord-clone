"use client";

import { useChatQuery } from "@/hooks/use-chat-query";
import { Channel, Member, Message, Profile } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { FC, useRef } from "react";
import UserAvatar from "../custom/user/UserAvatar";
import { ScrollArea } from "../ui/scroll-area";
import ChatWelcome from "./chat-welcome";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatContext } from "./chat-section";

interface ChatMessagesProps {
  member?: Member & { profile?: Profile };
  name: string;
  type: "conversation";
  apiUrl: string;
  socketUrl: string;
  chatId: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

interface DataResponseType {
  pageParams: A[];
  pages: [{ items: (Message & { profile?: Profile })[] }];
}
const ChatMessages: FC<ChatMessagesProps> = ({
  apiUrl,
  paramKey,
  paramValue,
  chatId,
  name,
}) => {
  const { scrollRef } = useChatContext();
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  useChatSocket({
    queryKey,
    addKey,
    updateKey,
  });

  if (status === "pending")
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="size-7 text-zinc-500 animate-spin my-4" />
      </div>
    );

  const { items = [] } = (data as unknown as DataResponseType)?.pages?.[0];

  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      <ChatWelcome name={name} />
      <div className="flex flex-col-reverse justify-start p-3">
        {items.map((chat) => (
          <div key={chat.id} className="mb-4">
            <div className="flex items-start gap-2">
              <UserAvatar className="size-6" src={chat.profile?.imageUrl} />
              <div>
                <p className="font-semibold text-zinc-200/90 text-sm mb-1">
                  {chat.profile?.name}{" "}
                  <span className="opacity-75 text-xs text-zinc-300 font-normal ml-2">
                    {new Date(chat?.createAt)?.toLocaleDateString()}{" "}
                    {new Date(chat?.createAt)?.toLocaleTimeString()}
                  </span>
                </p>
                <p className="text-xs text-zinc-300/80">{chat.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="scroll-mb-20 size-2 shrink-0 pb-20"
        ref={scrollRef as A}
      />
    </div>
  );
};

export default ChatMessages;
