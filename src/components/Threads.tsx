import { useRef, useEffect } from "react";

/**
 * Threads — flowing fbm-noise line field on a 2D canvas.
 * Ported from the anir0y.github.io Contact background, themed for Cyber-Noir.
 * Self-contained (no GL deps): capped at 30fps, pauses when off-screen,
 * follows the pointer over its host <section>, and honours reduced-motion.
 */

function noise(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}
function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = noise(ix, iy), b = noise(ix + 1, iy), c = noise(ix, iy + 1), d = noise(ix + 1, iy + 1);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}
function fbm(x: number, y: number): number {
  let val = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < 4; i++) { val += amp * smoothNoise(x * freq, y * freq); amp *= 0.5; freq *= 2; }
  return val;
}

interface ThreadsProps { color?: string; lineCount?: number; amplitude?: number; }

export default function Threads({
  color = "rgba(0,229,255,0.34)",
  lineCount = 22,
  amplitude = 1.1,
}: ThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let animId = 0;
    let isVisible = true;
    const mouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { rootMargin: "200px" });
    observer.observe(canvas);

    const dprOf = () => Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = dprOf();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      // Assigning canvas.width/height wipes the bitmap; with no animation loop
      // in reduced-motion mode the canvas would stay blank after any resize.
      if (reduced) render(8000);
    };

    const section = canvas.closest("section");
    const onMouseMove = (e: Event) => {
      const me = e as MouseEvent;
      const rect = canvas.getBoundingClientRect();
      mouse.x = (me.clientX - rect.left) / rect.width;
      mouse.y = (me.clientY - rect.top) / rect.height;
    };
    const onMouseLeave = () => { mouse.x = 0.5; mouse.y = 0.5; };
    section?.addEventListener("mousemove", onMouseMove);
    section?.addEventListener("mouseleave", onMouseLeave);

    let lastTime = 0;
    const frameDuration = 1000 / 30;

    const render = (time: number) => {
      smoothMouse.x += 0.05 * (mouse.x - smoothMouse.x);
      smoothMouse.y += 0.05 * (mouse.y - smoothMouse.y);

      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      if (w === 0 || h === 0) return;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dprOf(), dprOf());
      ctx.clearRect(0, 0, w, h);

      const t = time * 0.0001 + (smoothMouse.x - 0.5) * 0.5;

      for (let i = 0; i < lineCount; i++) {
        const perc = i / lineCount;
        const lineOpacity = (1 - Math.pow(perc, 0.3)) * 0.7;
        if (lineOpacity <= 0.01) continue;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = lineOpacity;
        ctx.lineWidth = Math.max(0.5, (1 - perc) * 2);

        const splitPoint = 0.1 + perc * 0.4;
        const steps = Math.ceil(w / 3);

        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * w;
          const xNorm = s / steps;
          const ampNorm = Math.max(0, Math.min(1, (xNorm - splitPoint) / (0.7 - splitPoint)));
          const ampSmooth = ampNorm * ampNorm * (3 - 2 * ampNorm);
          const finalAmp = ampSmooth * 0.5 * amplitude * h * (1 + (smoothMouse.y - 0.5) * 0.2);
          const noiseVal = fbm(t + perc * 3, xNorm * 2.5 + perc);
          const y = h * 0.5 + (perc - 0.5) * h * 0.05 + (noiseVal - 0.5) * finalAmp;
          if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      animId = requestAnimationFrame(loop);
      if (!isVisible) return;
      if (time - lastTime < frameDuration) return;
      lastTime = time;
      render(time);
    };

    window.addEventListener("resize", resize);
    resize(); // sizes the canvas; in reduced-motion mode this also paints the static frame
    if (!reduced) animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      section?.removeEventListener("mousemove", onMouseMove);
      section?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [color, lineCount, amplitude]);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }} />;
}
