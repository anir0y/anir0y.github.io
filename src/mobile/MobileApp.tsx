import { useEffect, useState } from "react";
import { LINKS } from "../data/links";
import { ARSENAL } from "../data/arsenal";
import { SERVICES } from "../data/services";
import { COURSES, type Course } from "../data/training";
import { RESEARCH } from "../data/research";
import { PROJECTS } from "../data/projects";
import { LABS } from "../data/labs";
import { useClock } from "../hooks/useClock";
import { useVisitorRecon } from "../hooks/useVisitorRecon";
import { anonymity } from "../lib/recon";

/**
 * FIELD UNIT — the dedicated phone edition.
 * An app shell, not a scrolled page: five instantly-switching panels behind a
 * bottom command deck. Zero animation by design — every interaction is an
 * immediate state flip (tap-to-authenticate cards, accordions, live readouts).
 * All content comes from the same src/data modules the desktop build uses.
 */

type PanelId = "home" | "services" | "training" | "projects" | "contact";

const DECK: { id: PanelId; label: string; glyph: string }[] = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "services", label: "Defense", glyph: "▣" },
  { id: "training", label: "Training", glyph: "⌬" },
  { id: "projects", label: "Intel", glyph: "◈" },
  { id: "contact", label: "Link", glyph: "⇌" },
];

// Desktop section hashes arrive here via the / ↔ /m/ redirect guards.
const ALIAS: Record<string, PanelId> = { hero: "home", about: "home", arsenal: "home", research: "projects", work: "projects" };

function fromHash(): PanelId {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (DECK.some((d) => d.id === h)) return h as PanelId;
  return ALIAS[h] ?? "home";
}

/* ── Chrome ──────────────────────────────────────────────────────────── */
function Clock() {
  const { utc } = useClock();
  return <span className="clk">{utc}Z</span>;
}

/* ── Home ────────────────────────────────────────────────────────────── */
function HomePanel() {
  return (
    <section aria-label="Home">
      <span className="eyebrow">Field Unit · Mobile Ops</span>
      <h1>Animesh Roy <span className="handle">@anir0y</span></h1>
      <p className="tagline"><span className="or">break</span> it before they <span className="hz">breach</span> it.</p>

      <div className="term">
        <div className="th">&gt;_ mission log</div>
        <span className="ln">▸ finding vulnerabilities <b>before adversaries do</b></span>
        <span className="ln">▸ mapping the attack surface</span>
        <span className="ln">▸ emulating the adversary, end to end</span>
        <span className="ln">▸ hardening what actually matters</span>
      </div>

      <p className="copy">I work in <b>offensive security, security consulting and open-source tooling</b>, and I take it from the attack surface through to remediation.</p>
      <div className="pills">
        <span className="pill"><span className="dot" />Penetration Testing</span>
        <span className="pill"><span className="dot" />Red Teaming</span>
        <span className="pill"><span className="dot" />Cloud Security</span>
      </div>
      <div className="cta">
        <a className="btn primary" href={LINKS.topmate} target="_blank" rel="noopener noreferrer">▸ Book a Call</a>
        <a className="btn ghost" href={LINKS.email}>✉ Email</a>
      </div>
      <div className="hero-readout">
        <span><b>STATUS</b> operational</span>
        <span><b>BASE</b> India · remote-first</span>
        <span><b>POSTURE</b> zero-trust</span>
        <span><b>UPLINK</b> classroom.anir0y.in</span>
      </div>

      <div className="stats">
        <div className="stat"><div className="n">13+</div><div className="l">Years Experience</div></div>
        <div className="stat"><div className="n">100+</div><div className="l">Security Assessments</div></div>
        <div className="stat"><div className="n">20+</div><div className="l">Open-Source Projects</div></div>
        <div className="stat"><div className="n">6</div><div className="l">Live Interactive Labs</div></div>
      </div>

      <span className="eyebrow">00 · Operator Profile</span>
      <h2>Security researcher &amp; <em>consultant</em>.</h2>
      <p className="copy">With a background spanning <b>offensive security, threat intelligence, and cloud infrastructure</b>, I bridge the gap between identifying risks and building defenses that actually work.</p>
      <p className="copy">Currently focused on red-teaming engagements, building interactive security labs for the community, and mentoring the next generation of security professionals. Founder of the <b>Vapra Shiksha Foundation</b>.</p>

      <span className="eyebrow">// Operating Arsenal</span>
      <div className="chips">
        {ARSENAL.map(([ic, name]) => (
          <span className="chip" key={name}><span aria-hidden="true">{ic}</span>{name}</span>
        ))}
      </div>

      <div className="deskswitch"><a href="../?view=desktop">Full desktop experience →</a></div>
    </section>
  );
}

