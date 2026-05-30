export interface ResearchNode { title: string; desc: string; meta: string; live: boolean; href?: string; }
export const RESEARCH: ResearchNode[] = [
  { title: "Evading Malware Analysis Using Reverse Execution", live: true,
    href: "https://ieeexplore.ieee.org/document/9668485/",
    desc: "Published IEEE research: single-step reverse execution via the self-debugging feature, and how it lets a payload slip past analysis.",
    meta: "PUBLICATION · IEEE Xplore · read paper →" },
  { title: "RF Hacking: Mifare, NFC, RFID", live: true,
    desc: "Cloning, replay and downgrade research across contactless and proximity cards, plus sub-GHz capture and analysis.",
    meta: "VECTOR · rf · contactless · sdr" },
  { title: "Hackable Hardware Kits", live: false,
    desc: "Building open, intentionally vulnerable hardware kits: a physical range for learning firmware, bus and fault-injection attacks hands-on.",
    meta: "VECTOR · hardware · firmware · education" },
];
