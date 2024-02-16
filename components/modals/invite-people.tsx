"use client";
import useModalStore from "@/hooks/store/use-modal-store";
import { useBoolean } from "@/hooks/use-boolean";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { CheckIcon, Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InvitePeople = () => {
  const [isCopied, setCopied] = useState<boolean>(false);
  const [isLoading, openLoading, closeLoading] = useBoolean(false);
  const open = useModalStore((state) => state.isOpen);
  const type = useModalStore((state) => state.type);
  const data = useModalStore((state) => state.data);
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  const origin = useOrigin();

  const inviteUrl = `${origin}/invite/${data.inviteCode}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onGenerate = async () => {
    openLoading();
    const { data: res } = await axios.patch(
      `/api/server/${data.id}/invite-code`
    );
    openModal("invite people", res);
    closeLoading();
  };

  return (
    <div>
      <Dialog open={open && type === "invite people"} onOpenChange={closeModal}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Invite friends
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Invite your friends to share maseages, images and much more.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8 px-6">
            <div className="space-y-2">
              <Label className="text-cs uppercase font-bold text-zinc-500 dark:text-secondary/70">
                Copy the link
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  disabled={isLoading}
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                  defaultValue={inviteUrl}
                />
                <Button
                  disabled={isLoading}
                  className="bg-transparent"
                  size="icon"
                  onClick={isCopied ? undefined : onCopy}
                >
                  {isCopied ? (
                    <CheckIcon className="h-4 w-4 text-green-700" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button variant="primary" disabled={isLoading} onClick={onGenerate}>
              Generate new code
              <RefreshCcw className="h-4 w-4 inline-block ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvitePeople;
