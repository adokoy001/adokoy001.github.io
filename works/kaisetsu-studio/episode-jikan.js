/* ===== 回：長すぎる時間（巨大数の回の続き） =====
   宇宙カレンダー（138億年を1年に縮める）→ 12月31日の中へ入れ子でズームイン（人類・文明・人の一生）→
   こんどは逆に、1年を次のカレンダーの1日に縮めてズームアウト（太陽・最後の星・銀河・陽子・ブラックホール）→ 熱的死 → もとにもどるまでの時間。
   どの場面も、同じ形のカレンダーの入れ子で見せる（前回の立方体の入れ子の、時間版）。
   ・過去：カレンダーを、ひとつ上のカレンダーの「12月31日」のマスに入れる（1段で1日が 1/365）
   ・未来：カレンダーを、ひとつ上のカレンダーの「1月1日」のマスに入れる（1段で1日が365倍）
   ・未来の話のあいだは、その時代の天体（太陽と地球・燃えつきる星・銀河・原子・ブラックホール）を手前に出し、カレンダーは奥で暗く進みつづける
   数字は出典で確かめたもの（宇宙の年齢 137.87億年、地球・生命・恐竜・人類の年代、太陽の明るさと赤色巨星、星の形成の終わりと最後の星、
   銀河の蒸発、核子の崩壊（陽子が崩れるなら）、ブラックホールの蒸発、もとにもどる時間 exp(10^120) の見積もり）と、
   ここで計算したもの（カレンダーの日付、入れ子の段数、人の一生の秒）。遠い未来の数字は、どれも仮定つきの見積もり。
   場面の中の時刻は、声の長さ（ノア otona・速さ1.05、ヒナ shoujo・速さ1.1）から見積もった値 */
(function () {
  const B = Kaisetsu.BGM;
  // 宇宙カレンダー：オルゴールの分散和音と、時計のチクタク
  B.jk_koyomi = { label: '時間：宇宙カレンダー', gain: 0.85, score: `
title jk_koyomi
tempo 76
reverb 3.2
delay 0.75
@box musicbox vol=0.3 rev=0.5 dly=0.3 len=0.5
[D5 A5 F#5 A5 C#6 A5 F#5 A5 | B4 F#5 D5 F#5 A5 F#5 D5 F#5 | G4 D5 B4 D5 F#5 D5 B4 D5 | A4 E5 C#5 E5 G5 E5 C#5 E5 | D5 A5 F#5 A5 C#6 A5 F#5 A5 | F#4 C#5 A4 C#5 E5 C#5 A4 C#5 | G4 D5 B4 D5 F#5 D5 B4 D5 | A4 E5 D5 E5 A5:2 |]*R
@kal kalimba vol=0.16 rev=0.6 dly=0.4
[F#5:4 | D5:4 | B4:4 | C#5:4 | F#5:4 | A5:4 | G5:2 F#5:2 | E5:4 |]*R
@pad pad vol=0.17 rev=0.6 cut=1500
[D3+A3+C#4+F#4:4 | B2+F#3+A3+D4:4 | G2+D3+F#3+B3:4 | A2+E3+G3+C#4:4 | D3+A3+C#4+F#4:4 | F#2+C#3+E3+A3:4 | G2+D3+F#3+B3:4 | A2+D3+E3+A3:2 A2+C#3+E3+A3:2 |]*R
@bass sub vol=0.26
[D2:4 | B1:4 | G1:4 | A1:4 | D2:4 | F#1:4 | G1:4 | A1:4 |]*R
@tick drums vol=0.15 len=0.5
[[w? - w?? - w? - w?? - |]*8]*R
` };
  // 暗くなっていく：言葉にならない囁き声（3人、深い残響とエコー）と、おりつづけるシェパード音階（前回の「のぼりつづける」の逆向き）。音量は対数周波数の上の釣鐘（F#4 が頂点）なので、
  // 1周（6小節）で1オクターブ下がって元の和音に戻る＝ループの継ぎ目でも、ずっと下がりつづけて聞こえる
  B.jk_kurayami = { label: '時間：囁きと、おりつづける音', gain: 0.9, score: `
title jk_kurayami
tempo 66
reverb 5
delay 0.5
@o2 sine vol=0.043 rev=0.6 dly=0.15
[B2:2 A#2:2 | A2?:2 G#2?:2 | G2??:2 F#2??:2 | F2??:2 E2??:2 | D#2??:2 D2??:2 | C#2??:2 C2??:2 |]*R
@o3 sine vol=0.269 rev=0.6 dly=0.15
[B3:2 A#3:2 | A3:2 G#3?:2 | G3?:2 F#3?:2 | F3?:2 E3?:2 | D#3??:2 D3??:2 | C#3??:2 C3??:2 |]*R
@o4 sine vol=0.36 rev=0.6 dly=0.15
[B4:2 A#4:2 | A4:2 G#4:2 | G4:2 F#4:2 | F4:2 E4:2 | D#4:2 D4:2 | C#4:2 C4:2 |]*R
@o5 sine vol=0.291 rev=0.6 dly=0.15
[B5??:2 A#5??:2 | A5??:2 G#5??:2 | G5?:2 F#5?:2 | F5?:2 E5?:2 | D#5:2 D5:2 | C#5:2 C5:2 |]*R
@o6 sine vol=0.053 rev=0.6 dly=0.15
[B6??:2 A#6??:2 | A6??:2 G#6??:2 | G6??:2 F#6??:2 | F6??:2 E6??:2 | D#6?:2 D6?:2 | C#6:2 C6:2 |]*R
@o7 sine vol=0.01 rev=0.6 dly=0.15
[B7??:2 A#7??:2 | A7??:2 G#7??:2 | G7??:2 F#7??:2 | F7??:2 E7??:2 | D#7??:2 D7?:2 | C#7?:2 C7:2 |]*R
@air pad vol=0.08 rev=0.8 cut=800
[D3+A3:4 | D3+A3:4 | D3+Bb3:4 | D3+Bb3:4 | D3+A3:4 | D3+A3:4 |]*R
@deep sub vol=0.22
[D2:4 | D2:4 | D2:4 | D2:4 | D2:4 | D2:4 |]*R
@tick drums vol=0.12 len=0.5
[[w?? - - - - - - - |]*6]*R
@cl strings vol=0.07 rev=0.8 trem=6 hp=200
[D3+Eb3:12 D3+Eb3+A3:12]*R
@wh1 voice vol=0.26 rev=0.9 dly=0.6 whisper=0.95 air=1.2
[-:2 D4:3 -:5 Eb4:2 C#4:2 -:6 D4:4]*R
はすしふ はすしふ
@wh2 voicem vol=0.2 rev=0.9 dly=0.7 whisper=1 air=0.8
[-:7 A2:4 -:6 G#2:3 -:4]*R
ほふ ほふ
@wh3 voicek vol=0.18 rev=0.95 dly=0.8 whisper=0.9 air=1.5
[-:13 A4:1 G#4:1 A4:2 -:7]*R
ひしひ ひしひ
` };
  // 熱的死：ほとんど何も鳴らない。低いうなりと、ごくまれな鐘
  B.jk_netsushi = { label: '時間：熱的死（囁き）', gain: 0.95, score: `
title jk_netsushi
tempo 48
reverb 8
@drone sub vol=0.2
[D2:4 | D2:4 | D2:4 | D2:4 | D2:4 | D2:4 | D2:4 | D2:4 |]*R
@air pad vol=0.06 rev=0.9 cut=600
[D3+A3:8 | D3+A3:8 | D3+G3:8 | D3+A3:8 |]*R
@bell bell vol=0.05 rev=0.95 dly=0.6
[-:4 | -:4 | -:4 | A5??:4 | -:4 | -:4 | -:4 | -:4 |]*R
@cl strings vol=0.05 rev=0.9 trem=5 hp=200
[D3+Eb3:16 C#3+D3:16]*R
@wh1 voice vol=0.26 rev=0.95 dly=0.7 whisper=0.95 air=1.2
[-:6 D4:4 -:10 C#4:3 -:9]*R
はふ はふ
@wh2 voicem vol=0.2 rev=0.95 dly=0.8 whisper=1 air=0.8
[-:14 A2:5 -:13]*R
ほ ほ
@wh3 voicek vol=0.18 rev=0.95 dly=0.9 whisper=0.9 air=1.5
[-:22 Eb5:1 D5:2 -:7]*R
しひ しひ
` };
  // また：はじめのオルゴールが、遠く、少し狂って戻ってくる
  B.jk_mata = { label: '時間：また', gain: 0.9, score: `
title jk_mata
tempo 60
reverb 6
delay 0.75
@box musicbox vol=0.24 rev=0.7 dly=0.35 det=-18 len=0.5
[D5 A5 F#5 A5 C#6 A5 F#5 A5 | B4 F#5 D5 F#5 A5 F#5 D5 F#5 | G4 D5 B4 D5 F#5 D5 B4 D5 | A4 E5 C#5 E5 G5 E5 C#5 E5 | D5 A5 F#5 A5 C#6 A5 F#5 A5 | F#4 C#5 A4 C#5 E5 C#5 A4 C#5 | G4 D5 B4 D5 F#5 D5 B4 D5 | A4 E5 D5 E5 A5:2 |]*R
@drone sub vol=0.16
[D2:4 | B1:4 | G1:4 | A1:4 | D2:4 | F#1:4 | G1:4 | A1:4 |]*R
@air pad vol=0.08 rev=0.85 cut=900
[D3+A3+F#4:4 | B2+F#3+D4:4 | G2+D3+B3:4 | A2+E3+C#4:4 | D3+A3+F#4:4 | F#2+C#3+A3:4 | G2+D3+B3:4 | A2+E3+A3:4 |]*R
` };
})();

