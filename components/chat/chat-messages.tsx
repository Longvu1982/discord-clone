import { Member, Profile } from "@prisma/client";
import React, { FC } from "react";

interface ChatMessagesProps {
  member: Member & { profile?: Profile };
  name: string;
  type: "conversation";
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: string;
  paramValue: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({}) => {
  return <div className="flex-1"></div>;
};

export default ChatMessages;
