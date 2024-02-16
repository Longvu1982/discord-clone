import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import React from "react";
import SideBarAction from "./side-bar-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import SideBarNavigation from "./side-bar-navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const SideBar = async () => {
  const profile = await initProfile();
  if (!profile) return redirect("/");

  const servers = await db.chatServer.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="hidden md:flex w-[72px] h-screen dark:bg-[#1e1f22] items-center flex-col py-4 gap-4">
      <SideBarAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 mx-auto w-10" />
      <SideBarNavigation servers={servers ?? []} />
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default SideBar;
