import * as THREE from "three";

/**
 * Global Threat Map / Digital Twin scene.
 * initScene(canvas) builds the world and starts the render loop.
 * It returns a cleanup function that disposes GPU resources and listeners.
 * Falls back gracefully: callers should feature-detect WebGL first.
 */
export function initScene(canvas: HTMLCanvasElement): () => void {
  const REDUCED = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const MOBILE = window.matchMedia?.("(max-width: 760px)").matches ?? false;

  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: !MOBILE, alpha: true, powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MOBILE ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x05070a, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070a, 0.028);

  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 1.6, 18);

  scene.add(new THREE.AmbientLight(0x16323f, 1.1));
  const key = new THREE.PointLight(0x00e5ff, 1.4, 60); key.position.set(8, 10, 12); scene.add(key);
  const rim = new THREE.PointLight(0xff7a18, 0.9, 60); rim.position.set(-12, -4, -8); scene.add(rim);

  const world = new THREE.Group(); scene.add(world);
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(o: T): T => { disposables.push(o); return o; };

  function glowTexture(rgb: string): THREE.CanvasTexture {
    const s = 64;
    const cv = document.createElement("canvas"); cv.width = cv.height = s;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, `rgba(${rgb},1)`); g.addColorStop(0.25, `rgba(${rgb},0.6)`); g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    const t = new THREE.CanvasTexture(cv); t.needsUpdate = true; return track(t);
  }
  const texCyan = glowTexture("0,229,255");
  const texOrange = glowTexture("255,122,24");

  // ── Globe ──────────────────────────────────────────────────────────────
  const R = 5.2;
  const globe = new THREE.Group(); world.add(globe);
  globe.add(new THREE.Mesh(track(new THREE.IcosahedronGeometry(R, 3)),
    track(new THREE.MeshBasicMaterial({ color: 0x0c3a48, wireframe: true, transparent: true, opacity: 0.32 }))));
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 0.985, 48, 48)),
    track(new THREE.MeshBasicMaterial({ color: 0x05080c }))));

  {
    const N = MOBILE ? 900 : 1800;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const u = Math.random(), v = Math.random();
      const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1), r = R * 1.002;
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph);
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const g = track(new THREE.BufferGeometry()); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    globe.add(new THREE.Points(g, track(new THREE.PointsMaterial({ color: 0x1f6f82, size: 0.03, transparent: true, opacity: 0.7 }))));
  }

  const latLon = (lat: number, lon: number, r: number) => {
    const phi = ((90 - lat) * Math.PI) / 180, th = ((lon + 180) * Math.PI) / 180;
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
  };

  const NODES: [number, number][] = [
    [28.6, 77.2], [19.0, 72.8], [1.35, 103.8], [51.5, -0.12], [40.7, -74.0],
    [37.7, -122.4], [35.6, 139.7], [-33.8, 151.2], [52.5, 13.4], [25.2, 55.3],
    [-23.5, -46.6], [55.7, 37.6], [22.5, 88.3], [31.2, 121.4],
  ];
  type NodeSprite = THREE.Sprite & { userData: { base: number; ph: number } };
  const nodeSprites: NodeSprite[] = [];
  NODES.forEach((n, k) => {
    const hot = k % 3 === 0;
    const sp = new THREE.Sprite(track(new THREE.SpriteMaterial({
      map: hot ? texOrange : texCyan, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false,
    }))) as NodeSprite;
    sp.position.copy(latLon(n[0], n[1], R * 1.01));
    const sc = hot ? 0.7 : 0.5; sp.scale.set(sc, sc, sc);
    sp.userData = { base: sc, ph: Math.random() * Math.PI * 2 };
    globe.add(sp); nodeSprites.push(sp);
  });

  interface Arc { line: THREE.Line; mat: THREE.LineBasicMaterial; curve: THREE.QuadraticBezierCurve3; pulse: THREE.Sprite; pmat: THREE.SpriteMaterial; t: number; speed: number; }
  const arcs: Arc[] = [];
  const makeArc = (a: [number, number], b: [number, number], color: number): Arc => {
    const va = latLon(a[0], a[1], R * 1.01), vb = latLon(b[0], b[1], R * 1.01);
    const mid = va.clone().add(vb).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(R * (1 + va.distanceTo(vb) * 0.16));
    const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
    const g = track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)));
    const mat = track(new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    const line = new THREE.Line(g, mat);
    const pmat = track(new THREE.SpriteMaterial({ map: texCyan, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    const pulse = new THREE.Sprite(pmat); pulse.scale.set(0.4, 0.4, 0.4);
    globe.add(line); globe.add(pulse);
    return { line, mat, curve, pulse, pmat, t: Math.random(), speed: 0.12 + Math.random() * 0.22 };
  };
  for (let i = 0; i < (MOBILE ? 6 : 11); i++) {
    let a = (Math.random() * NODES.length) | 0, b = (Math.random() * NODES.length) | 0;
    if (b === a) b = (b + 1) % NODES.length;
    arcs.push(makeArc(NODES[a], NODES[b], i % 3 === 0 ? 0xff7a18 : 0x00e5ff));
  }

  // ── Honeycomb shader floor (with GridHelper fallback) ───────────────────
  let floorUniforms: { uTime: { value: number } } | null = null;
  let floor: THREE.Object3D;
  try {
    floorUniforms = { uTime: { value: 0 } };
    const mat = track(new THREE.ShaderMaterial({
      uniforms: { uTime: floorUniforms.uTime, uColorA: { value: new THREE.Color(0x00e5ff) }, uColorB: { value: new THREE.Color(0xff7a18) } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader:
        "varying vec2 vUv; varying float vDist;" +
        "void main(){ vUv=uv; vec4 wp=modelMatrix*vec4(position,1.0); vDist=length(wp.xz);" +
        "gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader:
        "precision mediump float;" +
        "uniform float uTime; uniform vec3 uColorA; uniform vec3 uColorB; varying vec2 vUv; varying float vDist;" +
        "float hexDist(vec2 p){ p=abs(p); float c=dot(p,normalize(vec2(1.0,1.73))); c=max(c,p.x); return c; }" +
        "vec4 hexCoords(vec2 uv){ vec2 r=vec2(1.0,1.73); vec2 h=r*0.5;" +
        " vec2 a=mod(uv,r)-h; vec2 b=mod(uv-h,r)-h; vec2 gv=dot(a,a)<dot(b,b)?a:b;" +
        " float y=0.5-hexDist(gv); vec2 id=uv-gv; return vec4(gv.x,y,id.x,id.y); }" +
        "void main(){ vec2 uv=(vUv-0.5)*42.0; vec4 hc=hexCoords(uv);" +
        " float edge=smoothstep(0.0,0.06,hc.y); float line=1.0-edge;" +
        " float idd=length(hc.zw); float pulse=0.5+0.5*sin(uTime*1.6 - idd*0.45);" +
        " float ring=smoothstep(0.0,1.2,1.0-abs(mod(idd*0.5-uTime*0.6,6.0)-3.0));" +
        " vec3 col=mix(uColorA,uColorB, clamp(ring*0.9,0.0,1.0));" +
        " float fade=smoothstep(20.0,2.0,vDist); float center=smoothstep(2.5,7.0,vDist);" +
        " float a=line*(0.18+pulse*0.5)*fade*center; a+=ring*0.06*fade*center;" +
        " gl_FragColor=vec4(col, a); }",
    }));
    floor = new THREE.Mesh(track(new THREE.PlaneGeometry(70, 70, 1, 1)), mat);
    floor.rotation.x = -Math.PI / 2; floor.position.y = -7.5; world.add(floor);
  } catch {
    floorUniforms = null;
    const grid = new THREE.GridHelper(70, 40, 0x00e5ff, 0x0c2730);
    (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.22;
    grid.position.y = -7.5; world.add(grid); floor = grid;
  }

  // ── Packet particle field ───────────────────────────────────────────────
  const PN = MOBILE ? 420 : 1100;
  const ppos = new Float32Array(PN * 3); const pspd = new Float32Array(PN);
  for (let i = 0; i < PN; i++) {
    ppos[i * 3] = (Math.random() - 0.5) * 60; ppos[i * 3 + 1] = (Math.random() - 0.5) * 40; ppos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    pspd[i] = 0.4 + Math.random() * 1.2;
  }
  const pgeo = track(new THREE.BufferGeometry()); pgeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
  const packets = new THREE.Points(pgeo, track(new THREE.PointsMaterial({ color: 0x2bd6ef, size: 0.045, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })));
  scene.add(packets);

  // ── Interaction state ───────────────────────────────────────────────────
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollP = 0;
  const onPointer = (e: PointerEvent) => { pointer.tx = e.clientX / window.innerWidth - 0.5; pointer.ty = e.clientY / window.innerHeight - 0.5; };
  const onScroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; scrollP = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0; };
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MOBILE ? 1.5 : 2));
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll();

  // camera keyframes: [posX,posY,posZ, lookX,lookY,lookZ]
  const KF = [
    [0, 1.6, 18, 0, 0, 0], [6, 3, 13, 0, 0.5, 0], [-7, 2, 12, 0, 0, 0],
    [0, 7, 11, 0, -1, 0], [5, 2.4, 14, 0, 0, 0], [0, 1.2, 17, 0, 0, 0],
  ];
  const sample = (t: number, idx: number) => {
    const seg = t * (KF.length - 1); let i = Math.floor(seg); let f = seg - i;
    if (i >= KF.length - 1) { i = KF.length - 2; f = 1; }
    const ease = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
    return KF[i][idx] + (KF[i + 1][idx] - KF[i][idx]) * ease;
  };

  const clock = new THREE.Clock();
  const target = new THREE.Vector3();
  let raf = 0; let running = true;

  const loop = () => {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05); const t = clock.elapsedTime;
    pointer.x += (pointer.tx - pointer.x) * 0.05; pointer.y += (pointer.ty - pointer.y) * 0.05;
    if (!REDUCED) globe.rotation.y += dt * 0.06;
    world.rotation.x = pointer.y * 0.12;

    for (const sp of nodeSprites) { const s = sp.userData.base * (0.85 + 0.35 * Math.sin(t * 2 + sp.userData.ph)); sp.scale.set(s, s, s); }
    for (let k = 0; k < arcs.length; k++) {
      const ar = arcs[k]; ar.t += dt * ar.speed; if (ar.t > 1.4) ar.t = -0.2;
      const vis = Math.max(0, Math.min(1, ar.t));
      ar.mat.opacity = 0.22 + 0.5 * Math.sin(Math.min(1, vis) * Math.PI);
      const pp = Math.max(0, Math.min(1, ar.t)); ar.pulse.position.copy(ar.curve.getPoint(pp));
      ar.pmat.opacity = ar.t > 0 && ar.t < 1 ? 0.9 : 0;
      const ps = 0.25 + 0.15 * Math.sin(t * 6 + k); ar.pulse.scale.set(ps, ps, ps);
    }
    if (floorUniforms) floorUniforms.uTime.value = t;
    if (!REDUCED) {
      const arr = packets.geometry.attributes.position.array as Float32Array;
      for (let p = 0; p < PN; p++) { arr[p * 3 + 1] += pspd[p] * dt * 1.4; if (arr[p * 3 + 1] > 20) arr[p * 3 + 1] = -20; }
      packets.geometry.attributes.position.needsUpdate = true; packets.rotation.y += dt * 0.01;
    }
    const orbit = REDUCED ? 0 : Math.sin(t * 0.12) * 0.6;
    camera.position.x += (sample(scrollP, 0) + pointer.x * 2.2 + orbit - camera.position.x) * 0.06;
    camera.position.y += (sample(scrollP, 1) - pointer.y * 1.4 - camera.position.y) * 0.06;
    camera.position.z += (sample(scrollP, 2) - camera.position.z) * 0.06;
    target.set(sample(scrollP, 3), sample(scrollP, 4), sample(scrollP, 5));
    camera.lookAt(target);
    renderer.render(scene, camera);
  };

  const onVisibility = () => { running = !document.hidden; if (running) { clock.start(); loop(); } };
  document.addEventListener("visibilitychange", onVisibility);

  // first-frame guard: swap to GridHelper if the shader floor throws
  try { renderer.render(scene, camera); }
  catch {
    if (floorUniforms) {
      world.remove(floor);
      const grid = new THREE.GridHelper(70, 40, 0x00e5ff, 0x0c2730);
      (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.22;
      grid.position.y = -7.5; world.add(grid); floorUniforms = null;
    }
  }
  loop();

  return () => {
    running = false; cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}

export function webglSupported(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}
