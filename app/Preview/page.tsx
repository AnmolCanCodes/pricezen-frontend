"use client";
// app/preview/page.tsx
// Exact HTML replica of all 5 emails your Python backend actually sends.
// Minimal page CSS :- email HTML uses inline styles to match real email rendering.

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Tab = "instant-growth" | "alert-starter" | "weekly-starter" | "weekly-growth" | "monthly-growth";

/* ─── Only styles not covered by globals.css ─── */
const CSS = `
@keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* Tab buttons */
.tab-btn {
  display:flex;flex-direction:column;align-items:flex-start;
  gap:2px;padding:13px 16px;border-radius:13px;
  border:1.5px solid #e0dbd0;background:#fff;
  cursor:pointer;font-family:'Sora',sans-serif;text-align:left;
  transition:border-color 0.15s,background 0.15s,box-shadow 0.15s;
}
.tab-btn:hover  { border-color:#c9a84c;background:#fef9f0; }
.tab-btn.active { border-color:#c9a84c;background:#fef9f0;box-shadow:0 3px 14px rgba(201,168,76,0.18); }
.tab-title      { font-size:12px;font-weight:800;color:#111;line-height:1.3; }
.tab-when       { font-size:10px;color:#aaa;font-weight:500;text-transform:uppercase;letter-spacing:0.7px; }
.tab-btn.active .tab-title { color:#b8872c; }
.tab-plan       { font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;margin-top:3px; }

/* Email shell chrome */
.email-shell {
  background:#fff;border:1px solid #ddd;border-radius:14px;overflow:hidden;
  box-shadow:0 10px 40px rgba(0,0,0,0.08),0 2px 8px rgba(0,0,0,0.04);
  animation:fadeIn 0.28s ease both;
}
.chrome-bar {
  background:#f0ece2;border-bottom:1px solid #ddd;
  padding:9px 14px;display:flex;align-items:center;gap:7px;
}
.chrome-dot { width:11px;height:11px;border-radius:50%;flex-shrink:0; }
.email-meta {
  background:#f7f5f0;border-bottom:1px solid #e8e3d8;padding:12px 20px;
}

/* The email body itself uses Arial :- matches real email client rendering */
.email-body {
  font-family:Arial,sans-serif;color:#333;line-height:1.6;
  max-width:740px;margin:0 auto;padding:24px 20px;
}
`;

