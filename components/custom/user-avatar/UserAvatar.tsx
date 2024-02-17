import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ src, className }) => {
  return (
    <Avatar className={cn("w-7 h-7", className)}>
      <Image alt="member-avatar" src={src ?? ""} fill sizes="100px" />
    </Avatar>
  );
};

export default UserAvatar;