import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { NAV, SPY_IDS } from "../data/nav";
import { LINKS } from "../data/links";
import { useScrollSpy } from "../hooks/useScrollSpy";

const REDUCED = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });

/* ── Scroll progress bar ─────────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scrollbar-top" style={{ scaleX }} aria-hidden="true" />;
}

/* ── Boot / security handshake ───────────────────────────────────────── */
const BOOT_LINES: [string, "" | "ok" | "warn"][] = [
  ["$ init secure-session --profile anir0y", ""],
  ["  negotiating cipher suite TLS_AES_256_GCM ...", "ok"],
  ["  exchanging keys · curve25519 ...", "ok"],
  ["  verifying operator identity ...", "ok"],
  ["  mounting attack-surface digital twin ...", "ok"],
  ["  arming threat-detection overlays ...", "warn"],
  ["  grid telemetry uplink · classroom.anir0y.in", "ok"],
  ["$ handshake complete. Welcome, operator.", ""],
];
const tag = (t: string) => (t === "ok" ? "  [OK]" : t === "warn" ? "  [ARMED]" : "");

export function Boot() {
  const [done, setDone] = useState(false);
  const [shown, setShown] = useState(REDUCED ? BOOT_LINES.length : 0);

  useEffect(() => {
    if (REDUCED) { const id = window.setTimeout(() => setDone(true), 350); return () => window.clearTimeout(id); }
    let i = 0; const timers: number[] = [];
    const step = () => {
      i++; setShown(i);
      if (i < BOOT_LINES.length) timers.push(window.setTimeout(step, 120 + Math.random() * 180));
      else timers.push(window.setTimeout(() => setDone(true), 520));
    };
    timers.push(window.setTimeout(step, 120));
    const safety = window.setTimeout(() => setDone(true), 4200); // never trap the user
    timers.push(safety);
    return () => timers.forEach(clearTimeout);
  }, []);

  const pct = Math.round((shown / BOOT_LINES.length) * 100);
  const text = BOOT_LINES.slice(0, shown).map(([l, t]) => l + tag(t)).join("\n");

  return (
    <div id="boot" className={done ? "done" : ""} role="status" aria-label="System boot sequence">
      <div className="boot-card">
        <div className="boot-head"><span className="boot-dot" /> anir0y // secure session handshake</div>
        <div className="boot-log">
          {text}
          {shown >= BOOT_LINES.length && <span className="cursor" />}
        </div>
        <div className="boot-bar"><i style={{ width: pct + "%" }} /></div>
      </div>
    </div>
  );
}

/* ── Telemetry stream (decorative) ───────────────────────────────────── */
export function TelemetryStream() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    if (REDUCED) return;
    const HEX = "0123456789ABCDEF";
    const hex = (n: number) => Array.from({ length: n }, () => HEX[(Math.random() * 16) | 0]).join("");
    const verbs = ["SYN", "ACK", "RST", "PSH", "GET", "TLS", "AUTH", "SCAN", "PROBE", "HSHK", "ENCR", "SEG"];
    const ip = () => `${10 + ((Math.random() * 240) | 0)}.${(Math.random() * 256) | 0}.${(Math.random() * 256) | 0}.${(Math.random() * 256) | 0}`;
    const line = () => {
      const r = Math.random();
      if (r < 0.4) return `<v>${verbs[(Math.random() * verbs.length) | 0]}</v> ${ip()}:${1024 + ((Math.random() * 64000) | 0)}`;
      if (r < 0.7) return `0x${hex(4)}  ${hex(2)} ${hex(2)} ${hex(2)} ${hex(2)}  ${hex(2)} ${hex(2)} ${hex(2)} ${hex(2)}`;
      return `pkt seq=${(Math.random() * 99999) | 0} len=${40 + ((Math.random() * 1400) | 0)} ${Math.random() < 0.5 ? "OK" : "<v>DROP</v>"}`;
    };
    let buf = Array.from({ length: 60 }, line);
    setLines(buf);
    const id = window.setInterval(() => { buf = [...buf.slice(1), line()]; setLines(buf); }, 420);
    return () => window.clearInterval(id);
  }, []);
  return (
    <aside id="stream" aria-hidden="true">
      {lines.map((l, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: l.replace(/<v>/g, '<span class="hl">').replace(/<\/v>/g, "</span>") }} />
      ))}
    </aside>
  );
}

