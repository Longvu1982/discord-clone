import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const { serverId, id, role } = await req.json();
    const profile = await initProfile();
    if (!profile) return new NextResponse("Unauthorize", { status: 401 });
    if (!id) return new NextResponse("Missing MemberID", { status: 400 });

    const newMember = await db.member.update({
      where: {
        id,
        serverId,
      },
      data: {
        role,
      },
    });

    return NextResponse.json(newMember);
  } catch (e) {
    console.log("[SERVER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
