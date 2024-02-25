"use client";

import React, {
  FC,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
} from "react";

type ChatContextType = {
  scrollRef: React.RefObject<HTMLDivElement | undefined>;
};

const ChatContext = createContext<ChatContextType>({
  scrollRef: { current: null },
});

export const useChatContext = () => {
  return useContext(ChatContext);
};

interface ChatSectionProps {
  children: ReactNode;
}

const ChatSection: FC<ChatSectionProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>();
  return (
    <ChatContext.Provider value={{ scrollRef }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatSection;