/* ─── Email chrome wrapper ──────────────────────── */
function EmailShell({ from, to, subject, date, children }: {
  from: string; to: string; subject: string; date: string; children: React.ReactNode;
}) {
  return (
    <div className="email-shell">
      <div className="chrome-bar">
        <div className="chrome-dot" style={{ background:"#ff5f56" }} />
        <div className="chrome-dot" style={{ background:"#ffbd2e" }} />
        <div className="chrome-dot" style={{ background:"#27c93f" }} />
        <span style={{ fontFamily:"monospace", fontSize:11, color:"#bbb", marginLeft:8 }}>Inbox :- {from}</span>
      </div>
      <div className="email-meta">
        <p style={{ fontFamily:"Arial,sans-serif", fontSize:13, fontWeight:700, color:"#111", marginBottom:3 }}>{subject}</p>
        <p style={{ fontFamily:"Arial,sans-serif", fontSize:11, color:"#888" }}>
          <strong style={{ color:"#555" }}>From:</strong> {from} &nbsp;·&nbsp;
          <strong style={{ color:"#555" }}>To:</strong> {to} &nbsp;·&nbsp; {date}
        </p>
      </div>
      <div style={{ overflowX:"auto" }}>{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   EMAIL 1 :- INSTANT ALERT
   Source: main.py → build_instant_alert_html()
   ════════════════════════════════════════════════════════════ */
function InstantAlertGrowth() {
  return (
    <EmailShell from="pricezenalert@gmail.com" to="you@yourbrand.com"
      subject="🚨 Price Alert :- 1 competitor · 16 Apr 14:41"
      date="Thursday, 16 Apr 2026 · 2:41 PM">
      <div className="email-body">

        {/* Red alert banner :- matches build_instant_alert_html() header div */}
        <div style={{ padding:"14px 18px", background:"#fdecea", borderLeft:"5px solid #e74c3c", borderRadius:4, marginBottom:20 }}>
          <h2 style={{ margin:"0 0 4px 0", color:"#c0392b", fontSize:"1.1em" }}>🚨 Instant Price Alert :- Growth Plan</h2>
          <p style={{ margin:0, color:"#555", fontSize:"0.93em" }}>Detected at <strong>2026-04-16 14:41:03</strong> :- 1 competitor crossed threshold.</p>
        </div>

        {/* Changes table :- matches rows loop */}
        <table cellSpacing={0} cellPadding={0} style={{ width:"100%", maxWidth:700, borderCollapse:"collapse", marginBottom:24 }}>
          <thead>
            <tr style={{ background:"#2c3e50", color:"#fff", textAlign:"left" }}>
              <th style={{ padding:"10px 12px" }}>Competitor Product</th>
              <th style={{ padding:"10px 12px", textAlign:"right" }}>Previous</th>
              <th style={{ padding:"10px 12px", textAlign:"right" }}>Current</th>
              <th style={{ padding:"10px 12px", textAlign:"right" }}>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding:"8px 12px", borderBottom:"1px solid #ddd" }}><a href="#" style={{ color:"#1a0dab" }}>BeMinimalist Sunscreen SPF 50 60g</a></td>
              <td style={{ padding:"8px 12px", textAlign:"right", borderBottom:"1px solid #ddd" }}>₹449.00</td>
              <td style={{ padding:"8px 12px", textAlign:"right", borderBottom:"1px solid #ddd" }}>₹404.00</td>
              <td style={{ padding:"8px 12px", textAlign:"right", fontWeight:"bold", color:"#e74c3c", borderBottom:"1px solid #ddd" }}>↓ 10.02%</td>
            </tr>
          </tbody>
        </table>

        {/* Snapshot section :- matches snapshot_sections loop */}
        <div style={{ marginBottom:20, padding:"14px 16px", border:"1px solid #e8e8e8", borderRadius:6 }}>
          <h3 style={{ margin:"0 0 8px 0", color:"#2c3e50", fontSize:"1em" }}>🛍️ Competitor Snapshot :- Sunscreen</h3>
          <table cellSpacing={0} cellPadding={0} style={{ width:"100%", maxWidth:700, borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"#2c3e50", color:"#fff", textAlign:"left" }}>
                <th style={{ padding:"8px 12px" }}>Competitor</th>
                <th style={{ padding:"8px 12px", textAlign:"right" }}>Price</th>
                <th style={{ padding:"8px 12px", textAlign:"right" }}>vs Your Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Client row :- #fff3cd highlight */}
              <tr style={{ background:"#fff3cd", borderLeft:"4px solid #f0ad4e" }}>
                <td style={{ padding:"7px 12px", borderBottom:"1px solid #eee", fontWeight:"bold" }}>⭐ Your Brand SPF 50 <span style={{ color:"#888", fontSize:"0.85em" }}>(Your Product)</span></td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", fontWeight:"bold" }}>₹449.00</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#888" }}>:-</td>
              </tr>
              {[
                { n:"BeMinimalist SPF 50", p:"₹404.00", d:"₹45.00 cheaper", c:"#e74c3c" },
                { n:"Mamaearth SPF 50",    p:"₹399.00", d:"₹50.00 cheaper", c:"#e74c3c" },
                { n:"Plum SPF 50",         p:"₹469.00", d:"₹20.00 pricier", c:"#27ae60" },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding:"7px 12px", borderBottom:"1px solid #eee" }}><a href="#" style={{ color:"#1a0dab" }}>{r.n}</a></td>
                  <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee" }}>{r.p}</td>
                  <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:r.c, fontWeight:"bold" }}>{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop:8, color:"#e74c3c", fontWeight:"bold", fontSize:"0.92em" }}>⚠️ 2 competitor(s) selling cheaper :- may affect conversion.</p>

          {/* Pricing analysis :- _build_recommendation() cheaper branch */}
          <div style={{ marginTop:14, padding:"16px 20px", background:"#fef9f0", border:"1px solid #f0ad4e", borderLeft:"5px solid #e67e22", borderRadius:6 }}>
            <p style={{ margin:"0 0 8px 0", fontWeight:"bold", color:"#7D4E00" }}>📊 Pricing Analysis</p>
            <p style={{ margin:"0 0 8px 0", color:"#555", fontSize:"0.93em", lineHeight:1.7 }}>
              You are <strong>₹45.00 higher</strong> than the lowest competitor and <strong>10.0% above</strong> market average (₹417.33). <strong>2 of 3 competitors</strong> are selling cheaper :- buyers may be choosing them over you.
            </p>
            <p style={{ margin:"0 0 6px 0", fontWeight:"bold", color:"#333", fontSize:"0.93em" }}>👉 Recommended Actions:</p>
            <ul style={{ margin:"0 0 10px 0", paddingLeft:20, color:"#555", fontSize:"0.92em", lineHeight:2 }}>
              <li>Reduce price by <strong>₹18 – ₹32</strong> to close the market gap</li>
              <li>Or keep price and add a <strong>limited-time offer / bundle</strong></li>
              <li>Target range: <strong>₹454 – ₹417</strong></li>
            </ul>
            <p style={{ margin:0, padding:"10px 14px", background:"#fff3cd", borderRadius:4, color:"#7D4E00", fontSize:"0.88em", lineHeight:1.6 }}>
              ⏱️ <strong>Act within 24 hours</strong> :- price-sensitive buyers compare options the same day.
            </p>
          </div>
        </div>

        <p style={{ marginTop:16, color:"#555", fontSize:"0.92em" }}>📎 <em>Full price history attached as <strong>report.xlsx</strong>.</em></p>
        <p style={{ marginTop:8, color:"#aaa", fontSize:"0.82em" }}>Automated message from your price monitoring system.</p>
      </div>
    </EmailShell>
  );
}

/* ════════════════════════════════════════════════════════════
   EMAIL 2 :- PRICE CHANGE ALERT (Starter)
   Source: starter_email.py → today_changes path
   _changes_table() + _competitor_snapshot() + _simple_observation()
   ════════════════════════════════════════════════════════════ */
