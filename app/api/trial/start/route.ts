import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL;
if (!BACKEND) throw new Error("NEXT_PUBLIC_API_URL must be set");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res  = await fetch(`${BACKEND}/trial/start`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ detail: "Backend unreachable." }, { status: 503 });
  }
}