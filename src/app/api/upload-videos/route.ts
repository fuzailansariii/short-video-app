import { authOptions } from "@/lib/AuthOptions";
import { prisma } from "@/lib/PrismaClient";
import { VideoModel } from "@/schemas/zodSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const parsedData = VideoModel.safeParse(await req.json());

    if (
      !parsedData.data?.title ||
      !parsedData.data?.description ||
      !parsedData.data?.videoUrl ||
      !parsedData.data?.thumbnailUrl
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 401 }
      );
    }
    const videoData = parsedData.data;

    const finalVideoData = {
      ...videoData,
      controls: videoData.controls ?? true,
      transformation: videoData.transformation ?? {
        height: 1980,
        width: 1080,
      },
    };

    const newVideo = await prisma.video.create({
      data: finalVideoData,
    });
    return NextResponse.json(
      {
        message: "Video created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error creating new video",
      },
      { status: 500 }
    );
  }
}
