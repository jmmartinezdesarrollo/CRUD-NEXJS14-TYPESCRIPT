import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "";
export interface JwtPayload {
  userId: number;
  role: string;
}

export async function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error verifying the token:", error);
    return null;
  }
}

export function redirectToLoginWithClearedCookie(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete("token");
  return response;
}
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
