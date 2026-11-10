import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { LINKS } from "../data/links";
import { SERVICES } from "../data/services";
import { COURSES } from "../data/training";
import { RESEARCH } from "../data/research";
import { PROJECTS, type Project } from "../data/projects";
import { LABS, type Lab } from "../data/labs";
import Threads from "./Threads";
import EmblemCanvas from "./EmblemCanvas";

const REDUCED = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, className = "", glitch = false }: { children: ReactNode; className?: string; glitch?: boolean }) {
  const [seen, setSeen] = useState(false);
  return (
    <motion.div
      className={className + (seen && glitch ? " glitch-on" : "")}
      initial={REDUCED ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: REDUCED ? 0 : 0.5, ease: EASE }}
      onViewportEnter={() => setSeen(true)}
    >
      {children}
    </motion.div>
  );
}

/* Section index: label on the left, a count drawn from the data on the right,
   and a hairline that draws in once. Same device as the hero's poster index,
   so every band opens the same way and tells you what is in it. */
function SectionIndex({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="sec-index">
      <span className="eyebrow">{label}</span>
      <span className="sec-meta">{meta}</span>
      <motion.span
        className="sec-rule"
        aria-hidden="true"
        initial={REDUCED ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: REDUCED ? 0 : 0.9, ease: EASE }}
      />
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section id="hero">
      <div className="wrap hero-poster">
        <div className="poster-index">
          <span>Independent security research practice</span>
          <span>India / worldwide</span>
        </div>

        <h1 className="poster-name" aria-label="Animesh Roy">
          <span className="poster-first">Animesh</span>
          <span className="poster-last">Roy</span>
        </h1>

        <div className="poster-lower">
          <div className="poster-copy">
            <p className="hero-tagline">Find the path before the adversary does.</p>
            <p className="hero-sub">I pressure-test systems, map real attack paths, and stay through remediation. Offensive security with enough technical depth for the engineers—and enough clarity for the board.</p>
            <p className="hero-disciplines">Penetration testing / Red teaming / Cloud security / Training</p>
            <div className="hero-cta">
              <a className="btn primary" href={LINKS.booking} target="_blank" rel="noopener noreferrer">Book a working session</a>
              <a className="btn ghost" href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}>See the work</a>
            </div>
          </div>

          <aside className="hero-scope" aria-hidden="true">
            <div className="scope-aperture">
              <span className="scope-logo" />
              <span className="scope-sweep" />
              <span className="scope-cross cross-x" />
              <span className="scope-cross cross-y" />
            </div>
            <p>Find the path.<br />Prove the risk.<br />Fix what matters.</p>
          </aside>
        </div>

        <div className="hero-proof" aria-label="Professional highlights">
          <span><b>13+</b> years in security</span>
          <span><b>100+</b> assessments</span>
          <span><b>20+</b> open tools</span>
          <span className="availability"><i /> Taking select engagements</span>
        </div>
      </div>
      <div className="scrollcue">Scroll to inspect<i /></div>
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
            <span className="eyebrow">Operator profile</span>
            <h2>Security researcher &amp; <em>consultant</em>.</h2>
            <p>With a background spanning <b>offensive security, threat intelligence, and cloud infrastructure</b>, I bridge the gap between identifying risks and building defenses that actually work.</p>
            <p>Currently focused on red-teaming engagements, building interactive security labs for the community, and mentoring the next generation of security professionals. Founder of the <b>Vapra Shiksha Foundation</b>.</p>
          </div>
          {/* The hero already carries the headline numbers; this panel says what they stand for. */}
          <dl className="facts">
            <div><dt>Focus</dt><dd>Red teaming, hardware, RF and cloud security</dd></div>
            <div><dt>Published</dt><dd><a href={RESEARCH[0].href} target="_blank" rel="noopener noreferrer">IEEE Xplore: evading malware analysis with reverse execution</a></dd></div>
            <div><dt>Teaches</dt><dd>{COURSES.length} hands-on courses at <a href={LINKS.classroom} target="_blank" rel="noopener noreferrer">classroom.anir0y.in</a></dd></div>
            <div><dt>Builds</dt><dd>{MAJOR_PROJECTS.map((p) => p.title).join(", ")}</dd></div>
            <div><dt>Based</dt><dd>India, working worldwide</dd></div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Arsenal marquee ─────────────────────────────────────────────────── */
