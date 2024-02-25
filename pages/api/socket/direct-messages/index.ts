import { NextApiRequest } from "next";

import { db } from "@/lib/db";
import { currentProfilePages } from "@/lib/current-profile-page";

export default async function handler(req: NextApiRequest, res: A) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileURL } = req.body;
    const { conversationId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing" });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            receiverId: profile.id,
          },
          {
            senderId: profile.id,
          },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const member =
      conversation.sender.id === profile.id
        ? conversation.sender
        : conversation.receiver;

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.directMessage.create({
      data: {
        content,
        fileURL,
        conversationId: conversationId as string,
        profileId: profile.id,
      },
      include: {
        profile: true,
      },
    });

    const channelKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