function AlertStarter() {
  return (
    <EmailShell from="pricezenalert@gmail.com" to="you@yourbrand.com"
      subject="⚠️ Price Alert :- 1 competitor · 16 Apr"
      date="Thursday, 16 Apr 2026 · 10:05 AM">
      <div className="email-body">

        {/* _wrapper() headline div */}
        <div style={{ padding:"16px 20px", background:"#2c3e50", borderRadius:6, marginBottom:24 }}>
          <h2 style={{ margin:0, color:"#fff", fontSize:"1.15em" }}>⚠️ Competitor Price Change Alert</h2>
          <p style={{ margin:"4px 0 0 0", color:"#aac", fontSize:"0.88em" }}>Thursday, 16 April 2026 · 1 competitor changed price · Starter Plan</p>
        </div>

        {/* _changes_table() */}
        <h3 style={{ color:"#c0392b", marginBottom:8 }}>⚠️ Competitor Price Changes (1 product)</h3>
        <table cellSpacing={0} cellPadding={0} style={{ width:"100%", maxWidth:700, borderCollapse:"collapse", marginBottom:24 }}>
          <thead>
            <tr style={{ background:"#2c3e50", color:"#fff", textAlign:"left" }}>
              <th style={{ padding:"10px 12px" }}>Competitor Product</th>
              <th style={{ padding:"10px 12px", textAlign:"right" }}>Previous</th>
              <th style={{ padding:"10px 12px", textAlign:"right" }}>Current</th>
              <th style={{ padding:"10px 12px", textAlign:"right" }}>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding:"8px 12px", borderBottom:"1px solid #ddd" }}><a href="#" style={{ color:"#1a0dab" }}>BeMinimalist Sunscreen SPF 50</a></td>
              <td style={{ padding:"8px 12px", textAlign:"right", borderBottom:"1px solid #ddd" }}>₹449.00</td>
              <td style={{ padding:"8px 12px", textAlign:"right", borderBottom:"1px solid #ddd" }}>₹404.00</td>
              <td style={{ padding:"8px 12px", textAlign:"right", fontWeight:"bold", color:"#e74c3c", borderBottom:"1px solid #ddd" }}>↓ 10.02%</td>
            </tr>
          </tbody>
        </table>

        {/* _competitor_snapshot() */}
        <div style={{ marginBottom:20, padding:"14px 16px", border:"1px solid #e8e8e8", borderRadius:6 }}>
          <h3 style={{ margin:"0 0 8px 0", color:"#2c3e50", fontSize:"1em" }}>🛍️ Competitor Snapshot :- Sunscreen</h3>
          <table cellSpacing={0} cellPadding={0} style={{ width:"100%", maxWidth:700, borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"#2c3e50", color:"#fff", textAlign:"left" }}>
                <th style={{ padding:"8px 12px" }}>Store / Competitor</th>
                <th style={{ padding:"8px 12px", textAlign:"right" }}>Price</th>
                <th style={{ padding:"8px 12px", textAlign:"right" }}>vs Your Price</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background:"#fff3cd", borderLeft:"4px solid #f0ad4e" }}>
                <td style={{ padding:"7px 12px", borderBottom:"1px solid #eee", fontWeight:"bold" }}>⭐ Your Brand SPF 50 <span style={{ color:"#888", fontSize:"0.85em" }}>(Your Product)</span></td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", fontWeight:"bold" }}>₹449.00</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#888" }}>:-</td>
              </tr>
              {[
                { n:"BeMinimalist SPF 50", p:"₹404.00", d:"₹45.00 cheaper", c:"#e74c3c" },
                { n:"Mamaearth SPF 50",    p:"₹399.00", d:"₹50.00 cheaper", c:"#e74c3c" },
              ].map((r,i) => (
                <tr key={i}>
                  <td style={{ padding:"7px 12px", borderBottom:"1px solid #eee" }}><a href="#" style={{ color:"#1a0dab" }}>{r.n}</a></td>
                  <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee" }}>{r.p}</td>
                  <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:r.c, fontWeight:"bold" }}>{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop:8, color:"#e74c3c", fontWeight:"bold", fontSize:"0.92em" }}>⚠️ 2 competitor(s) selling cheaper :- may affect conversion.</p>

          {/* _simple_observation() cheaper branch */}
          <div style={{ marginTop:12, padding:"14px 16px", background:"#fff8e1", borderLeft:"4px solid #f0ad4e", borderRadius:4 }}>
            <p style={{ margin:"0 0 12px 0", color:"#7D4E00", fontSize:"0.92em", lineHeight:1.7 }}>
              <strong>You are ₹45.00 above market average.</strong> 2 of 2 competitors are currently cheaper :- buyers in this category compare prices before purchasing.
            </p>
            <div style={{ padding:"10px 14px", background:"#7D4E00", borderRadius:4, marginBottom:10 }}>
              <p style={{ margin:0, color:"#fff", fontSize:"0.9em", lineHeight:1.6 }}>
                ✅ <strong>Recommended:</strong> Reduce your price closer to market average. You are losing buyers to cheaper competitors right now :- a price adjustment is the fastest way to recover.
              </p>
            </div>
            <p style={{ margin:0, color:"#888", fontSize:"0.85em", lineHeight:1.6 }}>
              Not ready to drop price? Keep it and add a reason to buy :- faster shipping, a bundle, or better listing photos can help justify the gap to hesitant buyers.
            </p>
          </div>
        </div>

        <p style={{ marginTop:20, color:"#555", fontSize:"0.92em" }}>📎 <em>Full price history attached as <strong>report.xlsx</strong>.</em></p>
        <p style={{ marginTop:8, color:"#aaa", fontSize:"0.82em" }}>Automated message from your price monitoring system.</p>
      </div>
    </EmailShell>
  );
}

/* ════════════════════════════════════════════════════════════
   EMAIL 3 :- WEEKLY REPORT (Starter)
   Source: starter_email.py → Monday path (is_monday + no changes)
   _weekly_stats_table() + _competitor_snapshot() + _simple_observation()
   ════════════════════════════════════════════════════════════ */
