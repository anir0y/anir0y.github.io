export interface Service { id: string; idx: string; title: string; desc: string; tags: string[]; }
export const SERVICES: Service[] = [
  { id: "risk", idx: "MOD_01", title: "Organisational Risk Assessment",
    desc: "A full review of your security posture across assets, threats, exposure and likelihood, written up as a prioritised risk register your board can read.",
    tags: ["Threat Modelling", "Risk Register", "Prioritisation"] },
  { id: "redteam", idx: "MOD_02", title: "Red Teaming",
    desc: "Adversary emulation against your people, process and technology. I work from initial access through lateral movement to objective-led post-exploitation, and I test what your detection actually catches.",
    tags: ["Adversary Emulation", "Lateral Movement", "Evasion"] },
  { id: "gap", idx: "MOD_03", title: "Gap Analysis",
    desc: "I measure your controls against a target framework, surface the gaps, and hand back a concrete roadmap from where you are to where you need to be.",
    tags: ["Controls", "Frameworks", "Roadmap"] },
  { id: "soc", idx: "MOD_04", title: "SOC Setup & Managed SOC",
    desc: "Stand up a security operations centre with the tooling, detections, playbooks and triage to run it. Or hand me the watch: ongoing monitoring, detection engineering and response.",
    tags: ["SIEM", "Detections", "Playbooks", "Response"] },
];
