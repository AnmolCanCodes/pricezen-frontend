import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:8000";

const REQUIRED_FIELDS = [
  "razorpay_order_id",
  "razorpay_payment_id",
  "razorpay_signature",
  "client_id",
] as const;

export async function POST(req: NextRequest) {
  // Parse and validate body before forwarding to backend
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ detail: "Invalid request body." }, { status: 400 });
  }

  // Ensure all required Razorpay fields are present
  for (const field of REQUIRED_FIELDS) {
    if (!body[field]) {
      console.error(`[verify] Missing field: ${field}`);
      return NextResponse.json(
        { detail: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  // client_id must be a positive integer
  const clientId = Number(body.client_id);
  if (!Number.isInteger(clientId) || clientId <= 0) {
    return NextResponse.json({ detail: "Invalid client_id." }, { status: 400 });
  }

  // Razorpay IDs should be non-empty strings
  for (const field of ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"] as const) {
    if (typeof body[field] !== "string" || !(body[field] as string).trim()) {
      return NextResponse.json({ detail: `Invalid ${field}.` }, { status: 400 });
    }
  }

  try {
    const res = await fetch(`${BACKEND}/payment/verify`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      signal:  AbortSignal.timeout(15000),   // 15s timeout
      body:    JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) {
      console.error(`[verify] Backend error ${res.status}:`, data);
    } else {
      console.log(`[verify] ✅ Payment verified — order=${body.razorpay_order_id}`);
    }

    return NextResponse.json(data, { status: res.status });

  } catch (err: any) {
    const isTimeout = err?.name === "TimeoutError" || err?.name === "AbortError";
    console.error("[verify] Error:", err?.message || err);
    // IMPORTANT: Don't say "payment failed" on timeout.
    // The payment may have succeeded even if verification timed out.
    return NextResponse.json(
      {
        detail: isTimeout
          ? "Verification timed out. If payment was deducted, email prizenalert@gmail.com with your payment details."
          : "Backend unreachable. Contact support if payment was deducted.",
      },
      { status: 503 }
    );
  }
}