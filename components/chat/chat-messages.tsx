"use client";

import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { MessageExtended } from "@/lib/types";
import { Member, Message, Profile } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { ElementRef, FC, useMemo, useRef } from "react";
import { Button } from "../ui/button";
import ChatItem from "./chat-item";
import ChatWelcome from "./chat-welcome";
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
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

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

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  const allMessages = useMemo(() => {
    const result: MessageExtended[] = [];

    const flat = data?.pages?.flat(2);
    const chatItems = flat?.reduce((acc, cur) => {
      acc.push(...cur.items);
      return acc;
    }, []);

    if (!chatItems) return result;

    for (let i = 0; i < chatItems.length; i++) {
      if (chatItems[i].profileId !== chatItems[i - 1]?.profileId) {
        result.push({ ...chatItems[i], messages: [chatItems[i]] });
      } else result[result.length - 1].messages.push(chatItems[i]);
    }

    return result;
  }, [data]);

  if (status === "pending")
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="size-7 text-zinc-500 animate-spin my-4" />
      </div>
    );

  return (
    <div ref={chatRef} className="flex-1 overflow-y-auto flex flex-col">
      {!hasNextPage && <ChatWelcome name={name} />}
      {hasNextPage && !isFetchingNextPage && (
        <Button
          className="w-fit mx-auto hover:bg-transparent active:bg-transparent text-xs"
          variant="ghost"
          onClick={async () => {
            await fetchNextPage();
          }}
        >
          Load more messages
        </Button>
      )}
      {isFetchingNextPage && (
        <div className="flex items-center mx-auto mt-2">
          <Loader2 className="shrink-0 text-zinc-500 size-4 animate-spin mr-2" />
          <span className="text-zinc-500 text-xs">loading messages...</span>
        </div>
      )}
      <div className="flex flex-col-reverse justify-start p-3">
        {allMessages.map((item) => (
          <ChatItem key={item.id} item={item} />
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
