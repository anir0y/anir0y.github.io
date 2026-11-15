/* Published CVEs that credit Animesh Roy (anir0y) as reporter or finder.
   Score and severity come from the CVE.org record; href points at the page
   that carries the credit (GitHub advisory, or CVE.org where GitHub has none). */
/* Bug classes, in the order the scope lays its sectors out (clockwise from the top). */
export const CVE_KINDS = ["Command execution", "Access control", "Denial of service", "Disclosure", "Request forgery"] as const;
export interface Cve { id: string; project: string; title: string; cvss: number; severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"; kind: (typeof CVE_KINDS)[number]; href: string; }
export const CVES: Cve[] = [
  { id: "CVE-2026-55173", project: "WWBN/AVideo", cvss: 8.1, severity: "HIGH", kind: "Command execution",
    title: "OS command injection through a single & in sanitizeFFmpegCommand (incomplete fix of CVE-2026-33482)",
    href: "https://github.com/advisories/GHSA-wc3f-xc32-435f" },
  { id: "CVE-2026-102827", project: "steveukx/git-js", cvss: 8.1, severity: "HIGH", kind: "Command execution",
    title: "simple-git unsafe-operations plugin bypass via git long-option abbreviation, leading to command execution",
    href: "https://github.com/advisories/GHSA-858h-whjf-mvg5" },
  { id: "CVE-2026-54719", project: "goshs-labs/goshs", cvss: 7.5, severity: "HIGH", kind: "Access control",
    title: "Unauthenticated read past .goshs folder ACLs through the bulk zip-download route",
    href: "https://github.com/advisories/GHSA-rmxw-pq4x-3fvh" },
  { id: "CVE-2026-110931", project: "keycloak/keycloak", cvss: 7.5, severity: "HIGH", kind: "Denial of service",
    title: "Unauthenticated JVM termination via a SAML 1.1 AuthorityBinding parsing loop",
    href: "https://www.cve.org/CVERecord?id=CVE-2026-110931" },
  { id: "CVE-2026-107602", project: "keycloak/keycloak", cvss: 7.5, severity: "HIGH", kind: "Denial of service",
    title: "Unauthenticated CPU exhaustion via a SAML 1.1 KeyInfo infinite loop",
    href: "https://www.cve.org/CVERecord?id=CVE-2026-107602" },
  { id: "CVE-2026-55190", project: "eventschedule/eventschedule", cvss: 6.5, severity: "MEDIUM", kind: "Request forgery",
    title: "SSRF on event import: isUrlSafe() bypass with bracketed IPv6 literals",
    href: "https://github.com/eventschedule/eventschedule/security/advisories/GHSA-664j-55hw-p8fm" },
  { id: "CVE-2026-55098", project: "Basekick-Labs/arc", cvss: 6.5, severity: "MEDIUM", kind: "Access control",
    title: "Cross-database RBAC bypass through DuckDB I/O function aliases",
    href: "https://github.com/advisories/GHSA-93cm-2v4m-c56c" },
  { id: "CVE-2026-69153", project: "postcss/postcss", cvss: 6.3, severity: "MEDIUM", kind: "Disclosure",
    title: "Arbitrary .map file read via attacker-controlled sourceMappingURL when from is unset",
    href: "https://github.com/advisories/GHSA-fxqj-rqcc-2cmp" },
  { id: "CVE-2026-89298", project: "keycloak/keycloak", cvss: 4.9, severity: "MEDIUM", kind: "Disclosure",
    title: "Confidential client secret disclosed to the view-clients role via client registration",
    href: "https://www.cve.org/CVERecord?id=CVE-2026-89298" },
  { id: "CVE-2026-55774", project: "openbao/openbao", cvss: 2.1, severity: "LOW", kind: "Access control",
    title: "Cross-namespace lease revocation through sys/leases/revoke",
    href: "https://github.com/advisories/GHSA-c36x-h252-g9x2" },
];
