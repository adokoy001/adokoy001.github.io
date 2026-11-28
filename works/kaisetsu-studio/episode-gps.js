/* ===== 回：GPSは相対性理論なしでは使えない？ =====
   この回の3Dの場面（地球と衛星、電波、光の時計、重力のくぼみ、地図、衛星の大写し）と台本。Kaisetsu の手引きの「回の書き方」に沿って書いてある */
Kaisetsu.episode({
  id: 'gps', fileName: 'GPSと相対性理論',
  title: 'GPSは相対性理論なしでは使えない？', titleLines: ['GPSは', '相対性理論なしでは', '使えない？'], eyebrow: '3D解説',
  cast: {
    A: { name: 'ノア', role: '解説', color: '#B0487A', voice: { voice: 'otona', speed: 1.05 },
         look: { hair: 'bob', hairColor: 'budou', eye: 'sumire', ornament: 'orbit', hat: 'none' } },
    B: { name: 'ヒナ', role: '聞き役', color: '#C9762C', voice: { voice: 'shoujo', speed: 1.1 },
         look: { hair: 'short', hairColor: 'akagane', eye: 'midori', ornament: 'none', hat: 'knit' } },
  },
  chapters: [['はじめに', ['intro']], ['GPSのしくみ', ['orbits', 'signal', 'trilat']], ['時間と距離', ['distance', 'clocks']], ['速さの効果', ['lightclock', 'lightclock2']],
    ['重力の効果', ['well']], ['ずれの大きさ', ['sum', 'map']], ['補正のしかた', ['fix']], ['まとめ', ['outro']]],
  bgm: { intro: 'opening', orbits: 'explain', signal: 'explain', trilat: 'explain', distance: 'explain', clocks: 'explain',
    lightclock: 'wonder', lightclock2: 'wonder', well: 'wonder', sum: 'tension', map: 'tension', fix: 'resolve', outro: 'opening' },

  world(K) {
const T = K.THREE, V3 = T.Vector3, D2R = Math.PI / 180, scene = K.scene, camera = K.camera;
const { clamp, lerp, sstep, toon, outline, glow, fade } = K;
/* ---------- 星 ---------- */
{
  const n = 1800, p = new Float32Array(n * 3);
  let s = 7; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < n; i++) { const u = r() * 2 - 1, a = r() * Math.PI * 2, q = Math.sqrt(1 - u * u), R = 900; p[i * 3] = q * Math.cos(a) * R; p[i * 3 + 1] = u * R; p[i * 3 + 2] = q * Math.sin(a) * R; }
  const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3));
  scene.add(new T.Points(g, new T.PointsMaterial({ color: 0xcfd8ff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.8 })));
}

/* ---------- 地球 ---------- */
const RE = 2, RO = RE * 4.17;          // 軌道の半径は、地球の半径の約4.17倍（高さ約20,200km）
function earthTex() {
  const W = 1024, H = 512, c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d'), img = x.createImageData(W, H), d = img.data;
  const P = new Uint8Array(512); { let s = 3; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; const a = []; for (let i = 0; i < 256; i++) a.push(i); for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } for (let i = 0; i < 512; i++) P[i] = a[i & 255]; }
  const h = (i, j, k) => P[(P[(P[i & 255] + j) & 255] + k) & 255] / 255;
  const f = t => t * t * (3 - 2 * t);
  const vn = (X, Y, Z) => { const i = Math.floor(X), j = Math.floor(Y), k = Math.floor(Z), u = f(X - i), v = f(Y - j), w = f(Z - k);
    const l = (a, b, t) => a + (b - a) * t;
    return l(l(l(h(i, j, k), h(i + 1, j, k), u), l(h(i, j + 1, k), h(i + 1, j + 1, k), u), v), l(l(h(i, j, k + 1), h(i + 1, j, k + 1), u), l(h(i, j + 1, k + 1), h(i + 1, j + 1, k + 1), u), v), w); };
  const fbm = (X, Y, Z) => { let s = 0, a = 0.5, fr = 1; for (let o = 0; o < 5; o++) { s += a * vn(X * fr, Y * fr, Z * fr); a *= 0.5; fr *= 2.03; } return s; };
  for (let py = 0; py < H; py++) {
    const lat = (0.5 - (py + 0.5) / H) * Math.PI, cl = Math.cos(lat), sl = Math.sin(lat);
    for (let px = 0; px < W; px++) {
      const lon = ((px + 0.5) / W - 0.5) * Math.PI * 2, X = cl * Math.sin(lon), Z = cl * Math.cos(lon);
      const n = fbm(X * 1.9 + 11, sl * 1.9 + 3, Z * 1.9 + 7), m = fbm(X * 4 + 2, sl * 4, Z * 4 + 5), ice = Math.abs(lat) > 1.2 + 0.08 * (m - 0.5) * 4;
      let r, g, b;
      if (ice) { r = 236; g = 244; b = 252; }
      else if (n > 0.53) { const dry = clamp((0.5 - Math.abs(Math.abs(lat) - 0.42) * 4) + (m - 0.5) * 1.5, 0, 1);
        r = lerp(98, 196, dry); g = lerp(168, 170, dry); b = lerp(92, 110, dry); if (n > 0.66) { r *= 0.86; g *= 0.86; b *= 0.86; } }
      else { const dp = clamp((0.53 - n) * 5, 0, 1); r = lerp(64, 36, dp); g = lerp(140, 92, dp); b = lerp(214, 180, dp); }
      const k = (py * W + px) * 4; d[k] = r; d[k + 1] = g; d[k + 2] = b; d[k + 3] = 255;
    }
  }
  x.putImageData(img, 0, 0);
  const t = new T.CanvasTexture(c); t.anisotropy = 4; return t;
}
const earthMap = earthTex();
const earthTilt = new T.Group(); earthTilt.rotation.z = 23.4 * D2R; scene.add(earthTilt);
const earthSpin = new T.Group(); earthTilt.add(earthSpin);
const earthMesh = new T.Mesh(new T.SphereGeometry(RE, 72, 48), toon('#ffffff', { map: earthMap }));
earthSpin.add(earthMesh); outline(earthMesh, '#0B1638', 1.012);
const atmo = new T.Mesh(new T.SphereGeometry(RE * 1.09, 48, 32), new T.ShaderMaterial({
  side: T.BackSide, transparent: true, blending: T.AdditiveBlending, depthWrite: false, uniforms: { c: { value: new T.Color('#6FB8FF') } },
  vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
  fragmentShader: 'uniform vec3 c; varying vec3 vN; varying vec3 vV; void main(){ float k = pow(clamp(0.72 + dot(vN, vV), 0.0, 1.0), 2.4); gl_FragColor = vec4(c*k*0.9, 1.0); }' }));
