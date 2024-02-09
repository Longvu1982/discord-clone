"use client";

import { db } from "@/lib/db";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { ServerSideHeader } from "./server-side-header";
import { ChatServer } from "@prisma/client";
import { GetServerSideProps } from "next";

interface ServerSideBarProps {
  currentServer: ChatServer | null;
}

const ServerSideBar: FC<ServerSideBarProps> = ({ currentServer }) => {
  const { serverId } = useParams<{ serverId: string }>();

  return (
    <div className="py-4 px-3">
      <ServerSideHeader server={currentServer} />
    </div>
  );
};

export default ServerSideBar;
