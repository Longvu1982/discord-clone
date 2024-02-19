"use client";
import React from "react";
import InitialModal from "./initial-modal";
import { useIsMounted } from "@/hooks/mount";
import InvitePeople from "./invite-people";
import ManageMembers from "./manage-members";
import CreateChannel from "./create-channel";

const ModalProviders = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>
      <InitialModal />
      <InvitePeople />
      <ManageMembers />
      <CreateChannel />
    </>
  );
};

export default ModalProviders;
