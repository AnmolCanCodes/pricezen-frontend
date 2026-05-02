import { NextRequest, NextResponse } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export function middleware(request: NextRequest) {
  // Protect all /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("x-admin-secret");
    const cookieSecret = request.cookies.get("admin_secret")?.value;
    
    const providedSecret = authHeader || cookieSecret;
    
    if (!providedSecret || providedSecret !== ADMIN_SECRET) {
      return new NextResponse("Unauthorized - Invalid or missing admin secret", {
        status: 401,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
