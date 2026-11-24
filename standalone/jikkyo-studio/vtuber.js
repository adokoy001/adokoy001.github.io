/* ===== VTuber：翠卓のキャラクターを、透明な地の上に、腰から上で描く =====
   suitaku-chara.js（翠卓のキャラクター描画と名簿）と chara-common.js を先に読みこむ。1人ぶんの顔と衣装（chara-<id>.js）は、使うときに読む。
   動き（まばたき・呼吸・髪の揺れ・しぐさ）は、翠卓の描画のものをそのまま使う。ここで足すのは、カメラ、口の動き（声の大きさから）、目線、表情の指定 */
const VTuber = (() => {
  'use strict';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const IDS = ['mio', 'aoi', 'rin', 'tsumugi', 'rei', 'hibiki', 'yuzu', 'vesper'];
  // 声の見立て（OtoVoice の声の名前と速さ）。耳では確かめていない
  const VOICE = { mio: ['yasashii', 1.05], aoi: ['otona', 1.0], rin: ['musume', 1.12], tsumugi: ['yasashii', 1.0], rei: ['otona', .96], hibiki: ['musume', 1.08], yuzu: ['shoujo', 1.1], vesper: ['otona', .94] };
  const roster = () => window.MahjongRoster || [];
  const person = id => roster().find(p => p.id === id) || { id, name: id };

  /* ---------- 読みこみ ---------- */
  const loading = {};
  function loadPart(id, base) {
    if (window.VTChara && window.VTChara.parts[id]) return Promise.resolve();
    if (!loading[id]) loading[id] = new Promise((ok, ng) => { const s = document.createElement('script'); s.src = (base || '') + 'chara-' + id + '.js'; s.onload = ok; s.onerror = () => ng(new Error('chara-' + id + '.js を読めません')); document.head.append(s); });
    return loading[id];
  }
  // 読みこんだ部分をまとめて、翠卓の描画が読む形（window.MahjongCharacterAssets）にする
  function mergeAssets() {
    const V = window.VTChara, c = V.common;
    const A = Object.assign({}, c, { heads: {}, outfits: Object.assign({}, c.outfits), accessories: {}, expressions: {} });
    for (const p of Object.values(V.parts)) { Object.assign(A.heads, p.heads); Object.assign(A.outfits, p.outfits); Object.assign(A.accessories, p.accessories); Object.assign(A.expressions, p.expressions); }
    /* 口を開けた顔：翠卓の表情は、目・眉・口の絵の差しかえでできている。開いた口の絵は「驚き」にしかないので、
       どの表情にも、口だけ「驚き」の絵にした版（名前の後ろに _o）を足す。しゃべっているあいだ、声の大きさで、閉じた口と開いた口を切りかえる */
    for (const id in A.expressions) {
      const ex = A.expressions[id], mouth = (A.heads[id] || []).find(m => m.expressionPart === 'mouth');
      if (!mouth || !ex.surprise) continue;
      const mi = String(mouth.material), open = (ex.surprise.materialTextureOverrides || {})[mi];
      if (open == null) continue;
      for (const m of Object.keys(ex)) if (!m.endsWith('_o')) ex[m + '_o'] = { materialTextureOverrides: Object.assign({}, ex[m].materialTextureOverrides, { [mi]: open }) };
    }
    window.MahjongCharacterAssets = A;
    return A;
  }

  /* ---------- 行列（列優先。翠卓の描画と同じ並び） ---------- */
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], norm = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  function persp(fovy, asp, n, f) { const t = 1 / Math.tan(fovy / 2); return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) / (n - f), -1, 0, 0, 2 * f * n / (n - f), 0]; }
  function lookAt(e, c) { const z = norm(sub(e, c)), x = norm(cross([0, 1, 0], z)), y = cross(z, x); return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, e), -dot(y, e), -dot(z, e), 1]; }
  function mul(a, b) { const o = new Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s; } return new Float32Array(o); }

  /* ---------- 舞台 ----------
     翠卓では、見る人は卓の向こう（2番の席）に座っている人の前に立っている。キャラクターは (0, −5.92, −8.55) にいて、こちら（+z）を向いている。
     カメラは、その前に置く。少し右へ回りこむと、キャラクターが画面の左（ゲームの側）へ体を向けているように見える */
  let Stage = null;
  function defineStage() {
    if (Stage) return Stage;
    Stage = class extends window.MahjongTable3D {
      constructor(canvas) {
        super(canvas);
        this._characterMode = 'off'; this.ctl = { talk: 0, mood: 'neutral', yaw: 0, pitch: 0 }; this._last = 0;
        /* カメラ：頭から、腰がぎりぎり映らないところまで。8人で背の高さと胴の長さがちがうので、その人の頭の付け根と胴の長さから決める。
           top 頭の付け根から枠の上の端まで／waist 頭の付け根から腰まで（胴の長さ 1 のとき）／under 腰より上で枠を切る量／zoom 大きさ（上の端はそのまま）／tilt 見下ろす量 */
        this.cam = { angle: .3, fov: .42, zoom: 1, top: 1.85, waist: 3.17, under: .06, tilt: .55 };
      }
      characterMotion(seat, id, now, preview) {
        const p = super.characterMotion(seat, id, now, preview), c = this.ctl;
        p.yaw = clamp(p.yaw + c.yaw, -.73, .73); p.pitch = clamp(p.pitch + c.pitch, -.37, .19);
        const mood = c.mood || p.mood, open = c.talk > .28;
        p.mood = open ? mood + '_o' : mood; p.talk = c.talk * 1.3;
        return p;
      }
      // 頭の付け根の高さ（世界の座標）。体つきで変わる
      headY() { const id = this._characterPreview && this._characterPreview.id, A = this.characterAssets || window.MahjongCharacterAssets;
        if (this._hy && this._hy[0] === id) return this._hy[1];
        let y = 2.76; try { y = -5.92 + 8 * this.characterBodyPoint(A.headAnchor || [.00045, 1.085, .00592], id)[1]; this._torso = this.characterBodyProfile(id).torso || 1; } catch (e) {}
        this._hy = [id, y]; return y; }
      gesture(g, expr, ms) { if (this._characterPreview) this._characterPreview.greeting = { start: this.sceneNow(), duration: ms || 1400, kind: 'vt', gesture: g, expression: expr || 'neutral' }; }
      render(nowMs) {
        if (!this.supported) return; const gl = this.gl, cv = this.canvas;
        const dt = this._last ? Math.min(.1, Math.max(0, (nowMs - this._last) / 1000)) : 0; this._last = nowMs; this.sceneTime += dt * 1000;
        const C = this.cam, cx = 0, cz = -8.55, a = C.angle, head = this.headY(), torso = this._torso || 1, top = head + C.top, span = (C.top + C.waist * torso - C.under) / (C.zoom || 1), mid = top - span / 2, dist = (span / 2) / Math.tan(C.fov / 2);
        const eye = [cx + Math.sin(a) * dist, mid + C.tilt, cz + Math.cos(a) * dist], at = [cx + Math.sin(a) * .35, mid, cz];
        this.eye = eye; this.vp = mul(persp(C.fov, cv.width / cv.height, .1, 220), lookAt(eye, at));
        gl.viewport(0, 0, cv.width, cv.height); gl.depthMask(true); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); gl.enable(gl.DEPTH_TEST);
        this.drawCharacters(this.sceneNow());
      }
    };
    return Stage;
  }

  /* 作る：canvas（腰から上が入る縦長のもの）と、最初のキャラクター */
  async function create(canvas, id, o) {
    o = o || {};
    await loadPart(id, o.base);
    mergeAssets();
    const S = defineStage(), st = new S(canvas);
    if (!st.supported) throw new Error('WebGL が使えません');
    st.previewCharacter(id, null); st._characterPreview.greeting = null;
    await st.charactersReady;
    const api = {
      stage: st, get id() { return st._characterPreview && st._characterPreview.id; }, person: () => person(api.id), voice: () => VOICE[api.id] || ['onna', 1],
      async setCharacter(nid) {
        await loadPart(nid, o.base); mergeAssets();
        // 前に作った網・絵・シェーダーを捨ててから、作り直す
        const gl = st.gl; for (const m of st.characterMeshes || []) { gl.deleteBuffer(m.vb); if (m.ib) gl.deleteBuffer(m.ib); if (m.armBuffer) gl.deleteBuffer(m.armBuffer); }
        for (const t of st.characterTextures || []) gl.deleteTexture(t); if (st.characterProgram) gl.deleteProgram(st.characterProgram);
        st.initCharacters(); st.previewCharacter(nid, null); st._characterPreview.greeting = null; await st.charactersReady; },
      set(c) { Object.assign(st.ctl, c); }, gesture: (g, e, ms) => st.gesture(g, e, ms), render: now => st.render(now), cam: st.cam,
    };
    return api;
  }
  return { IDS, VOICE, create, person, loadPart };
})();