earthTilt.add(atmo);
function pinMesh(color, s) {
  const g = new T.Group();
  const cone = new T.Mesh(new T.ConeGeometry(0.42, 1.0, 18), toon(color)); cone.rotation.x = Math.PI; cone.position.y = 0.5; outline(cone, '#2A0A12', 1.08);
  const head = new T.Mesh(new T.SphereGeometry(0.42, 20, 14), toon(color)); head.position.y = 1.05; outline(head, '#2A0A12', 1.08);
  const dot = new T.Mesh(new T.SphereGeometry(0.16, 12, 8), new T.MeshBasicMaterial({ color: '#ffffff' })); dot.position.set(0, 1.08, 0.33);
  g.add(cone, head, dot); g.scale.setScalar(s); return g;
}
const RCV_LAT = 34 * D2R, RCV_LON = 0;
const rcvLocal = new V3(Math.cos(RCV_LAT) * Math.sin(RCV_LON), Math.sin(RCV_LAT), Math.cos(RCV_LAT) * Math.cos(RCV_LON)).multiplyScalar(RE);
const rcv = new T.Group(); rcv.position.copy(rcvLocal); rcv.quaternion.setFromUnitVectors(new V3(0, 1, 0), rcvLocal.clone().normalize()); earthSpin.add(rcv);
const rcvPin = pinMesh('#FF5A6E', 0.16); rcv.add(rcvPin);
const rcvRing = new T.Mesh(new T.RingGeometry(0.16, 0.2, 40), new T.MeshBasicMaterial({ color: '#FF8A98', transparent: true, side: T.DoubleSide, depthWrite: false }));
rcvRing.rotation.x = -Math.PI / 2; rcvRing.position.y = 0.01; rcv.add(rcvRing);
const rcvW = new V3();

/* ---------- 衛星 ---------- */
function panelTex() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 48; const x = c.getContext('2d');
  x.fillStyle = '#2B4FA8'; x.fillRect(0, 0, 128, 48); x.strokeStyle = '#7FA6F0'; x.lineWidth = 2;
  for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 16, 0); x.lineTo(i * 16, 48); x.stroke(); }
  for (let j = 0; j <= 3; j++) { x.beginPath(); x.moveTo(0, j * 16); x.lineTo(128, j * 16); x.stroke(); }
  return new T.CanvasTexture(c);
}
const PT = panelTex();
function makeSat(s) {
  const g = new T.Group();
  const body = new T.Mesh(new T.BoxGeometry(0.36, 0.36, 0.52), toon('#E4B04C')); outline(body, '#3A2608', 1.07); g.add(body);
  for (const sg of [1, -1]) {
    const arm = new T.Mesh(new T.CylinderGeometry(0.025, 0.025, 0.36, 6), toon('#C9CFDD')); arm.rotation.z = Math.PI / 2; arm.position.x = sg * 0.34; g.add(arm);
    const p = new T.Mesh(new T.BoxGeometry(1.1, 0.03, 0.42), toon('#ffffff', { map: PT })); p.position.x = sg * 1.05; outline(p, '#0C1838', 1.04); g.add(p);
  }
  const dish = new T.Mesh(new T.CylinderGeometry(0.18, 0.06, 0.1, 18), toon('#E8ECF4')); dish.rotation.x = Math.PI / 2; dish.position.z = 0.32; g.add(dish);
  const ant = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 0.2, 6), toon('#E8ECF4')); ant.rotation.x = Math.PI / 2; ant.position.z = 0.42; g.add(ant);
  g.scale.setScalar(s); return g;
}
const orbitGroup = new T.Group(); scene.add(orbitGroup);
const planes = [], sats = [];
for (let k = 0; k < 6; k++) {
  const pl = new T.Group(); pl.rotation.order = 'YXZ'; pl.rotation.y = k * 60 * D2R; pl.rotation.x = 55 * D2R; orbitGroup.add(pl); planes.push(pl);
  const pts = []; for (let i = 0; i <= 160; i++) { const u = i / 160 * Math.PI * 2; pts.push(new V3(RO * Math.cos(u), 0, RO * Math.sin(u))); }
  pl.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: '#8FB4FF', transparent: true, opacity: 0.32 })));
  for (let j = 0; j < 2; j++) { const m = makeSat(0.34); orbitGroup.add(m); sats.push({ m, pl, u0: k * 0.93 + j * Math.PI + 0.4, w: new V3() }); }
}
let orbitPhase = 0;
function placeSats() {
  for (const s of sats) {
    const u = s.u0 + orbitPhase;
    s.w.set(RO * Math.cos(u), 0, RO * Math.sin(u)).applyEuler(s.pl.rotation);
    s.m.position.copy(s.w); s.m.lookAt(0, 0, 0);
  }
}

/* ---------- 電波：衛星からあなたへ ---------- */
const COLORS = ['#FFD166', '#7CE0FF', '#FF8FB1', '#A8F08A'];
const sigGroup = new T.Group(); scene.add(sigGroup);
const beams = COLORS.map(c => {
  const geo = new T.BufferGeometry().setFromPoints([new V3(), new V3()]);
  const line = new T.Line(geo, new T.LineBasicMaterial({ color: c, transparent: true, opacity: 0.55 })); sigGroup.add(line);
  const pulses = [0, 1, 2].map(() => { const g = glow(c, 0.7); sigGroup.add(g); return g; });
  return { line, pulses };
});
const triGroup = new T.Group(); scene.add(triGroup);
const fresnel = c => new T.ShaderMaterial({ transparent: true, depthWrite: false, blending: T.AdditiveBlending, uniforms: { c: { value: new T.Color(c) }, a: { value: 1 } },
  vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
  fragmentShader: 'uniform vec3 c; uniform float a; varying vec3 vN; varying vec3 vV; void main(){ float r = 1.0-abs(dot(vN,vV)); gl_FragColor = vec4(c*(0.04+0.55*pow(r,3.0))*a, 1.0); }' });
