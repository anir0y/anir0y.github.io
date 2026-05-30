import { describe, it, expect, vi } from "vitest";
import { parseUA, countryFlag, normalizeIpwho, normalizeIpapiis, anonymity, collectClientEnv, fetchRecon } from "./recon";

describe("parseUA", () => {
  it("detects Chrome on Windows 10/11", () => {
    const r = parseUA("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36");
    expect(r.browser).toBe("Chrome"); expect(r.os).toBe("Windows 10/11");
  });
  it("detects Safari on macOS, not Chrome", () => {
    const r = parseUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15");
    expect(r.browser).toBe("Safari"); expect(r.os).toBe("macOS");
  });
  it("detects Edge ahead of Chrome token", () => { expect(parseUA("... Chrome/124.0 Safari/537.36 Edg/124.0").browser).toBe("Edge"); });
  it("detects Firefox on Linux", () => {
    const r = parseUA("Mozilla/5.0 (X11; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0");
    expect(r.browser).toBe("Firefox"); expect(r.os).toBe("Linux");
  });
  it("detects iOS (UA contains 'Mac OS X')", () => { expect(parseUA("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)").os).toBe("iOS"); });
  it("handles empty UA", () => { expect(parseUA("")).toEqual({ browser: "Unknown", os: "Unknown" }); });
});

describe("countryFlag", () => {
  it("maps IN to the India flag", () => { expect(countryFlag("IN")).toBe("🇮🇳"); });
  it("is case-insensitive", () => { expect(countryFlag("us")).toBe(countryFlag("US")); });
  it("returns empty on bad input", () => { expect(countryFlag("XYZ")).toBe(""); expect(countryFlag()).toBe(""); });
});

describe("normalizeIpapiis", () => {
  const payload = {
    ip: "1.2.3.4", is_vpn: true, is_tor: false, is_proxy: false, is_datacenter: true, is_abuser: false,
    company: { name: "Bharti Airtel Ltd." }, asn: { asn: 24560, org: "Bharti Airtel Limited" },
    location: { city: "Pune", state: "Maharashtra", country: "India", country_code: "IN", timezone: "Asia/Kolkata" },
  };
  it("maps geo, isp, asn and anonymity flags", () => {
    const n = normalizeIpapiis(payload);
    expect(n).toMatchObject({ ip: "1.2.3.4", city: "Pune", region: "Maharashtra", countryCode: "IN",
      isp: "Bharti Airtel Ltd.", asn: "AS24560", tz: "Asia/Kolkata", vpn: true, datacenter: true, tor: false, source: "ipapi.is" });
    expect(n?.flag).toBe("🇮🇳");
  });
  it("returns null without an ip", () => { expect(normalizeIpapiis({})).toBeNull(); expect(normalizeIpapiis(null)).toBeNull(); });
});

describe("normalizeIpwho (fallback, no anonymity)", () => {
  it("maps a full payload and leaves vpn undefined", () => {
    const n = normalizeIpwho({ ip: "9.9.9.9", success: true, city: "Pune", country_code: "IN", connection: { asn: 24560, isp: "Airtel" }, timezone: { id: "Asia/Kolkata" } });
    expect(n).toMatchObject({ ip: "9.9.9.9", city: "Pune", asn: "AS24560", source: "ipwho.is" });
    expect(n?.vpn).toBeUndefined();
  });
  it("returns null on failure payloads", () => { expect(normalizeIpwho({ success: false })).toBeNull(); });
});

describe("anonymity", () => {
  it("flags VPN + datacenter", () => {
    const a = anonymity({ ip: "1.1.1.1", vpn: true, tor: false, proxy: false, datacenter: true, abuser: false, source: "ipapi.is" });
    expect(a.level).toBe("flagged"); expect(a.label).toContain("VPN"); expect(a.label).toContain("Datacenter");
  });
  it("reports Tor exit first", () => {
    const a = anonymity({ ip: "1.1.1.1", vpn: false, tor: true, proxy: false, datacenter: false, abuser: false, source: "ipapi.is" });
    expect(a.label.startsWith("Tor exit")).toBe(true);
  });
  it("clean when all flags false", () => {
    expect(anonymity({ ip: "1.1.1.1", vpn: false, tor: false, proxy: false, datacenter: false, abuser: false, source: "ipapi.is" }).level).toBe("clean");
  });
  it("unknown when the source provided no flags", () => {
    expect(anonymity({ ip: "1.1.1.1", source: "ipwho.is" }).level).toBe("unknown");
    expect(anonymity(null).level).toBe("unknown");
  });
});

describe("fetchRecon (ipapi.is -> ipwho.is -> ipify)", () => {
  it("uses ipapi.is when it succeeds", async () => {
    const fake = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ip: "9.9.9.9", is_vpn: false, location: { country_code: "US" } }) }) as unknown as typeof fetch;
    const g = await fetchRecon(fake); expect(g.source).toBe("ipapi.is"); expect(g.ip).toBe("9.9.9.9");
  });
  it("falls back to ipwho.is when ipapi.is fails", async () => {
    const fake = vi.fn()
      .mockResolvedValueOnce({ ok: false, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ ip: "8.8.8.8", success: true }) }) as unknown as typeof fetch;
    const g = await fetchRecon(fake); expect(g.source).toBe("ipwho.is"); expect(g.ip).toBe("8.8.8.8");
  });
  it("falls back to ipify when both intel sources fail", async () => {
    const fake = vi.fn()
      .mockResolvedValueOnce({ ok: false, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: false, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ ip: "5.5.5.5" }) }) as unknown as typeof fetch;
    const g = await fetchRecon(fake); expect(g.source).toBe("api.ipify.org"); expect(g.ip).toBe("5.5.5.5");
  });
  it("degrades to 'unavailable' when everything fails", async () => {
    const fake = vi.fn().mockRejectedValue(new Error("network")) as unknown as typeof fetch;
    const g = await fetchRecon(fake); expect(g.ip).toBe("unavailable"); expect(g.source).toBe("offline");
  });
});

describe("collectClientEnv", () => {
  it("derives a clean environment from a window-like object", () => {
    const win = { navigator: { userAgent: "Mozilla/5.0 (Windows NT 10.0) Chrome/124.0", language: "en-US", hardwareConcurrency: 8, deviceMemory: 8, maxTouchPoints: 0 },
      screen: { width: 1920, height: 1080 }, innerWidth: 1440, innerHeight: 900, devicePixelRatio: 2 } as unknown as Window;
    const e = collectClientEnv(win);
    expect(e.browser).toBe("Chrome"); expect(e.os).toBe("Windows 10/11");
    expect(e.device).toBe("Desktop"); expect(e.screen).toBe("1920×1080 @2x"); expect(e.viewport).toBe("1440×900"); expect(e.cores).toBe("8 cores");
  });
});
