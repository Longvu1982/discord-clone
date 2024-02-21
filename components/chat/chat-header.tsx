import { Channel } from "@prisma/client";
import { Hash } from "lucide-react";
import { FC } from "react";
import UserAvatar from "../custom/user/UserAvatar";
import MobileToggle from "../mobile-toggle";
import ChatStatus from "./chat-status";

interface ChannelHeaderProps {
  channel?: Channel;
  type?: "channel" | "direct";
  name: string;
  serverId: string;
  imageUrl?: string;
}

const ChatHeader: FC<ChannelHeaderProps> = ({
  channel,
  imageUrl,
  type = "channel",
  name,
  serverId,
}) => {
  return (
    <div className="h-12 border-neutral-200 px-3 flex items-center dark:border-neutral-800 border-b-2 gap-2">
      <MobileToggle serverId={serverId} />
      <div className="flex items-center gap-1">
        {imageUrl && <UserAvatar className="w-6 h-6 mr-1" src={imageUrl} />}
        {type === "channel" && <Hash className="h-4 w-4 text-zinc-400" />}
        <span className="text-sm">{name}</span>
      </div>
      <div className="text-xs ml-auto">
        <ChatStatus />
      </div>
    </div>
  );
};

export default ChatHeader;
