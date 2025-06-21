import { prisma } from "@/lib/prisma";

export async function sendNotificationToAllUsers({
  messId,
  type = "MESS",
  title,
  message,
  link,
  eventId,
}) {
  try {
    // const users = await prisma.user.findMany({ where: { messId }, select: { id: true } });
    const users = await prisma.mess.findUnique({
      where: {
        id: messId,
      },
      select: {
        members: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!users || !users.members) {
      throw new Error("No users found in the mess");
    }

    const notificationsData = users.members.map((member) => ({
      userId: member.user.id,
      type,
      title,
      message,
      read: false,
      link,
      eventId,
    }));

    await prisma.notification.createMany({
      data: notificationsData,
    });
    return { success: true, message: "Notifications sent to all users." };
  } catch (error) {
    console.error("Error sending notifications to all users:", error);
    throw new Error("Failed to send notifications to all users.");
  }
}

export async function sendNotificationToRole({
  role,
  type = "MESS",
  title,
  message,
  link,
}) {
  try {
    const users = await prisma.user.findMany({
      where: { role },
      select: { id: true },
    });
    const notificationsData = users.map((user) => ({
      userId: user.id,
      type,
      title,
      message,
      read: false,
      link,
    }));

    await prisma.notification.createMany({
      data: notificationsData,
    });
    return {
      success: true,
      message: `Notifications sent to users with role ${role}.`,
    };
  } catch (error) {
    console.error(`Error sending notifications to role ${role}:`, error);
    throw new Error(`Failed to send notifications to role ${role}.`);
  }
}

// send notification to user
export async function sendNotificationToUser({
  userId,
  type = "MESS",
  title,
  message,
  link,
  eventId,
}) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        read: false,
        link,
        eventId,
      },
    });
    return notification;
  } catch (error) {
    throw new Error(`Failed to send notification to user with ID ${userId}.`);
  }
}
