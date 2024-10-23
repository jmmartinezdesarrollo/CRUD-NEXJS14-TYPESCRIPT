import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, password, roles, isAdmin } = await req.json();

  try {
    // Verificar que los roles existen
    const existingRoles = await prisma.role.findMany({
      where: {
        id: {
          in: roles.map((role: { roleId: number }) => role.roleId),
        },
      },
    });

    if (existingRoles.length !== roles.length) {
      return NextResponse.json(
        { error: "One or more roles do not exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        isAdmin,
        roles: {
          create: roles.map((role: { roleId: number }) => ({
            role: {
              connect: { id: role.roleId },
            },
          })),
        },
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
