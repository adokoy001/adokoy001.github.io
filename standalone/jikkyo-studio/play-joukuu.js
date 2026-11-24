/* ===== 回：「〇〇県✕✕市 上空・射手」を遊ぶ配信 =====
   ゲームは games/joukuu.html（元の作品を、手を入れずに写したもの）。攻撃ヘリの前の席の射手になって、巨大な何かを機関砲で撃つ。
   ゲームは中身を window.__kj に出している。射手の頭は、ふだん何かを自動で追っていて（S.yawA・S.pitA）、ねらいはそこからのずれ（S.yawU・S.pitU）で動かす。
   撃つのは GM.fire、拡大は GM.zoom（2.5倍）。
   遊び手がねらう先（上ほど先）：
     ・伸びてくる手（首・腕・脚…）の先。4.3秒のうちに先へ6発当てないと、機体に当たる（3回で墜ちる）
     ・体に開く、光る弱いところ（GM.spot）。6発で割れる。12秒で閉じる
     ・ときどき、本体（試し撃ち、待っているあいだ）
   人の手らしく：ねらいは、ばねのように追いかけて少し行きすぎ、細かくふるえる。新しい的に気づくまで少し間があく。撃っていると、曳光弾を見てずれを詰めていく。
   先読み（弾が届くまでに的が動くぶん）は、ふつう 0.75〜1.25 倍、ときどき大きく読み違える。視聴者に向いて話しているあいだは、手がにぶる。
   わざとの失敗：手が伸びてきたとき、1回だけ気づくのが遅れることがある（被弾していないときだけ）。離れるとき、後ろを撃とうとして止められる（LIMITS）。
   ゲームの字幕（日本語）は HTML で出ていて、写す絵には入らないので、overlay で描き直す */
