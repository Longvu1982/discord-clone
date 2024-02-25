"use client";

import React, { FC } from "react";
import { MessageExtended } from "@/lib/types";
import UserAvatar from "../custom/user/UserAvatar";
import dayjs from "dayjs";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ChatItemProps {
  item: MessageExtended;
}

const ChatItem: FC<ChatItemProps> = ({ item }) => {
  const { user } = useUser();

  return (
    <div key={item.id} className="mb-6">
      <div className="flex items-start gap-4">
        <UserAvatar className="size-9" src={item.profile?.imageUrl} />
        <div className="-mt-1 flex-1">
          <p
            className={cn(
              "font-semibold text-zinc-200/90 text-sm mb-2",
              item.profile?.userId === user?.id
                ? "text-[#DC143C]"
                : "text-green-600"
            )}
          >
            {item.profile?.name}{" "}
            <span className="opacity-75 text-xs dark:text-zinc-300 text-zinc-500 font-normal ml-2">
              {dayjs(item?.createAt).format("DD/MM/YYYY hh:mm")}
            </span>
          </p>
          <div className="flex flex-col-reverse gap-2">
            {item.messages.map((chat) => (
              <div key={chat.id}>
                <p className="text-xs dark:text-zinc-200 text-zinc-800 font-semibold">
                  {chat.content}
                </p>
                {chat.fileURL && (
                  <Image
                    src={chat.fileURL ?? ""}
                    alt=""
                    width={0}
                    height={0}
                    sizes="30vw"
                    style={{
                      width: "auto",
                      height: "150px",
                      marginTop: "10px",
                    }} // optional
                    layout="intrinsic"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
