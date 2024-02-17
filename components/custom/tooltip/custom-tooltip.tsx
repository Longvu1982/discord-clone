import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContentProps } from "@radix-ui/react-tooltip";
import { FC } from "react";

interface CustomTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: TooltipContentProps["side"];
}

const CustomTooltip: FC<CustomTooltipProps> = ({
  children,
  content,
  side = "right",
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
