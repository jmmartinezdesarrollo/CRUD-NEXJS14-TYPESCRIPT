import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await prisma.userRole.deleteMany({
      where: {
        userId: Number(userId),
      },
    });

    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}