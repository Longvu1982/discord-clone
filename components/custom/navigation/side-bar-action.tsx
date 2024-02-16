"use client";
import useModalStore from "@/hooks/store/use-modal-store";
import { Plus } from "lucide-react";
import CustomTooltip from "../tooltip/custom-tooltip";

const SideBarAction = () => {
  const openPanel = useModalStore((state) => state.openModal);
  return (
    <CustomTooltip content="Create a server">
      <div className="group px-3">
        <button
          onClick={() => openPanel()}
          className="w-[48px] h-[48px] flex items-center justify-center dark:bg-neutral-700 rounded-[24px] group-hover:bg-emerald-500 transition-all group-hover:rounded-[16px]"
        >
          <Plus className="text-emerald-500 group-hover:text-white transition-all" />
        </button>
      </div>
    </CustomTooltip>
  );
};

export default SideBarAction;
