import { useEffect, useRef, useState } from "react";
const pad = (n: number) => String(n).padStart(2, "0");
export function useClock() {
  const start = useRef(Date.now());
  const [t, setT] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setT(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const d = new Date(t);
  const utc = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
  const local = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const s = Math.floor((t - start.current) / 1000);
  const uptime = `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  return { utc, local, uptime };
}