const spheres = COLORS.slice(0, 3).map(c => { const m = new T.Mesh(new T.SphereGeometry(1, 64, 40), fresnel(c)); triGroup.add(m); return m; });
let chosen = null;
function chooseSats() {
  rcv.getWorldPosition(rcvW); const n = rcvW.clone().normalize();
  chosen = sats.map(s => ({ s, e: s.w.clone().sub(rcvW).normalize().dot(n) })).filter(o => o.e > 0.15).sort((a, b) => b.e - a.e).slice(0, 4).map(o => o.s);
}

/* ---------- 光の時計 ---------- */
const LC = new V3(320, 0, 0), LCV = { c: 3.6, h: 1.4, v: 0.6 };      // 図の上の光の速さ（単位／秒）、上下の幅、動く時計の速さ（光の速さの何倍か）
const lcGroup = new T.Group(); lcGroup.position.copy(LC); scene.add(lcGroup);
function makeLightClock(color) {
  const g = new T.Group();
  for (const y of [1, -1]) { const m = new T.Mesh(new T.BoxGeometry(1.9, 0.12, 0.9), toon('#D7DEEC')); m.position.y = y * (LCV.h + 0.11); outline(m, '#1A2240', 1.05); g.add(m);
    const face = new T.Mesh(new T.PlaneGeometry(1.8, 0.86), new T.MeshBasicMaterial({ color: '#BFE9FF' })); face.rotation.x = y > 0 ? Math.PI / 2 : -Math.PI / 2; face.position.y = y * (LCV.h + 0.045); g.add(face); }
  for (const [x, z] of [[-0.9, -0.4], [0.9, -0.4]]) { const p = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 2 * LCV.h + 0.3, 6), toon('#8F9BB8')); p.position.set(x, 0, z); g.add(p); }
  const photon = new T.Group(); photon.add(new T.Mesh(new T.SphereGeometry(0.11, 14, 10), new T.MeshBasicMaterial({ color: color }))); photon.add(glow(color, 0.9));
  const N = 400, tg = new T.BufferGeometry(); tg.setAttribute('position', new T.BufferAttribute(new Float32Array(N * 3), 3)); tg.setDrawRange(0, 0);
  const trail = new T.Line(tg, new T.LineBasicMaterial({ color: color, transparent: true, opacity: 0.85 }));
  return { g, photon, trail, N, n: 0, ticks: 0, lastPh: 0 };
}
const lcA = makeLightClock('#FFE27A'), lcB = makeLightClock('#FFE27A');
lcA.g.position.set(-5, 0, 0); lcGroup.add(lcA.g, lcA.photon, lcB.g, lcB.photon, lcB.trail);
const tri = x => { const f = x - Math.floor(x); return f < 0.5 ? f * 2 : 2 - f * 2; };
function updLightClocks(t, showB) {
  const P0 = 2 * (2 * LCV.h) / LCV.c;                       // 止まっている時計の、1往復の時間
  const yA = -LCV.h + 2 * LCV.h * tri(t / P0);
  lcA.photon.position.set(-5, yA, 0); lcA.ticks = Math.floor(t / P0);
  const g = Math.sqrt(1 - LCV.v * LCV.v), P = P0 / g, vx = LCV.v * LCV.c, X0 = -1.2, X1 = 9.2, span = X1 - X0;
  const tt = showB ? t : 0, run = Math.floor(tt * vx / span), x = X0 + (tt * vx) % span;
  lcB.g.position.x = x;
  lcB.photon.position.set(x, -LCV.h + 2 * LCV.h * tri(tt / P), 0); lcB.ticks = Math.floor(tt / P);
  if (run !== lcB.run) { lcB.run = run; lcB.n = 0; }
  const arr = lcB.trail.geometry.attributes.position.array;
  if (lcB.n < lcB.N) { const k = lcB.n * 3; arr[k] = lcB.photon.position.x; arr[k + 1] = lcB.photon.position.y; arr[k + 2] = 0; lcB.n++; }
  lcB.trail.geometry.attributes.position.needsUpdate = true; lcB.trail.geometry.setDrawRange(0, lcB.n);
}

/* ---------- 重力のくぼみ ---------- */
const WELL = new V3(-320, 0, 0), wellGroup = new T.Group(); wellGroup.position.copy(WELL); scene.add(wellGroup);
const depth = r => -3.2 / Math.sqrt(1 + (r / 1.3) * (r / 1.3));
{
  const pos = [], L = 11, step = 0.55, seg = 120;
  for (let i = -20; i <= 20; i++) {
    const c = i * step;
    for (let k = 0; k < seg; k++) {
      const a = -L + 2 * L * k / seg, b = -L + 2 * L * (k + 1) / seg;
      for (const [x1, z1, x2, z2] of [[a, c, b, c], [c, a, c, b]]) {
        if (Math.hypot(x1, z1) > L || Math.hypot(x2, z2) > L) continue;
        pos.push(x1, depth(Math.hypot(x1, z1)), z1, x2, depth(Math.hypot(x2, z2)), z2);
      }
    }
  }
  const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  wellGroup.add(new T.LineSegments(g, new T.LineBasicMaterial({ color: '#5CCBFF', transparent: true, opacity: 0.5 })));
}
const wellEarth = new T.Mesh(new T.SphereGeometry(0.9, 48, 32), toon('#ffffff', { map: earthMap })); wellEarth.position.y = depth(0) + 0.92; outline(wellEarth, '#0B1638', 1.02); wellGroup.add(wellEarth);
const WR = 5.4, wellSat = makeSat(0.42); wellGroup.add(wellSat);
{
  const pts = []; for (let i = 0; i <= 120; i++) { const u = i / 120 * Math.PI * 2; pts.push(new V3(WR * Math.cos(u), depth(WR) + 0.45, WR * Math.sin(u))); }
  wellGroup.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: '#FFD166', transparent: true, opacity: 0.7 })));
}
const wellSatW = new V3(), wellTopW = new V3();

