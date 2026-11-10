import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * EmblemCanvas — the tool map's emblem, drawn in WebGL as a field of points.
 *
 * Each emblem's line art is sampled into N points. The points shimmer slightly,
 * a soft light band sweeps across every few seconds, and when `active` changes
 * they scatter and re-form into the next emblem.
 *
 * One canvas and one GL context serve every emblem. The loop only runs while
 * the canvas is on screen and the tab is visible. With reduced motion, or
 * without WebGL, the static SVG emblem is shown instead.
 *
 * `remote` adds emblems loaded from SVG files (e.g. the site logo), keyed like
 * `arts`. `fit` scales every emblem to the same extent, for sets drawn at
 * different sizes.
 */

const N = 1800;
const MORPH_MS = 900;

const VERT = `
attribute vec2 aFrom; attribute vec2 aTo;
attribute float aAccFrom; attribute float aAccTo; attribute float aSeed;
uniform float uT; uniform float uTime; uniform vec2 uScale; uniform float uSize;
varying float vAcc; varying float vGlow;
void main() {
  float e = uT * uT * (3.0 - 2.0 * uT);
  vec2 p = mix(aFrom, aTo, e);
  float ang = aSeed * 43.98;
  float burst = sin(3.14159 * uT);
  p += vec2(cos(ang), sin(ang)) * burst * (0.1 + 0.32 * fract(aSeed * 7.13));
  p += 0.006 * vec2(sin(uTime * 1.3 + aSeed * 40.0), cos(uTime * 1.1 + aSeed * 31.0));
  float sweep = mod(uTime * 0.35, 3.6) - 1.8;
  float band = exp(-pow((p.x + p.y * 0.35 - sweep) / 0.2, 2.0));
  vAcc = mix(aAccFrom, aAccTo, e);
  vGlow = 0.62 + 0.2 * sin(uTime * 2.0 + aSeed * 50.0) + 0.7 * band;
  gl_Position = vec4(p * uScale, 0.0, 1.0);
  gl_PointSize = uSize * (0.8 + 0.5 * fract(aSeed * 3.7) + 0.6 * band);
}`;

const FRAG = `
precision mediump float;
varying float vAcc; varying float vGlow;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.1, d) * vGlow * 0.8;
  vec3 col = mix(vec3(0.608, 0.694, 1.0), vec3(0.557, 0.965, 0.812), vAcc);
  gl_FragColor = vec4(col * a, a);
}`;

interface Cloud { pos: Float32Array; acc: Float32Array }

/** Deterministic shuffle order, shared by every emblem so morphs look like a swarm, not a wipe. */
function permutation(n: number): Uint32Array {
  const out = new Uint32Array(n);
  for (let i = 0; i < n; i++) out[i] = i;
  let s = 0x9e3779b9;
  for (let i = n - 1; i > 0; i--) {
    s = (Math.imul(s ^ (s >>> 15), 0x2c1b3c6d) + 0x1b873593) | 0;
    const j = (s >>> 0) % (i + 1);
    const t = out[i]; out[i] = out[j]; out[j] = t;
  }
  return out;
}

/** An element's own transform composed with its ancestors', up to the <svg>. */
function matrixOf(el: SVGGraphicsElement, root: SVGSVGElement): [number, number, number, number, number, number] {
  let m: [number, number, number, number, number, number] = [1, 0, 0, 1, 0, 0];
  for (let node: Element | null = el; node && node !== root; node = node.parentElement) {
    const t = (node as SVGGraphicsElement).transform?.baseVal?.consolidate()?.matrix;
    if (t) m = [t.a * m[0] + t.c * m[1], t.b * m[0] + t.d * m[1], t.a * m[2] + t.c * m[3], t.b * m[2] + t.d * m[3], t.a * m[4] + t.c * m[5] + t.e, t.b * m[4] + t.d * m[5] + t.f];
  }
  return m;
}

