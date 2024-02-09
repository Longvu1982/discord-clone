"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatServer } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import React, { FC } from "react";

interface ServerSideHeaderProps {
  server: ChatServer | null;
}

export const ServerSideHeader: FC<ServerSideHeaderProps> = ({ server }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-between w-full">
        <p>{server?.name}</p>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
