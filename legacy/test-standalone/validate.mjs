#!/usr/bin/env node
/**
 * anir0y // Security Operations Command · static validation suite
 * ------------------------------------------------------------------
 * Zero-dependency, runs anywhere Node 16+ is available:
 *     node test/validate.mjs
 *
 * Parses index.html and asserts a battery of structural, content,
 * accessibility, security and quality invariants. Exits non-zero on
 * any failure so it can gate CI / pre-deploy.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = join(__dirname, '..', 'index.html');

let html;
try {
  html = readFileSync(FILE, 'utf8');
} catch (e) {
  console.error('FATAL: cannot read index.html →', e.message);
  process.exit(2);
}

const results = [];
const ok = (name) => results.push({ name, pass: true });
const fail = (name, detail) => results.push({ name, pass: false, detail });
function check(name, cond, detail) { cond ? ok(name) : fail(name, detail); }

const has = (re) => (re instanceof RegExp ? re.test(html) : html.includes(re));
const count = (re) => (html.match(re) || []).length;

/* ── 1. Document skeleton ─────────────────────────────────────────── */
check('doctype html', /^<!DOCTYPE html>/i.test(html.trim()), 'missing <!DOCTYPE html>');
check('lang attribute', /<html[^>]*\blang="en"/.test(html), 'html missing lang="en"');
check('utf-8 charset', /<meta charset="UTF-8"/i.test(html), 'missing charset');
check('responsive viewport', /name="viewport"[^>]*width=device-width/.test(html), 'missing responsive viewport');
check('single <head>', count(/<head>/gi) === 1, 'expected exactly one <head>');
check('single <body>', count(/<body>/gi) === 1, 'expected exactly one <body>');
check('balanced <section> tags', count(/<section\b/gi) === count(/<\/section>/gi), 'unbalanced section tags');
check('balanced <article> tags', count(/<article\b/gi) === count(/<\/article>/gi), 'unbalanced article tags');
check('balanced <script> tags', count(/<script\b/gi) === count(/<\/script>/gi), 'unbalanced script tags');

/* ── 2. SEO + social ──────────────────────────────────────────────── */
check('title tag present', /<title>[^<]{8,}<\/title>/.test(html), 'missing/empty <title>');
check('meta description', /name="description"[^>]*content="[^"]{40,}"/.test(html), 'description missing or too short');
check('canonical link', /rel="canonical"/.test(html), 'missing canonical');
check('Open Graph title', /property="og:title"/.test(html), 'missing og:title');
check('Twitter card', /name="twitter:card"/.test(html), 'missing twitter:card');
check('JSON-LD structured data', /application\/ld\+json/.test(html), 'missing schema.org JSON-LD');
check('theme-color', /name="theme-color"/.test(html), 'missing theme-color');
check('favicon defined', /rel="icon"/.test(html), 'missing favicon');

/* ── 3. Required sections (every nav target resolves) ─────────────── */
const SECTION_IDS = ['hero', 'about', 'arsenal', 'services', 'training', 'research', 'projects', 'contact'];
for (const id of SECTION_IDS) {
  check(`section #${id} exists`, new RegExp(`id="${id}"`).test(html), `missing section id="${id}"`);
}
// every in-page nav anchor must have a matching id
const anchors = [...html.matchAll(/href="#([a-zA-Z0-9_-]+)"/g)].map(m => m[1]);
const ids = new Set([...html.matchAll(/id="([a-zA-Z0-9_-]+)"/g)].map(m => m[1]));
const dangling = [...new Set(anchors)].filter(a => !ids.has(a));
check('no dangling in-page anchors', dangling.length === 0, 'unresolved anchors: ' + dangling.join(', '));

