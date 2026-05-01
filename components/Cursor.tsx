"use client";
import { useEffect, useRef } from "react";

export default function VectorCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Calculate Velocity & Direction
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      
      // Elastic easing (snappy movement)
      pos.current.x += dx * 0.2;
      pos.current.y += dy * 0.2;

      // Calculate angle of movement
      const angle = Math.atan2(dy, dx);
      
      // Calculate speed for "stretching" effect
      const speed = Math.sqrt(dx * dx + dy * dy);
      const stretch = Math.min(speed * 0.2, 15); // Cap the stretch

      // 2. Draw the Arrow/Triangle
      ctx.save();
      ctx.translate(pos.current.x, pos.current.y);
      ctx.rotate(angle);

      // Draw sharp geometric pointer
      ctx.beginPath();
      ctx.moveTo(15 + stretch, 0);      // Tip (stretches with speed)
      ctx.lineTo(-5, -8);               // Top back
      ctx.lineTo(0, 0);                 // Inner notch
      ctx.lineTo(-5, 8);                // Bottom back
      ctx.closePath();

      // Styling
      ctx.fillStyle = "black";
      ctx.fill();
      
      // Subtle outer stroke for definition
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10000,
        
      }}
    />
  );
}