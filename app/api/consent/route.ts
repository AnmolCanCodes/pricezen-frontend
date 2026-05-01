// app/api/consent/route.ts
// ─────────────────────────────────────────────────────────────────
// Stores privacy policy consent records to backend SQLite database.
// Called when a user clicks "I Agree" on the Privacy Policy page.
//
// This route forwards requests to the Python backend API at GET /consent
// which stores records in the SQLite database (clients.db/consent_records table).
//
// What this stores per record:
//   timestamp        — ISO 8601 datetime (from client, validated)
//   policy_version   — e.g. "1.0.0"
//   acceptance_method — "click-button"
//   ip_address       — extracted SERVER-SIDE from request headers
//   user_agent       — browser string from client
//   email            — user's email to link record to their account
// ─────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

/* ── Helper: extract real IP from headers ──────────────────────── */
function getClientIP(req: NextRequest): string {
  // Order matters — check forwarded headers first (for Vercel, Nginx, Cloudflare)
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP.trim();

  // Fallback — in local dev this may be "::1" (localhost IPv6)
  return req.headers.get("x-client-ip") || "unknown";
}

/* ── POST /api/consent ─────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json({ detail: "email is required" }, { status: 400 });
    }
    if (!body.policy_version || !body.timestamp) {
      return NextResponse.json({ detail: "policy_version and timestamp are required" }, { status: 400 });
    }

    // Prepare the consent payload for the backend
    const consentPayload = {
      email: body.email.toLowerCase().trim(),
      timestamp: body.timestamp,            // from client (when they clicked)
      policy_version: body.policy_version,
      acceptance_method: body.acceptance_method || "click-button",
      ip_address: getClientIP(req),         // added HERE server-side, never from client
      user_agent: body.user_agent || "unknown",
    };

    // Forward to Python backend API
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/consent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consentPayload),
    });

    if (!response.ok) {
      console.error("Backend consent API error:", response.status, response.statusText);
      throw new Error(`Backend returned ${response.status}`);
    }

    const backendResponse = await response.json();

    // Return the response from backend
    return NextResponse.json({
      success: true,
      message: "Consent recorded",
      consent_id: backendResponse.consent_id,
      record: consentPayload,
    }, { status: 201 });

  } catch (err) {
    console.error("Consent API error:", err);
    return NextResponse.json({ detail: "Internal server error" }, { status: 500 });
  }
}

/* ── GET /api/consent ─────────────────────────────────────────────
   Admin endpoint — protected by ADMIN_SECRET header.
   Returns all consent records from backend database.
   Usage: GET /api/consent  with header  x-admin-secret: <your secret>
   ─────────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  const validSecret = process.env.ADMIN_SECRET;

  if (!validSecret || secret !== validSecret) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/consent-records`, {
      headers: {
        "X-Admin-Secret": validSecret,
      },
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Get consent records error:", err);
    return NextResponse.json({ detail: "Failed to fetch records" }, { status: 500 });
  }
}