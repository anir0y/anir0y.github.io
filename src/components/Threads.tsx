import React, { useRef, useEffect } from 'react';

// Simple 2D Perlin-like noise
function noise(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = noise(ix, iy);
  const b = noise(ix + 1, iy);
  const c = noise(ix, iy + 1);
  const d = noise(ix + 1, iy + 1);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

function fbm(x: number, y: number): number {
  let val = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    val += amp * smoothNoise(x * freq, y * freq);
    amp *= 0.5;
    freq *= 2;
  }
  return val;
}

interface ThreadsProps {
  color?: string;
  lineCount?: number;
  amplitude?: number;
}

export const Threads: React.FC<ThreadsProps> = ({
  color = 'rgba(255, 255, 255, 0.6)',
  lineCount = 20,
  amplitude = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    const mouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { rootMargin: '200px' }
    );
    observer.observe(canvas);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();

    const section = canvas.closest('section');
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };
    const onMouseLeave = () => { mouse.x = 0.5; mouse.y = 0.5; };
    if (section) {
      section.addEventListener('mousemove', onMouseMove);
      section.addEventListener('mouseleave', onMouseLeave);
    }

    let lastTime = 0;
    const frameDuration = 1000 / 30;

    const draw = (time: number) => {
      animId = requestAnimationFrame(draw);
      if (!isVisible) return;
      if (time - lastTime < frameDuration) return;
      lastTime = time;

      smoothMouse.x += 0.05 * (mouse.x - smoothMouse.x);
      smoothMouse.y += 0.05 * (mouse.y - smoothMouse.y);

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      ctx.scale(dpr, dpr);
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

          // Amplitude ramps up from split_point
          const ampNorm = Math.max(0, Math.min(1, (xNorm - splitPoint) / (0.7 - splitPoint)));
          const ampSmooth = ampNorm * ampNorm * (3 - 2 * ampNorm); // smoothstep
          const finalAmp = ampSmooth * 0.5 * amplitude * h * (1 + (smoothMouse.y - 0.5) * 0.2);

          const noiseVal = fbm(t + perc * 3, xNorm * 2.5 + perc);
          const y = h * 0.5 + (perc - 0.5) * h * 0.05 + (noiseVal - 0.5) * finalAmp;

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (section) {
        section.removeEventListener('mousemove', onMouseMove);
        section.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [color, lineCount, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};
