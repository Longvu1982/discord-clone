import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { MemberRole } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export const POST = async (req: NextRequest) => {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await initProfile();
    if (!profile) return new NextResponse("Unauthorize", { status: 401 });

    const server = await db.chatServer.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: v4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
