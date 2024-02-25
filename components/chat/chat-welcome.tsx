import { Hash } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

interface ChatWelcomeProps {
  name: string;
  imageUrl?: string;
}

const ChatWelcome: FC<ChatWelcomeProps> = ({ name, imageUrl }) => {
  return (
    <div className="flex-1 flex flex-col px-4 mb-6 mt-4">
      <div className="flex-1" />
      {imageUrl ? (
        <div className="relative size-20 p-2 mb-2">
          <Image
            fill
            className="rounded-full object-cover"
            alt=""
            src={imageUrl}
          />
        </div>
      ) : (
        <Hash className="size-20 p-2 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-2 text-white dark:text-zinc-200" />
      )}
      <p className="flex items-center text-2xl mb-1">
        {!imageUrl && (
          <>
            <span className="text-zinc-400 inline-block mr-2">Welcome to</span>
            <Hash className="size-6" />
          </>
        )}
        <span>{name}</span>
      </p>
      <span className="text-sm text-zinc-400">
        This is the start of the conversation.
      </span>
    </div>
  );
};

export default ChatWelcome;
