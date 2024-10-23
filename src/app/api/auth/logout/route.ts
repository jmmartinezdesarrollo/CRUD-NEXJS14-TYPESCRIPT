import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "Logged out" });
  response.headers.set(
    "Set-Cookie",
    "token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict"
  );

  return response;
}
