/* ===== 回：「積層宙域」を遊ぶ配信 =====
   ゲームは games/sekisou.html（元の作品を、手を入れずに写したもの。曲は textscore.js で鳴る。ページの頭に置く）。
   右から真横に飛んでくるキューブが、何かに触れた瞬間その向きのまま固まって、左の壁から乱雑に積もっていく。いくつかは前触れなく自機めがけて突っ込んでくる（急襲）。
   難易度ごとに決まった秒数を生き残ればクリア（練習60・標準75・鬼90・修羅90秒）。

   このゲームは、中身を外に出していない。そこで、読みこむときに（source）、ゲームの最後の行の手前に、窓口（window.__sk）を1行差しこむ。
   窓口は、ゲームの中の変数を読むだけのもの（getter）と、ゲームがもともと持っている関数（はじめる・メニューへ・難易度を選ぶ・当たり判定）。ゲームのファイルそのものは元のまま。
   遊び手は、ゲームの画面のスティック（padIn。倒す量で速さが変わる）と SHOT のボタン（padIn.fire）を、こちらから動かす：
     ・数手先（0.7秒）まで、16の向き＋ゆっくり8つ＋止まる、を試して、キューブ（ぶつかるところで止まる）と積もったものに当たらず、空きの広いところを選ぶ
     ・急襲（赤くなって突っ込んでくる）には、気づくまで少し間がある（0.14〜0.3秒。話していると遅れる）。気づくまでは、ただ飛んでいるものとして見る
     ・手はなめらかに動く（向きを急に変えない）。ときどき、画面から目が離れて手が止まる（よそ見）
     ・作戦（2026-11-28。横田さんの助言で組み直した。どれも速回しで、元の遊び手と生き残る時間をくらべて決めた）：
         撃たない … 弾は、飛んでいるキューブには効かない（はじかれる）。積もったものを崩すと、盾も足がかりも減る。壊せる難易度で、せまいときだけ前を撃って掘る（shoot:false）
         動きすぎない … 向きを変えるのを重くして（smooth 10）、止まれるときは止まる。突っ込んでくるのは、そのとき自機がいたところへまっすぐ来るので、来たら横にずれる
         陰に入る … 飛んでいるキューブとのあいだに積もったもの（これから固まるものも）があるところを、少しだけ選ぶ。突っ込んできても、そこで止まる
         CLOSE を拾う … もうすぐ固まるキューブの、すぐそば（12〜24）にいられるなら、そうする
       壁を作る（wallW。いまは 0 で切ってある）：床・天井にくっついた塊（足がかり）の先の右上（天井なら右下）で待ち、突っ込んでくるのをかわして、足がかりに当てる。
         足がかりがなければ、床（天井）の少し上で待つ。余裕のあるとき（突っ込んできているものがなく、近くを飛んでいるのが少ない）だけ向かう（gate）。
         待ち位置で始まった急襲の 8割ほどが足がかりに積もるが、待ち位置にいられるのは急襲全体の 1〜2割で、1回に積めるのは 1〜3個。標準で落ちる回数が増えるので、切ってある
   進行：あいさつ → 雑談（自己紹介）→ 難易度を見て「標準」→ 結果 → 上げるか、もう一回 → … → 修羅に挑む → 締めの雑談 → おわり */
