"use client";

import AuthorityWrapper from "@/components/custom/authority-wrapper/authority-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useModalStore from "@/hooks/store/use-modal-store";
import { cn } from "@/lib/utils";
import { ChatServer, MemberRole } from "@prisma/client";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { ChevronDown, PlusCircle, Trash, UserPlus, Users } from "lucide-react";
import { FC } from "react";

interface ServerSideHeaderProps {
  server: ChatServer;
  role?: MemberRole;
}

export const ServerSideHeader: FC<ServerSideHeaderProps> = ({
  server,
  role,
}) => {
  const openPanel = useModalStore((state) => state.openModal);

  const buttonsList = [
    {
      text: "Invite people",
      color: "text-indigo-600 dark:text-indigo-400",
      icon: UserPlus,
      roles: [MemberRole.ADMIN, MemberRole.MODERATOR],
      onClick: () => {
        openPanel("invite-people", server);
      },
    },
    {
      text: "Server Settings",
      icon: GearIcon,
      roles: [MemberRole.ADMIN],
      onClick: () => {
        openPanel("edit-server", server);
      },
    },
    {
      text: "Manage Members",
      icon: Users,
      roles: [MemberRole.ADMIN, MemberRole.MODERATOR],
      onClick: () => {
        openPanel("manage-members", server);
      },
    },
    {
      text: "Create Channels",
      icon: PlusCircle,
      roles: [],
      onClick: () => {
        openPanel("create-channel", server);
      },
    },
    {
      text: "Leave Group",
      color: "text-rose-600 dark:text-rose-400",
      icon: ExitIcon,
      roles: [MemberRole.GUEST, MemberRole.MODERATOR],
    },
    {
      text: "Delete Server",
      color: "text-rose-600 dark:text-rose-400",
      icon: Trash,
      roles: [MemberRole.ADMIN],
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex bg-transparent justify-between w-full p-3">
        <p>{server?.name}</p>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 [&>*]:cursor-pointer">
        {buttonsList.map(({ text, color, icon: Icon, roles, onClick }) => (
          <AuthorityWrapper role={role} key={text} acceptedRoles={roles}>
            <DropdownMenuItem
              onClick={onClick}
              className={cn("flex items-center justify-between", color)}
            >
              {text}
              <Icon className="h-4 w-4" />
            </DropdownMenuItem>
          </AuthorityWrapper>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