Kaisetsu.episode({
  id: 'jikan', fileName: '長すぎる時間',
  title: '長すぎる時間', titleLines: ['長すぎる時間'], eyebrow: '宇宙の時間',
  background: '#060814',
  cast: {
    A: { name: 'ノア', role: '解説', color: '#B0487A', voice: { voice: 'otona', speed: 1.05 },
         look: { hair: 'bob', hairColor: 'budou', eye: 'sumire', ornament: 'orbit', hat: 'none' } },
    B: { name: 'ヒナ', role: '聞き役', color: '#C9762C', voice: { voice: 'shoujo', speed: 1.1 },
         look: { hair: 'short', hairColor: 'akagane', eye: 'midori', ornament: 'none', hat: 'knit' } },
  },
  chapters: [['宇宙カレンダー', ['hajime', 'koyomi', 'chikyu', 'kyouryu']], ['12月31日', ['oomisoka', 'bunmei', 'issho']],
    ['これから', ['mirai', 'ichinichi', 'hoshi']], ['暗い時代', ['kurayami', 'netsushi']], ['それでも', ['saiki', 'mata']]],
  bgm: { hajime: 'jk_koyomi', koyomi: 'jk_koyomi', chikyu: 'jk_koyomi', kyouryu: 'jk_koyomi',
    oomisoka: 'tension', bunmei: 'tension', issho: 'tension', mirai: 'wonder', ichinichi: 'wonder',
    hoshi: 'jk_kurayami', kurayami: 'jk_kurayami', netsushi: 'jk_netsushi', saiki: 'jk_netsushi', mata: 'jk_mata' },

  world(K) {
    const T = K.THREE, V3 = T.Vector3, scene = K.scene, cam = K.camera, PI = Math.PI;
    const { toon, outline, glow, clamp, lerp, sstep } = K;
    const rnd = K.rand(31415);
    const BG = '#060814', INK = '#0B1230';
    const FONT = '"Zen Maru Gothic","Hiragino Maru Gothic ProN","Hiragino Sans","Noto Sans JP",system-ui,sans-serif';
    const MONO = '"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';
    scene.fog = new T.Fog(BG, 400, 1200);
    const SC = ['hajime', 'koyomi', 'chikyu', 'kyouryu', 'oomisoka', 'bunmei', 'issho', 'mirai', 'ichinichi', 'hoshi', 'kurayami', 'netsushi', 'saiki', 'mata'];
    const PAST = new Set(['hajime', 'koyomi', 'chikyu', 'kyouryu', 'oomisoka', 'bunmei', 'issho', 'mirai']);
    // その場面の、その時刻を過ぎたか（場面の順番で比べる）
    const after = (name, t, s, ts) => { const a = SC.indexOf(name), b = SC.indexOf(s); return a > b || (a === b && t >= ts); };

    /* ---------- 道具（前回の回と同じもの） ---------- */
    const fadeAll = (obj, a) => { obj.visible = a > 0.01; obj.traverse(o => { const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      for (const m of ms) { if (m.userData.base === undefined) m.userData.base = m.opacity; m.transparent = a < 0.999; m.opacity = m.userData.base * a; } }); };
    const redraws = [];
    try { document.fonts && document.fonts.ready.then(() => redraws.forEach(f => f())); } catch (e) {}
    function ctex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; const t = new T.CanvasTexture(c); t.anisotropy = 8;
      const run = () => { draw(c.getContext('2d'), w, h); t.needsUpdate = true; }; run(); redraws.push(run); return t; }
    function card(text, o) {
      o = Object.assign({ w: 1, h: 1, d: 0.14, bg: '#FFF4D6', fg: '#161C33', side: '#D9C493', font: FONT, weight: 900, fs: 0.66 }, o || {});
      const cw = Math.min(2048, Math.round(o.w * 220)), ch = Math.min(512, Math.round(o.h * 220));
      const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch; const tex = new T.CanvasTexture(cv); tex.anisotropy = 4;
      let cur = String(text), bg = o.bg;
      const draw = () => { const x = cv.getContext('2d'); x.fillStyle = bg; x.fillRect(0, 0, cw, ch); x.fillStyle = o.fg;
        let fs = ch * o.fs; x.font = `${o.weight} ${fs}px ${o.font}`; const mw = x.measureText(cur).width;
        if (mw > cw * 0.88) { fs *= cw * 0.88 / mw; x.font = `${o.weight} ${fs}px ${o.font}`; }
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cur, cw / 2, ch / 2 + fs * 0.05); tex.needsUpdate = true; };
      draw(); redraws.push(draw);
      const sideM = toon(o.side), frontM = toon('#ffffff', { map: tex });
      const m = new T.Mesh(new T.BoxGeometry(o.w, o.h, o.d), [sideM, sideM, sideM, sideM, frontM, sideM]);
      const ol = outline(m, INK); ol.scale.set(1 + 0.07 / o.w, 1 + 0.07 / o.h, 1 + 0.07 / o.d);
      return m;
    }
    const YEL = { bg: '#FFD166', side: '#C99A2E' };

    // 星空：カメラについてくる。最後の星が燃えつきると、消える
    const sp = []; for (let i = 0; i < 1600; i++) { const u = rnd() * 2 - 1, a = rnd() * PI * 2, r = Math.sqrt(1 - u * u); sp.push(r * Math.cos(a) * 400, u * 400, r * Math.sin(a) * 400); }
    const starGeo = new T.BufferGeometry(); starGeo.setAttribute('position', new T.Float32BufferAttribute(sp, 3));
    const starMat = new T.PointsMaterial({ color: '#cfd8ff', size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.75, depthWrite: false });
    const stars = new T.Points(starGeo, starMat); stars.frustumCulled = false; scene.add(stars);

    /* ======================= はじめ（x = -300）：秒で数える ======================= */
    const HX = -300, HAJ = new T.Group(); HAJ.position.x = HX; scene.add(HAJ);
    // 数字の札：字の大きさをそろえ、けたが多いほど札が長くなる
    const meas = document.createElement('canvas').getContext('2d');
    function numCard(text, bg) { meas.font = `800 100px ${MONO}`; const px = meas.measureText(text).width / 100 * (0.8 * 220 * 0.6);
      return card(text, { w: px / (0.86 * 220) + 0.15, h: 0.8, d: 0.2, fs: 0.6, font: MONO, weight: 800, bg: bg || '#FFF4D6' }); }
    const NUMS = [['86,400秒', 9.5], ['約2,500,000,000秒', 14.3], ['約435,000,000,000,000,000秒', 26.0]].map(([s, t0], i) => {
      const c = numCard(s, i === 2 ? '#FFE27A' : '#FFF4D6'); const w = c.geometry.parameters.width;
      c.position.set(-6.4 + w / 2, 2.3 - i * 1.55, 0); HAJ.add(c); c.userData.t0 = t0; c.userData.w = w; return c; });

    /* ======================= カレンダー（x = 0） =======================
       1年のカレンダー：4列×3段の月、月は7列×5段のマス（曜日は無し。1日から順に並べる）。単位はマスの幅。y は上向き、原点は左下 */
    const CWc = 1, CHc = 0.8, MH = 0.7, MW = 7, MBH = MH + 5 * CHc, GX = 0.6, GY = 0.5, ML = 0.7, MT = 1.2, MB = 0.6;
    const W = 2 * ML + 4 * MW + 3 * GX, H = MT + 3 * MBH + 2 * GY + MB;          // 31.2 × 16.9
    const MON = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], MST = []; { let a = 0; for (const m of MON) { MST.push(a); a += m; } }
    const md = i => { let m = 0; while (m < 11 && i >= MST[m + 1]) m++; return [m, i - MST[m]]; };
    const blk = m => ({ x: ML + (m % 4) * (MW + GX), top: H - MT - Math.floor(m / 4) * (MBH + GY) });
    function cellRect(i) { const [m, d] = md(i), b = blk(m); const x = b.x + (d % 7) * CWc, top = b.top - MH - Math.floor(d / 7) * CHc; return { x, y: top - CHc }; }
    // 入れ子：1つ下のカレンダーは、マスの中に 幅0.9 で入る（左下から 0.05, 0.07）。縮みは 1段で S
    const S = 0.9 / W, LS = Math.log(S);
    const innerO = i => { const r = cellRect(i); return { x: r.x + 0.05, y: r.y + 0.07 }; };
    const fix = i => { const o = innerO(i); return { x: o.x / (1 - S), y: o.y / (1 - S) }; };   // 入れ子をくりかえしても動かない点
    const PD = fix(364), PJ = fix(0), CC = { x: W / 2, y: H / 2 };                // 12月31日（過去へ）、1月1日（未来へ）

    // 紙のカレンダーと、暗いカレンダー（同じ割りつけ）
    const TW = 2048, TH = Math.round(TW * H / W);
    function calTex(dark) {
      return ctex(TW, TH, (x, w, h) => {
        const u = w / W, Y = v => h - v * u;
        const C = dark ? { bg: '#0A0D1B', band: '#121731', hole: '#060814', cell: '#0F1428', num: '#252D50', mon: '#2C3662', frame: '#1A2142' }
                       : { bg: '#EFE3C8', band: '#C4553E', hole: '#7A2E22', cell: '#FFFAEE', num: '#9C8F72', mon: '#3B3552', frame: '#B9A57C' };
        x.fillStyle = C.bg; x.fillRect(0, 0, w, h);
        x.fillStyle = C.band; x.fillRect(0, 0, w, (MT - 0.25) * u);
        x.fillStyle = C.hole; for (const fx of [0.25, 0.75]) { x.beginPath(); x.arc(fx * w, 0.45 * u, 0.16 * u, 0, PI * 2); x.fill(); }
        for (let m = 0; m < 12; m++) {
          const b = blk(m);
          x.fillStyle = C.mon; x.font = `800 ${0.48 * u}px ${FONT}`; x.textAlign = 'left'; x.textBaseline = 'middle';
          x.fillText(`${m + 1}月`, (b.x + 0.06) * u, Y(b.top - MH / 2 + 0.02));
          for (let d = 0; d < MON[m]; d++) {
            const cx = b.x + (d % 7) * CWc, top = b.top - MH - Math.floor(d / 7) * CHc;
            x.fillStyle = C.cell; x.fillRect((cx + 0.035) * u, Y(top) + 0.035 * u, (CWc - 0.07) * u, (CHc - 0.07) * u);
            x.fillStyle = C.num; x.font = `700 ${0.2 * u}px ${FONT}`; x.textAlign = 'left'; x.textBaseline = 'top';
            x.fillText(String(d + 1), (cx + 0.08) * u, Y(top) + 0.06 * u);
          }
        }
        x.strokeStyle = C.frame; x.lineWidth = 0.08 * u; x.strokeRect(0.04 * u, 0.04 * u, w - 0.08 * u, h - 0.08 * u);
      });
    }
    const texP = calTex(false), texD = calTex(true);
    texP.generateMipmaps = texD.generateMipmaps = true; texP.minFilter = texD.minFilter = T.LinearMipmapLinearFilter;
    const planeGeo = new T.PlaneGeometry(W, H); planeGeo.translate(W / 2, H / 2, 0);
    const hlGeo = new T.PlaneGeometry(CWc - 0.07, CHc - 0.07); hlGeo.translate(CWc / 2, CHc / 2, 0);

    /* ---------- カレンダーの中身：段ごとの印 ----------
       段 k：0 が宇宙カレンダー（1日 ≒ 3777万年）。負は 12月31日の中（-1：1日 ≒ 10万年、-2：283.5年、-3：0.777年）。
       正は 1年を1日に縮めた先（1：1日 ＝ 137.87億年、2：5.03兆年、k：137.87億年 × 365^(k-1)）。
       a〜b はマスの番号（1月1日 ＝ 0）。日付は年齢 137.87億年・1年365日で計算した値 */
    const LV = {
      '0': [{ k: 'mae', a: 0, b: 242, c: '#C9B8F0', f: 0.45 }, { k: 'bb', a: 0, c: '#FFD166' }, { k: 'sun', a: 244, c: '#6FB2FF' }, { k: 'life', a: 264, c: '#7FD89A' },
            { k: 'cam', a: 350, c: '#5ED1C6' }, { k: 'dino', a: 358, c: '#FFA552' }, { k: 'dinoX', a: 363, c: '#FF6B7D' }, { k: 'hito', a: 364, c: '#FF8CC2' }],
      '-1': [{ k: 'split', a: 297, c: '#FFA552' }, { k: 'sap', a: 362, c: '#FF8CC2' }, { k: 'm31', a: 364, c: '#FF8CC2' }],
      '-2': [{ k: 'agri', a: 322, c: '#7FD89A' }, { k: 'moji', a: 346, c: '#6FB2FF' }, { k: 'pyr', a: 348, c: '#FFD166' }, { k: 'ad', a: 357, c: '#FFA552' }, { k: 'm31b', a: 364, c: '#FF8CC2' }],
      '-3': [{ k: 'issho', a: 262, b: 364, c: '#FF8CC2' }],
      '1': [{ k: 'past', a: 0, c: '#FFD166' }, { k: 'sun2', a: 1, c: '#FFA552' }, { k: 'far', a: 8, b: 11, c: '#B58CFF' }, { k: 'merge', a: 73, c: '#FFE1B0' }],
      '2': [{ k: 'stars', a: 0, b: 23, c: '#FFE6A6', f: 0.9 }],
      '4': [{ k: 'gal', a: 14, b: 149, c: '#5E6CA8', f: 0.5 }],
      '11': [{ k: 'prot', a: 3, c: '#9C6BFF', f: 0.6 }],
      '23': [{ k: 'bh1', a: 3, c: '#FF5A6E', f: 0.6 }],
      '38': [{ k: 'bh2', a: 11, c: '#FF5A6E', f: 0.5 }],
      '39': [{ k: 'bh3', a: 65, c: '#FF5A6E', f: 0.5 }],
    };
    // 印が出る時刻（場面, 秒）。書いていない印は、その段が見えればいつも出る。u は、その場面のあいだだけ
    const REV = { mae: ['chikyu', 9.0, 'chikyu'], bb: ['koyomi', 0.7], sun: ['chikyu', 0.9], life: ['chikyu', 15.8], cam: ['kyouryu', 0.9], dino: ['kyouryu', 4.6],
      dinoX: ['kyouryu', 9.0], hito: ['kyouryu', 20.0], split: ['oomisoka', 11.2], sap: ['oomisoka', 18.1], m31: ['oomisoka', 24.7],
      agri: ['bunmei', 7.7], moji: ['bunmei', 13.0], pyr: ['bunmei', 15.6], ad: ['bunmei', 18.1], m31b: ['bunmei', 21.5], issho: ['issho', 11.2],
      past: ['ichinichi', 5.6], sun2: ['ichinichi', 15.2], far: ['ichinichi', 47.4], merge: ['ichinichi', 58.0], stars: ['hoshi', 5.9] };
    const shown = (it, name, t) => { const r = REV[it.k]; if (!r) return true; if (r[2] && name !== r[2]) return false; return after(name, t, r[0], r[1]); };
    // 段ごとの紙：2段目から暗いカレンダー。上の段ほど、線もうすくなる
    const dark = k => k >= 2;
    const tint = k => k <= 2 ? 1 : Math.max(0.3, 1 - 0.018 * (k - 2));
    // 12月31日の中の段は、話に出てから見せる
    const gateIn = (k, name, t) => k >= 0 ? 1 : k === -1 ? (after(name, t, 'kyouryu', 19.6) ? 1 : 0) : k === -2 ? (after(name, t, 'oomisoka', 24.4) ? 1 : 0) : k === -3 ? (after(name, t, 'bunmei', 21.2) ? 1 : 0) : 0;

    // 段 k の置き方：段0の座標 x0 ＝ τ_k ＋ σ_k q、σ_k ＝ S^(-k)。見え方は、入れ子の固定点 P のまわりに S^z で縮め、z が整数のときに、その段がまんなかに来る
    function xf(k, z, past) {
      const P = past ? PD : PJ, sc = Math.exp(LS * (z - k)), sz = Math.exp(LS * z);
      let ox, oy;
      if (k === 0 || (k < 0) === past) { ox = -P.x * sc; oy = -P.y * sc; }                      // 同じ向きの入れ子
      else { const Q = k < 0 ? PD : PJ, sk = Math.exp(-LS * k); ox = (Q.x - P.x - Q.x * sk) * sz; oy = (Q.y - P.y - Q.y * sk) * sz; }
      return { sc, x: ox - (CC.x - P.x), y: oy - (CC.y - P.y) };
    }
    const wpos = (k, qx, qy, z, past, dz) => { const f = xf(k, z, past); return new V3(f.x + f.sc * qx, f.y + f.sc * qy, dz || 0.2); };
    const cellC = (k, i, z, past) => { const r = cellRect(i); return wpos(k, r.x + 0.5, r.y + 0.42, z, past); };

    // 見せる段の入れ物（5つを使い回す）
    const NEST = new T.Group(); scene.add(NEST);
    const SLOTS = [];
    for (let i = 0; i < 5; i++) {
      const g = new T.Group(); NEST.add(g);
      const mat = new T.MeshBasicMaterial({ map: texP, transparent: true, depthWrite: false, fog: false });
      const pl = new T.Mesh(planeGeo, mat); g.add(pl);
      const hm = new T.MeshBasicMaterial({ transparent: true, depthWrite: false, fog: false });
      const hl = new T.InstancedMesh(hlGeo, hm, 366); hl.frustumCulled = false; pl.frustumCulled = false;
      const c0 = new T.Color('#ffffff'); for (let j = 0; j < 366; j++) hl.setColorAt(j, c0); hl.count = 0; hl.position.z = 0.002; g.add(hl);
      SLOTS.push({ g, pl, mat, hl, hm, level: null, key: '' });
    }
    const M4 = new T.Matrix4(), TC = new T.Color(), TC2 = new T.Color();
    function fillSlot(sl, k, name, t) {
      const items = (LV[String(k)] || []).filter(it => shown(it, name, t)), key = k + ':' + items.map(it => it.k).join(',');
      if (key === sl.key) return; sl.key = key;
      const base = dark(k) ? '#0F1428' : '#FFFAEE'; let n = 0;
      for (const it of items) { TC.set(it.c); TC2.set(base); TC2.lerp(TC, it.f === undefined ? 0.85 : it.f);
        for (let i = it.a; i <= (it.b === undefined ? it.a : it.b); i++) { const r = cellRect(i); M4.makeTranslation(r.x + 0.035, r.y + 0.035, 0); sl.hl.setMatrixAt(n, M4); sl.hl.setColorAt(n, TC2); n++; } }
      sl.hl.count = n; sl.hl.instanceMatrix.needsUpdate = true; if (sl.hl.instanceColor) sl.hl.instanceColor.needsUpdate = true;
    }
    function layout(z, past, name, t, gAll) {
      const want = [], k0 = Math.floor(z);
      for (let k = k0 - 2; k <= k0 + 2; k++) {
        if (past ? (k > 0 || k < -3) : k < -1) continue;
        const f = xf(k, z, past); if (f.sc < 0.004 || f.sc > 24) continue;
        const a = (1 - sstep(5, 23, f.sc)) * sstep(0.004, 0.01, f.sc) * gateIn(k, name, t) * gAll;
        if (a > 0.003) want.push({ k, f, a });
      }
      const used = new Set();
      for (const w of want) { const s = SLOTS.find(sl => sl.level === w.k); if (s) { w.s = s; used.add(s); } }
      for (const w of want) if (!w.s) { const s = SLOTS.find(sl => !used.has(sl) && !want.some(o => o.s === sl)); if (s) { w.s = s; used.add(s); s.level = w.k; s.key = ''; } }
      for (const sl of SLOTS) if (!used.has(sl)) { sl.g.visible = false; sl.level = null; }
      for (const w of want) { const sl = w.s; if (!sl) continue;
        sl.g.visible = true; sl.g.position.set(w.f.x, w.f.y, 0); sl.g.scale.set(w.f.sc, w.f.sc, 1);
        sl.mat.map = dark(w.k) ? texD : texP; const tn = tint(w.k); if (w.k === 1) sl.mat.color.setRGB(0.88, 0.93, 1); else sl.mat.color.setRGB(tn, tn, tn); sl.mat.opacity = w.a; sl.hm.opacity = w.a;
        sl.pl.renderOrder = 500 - 3 * w.k; sl.hl.renderOrder = 501 - 3 * w.k;
        fillSlot(sl, w.k, name, t); }
    }
    // 「いま」：宇宙カレンダーの 12月31日の終わり
    const nowG = glow('#FFE9A8', 1.6); nowG.renderOrder = 900; scene.add(nowG);
    const nowR = cellRect(364);

    /* ---------- もとにもどるまで（saiki）：前回の塔の形 ---------- */
    const TOWER = new T.Group(); TOWER.position.set(-2.6, 0.6, 9); scene.add(TOWER);
    { const a = card('10', Object.assign({ w: 3.4, h: 2.5, d: 0.4, fs: 0.62 }, YEL)); a.position.set(0, 0, 0);
      const b = card('10', Object.assign({ w: 1.9, h: 1.4, d: 0.28, fs: 0.62 }, YEL)); b.position.set(2.6, 1.75, 0);
      const c = card('119', Object.assign({ w: 1.8, h: 0.9, d: 0.2, fs: 0.62 }, YEL)); c.position.set(4.45, 2.85, 0);
      TOWER.add(a, b, c); TOWER.userData.p = [a, b, c]; }
    TOWER.traverse(o => { o.renderOrder = 1000; });
    // くらべる：前回の3の塔の、4段と5段のあいだ（3↑↑4 ≒ 10^(3.6×10^12) ＜ 10^(4.3×10^119) ＜ 3↑↑5 ≒ 10^(10^(3.6×10^12))）
    const CMP = new T.Group(); CMP.position.set(0, 0.6, 9); scene.add(CMP);
    function tower3(n, x0) { const g = new T.Group(); let x = 0, y = 0, w = 1.5;
      for (let i = 0; i < n; i++) { const c = card('3', { w, h: w, d: 0.2, fs: 0.66, bg: '#BFD4FF', side: '#7C93C9' }); c.position.set(x, y, 0); g.add(c); x += w * 0.78; y += w * 0.78; w *= 0.74; }
      g.position.x = x0; return g; }
    const cmpL = tower3(4, -11.2), cmpR = tower3(5, 7.4);
    const ltA = card('＜', { w: 1.1, h: 1.1, d: 0.12, fs: 0.8, bg: '#151C3A', fg: '#E7EAF5', side: '#0B1026' }); ltA.position.set(-5.4, 0.6, 0);
    const ltB = card('＜', { w: 1.1, h: 1.1, d: 0.12, fs: 0.8, bg: '#151C3A', fg: '#E7EAF5', side: '#0B1026' }); ltB.position.set(5.2, 0.6, 0);
    CMP.add(cmpL, cmpR, ltA, ltB); CMP.traverse(o => { o.renderOrder = 1000; });
    // セリフを足したり変えたりした場面は、時刻をもとの台本の時刻に読みかえる（[いまの秒, もとの秒]。声の長さからの見積もり）
    const WARP = { kurayami: [[0, 0], [0.7, 0.7], [2.85, 2.7], [10.48, 6.19], [16.79, 12.5], [19.6, 15.43], [25.14, 21.01], [30.59, 26.54], [33.72, 29.67], [39.05, 35.6], [42.22, 38.89], [43.92, 40.37]] };
    const CMPT = 17.69;   // saiki：「前回の3の塔で言うと…」の頭
    const wt = (name, t) => { const W = WARP[name]; if (!W) return t; for (let i = 0; i < W.length - 1; i++) if (t <= W[i + 1][0]) return lerp(W[i][1], W[i + 1][1], (t - W[i][0]) / (W[i + 1][0] - W[i][0])); const e = W[W.length - 1]; return e[1] + (t - e[0]); };

    /* ---------- また（mata）：紙のカレンダーが、もう一度 ---------- */
    const AGAIN = new T.Group(); AGAIN.position.set(-CC.x * 0.62, -CC.y * 0.62, 1.2); AGAIN.scale.set(0.62, 0.62, 1); scene.add(AGAIN);
    const againM = new T.MeshBasicMaterial({ map: texP, transparent: true, depthWrite: false, fog: false, opacity: 0 });
    const againP = new T.Mesh(planeGeo, againM); againP.renderOrder = 1100; AGAIN.add(againP);
    const againG = glow('#FFE9A8', 2.2); againG.position.set(nowR.x + 1, nowR.y + 0.4, 0.1); againG.renderOrder = 1101; AGAIN.add(againG);

    /* ---------- 入れ子の段数 z（場面ごと。時刻は声の長さからの見積もり） ----------
       kurayami：4回目（銀河）・11回目（陽子）・23回目（ブラックホール）・39回目（最後のブラックホール）を、ノアがその回数を言うところで通る。
       あいだは 1秒に 1.2〜1.4段（見た目のズームは 1段で約35倍）。39回目のあとは 1秒に 0.45段まで落として、まっくらな入れ子をつづける */
    const KN = [[3.0, 2, 0], [6.8, 4, 0.9], [12.6, 11, 1.3], [21.1, 23, 1.35], [33.3, 39, 1.3]], KV2 = 0.45, KTAU = 1.5;
    const LEN = { kurayami: 40.37, netsushi: 23.04, saiki: 36.7 };
    function zK(t) {             // kurayami の頭からの秒。節の間はエルミート補間（単調）
      if (t <= KN[0][0]) return KN[0][1];
      for (let i = 0; i < KN.length - 1; i++) { const [t0, z0, m0] = KN[i], [t1, z1, m1] = KN[i + 1];
        if (t <= t1) { const h = t1 - t0, u = (t - t0) / h, u2 = u * u, u3 = u2 * u;
          return (2 * u3 - 3 * u2 + 1) * z0 + (u3 - 2 * u2 + u) * h * m0 + (-2 * u3 + 3 * u2) * z1 + (u3 - u2) * h * m1; } }
      const [tE, zE, mE] = KN[KN.length - 1], d = t - tE;
      return zE + KV2 * d + (mE - KV2) * KTAU * (1 - Math.exp(-d / KTAU));
    }
    const ZS = {
      hajime: () => 0, koyomi: () => 0, chikyu: () => 0,
      kyouryu: t => -0.3 * sstep(0.4, 3.4, t),
      oomisoka: t => -0.3 - 0.7 * sstep(1.8, 5.0, t),
      bunmei: t => -1 - sstep(1.0, 4.4, t),
      issho: t => -2 - sstep(1.0, 4.4, t),
      mirai: t => -3 + 3 * sstep(0.7, 4.2, t),
      ichinichi: t => sstep(1.0, 4.8, t),
      hoshi: t => 1 + sstep(1.0, 4.6, t),
      kurayami: t => zK(t),
      netsushi: t => zK(LEN.kurayami + t),
      saiki: t => zK(LEN.kurayami + LEN.netsushi + t),
      mata: t => zK(LEN.kurayami + LEN.netsushi + LEN.saiki + t * (1 - 0.5 * sstep(0, 8, t))),
    };
    // 入れ子の回数の札：kurayami は本当の段数。netsushi から先は、見た目のズームを上げられないので、数だけを先に進める（見た目は、どの段も同じ）
    const nestN = (name, t, z) => name === 'kurayami' ? Math.floor(z + 0.03) : name === 'netsushi' ? (t < 3 ? Math.floor(z) : Math.floor(Math.max(z, 40 * Math.pow(10, 0.17 * (t - 3)))))
      : name === 'saiki' ? Math.floor(40 * Math.pow(10, 0.17 * (LEN.netsushi - 3 + t))) : 0;
    const jaNum = n => n < 1e4 ? n.toLocaleString('ja-JP') : n < 1e8 ? Math.floor(n / 1e4) + '万' : n < 1e12 ? Math.floor(n / 1e8) + '億' : Math.floor(n / 1e12) + '兆';
    const MILE = [{ k: 4, i: 60, t: '銀河がばらばらに', sub: '10の19〜20乗年', c: '4回目：銀河がばらばらに' }, { k: 11, i: 3, t: '原子がなくなる', sub: '陽子が崩れるなら', c: '11回目：原子がなくなる（陽子が崩れるなら）' },
      { k: 23, i: 3, t: 'ブラックホールが消える', sub: '太陽くらいの重さ', c: '23回目：太陽ほどの重さのブラックホールが消える' }, { k: 38, i: 11, t: '大きなブラックホール', sub: 'も消えていく' },
      { k: 39, i: 65, t: '最後のブラックホール', sub: 'が消える', c: '39回目：考えられる最大のブラックホールも消える' }];

    /* ---------- カメラ ---------- */
    const st = { z: 0, past: true, star: 0.75, cel: 0, sunA: 0 };
    const calCam = (t, tx, ty) => [new V3(tx + 3 + Math.sin(t * 0.17) * 0.8, ty - 1.2, 40), new V3(tx, ty + 2.5, 0)];
    const CAM = {
      hajime:    t => [new V3(HX + 0.6 + Math.sin(t * 0.2) * 0.4, 1.4, 15.5), new V3(HX, 0.9, 0)],
      koyomi:    t => calCam(t, 0, 0), chikyu: t => calCam(t, 0, 0),
      kyouryu:   t => { const p = wpos(0, 27.0, 2.95, ZS.kyouryu(t), true); return [new V3(p.x + 2 + Math.sin(t * 0.17) * 0.5, p.y - 0.6, 37), new V3(p.x, p.y + 2.2, 0)]; },
      oomisoka:  t => calCam(t, 0, 0), bunmei: t => calCam(t, 0, 0), issho: t => calCam(t, 0, 0), mirai: t => calCam(t, 0, 0),
      ichinichi: t => calCam(t, 0, 0), hoshi: t => calCam(t, 0, 0), kurayami: t => calCam(t, 0, 0), netsushi: t => calCam(t, 0, 0),
      saiki:     t => calCam(t, 0, 0), mata: t => calCam(t, 0, 0),
    };

    /* ======================= 未来の天体（カレンダーの手前、z = 14） =======================
       カレンダーは時計として奥で進みつづけ、話がその時代の宇宙に移ると、手前に天体を出してカレンダーを暗くする（FOC が 1 のとき）。
       大きさ・距離・明るさは、見やすさのために変えて描いている（実際の比ではない）。ブラックホールから出る粒（ホーキング放射）も、見えるように誇張した絵 */
    const UP = new V3(0, 1, 0);
    const FOC = (name, t) => name === 'ichinichi' ? sstep(15.0, 15.9, t) - 0.28 * sstep(46.3, 47.2, t)
      : name === 'hoshi' ? sstep(5.8, 6.6, t) - sstep(11.6, 12.4, t) + sstep(16.8, 17.5, t)
      : name === 'kurayami' ? Math.max(1 - sstep(0.2, 1.4, t), sstep(6.0, 6.8, t) - sstep(35.3, 36.2, t)) : 0;
    const CEL = new T.Group(); CEL.position.set(0, 0.4, 14); scene.add(CEL);
    const ringTex = ctex(256, 256, (x, w, h) => { x.clearRect(0, 0, w, h); const g = x.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.5);
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.25, 'rgba(255,255,255,1)'); g.addColorStop(0.45, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const CA = new T.Color(), CB = new T.Color();
    const mix = (m, a, b, u) => { CA.set(a); CB.set(b); m.color.copy(CA.lerp(CB, u)); };
    const mix3 = (m, a, b, c, u1, u2) => { CA.set(a); CB.set(b); CA.lerp(CB, u1); CB.set(c); m.color.copy(CA.lerp(CB, u2)); };

    // 太陽と地球（ichinichi）：明るくなり（10億年）、地球の海が干上がり、赤色巨星にふくらむ（50億年）
    const SUNS = new T.Group(); CEL.add(SUNS);
    // 太陽：ふちが暗くなる球（周辺減光）。色は uniforms.col
    const sunU = { col: { value: new T.Color('#FFD45E') }, op: { value: 1 } }, sunCol = { color: sunU.col.value };
    const sunMat = new T.ShaderMaterial({ uniforms: sunU,
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 col; uniform float op; varying vec3 vN; varying vec3 vV;
        void main(){ float d = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0); vec3 c = col * (0.58 + 0.5 * pow(d, 0.55)); gl_FragColor = vec4(min(c, vec3(1.0)), op); }` });
    const sunB = new T.Mesh(new T.SphereGeometry(1, 48, 32), sunMat); sunB.position.set(-2.8, -0.4, 0); SUNS.add(sunB);
    const sunGl = glow('#FFB347', 6); sunGl.position.copy(sunB.position); SUNS.add(sunGl);
    const orbitM = new T.MeshBasicMaterial({ color: '#5B6CA8', transparent: true, opacity: 0.55 });
    const earthPiv = new T.Group(); earthPiv.position.copy(sunB.position); earthPiv.rotation.x = PI / 2 - 0.28; SUNS.add(earthPiv);
    earthPiv.add(new T.Mesh(new T.TorusGeometry(7.4, 0.025, 6, 140), orbitM));
    const oceanM = toon('#3E7BD6'), landM = toon('#5BBF6A');
    const earth = new T.Mesh(new T.SphereGeometry(0.62, 32, 24), oceanM); earthPiv.add(earth); outline(earth, INK, 1.03);
    for (let i = 0; i < 7; i++) { const l = new T.Mesh(new T.SphereGeometry(0.2 + rnd() * 0.14, 10, 8), landM); const a = rnd() * PI * 2, b = rnd() * 1.2 - 0.6;
      l.position.set(Math.cos(a) * Math.cos(b) * 0.52, Math.sin(b) * 0.52, Math.sin(a) * Math.cos(b) * 0.52); l.scale.set(1, 0.45, 1); l.quaternion.setFromUnitVectors(UP, l.position.clone().normalize()); earth.add(l); }
    const earthGl = glow('#FF7A45', 2.2); earth.add(earthGl);
    // w：外側を吹き飛ばして白色矮星になる（約80億年後。「ふくらんだ太陽は、やがて…」）
    const SUNT = t => ({ b: sstep(15.6, 18.6, t), d1: sstep(16.6, 19.6, t), g: sstep(22.4, 26.4, t), d2: sstep(23.4, 26.4, t), w: sstep(38.2, 41.4, t), n: sstep(38.2, 45.5, t) });
    const shell = new T.Sprite(new T.SpriteMaterial({ map: ringTex, color: new T.Color('#7FE3D0'), blending: T.AdditiveBlending, depthWrite: false, transparent: true })); shell.position.copy(sunB.position); SUNS.add(shell);
    function upSun(t, Tt) {
      const s = SUNT(t), rg = lerp(1.5, 1.68, s.b) + 2.5 * s.g, r = lerp(rg, 0.26, s.w) + 0.03 * Math.sin(Tt * 2.3) * (1 - s.w);
      sunB.scale.setScalar(r); mix3(sunCol, '#FFD45E', '#FFF1C2', '#FF6B3D', s.b, s.g); CB.set('#EAF2FF'); sunCol.color.lerp(CB, s.w);
      sunGl.scale.setScalar(lerp(lerp(6, 8.5, s.b) + 9 * s.g, 2.4, s.w)); mix3(sunGl.material, '#FFB347', '#FFE7A0', '#FF4A22', s.b, s.g); CB.set('#BFD8FF'); sunGl.material.color.lerp(CB, s.w);
      shell.visible = s.n > 0.01 && s.n < 0.99; shell.scale.setScalar(rg * (1 + 2.6 * s.n) / 0.4); shell.material.opacity = 0.85 * Math.sin(PI * s.n) * st.sunA;
      mix3(oceanM, '#3E7BD6', '#8FA2AE', '#B57A4A', s.d1, s.d2); mix3(landM, '#5BBF6A', '#A39A5C', '#7A4630', s.d1, s.d2);
      const th = -0.12 + 0.03 * Math.sin(Tt * 0.2); earth.position.set(7.4 * Math.cos(th), 7.4 * Math.sin(th), 0); earth.rotation.y = Tt * 0.4;
      earthGl.visible = s.d2 > 0.05; earthGl.scale.setScalar(2.2 * s.d2);
    }

    // 燃えつきていく星（hoshi）：ガスがうすれ、重い星から順に燃えつき、燃えかすが残る。赤色矮星は最後まで光り、夜空と同時に消える
    const STARS = new T.Group(); CEL.add(STARS);
    const neb = glow('#B57DFF', 20); neb.material.opacity = 0.5; neb.position.set(-1.5, 0.4, -2); STARS.add(neb);
    const neb2 = glow('#FF8FB1', 13); neb2.material.opacity = 0.42; neb2.position.set(3.2, -0.8, -1.5); STARS.add(neb2);
    const KINDS = [{ c: '#9FC2FF', r: 0.34, g: 3.2, n: 5, die: [6.8, 7.6] }, { c: '#F4F6FF', r: 0.28, g: 2.6, n: 6, die: [7.6, 8.7] },
      { c: '#FFE38A', r: 0.24, g: 2.2, n: 8, die: [8.7, 9.9] }, { c: '#FFAE5E', r: 0.2, g: 1.9, n: 8, die: [9.9, 11.1] }, { c: '#FF5E4A', r: 0.14, g: 1.4, n: 10, die: [17.4, 19.6], red: true }];
    const starL = [], ashM = new T.MeshBasicMaterial({ color: '#7E88AA' }), ashG = new T.SphereGeometry(0.07, 8, 6);
    for (const kd of KINDS) for (let i = 0; i < kd.n; i++) {
      const a = rnd() * PI * 2, rr = Math.sqrt(0.08 + 0.92 * rnd()), p = new V3(Math.cos(a) * rr * 9.6, Math.sin(a) * rr * 3.6 - 0.3, (rnd() - 0.5) * 3);
      const m = new T.Mesh(new T.SphereGeometry(kd.r, 16, 12), new T.MeshBasicMaterial({ color: kd.c })); m.position.copy(p);
      const gl = glow(kd.c, kd.g); gl.position.copy(p); const ash = new T.Mesh(ashG, ashM); ash.position.copy(p);
      STARS.add(m, gl, ash); starL.push({ m, gl, ash, kd, td: lerp(kd.die[0], kd.die[1], rnd()), ph: rnd() * 6 });
    }
    function upStars(t, Tt) {
      const ng = 1 - sstep(6.0, 7.8, t); neb.scale.setScalar(20 * (0.4 + 0.6 * ng)); neb2.scale.setScalar(13 * (0.4 + 0.6 * ng)); neb.visible = neb2.visible = ng > 0.01;
      neb.material.opacity = 0.5 * ng * st.cel; neb2.material.opacity = 0.42 * ng * st.cel;
      for (const s of starL) { const u = t - s.td;
        if (u < 0) { s.m.scale.setScalar(1); s.gl.scale.setScalar(s.kd.g * (1 + 0.06 * Math.sin(Tt * 3 + s.ph))); s.ash.scale.setScalar(0.001); }
        else { const fl = u < 0.25 ? 1 + 0.9 * u / 0.25 : 1.9 * (1 - sstep(0.25, 0.95, u)); s.m.scale.setScalar(Math.max(0.001, 1 - sstep(0.1, 0.6, u)));
          s.gl.scale.setScalar(Math.max(0.001, s.kd.g * fl)); s.ash.scale.setScalar(Math.max(0.001, sstep(0.3, 0.9, u))); } }
    }

    // 銀河（kurayami、4回目）：星の燃えかすの円盤。9割ほどは外へ飛び去り、のこりは中心へ落ちる
    const GAL = new T.Group(); GAL.rotation.set(-0.95, 0, 0.3); CEL.add(GAL);
    const NG = 2600, gB = new Float32Array(NG * 3), gP = new Float32Array(NG * 3), gC = new Float32Array(NG * 3), gK = new Float32Array(NG), gIn = new Uint8Array(NG);
    for (let i = 0; i < NG; i++) {
      const arm = i % 2, rr = Math.pow(rnd(), 0.6) * 6.4 + 0.3, a = rr * 0.65 + arm * PI + (rnd() - 0.5) * 0.8;
      gB[3 * i] = Math.cos(a) * rr; gB[3 * i + 1] = (rnd() - 0.5) * 0.4 * (1.2 - rr / 8); gB[3 * i + 2] = Math.sin(a) * rr;
      CA.set(rnd() < 0.7 ? '#8C96B8' : '#C9B79C').multiplyScalar(0.55 + rnd() * 0.55); gC[3 * i] = CA.r; gC[3 * i + 1] = CA.g; gC[3 * i + 2] = CA.b;
      gK[i] = 0.6 + rnd() * 1.4; gIn[i] = rnd() < 0.08 ? 1 : 0;
    }
    const galGeo = new T.BufferGeometry(); galGeo.setAttribute('position', new T.BufferAttribute(gP, 3)); galGeo.setAttribute('color', new T.BufferAttribute(gC, 3));
    const galPts = new T.Points(galGeo, new T.PointsMaterial({ size: 0.14, vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending, fog: false }));
    galPts.frustumCulled = false; GAL.add(galPts);
    const galCore = glow('#9FB3FF', 3.2); GAL.add(galCore);
    function upGal(t, Tt) {
      const d = sstep(7.2, 12.2, t), sp = Tt * 0.07, cs = Math.cos(sp), sn = Math.sin(sp);
      for (let i = 0; i < NG; i++) { const x = gB[3 * i], y = gB[3 * i + 1], zz = gB[3 * i + 2], f = gIn[i] ? 1 - 0.93 * d : 1 + d * gK[i] * 2.4;
        gP[3 * i] = (x * cs - zz * sn) * f; gP[3 * i + 1] = y * f + (gIn[i] ? 0 : d * gK[i] * (i % 3 - 1) * 1.2); gP[3 * i + 2] = (x * sn + zz * cs) * f; }
      galGeo.attributes.position.needsUpdate = true; galCore.scale.setScalar(3.2 + 1.5 * d);
    }

    // 原子（kurayami、11回目）：陽子と中性子がひとつずつ崩れ、電子の輪も消える（陽子が崩れるなら）
    const ATOM = new T.Group(); ATOM.scale.setScalar(1.45); CEL.add(ATOM);
    const NUC = [[0, 0, 0], [0.42, 0.1, 0.05], [-0.4, 0.12, -0.08], [0.05, 0.42, 0.1], [0.02, -0.4, 0.06], [0.1, 0.05, 0.42], [-0.05, 0.02, -0.42], [0.3, 0.32, -0.25], [-0.3, -0.3, 0.25], [0.32, -0.28, -0.22], [-0.28, 0.3, 0.28], [0.25, -0.25, 0.33]];
    const pM = toon('#FF6B6B'), nM = toon('#A9B8DE'), nucL = [];
    NUC.forEach((p, i) => { const m = new T.Mesh(new T.SphereGeometry(0.3, 20, 14), i % 2 ? nM : pM); m.position.set(p[0] * 1.15, p[1] * 1.15, p[2] * 1.15); outline(m, INK, 1.06); ATOM.add(m);
      const f = glow(i % 2 ? '#C9D6FF' : '#FFB0A8', 1); f.position.copy(m.position); ATOM.add(f); nucL.push({ m, f, td: 13.3 + i * 0.37 + rnd() * 0.2 }); });
    const eL = [];
    for (let i = 0; i < 3; i++) { const r = new T.Mesh(new T.TorusGeometry(2.7, 0.022, 6, 110), new T.MeshBasicMaterial({ color: '#7CE0FF', transparent: true })); r.rotation.set(PI / 2 + (i - 1) * 0.9, i * 1.1, 0); ATOM.add(r);
      const d = new T.Mesh(new T.SphereGeometry(0.11, 12, 8), new T.MeshBasicMaterial({ color: '#BFF3FF', transparent: true })); r.add(d); eL.push({ r, d }); }
    function upAtom(t, Tt) {
      ATOM.rotation.y = Tt * 0.25;
      for (const n of nucL) { const u = t - n.td; n.m.scale.setScalar(Math.max(0.001, 1 - sstep(0, 0.3, u))); n.f.visible = u > 0 && u < 0.6; if (n.f.visible) n.f.scale.setScalar(2.2 * Math.sin(PI * u / 0.6)); }
      const e = 1 - sstep(18.0, 19.8, t);
      eL.forEach((o, i) => { const ph = Tt * (1.4 + i * 0.3) + i; o.d.position.set(2.7 * Math.cos(ph), 2.7 * Math.sin(ph), 0); o.r.scale.setScalar(Math.max(0.001, lerp(1.25, 1, e))); o.r.visible = e > 0.01; });
    }

    // ブラックホール（kurayami、23回目と39回目）：黒い球と光の輪。表面から粒が出て、終わりぎわに一気に小さくなり、光って消える
    function makeBH(r, ringC) {
      const g = new T.Group();
      const core = new T.Mesh(new T.SphereGeometry(1, 40, 28), new T.MeshBasicMaterial({ color: '#000000' })); g.add(core);
      const ring = new T.Sprite(new T.SpriteMaterial({ map: ringTex, color: new T.Color(ringC), blending: T.AdditiveBlending, depthWrite: false, transparent: true })); g.add(ring);
      const halo = glow(ringC, r * 4); halo.material.opacity = 0.3; g.add(halo);
      const NP = 170, pos = new Float32Array(NP * 3), col = new Float32Array(NP * 3), dir = [], ph = [];
      for (let i = 0; i < NP; i++) { const u = rnd() * 2 - 1, a = rnd() * PI * 2, s = Math.sqrt(1 - u * u); dir.push(new V3(s * Math.cos(a), u, s * Math.sin(a))); ph.push(rnd()); }
      const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setAttribute('color', new T.BufferAttribute(col, 3));
      const pts = new T.Points(geo, new T.PointsMaterial({ size: 0.1, vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending, fog: false })); pts.frustumCulled = false; g.add(pts);
      const burst = glow('#FFF6E0', 1); g.add(burst);
      g.userData = { core, ring, halo, pts, pos, col, dir, ph, NP, r0: r, burst }; return g;
    }
    const BH1 = makeBH(1.5, '#FFB36B'), BH2 = makeBH(3.3, '#FF8A5C'); CEL.add(BH1, BH2);
    // 半径は質量に比例し、質量は (1 − u)^(1/3) で減る（蒸発は、終わりぎわに一気に進む）
    function upBH(bh, t, t0, t1, Tt) {
      const U = bh.userData, u = clamp((t - t0) / (t1 - t0), 0, 1), alive = t < t1, r = U.r0 * Math.pow(1 - u, 1 / 3), q = 1 - r / U.r0;
      U.core.visible = U.ring.visible = U.halo.visible = alive && r > 0.01;
      U.core.scale.setScalar(Math.max(r, 0.001)); U.ring.scale.setScalar(Math.max(r, 0.001) / 0.35 * 1.05); U.halo.scale.setScalar(Math.max(r, 0.001) * 4);
      const rate = 0.25 + 1.2 * q;
      for (let i = 0; i < U.NP; i++) { const a = (Tt * rate + U.ph[i]) % 1, d = U.dir[i], rr = r + a * (1.2 + U.r0);
        U.pos[3 * i] = d.x * rr; U.pos[3 * i + 1] = d.y * rr; U.pos[3 * i + 2] = d.z * rr;
        const k = alive ? (1 - a) * (0.35 + 0.65 * q) : 0; U.col[3 * i] = k; U.col[3 * i + 1] = k * 0.93; U.col[3 * i + 2] = k * 0.82; }
      U.pts.geometry.attributes.position.needsUpdate = true; U.pts.geometry.attributes.color.needsUpdate = true;
      const b = t - t1; U.burst.visible = b > 0 && b < 1.2; U.burst.scale.setScalar(U.burst.visible ? (2 + 12 * b) * (1 - b / 1.2) : 0.001);
    }
    const BHT = { b1: [21.3, 25.9], b2: [30.0, 34.5] };
    // 遠くの銀河が見えなくなり（約1000億〜1500億年後）、近所の銀河がひとつになる（約1000億〜1兆年後）。ichinichi の後半
    const FARG = new T.Group(); CEL.add(FARG);
    const farL = []; for (let i = 0; i < 40; i++) { const a = rnd() * PI * 2, rr = 0.45 + 0.55 * Math.sqrt(rnd()), g = glow(['#DCE6FF', '#FFE9C4', '#CFE0FF'][i % 3], 1), sz = 0.7 + rnd() * 0.9;
      g.material.rotation = rnd() * PI; FARG.add(g); farL.push({ g, x: Math.cos(a) * rr * 13.5, y: Math.sin(a) * rr * 5.6 + 0.2, sz, t0: 48.0 + rnd() * 4.6, base: new T.Color(g.material.color) }); }
    function spiral(n, R, col) { const pos = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const rr = Math.pow(rnd(), 0.7) * R, a = rr / R * 5.2 + (i % 2) * PI + (rnd() - 0.5) * 0.7;
        pos[3 * i] = Math.cos(a) * rr; pos[3 * i + 1] = (rnd() - 0.5) * 0.12; pos[3 * i + 2] = Math.sin(a) * rr; }
      const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3));
      const g = new T.Group(), pts = new T.Points(geo, new T.PointsMaterial({ size: 0.09, color: col, transparent: true, depthWrite: false, blending: T.AdditiveBlending, fog: false })); pts.frustumCulled = false;
      const core = glow(col, R * 0.9); g.add(pts, core); g.userData = { pts, core }; return g; }
    const HOME = [{ g: spiral(700, 1.7, '#CFE0FF'), x: -2.3, y: -0.5, rx: -1.0, rz: 0.3 }, { g: spiral(900, 2.1, '#FFE9C4'), x: 2.6, y: 0.9, rx: -0.6, rz: -0.5 }];
    HOME.forEach(h => { h.g.rotation.set(h.rx, 0, h.rz); FARG.add(h.g); });
    const DW = [[-0.2, 2.2], [0.8, -1.9], [-4.3, 1.2], [4.9, -0.8]].map(([x, y]) => { const g = glow('#DCE6FF', 0.7); FARG.add(g); return { g, x, y }; });
    const ellip = glow('#FFE1B0', 1); FARG.add(ellip);
    const FART = { m: [58.8, 63.6] };
    function upFar(A, t, Tt) {
      FARG.visible = A > 0.01; if (!FARG.visible) return;
      for (const f of farL) { const u = sstep(f.t0, f.t0 + 2.4, t), k = 1 + 0.8 * u; f.g.position.set(f.x * k, f.y * k, -1);
        f.g.scale.set(f.sz * (1 - 0.6 * u), f.sz * 0.45 * (1 - 0.6 * u), 1); CB.set('#FF3B2F'); f.g.material.color.copy(f.base).lerp(CB, u); f.g.material.opacity = A * (1 - u); f.g.visible = u < 0.995; }
      const m = sstep(FART.m[0], FART.m[1], t), sw = Math.sin(m * PI) * 0.9;
      HOME.forEach((h, i) => { const s = i ? 1 : -1, cx = lerp(h.x, 0, m) + s * sw * 0.4, cy = lerp(h.y, 0.2, m) - s * sw * 0.7; h.g.position.set(cx, cy, 0); h.g.rotation.y = Tt * 0.12 + m * 4 * s;
        h.g.userData.pts.material.opacity = A * (1 - 0.92 * m); h.g.userData.core.material.opacity = A * (1 - m); });
      DW.forEach(d => { d.g.position.set(lerp(d.x, 0, m), lerp(d.y, 0.2, m), 0); d.g.material.opacity = A * (1 - m); });
      ellip.position.set(0, 0.2, 0.1); ellip.scale.set(lerp(1, 7.2, m), lerp(1, 5.2, m), 1); ellip.material.opacity = A * m; ellip.visible = m > 0.01;
    }
    CEL.traverse(o => { o.renderOrder = 1400; });
    const celA = (name, t) => ({
      sun: name === 'ichinichi' ? sstep(15.0, 15.9, t) * (1 - sstep(46.0, 46.9, t)) : 0,
      far: name === 'ichinichi' ? sstep(46.8, 47.7, t) : 0,
      stars: name === 'hoshi' ? FOC(name, t) : 0,
      gal: name === 'kurayami' ? sstep(6.0, 6.8, t) * (1 - sstep(12.0, 12.8, t)) : 0,
      atom: name === 'kurayami' ? sstep(12.2, 13.0, t) * (1 - sstep(20.2, 20.9, t)) : 0,
      b1: name === 'kurayami' ? sstep(20.8, 21.5, t) * (1 - sstep(27.2, 27.6, t)) : 0,
      b2: name === 'kurayami' ? sstep(29.1, 29.9, t) * (1 - sstep(36.0, 36.4, t)) : 0,
    });
    // 光る物（加算合成・深度を書かない物）は、いつも透明の組で描く（不透明の組に入ると、あとから描くカレンダーに塗りつぶされる）
    const celFade = (obj, a) => { obj.visible = a > 0.01; obj.traverse(o => { const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      for (const m of ms) { if (m.userData.base === undefined) m.userData.base = m.opacity; m.transparent = m.blending === T.AdditiveBlending || m.depthWrite === false || a < 0.999; m.opacity = m.userData.base * a;
        if (m.uniforms && m.uniforms.op) m.uniforms.op.value = a; } }); };
    function upCel(name, t, Tt) {
      const A = celA(name, t);
      st.sunA = A.sun; celFade(SUNS, A.sun); if (A.sun > 0.01) upSun(t, Tt);
      upFar(A.far, t, Tt);
      st.cel = A.stars; celFade(STARS, A.stars); if (A.stars > 0.01) upStars(t, Tt);
      celFade(GAL, A.gal); if (A.gal > 0.01) upGal(t, Tt);
      celFade(ATOM, A.atom); if (A.atom > 0.01) upAtom(t, Tt);
      celFade(BH1, A.b1); if (A.b1 > 0.01) upBH(BH1, t, BHT.b1[0], BHT.b1[1], Tt);
      celFade(BH2, A.b2); if (A.b2 > 0.01) upBH(BH2, t, BHT.b2[0], BHT.b2[1], Tt);
    }
    const WP = new V3();
    function celLabels(name, t, L) {
      const A = celA(name, t), at = (x, y, z) => new V3(CEL.position.x + x, CEL.position.y + y, CEL.position.z + z);
      if (A.sun > 0.5) { const s = SUNT(t), r = sunB.scale.x;
        L.push({ id: 'csun', p: at(sunB.position.x, sunB.position.y + r + 0.3, 0.5), t: '太陽', sub: s.w > 0.5 ? '白色矮星に（地球くらいの大きさ）' : s.g > 0.5 ? '赤色巨星に（大きさは目安）' : s.b > 0.3 ? '少しずつ明るくなる' : '', dot: s.w > 0.5 ? '#EAF2FF' : s.g > 0.5 ? '#FF6B3D' : '#FFD45E' });
        earth.getWorldPosition(WP); L.push({ id: 'cearth', p: WP.clone().add(new V3(0, 0.8, 0)), t: '地球', sub: s.d2 > 0.5 ? '海がなくなる' : s.d1 > 0.3 ? '海が干上がりはじめる' : '', dot: '#6FB2FF' }); }
      if (A.far > 0.5) { const m = sstep(FART.m[0], FART.m[1], t);
        if (t < 54.2) L.push({ id: 'cfar', p: at(8.5, 3.6, 0), t: '遠くの銀河', sub: '赤くなって、見えなくなる', dot: '#FF8C7A' });
        L.push({ id: 'chome', p: at(0, m > 0.6 ? 3.2 : 2.6, 0), t: m > 0.6 ? 'ひとつの大きな銀河' : '天の川と近所の銀河', sub: m > 0.6 ? '近所の銀河が合体' : t > 54.2 && m < 0.05 ? 'ほかには、もう何も見えない' : '', dot: '#FFE1B0' });
        if (t > 47.8 && t < 57.6) L.push({ id: 'dfar', p: cellC(1, 9, 1, false), t: '1月10日ごろ', dot: '#B58CFF' });
        if (t > 58.4) L.push({ id: 'dmg', p: cellC(1, 73, 1, false), t: '3月の半ば', dot: '#FFE1B0' }); }
      if (A.stars > 0.5) {
        if (t < 8.2) L.push({ id: 'cneb', p: at(-1.5, 1.6, -2), t: 'ガス（星の材料）', sub: 'うすれていく', dot: '#C9A6FF' });
        if (t > 6.8 && t < 12.4) L.push({ id: 'cst', p: at(0, 4.2, 0), t: '星が燃えつきていく', sub: '重い星から順に', dot: '#FFE38A' });
        if (t > 16.8 && t < 19.4) { const rd = starL.find(s => s.kd.red && t < s.td); if (rd) L.push({ id: 'cred', p: at(rd.m.position.x, rd.m.position.y + 0.3, rd.m.position.z), t: '赤色矮星', sub: '最後まで光る星', dot: '#FF5E4A' }); } }
      if (A.gal > 0.5) L.push({ id: 'cgal', p: at(0, 3.9, 0), t: '銀河', sub: t > 7.4 ? '燃えかすが散らばっていく' : '星の燃えかすの集まり', dot: '#9FB3FF' });
      if (A.atom > 0.5) L.push({ id: 'catom', p: at(0, 4.3, 0), t: '原子', sub: '陽子が崩れるなら', dot: '#FF6B6B' });
      if (A.b1 > 0.5 && t < BHT.b1[1]) L.push({ id: 'cbh1', p: at(0, 2.3, 0), t: 'ブラックホール', sub: '太陽ほどの重さなら', dot: '#FFB36B' });
      if (A.b2 > 0.5 && t < BHT.b2[1]) L.push({ id: 'cbh2', p: at(0, 4.0, 0), t: '最大のブラックホール', sub: '考えられるかぎり最大', dot: '#FF8A5C' });
    }

    let lastT = -1e9;
    function update(dt, t, Tt, name) {
      const tr = t; t = wt(name, t);
      const jump = dt === 0 || Math.abs(Tt - lastT) > 0.5; lastT = Tt;
      stars.position.copy(cam.position);
      // 星空：hoshi の「夜空から、星がなくなるの」で消える
      const so = SC.indexOf(name) < SC.indexOf('hoshi') ? 0.75 : name === 'hoshi' ? 0.75 * (1 - sstep(17.0, 20.0, t)) : 0;
      st.star = jump ? so : lerp(st.star, so, 1 - Math.exp(-dt * 4)); starMat.opacity = st.star; stars.visible = st.star > 0.005;

      // はじめの札
      NUMS.forEach(c => { const u = name === 'hajime' ? sstep(c.userData.t0 - 0.2, c.userData.t0 + 0.5, t) : 1; fadeAll(c, u); c.scale.setScalar(lerp(0.85, 1, u)); });

      // カレンダーの入れ子
      const past = PAST.has(name), z = (ZS[name] || ZS.koyomi)(t);
      st.z = z; st.past = past;
      const gAll = name === 'hajime' ? 0 : name === 'koyomi' ? sstep(0, 1.0, t) : name === 'mata' ? 1 - 0.7 * sstep(4, 10, t) : 1;
      layout(z, past, name, t, gAll * (1 - 0.8 * FOC(name, t)));
      upCel(name, t, Tt);
      // いま
      { const vis = past && name !== 'hajime' && z > -0.6 && after(name, t, 'koyomi', 3.4) ? 1 : 0;
        const p = wpos(0, nowR.x + 1, nowR.y + 0.4, z, past, 0.3), sc = Math.exp(LS * z);
        nowG.position.copy(p); nowG.scale.setScalar((1.3 + 0.25 * Math.sin(Tt * 4)) * Math.min(1, sc)); nowG.visible = vis > 0 && sc > 0.2; }

      // もとにもどるまで：塔
      { const u = name === 'saiki' ? sstep(9.4, 10.6, t) : name === 'mata' ? 1 - sstep(0, 2, t) : 0; fadeAll(TOWER, u);
        TOWER.userData.p.forEach((c, i) => { const v = name === 'saiki' ? sstep(9.4 + i * 0.5, 10.2 + i * 0.5, t) : u; c.scale.setScalar(lerp(0.4, 1, v)); });
        TOWER.position.y = 0.6 + Math.sin(Tt * 0.6) * 0.08; }
      // くらべる
      { const u = name === 'saiki' ? sstep(CMPT + 0.3, CMPT + 1.3, tr) : name === 'mata' ? 1 - sstep(0, 2, tr) : 0; fadeAll(CMP, u);
        cmpL.scale.setScalar(lerp(0.5, 1, sstep(CMPT + 0.3, CMPT + 1.1, tr))); cmpR.scale.setScalar(lerp(0.5, 1, sstep(CMPT + 2.4, CMPT + 3.2, tr)));
        cmpR.visible = ltB.visible = u > 0.01 && (name !== 'saiki' || tr > CMPT + 2.3); CMP.position.y = 0.6 + Math.sin(Tt * 0.6) * 0.08; }
      // また
      { const u = name === 'mata' ? sstep(5.0, 9.5, t) : 0; againM.opacity = 0.9 * u; AGAIN.visible = u > 0.005;
        againG.visible = u > 0.05; againG.scale.setScalar((2 + 0.4 * Math.sin(Tt * 3)) * u); }
    }

    function labels(name, t) {
      const tr = t; t = wt(name, t);
      const z = (ZS[name] || ZS.koyomi)(t), past = PAST.has(name), L = [], P = (k, i) => cellC(k, i, z, past);
      const calOn = FOC(name, t) < 0.5;
      const capt = (k, txt, sub) => { if (calOn) L.push({ id: 'cap', p: wpos(k, W / 2, H - 0.2, z, past), t: txt, sub, dot: '#FFE9A8' }); };
      celLabels(name, t, L);
      if (name === 'hajime') {
        const nm = ['1日', '人の一生（80年）', '宇宙の年齢'];
        NUMS.forEach((c, i) => { if (t > c.userData.t0 + 0.3) L.push({ id: 'n' + i, p: new V3(HX - 6.4 + c.userData.w + 0.9, c.position.y + 0.1, 0.2), t: nm[i], dot: i === 2 ? '#FFE27A' : '#FFF4D6' }); });
      }
      if (name === 'koyomi') {
        if (t > 1.0) L.push({ id: 'bb', p: P(0, 0), t: '宇宙のはじまり', sub: '1月1日 0時', dot: '#FFD166' });
        if (t > 3.6) L.push({ id: 'now', p: wpos(0, nowR.x + 1, nowR.y + 0.4, z, past), t: 'いま', sub: '12月31日 24時', dot: '#FFE9A8' });
        if (t > 8.6) capt(0, '宇宙カレンダー', '1日 ≒ 3800万年');
      }
      if (name === 'chikyu') {
        L.push({ id: 'sun', p: P(0, 244), t: '太陽と地球', sub: '9月のはじめ', dot: '#6FB2FF' });
        if (t > 9.2) L.push({ id: 'mae', p: P(0, 130), t: '地球のない宇宙', sub: '1月〜8月', dot: '#C9B8F0' });
        if (t > 16.0) L.push({ id: 'life', p: P(0, 264), t: '生命', sub: '9月の下旬', dot: '#7FD89A' });
      }
      if (name === 'kyouryu') {
        if (t > 1.0) L.push({ id: 'cam', p: P(0, 350), t: '動物が一気に増える', sub: '12月17日', dot: '#5ED1C6' });
        if (t > 4.8) L.push({ id: 'dino', p: P(0, 358), t: '恐竜があらわれる', sub: '12月25日', dot: '#FFA552' });
        if (t > 9.2) L.push({ id: 'dinoX', p: P(0, 363), t: '恐竜がいなくなる', sub: '12月30日の朝', dot: '#FF6B7D' });
        if (t > 20.2) L.push({ id: 'hito', p: P(0, 364), t: '人間がいるマス', sub: '12月31日', dot: '#FF8CC2' });
      }
      if (name === 'oomisoka' && t > 5.0) {
        capt(-1, '12月31日の中', '1日 ≒ 10万年');
        if (t > 11.4) L.push({ id: 'split', p: P(-1, 297), t: '人類の祖先が分かれる', sub: '10月の下旬', dot: '#FFA552' });
        if (t > 18.3) L.push({ id: 'sap', p: P(-1, 362), t: 'ホモ・サピエンス', sub: '12月29日', dot: '#FF8CC2' });
      }
      if (name === 'bunmei' && t > 4.4) {
        capt(-2, 'その12月31日の中', '1日 ≒ 280年');
        if (t > 7.9) L.push({ id: 'agri', p: P(-2, 322), t: '農業', sub: '11月の後半', dot: '#7FD89A' });
        if (t > 13.2) L.push({ id: 'moji', p: P(-2, 346), t: '文字', sub: '12月13日', dot: '#6FB2FF' });
        if (t > 15.8) L.push({ id: 'pyr', p: P(-2, 348), t: 'ピラミッド', sub: '12月15日', dot: '#FFD166' });
        if (t > 18.3) L.push({ id: 'ad', p: P(-2, 357), t: '西暦1年', sub: '12月24日', dot: '#FFA552' });
      }
      if (name === 'issho' && t > 4.4) {
        capt(-3, 'さらにその中', '1日 ≒ 9か月');
        if (t > 11.4) L.push({ id: 'issho', p: P(-3, 320), t: '人の一生（80年）', sub: '9月20日ごろ〜大みそか', dot: '#FF8CC2' });
      }
      if (name === 'mirai' && t > 4.4) {
        capt(0, 'これまでの138億年', '宇宙カレンダー');
        L.push({ id: 'now', p: wpos(0, nowR.x + 1, nowR.y + 0.4, z, past), t: 'いま', dot: '#FFE9A8' });
      }
      if (name === 'ichinichi' && t > 4.8) {
        capt(1, '入れ子 1回目', '1年を1日に（1日 ＝ 138億年）');
        if (t > 5.8 && calOn) L.push({ id: 'past', p: P(1, 0), t: 'これまでの138億年', sub: '1月1日', dot: '#FFD166' });
        if (t > 15.4 && calOn) L.push({ id: 'sun2', p: P(1, 1), t: '太陽がふくらむ', sub: '1月2日（海が干上がる）', dot: '#FFA552' });
      }
      if (name === 'hoshi' && t > 4.6) {
        capt(2, '入れ子 2回目', 'もう一度、1年を1日に（1日 ＝ 5兆年）');
        if (t > 6.1 && calOn) L.push({ id: 'stars', p: P(2, 10), t: '星が光る時代', sub: '1月の下旬まで', dot: '#FFE6A6' });
        if (t > 12.6 && calOn) L.push({ id: 'dark', p: P(2, 190), t: '星のない時代', sub: 'そのあと、ずっと', dot: '#2C3662' });
      }
      if (name === 'kurayami' || name === 'netsushi' || (name === 'saiki' && t < 23.86)) {
        const n = nestN(name, t, z);
        const last = name === 'kurayami' ? MILE.filter(m => m.c && z >= m.k - 0.03 && z < m.k + 4.5).pop() : null;
        L.push({ id: 'cnt', p: new V3(0, 9.2, 0.2), t: `入れ子 ${jaNum(n)}回目`, sub: last ? last.c : name === 'kurayami' ? (n >= 40 ? 'もう何も残っていない' : '') : '何も起きない', dot: '#9FB3FF' });
        if (name === 'kurayami' && calOn) for (const m of MILE) if (Math.abs(z - m.k) < 0.6) L.push({ id: 'mi' + m.k, p: P(m.k, m.i), t: m.t, sub: m.sub, dot: '#FF8C9A' });
      }
      if (name === 'saiki') {
        if (tr > CMPT + 1.2) L.push({ id: 'c4', p: new V3(-10.2, -2.9, 9.2), t: '3の塔 4段', sub: '3兆6千億けた', dot: '#BFD4FF' });
        if (tr > CMPT + 3.2) L.push({ id: 'c5', p: new V3(8.6, -2.9, 9.2), t: '3の塔 5段', sub: 'けた数が、4段の数ほど', dot: '#BFD4FF' });
        if (t > 10.4) L.push({ id: 'tw', p: new V3(-1.0, -3.2, 9.2), t: 'もとにもどるまで', sub: 'ある見積もり（年）', dot: '#FFD166' });
        if (t > 23.86) L.push({ id: 'cnt', p: new V3(0, 9.2, 0.2), t: '入れ子の回数', sub: '10の119乗回より多い', dot: '#9FB3FF' });
      }
      if (name === 'mata' && t > 7.0) L.push({ id: 'again', p: new V3(AGAIN.position.x + 0.62 * (nowR.x + 1), AGAIN.position.y + 0.62 * (nowR.y + 0.4), 1.4), t: 'いま', sub: 'もう一度？', dot: '#FFE9A8' });
      return L;
    }

    return {
      scenes: SC,
      enter() {},
      update,
      camera: (name, t) => (CAM[name] || CAM.koyomi)(t),
      labels,
    };
  },

  lines: [
    { w: 'B', s: 'hajime', t: 'ノア、前回の最後に言ってた「長すぎる時間」の話、聞きたい！',
      k: "のあ、ぜ'んかいの さ'いごに いってた、なが'すぎる じかんの はなし'、ききたい！" },
    { w: 'A', s: 'hajime', e: { A: 'smile' }, t: 'いいわよ。まずは、身近な時間から。1日は、8万6400秒。',
      k: "い'いわよ。ま'ずわ、みぢかな じかんから。いちにちわ、はちまん ろくせん よんひゃく びょう。" },
    { w: 'A', s: 'hajime', t: '人の一生を80年とすると、およそ25億秒。',
      k: "ひとの いっしょ'うお はちじゅうねんと すると、およそ にじゅうごお'く びょう。" },
    { w: 'B', s: 'hajime', t: '前回、10億秒で32年だったから……その2倍半くらいだね。',
      k: "ぜ'んかい、じゅうお'くびょうで さんじゅうに'ねん だったから… その にばいはん くらいだね。" },
    { w: 'A', s: 'hajime', t: 'じゃあ、宇宙が生まれてから、今までは？ 138億年。秒にすると、43京秒。',
      k: "じゃあ、う'ちゅうが うまれてから、い'ままでわ？ ひゃくさんじゅうはちお'くねん。びょうに すると、よんじゅうさんけ'い びょう。" },
    { w: 'B', s: 'hajime', e: { B: 'surprise' }, t: 'けい……？ もう、ぜんぜん想像できないよ。',
      k: "けい…？ もう、ぜんぜん そうぞう できないよ。" },
    { w: 'A', s: 'hajime', t: 'そこで、138億年を、1年のカレンダーに縮めてみましょう。宇宙カレンダーよ。',
      k: "そこで、ひゃくさんじゅうはちお'くねんお、いちねんの かれ'んだーに ちぢめて みましょ'う。うちゅう かれ'んだーよ。" },
    { w: 'A', s: 'koyomi', t: '1月1日の0時に、宇宙が生まれる。そして、12月31日の夜の12時が、いま。',
      k: "いちがつ ついたちの れ'いじに、う'ちゅうが うまれる。そして、じゅうにがつ さんじゅういちにちの よ'るの じゅうに'じが、い'ま。" },
    { w: 'A', s: 'koyomi', t: 'このカレンダーの1日は、およそ3800万年。1秒でも、440年くらいになるわ。',
      k: "この かれ'んだーの いちにちわ、およそ さんぜん はっぴゃくま'んねん。い'ちびょうでも、よんひゃく よんじゅうねん くらいに なるわ。",
      b: { h: '宇宙カレンダー', r: ['138億年を、1年に縮める', '1日 ≒ 3800万年', '1秒 ≒ 440年'] } },
    { w: 'B', s: 'koyomi', t: '1秒で、440年……。じゃあ、地球ができるのは？',
      k: "い'ちびょうで、よんひゃく よんじゅうねん…。じゃあ、ちきゅうが できるのわ？" },
    { w: 'A', s: 'chikyu', t: '太陽と地球ができるのは、9月のはじめ。',
      k: "た'いようと ちきゅうが できるのわ、く'がつの はじめ。" },
    { w: 'B', s: 'chikyu', e: { B: 'surprise' }, t: '9月!? 1年の3分の2が、もう終わってる……。',
      k: "く'がつ！？ いちねんの さんぶんの にが、もう おわってる…。" },
    { w: 'A', s: 'chikyu', t: 'それまでの8か月は、地球のない宇宙。星が生まれては燃えつき、銀河が育っていたの。',
      k: "それまでの はっかげつわ、ちきゅうの ない う'ちゅう。ほしが うまれてわ もえつき、ぎ'んがが そだって いたの。" },
    { w: 'A', s: 'chikyu', t: '生命が生まれるのは、9月の下旬。38億年ほど前と考えられているわ。',
      k: "せ'いめいが うまれるのわ、く'がつの げじゅん。さんじゅうはちお'くねん ほど ま'えと かんがえられて いるわ。" },
    { w: 'B', s: 'chikyu', t: 'じゃあ、恐竜は？',
      k: "じゃあ、きょうりゅうわ？" },
    { w: 'A', s: 'kyouryu', t: '動物が一気に増えるのが、12月17日。',
      k: "どうぶつが いっきに ふえ'るのが、じゅうにがつ じゅうしちにち。" },
    { w: 'A', s: 'kyouryu', t: '恐竜があらわれるのが、クリスマスの12月25日。',
      k: "きょうりゅうが あらわれるのが、くりす'ますの じゅうにがつ にじゅうごにち。" },
    { w: 'A', s: 'kyouryu', t: 'そして、恐竜がいなくなるのは、12月30日の朝。6600万年前ね。',
      k: "そして、きょうりゅうが いなくなるのわ、じゅうにがつ さんじゅうにちの あ'さ。ろくせん ろっぴゃくま'んねん ま'えね。",
      b: { h: '宇宙カレンダーの12月', r: ['17日 動物が一気に増える', '25日 恐竜があらわれる', '30日の朝 恐竜がいなくなる'] } },
    { w: 'B', s: 'kyouryu', t: '年末ぎりぎりだ……。人間は、まだ出てこないの？',
      k: "ねんまつ ぎりぎりだ…。にんげんわ、ま'だ でてこないの？" },
    { w: 'A', s: 'kyouryu', t: '人間がいるのは、12月31日。最後の1マスの中よ。',
      k: "にんげんが いるのわ、じゅうにがつ さんじゅういちにち。さ'いごの ひとま'すの な'かよ。" },
    { w: 'A', s: 'oomisoka', t: 'この1マスを、もう一度、1年に引き伸ばしてみるわね。',
      k: "この ひとま'すお、もう いちど、いちねんに ひきのば'して みるわね。" },
    { w: 'B', s: 'oomisoka', e: { B: 'surprise' }, t: 'わっ、マスの中に、またカレンダーがある！',
      k: "わっ、ま'すの な'かに、ま'た かれ'んだーが ある！" },
    { w: 'A', s: 'oomisoka', t: '今度の1日は、およそ10万年。',
      k: "こ'んどの いちにちわ、およそ じゅうま'んねん。" },
    { w: 'A', s: 'oomisoka', t: '人類の祖先が、チンパンジーの祖先と分かれたのが、10月の下旬。700万年ほど前ね。',
      k: "じ'んるいの そ'せんが、ちんぱ'んじーの そ'せんと わかれたのが、じゅうがつの げじゅん。ななひゃくま'んねん ほど ま'えね。" },
    { w: 'A', s: 'oomisoka', t: 'わたしたち、ホモ・サピエンスが出てくるのは、12月29日。30万年ほど前。',
      k: "わたしたち、ほ'も さぴ'えんすが でてくるのわ、じゅうにがつ にじゅうくにち。さんじゅうま'んねん ほど ま'え。",
      b: { h: '12月31日を、1年に', r: ['1日 ≒ 10万年', '10月の下旬 人類の祖先が分かれる', '12月29日 ホモ・サピエンス'] } },
    { w: 'B', s: 'oomisoka', t: 'また、年末ぎりぎり……。',
      k: "ま'た、ねんまつ ぎりぎり…。" },
    { w: 'A', s: 'bunmei', t: 'その12月31日を、また1年に。今度の1日は、280年くらい。',
      k: "その じゅうにがつ さんじゅういちにちお、ま'た いちねんに。こ'んどの いちにちわ、にひゃく はちじゅうねん くらい。" },
    { w: 'A', s: 'bunmei', t: '農業が始まるのが、11月の後半。1万2千年ほど前。',
      k: "の'うぎょうが はじまるのが、じゅういちがつの こうはん。いちまん にせ'んねん ほど ま'え。" },
    { w: 'A', s: 'bunmei', t: '文字が生まれるのが12月13日、ピラミッドが12月15日。',
      k: "も'じが うまれるのが じゅうにがつ じゅうさんにち、ぴらみ'っどが じゅうにがつ じゅうごにち。" },
    { w: 'A', s: 'bunmei', t: '西暦1年は、12月24日。',
      k: "せ'いれき いちねんわ、じゅうにがつ にじゅうよっか。",
      b: { h: 'もう一度、12月31日を1年に', r: ['1日 ≒ 280年', '11月の後半 農業 ／ 12月13日 文字', '12月15日 ピラミッド ／ 24日 西暦1年'] } },
    { w: 'B', s: 'bunmei', t: '歴史の教科書に出てくることは、ほとんど12月の半ばから先なんだ……。',
      k: "れきしの きょうか'しょに でてくる ことわ、ほとんど じゅうにがつの なかばから さきなんだ…。" },
    { w: 'A', s: 'issho', t: 'もう一回だけ。12月31日を、1年に。',
      k: "もう いっか'い だけ。じゅうにがつ さんじゅういちにちお、いちねんに。" },
    { w: 'A', s: 'issho', t: '今度の1年が、およそ280年。1日が、9か月くらい。',
      k: "こ'んどの いちねんが、およそ にひゃく はちじゅうねん。いちにちが、きゅうかげつ くらい。" },
    { w: 'A', s: 'issho', t: '人の一生を80年とすると、9月20日ごろから、大みそかまで。',
      k: "ひとの いっしょ'うお はちじゅうねんと すると、く'がつ はつかごろから、おおみ'そかまで。" },
    { w: 'B', s: 'issho', t: 'やっと、人の一生が見えた……。',
      k: "やっと、ひとの いっしょ'うが みえた…。" },
    { w: 'A', s: 'issho', t: '最初の宇宙カレンダーで言うと、人の一生は、0.2秒くらい。',
      k: "さいしょの うちゅう かれ'んだーで いうと、ひとの いっしょ'うわ、れいてん にびょう くらい。",
      b: { h: '人の一生（80年）', r: ['宇宙カレンダーで、約0.2秒', '12月31日を3回引き伸ばして、やっと見える'] } },
    { w: 'B', s: 'issho', st: 'whisper', t: '12月31日の、最後の1秒にも、ならないんだ……。',
      k: "じゅうにがつ さんじゅういちにちの、さ'いごの い'ちびょうにも、ならないんだ…。" },
    { w: 'A', s: 'mirai', t: 'ここまでが、これまでの138億年。',
      k: "ここまでが、これまでの ひゃくさんじゅうはちお'くねん。" },
    { w: 'B', s: 'mirai', t: 'じゃあ、12月31日の、その先は？',
      k: "じゃあ、じゅうにがつ さんじゅういちにちの、その さ'きわ？" },
    { w: 'A', s: 'mirai', t: 'その先は、ずっと長いの。',
      k: "その さ'きわ、ずっと なが'いの。" },
    { w: 'A', s: 'ichinichi', t: '今度は逆に、宇宙カレンダーの1年を、1日に縮めます。',
      k: "こ'んどわ ぎゃくに、うちゅう かれ'んだーの いちねんお、いちにちに ちぢめま'す。" },
    { w: 'A', s: 'ichinichi', t: '1月1日の1マスに、これまでの138億年が、まるごと入っているわ。',
      k: "いちがつ ついたちの ひとま'すに、これまでの ひゃくさんじゅうはちお'くねんが、まるごと はいって いるわ。" },
    { w: 'B', s: 'ichinichi', t: 'さっきのカレンダーが、あんなに小さく……。',
      k: "さっきの かれ'んだーが、あんなに ちい'さく…。" },
    { w: 'A', s: 'ichinichi', t: '10億年ほどで、太陽が明るくなって、地球の海は干上がりはじめると考えられている。',
      k: "じゅうお'くねん ほどで、た'いようが あかるく なって、ちきゅうの う'みわ ひあがりはじめると かんがえられて いる。" },
    { w: 'A', s: 'ichinichi', t: '50億年ほどで、太陽は大きくふくらむ。どちらも、1月2日のうちに起きること。',
      k: "ごじゅうお'くねん ほどで、た'いようわ おおきく ふくら'む。ど'ちらも、いちがつ ふつかの うちに おきる こと。",
      b: { h: '1日 ＝ 138億年', r: ['1月1日 これまでの138億年', '1月2日 海が干上がる・太陽がふくらむ'] } },
    { w: 'B', s: 'ichinichi', e: { B: 'surprise' }, t: '2日目で、地球に住めなくなっちゃうの……？',
      k: "ふつかめで、ちきゅうに すめなく なっちゃうの…？" },
    { w: 'A', s: 'ichinichi', t: '生き物にとってはね。でも、宇宙は、まだ始まったばかり。',
      k: "いきものに とってわね。で'も、う'ちゅうわ、ま'だ はじまった ばかり。" },
    { w: 'A', s: 'ichinichi', t: 'ふくらんだ太陽は、やがて外側を吹き飛ばして、小さな白色矮星になる。',
      k: "ふくらんだ た'いようわ、やがて そとがわお ふきとばして、ちい'さな はくしょく わいせいに なる。" },
    { w: 'A', s: 'ichinichi', t: '80億年ほど先。これも、まだ1月2日のうちよ。',
      k: "はちじゅうお'くねん ほど さき。これも、ま'だ いちがつ ふつかの うちよ。" },
    { w: 'A', s: 'ichinichi', t: '1月10日ごろには、宇宙がふくらみつづけるせいで、遠くの銀河が、ひとつ残らず見えなくなる。',
      k: "いちがつ とおかごろにわ、う'ちゅうが ふくらみつづける せいで、とおくの ぎ'んがが、ひとつ のこらず みえなく なる。" },
    { w: 'B', s: 'ichinichi', st: 'whisper', t: '宇宙で、ひとりぼっちになるんだ……。',
      k: "う'ちゅうで、ひとりぼっちに なるんだ…。" },
    { w: 'A', s: 'ichinichi', t: '3月の半ばまでには、天の川と近所の銀河が合体して、ひとつの大きな銀河になると考えられているわ。',
      k: "さ'んがつの なかばまでにわ、あまのがわと き'んじょの ぎ'んがが がったい して、ひとつの おおきな ぎ'んがに なると かんがえられて いるわ。",
      b: { h: '1日 ＝ 138億年（つづき）', r: ['1月2日 太陽が白色矮星に（約80億年後）', '1月10日ごろ 遠くの銀河が見えなくなる', '3月の半ばまでに 近所の銀河がひとつに'] } },
    { w: 'A', s: 'hoshi', t: 'もう一回、1年を1日に。今度の1日は、5兆年。',
      k: "もう いっか'い、いちねんお いちにちに。こ'んどの いちにちわ、ごちょ'うねん。" },
    { w: 'A', s: 'hoshi', t: '新しい星が生まれなくなり、残った星も燃えつきるのは、100兆年をすぎたころ。',
      k: "あたらしい ほしが うまれなく なり、のこった ほしも もえつき'るのわ、ひゃくちょ'うねんお すぎた ころ。" },
    { w: 'A', s: 'hoshi', t: 'このカレンダーで、1月の下旬。',
      k: "この かれ'んだーで、いちがつの げじゅん。",
      b: { h: '1日 ＝ 5兆年', r: ['1月の下旬 最後の星が燃えつきる', 'その先は、ずっと暗い'] } },
    { w: 'B', s: 'hoshi', t: 'そのあとは……？',
      k: "その あとわ…？" },
    { w: 'A', s: 'hoshi', p: 0.4, t: '夜空から、星がなくなるの。',
      k: "よ'ぞらから、ほしが なくなるの。" },
    { w: 'B', s: 'hoshi', st: 'whisper', p: 0.8, t: '……まっくらだ。',
      k: "まっくらだ…。" },
    { w: 'A', s: 'kurayami', t: 'でも、まだ終わりじゃない。',
      k: "で'も、ま'だ おわりじゃ ない。" },
    { w: 'A', s: 'kurayami', t: 'ここからは、1年を1日に縮めた回数で数えましょう。入れ子の回数ね。いまが、2回目。',
      k: "ここからわ、いちねんお いちにちに ちぢめた かいすうで かぞえましょ'う。いれこの かいすうね。い'まが、にかいめ。" },
    { w: 'A', s: 'kurayami', t: '入れ子4回目で、銀河がばらばらになる。10の19乗年から、20乗年ほど。',
      k: "いれこ よんかいめで、ぎ'んがが ばらばらに なる。じゅうの じゅうきゅう じょう ねんから、にじゅう じょう ねん ほど。" },
    { w: 'A', s: 'kurayami', t: '11回目で、原子がなくなる。',
      k: "じゅういっかいめで、げ'んしが なくなる。" },
    { w: 'A', s: 'kurayami', t: 'もし陽子が崩れるなら、だけど。崩れるかどうかは、まだ分かっていないの。',
      k: "も'し よ'うしが くずれ'るなら、だけど。くずれ'るか どうかわ、ま'だ わかって いないの。" },
    { w: 'A', s: 'kurayami', t: '23回目で、太陽ほどの重さのブラックホールなら、蒸発して消える。',
      k: "にじゅうさんかいめで、た'いよう ほどの おもさの ぶらっくほ'ーるなら、じょうはつ して きえる。" },
    { w: 'B', s: 'kurayami', e: { B: 'surprise' }, t: 'ブラックホールまで、消えちゃうの……？',
      k: "ぶらっくほ'ーるまで、きえちゃうの…？" },
    { w: 'A', s: 'kurayami', t: '考えられるかぎり最大のブラックホールでも、39回目までには消える。',
      k: "かんがえられる かぎり さいだいの ぶらっくほ'ーるでも、さんじゅうきゅうかいめまでにわ きえる。" },
    { w: 'A', s: 'kurayami', t: '10の100乗年を、とうに越えたころね。',
      k: "じゅうの ひゃくじょう ねんお、とうに こえた ころね。",
      b: { h: '入れ子の回数で数える', r: ['4回目 銀河がばらばらに', '11回目 原子がなくなる（陽子が崩れるなら）', '23回目〜39回目 ブラックホールが消える'] } },
    { w: 'B', s: 'kurayami', st: 'panic', t: 'ねえ、まだ続くの……？',
      k: "ねえ、ま'だ つづくの…？" },
    { w: 'A', s: 'netsushi', t: 'ここから先は、何も起きない。',
      k: "ここから さ'きわ、な'にも おきない。" },
    { w: 'A', s: 'netsushi', t: '宇宙は冷えきって、温度の差がなくなり、もう何も変わらない。熱的死とよばれる状態よ。',
      k: "う'ちゅうわ ひえきって、お'んどの さ'が なくなり、もう な'にも かわらない。ねつてきしと よばれる じょうたいよ。" },
    { w: 'A', s: 'netsushi', t: 'これは、いまの物理から考えた見通しで、確かめた人はいないけれどね。',
      k: "これわ、い'まの ぶ'つりから かんがえた みとおしで、たしかめた ひとわ いないけれどね。" },
    { w: 'B', s: 'netsushi', t: '何も起きないまま、時間だけが過ぎていくの……？',
      k: "な'にも おきない まま、じかん だけが すぎて いくの…？" },
    { w: 'A', s: 'netsushi', t: 'カレンダーを何回入れ子にしても、まっくらなまま。',
      k: "かれ'んだーお なんかい いれこに しても、まっくらな まま。" },
    { w: 'B', s: 'saiki', t: 'それって、永遠に？',
      k: "それって、えいえんに？" },
    { w: 'A', s: 'saiki', t: 'ある考え方では、とてつもなく長く待つと、偶然、もとどおりの形にもどることがある。',
      k: "ある かんがえ'かたでわ、とてつもなく なが'く まつと、ぐうぜん、もとどおりの かたちに もど'る ことが ある。" },
    { w: 'A', s: 'saiki', t: 'その待ち時間の見積もりは、10の、10の119乗乗年よりも長い。',
      k: "その まちじかんの みつもりわ、じゅうの、じゅうの ひゃくじゅうきゅう じょう じょう ねんよりも なが'い。",
      b: { h: 'もとにもどるまで（ある見積もり）', r: ['10の(10の119乗)乗 年より長い', '入れ子の回数でも、10の119乗回より多い'] } },
    { w: 'B', s: 'saiki', e: { B: 'surprise' }, t: '前回の、塔の数だ……！',
      k: "ぜ'んかいの、と'うの かずだ…！" },
    { w: 'A', s: 'saiki', t: 'そう。前回の3の塔で言うと、4段より大きくて、5段よりは小さい数ね。',
      k: "そう。ぜ'んかいの さんの と'うで いうと、よ'んだんより おおき'くて、ご'だんよりわ ちい'さい かずね。" },
    { w: 'A', s: 'saiki', t: '入れ子の回数だけで、10の119乗回より多い。宇宙の原子の数より、ずっと多いわ。',
      k: "いれこの かいすう だけで、じゅうの ひゃくじゅうきゅう じょう かいより おお'い。う'ちゅうの げ'んしの かずより、ずっと おお'いわ。" },
    { w: 'A', s: 'saiki', t: 'ここまで大きいと、秒で数えても、年で数えても、ほとんど同じ数になるの。',
      k: "ここまで おおき'いと、びょうで かぞえても、ねんで かぞえても、ほとんど おなじ かずに なるの。" },
    { w: 'B', s: 'mata', st: 'whisper', t: 'じゃあ、そのあとには……また、今日が来るの？',
      k: "じゃあ、その あとにわ… ま'た、きょ'うが くるの？" },
    { w: 'A', s: 'mata', t: 'かもしれない。でも、そこまで確かなことは、だれにも分からないわ。',
      k: "か'もしれない。で'も、そこまで たしかな ことわ、だれにも わからないわ。" },
    { w: 'B', s: 'mata', st: 'whisper', p: 0.4, t: '……時間って、こわいね。',
      k: "じかんって、こわ'いね。" },
    { w: 'A', s: 'mata', e: { A: 'smile' }, p: 0.6, t: 'だからこそ、いまの、この一瞬を、大事にしましょう。',
      k: "だからこそ、い'まの、この いっしゅんお、だいじに しましょ'う。" },
  ],
});
