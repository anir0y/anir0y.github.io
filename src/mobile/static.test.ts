import { describe, it, expect } from "vitest";
import { renderMobileHtml } from "./static";
import { PROJECTS } from "../data/projects";
import { COURSES } from "../data/training";
import { LABS } from "../data/labs";
import { SERVICES } from "../data/services";
import { LINKS } from "../data/links";

describe("static phone edition", () => {
  const html = renderMobileHtml(2026);

  it("is plain markup: no scripts, no inline handlers, no web fonts", () => {
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/\son\w+=/i);
    expect(html).not.toMatch(/fonts\.googleapis/);
  });

  it("carries every project, course, service and lab from the shared data", () => {
    for (const p of PROJECTS) {
      expect(html).toContain(`href="${p.href}"`);
      if (p.extra) expect(html).toContain(`href="${p.extra.href}"`);
    }
    for (const c of COURSES) { expect(html).toContain(c.name); expect(html).toContain("Syllabus:"); }
    for (const s of SERVICES) expect(html).toContain(s.title.replace(/&/g, "&amp;"));
    for (const l of LABS) expect(html).toContain(`href="${l.href}"`);
  });

  it("keeps the desktop section ids so shared #hash links still land", () => {
    for (const id of ["about", "services", "training", "research", "projects", "contact"]) {
      expect(html).toContain(`<section id="${id}">`);
    }
  });

  it("offers contact, policies and a way back to the desktop site", () => {
    expect(html).toContain(`href="${LINKS.booking}"`);
    expect(html).toContain(LINKS.emailPlain);
    expect(html).toContain('href="/terms/"');
    expect(html).toContain('href="../?view=desktop"');
    expect(html).toContain("© 2026");
  });

  it("escapes text and opens only off-site links in a new tab", () => {
    expect(html).toContain("SOC Setup &amp; Managed SOC");
    expect(html).toContain('<a href="/product-phishnet">PhishNet</a>');
    expect(html).toMatch(/<a href="https:\/\/openhour\.me\/" target="_blank" rel="noopener noreferrer">OpenHour<\/a>/);
  });
});
