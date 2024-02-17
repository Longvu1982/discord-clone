import { db } from "@/lib/db";
import initProfile from "@/lib/initial-profile";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await initProfile();
    if (!profile) return new NextResponse("Unauthorize", { status: 401 });

    if (!params.serverId) {
      return new NextResponse("Missing Server ID", { status: 400 });
    }

    const server = await db.chatServer.update({
      where: {
        id: params.serverId,
        members: {
          some: {
            AND: [
              {
                OR: [
                  {
                    profileId: profile.id,
                    role: MemberRole.ADMIN,
                  },
                  {
                    profileId: profile.id,
                    role: MemberRole.MODERATOR,
                  },
                ],
              },
            ],
          },
        },
      },
      data: {
        inviteCode: v4(),
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("[SERVER_PATCH]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
