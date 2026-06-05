import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "");

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("client_id");
  const token    = searchParams.get("token");        // ← NEW

  // Validate client_id is a real integer
  if (!clientId || !/^\d+$/.test(clientId)) {
    return NextResponse.json(
      { detail: "Invalid client_id" },
      { status: 400 }
    );
  }

  // Require token — never forward unsigned requests to backend
  if (!token) {
    return NextResponse.json(
      { detail: "Missing payment token. Please use the link sent to your email." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${BACKEND}/payment/create-order?client_id=${clientId}&token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        signal: AbortSignal.timeout(14000),
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (err: any) {
    console.error("[create-order route] Backend error:", err?.message);
    return NextResponse.json(
      { detail: "Payment service unavailable. Please try again." },
      { status: 502 }
    );
  }
}