import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, name, type } = await req.json();
    const profile = await initProfile();
    if (!profile) return new NextResponse("Unauthorize", { status: 401 });
    if (!id) return new NextResponse("Missing id", { status: 400 });

    const server = await db.chatServer.update({
      where: {
        id,
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("[SERVER_PATCH_CREATE_CHANNEL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