function WeeklyStarter() {
  return (
    <EmailShell from="pricezenalert@gmail.com" to="you@yourbrand.com"
      subject="📊 Weekly Report · 14 Apr 2026 · Starter"
      date="Monday, 14 Apr 2026 · 10:00 AM">
      <div className="email-body">

        <div style={{ padding:"16px 20px", background:"#2c3e50", borderRadius:6, marginBottom:24 }}>
          <h2 style={{ margin:0, color:"#fff", fontSize:"1.15em" }}>📊 Weekly Performance Report</h2>
          <p style={{ margin:"4px 0 0 0", color:"#aac", fontSize:"0.88em" }}>Week of 08 Apr – 14 Apr 2026 · Starter Plan</p>
        </div>

        {/* Stable week banner */}
        <div style={{ padding:"10px 14px", background:"#eafaf1", borderLeft:"4px solid #27ae60", borderRadius:4, marginBottom:20 }}>
          <p style={{ margin:0, color:"#1e5631", fontWeight:"bold" }}>✅ All competitor prices were stable this week.</p>
        </div>

        {/* _weekly_stats_table() */}
        <h3 style={{ color:"#2c3e50", marginBottom:4 }}>7-Day Price Summary</h3>
        <p style={{ margin:"0 0 10px 0", color:"#777", fontSize:"0.88em" }}>Snapshot of price activity over the past 7 days. Full data in attached <strong>report.xlsx</strong>.</p>
        <table cellSpacing={0} cellPadding={0} style={{ width:"100%", maxWidth:700, borderCollapse:"collapse", marginBottom:20 }}>
          <thead>
            <tr style={{ background:"#2c3e50", color:"#fff", textAlign:"left" }}>
              {["Product","Current","7d Low","7d High","7d Avg","Checks"].map(h => (
                <th key={h} style={{ padding:"9px 12px", textAlign:h!=="Product"?"right":"left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { n:"Your Brand Sunscreen SPF 50", star:true,  c:"₹449.00", l:"₹399.00", h:"₹449.00", a:"₹424.00", ch:"14 checks" },
              { n:"BeMinimalist SPF 50",          star:false, c:"₹404.00", l:"₹399.00", h:"₹449.00", a:"₹418.50", ch:"14 checks" },
              { n:"Mamaearth SPF 50",             star:false, c:"₹399.00", l:"₹399.00", h:"₹420.00", a:"₹409.50", ch:"14 checks" },
              { n:"Plum Sunscreen SPF 50",        star:false, c:"₹469.00", l:"₹459.00", h:"₹479.00", a:"₹469.00", ch:"14 checks" },
            ].map((r, i) => (
              <tr key={i} style={{ background:r.star?"#fff3cd":undefined }}>
                <td style={{ padding:"7px 12px", borderBottom:"1px solid #eee", fontSize:"0.9em", fontWeight:r.star?"bold":undefined }}>
                  <a href="#" style={{ color:"#1a0dab" }}>{r.n}</a>{r.star?" ⭐":""}
                </td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", fontSize:"0.9em", fontWeight:"bold" }}>{r.c}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#27ae60", fontSize:"0.9em" }}>{r.l}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#e74c3c", fontSize:"0.9em" }}>{r.h}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#555", fontSize:"0.9em" }}>{r.a}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#aaa", fontSize:"0.85em" }}>{r.ch}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* _competitor_snapshot() + _simple_observation() */}
        <div style={{ marginBottom:20, padding:"14px 16px", border:"1px solid #e8e8e8", borderRadius:6 }}>
          <h3 style={{ margin:"0 0 8px 0", color:"#2c3e50", fontSize:"1em" }}>🛍️ Competitor Snapshot :- Sunscreen</h3>
          <table cellSpacing={0} cellPadding={0} style={{ width:"100%", maxWidth:700, borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"#2c3e50", color:"#fff", textAlign:"left" }}>
                <th style={{ padding:"8px 12px" }}>Store / Competitor</th>
                <th style={{ padding:"8px 12px", textAlign:"right" }}>Price</th>
                <th style={{ padding:"8px 12px", textAlign:"right" }}>vs Your Price</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background:"#fff3cd", borderLeft:"4px solid #f0ad4e" }}>
                <td style={{ padding:"7px 12px", borderBottom:"1px solid #eee", fontWeight:"bold" }}>⭐ Your Brand SPF 50 <span style={{ color:"#888", fontSize:"0.85em" }}>(Your Product)</span></td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", fontWeight:"bold" }}>₹449.00</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#888" }}>:-</td>
              </tr>
              {[
                { n:"BeMinimalist SPF 50", p:"₹404.00", d:"₹45.00 cheaper", c:"#e74c3c" },
                { n:"Mamaearth SPF 50",    p:"₹399.00", d:"₹50.00 cheaper", c:"#e74c3c" },
                { n:"Plum SPF 50",         p:"₹469.00", d:"₹20.00 pricier", c:"#27ae60" },
              ].map((r,i) => (
                <tr key={i}>
                  <td style={{ padding:"7px 12px", borderBottom:"1px solid #eee" }}><a href="#" style={{ color:"#1a0dab" }}>{r.n}</a></td>
                  <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee" }}>{r.p}</td>
                  <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:r.c, fontWeight:"bold" }}>{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop:8, color:"#e74c3c", fontWeight:"bold", fontSize:"0.92em" }}>⚠️ 2 competitor(s) selling cheaper :- may affect conversion.</p>
          <div style={{ marginTop:12, padding:"14px 16px", background:"#fff8e1", borderLeft:"4px solid #f0ad4e", borderRadius:4 }}>
            <p style={{ margin:"0 0 12px 0", color:"#7D4E00", fontSize:"0.92em", lineHeight:1.7 }}>
              <strong>You are ₹45.00 above market average.</strong> 2 of 3 competitors are currently cheaper :- buyers compare prices before purchasing.
            </p>
            <div style={{ padding:"10px 14px", background:"#7D4E00", borderRadius:4, marginBottom:10 }}>
              <p style={{ margin:0, color:"#fff", fontSize:"0.9em", lineHeight:1.6 }}>
                ✅ <strong>Recommended:</strong> Reduce your price closer to market average. You are losing buyers to cheaper competitors right now.
              </p>
            </div>
            <p style={{ margin:0, color:"#888", fontSize:"0.85em", lineHeight:1.6 }}>
              Not ready to drop price? Keep it and add a reason to buy :- faster shipping, a bundle, or better listing photos.
            </p>
          </div>
        </div>

        <p style={{ marginTop:20, color:"#555", fontSize:"0.92em" }}>📎 <em>Full price history attached as <strong>report.xlsx</strong>.</em></p>
        <p style={{ marginTop:8, color:"#aaa", fontSize:"0.82em" }}>Automated message from your price monitoring system.</p>
      </div>
    </EmailShell>
  );
}

/* ════════════════════════════════════════════════════════════
   EMAIL 4 :- WEEKLY BUSINESS REPORT (Growth)
   Source: growth_email.py → _business_impact_blocks() + _monthly_stats_table()
   ════════════════════════════════════════════════════════════ */