/* ── 4. Design tokens / palette (Cyber-Noir) ──────────────────────── */
check('obsidian background token', /--obsidian:\s*#05070a/i.test(html), 'obsidian token missing');
check('electric cyan token', /--cyan:\s*#00e5ff/i.test(html), 'cyan token missing');
check('hazard orange token', /--orange:\s*#ff7a18/i.test(html), 'orange token missing');
check('mono font loaded', /JetBrains\+Mono/.test(html), 'mono font not loaded');
check('display font loaded', /Space\+Grotesk/.test(html), 'display font not loaded');

/* ── 5. Signature experiences from the brief ──────────────────────── */
check('Three.js pinned (r128)', /three\.js\/r128\/three\.min\.js/.test(html), 'Three.js r128 not pinned');
check('WebGL canvas present', /<canvas id="bg"/.test(html), 'missing #bg canvas');
check('boot / security handshake', /id="boot"/.test(html) && /handshake/i.test(html), 'boot handshake missing');
check('telemetry stream', /id="stream"/.test(html), 'telemetry stream missing');
check('honeycomb shader floor', /hexCoords|hexDist/.test(html), 'hex grid shader missing');
check('great-circle arcs', /QuadraticBezierCurve3/.test(html), 'globe arcs missing');
check('biometric scan unlock', /biometric/i.test(html) && /unlocked/.test(html), 'biometric unlock missing');
check('glitch transition', /glitch/i.test(html), 'glitch effect missing');
check('scroll-linked camera (KF path)', /KF\s*=\s*\[/.test(html), 'camera keyframe path missing');
check('pulsing kernel logotype', /class="kernel"/.test(html) && /heartbeat/.test(html), 'kernel heartbeat missing');
check('glassmorphism panels', /backdrop-filter:\s*blur/.test(html), 'glassmorphism blur missing');

/* ── 6. Real, grounded content (no fabricated client/bounty claims) ─ */
check('name: Animesh Roy', /Animesh\s*&nbsp;?\s*Roy|Animesh Roy/.test(html), 'name missing');
check('handle: anir0y', /anir0y/.test(html), 'handle missing');
check('Vapra Shiksha Foundation', /Vapra Shiksha Foundation/.test(html), 'foundation reference missing');
check('classroom.anir0y.in linked', /classroom\.anir0y\.in/.test(html), 'classroom not linked');
check('contact email present', /mail@anir0y\.in/.test(html), 'email missing');
check('illustrative-map disclaimer', /illustrative/i.test(html), 'missing honesty disclaimer on the map');
check('NO fabricated bounty figures', !/\$\s?\d{3,}|bounty.*\$\d/i.test(html), 'possible fabricated bounty amount detected');
check('IEEE research paper linked', /ieeexplore\.ieee\.org\/document\/9668485/.test(html), 'IEEE paper link missing');
const REPOS = ['PCaptor','sentinel-dlp','crowdstrike-inventory','emailctl','offline-statement-tracker'];
for (const r of REPOS) check('project linked: ' + r, new RegExp('github\\.com/anir0y/' + r.replace(/[-]/g,'\\-')).test(html), 'missing repo link ' + r);
check('logo asset referenced', /anir0y-logo\.svg/.test(html), 'logo SVG not used');
check('favicon asset referenced', /favicon\.svg/.test(html), 'favicon SVG not used');
for (const f of ['assets/anir0y-logo.svg', 'assets/favicon.svg']) {
  let exists = true; try { readFileSync(join(__dirname, '..', f)); } catch { exists = false; }
  check('asset on disk: ' + f, exists, 'file not found');
}
check('Intel/classroom-notes section removed', !/id="intel"/.test(html) && !/Field notes from the/.test(html), 'stale Intel section still present');
/* parity with the live anir0y.github.io deployment */
check('About section + real headline', /id="about"/.test(html) && /Security researcher &amp; <em>consultant/.test(html), 'About section missing');
check('real stat: 100+ assessments', /data-count="100"/.test(html), '100+ assessments stat missing');
check('real stat: 20+ OSS projects', /data-count="20"/.test(html), '20+ projects stat missing');
check('Cat Dad voice present', /Cat Dad/i.test(html), 'personality line missing');
check('discipline pills', /class="pill"/.test(html), 'hero discipline pills missing');
check('tech arsenal marquee', /id="arsenal"/.test(html) && /class="marquee"/.test(html) && /Cobalt Strike/.test(html), 'arsenal marquee missing');
check('Book a Call CTA (Topmate)', /topmate\.io\/anir0y/.test(html) && /Book a Call/.test(html), 'Book a Call / Topmate missing');
check('X / Twitter linked', /x\.com\/anir0y/.test(html), 'X profile missing');
check('interactive labs strip', /Interactive Labs/.test(html) && /morse\.anir0y\.in/.test(html) && /osi\.anir0y\.in/.test(html) && /lab-dkim\.anir0y\.in/.test(html), 'interactive labs missing');
check('real projects (VWA/CANBus/IaC)', /hub\.docker\.com\/r\/anir0y\/vwa/.test(html) && /anir0y\/simulator/.test(html) && /IAC-C2/.test(html), 'real featured projects missing');
check('UX: skip link', /class="skip"/.test(html), 'skip-to-content link missing');
check('UX: focus-visible ring', /:focus-visible/.test(html), 'focus-visible styles missing');
check('UX: section scroll-margin', /scroll-margin-top/.test(html), 'anchor offset missing (nav would cover headings)');

/* ── 7. External links hygiene ────────────────────────────────────── */
const extLinks = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>/g)];
let httpsAllExt = true, relAllExt = true;
for (const m of extLinks) {
  const tag = m[0], url = m[1];
  if (!url.startsWith('https://')) httpsAllExt = false;
  if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag)) relAllExt = false;
}
check('all external links use https', httpsAllExt, 'a non-https external link exists');
check('blank-target links set rel=noopener', relAllExt, 'a _blank link is missing rel="noopener"');
check('real social profiles linked', /github\.com\/anir0y/.test(html) && /linkedin\.com\/in\/anir0y/.test(html) && /youtube\.com\/@anir0y/.test(html), 'social profiles incomplete');

