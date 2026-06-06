import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-secret");
    if (!authHeader) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) throw new Error("NEXT_PUBLIC_API_URL must be set");
    const res = await fetch(`${backendUrl}/admin/clients`, {
      headers: { "x-admin-secret": authHeader },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Admin clients API error:", error);
    return NextResponse.json({ detail: "Internal server error" }, { status: 500 });
  }
}
