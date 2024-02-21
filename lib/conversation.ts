import { db } from "./db";

const initConversation = async (
  senderId: string | undefined = "",
  receiverId: string | undefined = ""
) => {
  let conversation =
    (await findConversation(senderId, receiverId)) ||
    (await findConversation(receiverId, senderId));

  if (!conversation)
    conversation = await createNewConversation(senderId, receiverId);
  return conversation;
};

const findConversation = async (senderId?: string, receiverId?: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ senderId, receiverId }],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
  } catch {
    return null;
  }
};

const createNewConversation = async (senderId: string, receiverId: string) => {
  try {
    return await db.conversation.create({
      data: {
        senderId,
        receiverId,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
  } catch {
    return null;
  }
};

export default initConversation;