/* ---------- 地図（ずれの大きさ） ---------- */
const MAP = new V3(0, -320, 0), mapGroup = new T.Group(); mapGroup.position.copy(MAP); scene.add(mapGroup);
function mapTex() {
  const W = 1024, H = 600, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  x.fillStyle = '#E3E8D6'; x.fillRect(0, 0, W, H);
  let s = 5; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < 90; i++) { x.fillStyle = r() < 0.3 ? '#B9D99B' : '#CBD1C0'; x.fillRect(r() * W, r() * H, 30 + r() * 70, 24 + r() * 50); }
  x.strokeStyle = '#7FB6E6'; x.lineWidth = 30; x.beginPath(); x.moveTo(0, 470); x.bezierCurveTo(300, 380, 520, 560, 1024, 430); x.stroke();
  const road = (a, b, w) => { x.lineCap = 'round'; x.strokeStyle = '#8E93A3'; x.lineWidth = w + 6; x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.stroke(); x.strokeStyle = '#FFFFFF'; x.lineWidth = w; x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.stroke(); };
  for (let i = 0; i < 6; i++) road([0, 60 + i * 100], [W, 40 + i * 100 + (i % 2) * 30], i === 2 ? 18 : 9);
  for (let i = 0; i < 9; i++) road([60 + i * 120, 0], [90 + i * 115, H], i === 3 ? 16 : 8);
  return new T.CanvasTexture(c);
}
const MW = 26, MH = 15.2, MX0 = -3.5;
const mapPlane = new T.Mesh(new T.PlaneGeometry(MW, MH), new T.MeshBasicMaterial({ map: mapTex() })); mapPlane.rotation.x = -Math.PI / 2; mapGroup.add(mapPlane);
const pinTrue = pinMesh('#3FBF7F', 0.9), pinGps = pinMesh('#FF5A6E', 0.9);
pinTrue.position.set(MX0, 0, 0.6); pinGps.position.set(MX0, 0, 0.6); mapGroup.add(pinTrue, pinGps);
const dashTex = (() => { const c = document.createElement('canvas'); c.width = 64; c.height = 8; const x = c.getContext('2d'); x.fillStyle = '#D3264A'; x.fillRect(0, 0, 40, 8); const t = new T.CanvasTexture(c); t.wrapS = T.RepeatWrapping; return t; })();
const mapLine = new T.Mesh(new T.PlaneGeometry(1, 0.16), new T.MeshBasicMaterial({ map: dashTex, transparent: true }));
mapLine.geometry.translate(0.5, 0, 0); mapLine.rotation.x = -Math.PI / 2; mapLine.position.set(MX0, 0.03, 0.6); mapGroup.add(mapLine);

/* ---------- 衛星の大写し（補正） ---------- */
const FIX = new V3(0, 320, 0), fixGroup = new T.Group(); fixGroup.position.copy(FIX); scene.add(fixGroup);
const bigSat = makeSat(2.1); fixGroup.add(bigSat);
const clockGlow = glow('#7CE0FF', 1.6); fixGroup.add(clockGlow);
const fixEarth = new T.Mesh(new T.SphereGeometry(30, 64, 40), toon('#ffffff', { map: earthMap })); fixEarth.position.set(0, -38, -16); fixEarth.rotation.set(1.25, 0.6, 0); fixGroup.add(fixEarth);

