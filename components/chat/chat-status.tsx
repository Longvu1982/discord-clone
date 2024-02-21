"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { useSocket } from "../providers/socket-providers";

const ChatStatus = () => {
  const { isConnected } = useSocket();

  return isConnected ? (
    <Badge content="live" className="text-xs bg-green-700" variant="secondary">
      IO connected
    </Badge>
  ) : (
    <Badge className="text-xs bg-orange-400" variant="secondary">
      IO Connecting...
    </Badge>
  );
};

export default ChatStatus;
