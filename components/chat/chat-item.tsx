"use client";

import React, { FC } from "react";
import { MessageExtended } from "@/lib/types";
import UserAvatar from "../custom/user/UserAvatar";
import dayjs from "dayjs";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface ChatItemProps {
  item: MessageExtended;
}

const ChatItem: FC<ChatItemProps> = ({ item }) => {
  const { user } = useUser();

  return (
    <div key={item.id} className="mb-4">
      <div className="flex items-start gap-2">
        <UserAvatar className="size-9" src={item.profile?.imageUrl} />
        <div>
          <p
            className={cn(
              "font-semibold text-zinc-200/90 text-sm mb-1",
              item.profile?.userId === user?.id
                ? "text-[#DC143C]"
                : "text-green-600"
            )}
          >
            {item.profile?.name}{" "}
            <span className="opacity-75 text-xs text-zinc-300 font-normal ml-2">
              {dayjs(item?.createAt).format("DD/MM/YYYY hh:mm")}
            </span>
          </p>
          <div className="flex flex-col-reverse gap-2 mt-2">
            {item.messages.map((chat) => (
              <p className="text-xs text-zinc-200">{chat.content}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
