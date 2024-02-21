import React from "react";
import ServerSideBar from "./_component/server-side-bar";

const ServerLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  return (
    <div className="h-screen flex">
      <div className="hidden md:flex h-full w-60 flex-col dark:bg-[#2b2d31] bg-[#f2f3f5]">
        <ServerSideBar serverId={params?.serverId} />
      </div>
      <div className="h-full flex-1">{children}</div>
    </div>
  );
};

export default ServerLayout;