import { ARSENAL_GROUPS } from "../data/arsenal";
export function Arsenal() {
  return (
    <section id="arsenal" aria-label="Working toolkit">
      <div className="wrap">
        <Reveal className="loadout">
          {ARSENAL_GROUPS.map((g) => (
            <div className="loadout-col" key={g.role}>
              <h3>{g.role}<span>{g.tools.length}</span></h3>
              <p>{g.tools.map((t) => <span key={t}>{t}</span>)}</p>
            </div>
          ))}
        </Reveal>
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
          <SectionIndex label="What I do" meta={`${SERVICES.length} engagement types`} />
          <h2 className="title">I pressure-test what you <em>cannot afford to lose.</em></h2>
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
function TrainingCard({ c, order }: { c: (typeof COURSES)[number]; order: number }) {
  const isLock = c.icon === "lock";
  // The syllabus is content, not a reward: each card opens itself once when it
  // scrolls into view (staggered), then stays open. Nothing depends on hover.
  const [phase, setPhase] = useState<PickPhase>(REDUCED ? "open" : "locked");
  const timers = useRef<number[]>([]);
  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)); }, []);
  const begin = () => {
    if (REDUCED || timers.current.length) return;
    const start = 250 + order * 160;
    timers.current.push(window.setTimeout(() => setPhase("picking"), start));
    timers.current.push(window.setTimeout(() => setPhase("open"), start + (isLock ? 1100 : 600)));
  };
  const cls = phase === "open" ? " unlocked" : phase === "picking" ? " picking" : "";
  const label = phase === "open" ? "SYLLABUS" : phase === "picking" ? (isLock ? "PICKING LOCK…" : "AUTHENTICATING…") : "SEALED";
  return (
    <motion.article className={"module scan" + (isLock ? " lockcard" : "") + cls}
      viewport={{ once: true, amount: 0.4 }} onViewportEnter={begin}>
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
    </motion.article>
  );
}
export function Training() {
  return (
    <section id="training">
      <div className="wrap">
        <Reveal glitch>
          <SectionIndex label="Teach the trade" meta={`${COURSES.length} courses · all hands-on`} />
          <h2 className="title">Training built from <em>real failure modes.</em></h2>
          <p className="lead">Hands-on courses and workshops drawn from real conference deliveries. Each card lists what you work through on the bench.</p>
        </Reveal>
        <Reveal className="grid cols-3">{COURSES.map((c, i) => <TrainingCard key={c.idx} c={c} order={i} />)}</Reveal>
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
          <SectionIndex label="Research" meta={`${RESEARCH.length} lines of work · ${RESEARCH.filter((n) => n.href).length} published`} />
          <h2 className="title">Research that <em>escapes the lab.</em></h2>
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
        <p className="note">◈ The orbital scene behind this page is illustrative, not a feed of real client engagements. Client work stays confidential by default.</p>
      </div>
    </section>
  );
}

/* ── Projects + Labs ─────────────────────────────────────────────────── */
/* Line marks for the major projects (drawn here; swap for real logos when available). */
const MARKS: Record<string, ReactNode> = {
  agents: <><circle cx="12" cy="12" r="2.6" /><circle cx="4.5" cy="6" r="1.6" /><circle cx="19.5" cy="6" r="1.6" /><circle cx="4.5" cy="18" r="1.6" /><circle cx="19.5" cy="18" r="1.6" /><path d="M9.9 10.4 5.9 7 M14.1 10.4 18.1 7 M9.9 13.6 5.9 17 M14.1 13.6 18.1 17" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
  hook: <><circle cx="14" cy="4.5" r="1.5" /><path d="M14 6v9a4.5 4.5 0 0 1-9 0v-2 M5 13l-2 2.5 M5 13l2 2.5" /></>,
  quill: <path d="M20 4c-7 0-12 4-13 12l-2 4 M7 16c4 0 8-2 10-6 M11 12h5" />,
};

