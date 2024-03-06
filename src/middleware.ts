import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verify-email" ||
    path === "/reset-password" ||
    path === "/forgot-password";

  const token = request.cookies.get("token")?.value || "";

  // console.log("token", token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path === "/" || (isPublicPath && token)) {
    return null; // Continue with the request
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verify-email",
    "/reset-password",
    "/forgot-password",
  ],
};
