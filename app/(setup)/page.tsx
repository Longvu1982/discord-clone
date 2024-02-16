import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await initProfile();
  if (!profile) return redirect("/");

  const server = await db.chatServer.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`/server/${server.id}`);

  return <InitialModal isOpen />;
}