/* ── Defense (services accordion) ────────────────────────────────────── */
function DefensePanel() {
  const [open, setOpen] = useState<string | null>(SERVICES[0].id);
  return (
    <section aria-label="Defense services">
      <span className="eyebrow">01 · Strategic Defense</span>
      <h2>Capabilities, weaponised for <em>your perimeter</em>.</h2>
      <p className="lead">Independent, hands-on offensive security. Every engagement is scoped and evidence-driven, and it ends with a remediation path you can act on, not a raw vulnerability dump.</p>
      {SERVICES.map((s) => {
        const isOpen = open === s.id;
        return (
          <div className={"acc" + (isOpen ? " open" : "")} key={s.id}>
            <button type="button" className="acc-head" aria-expanded={isOpen} aria-controls={"acc-" + s.id}
              onClick={() => setOpen(isOpen ? null : s.id)}>
              <span className="acc-idx">// {s.idx}</span>
              <span className="acc-title">{s.title}</span>
              <span className="acc-x" aria-hidden="true">{isOpen ? "–" : "+"}</span>
            </button>
            <div id={"acc-" + s.id} className="acc-body" hidden={!isOpen}>
              <p>{s.desc}</p>
              <div className="tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ── Training (tap-to-authenticate cards) ────────────────────────────── */
function TrainingCard({ c }: { c: Course }) {
  const [unlocked, setUnlocked] = useState(false);
  const isLock = c.icon === "lock";
  const status = unlocked
    ? (isLock ? "LOCK PICKED · ACCESS GRANTED" : "ACCESS GRANTED")
    : (isLock ? "LOCKED · TAP TO PICK" : "SECURED · TAP TO AUTHENTICATE");
  return (
    <article className={"mcard trn" + (unlocked ? " open" : "")}>
      <div className="mcard-idx">// {c.idx}</div>
      <h3>{c.name}</h3>
      <p>{c.desc}</p>
      <div className="tags">{c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      {unlocked && <p className="reveal">{c.reveal}</p>}
      <button type="button" className="trn-btn" aria-expanded={unlocked}
        aria-label={c.name + " — " + (unlocked ? "syllabus unlocked" : "unlock the syllabus")}
        onClick={() => setUnlocked((u) => !u)}>
        <span className="led" aria-hidden="true" />{status}
      </button>
    </article>
  );
}

function TrainingPanel() {
  return (
    <section aria-label="Training">
      <span className="eyebrow">02 · Sandboxed Knowledge</span>
      <h2>Training that runs in a <em>live fire range</em>.</h2>
      <p className="lead">Hands-on courses and workshops drawn from real conference deliveries. Tap a module to authenticate and unlock the syllabus — pick the lock on the physical course.</p>
      {COURSES.map((c) => <TrainingCard key={c.idx} c={c} />)}
      <p className="note">⌬ All training runs through <b>classroom.anir0y.in</b>, with interactive labs covering web security, bug-bounty methodology and CTF tradecraft.</p>
    </section>
  );
}

/* ── Intel (research + projects + labs) ──────────────────────────────── */
function IntelPanel() {
  return (
    <section aria-label="Intel — research, projects and labs">
      <span className="eyebrow">03 · Intel</span>
      <h2>Shipped <em>tooling</em>, not slideware.</h2>
      <p className="lead">Open-source security tools, published research and live labs. Each card opens the source.</p>

      <div className="sub">// research nodes</div>
      {RESEARCH.map((n) => {
        const inner = (
          <>
            <h4><span className={"ping" + (n.live ? " live" : "")} aria-hidden="true" />{n.title}</h4>
            <p>{n.desc}</p>
            <div className="meta">{n.meta}</div>
          </>
        );
        return n.href
          ? <a className="node" key={n.title} href={n.href} target="_blank" rel="noopener noreferrer">{inner}</a>
          : <div className="node" key={n.title}>{inner}</div>;
      })}

      <div className="sub">// shipped tooling</div>
      {PROJECTS.map((p) => (
        <a className="node" key={p.title} href={p.href} target="_blank" rel="noopener noreferrer">
          <span className="ix">{p.ix}</span>
          <h4>{p.title}</h4>
          <p>{p.desc}</p>
          <span className="go">{p.go}</span>
        </a>
      ))}

      <div className="sub">// interactive labs</div>
      {LABS.map((l) => (
        <a className="node" key={l.name} href={l.href} target="_blank" rel="noopener noreferrer">
          <h4><span className="ping live" aria-hidden="true" />{l.name}</h4>
          <p>{l.desc}</p>
          <span className="go">{l.url} →</span>
        </a>
      ))}
    </section>
  );
}

/* ── Link (contact + visitor recon) ──────────────────────────────────── */
type Tone = "clean" | "flagged" | "unknown" | undefined;
function RCell({ k, v, loading, tone }: { k: string; v?: string | null; loading?: boolean; tone?: Tone }) {
  const toneCls = tone === "clean" ? " clean" : tone === "flagged" ? " flag" : tone === "unknown" ? " dim" : "";
  return (
    <div className="rcell">
      <div className="rk">{k}</div>
      {loading ? <span className="rv skel" /> : <div className={"rv" + (v ? toneCls : " dim")}>{v || "n/a"}</div>}
    </div>
  );
}

function LinkPanel() {
  const { geo, env, status } = useVisitorRecon();
  const { utc, local, uptime } = useClock();
  const year = new Date().getFullYear();
  const geoLoading = status === "loading";
  const loc = geo
    ? [geo.city, geo.region, geo.country].filter(Boolean).join(", ") + (geo.flag ? " " + geo.flag : "")
    : "";
  const network = geo ? [geo.isp, geo.asn].filter(Boolean).join(" · ") : "";
  const anon = anonymity(geo);

  return (
    <section aria-label="Establish link">
      <span className="eyebrow">04 · Establish Link</span>
      <h2>Let's <em>work together</em>.</h2>
      <p className="lead">Available for security consulting, penetration testing, and collaboration. Scope an engagement, book a call, or just trade notes.</p>
      <div className="cta">
        <a className="btn primary" href={LINKS.topmate} target="_blank" rel="noopener noreferrer">▸ Book a Call</a>
        <a className="btn ghost" href={LINKS.email}>{LINKS.emailPlain}</a>
      </div>
      <div className="social">
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer">⌗ GitHub</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">in · LinkedIn</a>
        <a href={LINKS.x} target="_blank" rel="noopener noreferrer">𝕏 · @anir0y</a>
        <a href={LINKS.topmate} target="_blank" rel="noopener noreferrer">◷ Topmate</a>
        <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">▶ YouTube</a>
        <a href={LINKS.classroom} target="_blank" rel="noopener noreferrer">⌬ Classroom</a>
      </div>

      <div className="recon" aria-label="Visitor recon">
        <div className="recon-head">
          <span className={"rdot" + (status === "ready" ? " ok" : "")} aria-hidden="true" />
          VISITOR&nbsp;RECON
          <span className="rspacer">{status === "ready" ? "lock acquired" : status === "error" ? "uplink unavailable" : "scanning…"}</span>
        </div>
        <div className="recon-grid">
          <RCell k="IP Address" v={geo?.ip} loading={geoLoading} />
          <RCell k="IP Location" v={loc} loading={geoLoading} />
          <RCell k="VPN / Tor / Proxy" v={anon.label} loading={geoLoading} tone={anon.level} />
          <RCell k="Network" v={network} loading={geoLoading} />
          <RCell k="Timezone" v={geo?.tz || env?.timezone} loading={geoLoading && !env} />
          <RCell k="Browser" v={env?.browser} />
          <RCell k="Operating System" v={env?.os} />
          <RCell k="Display" v={env ? `${env.screen} · ${env.viewport}` : ""} />
        </div>
        <div className="recon-note">
          ◈ Derived live in your browser and shown only to you. Nothing here is stored, logged, or sent anywhere.
          {env?.dnt === "enabled" ? " Do-Not-Track respected." : ""}
        </div>
      </div>

      <div className="foot">
        © {year} ANIMESH ROY · <a href="https://anir0y.in/">anir0y.in</a> · built by a cat dad &amp; his cat 🐈‍⬛<br />
        {utc} UTC · LOCAL {local} · UPTIME <span className="up">{uptime}</span><br />
        <span className="legal">Field Unit build. All offensive work conducted under explicit authorization &amp; scope.</span>
      </div>
      <div className="deskswitch"><a href="../?view=desktop">Full desktop experience →</a></div>
    </section>
  );
}

/* ── Shell ───────────────────────────────────────────────────────────── */
export default function MobileApp() {
  const [panel, setPanel] = useState<PanelId>(fromHash);

  useEffect(() => {
    const onHash = () => setPanel(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (id: PanelId) => {
    setPanel(id);
    history.replaceState(null, "", "#" + id);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="top">
        <span className="brand">ANIR<i>0</i>Y<span className="unit"> // FIELD UNIT</span></span>
        <span className="readout"><Clock /><span className="pip" aria-hidden="true" />ONLINE</span>
      </header>

      <main id="main">
        <div hidden={panel !== "home"}><HomePanel /></div>
        <div hidden={panel !== "services"}><DefensePanel /></div>
        <div hidden={panel !== "training"}><TrainingPanel /></div>
        <div hidden={panel !== "projects"}><IntelPanel /></div>
        <div hidden={panel !== "contact"}><LinkPanel /></div>
      </main>

      <nav className="deck" aria-label="Sections">
        {DECK.map((d) => (
          <button key={d.id} type="button" aria-current={panel === d.id ? "page" : undefined} onClick={() => go(d.id)}>
            <span className="g" aria-hidden="true">{d.glyph}</span>{d.label}
          </button>
        ))}
      </nav>
    </>
  );
}