/* Project deck: the rail keeps every major project visible; the stage shows one
   in full and slides to whichever is picked. Click, arrow keys or swipe — it
   never advances on its own. */
function ProjectDeck({ items }: { items: Project[] }) {
  const [[active, dir], setState] = useState<[number, number]>([0, 0]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const dragged = useRef(false);
  // Hidden slides must not take focus or clicks; keep `inert` in step with the active one.
  useEffect(() => { slides.current.forEach((el, i) => { if (el) el.inert = i !== active; }); }, [active]);
  const go = (to: number, focus = false) => {
    const next = (to + items.length) % items.length;
    setState(([cur]) => [next, next === cur ? 0 : to > cur ? 1 : -1]);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(active + 1, true); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(active - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); go(0, true); }
    else if (e.key === "End") { e.preventDefault(); go(items.length - 1, true); }
  };
  const shift = REDUCED ? 0 : 44;
  return (
    <>
      <div className="deck-rail">
        <div role="tablist" aria-label="Major projects" aria-orientation="vertical" onKeyDown={onKey}>
          {items.map((it, i) => (
            <button key={it.title} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" className="deck-tab"
              id={`deck-tab-${i}`} aria-selected={i === active} aria-controls="deck-panel" tabIndex={i === active ? 0 : -1}
              onClick={() => go(i)}>
              {i === active && <motion.span className="deck-ind" layoutId="deck-ind" transition={{ duration: REDUCED ? 0 : 0.35, ease: EASE }} />}
              <span className="deck-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{it.mark && MARKS[it.mark]}</svg>
              </span>
              <span className="deck-name">{it.title}</span>
              <span className="deck-kind">{it.ix}</span>
            </button>
          ))}
        </div>
        <div className="deck-nav">
          <button type="button" aria-label="Previous project" onClick={() => go(active - 1)}>←</button>
          <span aria-hidden="true">{active + 1} / {items.length}</span>
          <button type="button" aria-label="Next project" onClick={() => go(active + 1)}>→</button>
        </div>
      </div>
      {/* Every slide stays mounted (links and copy remain in the page for search,
          find-in-page and crawlers); only the active one is visible and interactive. */}
      <div className="deck-stage" id="deck-panel" role="tabpanel" aria-labelledby={`deck-tab-${active}`}>
        {items.map((it, i) => {
          const on = i === active;
          // Inactive slides rest on the side they would travel from, so the motion reads as a slide.
          const rest = (i < active ? -1 : 1) * (dir === 0 ? 1 : Math.abs(dir)) * shift;
          return (
            <motion.div
              key={it.title}
              className={"deck-slide" + (on ? " is-active" : "")}
              aria-hidden={!on}
              ref={(el) => { slides.current[i] = el; }}
              initial={false}
              animate={{ opacity: on ? 1 : 0, x: on ? 0 : rest }}
              transition={{ duration: REDUCED ? 0 : 0.42, ease: EASE }}
              drag={REDUCED || !on ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12}
              onDragStart={() => { dragged.current = true; }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(active + 1); else if (info.offset.x > 70) go(active - 1);
                window.setTimeout(() => { dragged.current = false; }, 0);
              }}
            >
              <a className="intel intel-hero intel-watermarked" href={it.href} target="_blank" rel="noopener noreferrer" draggable={false}
                tabIndex={on ? undefined : -1} onClick={(e) => { if (dragged.current) e.preventDefault(); }}>
                {it.watermark && <span className="project-watermark" aria-hidden="true">{it.watermark}</span>}
                <span className="ix">{it.ix}</span><h4>{it.title}</h4><p>{it.desc}</p>
                {it.proof && <span className="project-proof">{it.proof.map((item) => <span key={item}>{item}</span>)}</span>}
                <span className="go">{it.go}</span>
              </a>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

/* Emblems for the tool map's detail panel: one drawn mark per tool, in the same
   line style as the rest of the site. Paths with class "a" take the accent colour. */
const ART: Record<string, ReactNode> = {
  pcap: <><path d="M14 96H106 M22 90V70 M34 90V50 M46 90V62 M58 90V38 M70 90V58 M82 90V66 M94 90V74" /><circle className="a" cx="84" cy="34" r="12" /><path className="a" d="M93 43l10 10" /></>,
  shield: <><path d="M60 14l34 12v28c0 24-15 40-34 50-19-10-34-26-34-50V26z" /><path className="a" d="M40 58c6-9 13-13 20-13s14 4 20 13c-6 9-13 13-20 13s-14-4-20-13z" /><circle className="a" cx="60" cy="58" r="5" /></>,
  inventory: <><path d="M20 20h22v22H20z M49 20h22v22H49z M20 49h22v22H20z M49 49h22v22H49z M78 49h22v22H78z M20 78h22v22H20z M49 78h22v22H49z M78 78h22v22H78z" /><path className="a" d="M78 20h22v22H78z M89 26v8 M89 38v.5" /></>,
  browser: <><rect x="16" y="22" width="88" height="76" rx="6" /><path d="M16 40H104 M26 31h.5 M34 31h.5 M42 31h.5" /><path className="a" d="M60 52l18 32H42z M60 64v9 M60 78v.5" /></>,
  gauge: <><path d="M24 76a36 36 0 0 1 72 0 M60 40v6 M35 52l4 4 M85 52l-4 4 M14 98H106 M36 98v-7 M60 98v-7 M84 98v-7" /><path className="a" d="M60 76L79 53" /><circle className="a" cx="60" cy="76" r="4" /></>,
  cloud: <><path d="M38 62a14 14 0 0 1 4-27 20 20 0 0 1 38 4 12 12 0 0 1 2 23z" /><path className="a" d="M50 78L40 89l10 11 M70 78l10 11-10 11 M64 76l-8 26" /></>,
  terminalMail: <><rect x="14" y="20" width="92" height="76" rx="6" /><path d="M26 42l11 9-11 9 M43 60h12" /><rect className="a" x="58" y="58" width="38" height="28" rx="3" /><path className="a" d="M58 62l19 13 19-13" /></>,
  statement: <><path d="M30 14h36l18 18v74H30z M66 14v18h18 M42 90V74 M52 90V62 M62 90V68 M42 46h18 M42 54h12" /><rect className="a" x="70" y="80" width="28" height="22" rx="3" /><path className="a" d="M77 80v-7a7 7 0 0 1 14 0v7" /></>,
  decode: <><path d="M16 36h14v14H16z M34 36h14v14H34z M16 54h14v14H16z M34 54h14v14H34z M16 72h14v14H16z M34 72h14v14H34z M88 43h18 M88 61h18 M88 79h11" /><path className="a" d="M58 61h20 M71 53l8 8-8 8" /></>,
  shell: <><rect x="14" y="20" width="92" height="80" rx="6" /><path d="M14 38H106 M24 29h.5 M32 29h.5 M40 29h.5 M28 54l14 11-14 11 M50 76h18" /><path className="a" d="M78 62v16h8V62z" /></>,
  mail: <><rect x="16" y="28" width="88" height="62" rx="6" /><path d="M16 35l44 30 44-30" /><circle className="a" cx="90" cy="86" r="15" /><path className="a" d="M90 78v8l6 4" /></>,
};

/* Project map: the open tools as a mind map — root, a branch per purpose, a leaf
   per project. Pointing at, focusing or tapping a leaf lights its path and shows
   that project in the panel. Every project's link stays in the page. */
function ProjectMap({ items, root }: { items: Project[]; root?: Project }) {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const leaves = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => { panels.current.forEach((el, i) => { if (el) el.inert = i !== active; }); }, [active]);

  const n = items.length;
  const leafY = (i: number) => (n === 1 ? 50 : 8 + (i * 84) / (n - 1));
  const groups: { name: string; idx: number[] }[] = [];
  items.forEach((p, i) => {
    const name = p.group ?? "Other";
    const g = groups.find((x) => x.name === name);
    if (g) g.idx.push(i); else groups.push({ name, idx: [i] });
  });
  const branchY = (g: { idx: number[] }) => g.idx.reduce((sum, i) => sum + leafY(i), 0) / g.idx.length;
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + n) % n;
    setActive(next); leaves.current[next]?.focus();
  };

  return (
    <>
      <div className="mm-map" onKeyDown={onKey}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {groups.map((g) => {
            const by = branchY(g), on = g.idx.includes(active);
            return (
              <g key={g.name}>
                <path className={"mm-edge" + (on ? " on" : "")} d={`M18,50 C24,50 24,${by} 30,${by}`} />
                {g.idx.map((i) => (
                  <path key={i} className={"mm-edge" + (i === active ? " on" : "")} d={`M48,${by} C55,${by} 55,${leafY(i)} 62,${leafY(i)}`} />
                ))}
              </g>
            );
          })}
        </svg>
        {root && (
          <a className="mm-node mm-root" style={{ top: "50%" }} href={root.href} target="_blank" rel="noopener noreferrer">
            <b>Open tooling</b><span>{root.go}</span>
          </a>
        )}
        {groups.map((g) => (
          <div className="mm-group" key={g.name}>
            <span className={"mm-node mm-branch" + (g.idx.includes(active) ? " on" : "")} style={{ top: branchY(g) + "%" }}>
              {g.name}<i>{g.idx.length}</i>
            </span>
            {g.idx.map((i) => (
              <button key={items[i].title} ref={(el) => { leaves.current[i] = el; }} type="button"
                className="mm-node mm-leaf" style={{ top: leafY(i) + "%" }} aria-pressed={i === active} aria-controls="mm-detail"
                onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
                <b>{items[i].title}</b><span>{items[i].ix.split(" · ")[1] ?? items[i].ix}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="mm-detail" id="mm-detail">
        <EmblemCanvas arts={ART} active={items[active].art ?? ""} />
        <div className="mm-panels" aria-live="polite">
        {items.map((p, i) => (
          <div key={p.title} ref={(el) => { panels.current[i] = el; }} className={"mm-panel" + (i === active ? " is-active" : "")} aria-hidden={i !== active}>
            <span className="ix">{p.ix}</span>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
            <a className="go" href={p.href} target="_blank" rel="noopener noreferrer">{p.go}</a>
            {p.extra && <a className="go" href={p.extra.href} target="_blank" rel="noopener noreferrer">{p.extra.label}</a>}
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

/* Lab cards: each carries a miniature of what the lab teaches. The miniature
   plays once when the row scrolls into view, and again on hover or focus. */
const step = (i: number) => ({ "--i": i }) as React.CSSProperties;
const MORSE: [string, string][] = [["M", "--"], ["O", "---"], ["R", ".-."], ["S", "..."], ["E", "."]];
const OSI: [number, string][] = [[7, "APP"], [6, "PRES"], [5, "SESS"], [4, "TRNS"], [3, "NET"], [2, "LINK"], [1, "PHY"]];

function LabDemo({ kind }: { kind: Lab["demo"] }) {
  if (kind === "morse") {
    let k = 0;
    return (
      <div className="lab-demo demo-morse" aria-hidden="true">
        {MORSE.map(([ch, code]) => (
          <span className="mletter" key={ch}>
            <em>{ch}</em>
            <span>{code.split("").map((s, j) => <i key={j} className={s === "." ? "dot" : "dash"} style={step(k++)} />)}</span>
          </span>
        ))}
      </div>
    );
  }
  if (kind === "osi") {
    return (
      <div className="lab-demo demo-osi" aria-hidden="true">
        {OSI.map(([n, ab], i) => <span className="ocell" key={n} style={step(i)}><b>{n}</b><em>{ab}</em></span>)}
      </div>
    );
  }
  if (kind === "overflow") {
    return (
      <div className="lab-demo demo-bof" aria-hidden="true">
        <div className="bcells">
          {Array.from({ length: 10 }, (_, i) => <span key={i} className={"bcell" + (i >= 8 ? " ret" : "")} style={step(i)}><i>41</i></span>)}
        </div>
        <div className="blabels"><em>buf[8]</em><em>ret</em></div>
      </div>
    );
  }
  return (
    <div className="lab-demo demo-dkim" aria-hidden="true">
      <code>DKIM-Signature: v=1; a=rsa-sha256;</code>
      <code>d=anir0y.in; s=selector1; b=<span className="hash">{Array.from({ length: 10 }, (_, i) => <i key={i} style={step(i)} />)}</span></code>
      <span className="verdict"><b className="v-none">dkim=none</b><b className="v-pass">dkim=pass</b></span>
    </div>
  );
}

function LabCard({ l, order }: { l: Lab; order: number }) {
  const [live, setLive] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)); }, []);
  const play = () => {
    if (REDUCED || timers.current.length) return;
    const start = 400 + order * 700;
    timers.current.push(window.setTimeout(() => setLive(true), start));
    timers.current.push(window.setTimeout(() => setLive(false), start + 2600));
  };
  return (
    <motion.a className={"lab" + (live ? " is-live" : "")} href={l.href} target="_blank" rel="noopener noreferrer"
      viewport={{ once: true, amount: 0.6 }} onViewportEnter={play}>
      <LabDemo kind={l.demo} />
      <span className="lt"><span className="live" />{l.name}</span><p>{l.desc}</p><span className="lurl">{l.url}</span>
    </motion.a>
  );
}

const MAJOR_PROJECTS = PROJECTS.filter((p) => p.feature === "hero");
const TOOL_PROJECTS = PROJECTS.filter((p) => !p.feature);
const MORE_PROJECT = PROJECTS.find((p) => p.feature === "more");

export function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <Reveal glitch>
          <SectionIndex label="Selected work" meta={`${PROJECTS.filter((p) => p.feature !== "more").length} projects · ${LABS.length} live labs`} />
          <h2 className="title">Products, tools, and <em>working proof.</em></h2>
          <p className="lead">Products and open-source security tools I build for practitioners, teams, and people who want to work with me. Each card opens the live product or its source.</p>
        </Reveal>
        <Reveal className="deck"><ProjectDeck items={MAJOR_PROJECTS} /></Reveal>
        <Reveal className="mm"><ProjectMap items={TOOL_PROJECTS} root={MORE_PROJECT} /></Reveal>
        <Reveal>
          <div className="labs-head"><h3 className="vh">Interactive labs</h3><SectionIndex label="Interactive labs" meta={`${LABS.length} live · each opens in a new tab`} /></div>
          <div className="labs">
            {LABS.map((l, i) => <LabCard key={l.name} l={l} order={i} />)}
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
          <SectionIndex label="Start a conversation" meta="Taking select engagements" />
          <h2>Bring me the <em>hard problem.</em></h2>
          <p className="lead">Available for security consulting, penetration testing, and collaboration. Scope an engagement, book a call, or just trade notes. Reach out through any channel below.</p>
          <div className="handshake">
            <a className="btn primary" href={LINKS.booking} target="_blank" rel="noopener noreferrer">▸ Book on OpenHour</a>
            <a className="btn ghost" href={LINKS.email}>{LINKS.emailPlain}</a>
          </div>
          <div className="social">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">⌗ GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">in · LinkedIn</a>
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer">𝕏 · @anir0y</a>
            <a href={LINKS.booking} target="_blank" rel="noopener noreferrer">◷ OpenHour</a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">▶ YouTube</a>
            <a href={LINKS.classroom} target="_blank" rel="noopener noreferrer">⌬ Classroom</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
