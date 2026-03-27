import React, { useEffect, useRef } from 'react';
import { ChevronDown, Shield, Bug, Cloud } from 'lucide-react';

interface Star {
  x: number; y: number; r: number; phase: number; brightness: number;
}
interface Comet {
  x: number; y: number; len: number; speed: number; angle: number;
  life: number; maxLife: number; width: number; brightness: number;
}

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    const stars: Star[] = [];
    const comets: Comet[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 120; i++) {
      stars.push({ x: Math.random() * 2000, y: Math.random() * 2000, r: Math.random() * 1.5 + 0.3, phase: Math.random() * Math.PI * 2, brightness: Math.random() * 0.5 + 0.2 });
    }

    const spawnComet = () => {
      const fromLeft = Math.random() > 0.3;
      comets.push({
        x: fromLeft ? -50 + Math.random() * w * 0.3 : w * 0.7 + Math.random() * w * 0.3 + 50,
        y: -20 - Math.random() * 100,
        len: 80 + Math.random() * 120, speed: 3 + Math.random() * 4,
        angle: fromLeft ? Math.PI / 6 + Math.random() * Math.PI / 6 : Math.PI * 2 / 3 + Math.random() * Math.PI / 6,
        life: 0, maxLife: 60 + Math.random() * 80, width: 1 + Math.random() * 1.5, brightness: 0.4 + Math.random() * 0.5,
      });
    };

    let elapsed = 0, nextCometTime = 2000 + Math.random() * 3000;

    const draw = (time: number) => {
      animId = requestAnimationFrame(draw);
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const t = time * 0.0002;
      const accent = getComputedStyle(canvas).getPropertyValue('--accent').trim() || '#00e87a';

      // Nebula glows
      const g1 = ctx.createRadialGradient(w * (0.3 + Math.sin(t) * 0.15), h * (0.4 + Math.cos(t * 0.6) * 0.12), 0, w * (0.3 + Math.sin(t) * 0.15), h * (0.4 + Math.cos(t * 0.6) * 0.12), w * 0.55);
      g1.addColorStop(0, accent + '08'); g1.addColorStop(0.4, accent + '03'); g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h);
      const g2 = ctx.createRadialGradient(w * (0.7 + Math.cos(t * 0.8) * 0.1), h * (0.6 + Math.sin(t * 0.5) * 0.1), 0, w * (0.7 + Math.cos(t * 0.8) * 0.1), h * (0.6 + Math.sin(t * 0.5) * 0.1), w * 0.4);
      g2.addColorStop(0, accent + '05'); g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        const tw = s.brightness + Math.sin(time * 0.003 + s.phase) * 0.15;
        ctx.beginPath(); ctx.arc(s.x % w, s.y % h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.globalAlpha = Math.max(0.05, Math.min(0.7, tw)); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Comets
      elapsed += 16.7;
      if (elapsed >= nextCometTime) { spawnComet(); elapsed = 0; nextCometTime = 3000 + Math.random() * 5000; }
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += Math.cos(c.angle) * c.speed; c.y += Math.sin(c.angle) * c.speed; c.life++;
        const lr = c.life / c.maxLife;
        let op = c.brightness;
        if (lr < 0.1) op *= lr / 0.1;
        if (lr > 0.7) op *= (1 - lr) / 0.3;
        if (c.life >= c.maxLife || c.x < -200 || c.x > w + 200 || c.y > h + 200) { comets.splice(i, 1); continue; }
        const hg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 4);
        hg.addColorStop(0, `rgba(255,255,255,${op})`); hg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(c.x, c.y, 4, 0, Math.PI * 2); ctx.fill();
        const tx = c.x - Math.cos(c.angle) * c.len, ty = c.y - Math.sin(c.angle) * c.len;
        const tg = ctx.createLinearGradient(c.x, c.y, tx, ty);
        tg.addColorStop(0, `rgba(255,255,255,${op * 0.6})`);
        tg.addColorStop(0.3, accent + Math.round(op * 40).toString(16).padStart(2, '0'));
        tg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(tx, ty);
        ctx.strokeStyle = tg; ctx.lineWidth = c.width; ctx.lineCap = 'round'; ctx.stroke();
      }
    };
    setTimeout(spawnComet, 1500);
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }} />;
};

const disciplines = [
  { icon: Shield, label: 'Penetration Testing' },
  { icon: Bug, label: 'Red Teaming' },
  { icon: Cloud, label: 'Cloud Security' },
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.querySelectorAll('.reveal').forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 120);
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingBottom: '10vh' }}
    >
      <HeroBackground />

      <div className="w-[min(90%,1120px)] mx-auto px-sp-md pt-24 relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] items-center gap-sp-2xl">
          <div>
            <div className="reveal d0">
              <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent mb-6 block">
                Cybersecurity Specialist <span className="text-fg-faint">|</span> Cat Dad
              </span>
            </div>

            <h1 className="reveal d1 text-[clamp(3rem,7.5vw,6rem)] font-extrabold tracking-[-0.04em] leading-[1.05] mb-6">
              Animesh<br />
              <span className="text-accent">Roy</span>
            </h1>

            <p className="reveal d2 text-fg-muted text-[1.05rem] leading-relaxed max-w-xl mb-8">
              Finding vulnerabilities before adversaries do. Offensive security,
              security consulting, and open-source tooling.
            </p>

            {/* Discipline pills */}
            <div className="reveal d2 flex flex-wrap gap-2 mb-10">
              {disciplines.map((d) => (
                <span key={d.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-fg-muted text-xs font-medium">
                  <d.icon size={12} className="text-accent opacity-70" />
                  {d.label}
                </span>
              ))}
            </div>

            <div className="reveal d3 flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
              >
                View Work
              </button>
              <a
                href="https://topmate.io/anir0y"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Book a Call
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="reveal d2 hidden md:flex justify-center flex-shrink-0">
            <div className="hero-avatar relative">
              <img
                src="/img/anir0y-logo.svg"
                alt="Animesh Roy"
                className="w-[280px] h-[280px] rounded-full object-cover block bg-bg-card p-8"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-fg-faint hover:text-accent transition-colors animate-bob"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