/* ── 8. Accessibility ─────────────────────────────────────────────── */
check('decorative canvas aria-hidden', /<canvas id="bg"[^>]*aria-hidden="true"/.test(html), 'canvas not aria-hidden');
check('burger has aria-label', /id="burger"[^>]*aria-label/.test(html), 'menu button missing aria-label');
check('burger has aria-expanded', /id="burger"[^>]*aria-expanded/.test(html), 'menu button missing aria-expanded');
check('training modules keyboard-focusable', /class="module scan"[^>]*tabindex="0"|tabindex="0"[^>]*aria-label/.test(html) || /tabindex=\\?'0\\?'/.test(html) || /tabindex="0"/.test(html), 'training modules not focusable');
check('prefers-reduced-motion respected', /prefers-reduced-motion/.test(html), 'no reduced-motion handling');

/* ── 9. Robustness / graceful degradation ─────────────────────────── */
check('WebGL feature detection', /webglOK|WebGLRenderingContext/.test(html), 'no WebGL detection');
check('no-webgl fallback styling', /no-webgl/.test(html), 'no fallback path for missing WebGL');
check('resize handler', /addEventListener\('resize'/.test(html), 'no resize handler');
check('pause on tab hidden', /visibilitychange/.test(html), 'render loop not paused when hidden');
check('devicePixelRatio capped', /setPixelRatio\(Math\.min/.test(html), 'DPR not capped (perf risk)');
check('boot screen has hard timeout', /boot.*classList.add\('done'\)/s.test(html) && /4200|setTimeout/.test(html), 'boot could trap user');
check('shader floor has fallback', /GridHelper/.test(html), 'no fallback if shader fails to compile');

/* ── 10. Quality gates ────────────────────────────────────────────── */
check('no TODO / FIXME left', !/\b(TODO|FIXME|XXX)\b/.test(html), 'placeholder marker found');
check('no lorem ipsum', !/lorem ipsum/i.test(html), 'lorem ipsum found');
check('no localStorage/sessionStorage', !/localStorage|sessionStorage/.test(html), 'browser storage used (forbidden)');
check('no console.log noise', !/console\.log\(/.test(html), 'stray console.log');
check('strict mode in script', /"use strict"/.test(html), 'script not in strict mode');
check('reasonable size (<160KB)', Buffer.byteLength(html, 'utf8') < 160 * 1024, 'file unexpectedly large');

/* ── Report ───────────────────────────────────────────────────────── */
const pass = results.filter(r => r.pass).length;
const total = results.length;
const failed = results.filter(r => !r.pass);

const C = { g: '\x1b[32m', r: '\x1b[31m', c: '\x1b[36m', d: '\x1b[2m', x: '\x1b[0m', b: '\x1b[1m' };
console.log(`\n${C.c}${C.b}  anir0y // SECOPS · static validation suite${C.x}`);
console.log(`${C.d}  target: index.html  ·  ${(Buffer.byteLength(html,'utf8')/1024).toFixed(1)} KB${C.x}\n`);
for (const r of results) {
  console.log(`  ${r.pass ? C.g + '✔' : C.r + '✘'}${C.x}  ${r.name}${r.pass ? '' : C.r + '  -> ' + r.detail + C.x}`);
}
console.log(`\n  ${pass === total ? C.g : C.r}${C.b}${pass}/${total} checks passed${C.x}`);
if (failed.length) {
  console.log(`\n${C.r}  FAILED:${C.x}`);
  failed.forEach(f => console.log(`   - ${f.name}: ${f.detail}`));
  process.exit(1);
}
console.log(`${C.g}${C.b}  ALL CHECKS GREEN · cleared for deploy.${C.x}\n`);
process.exit(0);
