import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const imagekitAuth = imagekit.getAuthenticationParameters();
    return NextResponse.json(imagekitAuth);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Imagekit authentication failed.",
        error: error,
      },
      { status: 500 }
    );
  }
}
