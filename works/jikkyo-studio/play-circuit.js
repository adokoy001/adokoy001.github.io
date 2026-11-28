/* ===== 回：「✕✕サーキット 午前二時・周回」を走る配信 =====
   ゲームは games/circuit.html（元の作品を、手を入れずに写したもの）。真夜中のサーキットを三周する。途中から、後ろに何かが立っていて、遅いと、つかまる。
   ゲームは中身を window.__ng に出している（GM 周回と勝ち負け、S 車と出来事、IN 運転の入力、WX 天気、IC 計器 …）。

   はじめはガレージ：3台を順に見て、1台を選び、走りだす（車を選ぶ画面は HTML なので、写す絵に入らない。overlay で描き直す）。
   走りだしたら、遊び手が運転する。ゲームの入力（IN.get）を差しかえ、ゲームの自動運転が出す「理想の線とペダル」を、人の手を通して渡す：
     ・ハンドルは、理想の線（S.botLt）に、ゆっくりした揺らぎを足した線へ向けて切る。手は少し遅れ、ごく小さくふるえる。視聴者に向いて話していると、もっと遅れる
     ・ペダルは、見てから踏むまで 0.1 秒遅れる。速さは1周目は控えめ（限界の94%）、周を重ねて慣れていく（98%まで）
     ・わざとの失敗：ときどきブレーキが遅れて突っ込みすぎる／出口で外へふくらむ。怖いことが起きると足が浮き、ときどきブレーキに触れる（触れると、後ろのものが寄ってくる）
   ゲームの音は、AudioWorklet（エンジンの物理モデル）を使う。配信の音の箱に通すため、AudioWorkletNode にだけ、本物の箱を渡す（setup） */
