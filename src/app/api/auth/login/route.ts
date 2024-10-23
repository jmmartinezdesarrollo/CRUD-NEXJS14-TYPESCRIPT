import { NextResponse } from "next/server";
import { encodeToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return NextResponse.json({ error: "Incorrect Password" }, { status: 401 });

  const token = encodeToken({
    userId: user.id,
    isAdmin: user.isAdmin,
    roles: user.roles.map((r) => r.role.code),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  });

  const headers = new Headers();
  headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/`);

  return NextResponse.json({ message: "Login ok" }, { headers });
}
