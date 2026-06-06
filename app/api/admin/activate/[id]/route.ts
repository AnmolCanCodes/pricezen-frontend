import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authHeader = request.headers.get("x-admin-secret");
    if (!authHeader) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) throw new Error("NEXT_PUBLIC_API_URL must be set");
    const res = await fetch(`${backendUrl}/admin/activate/${id}`, {
      method: "POST",
      headers: { "x-admin-secret": authHeader },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Admin activate API error:", error);
    return NextResponse.json({ detail: "Internal server error" }, { status: 500 });
  }
}
