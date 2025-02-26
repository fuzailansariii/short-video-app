import { authOptions } from "@/lib/AuthOptions";
import { prisma } from "@/lib/PrismaClient";
import { VideoModal } from "@/schemas/zodSchema";
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

    const parsedData = VideoModal.safeParse(await req.json());
    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid or missing required fields" },
        { status: 400 }
      );
    }

    // if (
    //   !parsedData.data?.title ||
    //   !parsedData.data?.description ||
    //   !parsedData.data?.videoUrl ||
    //   !parsedData.data?.thumbnailUrl
    // ) {
    //   return NextResponse.json(
    //     {
    //       error: "Missing required fields",
    //     },
    //     { status: 401 }
    //   );
    // }
    const videoData = parsedData.data;

    const finalVideoData = {
      ...videoData,
      controls: videoData.controls ?? true,
      transformation: videoData.transformation ?? {
        height: 1980,
        width: 1080,
      },
    };

    const { title, description, thumbnailUrl, videoUrl } = finalVideoData;
    const newVideo = await prisma.video.create({
      data: {
        title,
        description,
        thumbnailUrl,
        videoUrl,
      },
    });
    return NextResponse.json(
      {
        message: "Video created successfully",
        video: newVideo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      {
        error: "Error creating new video",
      },
      { status: 500 }
    );
  }
}
