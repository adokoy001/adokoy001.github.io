/* ===== 回：「〇〇県✕✕市 上空 左旋回・射手」を遊ぶ配信 =====
   ゲームは games/hidari.html（元の作品を、手を入れずに写したもの）。ゲームは中身を window.__kj に出しているので、
   自動の遊び手は、それを読んで、ねらいを動かし（GM.jump）、撃つ（GM.fire）。出来事も、そこを見張って知る */
// 「○体」の読み（0〜99）。1・8・10 は つまる（いったい、はったい、じゅったい）
const kanaTai = n => { n = Math.max(0, Math.min(99, n | 0)); if (!n) return 'ぜろたい'; const D = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'], t = (n / 10) | 0, o = n % 10;
  let s = t ? (t === 1 ? '' : D[t]) + (o ? 'じゅう' : 'じゅっ') : ''; if (o) s += o === 1 ? 'いっ' : o === 8 ? 'はっ' : D[o]; return s + 'たい'; };
Jikkyo.play({
  id: 'hidari',
  title: '【左旋回・射手】夜の街の上から、落ちてくる小さいのを止める',
  short: '左旋回・射手',
  blurb: '赤外線カメラで夜の街を見下ろし、落ちてくる小さいのを止める',
  minutes: 11,
  tags: ['自作ゲーム', '赤外線カメラ', 'ヘッドホン推奨'],
  game: 'games/hidari.html',
  character: 'hibiki',
  endDelay: 13,

  canvases: g => [g.doc.getElementById('c'), g.doc.getElementById('h')],
  // ゲームでは、走査線と四すみの暗がりを、CSS で重ねている（#crt）。写した絵には入らないので、ここで描く
  overlay(ctx, x, y, w, h, s) {
    if (!this._scan || this._scanS !== s) { const c = document.createElement('canvas'); c.width = 4; c.height = Math.max(2, Math.round(2 * s)); const q = c.getContext('2d'); q.fillStyle = 'rgba(0,0,0,.26)'; q.fillRect(0, 0, 4, Math.max(1, Math.round(s))); this._scan = ctx.createPattern(c, 'repeat'); this._scanS = s; }
    ctx.save(); ctx.translate(x, y); ctx.fillStyle = this._scan; ctx.fillRect(0, 0, w, h); ctx.restore();
    const g = ctx.createRadialGradient(x + w / 2, y + h / 2, Math.min(w, h) * .35, x + w / 2, y + h / 2, Math.hypot(w, h) * .55); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.34)'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  },
  setup(g) { const K = g.win.__kj; if (K) K.lite = false; },
  // 音は、ゲームの画面に触れたときに鳴りはじめる作り。配信開始のときに、こちらから触れたことにする
  start(g) {
    const c = g.doc.getElementById('c'), E = g.win.PointerEvent || g.win.MouseEvent;
    try { c.dispatchEvent(new E('pointerdown', { bubbles: true, pointerId: 7, clientX: 10, clientY: 10 })); c.dispatchEvent(new E('pointerup', { bubbles: true, pointerId: 7, clientX: 10, clientY: 10 })); } catch (e) {}
    this._B = { tgt: null, react: 0, lk: 1, ex: 0, ez: 0, idleAt: 0, checks: [] }; this._E = { kills: [] };
  },

  /* ---------- 自動の遊び手と、出来事の見張り ----------
     人らしく遊ぶ：ねらいを移すたびに少し間があく。読みはときどき大きくずれる（外す）。視聴者に向いて話しているあいだは、手が止まりがち。
     視野（ズーム）は、探すときは広く、追うときは中くらい、ゆっくりの相手を丁寧にねらうときは狭く。砲は、相手の速さで選び、ときどき、ほかの砲も試す。
     書き込みに頼まれると、ズームや砲の切りかえ、白黒の反転もやってみせる（talk の act） */
  step(g, dt, t, J) {
    const K = g.win.__kj; if (!K) return; this._t = t;
    const GM = K.GM, S = K.S, M = K.MON, SEN = K.SEN, GS = K.GS, B = this._B, E = this._E;
    const alive = K.CR.filter(c => c.st === 'run' || c.st === 'mill' || c.st === 'home');
    const V = { g105: 310, g40: 880, g25: 1500 }, R = Math.random;
    const setFov = (f, ev) => { if (SEN.fov === f) return; SEN.fov = f; SEN.def = 1; B.fovAt = t; if (ev) J.emit(ev); };
    const talking = J.talking();
    if (GM.on && !S.black) {
      if (E.ctrlT == null) E.ctrlT = t;
      if (B.tgt && (B.tgt.st === 'dead' || K.CR.indexOf(B.tgt) < 0)) { B.tgt = null; B.react = t + 0.35 + R() * 0.7; }
      if (!B.tgt && t > B.react && alive.length) {
        let best = null, bs = -1e9;
        for (const c of alive) { const dm = Math.hypot(c.p[0] - M.x, c.p[2] - M.z); if (dm < M.br * .7) continue; const da = Math.hypot(c.p[0] - SEN.tg[0], c.p[2] - SEN.tg[2]); const sc = dm / 1100 * 2 - da / 700; if (sc > bs) { bs = sc; best = c; } }
        if (best) {
          B.tgt = best; B.burst = 0; B.rest = t + 0.25;
          // 読み：ふつうは 0.85〜1.15 倍。ときどき（15%）、大きく読み違える
          B.lk = R() < .15 ? (R() < .5 ? 0.45 : 1.6) : 0.85 + R() * 0.3; B.ex = (R() - .5) * 16; B.ez = (R() - .5) * 16;
          B.sloppy = R() < .06 ? t + 2.5 : 0;                                                         // たまに、撃てないときに撃とうとしてしまう
        }
      }
      const fGun = B.prefGun && t < B.prefUntil ? B.prefGun : null, fFov = B.prefFov != null && t < B.fovUntil ? B.prefFov : null;
      if (B.prefGun && t >= B.prefUntil) B.prefGun = null;
      if (B.tgt) {
        B.idleSince = 0;
        const c = B.tgt, v = K.crVel(c), spd = Math.hypot(v[0], v[1]);
        let want = fGun || (spd > 7 ? 'g25' : 'g40'); if (GS.amm[want] <= 0) want = want === 'g25' ? 'g40' : 'g25'; if (GS.amm[want] <= 0) want = 'g105';
        if (GM.gun !== want) { GM.fire = 0; GM.gun = want; B.burst = 0; B.rest = t + 0.35; if (!fGun && want !== 'g105' && t - (B.gunSaid || -99) > 40 && R() < .5) { B.gunSaid = t; J.emit('gun_' + want); } }
        // 視野
        if (fFov != null) setFov(fFov);
        else if (t - (B.fovAt || -99) > 9) { if (spd < 5 && GM.gun !== 'g25' && SEN.fov !== 2 && R() < .5) setFov(2, 'zoom_in'); else if (SEN.fov !== 1) setFov(1, SEN.fov === 2 ? 'zoom_back' : null); }
        const sl = Math.hypot(GS.x - SEN.tg[0], GS.y - SEN.tg[1], GS.z - SEN.tg[2]), tof = sl / V[GM.gun];
        B.ex *= Math.exp(-dt * .6); B.ez *= Math.exp(-dt * .6);                                     // 撃っているうちに、ずれを詰めていく
        const lx = c.p[0] + v[0] * tof * B.lk + B.ex, lz = c.p[2] + v[1] * tof * B.lk + B.ez;
        // 話しているあいだは、ねらいの追いかけが遅れる
        if (!talking || t > (B.aimAt || 0)) { GM.jump = [lx, lz]; B.aimAt = t + .5; }
        const err = Math.hypot(SEN.tg[0] - lx, SEN.tg[2] - lz), ok = GM.ok !== false || t < B.sloppy;
        const can = ok && GS.amm[GM.gun] > 0 && err < (GM.gun === 'g25' ? 16 : GM.gun === 'g105' ? 22 : 10);
        // 短く区切って撃つ（25mm は 0.6〜1.4 秒）。105mm は1発ずつ（装填に6秒）。話しているあいだは、新しく撃ちはじめない
        if (B.burst > 0) { if (t > B.burst || !can) { B.burst = 0; B.rest = t + (GM.gun === 'g105' ? 6.3 : 0.4 + R() * 0.5); if (GM.kills === B.k0) B.checks.push({ at: t + tof + 1.3, k: GM.kills }); } }
        else if (can && t > B.rest && !(talking && R() < .7)) { B.burst = t + (GM.gun === 'g25' ? 0.6 + R() * 0.8 : GM.gun === 'g105' ? 0.25 : 1.2 + R() * 1.6); B.k0 = GM.kills; }
        GM.fire = B.burst > 0 ? 1 : 0;
      } else {
        GM.fire = 0; if (!B.idleSince) B.idleSince = t;
        if (fFov != null) setFov(fFov); else if (t - B.idleSince > 3 && t - (B.fovAt || -99) > 6) setFov(0, 'zoom_out');
        if (t > B.idleAt) { B.idleAt = t + 3 + R() * 3; const a = R() * 6.28, r = 120 + R() * 380; GM.jump = [M.x + Math.sin(a) * r, M.z + Math.cos(a) * r]; }   // ひまなときは、あたりを見回す
      }
      // 外れたかどうか：撃ちおわってから、弾が届くころに、止めた数が増えていなければ「外れた」
      for (let i = B.checks.length - 1; i >= 0; i--) if (t >= B.checks[i].at) { if (GM.kills === B.checks[i].k) J.emit('miss'); B.checks.splice(i, 1); }
      // 自分から、ほかの砲も試してみる
      if (!B.tried105 && t - E.ctrlT > 55 && B.tgt && GM.ok && !fGun) { B.tried105 = 1; B.prefGun = 'g105'; B.prefUntil = t + 40; J.emit('try105'); }
      if (!B.tried40 && t - E.ctrlT > 150 && B.tgt && !fGun) { B.tried40 = 1; B.prefGun = 'g40'; B.prefUntil = t + 25; J.emit('try40'); }
      // 105mm：撃ったら、届くまでの長さをしゃべり、届いたら反応する
      if (GM.sh.g105 > (E.sh105 || 0)) { E.sh105 = GM.sh.g105; J.emit('fire105'); if (B.prefGun === 'g105') B.prefUntil = Math.min(B.prefUntil, t + 7.5);       // 1発撃てたら、もう1発撃てるくらいで、ふだんの砲へ戻す
        B.land = t + Math.hypot(GS.x - SEN.tg[0], GS.y - SEN.tg[1], GS.z - SEN.tg[2]) / V.g105; }
      if (B.land && t > B.land) { B.land = 0; J.emit('land105'); }
    } else if (GM) GM.fire = 0;

    // 出来事
    const was = (k, v) => { const o = E[k]; E[k] = v; return o; };
    if (GM.on && !was('gm', 1)) J.emit('control');
    const n = alive.length, pn = was('alive', n); if (pn != null && n > pn && GM.on) J.emit('drop');
    if (GM.kills > (was('k', GM.kills) || 0)) { J.emit('kill'); E.kills.push(t); E.kills = E.kills.filter(x => t - x < 12); if (E.kills.length >= 3) { J.emit('kill3'); E.kills = []; } }
    if (GM.leak > (was('leak', GM.leak) || 0)) J.emit('leak');
    if (GM.cf > (was('cf', GM.cf) || 0)) J.emit('checkfire');
    if (GS.hit > (was('hit', GS.hit) || 0) && GM.on) J.emit('bodyhit');
    if (S.act !== was('act', S.act) && K.ACTS[S.act]) J.emit('act_' + K.ACTS[S.act][0]);
    if (M.roarEnd !== was('roar', M.roarEnd) && M.roarEnd > S.t + 2 && S.act >= 0) J.emit('roar');
    const gl = S.glitch > S.t; if (gl && !was('gl', gl)) J.emit('glitch'); else E.gl = gl;
    const jet = !!K.JET; if (jet && !was('jet', jet)) J.emit('jet'); else E.jet = jet;
    if (S.coldOn && !was('cold', 1)) J.emit('cold');
    if (M.hurtEnd > S.t + 6 && !was('hurt', 1)) J.emit('hurt'); else if (M.hurtEnd < S.t) E.hurt = 0;
    if (M.swOn && !was('reach', 1)) J.emit('reach'); else if (!M.swOn) E.reach = 0;
    if (K.DEB.length && !was('deb', 1)) J.emit('debris'); else if (!K.DEB.length) E.deb = 0;
    if (S.down && !was('down0', 1)) J.emit('fall');
    if (M.dead && !was('dead', 1)) J.emit('down');
    if (GM.done && !was('done', 1)) { J.emit('ceasefire'); J.phase('late'); SEN.polU = 0; }
    if (K.BIRDS.length && !was('birds', 1)) J.emit('birds');
    if (S.fed && !was('fed', 1)) J.emit('fed');
    if (S.black && !was('black', 1)) { J.emit('end'); E.blackT = t; }
    if (E.blackT && t - E.blackT > 7 && !was('bye', 1)) J.emit('bye');
    J.mood(GM.on && GM.fire ? 'focus' : 'neutral');
  },
  // 書き込みに頼まれたときの動き
  acts: {
    zoomIn(g) { const B = this._B; B.prefFov = 2; B.fovUntil = this._t + 14; },
    zoomOut(g) { const B = this._B; B.prefFov = 0; B.fovUntil = this._t + 12; },
    gun(g, name, sec) { const B = this._B; B.prefGun = name; B.prefUntil = this._t + (name === 'g105' ? 40 : sec); if (name === 'g105') B.tried105 = 1; if (name === 'g40') B.tried40 = 1; },       // 105mm は、撃てるまで（40秒まで）ねばる
    invert(g, J) { const K = g.win.__kj; if (!K) return; K.SEN.polU = 1; J.later(9, () => { K.SEN.polU = 0; J.emit('invert_back'); }); },
  },
  end(g) { const K = g.win.__kj; return !!(K && K.S.black); },

  /* ---------- セリフ（字幕 t と、OtoVoice の読み k） ---------- */
  script: [[1.2, 'hello'], [9, 'about'], [19, 'howto'], [31, 'ingress'], [47, 'ingress2']],
  lines: {
    hello: { p: 3, say: [{ t: 'こんばんは〜！今日もゆるっと遊んでいきます。', k: 'こんばんわ〜！ きょうも ゆるっと あそんで いきます。', m: 'smile', g: 'nod', cam: true }] },
    about: { p: 2, say: [{ t: '今日のゲームは「左旋回・射手」。夜の街を、上から赤外線で見るやつ。', k: 'きょうの げーむわ、ひだりせんかい しゃしゅ。よるの まちを、うえから せきがいせんで みる やつ。', m: 'smile', cam: true }] },
    howto: { p: 2, say: [{ t: '大きいのは味方が相手するから、わたしは落ちてくる小さいのを止める係。', k: 'おおきいのわ みかたが あいて するから、わたしわ おちて くる ちいさいのを とめる かかり。', m: 'focus', g: 'think' }] },
    ingress: { p: 1, say: [{ t: 'まだ海の上。白く光ってるのが、熱いところだよ。', k: 'まだ うみの うえ。しろく ひかってるのが、あつい ところだよ。' }] },
    ingress2: { p: 2, say: [{ t: '岸が見えてきた…。街、燃えてない？', k: 'きしが みえて きた…。まち、もえて ない？', m: 'surprise', g: 'look' }] },
    control: { p: 3, say: [{ t: '操作きた！ここから、わたしの番。', k: 'そうさ きた！ ここから、わたしの ばん。', m: 'proud', g: 'declare' }] },
    drop: { p: 2, cd: 20, say: [
      { t: '何か落ちてきた！小さいのが走ってる！', k: 'なにか おちて きた！ ちいさいのが はしってる！', m: 'surprise', g: 'recoil' },
      { t: 'また出てきた。逃がさないよ〜。', k: 'また でて きた。にがさないよ〜。', m: 'focus' },
      { t: '増えてる増えてる！', k: 'ふえてる ふえてる！', m: 'surprise' },
      { t: 'あ、あっちにも。忙しいな〜。', k: 'あ、あっちにも。いそがしいな〜。', m: 'focus', g: 'hesitate' }] },
    kill: { p: 2, cd: 6, ch: .75, say: [
      { t: '当たった！', k: 'あたった！', m: 'smile', g: 'approve' },
      { t: 'よしっ、止まった！', k: 'よしっ、とまった！', m: 'smile', g: 'nod' },
      { t: 'ひとつ、片づけた。', k: 'ひとつ、かたづけた。', m: 'proud' },
      { t: '先を読んだら、ちゃんと当たるね。', k: 'さきを よんだら、ちゃんと あたるね。', m: 'smile' },
      { t: 'ナイス、わたし！', k: 'ないす、わたし！', m: 'proud', g: 'cheer' }] },
    kill3: { p: 3, cd: 25, say: [
      { t: '連続で当たった！今日、調子いいかも！', k: 'れんぞくで あたった！ きょう、ちょうし いいかも！', m: 'smile', g: 'cheer', st: 'joy' },
      { t: 'うまくない？ねえ、うまくない？', k: 'うまく ない？ ねえ、うまく ない？', m: 'proud', g: 'cheer', cam: true }] },
    leak: { p: 2, cd: 9, say: [
      { t: 'あっ、逃げられた…！', k: 'あっ、にげられた…！', m: 'sad', g: 'sigh' },
      { t: '輪の外に出ちゃった。ごめん！', k: 'わの そとに でちゃった。ごめん！', m: 'sad', g: 'sigh', cam: true },
      { t: '速すぎるって〜。', k: 'はやすぎるって〜。', m: 'sad' }] },
    checkfire: { p: 2, cd: 18, say: [
      { t: '撃てない！今は撃っちゃだめな時間。', k: 'うてない！ いまわ うっちゃ だめな じかん。', m: 'surprise', g: 'recoil' },
      { t: '止められた。味方が近くにいるからだね。', k: 'とめられた。みかたが ちかくに いるからだね。', m: 'focus' }] },
    zoom_in: { p: 1, cd: 30, ch: .7, say: [
      { t: 'ちょっと寄ってみる。', k: 'ちょっと よって みる。', m: 'focus' },
      { t: '拡大！…よし、よく見える。', k: 'かくだい！ …よし、よく みえる。', m: 'focus', g: 'look' }] },
    zoom_out: { p: 1, cd: 35, ch: .6, say: [
      { t: 'どこ行った？いったん引いて探そう。', k: 'どこ いった？ いったん ひいて さがそう。', m: 'focus', g: 'look' },
      { t: '広く見て、次を探す。', k: 'ひろく みて、つぎを さがす。', m: 'focus' }] },
    zoom_back: { p: 1, cd: 40, ch: .4, say: [{ t: '寄りすぎた。戻そう。', k: 'よりすぎた。もどそう。' }] },
    gun_g25: { p: 1, cd: 60, say: [{ t: '速いのは、25ミリで。', k: 'はやいのわ、にじゅうご みりで。', m: 'focus' }] },
    gun_g40: { p: 1, cd: 60, say: [{ t: '40ミリに替えよう。', k: 'よんじゅう みりに かえよう。', m: 'focus' }] },
    try105: { p: 2, say: [{ t: 'ちょっと105ミリも試してみよう。着弾まで長いんだよね。', k: 'ちょっと ひゃくご みりも ためして みよう。ちゃくだんまで ながいんだよね。', m: 'proud', g: 'declare' }] },
    try40: { p: 2, say: [{ t: 'しばらく40ミリでいってみる。1発ずつ、丁寧に。', k: 'しばらく よんじゅう みりで いって みる。いっぱつずつ、ていねいに。', m: 'focus', g: 'think' }] },
    fire105: { p: 2, cd: 20, say: [
      { t: '撃った！…まだかな、まだかな。', k: 'うった！ …まだかな、まだかな。', m: 'focus', g: 'look' },
      { t: 'どーん！…届くまで十秒くらいかかる。', k: 'どーん！ …とどくまで じゅうびょう くらい かかる。', m: 'proud' }] },
    land105: { p: 2, cd: 20, say: [
      { t: 'きた！…当たったかな？', k: 'きた！ …あたったかな？', m: 'surprise', g: 'look' },
      { t: '着弾！すごい光。', k: 'ちゃくだん！ すごい ひかり。', m: 'surprise' }] },
    miss: { p: 1, cd: 30, ch: .4, say: [
      { t: 'あれ、外れた？', k: 'あれ、はずれた？', m: 'surprise' },
      { t: '先を読みすぎたかも。', k: 'さきを よみすぎたかも。', m: 'sad', g: 'hesitate' },
      { t: 'うそ、今の当たってないの？', k: 'うそ、いまの あたって ないの？', m: 'surprise', g: 'recoil' },
      { t: '止まられた〜。ずるい！', k: 'とまられた〜。ずるい！', m: 'sad', g: 'sigh' }] },
    bodyhit: { p: 2, cd: 45, ch: .8, say: [
      { t: 'あっ、本体に当てちゃった…。', k: 'あっ、ほんたいに あてちゃった…。', m: 'surprise', g: 'recoil' },
      { t: 'でかいほうに当たった。…また落ちてこない？', k: 'でかい ほうに あたった。 …また おちて こない？', m: 'focus', g: 'hesitate' }] },
    invert_back: { p: 2, say: [{ t: 'やっぱり戻そう。目がちかちかする。', k: 'やっぱり もどそう。めが ちかちか する。', m: 'sad', g: 'sigh' }] },
    act_run: { p: 1, cd: 40, ch: .6, say: [
      { t: 'ヘリが突っ込んでく。がんばれ〜。', k: 'へりが つっこんでく。がんばれ〜。', m: 'focus', g: 'look' },
      { t: '味方のヘリ、近づきすぎないでね。', k: 'みかたの へり、ちかづきすぎ ないでね。', m: 'focus' }] },
    act_arty: { p: 2, say: [{ t: '砲撃が来るって。いったん待機だね。', k: 'ほうげきが くるって。いったん たいきだね。', m: 'focus', g: 'think' }] },
    act_air: { p: 3, say: [{ t: '攻撃機が来る！みんな逃げて逃げて！', k: 'こうげききが くる！ みんな にげて にげて！', m: 'surprise', g: 'recoil', st: 'panic' }] },
    jet: { p: 2, say: [{ t: 'すごい音…！街の上を一直線。', k: 'すごい おと…！ まちの うえを いっちょくせん。', m: 'surprise', g: 'look' }] },
    roar: { p: 2, cd: 30, ch: .8, say: [
      { t: '今の声…ほんと苦手。', k: 'いまの こえ…ほんと にがて。', m: 'sad', g: 'sigh' },
      { t: '吠えた…！遅れて聞こえてくるの、こわい。', k: 'ほえた…！ おくれて きこえて くるの、こわい。', m: 'surprise', g: 'recoil' },
      { t: '低い声、体に響く感じ。', k: 'ひくい こえ、からだに ひびく かんじ。', m: 'focus' }] },
    glitch: { p: 3, cd: 20, say: [
      { t: '画面が乱れた！ちょっと待って！', k: 'がめんが みだれた！ ちょっと まって！', m: 'surprise', g: 'recoil', st: 'panic' },
      { t: 'うわっ、揺れた！機械、大丈夫？', k: 'うわっ、ゆれた！ きかい、だいじょうぶ？', m: 'surprise', g: 'recoil', st: 'panic' }] },
    reach: { p: 3, say: [{ t: '手が伸びてきた！ヘリ、逃げて！', k: 'てが のびて きた！ へり、にげて！', m: 'surprise', g: 'recoil', st: 'panic' }] },
    debris: { p: 2, cd: 30, say: [{ t: '破片が飛んでくる！上がって上がって！', k: 'はへんが とんで くる！ あがって あがって！', m: 'surprise', st: 'panic' }] },
    cold: { p: 2, say: [{ t: 'あれ…熱がない？映らなくなった。', k: 'あれ…ねつが ない？ うつらなく なった。', m: 'surprise', g: 'look' }] },
    hurt: { p: 2, cd: 25, ch: .85, say: [
      { t: '効いてる！よろけた！', k: 'きいてる！ よろけた！', m: 'smile', g: 'cheer', st: 'joy' },
      { t: 'ぐらついた！もう少し！', k: 'ぐらついた！ もう すこし！', m: 'smile', g: 'cheer' }] },
    fall: { p: 3, say: [{ t: '倒れる…！倒れるよ！', k: 'たおれる…！ たおれるよ！', m: 'surprise', g: 'recoil', st: 'joy' }] },
    down: { p: 3, say: [{ t: '倒した〜！みんな、ありがとう！', k: 'たおした〜！ みんな、ありがとう！', m: 'smile', g: 'cheer', st: 'joy', cam: true }] },
    ceasefire: { p: 2, say: [{ t: '撃ち方やめ、だって。おつかれさま、わたし。', k: 'うちかた やめ、だって。おつかれさま、わたし。', m: 'smile', g: 'settle' }] },
    birds: { p: 3, say: [{ t: '上に何かいる…。鳥？大きすぎない？', k: 'うえに なにか いる…。とり？ おおきすぎ ない？', m: 'surprise', g: 'look' }] },
    fed: { p: 2, say: [{ t: '…食べてる。これ、見てていいやつ？', k: '…たべてる。これ、みてて いい やつ？', m: 'sad', g: 'hesitate', cam: true }] },
    end: { p: 3, say: [{ t: '映像が切れた。おしまいかな。成績が出るよ。', k: 'えいぞうが きれた。おしまいかな。せいせきが でるよ。', g: 'settle' }] },
    bye: { p: 3, say: [{ t: '見てくれてありがとう！またね〜！', k: 'みて くれて ありがとう！ またね〜！', m: 'smile', g: 'bow', cam: true }] },
  },
  idle: { after: 16, say: [
    { t: '弾が届くまで、何秒かかかるんだよね。', k: 'たまが とどくまで、なんびょうか かかるんだよね。', m: 'focus' },
    { t: '動いてる相手は、ちょっと先を狙うのがコツ。', k: 'うごいてる あいてわ、ちょっと さきを ねらうのが こつ。', m: 'focus', g: 'think' },
    { t: '白黒の画面、ずっと見てると目が慣れてくる。', k: 'しろくろの がめん、ずっと みてると めが なれて くる。' },
    { t: 'ヘッドホンの人、低い音すごくない？', k: 'へっどほんの ひと、ひくい おと すごく ない？', m: 'smile', cam: true },
    { t: 'コメント、ちゃんと読んでるよ〜。', k: 'こめんと、ちゃんと よんでるよ〜。', m: 'smile', cam: true },
    { t: 'この街、建物ひとつずつ熱で見えてるんだって。', k: 'この まち、たてもの ひとつずつ ねつで みえてるんだって。' },
    { t: '味方のヘリ、ちっちゃく光ってるのが見える？', k: 'みかたの へり、ちっちゃく ひかってるのが みえる？', cam: true },
    { t: '集中、集中…。', k: 'しゅうちゅう、しゅうちゅう…。', m: 'focus', g: 'think' }],
    // 撃ち方やめのあと（撃つ話はしない）
    late: [
      { t: '鳥、まだいるね…。', k: 'とり、まだ いるね…。', m: 'sad' },
      { t: 'もう撃てないから、見守るだけ。', k: 'もう うてないから、みまもる だけ。', m: 'focus' },
      { t: 'あの鳥、どこから来たんだろう。', k: 'あの とり、どこから きたんだろう。', m: 'focus', g: 'think' },
      { t: '静かになったね…。', k: 'しずかに なったね…。', g: 'settle' },
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
      { q: 'ズームってできるの？', when(g) { return this._E.ctrlT != null && this._t - this._E.ctrlT > 15; },
        a: { t: '{name}さん、ズーム？できるよ、ほら！', k: '{name}さん、ずーむ？ できるよ、ほら！', m: 'smile', g: 'nod' }, act(g) { this.acts.zoomIn.call(this, g); } },
      { q: '広く見たほうが探しやすいよ', when(g) { return this._E.ctrlT != null && this._t - this._E.ctrlT > 60; },
        a: { t: '{name}さん、たしかに。引いてみる。', k: '{name}さん、たしかに。ひいて みる。', m: 'focus', g: 'approve' }, act(g) { this.acts.zoomOut.call(this, g); } },
      { q: '105ミリ撃ってみて！', when(g) { const K = g.win.__kj; return this._E.ctrlT != null && K.GM.ok !== false && !this._B.tried105; },
        a: { t: '{name}さん、105ね。重いやつ、いってみる！', k: '{name}さん、ひゃくごね。おもい やつ、いって みる！', m: 'proud', g: 'declare' }, act(g) { this.acts.gun.call(this, g, 'g105', 15); } },
      { q: '40ミリ派です', when(g) { return this._E.ctrlT != null && this._t - this._E.ctrlT > 90; },
        a: { t: '{name}さん、40ミリ？じゃあ、しばらく40でいくね。', k: '{name}さん、よんじゅう みり？ じゃあ、しばらく よんじゅうで いくね。', m: 'smile' }, act(g) { this.acts.gun.call(this, g, 'g40', 30); } },
      { q: '白黒反転できる？', when(g) { return this._E.ctrlT != null && !g.win.__kj.GM.done; },
        a: { t: '{name}さん、反転？できるよ、ほら。…うわ、見にくい！', k: '{name}さん、はんてん？ できるよ、ほら。 …うわ、みにくい！', m: 'surprise', g: 'recoil' }, act(g, J) { this.acts.invert.call(this, g, J); } },
      { q: '今何体止めた？', when(g) { return g.win.__kj.GM.kills >= 2; }, vars(g) { const n = g.win.__kj.GM.kills; return { n: [n + '体', kanaTai(n)] }; },
        a: { t: '{name}さん、いまね…{n}！', k: '{name}さん、いまね… {n}！', m: 'proud' } },
      { q: '下手くそw', when(g) { return g.win.__kj.GM.leak >= 1; },
        a: { t: '{name}さん、下手って言わないで〜！これでも頑張ってるの！', k: '{name}さん、へたって いわないで〜！ これでも がんばってるの！', m: 'sad', g: 'sigh' } },
      { q: 'エイムうますぎ', when(g) { return g.win.__kj.GM.kills >= 4; },
        a: { t: '{name}さん、でしょ〜？…あっ、今の外したかも。', k: '{name}さん、でしょ〜？ …あっ、いまの はずしたかも。', m: 'proud', g: 'cheer' } },
      { q: 'さっきの惜しかった', when(g) { return g.win.__kj.GM.leak >= 1 || g.win.__kj.GM.cf >= 1; },
        a: { t: '{name}さん、でしょ？次は当てるから見てて。', k: '{name}さん、でしょ？ つぎわ あてるから みてて。', m: 'proud', g: 'declare' } },
      { q: '声かわいい', a: { t: '{name}さん、えへへ、ありがとう。照れる〜。', k: '{name}さん、えへへ、ありがとう。てれる〜。', m: 'smile', g: 'nod' } },
      { q: 'あのでかいの何なの？', when(g) { return g.win.__kj.S.act >= 0 && !g.win.__kj.MON.dead; },
        a: { t: '{name}さん、わたしもわかんない。とにかくでかい。', k: '{name}さん、わたしも わかんない。とにかく でかい。', m: 'focus', g: 'think' } },
      { q: '寝る前に見てる', a: { t: '{name}さん、夜ふかし仲間だね〜。', k: '{name}さん、よふかし なかまだね〜。', m: 'smile' } },
      { q: '初見です', when(g, t) { return t < 300; }, a: { t: '{name}さん、初見さん、いらっしゃい！ゆっくりしていってね。', k: '{name}さん、しょけんさん、いらっしゃい！ ゆっくり して いってね。', m: 'smile', g: 'nod' } },
      { q: '25ミリの音すき', when(g) { return g.win.__kj.GM.sh.g25 > 60; }, a: { t: '{name}さん、わかる。ボボボボって、発電機みたいな音。', k: '{name}さん、わかる。ぼぼぼぼって、はつでんきみたいな おと。', m: 'smile' } },
      { q: 'このゲーム手作り？', a: { t: '{name}さん、そうなの。手作りのゲームなんだって。', k: '{name}さん、そうなの。てづくりの げーむなんだって。', m: 'smile' } },
      { q: '無線、なんて言ってる？', when(g) { return g.win.__kj.S.act >= 0; }, a: { t: '{name}さん、英語だから半分くらいしかわかんない。', k: '{name}さん、えいごだから はんぶん くらいしか わかんない。', m: 'focus', g: 'hesitate' } },
      { q: 'おつかれ！倒したね', when(g) { return g.win.__kj.MON.dead; }, a: { t: '{name}さん、ありがとう！なんとか倒せたね。', k: '{name}さん、ありがとう！ なんとか たおせたね。', m: 'smile', g: 'cheer' } },
      { q: '鳥、撃てないの？', when(g) { const K = g.win.__kj; return K.BIRDS.length && K.GM.done; }, a: { t: '{name}さん、もう撃っちゃだめなんだって。見てるだけ。', k: '{name}さん、もう うっちゃ だめなんだって。みてる だけ。', m: 'sad' } },
    ],
  },

  /* ---------- 視聴者の書き込み（名前はすべて作りもの） ---------- */
  chat: {
    rate: 1,
    names: [['ねこまる', 'ねこまる'], ['夜ふかし', 'よふかし'], ['たぬき', 'たぬき'], ['ぽんず', 'ぽんず'], ['ひよこ豆', 'ひよこまめ'], ['しらたま', 'しらたま'], ['月見そば', 'つきみそば'],
      ['ゆでたまご', 'ゆでたまご'], ['こはく', 'こはく'], ['あおば', 'あおば'], ['とうふ', 'とうふ'], ['くろまめ', 'くろまめ'], ['ゆきみ', 'ゆきみ'], ['まめしば', 'まめしば'], ['そらいろ', 'そらいろ'],
      ['みかん箱', 'みかんばこ'], ['ほうじ茶', 'ほうじちゃ'], ['おにぎり', 'おにぎり'], ['しぐれ', 'しぐれ'], ['ねぎま', 'ねぎま'], ['かもめ', 'かもめ'], ['ぬいぐるみ', 'ぬいぐるみ'], ['夜行性', 'やこうせい'],
      ['なつめ', 'なつめ'], ['こたつ', 'こたつ'], ['ゆうやけ', 'ゆうやけ'], ['すずめ', 'すずめ'], ['わらびもち', 'わらびもち']],
    base: ['こんばんは', 'きたー', 'わこつ', '待ってた', '初見です', '画面かっこいい', '白黒の映像いいね', '音すごい', 'ヘッドホン勢です', '声すき', '今日もゆるっと', '夜ふかし確定',
      'このゲーム気になってた', '映像こわい', '雰囲気すごい', 'わくわく', '作業用にしてる', 'おつまみ片手に見てる', '街ひろい', '十字かっこいい'],
    late: ['静かになった', '鳥こわい', '見守ろう', 'いい配信だった', 'エンディングっぽい', 'なんか切ない', '最後まで見る'],
    on: {
      control: ['いけー', 'がんばれ！', '操作きた', 'お手並み拝見'], drop: ['何か落ちた', 'ちっちゃいのいる', 'わらわら', '逃げてる逃げてる', '虫みたい'],
      kill: ['ナイス！', 'うま', '命中', '当てた！', 'エイムいい', '888'], kill3: ['うますぎ', 'プロ？', '888888', '連続えぐい', '神エイム'],
      leak: ['あーー', '惜しい', 'ドンマイ', '逃げたw', '次いこ'], checkfire: ['撃てないやつ', '味方近いね', 'ホールド'],
      roar: ['こわ', '声でっか', '鳥肌', '低音やば'], glitch: ['画面乱れたw', 'ノイズやば', '揺れた', '機械こわれる'],
      act_air: ['攻撃機きた', '逃げろー', '空爆くる'], jet: ['ブーーって音すき', 'ド派手', '爆撃すご', 'ひえ'], act_arty: ['砲撃くる', '待機'],
      hurt: ['効いてる', 'よろけた', 'いける！'], fall: ['倒れる！', 'いけた？', 'おおお'], down: ['倒したー！', 'おめ！', '888888', '勝った！', 'やったー'],
      birds: ['鳥でか', 'え、なにあれ', 'こわすぎ', '翼えぐい'], fed: ['食べてる…', 'ホラー', '見ちゃだめ', 'ひえっ'], cold: ['熱ないの？', '消えた', 'なにそれこわ'],
      reach: ['手が！', '逃げてー', '近い近い'],
      zoom_in: ['ズームきた', '拡大いいね', 'よく見える'], zoom_out: ['引きの画もいい', '広い'], try105: ['105きた！', '重そう'], fire105: ['ドーン', '弾道きれい'],
      land105: ['着弾！', '光った', 'でか'], miss: ['あー', 'おしい', 'ドンマイ', '読み違えたね'], bodyhit: ['本体w', '増えるやつw', 'やっちゃった'],
      invert_back: ['戻したw', '目に悪い'], gun_g40: ['40ミリ', '丁寧'], gun_g25: ['ボボボボ'], try40: ['40ミリ派です', '一発ずつ'], end: ['おつかれ〜', 'おつ', '楽しかった', 'また見る', '成績どう？'], bye: ['おつ〜', 'またね', 'おやすみ'],
    },
  },
});
