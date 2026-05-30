/* Visitor recon: client-side IP intel + local environment fingerprint.
   Display-only — shown back to the visitor, never stored or transmitted. */

export interface ReconGeo {
  ip: string;
  city?: string; region?: string; country?: string; countryCode?: string; flag?: string;
  isp?: string; asn?: string; tz?: string;
  // anonymity intel (undefined = the source could not tell us)
  vpn?: boolean; tor?: boolean; proxy?: boolean; datacenter?: boolean; abuser?: boolean;
  source: string;
}
export interface ClientEnv {
  browser: string; os: string; device: string; screen: string; viewport: string;
  language: string; timezone: string; cores: string; memory: string; dnt: string;
}
export interface Anonymity { label: string; level: "clean" | "flagged" | "unknown"; }

export function parseUA(ua: string): { browser: string; os: string } {
  const u = ua || "";
  let os = "Unknown";
  if (/Windows NT 10/.test(u)) os = "Windows 10/11";
  else if (/Windows/.test(u)) os = "Windows";
  else if (/(iPhone|iPad|iPod)/.test(u)) os = "iOS"; // must precede "Mac OS X" (iOS UAs contain it)
  else if (/Mac OS X/.test(u)) os = "macOS";
  else if (/Android/.test(u)) os = "Android";
  else if (/CrOS/.test(u)) os = "ChromeOS";
  else if (/Linux/.test(u)) os = "Linux";
  let browser = "Unknown";
  if (/Edg\//.test(u)) browser = "Edge";
  else if (/OPR\/|Opera/.test(u)) browser = "Opera";
  else if (/Firefox\//.test(u)) browser = "Firefox";
  else if (/Chrome\//.test(u)) browser = "Chrome";
  else if (/Safari\//.test(u)) browser = "Safari";
  return { browser, os };
}

export function countryFlag(code?: string): string {
  if (!code || code.length !== 2 || !/^[A-Za-z]{2}$/.test(code)) return "";
  const base = 0x1f1e6;
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => base + c.charCodeAt(0) - 65));
}

/* primary source: ipapi.is — geo + ISP + VPN/Tor/proxy flags, CORS, no key */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeIpapiis(j: any): ReconGeo | null {
  if (!j || !j.ip) return null;
  const loc = j.location || {};
  return {
    ip: String(j.ip),
    city: loc.city || undefined,
    region: loc.state || undefined,
    country: loc.country || undefined,
    countryCode: loc.country_code || undefined,
    flag: countryFlag(loc.country_code),
    isp: (j.company && j.company.name) || (j.asn && j.asn.org) || undefined,
    asn: j.asn && j.asn.asn ? "AS" + j.asn.asn : undefined,
    tz: loc.timezone || undefined,
    vpn: !!j.is_vpn, tor: !!j.is_tor, proxy: !!j.is_proxy, datacenter: !!j.is_datacenter, abuser: !!j.is_abuser,
    source: "ipapi.is",
  };
}

/* fallback source: ipwho.is — geo + ISP, no anonymity flags */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeIpwho(j: any): ReconGeo | null {
  if (!j || j.success === false || !j.ip) return null;
  return {
    ip: String(j.ip),
    city: j.city || undefined,
    region: j.region || undefined,
    country: j.country || undefined,
    countryCode: j.country_code || undefined,
    flag: (j.flag && j.flag.emoji) || countryFlag(j.country_code),
    isp: (j.connection && (j.connection.isp || j.connection.org)) || undefined,
    asn: j.connection && j.connection.asn ? "AS" + j.connection.asn : undefined,
    tz: (j.timezone && j.timezone.id) || undefined,
    source: "ipwho.is",
  };
}

/** Summarise anonymity for display. undefined flags => the source couldn't tell. */
export function anonymity(g: ReconGeo | null): Anonymity {
  if (!g || g.vpn === undefined) return { label: "Unknown", level: "unknown" };
  const hits: string[] = [];
  if (g.tor) hits.push("Tor exit");
  if (g.vpn) hits.push("VPN");
  if (g.proxy) hits.push("Proxy");
  if (g.datacenter) hits.push("Datacenter");
  if (g.abuser) hits.push("Flagged abuser");
  return hits.length ? { label: hits.join(" · "), level: "flagged" } : { label: "Clean · residential", level: "clean" };
}

export async function fetchRecon(fetchImpl: typeof fetch = fetch): Promise<ReconGeo> {
  try {
    const r = await fetchImpl("https://api.ipapi.is/");
    if (r.ok) { const n = normalizeIpapiis(await r.json()); if (n) return n; }
  } catch { /* fall through */ }
  try {
    const r = await fetchImpl("https://ipwho.is/");
    if (r.ok) { const n = normalizeIpwho(await r.json()); if (n) return n; }
  } catch { /* fall through */ }
  try {
    const r = await fetchImpl("https://api.ipify.org?format=json");
    const j = await r.json();
    if (j && j.ip) return { ip: String(j.ip), source: "api.ipify.org" };
  } catch { /* fall through */ }
  return { ip: "unavailable", source: "offline" };
}

interface NavLike {
  userAgent?: string; language?: string; hardwareConcurrency?: number; maxTouchPoints?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connection?: any; deviceMemory?: number; doNotTrack?: string | null;
}
interface WinLike {
  navigator: NavLike; screen?: { width: number; height: number };
  innerWidth: number; innerHeight: number; devicePixelRatio?: number; doNotTrack?: string | null;
}

export function collectClientEnv(win: WinLike = window): ClientEnv {
  const nav = win.navigator;
  const { browser, os } = parseUA(nav.userAgent || "");
  const scr = win.screen;
  const dpr = win.devicePixelRatio || 1;
  const touch = (nav.maxTouchPoints || 0) > 0;
  let tz = "n/a";
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "n/a"; } catch { /* noop */ }
  return {
    browser, os,
    device: touch ? "Touch / mobile" : "Desktop",
    screen: scr ? `${scr.width}×${scr.height} @${dpr}x` : "n/a",
    viewport: `${win.innerWidth}×${win.innerHeight}`,
    language: nav.language || "n/a",
    timezone: tz,
    cores: nav.hardwareConcurrency ? nav.hardwareConcurrency + " cores" : "n/a",
    memory: nav.deviceMemory ? nav.deviceMemory + " GB" : "n/a",
    dnt: nav.doNotTrack === "1" || win.doNotTrack === "1" ? "enabled" : "off",
  };
}
