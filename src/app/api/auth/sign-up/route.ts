import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/PrismaClient";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "Username, Email and Password are required.",
        },
        { status: 400 }
      );
    }

    const alreadyExistingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });

    if (alreadyExistingUser) {
      const errorMessage =
        alreadyExistingUser.username === username
          ? "Username is already registered"
          : "Email is already registered";

      return NextResponse.json(
        {
          message: errorMessage,
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      {
        message: "Failed to register user.",
        ErrorMessage: error,
      },
      { status: 500 }
    );
  }
};