/** Sample an emblem's strokes into N points in [-1, 1] space (y up). */
function sample(svg: SVGSVGElement, perm: Uint32Array, fit: boolean): Cloud | null {
  const els = Array.from(svg.querySelectorAll<SVGGeometryElement>("path, rect, circle"))
    .filter((el) => typeof el.getTotalLength === "function");
  const lens = els.map((el) => el.getTotalLength());
  const total = lens.reduce((a, b) => a + b, 0);
  if (!els.length || !(total > 0)) return null;

  const vb = svg.viewBox.baseVal;
  const bx = vb && vb.width ? vb.x : 0, by = vb && vb.height ? vb.y : 0;
  const bw = vb && vb.width ? vb.width : 120, bh = vb && vb.height ? vb.height : 120;

  const xs: number[] = [], ys: number[] = [], as: number[] = [];
  els.forEach((el, k) => {
    const count = Math.max(2, Math.round((N * lens[k]) / total));
    const accent = el.classList.contains("a") ? 1 : 0;
    const m = matrixOf(el, svg);
    for (let j = 0; j < count; j++) {
      const pt = el.getPointAtLength((lens[k] * j) / (count - 1));
      const x = m[0] * pt.x + m[2] * pt.y + m[4], y = m[1] * pt.x + m[3] * pt.y + m[5];
      xs.push(((x - bx) / bw) * 2 - 1); ys.push(-(((y - by) / bh) * 2 - 1)); as.push(accent);
    }
  });

  if (fit) {
    // Centre on the drawing's bounds and scale its longer side to a common extent.
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (let i = 0; i < xs.length; i++) { x0 = Math.min(x0, xs[i]); x1 = Math.max(x1, xs[i]); y0 = Math.min(y0, ys[i]); y1 = Math.max(y1, ys[i]); }
    const k = 1.64 / Math.max(x1 - x0, y1 - y0, 1e-6), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    for (let i = 0; i < xs.length; i++) { xs[i] = (xs[i] - cx) * k; ys[i] = (ys[i] - cy) * k; }
  }

  const pos = new Float32Array(N * 2), acc = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const src = Math.min(xs.length - 1, Math.floor((i * xs.length) / N));
    const dst = perm[i];
    pos[dst * 2] = xs[src]; pos[dst * 2 + 1] = ys[src]; acc[dst] = as[src];
  }
  return { pos, acc };
}

const SVG_NS = "http://www.w3.org/2000/svg";

/** Fetch an SVG file and mount an unrendered copy of its shapes for sampling. */
async function loadRemote(host: HTMLElement, key: string, url: string): Promise<void> {
  if (host.querySelector(`svg[data-art="${key}"]`)) return;
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const doc = new DOMParser().parseFromString(await res.text(), "image/svg+xml");
    const src = doc.documentElement;
    if (!src || src.nodeName !== "svg" || host.querySelector(`svg[data-art="${key}"]`)) return;
    const svg = document.createElementNS(SVG_NS, "svg");
    const w = parseFloat(src.getAttribute("width") || "") || 120, h = parseFloat(src.getAttribute("height") || "") || 120;
    svg.setAttribute("viewBox", src.getAttribute("viewBox") || `0 0 ${w} ${h}`);
    svg.dataset.art = key;
    Array.from(src.children).forEach((child) => svg.appendChild(document.importNode(child, true)));
    host.appendChild(svg);
  } catch { /* the emblem is optional; fall back to whatever else is available */ }
}

interface EmblemProps {
  arts: Record<string, ReactNode>;
  active: string;
  /** viewBox size the `arts` are drawn in. */
  box?: number;
  /** Extra emblems loaded from SVG files: key -> url. */
  remote?: Record<string, string>;
  /** Emblem half-extent as a fraction of the canvas's shorter side. */
  scale?: number;
  fit?: boolean;
  /** Start scattered and assemble into the first emblem, instead of appearing formed. */
  assemble?: boolean;
  className?: string;
}