const SEKISOU = (() => {
  'use strict';
  const R = Math.random, clamp = (x, a, b) => x < a ? a : x > b ? b : x, rnd = (a, b) => a + R() * (b - a);

  /* 窓口：ゲームの最後（hotRef の行）の手前に差しこむ。ゲームの中の let は入れかわるので、getter で読む */
  const EXPOSE = 'window.__sk={get mode(){return mode},get paused(){return paused},get D(){return D},get diffIdx(){return diffIdx},get elapsed(){return elapsed},get lives(){return lives},' +
    'get score(){return scoreF},get closes(){return closes},get breaks(){return breaks},get dodged(){return dodged},get result(){return result},get cubes(){return cubes},get stuck(){return stuck},' +
    'get pending(){return pending},get bullets(){return bullets},get bests(){return bests},get muted(){return muted},p:p,banner:banner,padIn:padIn,keys:keys,DIFFS:DIFFS,' +
    'K:{W:W,H:H,TOP:TOP,BOT:BOT,LEFT:LEFT,PSPEED:PSPEED,BSPD:BSPD,MAXB:MAXB,PHX:PHX,PHY:PHY,RS:RS},' +
    'startGame:startGame,goMenu:goMenu,selectDiff:selectDiff,setPause:setPause,setPad:setPad,toggleMute:toggleMute,layout:layout,step:step,render:render,' +
    'rectHull:rectHull,pointInHull:pointInHull,forNear:forNear,sphereHits:sphereHits};';
  const MARK = 'const hotRef = window.claude && window.claude.hot;';
  function source(html) { const i = html.lastIndexOf(MARK); return i < 0 ? html : html.slice(0, i) + EXPOSE + '\n' + html.slice(i); }

  /* ---------- 遊び手 ---------- */
  function mkBot(I, H) {
    H = H || {};
    const K = I.K, p = I.p, NS = 14, DT = .05, MOVE = .3;
    const DIRS = [[0, 0]];
    for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; DIRS.push([Math.cos(a), Math.sin(a)]); }
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + Math.PI / 8; DIRS.push([.45 * Math.cos(a), .45 * Math.sin(a)]); }
    const B = { vx: 0, vy: 0, tx: 0, ty: 0, next: 0, seen: new WeakMap(), react: .2, margin: 3.5, home: 150, biasY: 0, biasUntil: 0, greedUntil: 0,
      lapse: 0, nextLapse: 0, fireOff: 0, nextFireOff: 0, run: 0, log: [], flyR: 70, flyW: 80, ghostW: 300,
      // 作戦（0 / false にすると、その作戦を使わない）
      sweepW: 0,                // 止まらない（0 で切る。いまは使わない）：突っ込んでくるキューブは、突っ込みはじめたときに自機がいたところへ、まっすぐ来る。動き続けていれば、後ろに外れる
      expW: 40, expR: 150,      // 陰に入る：飛んでいるキューブから、まっすぐ見えないところ（あいだに積もったものがある）を選ぶ
      lureW: 60,                // CLOSE を拾う：もうすぐ固まるキューブが、すぐそば（12〜24）で固まるところにいられるなら、そうする
      shoot: false,             // 撃つか（撃つと、盾にも足がかりにもなる積もりまで崩れる。撃っても、飛んでいるキューブは止まらない）
      smooth: 10,               // 動きすぎない：向きを変えるのを重くする（2.4 だった）。止まれるときは止まって、来たら横にずれる
      gate: true, gateR: 130, gateN: 1, slack: true, homeW: .05,
      wallW: 0, lx: 12, ly: 11, hideH: 0, seedY: 24, gClr: 0,   // 壁を作る：床・天井の足がかりの、右上（天井なら右下）で待ち、突っ込んでくるのをかわして、足がかりに当てる
      goal: null, anc: null, nextPlan: 0, seedSide: 0, seedUntil: 0,
      hold: true, wise: true,   // 撃ち分け（wise：壊れないと知っている）：壊れない難易度では撃たない。壊せる難易度では、盾になっている前のキューブは撃たず、せまいときだけ撃って掘る
      // いまの様子（実況が読む）
      shel: false, shelT: 0, holdNow: false, digNow: false, holdT: 0, exp: 0, blocked: 0 };
    const talking = () => { try { return !!(H.talking && H.talking()); } catch (e) { return false; } };

    // 積もったものに当たるところで止まる、まっすぐな動き（キューブの中心が、積もったものの中心から 8 の内に入ると止まる）
    function march(x, y, vx, vy, pts, from) {
      let stopI = -1;
      for (let i = from; i <= NS; i++) {
        pts[2 * i] = x; pts[2 * i + 1] = y;
        if (stopI >= 0) continue;
        for (let s = 0; s < 3; s++) { const nx = x + vx * DT / 3, ny = y + vy * DT / 3; if (I.sphereHits(nx, ny)) { stopI = i + 1; break; } x = nx; y = ny; }
      }
      return stopI;
    }
    // キューブの行く先（0.7秒ぶん）：ぶつかるところで止まる。急襲は、気づくまでは、ただ飛んでいるものとして見る
    function predict(t) {
      const out = [], d = I.D;
      for (const k of I.cubes) {
        let r = B.seen.get(k); if (!r) { r = { fvx: k.vx, fvy: k.vy, dashT: null, react: 0 }; B.seen.set(k, r); }
        if (k.st === 'fly') { r.fvx = k.vx; r.fvy = k.vy; r.dashT = null; }
        else if (k.st === 'dash' && r.dashT == null) { r.dashT = t; r.react = B.react + R() * .1 + (talking() ? .08 : 0); }
        let vx = k.vx, vy = k.vy, wait = 0, dash = k.st !== 'fly';
        if (k.st === 'dash' && t - r.dashT < r.react) { vx = r.fvx; vy = r.fvy; dash = false; }
        if (k.st === 'lock') { wait = Math.max(0, k.lockT); const dx = p.x - k.x, dy = p.y - k.y, L = Math.hypot(dx, dy) || 1; vx = dx / L * d.dashSpd; vy = dy / L * d.dashSpd; }
        const pts = new Float32Array(2 * (NS + 1));
        let from = 0; for (; from <= NS && from * DT < wait; from++) { pts[2 * from] = k.x; pts[2 * from + 1] = k.y; }
        const stopI = march(k.x, k.y, vx, vy, pts, from);
        out.push({ pts, sh: k.sh, dash, stopI, fly: k.st === 'fly' && !dash });
        // まだ飛んでいるだけのキューブも、いつ突っ込んでくるかわからない：いま自機のいるところへ、いま突っ込んできたら、を見ておく（途中に積もったものがあれば、そこで止まる）
        if (k.st === 'fly' && Math.hypot(k.x - p.x, k.y - p.y) < 170) {
          const dx = p.x - k.x, dy = p.y - k.y, L = Math.hypot(dx, dy) || 1, sp = d.dashSpd, gp = new Float32Array(2 * (NS + 1));
          const lag = B.react * .6, vx = dx / L * sp, vy = dy / L * sp; let i = 0;
          for (; i <= NS && i * DT < lag; i++) { gp[2 * i] = k.x; gp[2 * i + 1] = k.y; }
          const a = i * DT - lag; let gx = k.x + vx * a, gy = k.y + vy * a;
          if (I.sphereHits(gx, gy)) { gx = k.x; gy = k.y; }
          march(gx, gy, vx, vy, gp, i);
          out.push({ pts: gp, sh: k.sh, dash: true, ghost: true });
        }
      }
      return out;
    }
    // 陰：最後の位置から、飛んでいるキューブ（いつ突っ込んでくるかわからない）がまっすぐ見えるか。あいだに積もったもの（これから固まるものも）があれば、突っ込んできても、そこで止まる
    let SB = [], TH = [];
    function prepShelter(CB) {
      SB = []; TH = [];
      const R0 = B.expR;
      I.forNear(p.x - R0 - 30, p.y - R0 - 30, p.x + R0 + 60, p.y + R0 + 30, s => { SB.push(s.x, s.y); });
      for (const q of CB) {
        if (q.ghost) continue;
        if (q.stopI >= 0 && q.stopI <= NS) { SB.push(q.pts[2 * NS], q.pts[2 * NS + 1]); continue; }   // 固まって壁になる
        if (q.fly) TH.push(q.pts[2 * NS], q.pts[2 * NS + 1]);
      }
    }
    function exposure(x, y) {
      const R0 = B.expR; let e = 0, nb = 0;
      for (let j = 0; j < TH.length; j += 2) {
        const tx = TH[j], ty = TH[j + 1], dx = x - tx, dy = y - ty, L2 = dx * dx + dy * dy;
        if (L2 > R0 * R0) continue;
        const L = Math.sqrt(L2) || 1;
        let blocked = false;
        const bx0 = Math.min(x, tx) - 8, bx1 = Math.max(x, tx) + 8, by0 = Math.min(y, ty) - 8, by1 = Math.max(y, ty) + 8;
        for (let i = 0; i < SB.length; i += 2) {
          const sx = SB[i], sy = SB[i + 1];
          if (sx < bx0 || sx > bx1 || sy < by0 || sy > by1) continue;
          const u = ((sx - tx) * dx + (sy - ty) * dy) / L2;
          if (u <= 0 || u >= 1) continue;
          const qx = tx + dx * u - sx, qy = ty + dy * u - sy;
          if (qx * qx + qy * qy < 64) { blocked = true; break; }
        }
        if (blocked) { nb++; continue; }
        e += ((R0 - L) / R0) ** 2;
      }
      return [e, nb];
    }
    function cost(dx, dy, CB, t) {
      const sp = K.PSPEED, m = t < B.greedUntil ? .8 : B.margin;
      const x0 = K.LEFT + K.PHX + 1, x1 = K.W - 10, y0 = K.TOP + K.PHY + 1, y1 = K.BOT - K.PHY - 1;
      let x = p.x, y = p.y, c = 0;
      for (let i = 1; i <= NS; i++) {
        const tt = i * DT, w = 1.3 - tt / (NS * DT);
        if (tt <= MOVE + 1e-6) { x = clamp(x + dx * sp * DT, x0, x1); y = clamp(y + dy * sp * DT, y0, y1); }
        const rx0 = x - K.PHX - m, rx1 = x + K.PHX + m, ry0 = y - K.PHY - m, ry1 = y + K.PHY + m;
        if (tt <= MOVE + DT + 1e-6 && I.forNear(rx0 - 16, ry0 - 16, rx1 + 16, ry1 + 16, s => I.rectHull(rx0, ry0, rx1, ry1, s.sh, s.x, s.y))) return c + 1e4 * w;
        for (const q of CB) {
          const cx = q.pts[2 * i], cy = q.pts[2 * i + 1], dd = Math.hypot(cx - x, cy - y);
          if (q.ghost) { if (dd < 16) c += B.ghostW * ((16 - dd) / 16) ** 2 * w; continue; }
          if (dd < 24 && I.rectHull(rx0, ry0, rx1, ry1, q.sh, cx, cy)) return c + 1e4 * w;
          if (q.stopI >= 0 && i >= q.stopI) {
            // 固まった：もう動かない。CLOSE（26 の内で、触れずに固まる）をもらえるところにいたら、いい
            if (i === q.stopI && B.lureW && dd > 12 && dd < 24) c -= B.lureW * w;
            if (dd < 14) c += 30 * ((14 - dd) / 14) ** 2 * w;
            continue;
          }
          const R0 = q.dash ? 48 : B.flyR; if (dd < R0) c += (q.dash ? 70 : B.flyW) * ((R0 - dd) / R0) ** 2 * w;
        }
      }
      // 空きの広さ（まわりの積もったものと、天井・床まで）
      let clr = Math.min(y - K.TOP, K.BOT - y, 44);
      I.forNear(x - 44, y - 44, x + 44, y + 44, s => { const e = Math.hypot(s.x - x, s.y - y) - 9; if (e < clr) clr = e; });
      const G = B.wallW && B.slack ? B.goal : null, nearG = G && !G.seed && Math.hypot(x - G.x, y - G.y) < 26;
      c -= Math.min(Math.max(0, clr), nearG ? B.gClr : 44) * .55;
      if (G) c += Math.hypot(x - G.x, (y - G.y) * (G.seed ? .6 : 1)) * B.wallW * (G.seed ? .5 : 1);
      // 陰に入っているか
      if (B.expW) { const [e] = exposure(x, y); c += e * B.expW; }
      c += (G ? 0 : Math.abs(x - B.home) * B.homeW) + (x > 300 ? (x - 300) * .7 : 0) + Math.abs(y - (K.TOP + K.BOT) / 2) * .012;
      c += Math.hypot(dx - B.tx, dy - B.ty) * B.smooth;                         // 向きを急に変えない
      if (B.sweepW && TH.length) c += B.sweepW * (1 - Math.hypot(dx, dy));   // 止まらない（ねらって突っ込んでくるのは、止まっているところへ来る）
      if (t < B.biasUntil) c += dy * B.biasY * 9;                          // 頼まれた向きへ（biasY −1 で上）
      return c;
    }
    function freeAt(x, y, m) {
      const rx0 = x - K.PHX - m, rx1 = x + K.PHX + m, ry0 = y - K.PHY - m, ry1 = y + K.PHY + m;
      if (ry0 < K.TOP || ry1 > K.BOT || rx0 < K.LEFT || rx1 > K.W - 10) return false;
      return !I.forNear(rx0 - 16, ry0 - 16, rx1 + 16, ry1 + 16, s => I.rectHull(rx0, ry0, rx1, ry1, s.sh, s.x, s.y));
    }
    // 足がかりからつながっている塊（中心どうし 10.5 の内）
    function cluster(anc) {
      const seen = new Set([anc]), q = [anc];
      while (q.length) {
        const a = q.pop();
        I.forNear(a.x - 11, a.y - 11, a.x + 11, a.y + 11, s => {
          if (seen.has(s) || s.x < anc.x - 40 || s.x > anc.x + 90) return;
          if ((s.x - a.x) ** 2 + (s.y - a.y) ** 2 > 110) return;
          seen.add(s); q.push(s);
        });
      }
      return [...seen];
    }
    // 壁を作る：床か天井にくっついた塊（足がかり）の先の、右上（天井なら右下）で待つ。そこへ突っ込んでくるのは、かわすと、その先の足がかりに当たって固まる（壁が伸びる。そばで固まるので CLOSE も入る）
    // 足がかりがなければ、床（天井）の少し上で待つ：かわした急襲が、床にくっつく
    function wallPlan(t) {
      const S = I.stuck, mid = (K.TOP + K.BOT) / 2;
      let anc = B.anc && S.includes(B.anc) ? B.anc : null;
      if (!anc) {
        let bs = Infinity;
        for (const s of S) {
          if (!(s.y >= K.BOT - 7 || s.y <= K.TOP + 7) || s.x < 60 || s.x > 250) continue;
          const sc = Math.abs(s.x - 150) * .5 + Math.hypot(s.x - p.x, s.y - p.y) * .3;
          if (sc < bs) { bs = sc; anc = s; }
        }
      }
      B.anc = anc;
      if (!anc) {
        if (!B.seedSide || t > B.seedUntil) { B.seedSide = B.seedSide ? -B.seedSide : (p.y > mid ? 1 : -1); B.seedUntil = t + rnd(10, 16); }
        return { x: 150, y: B.seedSide > 0 ? K.BOT - B.seedY : K.TOP + B.seedY, seed: true, v: 0, t };
      }
      const fl = anc.y > mid ? 1 : -1, C = cluster(anc);
      let tip = anc; for (const s of C) if ((s.y * fl - s.x * .3) < (tip.y * fl - tip.x * .3)) tip = s;
      const h = Math.abs(anc.y - tip.y) + 8;
      if (B.hideH && h >= B.hideH) {
        const yh = tip.y + fl * 8; let xl = Infinity; for (const s of C) if (Math.abs(s.y - yh) < 9 && s.x < xl) xl = s.x;
        for (const [ox, oy] of [[-15, 0], [-15, fl * 6], [-20, 0], [-20, fl * 8]]) if (xl < Infinity && freeAt(xl + ox, yh + oy, 3)) return { x: xl + ox, y: yh + oy, hide: true, pil: true, h, v: 1, t };
      }
      for (const [ox, oy] of [[0, 0], [4, 0], [0, 4], [6, 4], [-4, 4], [8, 8]]) { const gx = tip.x + B.lx + ox, gy = tip.y - fl * (B.ly + oy); if (freeAt(gx, gy, 3)) return { x: gx, y: gy, pil: true, h, v: 1, t, tip }; }
      return null;
    }
    function decide(t) {
      const CB = predict(t); let best = DIRS[0], bc = Infinity;
      // 余裕があるか：突っ込んできているものがなく、近く（gateR）を飛んでいるのが gateN 個まで
      { let nf = 0, dash = false; for (const k of I.cubes) { const d = Math.hypot(k.x - p.x, k.y - p.y); if (k.st !== 'fly' && d < 220) dash = true; else if (k.st === 'fly' && d < B.gateR) nf++; } B.slack = !B.gate || (!dash && nf <= B.gateN); }
      prepShelter(CB);
      for (const D2 of DIRS) { const c = cost(D2[0], D2[1], CB, t); if (c < bc) { bc = c; best = D2; } }
      B.tx = best[0]; B.ty = best[1]; B.cost = bc;
      // いまいるところが陰になっているか（近くの飛んでいるキューブのうち、あいだに壁があるもの）
      const [e, nb] = exposure(p.x, p.y); B.exp = e; B.blocked = nb;
    }
    // 弾の行く先（自機の高さの列）で、いちばん手前の積もったもの
    function rowAhead() {
      let best = Infinity, hp = 0;
      I.forNear(p.x + 8, p.y - 12, K.W, p.y + 12, s => {
        if (s.x - p.x < 6 || s.x - p.x >= best) return;
        for (let ox = -9; ox <= 9; ox += 2) if (I.pointInHull(s.x + ox, p.y, s.sh, s.x, s.y)) { best = s.x - p.x; hp = s.hp; break; }
      });
      return best === Infinity ? null : { d: best, hp };
    }
    function clearance() {
      let m = Math.min(p.y - K.TOP, K.BOT - p.y, 44);
      I.forNear(p.x - 44, p.y - 44, p.x + 44, p.y + 44, s => { const e = Math.hypot(s.x - p.x, s.y - p.y) - 9; if (e < m) m = e; });
      return m;
    }
    function reset() { B.goal = null; B.anc = null; B.nextPlan = 0; B.seedSide = 0; B.vx = B.vy = B.tx = B.ty = 0; B.next = 0; B.seen = new WeakMap(); B.lapse = 0; B.nextLapse = 0; B.shel = false; B.shelT = 0; B.holdNow = B.digNow = false; B.holdT = 0; }
    return {
      B, reset,
      // 頼まれごと
      up(sec) { B.biasY = -1; B.biasUntil = B.t + sec; }, down(sec) { B.biasY = 1; B.biasUntil = B.t + sec; },
      greedy(sec) { B.greedUntil = B.t + sec; },
      newRun(diff, n) { reset(); B.run++; B.react = ([.16, .19, .2, .21][diff] || .2) - .015 * Math.max(0, (n || 1) - 1); B.home = 150; B.nextLapse = B.t + rnd(14, 26); B.nextFireOff = B.t + rnd(2, 4); },
      update(dt, t) {
        B.t = t; const P = I.padIn;
        if (I.mode !== 'play' || I.p.dead || I.paused) { B.vx = B.vy = 0; P.mx = P.my = 0; P.fire = false; B.shel = false; B.shelT = 0; if (I.p.dead) B.seen = new WeakMap(); return; }
        // よそ見：手が止まる（話していると起きやすい）
        if (t >= B.nextLapse) { B.lapse = t + rnd(.25, .45); B.nextLapse = t + rnd(18, 32) * (talking() ? .6 : 1); }
        if (B.wallW && t >= B.nextPlan) { B.goal = wallPlan(t); B.nextPlan = t + .3; }
        if (t >= B.next && t >= B.lapse) { decide(t); B.next = t + (talking() ? .11 : .065) + R() * .03; }
        // 陰に入っている：近くに飛んでいるキューブがいて、そのうち見えているものが少ない
        const sh = B.blocked > 0 && B.exp < .12;
        B.shel = sh; B.shelT = sh ? B.shelT + dt : 0;
        // 手：なめらかに
        const k = 1 - Math.exp(-dt / .055); B.vx += (B.tx - B.vx) * k; B.vy += (B.ty - B.vy) * k;
        P.mx = B.vx; P.my = B.vy;
        // 弾：ふだんは押しっぱなしで、ときどき離す
        if (t >= B.nextFireOff) { B.fireOff = t + rnd(.15, .4); B.nextFireOff = t + rnd(2, 4.5); }
        let fire = t >= B.fireOff;
        B.holdNow = B.digNow = false;
        if (B.hold) {
          const ra = rowAhead(), canBreak = I.D.hp > 0;
          if (!canBreak) { if (B.wise) fire = fire && ((t * 1.3) % 4) < .5; }   // 壊れない：撃ってもむだなので、ほとんど撃たない（くせで、ときどき）
          else if (ra) {
            const tight = clearance() < 10;
            if (ra.d < 34 && tight) { fire = true; B.digNow = true; }                  // せまい：前を掘る
            else if (sh || (ra.d < 120 && B.blocked > 0)) { fire = false; B.holdNow = true; }   // 盾：撃たない
          }
        }
        if (!B.shoot) { if (!B.digNow) fire = false; B.holdNow = false; }
        B.holdT = B.holdNow ? B.holdT + dt : 0;
        P.fire = fire;
      },
    };
  }
  return { EXPOSE, MARK, source, mkBot };
})();

