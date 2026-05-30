# anir0y // Security Operations Command — v3

A cinematic **Vite + React + TypeScript** portfolio for **Animesh Roy (anir0y)**.
Aesthetic: **Tactical Cyber-Noir** — deep obsidian, electric cyan data-lines, hazard-orange threat highlights.
A WebGL **Global Threat Map** (Three.js) renders behind layered glassmorphism, with a boot-time security
handshake, live telemetry, biometric-scan training unlocks, a ⌘K command palette, and a live **Visitor Recon**
panel that fingerprints the visitor's own connection — in their browser, shown only to them.

## Quick start

```bash
npm install      # first time only
npm run dev      # http://localhost:5173 (or: npm run dev -- --port 8009 --open)
```

Or just **double-click `start.command`** — it installs deps on first run and opens the dev server on
http://localhost:8009.

```bash
npm run build    # type-check + production bundle into dist/
npm run preview  # serve the production build on :8009
npm test         # run the unit + render test suite (Vitest)
npm run typecheck
```

## Stack

| Concern | Choice |
|---|---|
| Build / dev | **Vite 5** (esbuild dev, Rollup build) |
| UI | **React 18 + TypeScript** (strict) |
| 3D | **three** (r0.169) — dynamically imported, lazy `scene` chunk |
| Motion | **framer-motion** (reveals, palette, scroll progress) + **react-type-animation** |
| Type | **Chakra Petch** (tactical display titles) · Space Grotesk (body) · JetBrains Mono (HUD) |
| Tests | **Vitest** (+ jsdom for the render smoke test) |

## What's dynamic (the upgrade over the static build)

- **Visitor Recon panel** (footer) — live **IP, IP location** (city, region, country + flag), **ISP/ASN**,
  **timezone**, and a **VPN / Tor / Proxy / Datacenter** anonymity check (green = clean, amber = flagged),
  plus locally-derived **browser, OS, device and display**. IP intel comes from `ipapi.is` (VPN/Tor flags),
  falling back to `ipwho.is` then `api.ipify.org`, with a graceful "uplink unavailable" state. Everything is
  display-only: computed in the browser, shown back to the visitor, **never stored or transmitted**.
  Do-Not-Track is noted when enabled.
- **⌘K / Ctrl-K command palette** — fuzzy jump to any section or open any profile/booking link; full keyboard
  nav (↑ ↓ Enter Esc), or press `/`.
- **Scroll progress bar**, **live UTC + local clock**, and **session uptime** in the footer.
- **Typed hero tagline**, framer-motion blur-up reveals, animated stat counters, glitch-shimmer headings.
- All the cinematic pieces are preserved: boot handshake, telemetry stream, honeycomb shader floor, great-circle
  threat arcs, biometric training unlocks, orbital scroll-linked camera, pulsing logo kernel.

## Project layout

```
src/
├─ main.tsx                 # React entry
├─ App.tsx                  # composition + global ⌘K handler
├─ index.css                # Cyber-Noir design system (tokens + all component styles)
├─ three/scene.ts           # the entire WebGL scene (lazy-loaded)
├─ lib/
│  ├─ recon.ts              # IP/geo fetch + UA parsing + client fingerprint (pure, tested)
│  └─ recon.test.ts         # 22 unit tests
├─ hooks/                   # useVisitorRecon · useClock · useScrollSpy
├─ data/                    # services · training · research · projects · labs · arsenal · nav · links
├─ components/
│  ├─ Background.tsx        # canvas + lazy scene init + WebGL fallback
│  ├─ Chrome.tsx            # Boot · ScrollProgress · TelemetryStream · Nav · CommandPalette
│  ├─ Sections.tsx          # Hero · About · Arsenal · Services · Training · Research · Projects · Contact
│  └─ Footer.tsx            # Visitor Recon panel + clock + uptime
└─ App.test.tsx             # full-app render smoke test (jsdom)
public/                     # anir0y-logo.svg · favicon.svg  (served at site root)
legacy/                     # previous single-file build, archived for reference
```

## Testing (the Trinity: implementation · tests · docs)

```bash
npm test          # 23 tests: 22 pure-logic + 1 full <App/> render
npm run typecheck # strict tsc, zero errors
npm run build     # integration gate — tsc + bundle must both succeed
```

- `lib/recon.test.ts` covers UA parsing (incl. the iOS-contains-"Mac OS X" trap), country-flag mapping,
  `ipapi.is` + `ipwho.is` normalization, the VPN/Tor anonymity summary, the fetch fallback chain
  (ipapi.is → ipwho.is → ipify → offline), and the client-env fingerprint.
- `App.test.tsx` mounts the entire app in jsdom (WebGL + geo fetch mocked) and asserts the hero, about, projects,
  the 5 interactive labs, the 5 training modules, and the recon panel all render without throwing.

## Performance

The initial JS bundle is **~101 KB gzip**; Three.js is split into a separate **`scene` chunk (~125 KB gzip)**
loaded after first paint. DPR is capped, particle/arc counts drop on mobile, the render loop pauses on tab blur,
and everything honours `prefers-reduced-motion`.

## Deploying

Static output — host `dist/` anywhere. `base: './'` keeps paths relative, so it works on a root domain, a GitHub
Pages project path, Netlify, or Cloudflare Pages unchanged.

**High availability / multi-host:** the same `dist/` deploys to Cloudflare Pages **and** Netlify (and optionally
Fastly) behind a health-checked steering layer for active-active failover. CI (`.github/workflows/deploy.yml`)
builds once and pushes to every mirror in parallel, then verifies each `/health.json`. Full setup, the honest
uptime story, and the Fastly/Cloudflare-LB options are in **[MULTIHOST.md](MULTIHOST.md)**.

```bash
npm run build
# Netlify:          netlify deploy --dir dist --prod
# Cloudflare Pages: wrangler pages deploy dist --project-name anir0y
# GitHub Pages:     push dist/ (or use the existing gh-pages flow)
```

No env vars, no server. The Visitor Recon panel calls public IP APIs directly from the browser at runtime.

---

© Animesh Roy · anir0y.in — Tactical Cyber-Noir build. All offensive work conducted under explicit
authorization and scope.