/* ---------- 場面：カメラの位置と、出すもの ---------- */
const UP = new V3(0, 1, 0), tmp = new V3();
const SC = {
  intro:       { orbit: 0.35, spin: 1, show: { orbits: 0.35 }, cam: t => [new V3(Math.sin(t * 0.05) * 1.2, 1.0, 7.3), new V3(0, 0.15, 0)] },
  orbits:      { orbit: 1, spin: 1, show: { orbits: 1 }, cam: t => [new V3(7 + Math.sin(t * 0.04) * 2, 8, 22), new V3(0, 0, 0)] },
  signal:      { orbit: 0.04, spin: 0.05, show: { orbits: 0.6, sig: 1, rcv: 1 }, cam: () => sideCam(14, 4) },
  trilat:      { orbit: 0.02, spin: 0.02, show: { orbits: 0.4, sig: 0.35, tri: 1, rcv: 1 }, cam: () => sideCam(17, 5) },
  distance:    { orbit: 0.01, spin: 0.01, show: { orbits: 0.25, beam1: 1, rcv: 1 }, cam: () => beamCam(21) },
  clocks:      { orbit: 0.01, spin: 0.01, show: { orbits: 0.25, beam1: 0.5, rcv: 1 }, cam: () => beamCam(22) },
  lightclock:  { show: { lc: 1 }, cam: () => [LC.clone().add(new V3(-5, 1.4, 9.5)), LC.clone().add(new V3(-5, 1.0, 0))] },
  lightclock2: { show: { lc: 1, lcB: 1 }, cam: () => [LC.clone().add(new V3(1.6, 1.6, 17)), LC.clone().add(new V3(1.6, 1.3, 0))] },
  well:        { show: { well: 1 }, cam: t => [WELL.clone().add(new V3(Math.sin(t * 0.06) * 3, 6.4, 12.5)), WELL.clone().add(new V3(0, -0.3, 0))] },
  sum:         { orbit: 0.5, spin: 0.5, show: { orbits: 1 }, cam: t => [new V3(-8, 4.5 + Math.sin(t * 0.05), 17), new V3(0, 0, 0)] },
  map:         { show: { map: 1 }, cam: () => [MAP.clone().add(new V3(0.8, 8.5, 9.5)), MAP.clone().add(new V3(0.8, 0.6, 0))] },
  fix:         { show: { fix: 1 }, cam: t => [FIX.clone().add(new V3(4.5 * Math.cos(t * 0.1), 2.2, 10.5)), FIX.clone().add(new V3(0, 0.5, 0))] },
  outro:       { orbit: 1, spin: 1, show: { orbits: 1 }, cam: t => [new V3(Math.sin(t * 0.06) * 24, 6, Math.cos(t * 0.06) * 24), new V3(0, 0, 0)] },
};
function sideCam(d, h) {
  rcv.getWorldPosition(rcvW); const n = rcvW.clone().normalize(), side = new V3().crossVectors(n, UP).normalize();
  return [n.clone().multiplyScalar(6).addScaledVector(side, d).addScaledVector(UP, h), n.clone().multiplyScalar(4.6)];
}
function beamCam(d) {
  rcv.getWorldPosition(rcvW); const s = (chosen && chosen[0]) ? chosen[0].w : rcvW.clone().multiplyScalar(4);
  const mid = rcvW.clone().lerp(s, 0.62), dir = s.clone().sub(rcvW).normalize(), perp = new V3().crossVectors(dir, UP).normalize();
  if (perp.dot(rcvW.clone().normalize().add(new V3(0, 0, 1))) < 0) perp.negate();
  if (dir.dot(new V3().crossVectors(perp.clone().negate(), UP)) < 0) perp.negate();      // 衛星が、あなたより右上に見える側から撮る（左上はボード）
  return [mid.clone().addScaledVector(perp, d).addScaledVector(UP, 1.2), mid];
}
const SIG = ['signal', 'trilat', 'distance', 'clocks'];
const vis = {}; for (const k of ['orbits', 'sig', 'tri', 'beam1', 'rcv', 'lc', 'lcB', 'well', 'map', 'fix']) vis[k] = 0;
let cur = null;
function enter(name, prev) {
  if (SIG.includes(name) && !SIG.includes(prev)) { placeSats(); chooseSats(); }
  if (name === 'lightclock2' && prev !== 'lightclock2') lcB.n = 0;
  cur = name;
}
function update(dt, t, Tt) {
  const S = SC[cur] || SC.intro;
  const k = 1 - Math.exp(-dt * 4);
  for (const key in vis) vis[key] = lerp(vis[key], (S.show[key] || 0), k);
  fade(orbitGroup, vis.orbits); fade(sigGroup, vis.sig); fade(triGroup, vis.tri);
  fade(lcGroup, vis.lc); lcB.g.visible = lcB.photon.visible = lcB.trail.visible = vis.lcB > 0.05 && vis.lc > 0.05;
  fade(wellGroup, vis.well); fade(mapGroup, vis.map); fade(fixGroup, vis.fix);
  rcvPin.visible = rcvRing.visible = vis.rcv > 0.05;
  earthSpin.rotation.y += dt * 0.06 * (S.spin === undefined ? 0 : S.spin);
  orbitPhase += dt * (Math.PI * 2 / 40) * (S.orbit === undefined ? 0 : S.orbit);
  placeSats(); rcv.getWorldPosition(rcvW);
  const ps = 1 + 0.25 * Math.sin(Tt * 4);
  rcvRing.scale.setScalar(1 + (Tt * 0.8 % 1) * 2.5); rcvRing.material.opacity = (1 - (Tt * 0.8 % 1)) * vis.rcv;
  rcvPin.scale.setScalar(0.16 * (1 + 0.9 * vis.rcv) * (cur === 'trilat' ? ps : 1));
  if (chosen && vis.sig > 0.01) chosen.forEach((s, i) => {
    const b = beams[i], a = b.line.geometry.attributes.position;
    a.setXYZ(0, s.w.x, s.w.y, s.w.z); a.setXYZ(1, rcvW.x, rcvW.y, rcvW.z); a.needsUpdate = true;
    b.pulses.forEach((p, j) => { const f = (Tt * 0.45 + j / 3 + i * 0.17) % 1; p.position.copy(s.w).lerp(rcvW, f); });
  });
  if (chosen && vis.tri > 0.01) spheres.forEach((m, i) => {
    const s = chosen[i]; if (!s) return;
    const R = s.w.distanceTo(rcvW), g = cur === 'trilat' ? sstep(0, 2.2, t - 0.3 * i) : 1;
    m.position.copy(s.w); m.scale.setScalar(Math.max(0.01, R * g));
  });
  if (chosen && chosen[0] && vis.beam1 > 0.01) {
    const b = beams[0]; b.line.visible = true; const a = b.line.geometry.attributes.position;
    a.setXYZ(0, chosen[0].w.x, chosen[0].w.y, chosen[0].w.z); a.setXYZ(1, rcvW.x, rcvW.y, rcvW.z); a.needsUpdate = true;
    b.line.material.opacity = 0.9 * vis.beam1; sigGroup.visible = true;
    b.pulses.forEach((p, j) => { p.visible = j === 0; p.material.opacity = vis.beam1; p.position.copy(chosen[0].w).lerp(rcvW, (Tt * 0.42) % 1); });
    beams.slice(1).forEach(bb => { bb.line.visible = false; bb.pulses.forEach(p => p.visible = false); });
  } else beams.forEach(bb => { bb.line.visible = true; bb.pulses.forEach(p => p.visible = true); });
  if (vis.lc > 0.01) updLightClocks(t, cur === 'lightclock2');
  if (vis.well > 0.01) {
    const u = Tt * 0.35; wellSat.position.set(WR * Math.cos(u), depth(WR) + 0.45, WR * Math.sin(u)); wellSat.lookAt(wellGroup.position.x, wellSat.position.y + wellGroup.position.y - 0.4, wellGroup.position.z);
    wellEarth.rotation.y += dt * 0.2;
    wellSatW.copy(wellSat.position).add(WELL); wellTopW.set(0, wellEarth.position.y + 1.05, 0).add(WELL);
  }
  if (vis.map > 0.01) {
    const d = Math.min(8, Math.max(0, t - 0.8) * 0.8), x = MX0 + d, z = 0.6 + Math.sin(d * 0.7) * 0.5;
    pinGps.position.set(x, 0, z);
    const len = Math.hypot(d, z - 0.6); mapLine.scale.x = Math.max(0.001, len); mapLine.material.map.repeat.x = len * 1.6;
    mapLine.rotation.set(-Math.PI / 2, 0, -Math.atan2(z - 0.6, d));
  }
  if (vis.fix > 0.01) { bigSat.rotation.y = Tt * 0.15; clockGlow.material.opacity = 0.55 + 0.35 * Math.sin(Tt * 5); }
}
function pickSat() {   // 画面の中ほど・やや上に見えている衛星
  let best = sats[0], bd = 1e9;
  for (const s of sats) { tmp.copy(s.w).project(camera); const d = Math.hypot(tmp.x - 0.15, tmp.y - 0.45); if (tmp.z < 1 && d < bd) { bd = d; best = s; } }
  return best.w;
}
/* ---------- ラベル ---------- */
const fmtClock = sec => { const s = 9 * 3600 + sec, h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, ss = Math.floor(s) % 60, us = Math.floor((s - Math.floor(s)) * 1e6);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}.${String(us).padStart(6, '0')}`; };
function labels(name, t) {
  const s0 = chosen && chosen[0] ? chosen[0].w : null, L = [], add = (id, p, tx, o) => { if (p) L.push(Object.assign({ id, p, t: tx }, o)); };
  const rcvP = rcvW.clone().addScaledVector(rcvW.clone().normalize(), 0.45), satP = s0 ? s0.clone().addScaledVector(UP, 0.45) : null;
  if (['signal', 'trilat', 'distance'].includes(name)) add('rcv', rcvP, 'あなた', { dot: '#FF5A6E' });
  if (name === 'distance') add('sat0', satP, 'GPS衛星', { dot: '#FFD166' });
  if (name === 'clocks') {
    add('clkG', rcvP, '地上の時計', { dot: '#FF5A6E', sub: fmtClock(Math.max(0, t)), mono: true });
    add('clkS', satP, '衛星の時計', { dot: '#FFD166', sub: fmtClock(Math.max(0, t) + Math.max(0, t - 2.5) * 38e-6 * 40), mono: true });
  }
  if (name === 'lightclock' || name === 'lightclock2') add('lcA', LC.clone().add(new V3(-5, LCV.h + 0.75, 0)), '止まっている時計', { dot: '#FFE27A', sub: `往復 ${lcA.ticks} 回` });
  if (name === 'lightclock2') add('lcB', LC.clone().add(new V3(lcB.g.position.x, LCV.h + 0.75, 0)), '動いている時計', { dot: '#FFE27A', sub: `往復 ${lcB.ticks} 回` });
  if (name === 'well') { add('wellG', wellTopW.clone(), '地上', { dot: '#5CCBFF', sub: '時間がゆっくり' }); add('wellS', wellSatW.clone().add(new V3(0, 0.6, 0)), '衛星', { dot: '#FFD166', sub: '時間が速い' }); }
  if (name === 'sum') add('sum', pickSat().clone().addScaledVector(UP, 0.5), '衛星の時計', { dot: '#FFD166', sub: '1日に ＋38 μs' });
  if (name === 'map') {
    add('mapT', MAP.clone().add(new V3(MX0, 1.9, 0.6)), 'ほんとうの位置', { dot: '#3FBF7F' });
    add('mapG', MAP.clone().add(pinGps.position).add(new V3(0, 1.9, 0)), 'GPSの答え', { dot: '#FF5A6E' });
    add('mapD', MAP.clone().add(new V3((MX0 + pinGps.position.x) / 2, 0.1, 1.4)), 'ずれ', { dot: '#C03048', sub: '1日に 約11 km 分' });
  }
  if (name === 'fix') add('fixC', FIX.clone().add(new V3(0, 0.75, 0)), '原子時計', { dot: '#7CE0FF', sub: '10.22999999543 MHz' });
  return L;
}
return { scenes: Object.keys(SC), enter, update, camera: (name, t) => (SC[name] || SC.intro).cam(t), labels };
  },
  // 台本：w 話し手、t 字幕、k 読み（かな）、s 場面、e 表情、st 調子、b ボード
  lines: [
    { w: 'B', s: 'intro', t: 'ねえノア、スマホの地図って、なんで自分の場所がわかるの？',
      k: "ねえ のあ、すまほの ち'ずって、な'んで じぶんの ばしょが わか'るの？" },
    { w: 'A', s: 'intro', e: { A: 'smile' }, t: 'GPSのおかげよ。そのGPS、じつは相対性理論なしでは使えないの。',
      k: "じーぴーえ'すの おかげよ。その じーぴーえ'す、じつわ そうたいせいり'ろん なしでわ つかえな'いの。",
      b: { h: 'GPSは相対性理論なしでは使えない？', r: ['今日のテーマ'] } },
    { w: 'B', s: 'intro', e: { B: 'surprise' }, st: 'joy', t: 'えっ、相対性理論って、アインシュタインのあれ？ スマホと関係あるの？',
      k: "/eq/、そうたいせいり'ろんって、あいんしゅ'たいんの あれ？ すまほと かんけい あ'るの？" },
    { w: 'A', s: 'intro', e: { A: 'smile' }, t: '大ありよ。まずは、GPSのしくみから見ていきましょう。',
      k: "おおあ'りよ。まずわ、じーぴーえ'すの しくみから みて いきましょ'う。" },

    { w: 'A', s: 'orbits', t: '地球のまわりには、GPS衛星が30機ほど回っているの。',
      k: "ちきゅうの まわりにわ、じーぴーえ'すの えいせいが、さんじゅ'っき ほど まわって いるの。",
      b: { h: 'GPS衛星', r: ['30機あまりが運用中', '高さ 約20,200 km', '1周 約12時間'] } },
    { w: 'A', s: 'orbits', t: '高さはおよそ2万キロ。1日に地球を2周するわ。',
      k: "たかさわ およそ にま'ん きろ。いちにちに ちきゅうを にしゅう するわ。" },
    { w: 'B', s: 'orbits', t: 'そんなに遠くにあるのに、どうやって場所がわかるの？',
      k: "そんなに とおくに あるのに、どうやって ばしょが わか'るの？" },
    { w: 'A', s: 'signal', t: '衛星は「いま何時何分何秒」という時刻を、電波でずっと送っているの。',
      k: "えいせいわ、いま な'んじ な'んぷん な'んびょう という じこくを、でんぱで ずっと おくって いるの。",
      b: { h: '距離 ＝ 電波の速さ × かかった時間', r: [] } },
    { w: 'A', s: 'signal', t: '届くまでにかかった時間がわかれば、衛星までの距離がわかるわ。',
      k: "とど'くまでに かかった じかんが わかれ'ば、えいせいまでの きょ'りが わかるわ。" },
    { w: 'A', s: 'trilat', t: '3つの衛星からの距離がわかれば、3つの球が交わる1点が、あなたの居場所。',
      k: "みっつの えいせいからの きょ'りが わかれ'ば、みっつの きゅうが まじわる いってんが、あなたの いばしょ。" },
    { w: 'A', s: 'trilat', t: '実際は受信機の時計のずれも一緒に解くので、4つ以上の衛星を使うの。',
      k: "じっさいわ、じゅしんきの とけいの ずれも いっしょに とくので、よっつ い'じょうの えいせいを つかうの。",
      b: { h: '4機以上で位置を決める', r: ['未知数：x, y, z と受信機の時計のずれ'] } },

    { w: 'B', s: 'distance', t: '時間をはかって距離にするんだね。でも、電波ってすごく速いんでしょ？',
      k: "じかんを はか'って きょ'りに するんだね。でも、でんぱって す'ごく はや'いんでしょ？" },
    { w: 'A', s: 'distance', t: 'そう。電波は光と同じ速さで、1秒に約30万キロ進むの。',
      k: "そう。でんぱわ ひかり'と おなじ はやさで、いちびょうに やく さんじゅうま'ん きろ すすむの。",
      b: { h: '時計の1マイクロ秒 ＝ 約300 m', r: ['光の速さ 約30万 km/秒', '1 μs ＝ 100万分の1秒'] } },
    { w: 'A', s: 'distance', t: 'つまり時計が1マイクロ秒ずれるだけで、距離は300メートルもずれるわ。',
      k: "つまり とけいが いち まいく'ろびょう ずれるだけで、きょ'りわ さんびゃく めーとるも ずれるわ。" },
    { w: 'B', s: 'distance', e: { B: 'surprise' }, st: 'joy', t: '300メートル！ それじゃあ、となりの駅にいることになっちゃう。',
      k: "さんびゃく めーとる！ それじゃあ、となりの え'きに いる ことに なっちゃう。" },
    { w: 'A', s: 'clocks', t: 'だから衛星の時計は、とても正確な原子時計なの。',
      k: "だから えいせいの とけいわ、とても せいかくな げんしど'けいなの。" },
    { w: 'A', s: 'clocks', t: 'ところが、その正確な時計が、宇宙では地上とちがう速さで進んでしまうのよ。',
      k: "ところが、その せいかくな とけいが、う'ちゅうでわ ちじょうと ちがう はやさで すすんで しまうのよ。" },
    { w: 'B', s: 'clocks', e: { B: 'jito' }, t: '時計の進み方がちがう？ そんなことってあるの？',
      k: "とけいの すすみかたが ちがう？ そんな ことって あ'るの？" },

    { w: 'A', s: 'lightclock', t: '理由は2つあるの。1つ目は「速く動く時計は遅れる」。特殊相対性理論ね。',
      k: "りゆうわ ふたつ' あるの。ひとつめわ、はや'く うご'く とけいわ おくれる。とくしゅ そうたいせいり'ろん ね。",
      b: { h: '理由1 速く動く時計は遅れる', r: ['特殊相対性理論'] } },
    { w: 'A', s: 'lightclock', t: '上と下の鏡のあいだを光が往復する「光の時計」で考えましょう。',
      k: "うえと したの かがみ'の あいだを ひかり'が おうふくする、ひかり'の とけいで かんがえましょ'う。" },
    { w: 'A', s: 'lightclock', t: '止まっている時計では、光はまっすぐ上下に行き来するわ。',
      k: "とまって いる とけいでわ、ひかり'わ まっす'ぐ うえしたに いききするわ。" },
    { w: 'A', s: 'lightclock2', t: 'ところが、この時計が横に動くと、外から見た光は、ななめのジグザグを進むの。',
      k: "ところが、この とけいが よこに うご'くと、そとから みた ひかり'わ、ななめの じぐざぐを すすむの。" },
    { w: 'B', s: 'lightclock2', e: { B: 'surprise' }, t: 'ななめの方が、道のりが長い……！',
      k: "ななめの ほうが、みちのりが なが'い…" },
    { w: 'A', s: 'lightclock2', t: 'そう。でも光の速さは、誰から見ても同じ。',
      k: "そう。でも ひかり'の はやさわ、だ'れから みても おなじ。",
      b: { h: '光の速さは、誰から見ても同じ', r: ['ななめの道は長い → 1往復が長い', '→ 動く時計は遅れる'] } },
    { w: 'A', s: 'lightclock2', t: '長い道のりを同じ速さで進むから、1往復に時間がかかるの。',
      k: "なが'い みちのりを おなじ はやさで すすむから、いち おうふくに じかんが かかるの。" },
    { w: 'A', s: 'lightclock2', t: 'つまり、動いている時計は、ゆっくり進むのよ。',
      k: "つまり、うご'いて いる とけいわ、ゆっく'り すすむのよ。" },
    { w: 'A', s: 'lightclock2', t: 'GPS衛星の速さは、秒速およそ4キロ。',
      k: "じーぴーえ'すの えいせいの はやさわ、びょうそく およそ よん きろ。" },
    { w: 'A', s: 'lightclock2', t: 'この効果で、衛星の時計は、1日に約7マイクロ秒遅れるわ。',
      k: "この こ'うかで、えいせいの とけいわ、いちにちに やく なな まいく'ろびょう おくれるの。",
      b: { h: '速さの効果 1日に約 −7 μs', r: ['衛星の速さ 約3.9 km/秒', '図の速さは大げさに描いています'] } },

    { w: 'B', s: 'well', t: 'じゃあ、衛星の時計は遅れていくんだね。',
      k: "じゃあ、えいせいの とけいわ、おくれて いくんだね。" },
    { w: 'A', s: 'well', t: 'それが、もう1つあるの。2つ目は「重力が強いほど時計は遅れる」。一般相対性理論よ。',
      k: "それが、もう ひとつ' あるの。ふたつめわ、じゅ'うりょくが つよ'いほど とけいわ おくれる。いっぱん そうたいせいり'ろん よ。",
      b: { h: '理由2 重力が強いほど時計は遅れる', r: ['一般相対性理論'] } },
    { w: 'A', s: 'well', t: '重力は、時間と空間のゆがみ。地球のまわりは、くぼみのようにゆがんでいるの。',
      k: "じゅ'うりょくわ、じかんと くうかんの ゆがみ。ちきゅうの まわりわ、くぼみの ように ゆがんで いるの。" },
    { w: 'A', s: 'well', t: 'くぼみの底に近い地上ほど、時間はゆっくり流れるわ。',
      k: "くぼみの そこに ちか'い ちじょう ほど、じかんわ ゆっく'り ながれ'るの。" },
    { w: 'B', s: 'well', t: '衛星は、くぼみのずっと上にいるから……？',
      k: "えいせいわ、くぼみの ずっと うえに いるから…" },
    { w: 'A', s: 'well', e: { A: 'smile' }, t: 'そう、地上より速く進む。こちらは1日に約45マイクロ秒、進むわ。',
      k: "そう、ちじょうより はや'く すすむ。こちらわ いちにちに やく よんじゅうご まいく'ろびょう、すすむの。",
      b: { h: '重力の効果 1日に約 ＋45 μs', r: ['高い所ほど、時計は速く進む'] } },

    { w: 'A', s: 'sum', t: '合わせると、45引く7で、1日に約38マイクロ秒。',
      k: "あわせると、よんじゅうご ひく なな で、いちにちに やく さんじゅうはち まいく'ろびょう。",
      b: { h: '＋45 − 7 ＝ ＋38 μs／日', r: ['衛星の時計は、1日に約38マイクロ秒進む'] } },
    { w: 'A', s: 'sum', t: '衛星の時計のほうが、進んでしまうの。',
      k: "えいせいの とけいの ほうが、すすんで しまうの。" },
    { w: 'B', s: 'sum', e: { B: 'jito' }, t: '38マイクロ秒って、さっきの計算だと……',
      k: "さんじゅうはち まいく'ろびょうって、さっきの けいさんだと…" },
    { w: 'A', s: 'map', t: '光なら約11キロ。単純に距離に直すと、1日で11キロ分のずれがたまる計算よ。',
      k: "ひかり'なら やく じゅういち きろ。たんじゅんに きょ'りに なおすと、いちにちで じゅういち きろぶんの ずれが たまる けいさん よ。",
      b: { h: '38 μs × 光の速さ ≒ 11 km', r: ['距離に直すと、1日に約11 km分'] } },
    { w: 'A', s: 'map', t: '実際の誤差の出かたはもう少しややこしいけれど、放っておけない大きさなのは確かね。',
      k: "じっさいの ごさの でかたわ、もう すこし ややこし'いけれど、ほうって おけない おおきさなのわ た'しかね。" },
    { w: 'B', s: 'map', e: { B: 'surprise' }, st: 'joy', t: 'ひゃー、1日でとなりの町まで行っちゃう！',
      k: "ひゃあ、いちにちで となりの まち'まで いっちゃう！" },

    { w: 'B', s: 'fix', t: 'じゃあ、どうやって直してるの？',
      k: "じゃあ、どうやって なお'してるの？" },
    { w: 'A', s: 'fix', t: '打ち上げる前に、衛星の時計を、わざと少しゆっくり刻むように合わせておくの。',
      k: "うちあげる まえ'に、えいせいの とけいを、わざと すこし ゆっく'り きざむように あわせて おくの。",
      b: { h: '10.23 MHz → 10.22999999543 MHz', r: ['地上で、わざと遅めに合わせて打ち上げる'] } },
    { w: 'A', s: 'fix', t: '基準の10.23メガヘルツより、100億分の4.5だけ低くね。',
      k: "きじゅんの じゅってん にさん めがへ'るつより、ひゃくお'くぶんの よんてんご だけ、ひくくね。" },
    { w: 'B', s: 'fix', e: { B: 'smile' }, st: 'joy', t: '宇宙に上がると、ちょうどぴったりになるんだ！',
      k: "う'ちゅうに あがると、ちょうど ぴった'りに なるんだ！" },
    { w: 'A', s: 'fix', t: 'ほかにも、軌道が少しだけ楕円になっている分などは、受信機の側で計算して補正しているわ。',
      k: "ほかにも、きどうが すこしだけ だえんに なって いる ぶんなどわ、じゅしんきの がわで けいさんして ほせいして いるの。",
      b: { h: '残りの補正は受信機で', r: ['軌道のわずかな楕円の分など'] } },

    { w: 'B', s: 'outro', t: '相対性理論って、宇宙の遠い話だと思ってた。',
      k: "そうたいせいり'ろんって、う'ちゅうの とおい はなしだと おもってた。" },
    { w: 'A', s: 'outro', e: { A: 'smile' }, t: '毎日ポケットの中で使っている理論なのよ。今日の話はここまで。',
      k: "まいにち ぽけ'っとの なかで つかって いる りろんなのよ。きょ'うの はなし'わ、ここまで。",
      b: { h: 'まとめ', r: ['速さの効果 −7 μs／日', '重力の効果 ＋45 μs／日', '打ち上げ前に、時計をわざと遅めに合わせる'] } },
    { w: 'B', s: 'outro', e: { A: 'smile', B: 'smile' }, st: 'joy', t: 'ありがとう、ノア！',
      k: "ありがと'う、のあ！" },
  ],
});
