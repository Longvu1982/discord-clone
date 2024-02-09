import React from "react";
import ServerSideBar from "./component/server-side-bar";
import { db } from "@/lib/db";

const ServerLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const currentServer = await db.chatServer.findUnique({
    where: {
      id: params?.serverId,
    },
  });
  return (
    <div className="h-screen flex">
      <div className="hidden md:flex h-full w-60 z-20 flex-col">
        <ServerSideBar currentServer={currentServer} />
      </div>
      <div className="bg-red-400 h-full flex-1">{children}</div>
    </div>
  );
};

export default ServerLayout;
