
import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL;
if (!BACKEND) throw new Error("NEXT_PUBLIC_API_URL must be set");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json({ detail: "email is required" }, { status: 400 });
    }
    if (!body.policy_version || !body.timestamp) {
      return NextResponse.json(
        { detail: "policy_version and timestamp are required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${BACKEND}/consent`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email:             body.email,
        timestamp:         body.timestamp,
        policy_version:    body.policy_version || "1.0.0",
        acceptance_method: body.acceptance_method || "click-button",
        user_agent:        req.headers.get("user-agent") || body.user_agent || "unknown",
      }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Consent API error:", err);
    return NextResponse.json({ detail: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!secret) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }
  try {
    const url   = new URL(req.url);
    const query = new URLSearchParams({
      ...(url.searchParams.get("email") ? { email: url.searchParams.get("email")! } : {}),
      page:   url.searchParams.get("page")   || "1",
      "limit_": url.searchParams.get("limit") || "50",
    }).toString();

    const res  = await fetch(`${BACKEND}/admin/consent?${query}`, {
      headers: { "x-admin-secret": secret },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ detail: "Internal server error" }, { status: 500 });
  }
}