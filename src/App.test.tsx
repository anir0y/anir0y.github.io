// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Three.js is dynamically imported by <Background>; stub it so tests stay headless.
vi.mock("./three/scene", () => ({ initScene: () => () => {}, webglSupported: () => false }));

beforeEach(() => {
  (globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  // deterministic geo lookup
  globalThis.fetch = vi.fn(async () => ({
    ok: true,
    json: async () => ({ ip: "1.2.3.4", is_vpn: false, is_tor: false, is_proxy: false, is_datacenter: false, is_abuser: false,
      company: { name: "Airtel" }, asn: { asn: 24560, org: "Bharti Airtel" },
      location: { city: "Pune", state: "Maharashtra", country: "India", country_code: "IN", timezone: "Asia/Kolkata" } }),
  })) as unknown as typeof fetch;
  // jsdom is missing these browser APIs the app touches
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).matchMedia = (q: string) => ({ matches: false, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } root = null; rootMargin = ""; thresholds = []; };
});

describe("App (full render smoke test)", () => {
  it("mounts and renders core content without throwing", async () => {
    const container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => { root.render(<App />); });
    const txt = container.textContent || "";
    expect(txt).toContain("Animesh");
    expect(txt).toContain("Security researcher");
    expect(txt).toContain("Featured Work");
    expect(txt).toContain("VISITOR"); // recon panel header
    expect(container.querySelector("#hero")).toBeTruthy();
    expect(container.querySelector("#contact")).toBeTruthy();
    expect(container.querySelectorAll("#projects .lab").length).toBe(5);
    expect(container.querySelectorAll("#training .module.scan").length).toBe(6);
    await act(async () => { root.unmount(); });
  });
});
