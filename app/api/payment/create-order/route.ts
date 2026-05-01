import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  // Validate client_id — must be a positive integer, not null/string
  const clientId = req.nextUrl.searchParams.get("client_id");
  if (!clientId || !/^\d+$/.test(clientId) || parseInt(clientId) <= 0) {
    return NextResponse.json(
      { detail: "Invalid or missing client_id." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${BACKEND}/payment/create-order?client_id=${clientId}`,
      {
        method: "POST",
        signal: AbortSignal.timeout(15000),   // 15s — don't let backend hang the UI
      }
    );
    const data = await res.json();

    if (!res.ok) {
      console.error(`[create-order] Backend error ${res.status}:`, data);
    }

    return NextResponse.json(data, { status: res.status });

  } catch (err: any) {
    const isTimeout = err?.name === "TimeoutError" || err?.name === "AbortError";
    console.error("[create-order] Error:", err?.message || err);
    return NextResponse.json(
      { detail: isTimeout ? "Payment gateway timed out. Please try again." : "Backend unreachable." },
      { status: 503 }
    );
  }
}