(() => {
  'use strict';
  const R = Math.random, clamp = (x, a, b) => x < a ? a : x > b ? b : x;
  const kn = n => Jikkyo.kanaNum(n), en = n => Jikkyo.enNum(n);
  // 差しこむ値：['字幕', '読み', '英語の字幕', '英語の読み']
  const ptV = n => { n = Math.max(0, Math.floor(n)); return [n.toLocaleString('ja-JP') + '点', kn(n) + 'てん', n.toLocaleString('en-US') + ' points', '[ ' + en(n) + " 'pOInts ]"]; };
  const secV = s => { s = Math.max(0, Math.round(s)); return [s + '秒', kn(s) + 'びょう', s + (s === 1 ? ' second' : ' seconds'), '[ ' + en(s) + (s === 1 ? " 'sEk@nd ]" : " 'sEk@ndz ]")]; };
  const ctr = (n, suf) => { let s = kn(n); if (/いち$/.test(s)) s = s.replace(/いち$/, 'いっ'); else if (/ろく$/.test(s)) s = s.replace(/ろく$/, 'ろっ'); else if (/はち$/.test(s)) s = s.replace(/はち$/, 'はっ'); else if (/じゅう$/.test(s)) s = s.replace(/じゅう$/, 'じゅっ'); return s + suf; };
  const koV = n => [n + '個', n ? ctr(n, 'こ') : 'ぜろこ', String(n), '[ ' + en(n) + ' ]'];
  const kiV = n => [n + '機', n ? ctr(n, 'き') : 'ぜろき', n + (n === 1 ? ' life' : ' lives'), '[ ' + en(n) + (n === 1 ? " 'laIf ]" : " 'laIvz ]")];
  const kaiV = n => [n + '回', n ? ctr(n, 'かい') : 'ぜろかい', n + (n === 1 ? ' time' : ' times'), '[ ' + en(n) + (n === 1 ? " 'taIm ]" : " 'taImz ]")];
  const hpV = n => n === 2 ? ['2発', 'にはつ', 'two shots', "[ 'tu 'SAts ]"] : ['4発', 'よんぱつ', 'four shots', "[ 'fOr 'SAts ]"];
  const DN = [['練習', 'れんしゅう', 'Easy', "[ 'izi ]"], ['標準', 'ひょうじゅん', 'Normal', "[ 'nOrm@L ]"], ['鬼', 'おに', 'Hard', "[ 'hArd ]"], ['修羅', 'しゅら', 'Maniac', "[ 'meIni%{k ]"]];

  /* ---------- ゲームの HTML の画面（タイトル・結果）を、写した絵の上に描き直す。ゲームの CSS の大きさを、480×270 の目盛りにしたもの ---------- */
  const C = { void: '#07081a', panel: '#12143a', line: '#2a2e66', ink: '#ece9ff', dim: '#9b98cc', hot: '#ffab45', hotHi: '#ffe6ad', hotLo: '#b4410f', cool: '#6b77dd', coolHi: '#bcc3ff', coolLo: '#2c3378' };
  const DSEL = [['#62eeff', '#21707e'], ['#bcc3ff', '#6b77dd'], ['#ffab45', '#b4410f'], ['#ff5a7a', '#8c1d3a']];
  const FT = '"DotGothic16","Hiragino Kaku Gothic ProN","Yu Gothic",monospace';
  const LS = c => 'letterSpacing' in c;
  function tx(c, s, x, y, size, col, o) { o = o || {}; c.font = size + 'px ' + FT; c.fillStyle = col; c.textAlign = o.al || 'center'; c.textBaseline = 'middle'; if (LS(c)) c.letterSpacing = (o.ls || 0) * size + 'px'; c.fillText(s, x, y); if (LS(c)) c.letterSpacing = '0px'; }
  function tw(c, s, size, ls) { c.font = size + 'px ' + FT; if (LS(c)) c.letterSpacing = (ls || 0) * size + 'px'; const w = c.measureText(s).width; if (LS(c)) c.letterSpacing = '0px'; return w; }
  function stack(c, s, x, y, size, front, shades, ls) { for (const [o, col] of shades) tx(c, s, x + o * size, y - o * size, size, col, { ls }); tx(c, s, x, y, size, front, { ls }); }
  // いくつかの色の文字を、つないで真ん中にそろえる
  function runs(c, parts, cx, y, size, ls) { const ws = parts.map(q => tw(c, q[0], size, ls)), W = ws.reduce((a, b) => a + b, 0); let x = cx - W / 2; parts.forEach((q, i) => { tx(c, q[0], x, y, size, q[1], { al: 'left', ls }); x += ws[i]; }); }
  function wrap(c, s, size, maxW) {
    const W = tw(c, s, size); if (W <= maxW) return [s];
    const n = Math.ceil(W / maxW), tgt = W / n * 1.04, out = []; let line = '';
    for (const ch of s) { if (tw(c, line + ch, size) > tgt && line && !/[、。」）…]/.test(ch)) { out.push(line); line = ch; } else line += ch; }
    if (line) out.push(line); return out;
  }
  function btnW(c, label, kbd, size) { return tw(c, label, size) + .6 * size + tw(c, kbd, size * .66) + size * .66 * .9 + 2.5 * size; }
  function btn(c, label, kbd, cx, cy, size, hot, pressed) {
    const bw = btnW(c, label, kbd, size), bh = size * 2.1, bx = cx - bw / 2, by = cy - bh / 2, off = pressed ? .2 * size : 0, ink = hot ? C.void : C.ink;
    if (!pressed) { c.fillStyle = hot ? C.hotLo : C.line; c.fillRect(bx + .2 * size, by - .2 * size, bw, bh); }
    c.fillStyle = hot ? (pressed ? C.hotHi : C.hot) : C.panel; c.fillRect(bx + off, by - off, bw, bh);
    if (!hot) { c.strokeStyle = C.line; c.lineWidth = 1; c.strokeRect(bx + off + .5, by - off + .5, bw - 1, bh - 1); }
    let x0 = bx + off + 1.25 * size; tx(c, label, x0, cy - off, size, ink, { al: 'left' }); x0 += tw(c, label, size) + .6 * size;
    const ks = size * .66, kw = tw(c, kbd, ks) + ks * .9; c.globalAlpha = .75; c.strokeStyle = ink; c.lineWidth = .7; c.strokeRect(x0, cy - off - ks * .68, kw, ks * 1.36); tx(c, kbd, x0 + kw / 2, cy - off, ks, ink); c.globalAlpha = 1;
  }

  Jikkyo.play({
    id: 'sekisou',
    title: '【積層宙域】積もっていくキューブの中を、生き残る',
    short: '積層宙域',
    blurb: '右から来るキューブをよけ続ける。いくつかは突っ込んでくる',
    tags: ['自作ゲーム', 'シューティング', '難易度4つ'],
    game: 'games/sekisou.html',
    character: 'tsumugi',
    minutes: 8,
    endDelay: 14,
    source: SEKISOU.source,
    canvases: g => [g.doc.getElementById('cv')],
    setup(g) {
      this._g = g; const I = g.win.__sk; if (!I) return;
      // 配信の絵には、ゲームの画面だけを大きく写す（下の操作の説明と、画面のパッドは消す）。音を切ってあったら、戻す
      try { const bar = g.doc.getElementById('bar'); if (bar) bar.style.display = 'none'; I.setPad(false); I.layout(); if (I.muted) I.toggleMute(); } catch (e) { console.error(e); }
      try { document.fonts && document.fonts.load('16px "DotGothic16"'); } catch (e) {}
    },

    overlay(ctx, x, y, w, h) {
      const g = this._g; if (!g || !g.doc) return; const d = g.doc, oT = d.getElementById('ovTitle'), oR = d.getElementById('ovResult');
      const tOn = oT && !oT.hidden, rOn = oR && !oR.hidden; if (!tOn && !rOn) return;
      const now = performance.now() / 1000, fl = k => !!(this._fl && this._fl.k === k && now - this._fl.t < .32);
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.translate(x, y); ctx.scale(w / 480, h / 270);
      const gr = ctx.createRadialGradient(240, 135, 0, 240, 135, 290); gr.addColorStop(0, 'rgba(7,8,26,.5)'); gr.addColorStop(1, 'rgba(7,8,26,.9)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, 480, 270);
      if (tOn) {
        let yy = 20;
        stack(ctx, '積層宙域', 240, yy + 22, 43, C.ink, [[.12, C.coolLo], [.09, C.coolLo], [.06, C.cool], [.03, C.coolHi]], .08); yy += 51;
        const lead = ((d.querySelector('#ovTitle .lead') || {}).textContent || '').trim();
        for (const L of wrap(ctx, lead, 9.6, 365)) { tx(ctx, L, 240, yy + 8, 9.6, C.ink); yy += 15.8; } yy += 6;
        const bs = [...d.querySelectorAll('#ovTitle .diff')], bw = 48.4, gap = 6.7, bh = 29; let bx = 240 - (bs.length * bw + (bs.length - 1) * gap) / 2; const by = yy + 1;
        bs.forEach((b, i) => {
          const on = b.getAttribute('aria-checked') === 'true', [sel, lo] = DSEL[i] || DSEL[1], f = fl('diff' + i);
          ctx.fillStyle = on ? lo : C.line; ctx.fillRect(bx + 1.8, by - 1.8, bw, bh);
          ctx.fillStyle = on ? (f ? '#ffffff' : sel) : C.panel; ctx.fillRect(bx, by, bw, bh);
          if (!on) { ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.strokeRect(bx + .5, by + .5, bw - 1, bh - 1); }
          tx(ctx, (b.querySelector('.dn') || {}).textContent || '', bx + bw / 2, by + 11.5, 11, on ? C.void : C.ink);
          tx(ctx, (b.querySelector('.de') || {}).textContent || '', bx + bw / 2, by + 22.5, 5.5, on ? 'rgba(7,8,26,.75)' : C.dim, { ls: .22 });
          bx += bw + gap;
        });
        yy = by + bh + 7;
        const T = id => ((d.getElementById(id) || {}).textContent || '');
        runs(ctx, [['急襲の数 ', C.dim], [T('dNum'), C.ink], ['　急襲の速さ ', C.dim], [T('dSpd'), C.ink], ['　予兆 ', C.dim], [T('dTele'), C.ink]], 240, yy + 7, 8.4);
        tx(ctx, T('dRule'), 240, yy + 21, 8.4, C.dim); yy += 35;
        btn(ctx, 'はじめる', 'Enter', 240, yy + 13, 12.5, true, fl('start')); yy += 32;
        runs(ctx, [['HI-SCORE ', C.dim], [T('bestTitle'), C.ink]], 240, yy + 6, 8.4, .14);
      } else {
        const T = id => ((d.getElementById(id) || {}).textContent || ''), clear = (d.getElementById('resTitle') || { classList: { contains: () => false } }).classList.contains('clear');
        const isNew = !(d.getElementById('resNew') || {}).hidden, stat = wrap(ctx, T('resStat'), 8.4, 336);
        const H = 35.3 + 19.6 + 12.7 + stat.length * 13.4 + 30 + 4 * 6; let yy = (270 - H) / 2;
        if (clear) stack(ctx, T('resTitle'), 240, yy + 17, 33.6, C.hotHi, [[.09, C.hotLo], [.06, C.hotLo], [.03, C.hot]], .1);
        else stack(ctx, T('resTitle'), 240, yy + 17, 33.6, C.ink, [[.09, C.coolLo], [.06, C.cool], [.03, C.coolHi]], .1);
        yy += 35.3 + 6;
        runs(ctx, [['SCORE ', C.ink], [T('finalScore'), C.hotHi]], 240, yy + 10, 16.3, .12); yy += 19.6 + 6;
        if (isNew) tx(ctx, 'ハイスコア更新', 240, yy + 6, 10.6, C.hot, { ls: .1 }); else runs(ctx, [['HI-SCORE ', C.dim], [T('resBestVal'), C.ink]], 240, yy + 6, 8.4, .14);
        yy += 12.7 + 6;
        for (const L of stat) { tx(ctx, L, 240, yy + 7, 8.4, C.dim); yy += 13.4; } yy += 6;
        const w1 = btnW(ctx, 'もう一度', 'Enter', 12.5), w2 = btnW(ctx, '難易度を選ぶ', 'Esc', 12.5), x1 = 240 - (w1 + w2 + 9.6) / 2;
        btn(ctx, 'もう一度', 'Enter', x1 + w1 / 2, yy + 15, 12.5, true, fl('retry'));
        btn(ctx, '難易度を選ぶ', 'Esc', x1 + w1 + 9.6 + w2 / 2, yy + 15, 12.5, false, fl('menu'));
      }
      ctx.restore();
    },
    press(k, id) { this._fl = { k, t: performance.now() / 1000 }; try { const b = this._g.doc.getElementById(id); if (b) b.click(); } catch (e) { console.error(e); } },

    start(g, J) {
      const I = g.win.__sk; this._I = I; this._J = J;
      this._F = { stage: 'title', runs: [], next: 1, want: null, att: [0, 0, 0, 0], sel: null, rules: 0, final: false };
      this._E = { mode: I ? I.mode : 'attract', dash: new WeakMap(), live: new Set(), nd: 0 };
      this._bot = I ? SEKISOU.mkBot(I, { talking: () => J.talking() }) : null;
      J.phase('title'); J.mood('smile');
    },
    end() { return !!(this._F && this._F.final); },

    /* ---------- 毎こま ---------- */
    step(g, dt, t, J) {
      const I = g.win.__sk, F = this._F; if (!I || !F) return; this._t = t; this._I = I;
      if (I.paused) I.setPause(false);                         // タブが隠れて止まったら、戻す
      this._bot.update(dt, t);
      this.watch(I, t, J);
      this.flow(I, t, J, g);
    },
    quietNow(J) { return !J.speaking() && !J.zatsu.busy(); },
    // 難易度を選ぶ：はじめは4つを順に見てから。2回目からは、いまのところから一つずつ
    choose(I, t, J, target) {
      const F = this._F, first = !F.runs.length, list = [];
      if (first) { list.push(0, 1, 2, 3, target); J.emit('diff_look'); }
      else { let i = I.diffIdx; while (i !== target) { i += Math.sign(target - i); list.push(i); } if (!list.length) list.push(target); }
      F.sel = { list, i: 0, at: t + (first ? 1.2 : .5), target, gap: first ? 1.1 : .75, picked: false };
    },
    selTick(I, t, J) {
      const F = this._F, S = F.sel; if (!S || t < S.at) return;
      if (S.i < S.list.length) { const k = S.list[S.i++]; I.selectDiff(k); this._fl = { k: 'diff' + k, t: performance.now() / 1000 }; S.at = t + S.gap; return; }
      if (!S.picked) {
        S.picked = true; const vars = { d: DN[S.target], sec: secV(I.DIFFS[S.target].dur) };
        J.emit(!F.runs.length ? 'pick_first' : S.target === 3 ? 'pick_maniac' : 'pick_up', { vars }); S.at = t + 4.5; return;
      }
      if (J.speaking() && t < S.at + 6) return;
      this.begin(I, t, J, S.target, () => this.press('start', 'btnStart')); F.sel = null;
    },
    begin(I, t, J, d, press) {
      const F = this._F, prev = (I.bests || {})[I.DIFFS[d].id] || 0; press(); F.stage = 'play'; F.cur = { d, t0: t, prev }; F.att[d]++; this._bot.newRun(d, F.att[d]); J.phase('play'); J.mood('focus');
    },
    flow(I, t, J, g) {
      const F = this._F, oR = g.doc.getElementById('ovResult');
      if (F.stage === 'title') {
        if (!F.rules) { if (t >= 27 && this.quietNow(J)) { F.rules = t; J.emit('rules'); J.later(6, () => J.emit('rules2')); } return; }
        if (!F.sel && t >= F.rules + 13 && this.quietNow(J)) this.choose(I, t, J, F.next);
        this.selTick(I, t, J);
      } else if (F.stage === 'menu') {
        if (!F.sel && t >= F.menuAt + 1.8 && !J.speaking()) this.choose(I, t, J, F.next);
        this.selTick(I, t, J);
      } else if (F.stage === 'play') {
        if (I.mode === 'over' || I.mode === 'clear') F.stage = 'ending';
      } else if (F.stage === 'ending') {
        if (oR && !oR.hidden) { F.stage = 'result'; F.resAt = t; F.zq = false; this.onResult(I, t, J); }
      } else if (F.stage === 'result') {
        if (t < F.resAt + 7 || !this.quietNow(J)) return;
        // ひと息の雑談（1回目と3回目のあと）
        if (!F.zq && F.runs.length % 2 === 1 && t < 400) { F.zq = true; const b = J.zatsu.pick('mid'); if (b) { J.zatsu.queue(b, this.zv()); return; } }
        this.next(I, t, J);
      }
    },
    onResult(I, t, J) {
      const F = this._F, r = I.result || {}, d = F.cur ? F.cur.d : I.diffIdx, el = I.DIFFS[d].dur - (r.remain || 0);
      F.runs.push({ d, cleared: !!r.cleared, score: r.score || 0, el });
      const vars = { sc: ptV(r.score || 0), dg: kaiV(r.dodged || 0), d: DN[d] };
      J.phase('result'); J.mood(r.cleared ? 'smile' : 'neutral');
      J.later(1.2, () => J.emit(r.isNew && r.score > 0 && F.cur && F.cur.prev > 0 ? 'result_new' : !r.cleared && el < 22 ? 'result_bad' : 'result', { vars }));
    },
    // 次をどうするか：クリアしたら一段上げる。だめなら、同じのをもう一回（2回まで）。最後に修羅。時間が来たら、おわり
    next(I, t, J) {
      const F = this._F, last = F.runs[F.runs.length - 1], nM = F.runs.filter(r => r.d === 3).length;
      // 修羅をまだ遊んでいなければ、少し延ばしてでも1回は遊ぶ（「修羅いける？」に応えたあとも）
      let final = F.runs.length >= 6 || (t > 500 && (nM >= 1 || t > 560)) || (nM >= 1 && (t > 420 || nM >= 2)) || (last.d === 3 && last.cleared), nd = last.d;
      if (!final) {
        if (F.want != null && F.want !== last.d) nd = F.want;
        else if (last.cleared) nd = Math.min(3, last.d + 1);
        else nd = F.att[last.d] < 2 ? last.d : Math.min(3, last.d + 1);
        if (t > 320 && nd < 3 && !nM) nd = 3;                       // 時間がないので、最後は修羅
      }
      F.want = null;
      if (final) {
        F.stage = 'end'; F.final = true; J.emit('final'); J.phase('late'); J.mood('smile');
        J.later(5, () => this.press('menu', 'btnMenu')); J.later(8, () => J.emit('bye'));
        return;
      }
      if (nd === last.d) { F.stage = 'wait'; J.emit('again', { vars: { d: DN[nd] } }); J.later(3.4, () => this.begin(I, this._t, J, nd, () => this.press('retry', 'btnRetry'))); }
      else { F.stage = 'menu'; F.menuAt = t; F.next = nd; this.press('menu', 'btnMenu'); J.phase('title'); }
    },
    zv() { const F = this._F || { runs: [] }, b = F.runs.reduce((a, r) => Math.max(a, r.score), 0); return { best: ptV(b), maniac: F.runs.some(r => r.d === 3), hardClear: F.runs.some(r => r.d === 2 && r.cleared) }; },

    /* ---------- 出来事の見張り ---------- */
    watch(I, t, J) {
      const E = this._E, F = this._F, D = I.D, p = I.p;
      if (I.mode !== E.mode) {
        E.mode = I.mode;
        if (I.mode === 'play') {
          Object.assign(E, { dead: false, closes: 0, breaks: 0, broke: 0, p1: 0, p2: 0, half: 0, l10: 0, tightT: 0, dash: new WeakMap(), nd: 0, nf: 0, prev: new Map(), nst: I.stuck.length }); E.live.clear(); J.emit('go');
          // 壊れない難易度：はじめての回は、壊れないと気づくまで撃ってしまう
          if (this._bot) this._bot.B.wise = !(D.hp === 0 && !F.nobreak);
        }
        else if (I.mode === 'over') J.emit('over');
        else if (I.mode === 'clear') J.emit('clear');
      }
      if (I.mode !== 'play') return;
      // やられた・戻った
      if (p.dead && !E.dead) { let dash = false; for (const k of I.cubes) if (k.st === 'dash' && Math.hypot(k.x - p.x, k.y - p.y) < 34) dash = true; if (I.lives > 0) J.emit(dash && R() < .6 ? 'down_dash' : 'down'); }
      if (!p.dead && E.dead && I.lives > 0) J.emit(I.lives === 1 ? 'last_life' : 'respawn');
      E.dead = p.dead;
      // 急襲：赤くなったとき・すぐそばをかすめたとき・二つ同時
      let nd = 0;
      for (const k of I.cubes) {
        if (k.st !== 'dash') continue; nd++;
        let r = E.dash.get(k); const dd = Math.hypot(k.x - p.x, k.y - p.y);
        if (!r) { r = { min: 1e9, tx: p.x, ty: p.y, d0: dd, mt: 1e9 }; E.dash.set(k, r); E.live.add(k); if (dd < 170 && !p.dead && t - (E.dashAt || -99) > 6) { E.dashAt = t; J.emit('dash'); } }
        r.min = Math.min(r.min, dd); r.mt = Math.min(r.mt, Math.hypot(k.x - r.tx, k.y - r.ty));   // 突っ込みはじめたときに自機がいたところへ、どこまで来たか
      }
      for (const k of [...E.live]) if (k.st !== 'dash' || !I.cubes.includes(k)) {
        const r = E.dash.get(k); E.live.delete(k); if (!r || p.dead) continue;
        if (r.min < 22) J.emit('near');
        // 誘導：さっきまで自機がいたところへ突っ込んで、自機からは離れて外れた
        else if (r.d0 < 170 && r.mt < 14 && t - (E.lureAt || -99) > 25) { E.lureAt = t; J.emit('lured'); }
      }
      if (nd >= 2 && E.nd < 2 && t - (E.dblAt || -99) > 20) { E.dblAt = t; J.emit('double'); } E.nd = nd;
      // 点・壊す・積もる
      if (I.closes > E.closes) J.emit('close'); E.closes = I.closes;
      if (I.breaks > E.breaks && !E.broke) { E.broke = 1; J.emit('break'); } E.breaks = I.breaks;
      if (!F.noshoot && I.elapsed > 2.2) { F.noshoot = 1; J.emit('noshoot'); }
      if (D.hp === 0 && !F.nobreak && I.elapsed > 9) { F.nobreak = 1; J.emit('nobreak'); }
      this.watchWall(I, t, J);
      if (!F.stick && I.stuck.length > 0) { F.stick = 1; J.later(.6, () => J.emit('first_stick')); }
      if (!E.p1 && I.stuck.length > 55) { E.p1 = 1; J.emit('pile1'); }
      if (!E.p2 && I.stuck.length > 100) { E.p2 = 1; J.emit('pile2'); }
      // せまい：まわりの空きが、しばらく狭い
      if (!p.dead) {
        const K = I.K; let clr = Math.min(p.y - K.TOP, K.BOT - p.y, 40);
        I.forNear(p.x - 40, p.y - 40, p.x + 40, p.y + 40, s => { const e = Math.hypot(s.x - p.x, s.y - p.y) - 9; if (e < clr) clr = e; });
        if (clr < 16) { if (!E.tightT) E.tightT = t; else if (t - E.tightT > 1.2) { E.tightT = 0; J.emit('tight'); } } else E.tightT = 0;
      }
      if (!E.half && I.elapsed >= D.dur / 2) { E.half = 1; J.emit('half'); }
      if (!E.l10 && D.dur - I.elapsed <= 10) { E.l10 = 1; J.emit('last10'); }
      J.mood(p.dead ? 'sad' : nd ? 'surprise' : 'focus');
    },

    // 壁と撃ち分け：前の積もったものが、こちらへ来るキューブを止めた／前のを撃たずにおく／せまくて掘る／陰に入っている
    watchWall(I, t, J) {
      const E = this._E, p = I.p, B = this._bot && this._bot.B; if (!B) return;
      if (I.stuck.length > E.nst && !p.dead) {
        for (let j = E.nst; j < I.stuck.length; j++) {
          const s = I.stuck[j], ahead = s.x - p.x; if (ahead < 4 || ahead > 80) continue;
          let k = null, bd = 30; for (const [kk, v] of E.prev) { const d2 = Math.hypot(v.x - s.x, v.y - s.y); if (d2 < bd && !I.cubes.includes(kk)) { bd = d2; k = v; } }
          if (!k || s.y < I.K.TOP + 6 || s.y > I.K.BOT - 6) continue;
          let at = k.st === 'fly' && Math.abs(s.y - p.y) < 13;
          if (k.st === 'dash') { const ux = p.x - s.x, uy = p.y - s.y; at = (ux * k.vx + uy * k.vy) / ((Math.hypot(ux, uy) * Math.hypot(k.vx, k.vy)) || 1) > .9; }
          if (at && t - (E.svAt || -99) > 30) { E.svAt = t; J.emit('saved'); break; }
        }
      }
      E.nst = I.stuck.length; E.prev.clear(); for (const k of I.cubes) E.prev.set(k, { x: k.x, y: k.y, st: k.st, vx: k.vx, vy: k.vy });
      if (p.dead) return;
      if (B.holdT > .8 && t - (E.hfAt || -99) > 60) { E.hfAt = t; J.emit('holdfire'); }
      if (B.digNow && t - (E.dgAt || -99) > 40) { E.dgAt = t; J.emit('dig'); }
      if (B.shelT > 1.5 && t - (E.shAt || -99) > 45) { E.shAt = t; J.emit('shelter'); }
    },

    /* ---------- セリフ ---------- */
    script: [[1.2, 'hello'], [7.5, 'about']],
    lines: {
      hello: { p: 3, say: [
        { t: 'こんばんは〜。今夜はちょっと、手が忙しい配信です。', k: 'こんばんわ〜。こんやわ ちょっと、てが いそがしい はいしんです。', m: 'smile', g: 'nod', cam: true },
        { t: 'みんな、こんばんは。今日はシューティングだよ。', k: 'みんな、こんばんわ。きょうわ しゅーてぃんぐ だよ。', m: 'smile', g: 'cheer', cam: true }] },
      about: { p: 2, say: [{ t: '今日は「積層宙域」。飛んでくる四角を、よけ続けるの。', k: 'きょうわ せきそう ちゅういき。とんで くる しかくを、よけ つづけるの。', m: 'smile', g: 'declare', cam: true }] },
      rules: { p: 2, say: [
        { t: 'キューブは、何かに触れると、その向きのまま固まって積もっていくんだって。', k: 'きゅーぶわ、なにかに ふれると、その むきの まま かたまって つもって いくんだって。', m: 'focus', g: 'look' },
        { t: '触れたら、その向きのまま固まるの。積み木みたいだね。', k: 'ふれたら、その むきの まま かたまるの。つみき みたいだね。', m: 'smile', g: 'look' }] },
      rules2: { p: 2, say: [{ t: 'それと、いくつかは急にこっちへ突っ込んでくるって…。', k: 'それと、いくつかわ きゅうに こっちえ つっこんで くるって…。', m: 'surprise', g: 'hesitate' }] },
      diff_look: { p: 2, say: [{ t: '練習、標準、鬼、修羅…名前がだんだん物騒になる。', k: 'れんしゅう、ひょうじゅん、おに、しゅら… なまえが だんだん ぶっそうに なる。', m: 'surprise', g: 'look' }] },
      pick_first: { p: 3, say: [{ t: 'まずは{d}でいくね。{sec}、生き残るだけ。', k: 'まずわ {d}で いくね。{sec}、いきのこる だけ。', m: 'proud', g: 'declare', cam: true }] },
      pick_up: { p: 3, say: [
        { t: '次は{d}にしてみる。…名前からして、こわいね。', k: 'つぎわ {d}に して みる。 …なまえから して、こわいね。', m: 'focus', g: 'declare' },
        { t: '{d}、いってみるね。{sec}…長いなあ。', k: '{d}、いって みるね。{sec}… ながいなあ。', m: 'focus', g: 'think' }] },
      pick_maniac: { p: 3, say: [{ t: '最後は{d}。…せっかくだから、挑んでみるね。', k: 'さいごわ {d}。 …せっかく だから、いどんで みるね。', m: 'proud', g: 'declare', cam: true }] },
      again: { p: 3, say: [
        { t: 'もう一回、{d}で。今度こそ。', k: 'もう いっかい、{d}で。こんどこそ。', m: 'focus', g: 'declare' },
        { t: 'くやしいから、同じのでもう一回。', k: 'くやしいから、おなじので もう いっかい。', m: 'focus', g: 'declare' }] },
      go: { p: 2, cd: 4, say: [
        { t: 'いきます。', k: 'いきます。', m: 'focus', g: 'declare' },
        { t: 'よーし、はじめるね。', k: 'よーし、はじめるね。', m: 'focus', g: 'nod' }] },
      first_stick: { p: 2, say: [{ t: 'あ、くっついた。ほんとに、そのまま固まるんだ。', k: 'あ、くっついた。ほんとに、そのまま かたまるんだ。', m: 'surprise', g: 'look' }] },
      dash: { p: 2, cd: 12, ch: .7, say: [
        { t: '赤いの来た！', k: 'あかいの きた！', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: 'わっ、こっち来る！', k: 'わっ、こっち くる！', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: '突っ込んでくる…！', k: 'つっこんで くる…！', m: 'surprise', g: 'recoil' }] },
      double: { p: 3, cd: 30, say: [{ t: '二つ同時！？', k: 'ふたつ どうじ！？', m: 'surprise', g: 'recoil', st: 'panic' }] },
      near: { p: 2, cd: 16, ch: .8, say: [
        { t: 'あぶなっ…！', k: 'あぶなっ…！', m: 'surprise', g: 'recoil' },
        { t: '今の、かすった…？', k: 'いまの、かすった…？', m: 'surprise', g: 'look' },
        { t: 'セーフ、セーフ…。', k: 'せーふ、せーふ…。', m: 'smile', g: 'settle' }] },
      close: { p: 1, cd: 40, ch: .7, say: [{ t: 'クローズって出た。ぎりぎりで固まると、点が入るみたい。', k: 'くろーずって でた。ぎりぎりで かたまると、てんが はいる みたい。', m: 'smile', g: 'look' }] },
      noshoot: { p: 3, say: [{ t: '今日は撃たないでいくね。飛んでるのには効かないし。', k: 'きょうわ うたないで いくね。とんでるのにわ きかないし。', m: 'focus', g: 'declare' }] },
      lured: { p: 2, cd: 25, ch: .8, say: [
        { t: 'ほら、さっきいたところに突っ込んでった。', k: 'ほら、さっき いた ところに つっこんで った。', m: 'proud', g: 'look' },
        { t: '引きつけて、横にずれる。', k: 'ひきつけて、よこに ずれる。', m: 'focus', g: 'nod' },
        { t: 'よし、流れた。', k: 'よし、ながれた。', m: 'smile', g: 'nod' }] },
      saved: { p: 2, cd: 30, say: [
        { t: '前のに当たって止まった。助かった…。', k: 'まえのに あたって とまった。たすかった…。', m: 'surprise', g: 'look' },
        { t: '積もったのが、盾になってくれた。', k: 'つもったのが、たてに なって くれた。', m: 'smile', g: 'nod' }] },
      holdfire: { p: 1, cd: 60, ch: .8, say: [{ t: '前のは撃たないでおく。盾になってくれるから。', k: 'まえのわ うたないで おく。たてに なって くれるから。', m: 'focus', g: 'think' }] },
      dig: { p: 1, cd: 40, ch: .8, say: [{ t: 'せまい…ちょっと掘る！', k: 'せまい… ちょっと ほる！', m: 'focus', g: 'declare' }] },
      shelter: { p: 1, cd: 45, ch: .7, say: [{ t: 'ここ、前に積もったのがあって、ちょっと安全。', k: 'ここ、まえに つもったのが あって、ちょっと あんぜん。', m: 'focus', g: 'look' }] },
      break: { p: 2, cd: 60, say: [{ t: 'あ、崩れた。撃つと壊せるんだね。', k: 'あ、くずれた。うつと こわせるんだね。', m: 'smile', g: 'nod' }] },
      nobreak: { p: 2, say: [{ t: '鬼だと、積もったのは撃っても壊れないんだって。', k: 'おにだと、つもったのわ うっても こわれないんだって。', m: 'focus', g: 'look' }] },
      pile1: { p: 1, ch: .8, say: [
        { t: 'だいぶ積もってきた…。左のほう、もう壁みたい。', k: 'だいぶ つもって きた…。ひだりの ほう、もう かべ みたい。', m: 'focus', g: 'look' },
        { t: '積み木みたい。…いい色。', k: 'つみき みたい。 …いい いろ。', m: 'smile', g: 'look' }] },
      pile2: { p: 2, say: [{ t: 'せまい、せまい…。逃げるところ、なくなってきた。', k: 'せまい、せまい…。にげる ところ、なく なって きた。', m: 'sad', g: 'hesitate' }] },
      tight: { p: 2, cd: 25, ch: .8, say: [
        { t: '逃げ場がない〜。', k: 'にげばが ない〜。', m: 'sad', g: 'recoil', st: 'panic' },
        { t: 'はさまれちゃう…！', k: 'はさまれちゃう…！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      half: { p: 1, ch: .8, say: [
        { t: '半分。…まだ半分なの。', k: 'はんぶん。 …まだ はんぶん なの。', m: 'focus', g: 'think' },
        { t: '折り返し。ここから増えるんだよね。', k: 'おりかえし。ここから ふえるんだよね。', m: 'focus', g: 'think' }] },
      last10: { p: 3, say: [
        { t: 'あと10秒！', k: 'あと じゅうびょう！', m: 'focus', g: 'declare', st: 'panic' },
        { t: 'ラスト10秒、がんばる…！', k: 'らすと じゅうびょう、がんばる…！', m: 'focus', g: 'declare' }] },
      down: { p: 3, say: [
        { t: 'あっ…やられた。', k: 'あっ… やられた。', m: 'sad', g: 'recoil' },
        { t: 'うそ、当たった…！', k: 'うそ、あたった…！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      down_dash: { p: 3, say: [
        { t: '急に来るの、ずるい〜。', k: 'きゅうに くるの、ずるい〜。', m: 'sad', g: 'sigh' },
        { t: '今の、見えなかった…。', k: 'いまの、みえなかった…。', m: 'sad', g: 'hesitate' }] },
      respawn: { p: 1, ch: .6, say: [{ t: 'まだ残機ある。落ちついて…。', k: 'まだ ざんき ある。おちついて…。', m: 'focus', g: 'settle' }] },
      last_life: { p: 2, say: [{ t: '残り1機…。もう失敗できない。', k: 'のこり いっき…。もう しっぱい できない。', m: 'focus', g: 'think' }] },
      clear: { p: 3, say: [
        { t: 'クリア！生き残った〜！', k: 'くりあ！ いきのこった〜！', m: 'smile', g: 'cheer', st: 'joy', cam: true },
        { t: 'やった、最後まで生き残れた…！', k: 'やった、さいごまで いきのこれた…！', m: 'smile', g: 'cheer', st: 'joy', cam: true }] },
      over: { p: 3, say: [
        { t: 'ゲームオーバー…。', k: 'げーむ おーばー…。', m: 'sad', g: 'sigh' },
        { t: 'あー、終わっちゃった。', k: 'あー、おわっちゃった。', m: 'sad', g: 'sigh' }] },
      result: { p: 2, say: [{ t: '{sc}。急襲を{dg}よけたって。', k: '{sc}。きゅうしゅうを {dg} よけたって。', m: 'smile', g: 'look', cam: true }] },
      result_new: { p: 3, say: [{ t: 'ハイスコア更新！{sc}。', k: 'はいすこあ こうしん！ {sc}。', m: 'proud', g: 'cheer', st: 'joy', cam: true }] },
      result_bad: { p: 2, say: [{ t: '{sc}…。まだ手が追いついてない。', k: '{sc}…。まだ てが おいついて ない。', m: 'sad', g: 'sigh' }] },
      final: { p: 3, say: [{ t: '今日はここまで。手がまだ、どきどきしてる。', k: 'きょうわ ここまで。てが まだ、どきどき してる。', m: 'smile', g: 'settle', cam: true }] },
      bye: { p: 3, say: [{ t: '見てくれてありがとう。おやすみなさい、またね。', k: 'みて くれて ありがとう。おやすみなさい、またね。', m: 'smile', g: 'nod', cam: true }] },
    },
    idle: { after: 16,
      say: [
        { t: '四角、きれいな色…よけるけど。', k: 'しかく、きれいな いろ… よけるけど。', m: 'focus' },
        { t: '手が汗ばんできた…。', k: 'てが あせばんで きた…。', m: 'sad' },
        { t: '右から来るのは平気。…急に来るのが、こわい。', k: 'みぎから くるのわ へいき。 …きゅうに くるのが、こわい。', m: 'focus' }],
      play: [
        { t: '四角、きれいな色…よけるけど。', k: 'しかく、きれいな いろ… よけるけど。', m: 'focus' },
        { t: '手が汗ばんできた…。', k: 'てが あせばんで きた…。', m: 'sad' },
        { t: '右から来るのは平気。…急に来るのが、こわい。', k: 'みぎから くるのわ へいき。 …きゅうに くるのが、こわい。', m: 'focus' },
        { t: '撃たないと、静かだね。…よけるのに集中できる。', k: 'うたないと、しずかだね。 …よけるのに しゅうちゅう できる。', m: 'focus' },
        { t: '動きすぎないように…。来たら、横にずれる。', k: 'うごきすぎない ように…。きたら、よこに ずれる。', m: 'focus' }],
      title: [{ t: '後ろで勝手に積もっていくの、見てて飽きないね。', k: 'うしろで かってに つもって いくの、みてて あきないね。', m: 'smile' }],
      result: [{ t: 'ふう…。ちょっと休憩。', k: 'ふう…。ちょっと きゅうけい。', m: 'smile', g: 'settle' }],
      late: [{ t: 'みんな、最後まで付き合ってくれてありがとう。', k: 'みんな、さいごまで つきあって くれて ありがとう。', m: 'smile', g: 'nod', cam: true }] },
    reply: [
      { t: '{name}さん、こんばんは〜。', k: '{name}さん、こんばんわ〜。', m: 'smile', g: 'nod', early: true, to: /こんばんは|わこつ|きたー|待ってた|初見/ },
      { t: '{name}さん、ありがとう。', k: '{name}さん、ありがとう。', m: 'smile', g: 'nod' },
      { t: '{name}さん、わかる〜。', k: '{name}さん、わかる〜。', m: 'smile', g: 'approve', to: /きれい|いい|すき|かわいい|すご|うまい|なめらか/ },
      { t: '{name}さん、こわいこと言わないで〜。', k: '{name}さん、こわい こと いわないで〜。', m: 'sad', g: 'hesitate', to: /来る|来た|赤|やば|ひえ|後ろ/ },
      { t: '{name}さん、がんばるね。', k: '{name}さん、がんばるね。', m: 'focus', g: 'nod', to: /がんば|いけ|耐え/ }],

    /* ---------- 掛け合い ---------- */
    talk: {
      every: [24, 40],
      items: [
        { q: '残り何秒？', when() { const I = this._I; return !!I && I.mode === 'play' && I.D.dur - I.elapsed > 14; }, vars() { const I = this._I; return { s: secV(I.D.dur - I.elapsed) }; },
          a: { t: '{name}さん、あと{s}！…長い〜。', k: '{name}さん、あと {s}！ …ながい〜。', m: 'focus', g: 'look' } },
        { q: '残機いくつ？', once: false, when() { const I = this._I; return !!I && I.mode === 'play' && !I.p.dead && I.lives >= 2; }, vars() { return { n: kiV(this._I.lives - 1) }; },
          a: { t: '{name}さん、あと{n}。大事に使うね。', k: '{name}さん、あと {n}。だいじに つかうね。', m: 'focus', g: 'nod' } },
        { q: 'スコアいくつ？', when() { const I = this._I; return !!I && I.mode === 'play' && I.elapsed > 15; }, vars() { return { sc: ptV(this._I.score) }; },
          a: { t: '{name}さん、いま{sc}！', k: '{name}さん、いま {sc}！', m: 'proud', g: 'nod' } },
        { q: '撃ったら壊せるの？', when() { const I = this._I; return !!I && I.mode === 'play' && I.D.hp > 0; }, vars() { return { n: hpV(this._I.D.hp) }; },
          a: { t: '{name}さん、うん、{n}で崩れるの。でも、盾になるから撃たないでおく。', k: '{name}さん、うん、{n}で くずれるの。でも、たてに なるから うたないで おく。', m: 'focus', g: 'nod' } },
        { q: '鬼でも壊せる？', when() { const I = this._I; return !!I && I.mode === 'play' && I.D.hp === 0; },
          a: { t: '{name}さん、鬼からは壊せないの。よけるだけ。', k: '{name}さん、おにからわ こわせないの。よける だけ。', m: 'sad', g: 'sigh' } },
        { q: '上に逃げて！', when() { const I = this._I; return !!I && I.mode === 'play' && I.p.y > 120; }, act() { this._bot && this._bot.up(3.5); },
          a: { t: '{name}さん、上ね。…あ、上も積もってる。', k: '{name}さん、うえね。 …あ、うえも つもってる。', m: 'surprise', g: 'look' } },
        { q: '下あいてるよ', when() { const I = this._I; return !!I && I.mode === 'play' && I.p.y < 150; }, act() { this._bot && this._bot.down(3.5); },
          a: { t: '{name}さん、ほんと？…下、いきます。', k: '{name}さん、ほんと？ …した、いきます。', m: 'focus', g: 'nod' } },
        { q: 'ぎりぎり狙って！', when() { const I = this._I; return !!I && I.mode === 'play' && I.elapsed > 10; }, act() { this._bot && this._bot.greedy(10); },
          a: { t: '{name}さん、ぎりぎり…こわいけど、やってみる。', k: '{name}さん、ぎりぎり… こわいけど、やって みる。', m: 'focus', g: 'declare' } },
        { q: '鬼やって！', when() { const F = this._F; return !!F && F.want == null && !F.final && F.runs.length >= 1 && Math.max(...F.runs.map(r => r.d), F.cur ? F.cur.d : 0) < 2; }, act() { if (this._F) this._F.want = 2; },
          a: { t: '{name}さん、鬼？…じゃあ、次は鬼にするね。', k: '{name}さん、おに？ …じゃあ、つぎわ おにに するね。', m: 'surprise', g: 'nod' } },
        { q: '修羅いける？', when() { const F = this._F; return !!F && F.want == null && !F.final && F.runs.some(r => r.d === 2) && !F.runs.some(r => r.d === 3) && !(F.cur && F.cur.d === 3); }, act() { if (this._F) this._F.want = 3; },
          a: { t: '{name}さん、修羅…みんなが言うなら、最後にやってみる。', k: '{name}さん、しゅら… みんなが いうなら、さいごに やって みる。', m: 'surprise', g: 'hesitate' } },
        { q: '練習からやったら？', when() { const F = this._F; return !!F && F.stage === 'title' && !F.runs.length && !F.sel; },
          a: { t: '{name}さん、練習も気になるけど…せっかくだから、標準から。', k: '{name}さん、れんしゅうも きに なるけど… せっかく だから、ひょうじゅんから。', m: 'smile', g: 'think' } },
        { q: 'キューブきれい', a: { t: '{name}さん、でしょ？固まると、だんだん青く冷えていくの。', k: '{name}さん、でしょ？ かたまると、だんだん あおく ひえて いくの。', m: 'smile', g: 'nod' } },
        { q: '何個積もってる？', when() { const I = this._I; return !!I && I.mode === 'play' && I.stuck.length > 20; }, vars() { return { n: koV(Math.round(this._I.stuck.length / 5) * 5) }; },
          a: { t: '{name}さん、えっと…{n}くらい。数えきれない。', k: '{name}さん、えっと… {n} くらい。かぞえきれない。', m: 'focus', g: 'look' } },
        { q: 'BGMいいね', a: { t: '{name}さん、わかる。この曲、文字で書いた楽譜から鳴ってるんだって。', k: '{name}さん、わかる。この きょく、もじで かいた がくふから なってるんだって。', m: 'smile', g: 'nod' } },
        { q: 'ハイスコアは？', when() { const I = this._I; return !!I && (I.bests[I.D.id] || 0) > 0; }, vars() { const I = this._I; return { d: DN[I.diffIdx], sc: ptV(I.bests[I.D.id] || 0) }; },
          a: { t: '{name}さん、{d}だと{sc}。', k: '{name}さん、{d}だと {sc}。', m: 'proud', g: 'nod' } },
        { q: '織物っぽい', a: { t: '{name}さん、わかる？斜めに重なってるところ、ちょっと柄みたい。', k: '{name}さん、わかる？ ななめに かさなってる ところ、ちょっと がら みたい。', m: 'smile', g: 'nod' } },
        { q: '手元見せて', a: { t: '{name}さん、手元は恥ずかしいから、だめ〜。', k: '{name}さん、てもとわ はずかしいから、だめ〜。', m: 'smile', g: 'hesitate' } },
        { q: '初見です', when(g, t) { return t < 300; }, a: { t: '{name}さん、いらっしゃい。ゆっくりしていってね。', k: '{name}さん、いらっしゃい。ゆっくり して いってね。', m: 'smile', g: 'nod' } },
        { q: 'あんまり動かないね', when() { const I = this._I; return !!I && I.mode === 'play'; },
          a: { t: '{name}さん、動きすぎると、突っ込んでくるのが読めなくなるの。来たら、横にずれる。', k: '{name}さん、うごきすぎると、つっこんで くるのが よめなく なるの。きたら、よこに ずれる。', m: 'focus', g: 'think' } },
        { q: '壁の後ろに隠れたら？', when() { const I = this._I; return !!I && I.mode === 'play' && I.elapsed > 15; },
          a: { t: '{name}さん、やってみたの。床のを足がかりに積めるけど、なかなか高くならないんだ。', k: '{name}さん、やって みたの。ゆかのを あしがかりに つめるけど、なかなか たかく ならないんだ。', m: 'focus', g: 'think' } },
        { q: 'なんで撃たないの？', when() { const I = this._I; return !!I && I.mode === 'play' && I.elapsed > 8; },
          a: { t: '{name}さん、飛んでるのには効かないの。積もったのは、盾にとっておきたいし。', k: '{name}さん、とんでるのにわ きかないの。つもったのわ、たてに とって おきたいし。', m: 'focus', g: 'nod' } },
        { q: 'おつかれ！', when() { const F = this._F; return !!F && F.final; }, a: { t: '{name}さん、ありがとう。肩がかちかち。', k: '{name}さん、ありがとう。かたが かちかち。', m: 'smile', g: 'settle' } },
      ],
    },

    /* ---------- 雑談：この回だけの話と、終わったあとの振り返り（共通の話は zatsudan.js） ---------- */
    zatsu: {
      introAt: 14, every: [30, 46], firstTip: [60, 110], tipEvery: [100, 160], outro: 50,
      // 遊んでいる最中と、難易度を選んでいる最中は、雑談を始めない
      quiet() { const F = this._F; return !!F && ((F.stage === 'title' && !F.sel) || F.stage === 'result' || F.stage === 'end'); },
      vars() { return this.zv(); },
      bits: [
        { on: 'open mid', bit: [['c', 'ツムギさんゲームするの？'], ['s', { t: '{name}さん、たまにね。織り機の前にずっといると、指が別のことしたくなるの。', k: '{name}さん、たまにね。おりきの まえに ずっと いると、ゆびが べつの こと したく なるの。', m: 'smile', g: 'nod' }]] },
        { on: 'mid', bit: [['c', 'キューブの色、染めに使えそう'], ['s', { t: '{name}さん、ほんと。橙から青に冷えていくところ、藍の甕みたい。', k: '{name}さん、ほんと。だいだいから あおに ひえて いく ところ、あいの かめ みたい。', m: 'smile', g: 'look' }]] },
        { on: 'mid', bit: [['c', 'シューティング得意？'], ['s', { t: '{name}さん、ぜんぜん。でも、よけるのは少し好き。', k: '{name}さん、ぜんぜん。でも、よけるのわ すこし すき。', m: 'smile', g: 'hesitate' }],
          ['c2', 'よけ方うまいよ'], ['s', { t: '{name2}さん、ありがとう。動きすぎないようにしてるの。', k: '{name2}さん、ありがとう。うごきすぎない ように してるの。', m: 'smile', g: 'nod' }]] },
        { on: 'mid', bit: [['c', '作戦あるの？'], ['s', { t: '{name}さん、近づきすぎないで、動きすぎないこと。来たら、横にずれるの。', k: '{name}さん、ちかづきすぎないで、うごきすぎない こと。きたら、よこに ずれるの。', m: 'smile', g: 'think' }],
          ['c2', '引きつけてちょん避けだ'], ['s', { t: '{name2}さん、それ。来るところが分かってれば、少しでいいの。', k: '{name2}さん、それ。くる ところが わかってれば、すこしで いいの。', m: 'smile', g: 'nod' }]] },
        { on: 'mid', bit: [['c', '積み木好きだった？'], ['s', { t: '{name}さん、好きだった。崩すほうが、もっと好きだったけど。', k: '{name}さん、すき だった。くずす ほうが、もっと すき だったけど。', m: 'smile', g: 'think' }]] },
      ],
      after: [
        [['c', 'どの難易度が一番たのしかった？'], ['s', { t: '{name}さん、鬼かな。こわいけど、いちばん手が覚えた。', k: '{name}さん、おにかな。こわいけど、いちばん てが おぼえた。', m: 'smile', g: 'think' }]],
        [['c', '修羅どうだった？'], ['s', { if: 'maniac', yes: { t: '{name}さん、画面が赤い四角だらけだった…。目が回った。', k: '{name}さん、がめんが あかい しかく だらけ だった…。めが まわった。', m: 'sad', g: 'sigh' },
          no: { t: '{name}さん、今日はたどりつけなかった。また今度ね。', k: '{name}さん、きょうわ たどりつけなかった。また こんどね。', m: 'smile', g: 'nod' } }]],
        [['c', '今日のベストスコアは？'], ['s', { t: '{name}さん、今日のいちばんは{best}。', k: '{name}さん、きょうの いちばんわ {best}。', m: 'proud', g: 'nod' }]],
      ],
    },

    /* ---------- 視聴者の書き込み（名前はすべて作りもの） ---------- */
    chat: {
      rate: 1,
      names: [['しらす', 'しらす'], ['こんぺいとう', 'こんぺいとう'], ['あおさ', 'あおさ'], ['ねこじた', 'ねこじた'], ['ゆずこしょう', 'ゆずこしょう'], ['もちこ', 'もちこ'], ['ひだまり', 'ひだまり'],
        ['つきみ', 'つきみ'], ['はなまる', 'はなまる'], ['くるみ', 'くるみ'], ['ゆきだるま', 'ゆきだるま'], ['あまぐり', 'あまぐり'], ['のりたま', 'のりたま'], ['まるた', 'まるた'], ['ほしくず', 'ほしくず'],
        ['すあま', 'すあま'], ['かぼす', 'かぼす'], ['しろくま', 'しろくま'], ['たまご焼き', 'たまごやき'], ['いりこ', 'いりこ'], ['おこげ', 'おこげ'], ['ちくわぶ', 'ちくわぶ'], ['はるさめ', 'はるさめ'],
        ['もずく', 'もずく'], ['なめこ', 'なめこ'], ['ぶらんこ', 'ぶらんこ'], ['きなこ', 'きなこ'], ['さざなみ', 'さざなみ']],
      base: ['こんばんは', 'わこつ', 'きたー', '待ってた', '初見です', '色きれい', 'キューブかわいい', 'BGMいい', '字幕ありがたい', 'ツムギさんのシューティング珍しい', '声おちつく', '作業用に見てる', 'ドットの字いいね'],
      title: ['どれにするの？', '修羅見たい', '練習からでいいよ', '後ろで勝手に積もってる', 'ロゴかっこいい', '難易度の名前こわい', 'ツムギさん、こんばんは', 'タイトル画面きれい', '説明読んだ', '急襲ってなに', '積もり方ランダムなんだ', 'ドットの字かわいい', 'わくわく', 'お茶用意した', 'ヘッドホンで聞いてる', '標準からかな'],
      play: ['よけろー', '赤いの来るぞ', 'うまい', '動きなめらか', '左つまってきた', 'がんばれ', 'ひえっ', '右から来てる', 'いけるいける', '手汗', '積もり方きれい', 'まだいける'],
      result: ['おつかれ', 'ナイス', '次は鬼？', '惜しい', 'もう一回！', 'スコアいいね', 'ひと休み', '見てて手に汗', 'いい動きだった', '肩まわして', '水分とって', 'すごかった', '積もった形きれい', '次いこう'],
      late: ['おつかれさま', 'おやすみ〜', '楽しかった', '修羅えぐかった', 'また見に来る', 'ありがとう'],
      on: {
        dash: ['赤！', '来た来た', 'よけて！'], double: ['二つ！？', 'やばい'], near: ['あぶな', 'セーフ', 'ナイスよけ'], down: ['あっ', 'ドンマイ', 'おしい'], down_dash: ['急襲ずるい', 'あれは無理', 'ドンマイ'],
        last_life: ['ラスト1機', '慎重に'], clear: ['888', 'クリアおめ！', 'すごい！', '生き残った！'], over: ['ドンマイ', 'おつかれ', '惜しい'], result_new: ['ハイスコア！', 'おめでとう', '888'],
        last10: ['あと10秒！', 'いけー！', '耐えて'], first_stick: ['くっついた', '固まった'], break: ['崩れた', '壊せるんだ'], nobreak: ['鬼は壊せないのか', 'よけるしかない'], pile2: ['せまい', '壁できてる'],
        tight: ['はさまれる', '逃げて'], pick_first: ['標準から', 'がんばれ〜'], pick_up: ['鬼きた', 'こわい', 'がんばれ'], pick_maniac: ['修羅！', '見たかった', 'がんばれ'], again: ['リベンジ', 'がんばれ'],
        go: ['がんばれ', 'いけー'], close: ['CLOSE！', 'ぎりぎり'], lured: ['誘導うまい', '後ろに流れた', 'ナイス誘導'], saved: ['壁が守った', 'ナイス壁'],
        noshoot: ['撃たないんだ', '縛りプレイ？', '集中'], holdfire: ['盾にしてる', '頭いい'], dig: ['掘れ〜'], shelter: ['安全地帯'], half: ['半分', 'がんばれ'], diff_look: ['物騒', '修羅こわい'],
      },
    },
  });
})();

/* 英語で話す出演者（アオイ・レイ）のセリフ */
Jikkyo.english({ lines: {
  "今日は撃たないでいくね。飛んでるのには効かないし。": ["No shooting today. It doesn't work on the flying ones anyway.", "[ 'noU 'SutIN t@'deI. It 'dVz@nt 'w3k An D@ 'flaIIN 'wVnz 'Eni%weI. ]"],
  "引きつけて、横にずれる。": ["Let it come, then slip aside.", "[ 'lEt It 'kVm, 'DEn 'slIp @'saId. ]"],
  "鬼だと、積もったのは撃っても壊れないんだって。": ["On Hard, the pile won't break even if you shoot it.", "[ An 'hArd, D@ 'paIL 'woUnt 'breIk 'iv@n If ju 'Sut It. ]"],
  "撃たないと、静かだね。…よけるのに集中できる。": ["It's quiet without shooting. …I can focus on dodging.", "[ Its 'kwaI@t wI'DaUt 'SutIN. … aI k@n 'foUk@s An 'dAdZIN. ]"],
  "動きすぎないように…。来たら、横にずれる。": ["Don't move too much… When it comes, slip aside.", "[ 'doUnt 'muv 'tu 'mVtS… wEn It 'kVmz, 'slIp @'saId. ]"],
  "{name}さん、うん、{n}で崩れるの。でも、盾になるから撃たないでおく。": ["{name}-san, yeah, {n} and they crumble. But they're my shield, so I won't.", "{name}さん、[ 'jE@, ] {n} [ @nd DeI 'krVmb@L. bVt DEr maI 'SiLd, soU aI 'woUnt. ]"],
  "{name}さん、動きすぎると、突っ込んでくるのが読めなくなるの。来たら、横にずれる。": ["{name}-san, if I move too much, I can't read the rushes. When one comes, I slip aside.", "{name}さん、[ If aI 'muv 'tu 'mVtS, aI 'k{nt 'rid D@ 'rVSIz. wEn 'wVn 'kVmz, aI 'slIp @'saId. ]"],
  "{name}さん、やってみたの。床のを足がかりに積めるけど、なかなか高くならないんだ。": ["{name}-san, I tried. They stack on a floor foothold, but it barely grows.", "{name}さん、[ aI 'traId. DeI 'st{k An @ 'flOr 'fUt%hoULd, bVt It 'bEr%li 'groUz. ]"],
  "{name}さん、飛んでるのには効かないの。積もったのは、盾にとっておきたいし。": ["{name}-san, it doesn't work on flying ones. And I want to keep the pile as a shield.", "{name}さん、[ It 'dVz@nt 'w3k An 'flaIIN 'wVnz. @nd aI 'wAnt t@ 'kip D@ 'paIL @z @ 'SiLd. ]"],
  "{name2}さん、ありがとう。動きすぎないようにしてるの。": ["{name2}-san, thanks. I try not to move too much.", "{name2}さん、[ 'T{Nks. aI 'traI 'nAt t@ 'muv 'tu 'mVtS. ]"],
  "{name}さん、近づきすぎないで、動きすぎないこと。来たら、横にずれるの。": ["{name}-san, don't get too close, don't move too much. When one comes, slip aside.", "{name}さん、[ 'doUnt 'gEt 'tu 'kloUs, 'doUnt 'muv 'tu 'mVtS. wEn 'wVn 'kVmz, 'slIp @'saId. ]"],
  "{name2}さん、それ。来るところが分かってれば、少しでいいの。": ["{name2}-san, exactly. If you know where it's coming, a little is enough.", "{name2}さん、[ Ig'z{ktli. If ju 'noU wEr Its 'kVmIN, @ 'lIt@L Iz I'nVf. ]"],
  "こんばんは〜。今夜はちょっと、手が忙しい配信です。": ["Good evening! Tonight's stream keeps my hands a little busy.", "[ gUd 'ivnIN! t@'naIts 'strim 'kips maI 'h{ndz @ 'lIt@L 'bIzi. ]"],
  "みんな、こんばんは。今日はシューティングだよ。": ["Good evening, everyone. Today it's a shooter!", "[ gUd 'ivnIN, 'Evri%wVn. t@'deI Its @ 'Sut@r! ]"],
  "今日は「積層宙域」。飛んでくる四角を、よけ続けるの。": ["Today it's Sekisō Chūiki. You just keep dodging flying squares.", "[ t@'deI Its ] せきそう ちゅういき。[ ju 'dZVst 'kip 'dAdZIN 'flaIIN 'skwErz. ]"],
  "キューブは、何かに触れると、その向きのまま固まって積もっていくんだって。": ["When a cube touches anything, it freezes at that angle and piles up.", "[ wEn @ 'kjub 'tVtSIz 'Eni%TIN, It 'frizIz @t D{t '{Ng@L @nd 'paILz 'Vp. ]"],
  "触れたら、その向きのまま固まるの。積み木みたいだね。": ["Touch something and it freezes in place. Like building blocks.", "[ 'tVtS 'sVm%TIN @nd It 'frizIz In 'pleIs. laIk 'bILdIN 'blAks. ]"],
  "それと、いくつかは急にこっちへ突っ込んでくるって…。": ["And some of them suddenly rush at you, apparently…", "[ @nd 'sVm @v D@m 'sVd@nli 'rVS @t 'ju, @'p{r@ntli… ]"],
  "練習、標準、鬼、修羅…名前がだんだん物騒になる。": ["Easy, Normal, Hard, Maniac… the names keep getting scarier.", "[ 'izi, 'nOrm@L, 'hArd, 'meIni%{k… D@ 'neImz 'kip 'gEtIN 'skEri@r. ]"],
  "まずは{d}でいくね。{sec}、生き残るだけ。": ["Let's start with {d}. Just survive for {sec}.", "[ 'lEts 'stArt wID ] {d}。[ 'dZVst s@r'vaIv fOr ] {sec}。"],
  "次は{d}にしてみる。…名前からして、こわいね。": ["Next I'll try {d}. …Even the name is scary.", "[ 'nEkst aIL 'traI ] {d}。[ … 'iv@n D@ 'neIm Iz 'skEri. ]"],
  "{d}、いってみるね。{sec}…長いなあ。": ["Let's try {d}. {sec}… that's long.", "[ 'lEts 'traI ] {d}。{sec} [ … D{ts 'lON. ]"],
  "最後は{d}。…せっかくだから、挑んでみるね。": ["Last up is {d}. …Since we're here, I'll take it on.", "[ 'l{st 'Vp Iz ] {d}。[ … sIns wIr 'hIr, aIL 'teIk It 'An. ]"],
  "もう一回、{d}で。今度こそ。": ["One more time on {d}. This time for sure.", "[ 'wVn 'mOr 'taIm An ] {d}。[ 'DIs 'taIm fOr 'SUr. ]"],
  "くやしいから、同じのでもう一回。": ["That was frustrating. Same one, one more time.", "[ D{t w@z 'frVs%treItIN. 'seIm 'wVn, 'wVn 'mOr 'taIm. ]"],
  "いきます。": ["Here I go.", "[ 'hIr aI 'goU. ]"],
  "よーし、はじめるね。": ["Okay, starting now.", "[ oU'keI, 'stArtIN 'naU. ]"],
  "あ、くっついた。ほんとに、そのまま固まるんだ。": ["Oh, it stuck. It really does freeze right there.", "[ 'oU, It 'stVk. It 'rili dVz 'friz 'raIt 'DEr. ]"],
  "赤いの来た！": ["A red one's coming!", "[ @ 'rEd 'wVnz 'kVmIN! ]"],
  "わっ、こっち来る！": ["Whoa, it's coming at me!", "[ 'woU, Its 'kVmIN @t 'mi! ]"],
  "突っ込んでくる…！": ["It's charging in…!", "[ Its 'tSArdZIN 'In…! ]"],
  "二つ同時！？": ["Two at once!?", "[ 'tu @t 'wVns!? ]"],
  "あぶなっ…！": ["Too close…!", "[ 'tu 'kloUs…! ]"],
  "今の、かすった…？": ["Did that just graze me…?", "[ dId D{t 'dZVst 'greIz 'mi…? ]"],
  "セーフ、セーフ…。": ["Safe, safe…", "[ 'seIf, 'seIf… ]"],
  "クローズって出た。ぎりぎりで固まると、点が入るみたい。": ["It said CLOSE. You get points when one freezes right next to you.", "[ It 'sEd 'kloUs. ju 'gEt 'pOInts wEn 'wVn 'frizIz 'raIt 'nEkst t@ 'ju. ]"],
  "あ、崩れた。撃つと壊せるんだね。": ["Oh, it crumbled. So you can break them by shooting.", "[ 'oU, It 'krVmb@Ld. soU ju k@n 'breIk D@m baI 'SutIN. ]"],
  "だいぶ積もってきた…。左のほう、もう壁みたい。": ["It's really piling up… The left side is like a wall now.", "[ Its 'rili 'paILIN 'Vp… D@ 'lEft 'saId Iz laIk @ 'wOL 'naU. ]"],
  "積み木みたい。…いい色。": ["Like building blocks. …Pretty colors.", "[ laIk 'bILdIN 'blAks. … 'prIti 'kVl@rz. ]"],
  "せまい、せまい…。逃げるところ、なくなってきた。": ["Tight, so tight… I'm running out of room.", "[ 'taIt, soU 'taIt… aIm 'rVnIN 'aUt @v 'rum. ]"],
  "逃げ場がない〜。": ["Nowhere to go…", "[ 'noU%wEr t@ 'goU… ]"],
  "はさまれちゃう…！": ["I'm getting squeezed…!", "[ aIm 'gEtIN 'skwizd…! ]"],
  "半分。…まだ半分なの。": ["Halfway. …Only halfway.", "[ 'h{f'weI. … 'oUnli 'h{f'weI. ]"],
  "折り返し。ここから増えるんだよね。": ["Past halfway. It gets busier from here, right?", "[ 'p{st 'h{f'weI. It 'gEts 'bIzi@r fr@m 'hIr, 'raIt? ]"],
  "あと10秒！": ["Ten seconds left!", "[ 'tEn 'sEk@ndz 'lEft! ]"],
  "ラスト10秒、がんばる…！": ["Last ten seconds, hang in there…!", "[ 'l{st 'tEn 'sEk@ndz, 'h{N In 'DEr…! ]"],
  "あっ…やられた。": ["Ah… got hit.", "[ 'A… 'gAt 'hIt. ]"],
  "うそ、当たった…！": ["No way, it hit me…!", "[ 'noU 'weI, It 'hIt 'mi…! ]"],
  "急に来るの、ずるい〜。": ["Coming out of nowhere isn't fair!", "[ 'kVmIN 'aUt @v 'noU%wEr 'Iz@nt 'fEr! ]"],
  "今の、見えなかった…。": ["I didn't even see that one…", "[ aI 'dId@nt 'iv@n 'si 'D{t 'wVn… ]"],
  "まだ残機ある。落ちついて…。": ["I still have lives left. Stay calm…", "[ aI 'stIL h{v 'laIvz 'lEft. 'steI 'kAm… ]"],
  "残り1機…。もう失敗できない。": ["One life left… No more mistakes.", "[ 'wVn 'laIf 'lEft… 'noU 'mOr mI'steIks. ]"],
  "クリア！生き残った〜！": ["Clear! I survived!", "[ 'klIr! aI s@r'vaIvd! ]"],
  "やった、最後まで生き残れた…！": ["Yes, I made it to the end…!", "[ 'jEs, aI 'meId It t@ Di 'End…! ]"],
  "ゲームオーバー…。": ["Game over…", "[ 'geIm 'oUv@r… ]"],
  "あー、終わっちゃった。": ["Aww, it's over.", "[ 'O, Its 'oUv@r. ]"],
  "{sc}。急襲を{dg}よけたって。": ["{sc}. And I dodged the rush {dg}.", "{sc}。[ @nd aI 'dAdZd D@ 'rVS ] {dg}。"],
  "ハイスコア更新！{sc}。": ["New high score! {sc}.", "[ 'nu 'haI 'skOr! ] {sc}。"],
  "{sc}…。まだ手が追いついてない。": ["{sc}… My hands can't keep up yet.", "{sc} [ … maI 'h{ndz 'k{nt 'kip 'Vp 'jEt. ]"],
  "今日はここまで。手がまだ、どきどきしてる。": ["That's it for today. My hands are still shaking.", "[ D{ts 'It fOr t@'deI. maI 'h{ndz Ar 'stIL 'SeIkIN. ]"],
  "見てくれてありがとう。おやすみなさい、またね。": ["Thank you for watching. Good night, see you again.", "[ 'T{Nk ju fOr 'wAtSIN. gUd 'naIt, 'si ju @'gEn. ]"],
  "四角、きれいな色…よけるけど。": ["Such pretty colors… I'm dodging them, though.", "[ 'sVtS 'prIti 'kVl@rz… aIm 'dAdZIN D@m, 'DoU. ]"],
  "手が汗ばんできた…。": ["My hands are getting sweaty…", "[ maI 'h{ndz Ar 'gEtIN 'swEti… ]"],
  "右から来るのは平気。…急に来るのが、こわい。": ["The ones from the right are fine. …The sudden ones are scary.", "[ D@ 'wVnz fr@m D@ 'raIt Ar 'faIn. … D@ 'sVd@n 'wVnz Ar 'skEri. ]"],
  "後ろで勝手に積もっていくの、見てて飽きないね。": ["Watching it pile up on its own never gets old.", "[ 'wAtSIN It 'paIL 'Vp An Its 'oUn 'nEv@r 'gEts 'oULd. ]"],
  "ふう…。ちょっと休憩。": ["Phew… a little break.", "[ 'fju… @ 'lIt@L 'breIk. ]"],
  "みんな、最後まで付き合ってくれてありがとう。": ["Everyone, thanks for staying till the end.", "[ 'Evri%wVn, 'T{Nks fOr 'steIIN tIL Di 'End. ]"],
  "{name}さん、こんばんは〜。": ["{name}-san, good evening!", "{name}さん、[ gUd 'ivnIN! ]"],
  "{name}さん、ありがとう。": ["{name}-san, thank you.", "{name}さん、[ 'T{Nk ju. ]"],
  "{name}さん、わかる〜。": ["{name}-san, I know, right?", "{name}さん、[ aI 'noU, 'raIt? ]"],
  "{name}さん、こわいこと言わないで〜。": ["{name}-san, don't say scary things!", "{name}さん、[ 'doUnt 'seI 'skEri 'TINz! ]"],
  "{name}さん、がんばるね。": ["{name}-san, I'll do my best.", "{name}さん、[ aIL 'du maI 'bEst. ]"],
  "{name}さん、あと{s}！…長い〜。": ["{name}-san, {s} to go! …So long!", "{name}さん、{s} [ t@ 'goU! … soU 'lON! ]"],
  "{name}さん、あと{n}。大事に使うね。": ["{name}-san, {n} left. I'll use them carefully.", "{name}さん、{n} [ 'lEft. aIL 'juz D@m 'kEr%f@li. ]"],
  "{name}さん、いま{sc}！": ["{name}-san, {sc} right now!", "{name}さん、{sc} [ 'raIt 'naU! ]"],
  "{name}さん、鬼からは壊せないの。よけるだけ。": ["{name}-san, from Hard on, you can't break them. Only dodge.", "{name}さん、[ fr@m 'hArd 'An, ju 'k{nt 'breIk D@m. 'oUnli 'dAdZ. ]"],
  "{name}さん、上ね。…あ、上も積もってる。": ["{name}-san, up, got it. …Oh, it's piled up there too.", "{name}さん、[ 'Vp, 'gAt It. … 'oU, Its 'paILd 'Vp 'DEr 'tu. ]"],
  "{name}さん、ほんと？…下、いきます。": ["{name}-san, really? …Going down.", "{name}さん、[ 'rili? … 'goUIN 'daUn. ]"],
  "{name}さん、ぎりぎり…こわいけど、やってみる。": ["{name}-san, cutting it close… scary, but I'll try.", "{name}さん、[ 'kVtIN It 'kloUs… 'skEri, bVt aIL 'traI. ]"],
  "{name}さん、鬼？…じゃあ、次は鬼にするね。": ["{name}-san, Hard? …Okay, Hard is next.", "{name}さん、[ 'hArd? … oU'keI, 'hArd Iz 'nEkst. ]"],
  "{name}さん、修羅…みんなが言うなら、最後にやってみる。": ["{name}-san, Maniac… if everyone says so, I'll try it last.", "{name}さん、[ 'meIni%{k… If 'Evri%wVn 'sEz soU, aIL 'traI It 'l{st. ]"],
  "{name}さん、練習も気になるけど…せっかくだから、標準から。": ["{name}-san, Easy looks nice too… but let's start from Normal.", "{name}さん、[ 'izi 'lUks 'naIs 'tu… bVt 'lEts 'stArt fr@m 'nOrm@L. ]"],
  "{name}さん、でしょ？固まると、だんだん青く冷えていくの。": ["{name}-san, right? Once they freeze, they slowly cool to blue.", "{name}さん、[ 'raIt? 'wVns DeI 'friz, DeI 'sloUli 'kuL t@ 'blu. ]"],
  "{name}さん、えっと…{n}くらい。数えきれない。": ["{name}-san, um… about {n}. I can't count them all.", "{name}さん、[ 'Vm… @'baUt ] {n}。[ aI 'k{nt 'kaUnt D@m 'OL. ]"],
  "{name}さん、わかる。この曲、文字で書いた楽譜から鳴ってるんだって。": ["{name}-san, I know. This song plays from a score written in text.", "{name}さん、[ aI 'noU. 'DIs 'sON 'pleIz fr@m @ 'skOr 'rIt@n In 'tEkst. ]"],
  "{name}さん、{d}だと{sc}。": ["{name}-san, on {d} it's {sc}.", "{name}さん、[ 'An ] {d} [ Its ] {sc}。"],
  "{name}さん、わかる？斜めに重なってるところ、ちょっと柄みたい。": ["{name}-san, you see it? Where they overlap at angles, it's like a pattern.", "{name}さん、[ ju 'si It? wEr DeI 'oUv@r%l{p @t '{Ng@Lz, Its laIk @ 'p{t@rn. ]"],
  "{name}さん、手元は恥ずかしいから、だめ〜。": ["{name}-san, showing my hands is embarrassing, so no!", "{name}さん、[ 'SoUIN maI 'h{ndz Iz Im'b{r@sIN, soU 'noU! ]"],
  "{name}さん、いらっしゃい。ゆっくりしていってね。": ["{name}-san, welcome. Make yourself at home.", "{name}さん、[ 'wElk@m. 'meIk jOr'sElf @t 'hoUm. ]"],
  "ほら、さっきいたところに突っ込んでった。": ["See? It charged right where I just was.", "[ 'si? It 'tSArdZd 'raIt wEr aI 'dZVst 'wVz. ]"],
  "よし、流れた。": ["Good, it slid past.", "[ 'gUd, It 'slId 'p{st. ]"],
  "前のに当たって止まった。助かった…。": ["It hit the one in front and stopped. That saved me…", "[ It 'hIt D@ 'wVn In 'frVnt @nd 'stApt. 'D{t 'seIvd 'mi… ]"],
  "積もったのが、盾になってくれた。": ["The pile became my shield.", "[ D@ 'paIL bI'keIm maI 'SiLd. ]"],
  "前のは撃たないでおく。盾になってくれるから。": ["I won't shoot the one in front. It's shielding me.", "[ aI 'woUnt 'Sut D@ 'wVn In 'frVnt. Its 'SiLdIN 'mi. ]"],
  "せまい…ちょっと掘る！": ["Too tight… I'll dig a little!", "[ 'tu 'taIt… aIL 'dIg @ 'lIt@L! ]"],
  "ここ、前に積もったのがあって、ちょっと安全。": ["There's a pile in front of me here. A little safer.", "[ DErz @ 'paIL In 'frVnt @v 'mi 'hIr. @ 'lIt@L 'seIf@r. ]"],
  "{name}さん、ありがとう。肩がかちかち。": ["{name}-san, thank you. My shoulders are so stiff.", "{name}さん、[ 'T{Nk ju. maI 'SoULd@rz Ar 'soU 'stIf. ]"],
  "{name}さん、たまにね。織り機の前にずっといると、指が別のことしたくなるの。": ["{name}-san, sometimes. After hours at the loom, my fingers want to do something else.", "{name}さん、[ 'sVm%taImz. '{ft@r 'aU@rz @t D@ 'lum, maI 'fINg@rz 'wAnt t@ 'du 'sVm%TIN 'Els. ]"],
  "{name}さん、ほんと。橙から青に冷えていくところ、藍の甕みたい。": ["{name}-san, true. The way they cool from orange to blue is like an indigo vat.", "{name}さん、[ 'tru. D@ 'weI DeI 'kuL fr@m 'Or@ndZ t@ 'blu Iz laIk @n 'Ind@%goU 'v{t. ]"],
  "{name}さん、ぜんぜん。でも、よけるのは少し好き。": ["{name}-san, not at all. But I kind of like dodging.", "{name}さん、[ 'nAt @t 'OL. bVt aI 'kaInd @v 'laIk 'dAdZIN. ]"],
  "{name}さん、好きだった。崩すほうが、もっと好きだったけど。": ["{name}-san, I did. But I liked knocking them down even more.", "{name}さん、[ aI 'dId. bVt aI 'laIkt 'nAkIN D@m 'daUn 'iv@n 'mOr. ]"],
  "{name}さん、鬼かな。こわいけど、いちばん手が覚えた。": ["{name}-san, Hard, I think. Scary, but my hands learned the most.", "{name}さん、[ 'hArd, aI 'TINk. 'skEri, bVt maI 'h{ndz 'l3nd D@ 'moUst. ]"],
  "{name}さん、画面が赤い四角だらけだった…。目が回った。": ["{name}-san, the screen was full of red squares… I got dizzy.", "{name}さん、[ D@ 'skrin w@z 'fUL @v 'rEd 'skwErz… aI 'gAt 'dIzi. ]"],
  "{name}さん、今日はたどりつけなかった。また今度ね。": ["{name}-san, I didn't get there today. Next time.", "{name}さん、[ aI 'dId@nt 'gEt 'DEr t@'deI. 'nEkst 'taIm. ]"],
  "{name}さん、今日のいちばんは{best}。": ["{name}-san, today's best was {best}.", "{name}さん、[ t@'deIz 'bEst w@z ] {best}。"],
} });
