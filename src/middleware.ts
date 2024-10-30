import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/lib/jwt";
import { redirectToLoginWithClearedCookie } from "@/lib/auth";

interface DecodedToken {
  userId: string;
  isAdmin: boolean;
  roles: string[];
  exp: number;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);
  const homeUrl = new URL("/", request.url);
  const error401Url = new URL("/401", request.url);

  const publicRoutes = [
    "/login",
    "/401",
    "/api/auth/login",
    "/api/auth/logout",
  ];
  const adminRoutes = ["/settings", "/api/roles", "/api/user"];

  const token = request.cookies.get("token")?.value;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = decodeToken(token) as DecodedToken;

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      return redirectToLoginWithClearedCookie(request);
    }

    if (adminRoutes.includes(pathname) && !decoded.isAdmin) {
      return NextResponse.redirect(error401Url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return redirectToLoginWithClearedCookie(request);
  }
}
export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
