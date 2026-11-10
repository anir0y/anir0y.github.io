/* Phone edition: plain HTML text, generated at build time from the same data
   the desktop site uses, so the two never drift. No React, no scripts.
   vite.config.ts injects the result into m/index.html. */
import { LINKS } from "../data/links";
import { SERVICES } from "../data/services";
import { COURSES } from "../data/training";
import { RESEARCH } from "../data/research";
import { PROJECTS } from "../data/projects";
import { LABS } from "../data/labs";
import { ARSENAL_GROUPS } from "../data/arsenal";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Off-site links open in a new tab; same-site paths stay in this one. */
const link = (href: string, text: string) => {
  const external = /^https?:/.test(href);
  return `<a href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(text)}</a>`;
};
/** "view repo →" reads better as plain words in a text page. */
const plain = (label: string) => label.replace(/\s*→\s*$/, "");

export function renderMobileHtml(year: number = new Date().getFullYear()): string {
  const majors = PROJECTS.filter((p) => p.feature === "hero");
  const tools = PROJECTS.filter((p) => !p.feature);
  const more = PROJECTS.find((p) => p.feature === "more");

  const project = (p: (typeof PROJECTS)[number]) => `
      <li>
        <h3>${link(p.href, p.title)}</h3>
        <p class="kind">${esc(p.ix)}</p>
        <p>${esc(p.desc)}</p>${p.proof ? `\n        <p class="kind">${p.proof.map(esc).join(" · ")}</p>` : ""}
      </li>`;

  return `
<a class="skip" href="#about">Skip to content</a>
<header>
  <p class="kind">Independent security research practice · India / worldwide</p>
  <h1>Animesh Roy <span>@anir0y</span></h1>
  <p class="lede">Find the path before the adversary does.</p>
  <p>I pressure-test systems, map real attack paths, and stay through remediation. Offensive security with enough technical depth for the engineers, and enough clarity for the board.</p>
  <p class="actions">${link(LINKS.booking, "Book a working session")} ${link(LINKS.email, LINKS.emailPlain)}</p>
  <p class="kind">13+ years in security · 100+ assessments · 20+ open tools · taking select engagements</p>
  <nav aria-label="Sections">
    <a href="#about">About</a> <a href="#services">Services</a> <a href="#training">Training</a>
    <a href="#research">Research</a> <a href="#projects">Work</a> <a href="#contact">Contact</a>
  </nav>
</header>

<main>
  <section id="about">
    <h2>About</h2>
    <p>Security researcher and consultant. With a background spanning offensive security, threat intelligence, and cloud infrastructure, I bridge the gap between identifying risks and building defenses that actually work.</p>
    <p>Currently focused on red-teaming engagements, building interactive security labs for the community, and mentoring the next generation of security professionals. Founder of the Vapra Shiksha Foundation.</p>
    <h3>Working toolkit</h3>
    <dl>${ARSENAL_GROUPS.map((g) => `
      <dt>${esc(g.role)}</dt><dd>${g.tools.map(esc).join(", ")}</dd>`).join("")}
    </dl>
  </section>

  <section id="services">
    <h2>Services</h2>
    <ul>${SERVICES.map((s) => `
      <li>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
        <p class="kind">${s.tags.map(esc).join(" · ")}</p>
      </li>`).join("")}
    </ul>
  </section>

  <section id="training">
    <h2>Training</h2>
    <p>Hands-on courses and workshops drawn from real conference deliveries, run through ${link(LINKS.classroom, "classroom.anir0y.in")}.</p>
    <ul>${COURSES.map((c) => `
      <li>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.desc)}</p>
        <p class="kind">Syllabus: ${esc(c.reveal)}</p>
      </li>`).join("")}
    </ul>
  </section>

  <section id="research">
    <h2>Research</h2>
    <ul>${RESEARCH.map((n) => `
      <li>
        <h3>${n.href ? link(n.href, n.title) : esc(n.title)}</h3>
        <p>${esc(n.desc)}</p>
      </li>`).join("")}
    </ul>
  </section>

  <section id="projects">
    <h2>Work</h2>
    <ul>${majors.map(project).join("")}
    </ul>
    <h3 class="sub">Open tools</h3>
    <ul>${tools.map(project).join("")}
    </ul>${more ? `\n    <p>${esc(more.desc)} ${link(more.href, plain(more.go))}</p>` : ""}
    <h3 class="sub">Interactive labs</h3>
    <ul>${LABS.map((l) => `
      <li>
        <h3>${link(l.href, l.name)}</h3>
        <p>${esc(l.desc)}</p>
      </li>`).join("")}
    </ul>
  </section>

  <section id="contact">
    <h2>Contact</h2>
    <p>Available for security consulting, penetration testing, and collaboration. Scope an engagement, book a call, or just trade notes.</p>
    <p class="actions">${link(LINKS.booking, "Book on OpenHour")} ${link(LINKS.email, LINKS.emailPlain)}</p>
    <p class="links">${[
      link(LINKS.github, "GitHub"), link(LINKS.linkedin, "LinkedIn"), link(LINKS.x, "X @anir0y"),
      link(LINKS.youtube, "YouTube"), link(LINKS.classroom, "Classroom"),
    ].join(" ")}</p>
  </section>
</main>

<footer>
  <p>© ${year} Animesh Roy · Independent security research practice. All offensive work is conducted under explicit authorization and scope.</p>
  <p class="links"><a href="/terms/">Terms</a> <a href="/refund/">Refunds</a> <a href="/shipping/">Shipping</a> <a href="../?view=desktop">Full desktop site</a></p>
</footer>
`;
}
