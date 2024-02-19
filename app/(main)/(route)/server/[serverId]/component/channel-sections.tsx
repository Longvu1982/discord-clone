"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "@/hooks/use-p-router";
import { cn } from "@/lib/utils";
import { Channel, ChannelType } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface ChannelSectionProps {
  channels: Channel[];
  name: string;
  serverId: string;
}

const ChannelSection: FC<ChannelSectionProps> = ({
  channels,
  name,
  serverId,
}) => {
  const router = useRouter();
  const params = useParams();
  const [isTriggerSelectFirst, setTriggerSelectFirst] = useState(true);

  const renderChannelIcon = (type: ChannelType | undefined) => {
    switch (type) {
      case ChannelType.AUDIO:
        return <Mic className="text-zinc-400 w-4 h-4" />;
      case ChannelType.VIDEO:
        return <Video className="text-zinc-400 w-4 h-4 mt-[1px]" />;
      case ChannelType.TEXT:
      default:
        return <Hash className="text-zinc-400 w-4 h-4" />;
    }
  };
  console.log(channels);

  useEffect(() => {
    if (
      name === "Text channel" &&
      channels.length > 0 &&
      isTriggerSelectFirst
    ) {
      router.push(`/server/${serverId}/channel/${channels[0].id}`);
      setTriggerSelectFirst(false);
    }
  }, [channels.length, name, isTriggerSelectFirst]);

  return channels.length > 0 ? (
    <Accordion
      type="single"
      collapsible
      className="mb-4 px-1"
      defaultValue="channel"
    >
      <AccordionItem value="channel">
        <AccordionTrigger className="justify-start text-xs py-0 text-zinc-400 gap-1 uppercase">
          {name} ({channels?.length})
        </AccordionTrigger>
        <AccordionContent className="px-2 py-1 space-y-1">
          {channels?.map((item) => (
            <div
              key={item.name}
              className={cn(
                "flex items-center gap-1 p-1 py-2 rounded-md cursor-pointer hover:opacity-75",
                params.channelId === item.id &&
                  "bg-zinc-200 dark:bg-zinc-700 hover:opacity-100"
              )}
              onClick={
                params.channelId === item.id
                  ? undefined
                  : () => router.push(`/server/${serverId}/channel/${item.id}`)
              }
            >
              {renderChannelIcon(item.type)}
              <span className="ml-1">{item.name}</span>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <></>
  );
};

export default ChannelSection;