function WeeklyGrowth() {
  return (
    <EmailShell from="pricezenalert@gmail.com" to="you@yourbrand.com"
      subject="📊 Weekly Report · 14 Apr 2026 · Growth · ⚠️ Revenue at Risk"
      date="Monday, 14 Apr 2026 · 10:00 AM">
      <div className="email-body">

        <div style={{ padding:"16px 20px", background:"#2c3e50", borderRadius:6, marginBottom:24 }}>
          <h2 style={{ margin:0, color:"#fff", fontSize:"1.15em" }}>📊 Weekly Business Performance Report</h2>
          <p style={{ margin:"4px 0 0 0", color:"#aac", fontSize:"0.88em" }}>Week of 08 Apr – 14 Apr 2026 · Growth Plan</p>
        </div>

        {/* _business_impact_blocks() :- LOSS card */}
        <div style={{ marginBottom:28, border:"1px solid #f5c6cb", borderRadius:10, overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", background:"#c0392b" }}>
            <p style={{ margin:0, color:"#fff", fontSize:"1.05em", fontWeight:"bold" }}>⚠️ Action Required: Sunscreen</p>
          </div>
          <div style={{ padding:"18px 20px", background:"#fff" }}>
            <p style={{ margin:"0 0 6px 0", fontSize:"0.75em", fontWeight:"bold", color:"#c0392b", textTransform:"uppercase", letterSpacing:"0.08em" }}>The Problem</p>
            <p style={{ margin:"0 0 16px 0", color:"#333", fontSize:"0.95em", lineHeight:1.7 }}>
              You are priced at <strong>₹449</strong> but the market is moving at <strong>₹417</strong>. You are <strong>₹32 above market average</strong> :- 5 of 7 price checks this week confirmed this gap.
            </p>
            <div style={{ padding:"12px 16px", background:"#fdecea", borderLeft:"4px solid #c0392b", borderRadius:4, marginBottom:20 }}>
              <p style={{ margin:"0 0 2px 0", fontSize:"0.75em", fontWeight:"bold", color:"#c0392b", textTransform:"uppercase", letterSpacing:"0.08em" }}>The Impact</p>
              <p style={{ margin:0, color:"#333", fontSize:"0.93em", lineHeight:1.7 }}>
                ₹8,200 in weekly revenue is at high risk because customers are choosing cheaper alternatives <span style={{ color:"#888", fontSize:"0.9em" }}>(based on 150 avg orders/week)</span>.
              </p>
            </div>
            <p style={{ margin:"0 0 10px 0", fontSize:"0.75em", fontWeight:"bold", color:"#2c3e50", textTransform:"uppercase", letterSpacing:"0.08em" }}>The Decision</p>
            <div style={{ padding:"12px 16px", background:"#1e8449", borderRadius:6, marginBottom:10 }}>
              <p style={{ margin:"0 0 4px 0", color:"rgba(255,255,255,0.8)", fontSize:"0.78em", fontWeight:"bold" }}>✅ Option A :- Safe play</p>
              <p style={{ margin:0, color:"#fff", fontSize:"0.92em", lineHeight:1.7 }}>
                Drop your price to <strong>₹413</strong> to reclaim your sales volume. This puts you just below market average and ahead of 2 competitors currently undercutting you.
              </p>
            </div>
            <div style={{ padding:"12px 16px", background:"#f8f9fa", border:"1px solid #dee2e6", borderRadius:6 }}>
              <p style={{ margin:"0 0 4px 0", color:"#555", fontSize:"0.78em", fontWeight:"bold" }}>🎯 Option B :- Brand Play</p>
              <p style={{ margin:0, color:"#555", fontSize:"0.92em", lineHeight:1.7 }}>
                Stay at <strong>₹449</strong> but increase your ad spend and marketing to justify the premium. Push reviews, and highlight what makes your product worth the extra ₹32.
              </p>
            </div>
          </div>
        </div>

        {/* _business_impact_blocks() :- GAIN card */}
        <div style={{ marginBottom:28, border:"1px solid #a9dfbf", borderRadius:10, overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", background:"#1e8449" }}>
            <p style={{ margin:0, color:"#fff", fontSize:"1.05em", fontWeight:"bold" }}>💰 Margin Opportunity: Vitamin C Serum</p>
          </div>
          <div style={{ padding:"18px 20px", background:"#fff" }}>
            <p style={{ margin:"0 0 6px 0", fontSize:"0.75em", fontWeight:"bold", color:"#1e8449", textTransform:"uppercase", letterSpacing:"0.08em" }}>The Opportunity</p>
            <p style={{ margin:"0 0 16px 0", color:"#333", fontSize:"0.95em", lineHeight:1.7 }}>
              You are priced at <strong>₹299</strong> while the market average is <strong>₹319</strong>. <strong>3 of 4 competitors charge more than you</strong> :- you have room to move up without losing your competitive edge.
            </p>
            <div style={{ padding:"12px 16px", background:"#eafaf1", borderLeft:"4px solid #1e8449", borderRadius:4, marginBottom:20 }}>
              <p style={{ margin:"0 0 2px 0", fontSize:"0.75em", fontWeight:"bold", color:"#1e8449", textTransform:"uppercase", letterSpacing:"0.08em" }}>The Upside</p>
              <p style={{ margin:0, color:"#333", fontSize:"0.93em", lineHeight:1.7 }}>
                Raising by <strong>₹20</strong> could add <strong>₹6,000/week</strong> (₹24,000/month) to your revenue at zero extra cost <span style={{ color:"#888", fontSize:"0.9em" }}>(based on 150 avg orders/week)</span>.
              </p>
            </div>
            <p style={{ margin:"0 0 10px 0", fontSize:"0.75em", fontWeight:"bold", color:"#2c3e50", textTransform:"uppercase", letterSpacing:"0.08em" }}>The Decision</p>
            <div style={{ padding:"12px 16px", background:"#1e8449", borderRadius:6, marginBottom:10 }}>
              <p style={{ margin:"0 0 4px 0", color:"rgba(255,255,255,0.8)", fontSize:"0.78em", fontWeight:"bold" }}>✅ Option A :- Raise price</p>
              <p style={{ margin:0, color:"#fff", fontSize:"0.92em", lineHeight:1.7 }}>
                Raise Vitamin C Serum to <strong>₹319</strong> :- you will still beat 3 of 4 competitors. Extra margin goes straight to your bottom line. Test for 7 days before committing fully.
              </p>
            </div>
            <div style={{ padding:"12px 16px", background:"#f8f9fa", border:"1px solid #dee2e6", borderRadius:6 }}>
              <p style={{ margin:"0 0 4px 0", color:"#555", fontSize:"0.78em", fontWeight:"bold" }}>🎯 Option B :- Hold &amp; market</p>
              <p style={{ margin:0, color:"#555", fontSize:"0.92em", lineHeight:1.7 }}>
                Stay at <strong>₹299</strong> and use this as an advantage in your ads. &ldquo;Cheaper than 75% of competitors.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* _monthly_stats_table() :- 30-day history with Trend column */}
        <h3 style={{ color:"#2c3e50", marginBottom:4, marginTop:4 }}>📈 30-Day Price History</h3>
        <p style={{ margin:"0 0 10px 0", color:"#777", fontSize:"0.88em" }}>⭐ = your product. Based on 30 days of recorded data. Full data in attached <strong>report.xlsx</strong>.</p>
        <table cellSpacing={0} cellPadding={0} style={{ width:"100%", maxWidth:700, borderCollapse:"collapse", marginBottom:20 }}>
          <thead>
            <tr style={{ background:"#2c3e50", color:"#fff", textAlign:"left" }}>
              {["Product","Current","30d Low","30d High","30d Avg","Trend","Checks"].map(h => (
                <th key={h} style={{ padding:"9px 12px", textAlign:h!=="Product"?"right":"left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { n:"Your Brand SPF 50",       star:true,  c:"₹449.00", l:"₹399.00", h:"₹469.00", a:"₹434.20", t:"📈 Rising",  tc:"#e74c3c", ch:"60 checks" },
              { n:"BeMinimalist SPF 50",      star:false, c:"₹404.00", l:"₹399.00", h:"₹449.00", a:"₹421.00", t:"📉 Falling", tc:"#27ae60", ch:"60 checks" },
              { n:"Mamaearth SPF 50",         star:false, c:"₹399.00", l:"₹385.00", h:"₹420.00", a:"₹404.10", t:"➡️ Stable",  tc:"#888",    ch:"60 checks" },
              { n:"Your Brand Vitamin C 20%", star:true,  c:"₹299.00", l:"₹299.00", h:"₹319.00", a:"₹305.50", t:"➡️ Stable",  tc:"#888",    ch:"60 checks" },
            ].map((r, i) => (
              <tr key={i} style={{ background:r.star?"#fff3cd":undefined }}>
                <td style={{ padding:"7px 12px", borderBottom:"1px solid #eee", fontSize:"0.9em", fontWeight:r.star?"bold":undefined }}>
                  <a href="#" style={{ color:"#1a0dab" }}>{r.n}</a>{r.star?" ⭐":""}
                </td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", fontSize:"0.9em", fontWeight:"bold" }}>{r.c}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#27ae60", fontSize:"0.9em" }}>{r.l}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#e74c3c", fontSize:"0.9em" }}>{r.h}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#555", fontSize:"0.9em" }}>{r.a}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:r.tc, fontWeight:"bold", fontSize:"0.9em" }}>{r.t}</td>
                <td style={{ padding:"7px 12px", textAlign:"right", borderBottom:"1px solid #eee", color:"#aaa", fontSize:"0.85em" }}>{r.ch}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop:20, color:"#555", fontSize:"0.92em" }}>📎 <em>Full price history attached as <strong>report.xlsx</strong>.</em></p>
        <p style={{ marginTop:8, color:"#aaa", fontSize:"0.82em" }}>Automated message from your price monitoring system.</p>
      </div>
    </EmailShell>
  );
}

/* ════════════════════════════════════════════════════════════
   EMAIL 5 :- MONTHLY INTELLIGENCE SUMMARY (Growth)
   Source: monthly_email.py → _wrapper() wrapping all 4 parts
   _part1_month_in_numbers() + _part2_competitor_activity()
   + _part3_position_journey() + _part4_forward_signals()
   ════════════════════════════════════════════════════════════ */
function MonthlyGrowth() {
  return (
    <EmailShell from="pricezenalert@gmail.com" to="you@yourbrand.com"
      subject="📊 Monthly Report · April 2026 · Growth · ⚠️ Revenue at Risk"
      date="Monday, 28 Apr 2026 · 10:00 AM">
      <div className="email-body">

        {/* _wrapper() dark header :- #1a252f */}
        <div style={{ padding:"18px 22px", background:"#1a252f", borderRadius:8, marginBottom:28 }}>
          <h2 style={{ margin:"0 0 4px 0", color:"#fff", fontSize:"1.2em" }}>📊 Monthly Intelligence Summary</h2>
          <p style={{ margin:0, color:"#aac", fontSize:"0.88em" }}>April 2026 · Growth Plan · Generated 28 Apr 2026 at 10:00 AM</p>
        </div>

        {/* Part 1 :- _part1_month_in_numbers() */}
        <div style={{ marginBottom:28 }}>
          <h3 style={{ margin:"0 0 12px 0", color:"#2c3e50", fontSize:"1em", fontWeight:"bold" }}>📋 April 2026 :- Month in Numbers</h3>
          <table cellSpacing={0} cellPadding={0} style={{ width:"100%", borderCollapse:"collapse", border:"1px solid #e8e8e8", borderRadius:8, overflow:"hidden" }}>
            <tbody>
              <tr>
                {[
                  { v:"17", l:["Competitor price","changes detected"],  c:"#e74c3c" },
                  { v:"3",  l:["Competitors","monitored"],               c:"#2c3e50" },
                  { v:"2",  l:["Weeks your price","was above market"],   c:"#e67e22" },
                  { v:"1",  l:["Weeks you had","a margin opportunity"],  c:"#27ae60" },
                ].map((s, i) => (
                  <td key={i} style={{ padding:16, textAlign:"center", borderRight:"1px solid #e8e8e8" }}>
                    <p style={{ margin:0, fontSize:"2em", fontWeight:"bold", color:s.c }}>{s.v}</p>
                    <p style={{ margin:"4px 0 0 0", color:"#888", fontSize:"0.8em", lineHeight:1.4 }}>
                      {s.l[0]}<br/>{s.l[1]}
                    </p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p style={{ margin:"8px 0 0 0", color:"#aaa", fontSize:"0.82em" }}>Competitor changes that cross your threshold trigger an instant alert :- automatically, 24/7.</p>
        </div>

        {/* Part 2 :- _part2_competitor_activity() */}
        <div style={{ marginBottom:28 }}>
          <h3 style={{ margin:"0 0 4px 0", color:"#2c3e50", fontSize:"1em", fontWeight:"bold" }}>🔍 Competitor Activity This Month</h3>
          <p style={{ margin:"0 0 12px 0", color:"#777", fontSize:"0.85em" }}>How much each competitor moved :- and in which direction. High change counts mean active price testing.</p>
          <h4 style={{ margin:"0 0 6px 0", color:"#555", fontSize:"0.88em", textTransform:"uppercase", letterSpacing:"0.05em" }}>Sunscreen</h4>
          <table cellSpacing={0} cellPadding={0} style={{ width:"100%", borderCollapse:"collapse", marginBottom:12 }}>
            <thead>
              <tr style={{ background:"#2c3e50", color:"#fff", textAlign:"left" }}>
                {["Competitor","Changes","Direction","30d Ago","Now","Movement"].map(h => (
                  <th key={h} style={{ padding:"8px 12px", fontSize:"0.88em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { n:"BeMinimalist SPF 50", ch:7, d:"📉 Mostly Falling", dc:"#27ae60", a:"₹449", nw:"₹404", m:"↓ ₹45", mc:"#27ae60" },
                { n:"Mamaearth SPF 50",    ch:5, d:"↕️ Mixed",          dc:"#e67e22", a:"₹420", nw:"₹399", m:"↓ ₹21", mc:"#27ae60" },
                { n:"Plum SPF 50",         ch:3, d:"📈 Mostly Rising",  dc:"#e74c3c", a:"₹449", nw:"₹469", m:"↑ ₹20", mc:"#e74c3c" },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding:"8px 12px", borderBottom:"1px solid #eee", fontSize:"0.9em" }}><a href="#" style={{ color:"#1a0dab" }}>{r.n}</a></td>
                  <td style={{ padding:"8px 12px", textAlign:"center", borderBottom:"1px solid #eee", fontSize:"0.9em", fontWeight:"bold", color:r.ch>=4?"#e74c3c":"#333" }}>{r.ch}</td>
                  <td style={{ padding:"8px 12px", textAlign:"center", borderBottom:"1px solid #eee", fontSize:"0.88em", color:r.dc, fontWeight:"bold" }}>{r.d}</td>
                  <td style={{ padding:"8px 12px", textAlign:"right", borderBottom:"1px solid #eee", fontSize:"0.9em" }}>{r.a}</td>
                  <td style={{ padding:"8px 12px", textAlign:"right", borderBottom:"1px solid #eee", fontSize:"0.9em", fontWeight:"bold" }}>{r.nw}</td>
                  <td style={{ padding:"8px 12px", textAlign:"right", borderBottom:"1px solid #eee", fontSize:"0.9em", color:r.mc, fontWeight:"bold" }}>{r.m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Part 3 :- _part3_position_journey() */}
        <div style={{ marginBottom:28 }}>
          <h3 style={{ margin:"0 0 4px 0", color:"#2c3e50", fontSize:"1em", fontWeight:"bold" }}>📅 Your Position Journey This Month</h3>
          <p style={{ margin:"0 0 12px 0", color:"#777", fontSize:"0.85em" }}>Where your price sat relative to competitors, week by week.</p>
          <h4 style={{ margin:"0 0 8px 0", color:"#555", fontSize:"0.88em", textTransform:"uppercase", letterSpacing:"0.05em" }}>Sunscreen</h4>
          <table cellSpacing={0} cellPadding={0} style={{ width:"100%", borderCollapse:"collapse", border:"1px solid #e8e8e8", borderRadius:6, overflow:"hidden", marginBottom:8 }}>
            <tbody>
              <tr>
                {[
                  { wk:"Week 1", rank:"#4",   sub:"of 4", pos:"Above mkt", c:"#e74c3c", bg:"#fef1f0" },
                  { wk:"Week 2", rank:"#3",   sub:"of 4", pos:"Above mkt", c:"#e74c3c", bg:"#fef1f0" },
                  { wk:"Week 3", rank:"#2 ↑", sub:"of 4", pos:"At market", c:"#2980b9", bg:"#eaf4fb" },
                  { wk:"Week 4", rank:"#2",   sub:"of 4", pos:"At market", c:"#2980b9", bg:"#eaf4fb" },
                ].map((w, i) => (
                  <td key={i} style={{ padding:"12px 8px", textAlign:"center", borderRight:"1px solid #eee", background:w.bg }}>
                    <p style={{ margin:0, color:"#888", fontSize:"0.8em" }}>{w.wk}</p>
                    <p style={{ margin:"6px 0 2px 0", color:w.c, fontSize:"1.1em", fontWeight:"bold" }}>{w.rank}</p>
                    <p style={{ margin:0, color:"#aaa", fontSize:"0.78em" }}>{w.sub}</p>
                    <p style={{ margin:"4px 0 0 0", color:w.c, fontSize:"0.78em" }}>{w.pos}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p style={{ margin:"6px 0 0 0", color:"#aaa", fontSize:"0.8em" }}># = price rank (1 = cheapest). ↑ improved · ↓ worsened.</p>
        </div>

        {/* Part 4 :- _part4_forward_signals() */}
        <div style={{ marginBottom:28 }}>
          <h3 style={{ margin:"0 0 4px 0", color:"#2c3e50", fontSize:"1em", fontWeight:"bold" }}>🔭 Monthly Summary &amp; What to Watch Next Month</h3>
          <p style={{ margin:"0 0 14px 0", color:"#777", fontSize:"0.85em" }}>Based on 30 days of price data across your products and competitors.</p>
          <div style={{ marginBottom:20, padding:"16px 20px", border:"1px solid #e8e8e8", borderRadius:8, borderTop:"4px solid #2c3e50" }}>
            <h4 style={{ margin:"0 0 4px 0", color:"#2c3e50", fontSize:"0.95em" }}>Sunscreen :- Monthly Summary</h4>
            <p style={{ margin:"0 0 8px 0", color:"#888", fontSize:"0.83em" }}>Your avg price this month: ₹449 · Market avg: ₹417 · Range: ₹399 – ₹469</p>
            {/* Revenue impact block */}
            <div style={{ margin:"10px 0", padding:"10px 14px", background:"#fdecea", borderLeft:"4px solid #e74c3c", borderRadius:4 }}>
              <p style={{ margin:0, color:"#c0392b", fontSize:"0.9em", lineHeight:1.6 }}>
                📉 <strong>Est. revenue impact this month: ₹18,000</strong> :- your price was above market average for over 40% of the month (based on 150 avg orders/week).
              </p>
            </div>
            {/* Forward signal block */}
            <div style={{ marginTop:12, padding:"12px 14px", background:"#f8f9fa", borderRadius:4 }}>
              <p style={{ margin:"0 0 4px 0", color:"#2c3e50", fontSize:"0.85em", fontWeight:"bold" }}>⚠️ What to watch next month:</p>
              <p style={{ margin:0, color:"#555", fontSize:"0.88em", lineHeight:1.7 }}>
                BeMinimalist dropped price 7 times this month :- likely clearing inventory or testing a lower price point. Watch for a price rebound in the next 2–3 weeks before following their move.
              </p>
            </div>
          </div>
        </div>

        {/* _wrapper() footer block */}
        <div style={{ marginTop:28, padding:"16px 20px", background:"#f8f9fa", borderRadius:6, borderLeft:"4px solid #2c3e50" }}>
          <p style={{ margin:"0 0 6px 0", color:"#2c3e50", fontWeight:"bold", fontSize:"0.9em" }}>About this report</p>
          <p style={{ margin:0, color:"#777", fontSize:"0.83em", lineHeight:1.7 }}>
            This report covers the last 30 days of price monitoring across your products and competitors. Competitor changes that cross your threshold triggered instant alerts. Full data attached as <strong>report.xlsx</strong>.
          </p>
        </div>
        <p style={{ marginTop:12, color:"#aaa", fontSize:"0.8em" }}>Automated monthly report from your price monitoring system.</p>
      </div>
    </EmailShell>
  );
}

/* ─── Tab config ──────────────────────────────────── */
const TABS: { id: Tab; icon: string; title: string; when: string; plan: string; planColor: string }[] = [
  { id:"instant-growth", icon:"🚨", title:"Instant Alert",          when:"When a threshold is crossed", plan:"Growth",  planColor:"#b8872c" },
  { id:"alert-starter",  icon:"⚠️", title:"Price Change Alert",     when:"Next morning 10am",       plan:"Starter", planColor:"#555"    },
  { id:"weekly-starter", icon:"📊", title:"Weekly Report",          when:"Every Monday 10am",       plan:"Starter", planColor:"#555"    },
  { id:"weekly-growth",  icon:"📊", title:"Weekly Business Report", when:"Every Monday 10am",       plan:"Growth",  planColor:"#b8872c" },
  { id:"monthly-growth", icon:"📋", title:"Monthly Intelligence",   when:"Last Monday of month",    plan:"Growth",  planColor:"#b8872c" },
];

/* ─── Page ────────────────────────────────────────── */
export default function PreviewPage() {
  const [active, setActive] = useState<Tab>("instant-growth");
  const cur = TABS.find(t => t.id === active)!;

  return (
    <>
      <style>{CSS}</style>
      <main style={{ fontFamily:"'Sora',sans-serif", background:"#faf8f3", minHeight:"100vh" }}>
        <Navbar />

        <div style={{ maxWidth:1060, margin:"0 auto", padding:"52px clamp(16px,4vw,40px) 96px" }}>

          {/* Hero */}
          <div className="ha h1" style={{ textAlign:"center", marginBottom:44 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#f2ece0", border:"1px solid #ddd3b8", borderRadius:50, padding:"5px 14px", fontSize:11, color:"#7a6030", fontWeight:700, marginBottom:14 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#c9a84c", display:"inline-block" }} />
              Real email previews :- exactly what your inbox receives
            </span>
            <h1 style={{ fontSize:"clamp(26px,5vw,48px)", fontWeight:900, letterSpacing:-1.5, marginBottom:10, color:"#0f0f0f" }}>
              See{" "}
              <span style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:"#b85c1a" }}>exactly</span>
              {" "}what we send.
            </h1>
            <p style={{ fontSize:14, color:"#666", maxWidth:500, margin:"0 auto", lineHeight:1.8 }}>
              Every email below is a pixel-accurate preview :- same HTML structure, same layout, same data format as what lands in your inbox.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(168px,1fr))", gap:9, marginBottom:22 }}>
            {TABS.map(tab => (
              <button key={tab.id} className={`tab-btn${active===tab.id?" active":""}`} onClick={() => setActive(tab.id)}>
                <span style={{ fontSize:17, marginBottom:1 }}>{tab.icon}</span>
                <span className="tab-title">{tab.title}</span>
                <span className="tab-when">{tab.when}</span>
                <span className="tab-plan" style={{ color:tab.planColor }}>{tab.plan}</span>
              </button>
            ))}
          </div>

          {/* Active meta + CTA */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ fontSize:20 }}>{cur.icon}</span>
              <div>
                <p style={{ fontSize:14, fontWeight:800, color:"#111", margin:0 }}>{cur.title}</p>
                <p style={{ fontSize:10, color:"#aaa", margin:0 }}>{cur.when} · <span style={{ color:cur.planColor, fontWeight:700 }}>{cur.plan} plan</span></p>
              </div>
            </div>
            <div style={{ marginLeft:"auto" }}>
              <Link href="/trial" className="btn-dark" style={{ fontSize:12, padding:"9px 20px" }}>
                Start free trial →
              </Link>
            </div>
          </div>

          {/* Email render */}
          {active==="instant-growth"  && <InstantAlertGrowth />}
          {active==="alert-starter"   && <AlertStarter />}
          {active==="weekly-starter"  && <WeeklyStarter />}
          {active==="weekly-growth"   && <WeeklyGrowth />}
          {active==="monthly-growth"  && <MonthlyGrowth />}

          {/* Bottom CTA */}
          <div style={{ marginTop:44, background:"#111", borderRadius:20, padding:"32px 28px", textAlign:"center" }}>
            <p style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:2, color:"#c9a84c", marginBottom:10 }}>Ready to receive these?</p>
            <h2 style={{ fontSize:"clamp(20px,3vw,32px)", fontWeight:900, color:"#fff", letterSpacing:-0.8, marginBottom:8 }}>
              Setup takes under 10 minutes.{" "}
              <span style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:"#f0c040" }}>First alert when a competitor crosses your threshold.</span>
            </h2>
            <p style={{ fontSize:13, color:"#555", marginBottom:22 }}>10-day free trial. No credit card. Cancel anytime.</p>
            <Link href="/trial" style={{ display:"inline-block", background:"#c9a84c", color:"#111", padding:"13px 36px", borderRadius:50, fontWeight:900, fontSize:14, textDecoration:"none" }}>
              Start Free Trial →
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}