import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/utils/apiResponse";
// import { checkRequiredFields } from "@/lib/errorBuilder";
import { NextResponse } from "next/server";

import { checkRequiredFields } from "@/utils/errorBuilder";
import { sendNotificationToAllUsers } from "@/lib/notificationUtils";

export async function POST(request) {
  try {
    const { messId, title, description, date, time, location } =
      await request.json();

    const requiredFields = ["messId", "title", "date", "time"];
    const missingFieldsError = checkRequiredFields(
      { title, date, time, messId },
      requiredFields
    );
    if (missingFieldsError) {
      return NextResponse.json(
        createErrorResponse(missingFieldsError.error, {
          code: "VALIDATION_ERROR",
        }),
        { status: missingFieldsError.statusCode }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        messId,
        title,
        description,
        date: new Date(date),
        time,
        location,
      },
    });

    await sendNotificationToAllUsers({
      messId,
      type: "EVENT",
      title: `New Event: ${title}`,
      message: `A new event '${title}' has been scheduled for ${new Date(date).toLocaleDateString()}.`,
      link: `/events/${newEvent.id}`,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
