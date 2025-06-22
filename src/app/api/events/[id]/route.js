import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/utils/apiResponse";
import { checkRequiredFields } from "@/utils/errorBuilder";
import { NextResponse } from "next/server";
import { sendNotificationToAllUsers } from "@/lib/notificationUtils";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        createErrorResponse("Event not found", { code: "NOT_FOUND" }),
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { messId, title, description, date, time, location } =
      await request.json();

    const requiredFields = ["messId", "title", "date", "time"];
    const missingFieldsError = checkRequiredFields(
      { title, date, time },
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

    const updatedEvent = await prisma.event.update({
      where: { id },
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
      type: "EVENT_UPDATE",
      title: `Event Updated: ${title}`,
      message: `The event '${title}' has been updated.`,
      link: `/events/${updatedEvent.id}`,
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const eventToDelete = await prisma.event.findUnique({ where: { id } });

    if (!eventToDelete) {
      return NextResponse.json(
        createErrorResponse("Event not found", { code: "NOT_FOUND" }),
        { status: 404 }
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    await sendNotificationToAllUsers({
      messId: eventToDelete.messId,
      type: "EVENT",
      title: `Event Deleted`,
      message: `An event with ID ${id} has been deleted.`,
      link: `/notifications`,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(error.message, { code: "SERVER_ERROR" }),
      { status: 500 }
    );
  }
}
