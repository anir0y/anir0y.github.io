export const ARSENAL: [string, string][] = [
  ["🐉", "Kali Linux"], ["🔍", "Burp Suite"], ["💉", "Metasploit"], ["⚔️", "Cobalt Strike"],
  ["🦈", "Wireshark"], ["🎯", "Nessus"], ["📊", "Splunk"], ["🛡️", "Wazuh"], ["📈", "Elastic"],
  ["📡", "RFID Tools"], ["🐍", "Python"], ["🐳", "Docker"], ["🏗️", "Terraform"], ["☁️", "AWS"],
  ["⚛️", "React"], ["📘", "TypeScript"],
];

/* Same tools, grouped by the job they do — used by the desktop toolkit strip. */
export const ARSENAL_GROUPS: { role: string; tools: string[] }[] = [
  { role: "Offense", tools: ["Kali Linux", "Burp Suite", "Metasploit", "Cobalt Strike", "Nessus", "RFID Tools"] },
  { role: "Detection", tools: ["Wireshark", "Splunk", "Wazuh", "Elastic"] },
  { role: "Infrastructure", tools: ["Docker", "Terraform", "AWS"] },
  { role: "Build", tools: ["Python", "React", "TypeScript"] },
];
