# Multi-host / high-availability deployment

This site is a **static SPA** (`dist/` — no server, no database, no per-request state), which makes it
ideal for **active-active multi-CDN hosting**: ship the *same* build to several independent providers and
put a **health-checking steering layer** in front of one domain. If any provider has an incident, traffic
is served from another automatically.

> **On "100% uptime":** no provider or architecture can honestly guarantee a literal 100% — DNS, the
> registrar, and BGP are all outside any single host's control. What this setup *does* buy you is the removal
> of any single CDN as a point of failure, realistically targeting **~99.99%+ (four nines)**. Treat 100% as
> the design goal, not a promise.

```
                          anir0y.in  (one hostname)
                                │
                ┌───────────────┴───────────────┐
                │      Steering layer            │   health-checks /health.json on each origin,
                │  Cloudflare Load Balancer       │   serves the healthy one, fails over on error
                │      — or — Fastly edge          │
                └───────┬───────────────┬─────────┘
                        │               │
              ┌─────────▼──────┐ ┌──────▼──────────┐   (optional 3rd origin)
              │ Cloudflare      │ │ Netlify          │ ┌──────────────────┐
              │ Pages           │ │                  │ │ Fastly KV / origin│
              └─────────────────┘ └──────────────────┘ └──────────────────┘
                     identical dist/ on every origin (kept in sync by CI)
```

## The two pieces

### 1. Origins (identical static mirrors)

Deploy the **same `dist/`** to two or more of:

| Origin | Deploy command | Config in repo |
|---|---|---|
| **Cloudflare Pages** | `npm run deploy:cf` (`wrangler pages deploy dist --project-name anir0y`) | `wrangler.toml` |
| **Netlify** | `npm run deploy:netlify` (`netlify deploy --prod --dir dist`) | `netlify.toml` |
| **Fastly** (optional 3rd) | Fastly Compute static-publisher, or use Fastly purely as the steering edge below | see Fastly section |

Routing (`/* → /index.html`), security headers, and cache policy are shared via **`public/_redirects`** and
**`public/_headers`**, which both Cloudflare Pages and Netlify read from the publish directory — so every
mirror behaves identically from one source of truth.

CI (`.github/workflows/deploy.yml`) **builds once and deploys to all mirrors in parallel** on every push to
`main`, then verifies each origin's `/health.json` reports the new commit. Keeping mirrors on the same build
is what makes failover correct — never deploy to one host by hand.

### 2. Steering layer (the actual failover)

Pick **one**. Both poll `https://<origin>/health.json` (already emitted by the build) and fail over on a bad
response.

**Option A — Cloudflare Load Balancer (recommended, simplest if your DNS is on Cloudflare)**

1. DNS for `anir0y.in` on Cloudflare.
2. Traffic → Load Balancing → create a load balancer for `anir0y.in`.
3. Create **two origin pools**, each pointing at a mirror's hostname (the Pages `*.pages.dev` and the Netlify
   `*.netlify.app`, or custom subdomains like `cf.anir0y.in` / `nl.anir0y.in`).
4. Add a **health monitor**: `HTTPS GET /health.json`, expect `200`, interval 15–60s.
5. Steering: *Failover* (primary → secondary) or *Dynamic/least-latency* for active-active.

**Option B — Fastly as the edge (use this if you want Fastly in the path)**

Configure a Fastly service whose **backends are the two mirrors**, with health checks on `/health.json` and
automatic failover. Terraform sketch:

```hcl
resource "fastly_service_vcl" "anir0y" {
  name = "anir0y-multihost"
  domain { name = "anir0y.in" }

  healthcheck {
    name = "hc"; host = "anir0y.in"; path = "/health.json"
    expected_response = 200; threshold = 2; window = 5; check_interval = 15000
  }
  backend {                       # primary
    name = "cloudflare_pages"; address = "anir0y.pages.dev"
    port = 443; use_ssl = true; ssl_cert_hostname = "anir0y.pages.dev"
    healthcheck = "hc"; auto_loadbalance = true
  }
  backend {                       # secondary
    name = "netlify"; address = "anir0y.netlify.app"
    port = 443; use_ssl = true; ssl_cert_hostname = "anir0y.netlify.app"
    healthcheck = "hc"; auto_loadbalance = true
  }
}
```

> Fastly is a CDN/edge, not a git-push static host. Use it **in front of** the Pages/Netlify origins (above),
> or, to make Fastly itself an origin, publish `dist/` with the Fastly static-site Compute starter and add it
> as a third backend.

## Required secrets / variables (GitHub → repo settings)

| Name | Where | Purpose |
|---|---|---|
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Secrets | Cloudflare Pages deploy |
| `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID` | Secrets | Netlify deploy |
| `CF_URL`, `NETLIFY_URL` | Variables | Origin URLs the `verify` job health-checks |

Create accounts/projects and generate tokens yourself in each provider's dashboard — the pipeline only *uses*
them.

## Health check & sync verification

Every build writes **`/health.json`**:

```json
{ "app": "anir0y-secops", "status": "ok", "version": "3.0.0", "builtAt": "…", "commit": "<git sha>", "host": "…" }
```

The steering layer health-checks it; the CI `verify` job confirms each mirror's `commit` matches the push, so
you catch a stale or half-propagated mirror before it can serve old content during a failover.

## Failover test

1. In the Cloudflare LB (or Fastly), disable the primary pool/backend — the secondary should serve within one
   health-check interval with no visible change.
2. Or block `/health.json` on one origin and watch traffic shift.

## Runtime external dependencies (and how they degrade)

The **page itself is fully static** and stays up entirely from the CDN mirrors. Two features make *runtime*
third-party calls, both of which fail gracefully and never block the page:

- **Visitor Recon** (footer) calls `ipapi.is → ipwho.is → api.ipify.org`. If all are down it shows
  "uplink unavailable" — the rest of the site is unaffected.
- **Google Fonts** (`fonts.googleapis.com` / `fonts.gstatic.com`). For true zero-external-dependency
  rendering, **self-host the fonts** (e.g. `@fontsource/chakra-petch`, `@fontsource/space-grotesk`,
  `@fontsource/jetbrains-mono`) and drop the `<link>` + the `https://fonts.*` entries from the CSP. Recommended
  for a hardened build — ask and I'll switch it over.
