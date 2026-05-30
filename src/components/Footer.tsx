import { useVisitorRecon } from "../hooks/useVisitorRecon";
import { useClock } from "../hooks/useClock";
import { anonymity } from "../lib/recon";
import { LINKS } from "../data/links";

type Tone = "clean" | "flagged" | "unknown" | undefined;

function Cell({ k, v, loading, tone }: { k: string; v?: string | null; loading?: boolean; tone?: Tone }) {
  const toneCls = tone === "clean" ? " clean" : tone === "flagged" ? " flag" : tone === "unknown" ? " dim" : "";
  return (
    <div className="rcell">
      <div className="rk">{k}</div>
      {loading ? <span className="rv skel" /> : <div className={"rv" + (v ? toneCls : " dim")}>{v || "n/a"}</div>}
    </div>
  );
}

export default function Footer() {
  const { geo, env, status } = useVisitorRecon();
  const { utc, local, uptime } = useClock();
  const year = new Date().getFullYear();
  const geoLoading = status === "loading";

  const location = geo
    ? [geo.city, geo.region, geo.country].filter(Boolean).join(", ") + (geo.flag ? " " + geo.flag : "")
    : "";
  const network = geo ? [geo.isp, geo.asn].filter(Boolean).join(" · ") : "";
  const anon = anonymity(geo);

  return (
    <footer>
      <div className="wrap">
        {/* ── Visitor Recon ──────────────────────────────────────────── */}
        <section className="recon" aria-label="Visitor recon" style={{ padding: 0, scrollMargin: 0 }}>
          <div className="recon-head">
            <span className={"rdot" + (status === "ready" ? " ok" : "")} />
            VISITOR&nbsp;RECON
            <span className="rspacer">{status === "ready" ? "lock acquired · " + (geo?.source ?? "") : status === "error" ? "uplink unavailable" : "scanning…"}</span>
          </div>
          <div className="recon-grid">
            <Cell k="IP Address" v={geo?.ip} loading={geoLoading} />
            <Cell k="IP Location" v={location} loading={geoLoading} />
            <Cell k="VPN / Tor / Proxy" v={anon.label} loading={geoLoading} tone={anon.level} />
            <Cell k="Network" v={network} loading={geoLoading} />
            <Cell k="Timezone" v={geo?.tz || env?.timezone} loading={geoLoading && !env} />
            <Cell k="Browser" v={env?.browser} />
            <Cell k="Operating System" v={env?.os} />
            <Cell k="Display" v={env ? `${env.screen} · ${env.viewport}` : ""} />
          </div>
          <div className="recon-note">
            ◈ Derived live in your browser and shown only to you. Nothing here is stored, logged, or sent anywhere.
            {env?.dnt === "enabled" ? " Do-Not-Track respected." : ""}
          </div>
        </section>

        {/* ── Footer line ────────────────────────────────────────────── */}
        <div className="foot">
          <div>© {year} ANIMESH ROY · <a href="https://anir0y.in/">anir0y.in</a> · built by a cat dad &amp; his cat 🐈‍⬛</div>
          <div className="legal">Tactical Cyber-Noir build. Visualizations are illustrative. All offensive work conducted under explicit authorization &amp; scope.</div>
          <div>
            {utc} UTC · LOCAL {local}<br />
            NODE · UPTIME <span style={{ color: "var(--green)" }}>{uptime}</span> ·{" "}
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">github</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
