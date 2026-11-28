/* ===== 回：玄関の靴を数えてはいけない（3D怪談） =====
   語りのノアが、子供のころの話をする。聞き役はヒナ。
   場面：出船と入船の見本 → 古い借家の玄関・廊下・和室 → 朝の茶の間 → いまの玄関 → 暗やみ。
   怖がらせる道具に、この解説ツールの部品そのもの（物に付くラベル、POINT のボード、字幕）を使っている。
   ・ラベルは「数える」役。玄関の靴、夜ごとの足あと、お茶わん、最後は近づいてくる靴の歩数を数える
   ・字幕の「よにん」を読んだ人も、数えたことになる、という落ち
   場面の中の時刻（ラベルが出る時刻、暗転の時刻）は、声の長さ（ノア otona・速さ0.95）から見積もった値。
   声を変えると、少しずれる（こわれはしない） */
(function () {
  /* ---------- この回の BGM（TextScore の譜面。8小節を *R でくり返す） ---------- */
  const B = Kaisetsu.BGM;
  // わらべうた：都節の音階のオルゴール。2台を少しずらして調律し、古いオルゴールのゆらぎを出す
  B.kaidan_intro = { label: '怪談：わらべうた', gain: 0.9, score: `
title kaidan_intro
tempo 66
reverb 4.5
delay 0.75
def m1 = A5 G5 A5 -:1 | Bb5 A5:0.5 G5:0.5 D5:2 | A5 G5 Eb5 D5 | G5:3 -:1 |
def m2 = A5 Bb5 D6 -:1 | Bb5 A5:0.5 G5:0.5 A5:2 | G5 Eb5 D5 Eb5 | D5:3 -:1 |
@box musicbox vol=0.4 rev=0.55 dly=0.3 det=-22 len=1
[$m1 $m2]*R
@ghost musicbox vol=0.15 rev=0.8 dly=0.4 det=27 oct=-1 len=1
[$m1 $m2]*R
@pad pad vol=0.18 rev=0.6 cut=1800
[D3+A3+Eb4:4 | D3+A3+Eb4:4 | C3+G3+Eb4:4 | C3+G3+D4:4 | Bb2+F3+D4:4 | Bb2+F3+Eb4:4 | A2+Eb3+G3:4 | D3+A3:4 |]*R
@sub sub vol=0.3
[D2:4 | D2:4 | C2:4 | C2:4 | Bb1:4 | Bb1:4 | A1:4 | D2:4 |]*R
@gong drums vol=0.18
[[g - - - - - - - | - - - - - - - - | - - - - - - - - | - - - - - - - - |]*2]*R
` };
  // 夜の玄関：低いうなりと、半音でぶつかる弦、柱時計のような木の音
  B.kaidan_yoru = { label: '怪談：夜の玄関', gain: 1.0, score: `
title kaidan_yoru
tempo 60
reverb 5
@tick drums vol=0.2 len=0.5
[[w? - w?? - w? - w?? - |]*8]*R
@drone sub vol=0.34
[D2:4 | D2:4 | D2:4 | D2:4 | Eb2:4 | Eb2:4 | D2:4 | D2:4 |]*R
@str strings vol=0.12 rev=0.7 hp=300
[A4+Eb5:4 | A4+Eb5:4 | Bb4+E5:4 | Bb4+E5:4 | A4+Eb5:4 | A4+Eb5:4 | G#4+D5:4 | A4+Eb5:4 |]*R
@pno piano vol=0.26 rev=0.65
[D2+Eb2?:4 | -:4 | -:4 | -:2 A1?:2 | D2+Eb2?:4 | -:4 | -:4 | -:4 |]*R
@cho choir vol=0.1 rev=0.75
[D4:4 | D4:4 | Eb4:4 | Eb4:4 | D4:4 | D4:4 | C#4:4 | D4:4 |]*R
@bell bell vol=0.08 rev=0.8 dly=0.5
[-:4 | -:4 | -:3 D6?:1 | -:4 | -:4 | -:4 | -:2 Eb6??:2 | -:4 |]*R
` };
  // 近づく：心臓の音と、半音ずつ上がっていく弦のかたまり
  B.kaidan_semaru = { label: '怪談：近づく', gain: 0.9, score: `
title kaidan_semaru
tempo 76
reverb 3.5
@heart drums vol=0.45 len=0.25
[[k k? - - - - - - k k? - - - - - - |]*8]*R
@low bass vol=0.38 len=0.5 cut=900
[[D2 - D2? - D2 - D2? - |]*4 [Eb2 - Eb2? - Eb2 - Eb2? - |]*2 [D2 - D2? - D2 - D2? - |]*2]*R
@str strings vol=0.18 rev=0.5 trem=7
[D3+Eb3+A3:4 | D3+Eb3+A3:4 | D3+Eb3+Bb3:4 | D3+E3+Bb3:4 | Eb3+E3+Bb3:4 | Eb3+F3+B3:4 | E3+F3+C4:4 | F3+F#3+C4:4 |]*R
@hi violin vol=0.09 rev=0.8 glide=0.6 vib=0.4
[E6:8 | F6:8 | E6:4 Eb6:4 | D6:8 |]*R
` };
  // 子守唄：わらべうたを、遅く、低く、もっと狂わせて。遠くで子供が、ささやき声で口ずさむ
  B.kaidan_owari = { label: '怪談：子守唄', gain: 0.95, score: `
title kaidan_owari
tempo 54
reverb 6
delay 0.75
@box musicbox vol=0.3 rev=0.7 dly=0.35 det=-35 oct=-1 len=1
[A5 G5 A5 -:1 | Bb5 A5:0.5 G5:0.5 D5:2 | A5 G5 Eb5 D5 | G5:4 | A5 Bb5 D6 -:1 | Bb5 A5:0.5 G5:0.5 A5:2 | G5 Eb5 D5 Eb5 | D5:4 |]*R
@hum voicek vol=0.3 rev=0.75 whisper=0.6 air=1
[-:4 | -:4 | A4:2 G4:2 | D4:4 | -:4 | -:4 | G4:2 Eb4:2 | D4:4 |]*R
うううううう うううううう
@drone sub vol=0.3
[D2:4 | D2:4 | D2:4 | D2:4 | C#2:4 | C#2:4 | D2:4 | D2:4 |]*R
@air pad vol=0.12 rev=0.8 cut=1200
[D3+A3:4 | D3+A3:4 | D3+Bb3:4 | D3+Bb3:4 | C#3+G3:4 | C#3+G3:4 | D3+A3:4 | D3+A3:4 |]*R
` };
})();

