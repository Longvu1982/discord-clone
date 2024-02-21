"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatServer } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FC } from "react";
import CustomTooltip from "../tooltip/custom-tooltip";
import { useRouter } from "@/hooks/use-p-router";
import { cn } from "@/lib/utils";

interface SideBarNavigationProps {
  servers: ChatServer[];
}

const SideBarNavigation: FC<SideBarNavigationProps> = ({ servers }) => {
  const { serverId } = useParams() as { serverId: string };
  const router = useRouter();

  return (
    <ScrollArea className="w-full flex-1">
      {servers.map((item) => (
        <CustomTooltip key={item.id} content={item.name}>
          <button
            key={item.id}
            className="w-full h-[48px] group flex justify-center relative mb-4"
            onClick={
              serverId === item.id
                ? undefined
                : () => {
                    router.push(`/server/${item.id}`);
                    // router.refresh();
                  }
            }
          >
            <div
              className={cn(
                "w-[48px] h-[48px] overflow-hidden rounded-[24px] group-hover:rounded-[16px] transition-all relative",
                serverId === item.id && "rounded-[16px]"
              )}
            >
              <Image
                fill
                alt="server-name"
                className="object-cover"
                sizes="100px"
                src={item.imageUrl}
              />
            </div>
            <div
              className={cn(
                "absolute bg-primary w-1 h-3 left-0 bottom-1/2 translate-y-1/2 rounded-r-full group-hover:h-8 transition-[height]",
                serverId === item.id && "h-8"
              )}
            />
          </button>
        </CustomTooltip>
      ))}
    </ScrollArea>
  );
};

export default SideBarNavigation;
