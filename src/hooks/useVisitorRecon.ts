import { useEffect, useState } from "react";
import { fetchRecon, collectClientEnv, type ReconGeo, type ClientEnv } from "../lib/recon";
export type ReconStatus = "loading" | "ready" | "error";
export function useVisitorRecon() {
  const [geo, setGeo] = useState<ReconGeo | null>(null);
  const [env, setEnv] = useState<ClientEnv | null>(null);
  const [status, setStatus] = useState<ReconStatus>("loading");
  useEffect(() => {
    try { setEnv(collectClientEnv()); } catch { /* noop */ }
    let alive = true;
    fetchRecon()
      .then((g) => { if (alive) { setGeo(g); setStatus(g.ip === "unavailable" ? "error" : "ready"); } })
      .catch(() => { if (alive) setStatus("error"); });
    return () => { alive = false; };
  }, []);
  return { geo, env, status };
}