Kaisetsu.episode({
  id: 'kutsu', fileName: '玄関の靴を数えてはいけない',
  title: '玄関の靴を数えてはいけない', titleLines: ['玄関の靴を', '数えては', 'いけない'], eyebrow: '3D怪談',
  background: '#030407',
  cast: {
    A: { name: 'ノア', role: '語り', color: '#B0487A', voice: { voice: 'otona', speed: 0.95 },
         look: { hair: 'bob', hairColor: 'nureba', eye: 'sumire', ornament: 'none', hat: 'none' } },
    B: { name: 'ヒナ', role: '聞き役', color: '#C9762C', voice: { voice: 'shoujo', speed: 1.05 },
         look: { hair: 'short', hairColor: 'akagane', eye: 'midori', ornament: 'none', hat: 'knit' } },
  },
  chapters: [['はじめに', ['debune', 'irifune']], ['四足目', ['ie', 'yoru', 'kazoe', 'yon']], ['一晩に一歩', ['agari', 'rouka', 'haha']],
    ['五晩目', ['heya', 'fusuma', 'yonin']], ['よにんめ', ['chanoma', 'ima', 'kimi']]],
  // 和室の場面（heya・fusuma・yonin）は、わざと BGM なし
  bgm: { debune: 'kaidan_intro', irifune: 'kaidan_intro', ie: 'kaidan_intro', yoru: 'kaidan_yoru', kazoe: 'kaidan_yoru', yon: 'kaidan_yoru',
    agari: 'kaidan_semaru', rouka: 'kaidan_semaru', haha: 'kaidan_semaru', chanoma: 'kaidan_intro', ima: 'kaidan_yoru', kimi: 'kaidan_owari' },

  world(K) {
    const T = K.THREE, V3 = T.Vector3, scene = K.scene, PI = Math.PI;
    const { toon, outline, glow, fade, clamp, lerp, sstep } = K;
    const rnd = K.rand(20261124);
    const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
    const BG = '#030407';

    /* ---------- 明かりと霧（場面ごとの見え方は、下の LOOK にまとめる） ---------- */
    const amb = scene.children.find(o => o.isAmbientLight), sun = K.sun;
    if (amb) amb.color.set('#8a96c8');
    sun.color.set('#a9b8e6');                                   // 月明かりの色
    scene.fog = new T.Fog(BG, 6, 18);
    scene.background = new T.Color(BG);
    const LIGHT = {};
    const point = (key, color, x, y, z, dist) => { const l = new T.PointLight(color, 0, dist, 1.4); l.position.set(x, y, z); scene.add(l); LIGHT[key] = l; return l; };

    /* ---------- 絵の具（キャンバスで描くテクスチャ） ---------- */
    const shade = (hex, f) => { const c = new T.Color(hex).multiplyScalar(f); return '#' + c.getHexString(); };
    function ctex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.anisotropy = 4; return t; }
    const tiled = (base, rx, ry) => { const t = base.clone(); t.needsUpdate = true; t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rx, ry); return t; };
    const planks = (base, n) => ctex(256, 256, (x, w, h) => {
      const pw = w / n;
      for (let i = 0; i < n; i++) {
        x.fillStyle = shade(base, 0.82 + rnd() * 0.3); x.fillRect(i * pw, 0, pw, h);
        x.globalAlpha = 0.16; x.fillStyle = '#1e140b';
        for (let k = 0; k < 7; k++) x.fillRect(i * pw + 3 + rnd() * (pw - 6), 0, 1 + rnd() * 1.4, h);
        x.globalAlpha = 1; x.fillStyle = '#1a110a'; x.fillRect(i * pw, 0, 2, h); x.fillRect(i * pw, rnd() * h, pw, 2);
      }
    });
    const woodTex = planks('#6d4d33', 4), floorTex = planks('#9a8064', 6);
    const concreteTex = ctex(256, 256, (x, w, h) => { x.fillStyle = '#57554f'; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 1400; i++) { x.fillStyle = rnd() < 0.5 ? 'rgba(0,0,0,.18)' : 'rgba(255,255,255,.08)'; x.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 2, 1 + rnd() * 2); } });
    const tatamiTex = ctex(128, 256, (x, w, h) => { x.fillStyle = '#8a8758'; x.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 3) { x.fillStyle = (y / 3) % 2 ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.05)'; x.fillRect(0, y, w, 2); }
      x.fillStyle = '#1c2218'; x.fillRect(0, 0, 9, h); x.fillRect(w - 9, 0, 9, h); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(0, 0, w, 2); });
    const tileTex = ctex(128, 128, (x, w, h) => { x.fillStyle = '#7c8087'; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { x.fillStyle = shade('#b9bdc4', 0.92 + rnd() * 0.1); x.fillRect(i * 64 + 2, j * 64 + 2, 60, 60); } });
    const fusumaTex = ctex(128, 256, (x, w, h) => { x.fillStyle = '#d4cbb0'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(120,104,70,.28)'; x.lineWidth = 2;                       // うすい雲の模様
      for (let i = 0; i < 6; i++) { const y = 30 + i * 38 + rnd() * 10; x.beginPath(); x.moveTo(10, y); x.bezierCurveTo(40, y - 14, 80, y + 14, 118, y - 4); x.stroke(); }
      x.fillStyle = '#2a1e14'; x.fillRect(0, 0, w, 7); x.fillRect(0, h - 7, w, 7); x.fillRect(0, 0, 7, h); x.fillRect(w - 7, 0, 7, h);
      x.fillStyle = '#3a2e22'; x.beginPath(); x.arc(w - 22, h * 0.52, 7, 0, PI * 2); x.fill(); });
    const shojiTex = ctex(256, 192, (x, w, h) => { x.fillStyle = '#eef0f4'; x.fillRect(0, 0, w, h); x.fillStyle = '#2b2824';
      for (let i = 0; i <= 8; i++) x.fillRect(Math.min(w - 4, i * 32), 0, 4, h); for (let j = 0; j <= 4; j++) x.fillRect(0, Math.min(h - 4, j * 48), w, 4); });
    const glassTex = ctex(128, 256, (x, w, h) => { x.fillStyle = '#dde1e8'; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 900; i++) { x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(rnd() * w, rnd() * h, 2, 2); }
      x.fillStyle = '#2a1e14'; for (let y = 0; y < h; y += 42) x.fillRect(0, y, w, 4); x.fillRect(w / 2 - 2, 0, 4, h); x.fillRect(0, 0, 6, h); x.fillRect(w - 6, 0, 6, h); x.fillRect(0, h - 6, w, 6); });
    const futonTex = ctex(128, 128, (x, w, h) => { x.fillStyle = '#3e4e7a'; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(230,235,245,.55)';
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const cx = i * 32 + (j % 2) * 16 + 8, cy = j * 32 + 10; for (let p = 0; p < 5; p++) { const a = p / 5 * PI * 2; x.beginPath(); x.arc(cx + Math.cos(a) * 4, cy + Math.sin(a) * 4, 2.6, 0, PI * 2); x.fill(); } } });
    // 濡れた、小さな、はだしの足あと（右足。左足は裏返して使う）。暗い床でも見えるよう、ふちが光を返す
    const footTex = ctex(64, 128, (x) => {
      const blob = (cx, cy, rx, ry, a) => { x.beginPath(); x.ellipse(cx, cy, rx, ry, a || 0, 0, PI * 2); x.fill(); };
      const shape = () => { blob(33, 54, 15, 17); blob(29, 99, 12, 15); blob(24, 77, 8, 20, 0.12); blob(40, 22, 6.5, 7.5); blob(29, 20, 4.6, 5.2); blob(20, 23, 4.2, 4.8); blob(13, 29, 3.8, 4.4); blob(8, 37, 3.3, 3.8); };
      x.fillStyle = 'rgba(150,170,212,.55)'; shape();
      x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(8,11,18,.7)'; x.translate(2, 3); shape();
    });
    // 水たまり：ふちのぼけた、いびつな濡れあと
    const puddleTex = ctex(128, 128, (x, w, h) => {
      x.filter = 'blur(5px)'; x.fillStyle = 'rgba(6,9,15,.75)';
      for (const [cx, cy, rx, ry] of [[64, 66, 40, 44], [44, 50, 22, 20], [84, 84, 24, 22], [70, 34, 18, 16]]) { x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, PI * 2); x.fill(); }
      x.filter = 'blur(1.5px)'; x.strokeStyle = 'rgba(140,160,205,.35)'; x.lineWidth = 2; x.beginPath(); x.arc(64, 64, 42, -2.4, -1.2); x.stroke();
    });
    const poolTex = ctex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(0.5, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });

    /* ---------- 形を作る道具 ---------- */
    function box(parent, w, h, d, x, y, z, color, map) {
      const m = new T.Mesh(new T.BoxGeometry(w, h, d), toon(map ? '#ffffff' : color, map ? { map } : undefined));
      m.position.set(x, y, z); parent.add(m); return m;
    }
    // 靴（1つ）：底と、半分の球の甲と、はき口。+z がつま先
    function shoe(o) {
      const g = new T.Group(), ex = o.glow ? { emissive: new T.Color(o.glow) } : undefined;
      // 底：だ円の板（角を出さない）
      const so = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 1, 28), toon(o.sole, ex)); so.scale.set(o.w * 1.08, o.h * 0.24, o.L); so.position.y = o.h * 0.12; g.add(so); outline(so, '#07080b', 1.05);
      // 甲：半分の球。つま先側は低く、かかと側は高い（向きが分かるように）
      const up = new T.Mesh(new T.SphereGeometry(0.5, 24, 12, 0, PI * 2, 0, PI / 2), toon(o.upper, ex));
      up.scale.set(o.w, o.h * 1.5, o.L * 0.96); up.position.set(0, o.h * 0.2, o.L * 0.01); g.add(up); outline(up, '#07080b', 1.07);
      const heel = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 1, 22), toon(o.upper, ex));
      heel.scale.set(o.w * 0.94, o.h * 1.0, o.L * 0.46); heel.position.set(0, o.h * 0.7, -o.L * 0.25); g.add(heel); outline(heel, '#07080b', 1.06);
      // はき口：かかと寄りの、小さな暗いだ円
      const op = new T.Mesh(new T.CircleGeometry(0.5, 20), new T.MeshBasicMaterial({ color: o.inner }));
      op.rotation.x = -PI / 2; op.scale.set(o.w * 0.66, o.L * 0.32, 1); op.position.set(0, o.h * 1.2 + 0.002, -o.L * 0.27); g.add(op);
      if (o.strap) { const s = new T.Mesh(new T.BoxGeometry(o.w * 1.04, o.h * 0.16, o.L * 0.15), toon(o.strap, ex)); s.position.set(0, o.h * 0.88, o.L * 0.06); g.add(s); }
      return g;
    }
    function pair(o) { const g = new T.Group(); for (const sg of [-1, 1]) { const s = shoe(o); s.position.x = sg * o.w * 0.66; s.rotation.y = -sg * 0.05; g.add(s); } return g; }
    const SNEAK = { L: 0.2, w: 0.085, h: 0.075, upper: '#b9473e', sole: '#ece7dc', inner: '#2a1a16' };
    const FATHER = { L: 0.29, w: 0.105, h: 0.085, upper: '#2c2724', sole: '#141110', inner: '#0b0908' };
    const MOTHER = { L: 0.24, w: 0.085, h: 0.062, upper: '#73363a', sole: '#2b1a1a', inner: '#1a0f10' };
    const CHILD = { L: 0.19, w: 0.075, h: 0.07, upper: '#3e6fb3', sole: '#e9e6de', inner: '#162033', strap: '#e9e6de' };
    const PUMPS = { L: 0.24, w: 0.08, h: 0.058, upper: '#1d1e25', sole: '#0e0e12', inner: '#4a3535' };
    const GHOST = { L: 0.145, w: 0.06, h: 0.058, upper: '#f1f4f7', sole: '#cfd5de', inner: '#0b0d12', strap: '#dde2e9', glow: '#2b3443' };
    // 四足目：白くて小さい、濡れた靴。足もとに水たまり
    function ghostPair() {
      const g = pair(GHOST);
      const pud = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: puddleTex, transparent: true, opacity: 0.9, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 }));
      pud.rotation.x = -PI / 2; pud.scale.set(0.3, 0.36, 1); pud.position.y = 0.003; g.add(pud);
      for (let i = 0; i < 5; i++) { const d = new T.Mesh(new T.SphereGeometry(0.009, 8, 6), toon('#9fb0c8')); d.scale.y = 0.4; d.position.set((rnd() - 0.5) * 0.24, 0.005, (rnd() - 0.5) * 0.3); g.add(d); }
      return g;
    }
    const footGeo = new T.PlaneGeometry(0.075, 0.15);
    const footMat = new T.MeshBasicMaterial({ map: footTex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
    // 足あとを a から b まで並べる。yAt(z) は床の高さ
    function trail(list, parent, a, b, night, yAt, step) {
      const A = new V3(a[0], 0, a[2]), Bv = new V3(b[0], 0, b[2]), d = Bv.clone().sub(A), len = d.length();
      const n = Math.max(2, Math.round(len / (step || 0.21))), dir = d.clone().normalize(), side = new V3(dir.z, 0, -dir.x), ang = Math.atan2(dir.x, dir.z);
      for (let i = 1; i < n; i++) {
        const p = A.clone().addScaledVector(d, i / n).addScaledVector(side, (i % 2 ? 1 : -1) * 0.05);
        const f = new T.Mesh(footGeo, footMat); f.rotation.order = 'YXZ'; f.rotation.set(-PI / 2, ang + PI + (rnd() - 0.5) * 0.2, 0);
        f.scale.x = i % 2 ? 1 : -1; f.position.set(p.x, yAt(p.z) + 0.003, p.z); f.userData.night = night; parent.add(f); list.push(f);
      }
    }

    /* ======================= 見本の床（出船・入船） x = 400 ======================= */
    const X0 = 400, lec = new T.Group(); lec.position.x = X0; scene.add(lec);
    box(lec, 6, 0.1, 6, 0, -0.05, 0, null, tiled(woodTex, 10, 5));
    const LW = '#3b3731';
    box(lec, 2.25, 2.8, 0.1, -1.875, 1.4, 2.05, LW); box(lec, 2.25, 2.8, 0.1, 1.875, 1.4, 2.05, LW); box(lec, 1.5, 0.4, 0.1, 0, 2.6, 2.05, LW);
    box(lec, 0.1, 2.4, 0.16, -0.75, 1.2, 2.0, '#241a12'); box(lec, 0.1, 2.4, 0.16, 0.75, 1.2, 2.0, '#241a12'); box(lec, 1.6, 0.1, 0.16, 0, 2.4, 2.0, '#241a12');
    const outsideMat = new T.MeshBasicMaterial({ color: '#aab8d6' });
    const outside = new T.Mesh(new T.PlaneGeometry(1.4, 2.35), outsideMat); outside.rotation.y = PI; outside.position.set(0, 1.175, 2.07); lec.add(outside);
    const lecGlow = glow('#c9d6ff', 3.4); lecGlow.position.set(0, 1.2, 1.85); lec.add(lecGlow);
    point('lec', '#c9d6ff', X0, 1.7, 1.4, 7.5);
    const lecPair = pair(SNEAK); lecPair.scale.setScalar(3); lecPair.position.set(0, 0, 0.25); lec.add(lecPair);

    /* ======================= 古い借家 x = 0 =======================
       土間 z 0〜1.5（玄関の戸は z = 1.48）、板の間 z −1〜0、廊下 z −7〜−1、和室 z −10.5〜−7。床の高さ：土間 0、上 0.32 */
    const house = new T.Group(); scene.add(house);
    const WALL = '#7f786a', WALL2 = '#6f6a5f';
    box(house, 2.5, 0.2, 1.5, 0, -0.1, 0.72, null, tiled(concreteTex, 2, 1.2));
    box(house, 2.5, 0.32, 1.0, 0, 0.16, -0.5, null, tiled(woodTex, 4, 1));
    box(house, 2.52, 0.08, 0.13, 0, 0.32, -0.035, '#3a2618');                                   // 上がりかまち
    box(house, 1.1, 0.32, 6.0, 0, 0.16, -4.0, null, tiled(woodTex, 2, 5));                      // 廊下
    box(house, 0.1, 2.6, 2.5, -1.25, 1.3, 0.25, WALL); box(house, 0.1, 2.6, 2.5, 1.25, 1.3, 0.25, WALL);
    box(house, 0.7, 2.6, 0.1, -0.9, 1.3, -1.0, WALL); box(house, 0.7, 2.6, 0.1, 0.9, 1.3, -1.0, WALL);
    box(house, 0.1, 2.6, 6.0, -0.6, 1.3, -4.0, WALL); box(house, 0.1, 2.6, 6.0, 0.6, 1.3, -4.0, WALL);
    box(house, 0.02, 0.45, 6.0, -0.545, 0.55, -4.0, '#3b2a1c'); box(house, 0.02, 0.45, 6.0, 0.545, 0.55, -4.0, '#3b2a1c');   // 腰板
    box(house, 2.6, 0.06, 2.6, 0, 2.62, 0.2, '#24211d'); box(house, 1.3, 0.06, 6.2, 0, 2.62, -4.0, '#24211d');            // 天井
    // 玄関の引き戸（すりガラスと格子）
    const door = new T.Group(); door.position.set(0, 0, 1.48); house.add(door);
    box(door, 2.5, 0.14, 0.14, 0, 2.15, 0, '#2a1d13'); box(door, 0.12, 2.15, 0.14, -1.19, 1.075, 0, '#2a1d13'); box(door, 0.12, 2.15, 0.14, 1.19, 1.075, 0, '#2a1d13');
    box(door, 2.5, 0.5, 0.1, 0, 2.47, 0.02, WALL);
    const glassMat = new T.MeshBasicMaterial({ map: glassTex, color: '#6f7891' });
    for (const sx of [-0.55, 0.55]) {
      const dz = sx < 0 ? -0.035 : 0.035;
      box(door, 1.08, 2.02, 0.05, sx, 1.03, dz, '#33251a');
      const gl = new T.Mesh(new T.PlaneGeometry(0.92, 1.84), glassMat); gl.rotation.y = PI; gl.position.set(sx, 1.03, dz - 0.03); door.add(gl);
    }
    // 下駄箱
    box(house, 0.42, 0.95, 1.2, -1.0, 0.475, 0.78, '#4a3424');
    box(house, 0.02, 0.82, 0.55, -0.785, 0.48, 0.48, '#3a281b'); box(house, 0.02, 0.82, 0.55, -0.785, 0.48, 1.08, '#3a281b');
    // 裸電球
    { const c = new T.Mesh(new T.CylinderGeometry(0.006, 0.006, 0.44, 6), toon('#111111')); c.position.set(0.1, 2.4, 0.4); house.add(c);
      const s = new T.Mesh(new T.CylinderGeometry(0.03, 0.036, 0.07, 10), toon('#2a2622')); s.position.set(0.1, 2.17, 0.4); house.add(s); }
    const bulbMat = new T.MeshBasicMaterial({ color: '#ffd59a' });
    const bulb = new T.Mesh(new T.SphereGeometry(0.05, 16, 12), bulbMat); bulb.position.set(0.1, 2.1, 0.4); house.add(bulb);
    const bulbGlow = glow('#ffc781', 0.9); bulbGlow.position.copy(bulb.position); house.add(bulbGlow);
    point('bulb', '#ffc781', 0.1, 1.95, 0.4, 6.5);
    // 家族の靴（出船にそろえてある）
    const FAM = [[FATHER, -0.42, 0.62], [MOTHER, -0.04, 0.6], [CHILD, 0.3, 0.6]];
    FAM.forEach(([o, x, z]) => { const p = pair(o); p.position.set(x, 0, z); house.add(p); });
    // 和室
    box(house, 4.2, 0.32, 3.5, 0.1, 0.16, -8.75, null, tiled(tatamiTex, 4.6, 2));
    box(house, 4.3, 2.6, 0.1, 0.1, 1.3, -10.5, WALL2); box(house, 0.1, 2.6, 3.5, -2.0, 1.3, -8.75, WALL2); box(house, 0.1, 2.6, 3.5, 2.2, 1.3, -8.75, WALL2);
    box(house, 1.45, 2.6, 0.1, -1.275, 1.3, -7.0, WALL2); box(house, 1.65, 2.6, 0.1, 1.375, 1.3, -7.0, WALL2);
    box(house, 1.1, 0.38, 0.12, 0, 2.41, -7.0, '#2e2117'); box(house, 4.3, 0.06, 3.6, 0.1, 2.62, -8.75, '#201d1a');
    const fL = new T.Mesh(new T.BoxGeometry(0.56, 1.9, 0.035), toon('#ffffff', { map: fusumaTex })); fL.position.set(-0.27, 1.27, -6.98); house.add(fL);
    const fR = new T.Mesh(new T.BoxGeometry(0.56, 1.9, 0.035), toon('#ffffff', { map: fusumaTex })); fR.position.set(0.27, 1.27, -7.02); house.add(fR);
    const shojiMat = new T.MeshBasicMaterial({ map: shojiTex, color: '#4a5878' });
    { const s = new T.Mesh(new T.PlaneGeometry(1.4, 1.0), shojiMat); s.position.set(2.14, 1.45, -8.15); s.rotation.y = -PI / 2; house.add(s); }
    point('room', '#7f93c9', 1.6, 1.5, -8.2, 5.5);
    point('hall', '#8796c4', 0.0, 2.3, -3.9, 6);                // 廊下の、かすかな月明かり
    // 布団（頭は、ふすまのほう）。掛け布団の中に、丸まった子供
    const futon = new T.Group(); futon.position.set(0.3, 0.32, -8.65); house.add(futon);
    box(futon, 1.0, 0.1, 2.05, 0, 0.05, 0, '#c9cdd6');
    const kake = new T.Mesh(new T.SphereGeometry(0.5, 28, 18), toon('#ffffff', { map: futonTex })); kake.scale.set(1.1, 0.42, 1.62); kake.position.set(0, 0.1, -0.1); futon.add(kake);
    { const pl = new T.Mesh(new T.SphereGeometry(0.5, 24, 12), toon('#e4dfd2')); pl.scale.set(0.46, 0.13, 0.27); pl.position.set(0, 0.16, 0.82); futon.add(pl); }
    // 四足目と、足あと（夜ごと）
    const ghost = ghostPair(); house.add(ghost);
    const NP = [null, [0.66, 0, 0.5, PI], [0.18, 0.32, -0.34, PI], [0.12, 0.32, -3.6, PI], [0.42, 0.32, -6.66, PI], [0.98, 0.32, -7.8, -PI / 2]];
    const feet = [], yHouse = z => (z > -0.02 ? 0 : 0.32);
    for (let n = 2; n <= 4; n++) trail(feet, house, NP[n - 1], NP[n], n, yHouse);
    trail(feet, house, NP[4], [0.46, 0.32, -7.3], 5, yHouse); trail(feet, house, [0.46, 0.32, -7.3], NP[5], 5, yHouse);      // ふすまのすきまを通って、枕もとへ
    const NIGHT = { yon: 1, agari: 2, rouka: 4, haha: 4, heya: 4, fusuma: 4, yonin: 5 };

    /* ======================= 朝の茶の間 x = −400 ======================= */
    const XC = -400, cha = new T.Group(); cha.position.x = XC; scene.add(cha);
    box(cha, 5, 0.1, 5, 0, -0.05, 0, null, tiled(tatamiTex, 5.5, 2.8));
    box(cha, 5, 2.6, 0.1, 0, 1.3, 1.6, '#7a7367'); box(cha, 0.1, 2.6, 4, -2.0, 1.3, 0, '#7a7367');
    const chaWinMat = new T.MeshBasicMaterial({ map: shojiTex, color: '#d7dde8' });
    { const w = new T.Mesh(new T.PlaneGeometry(1.3, 0.95), chaWinMat); w.rotation.y = PI; w.position.set(0.9, 1.45, 1.54); cha.add(w);
      const gw = glow('#dfe6f5', 2.4); gw.position.set(0.9, 1.45, 1.4); cha.add(gw); }
    point('chan', '#e4ebf7', XC + 0.8, 1.7, 1.0, 7);
    // 柱時計
    box(cha, 0.36, 0.74, 0.08, -0.8, 1.66, 1.53, '#3a2617');
    { const f = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 0.02, 28), toon('#e8e2d0')); f.rotation.x = PI / 2; f.position.set(-0.8, 1.88, 1.485); cha.add(f);
      box(cha, 0.012, 0.09, 0.01, -0.8, 1.92, 1.47, '#111111'); box(cha, 0.07, 0.012, 0.01, -0.77, 1.88, 1.47, '#111111'); }
    const pend = new T.Group(); pend.position.set(-0.8, 1.72, 1.48); cha.add(pend);
    box(pend, 0.01, 0.26, 0.01, 0, -0.13, 0, '#b08a3a');
    { const d = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 0.01, 20), toon('#c9a24a')); d.rotation.x = PI / 2; d.position.set(0, -0.27, 0); pend.add(d); }
    // ちゃぶ台と、お茶わん
    { const top = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 0.04, 40), toon('#6b4428')); top.position.set(0, 0.3, 0); cha.add(top); outline(top, '#1a0f08', 1.02);
      for (const [lx, lz] of [[0.3, 0.3], [-0.3, 0.3], [0.3, -0.3], [-0.3, -0.3]]) box(cha, 0.05, 0.28, 0.05, lx, 0.14, lz, '#4a2e1a'); }
    const bowlPts = []; for (let i = 0; i <= 10; i++) { const a = i / 10 * PI / 2; bowlPts.push(new T.Vector2(0.024 + Math.sin(a) * 0.052, 0.05 - Math.cos(a) * 0.05)); }
    const bowlGeo = new T.LatheGeometry(bowlPts, 28);
    const BOWLS = [['#2f3a52', -0.31, 0.0], ['#8a4a52', 0.0, -0.29], ['#d6b860', 0.31, 0.0], ['#ebe8e1', 0.0, 0.31]];
    const bowlPos = [];
    BOWLS.forEach(([c, bx, bz], i) => {
      const g = new T.Group(); g.position.set(bx, 0.32, bz); cha.add(g); bowlPos.push(new V3(XC + bx, 0.32, bz));
      const m = new T.Mesh(bowlGeo, toon(c, { side: T.DoubleSide })); g.add(m); outline(m, '#0d0d10', 1.05);
      const rice = new T.Mesh(new T.SphereGeometry(0.05, 18, 10, 0, PI * 2, 0, PI / 2), toon('#f3f1ea')); rice.scale.y = 0.6; rice.position.y = 0.035; g.add(rice);
      if (i < 3) {   // 箸は、手前に横に置く
        const out = new V3(bx, 0, bz).normalize();
        for (const s of [-1, 1]) { const st = box(g, 0.006, 0.006, 0.2, out.x * 0.1 + out.z * s * 0.006, 0.006, out.z * 0.1 - out.x * s * 0.006, '#3a2414'); st.rotation.y = Math.atan2(out.z, -out.x) + PI / 2; }
      } else {       // 四つ目だけ、ごはんに箸が立っている
        for (const s of [-1, 1]) { const st = box(g, 0.006, 0.22, 0.006, s * 0.008, 0.14, 0, '#2a1a10'); st.rotation.z = s * 0.03; }
      }
    });

    /* ======================= いまの玄関 x = 800 ======================= */
    const XI = 800, ima = new T.Group(); ima.position.x = XI; scene.add(ima);
    box(ima, 2.4, 0.1, 1.5, 0, -0.05, 0.72, null, tiled(tileTex, 4, 2.5));
    box(ima, 2.4, 0.16, 1.4, 0, 0.08, -0.7, null, tiled(floorTex, 4, 2));
    box(ima, 0.1, 2.5, 3.0, -1.2, 1.25, 0, '#9a9ea6'); box(ima, 0.1, 2.5, 3.0, 1.2, 1.25, 0, '#9a9ea6');
    box(ima, 1.2, 2.2, 0.04, 0, 1.1, 1.52, '#2a2f38'); box(ima, 0.95, 2.05, 0.06, 0, 1.025, 1.47, '#3c4452');
    box(ima, 0.16, 0.03, 0.05, 0.33, 1.0, 1.42, '#c9ccd2');
    { const pe = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 0.02, 12), toon('#0b0c10')); pe.rotation.x = PI / 2; pe.position.set(0, 1.5, 1.435); ima.add(pe); }
    box(ima, 2.4, 0.35, 0.1, 0, 2.33, 1.52, '#9a9ea6');
    box(ima, 0.38, 0.95, 1.0, 0.98, 0.475, 0.7, '#7c7f87');
    const tubeMat = new T.MeshBasicMaterial({ color: '#e6eeff' });
    { const d = new T.Mesh(new T.CylinderGeometry(0.16, 0.16, 0.03, 24), tubeMat); d.position.set(0, 2.46, 0.4); ima.add(d); }
    const tubeGlow = glow('#dfe8ff', 1.2); tubeGlow.position.set(0, 2.4, 0.4); ima.add(tubeGlow);
    point('ima', '#e6eeff', XI, 2.2, 0.4, 5);
    { const p = pair(PUMPS); p.position.set(-0.3, 0, 0.62); ima.add(p); }
    const ghost2 = ghostPair(); ghost2.position.set(0.16, 0, 0.56); ghost2.rotation.y = PI; ima.add(ghost2);

    /* ======================= 暗やみ x = 1200（靴が、一歩ずつ来る） ======================= */
    const XK = 1200, kimi = new T.Group(); kimi.position.x = XK; scene.add(kimi);
    box(kimi, 30, 0.1, 30, 0, -0.05, 0, '#0b0c10');
    const pool = new T.Mesh(new T.PlaneGeometry(2.2, 2.2), new T.MeshBasicMaterial({ map: poolTex, color: '#8a9cc6', transparent: true, opacity: 0.75, depthWrite: false, blending: T.AdditiveBlending }));
    pool.rotation.x = -PI / 2; pool.position.y = 0.002; kimi.add(pool);
    const spot = point('spot', '#cdd7ee', XK, 1.3, 0, 3.0);
    const ghost3 = ghostPair(); kimi.add(ghost3);          // つま先は +z（こちら）
    // 歩数と、その時刻（場面に入ってからの秒）。セリフのすきまで暗転して、そのあいだに一歩
    const KZ = [-2.2, -1.62, -1.06, -0.55, -0.08, 0.55], STEPS = [5.35, 12.05, 17.15, 24.1, 26.0];
    const stepAt = t => { let n = 0; for (const s of STEPS) if (t >= s) n++; return n; };
    const kfeet = [];
    for (let n = 1; n < KZ.length; n++) trail(kfeet, kimi, [0, 0, KZ[n - 1]], [0, 0, KZ[n]], n, () => 0, 0.24);

    /* ---------- 場面ごとの見え方 ---------- */
    // amb・sun：全体の明かり、L：点の明かり、flick：1 電球のちらつき 2 蛍光灯のちらつき、black：場面の頭で暗転する長さ（秒）、fog：[近, 遠]、bg：空の色、glass：玄関のすりガラス
    const LOOK = {
      debune:  { amb: 0.34, sun: 0.32, L: { lec: 1.3 }, fog: [6, 18] },
      irifune: { amb: 0.3, sun: 0.28, L: { lec: 1.2 }, fog: [6, 18] },
      ie:      { amb: 0.36, sun: 0.22, L: { bulb: 1.3 }, fog: [5, 15], glass: '#6f7891' },
      yoru:    { amb: 0.1, sun: 0.1, L: { bulb: 0.62 }, flick: 1, fog: [3, 9], glass: '#232c42' },
      kazoe:   { amb: 0.09, sun: 0.08, L: { bulb: 0.58 }, flick: 1, fog: [3, 9], glass: '#232c42' },
      yon:     { amb: 0.08, sun: 0.08, L: { bulb: 0.55 }, flick: 1, fog: [3, 9], glass: '#1d2538' },
      agari:   { amb: 0.08, sun: 0.09, L: { bulb: 0.5 }, flick: 1, black: 0.6, fog: [3, 9], glass: '#1d2538' },
      rouka:   { amb: 0.1, sun: 0.1, L: { bulb: 0.4, hall: 0.6 }, flick: 1, black: 0.6, fog: [2.5, 9.5], glass: '#1d2538' },
      haha:    { amb: 0.1, sun: 0.1, L: { bulb: 0.2, hall: 0.55 }, fog: [2, 7.5], glass: '#1d2538' },
      heya:    { amb: 0.1, sun: 0.1, L: { room: 0.8 }, black: 1.3, fog: [2, 8] },
      fusuma:  { amb: 0.09, sun: 0.08, L: { room: 0.65 }, fog: [1.5, 7] },
      yonin:   { amb: 0.08, sun: 0.06, L: { room: 0.6 }, black: 0.7, fog: [1.2, 6] },
      chanoma: { amb: 0.3, sun: 0.38, L: { chan: 0.95 }, fog: [5, 16], bg: '#0a0c11' },
      ima:     { amb: 0.2, sun: 0.14, L: { ima: 1.1 }, flick: 2, fog: [3, 10] },
      kimi:    { amb: 0.05, sun: 0.04, L: { spot: 2.2 }, fog: [1.8, 6.5], bg: '#010102' },
    };
    // ちらつき：時刻だけから決める（書き出しでも同じになる）
    const flickBulb = Tt => { let f = 1 - 0.05 * Math.sin(Tt * 47) * Math.sin(Tt * 13); if (hash(Math.floor(Tt * 14)) > 0.93) f *= 0.3; if (hash(Math.floor(Tt * 2.3) + 50) > 0.9) f *= 0.15; return f; };
    const flickTube = Tt => { let f = 1; const n = Math.floor(Tt * 9); if (hash(n) > 0.94 || (hash(Math.floor(Tt * 1.7) + 9) > 0.88 && hash(n + 3) > 0.5)) f = 0.12; return f; };

    const CAM = {
      debune:  t => [new V3(X0 - 2.1 + Math.sin(t * 0.15) * 0.2, 1.6, -1.7), new V3(X0, 0.35, 0.75)],
      irifune: t => [new V3(X0 + 1.75, 1.3, -1.9 + Math.min(t, 25) * 0.012), new V3(X0, 0.3, 0.55)],
      ie:      t => [new V3(0.05, 1.6, -1.35 + Math.min(t, 30) * 0.01), new V3(0.05, 0.05, 0.8)],
      yoru:    () => [new V3(-0.25, 1.45, -1.0), new V3(0.0, 0.4, 1.0)],
      kazoe:   () => [new V3(-0.06, 0.95, -0.5), new V3(-0.05, 0.02, 0.62)],
      yon:     t => [new V3(0.36, 0.78 - Math.min(t, 20) * 0.005, -0.3), new V3(0.6, 0.02, 0.5)],
      agari:   () => [new V3(-0.15, 1.2, -1.95), new V3(0.12, 0.3, -0.25)],
      rouka:   t => [new V3(0.2, 1.4, 0.35 - Math.min(t, 14) * 0.08), new V3(0.15, 0.4, -5.6)],
      haha:    t => [new V3(0.3, 0.6, -5.6 - Math.min(t, 25) * 0.008), new V3(0.4, 0.3, -6.72)],
      heya:    t => [new V3(1.15, 1.15, -10.2 + Math.min(t, 20) * 0.01), new V3(0.15, 0.85, -7.1)],
      fusuma:  () => [new V3(0.62, 0.85, -8.6), new V3(0.28, 1.0, -7.0)],
      yonin:   t => [new V3(0.4, 0.7 - Math.min(t, 10) * 0.006, -7.12), new V3(0.82, 0.36, -7.95)],
      chanoma: t => [new V3(XC + 0.05, 1.25, -1.35 + Math.min(t, 25) * 0.008), new V3(XC, 0.3, 0.12)],
      ima:     t => [new V3(XI + 0.05, 1.3, -1.1 + Math.min(t, 40) * 0.008), new V3(XI + 0.02, 0.05, 0.66)],
      kimi:    t => [new V3(XK, 0.42, 1.75), new V3(XK, 0.05, KZ[stepAt(t)] - 0.15)],
    };

    /* ---------- 毎コマ ---------- */
    const tmp = new T.Color(), st = { amb: 0.34, sun: 0.32, fn: 6, ff: 18, bg: new T.Color(BG), glass: new T.Color('#6f7891'), rot: 0, fus: 0.27 };
    const cur = {}; for (const k in LIGHT) cur[k] = 0;
    const outsideC = new T.Color('#aab8d6'), shojiC = new T.Color('#4a5878'), chaWinC = new T.Color('#d7dde8'), tubeC = new T.Color('#e6eeff');
    let prev = null, lastT = -1e9;
    function update(dt, t, Tt, name) {
      const lk = LOOK[name] || LOOK.debune, jump = dt === 0 || Math.abs(Tt - lastT) > 0.5; lastT = Tt;
      const k = jump ? 1 : 1 - Math.exp(-dt * 4);
      // 暗転（場面の頭、暗やみの一歩）
      let bm = 1;
      if (lk.black) bm = 1 - sstep(0, 0.06, t) * (1 - sstep(lk.black, lk.black + 0.3, t));
      if (name === 'kimi') for (const s of STEPS) if (t > s - 0.3 && t < s + 0.18) bm = 0;
      const fl = lk.flick === 1 ? flickBulb(Tt) : lk.flick === 2 ? flickTube(Tt) : 1;
      for (const key in LIGHT) { cur[key] = lerp(cur[key], lk.L[key] || 0, k); LIGHT[key].intensity = cur[key] * bm * ((key === 'bulb' || key === 'ima') ? fl : 1); }
      st.amb = lerp(st.amb, lk.amb, k); st.sun = lerp(st.sun, lk.sun, k);
      if (amb) amb.intensity = st.amb * (0.1 + 0.9 * bm); sun.intensity = st.sun * bm;
      st.fn = lerp(st.fn, lk.fog[0], k); st.ff = lerp(st.ff, lk.fog[1], k); scene.fog.near = st.fn; scene.fog.far = st.ff;
      st.bg.lerp(tmp.set(lk.bg || BG), k); scene.background.copy(st.bg).multiplyScalar(0.25 + 0.75 * bm); scene.fog.color.copy(scene.background);
      st.glass.lerp(tmp.set(lk.glass || '#1d2538'), k); glassMat.color.copy(st.glass).multiplyScalar(0.15 + 0.85 * bm);
      const bI = clamp(LIGHT.bulb.intensity / 1.2, 0, 1); bulbMat.color.setRGB(1, 0.84, 0.6).multiplyScalar(0.12 + 0.88 * bI); bulbGlow.material.opacity = bI;
      const iI = clamp(LIGHT.ima.intensity / 1.1, 0, 1); tubeMat.color.copy(tubeC).multiplyScalar(0.15 + 0.85 * iI); tubeGlow.material.opacity = iI;
      outsideMat.color.copy(outsideC).multiplyScalar(clamp(LIGHT.lec.intensity / 1.3, 0, 1)); lecGlow.material.opacity = clamp(LIGHT.lec.intensity / 1.3, 0, 1) * 0.8;
      shojiMat.color.copy(shojiC).multiplyScalar(bm); chaWinMat.color.copy(chaWinC);
      // 見本の靴：入船の場面で、くるりと回る
      st.rot = jump ? (name === 'irifune' ? PI : 0) : lerp(st.rot, name === 'irifune' ? PI : 0, 1 - Math.exp(-dt * 2.2)); lecPair.rotation.y = st.rot;
      // 四足目：夜ごとの場所。暗転のあいだに動く
      const nightOf = n => NIGHT[n] || 0, night = lk.black && t < 0.12 && prev ? nightOf(prev) : nightOf(name);
      if (NP[night]) { ghost.position.set(NP[night][0], NP[night][1], NP[night][2]); ghost.rotation.y = NP[night][3]; }
      fade(ghost, name === 'yon' ? sstep(0.4, 1.7, t) : night > 0 ? 1 : 0);
      for (const f of feet) f.visible = f.userData.night <= night;
      // ふすま：すうっと開く
      const fT = name === 'fusuma' ? 0.27 - 0.17 * sstep(1.0, 5.0, t) : name === 'yonin' ? 0.1 : 0.27;
      st.fus = jump ? fT : lerp(st.fus, fT, 1 - Math.exp(-dt * 6)); fR.position.x = st.fus;
      // 柱時計
      pend.rotation.z = Math.sin(Tt * PI) * 0.22;
      // 暗やみ：一歩ずつ
      const n = name === 'kimi' ? stepAt(t) : 0;
      ghost3.position.z = KZ[n]; pool.position.z = KZ[n]; spot.position.z = KZ[n] + 0.1;
      for (const f of kfeet) f.visible = f.userData.night <= n;
    }

    function labels(name, t) {
      const L = [], at = (g, dy) => g.getWorldPosition(new V3()).add(new V3(0, dy, 0));
      if (name === 'debune' || name === 'irifune') {
        L.push({ id: 'soto', p: new V3(X0, 1.45, 2.0), t: 'そと', sub: '戸口', dot: '#c9d6ff' });
        const r = lecPair.rotation.y; L.push({ id: 'toe', p: new V3(X0 + Math.sin(r) * 0.3, 0.2, 0.25 + Math.cos(r) * 0.3), t: 'つま先', dot: '#ffd58a' });
      }
      const fam = [['お父さん', -0.42], ['お母さん', -0.04], ['わたし', 0.3]];
      if (name === 'ie') fam.forEach(([s, x], i) => L.push({ id: 'f' + i, p: new V3(x, 0.12, 0.6), t: s, dot: '#ffc781' }));
      const nums = ['いち', 'に', 'さん'], when = [0.75, 2.07, 3.29];      // 「いち」「に」「さん」と声に出したとき
      if (name === 'kazoe') fam.forEach(([, x], i) => { if (t >= when[i]) L.push({ id: 'f' + i, p: new V3(x, 0.12, 0.6), t: nums[i], dot: '#ffc781' }); });
      if (name === 'yon') {
        fam.forEach(([, x], i) => L.push({ id: 'f' + i, p: new V3(x, 0.12, 0.6), t: nums[i], dot: '#ffc781' }));
        if (t >= 2.28) L.push({ id: 'g', p: at(ghost, 0.1), t: 'よん', dot: '#dfe7f2' });
      }
      if (name === 'agari') L.push({ id: 'g', p: at(ghost, 0.1), t: '2晩目', dot: '#dfe7f2' });
      if (name === 'rouka') {
        L.push({ id: 'n2', p: new V3(NP[2][0], 0.34, NP[2][2]), t: '2晩目', dot: '#7c8db0' });
        L.push({ id: 'n3', p: new V3(NP[3][0], 0.34, NP[3][2]), t: '3晩目', dot: '#7c8db0' });
        L.push({ id: 'g', p: at(ghost, 0.1), t: '4晩目', dot: '#dfe7f2' });
      }
      if (name === 'yonin' && t > 1.2) L.push({ id: 'g', p: at(ghost, 0.12), t: '5晩目', dot: '#dfe7f2' });
      if (name === 'chanoma') ['お父さん', 'お母さん', 'わたし', 'よにんめ'].forEach((s, i) => L.push({ id: 'b' + i, p: bowlPos[i].clone().add(new V3(0, 0.08, 0)), t: s, dot: i < 3 ? '#ffc781' : '#dfe7f2' }));
      if (name === 'ima') L.push({ id: 'g2', p: at(ghost2, 0.1), t: 'あの子', dot: '#dfe7f2' });
      if (name === 'kimi') L.push({ id: 'g3', p: at(ghost3, 0.1), t: (stepAt(t) + 1) + '歩目', dot: '#dfe7f2' });
      return L;
    }

    return {
      scenes: Object.keys(CAM),
      enter(name, p) { prev = p; },
      update,
      camera: (name, t) => (CAM[name] || CAM.debune)(t),
      labels,
    };
  },

  lines: [
    { w: 'B', s: 'debune', t: 'ねえノア、今日、なんだか部屋が暗くない？',
      k: "ねえ のあ、きょ'う、な'んだか へやが くら'くない？" },
    { w: 'A', s: 'debune', t: '今日は、靴の話だからね。ヒナ、脱いだ靴は、どっちに向けてそろえる？',
      k: "きょ'うわ、くつ'の はなし'だからね。ひな、ぬ'いだ くつ'わ、ど'っちに むけて そろえ'る？" },
    { w: 'B', s: 'debune', t: 'つま先を、ドアのほうに向けるんだよね。お行儀よく。',
      k: "つまさきお、ど'あの ほ'うに むけるんだよね。おぎょ'うぎ よく。" },
    { w: 'A', s: 'debune', t: 'そう。出ていく船の形だから、「出船」っていうの。',
      k: "そ'う。で'ていく ふ'ねの かたちだから、でふねって いうの。",
      b: { h: '出船（でふね）', r: ['つま先を、外へ向ける', '脱いだら、向きを変えておく'] } },
    { w: 'A', s: 'irifune', t: '反対に、つま先が家の中を向いているのが、「入船」。',
      k: "はんたいに、つまさきが いえ'の な'かお む'いて いるのが、いりふね。",
      b: { h: '入船（いりふね）', r: ['つま先が、家の中を向く'] } },
    { w: 'B', s: 'irifune', t: 'どうして外に向けるの？ はきやすいから？',
      k: "ど'うして そ'とに むけるの？ はきやす'いから？" },
    { w: 'A', s: 'irifune', t: 'ふつうは、そう教わるわね。でも、うちのおばあちゃんは、ちがったの。',
      k: "ふつうわ、そ'う おそわるわね。で'も、うちの おば'あちゃんわ、ちがったの。" },
    { w: 'A', s: 'irifune', t: '「入船の靴はね、まだ、入ってくる途中の靴なんだよ」って。',
      k: "いりふねの くつ'わね、ま'だ、はい'ってくる とちゅうの くつ'なんだよって。" },
    { w: 'B', s: 'irifune', e: { B: 'jito' }, t: '……入ってくる、途中？',
      k: "はい'ってくる、とちゅう？" },
    { w: 'A', s: 'irifune', t: '今日は、わたしが子供のころの話。数えては、いけない話よ。',
      k: "きょ'うわ、わたしが こどもの こ'ろの はなし'。かぞ'えてわ、いけな'い はなし'よ。" },
    { w: 'A', s: 'ie', t: 'わたしの家は、古い借家だった。お父さんと、お母さんと、わたしの三人。',
      k: "わたしの いえ'わ、ふる'い しゃくやだった。おと'うさんと、おか'あさんと、わたしの さんにん。" },
    { w: 'A', s: 'ie', t: '玄関には、いつも靴が三足。大きいのと、中くらいのと、小さいの。',
      k: "げ'んかんにわ、い'つも くつ'が さんぞく。おおき'いのと、ちゅうくらいのと、ちいさ'いの。" },
    { w: 'A', s: 'ie', t: 'お母さんの決まりは、ひとつだけ。「夜、玄関の靴を、数えちゃいけないよ」',
      k: "おか'あさんの きまりわ、ひと'つだけ。よ'る、げ'んかんの くつ'お、かぞ'えちゃ いけな'いよ。",
      b: { h: 'うちの決まり', r: ['夜、玄関の靴を、数えない'] } },
    { w: 'B', s: 'ie', t: '数えると、どうなるの？',
      k: "かぞ'えると、ど'う なるの？" },
    { w: 'A', s: 'ie', t: '聞いても、教えてくれなかった。だから、ある夜、数えてみたの。',
      k: "き'いても、おしえて くれなかった。だから、あ'る よ'る、かぞ'えて みたの。" },
    { w: 'A', s: 'yoru', t: 'トイレに起きた帰り。真っ暗な玄関で、電球をつけて、しゃがんで……',
      k: "と'いれに お'きた かえり。まっくらな げ'んかんで、でんきゅうお つけて、しゃが'んで…" },
    { w: 'A', s: 'kazoe', st: 'whisper', t: 'いち。に。さん。',
      k: "い'ち。<pause 0.45>に'。<pause 0.45>さ'ん。" },
    { w: 'A', s: 'yon', st: 'whisper', p: 1.2, t: '……よん。',
      k: "<pause 0.35>よ'ん。" },
    { w: 'B', s: 'yon', e: { B: 'surprise' }, st: 'panic', t: 'えっ、四足？',
      k: "/eq/、よ'んそく？" },
    { w: 'A', s: 'yon', t: '白い、小さな靴だった。わたしのより、ずっと小さい。',
      k: "しろ'い、ちい'さな くつ'だった。わたしのより、ずっと ちいさ'い。" },
    { w: 'A', s: 'yon', t: 'ぐっしょり濡れていて、つま先が、家の中を向いていたの。',
      k: "ぐっしょ'り ぬれて いて、つまさきが、いえ'の な'かお む'いて いたの。",
      b: { h: '四足目', r: ['白くて、小さい', 'ぐっしょり濡れている', 'つま先が、家の中を向いている'] } },
    { w: 'B', s: 'yon', st: 'whisper', t: '入船……。入ってくる途中の、靴……。',
      k: "いりふね…。はい'ってくる とちゅうの、くつ'…。" },
    { w: 'A', s: 'agari', t: '次の朝、玄関の靴は三足だった。夢だったんだって、思ったわ。',
      k: "つぎ'の あ'さ、げ'んかんの くつ'わ さんぞく だった。ゆ'め だったんだって、おも'ったわ。" },
    { w: 'A', s: 'agari', t: 'でも、夜になると、どうしても、数えずにいられなくて。',
      k: "で'も、よ'るに なると、ど'うしても、かぞ'えずに いられなくて。" },
    { w: 'A', s: 'agari', t: 'よん。小さな靴は、ゆうべより奥にあった。上がりかまちの、上に。',
      k: "よ'ん。ちい'さな くつ'わ、ゆ'うべより お'くに あった。あがりかま'ちの、うえ'に。" },
    { w: 'B', s: 'agari', e: { B: 'surprise' }, t: '靴のまま、家に上がってきてるの？',
      k: "くつ'の まま、いえ'に あが'って きてるの？" },
    { w: 'A', s: 'rouka', t: '次の夜は、廊下のまんなか。その次の夜は、わたしの部屋の、ふすまの前。',
      k: "つぎ'の よ'るわ、ろ'うかの まんなか。その つぎ'の よ'るわ、わたしの へや'の、ふすまの ま'え。" },
    { w: 'A', s: 'rouka', t: '廊下には、小さな、濡れた足あとが、点々と続いていたわ。',
      k: "ろ'うかにわ、ちい'さな、ぬれた あしあとが、てんてんと つづ'いて いたわ。" },
    { w: 'B', s: 'haha', t: 'お母さんには、言わなかったの？',
      k: "おか'あさんにわ、いわなかったの？" },
    { w: 'A', s: 'haha', t: '言ったわ。お母さん、真っ白な顔をして、ひとつだけ聞いたの。',
      k: "い'ったわ。おか'あさん、まっしろな か'おお して、ひと'つだけ き'いたの。" },
    { w: 'A', s: 'haha', st: 'whisper', t: '「何回、数えたの？」',
      k: "な'んかい、かぞ'えたの？" },
    { w: 'A', s: 'haha', t: '四回、って答えたら、お母さん、こう言ったの。',
      k: "よ'んかい、って こたえたら、おか'あさん、こ'う い'ったの。" },
    { w: 'A', s: 'haha', st: 'whisper', t: '「じゃあ、明日の夜で、とどくね」',
      k: "じゃあ、あし'たの よ'るで、とど'くね。",
      b: { h: '数えるたびに', r: ['一晩に一歩、近づいてくる'] } },
    { w: 'B', s: 'haha', e: { B: 'surprise' }, t: 'とどくって……ノアに？',
      k: "とど'くって… のあに？" },
    { w: 'A', s: 'heya', t: 'その夜は、絶対に数えないって決めて、布団を頭までかぶったの。',
      k: "その よ'るわ、ぜったいに かぞえないって きめて、ふとんお あたま'まで かぶったの。" },
    { w: 'A', s: 'heya', t: '真夜中。ふすまの向こうで、小さな声がしたの。',
      k: "まよ'なか。ふすまの むこうで、ちい'さな こ'えが したの。" },
    { w: 'A', s: 'heya', t: '「……ひとり。……ふたり。……さんにん」',
      k: "<voice youji whisper 0.85 breathy 0.6 speed 0.8>ひと'り。<pause 0.6>ふた'り。<pause 0.6>さ'んにん。" },
    { w: 'B', s: 'heya', st: 'whisper', t: '数えてる……。向こうが、数えてる……。',
      k: "かぞ'えてる…。むこうが、かぞ'えてる…。" },
    { w: 'A', s: 'fusuma', t: 'うちの家族を、数えていたの。そして、ふすまが、すうっと開いて……',
      k: "うちの か'ぞくお、かぞ'えて いたの。そして、ふすまが、す'ーっと あ'いて…" },
    { w: 'A', s: 'yonin', p: 1.4, t: '「……よにん」',
      k: "<voice youji whisper 0.9 breathy 0.6 speed 0.75><pause 0.3>よ'にん。" },
    { w: 'A', s: 'yonin', st: 'whisper', t: '耳の、すぐそばで、聞こえたわ。',
      k: "みみ'の、すぐ そ'ばで、きこえたわ。" },
    { w: 'B', s: 'yonin', st: 'panic', t: 'そ、それで……どうなったの？',
      k: "そ、それで… ど'う なったの？" },
    { w: 'A', s: 'chanoma', t: '気がついたら、朝だった。台所では、お母さんがお茶わんを並べてた。',
      k: "き'が ついたら、あ'さ だった。だいどころでわ、おか'あさんが おちゃわんお ならべてた。" },
    { w: 'A', s: 'chanoma', p: 0.6, t: 'よっつ。',
      k: "<pause 0.3>よ'っつ。" },
    { w: 'A', s: 'chanoma', t: 'お父さんも、お母さんも、何も言わなかった。その日から、うちは四人家族。',
      k: "おと'うさんも、おか'あさんも、な'にも いわなかった。その ひ'から、うちわ よにん か'ぞく。" },
    { w: 'B', s: 'ima', t: 'その子……今も、いるの？',
      k: "その こ'… い'まも、いるの？" },
    { w: 'A', s: 'ima', t: 'いるわ。大人になって、何回引っ越しても、玄関には、あの小さな靴。',
      k: "いるわ。おとなに なって、な'んかい ひっこ'しても、げ'んかんにわ、あの ちい'さな くつ'。" },
    { w: 'B', s: 'ima', t: 'どうにか、ならないの？',
      k: "ど'うにか、ならないの？" },
    { w: 'A', s: 'ima', t: 'なるわ。かんたんよ。',
      k: "なるわ。かんたんよ。" },
    { w: 'A', s: 'ima', t: 'ねえヒナ。あの子がなんて数えたか、もう一回、言ってみて。',
      k: "ねえ ひな。あの こ'が な'んて かぞ'えたか、もう いっか'い、いって みて。" },
    { w: 'B', s: 'ima', t: 'え？ ……ひとり、ふたり、さんにん、よにん……？',
      k: "え？ ひと'り、ふた'り、さ'んにん、よ'にん…？" },
    { w: 'A', s: 'ima', e: { A: 'smile' }, p: 0.9, t: 'ありがとう。',
      k: "ありがと'う。" },
    { w: 'B', s: 'ima', p: 0.5, t: '……え？',
      k: "<pause 0.3>え？" },
    { w: 'A', s: 'kimi', e: { B: 'surprise' }, t: 'あの子はね、自分を数えてくれた人の家に、引っ越すの。',
      k: "あの こ'わね、じぶんお かぞ'えて くれた ひとの いえ'に、ひっこ'すの。" },
    { w: 'B', s: 'kimi', e: { B: 'surprise' }, st: 'panic', t: 'ちょっと、ノア！ やだ、わたし、いま……！',
      k: "ちょっと、のあ！ や'だ、わたし、い'ま…！" },
    { w: 'A', s: 'kimi', e: { A: 'smile' }, t: 'だいじょうぶ。一晩に、一歩ずつだから。',
      k: "だいじょ'うぶ。ひとばんに、いっぽずつ だから。" },
    { w: 'A', s: 'kimi', t: 'それに、ヒナだけじゃないわ。字幕の「よにん」を読んだ、あなたも。',
      k: "それに、ひなだけじゃ ないわ。じまくの よ'にんお よんだ、あな'たも。",
      b: { h: 'あの子の決まり', r: ['数えてくれた人の家に、引っ越す', '一晩に、一歩ずつ近づく', '字幕で読んでも、数えたことになる'] } },
    { w: 'A', s: 'kimi', t: 'ヒナの家か、あなたの家か。……今夜は、玄関の靴、数えないでね。',
      k: "ひなの いえ'か、あな'たの いえ'か。<pause 0.4>こ'んやわ、げ'んかんの くつ'、かぞえないでね。" },
    { w: 'A', s: 'kimi', e: { A: 'smile' }, p: 0.8, t: 'おやすみなさい。',
      k: "おやすみなさ'い。" },
  ],
});
