"use client";

import React, { FC, ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default QueryProvider;
