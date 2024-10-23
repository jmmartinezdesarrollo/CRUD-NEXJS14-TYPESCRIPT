import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth"; 

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { username, isAdmin, roles, password } = await req.json();

  try {
    const data: any = {
      username,
      isAdmin,
    };

    if (password) {
      data.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data,
    });

    const existingRoles = await prisma.role.findMany({
      where: {
        id: {
          in: roles,
        },
      },
    });

    if (existingRoles.length !== roles.length) {
      return NextResponse.json({ error: "One or more roles do not exist" }, { status: 400 });
    }

    await prisma.userRole.deleteMany({
      where: {
        userId: Number(userId),
      },
    });

    await prisma.userRole.createMany({
      data: roles.map((roleId: number) => ({
        userId: Number(userId),
        roleId,
      })),
    });


    const finalUser = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    const transformedUser = {
      ...finalUser,
      roles: finalUser?.roles.map((userRole) => ({
        id: userRole.role.id,
        code: userRole.role.code,
      })),
    };

    console.log(transformedUser);
    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}