/* ── Navigation ──────────────────────────────────────────────────────── */
export function Nav({ onCmdk }: { onCmdk: () => void }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);
  const linksRef = useRef<HTMLElement>(null);
  const [cat, setCat] = useState({ x: 0, show: false });
  // The cat tracks the active menu item: measure its centre and spring the cat there.
  useEffect(() => {
    const measure = () => {
      const cont = linksRef.current;
      if (!cont) return;
      if (window.matchMedia("(max-width: 880px)").matches) { setCat((c) => ({ ...c, show: false })); return; }
      const link = cont.querySelector<HTMLElement>(`a[href="#${active}"]`);
      if (!link) { setCat((c) => ({ ...c, show: false })); return; }
      setCat({ x: link.offsetLeft + link.offsetWidth / 2, show: true });
    };
    measure();
    const t = window.setTimeout(measure, 320); // re-measure once the webfont settles
    window.addEventListener("resize", measure);
    return () => { window.clearTimeout(t); window.removeEventListener("resize", measure); };
  }, [active]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id: string) => { setOpen(false); scrollTo(id); };
  return (
    <header className={"nav" + (solid ? " solid" : "")} id="nav">
      <a className="brand" href="#hero" aria-label="anir0y home" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
        <span className="kernel" role="img" aria-label="anir0y logo" />
        <span><b>anir<i>0</i>y</b><small>Security Ops Command</small></span>
      </a>
      <nav className={"links" + (open ? " open" : "")} id="navlinks" ref={linksRef}>
        {NAV.map((n) => (
          <a key={n.id} href={"#" + n.id} className={active === n.id ? "active" : ""} onClick={(e) => { e.preventDefault(); go(n.id); }}>{n.label}</a>
        ))}
        <motion.span
          className="nav-cat" aria-hidden="true" initial={false}
          animate={{ x: cat.x, opacity: cat.show ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 24, opacity: { duration: 0.2 } }}
        ><span className="nav-cat-inner">🐈‍⬛</span></motion.span>
      </nav>
      <div className="nav-right">
        <button className="cmdk-btn" onClick={onCmdk} aria-label="Open command palette">⌕ <kbd>⌘K</kbd></button>
        <div className="nav-status"><span className="pip" /> GRID&nbsp;ONLINE</div>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>≡</button>
      </div>
    </header>
  );
}

/* ── Command palette (⌘K) ────────────────────────────────────────────── */
interface Cmd { id: string; label: string; icon: string; hint: string; run: () => void; }
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmds = useMemo<Cmd[]>(() => {
    const ext = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    const nav: Cmd[] = NAV.map((n) => ({ id: "go-" + n.id, label: "Go to " + n.label, icon: "→", hint: "section", run: () => { onClose(); scrollTo(n.id); } }));
    return [
      ...nav,
      { id: "call", label: "Book a Call", icon: "◷", hint: "topmate", run: ext(LINKS.topmate) },
      { id: "mail", label: "Email Animesh", icon: "✉", hint: "mail@anir0y.in", run: () => { window.location.href = LINKS.email; } },
      { id: "gh", label: "GitHub", icon: "⌗", hint: "github.com/anir0y", run: ext(LINKS.github) },
      { id: "in", label: "LinkedIn", icon: "in", hint: "linkedin", run: ext(LINKS.linkedin) },
      { id: "x", label: "X / Twitter", icon: "𝕏", hint: "@anir0y", run: ext(LINKS.x) },
      { id: "yt", label: "YouTube", icon: "▶", hint: "youtube", run: ext(LINKS.youtube) },
      { id: "cls", label: "Classroom", icon: "⌬", hint: "classroom.anir0y.in", run: ext(LINKS.classroom) },
      { id: "top", label: "Back to top", icon: "↑", hint: "", run: () => { onClose(); window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }); } },
    ];
  }, [onClose]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cmds;
    return cmds.filter((c) => (c.label + " " + c.hint).toLowerCase().includes(s));
  }, [q, cmds]);

  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => { setSel(0); }, [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); filtered[sel]?.run(); }
    else if (e.key === "Escape") { e.preventDefault(); onClose(); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="cmdk-overlay" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          <motion.div className="cmdk" onClick={(e) => e.stopPropagation()} onKeyDown={onKey}
            initial={{ opacity: 0, y: -14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} role="dialog" aria-label="Command palette">
            <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Jump to a section or open a link…" aria-label="Command palette search" />
            <div className="cmdk-list">
              {filtered.length === 0 && <div className="cmdk-empty">no matching commands</div>}
              {filtered.map((c, i) => (
                <div key={c.id} className={"cmdk-item" + (i === sel ? " sel" : "")}
                  onMouseEnter={() => setSel(i)} onClick={c.run}>
                  <span className="ic">{c.icon}</span>{c.label}
                  {c.hint && <span className="k">{c.hint}</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
