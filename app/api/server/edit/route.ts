import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { MemberRole } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export const PATCH = async (req: NextRequest) => {
  try {
    const { name, imageUrl, id } = await req.json();
    const profile = await initProfile();
    if (!profile) return new NextResponse("Unauthorize", { status: 401 });
    if (!id) return new NextResponse("Missing ServerID", { status: 400 });

    const server = await db.chatServer.update({
      where: {
        id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
