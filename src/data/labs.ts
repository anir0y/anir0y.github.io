export interface Lab { name: string; desc: string; url: string; href: string; }
export const LABS: Lab[] = [
  { name: "Morse Code", desc: "Real-time translation, practice drills and audio playback.", url: "morse.anir0y.in", href: "https://morse.anir0y.in/" },
  { name: "OSI Packet Lab", desc: "Walk the OSI layers through live packet-analysis exercises.", url: "osi.anir0y.in", href: "https://osi.anir0y.in/" },
  { name: "Buffer Overflow", desc: "Memory-corruption fundamentals and exploitation technique.", url: "0x414141.anir0y.in", href: "https://0x414141.anir0y.in/" },
  { name: "DKIM Lab", desc: "Email authentication, replay attacks and defenses.", url: "lab-dkim.anir0y.in", href: "https://lab-dkim.anir0y.in/" },
];
