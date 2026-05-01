"use client";
import { useEffect, useMemo, useState } from "react";

interface Client {
  id: number;
  email: string;
  brand_name: string;
  whatsapp: string | null;
  plan: "starter" | "growth";
  avg_weekly_orders: number | null;
  notes: string | null;
  status: "pending" | "active" | "inactive";
  created_at: string;
  activated_at: string | null;
  deactivated_at: string | null;
  product_count: number;
}

const STATUS_LABELS: Record<string, { color: string; label: string }> = {
  pending: { color: "#f0ad4e", label: "Pending" },
  active: { color: "#1e8449", label: "Active" },
  inactive: { color: "#888", label: "Inactive" },
};

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const storedSecret = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.sessionStorage.getItem("admin_secret") || "";
  }, []);

  useEffect(() => {
    if (storedSecret) {
      setSecret(storedSecret);
      loadClients(storedSecret);
    }
  }, [storedSecret]);

  async function loadClients(currentSecret: string) {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin/clients", {
        headers: { "x-admin-secret": currentSecret },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Failed to load clients");
      }
      setClients(data || []);
      setMessage(`Loaded ${data.length} signup(s)`);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error?.message || "Unable to load clients");
      setClients([]);
    } finally {
      setLoading(false);
    }
  }

  async function activateClient(id: number) {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/admin/activate/${id}`, {
        method: "POST",
        headers: { "x-admin-secret": secret },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Activation failed");
      }
      setMessage(data.message || "Client activated");
      await loadClients(secret);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error?.message || "Activation failed");
    } finally {
      setLoading(false);
    }
  }

  async function deactivateClient(id: number) {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/admin/deactivate/${id}`, {
        method: "POST",
        headers: { "x-admin-secret": secret },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Deactivation failed");
      }
      setMessage(data.message || "Client deactivated");
      await loadClients(secret);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error?.message || "Deactivation failed");
    } finally {
      setLoading(false);
    }
  }

  function saveSecret() {
    if (!secret.trim()) {
      setError("Admin secret is required");
      return;
    }
    window.sessionStorage.setItem("admin_secret", secret.trim());
    loadClients(secret.trim());
  }

  return (
    <main style={{ minHeight: "100vh", padding: "32px", background: "#0f1115", color: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 32, marginBottom: 10 }}>PriZen Admin</h1>
          <p style={{ color: "#a1a1aa", margin: 0 }}>Quick client signup table with activate buttons. Uses your backend /admin endpoints.</p>
        </header>

        <div style={{ marginBottom: 24, display: "grid", gap: 12, maxWidth: 520 }}>
          <label style={{ display: "grid", gap: 8, fontSize: 14, color: "#d4d4d8" }}>
            Admin Secret
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter admin secret"
              style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid #292d33", background: "#111318", color: "#f3f4f6" }}
            />
          </label>
          <button onClick={saveSecret} style={{ width: "fit-content", padding: "12px 20px", borderRadius: 10, border: "none", background: "#22c55e", color: "#081212", fontWeight: 700, cursor: "pointer" }}>
            Load signups
          </button>
        </div>

        {error && <div style={{ marginBottom: 16, padding: 14, borderRadius: 10, background: "#fde8e8", color: "#991b1b" }}>{error}</div>}
        {message && <div style={{ marginBottom: 16, padding: 14, borderRadius: 10, background: "#e6fffa", color: "#064e3b" }}>{message}</div>}

        <div style={{ overflowX: "auto", background: "#111318", borderRadius: 16, border: "1px solid #1f2937" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 840 }}>
            <thead>
              <tr style={{ background: "#0b1120", color: "#cbd5e1", textAlign: "left" }}>
                <th style={{ padding: "14px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>ID</th>
                <th style={{ padding: "14px 16px", fontSize: 12 }}>Brand</th>
                <th style={{ padding: "14px 16px", fontSize: 12 }}>Email</th>
                <th style={{ padding: "14px 16px", fontSize: 12 }}>Plan</th>
                <th style={{ padding: "14px 16px", fontSize: 12 }}>Status</th>
                <th style={{ padding: "14px 16px", fontSize: 12 }}>Products</th>
                <th style={{ padding: "14px 16px", fontSize: 12 }}>Signed up</th>
                <th style={{ padding: "14px 16px", fontSize: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const status = STATUS_LABELS[client.status] || { color: "#94a3b8", label: client.status };
                return (
                  <tr key={client.id} style={{ borderTop: "1px solid #161b26" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>{client.id}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>{client.brand_name}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>{client.email}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>{client.plan}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: status.color }}>{status.label}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>{client.product_count}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>{new Date(client.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>
                      {client.status === "active" ? (
                        <button
                          disabled={loading}
                          onClick={() => deactivateClient(client.id)}
                          style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            background: "#dc2626",
                            color: "#fff",
                          }}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          disabled={loading}
                          onClick={() => activateClient(client.id)}
                          style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            background: "#2563eb",
                            color: "#fff",
                          }}
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
