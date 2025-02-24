import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const video = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!video || video.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