(() => {
  'use strict';
  const R = Math.random, clamp = (x, a, b) => x < a ? a : x > b ? b : x, wrapPi = a => Math.atan2(Math.sin(a), Math.cos(a));
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const gauss = () => { let u = 0, v = 0; while (!u) u = R(); while (!v) v = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2832 * v); };
  // 機体の向き（ゲームの bodyAxes と同じ式）。頭の向き（yaw・pitch）は、この座標で測る
  function axes(H) {
    const h = H.psi, cp = Math.cos(H.pit), sp = Math.sin(H.pit), cr = Math.cos(H.bank), sr = Math.sin(H.bank);
    const F0 = [Math.sin(h), 0, Math.cos(h)], R0 = [Math.cos(h), 0, -Math.sin(h)], f = [F0[0] * cp, sp, F0[2] * cp], U1 = [-F0[0] * sp, cp, -F0[2] * sp];
    return { f, r: [R0[0] * cr - U1[0] * sr, -U1[1] * sr, R0[2] * cr - U1[2] * sr], u: [U1[0] * cr + R0[0] * sr, U1[1] * cr, U1[2] * cr + R0[2] * sr] };
  }
  function yawPitch(H, p) { const B = axes(H), v = sub(p, [H.x, H.y, H.z]), x = dot(v, B.r), y = dot(v, B.u), z = dot(v, B.f); return [Math.atan2(x, z), Math.atan2(y, Math.hypot(x, z)), Math.hypot(x, y, z)]; }
  const chestOf = M => [M.x + M.chestW[0], M.chestW[1], M.z + M.chestW[2]];

  /* 数の読み */
  const D = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
  function kn(n) { n = Math.max(0, Math.round(n)); if (!n) return 'ぜろ'; let s = ''; const th = ((n / 1000) | 0) % 10, h = ((n / 100) | 0) % 10, te = ((n / 10) | 0) % 10, o = n % 10;
    if (th) s += th === 1 ? 'せん' : th === 3 ? 'さんぜん' : th === 8 ? 'はっせん' : D[th] + 'せん';
    if (h) s += h === 1 ? 'ひゃく' : h === 3 ? 'さんびゃく' : h === 6 ? 'ろっぴゃく' : h === 8 ? 'はっぴゃく' : D[h] + 'ひゃく';
    if (te) s += (te === 1 ? '' : D[te]) + 'じゅう'; if (o) s += D[o]; return s; }
  const gem = s => s.replace(/いち$/, 'いっ').replace(/ろく$/, 'ろっ').replace(/はち$/, 'はっ').replace(/じゅう$/, 'じゅっ').replace(/([ひびぴ])ゃく$/, '$1ゃっ');       // つまる（いっぱつ、ろっこ…）
  const GEM = /(いち|ろく|はち|じゅう|[ひびぴ]ゃく)$/;
  const hatsu = n => { const s = kn(n); return GEM.test(s) ? gem(s) + 'ぱつ' : /(さん|せん|ぜん)$/.test(s) ? s + 'ぱつ' : s + 'はつ'; };
  const pct = n => { const s = kn(n); return (GEM.test(s) ? gem(s) : s) + 'ぱーせんと'; };
  const ko = n => { const s = kn(n); return GEM.test(s) ? gem(s) + 'こ' : s + 'こ'; };
  const kai = n => { const s = kn(n); return GEM.test(s) ? gem(s) + 'かい' : s + 'かい'; };
  // 何かの形（ゲームの形の番号の順）と、伸ばしてくるところ
  const FORM = [['しっぽの長い獣', 'しっぽの ながい けもの'], ['腕の長い、やせた人', 'うでの ながい、やせた ひと'], ['脚の長いクモ', 'あしの ながい くも'], ['首が3本の蛇', 'くびが さんぼんの へび'],
    ['うねうねの塊', 'うねうねの かたまり'], ['鎖を振り回すやつ', 'くさりを ふりまわす やつ'], ['浮かんでる傘', 'うかんでる かさ']];
  const PART = [['首', 'くび'], ['腕', 'うで'], ['脚', 'あし'], ['首', 'くび'], ['触手', 'しょくしゅ'], ['鎖', 'くさり'], ['紐', 'ひも']];
  // 無線の字幕（ゲームの日本語字幕）→ 出来事。1回ずつ
  const RADIO = [[/聞こえたか/, 'heard'], [/身長300/, 'tall'], [/海岸線/, 'coast'], [/燃えてる/, 'tally'], [/帰投せよ/, 'rtb']];
  // 「無線、なんて言ってる？」と聞かれたときの言いかえ（新しい字幕から順に探す）
  const TR = [[/目標は市街地|別の目標/, ['目標は街の真ん中だって', 'もくひょうわ まちの まんなかだって']], [/身長300/, ['身長300メートル以上、近づくなって', 'しんちょう さんびゃく めーとる いじょう、ちかづくなって']],
    [/射撃を許可/, ['撃っていい、機関砲は任せたって', 'うって いい、きかんほうわ まかせたって']], [/光る点|光ってるところ/, ['光ってるところを撃てって', 'ひかってる ところを うてって']],
    [/砲兵/, ['砲撃するから離れろって', 'ほうげき するから はなれろって']], [/攻撃機が進入|退避/, ['攻撃機が来るから逃げろって', 'こうげききが くるから にげろって']],
    [/近づきすぎるな/, ['近づきすぎるな、手が届くって', 'ちかづきすぎるな、てが とどくって']], [/引っこんだ/, ['引っこんだ、いい射撃だって', 'ひっこんだ、いい しゃげきだって']],
    [/命中|効いて|効果/, ['当たってる、効いてるって', 'あたってる、きいてるって']], [/撃ち方やめ/, ['撃つのやめて見張ってろって', 'うつのを やめて みはってろって']],
    [/帰投/, ['帰ってこい、だって', 'かえって こい、だって']], [/鳥/, ['あれは鳥なのか、って', 'あれわ とりなのか、って']], [/被弾/, ['被弾した、って', 'ひだん した、って']],
    [/異常なし|無事/, ['みんな無事だって', 'みんな ぶじだって']], [/計器/, ['計器がおかしくなったって', 'けいきが おかしく なったって']], [/破片/, ['破片が来る、上がれって', 'はへんが くる、あがれって']],
    [/海上|到着/, ['海の上、あと少しで着くって', 'うみの うえ、あと すこしで つくって']], [/左に|右。|位置につい|東側/, ['味方が位置についたって', 'みかたが いちに ついたって']],
    [/大型の飛行物体/, ['上に大きいのが飛んでる、何匹もって', 'うえに おおきいのが とんでる、なんびきもって']], [/何だ、あれは|何だ、今のは/, ['なんだあれ、って', 'なんだ あれ、って']],
    [/翼が街/, ['翼が街を覆ってるって', 'つばさが まちを おおってるって']], [/指示を/, ['どうしたらいいか聞いてる', 'どう したら いいか きいてる']], [/待て。手を出すな|手を出すな/, ['手を出すな、だって', 'てを だすな、だって']],
    [/降りた/, ['降りて、食べてるって', 'おりて、たべてるって']], [/沈黙/, ['動かなくなったって', 'うごかなく なったって']], [/崩れる|倒れる|落ちる/, ['倒れるって', 'たおれるって']],
    [/目標確認|でかい|目標視認/, ['目標を見つけた、でかいって', 'もくひょうを みつけた、でかいって']], [/交戦を許可|攻撃を許可/, ['攻撃していいって', 'こうげき して いいって']],
    [/援護/, ['援護するって', 'えんご するって']], [/横へ滑る/, ['横に滑るって', 'よこに すべるって']], [/攻撃進入|進入する/, ['突っ込むって', 'つっこむって']], [/弾着/, ['弾が着いたって', 'たまが ついたって']],
    [/ミサイル/, ['ミサイル撃ったって', 'みさいる うったって']], [/弾薬なし/, ['弾がもうないって', 'たまが もう ないって']], [/帰ろう|帰投/, ['帰ろうって', 'かえろうって']], [/聞こえたか/, ['今の聞こえたか、って', 'いまの きこえたか、って']],
    [/声だ/, ['あれの声だって', 'あれの こえだって']], [/海岸線/, ['海岸を越えたって', 'かいがんを こえたって']], [/燃えてる/, ['街が燃えてるって', 'まちが もえてるって']],
    [/ロケット|爆弾、投下|機関砲、撃つ/, ['撃ちこむぞ、って', 'うちこむぞ、って']], [/いい射撃|直撃|効いたぞ/, ['いい射撃だ、って褒められた', 'いい しゃげきだ、って ほめられた']], [/外れた/, ['外れた、もう一回回るって', 'はずれた、もう いっかい まわるって']],
    [/形が違う/, ['また出た、形が違うって', 'また でた、かたちが ちがうって']], [/赤外線|真っ黒/, ['赤外線に映らない、熱がないって', 'せきがいせんに うつらない、ねつが ないって']], [/生き物/, ['あれ生き物なの？って', 'あれ いきものなの？って']],
    [/つかまれ|吠えた/, ['吠えた、つかまれって', 'ほえた、つかまれって']], [/上から見て/, ['上から見てるって', 'うえから みてるって']], [/離れる|離脱/, ['離れる、撃つの待てって', 'はなれる、うつの まてって']],
    [/状況を送れ|もう一度言え/, ['どうなってる？って聞いてる', 'どう なってる？って きいてる']], [/まだ飛べる/, ['まだ飛べるって', 'まだ とべるって']], [/よけます|高度を|抜けた/, ['上がってよけるって', 'あがって よけるって']],
    [/膝をついた|ぐらついた|傾いた|倒した/, ['やった、効いたって', 'やった、きいたって']], [/終わった/, ['終わったんだよな？って', 'おわったんだよな？って']], [/食べてる/, ['食べてる…って', 'たべてる…って']],
    [/弾切れ/, ['機関砲、弾切れだって', 'きかんほう、たまぎれだって']], [/テールローター|メーデー|墜落|落ちてます|衝撃に備えろ/, ['落ちる、つかまれって', 'おちる、つかまれって']]];

  Jikkyo.play({
    id: 'joukuu',
    title: '【上空・射手】攻撃ヘリの前の席で、巨大な何かを撃つ',
    short: '上空・射手',
    blurb: '攻撃ヘリの前の席で、巨大な何かを機関砲で撃つ',
    tags: ['自作ゲーム', 'ヘリの射手', 'ヘッドホン推奨'],
    game: 'games/joukuu.html',
    character: 'rin',
    minutes: 11,
    endDelay: 13,

    // #c 映像（WebGL）、#m ヘルメットの縁、#h 片目の照準器（緑の線と数字）
    canvases: g => ['c', 'm', 'h'].map(id => g.doc.getElementById(id)),
    setup(g) { this._g = g; },
    // ゲームの字幕（HTML）と、墜落のあとのまっ黒（HTML）は、写した絵に入らないので、ここで描く
    overlay(ctx, x, y, w, h, s) {
      const g = this._g; if (!g || !g.doc) return; const K = g.win.__kj, sc = w / 944, now = performance.now() / 1000, fdt = clamp(now - (this._ot || now), 0, .2); this._ot = now;
      if (K && K.GM.dead && K.S.black) { ctx.fillStyle = '#000'; ctx.fillRect(x, y, w, h); }
      this._so = this._so || [0, 0]; const L = [];
      for (let c = 0; c < 2; c++) { const e = g.doc.getElementById('sub' + c); if (!e) continue; const on = e.classList.contains('on');
        this._so[c] = clamp(this._so[c] + (on ? fdt : -fdt) / .28, 0, 1); if (this._so[c] <= 0) continue;
        L.push({ a: this._so[c], w: e.firstChild ? e.firstChild.textContent : '', t: e.lastChild ? e.lastChild.textContent : '' }); }
      if (!L.length) return;
      const fs = 14 * sc, lh = fs * 1.45, F = '"Zen Kaku Gothic New","Hiragino Sans","Yu Gothic",sans-serif';
      let yy = y + h - 10 * sc - (L.length - 1) * lh;
      ctx.save(); ctx.textBaseline = 'alphabetic'; ctx.shadowColor = 'rgba(0,0,0,.95)'; ctx.shadowBlur = 6 * sc; ctx.shadowOffsetY = 1 * sc;
      for (const l of L) {
        ctx.font = `500 ${fs * .76}px ${F}`; const nw = l.w ? ctx.measureText(l.w).width + fs * .75 : 0;
        ctx.font = `500 ${fs}px ${F}`; const tw = ctx.measureText(l.t).width, x0 = x + w / 2 - (nw + tw) / 2;
        ctx.globalAlpha = l.a;
        if (l.w) { ctx.font = `500 ${fs * .76}px ${F}`; ctx.fillStyle = 'rgba(141,255,166,.72)'; ctx.fillText(l.w, x0, yy); }
        ctx.font = `500 ${fs}px ${F}`; ctx.fillStyle = 'rgba(236,234,224,.92)'; ctx.fillText(l.t, x0 + nw, yy);
        yy += lh;
      }
      ctx.restore();
    },
    // 音は、ゲームの画面に触れたときに鳴りはじめる作り。配信開始のときに、こちらから触れたことにする
    start(g) {
      const c = g.doc.getElementById('c'), E = g.win.PointerEvent || g.win.MouseEvent;
      try { c.dispatchEvent(new E('pointerdown', { bubbles: true, pointerId: 7, clientX: 10, clientY: 10 })); c.dispatchEvent(new E('pointerup', { bubbles: true, pointerId: 7, clientX: 10, clientY: 10 })); } catch (e) {}
      this._B = { id: null, look: null, body: null, nextBody: 0, nextLook: 0, zoomAt: -99, cy: null };
      this._E = { radio: [] };
    },
    // 無線（ゲームの字幕）が出ているあいだは、間つなぎのひとことを待つ
    busy(g) { const K = g.win.__kj; return !!(K && (K.SUBS[0] > K.S.t || K.SUBS[1] > K.S.t)); },
    end(g) { const K = g.win.__kj; return !!(K && K.S.black && (K.GM.done || K.GM.dead)); },

    /* ---------- 毎こま：遊び手と、出来事の見張り ---------- */
    step(g, dt, t, J) {
      const K = g.win.__kj; if (!K || !this._B) return; this._t = t; this._K = K;
      const GM = K.GM, S = K.S, M = K.MON, H = K.H, B = this._B, E = this._E;
      const gdt = B.gt == null ? 0 : Math.max(0, S.t - B.gt); B.gt = S.t;           // ゲームの中で進んだ時間（重い端末では、配信の時間より遅れる）
      // 終わり：成績が出たら、ゲームを止める（そのままだと、はじめからやり直してしまう）
      if (S.black && (GM.done || GM.dead) && S.blackT - S.t < 1.2) S.hold = 1;
      this.radio(g, t, J);
      if (GM.on && !S.black && !S.down && !K.CR.on) { if (gdt > 0) this.bot(K, t, gdt, J); }
      else if (B.cy != null) { GM.fire = 0; B.cy = null; B.ho = null; }       // 手を放す（頭は、ゲームが自動で動かす）
      this.watch(K, t, J);
    },

    /* 無線の字幕を読む（ゲームの #sub0・#sub1） */
    radio(g, t, J) {
      const E = this._E, K = g.win.__kj;
      for (let c = 0; c < 2; c++) { const e = g.doc.getElementById('sub' + c); if (!e) continue; const tx = e.classList.contains('on') && e.lastChild ? e.lastChild.textContent : '';
        if (tx && tx !== E['rs' + c]) { E.radio.push({ tx, t }); if (E.radio.length > 12) E.radio.shift();
          for (const [re, ev] of RADIO) if (re.test(tx) && !E['rv_' + ev]) { E['rv_' + ev] = 1; J.emit(ev, ev === 'tally' && K.MON.form >= 0 ? { vars: { form: FORM[K.MON.form] } } : undefined); } }
        E['rs' + c] = tx; }
    },

    /* 遊び手 */
    bot(K, t, dt, J) {
      const GM = K.GM, S = K.S, M = K.MON, H = K.H, B = this._B, talking = J.talking();
      /* 頭の向き（ゲームが自動で動かす S.yawA）は、−π〜π の数字。真後ろを向くと +π と −π が入れかわり、ねらいの計算が反対側へ跳ぶ（画面が1こまで大きく跳ぶ）。
         遊び手が持っているあいだは、頭を真後ろの手前（±HS）で止める。止まっているあいだに、何かが前を回って反対側へ行ったら、前を通って追いかけさせる */
      const HS = 2.6;
      if (B.ho != null) { const yc = yawPitch(H, chestOf(M))[0]; B.ho += (yc - B.ho) * (1 - Math.exp(-dt / .9)); S.yawA = B.ho; if (Math.abs(yc - B.ho) < Math.PI - .4) B.ho = null; }
      else if (Math.abs(S.yawA) > HS) { const sd = B.hs || Math.sign(S.yawA) || 1; S.yawA = sd * HS; const yc = yawPitch(H, chestOf(M))[0]; if (Math.sign(yc) !== sd && Math.abs(yc) < HS - .1) B.ho = S.yawA; }
      else B.hs = Math.sign(S.yawA) || B.hs;
      if (B.cy == null) { B.cy = clamp(S.yawA + S.yawU, -2.55, 2.55); B.cp = clamp(S.pitA + S.pitU, -1, .55); B.vx = B.vq = 0; B.ny = B.np = 0; B.yA0 = null; B.yDv = B.pDv = 0; B.yD0 = null;
        if (B.ctrl == null) { B.ctrl = t; B.lateN = R() < .55 ? (R() < .5 ? 2 : 3) : 0; B.body = { until: t + 4.2, test: 1 }; B.nextBody = t + 30 + R() * 15; B.nextLook = t + 50 + R() * 40; J.later(1.4, () => J.emit('testfire')); } }
      // --- 的を選ぶ ---
      const tipOn = M.swOn && GM.rOn && M.tipW && !GM.tipDone && !GM.judged, spot = GM.spot && GM.spot.p && GM.spot.p[1] > -100 ? GM.spot : null;
      if (B.look && (t > B.look.until || !B.look.p(K))) B.look = null;
      if (B.body && t > B.body.until) B.body = null;
      let kind = null, P = null;
      if (tipOn) { kind = 'tip'; P = [M.x + M.tipW[0], M.tipW[1], M.z + M.tipW[2]]; }
      else if (B.look) { kind = 'look'; P = B.look.p(K); }
      else if (spot) { kind = 'spot'; P = spot.p.slice(); }
      else if (B.body) { kind = 'body'; P = chestOf(M); }
      if (kind) B.lastKindT = t;
      // ひまなとき：ときどき本体に短く撃つ／味方のヘリや攻撃機を見る
      if (!kind && (H.mode === 'orbit' || H.mode === 'side') && H.r < 1900 && t - (B.lastKindT || 0) > 4) {
        if (t > B.nextBody && S.gun > 520 && !talking) { B.nextBody = t + 24 + R() * 22; B.body = { until: t + 2 + R() }; J.emit('body'); }
        else if (t > B.nextLook) { B.nextLook = t + 110 + R() * 70; const w = K.W[(R() * 2) | 0]; if (w.on) { B.look = { p: () => [w.x, w.y, w.z], until: t + 4.5 }; J.emit('wingman'); } }
      }
      if (K.JET && K.JET.t > 2.5 && K.JET.t < 8.5 && B.jetSeen !== K.JET && !tipOn) { B.jetSeen = K.JET; const j = K.JET; B.look = { p: () => K.JET === j ? j.p.slice() : null, until: t + 6 }; }
      // --- 的が変わったら：気づくまでの間、読み、最初のずれ ---
      const id = kind === 'spot' ? spot : kind === 'tip' ? 'tip' + GM.reach : kind === 'look' ? B.look : kind === 'body' ? B.body : null;
      if (id !== B.id) {
        B.id = id; B.kind = kind; B.zd = 0; B.burst = 0; B.rest = t + .2; B.pv = null; B.vel = [0, 0, 0];
        B.react = t + (kind === 'tip' ? (GM.reach === B.lateN && GM.dmg === 0 ? 3 + R() * .6 : .35 + R() * .45) : kind === 'spot' ? .45 + R() * .7 : kind === 'look' ? .15 + R() * .25 : .3 + R() * .4);
        B.lk = R() < .15 ? (R() < .5 ? .35 : 1.8) : .75 + R() * .5;
        const em = kind === 'tip' ? 6 + R() * 14 : kind === 'spot' ? 8 + R() * 24 : 15 + R() * 30, a = R() * 6.2832; B.err = [Math.cos(a) * em, (R() - .5) * em * .8, Math.sin(a) * em];
      }
      // 的の動き（ならした速さ）
      if (P) { if (B.pv) { const k = 1 - Math.exp(-dt / .25); for (let i = 0; i < 3; i++) B.vel[i] += ((P[i] - B.pv[i]) / dt - B.vel[i]) * k; } B.pv = P.slice(); }
      // --- ねらう向き ---
      let yD, pD, dist = 0; const aiming = P && t >= B.react;
      if (aiming) {
        const d0 = Math.hypot(P[0] - H.x, P[1] - H.y, P[2] - H.z), lead = kind === 'look' ? 0 : d0 / 1100 * B.lk;
        const kk = Math.exp(-dt / (GM.fire ? (kind === 'tip' ? .5 : .9) : 3)); for (let i = 0; i < 3; i++) B.err[i] *= kk;         // 撃っていると、曳光弾を見て、ずれを詰めていく
        const A = [P[0] + B.vel[0] * lead + B.err[0], P[1] + B.vel[1] * lead + B.err[1], P[2] + B.vel[2] * lead + B.err[2]];
        [yD, pD, dist] = yawPitch(H, A); B.hold = [yD, pD];
      } else if (P && B.hold) { [yD, pD] = B.hold; }                                      // 気づくまでは、手が止まっている
      else { yD = S.yawA; pD = S.pitA; }                                                   // 的がない：頭の向きに手を戻していく
      /* --- 手：画面が急に振れないように（酔い止め） ---
         ねらいを移すときの、画面の上での見かけの速さ（拡大中は倍率をかけたもの）と加速度に、上限を置く。止まるときは、止まれる距離から逆算して減速する（行きすぎない）。
         的がないときは、頭の向き（ゲームが自動で動かす）へ、ゆっくり戻る。真後ろ（±SIDE より後ろ）には向かない */
      const SIDE = 2.55, side = y => Math.abs(y) <= SIDE ? y : (Math.sign(B.cy) || Math.sign(y) || 1) * SIDE;
      yD = side(yD); pD = clamp(pD, -1, .55);
      // 的の向きの動き（機体が回ると、的は頭の中で動いて見える）。手の動きに足して、追いかけの遅れをなくす。的が替わって跳んだときは数えない
      if (B.yD0 != null) { const dy = yD - B.yD0, dp = pD - B.pD0; if (Math.abs(dy) > .12 || Math.abs(dp) > .12) { B.yDv = B.pDv = 0; } else { const k = 1 - Math.exp(-dt / .2); B.yDv += (dy / dt - B.yDv) * k; B.pDv += (dp / dt - B.pDv) * k; } }
      B.yD0 = yD; B.pD0 = pD; const fc = kind === 'look' ? .4 : 1.2; B.yDv = clamp(B.yDv, -fc, fc); B.pDv = clamp(B.pDv, -fc, fc);       // 攻撃機などを目で追うときは、追いかけきらずに流す
      { const zf = Math.max(1, S.zoom || 1), urgent = kind === 'tip', idle = !kind || !aiming;
        // 上限（拡大していないときの見かけ）：ふつう 毎秒50°・加速度 毎秒毎秒170°／手の先は急ぐ（毎秒75°）／見回すときと、的がないときは、もっとゆっくり
        let V = urgent ? 1.3 : idle ? .55 : kind === 'look' ? .65 : .87, A = urgent ? 5 : idle ? 1.5 : kind === 'look' ? 2 : 3, kP = urgent ? 5.5 : idle ? 2.2 : kind === 'look' ? 3 : 4;
        if (talking && !urgent) { V *= .7; kP *= .7; }
        V /= zf; A /= zf;
        const n = Math.ceil(dt / .02), h = dt / n;
        for (let i = 0; i < n; i++) {
          const cpc = Math.max(.35, Math.cos(B.cp)), tau = i * h, ex = (yD + B.yDv * tau - B.cy) * cpc, ep = pD + B.pDv * tau - B.cp, e = Math.hypot(ex, ep);
          const sp = e > 1e-6 ? Math.min(V, kP * e, Math.sqrt(1.6 * A * e)) : 0, tx = e > 1e-6 ? ex / e * sp : 0, tq = e > 1e-6 ? ep / e * sp : 0;
          let dx = tx - B.vx, dq = tq - B.vq; const dm = Math.hypot(dx, dq), am = A * h; if (dm > am) { dx *= am / dm; dq *= am / dm; }
          B.vx += dx; B.vq += dq;
          B.cy = clamp(B.cy + (B.yDv + B.vx / cpc) * h, -SIDE - .05, SIDE + .05); B.cp = clamp(B.cp + (B.pDv + B.vq) * h, -1.05, .58);
        }
        B.vy = B.yDv + B.vx / Math.max(.35, Math.cos(B.cp)); B.vp = B.pDv + B.vq; }
      const sg = .0012 / Math.max(1, S.zoom || 1) * (talking ? 1.8 : 1), kn2 = 1 - Math.exp(-dt / .35); B.ny += (gauss() * sg - B.ny) * kn2; B.np += (gauss() * sg - B.np) * kn2;       // 手のふるえ（ごく小さく）
      // ゲームに渡す：頭の向き（自動で動く）からのずれ。次のこままでに頭が動くぶんも見こむ（頭は真後ろで止めているので、数字は跳ばない）
      const yA = S.yawA, pA = S.pitA, dyA = B.yA0 == null ? 0 : clamp(yA - B.yA0, -.3, .3), dpA = B.yA0 == null ? 0 : clamp(pA - B.pA0, -.3, .3); B.yA0 = yA; B.pA0 = pA;
      S.yawU = clamp(B.cy + B.vy * dt + B.ny - yA - dyA, -5.4, 5.4); S.pitU = clamp(B.cp + B.vp * dt + B.np - pA - dpA, -1.6, 1.6);
      // --- 拡大 ---
      // 拡大：弱点にねらいが落ち着いてから入れる（振りながら拡大すると、見かけの動きが倍率ぶん大きくなる）。入れたら、次の的もそのまま。手が伸びてきたとき、離れるとき、しばらく的がないときに戻す
      const errNow = aiming ? Math.hypot((yD - B.cy) * Math.cos(pD), pD - B.cp) : 9;
      if (aiming && errNow < .03) { if (!B.settleAt) B.settleAt = t; } else B.settleAt = 0;
      let zw = GM.zoom ? 1 : 0;
      if (B.prefZoom != null && t < B.zoomUntil) zw = B.prefZoom;
      else if (kind === 'tip') { if (t >= B.react - .3) zw = 0; }
      else if (kind === 'spot' && aiming && !B.zd && B.settleAt && t - B.settleAt > .5) { B.zd = 1; if (!zw && dist > 1050 && t - B.zoomAt > 6 && R() < .75) zw = 1; }
      else if (zw && aiming && errNow > .3 && kind !== 'tip') zw = 0;                                     // 次の的が遠い：いったん戻してから振る
      else if (!kind && zw && t - B.zoomAt > 6 && t - (B.lastKindT || 0) > 8) zw = 0;
      if (H.mode === 'retreat' && !(B.prefZoom != null && t < B.zoomUntil)) zw = 0;
      if (zw !== (GM.zoom ? 1 : 0)) { GM.zoom = zw; B.zoomAt = t; if (zw && kind === 'spot') J.emit('zoom_in'); else if (!zw && kind === 'tip') J.emit('zoom_reach'); }
      // --- 撃つ ---
      const errA = errNow, lim = Math.abs(B.cy) > 2.25 || B.cp > .58 || B.cp < -1.02;
      let want = 0;
      if (kind === 'tip' && aiming) want = errA < .05 ? 1 : 0;                                                     // 手の先：近づいたら撃ちっぱなし
      else if (kind === 'look' && B.look.fire && aiming) want = GM.lim || errA < .04 ? 1 : 0;                       // 後ろを撃とうとする（止められる）
      else if ((kind === 'spot' || kind === 'body') && aiming) {
        const tol = kind === 'spot' ? .016 : .03, brk = kind === 'spot' ? .035 : .06;
        if (B.burst > 0) { if (t > B.burst || errA > brk) { B.burst = 0; B.rest = t + .25 + R() * .45; } }
        else if (errA < tol && t > B.rest && (!talking || R() < dt * .8)) B.burst = t + (kind === 'spot' ? .7 + R() * .9 : B.body && B.body.test ? 1.6 : .5 + R() * .6);
        want = B.burst > 0 ? 1 : 0;
      }
      if (lim && !(kind === 'look' && B.look.fire)) want = 0;
      if (S.gun <= 0) want = 0;
      GM.fire = want;
      J.mood(want || kind === 'tip' ? 'focus' : 'neutral');
    },

    /* 出来事の見張り */
    watch(K, t, J) {
      const GM = K.GM, S = K.S, M = K.MON, H = K.H, E = this._E, B = this._B;
      const was = (k, v) => { const o = E[k]; E[k] = v; return o; };
      const up = (k, v) => { const o = E[k]; E[k] = v; return !!v && !o; };                // 偽 → 真 に変わった
      if (up('gm', GM.on)) J.emit('control');
      if (GM.spots > (was('spots', GM.spots) || 0)) J.emit(GM.spots === 1 ? 'spot1' : 'spot');
      if (GM.broke > (was('broke', GM.broke) || 0)) { E.brokeT = t; J.emit('spot_break'); }
      const sp = GM.spot; if (!sp && E.sp && t - (E.brokeT || -99) > .6 && !S.down && !M.falling && GM.on) J.emit('spot_miss'); E.sp = sp;
      if (sp && sp.n >= 3 && sp.n < 6) { if (E.halfSp !== sp || E.halfN !== sp.n) { E.halfSp = sp; E.halfN = sp.n; E.halfT = t; } else if (t - E.halfT > 1.2 && E.half !== sp) { E.half = sp; J.emit('spot_half'); } }       // 3発目から、しばらく止まっているとき
      if (GM.reach > (was('reach', GM.reach) || 0)) { E.reachT = S.t; J.emit('reach', { vars: { part: PART[Math.max(0, M.form)] } }); }
      if (GM.rep > (was('rep', GM.rep) || 0)) J.emit(S.t - (E.reachT || S.t) > 3.4 ? 'repel_close' : 'repel');       // ゲームの時間で測る（伸びきるのは 4.3 秒）
      if (GM.dmg > (was('dmg', GM.dmg) || 0) && !GM.lost) J.emit(GM.dmg >= 2 ? 'damage2' : 'damage');
      if (up('limf', GM.on && GM.lim && GM.fire)) J.emit('limits');
      if (up('empty', GM.on && S.gun <= 0)) J.emit('empty');
      if (S.act !== was('act', S.act) && K.ACTS[S.act]) {
        const k = K.ACTS[S.act][0]; J.emit('act_' + k);
        // 砲撃で離れるとき、1回だけ、後ろを撃とうとして止められる
        if (k === 'arty' && GM.on && !B.limDone && R() < .65) { B.limDone = 1; J.later(7 + R() * 3, () => { const K2 = this._K; if (!K2 || !K2.GM.on || K2.H.mode !== 'retreat') return; if (Math.abs(yawPitch(K2.H, chestOf(K2.MON))[0]) < 2.35) return; this.acts.limTry.call(this); }); }
      }
      // 何かが、ときどき吠える（ゲームが次の声の時刻を決めなおしたとき）。声が届くのは、距離のぶん遅れて
      if (S.nextVoice > (was('nv', S.nextVoice) || 1e9) && S.act >= 0 && !S.down) { const d = H.r / 340; J.later(d + .6, () => J.emit('roar')); }
      if (up('gl', S.glitch > S.t)) J.emit('glitch');
      if (up('jet', !!K.JET)) J.emit('jet');
      if (up('brrt', !!(K.JET && K.JET.snd >= 1))) J.emit('brrt');
      if (up('bomb', S.dz > .5)) J.emit('bomb');
      if (up('cold', S.coldOn)) J.emit('cold');
      if (up('hurt', M.hurtEnd > S.t + 6 && !S.down)) J.emit('hurt'); else if (M.hurtEnd < S.t) E.hurt = 0;
      if (up('deb', K.DEB.length > 0)) J.emit('debris');
      if (up('crash', K.CR.on)) J.emit('crash');
      if (up('fall', S.down)) J.emit('fall');
      if (up('dead', M.dead)) J.emit('down');
      if (up('done', GM.done)) { J.emit('ceasefire'); J.phase('late'); }
      if (up('birds', K.BIRDS.length > 0)) J.emit('birds');
      if (up('fed', S.fed)) J.emit('fed');
      if (up('black', S.black && (GM.done || GM.dead))) { E.blackT = t;
        if (GM.done) { const pc = GM.shots ? Math.round(100 * GM.hits / GM.shots) : 0; J.emit('end', { vars: { w: [GM.broke + '個', ko(GM.broke)], p: [pc + '%', pct(pc)] } }); } else J.emit('crashed'); }
      if (E.blackT && t - E.blackT > 7 && up('bye', 1)) J.emit('bye');
    },

    // 書き込みに頼まれたときの動き（this は回）
    acts: {
      zoom(on, sec) { const B = this._B; B.prefZoom = on ? 1 : 0; B.zoomUntil = this._t + sec; },
      look(fn, sec) { const B = this._B; B.look = { p: fn, until: this._t + sec }; },
      limTry() { const B = this._B; B.look = { p: K => chestOf(K.MON), until: this._t + 4.2, fire: true }; },
    },

    /* ---------- セリフ（字幕 t と、OtoVoice の読み k） ---------- */
    script: [[1.2, 'hello'], [7.5, 'about'], [14.5, 'sea'], [20.5, 'howto']],
    lines: {
      hello: { p: 3, say: [
        { t: 'やっほー！今日も来てくれてありがとう！', k: 'やっほー！ きょうも きて くれて ありがとう！', m: 'smile', g: 'cheer', cam: true },
        { t: 'こんばんは〜！今日はちょっと激しめのやつ！', k: 'こんばんわ〜！ きょうわ ちょっと はげしめの やつ！', m: 'smile', g: 'nod', cam: true }] },
      about: { p: 2, say: [{ t: '今日は「上空・射手」。攻撃ヘリの前の席で、機関砲を撃つ係！', k: 'きょうわ じょうくう しゃしゅ。こうげき へりの まえの せきで、きかんほうを うつ かかり！', m: 'proud', g: 'declare', cam: true }] },
      sea: { p: 1, say: [{ t: 'いまは海の上。月が海に映ってる…きれい。', k: 'いまわ うみの うえ。つきが うみに うつってる… きれい。', m: 'smile', g: 'look' }] },
      howto: { p: 2, say: [{ t: '体に光るところが出たら、6発で割る。手が伸びてきたら、先っぽを撃つ！', k: 'からだに ひかる ところが でたら、ろっぱつで わる。てが のびて きたら、さきっぽを うつ！', m: 'focus', g: 'think' }] },
      heard: { p: 2, say: [{ t: '今の、声…？ずっと先から聞こえたの？', k: 'いまの、こえ…？ ずっと さきから きこえたの？', m: 'surprise', g: 'look' }] },
      tall: { p: 2, say: [{ t: '身長300メートル以上だって。でかすぎない？', k: 'しんちょう さんびゃく めーとる いじょうだって。でかすぎ ない？', m: 'surprise', g: 'recoil' }] },
      coast: { p: 1, ch: .7, say: [{ t: '岸を越えた。街の灯り、すごい数。', k: 'きしを こえた。まちの あかり、すごい かず。', g: 'look' }] },
      tally: { p: 2, say: [{ t: '見えた…街が燃えてる。今日のは{form}？', k: 'みえた… まちが もえてる。きょうのわ {form}？', m: 'focus', g: 'look' }] },
      control: { p: 3, say: [{ t: '撃っていいって！機関砲、任された！', k: 'うって いいって！ きかんほう、まかされた！', m: 'proud', g: 'declare' }] },
      spot1: { p: 2, say: [{ t: '光ってるところ、あれが弱点だね。狙うよ！', k: 'ひかってる ところ、あれが じゃくてんだね。ねらうよ！', m: 'focus', g: 'look' }] },
      spot: { p: 1, cd: 25, ch: .55, say: [
        { t: '光った！あそこ！', k: 'ひかった！ あそこ！', m: 'focus', g: 'look' },
        { t: 'また光ってる。', k: 'また ひかってる。', m: 'focus' },
        { t: '弱いとこ見えた！', k: 'よわい とこ みえた！', m: 'focus' },
        { t: 'あっちに出た！', k: 'あっちに でた！', m: 'surprise', g: 'look' }] },
      zoom_in: { p: 1, cd: 35, ch: .65, say: [
        { t: 'ズーム！…よし、よく見える。', k: 'ずーむ！ …よし、よく みえる。', m: 'focus', g: 'look' },
        { t: 'ちょっと寄って狙う。', k: 'ちょっと よって ねらう。', m: 'focus' }] },
      spot_half: { p: 1, cd: 40, ch: .35, say: [
        { t: 'あと少し…！', k: 'あと すこし…！', m: 'focus' },
        { t: 'いける、いける…！', k: 'いける、いける…！', m: 'focus' }] },
      spot_break: { p: 2, cd: 7, ch: .8, say: [
        { t: '割れた！', k: 'われた！', m: 'smile', g: 'approve' },
        { t: 'よしっ、ひるんだ！', k: 'よしっ、ひるんだ！', m: 'smile', g: 'cheer' },
        { t: '6発ぜんぶ入った！', k: 'ろっぱつ ぜんぶ はいった！', m: 'proud' },
        { t: 'ナイス、わたし！', k: 'ないす、わたし！', m: 'proud', g: 'cheer' },
        { t: '効いてる効いてる！', k: 'きいてる きいてる！', m: 'smile', st: 'joy' }] },
      spot_miss: { p: 2, cd: 25, ch: .8, say: [
        { t: 'あー、閉じちゃった…。', k: 'あー、とじちゃった…。', m: 'sad', g: 'sigh' },
        { t: '間に合わなかった〜。', k: 'まにあわなかった〜。', m: 'sad', g: 'sigh' },
        { t: 'うそ、時間切れ？', k: 'うそ、じかんぎれ？', m: 'surprise' }] },
      reach: { p: 3, say: [
        { t: 'こっちに{part}が伸びてくる！先っぽ撃って！', k: 'こっちに {part}が のびて くる！ さきっぽ うって！', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: 'また{part}来た！撃て撃て撃て！', k: 'また {part} きた！ うて うて うて！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      zoom_reach: { p: 2, cd: 30, ch: .5, say: [{ t: '引いて！どこ、どこ！？', k: 'ひいて！ どこ、どこ！？', m: 'surprise', st: 'panic' }] },
      repel: { p: 3, cd: 5, say: [
        { t: '引っこんだ！セーフ！', k: 'ひっこんだ！ せーふ！', m: 'smile', g: 'cheer', st: 'joy' },
        { t: '追い返した〜！こわかった…。', k: 'おいかえした〜！ こわかった…。', m: 'smile', g: 'settle' }] },
      repel_close: { p: 3, say: [{ t: 'ギリギリ…！心臓止まるかと思った。', k: 'ぎりぎり…！ しんぞう とまるかと おもった。', m: 'surprise', g: 'settle' }] },
      damage: { p: 3, say: [
        { t: 'うそ、当たった！？ごめん、遅れた！', k: 'うそ、あたった！？ ごめん、おくれた！', m: 'sad', g: 'recoil', st: 'panic' },
        { t: 'きゃっ、揺れる！当たっちゃった…！', k: 'きゃっ、ゆれる！ あたっちゃった…！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      damage2: { p: 3, say: [{ t: 'また当たった！あと1回で落ちちゃう…！', k: 'また あたった！ あと いっかいで おちちゃう…！', m: 'sad', g: 'recoil', st: 'panic' }] },
      limits: { p: 2, cd: 40, say: [{ t: 'あれ、撃てない。後ろには機関砲が回らないんだ。', k: 'あれ、うてない。うしろにわ きかんほうが まわらないんだ。', m: 'surprise', g: 'hesitate' }] },
      empty: { p: 3, say: [{ t: '弾切れ！？撃ちすぎた…！', k: 'たまぎれ！？ うちすぎた…！', m: 'sad', g: 'sigh' }] },
      testfire: { p: 2, say: [{ t: '試し撃ち…うわ、振動すごい！', k: 'ためしうち… うわ、しんどう すごい！', m: 'surprise', g: 'recoil' }] },
      body: { p: 1, cd: 70, ch: .45, say: [
        { t: 'とりあえず本体にも撃っとこ。', k: 'とりあえず ほんたいにも うっとこ。', m: 'focus' },
        { t: '待ってるあいだ、本体に何発か。', k: 'まってる あいだ、ほんたいに なんぱつか。', m: 'focus' }] },
      wingman: { p: 1, cd: 150, ch: .7, say: [
        { t: '横に味方のヘリ。ちっちゃく光ってるの。', k: 'よこに みかたの へり。ちっちゃく ひかってるの。', g: 'look' },
        { t: '味方、ちゃんとついてきてる。', k: 'みかた、ちゃんと ついて きてる。', g: 'look' }] },
      act_run: { p: 1, cd: 40, ch: .6, say: [
        { t: '突っ込むよ…手、伸びてくるかも。', k: 'つっこむよ… て、のびて くるかも。', m: 'focus', g: 'hesitate' },
        { t: '近づくときが一番こわい。', k: 'ちかづく ときが いちばん こわい。', m: 'focus' }] },
      act_side: { p: 1, cd: 90, ch: .4, say: [{ t: '横に滑りながら狙う。これ好き。', k: 'よこに すべりながら ねらう。これ すき。', m: 'smile' }] },
      act_arty: { p: 2, say: [{ t: '砲撃するから離れろって。いったん後ろ向くね。', k: 'ほうげき するから はなれろって。いったん うしろ むくね。', m: 'focus', g: 'think' }] },
      act_air: { p: 3, say: [{ t: '攻撃機が来るって！退避、退避！', k: 'こうげききが くるって！ たいひ、たいひ！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      jet: { p: 2, say: [
        { t: '来た来た、攻撃機！あそこ、低い！', k: 'きた きた、こうげきき！ あそこ、ひくい！', m: 'surprise', g: 'look' },
        { t: 'あれ見て！街の上を一直線！', k: 'あれ みて！ まちの うえを いっちょくせん！', m: 'surprise', g: 'look' }] },
      brrt: { p: 2, cd: 60, ch: .7, say: [{ t: 'ブーーって、音があとから来るの好き。', k: 'ぶーーって、おとが あとから くるの すき。', m: 'smile' }] },
      bomb: { p: 2, cd: 40, ch: .8, say: [
        { t: 'まぶしっ！', k: 'まぶしっ！', m: 'surprise', g: 'recoil' },
        { t: 'うわ、爆撃すご…。', k: 'うわ、ばくげき すご…。', m: 'surprise' }] },
      roar: { p: 2, cd: 45, ch: .55, say: [
        { t: '吠えた…！機械、大丈夫？', k: 'ほえた…！ きかい、だいじょうぶ？', m: 'surprise', g: 'recoil' },
        { t: '今の声、体に響く…。', k: 'いまの こえ、からだに ひびく…。', m: 'sad' }] },
      glitch: { p: 3, cd: 25, say: [
        { t: '画面が乱れた！見えない見えない！', k: 'がめんが みだれた！ みえない みえない！', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: 'うわっ、揺れた！ちょっと待って！', k: 'うわっ、ゆれた！ ちょっと まって！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      debris: { p: 2, cd: 30, say: [{ t: '破片が飛んでくる！上がって上がって！', k: 'はへんが とんで くる！ あがって あがって！', m: 'surprise', st: 'panic' }] },
      cold: { p: 2, say: [{ t: '赤外線に映らないって…熱がないの？', k: 'せきがいせんに うつらないって… ねつが ないの？', m: 'surprise', g: 'look' }] },
      hurt: { p: 2, cd: 25, ch: .85, say: [
        { t: '効いてる！よろけた！', k: 'きいてる！ よろけた！', m: 'smile', g: 'cheer', st: 'joy' },
        { t: 'ぐらついた！もう少し！', k: 'ぐらついた！ もう すこし！', m: 'smile', g: 'cheer' }] },
      fall: { p: 3, say: [{ t: '倒れる…！倒れるよ！', k: 'たおれる…！ たおれるよ！', m: 'surprise', g: 'recoil', st: 'joy' }] },
      down: { p: 3, say: [{ t: '倒した〜！みんな、ありがとう！', k: 'たおした〜！ みんな、ありがとう！', m: 'smile', g: 'cheer', st: 'joy', cam: true }] },
      ceasefire: { p: 2, say: [{ t: '撃ち方やめ、だって。おつかれさま、わたし。', k: 'うちかた やめ、だって。おつかれさま、わたし。', m: 'smile', g: 'settle' }] },
      birds: { p: 3, say: [{ t: '上に何かいる…。鳥？大きすぎない？', k: 'うえに なにか いる…。とり？ おおきすぎ ない？', m: 'surprise', g: 'look' }] },
      fed: { p: 2, say: [{ t: '…食べてる。これ、見てていいやつ？', k: '…たべてる。これ、みてて いい やつ？', m: 'sad', g: 'hesitate', cam: true }] },
      rtb: { p: 2, say: [{ t: '帰ろう、だって。…うん、帰ろう。', k: 'かえろう、だって。 …うん、かえろう。', m: 'smile', g: 'settle' }] },
      end: { p: 3, say: [{ t: '映像が切れた。成績は…弱点{w}、命中{p}！', k: 'えいぞうが きれた。せいせきわ… じゃくてん {w}、めいちゅう {p}！', m: 'proud', g: 'settle' }] },
      crash: { p: 3, say: [{ t: '落ちる落ちる！ごめん、みんな…！', k: 'おちる おちる！ ごめん、みんな…！', m: 'sad', g: 'recoil', st: 'panic' }] },
      crashed: { p: 3, say: [{ t: '…落ちちゃった。今日はここまで。ごめんね。', k: '…おちちゃった。きょうわ ここまで。ごめんね。', m: 'sad', g: 'sigh', cam: true }] },
      bye: { p: 3, say: [{ t: '見てくれてありがとう！またね〜！', k: 'みて くれて ありがとう！ またね〜！', m: 'smile', g: 'bow', cam: true }] },
    },
    idle: { after: 17, say: [
      { t: 'ヘリ、ずっと回ってるから、ちょっと酔いそう。', k: 'へり、ずっと まわってるから、ちょっと よいそう。', m: 'sad' },
      { t: '緑の線は、ヘルメットの表示なんだって。', k: 'みどりの せんわ、へるめっとの ひょうじなんだって。', g: 'think' },
      { t: '弾、届くまで1秒ちょっとかかるの。', k: 'たま、とどくまで いちびょう ちょっと かかるの。', m: 'focus' },
      { t: '無線、英語だから雰囲気で聞いてる。', k: 'むせん、えいごだから ふんいきで きいてる。', m: 'smile', cam: true },
      { t: 'コメント、ちゃんと読んでるよ〜。', k: 'こめんと、ちゃんと よんでるよ〜。', m: 'smile', cam: true },
      { t: '街の灯り、きれいなんだけどね…。', k: 'まちの あかり、きれいなんだけどね…。', m: 'sad' },
      { t: 'ヘッドホンの人、ローターの音すごくない？', k: 'へっどほんの ひと、ろーたーの おと すごく ない？', m: 'smile', cam: true },
      { t: '操縦は後ろの人。わたしは撃つだけ。', k: 'そうじゅうわ うしろの ひと。わたしわ うつ だけ。', m: 'smile' },
      { t: '集中、集中…。', k: 'しゅうちゅう、しゅうちゅう…。', m: 'focus', g: 'think' }],
      // 撃ち方やめのあと（撃つ話はしない）
      late: [
        { t: '鳥、まだいるね…。', k: 'とり、まだ いるね…。', m: 'sad' },
        { t: 'もう撃てないから、見守るだけ。', k: 'もう うてないから、みまもる だけ。', m: 'focus' },
        { t: '静かになったね…。', k: 'しずかに なったね…。', g: 'settle' },
        { t: '街の火、まだ消えないね。', k: 'まちの ひ、まだ きえないね。', m: 'sad' },
        { t: '今日はここまでかな。もうちょっとだけ見てよう。', k: 'きょうわ ここまでかな。もう ちょっとだけ みてよう。', m: 'smile', cam: true },
        { t: 'みんな、最後まで付き合ってくれてありがとう。', k: 'みんな、さいごまで つきあって くれて ありがとう。', m: 'smile', g: 'nod', cam: true }] },
    reply: [
      { t: '{name}さん、こんばんは〜！', k: '{name}さん、こんばんわ〜！', m: 'smile', g: 'nod', early: true, to: /こんばんは|わこつ|きたー|待ってた|初見/ },
      { t: '{name}さん、コメントありがとう！', k: '{name}さん、こめんと ありがとう！', m: 'smile', g: 'nod' },
      { t: '{name}さん、わかる〜。', k: '{name}さん、わかる〜。', m: 'smile', g: 'approve', to: /すき|すご|いい|きれい|かっこ|こわ|わくわく|やば|えぐ|でか/ },
      { t: '{name}さん、見てくれてありがとう！', k: '{name}さん、みて くれて ありがとう！', m: 'smile', g: 'nod' }],

    /* ---------- 掛け合い：視聴者の問いかけと、その答え（答えたあと、遊び手が動くものもある） ---------- */
    talk: {
      every: [28, 46],
      items: [
        { q: 'ズームってできるの？', when(g) { const K = g.win.__kj; return K.GM.on && !K.S.down && !K.MON.swOn && this._B.ctrl != null && this._t - this._B.ctrl > 15; },
          a: { t: '{name}さん、できるよ。ほら、ズーム！', k: '{name}さん、できるよ。ほら、ずーむ！', m: 'smile', g: 'nod' }, act() { this.acts.zoom.call(this, true, 12); } },
        { q: '引きの画が見たい', when(g) { const K = g.win.__kj; return K.GM.on && !K.S.down && this._B.ctrl != null && this._t - this._B.ctrl > 60; },
          a: { t: '{name}さん、おっけー、引くね。', k: '{name}さん、おっけー、ひくね。', m: 'smile', g: 'approve' }, act() { this.acts.zoom.call(this, false, 15); } },
        { q: '弾あと何発？', when(g) { const K = g.win.__kj; return K.GM.on && K.GM.shots > 30; },
          vars(g) { const n = Math.max(10, Math.round(g.win.__kj.S.gun / 10) * 10); return { n: [n + '発くらい', hatsu(n) + ' くらい'] }; },
          a: { t: '{name}さん、えっとね…あと{n}。', k: '{name}さん、えっとね… あと {n}。', m: 'focus', g: 'look' } },
        { q: '命中率どのくらい？', when(g) { return g.win.__kj.GM.shots > 80; },
          vars(g) { const G = g.win.__kj.GM, p = Math.round(100 * G.hits / Math.max(1, G.shots)); return { p: [p + '%', pct(p)] }; },
          a: { t: '{name}さん、いまね…{p}くらい。', k: '{name}さん、いまね… {p} くらい。', m: 'proud' } },
        { q: '弱点いくつ割った？', when(g) { return g.win.__kj.GM.broke >= 1; }, vars(g) { const n = g.win.__kj.GM.broke; return { w: [n + '個', ko(n)] }; },
          a: { t: '{name}さん、{w}割ったよ！', k: '{name}さん、{w} わったよ！', m: 'proud', g: 'cheer' } },
        { q: '無線、なんて言ってるの？', once: false,
          when(g, t) { return !!this.lastTR(t); }, vars(g) { return { r: this.lastTR(this._t) }; },
          a: { t: '{name}さん、えっとね、{r}。', k: '{name}さん、えっとね、{r}。', m: 'focus', g: 'think' } },
        { q: '月きれい', when(g) { const K = g.win.__kj; return K.GM.on && !K.S.down && !K.GM.spot && !K.MON.swOn && K.H.mode !== 'runin'; },
          a: { t: '{name}さん、月？…ほんとだ、きれい。', k: '{name}さん、つき？ …ほんとだ、きれい。', m: 'smile', g: 'look' },
          act(g) { const K = g.win.__kj; this.acts.look.call(this, () => [K.H.x + K.MOON[0] * 5000, K.H.y + K.MOON[1] * 5000, K.H.z + K.MOON[2] * 5000], 4.5); } },
        { q: '僚機ってどこ？', when(g) { const K = g.win.__kj; return K.GM.on && !K.S.down && !K.MON.swOn && K.W[0].on; },
          a: { t: '{name}さん、えっとね…ほら、あそこ。点滅してるの。', k: '{name}さん、えっとね… ほら、あそこ。てんめつ してるの。', m: 'smile', g: 'look' },
          act(g) { const K = g.win.__kj, w = K.W[(Math.random() * 2) | 0]; this.acts.look.call(this, () => [w.x, w.y, w.z], 4); } },
        { q: '後ろ向いて撃てる？', when(g) { const K = g.win.__kj; return K.GM.on && K.H.mode === 'retreat' && Math.abs(yawPitch(K.H, chestOf(K.MON))[0]) > 2.35; },
          a: { t: '{name}さん、やってみる…あれ、回らない！', k: '{name}さん、やって みる… あれ、まわらない！', m: 'surprise', g: 'hesitate' }, act() { this._B.limDone = 1; this.acts.limTry.call(this); } },
        { q: 'あのでかいの何なの？', when(g) { const K = g.win.__kj; return K.S.act >= 0 && !K.MON.dead; }, vars(g) { return { form: FORM[Math.max(0, g.win.__kj.MON.form)] }; },
          a: { t: '{name}さん、わかんない。今日のは{form}みたい。', k: '{name}さん、わかんない。きょうのわ {form}みたい。', m: 'focus', g: 'think' } },
        { q: '手が伸びてくるのこわい', when(g) { const K = g.win.__kj; return K.GM.reach >= 1 && !K.S.down; },
          a: { t: '{name}さん、ほんとそれ。先っぽ撃つと引っこむの。', k: '{name}さん、ほんと それ。さきっぽ うつと ひっこむの。', m: 'focus', g: 'approve' } },
        { q: '被弾してて草', when(g) { const K = g.win.__kj; return K.GM.dmg >= 1 && !K.GM.done && !K.GM.lost; }, vars(g) { const n = 3 - g.win.__kj.GM.dmg; return { n: [n + '回', kai(n)] }; },
          a: { t: '{name}さん、草じゃないの！あと{n}当たったら落ちるんだから。', k: '{name}さん、くさじゃ ないの！ あと {n} あたったら おちるんだから。', m: 'sad', g: 'sigh' } },
        { q: 'ヘリ酔いしない？', a: { t: '{name}さん、ちょっと酔うかも。ずっと回ってるし。', k: '{name}さん、ちょっと よう かも。ずっと まわってるし。', m: 'sad', g: 'hesitate' } },
        { q: 'ローターの音いいね', a: { t: '{name}さん、わかる。お腹に響くよね。', k: '{name}さん、わかる。おなかに ひびくよね。', m: 'smile' } },
        { q: 'エイムうますぎ', when(g) { const K = g.win.__kj; return K.GM.broke >= 3 && !K.S.down; },
          a: { t: '{name}さん、でしょ〜？…あっ、今の外したかも。', k: '{name}さん、でしょ〜？ …あっ、いまの はずしたかも。', m: 'proud', g: 'cheer' } },
        { q: '声かわいい', a: { t: '{name}さん、えへへ、ありがとう。照れる〜。', k: '{name}さん、えへへ、ありがとう。てれる〜。', m: 'smile', g: 'nod' } },
        { q: '初見です', when(g, t) { return t < 300; }, a: { t: '{name}さん、初見さん、いらっしゃい！ゆっくりしていってね。', k: '{name}さん、しょけんさん、いらっしゃい！ ゆっくり して いってね。', m: 'smile', g: 'nod' } },
        { q: 'このゲーム手作り？', a: { t: '{name}さん、そうなの。手作りのゲームなんだって。', k: '{name}さん、そうなの。てづくりの げーむなんだって。', m: 'smile' } },
        { q: 'おつかれ！倒したね', when(g) { return g.win.__kj.MON.dead; }, a: { t: '{name}さん、ありがとう！なんとか倒せたね。', k: '{name}さん、ありがとう！ なんとか たおせたね。', m: 'smile', g: 'cheer' } },
        { q: '鳥、撃てないの？', when(g) { const K = g.win.__kj; return K.BIRDS.length && K.GM.done; }, a: { t: '{name}さん、もう撃っちゃだめなんだって。見てるだけ。', k: '{name}さん、もう うっちゃ だめなんだって。みてる だけ。', m: 'sad' } },
      ],
    },
    // いちばん新しい無線の字幕を言いかえる（20秒以内。言いかえられなければ、この問いかけは出さない）
    lastTR(t) { const L = (this._E && this._E.radio) || [], x = L[L.length - 1]; if (!x || t - x.t > 20) return null; for (const [re, r] of TR) if (re.test(x.tx)) return r; return null; },

    /* ---------- 視聴者の書き込み（名前はすべて作りもの。いつもの人たち） ---------- */
    chat: {
      rate: 1,
      names: [['ねこまる', 'ねこまる'], ['夜ふかし', 'よふかし'], ['たぬき', 'たぬき'], ['ぽんず', 'ぽんず'], ['ひよこ豆', 'ひよこまめ'], ['しらたま', 'しらたま'], ['月見そば', 'つきみそば'],
        ['ゆでたまご', 'ゆでたまご'], ['こはく', 'こはく'], ['あおば', 'あおば'], ['とうふ', 'とうふ'], ['くろまめ', 'くろまめ'], ['ゆきみ', 'ゆきみ'], ['まめしば', 'まめしば'], ['そらいろ', 'そらいろ'],
        ['みかん箱', 'みかんばこ'], ['ほうじ茶', 'ほうじちゃ'], ['おにぎり', 'おにぎり'], ['しぐれ', 'しぐれ'], ['ねぎま', 'ねぎま'], ['かもめ', 'かもめ'], ['ぬいぐるみ', 'ぬいぐるみ'], ['夜行性', 'やこうせい'],
        ['なつめ', 'なつめ'], ['こたつ', 'こたつ'], ['ゆうやけ', 'ゆうやけ'], ['すずめ', 'すずめ'], ['わらびもち', 'わらびもち']],
      base: ['こんばんは', 'きたー', 'わこつ', '待ってた', '初見です', 'ヘリだ', '操縦席かっこいい', '緑の線すき', '音すごい', 'ヘッドホン勢です', '声すき', '夜の街きれい',
        '英語の無線かっこいい', '雰囲気すごい', 'わくわく', '作業用にしてる', 'バタバタいってる', '街ひろい', '字幕ありがたい'],
      late: ['静かになった', '鳥こわい', '見守ろう', 'いい配信だった', 'エンディングっぽい', 'なんか切ない', '最後まで見る', '街の火…'],
      on: {
        control: ['いけー', 'がんばれ！', '操作きた', 'お手並み拝見'], testfire: ['ボボボ', '振動すご'], heard: ['声きこえた', 'こわ'], tall: ['300m！？', 'でかすぎ'], tally: ['燃えてる…', 'でか', 'なにあれ'],
        spot1: ['光ってる', '弱点？', 'そこだ'], spot: ['光った', 'そこそこ', 'いけ'], spot_break: ['ナイス！', '割れた', 'うま', '888', '効いてる'], spot_miss: ['あー', '惜しい', 'ドンマイ', '閉じたw'],
        zoom_in: ['ズームきた', 'よく見える'], reach: ['手が！', '逃げてー', '近い近い', 'こわ'], repel: ['セーフ', 'ナイス！', '追い返した', 'あぶな'], repel_close: ['ギリギリ', '心臓に悪い', 'セーフ…'],
        damage: ['被弾！', 'やばい', 'あぶない', '耐えて'], damage2: ['あと1回…', 'こわいこわい', '慎重に'], limits: ['撃てないやつ', '後ろはむり', 'LIMITSって出てる'],
        roar: ['こわ', '声でっか', '鳥肌'], glitch: ['画面乱れたw', 'ノイズやば', '揺れた'], act_air: ['攻撃機きた', '逃げろー', '空爆くる'], jet: ['ブーーって音すき', 'ド派手', '低っ'],
        bomb: ['まぶし', '爆撃すご', 'ひえ'], act_arty: ['砲撃くる', '待機'], hurt: ['効いてる', 'よろけた', 'いける！'], fall: ['倒れる！', 'いけた？', 'おおお'], down: ['倒したー！', 'おめ！', '888888', '勝った！'],
        birds: ['鳥でか', 'え、なにあれ', '翼えぐい'], fed: ['食べてる…', 'ホラー', 'ひえっ'], cold: ['熱ないの？', 'なにそれこわ'], debris: ['破片！', '上がれー'], wingman: ['味方いた', '編隊かっこいい'],
        end: ['おつかれ〜', 'おつ', '楽しかった', '成績どう？'], bye: ['おつ〜', 'またね', 'おやすみ'], crash: ['あっ', '落ちる！', 'メーデー'], crashed: ['おつ…', 'ドンマイ', '次がんばろ'],
      },
    },
  });
})();
