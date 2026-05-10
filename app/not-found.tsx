"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Animated price graph lines
    let frame = 0;
    const points: { x: number; y: number; vy: number }[] = Array.from(
      { length: 10 },
      (_, i) => ({
        x: (canvas.width / 9) * i,
        y: canvas.height / 2 + (Math.random() - 0.5) * 80,
        vy: (Math.random() - 0.5) * 0.4,
      })
    );

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach((p) => {
        p.y += p.vy;
        if (p.y < canvas.height * 0.2 || p.y > canvas.height * 0.8) p.vy *= -1;
      });

      // Draw gradient line
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, "rgba(201,168,76,0)");
      grad.addColorStop(0.3, "rgba(201,168,76,0.6)");
      grad.addColorStop(0.7, "rgba(248,132,49,0.6)");
      grad.addColorStop(1, "rgba(248,132,49,0)");

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const mx = (points[i].x + points[i + 1].x) / 2;
        const my = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw dots on each point
      points.forEach((p, i) => {
        if (i === 0 || i === points.length - 1) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,168,76,0.7)";
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(draw);
    }

    const animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#faf8f3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background canvas chart */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.25,
        }}
      />

      {/* Floating price tags */}
      {[
        { label: "₹1,299", top: "12%", left: "8%", delay: "0s", rot: "-6deg" },
        { label: "₹899", top: "20%", right: "10%", delay: "0.6s", rot: "4deg" },
        { label: "₹2,149", bottom: "22%", left: "6%", delay: "1.1s", rot: "5deg" },
        { label: "₹599", bottom: "15%", right: "8%", delay: "0.3s", rot: "-4deg" },
      ].map((tag, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: tag.top,
            bottom: (tag as { bottom?: string }).bottom,
            left: (tag as { left?: string }).left,
            right: (tag as { right?: string }).right,
            background: "#fff",
            border: "1.5px solid #e6dfc8",
            borderRadius: "10px",
            padding: "8px 14px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#c9a84c",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            transform: `rotate(${tag.rot})`,
            animation: `floatY 4s ease-in-out infinite`,
            animationDelay: tag.delay,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {tag.label}
        </div>
      ))}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "520px",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "22px",
            background: "linear-gradient(135deg, #c9a84c 0%, #f88431 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
            boxShadow: "0 12px 40px rgba(201,168,76,0.3)",
            fontSize: "28px",
            animation: "floatY 3.8s ease-in-out infinite",
          }}
        >
          📊
        </div>

        {/* 404 number */}
        <div
          style={{
            fontSize: "clamp(64px, 15vw, 120px)",
            fontWeight: 800,
            fontFamily: "var(--font-display, 'Syne', sans-serif)",
            background: "linear-gradient(135deg, #c9a84c 0%, #f88431 60%, #e85d26 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            marginBottom: "8px",
            letterSpacing: "-3px",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "clamp(18px, 4vw, 26px)",
            fontWeight: 700,
            fontFamily: "var(--font-display, 'Syne', sans-serif)",
            color: "#1a1a1a",
            margin: "0 0 12px",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#777",
            lineHeight: 1.6,
            margin: "0 0 36px",
          }}
        >
          Looks like this price went off the chart! The page you&apos;re
          looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Animated price tracker line */}
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, #c9a84c, #f88431, transparent)",
            borderRadius: "2px",
            marginBottom: "32px",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }}
        />

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "linear-gradient(135deg, #c9a84c 0%, #f88431 100%)",
              color: "#fff",
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(201,168,76,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 14px 36px rgba(201,168,76,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,168,76,0.35)";
            }}
          >
            ← Back to Home
          </Link>

          <Link
            href="/audit"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "#fff",
              color: "#1a1a1a",
              borderRadius: "50px",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              border: "1.5px solid #e6dfc8",
              transition: "transform 0.2s, border-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "#c9a84c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e6dfc8";
            }}
          >
            Start Free Audit →
          </Link>
        </div>

        {/* Brand tag */}
        <p
          style={{
            marginTop: "40px",
            fontSize: "12px",
            color: "#bbb",
            letterSpacing: "0.5px",
          }}
        >
          PriceZen - Pricing Intelligence for E-Commerce Brands
        </p>
      </div>
    </main>
  );
}
