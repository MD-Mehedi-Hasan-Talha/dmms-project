import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    // Authorization logic can be added here if needed (e.g., only owner or manager can view)

    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { message: "Failed to fetch feedback", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, adminNotes, subject, message, isAnonymous } = body;

    const existingFeedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!existingFeedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    // Authorization: Only managers can update status and adminNotes
    // For users to update their own feedback (subject, message) if status is 'Pending'
    // This requires user role/authentication logic which is not implemented here.

    const updatedData = {};
    if (status) updatedData.status = status;
    if (adminNotes) updatedData.adminNotes = adminNotes;
    if (subject) updatedData.subject = subject;
    if (message) updatedData.message = message;
    if (typeof isAnonymous === "boolean") updatedData.isAnonymous = isAnonymous;

    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(updatedFeedback, { status: 200 });
  } catch (error) {
    console.error("Error updating feedback:", error);
    return NextResponse.json(
      { message: "Failed to update feedback", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const existingFeedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!existingFeedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    // Authorization: Only managers can delete feedback

    await prisma.feedback.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Feedback deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { message: "Failed to delete feedback", error: error.message },
      { status: 500 }
    );
  }
}
