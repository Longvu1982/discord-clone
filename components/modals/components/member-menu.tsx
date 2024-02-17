import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useModalStore from "@/hooks/store/use-modal-store";
import { useRouter } from "@/hooks/use-p-router";
import { Member, MemberRole, Profile } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldPlus,
  ShieldQuestion,
} from "lucide-react";
import { FC, useState } from "react";

const roleOptionsMap = [
  {
    text: "Guest",
    icon: Shield,
    role: MemberRole.GUEST,
  },
  {
    text: "Moderator",
    icon: ShieldPlus,
    role: MemberRole.MODERATOR,
  },
];

interface MemberMenuProps {
  member: Member & { profile?: Profile };
}

const MemberMenu: FC<MemberMenuProps> = ({ member }) => {
  const [isLoading, setISloading] = useState<boolean>(false);
  const router = useRouter();
  const setData = useModalStore((state) => state.setData);
  const data = useModalStore((state) => state.data);

  const onRoleChange = async (role: MemberRole) => {
    setISloading(true);
    await axios.patch("/api/member/change-role", {
      id: member.id,
      serverId: member.serverId,
      role: role,
    });
    const newData = structuredClone(data);
    const members = newData.members ?? [];
    const currentIndex = members.findIndex((item) => item.id === member.id);
    if (currentIndex !== undefined && currentIndex > -1) {
      members[currentIndex].role = role;
    }
    newData.members = members;
    setData(newData);
    router.refresh();
    setISloading(false);
  };

  const onKick = async () => {
    setISloading(true);
    const { data } = await axios.patch("/api/member/kick", {
      id: member.id,
      serverId: member.serverId,
    });

    setData(data);
    router.refresh();
    setISloading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isLoading} className="ml-auto mr-1">
        {isLoading ? (
          <Loader2 className="h-4 w-4 text-zinc-500 animate-spin" />
        ) : (
          <MoreVertical className="h-4 w-4 text-zinc-500" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center">
            <ShieldQuestion className="w-4 h-4 mr-2" />
            <span>Role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {roleOptionsMap.map((item) => (
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  disabled={item.role === member.role || isLoading}
                  key={item.text}
                  onClick={() => onRoleChange(item.role)}
                  className="cursor-pointer"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.text}
                  {member.role === item.role && (
                    <Check className="h-4 w-4 ml-2" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onKick}>
          <Gavel className="h-4 w-4 mr-2" />
          Kick
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberMenu;