export default function EmblemCanvas({ arts, active, box = 120, remote, scale = 0.45, fit = false, assemble = false, className = "mm-art" }: EmblemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourcesRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(active);
  const morphRef = useRef<((key: string) => void) | null>(null);
  const [live, setLive] = useState(false);

  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current, sources = sourcesRef.current;
    if (!canvas || !sources) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let gl: WebGLRenderingContext | null = null;
    try { gl = canvas.getContext("webgl", { alpha: true, antialias: true }); } catch { gl = null; }
    if (!gl) return;

    let cancelled = false;
    let stop: (() => void) | undefined;
    const start = (): (() => void) | undefined => {
    const perm = permutation(N);
    const clouds: Record<string, Cloud> = {};
    sources.querySelectorAll<SVGSVGElement>("svg[data-art]").forEach((svg) => {
      const cloud = sample(svg, perm, fit);
      if (cloud) clouds[svg.dataset.art as string] = cloud;
    });
    const first = clouds[activeRef.current] ?? Object.values(clouds)[0];
    if (!first) return;

    const compile = (type: number, src: string) => {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src); gl!.compileShader(sh);
      return gl!.getShaderParameter(sh, gl!.COMPILE_STATUS) ? sh : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const from = { pos: first.pos.slice(), acc: first.acc.slice() };
    if (assemble) {
      for (let i = 0; i < N; i++) {
        const ang = Math.random() * Math.PI * 2, r = 0.9 + Math.random() * 1.1;
        from.pos[i * 2] = Math.cos(ang) * r; from.pos[i * 2 + 1] = Math.sin(ang) * r;
      }
    }
    let to: Cloud = first;
    const seeds = new Float32Array(N);
    for (let i = 0; i < N; i++) seeds[i] = (perm[i] + 0.5) / N;

    const buffer = (name: string, size: number, data: Float32Array, usage: number) => {
      const buf = gl!.createBuffer()!;
      const loc = gl!.getAttribLocation(prog, name);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
      gl!.bufferData(gl!.ARRAY_BUFFER, data, usage);
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, size, gl!.FLOAT, false, 0, 0);
      return buf;
    };
    const bFrom = buffer("aFrom", 2, from.pos, gl.DYNAMIC_DRAW);
    const bTo = buffer("aTo", 2, to.pos, gl.DYNAMIC_DRAW);
    const bAccFrom = buffer("aAccFrom", 1, from.acc, gl.DYNAMIC_DRAW);
    const bAccTo = buffer("aAccTo", 1, to.acc, gl.DYNAMIC_DRAW);
    const bSeed = buffer("aSeed", 1, seeds, gl.STATIC_DRAW);
    const upload = (buf: WebGLBuffer, data: Float32Array) => {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf); gl!.bufferData(gl!.ARRAY_BUFFER, data, gl!.DYNAMIC_DRAW);
    };

    const uT = gl.getUniformLocation(prog, "uT"), uTime = gl.getUniformLocation(prog, "uTime");
    const uScale = gl.getUniformLocation(prog, "uScale"), uSize = gl.getUniformLocation(prog, "uSize");
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    let t = assemble ? 0 : 1, morphStart = performance.now();
    const ease = (x: number) => x * x * (3 - 2 * x);
    morphRef.current = (key: string) => {
      const next = clouds[key];
      if (!next || next === to) return;
      // Start from wherever the points are right now, so a mid-morph switch stays smooth.
      const e = ease(t);
      for (let i = 0; i < N * 2; i++) from.pos[i] += (to.pos[i] - from.pos[i]) * e;
      for (let i = 0; i < N; i++) from.acc[i] += (to.acc[i] - from.acc[i]) * e;
      to = next; t = 0; morphStart = performance.now();
      upload(bFrom, from.pos); upload(bAccFrom, from.acc); upload(bTo, to.pos); upload(bAccTo, to.acc);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr)), h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl!.viewport(0, 0, w, h);
      const half = scale * Math.min(rect.width, rect.height, 520);
      gl!.uniform2f(uScale, half / (rect.width / 2), half / (rect.height / 2));
      gl!.uniform1f(uSize, 2.6 * dpr);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let visible = true, raf = 0, painted = false;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "120px" });
    io.observe(canvas);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      if (t < 1) t = Math.min(1, (now - morphStart) / MORPH_MS);
      gl!.uniform1f(uT, t);
      gl!.uniform1f(uTime, now / 1000);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.POINTS, 0, N);
      if (!painted) { painted = true; setLive(true); }
    };
    raf = requestAnimationFrame(frame);
    morphRef.current(activeRef.current);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      morphRef.current = null;
      [bFrom, bTo, bAccFrom, bAccTo, bSeed].forEach((b) => gl!.deleteBuffer(b));
      gl!.deleteProgram(prog); gl!.deleteShader(vs); gl!.deleteShader(fs);
      setLive(false);
    };
    };

    // Remote emblems must be in the DOM before sampling; local ones are already there.
    Promise.all(Object.entries(remote ?? {}).map(([key, url]) => loadRemote(sources, key, url)))
      .then(() => { if (!cancelled) stop = start(); });
    return () => { cancelled = true; stop?.(); };
    // Mount-only: the emblem set and sizing props are fixed for a given instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { morphRef.current?.(active); }, [active]);

  const svgProps = { viewBox: `0 0 ${box} ${box}`, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <span className={className + (live ? " is-live" : "")} aria-hidden="true">
      <canvas ref={canvasRef} />
      {/* Static emblem: what you see without WebGL or with reduced motion. */}
      {arts[active] && <svg className="mm-art-static" {...svgProps} strokeWidth={box >= 100 ? 2 : 1.5}>{arts[active]}</svg>}
      {/* Unrendered copies of every emblem, used only to sample stroke points. */}
      <span ref={sourcesRef} className="mm-art-src">
        {Object.entries(arts).map(([key, node]) => <svg key={key} data-art={key} {...svgProps}>{node}</svg>)}
      </span>
    </span>
  );
}
