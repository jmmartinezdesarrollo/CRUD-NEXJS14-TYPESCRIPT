import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const roleId = url.pathname.split("/").pop();
  const { code } = await req.json();

  if (!roleId) {
    return NextResponse.json({ error: "Role ID is required" }, { status: 400 });
  }

  try {
    const updatedRole = await prisma.role.update({
      where: {
        id: Number(roleId),
      },
      data: {
        code,
      },
    });
    return NextResponse.json(updatedRole);
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json({ error: "Error updating role" }, { status: 500 });
  }
}
