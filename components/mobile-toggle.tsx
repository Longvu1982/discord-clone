import ServerSideBar from "@/app/(main)/(route)/server/[serverId]/_component/server-side-bar";
import { Menu } from "lucide-react";
import SideBar from "./custom/navigation/side-bar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          overlayClassname="md:hidden"
          side="left"
          className="p-0 md:hidden w-full xs:w-3/4"
        >
          <div className="flex h-screen">
            <SideBar />
            <div className="flex-1 pr-6">
              <ServerSideBar serverId={serverId} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileToggle;
