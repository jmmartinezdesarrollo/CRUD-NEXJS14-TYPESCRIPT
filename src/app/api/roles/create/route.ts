import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { code } = await req.json();

  try {
    const newRole = await prisma.role.create({
      data: {
        code,
      },
    });
    return NextResponse.json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({ error: "Error creating role" }, { status: 500 });
  }
}
