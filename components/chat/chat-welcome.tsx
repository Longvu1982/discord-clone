import { Hash } from "lucide-react";
import React, { FC } from "react";

interface ChatWelcomeProps {
  name: string;
}

const ChatWelcome: FC<ChatWelcomeProps> = ({ name }) => {
  return (
    <div className="flex-1 flex flex-col px-3 mb-6">
      <div className="flex-1" />
      <Hash className="size-20 p-2 rounded-full bg-zinc-600 mb-2" />
      <p className="flex items-center text-2xl mb-1">
        <span className="text-zinc-400 inline-block mr-2">Welcome to</span>
        <Hash className="size-6" />
        <span>{name}</span>
      </p>
      <span className="text-sm text-zinc-400">
        This is the start of the conversation.
      </span>
    </div>
  );
};

export default ChatWelcome;
