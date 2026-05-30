import { useEffect, useRef } from "react";

/**
 * Fixed full-viewport WebGL backdrop.
 * Three.js is dynamically imported so it loads as a separate chunk after
 * first paint, keeping the initial bundle small. Degrades to a CSS
 * gradient if WebGL is unavailable.
 */
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    const fail = () => {
      document.documentElement.classList.add("no-webgl");
      document.body.classList.add("no-webgl");
    };
    import("../three/scene")
      .then(({ initScene, webglSupported }) => {
        if (cancelled) return;
        if (!webglSupported() || !ref.current) { fail(); return; }
        try { cleanup = initScene(ref.current); } catch { fail(); }
      })
      .catch(fail);
    return () => { cancelled = true; cleanup(); };
  }, []);

  return <canvas id="bg" ref={ref} aria-hidden="true" />;
}
