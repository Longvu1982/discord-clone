import InitialModal from "@/components/modals/initial-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await initProfile();

  const server = (
    await db.profile.findUnique({
      where: {
        userId: profile.userId,
      },
      include: {
        chatServers: { take: 1 },
      },
    })
  )?.chatServers?.[0];

  if (server) return redirect(`/servers/${server?.id}`);

  return (
    <div>
      <h1>Create a server</h1>
      <InitialModal />
    </div>
  );
}
