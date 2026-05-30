import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { LINKS } from "../data/links";
import { SERVICES } from "../data/services";
import { COURSES } from "../data/training";
import { RESEARCH } from "../data/research";
import { PROJECTS } from "../data/projects";
import { LABS } from "../data/labs";
import Threads from "./Threads";

const REDUCED = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, className = "", glitch = false }: { children: ReactNode; className?: string; glitch?: boolean }) {
  const [seen, setSeen] = useState(false);
  return (
    <motion.div
      className={className + (seen && glitch ? " glitch-on" : "")}
      initial={{ opacity: 0, y: 34, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      onViewportEnter={() => setSeen(true)}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(REDUCED ? to : 0);
  return (
    <motion.span
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (REDUCED) return;
        const t0 = performance.now(), dur = 1300;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      {n}{suffix}
    </motion.span>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section id="hero">
      <div className="wrap">
        <div className="hero-tag">Cybersecurity Specialist&nbsp;&nbsp;·&nbsp;&nbsp;Cat Dad</div>
        <h1>Animesh&nbsp;Roy <span className="handle">@anir0y</span></h1>
        <p className="hero-tagline"><span className="accent">break</span> it before they <span className="haz">breach</span> it.</p>
        <div className="hero-typed">
          <span className="tc">&gt;_ </span>
          {REDUCED ? "finding vulnerabilities before adversaries do" : (
            <TypeAnimation
              sequence={[
                "finding vulnerabilities before adversaries do", 2200,
                "mapping the attack surface", 1800,
                "emulating the adversary, end to end", 2000,
                "hardening what actually matters", 2000,
              ]}
              wrapper="span" repeat={Infinity} cursor speed={55}
            />
          )}
        </div>
        <p className="hero-sub">I work in <b>offensive security, security consulting and open-source tooling</b>, and I take it from the attack surface through to remediation.</p>
        <div className="disciplines">
          <span className="pill"><span className="dot" />Penetration Testing</span>
          <span className="pill"><span className="dot" />Red Teaming</span>
          <span className="pill"><span className="dot" />Cloud Security</span>
        </div>
        <div className="hero-cta">
          <a className="btn primary" href={LINKS.topmate} target="_blank" rel="noopener noreferrer">▸ Book a Call</a>
          <a className="btn ghost" href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}>View Work</a>
        </div>
        <div className="hero-readout">
          <span><b>STATUS</b> · operational</span>
          <span><b>BASE</b> · India · remote-first</span>
          <span><b>POSTURE</b> · zero-trust</span>
          <span><b>UPLINK</b> · classroom.anir0y.in</span>
        </div>
      </div>
      <div className="scrollcue">scroll to traverse grid<i /></div>
    </section>
  );
}

/* ── About + stats ───────────────────────────────────────────────────── */
export function About() {
  return (
    <section id="about" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="about-grid">
          <div className="about-copy">
            <span className="eyebrow">00 · Operator Profile</span>
            <h2>Security researcher &amp; <em>consultant</em>.</h2>
            <p>With a background spanning <b>offensive security, threat intelligence, and cloud infrastructure</b>, I bridge the gap between identifying risks and building defenses that actually work.</p>
            <p>Currently focused on red-teaming engagements, building interactive security labs for the community, and mentoring the next generation of security professionals. Founder of the <b>Vapra Shiksha Foundation</b>.</p>
          </div>
          <div className="stats">
            <div className="stat"><div className="n"><CountUp to={13} suffix=" +" /></div><div className="l">Years Experience</div></div>
            <div className="stat"><div className="n"><CountUp to={100} suffix="+" /></div><div className="l">Security Assessments</div></div>
            <div className="stat"><div className="n"><CountUp to={20} suffix="+" /></div><div className="l">Open-Source Projects</div></div>
            <div className="stat"><div className="n"><CountUp to={6} /></div><div className="l">Live Interactive Labs</div></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Arsenal marquee ─────────────────────────────────────────────────── */
import { ARSENAL } from "../data/arsenal";
export function Arsenal() {
  const row = [...ARSENAL, ...ARSENAL];
  return (
    <section id="arsenal">
      <div className="arsenal-label">// operating arsenal</div>
      <div className="marquee-mask">
        <div className="marquee">
          {row.map((t, i) => (
            <span className="chip" key={i}><span className="ic">{t[0]}</span>{t[1]}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Threads divider (recurring data-stream motif between bands) ───────── */
export function ThreadsDivider() {
  return (
    <div className="thread-divider" aria-hidden="true">
      <Threads color="rgba(0,229,255,0.26)" amplitude={0.55} lineCount={14} />
    </div>
  );
}

/* ── Services ────────────────────────────────────────────────────────── */
const ICONS: Record<string, ReactNode> = {
  risk: <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z M12 8v4 M12 15h.01" />,
  redteam: <path d="M3 12h4l2-7 4 14 2-7h6" />,
  gap: <path d="M4 18V8 M10 18V4 M16 18v-7 M22 18H2" />,
  soc: <><path d="M3 12a9 9 0 0118 0" /><circle cx="12" cy="12" r="2.4" /><path d="M12 12v6 M7 21h10" /></>,
};
export function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <Reveal glitch>
          <span className="eyebrow">01 · Strategic Defense</span>
          <h2 className="title"><span className="glitch">Capabilities</span>, weaponised for <em>your perimeter</em>.</h2>
          <p className="lead">Independent, hands-on offensive security. Every engagement is scoped and evidence-driven, and it ends with a remediation path you can act on, not a raw vulnerability dump.</p>
        </Reveal>
        <Reveal className="grid cols-2">
          {SERVICES.map((s) => (
            <article className="module" key={s.id}>
              <div className="mod-idx">// {s.idx}</div>
              <div className="mod-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{ICONS[s.id]}</svg></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="mod-tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Training (biometric unlock) ─────────────────────────────────────── */
const TRAIN_ICONS: Record<string, ReactNode> = {
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3 M12 19v3 M2 12h3 M19 12h3" /></>,
  chip: <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M10 7V4 M14 7V4 M10 20v-3 M14 20v-3 M7 10H4 M7 14H4 M20 10h-3 M20 14h-3" /></>,
  rf: <><circle cx="12" cy="12" r="1.6" /><path d="M8.5 8.5a5 5 0 0 0 0 7 M15.5 8.5a5 5 0 0 1 0 7 M5.5 5.5a9 9 0 0 0 0 13 M18.5 5.5a9 9 0 0 1 0 13" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3 M13 15h4" /></>,
  cloud: <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4.5 4.5 0 0 1 18 18z" />,
};

type PickPhase = "locked" | "picking" | "open";
function TrainingCard({ c }: { c: (typeof COURSES)[number] }) {
  const isLock = c.icon === "lock";
  const [phase, setPhase] = useState<PickPhase>("locked");
  const timer = useRef<number | null>(null);
  const begin = () => {
    if (phase === "open") return;
    if (REDUCED) { setPhase("open"); return; }
    setPhase("picking");
    timer.current = window.setTimeout(() => setPhase("open"), isLock ? 1100 : 600);
  };
  const reset = () => {
    if (timer.current) { window.clearTimeout(timer.current); timer.current = null; }
    setPhase("locked");
  };
  const cls = phase === "open" ? " unlocked" : phase === "picking" ? " picking" : "";
  const label = isLock
    ? (phase === "open" ? "LOCK PICKED · access granted" : phase === "picking" ? "PICKING LOCK…" : "LOCKED · hover to pick")
    : (phase === "open" ? "ACCESS GRANTED" : phase === "picking" ? "AUTHENTICATING…" : "SECURED · hover to access");
  return (
    <article className={"module scan" + (isLock ? " lockcard" : "") + cls} tabIndex={0}
      aria-label={c.name + (isLock ? " (hover or focus to pick the lock)" : " (hover or focus to unlock the syllabus)")}
      onPointerEnter={begin} onPointerLeave={reset} onFocus={begin} onBlur={reset}>
      <span className="scanbar" /><span className="ripple" />
      {isLock ? (
        <svg className="lockpick" viewBox="0 0 40 50" fill="none" stroke="currentColor" aria-hidden="true">
          <path className="shackle" d="M11 23 V16 a9 9 0 0 1 18 0 V23" strokeWidth="3" strokeLinecap="round" />
          <rect className="body" x="7" y="23" width="26" height="22" rx="4" strokeWidth="2" />
          <circle className="keyhole" cx="20" cy="32" r="2.6" />
          <path className="keyslot" d="M20 34 L20 40" strokeWidth="2.4" strokeLinecap="round" />
          <g className="picks">
            <path className="pick" d="M34 41 L21 33" strokeWidth="1.8" strokeLinecap="round" />
            <path className="wrench" d="M11 44 L20 39 L20 36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      ) : (
        <svg className="trn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{TRAIN_ICONS[c.icon]}</svg>
      )}
      <div className="mod-idx">// {c.idx}</div>
      <h3>{c.name}</h3>
      <p>{c.desc}</p>
      <div className="mod-tags">{c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      <div className="lock-state"><span className="ld" />{label}</div>
      <div className="mod-reveal"><p style={{ marginTop: 14, fontSize: 13, color: "var(--text)" }}>{c.reveal}</p></div>
    </article>
  );
}
export function Training() {
  return (
    <section id="training">
      <div className="wrap">
        <Reveal glitch>
          <span className="eyebrow">02 · Sandboxed Knowledge</span>
          <h2 className="title"><span className="glitch">Training</span> that runs in a <em>live fire range</em>.</h2>
          <p className="lead">Hands-on courses and workshops drawn from real conference deliveries. Hover a module to unlock the syllabus — pick the lock on the physical course, authenticate on the rest.</p>
        </Reveal>
        <Reveal className="grid cols-3">{COURSES.map((c) => <TrainingCard key={c.idx} c={c} />)}</Reveal>
        <p className="note">⌬ All training runs through <strong>classroom.anir0y.in</strong>, with interactive labs covering web security, bug-bounty methodology and CTF tradecraft.</p>
      </div>
    </section>
  );
}

/* ── Research ────────────────────────────────────────────────────────── */
export function Research() {
  return (
    <section id="research">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">03 · Digital Twin</span>
          <h2 className="title">Research <em>nodes</em> across the surface.</h2>
          <p className="lead">A live map of where I spend my cycles: offensive research, open-source tooling and published tradecraft. Each node is an active line of work.</p>
        </Reveal>
        <Reveal className="board">
          {RESEARCH.map((n) => {
            const inner = (
              <>
                <span className={"ping" + (n.live ? " live" : "")} />
                <h4>{n.title}</h4><p>{n.desc}</p><div className="meta">{n.meta}</div>
              </>
            );
            return n.href
              ? <a className="node" key={n.title} href={n.href} target="_blank" rel="noopener noreferrer">{inner}</a>
              : <div className="node" key={n.title}>{inner}</div>;
          })}
        </Reveal>
        <p className="note">◈ The orbital map above is illustrative, not a feed of real client engagements. Client work stays confidential by default.</p>
      </div>
    </section>
  );
}

/* ── Projects + Labs ─────────────────────────────────────────────────── */
export function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <Reveal glitch>
          <span className="eyebrow">04 · Featured Work</span>
          <h2 className="title">Shipped <em>tooling</em>, not slideware.</h2>
          <p className="lead">Open-source security tools I build and maintain for red teamers, threat hunters and defenders. Each card opens the repository.</p>
        </Reveal>
        <Reveal className="intel-row">
          {PROJECTS.map((p) => (
            <a className="intel" key={p.title} href={p.href} target="_blank" rel="noopener noreferrer">
              <span className="ix">{p.ix}</span><h4>{p.title}</h4><p>{p.desc}</p><span className="go">{p.go}</span>
            </a>
          ))}
        </Reveal>
        <Reveal>
          <div className="labs-head"><h3>Interactive Labs</h3><span className="lh-line" /></div>
          <div className="labs">
            {LABS.map((l) => (
              <a className="lab" key={l.name} href={l.href} target="_blank" rel="noopener noreferrer">
                <span className="lt"><span className="live" />{l.name}</span><p>{l.desc}</p><span className="lurl">{l.url}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────────────────────────────── */
export function Contact() {
  return (
    <section id="contact">
      <div className="contact-threads"><Threads color="rgba(0,229,255,0.4)" amplitude={1.15} lineCount={26} /></div>
      <div className="wrap">
        <Reveal className="panel">
          <span className="eyebrow" style={{ justifyContent: "center" }}>05 · Establish Link</span>
          <h2>Let's <em>work together</em>.</h2>
          <p className="lead">Available for security consulting, penetration testing, and collaboration. Scope an engagement, book a call, or just trade notes. Reach out through any channel below.</p>
          <div className="handshake">
            <a className="btn primary" href={LINKS.topmate} target="_blank" rel="noopener noreferrer">▸ Book a Call</a>
            <a className="btn ghost" href={LINKS.email}>{LINKS.emailPlain}</a>
          </div>
          <div className="social">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">⌗ GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">in · LinkedIn</a>
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer">𝕏 · @anir0y</a>
            <a href={LINKS.topmate + "/"} target="_blank" rel="noopener noreferrer">◷ Topmate</a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">▶ YouTube</a>
            <a href={LINKS.classroom} target="_blank" rel="noopener noreferrer">⌬ Classroom</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
