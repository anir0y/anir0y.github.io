// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import MobileApp from "./MobileApp";

beforeEach(() => {
  (globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  window.location.hash = "";
  // deterministic geo lookup
  globalThis.fetch = vi.fn(async () => ({
    ok: true,
    json: async () => ({ ip: "1.2.3.4", is_vpn: false, is_tor: false, is_proxy: false, is_datacenter: false, is_abuser: false,
      company: { name: "Airtel" }, asn: { asn: 24560, org: "Bharti Airtel" },
      location: { city: "Pune", state: "Maharashtra", country: "India", country_code: "IN", timezone: "Asia/Kolkata" } }),
  })) as unknown as typeof fetch;
  // jsdom is missing these browser APIs the app touches
  window.scrollTo = vi.fn();
});

async function mount() {
  const container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => { root.render(<MobileApp />); });
  return { container, root };
}

describe("MobileApp (field unit smoke test)", () => {
  it("mounts on the home panel and renders core content", async () => {
    const { container, root } = await mount();
    const txt = container.textContent || "";
    expect(txt).toContain("Animesh Roy");
    expect(txt).toContain("mission log");
    expect(txt).toContain("Operator Profile");
    expect(container.querySelectorAll(".deck button").length).toBe(5);
    expect(container.querySelectorAll(".chip").length).toBe(16);
    // only the home panel is visible
    const panels = container.querySelectorAll("main > div");
    expect(panels.length).toBe(5);
    expect(panels[0].hasAttribute("hidden")).toBe(false);
    expect(panels[1].hasAttribute("hidden")).toBe(true);
    await act(async () => { root.unmount(); });
  });

  it("switches panels from the command deck and syncs the hash", async () => {
    const { container, root } = await mount();
    const deck = container.querySelectorAll<HTMLButtonElement>(".deck button");
    await act(async () => { deck[1].click(); });
    const panels = container.querySelectorAll("main > div");
    expect(panels[0].hasAttribute("hidden")).toBe(true);
    expect(panels[1].hasAttribute("hidden")).toBe(false);
    expect(window.location.hash).toBe("#services");
    expect(deck[1].getAttribute("aria-current")).toBe("page");
    // services accordion: first module open by default, tapping another swaps instantly
    const heads = container.querySelectorAll<HTMLButtonElement>(".acc-head");
    expect(heads.length).toBe(4);
    expect(heads[0].getAttribute("aria-expanded")).toBe("true");
    await act(async () => { heads[2].click(); });
    expect(heads[0].getAttribute("aria-expanded")).toBe("false");
    expect(heads[2].getAttribute("aria-expanded")).toBe("true");
    await act(async () => { root.unmount(); });
  });

  it("unlocks a training card on tap and reveals the syllabus", async () => {
    window.location.hash = "#training";
    const { container, root } = await mount();
    const cards = container.querySelectorAll(".trn");
    expect(cards.length).toBe(6);
    const btn = cards[0].querySelector<HTMLButtonElement>(".trn-btn")!;
    expect(cards[0].textContent).toContain("TAP TO AUTHENTICATE");
    expect(cards[0].textContent).not.toContain("Kill-chain labs");
    await act(async () => { btn.click(); });
    expect(cards[0].textContent).toContain("ACCESS GRANTED");
    expect(cards[0].textContent).toContain("Kill-chain labs");
    await act(async () => { root.unmount(); });
  });

  it("maps desktop section hashes onto the right panels", async () => {
    window.location.hash = "#research";
    const { container, root } = await mount();
    const panels = container.querySelectorAll("main > div");
    expect(panels[3].hasAttribute("hidden")).toBe(false); // intel panel
    expect(container.querySelectorAll(".node").length).toBe(3 + 9 + 5); // research + projects + labs
    await act(async () => { root.unmount(); });
  });
});