(() => {
  'use strict';
  const R = Math.random, clamp = (x, a, b) => x < a ? a : x > b ? b : x, rnd = (a, b) => a + R() * (b - a);
  const gauss = () => { let u = 0, v = 0; while (!u) u = R(); while (!v) v = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2832 * v); };

  /* 数の読み */
  const D = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'], D0 = ['ぜろ', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
  function kn(n) { n = Math.max(0, Math.round(n)); if (!n) return 'ぜろ'; let s = ''; const th = ((n / 1000) | 0) % 10, h = ((n / 100) | 0) % 10, te = ((n / 10) | 0) % 10, o = n % 10;
    if (th) s += th === 1 ? 'せん' : th === 3 ? 'さんぜん' : th === 8 ? 'はっせん' : D[th] + 'せん';
    if (h) s += h === 1 ? 'ひゃく' : h === 3 ? 'さんびゃく' : h === 6 ? 'ろっぴゃく' : h === 8 ? 'はっぴゃく' : D[h] + 'ひゃく';
    if (te) s += (te === 1 ? '' : D[te]) + 'じゅう'; if (o) s += D[o]; return s; }
  const fmtT = t => { const m = Math.floor(t / 60), s = t - m * 60; return m + "'" + s.toFixed(1).padStart(4, '0'); };
  const MIN = ['', 'いっぷん', 'にふん', 'さんぷん', 'よんぷん', 'ごふん'];
  // 1'42.3 → ['1分42秒3', 'いっぷん よんじゅうにびょう さん']
  // 差しこむ値は ['字幕', '読み', '英語の字幕', '英語の読み']（英語で話す出演者のときは、うしろの2つ）
  const EN = n => Jikkyo.enNum(n), EN1 = ["'oU", "'wVn", "'tu", "'Tri", "'fOr", "'faIv", "'sIks", "'sEv@n", "'eIt", "'naIn"];
  const lapV = t => { const d10 = Math.round(t * 10), m = Math.floor(d10 / 600), s = Math.floor((d10 - m * 600) / 10), d = d10 % 10;
    return [`${m ? m + '分' : ''}${s}秒${d}`, `${m ? MIN[Math.min(m, 5)] + ' ' : ''}${kn(s)}びょう ${D0[d]}`,
      `${m ? m + ':' + String(s).padStart(2, '0') : s}.${d}`, `[ ${m ? EN(m) + ' ' + (s < 10 ? "'oU " + EN1[s] : EN(s)) : EN(s)} 'pOInt ${EN(d)} ]`]; };
  const secV = x => { const d10 = Math.round(x * 10), i = Math.floor(d10 / 10), d = d10 % 10; return [`${i}.${d}秒`, `${i ? kn(i) : 'れい'}てん ${D0[d]}びょう`, `${i}.${d} sec`, `[ ${EN(i)} 'pOInt ${EN(d)} 'sEk@ndz ]`]; };
  const kmhV = v => { const n = Math.round(v * 3.6 / 10) * 10; return [`${n}キロ`, `${kn(n)} きろ`, `${n} km/h`, `[ ${EN(n)} 'kIl@%mit@rz @n 'aU@r ]`]; };
  const LAPN = [['', '', '', ''], ['1周目', 'いっしゅうめ', 'lap 1', "[ 'l{p 'wVn ]"], ['2周目', 'にしゅうめ', 'lap 2', "[ 'l{p 'tu ]"], ['3周目', 'さんしゅうめ', 'lap 3', "[ 'l{p 'Tri ]"], ['4周目', 'よんしゅうめ', 'lap 4', "[ 'l{p 'fOr ]"]];

  // 車（ゲームの3台）
  const CARS = {
    rotary: { name: ['耐久車', 'たいきゅうしゃ', 'the endurance car', "[ Di In'dUr@ns 'kAr ]"], snd: ['ロータリーの高い音、くせになる', 'ろーたりーの たかい おと、くせに なる', 'That high rotary whine is addictive', "[ D{t 'haI 'roU4@ri 'waIn Iz @'dIktIv ]"] },
    rally: { name: ['ラリー車', 'らりーしゃ', 'the rally car', "[ D@ 'r{li 'kAr ]"], snd: ['ターボのプシュッて音、好き', 'たーぼの ぷしゅって おと、すき', "I love the turbo's pssh sound", "[ aI 'lVv D@ 't3boUz ] ぷしゅっ [ 'saUnd ]"] },
    v10: { name: ['フォーミュラ', 'ふぉーみゅら', 'the formula car', "[ D@ 'fOrmj@l@ 'kAr ]"], snd: ['V10の音、悲鳴みたいで好き', 'ぶいてんの おと、ひめい みたいで すき', 'The V10 screams, and I love it', "[ D@ 'vi'tEn 'skrimz, @nd aI 'lVv It ]"] },
  };
  const ORDER = ['rotary', 'rally', 'v10'], NAMES = { '耐久車': 'rotary', 'ラリー車': 'rally', 'フォーミュラ': 'v10' };

  /* チームの無線（ゲームの PIT の13本）を、ところどころ聞き取れたときの言いかえ */
  const PITTR = [['路面温度とか、今夜は貸切とか', 'ろめん おんどとか、こんやわ かしきりとか'], ['もう1台映ってる、4秒後ろ…って', 'もう いちだい うつってる、よんびょう うしろ… って'],
    ['そいつ、わたしと同じタイムだって', 'そいつ、わたしと おなじ たいむだって'], ['今夜はコース員いない…じゃあ、あれ誰', 'こんやわ こーすいん いない… じゃあ、あれ だれ'],
    ['トンネルの電気、切ってないって', 'とんねるの でんき、きってないって'], ['光は、止まれって意味だって', 'ひかりわ、とまれって いみだって'],
    ['止まるな、って。それだけ聞こえた', 'とまるな、って。それだけ きこえた'], ['子供の声が乗ってる、って', 'こどもの こえが のってる、って'],
    ['まだ1周目を終えてない、って', 'まだ いっしゅうめを おえてない、って'], ['近づいてない、わたしが戻ってる…って', 'ちかづいてない、わたしが もどってる… って'],
    ['ピットに戻るな、って', 'ぴっとに もどるな、って'], ['運転席に誰も映ってない、って', 'うんてんせきに だれも うつってない、って'],
    ['無線、30分切れてたって', 'むせん、さんじゅっぷん きれてたって']];
  [["track temperature, and that we have the place to ourselves tonight", "[ 'tr{k 'tEmpr@tS@r, @nd D{t wi h{v D@ 'pleIs t@ aU@r'sElvz t@'naIt ]"], ["there's another car on screen, four seconds behind", "[ DErz @'nVD@r 'kAr An 'skrin, 'fOr 'sEk@ndz bI'haInd ]"], ["it's running the same lap times as me", "[ Its 'rVnIN D@ 'seIm 'l{p 'taImz @z 'mi ]"], ["no marshals tonight… then who is that?", "[ 'noU 'mArS@Lz t@'naIt… 'DEn 'hu Iz 'D{t? ]"], ["they never turned off the tunnel lights", "[ DeI 'nEv@r 't3nd 'Of D@ 'tVn@L 'laIts ]"], ["the light means stop, they said", "[ D@ 'laIt 'minz 'stAp, DeI 'sEd ]"], ["don't stop. That's all I caught", "[ 'doUnt 'stAp. 'D{ts 'OL aI 'kOt ]"], ["there's a child's voice on the channel", "[ DErz @ 'tSaILdz 'vOIs An D@ 'tS{n@L ]"], ["I haven't finished lap one yet, they said", "[ aI 'h{v@nt 'fInISt 'l{p 'wVn 'jEt, DeI 'sEd ]"], ["it's not getting closer, I'm going back, they said", "[ Its 'nAt 'gEtIN 'kloUs@r, aIm 'goUIN 'b{k, DeI 'sEd ]"], ["don't come back to the pit", "[ 'doUnt kVm 'b{k t@ D@ 'pIt ]"], ["there's nobody in the driver's seat on camera", "[ DErz 'noU%bAdi In D@ 'draIv@rz 'sit An 'k{m@r@ ]"], ["the radio was down for thirty minutes", "[ D@ 'reIdioU w@z 'daUn fOr 'T3ti 'mInIts ]"]].forEach((e, i) => PITTR[i].push(...e));
  const CATCH = [1, 3, 6, 7, 10, 11, 12];       // 聞き取れることがある（言葉が短いか、声が澄んでいる）

  /* ---------- 遊び手の運転 ---------- */
  function mkDriver(K, H) {
    const S = K.S, GM = K.GM, C = K.CARP, DS = 2, HW = 4.2;
    const D = { u: 0, n: 0, off: 0, offT: 0, offAt: 0, q: [], wide: 0, wideT: 0, wideAt: -99, lateAt: -99, late: 0, lift: 0, tap: 0, tapAt: -99, push: 0, cid: null, lastT: null, forceWide: 0 };
    // いまのハンドルいっぱいで求める曲がり（ゲームの lateral と同じ式）
    const kMax = () => { const v = Math.max(S.v, .5), gP = (1 - .22 * S.wet) * S.offG, a0 = C.lat0 + C.aero * v * v; let a = a0 * gP * S.offG; const lu = clamp(Math.abs(S.aLong) / (a0 * 1.25 * gP), 0, .95); a *= Math.sqrt(1 - (.8 * lu) ** 2); return Math.min(C.lock, 1.25 * a / (v * v)); };
    return {
      D,
      // 怖いことがあったとき：足が浮く。ときどき、ブレーキにも触れてしまう（触れると、後ろのものが寄ってくる）
      scare(p, tapP) { if (GM.state !== 'run' || S.t < D.lift + 4) return; if (R() < (p == null ? .55 : p)) { D.lift = S.t + rnd(.35, .7); if (R() < (tapP == null ? .35 : tapP) && S.v > 30 && S.t - D.tapAt > 40) { D.tap = S.t + rnd(.25, .45); D.tapAt = S.t; } } },
      wide(sec) { D.wideAt = -99; D.forceWide = S.t + (sec || 20); },
      push(sec) { D.push = S.t + sec; },
      get(dt, bt, bb) {
        if (GM.state !== 'run') { D.u = S.botSt; D.wide = 0; return { u: S.botSt, thr: bt, brk: bb }; }      // ゴールのあとと、事故のあいだは、ゲームの自動に任せる
        const t = S.t, talking = H.talking();
        if (D.lastT != null && t < D.lastT - 1) { D.cid = null; D.wideT = 0; D.wide = 0; D.late = 0; D.lift = 0; D.tap = 0; D.q.length = 0; }       // 最初からやり直した
        D.lastT = t;
        // 速さ：1周目は控えめ。周を重ねて慣れていく。煽られたときだけ、しばらく限界まで
        const base = [.94, .94, .965, .98][Math.min(GM.lap, 3)];
        GM.botPace = t < D.push ? 1 : t < D.late ? base + .085 : base;
        // 次のコーナーの入り口（道の番号）。コーナーの中にいるときは探さない
        const i0 = Math.floor(S.s / DS), TH = 1 / 110; let cid = null, cK = 0;
        if (Math.abs(K.sm(i0).k) <= TH) for (let j = 1; j <= Math.max(60, S.v * 2.2) / DS; j++) { if (Math.abs(K.sm(i0 + j).k) > TH) { cid = i0 + j; for (let m = 0; m < 40; m += 2) { const x = K.sm(cid + m).k; if (Math.abs(x) > Math.abs(cK)) cK = x; } break; } }
        if (cid != null && (D.cid == null || cid > D.cid + 30)) {
          D.cid = cid;
          if (t - D.lateAt > 45 && S.v > 45 && GM.lap >= 1 && R() < .1) { D.lateAt = t; D.late = t + 2.2; }                               // ブレーキが遅れる
          const forced = D.forceWide && t < D.forceWide;
          if ((forced || (t - D.wideAt > 38 && R() < .14)) && Math.abs(cK) > 1 / 95) {                                                    // 出口でふくらむ
            D.wideAt = t; D.forceWide = 0; D.wideK = Math.sign(cK); D.wideT = t + (cid * DS - S.s) / Math.max(S.v, 10) + rnd(.6, 1.2); D.wideMag = rnd(1.1, 1.7); }
        }
        // 線：理想の線に、ゆっくりした揺らぎと、ふくらみを足す
        if (t > D.offAt) { D.offAt = t + rnd(1.5, 3.5); D.offT = rnd(-.35, .35); }
        D.off += (D.offT - D.off) * (1 - Math.exp(-dt / 1.2));
        let wn = 0; if (D.wideT && t > D.wideT - 1 && t < D.wideT + 1.6) wn = -D.wideK * D.wideMag * Math.sin(Math.PI * clamp((t - (D.wideT - 1)) / 2.6, 0, 1));
        D.wide += (wn - D.wide) * (1 - Math.exp(-dt / .35));
        const lt = clamp(S.botLt + D.off + D.wide, -HW - .3, HW + .3);
        // ハンドル：ゲームの自動運転（botSteer）と同じ式で、その線へ向ける
        const v = Math.max(S.v, 5), look = clamp(v * .55, 8, 40), pa = K.sm(Math.floor((S.s + look * .5) / DS));
        const kD = pa.k + 2.4 * (Math.atan2(lt - S.lat, look) - S.chi) / look, uT = clamp(kD / Math.max(kMax(), 1e-4), -1, 1);
        D.u += (uT - D.u) * (1 - Math.exp(-dt / (talking ? .12 : .075)));
        D.n += (gauss() * (talking ? .05 : .025) - D.n) * (1 - Math.exp(-dt / .3));
        // ペダル：見てから 0.1 秒遅れて踏む
        D.q.push([t, bt, bb]); while (D.q.length > 1 && D.q[1][0] <= t - .1) D.q.shift();
        let thr = D.q[0][1], brk = D.q[0][2];
        if (t < D.lift) thr = 0;
        if (t < D.tap) { brk = Math.max(brk, .4); thr = 0; }
        return { u: D.u + D.n, thr, brk };
      },
    };
  }

  const F = '"Zen Kaku Gothic New","Hiragino Sans","Yu Gothic",sans-serif';

  Jikkyo.play({
    id: 'circuit',
    title: '【午前二時・周回】真夜中のサーキットを3周。止まっちゃだめ',
    short: '午前二時・周回',
    blurb: '真夜中のサーキットを3周。後ろに何かがいる',
    tags: ['自作ゲーム', 'ホラー', '運転', 'ヘッドホン推奨'],
    game: 'games/circuit.html',
    character: 'yuzu',
    minutes: 7,
    endDelay: 16,
    // 雑談：遊んでいる最中の掛け合い（この回の話）と、終わったあとの締めの雑談。共通の話は zatsudan.js
    // 追われていて、すぐ後ろにいるときは、雑談を始めない
    zatsu: {
      introAt: 13, every: [28, 44], firstTip: [70, 130], tipEvery: [110, 180], outro: 55,
      quiet() { const K = this._K; if (!K || !K.S || K.S.phase !== 1 || !K.S.P) return true; return K.S.P.gap / Math.max(K.S.v, 10) > 2.5; },
      vars() { const K = this._K; if (!K) return {}; const T = (K.GM && K.GM.times) || [], c = CARS[K.RC && K.RC.car] || CARS.rally; return T.length ? { best: lapV(Math.min(...T)), lap: true, car: c.name } : { lap: false, car: c.name }; },
      bits: [
        [['c', '免許持ってる？'], ['s', { t: '{name}さん、持ってるよ。…でも、こんなに速く走ったことはない。', k: '{name}さん、もってるよ。 …でも、こんなに はやく はしった ことわ ない。', m: 'smile', g: 'nod',
          en: ["{name}-san, I do. …But I've never driven this fast.", "{name}さん、[ aI 'du. … bVt aIv 'nEv@r 'drIv@n DIs 'f{st. ]"] }]],
        [['c', 'ホラー苦手？'], ['s', { t: '{name}さん、苦手…。でも、みんながいるから走れる。', k: '{name}さん、にがて…。でも、みんなが いるから はしれる。', m: 'sad', g: 'hesitate',
          en: ["{name}-san, I'm bad with it… But with you all here, I can keep driving.", "{name}さん、[ aIm 'b{d wID It… bVt wID ju 'OL 'hIr, aI k@n 'kip 'draIvIN. ]"] }],
          ['c2', '一緒にいるよ'], ['s', { t: '{name2}さん、ありがとう…。コメント、心強い。', k: '{name2}さん、ありがとう…。こめんと、こころづよい。', m: 'smile', g: 'nod',
          en: ["{name2}-san, thank you… Your comments really help.", "{name2}さん、[ 'T{Nk ju… jOr 'kAmEnts 'rili 'hElp. ]"] }]],
        [['c', 'ドライブ好き？'], ['s', { t: '{name}さん、好き！夜の高速とか。…でも、今日のは違う。', k: '{name}さん、すき！ よるの こうそくとか。 …でも、きょうのわ ちがう。', m: 'smile', g: 'hesitate',
          en: ["{name}-san, I love it! Highways at night… But tonight is different.", "{name}さん、[ aI 'lVv It! 'haI%weIz @t 'naIt… bVt t@'naIt Iz 'dIf@r@nt. ]"] }]],
        [['c', '後ろ見ないで'], ['s', { t: '{name}さん、見ない見ない。前だけ見てる。', k: '{name}さん、みない みない。まえだけ みてる。', m: 'focus', g: 'settle',
          en: ["{name}-san, not looking, not looking. Eyes forward only.", "{name}さん、[ 'nAt 'lUkIN, 'nAt 'lUkIN. 'aIz 'fOrw@rd 'oUnli. ]"] }]],
        [['c', 'お祓い行った方がいい'], ['s', { t: '{name}さん、やめて〜。…配信終わったら、塩まいとく。', k: '{name}さん、やめて〜。 …はいしん おわったら、しお まいとく。', m: 'sad', g: 'sigh',
          en: ["{name}-san, stop it! …I'll toss some salt around after the stream.", "{name}さん、[ 'stAp It! … aIL 'tOs s@m 'sOLt @'raUnd '{ft@r D@ 'strim. ]"] }]],
        [['c', 'エンジン音だけで聞いてられる'], ['s', { t: '{name}さん、わかる。この音だけで、ずっと聞いてられる。', k: '{name}さん、わかる。この おとだけで、ずっと きいて られる。', m: 'smile', g: 'nod',
          en: ["{name}-san, I get it. I could listen to just this sound forever.", "{name}さん、[ aI 'gEt It. aI kUd 'lIs@n t@ 'dZVst DIs 'saUnd f@'rEv@r. ]"] }]],
        [['c', 'サーキット行ったことある？'], ['s', { t: '{name}さん、見に行ったことはあるよ。昼間のね。夜は、もう無理。', k: '{name}さん、みに いった ことわ あるよ。ひるまのね。よるわ、もう むり。', m: 'smile', g: 'think',
          en: ["{name}-san, I've been to watch. In the daytime. Nights are a hard no now.", "{name}さん、[ aIv bIn t@ 'wAtS. In D@ 'deI%taIm. 'naIts Ar @ 'hArd 'noU 'naU. ]"] }]],
        [['c', '心拍数やばそう'], ['s', { t: '{name}さん、たぶん今、すごいことになってる。手汗もすごい。', k: '{name}さん、たぶん いま、すごい ことに なってる。てあせも すごい。', m: 'surprise', g: 'hesitate',
          en: ["{name}-san, it's probably through the roof right now. Sweaty hands too.", "{name}さん、[ Its 'prAb@bli Tru D@ 'ruf 'raIt 'naU. 'swEti 'h{ndz 'tu. ]"] }]],
      ],
      // 終わったあと（締めの雑談のはじめ）
      after: [
        [['c', 'ベストタイムどうだった？'], ['s', { if: 'lap',
          yes: { t: '{name}さん、{best}！…でも、タイムどころじゃなかった。', k: '{name}さん、{best}！ …でも、たいむ どころじゃ なかった。', m: 'proud', g: 'nod',
            en: ["{name}-san, {best}! …Not that I was thinking about times.", "{name}さん、{best}！[ … 'nAt D{t aI w@z 'TINkIN @'baUt 'taImz. ]"] },
          no: { t: '{name}さん、タイムどころじゃなかった…。', k: '{name}さん、たいむ どころじゃ なかった…。', m: 'sad', g: 'sigh',
            en: ["{name}-san, times were the last thing on my mind…", "{name}さん、[ 'taImz w3 D@ 'l{st 'TIN An maI 'maInd… ]"] } }]],
        [['c', '鏡の人こわかった'], ['s', { t: '{name}さん、ほんとに…。今日は、鏡を見ないで寝る。', k: '{name}さん、ほんとに…。きょうわ、かがみを みないで ねる。', m: 'sad', g: 'sigh',
          en: ["{name}-san, seriously… Tonight I'm going to bed without looking in a mirror.", "{name}さん、[ 'sIri@sli… t@'naIt aIm 'goUIN t@ 'bEd wI'DaUt 'lUkIN In @ 'mIr@r. ]"] }],
          ['c2', 'うしろうしろ'], ['s', { t: '{name2}さん、やめて！もう走ってないから！', k: '{name2}さん、やめて！ もう はしって ないから！', m: 'surprise', g: 'recoil',
          en: ["{name2}-san, stop it! I'm not even driving anymore!", "{name2}さん、[ 'stAp It! aIm 'nAt 'iv@n 'draIvIN %Eni'mOr! ]"] }]],
        [['c', 'どの車がよかった？'], ['s', { t: '{name}さん、{car}かな。音も走りも、今日の相棒だった。', k: '{name}さん、{car}かな。おとも はしりも、きょうの あいぼうだった。', m: 'smile', g: 'think',
          en: ["{name}-san, {car}, I think. The sound, the ride, my partner tonight.", "{name}さん、{car}、[ aI 'TINk. D@ 'saUnd, D@ 'raId, maI 'pArtn@r t@'naIt. ]"] }]],
        [['c', 'また走って'], ['s', { t: '{name}さん、昼間のサーキットなら…考えとく。', k: '{name}さん、ひるまの さーきっとなら… かんがえとく。', m: 'smile', g: 'hesitate',
          en: ["{name}-san, a circuit in the daytime… I'll think about it.", "{name}さん、[ @ 's3kIt In D@ 'deI%taIm… aIL 'TINk @'baUt It. ]"] }]],
      ],
      sc: [
        { a: 500, w: 2, text: 'ガソリン代どうぞ', r: { t: '満タンにしておくね。…今夜は、もう乗らないけど。', k: 'まんたんに して おくね。 …こんやわ、もう のらないけど。', m: 'smile', g: 'nod',
          en: ["I'll fill up the tank. …Not driving again tonight, though.", "[ aIL 'fIL 'Vp D@ 't{Nk. … 'nAt 'draIvIN @'gEn t@'naIt, 'DoU. ]"] } },
        { a: 1000, w: 1.5, text: 'お守り代です', r: { t: 'お守り、ほんとに買いに行こうかな…。ありがとう。', k: 'おまもり、ほんとに かいに いこうかな…。ありがとう。', m: 'smile', g: 'think',
          en: ["Maybe I really should go buy a lucky charm… Thank you.", "[ 'meIbi aI 'rili SUd goU 'baI @ 'lVki 'tSArm… 'T{Nk ju. ]"] } },
      ],
    },
    mkDriver,

    canvases: g => [g.doc.getElementById('c')],
    setup(g) {
      this._g = g; const W = g.win;
      // エンジンの音（AudioWorklet）：ゲームが持っている音の箱は、配信の箱の代わり（Proxy）。AudioWorkletNode は本物の箱でないと作れないので、本物を渡す
      try { const AWN = W.AudioWorkletNode; if (AWN) W.AudioWorkletNode = function (c, n, o) { const real = (c && c.destination && c.destination.context) || c; return new AWN(real, n, o); }; } catch (e) {}
      // ゲームは、前のこまから15ms（軽量モードでは31ms）たっていないと進まない。配信のこまの間隔が少し縮んでも、こまが抜けないように、渡す時刻をそろえる
      const pump = W.__jk.pump; let last = 0; W.__jk.pump = now => { now = Math.max(now, last + 31.6); last = now; pump(now); };
    },

    /* ---------- 写した絵に入らない HTML を描き直す：車を選ぶ画面、暗転のあとのカード、事故の暗転、成績 ---------- */
    overlay(ctx, x, y, w, h, s) {
      const g = this._g; if (!g || !g.doc) return; const d = g.doc, sc = w / 944, now = performance.now() / 1000, O = this._ov || (this._ov = {});
      const el = id => d.getElementById(id);
      const T = (tx, px, py, size, o) => { o = o || {}; ctx.font = `${o.wt || 500} ${size * sc}px ${F}`; ctx.fillStyle = o.c || '#e8e6dc'; ctx.textAlign = o.al || 'left'; ctx.textBaseline = o.bl || 'alphabetic';
        if ('letterSpacing' in ctx) ctx.letterSpacing = (o.ls || 0) * sc + 'px'; ctx.fillText(tx, x + px * sc, y + py * sc); if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'; };
      ctx.save();
      const title = el('title');
      if (title && !title.hidden) {
        const selc = el('selc'); try { if (selc && selc.width) ctx.drawImage(selc, x, y, w, h); } catch (e) {}
        const launch = title.classList.contains('launch'); if (launch && !O.lt) O.lt = now; if (!launch) O.lt = 0;
        const a = launch ? clamp(1 - (now - O.lt) / .45, 0, 1) : 1;
        if (a > 0) { ctx.globalAlpha = a; this.drawTitle(ctx, x, y, sc, d, now, T); ctx.globalAlpha = 1; }
        if (launch) { const bh = 58 * sc * clamp((now - O.lt) / .6, 0, 1); ctx.fillStyle = '#000'; ctx.fillRect(x, y, w, bh); ctx.fillRect(x, y + h - bh, w, bh); }
      }
      const warp = el('warp');
      if (warp && !warp.hidden) {
        if (!O.wt) O.wt = now; const out = warp.classList.contains('out'); if (out && !O.wo) O.wo = now;
        const a = out ? clamp(1 - (now - O.wo) / 1.1, 0, 1) : 1, ta = a * clamp((now - O.wt - .1) / .5, 0, 1);
        ctx.fillStyle = `rgba(0,0,0,${a})`; ctx.fillRect(x, y, w, h);
        ctx.globalAlpha = ta; const cx = 472;
        T('✕✕サーキット', cx, 214, 11, { c: '#8d9089', al: 'center', ls: 3.7 });
        ctx.shadowColor = 'rgba(185,216,210,.35)'; ctx.shadowBlur = 18 * sc; T('02:00', cx, 272, 46, { c: '#b9d8d2', al: 'center', wt: 300, ls: 6 }); ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(185,216,210,.55)'; ctx.fillRect(x + (cx - 66) * sc, y + 290 * sc, 132 * sc, 1 * sc);
        T((el('wcar') ? el('wcar').textContent : '') + '　三周。止まるな。', cx, 318, 13, { c: '#d8d8cc', al: 'center', ls: 2 });
        ctx.globalAlpha = 1;
      } else { O.wt = 0; O.wo = 0; }
      const blk = el('blk'); if (blk && !blk.hidden) { ctx.fillStyle = '#000'; ctx.fillRect(x, y, w, h); }
      const res = el('res');
      if (res && !res.hidden) {
        ctx.fillStyle = '#000'; ctx.fillRect(x, y, w, h);
        const rows = [...d.querySelectorAll('#resT tr')].map(tr => [...tr.children].map(c => c.textContent)), x0 = 262, y0 = 265 - (rows.length * 30 + 90) / 2;
        T('✕✕サーキット 午前二時', x0, y0, 12, { c: '#8d9089', ls: 1.7 });
        T('チェッカー', x0, y0 + 30, 20, { wt: 600, ls: 1.2 });
        rows.forEach((r, i) => { const yy = y0 + 70 + i * 30; T(r[0] || '', x0, yy, 13, { c: '#8d9089' }); T(r[1] || '', x0 + 70, yy, 17, { c: '#b9d8d2' }); if (r[2]) T(r[2], x0 + 170, yy, 12, { c: '#ffd98a' }); });
        T((el('resB') && el('resB').textContent) || '', x0, y0 + 80 + rows.length * 30, 13, { c: '#d8d8cc' });
      }
      ctx.restore();
    },
    // 車を選ぶ画面の札（ゲームの画面と同じ並び。数字は 944×531 のときの位置）
    drawTitle(ctx, x, y, sc, d, now, T) {
      const el = id => d.getElementById(id), tx = id => (el(id) ? el(id).textContent : ''), B = this._B || {};
      const sh = () => { ctx.shadowColor = '#000'; ctx.shadowBlur = 10 * sc; }, ns = () => { ctx.shadowBlur = 0; };
      sh(); T('✕✕サーキット', 14, 27, 12, { c: '#8d9089', ls: 1.7 }); T('午前二時・周回', 14, 53, 17, { wt: 700, ls: 1 }); T('三周。止まるな。', 14, 77, 13, { c: '#d8d8cc' });
      // 左右の ‹ ›（押したときだけ、白く光る）
      for (const [k, cx, dir] of [['prev', 40, -1], ['next', 594, 1]]) {
        const lit = B.flash && B.flash.k === k && now - B.flash.t < .35; ctx.strokeStyle = lit ? '#fff' : 'rgba(216,216,204,.66)'; ctx.lineWidth = (lit ? 2.2 : 1.5) * sc; ctx.lineJoin = 'round';
        const ox = lit ? dir * 4 : 0; ctx.beginPath(); ctx.moveTo(x + (cx - dir * 6 + ox) * sc, y + 220 * sc); ctx.lineTo(x + (cx + dir * 7 + ox) * sc, y + 242 * sc); ctx.lineTo(x + (cx - dir * 6 + ox) * sc, y + 264 * sc); ctx.stroke();
      }
      // 左下：番号と名前
      const num = (tx('cnum').match(/\d+/g) || ['1', '3']); T('CAR', 14, 417, 11, { c: '#8d9089', ls: 2.2 }); T(num[0].padStart(2, '0'), 48, 417, 13, { wt: 700 }); T('/ ' + (num[1] || '03').padStart(2, '0'), 70, 417, 11, { c: '#8d9089', ls: 2 });
      ns(); const ci = ORDER.indexOf(NAMES[tx('cname')]); for (let i = 0; i < 3; i++) { ctx.fillStyle = i === ci ? '#b9d8d2' : 'rgba(216,216,204,.24)'; ctx.fillRect(x + (115 + i * 20) * sc, y + 411 * sc, 16 * sc, 2 * sc); }
      sh(); T(tx('cname'), 14, 459, 38, { wt: 700, ls: 3 }); T(tx('ctag'), 14, 485, 13, { c: '#d8d8cc' }); T('BEST', 14, 513, 10, { c: '#8d9089', ls: 2 }); T(tx('cbest'), 60, 513, 16, { c: '#b9d8d2', wt: 600 }); ns();
      // 右：諸元の札
      const cx0 = 630, cy0 = 58, cw = 298, rows = [...d.querySelectorAll('#cspec dt')].map(dt => [dt.textContent, dt.nextElementSibling ? dt.nextElementSibling.textContent : '', dt.nextElementSibling && dt.nextElementSibling.querySelector('.bar b')]);
      const ch = 40 + rows.reduce((n, r) => n + (r[2] ? 31 : 23), 0) + 8;
      ctx.fillStyle = 'rgba(4,6,6,.56)'; ctx.fillRect(x + cx0 * sc, y + cy0 * sc, cw * sc, ch * sc); ctx.strokeStyle = 'rgba(216,216,204,.14)'; ctx.lineWidth = 1 * sc; ctx.strokeRect(x + cx0 * sc, y + cy0 * sc, cw * sc, ch * sc);
      ctx.fillStyle = '#b9d8d2'; ctx.fillRect(x + (cx0 - 1) * sc, y + (cy0 - 1) * sc, 10 * sc, 2 * sc); ctx.fillRect(x + (cx0 - 1) * sc, y + (cy0 - 1) * sc, 2 * sc, 10 * sc);
      ctx.fillRect(x + (cx0 + cw - 9) * sc, y + (cy0 + ch - 1) * sc, 10 * sc, 2 * sc); ctx.fillRect(x + (cx0 + cw - 1) * sc, y + (cy0 + ch - 9) * sc, 2 * sc, 10 * sc);
      T('SPEC', cx0 + 14, cy0 + 22, 10, { c: '#8d9089', ls: 2.4 }); T('諸元', cx0 + cw - 14, cy0 + 22, 10, { c: '#8d9089', al: 'right', ls: 2.4 });
      let yy = cy0 + 48;
      for (const [k, v, bar] of rows) { T(k, cx0 + 14, yy, 12, { c: '#8d9089' }); T(v, cx0 + 92, yy, 12);
        if (bar) { const bw = cw - 106; ctx.fillStyle = 'rgba(216,216,204,.12)'; ctx.fillRect(x + (cx0 + 92) * sc, y + (yy + 7) * sc, bw * sc, 3 * sc); ctx.fillStyle = '#b9d8d2'; ctx.fillRect(x + (cx0 + 92) * sc, y + (yy + 7) * sc, bw * (+bar.dataset.w || 0) * sc, 3 * sc); yy += 31; } else yy += 23; }
      // 運転の選びかた（いまの選択）と、走るボタン
      const segs = [...d.querySelectorAll('.seg button')], sy = 428;
      segs.forEach((b, i) => { const bx = 630 + i * 100.3, on = b.getAttribute('aria-pressed') === 'true'; ctx.fillStyle = on ? 'rgba(216,216,204,.14)' : 'rgba(4,6,6,.56)'; ctx.fillRect(x + bx * sc, y + sy * sc, 100.3 * sc, 34 * sc);
        ctx.strokeStyle = 'rgba(216,216,204,.28)'; ctx.strokeRect(x + bx * sc, y + sy * sc, 100.3 * sc, 34 * sc); T(b.textContent, bx + 50, sy + 22, 12, { c: on ? '#e8e6dc' : '#8d9089', al: 'center' }); });
      const fire = B.flash && B.flash.k === 'go' ? clamp(1 - (now - B.flash.t) / .5, 0, 1) : 0;
      if (fire) { ctx.shadowColor = 'rgba(232,230,220,.8)'; ctx.shadowBlur = 26 * fire * sc; }
      ctx.fillStyle = fire ? '#fff' : 'rgba(232,230,220,.9)'; ctx.fillRect(x + 630 * sc, y + 471 * sc, 301 * sc, 46 * sc); ns();
      T(tx('golab') + '　▶', 780, 500, 15, { c: '#0a0b0a', al: 'center', wt: 700, ls: 1.5 });
    },

    start(g, J) {
      this._B = { stage: 'garage', next: 13, shown: 0, target: null, flash: null };
      this._E = { attempt: 1, pits: [], beat: null };
      this._drv = null; this._K = null; this._J = J;
      J.phase('garage');
    },
    // チームの無線が鳴っているあいだと、勝手に入るラジオのあいだは、間つなぎのひとことを待つ。成績が出たあとは、あいさつだけ
    busy(g) { const K = g.win.__ng; return !!(K && (K.S.pitOn > 0 || (K.S.beat && K.S.beat.type === 'radio') || K.GM.res)); },
    end(g) { const K = g.win.__ng; return !!(K && K.GM.res); },

    /* ---------- 毎こま ---------- */
    step(g, dt, t, J) {
      const B = this._B; if (!B) return; this._t = t;
      if (B.stage === 'garage') this.garage(g, t, J);
      if (B.stage === 'launch') {
        const w = g.doc.getElementById('warp');
        if (w && !w.hidden && !B.warp) { B.warp = 1; J.later(.5, () => J.emit('clock', { vars: { car: CARS[B.target].name } })); }
      }
      const K = g.win.__ng;
      if (K && !this._K) this.attach(K, J);
      if (this._K) this.watch(this._K, g, t, J);
    },

    /* ガレージ：3台を順に見て、1台に決めて、走りだす */
    garage(g, t, J) {
      const B = this._B, d = g.doc, cur = () => NAMES[(d.getElementById('cname') || {}).textContent] || 'rotary';
      if (t < B.next) return;
      const click = (k, id) => { const b = d.getElementById(id); if (b) b.click(); B.flash = { k, t: performance.now() / 1000 }; };
      if (B.shown === 0) { B.shown = 1; B.first = cur(); J.emit('garage'); J.later(4.2, () => J.emit('car_' + cur())); B.next = t + 10.5; return; }
      if (B.shown < 3) { B.shown++; click('next', 'cnext'); J.later(.5, () => J.emit('car_' + cur())); B.next = t + 7; return; }
      if (!B.target) {
        // どれにするか：前の配信で乗った車（はじめに出ていた車）は、なるべく避ける
        const pool = ORDER.filter(c => c !== B.first); B.target = R() < .75 ? pool[(R() * pool.length) | 0] : B.first; J.mood('focus');
      }
      const c = cur();
      if (c !== B.target) { const i = ORDER.indexOf(c), j = ORDER.indexOf(B.target), fw = (j - i + 3) % 3 === 1; click(fw ? 'next' : 'prev', fw ? 'cnext' : 'cprev'); B.next = t + 1.4; return; }
      if (!B.picked) { B.picked = 1; J.emit('pick', { vars: { car: CARS[B.target].name } }); B.next = t + 5.5; return; }
      // 走る：運転は「すべて自分で」（遊び手が、ハンドルもペダルも持つ）
      B.stage = 'launch'; B.flash = { k: 'go', t: performance.now() / 1000 };
      try { const seg = d.querySelector('.seg button[data-assist="0"]'); if (seg) seg.click(); g.win.__go(B.target, 0, true); } catch (e) { console.error(e); }
      J.emit('launch'); J.later(1.7, () => J.emit('lightsout')); J.phase(null); J.mood('neutral');
    },

    // 走りだした：ゲームの入力を、遊び手の手に差しかえる
    attach(K, J) {
      this._K = K; const S = K.S, IN = K.IN, drv = this._drv = mkDriver(K, { talking: () => J.talking() });
      IN.get = function (dt, bt, bb) { const r = drv.get(dt, bt, bb); S.stIn += clamp(r.u - S.stIn, -dt * 8, dt * 8); IN.used = 1; return { thr: r.thr, brk: r.brk }; };
      Object.assign(this._E, { pitN: S.pitN, t0: this._t, lap: 0, times: 0, state: K.GM.state, wx: K.WX.kind });
      this._B.stage = 'race'; this._B.car = K.RC.car;
    },

    /* 出来事の見張り */
    watch(K, g, t, J) {
      const S = K.S, GM = K.GM, P = S.P, E = this._E, Dr = this._drv && this._drv.D, run = GM.state === 'run';
      const up = (k, v) => { const o = E[k]; E[k] = v; return !!v && !o; };
      if (t - E.t0 > 2.6 && up('drive', 1)) J.emit('drive');
      // 周回
      if (GM.lap === 1 && E.lap === 0 && run) J.emit('lap_start');
      if (GM.times.length > E.times) {
        const n = GM.times.length, lt = GM.times[n - 1], pv = n > 1 ? GM.times[n - 2] : 0, vars = { time: lapV(lt), n: LAPN[n] };
        if (GM.state !== 'finish') J.emit(pv && lt < pv - .3 ? 'lap_faster' : 'lap', { vars });
        if (n === GM.laps - 1) J.later(5, () => J.emit('final'));
      }
      E.lap = GM.lap; E.times = GM.times.length;
      // 勝ち負け
      if (GM.state !== E.state) {
        if (GM.state === 'finish') { J.emit('finish'); J.phase('late'); for (let i = 0; i < 5; i++) J.later(.8 + i * .35, () => J.chat(['888', 'おめでとう！', '逃げ切ったー！', 'ナイス！', 'すごい', 'おつかれ！'][i])); }
        else if (GM.state === 'crash') J.emit('crash');
        else if (GM.state === 'caught') J.emit('caught');
        else if (GM.state === 'run' && (E.state === 'crash' || E.state === 'caught')) { E.attempt++; J.emit('retry'); J.phase(null); E.v300 = 0; E.chase = 0; }
        E.state = GM.state;
      }
      if (up('res', GM.res)) { const b = Math.min(...GM.times); J.emit('result', { vars: { best: lapV(b) } }); J.later(8, () => J.emit('bye')); }
      // 出来事（ゲームの director）
      const b = S.beat;
      if (b && b !== E.beat) {
        E.beat = b; const ty = b.type, drv = this._drv;
        if (ty === 'figure') { J.emit(S.phase ? 'b_figure' : 'figure0'); if (drv && b.o && Math.abs(b.o.lat) < 4.2) drv.scare(.8, .3); }
        else if (ty === 'begin') J.emit('begin');
        else if (ty === 'radio') J.emit(b.kind === 'laugh' ? 'radio_laugh' : 'radio_hum');
        else { J.emit('b_' + ty); if (drv && (ty === 'lights' || ty === 'thump')) drv.scare(.7, .45); }
        E.knock = E.lf = E.bh = E.thru = 0;
      }
      if (b) {
        if (b.type === 'thump' && b.k && up('knock', 1)) { J.emit('knock'); this._drv && this._drv.scare(.6, .3); }
        if (b.type === 'lights' && b.on && b.fig && up('lf', 1)) J.emit('lights_fig');
        if (b.type === 'close' && b.w && up('bh', 1)) { J.emit('behind'); this._drv && this._drv.scare(.6, .25); }
        if (b.type === 'figure' && b.o && b.o.dead && Math.abs(b.o.lat) < 4.2 && up('thru', 1)) J.emit('through');
      }
      if (up('chase', S.phase === 1)) J.later(.8, () => { J.emit('chase'); J.phase('chase'); });
      if (b && b.type === 'gone') E.gone = 1;
      if (E.gone && P.on && up('pback', 1)) { E.gone = 0; J.emit('back'); } else if (!P.on) E.pback = 0;
      // 後ろのもの
      up('glare', P.glare > .5) && J.emit('glare');
      if (up('gapc', P.on && run && P.gap < 28)) J.emit('gap_close'); else if (P.gap > 40) E.gapc = 0;
      if (up('lunge', P.on && run && S.brk > .35 && S.v > 30)) J.emit('lunge');
      if (Dr && up('tap', Dr.tap > S.t)) J.emit('scare_brake');
      // チームの無線：言い終わったところで、聞き取れたか、聞き取れなかったか
      if (S.pitN > E.pitN) { E.pitN = S.pitN; E.pitWait = (S.pitN - 1) % PITTR.length; }
      if (E.pitWait != null && S.pitOn <= 0) { const i = E.pitWait; E.pitWait = null; E.pits.push({ i, t });
        if (CATCH.includes(i) && R() < .75) J.emit('pit_catch', { vars: { r: PITTR[i] } }); else J.emit('pit'); }
      // 運転の失敗
      if (Dr) {
        up('wide', Math.abs(Dr.wide) > 1.05) && J.emit('wide');
        up('late', Dr.late > S.t && S.over > .12) && J.emit('late');
      }
      if (up('rub', !!S.rub && run)) J.emit('scrape');
      if (up('off', S.offT > .45 && run)) J.emit('offroad');
      up('air', !!S.airb) && J.emit('jump');
      if (up('v300', S.v * 3.6 > 300)) J.emit('v300', { vars: { v: kmhV(S.v) } }); else if (S.v * 3.6 < 220) E.v300 = 0;
      if (up('flame', S.flame > .95 && run)) J.emit('flame'); else if (S.flame < .2) E.flame = 0;
      if (up('sput', !!S.sput)) J.emit('sputter');
      // 天気・景色
      if (K.WX.kind !== E.wx) { E.wx = K.WX.kind; J.emit('wx_' + E.wx); }
      if (up('fl', S.fl > .45)) J.emit('lightning'); else if (S.fl < .05) E.fl = 0;
      if (up('flfig', !!K.WX.flObj)) J.later(.6, () => J.emit('flfig'));
      if (up('tun', S.tun > .6)) J.emit('tunnel'); else if (S.tun < .2) E.tun = 0;
      up('frost', !!K.IC.frost) && J.emit('frost');
      // 顔：追われているあいだは真剣
      J.mood(S.phase && run ? (S.fear > .7 ? 'surprise' : 'focus') : GM.state === 'finish' ? 'smile' : 'neutral');
    },

    /* ---------- セリフ（字幕 t と、OtoVoice の読み k） ---------- */
    script: [[1.2, 'hello'], [7.5, 'about']],
    lines: {
      hello: { p: 3, say: [
        { t: 'こんばんは〜！夜ふかし組、集まって〜！', k: 'こんばんわ〜！ よふかしぐみ、あつまって〜！', m: 'smile', g: 'cheer', cam: true },
        { t: 'やっほー！今日は真夜中のドライブ配信！', k: 'やっほー！ きょうわ まよなかの どらいぶ はいしん！', m: 'smile', g: 'nod', cam: true }] },
      about: { p: 2, say: [{ t: '今日は「午前二時・周回」。夜のサーキットを3周するだけ…らしい。', k: 'きょうわ ごぜん にじ しゅうかい。よるの さーきっとを さんしゅう する だけ… らしい。', m: 'smile', g: 'declare', cam: true }] },
      garage: { p: 2, say: [{ t: 'まずは車選び。ガレージに3台あるんだって。', k: 'まずわ くるま えらび。がれーじに さんだい あるんだって。', m: 'smile', g: 'look' }] },
      car_rotary: { p: 2, say: [
        { t: 'これは耐久車。ロータリーが4つ…？音が気になる。', k: 'これわ たいきゅうしゃ。ろーたりーが よっつ…？ おとが きに なる。', m: 'surprise', g: 'look' },
        { t: '耐久車、屋根つきの低いやつ。かっこいい…。', k: 'たいきゅうしゃ、やねつきの ひくい やつ。かっこいい…。', m: 'smile', g: 'look' }] },
      car_rally: { p: 2, say: [
        { t: 'ラリー車！ターボで四駆、800馬力超え…！', k: 'らりーしゃ！ たーぼで よんく、はっぴゃく ばりき ごえ…！', m: 'surprise', g: 'look' },
        { t: 'ラリー車だ。旅に連れていきたい感じ。', k: 'らりーしゃだ。たびに つれて いきたい かんじ。', m: 'smile', g: 'look' }] },
      car_v10: { p: 2, say: [
        { t: 'フォーミュラ。屋根ないの…夜だと寒そう。', k: 'ふぉーみゅら。やね ないの… よるだと さむそう。', m: 'smile', g: 'look' },
        { t: 'フォーミュラ、いちばん速いやつだ。こわっ。', k: 'ふぉーみゅら、いちばん はやい やつだ。こわっ。', m: 'surprise', g: 'look' }] },
      pick: { p: 3, say: [
        { t: '決めた！今日は{car}で走る！', k: 'きめた！ きょうわ {car}で はしる！', m: 'proud', g: 'declare', cam: true },
        { t: 'うーん…よし、{car}にする！', k: 'うーん… よし、{car}に する！', m: 'proud', g: 'approve', cam: true }] },
      launch: { p: 2, say: [{ t: 'いってきま〜す！', k: 'いって きま〜す！', m: 'smile', g: 'cheer' }] },
      lightsout: { p: 2, say: [{ t: '…え、電気消えた。演出？こわ…。', k: '…え、でんき きえた。えんしゅつ？ こわ…。', m: 'surprise', g: 'recoil' }] },
      clock: { p: 2, say: [{ t: '午前2時…。3周、止まるな、だって。', k: 'ごぜん にじ…。さんしゅう、とまるな、だって。', m: 'focus', g: 'think' }] },
      drive: { p: 1, say: [
        { t: '夜のサーキット、誰もいない…貸し切りだ。', k: 'よるの さーきっと、だれも いない… かしきりだ。', m: 'smile', g: 'look' },
        { t: '真っ暗。ライトの届くとこしか見えない…。', k: 'まっくら。らいとの とどく とこしか みえない…。', m: 'focus' }] },
      figure0: { p: 2, say: [{ t: '…今、道のはじっこに人いなかった？', k: '…いま、みちの はじっこに ひと いなかった？', m: 'surprise', g: 'look' }] },
      lap_start: { p: 2, say: [
        { t: 'ライン通過！計測スタート！', k: 'らいん つうか！ けいそく すたーと！', m: 'proud', g: 'declare' },
        { t: '1周目、スタート！', k: 'いっしゅうめ、すたーと！', m: 'focus', g: 'nod' }] },
      begin: { p: 3, say: [
        { t: 'え、待って、鏡…！後ろに誰か立ってる！', k: 'え、まって、かがみ…！ うしろに だれか たってる！', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: '鏡に人…！？いま走ってるんだよ！？', k: 'かがみに ひと…！？ いま はしってるんだよ！？', m: 'surprise', g: 'recoil', st: 'panic' }] },
      chase: { p: 3, say: [
        { t: '追いかけてくる…止まっちゃだめなやつだ！', k: 'おいかけて くる… とまっちゃ だめな やつだ！', m: 'focus', g: 'declare' },
        { t: '止まるな、ってそういうこと！？踏む踏む！', k: 'とまるな、って そういう こと！？ ふむ ふむ！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      b_figure: { p: 2, cd: 30, ch: .8, say: [
        { t: 'また立ってる…。', k: 'また たってる…。', m: 'sad', g: 'look' },
        { t: '道ばたに、人…見ない見ない。', k: 'みちばたに、ひと… みない みない。', m: 'surprise', g: 'hesitate' },
        { t: 'ねえ、あの人ずっと同じ人じゃない？', k: 'ねえ、あの ひと ずっと おなじ ひとじゃ ない？', m: 'surprise', g: 'look' }] },
      through: { p: 3, say: [{ t: '…今、通り抜けた？道の真ん中にいたよね…！？', k: '…いま、とおりぬけた？ みちの まんなかに いたよね…！？', m: 'surprise', g: 'recoil', st: 'panic' }] },
      b_eyes: { p: 2, cd: 40, ch: .85, say: [
        { t: '木の中…なんか光ってない？', k: 'きの なか… なんか ひかって ない？', m: 'surprise', g: 'look' },
        { t: '目…？目がいっぱいある…。', k: 'め…？ めが いっぱい ある…。', m: 'sad', g: 'recoil' }] },
      b_temp: { p: 1, cd: 60, ch: .6, say: [{ t: '外の気温、どんどん下がってる…。', k: 'そとの きおん、どんどん さがってる…。', m: 'focus', g: 'look' }] },
      frost: { p: 2, cd: 60, say: [{ t: 'ピンって鳴った…凍結注意？寒っ。', k: 'ぴんって なった… とうけつ ちゅうい？ さむっ。', m: 'surprise', g: 'look' }] },
      radio_hum: { p: 2, say: [{ t: 'ラジオ、勝手についた…鼻歌…？', k: 'らじお、かってに ついた… はなうた…？', m: 'surprise', g: 'hesitate' }] },
      radio_laugh: { p: 3, say: [{ t: '子供の笑い声…やだやだやだ、消して…！', k: 'こどもの わらいごえ… やだ やだ やだ、けして…！', m: 'sad', g: 'recoil', st: 'panic' }] },
      b_lights: { p: 3, say: [
        { t: 'ライト消えた！見えない見えない！', k: 'らいと きえた！ みえない みえない！', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: 'ちょっ、真っ暗！足、離しちゃだめ…！', k: 'ちょっ、まっくら！ あし、はなしちゃ だめ…！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      lights_fig: { p: 3, say: [{ t: '…ついた。今、目の前に誰か…！', k: '…ついた。いま、めの まえに だれか…！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      b_thump: { p: 3, say: [
        { t: '屋根になんか落ちた！？', k: 'やねに なんか おちた！？', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: 'ドンって…上、なにか乗ってる…？', k: 'どんって… うえ、なにか のってる…？', m: 'surprise', g: 'recoil' }] },
      knock: { p: 3, say: [{ t: '窓叩いてる！？走ってるのに！', k: 'まど たたいてる！？ はしってるのに！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      b_tunoff: { p: 2, say: [{ t: 'トンネルの電気が、後ろから消えてく…。', k: 'とんねるの でんきが、うしろから きえてく…。', m: 'surprise', g: 'look' }] },
      b_close: { p: 3, say: [
        { t: '近い近い！すぐ後ろにいる！', k: 'ちかい ちかい！ すぐ うしろに いる！', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: 'うそ、追いつかれてる！？', k: 'うそ、おいつかれてる！？', m: 'surprise', g: 'recoil', st: 'panic' }] },
      behind: { p: 3, say: [{ t: '…今、耳元でなんか言った。', k: '…いま、みみもとで なんか いった。', m: 'sad', g: 'hesitate', st: 'whisper' }] },
      sputter: { p: 2, cd: 40, say: [{ t: 'エンジン、息つきしてる！？がんばって！', k: 'えんじん、いきつき してる！？ がんばって！', m: 'surprise', st: 'panic' }] },
      b_gone: { p: 2, say: [{ t: 'あれ…鏡にいない。まいた…？', k: 'あれ… かがみに いない。まいた…？', m: 'surprise', g: 'look' }] },
      back: { p: 2, say: [{ t: '…また来た。遠くに立ってる。', k: '…また きた。とおくに たってる。', m: 'sad', g: 'sigh' }] },
      glare: { p: 2, cd: 35, ch: .8, say: [
        { t: 'まぶしっ！後ろから照らされてる…！', k: 'まぶしっ！ うしろから てらされてる…！', m: 'surprise', g: 'recoil' },
        { t: '光った！止まれって合図…？止まらないよ！', k: 'ひかった！ とまれって あいず…？ とまらないよ！', m: 'focus', g: 'declare' }] },
      gap_close: { p: 3, cd: 30, say: [{ t: '追いつかれる、追いつかれる！', k: 'おいつかれる、おいつかれる！', m: 'surprise', st: 'panic' }] },
      lunge: { p: 1, cd: 70, ch: .35, say: [{ t: 'ブレーキ踏むと、寄ってくる…！', k: 'ぶれーき ふむと、よって くる…！', m: 'focus', g: 'hesitate' }] },
      scare_brake: { p: 3, cd: 30, say: [
        { t: 'あっ、ブレーキ踏んじゃった…！', k: 'あっ、ぶれーき ふんじゃった…！', m: 'surprise', g: 'recoil', st: 'panic' },
        { t: 'びっくりして足が…！踏んで踏んで！', k: 'びっくり して あしが…！ ふんで ふんで！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      pit: { p: 1, cd: 45, ch: .6, say: [
        { t: '無線…早口すぎて、全然聞き取れない。', k: 'むせん… はやくち すぎて、ぜんぜん ききとれない。', m: 'focus', g: 'think' },
        { t: 'ピットから？…ノイズすごい。', k: 'ぴっとから？ …のいず すごい。', m: 'focus', g: 'look' },
        { t: 'え、今なんて？もう一回言って！', k: 'え、いま なんて？ もう いっかい いって！', m: 'surprise', g: 'hesitate' }] },
      pit_catch: { p: 2, say: [{ t: '今…{r}。', k: 'いま… {r}。', m: 'surprise', g: 'think' }] },
      lap: { p: 2, cd: 4, say: [
        { t: '{n}、{time}！', k: '{n}、{time}！', m: 'focus', g: 'nod' },
        { t: 'タイム、{time}。まだいける…！', k: 'たいむ、{time}。まだ いける…！', m: 'focus', g: 'approve' }] },
      lap_faster: { p: 2, cd: 4, say: [{ t: '{time}！さっきより速い！', k: '{time}！ さっきより はやい！', m: 'proud', g: 'cheer', st: 'joy' }] },
      final: { p: 2, say: [{ t: 'ファイナルラップ！あと1周…！', k: 'ふぁいなる らっぷ！ あと いっしゅう…！', m: 'focus', g: 'declare' }] },
      finish: { p: 3, say: [
        { t: 'チェッカー！逃げ切った〜！', k: 'ちぇっかー！ にげきった〜！', m: 'smile', g: 'cheer', st: 'joy', cam: true },
        { t: 'ゴール！3周走りきった〜！', k: 'ごーる！ さんしゅう はしりきった〜！', m: 'smile', g: 'cheer', st: 'joy', cam: true }] },
      result: { p: 3, say: [{ t: 'ベストは{best}。…こわかった〜。', k: 'べすとわ {best}。 …こわかった〜。', m: 'smile', g: 'settle', cam: true }] },
      bye: { p: 3, say: [{ t: '見てくれてありがとう！おやすみ…後ろ、見ないでね。', k: 'みて くれて ありがとう！ おやすみ… うしろ、みないでね。', m: 'smile', g: 'nod', cam: true }] },
      crash: { p: 3, say: [{ t: 'ぶつかった！？うそでしょ…！', k: 'ぶつかった！？ うそでしょ…！', m: 'sad', g: 'recoil', st: 'panic' }] },
      caught: { p: 3, say: [{ t: '…つかまった。', k: '…つかまった。', m: 'sad', g: 'sigh', st: 'whisper' }] },
      retry: { p: 3, say: [{ t: '…最初からだ。もう一回！今度こそ。', k: '…さいしょからだ。もう いっかい！ こんどこそ。', m: 'focus', g: 'declare', cam: true }] },
      scrape: { p: 2, cd: 18, ch: .85, say: [
        { t: 'こすった！', k: 'こすった！', m: 'surprise', g: 'recoil' },
        { t: 'うわっ、壁近い！', k: 'うわっ、かべ ちかい！', m: 'surprise', g: 'recoil' },
        { t: 'ガリって言った…ごめん車。', k: 'がりって いった… ごめん くるま。', m: 'sad', g: 'sigh' }] },
      offroad: { p: 2, cd: 25, ch: .8, say: [
        { t: 'はみ出た！', k: 'はみでた！', m: 'surprise', g: 'recoil' },
        { t: 'ちょっと外れた…戻って戻って。', k: 'ちょっと はずれた… もどって もどって。', m: 'focus' }] },
      wide: { p: 1, cd: 35, ch: .75, say: [
        { t: 'ふくらんだ…！', k: 'ふくらんだ…！', m: 'surprise' },
        { t: 'あぶなっ、外いっぱい！', k: 'あぶなっ、そと いっぱい！', m: 'surprise', g: 'recoil' }] },
      late: { p: 2, cd: 40, say: [{ t: '突っ込みすぎた！曲がって〜！', k: 'つっこみ すぎた！ まがって〜！', m: 'surprise', g: 'recoil', st: 'panic' }] },
      jump: { p: 2, cd: 40, ch: .8, say: [
        { t: '飛んだ！？', k: 'とんだ！？', m: 'surprise', g: 'recoil' },
        { t: 'ふわってした…！', k: 'ふわって した…！', m: 'surprise' }] },
      v300: { p: 1, cd: 120, ch: .6, say: [{ t: '{v}出てる…！はやっ。', k: '{v} でてる…！ はやっ。', m: 'surprise', g: 'look' }] },
      flame: { p: 1, cd: 200, ch: .5, say: [{ t: '今、後ろで火、出てなかった？', k: 'いま、うしろで ひ、でて なかった？', m: 'surprise', g: 'look' }] },
      wx_fog: { p: 2, cd: 60, say: [{ t: '霧…前が全然見えない。', k: 'きり… まえが ぜんぜん みえない。', m: 'focus', g: 'look' }] },
      wx_storm: { p: 2, cd: 60, say: [{ t: '雨降ってきた…滑りそう。', k: 'あめ ふって きた… すべりそう。', m: 'focus', g: 'look' }] },
      wx_clear: { p: 1, cd: 60, ch: .5, say: [{ t: '雨、やんだ？ちょっと見えるようになった。', k: 'あめ、やんだ？ ちょっと みえる ように なった。', m: 'smile' }] },
      lightning: { p: 2, cd: 35, ch: .6, say: [
        { t: '光った！雷…？', k: 'ひかった！ かみなり…？', m: 'surprise', g: 'recoil' },
        { t: 'ピカってした…音、遅れて来る。', k: 'ぴかって した… おと、おくれて くる。', m: 'surprise', g: 'look' }] },
      flfig: { p: 3, say: [{ t: '今、光ったとき…道の先に人、いた。', k: 'いま、ひかった とき… みちの さきに ひと、いた。', m: 'surprise', g: 'recoil', st: 'whisper' }] },
      tunnel: { p: 1, cd: 80, ch: .35, say: [{ t: 'トンネル。音がこもる…。', k: 'とんねる。おとが こもる…。', m: 'focus', g: 'look' }] },
    },
    idle: { after: 17, say: [
      { t: 'エンジンの音、ずっと聞いてられる。', k: 'えんじんの おと、ずっと きいて られる。', m: 'smile' },
      { t: '夜の山、真っ暗。星も見えない…。', k: 'よるの やま、まっくら。ほしも みえない…。', m: 'smile' },
      { t: 'ハンドル、思ったより重い。', k: 'はんどる、おもったより おもい。', m: 'focus' },
      { t: 'コメント読んでるよ〜。返せないけど。', k: 'こめんと よんでるよ〜。かえせないけど。', m: 'smile', cam: true }],
      garage: [{ t: 'どれもかっこいいなあ…。', k: 'どれも かっこいい なあ…。', m: 'smile', g: 'think' }],
      chase: [
        { t: '鏡、見たくない…。', k: 'かがみ、みたくない…。', m: 'sad' },
        { t: '止まっちゃだめ、止まっちゃだめ…。', k: 'とまっちゃ だめ、とまっちゃ だめ…。', m: 'focus', g: 'think' },
        { t: '手汗すごい…。', k: 'てあせ すごい…。', m: 'sad' },
        { t: 'ずっと全開。こわい、けど速いの気持ちいい…。', k: 'ずっと ぜんかい。こわい、けど はやいの きもちいい…。', m: 'focus' },
        { t: '前だけ見る。前だけ…。', k: 'まえだけ みる。まえだけ…。', m: 'focus' },
        { t: 'ヘッドホンの人、後ろの声、聞こえてる…？', k: 'へっどほんの ひと、うしろの こえ、きこえてる…？', m: 'sad', cam: true },
        { t: 'これ、ホラーゲームだったの…？', k: 'これ、ほらー げーむ だったの…？', m: 'sad', cam: true }],
      late: [
        { t: 'もう追ってこない…よね？', k: 'もう おって こない… よね？', m: 'sad' },
        { t: 'ゆっくり走ってると、静かだね。', k: 'ゆっくり はしってると、しずかだね。', m: 'smile' },
        { t: 'みんな、最後まで付き合ってくれてありがとう。', k: 'みんな、さいごまで つきあって くれて ありがとう。', m: 'smile', g: 'nod', cam: true }] },
    reply: [
      { t: '{name}さん、こんばんは〜！', k: '{name}さん、こんばんわ〜！', m: 'smile', g: 'nod', early: true, to: /こんばんは|わこつ|きたー|待ってた|初見/ },
      { t: '{name}さん、コメントありがとう！', k: '{name}さん、こめんと ありがとう！', m: 'smile', g: 'nod' },
      { t: '{name}さん、わかる〜。', k: '{name}さん、わかる〜。', m: 'smile', g: 'approve', to: /すき|すご|いい|きれい|かっこ|わくわく|やば|えぐ/ },
      { t: '{name}さん、やめて〜、こわいこと言わないで。', k: '{name}さん、やめて〜、こわい こと いわないで。', m: 'sad', g: 'hesitate', to: /こわ|後ろ|鏡|ひえ|鳥肌|いる/ },
      { t: '{name}さん、見てくれてありがとう！', k: '{name}さん、みて くれて ありがとう！', m: 'smile', g: 'nod' }],

    /* ---------- 掛け合い：視聴者の問いかけと、その答え ---------- */
    talk: {
      every: [26, 44],
      items: [
        { q: 'いま何キロ出てる？', when() { const K = this._K; return !!K && K.GM.state === 'run' && K.S.v > 45; }, vars() { return { v: kmhV(this._K.S.v) }; },
          a: { t: '{name}さん、いま{v}！見ないで答えるの無理〜。', k: '{name}さん、いま {v}！ みないで こたえるの むり〜。', m: 'surprise', g: 'look' } },
        { q: '後ろとの差どのくらい？', when() { const K = this._K; return !!K && K.S.P.on && K.GM.state === 'run' && K.S.v > 20; },
          vars() { const S = this._K.S; return { g: secV(clamp(S.P.gap / Math.max(S.v, 10), .3, 9.9)) }; },
          a: { t: '{name}さん、えっと…{g}くらい。見たくない…。', k: '{name}さん、えっと… {g} くらい。みたく ない…。', m: 'sad', g: 'look' } },
        { q: '無線なんて言ってる？', once: false, when(g, t) { const L = (this._E && this._E.pits) || [], x = L[L.length - 1]; return !!x && t - x.t < 25; },
          vars() { const L = this._E.pits, i = L[L.length - 1].i; return { r: CATCH.includes(i) ? PITTR[i] : ['わかんない。早口だし、ノイズだらけ', 'わかんない。はやくちだし、のいずだらけ', "no idea. Fast talking, and all static", "[ 'noU aI'di@. 'f{st 'tOkIN, @nd 'OL 'st{tIk ]"] }; },
          a: { t: '{name}さん、えっとね…{r}。', k: '{name}さん、えっとね… {r}。', m: 'focus', g: 'think' } },
        { q: '何周目？', when() { const K = this._K; return !!K && K.GM.lap >= 1 && K.GM.state === 'run'; }, vars() { return { n: LAPN[Math.min(3, this._K.GM.lap)] }; },
          a: { t: '{name}さん、いま{n}！', k: '{name}さん、いま {n}！', m: 'focus', g: 'nod' } },
        { q: 'ミラー見て', when() { const K = this._K; return !!K && K.S.P.on && K.GM.state === 'run'; },
          a: { t: '{name}さん、むりむり！前見てないと死んじゃう。', k: '{name}さん、むり むり！ まえ みてないと しんじゃう。', m: 'surprise', g: 'hesitate' } },
        { q: 'ブレーキ踏まないの？', when() { const K = this._K; return !!K && K.S.phase === 1 && K.GM.state === 'run'; },
          a: { t: '{name}さん、踏むと寄ってくるの…。だから踏みたくない。', k: '{name}さん、ふむと よって くるの…。だから ふみたく ない。', m: 'focus', g: 'think' } },
        { q: 'もっと飛ばして！', when() { const K = this._K; return !!K && K.S.phase === 1 && K.GM.lap >= 1 && K.GM.state === 'run'; },
          a: { t: '{name}さん、もう限界だってば…わかった、踏む！', k: '{name}さん、もう げんかいだってば… わかった、ふむ！', m: 'focus', g: 'declare' }, act() { this._drv && this._drv.push(22); } },
        { q: 'ゆっくりでいいよ', when() { const K = this._K; return !!K && K.S.phase === 1 && K.GM.state === 'run'; },
          a: { t: '{name}さん、ゆっくりしたら追いつかれちゃう！', k: '{name}さん、ゆっくり したら おいつかれちゃう！', m: 'surprise', g: 'hesitate' } },
        { q: 'コーナーうまい', when() { const K = this._K; return !!K && K.GM.lap >= 2 && K.GM.state === 'run'; },
          a: { t: '{name}さん、でしょ〜？…あっ、次ふくらむかも。', k: '{name}さん、でしょ〜？ …あっ、つぎ ふくらむ かも。', m: 'proud', g: 'cheer' }, act() { this._drv && this._drv.wide(18); } },
        { q: 'その車なに？', when() { return !!this._K; }, vars() { return { car: CARS[this._K.RC.car].name }; },
          a: { t: '{name}さん、{car}！ガレージで選んだの。', k: '{name}さん、{car}！ がれーじで えらんだの。', m: 'smile', g: 'nod' } },
        { q: 'エンジン音いい', when() { const K = this._K; return !!K && K.GM.state === 'run'; }, vars() { return { snd: CARS[this._K.RC.car].snd }; },
          a: { t: '{name}さん、わかる。{snd}。', k: '{name}さん、わかる。{snd}。', m: 'smile', g: 'approve' } },
        { q: 'ホラーじゃん', when() { const K = this._K; return !!K && K.S.phase === 1; },
          a: { t: '{name}さん、聞いてないよ〜！ドライブって言ったのに！', k: '{name}さん、きいてないよ〜！ どらいぶって いったのに！', m: 'sad', g: 'sigh' } },
        { q: 'さっき人いなかった？', when() { const K = this._K; return !!K && !K.S.phase && K.S.nBeats >= 1; },
          a: { t: '{name}さん、やっぱりいたよね！？見間違いじゃなかった…。', k: '{name}さん、やっぱり いたよね！？ みまちがいじゃ なかった…。', m: 'surprise', g: 'look' } },
        { q: 'ベストタイムは？', when() { const K = this._K; return !!K && K.GM.times.length >= 1 && K.GM.state === 'run'; }, vars() { return { b: lapV(Math.min(...this._K.GM.times)) }; },
          a: { t: '{name}さん、いまのところ{b}！', k: '{name}さん、いまの ところ {b}！', m: 'proud', g: 'nod' } },
        { q: '雨すごい', when() { const K = this._K; return !!K && K.S.rain > .4; },
          a: { t: '{name}さん、ワイパー全開。前見えないよ〜。', k: '{name}さん、わいぱー ぜんかい。まえ みえないよ〜。', m: 'sad', g: 'hesitate' } },
        { q: 'こわくないの？', when() { const K = this._K; return !!K && K.S.phase === 1; },
          a: { t: '{name}さん、こわいに決まってるでしょ！', k: '{name}さん、こわいに きまってるでしょ！', m: 'sad', g: 'recoil' } },
        { q: 'どれにするの？', when() { return this._B && this._B.stage === 'garage' && this._B.shown >= 2 && !this._B.target; },
          a: { t: '{name}さん、まだ迷ってる。ぜんぶ見てから決める！', k: '{name}さん、まだ まよってる。ぜんぶ みてから きめる！', m: 'smile', g: 'think' } },
        { q: '初見です', when(g, t) { return t < 300; }, a: { t: '{name}さん、いらっしゃい！ゆっくり…できない配信だけど、どうぞ。', k: '{name}さん、いらっしゃい！ ゆっくり… できない はいしんだけど、どうぞ。', m: 'smile', g: 'nod' } },
        { q: 'このゲーム手作り？', a: { t: '{name}さん、そうなの。エンジンの音まで計算で作ってるんだって。', k: '{name}さん、そうなの。えんじんの おとまで けいさんで つくってるんだって。', m: 'smile' } },
        { q: '声かわいい', a: { t: '{name}さん、えへへ、ありがとう。いまそれどころじゃないけど！', k: '{name}さん、えへへ、ありがとう。いま それどころじゃ ないけど！', m: 'smile', g: 'nod' } },
        { q: 'おつかれ！逃げ切ったね', when() { const K = this._K; return !!K && K.GM.state === 'finish'; }, a: { t: '{name}さん、ありがとう！もう二度と走らない…かも。', k: '{name}さん、ありがとう！ もう にどと はしらない… かも。', m: 'smile', g: 'cheer' } },
      ],
    },

    /* ---------- 視聴者の書き込み（名前はすべて作りもの。いつもの人たち） ---------- */
    chat: {
      rate: 1,
      names: [['ねこまる', 'ねこまる'], ['夜ふかし', 'よふかし'], ['たぬき', 'たぬき'], ['ぽんず', 'ぽんず'], ['ひよこ豆', 'ひよこまめ'], ['しらたま', 'しらたま'], ['月見そば', 'つきみそば'],
        ['ゆでたまご', 'ゆでたまご'], ['こはく', 'こはく'], ['あおば', 'あおば'], ['とうふ', 'とうふ'], ['くろまめ', 'くろまめ'], ['ゆきみ', 'ゆきみ'], ['まめしば', 'まめしば'], ['そらいろ', 'そらいろ'],
        ['みかん箱', 'みかんばこ'], ['ほうじ茶', 'ほうじちゃ'], ['おにぎり', 'おにぎり'], ['しぐれ', 'しぐれ'], ['ねぎま', 'ねぎま'], ['かもめ', 'かもめ'], ['ぬいぐるみ', 'ぬいぐるみ'], ['夜行性', 'やこうせい'],
        ['なつめ', 'なつめ'], ['こたつ', 'こたつ'], ['ゆうやけ', 'ゆうやけ'], ['すずめ', 'すずめ'], ['わらびもち', 'わらびもち']],
      base: ['こんばんは', 'わこつ', 'きたー', '待ってた', '初見です', '夜のサーキット', '雰囲気すごい', 'ヘッドホン勢です', 'エンジン音いい', '作業用にしてる', '声すき', '字幕ありがたい', '午前二時…', '運転うまい', 'ライトの光きれい'],
      garage: ['どれにするの？', '全部かっこいい', '模型きれい', 'ガレージ暗い', 'ラリー車推し', 'フォーミュラ見たい', 'ロータリーの音聞きたい', 'くるくる回ってる'],
      chase: ['後ろ見ないで', '止まるなー', 'こわいこわい', '鏡やめて', '逃げてー', '前見て前', 'ヘッドホン外したい', 'ひえ', '鳥肌', '全開でいけ', 'なんかいる', '後ろ…'],
      late: ['おつかれ〜', '逃げ切った', 'こわかった', 'いい配信だった', '後ろ…', 'もう一周する？', 'おやすみ', '寝られない'],
      on: {
        car_rotary: ['ロータリー4つ！？', '耐久車かっこいい', '音聞きたい'], car_rally: ['ラリー車！', '四駆いいね', '800馬力'], car_v10: ['フォーミュラ速そう', '屋根ないの寒そう', 'V10！'],
        pick: ['いいね', 'それ推し', 'がんばれ〜'], lightsout: ['演出かっこいい', '暗っ', 'こわ'], clock: ['午前二時…', '止まるな', 'もう不穏'],
        figure0: ['いた', '人いた？', 'え？', '見えた'], begin: ['いる！', 'ひえっ', '後ろ後ろ', 'うわああ'], chase: ['逃げてー', '踏めー', '止まるな'],
        b_figure: ['また', 'いる…', '見ないで'], through: ['通り抜けた', 'ひえ', 'いまの…'], b_eyes: ['目…', '光ってる', 'こわ'], radio_laugh: ['子供の声', 'やめて', 'ひっ'], radio_hum: ['鼻歌…', 'ラジオ勝手に'],
        b_lights: ['真っ暗', '見えない', 'こわすぎ'], lights_fig: ['いた！', 'ひえっ'], b_thump: ['ドンって', '屋根！？', 'なにか乗った'], knock: ['叩いてる', 'こわいこわい', 'ひいい'],
        b_tunoff: ['電気消えてく', 'トンネルこわ'], b_close: ['近い！', '逃げて！', 'すぐ後ろ'], behind: ['声した', 'ヘッドホンやばい', '耳元…'], b_gone: ['いない？', 'まいた？'], back: ['また来た', 'しつこい'],
        glare: ['まぶし', '光った', '止まるな！'], gap_close: ['近い近い', '踏んで！', 'がんばれ'], scare_brake: ['ブレーキだめ', 'あっ', '踏んじゃった'],
        pit_catch: ['こわ', 'え…', 'なにそれ'], pit: ['無線きた', '聞き取れない', '早口すぎ', 'なんて？'], lap_start: ['スタート！', 'がんばれ'], lap: ['はやい', 'いいペース', 'ナイス'], lap_faster: ['速くなってる', 'ナイス！', 'うまい'],
        final: ['ラスト！', 'あと1周', 'いけー'], finish: ['888', 'おめ！', '逃げ切った！', 'すごい'], result: ['おつかれ〜', 'ナイスラン'], bye: ['おつ〜', 'おやすみ', '後ろ見ちゃった'],
        crash: ['あっ', 'ドンマイ', 'クラッシュ'], caught: ['ひえ', 'つかまった…', 'ドンマイ'], retry: ['がんばれ！', 'リベンジ'],
        scrape: ['こすった', 'ガリッ', 'あぶな'], offroad: ['はみ出た', 'セーフ？'], wide: ['ふくらんだ', 'あぶない'], late: ['突っ込みすぎ', 'あわわ'], jump: ['飛んだw', 'ジャンプ！'],
        v300: ['300キロ！？', 'はやすぎ'], wx_fog: ['霧こわ', '見えない'], wx_storm: ['雨きた', '滑る'], lightning: ['雷！', 'ピカッ'], flfig: ['いた！', '雷のとき…'], frost: ['寒そう', '凍結'], sputter: ['エンジン！', 'がんばれ車'],
      },
    },
  });
})();

/* ---------- 英語で話す出演者（アオイ・レイ）のときのセリフ：日本語の字幕 → [英語の字幕, 英語の読み] ---------- */
Jikkyo.english({ lines: {
  "こんばんは〜！夜ふかし組、集まって〜！": ["Good evening! Night owls, gather round!", "[ gUd 'ivnIN! 'naIt 'aULz, 'g{D@r 'raUnd! ]"],
  "やっほー！今日は真夜中のドライブ配信！": ["Hey hey! Tonight's a midnight drive stream!", "[ 'heI 'heI! t@'naIts @ 'mId%naIt 'draIv 'strim! ]"],
  "今日は「午前二時・周回」。夜のサーキットを3周するだけ…らしい。": ["Tonight it's Two A.M. Laps. Just three laps of a night circuit… apparently.", "[ t@'naIt Its 'tu 'eI'Em 'l{ps. 'dZVst 'Tri 'l{ps @v @ 'naIt 's3kIt… @'p{r@ntli. ]"],
  "まずは車選び。ガレージに3台あるんだって。": ["First, pick a car. There are three in the garage.", "[ 'f3st, 'pIk @ 'kAr. DEr Ar 'Tri In D@ g@'rAZ. ]"],
  "これは耐久車。ロータリーが4つ…？音が気になる。": ["This is the endurance car. Four rotors…? I'm curious about the sound.", "[ 'DIs Iz Di In'dUr@ns 'kAr. 'fOr 'roU4@rz…? aIm 'kjUri@s @'baUt D@ 'saUnd. ]"],
  "耐久車、屋根つきの低いやつ。かっこいい…。": ["The endurance car, low and with a roof. So cool…", "[ Di In'dUr@ns 'kAr, 'loU @nd wID @ 'ruf. soU 'kuL… ]"],
  "ラリー車！ターボで四駆、800馬力超え…！": ["A rally car! Turbo, four-wheel drive, over eight hundred horsepower…!", "[ @ 'r{li 'kAr! 't3boU, 'fOr%wiL 'draIv, 'oUv@r 'eIt 'hVndr@d 'hOrs%paU@r…! ]"],
  "ラリー車だ。旅に連れていきたい感じ。": ["The rally car. It feels like one you'd take on a trip.", "[ D@ 'r{li 'kAr. It 'filz laIk 'wVn jud 'teIk An @ 'trIp. ]"],
  "フォーミュラ。屋根ないの…夜だと寒そう。": ["A formula car. No roof… it looks cold at night.", "[ @ 'fOrmj@l@ 'kAr. 'noU 'ruf… It 'lUks 'koUld @t 'naIt. ]"],
  "フォーミュラ、いちばん速いやつだ。こわっ。": ["The formula car, the fastest one. Scary.", "[ D@ 'fOrmj@l@ 'kAr, D@ 'f{st@st wVn. 'skEri. ]"],
  "決めた！今日は{car}で走る！": ["Decided! Tonight I'm driving {car}!", "[ dI'saIdId! t@'naIt aIm 'draIvIN ] {car}！"],
  "うーん…よし、{car}にする！": ["Hmm… okay, I'll go with {car}!", "[ 'hVm… oU'keI, aIL 'goU wID ] {car}！"],
  "いってきま〜す！": ["Off I go!", "[ 'Of aI 'goU! ]"],
  "…え、電気消えた。演出？こわ…。": ["…Huh, the lights went out. Is that part of the show? Creepy…", "[ … 'hV, D@ 'laIts wEnt 'aUt. Iz D{t 'pArt @v D@ 'SoU? 'kripi… ]"],
  "午前2時…。3周、止まるな、だって。": ["Two A.M.… Three laps, don't stop, it says.", "[ 'tu 'eI'Em… 'Tri 'l{ps, 'doUnt 'stAp, It 'sEz. ]"],
  "夜のサーキット、誰もいない…貸し切りだ。": ["A night circuit, nobody around… I have it all to myself.", "[ @ 'naIt 's3kIt, 'noU%bAdi @'raUnd… aI h{v It 'OL t@ maI'sElf. ]"],
  "真っ暗。ライトの届くとこしか見えない…。": ["Pitch black. I can only see where the lights reach…", "[ 'pItS 'bl{k. aI k@n 'oUnli 'si wEr D@ 'laIts 'ritS… ]"],
  "…今、道のはじっこに人いなかった？": ["…Was there a person at the edge of the road just now?", "[ … w@z DEr @ 'p3s@n @t Di 'EdZ @v D@ 'roUd 'dZVst 'naU? ]"],
  "ライン通過！計測スタート！": ["Crossed the line! Timing starts!", "[ 'krOst D@ 'laIn! 'taImIN 'stArts! ]"],
  "1周目、スタート！": ["Lap one, go!", "[ 'l{p 'wVn, 'goU! ]"],
  "え、待って、鏡…！後ろに誰か立ってる！": ["Wait, the mirror…! Someone's standing behind me!", "[ 'weIt, D@ 'mIr@r…! 'sVmw%Vnz 'st{ndIN bI'haInd mi! ]"],
  "鏡に人…！？いま走ってるんだよ！？": ["A person in the mirror…?! I'm driving right now!", "[ @ 'p3s@n In D@ 'mIr@r…?! aIm 'draIvIN 'raIt 'naU! ]"],
  "追いかけてくる…止まっちゃだめなやつだ！": ["It's chasing me… I really can't stop!", "[ Its 'tSeIsIN mi… aI 'rili 'k{nt 'stAp! ]"],
  "止まるな、ってそういうこと！？踏む踏む！": ["Don't stop, that's what it meant?! Floor it, floor it!", "[ 'doUnt 'stAp, 'D{ts wVt It 'mEnt?! 'flOr It, 'flOr It! ]"],
  "また立ってる…。": ["Standing there again…", "[ 'st{ndIN 'DEr @'gEn… ]"],
  "道ばたに、人…見ない見ない。": ["Someone by the road… not looking, not looking.", "[ 'sVmw%Vn baI D@ 'roUd… 'nAt 'lUkIN, 'nAt 'lUkIN. ]"],
  "ねえ、あの人ずっと同じ人じゃない？": ["Hey, isn't that the same person every time?", "[ 'heI, 'Iz@nt D{t D@ 'seIm 'p3s@n 'Evri 'taIm? ]"],
  "…今、通り抜けた？道の真ん中にいたよね…！？": ["…Did I just drive through it? It was in the middle of the road…?!", "[ … dId aI 'dZVst 'draIv 'Tru It? It w@z In D@ 'mId@L @v D@ 'roUd…?! ]"],
  "木の中…なんか光ってない？": ["Inside the trees… isn't something glowing?", "[ In'saId D@ 'triz… 'Iz@nt 'sVmTIN 'gloUIN? ]"],
  "目…？目がいっぱいある…。": ["Eyes…? So many eyes…", "[ 'aIz…? soU 'mEni 'aIz… ]"],
  "外の気温、どんどん下がってる…。": ["The outside temperature keeps dropping…", "[ Di 'aUt%saId 'tEmpr@tS@r 'kips 'drApIN… ]"],
  "ピンって鳴った…凍結注意？寒っ。": ["It pinged… an ice warning? Brr.", "[ It 'pINd… @n 'aIs 'wOrnIN? ] ぶるっ。"],
  "ラジオ、勝手についた…鼻歌…？": ["The radio turned on by itself… humming…?", "[ D@ 'reIdioU 't3nd 'An baI It'sElf… 'hVmIN…? ]"],
  "子供の笑い声…やだやだやだ、消して…！": ["A child laughing… no no no, turn it off…!", "[ @ 'tSaILd 'l{fIN… 'noU 'noU 'noU, 't3n It 'Of…! ]"],
  "ライト消えた！見えない見えない！": ["The lights went out! I can't see, I can't see!", "[ D@ 'laIts wEnt 'aUt! aI 'k{nt 'si, aI 'k{nt 'si! ]"],
  "ちょっ、真っ暗！足、離しちゃだめ…！": ["Hey, pitch black! Don't lift your foot…!", "[ 'heI, 'pItS 'bl{k! 'doUnt 'lIft jOr 'fUt…! ]"],
  "…ついた。今、目の前に誰か…！": ["…They're back. Someone was right in front of me…!", "[ … DEr 'b{k. 'sVmw%Vn w@z 'raIt In 'frVnt @v mi…! ]"],
  "屋根になんか落ちた！？": ["Did something land on the roof?!", "[ dId 'sVmTIN 'l{nd An D@ 'ruf?! ]"],
  "ドンって…上、なにか乗ってる…？": ["A thud… is something on top of the car…?", "[ @ 'TVd… Iz 'sVmTIN An 'tAp @v D@ 'kAr…? ]"],
  "窓叩いてる！？走ってるのに！": ["It's knocking on the window?! I'm moving!", "[ Its 'nAkIN An D@ 'wIndoU?! aIm 'muvIN! ]"],
  "トンネルの電気が、後ろから消えてく…。": ["The tunnel lights are going out behind me…", "[ D@ 'tVn@L 'laIts Ar 'goUIN 'aUt bI'haInd mi… ]"],
  "近い近い！すぐ後ろにいる！": ["Too close, too close! It's right behind me!", "[ 'tu 'kloUs, 'tu 'kloUs! Its 'raIt bI'haInd mi! ]"],
  "うそ、追いつかれてる！？": ["No way, it's catching up?!", "[ 'noU 'weI, Its 'k{tSIN 'Vp?! ]"],
  "…今、耳元でなんか言った。": ["…Something just whispered in my ear.", "[ … 'sVmTIN 'dZVst 'wIsp@rd In maI 'Ir. ]"],
  "エンジン、息つきしてる！？がんばって！": ["The engine's sputtering?! Hang in there!", "[ Di 'EndZInz 'spVt@rIN?! 'h{N In 'DEr! ]"],
  "あれ…鏡にいない。まいた…？": ["Huh… it's not in the mirror. Did I lose it…?", "[ 'hV… Its 'nAt In D@ 'mIr@r. dId aI 'luz It…? ]"],
  "…また来た。遠くに立ってる。": ["…It's back. Standing far away.", "[ … Its 'b{k. 'st{ndIN 'fAr @'weI. ]"],
  "まぶしっ！後ろから照らされてる…！": ["So bright! Something's lighting me up from behind…!", "[ soU 'braIt! 'sVmTINz 'laItIN mi 'Vp frVm bI'haInd…! ]"],
  "光った！止まれって合図…？止まらないよ！": ["A flash! A signal to stop…? I'm not stopping!", "[ @ 'fl{S! @ 'sIgn@L t@ 'stAp…? aIm 'nAt 'stApIN! ]"],
  "追いつかれる、追いつかれる！": ["It's catching me, it's catching me!", "[ Its 'k{tSIN mi, Its 'k{tSIN mi! ]"],
  "ブレーキ踏むと、寄ってくる…！": ["When I brake, it comes closer…!", "[ wEn aI 'breIk, It 'kVmz 'kloUs@r…! ]"],
  "あっ、ブレーキ踏んじゃった…！": ["Ah, I hit the brakes…!", "[ 'A, aI 'hIt D@ 'breIks…! ]"],
  "びっくりして足が…！踏んで踏んで！": ["I got startled and my foot…! Gas, gas!", "[ aI gAt 'stArt@Ld @nd maI 'fUt…! 'g{s, 'g{s! ]"],
  "無線…早口すぎて、全然聞き取れない。": ["The radio… they're talking way too fast. I can't catch any of it.", "[ D@ 'reIdioU… DEr 'tOkIN 'weI tu 'f{st. aI 'k{nt 'k{tS 'Eni @v It. ]"],
  "ピットから？…ノイズすごい。": ["From the pit? …So much static.", "[ frVm D@ 'pIt? … soU 'mVtS 'st{tIk. ]"],
  "え、今なんて？もう一回言って！": ["Huh, what was that? Say it again!", "[ 'hV, 'wVt w@z 'D{t? 'seI It @'gEn! ]"],
  "今…{r}。": ["Just now… {r}.", "[ 'dZVst 'naU… ] {r}。"],
  "{n}、{time}！": ["{n}, {time}!", "{n}、{time}！"],
  "タイム、{time}。まだいける…！": ["Time, {time}. I can still push…!", "[ 'taIm, ] {time}。[ aI k@n 'stIL 'pUS…! ]"],
  "{time}！さっきより速い！": ["{time}! Faster than before!", "{time}！[ 'f{st@r D{n bI'fOr! ]"],
  "ファイナルラップ！あと1周…！": ["Final lap! One more to go…!", "[ 'faIn@L 'l{p! 'wVn 'mOr t@ 'goU…! ]"],
  "チェッカー！逃げ切った〜！": ["Checkered flag! I got away!", "[ 'tSEk@rd 'fl{g! aI 'gAt @'weI! ]"],
  "ゴール！3周走りきった〜！": ["Finish! I made it through all three laps!", "[ 'fInIS! aI 'meId It 'Tru 'OL 'Tri 'l{ps! ]"],
  "ベストは{best}。…こわかった〜。": ["Best lap, {best}. …That was terrifying.", "[ 'bEst 'l{p, ] {best}。[ … 'D{t w@z 'tEr@faIIN. ]"],
  "見てくれてありがとう！おやすみ…後ろ、見ないでね。": ["Thanks for watching! Good night… and don't look behind you.", "[ 'T{Nks fOr 'wAtSIN! gUd 'naIt… @nd 'doUnt 'lUk bI'haInd ju. ]"],
  "ぶつかった！？うそでしょ…！": ["I crashed?! You've got to be kidding…!", "[ aI 'kr{St?! juv 'gA4@ bi 'kIdIN…! ]"],
  "…つかまった。": ["…It caught me.", "[ … It 'kOt mi. ]"],
  "…最初からだ。もう一回！今度こそ。": ["…Back to the start. One more time! This time for sure.", "[ … 'b{k t@ D@ 'stArt. 'wVn 'mOr 'taIm! 'DIs 'taIm fOr 'SUr. ]"],
  "こすった！": ["Scraped it!", "[ 'skreIpt It! ]"],
  "うわっ、壁近い！": ["Whoa, the wall's close!", "[ 'woU, D@ 'wOLz 'kloUs! ]"],
  "ガリって言った…ごめん車。": ["That was a nasty scrape… sorry, car.", "[ 'D{t w@z @ 'n{sti 'skreIp… 'sAri, 'kAr. ]"],
  "はみ出た！": ["Off the track!", "[ 'Of D@ 'tr{k! ]"],
  "ちょっと外れた…戻って戻って。": ["I drifted off a bit… back on, back on.", "[ aI 'drIftId 'Of @ 'bIt… 'b{k 'An, 'b{k 'An. ]"],
  "ふくらんだ…！": ["I ran wide…!", "[ aI 'r{n 'waId…! ]"],
  "あぶなっ、外いっぱい！": ["Yikes, all the way to the edge!", "[ 'jaIks, 'OL D@ 'weI t@ Di 'EdZ! ]"],
  "突っ込みすぎた！曲がって〜！": ["Went in too hot! Turn, turn!", "[ wEnt 'In tu 'hAt! 't3n, 't3n! ]"],
  "飛んだ！？": ["Did I fly?!", "[ dId aI 'flaI?! ]"],
  "ふわってした…！": ["It went all floaty…!", "[ It wEnt 'OL 'floUti…! ]"],
  "{v}出てる…！はやっ。": ["{v}…! So fast.", "{v}…！[ soU 'f{st. ]"],
  "今、後ろで火、出てなかった？": ["Wait, was there fire coming out behind me?", "[ 'weIt, w@z DEr 'faI@r 'kVmIN 'aUt bI'haInd mi? ]"],
  "霧…前が全然見えない。": ["Fog… I can't see anything ahead.", "[ 'fAg… aI 'k{nt 'si 'EniTIN @'hEd. ]"],
  "雨降ってきた…滑りそう。": ["It started raining… feels slippery.", "[ It 'stArtId 'reInIN… 'filz 'slIp@ri. ]"],
  "雨、やんだ？ちょっと見えるようになった。": ["Did the rain stop? I can see a little better.", "[ dId D@ 'reIn 'stAp? aI k@n 'si @ 'lIt@L 'bEt@r. ]"],
  "光った！雷…？": ["A flash! Lightning…?", "[ @ 'fl{S! 'laItnIN…? ]"],
  "ピカってした…音、遅れて来る。": ["It flashed… the sound comes later.", "[ It 'fl{St… D@ 'saUnd kVmz 'leIt@r. ]"],
  "今、光ったとき…道の先に人、いた。": ["Just now, in that flash… there was a person up ahead.", "[ 'dZVst 'naU, In D{t 'fl{S… DEr w@z @ 'p3s@n 'Vp @'hEd. ]"],
  "トンネル。音がこもる…。": ["A tunnel. The sound gets muffled…", "[ @ 'tVn@L. D@ 'saUnd gEts 'mVf@Ld… ]"],
  "エンジンの音、ずっと聞いてられる。": ["I could listen to this engine forever.", "[ aI kUd 'lIs@n t@ DIs 'EndZIn f@'rEv@r. ]"],
  "夜の山、真っ暗。星も見えない…。": ["The mountains at night, pitch black. No stars either…", "[ D@ 'maUnt@nz @t 'naIt, 'pItS 'bl{k. 'noU 'stArz 'iD@r… ]"],
  "ハンドル、思ったより重い。": ["The steering's heavier than I thought.", "[ D@ 'stIrINz 'hEvi@r D{n aI 'TOt. ]"],
  "コメント読んでるよ〜。返せないけど。": ["I'm reading your comments! Can't reply right now, though.", "[ aIm 'ridIN jOr 'kAmEnts! 'k{nt rI'plaI 'raIt 'naU, 'DoU. ]"],
  "どれもかっこいいなあ…。": ["They're all so cool…", "[ DEr 'OL soU 'kuL… ]"],
  "鏡、見たくない…。": ["I don't want to look in the mirror…", "[ aI 'doUnt 'wAnt t@ 'lUk In D@ 'mIr@r… ]"],
  "止まっちゃだめ、止まっちゃだめ…。": ["Don't stop, don't stop…", "[ 'doUnt 'stAp, 'doUnt 'stAp… ]"],
  "手汗すごい…。": ["My hands are so sweaty…", "[ maI 'h{ndz Ar soU 'swEti… ]"],
  "ずっと全開。こわい、けど速いの気持ちいい…。": ["Full throttle the whole way. Scary, but speed feels good…", "[ 'fUL Tr'At@L D@ 'hoUL 'weI. 'skEri, bVt 'spid 'filz 'gUd… ]"],
  "前だけ見る。前だけ…。": ["Eyes forward. Only forward…", "[ 'aIz 'fOrw@rd. 'oUnli 'fOrw@rd… ]"],
  "ヘッドホンの人、後ろの声、聞こえてる…？": ["Headphone people, can you hear the voice behind us…?", "[ 'hEd%foUn 'pip@L, k@n ju 'hIr D@ 'vOIs bI'haInd Vs…? ]"],
  "これ、ホラーゲームだったの…？": ["Was this a horror game…?", "[ w@z DIs @ 'hOr@r 'geIm…? ]"],
  "もう追ってこない…よね？": ["It's not chasing me anymore… right?", "[ Its 'nAt 'tSeIsIN mi %Eni'mOr… 'raIt? ]"],
  "ゆっくり走ってると、静かだね。": ["Driving slowly, it's so quiet.", "[ 'draIvIN 'sloUli, Its soU 'kwaI@t. ]"],
  "みんな、最後まで付き合ってくれてありがとう。": ["Thanks for staying with me till the end, everyone.", "[ 'T{Nks fOr 'steIIN wID mi tIL Di 'End, 'Evriw%Vn. ]"],
  "{name}さん、こんばんは〜！": ["{name}-san, good evening!", "{name}さん、[ gUd 'ivnIN! ]"],
  "{name}さん、コメントありがとう！": ["{name}-san, thanks for the comment!", "{name}さん、[ 'T{Nks fOr D@ 'kAmEnt! ]"],
  "{name}さん、わかる〜。": ["{name}-san, I know, right?", "{name}さん、[ aI 'noU, 'raIt? ]"],
  "{name}さん、やめて〜、こわいこと言わないで。": ["{name}-san, stop it, don't say scary things.", "{name}さん、[ 'stAp It, 'doUnt 'seI 'skEri 'TINz. ]"],
  "{name}さん、見てくれてありがとう！": ["{name}-san, thanks for watching!", "{name}さん、[ 'T{Nks fOr 'wAtSIN! ]"],
  "{name}さん、いま{v}！見ないで答えるの無理〜。": ["{name}-san, {v} right now! I can't answer without looking.", "{name}さん、{v} [ 'raIt 'naU! aI 'k{nt '{ns@r wI'DaUt 'lUkIN. ]"],
  "{name}さん、えっと…{g}くらい。見たくない…。": ["{name}-san, um… about {g}. I don't want to look…", "{name}さん、[ 'Vm… @'baUt ] {g}。[ aI 'doUnt 'wAnt t@ 'lUk… ]"],
  "{name}さん、えっとね…{r}。": ["{name}-san, let's see… {r}.", "{name}さん、[ 'lEts 'si… ] {r}。"],
  "{name}さん、いま{n}！": ["{name}-san, it's {n} now!", "{name}さん、[ Its ] {n} [ 'naU! ]"],
  "{name}さん、むりむり！前見てないと死んじゃう。": ["{name}-san, no way! If I don't watch the road, I'm done for.", "{name}さん、[ 'noU 'weI! If aI 'doUnt 'wAtS D@ 'roUd, aIm 'dVn fOr. ]"],
  "{name}さん、踏むと寄ってくるの…。だから踏みたくない。": ["{name}-san, when I brake it comes closer… so I don't want to.", "{name}さん、[ wEn aI 'breIk It kVmz 'kloUs@r… soU aI 'doUnt 'wAnt t@. ]"],
  "{name}さん、もう限界だってば…わかった、踏む！": ["{name}-san, I'm already at my limit… fine, flooring it!", "{name}さん、[ aIm OL'rEdi @t maI 'lImIt… 'faIn, 'flOrIN It! ]"],
  "{name}さん、ゆっくりしたら追いつかれちゃう！": ["{name}-san, if I slow down, it'll catch me!", "{name}さん、[ If aI 'sloU 'daUn, 'It@L 'k{tS mi! ]"],
  "{name}さん、でしょ〜？…あっ、次ふくらむかも。": ["{name}-san, right? …Oops, I might run wide on the next one.", "{name}さん、[ 'raIt? … 'Ups, aI maIt 'rVn 'waId An D@ 'nEkst wVn. ]"],
  "{name}さん、{car}！ガレージで選んだの。": ["{name}-san, {car}! I picked it in the garage.", "{name}さん、{car}！[ aI 'pIkt It In D@ g@'rAZ. ]"],
  "{name}さん、わかる。{snd}。": ["{name}-san, I know. {snd}.", "{name}さん、[ aI 'noU. ] {snd}。"],
  "{name}さん、聞いてないよ〜！ドライブって言ったのに！": ["{name}-san, nobody told me! They said it was a drive!", "{name}さん、[ 'noU%bAdi 'toUld mi! DeI 'sEd It w@z @ 'draIv! ]"],
  "{name}さん、やっぱりいたよね！？見間違いじゃなかった…。": ["{name}-san, there was someone, right?! I didn't imagine it…", "{name}さん、[ DEr w@z 'sVmw%Vn, 'raIt?! aI 'dIdnt I'm{dZIn It… ]"],
  "{name}さん、いまのところ{b}！": ["{name}-san, so far, {b}!", "{name}さん、[ soU 'fAr, ] {b}！"],
  "{name}さん、ワイパー全開。前見えないよ〜。": ["{name}-san, wipers on full. I can't see ahead!", "{name}さん、[ 'waIp@rz An 'fUL. aI 'k{nt 'si @'hEd! ]"],
  "{name}さん、こわいに決まってるでしょ！": ["{name}-san, of course I'm scared!", "{name}さん、[ @v 'kOrs aIm 'skErd! ]"],
  "{name}さん、まだ迷ってる。ぜんぶ見てから決める！": ["{name}-san, still deciding. I'll look at them all first!", "{name}さん、[ 'stIL dI'saIdIN. aIL 'lUk @t D@m 'OL 'f3st! ]"],
  "{name}さん、いらっしゃい！ゆっくり…できない配信だけど、どうぞ。": ["{name}-san, welcome! Not exactly a relaxing stream, but come on in.", "{name}さん、[ 'wElk@m! 'nAt Ig'z{ktli @ rI'l{ksIN 'strim, bVt 'kVm An 'In. ]"],
  "{name}さん、そうなの。エンジンの音まで計算で作ってるんだって。": ["{name}-san, yes. Even the engine sound is calculated, apparently.", "{name}さん、[ 'jEs. 'iv@n Di 'EndZIn 'saUnd Iz 'k{lkj@leI4Id, @'p{r@ntli. ]"],
  "{name}さん、えへへ、ありがとう。いまそれどころじゃないけど！": ["{name}-san, hehe, thank you. Not really the time, though!", "{name}さん、[ 'hihi, 'T{Nk ju. 'nAt 'rili D@ 'taIm, 'DoU! ]"],
  "{name}さん、ありがとう！もう二度と走らない…かも。": ["{name}-san, thank you! I'm never driving that again… maybe.", "{name}さん、[ 'T{Nk ju! aIm 'nEv@r 'draIvIN 'D{t @'gEn… 'meIbi. ]"],
} });
