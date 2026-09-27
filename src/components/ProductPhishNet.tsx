import { useEffect } from "react";
import "../phishnet.css";
import "../standalone.css";

const PITCH_DECK = "https://gamma.app/docs-robot/y02yokagvnyp8as";

const PIPELINE = [
  ["01", "Reported", "Gmail poller and add-on intake preserve the original message."],
  ["02", "Parsed", "Headers, URLs, domains, IPs, hashes, attachments, and QR codes become evidence."],
  ["03", "Enriched", "Reputation providers, YARA, and authentication signals add context."],
  ["04", "Detonated", "Risk-driven Docker and browser sandboxes observe suspicious content safely."],
  ["05", "Decided", "An explainable verdict, analyst controls, alerts, and reporter response close the loop."],
];

const OPERATIONS = [
  { label: "Triage", title: "One inbox, evidence attached", text: "Filter every report by severity, status, reporter, date, greymail, classification, and threat score. Analysts see the reasoning—not just a label." },
  { label: "Detection", title: "Layered analysis, not one black box", text: "SPF, DKIM, DMARC, IOC enrichment, YARA rules, LLM classification, and sandbox feedback contribute to a transparent score." },
  { label: "Response", title: "Automation with human control", text: "Auto-close safe reports, acknowledge users, escalate high-risk findings, override verdicts, and retain the original machine decision for accuracy tracking." },
  { label: "Operations", title: "Built for the SOC around it", text: "Campaign clustering, bulk triage, audit logs, health monitoring, Slack or Teams alerts, and a growing knowledge base keep the workflow operational." },
];

export default function ProductPhishNet() {
  useEffect(() => {
    const previous = document.title;
    document.title = "PhishNet — Explainable Email Threat Intelligence · anir0y";
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="pn-root">
      <header className="pn-nav">
        <a className="pn-brand standalone-brand" href="/" aria-label="anir0y home"><img className="standalone-mark" src="/anir0y-logo.svg" alt="" /><span>anir0y<em>.in</em><small>security ops command</small></span></a>
        <nav aria-label="PhishNet sections">
          <a href="#pipeline">Pipeline</a>
          <a href="#operations">Operations</a>
          <a href="#screens">Screens</a>
        </nav>
        <a className="pn-nav-cta" href={PITCH_DECK} target="_blank" rel="noopener noreferrer">Pitch deck</a>
      </header>

      <main>
        <section className="pn-hero" id="top">
          <div className="pn-hero-copy">
            <div className="pn-status"><span /> Production deployment · XBP Global Holdings Inc.</div>
            <p className="pn-kicker">PhishNet / anti-phishing operations</p>
            <h1>Every reported email becomes a defensible decision.</h1>
            <p className="pn-lead">Turn every reported email into explainable, actionable threat intelligence. PhishNet joins automated analysis, sandbox evidence, analyst review, and user response in one operating loop.</p>
            <div className="pn-actions">
              <a className="pn-btn primary" href="#pipeline">See how it works</a>
              <a className="pn-btn secondary" href={PITCH_DECK} target="_blank" rel="noopener noreferrer">Open pitch deck</a>
            </div>
            <div className="pn-skills" aria-label="Skills"><span>SIEM</span><span>Anti-phishing</span><span>Email security</span><span>Threat intelligence</span></div>
          </div>
          <figure className="pn-hero-frame">
            <div className="pn-windowbar"><span /><span /><span /><b>phishnet / dashboard</b></div>
            <img src="/products/phishnet/dashboard.jpg" alt="PhishNet dashboard showing email threat volume, triage metrics, automation outcomes, and threat breakdown" />
            <figcaption>Current production interface · sanitized overview</figcaption>
          </figure>
        </section>

        <section className="pn-pipeline" id="pipeline" aria-labelledby="pipeline-title">
          <div className="pn-section-head"><p>From signal to response</p><h2 id="pipeline-title">A single traceable investigation path.</h2></div>
          <ol>
            {PIPELINE.map(([number, title, text]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}
          </ol>
        </section>

        <section className="pn-operations" id="operations" aria-labelledby="operations-title">
          <div className="pn-section-head"><p>Analyst operating layer</p><h2 id="operations-title">Automation that shows its work.</h2><div>PhishNet is designed for the moment after an employee clicks “report”: collect the evidence, reduce repetitive triage, and leave a reviewable record.</div></div>
          <div className="pn-op-list">
            {OPERATIONS.map((item) => <article key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        <section className="pn-screens" id="screens" aria-labelledby="screens-title">
          <div className="pn-section-head"><p>Product evidence</p><h2 id="screens-title">The queue and the wider operation.</h2></div>
          <figure className="pn-screen-wide">
            <img src="/products/phishnet/inbox.jpg" alt="PhishNet inbox with report filters, severity scores, classifications, automatic verdicts, and processing status" loading="lazy" />
            <figcaption><b>Inbox</b><span>Filterable reports with severity, score, classification, automated action, status, and timestamps.</span></figcaption>
          </figure>
          <div className="pn-screen-notes">
            <p><b>Explainable by design.</b> Each outcome connects back to authentication results, extracted IOCs, reputation, rules, model reasoning, and sandbox observations.</p>
            <p><b>Feedback becomes signal.</b> Analyst overrides, false-positive labels, and campaign relationships improve future decisions without erasing the original verdict.</p>
          </div>
        </section>

        <section className="pn-close">
          <p>Security Information and Event Management · Anti-phishing</p>
          <h2>Built for the mailbox users already trust—and the analysts behind it.</h2>
          <a className="pn-btn primary" href={PITCH_DECK} target="_blank" rel="noopener noreferrer">View the PhishNet pitch deck</a>
        </section>
      </main>

      <footer className="pn-footer"><span>© {new Date().getFullYear()} Animesh Roy</span><a href="/">Back to anir0y.in</a></footer>
    </div>
  );
}
