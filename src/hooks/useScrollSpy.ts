import { useEffect, useState } from "react";
export function useScrollSpy(ids: string[], rootMargin = "-45% 0px -50% 0px") {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids, rootMargin]);
  return active;
}
