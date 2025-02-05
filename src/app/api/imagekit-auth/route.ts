import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const imagekitAuth = imagekit.getAuthenticationParameters();
    return NextResponse.json(imagekitAuth);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Imagekit authentication failed.",
      },
      { status: 500 }
    );
  }
}
