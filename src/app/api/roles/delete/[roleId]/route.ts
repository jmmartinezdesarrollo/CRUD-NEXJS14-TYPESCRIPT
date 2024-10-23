import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const roleId = url.pathname.split("/").pop();

  if (!roleId) {
    return NextResponse.json({ error: "Role ID is required" }, { status: 400 });
  }

  try {
    const usersWithRole = await prisma.user.findMany({
      where: {
        roles: {
          some: {
            id: Number(roleId),
          },
        },
      },
    });

    for (const user of usersWithRole) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          roles: {
            disconnect: { id: Number(roleId) },
          },
        },
      });
    }

    await prisma.role.delete({
      where: {
        id: Number(roleId),
      },
    });

    return NextResponse.json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json({ error: "Error deleting role" }, { status: 500 });
  }
}
