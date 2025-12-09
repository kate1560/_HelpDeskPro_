// Global middleware that adds the current request URL to response headers.
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const response = NextResponse.next();
  response.headers.set("x-url", request.url);
  return response;
}

export const config = {
  matcher: "/:path*",
};
