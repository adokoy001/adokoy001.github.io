/*! Jikkyo 1.3.0 — ゲームを遊びながらしゃべる VTuber の配信のような動画を、ブラウザの中で作る土台
 *
 * 画面：左に大きくゲーム、右下に VTuber（腰から上。ゲームの右下の角に重ねる）、右上に視聴者の書き込みが流れる、下に小さく字幕。
 * ゲームは、自作の HTML のゲームを、そのまま同じページの中（iframe）で動かす。遊ぶのは「自動の遊び手」（回のファイルが書く）。
 * VTuber の声は OtoVoice、体は 翠卓（3D リーチ麻雀）の8人（vtuber.js）。動画は、画面と音を、そのまま録画して作る（実時間）。
 *
 * ■ 読みこむ順番
 *   otovoice.js、suitaku-chara.js、chara-common.js、vtuber.js、jikkyo.js、そして回（play-xxx.js。Jikkyo.play({...}) を呼ぶ）
 *
 * ■ 回の書き方（Jikkyo.play）
 *   id, title（配信のタイトル）, game（ゲームの HTML のファイル名）, tags（タイトルの下に出す短い言葉）
 *   short（ゲームを選ぶところに出す短い名前）, blurb（ひとことの説明）, minutes（ゲームの終わりまでのおよその分）, character（はじめの出演者）
 *   setup(g)        ゲームを読みこんだあとに1回。g.win はゲームの window、g.doc は document
 *   canvases(g)     → [ゲームの絵の canvas, ...]。上から重ねて写す（あとの物ほど上）
 *   overlay(ctx,x,y,w,h,s)  写したあとに足す絵（走査線など。なくてもよい）
 *   start(g)        「配信開始」で1回（ゲームの音を鳴らしはじめる、など）
 *   step(g, dt, t, J)  毎こま。自動の遊び手と、出来事の見張り。出来事は J.emit('名前') で知らせる。t は配信が始まってからの秒
 *                   セリフに値を差しこむときは J.emit('名前', { vars: { form: ['字幕の文字', '読み'] } })（セリフの {form} に入る）
 *   busy(g, t)      → true のあいだは、間つなぎのひとこと・掛け合い・返事を待つ（ゲームの無線が鳴っているあいだ、など。なくてもよい）
 *   lines           { 出来事の名前: { p: 優先度 1〜3, cd: 次に同じ出来事で話すまでの秒, ch: 話す確率, say: [セリフ, …] } }
 *                   セリフ { t: '字幕', k: '読み（OtoVoice。ひらがなと記号）', m: 表情, g: しぐさ, st: 調子, cam: true（視聴者に向いて話す） }
 *                   表情 neutral smile focus surprise sad proud ／ しぐさ nod cheer sigh recoil think approve hesitate settle look declare
 *   script          [ [秒, '出来事の名前'], … ]  決まった時刻に起こす出来事（あいさつなど）
 *   idle            { after: 黙っていたら何秒で, say: [セリフ…], 段階の名前: [セリフ…] } 間をつなぐひとこと。J.phase('段階の名前') で切りかえる（例：撃ち方やめのあと）
 *   chat            { names: [[表示, 読み], …], base: [書き込み…], 段階の名前: [書き込み…], on: { 出来事: [書き込み…] }, rate: 1秒あたりの数 }
 *   reply           [ { t: '{name}さん、ありがとう！', k: '{name}さん、ありがとう！', m, g, early: true（はじめの4分だけ）, to: /すき|いい/（この書き込みにだけ） } ]  ふつうの書き込みに答える（{name} に名前の読みが入る）
 *   talk            { every: [最短, 最長]秒, items: [ { q: '視聴者の問いかけ', when(g, t) → 出してよいか, a: 答えのセリフ（{name}、vars の名前が使える）,
 *                     vars(g) → { n: ['字幕の文字', '読み'] }, act(g, J) 答えたあとに遊び手がすること, once: false（何度も使う） } ] }  掛け合い
 *   J（step などで使う） emit(出来事) say(セリフ, 優先度, vars) chat(書き込み, [名前, 読み], { sc: { amount } }) → 書き込み（.hl = J.t で光らせられる）
 *                   later(秒, 関数) talking()（視聴者に向いて話している） speaking() mood(表情) phase(段階) character()（いまの出演者の id）
 *                   chat の3つめに { sc: { amount: 500 } } を渡すと、投げ銭（金額で色の変わるカード）として書き込み欄に出る
 *   allLines(id)    → [ ['場所の名前', セリフ], … ] 回が自分で読むセリフ（雑談など）。台本チェックに入り、id（出演者）のぶんは声を先に作っておく（なくてもよい）
 *   end(g, t)       → true になったら、配信を終わる（録画も止まる）
 *   zatsu           雑談（なくてもよい）。{ every: [最短, 最長]秒, introAt: 秒, tipEvery: [最短, 最長]秒, outro: 締めの雑談の秒,
 *                     quiet(g, t) → 話しはじめてよいか, vars(g) → 振り返りに入れる値, bits: [掛け合い…], after: [振り返りの掛け合い…], sc: [投げ銭…], auto: false（回が自分で J.zatsu を動かす） }
 *                   掛け合い ＝ [ ['c', '書き込み'], ['s', セリフ], ['c2', '別の人'], ['s', セリフ], … ]  c2・c3 は別の人、w は待つ秒、sc は投げ銭 [ 'sc', 金額, '書き込み' ]、do は関数
 *                     { on: 'open mid end play', bit: [...] } の形なら、使う場面をしぼれる（open はじめ、mid 合間、end 締め、play 遊んでいる最中）。回の bits で on のないものは、遊んでいる最中だけ。['need', '印'] で始まるものは J.zatsu.flag('印') のあとだけ
 *                   自動では：はじめに出演者の自己紹介 → 静かなときに every ごとに掛け合い（回の話・出演者の話・世間話）→ ときどき投げ銭とお礼
 *                   outro があると、'bye' の出来事を一度あずかって、締めの雑談（after → 投げ銭 → 締めの話）をしてから、'wrap'、そして 'bye' を言う
 *   J.zatsu         queue(掛け合い, vars) pick('play' など) tip() intro() flag('印') pending()（残りの数） busy()   回が雑談を自分で進めるとき
 *
 * ■ 雑談の話（共通）と、英語で話す出演者
 *   Jikkyo.zatsudan({ cast: { 出演者id: { intro, big, bits } }, common: [{ on, bit }], sc: [{ a: 金額, w: 出やすさ, text, r: セリフ }], thanks: { small, mid, big }, wrap: [セリフ], chat: { outro: [書き込み] } })
 *   Jikkyo.english({ speakers: ['aoi', 'rei'], lines: { '日本語の字幕': ['英語の字幕', '英語の読み'] }, chat: [書き込み], names: [[名前, 読み]] })
 *     英語で話す出演者のときは、セリフを英語にして、字幕の下に日本語を小さく出す。セリフに en: ['英語の字幕', '英語の読み'] を書いてもよい
 *     英語の読みは OtoVoice の [ ] の中の書き方（例 "[ 'hEloU ]"）。{name} などの差しこみは [ ] の外に置く（{name}さん、[ 'hAI! ]）
 *     差しこむ値は ['字幕', '読み', '英語の字幕', '英語の読み']。英語がなければ、数字は自動で英語の数にする（Jikkyo.enNum(数) → 読み）
 *
 * ■ 決まり
 *   字幕は1行 全角28字くらいまで（2行まで出る）。読みは OtoVoice.check(k).ok が true であること。Jikkyo.check(回) で調べられる（英語の訳も）
 *
 * ■ 知っておくこと
 *   ・録画は実時間（10分の配信は10分かかる）。録画のあいだは、このタブを前に出しておく（隠れると止まる）
 *   ・音は耳で確かめて作ったものではない。声の見立て、セリフの間合いは、作り手の見積もり
 */
const Jikkyo = (() => {
  'use strict';
  const VERSION = '1.3.0';
  // 投げ銭の色（金額で変わる）：bg 見出し、body 本文、ink 見出しの字、bodyInk 本文の字
  function scTier(n) {
    if (n >= 10000) return { bg: '#c4161c', body: '#e62117', ink: '#ffffff', bodyInk: '#ffffff' };
    if (n >= 5000) return { bg: '#b0124f', body: '#e0245e', ink: '#ffffff', bodyInk: '#ffffff' };
    if (n >= 2000) return { bg: '#d35400', body: '#ef6c00', ink: '#ffffff', bodyInk: '#ffffff' };
    if (n >= 1000) return { bg: '#e09a00', body: '#ffb300', ink: '#2a1b00', bodyInk: '#2a1b00' };
    if (n >= 500) return { bg: '#00a88f', body: '#1de9b6', ink: '#00241f', bodyInk: '#00241f' };
    if (n >= 200) return { bg: '#0097b8', body: '#00e5ff', ink: '#002a33', bodyInk: '#002a33' };
    return { bg: '#1257a8', body: '#1e88e5', ink: '#ffffff', bodyInk: '#ffffff' };
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t, rnd = (a, b) => a + Math.random() * (b - a), pick = a => a[(Math.random() * a.length) | 0];
  const plays = {};
  const play = p => { plays[p.id] = p; return p; };
  const zen = s => [...String(s || '')].reduce((a, c) => a + (c.charCodeAt(0) < 0x2000 ? 0.5 : 1), 0);

  /* ---------- 数の読み（日本語・英語） ---------- */
  const KD = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
  function kanaNum(n) {
    n = Math.max(0, Math.floor(n)); if (!n) return 'ぜろ';
    let s = ''; const man = Math.floor(n / 10000); if (man) { s += kanaNum(man) + 'まん'; n %= 10000; }
    const sen = Math.floor(n / 1000); if (sen) { s += sen === 1 ? 'せん' : sen === 3 ? 'さんぜん' : sen === 8 ? 'はっせん' : KD[sen] + 'せん'; n %= 1000; }
    const hy = Math.floor(n / 100); if (hy) { s += hy === 1 ? 'ひゃく' : hy === 3 ? 'さんびゃく' : hy === 6 ? 'ろっぴゃく' : hy === 8 ? 'はっぴゃく' : KD[hy] + 'ひゃく'; n %= 100; }
    const ju = Math.floor(n / 10); if (ju) { s += (ju === 1 ? '' : KD[ju]) + 'じゅう'; n %= 10; }
    return s + (n ? KD[n] : '');
  }
  const EN1 = ["'zIroU", "'wVn", "'tu", "'Tri", "'fOr", "'faIv", "'sIks", "'sEv@n", "'eIt", "'naIn", "'tEn", "I'lEv@n", "'twElv", "T3'tin", "fOr'tin", "fIf'tin", "sIks'tin", "sEv@n'tin", "eI'tin", "naIn'tin"];
  const EN10 = ['', '', "'twEnti", "'T3ti", "'fOrti", "'fIfti", "'sIksti", "'sEv@nti", "'eIti", "'naInti"];
  // 英語の数の読み（OtoVoice の [ ] の中の書き方。[ ] はつけない）
  function enNum(n) {
    n = Math.max(0, Math.floor(n)); if (n < 20) return EN1[n];
    if (n < 100) return EN10[(n / 10) | 0] + (n % 10 ? ' ' + EN1[n % 10] : '');
    if (n < 1000) return EN1[(n / 100) | 0] + " 'hVndr@d" + (n % 100 ? ' ' + enNum(n % 100) : '');
    if (n < 1e6) return enNum((n / 1000) | 0) + " 'TaUz@nd" + (n % 1000 ? ' ' + enNum(n % 1000) : '');
    return enNum((n / 1e6) | 0) + " 'mIlj@n" + (n % 1e6 ? ' ' + enNum(n % 1e6) : '');
  }
  // 金額の差しこみ：['字幕', '読み', '英語の字幕', '英語の読み']
  const yen = n => [n.toLocaleString('ja-JP') + '円', kanaNum(n) + 'えん', '¥' + n.toLocaleString('en-US'), '[ ' + enNum(n) + " 'jEn ]"];

  /* ---------- 英語で話す出演者 ---------- */
  const EN = { who: new Set(), dict: new Map(), chat: [], names: [] };
  function english(o) {
    o = o || {}; if (o.speakers) EN.who = new Set(o.speakers);
    for (const [ja, v] of Object.entries(o.lines || {})) EN.dict.set(ja, v);
    if (o.chat) EN.chat.push(...o.chat); if (o.names) EN.names.push(...o.names);
  }
  const isEN = id => EN.who.has(id);
  // 英語で話す出演者なら、セリフを英語に差しかえる（tr に日本語を残す。訳がなければ、そのまま日本語で話す）
  function localize(L, id) {
    if (!L || !isEN(id)) return L; const e = L.en || EN.dict.get(L.t); if (!e) return L;
    return Object.assign({}, L, { t: e[0], k: e[1], tr: L.t, en: null });
  }
  // 差しこむ値：['字幕', '読み'（, '英語の字幕', '英語の読み'）]。英語がないときは、数字なら英語の数にする
  function varPair(b, en) {
    const a = Array.isArray(b) ? b : [String(b), String(b)];
    if (en) { if (a.length >= 4) return [a[2], a[3]]; const m = /^(\d[\d,]*)/.exec(String(a[0])); if (m) return [m[1], '[ ' + enNum(+m[1].replace(/,/g, '')) + ' ]']; }
    return [a[0], a[1] != null ? a[1] : a[0]];
  }

  /* ---------- 雑談の話（共通。出演者ごとの話・世間話・投げ銭・お礼） ---------- */
  const ZD = { cast: {}, common: [], sc: [], thanks: { small: [], mid: [], big: [] }, wrap: [], chat: { outro: [] } };
  function zatsudan(o) {
    o = o || {}; Object.assign(ZD.cast, o.cast || {}); ZD.common.push(...(o.common || [])); ZD.sc.push(...(o.sc || [])); ZD.wrap.push(...(o.wrap || []));
    for (const k of ['small', 'mid', 'big']) ZD.thanks[k].push(...((o.thanks || {})[k] || []));
    for (const [k, v] of Object.entries(o.chat || {})) (ZD.chat[k] = ZD.chat[k] || []).push(...v);
  }
  const bitOf = x => (Array.isArray(x) ? x : x && x.bit) || [];
  // 雑談で話すセリフを、場所の名前つきで並べる（台本チェックと、声の先読みに）。id があれば、その出演者のぶんだけ
  function zLines(P, id) {
    const out = [], add = (w, L) => { if (!L) return; if (L.if) { const e = L.if === 'en'; if (!e || !id || isEN(id)) out.push([w + '(はい)', L.yes]); if (!e || !id || !isEN(id)) out.push([w + '(いいえ)', L.no]); } else out.push([w, L]); };
    const bits = (w, list) => (list || []).forEach((x, i) => bitOf(x).forEach(s => s[0] === 's' && add(`${w}#${i + 1}`, s[1])));
    const ids = id ? [id] : Object.keys(ZD.cast);
    for (const cid of ids) { const C = ZD.cast[cid]; if (!C) continue; add(`雑談(${cid})自己紹介`, C.intro); add(`雑談(${cid})使い道`, C.big); bits(`雑談(${cid})`, C.bits); }
    bits('世間話', ZD.common); ZD.sc.forEach((e, i) => add(`投げ銭#${i + 1}`, e.r)); ZD.wrap.forEach((L, i) => add(`締め#${i + 1}`, L));
    for (const [tier, list] of Object.entries(ZD.thanks)) list.forEach((L, i) => add(`お礼(${tier})#${i + 1}`, L));
    const Z = P && P.zatsu; if (Z) { bits('回の雑談', Z.bits); bits('振り返り', Z.after); (Z.sc || []).forEach((e, i) => add(`回の投げ銭#${i + 1}`, e.r)); }
    return out;
  }
  // 回のセリフをぜんぶ並べる（出来事・間つなぎ・返事・掛け合い・回が読むもの・雑談）
  function playLines(P, id) {
    const out = [];
    for (const [ev, o] of Object.entries(P.lines || {})) (o.say || []).forEach((L, i) => out.push([`${ev}#${i + 1}`, L]));
    for (const [ph, v] of Object.entries(P.idle || {})) if (Array.isArray(v)) v.forEach((L, i) => out.push([`間(${ph})#${i + 1}`, L]));
    (P.reply || []).forEach((L, i) => out.push([`返事#${i + 1}`, L]));
    ((P.talk && P.talk.items) || []).forEach((it, i) => out.push([`掛け合い#${i + 1}`, it.a]));
    if (typeof P.allLines === 'function') { try { for (const x of P.allLines(id) || []) out.push(x); } catch (e) { console.warn('allLines', e); } }
    return out.concat(zLines(P, id));
  }

  /* 画面の割りつけ（1280×720 で考えた値。ほかの大きさでは、そのまま倍率をかける） */
  const LAY = {
    game: { x: 24, y: 24, w: 944, h: 531 },
    chat: { x: 988, y: 24, w: 268, h: 236 },
    vt: { x: 812, w: 468, h: 560, fade: 40 },        // VTuber の絵の枠（下の端は画面の下にそろえる）。左の端 fade だけ、ぼかして消す（ひじが枠にかかったとき、切れ目が見えないように）
    title: { x: 24, y: 572 },
    sub: { x: 24, y: 620, w: 760, h: 76 },
    plate: { x: 1258, y: 694 },
  };
  const FD = '"Zen Maru Gothic","Hiragino Maru Gothic ProN","Hiragino Sans","Yu Gothic",sans-serif';
  const FB = '"Zen Kaku Gothic New","Hiragino Sans","Yu Gothic",sans-serif';
  const FM = '"JetBrains Mono",ui-monospace,Menlo,monospace';

  // 台本チェック：字幕の長さと、読み
  function check(P) {
    const out = [];
    const each = (where, L) => { if (!L || !L.t) return; if (zen(L.t) > 56) out.push(`${where}：字幕が長い（全角${zen(L.t)}字。56字まで）「${L.t}」`);
      const k = String(L.k || '').replace(/\{name\}/g, 'ななし').replace(/\{\w+\}/g, 'いち'); try { const r = OtoVoice.check(k); if (!r.ok) out.push(`${where}：読み「${L.k}」：${(r.issues || r.errors || []).map(e => e.message || e.msg || JSON.stringify(e)).join('、') || '読めない'}`); } catch (e) { out.push(`${where}：読み「${L.k}」：${e.message}`); } };
    ((P.talk && P.talk.items) || []).forEach((it, i) => { if (zen(it.q) > 30) out.push(`掛け合い#${i + 1}：問いかけが長い「${it.q}」`); });
    // 日本語のセリフ（雑談は、全員のぶん）
    const all = playLines(P); for (const [where, L] of all) each(where, L);
    // 英語で話す出演者のぶん：訳があるか、英語の字幕と読み
    for (const id of EN.who) {
      const mine = playLines(P, id), seen = new Set();
      for (const [where, L] of mine) {
        const list = L && L.if ? (L.if === 'en' ? [L.yes] : [L.yes, L.no]) : [L];
        for (const L1 of list) { if (!L1 || !L1.t || seen.has(L1.t)) continue; seen.add(L1.t); const X = localize(L1, id);
          if (X === L1) out.push(`英語(${id}) ${where}：訳がない「${L1.t}」`); else each(`英語(${id}) ${where}`, X); }
      }
    }
    for (const [n, k] of ((P.chat && P.chat.names) || []).concat(EN.names)) { try { if (!OtoVoice.check(k).ok) out.push(`名前「${n}」の読み「${k}」が読めない`); } catch (e) { out.push(`名前「${n}」：${e.message}`); } }
    return out;
  }

  /* ================================================================ */
  function mount(o) {
    const P = o.play, cv = o.canvas, ctx = cv.getContext('2d'), host = o.host || document.body, base = o.base || '';
    const L = {}, handlers = {}; let api = null;
    const on = (k, f) => ((handlers[k] = handlers[k] || []).push(f), api), emit = (k, v) => (handlers[k] || []).forEach(f => { try { f(v); } catch (e) { console.error(e); } });
    let W = 1280, H = 720, S = 1;
    const st = { state: 'loading', t: 0, t0: 0, live: false, ended: false, viewers: 0, subs: true, chatOn: true, lastSpeak: -99, rec: null };

    /* ---------- 音：ゲームの音と声を、ひとつの AudioContext でまとめる（録画にも、そのまま入る） ---------- */
    const AC = window.AudioContext || window.webkitAudioContext, actx = new AC({ latencyHint: 'playback' });
    const master = actx.createGain(), gameBus = actx.createGain(), voiceBus = actx.createGain(), recDest = actx.createMediaStreamDestination();
    gameBus.gain.value = .8; voiceBus.gain.value = 1.0;
    // 声は、少しだけ明るく、強さをそろえる
    const vcomp = actx.createDynamicsCompressor(); vcomp.threshold.value = -20; vcomp.ratio.value = 3; vcomp.attack.value = .005; vcomp.release.value = .2;
    // 全体の出口に、頭打ち（大きな音がそろって鳴ったときに割れないように）
    const limit = actx.createDynamicsCompressor(); limit.threshold.value = -6; limit.knee.value = 4; limit.ratio.value = 14; limit.attack.value = .002; limit.release.value = .18;
    voiceBus.connect(vcomp); vcomp.connect(master); gameBus.connect(master); master.connect(limit); limit.connect(actx.destination); limit.connect(recDest);
    // ゲームの中で new AudioContext() したときに渡すもの：本物はこちらの actx。出口（destination）だけ、ゲーム用の口（gameBus）に差しかえる
    // suspend・close は、何もしない（ゲームが「タブが隠れたら音を止める」作りでも、配信の時計は止めない）
    window.__jkGameAudio = () => new Proxy(actx, { get(t, p) { if (p === 'destination') return gameBus; if (p === 'suspend' || p === 'close') return () => Promise.resolve(); const v = Reflect.get(t, p, t); return typeof v === 'function' ? v.bind(t) : v; }, set(t, p, v) { return Reflect.set(t, p, v, t); } });

    /* ---------- ゲーム ---------- */
    const G = { frame: null, win: null, doc: null };
    const PRELUDE = `(function(){var Q=[],n=0;window.requestAnimationFrame=function(cb){Q.push([++n,cb]);return n};window.cancelAnimationFrame=function(i){for(var k=0;k<Q.length;k++)if(Q[k][0]===i){Q.splice(k,1);return}};
window.__jk={pump:function(now){var L=Q.splice(0);for(var i=0;i<L.length;i++){try{L[i][1](now)}catch(e){console.error(e)}}}};
try{var gc=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,a){if(/webgl/.test(String(t)))a=Object.assign({},a||{},{preserveDrawingBuffer:true});return gc.call(this,t,a)}}catch(e){}
try{var mk=window.parent&&window.parent.__jkGameAudio;if(mk){var F=function(){return mk()};window.AudioContext=F;window.webkitAudioContext=F}}catch(e){}})();`;
    async function loadGame() {
      const html = await (await fetch(base + P.game)).text();
      const i = html.indexOf('<script');
      // 前置き：requestAnimationFrame を預かる／WebGL の絵を残す（ゲームが描かなかったこまでも写せる）／AudioContext をこちらのものにする
      const doc = i < 0 ? html : html.slice(0, i) + '<script>' + PRELUDE + '<\/script>' + html.slice(i);
      const f = document.createElement('iframe'); f.title = 'ゲーム'; f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
      // ゲームは、写すための見えない場所に置く（自分では描かず、こちらの1こまごとに、こちらから進める）
      Object.assign(f.style, { position: 'fixed', left: '-4000px', top: '0', width: Math.round(LAY.game.w * S) + 'px', height: Math.round(LAY.game.h * S) + 'px', border: '0', pointerEvents: 'none' });
      host.append(f); G.frame = f;
      await new Promise(ok => { f.onload = ok; f.srcdoc = doc; });
      G.win = f.contentWindow; G.doc = f.contentDocument;
      for (let k = 0; k < 200 && !G.win.__jk; k++) await new Promise(r => setTimeout(r, 25));
      P.setup && P.setup(G);
      G.layers = P.canvases ? P.canvases(G) : [...G.doc.querySelectorAll('canvas')];
      G.once = true;      // 始める前の見本に、1こまだけ描く
    }
    function sizeGame() { if (G.frame) { G.frame.style.width = Math.round(LAY.game.w * S) + 'px'; G.frame.style.height = Math.round(LAY.game.h * S) + 'px'; } }

    /* ---------- VTuber ---------- */
    const vcv = document.createElement('canvas');
    let VT = null, voice = ['musume', 1.08];
    async function setCharacter(id) {
      if (!VT) { VT = await VTuber.create(vcv, id, { base }); } else await VT.setCharacter(id);
      voice = VTuber.VOICE[id] || voice; cache.clear(); prewarm();
      emit('character', VT.person());
    }
    function sizeVT() { vcv.width = Math.round(LAY.vt.w * S); vcv.height = Math.round(LAY.vt.h * S); }

    /* ---------- 声（OtoVoice）と口の動き ---------- */
    const cache = new Map();
    const keyOf = (k, style) => voice[0] + '|' + voice[1] + '|' + (style || '') + '|' + k;
    function synth(k, style) {
      const key = keyOf(k, style); if (cache.has(key)) return cache.get(key);
      let x; try { x = OtoVoice.speak(k, { voice: voice[0], speed: voice[1], style: style || undefined }); } catch (e) { console.warn('OtoVoice', k, e.message); return null; }
      const sr = x.rate || 16000, buf = actx.createBuffer(1, Math.max(1, x.length), sr); buf.copyToChannel(x, 0);
      const n = Math.round(sr / 60), env = new Float32Array(Math.ceil(x.length / n));
      for (let f = 0; f < env.length; f++) { let s = 0; const a = f * n, b = Math.min(x.length, a + n); for (let j = a; j < b; j++) s += x[j] * x[j]; env[f] = Math.sqrt(s / Math.max(1, b - a)); }
      const so = Array.from(env).sort((a, b) => a - b), ref = so[Math.floor(so.length * .9)] || 1;
      for (let f = 0; f < env.length; f++) env[f] = clamp((env[f] / ref - .14) / .7, 0, 1);
      const v = { buf, env, dur: x.length / sr }; cache.set(key, v); return v;
    }
    // 決まったセリフは、先に作っておく（その場で作ると、1こま止まることがある）
    let warmJob = 0;
    function prewarm() {
      const id = VT && VT.id, all = [];
      for (const [, L] of playLines(P, id)) { const list = L && L.if ? (L.if === 'en' ? [L.yes] : [L.yes, L.no]) : [L]; for (const L1 of list) { const X = localize(L1, id); if (X && X.k) all.push(X); } }
      const job = ++warmJob; let i = 0;
      const step = () => { if (job !== warmJob) return; const t0 = performance.now(); while (i < all.length && performance.now() - t0 < 12) { const L = all[i++]; if (!/\{\w+\}/.test(L.k)) synth(L.k, L.st); } emit('progress', { kind: 'voice', done: i, total: all.length }); if (i < all.length) setTimeout(step, 30); };
      step();
    }
    let cur = null; const queue = [];
    function speak(L, pri, vars) {
      if (!L) return false;
      // 英語で話す出演者なら、英語のセリフに差しかえる（字幕の下に、日本語を訳として出す）
      const X = localize(L, VT && VT.id), en = X !== L;
      let k = X.k, t = X.t, tr = en ? X.tr : null;
      if (vars) for (const [a, b] of Object.entries(vars)) { const key = '{' + a + '}', v = varPair(b, en); k = k.split(key).join(v[1]); t = t.split(key).join(v[0]); if (tr) tr = tr.split(key).join(varPair(b, false)[0]); }
      const item = { L: X, k, t, tr, pri: pri || 1, at: st.t };
      if (cur && st.t < cur.end) {
        if (item.pri >= 3 && cur.pri < 3 && st.t - cur.start > .5) { stopCur(); }
        else { if (item.pri >= 2 || queue.length === 0) { queue.push(item); queue.sort((a, b) => b.pri - a.pri); queue.length = Math.min(queue.length, 2); } return false; }
      }
      startItem(item); return true;
    }
    function stopCur() { if (cur && cur.src) { try { cur.g.gain.setTargetAtTime(0, actx.currentTime, .03); cur.src.stop(actx.currentTime + .15); } catch (e) {} } if (cur) cur.end = st.t; }
    function startItem(it) {
      const v = synth(it.k, it.L.st); if (!v) return;
      const s = actx.createBufferSource(), g = actx.createGain(); s.buffer = v.buf; s.connect(g); g.connect(voiceBus); s.start(actx.currentTime + .03);
      cur = Object.assign(it, { v, src: s, g, start: st.t + .03, end: st.t + .03 + v.dur, subEnd: st.t + v.dur + 1.6 });
      st.lastSpeak = st.t;
      if (VT && it.L.g) VT.gesture(it.L.g, it.L.m || 'neutral', Math.max(1100, v.dur * 1000 * .9));
      emit('line', { t: it.t, tr: it.tr || null, who: VT && VT.person().name });
    }
    function talkLevel() { if (!cur || st.t >= cur.end) return 0; const f = Math.floor((st.t - cur.start) * 60), e = cur.v.env; return f < 0 ? 0 : e[Math.min(e.length - 1, f)] || 0; }

    // 同じものが続かないように、まだ使っていないものから選ぶ（ひとめぐりしたら、また全部から）
    function fresh(list, ok) { if (!list || !list.length) return null; ok = ok || (() => true); list._used = list._used || [];
      let c = list.filter((x, i) => ok(x) && !list._used.includes(i)); if (!c.length) { list._used = list._used.slice(-1); c = list.filter((x, i) => ok(x) && !list._used.includes(i)); }
      if (!c.length) c = list.filter(ok); if (!c.length) return null; const L = pick(c); list._used.push(list.indexOf(L)); return L; }
    /* ---------- 出来事 → ひとこと ---------- */
    const lastSaid = {};
    function event(name, data) {
      // 締めの雑談があるときは、'bye' を一度あずかる（雑談のあとで言う）
      if (name === 'bye' && PZ && PZ.outro && PZ.auto !== false && !Z.outroDone) { if (!Z.outro && st.live) zOutroStart(); return; }
      if (name === 'bye') st.byeSaid = true;
      emit('event', { name, data, t: st.t });
      chatBurst(name);
      const E = (P.lines || {})[name]; if (!E || !E.say || !E.say.length) return;
      if (st.byeSaid && name !== 'bye') return;          // さよならを言ったあとは、しゃべらない（書き込みは流れる）
      if (lastSaid[name] != null && st.t - lastSaid[name] < (E.cd || 8)) return;
      if (Math.random() > (E.ch == null ? 1 : E.ch)) return;
      // 同じセリフが続かないように、言っていないものから選ぶ
      E._used = E._used || []; let cand = E.say.filter((_, i) => !E._used.includes(i)); if (!cand.length) { E._used = []; cand = E.say; }
      const L = pick(cand); E._used.push(E.say.indexOf(L));
      speak(L, E.p || 1, data && data.vars); lastSaid[name] = st.t;          // 待ちに入ったときも数える（同じ出来事のセリフが、待ちの中に重ならないように）
    }

    /* ---------- 視聴者の書き込み ---------- */
    const chat = [], CH = P.chat || {};
    const hue = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
    function postChat(text, who, extra) {
      const n = who || pick(CH.names || [['ななし', 'ななし']]), it = { who: n, text, at: st.t, h: hue(n[0]) };
      if (extra && extra.sc && extra.sc.amount > 0) it.sc = { amount: Math.round(extra.sc.amount) };
      if (extra && extra.en) it.en = true;
      chat.push(it); if (chat.length > 40) chat.shift(); emit('chat', it); return it;
    }
    let nextChat = 0, burst = [];
    const burstAt = {};
    function chatBurst(name) { const pool = (CH.on || {})[name]; if (!pool || st.t - (burstAt[name] || -99) < 3) return; burstAt[name] = st.t; const n = 1 + ((Math.random() * (name === 'down' || name === 'kill3' ? 6 : 3)) | 0); for (let i = 0; i < n; i++) burst.push({ at: st.t + rnd(.4, 3.2) + i * .25, text: pick(pool) }); st.viewers += (Math.random() * 4) | 0; }
    let nextReply = 0, nextTalk = 0, pendingTalk = null; const later = [];
    const busy = () => { try { return !!(P.busy && P.busy(G, st.t)); } catch (e) { return false; } };

    /* ---------- 雑談：掛け合い（書き込み → 答え → 別の人 → 答え…）を順に流す。投げ銭とお礼も ---------- */
    const PZ = P.zatsu || null;
    const Z = { q: [], next: 0, last: null, used: new Set(), flags: new Set(), nextAuto: 1e9, nextTip: 1e9, intro: false, outro: null, outroDone: false, tips: 0 };
    function zReset() {
      Z.q.length = 0; Z.next = 0; Z.last = null; Z.used.clear(); Z.flags.clear(); Z.intro = false; Z.outro = null; Z.outroDone = false; Z.tips = 0; st.alert = null;
      Z.nextAuto = PZ ? (PZ.introAt || 22) : 1e9; Z.nextTip = PZ ? rnd(...(PZ.firstTip || [80, 140])) : 1e9;
    }
    const zPersona = () => ZD.cast[VT && VT.id] || null;
    function zName(ex) { const N = CH.names || [['ななし', 'ななし']], c = N.filter(n => !ex.includes(n)); return pick(c.length ? c : N); }
    function zQueue(bit, vars) {
      bit = bitOf(bit); if (!bit.length) return false;
      const A = zName([]), B = zName([A]), C = zName([A, B]);
      for (const s of bit) if (s[0] !== 'need') Z.q.push({ s, A, B, C, vars: vars || {} });
      return true;
    }
    const zOk = x => { const b = bitOf(x); return !(b[0] && b[0][0] === 'need') || Z.flags.has(b[0][1]); };
    // 場面（tag は 'play mid' のように、いくつ書いてもよい）に合うか。回の話で on のないものは、遊んでいる最中だけ（締めの雑談では使わない）
    const zTag = (x, tag, game) => { if (!tag) return true; const T = tag.split(' '); if (Array.isArray(x) || !x.on) return !game || T.includes('play'); return x.on.split(' ').some(o => T.includes(o)); };
    // まだ使っていないものから選ぶ（ぜんぶ使ったら、また全部から）
    function zFresh(list, tag, game) {
      list = (list || []).filter(x => zOk(x) && zTag(x, tag, game));
      const c = list.filter(x => !Z.used.has(x)), pool = c.length ? c : list; if (!pool.length) return null;
      const it = pick(pool); Z.used.add(it); return bitOf(it);
    }
    // 次の掛け合い：回の話・出演者の話・世間話から（遊んでいる最中は、短めの出演者の話だけ）
    function zPick(tag) {
      const C = zPersona(), own = ((C && C.bits) || []).filter(b => tag !== 'play' || bitOf(b).length <= 4);
      const pools = [[(PZ && PZ.bits) || [], .4, true], [own, .3], [ZD.common, .3]];
      const okIn = (p, fresh) => p[0].some(x => zOk(x) && zTag(x, tag, p[2]) && (!fresh || !Z.used.has(x)));
      let use = pools.filter(p => okIn(p, true)); if (!use.length) use = pools.filter(p => okIn(p, false)); if (!use.length) return null;
      let r = Math.random() * use.reduce((a, p) => a + p[1], 0), ch = use[0];
      for (const p of use) { r -= p[1]; if (r <= 0) { ch = p; break; } }
      return zFresh(ch[0], tag, ch[2]);
    }
    // 投げ銭：書き込み（カード）→ 金額に合わせたお礼 → ひとこと（大きいときは、出演者ごとの使い道の話も）
    function zTip() {
      const all = ZD.sc.concat((PZ && PZ.sc) || []).filter(e => !e.need || Z.flags.has(e.need)); if (!all.length) return null;
      const fr = all.filter(e => !Z.used.has(e)), L = fr.length ? fr : all;
      let r = Math.random() * L.reduce((n, e) => n + (e.w || 1), 0), e = L[0]; for (const x of L) { r -= x.w || 1; if (r <= 0) { e = x; break; } }
      Z.used.add(e);
      const tier = e.a >= 5000 ? 'big' : e.a >= 500 ? 'mid' : 'small', th = ZD.thanks[tier], C = zPersona();
      const bit = [['sc', e.a, e.text]]; if (th.length) bit.push(['s', pick(th)]); if (e.r) bit.push(['s', e.r]); if (tier === 'big' && C && C.big) bit.push(['s', C.big]);
      Z.tips++; return { bit, vars: { amt: yen(e.a) } };
    }
    function chime(amount) {
      try {
        const t0 = actx.currentTime + .02, notes = amount >= 5000 ? [1046.5, 1318.5, 1568, 2093] : amount >= 1000 ? [1318.5, 1568, 2093] : [1568, 2093];
        notes.forEach((f, i) => { const o = actx.createOscillator(), g = actx.createGain(), t = t0 + i * .085; o.type = 'triangle'; o.frequency.value = f;
          g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.13, t + .008); g.gain.exponentialRampToValueAtTime(.0008, t + .55); o.connect(g); g.connect(master); o.start(t); o.stop(t + .6); });
      } catch (e) { /* 鳴らなくてもよい */ }
    }
    function zTick() {
      if (cur && st.t < cur.end) { Z.next = Math.max(Z.next, st.t + .9); return; }
      if (!Z.q.length || st.t < Z.next) return;
      const it = Z.q.shift(), s = it.s, kind = s[0], vars = Object.assign({ name: it.A, name2: it.B, name3: it.C, en: isEN(VT && VT.id) }, it.vars);
      if (kind === 'c' || kind === 'c2' || kind === 'c3') { Z.last = postChat(s[1], kind === 'c' ? it.A : kind === 'c2' ? it.B : it.C); Z.next = st.t + rnd(1.6, 3); }
      else if (kind === 's') { let L = s[1]; if (L && L.if) L = vars[L.if] ? L.yes : L.no; if (Z.last) Z.last.hl = st.t; if (L) speak(Object.assign({ cam: true }, L), 2, vars); Z.next = st.t + .8; }
      else if (kind === 'sc') { Z.last = postChat(s[2], it.A, { sc: { amount: s[1] } }); st.alert = { name: it.A[0], amount: s[1], text: s[2], at: st.t }; chime(s[1]); st.viewers += 2; Z.next = st.t + rnd(2.2, 3.4); }
      else if (kind === 'w') Z.next = st.t + s[1];
      else if (kind === 'do') { try { s[1].call(P, G, J); } catch (e) { console.error(e); } }
    }
    const zBusy = () => !!(Z.q.length || (Z.outro && Z.outro.stage !== 'done') || st.byeSaid);
    const zVars = () => { try { return (PZ && PZ.vars && PZ.vars.call(P, G)) || {}; } catch (e) { return {}; } };
    // 自動：はじめに自己紹介 → 静かなときに掛け合い → ときどき投げ銭
    function zAuto() {
      if (!PZ || PZ.auto === false || Z.q.length) return;
      const quiet = (!cur || st.t > cur.end + 1.4) && !queue.length;
      if (Z.outro) { if (quiet) zOutro(); return; }
      if (st.ended || st.byeSaid || st.t < Z.nextAuto || !quiet || (cur && st.t < cur.end + 2.5) || busy() || pendingTalk) return;
      try { if (PZ.quiet && !PZ.quiet.call(P, G, st.t)) return; } catch (e) { return; }
      let b = null;
      if (!Z.intro) { Z.intro = true; const C = zPersona(); if (C && C.intro) b = { bit: [['s', C.intro]] }; }
      else if (st.t >= Z.nextTip) { Z.nextTip = st.t + rnd(...(PZ.tipEvery || [120, 200])); b = zTip(); }
      if (!b) { const bit = zPick(st.t < 150 ? 'open play mid' : 'play mid'); b = bit && { bit, vars: zVars() }; }
      if (b) zQueue(b.bit, b.vars);
      Z.nextAuto = st.t + rnd(...(PZ.every || [24, 38]));
    }
    // 締めの雑談：'bye' をあずかって、振り返り → 投げ銭 → 締めの話 → wrap → bye
    function zOutro() {
      const O = Z.outro;
      if (O.stage === 'chat') {
        if (st.t > O.end) { O.stage = 'wrap'; O.wrapAt = st.t; if (P.lines && P.lines.wrap) event('wrap'); else { const W = fresh(ZD.wrap); if (W) speak(Object.assign({ cam: true }, W), 2); } return; }
        let b = null;
        if (O.first) { O.first = false; const bit = zFresh(PZ.after); if (bit) b = { bit, vars: zVars() }; }
        if (!b && st.t >= O.tipAt) { O.tipAt = 1e9; b = zTip(); }
        if (!b) { const left = (PZ.after || []).filter(x => zOk(x) && !Z.used.has(x)); if (left.length && Math.random() < .5) b = { bit: zFresh(left), vars: zVars() }; }
        if (!b) { const bit = zPick('end mid'); b = bit && { bit, vars: zVars() }; }
        if (b) zQueue(b.bit, b.vars); else O.end = st.t;
      } else if (O.stage === 'wrap') { if (st.t - O.wrapAt > 1) { O.stage = 'bye'; Z.outroDone = true; O.byeAt = st.t; event('bye'); } }
      else if (O.stage === 'bye' && st.t - O.byeAt > 1.5) { O.stage = 'done'; st.ended = true; st.endAt = st.t + 4; }
    }
    function zOutroStart() { Z.outro = { at: st.t, end: st.t + PZ.outro, first: true, tipAt: Math.random() < .8 ? st.t + rnd(12, 20) : 1e9, stage: 'chat' }; st.mood = 'smile'; }
    function chatTick(dt) {
      if (!st.live) return;
      for (let i = burst.length - 1; i >= 0; i--) if (burst[i].at <= st.t) { postChat(burst[i].text); burst.splice(i, 1); }
      if (st.t >= nextChat) {
        nextChat = st.t + rnd(.6, 2.6) / (CH.rate || 1);
        // 英語で話す出演者のときは、英語の書き込みもまじる。締めの雑談のあいだは、締めの書き込み
        const pool = Z.outro ? (CH.outro || (ZD.chat.outro.length && ZD.chat.outro) || CH.late || CH.base) : (st.phase && CH[st.phase]) || CH.base;
        if (Math.random() < .8) { if (isEN(VT && VT.id) && EN.chat.length && EN.names.length && Math.random() < .2) postChat(pick(EN.chat), pick(EN.names), { en: true }); else postChat(pick(pool || ['…'])); }
      }
      zTick(); zAuto();
      // 掛け合い：視聴者の問いかけ（書き込み）に、名前を呼んで答える。答えに合わせて、遊び手が動くこともある（act）
      const T = P.talk;
      if (T && T.items && st.t > nextTalk && !pendingTalk && (!cur || st.t > cur.end + 1) && !queue.length && !busy() && !zBusy()) {
        nextTalk = st.t + rnd((T.every || [28, 46])[0], (T.every || [28, 46])[1]);
        const cand = T.items.filter(i => !(i.once !== false && i._done) && (!i.when || i.when.call(P, G, st.t)));
        if (cand.length) {
          cand.sort((a, b) => (a._at || -1) - (b._at || -1)); const it = pick(cand.slice(0, Math.min(3, cand.length))), who = pick(CH.names || [['ななし', 'ななし']]);
          postChat(it.q, who); it._done = 1; it._at = st.t; pendingTalk = { at: st.t + rnd(1.6, 3.2), it, who, c: chat[chat.length - 1] };
        }
      }
      if (pendingTalk && st.t >= pendingTalk.at) {
        const p = pendingTalk; pendingTalk = null; p.c.hl = st.t;
        const vars = Object.assign({ name: p.who }, p.it.vars ? p.it.vars.call(P, G) : {});
        speak(Object.assign({}, p.it.a, { cam: true }), 2, vars); nextReply = Math.max(nextReply, st.t + 20);
        if (p.it.act) later.push({ at: st.t + .9, fn: () => p.it.act.call(P, G, J) });
      }
      // ときどき、ふつうの書き込みにも答える（黙っているときだけ）
      if (st.t > nextReply && !pendingTalk && (!cur || st.t > cur.end + 1.5) && chat.length && P.reply && P.reply.length && !busy() && !zBusy()) {
        nextReply = st.t + rnd(45, 80); const c = chat[chat.length - 1 - ((Math.random() * Math.min(3, chat.length)) | 0)];
        const L = !c.en && !c.sc && fresh(P.reply, r => (!r.early || st.t < 240) && (!r.to || r.to.test(c.text))); if (L) { c.hl = st.t; speak(Object.assign({}, L, { cam: true }), 1, { name: c.who }); }
      }
      st.viewers = Math.max(3, st.viewers + (Math.random() - .45) * dt * 3);
    }

    /* ---------- 1こま ---------- */
    let raf = 0, lastNow = 0, lastAT = null, lastFrame = 0, gaze = { yaw: -.32, pitch: -.02, ty: -.32, tp: -.02, next: 0 }, talkS = 0;
    const FPS = 30;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (now - lastFrame < 1000 / FPS - 2) return;
      // 配信の時刻は、音の時計で進める（声・口・字幕が、録画の音とずれないように）
      const at = actx.currentTime, dt = lastAT != null ? clamp(at - lastAT, 0, .5) : 0; lastAT = at; lastNow = now; lastFrame = now;
      if (st.live) st.t += dt;
      // ゲームを1こま進める
      if (G.win && G.win.__jk && (st.live || G.once)) { G.once = false; try { G.win.__jk.pump(performance.now()); } catch (e) { console.error(e); } }
      if (st.live && P.step) { try { P.step(G, dt, st.t, J); } catch (e) { console.error(e); } }
      if (st.live) {
        for (const [tt, name] of P.script || []) if (tt <= st.t && !scriptDone.has(tt + name)) { scriptDone.add(tt + name); event(name); }
        for (let i = later.length - 1; i >= 0; i--) if (later[i].at <= st.t) { const f = later[i].fn; later.splice(i, 1); try { f(); } catch (e) { console.error(e); } }
        if ((!cur || st.t > cur.end) && queue.length) { const it = queue.shift(); if (st.t - it.at < 4.5) startItem(it); }
        const I = P.idle; if (I && (!cur || st.t > cur.end + 1) && st.t - st.lastSpeak > (I.after || 16) && st.t > 8 && !busy() && !zBusy()) { st.lastSpeak = st.t; speak(fresh(st.phase && I[st.phase] || I.say), 1); }
        chatTick(dt);
        if (!st.ended && P.end && P.end(G, st.t)) { st.ended = true; st.endAt = st.t + (P.endDelay || 10); }
        if (st.ended && st.t >= st.endAt && !Z.q.length && !(Z.outro && Z.outro.stage !== 'done')) stopLive('end');
      }
      // VTuber：口、表情、目線
      if (VT) {
        const lv = talkLevel(); talkS += (lv - talkS) * (lv > talkS ? .65 : .45);
        const speaking = cur && st.t < cur.end + .2, mood = speaking || (cur && st.t < cur.end + 1.2) ? (cur.L.m || 'neutral') : (st.mood || 'neutral');
        if (st.t > gaze.next) { gaze.next = st.t + rnd(1.2, 3.5); const atCam = (speaking && cur.L.cam) || Math.random() < .12; gaze.ty = atCam ? rnd(-.05, .05) : rnd(-.42, -.26); gaze.tp = atCam ? 0 : rnd(-.05, .01); }
        if (speaking && cur.L.cam) { gaze.ty = 0; gaze.tp = 0; }
        gaze.yaw += (gaze.ty - gaze.yaw) * clamp(dt * 5, 0, 1); gaze.pitch += (gaze.tp - gaze.pitch) * clamp(dt * 5, 0, 1);
        VT.set({ talk: talkS, mood, yaw: gaze.yaw, pitch: gaze.pitch }); VT.render(now);
      }
      draw();
      if (st.rec && st.rec.track && st.rec.track.requestFrame) st.rec.track.requestFrame();
      emit('tick', st.t);
    }
    const scriptDone = new Set();

    /* ---------- 描く ---------- */
    const accent = () => (VT && VT.person().accent) || '#c6a1d9';
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function wrap(text, maxW) { const out = []; let line = '';
      // 英語（日本語の字がない文）は、単語の切れ目で折り返す
      if (String(text).split(' ').length >= 3) { for (const wd of String(text).split(' ')) { const nx = line ? line + ' ' + wd : wd; if (ctx.measureText(nx).width > maxW && line) { out.push(line); line = wd; } else line = nx; } if (line) out.push(line); return out; } for (const ch of String(text)) { if (ctx.measureText(line + ch).width > maxW && line) { if ('、。！？」』）…ー'.includes(ch)) { out.push(line + ch); line = ''; continue; } out.push(line); line = ch; } else line += ch; } if (line) out.push(line); return out; }
    let bgPat = null, fadeCv = null;
    function draw() {
      const s = S; ctx.setTransform(1, 0, 0, 1, 0, 0);
      // 地：夜の色。ゆっくり動く光
      const g0 = ctx.createLinearGradient(0, 0, W, H); g0.addColorStop(0, '#0b1020'); g0.addColorStop(1, '#141028'); ctx.fillStyle = g0; ctx.fillRect(0, 0, W, H);
      const ac = accent(), tt = st.t;
      ctx.globalAlpha = .18; const rg = ctx.createRadialGradient(W * (.75 + .05 * Math.sin(tt * .1)), H * .9, 10, W * .75, H * .9, W * .55); rg.addColorStop(0, ac); rg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      if (!bgPat) { const p = document.createElement('canvas'); p.width = p.height = 24; const c2 = p.getContext('2d'); c2.fillStyle = 'rgba(255,255,255,.035)'; c2.fillRect(11, 11, 2, 2); bgPat = ctx.createPattern(p, 'repeat'); }
      ctx.fillStyle = bgPat; ctx.fillRect(0, 0, W, H);
      // ゲームの画面
      const gx = LAY.game.x * s, gy = LAY.game.y * s, gw = LAY.game.w * s, gh = LAY.game.h * s;
      ctx.save(); rr(gx, gy, gw, gh, 10 * s); ctx.fillStyle = '#000'; ctx.fill(); ctx.clip();
      if (G.layers) for (const c of G.layers) { try { if (c.width && c.height) ctx.drawImage(c, gx, gy, gw, gh); } catch (e) {} }
      if (P.overlay) P.overlay(ctx, gx, gy, gw, gh, s);
      drawOutro(gx, gy, gw, gh, s); drawAlert(gx, gy, gw, s);
      if (st.state === 'loading' || !st.live) { ctx.fillStyle = 'rgba(5,8,20,.55)'; ctx.fillRect(gx, gy, gw, gh); }
      ctx.restore();
      ctx.lineWidth = 2 * s; ctx.strokeStyle = 'rgba(255,255,255,.14)'; rr(gx, gy, gw, gh, 10 * s); ctx.stroke();
      // 書き込み（右上）
      drawChat(s);
      // タイトル
      ctx.textBaseline = 'alphabetic'; ctx.font = `800 ${17 * s}px ${FD}`; ctx.fillStyle = '#f1f2ff';
      ctx.fillText(P.title || '', LAY.title.x * s, (LAY.title.y + 18) * s);
      if (P.tags) { ctx.font = `600 ${12 * s}px ${FB}`; let x = LAY.title.x * s; const y = (LAY.title.y + 26) * s; for (const tg of P.tags) { const w = ctx.measureText(tg).width + 14 * s; rr(x, y, w, 18 * s, 9 * s); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fill(); ctx.fillStyle = '#b9bfe0'; ctx.textBaseline = 'middle'; ctx.fillText(tg, x + 7 * s, y + 9.5 * s); x += w + 6 * s; } }
      // 字幕（下に小さく。2行の枠は大きさを変えない）
      drawSub(s);
      // VTuber（ゲームの右下の角に重ねる）
      const vx = LAY.vt.x * s, vy = H - LAY.vt.h * s;
      if (VT) {
        // 左の端をぼかしてから重ねる
        const vw = Math.round(LAY.vt.w * s), vh = Math.round(LAY.vt.h * s); if (!fadeCv || fadeCv.width !== vw || fadeCv.height !== vh) { fadeCv = document.createElement('canvas'); fadeCv.width = vw; fadeCv.height = vh; }
        const fc = fadeCv.getContext('2d'); fc.globalCompositeOperation = 'copy'; fc.drawImage(vcv, 0, 0, vw, vh); fc.globalCompositeOperation = 'destination-in';
        const fg = fc.createLinearGradient(0, 0, LAY.vt.fade * s, 0); fg.addColorStop(0, 'rgba(0,0,0,0)'); fg.addColorStop(1, 'rgba(0,0,0,1)'); fc.fillStyle = fg; fc.fillRect(0, 0, vw, vh); fc.globalCompositeOperation = 'source-over';
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 18 * s; ctx.drawImage(fadeCv, vx, vy, vw, vh); ctx.restore();
        // 名前の札
        const pr = VT.person(); ctx.font = `800 ${15 * s}px ${FD}`; const nm = pr.name || ''; ctx.font = `600 ${11 * s}px ${FB}`; const rl = pr.role || ''; const rw = ctx.measureText(rl).width;
        ctx.font = `800 ${15 * s}px ${FD}`; const nw = ctx.measureText(nm).width, pw = Math.max(nw, rw) + 26 * s, px = LAY.plate.x * s - pw, py = LAY.plate.y * s - 36 * s;
        rr(px, py, pw, 40 * s, 9 * s); ctx.fillStyle = 'rgba(8,10,24,.78)'; ctx.fill(); ctx.fillStyle = ac; ctx.fillRect(px, py + 8 * s, 3 * s, 24 * s);
        ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#fff'; ctx.fillText(nm, px + 13 * s, py + 19 * s); ctx.font = `600 ${11 * s}px ${FB}`; ctx.fillStyle = '#c3c8e6'; ctx.fillText(rl, px + 13 * s, py + 33 * s); }
    }
    function drawChat(s) {
      if (!st.chatOn) return;
      const x = LAY.chat.x * s, y = LAY.chat.y * s, w = LAY.chat.w * s, h = LAY.chat.h * s;
      ctx.save(); rr(x, y, w, h, 10 * s); ctx.fillStyle = 'rgba(8,10,24,.72)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = 1; ctx.stroke(); ctx.clip();
      ctx.font = `800 ${12 * s}px ${FB}`; ctx.fillStyle = '#9aa3cf'; ctx.textBaseline = 'middle'; ctx.fillText('チャット', x + 12 * s, y + 15 * s);
      // LIVE と、経過時間と、見ている人の数（見出しの右）
      if (st.live || st.ended) { const m = Math.floor(st.t / 60), sec = Math.floor(st.t % 60), info = `${m}:${String(sec).padStart(2, '0')} · ${Math.round(st.viewers)}人`;
        ctx.font = `600 ${11.5 * s}px ${FB}`; const iw = ctx.measureText(info).width; ctx.fillStyle = '#c9cdea'; ctx.textAlign = 'right'; ctx.fillText(info, x + w - 12 * s, y + 15 * s); ctx.textAlign = 'left';
        const bw = 38 * s, bx = x + w - 18 * s - iw - bw; rr(bx, y + 7 * s, bw, 16 * s, 4 * s); ctx.fillStyle = st.ended ? '#556' : '#e5334b'; ctx.fill(); ctx.font = `800 ${10.5 * s}px ${FB}`; ctx.fillStyle = '#fff'; ctx.fillText('LIVE', bx + 7 * s, y + 15.5 * s); }
      ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x, y + 29 * s, w, 1);
      // 新しいものを下に。上へ流れて消える
      const fs = 12.5 * s, lh = fs * 1.42, pad = 12 * s; let yy = y + h - 10 * s;
      for (let i = chat.length - 1; i >= 0 && yy > y + 34 * s; i--) {
        const c = chat[i], age = st.t - c.at;
        if (c.sc) {
          // 投げ銭：見出し（名前と金額）と本文の2段のカード
          const T = scTier(c.sc.amount), ip = 9 * s, head = fs * 1.6;
          ctx.font = `500 ${fs}px ${FB}`; const ls = c.text ? wrap(c.text, w - 12 * s - ip * 2) : [];
          const bh = head + (ls.length ? ls.length * lh + ip * .9 : 0);
          if (yy - bh < y + 34 * s) break;
          yy -= bh; const a2 = clamp(age / .3, 0, 1); ctx.globalAlpha = a2;
          const bx = x + 6 * s, bw = w - 12 * s, by = yy + (1 - a2) * 10 * s;
          ctx.save(); rr(bx, by, bw, bh, 7 * s); ctx.clip();
          ctx.fillStyle = T.body; ctx.fillRect(bx, by, bw, bh); ctx.fillStyle = T.bg; ctx.fillRect(bx, by, bw, head);
          if (age < 1.2) { ctx.fillStyle = `rgba(255,255,255,${(.35 * (1 - age / 1.2)).toFixed(3)})`; ctx.fillRect(bx, by, bw, bh); }
          ctx.restore();
          ctx.textBaseline = 'middle'; ctx.font = `800 ${fs}px ${FB}`; ctx.fillStyle = T.ink; ctx.fillText(c.who[0], bx + ip, by + head / 2);
          ctx.textAlign = 'right'; ctx.fillText('¥' + c.sc.amount.toLocaleString('ja-JP'), bx + bw - ip, by + head / 2); ctx.textAlign = 'left';
          ctx.textBaseline = 'top'; ctx.font = `600 ${fs}px ${FB}`; ctx.fillStyle = T.bodyInk; ls.forEach((ln, k) => ctx.fillText(ln, bx + ip, by + head + ip * .45 + k * lh));
          yy -= 7 * s; ctx.globalAlpha = 1;
          continue;
        }
        ctx.font = `700 ${fs}px ${FB}`; const nw = ctx.measureText(c.who[0]).width + 8 * s;
        ctx.font = `500 ${fs}px ${FB}`; const lines = wrap(c.text, w - pad * 2 - nw); const bh = lines.length * lh;
        if (yy - bh < y + 34 * s) break;
        yy -= bh; const a = clamp(age / .25, 0, 1); ctx.globalAlpha = a; const slide = (1 - a) * 8 * s;
        if (c.hl && st.t - c.hl < 6) { ctx.fillStyle = 'rgba(255,214,120,.14)'; ctx.fillRect(x + 4 * s, yy - 2 * s + slide, w - 8 * s, bh + 4 * s); }
        ctx.textBaseline = 'top'; ctx.font = `700 ${fs}px ${FB}`; ctx.fillStyle = `hsl(${c.h},70%,72%)`; ctx.fillText(c.who[0], x + pad, yy + slide);
        ctx.font = `500 ${fs}px ${FB}`; ctx.fillStyle = '#eef0ff'; lines.forEach((ln, k) => ctx.fillText(ln, x + pad + nw, yy + k * lh + slide));
        yy -= 6 * s; ctx.globalAlpha = 1;
      }
      ctx.restore();
    }
    // 締めの雑談のあいだ：ゲームの画面を少し暗くして、「雑談タイム」の札を出す（結果の画面は、しばらく見せてから）
    function drawOutro(x, y, w, h, s) {
      const O = Z.outro; if (!O) return; const a = clamp((st.t - O.at - 9) / 2.5, 0, 1); if (a <= 0) return;
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(6,8,20,.62)'; ctx.fillRect(x, y, w, h);
      const ac = accent(), cx = x + w / 2, cy = y + h / 2, bw = 320 * s, bh = 104 * s;
      rr(cx - bw / 2, cy - bh / 2, bw, bh, 14 * s); ctx.fillStyle = 'rgba(14,16,34,.86)'; ctx.fill(); ctx.strokeStyle = ac; ctx.globalAlpha = a * .55; ctx.lineWidth = 1.5 * s; ctx.stroke(); ctx.globalAlpha = a;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `700 ${11 * s}px ${FM}`; ctx.fillStyle = ac; ctx.fillText('AFTER TALK', cx, cy - 30 * s);
      ctx.font = `800 ${26 * s}px ${FD}`; ctx.fillStyle = '#fff'; ctx.fillText('雑談タイム', cx, cy + 2 * s);
      ctx.font = `600 ${12 * s}px ${FB}`; ctx.fillStyle = '#c9cdea'; ctx.fillText((P.short || P.title || '') + ' をあそんだあとで', cx, cy + 32 * s, bw - 30 * s);
      ctx.restore();
    }
    // 投げ銭の知らせ：ゲームの画面の上に、金額で色の変わる帯（6.5秒）
    function drawAlert(x, y, w, s) {
      const A = st.alert; if (!A) return; const age = st.t - A.at; if (age > 6.5 || age < 0) { if (age > 6.5) st.alert = null; return; }
      const T = scTier(A.amount), k = Math.min(1, age / .35), out = clamp((6.5 - age) / .5, 0, 1), ease = 1 - Math.pow(1 - k, 3);
      const bw = 430 * s, hh = 38 * s, bh = A.text ? 78 * s : hh, bx = x + (w - bw) / 2, by = y + 14 * s - (1 - ease) * 30 * s;
      ctx.save(); ctx.globalAlpha = Math.min(ease, out);
      ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 16 * s; rr(bx, by, bw, bh, 10 * s); ctx.fillStyle = T.body; ctx.fill(); ctx.shadowBlur = 0;
      ctx.save(); rr(bx, by, bw, bh, 10 * s); ctx.clip(); ctx.fillStyle = T.bg; ctx.fillRect(bx, by, bw, hh);
      if (age < 1) { ctx.fillStyle = `rgba(255,255,255,${(.4 * (1 - age)).toFixed(3)})`; ctx.fillRect(bx, by, bw, bh); }
      ctx.restore();
      ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillStyle = T.ink; ctx.font = `800 ${17 * s}px ${FD}`; ctx.fillText(A.name + ' さんから', bx + 16 * s, by + hh / 2, bw * .62);
      ctx.textAlign = 'right'; ctx.font = `900 ${21 * s}px ${FD}`; ctx.fillText('¥' + A.amount.toLocaleString('ja-JP'), bx + bw - 16 * s, by + hh / 2); ctx.textAlign = 'left';
      if (A.text) { ctx.fillStyle = T.bodyInk; ctx.font = `700 ${16 * s}px ${FB}`; ctx.fillText(A.text, bx + 16 * s, by + hh + (bh - hh) / 2, bw - 32 * s); }
      ctx.restore();
    }
    function drawSub(s) {
      if (!st.subs || !cur || st.t > cur.subEnd || st.t < cur.start - .05) return;
      const a = clamp((st.t - cur.start + .05) / .12, 0, 1) * clamp((cur.subEnd - st.t) / .3, 0, 1);
      const x = LAY.sub.x * s, y = LAY.sub.y * s, w = LAY.sub.w * s, h = LAY.sub.h * s, fs = 19 * s, lh = fs * 1.42;
      ctx.globalAlpha = a; rr(x, y, w, h, 10 * s); ctx.fillStyle = 'rgba(6,8,20,.7)'; ctx.fill();
      ctx.fillStyle = accent(); ctx.fillRect(x, y + 12 * s, 4 * s, h - 24 * s);
      const tx = x + 22 * s, mw = w - 40 * s;
      ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(0,0,0,.6)';
      if (cur.tr) {
        // 英語のセリフ：英語を大きく（2行まで）、その下に日本語の訳を小さく1行
        let f = fs * .92; ctx.font = `800 ${f}px ${FD}`; let ls = wrap(cur.t, mw); while (ls.length > 2 && f > fs * .62) { f *= .93; ctx.font = `800 ${f}px ${FD}`; ls = wrap(cur.t, mw); }
        let f2 = 13.5 * s; ctx.font = `600 ${f2}px ${FB}`; while (ctx.measureText(cur.tr).width > mw && f2 > 10 * s) { f2 *= .95; ctx.font = `600 ${f2}px ${FB}`; }
        const n = Math.min(2, ls.length), lh2 = f * 1.28, gap = f2 * .55, tot = n * lh2 + gap + f2 * 1.2, top = y + (h - tot) / 2 + lh2 / 2;
        ctx.font = `800 ${f}px ${FD}`; ctx.lineWidth = f * .2;
        ls.slice(0, 2).forEach((ln, k) => { ctx.strokeText(ln, tx, top + k * lh2); ctx.fillStyle = '#fff'; ctx.fillText(ln, tx, top + k * lh2); });
        ctx.font = `600 ${f2}px ${FB}`; ctx.lineWidth = f2 * .18; const ty = top + (n - 1) * lh2 + lh2 / 2 + gap + f2 * .6;
        ctx.strokeText(cur.tr, tx, ty, mw); ctx.fillStyle = '#c9cdea'; ctx.fillText(cur.tr, tx, ty, mw);
      } else {
        ctx.font = `800 ${fs}px ${FD}`; let f = fs, ls = wrap(cur.t, mw); while (ls.length > 2 && f > fs * .7) { f *= .93; ctx.font = `800 ${f}px ${FD}`; ls = wrap(cur.t, mw); }
        ctx.lineWidth = f * .2;
        const top = y + h / 2 - (Math.min(2, ls.length) - 1) * lh / 2;
        ls.slice(0, 2).forEach((ln, k) => { ctx.strokeText(ln, tx, top + k * lh); ctx.fillStyle = '#fff'; ctx.fillText(ln, tx, top + k * lh); });
      }
      ctx.globalAlpha = 1;
    }

    /* ---------- 大きさ ---------- */
    function setSize(h) { H = h; W = Math.round(h * 16 / 9); S = W / 1280; cv.width = W; cv.height = H; sizeVT(); sizeGame(); bgPat = null; }

    /* ---------- 録画（実時間） ---------- */
    /* ブラウザの録画（MediaRecorder）の WebM には、全体の長さが書かれていない（再生ソフトによっては、つまみで飛べない）。
       頭の Info（0x1549A966）に、長さ（Duration 0x4489）を書き足す。ファイルの頭の 64KB だけを読んで直し、残りはそのままつなぐ */
    async function fixWebmDuration(blob, ms) {
      try {
        const head = new Uint8Array(await blob.slice(0, Math.min(blob.size, 65536)).arrayBuffer()); let p = 0;
        const vlen = b => { for (let i = 0; i < 8; i++) if (b & (0x80 >> i)) return i + 1; return 0; };
        const rid = () => { const n = vlen(head[p]); let v = 0; for (let i = 0; i < n; i++) v = v * 256 + head[p + i]; p += n; return v; };
        const rsz = () => { const n = vlen(head[p]); let v = head[p] & (0xFF >> n), unk = v === (0xFF >> n); for (let i = 1; i < n; i++) { v = v * 256 + head[p + i]; if (head[p + i] !== 0xFF) unk = false; } p += n; return unk ? -1 : v; };
        const cat = a => { const o = new Uint8Array(a.reduce((n, x) => n + x.length, 0)); let k = 0; for (const x of a) { o.set(x, k); k += x.length; } return o; };
        if (rid() !== 0x1A45DFA3) return blob; const hs = rsz(); p += hs; if (rid() !== 0x18538067) return blob; rsz();
        while (p < head.length - 12) {
          const i0 = p, id = rid(), s0 = p, size = rsz(), d0 = p; if (size < 0) return blob;
          if (id === 0x1549A966) {
            const data = head.subarray(d0, d0 + size), parts = []; let q = 0, scale = 1e6, had = false;
            const dur = () => { const b = new Uint8Array(11); b[0] = 0x44; b[1] = 0x89; b[2] = 0x88; new DataView(b.buffer).setFloat64(3, ms * 1e6 / scale); return b; };
            while (q < data.length) { const c0 = q, n = vlen(data[q]); let cid = 0; for (let i = 0; i < n; i++) cid = cid * 256 + data[q + i]; q += n; const m = vlen(data[q]); let cs = data[q] & (0xFF >> m); for (let i = 1; i < m; i++) cs = cs * 256 + data[q + i]; q += m;
              if (cid === 0x2AD7B1) { scale = 0; for (let i = 0; i < cs; i++) scale = scale * 256 + data[q + i]; }
              if (cid === 0x4489) had = true; else parts.push(data.subarray(c0, q + cs)); q += cs; }
            parts.push(dur()); const body = cat(parts), sz = new Uint8Array(8); sz[0] = 1; let L = body.length; for (let i = 7; i >= 1; i--) { sz[i] = L & 255; L = Math.floor(L / 256); }
            return new Blob([head.subarray(0, i0), head.subarray(i0, s0), sz, body, blob.slice(d0 + size)], { type: blob.type });
          }
          p = d0 + size;
        }
      } catch (e) { console.warn('webm の長さを書けませんでした', e); }
      return blob;
    }
    function pickMime(fmt) {
      const L = fmt === 'mp4' ? ['video/mp4;codecs=avc1.42E01F,mp4a.40.2', 'video/mp4;codecs=avc1,mp4a', 'video/mp4'] : ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
      return L.find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || null;
    }
    function record(opt) {
      opt = opt || {}; const mime = pickMime(opt.format || 'webm'); if (!mime) throw Object.assign(new Error('この形式では録画できません'), { code: 'nomime' });
      const vs = cv.captureStream(0), tr = vs.getVideoTracks()[0], stream = new MediaStream([tr, ...recDest.stream.getAudioTracks()]);
      const mr = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: H >= 1000 ? 9e6 : 5e6, audioBitsPerSecond: 160000 });
      const chunks = []; mr.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
      const done = new Promise(ok => { mr.onstop = () => ok(new Blob(chunks, { type: mime.split(';')[0] })); });
      st.rec = { mr, track: tr, mime, t0: st.t, w0: performance.now(), done, limit: opt.seconds || 0 }; mr.start(1000);
      emit('rec', { on: true, mime });
      return st.rec;
    }
    async function stopRecord() { const r = st.rec; if (!r) return null; st.rec = null; const ms = performance.now() - r.w0; try { r.mr.stop(); } catch (e) {} let blob = await r.done; const webm = !r.mime.includes('mp4');
      if (webm) blob = await fixWebmDuration(blob, ms); emit('rec', { on: false }); return { blob, mime: r.mime, ext: webm ? 'webm' : 'mp4', seconds: ms / 1000 }; }
    on('tick', t => { if (st.rec && st.rec.limit && t - st.rec.t0 >= st.rec.limit) emit('recLimit', {}); });

    /* ---------- 始める・止める ---------- */
    async function startLive() {
      if (st.live) return; await actx.resume();
      st.live = true; st.ended = false; st.byeSaid = false; st.phase = null; st.t = 0; st.viewers = rnd(28, 60); chat.length = 0; nextChat = 1.2; nextReply = rnd(30, 45); nextTalk = rnd(42, 55); pendingTalk = null; later.length = 0; scriptDone.clear(); for (const k in lastSaid) delete lastSaid[k]; zReset();
      P.start && P.start(G, J); st.state = 'live'; emit('state', st.state);
    }
    function stopLive(why) { if (!st.live) return; st.live = false; st.state = 'ended'; emit('state', st.state); emit('ended', why); }

    const J = { emit: event, say: (L, p, vars) => speak(L, p || 2, vars), chat: postChat, later: (sec, fn) => later.push({ at: st.t + sec, fn }),
      talking: () => !!(cur && st.t < cur.end && cur.L.cam), speaking: () => !!(cur && st.t < cur.end), mood: m => { st.mood = m; }, phase: ph => { st.phase = ph; }, get t() { return st.t; }, gesture: (g, e, ms) => VT && VT.gesture(g, e, ms),
      character: () => VT && VT.id, english: () => isEN(VT && VT.id),
      // 回が雑談を自分で進めるとき（zatsu.auto: false）
      zatsu: { queue: zQueue, pick: zPick, fresh: zFresh, flag: k => { Z.flags.add(k); }, pending: () => Z.q.length, busy: zBusy, persona: zPersona,
        tip() { const b = zTip(); return !!(b && zQueue(b.bit, b.vars)); }, intro() { const C = zPersona(); return !!(C && C.intro && zQueue([['s', C.intro]])); } } };

    const ready = (async () => {
      setSize(o.height || 720);
      await setCharacter(o.character || P.character || 'hibiki');
      await loadGame();
      st.state = 'idle'; emit('state', st.state);
    })();
    raf = requestAnimationFrame(frame);

    api = {
      ready, on, J, get state() { return st.state; }, get t() { return st.t; }, get recording() { return !!st.rec; }, get vt() { return VT; }, get game() { return G; },
      start: startLive, stop: stopLive, record, stopRecord, setCharacter, setSize, check: () => check(P),
      setVolume({ game, voice: v }) { if (game != null) gameBus.gain.setTargetAtTime(game, actx.currentTime, .05); if (v != null) voiceBus.gain.setTargetAtTime(v, actx.currentTime, .05); },
      setSubtitles(v) { st.subs = !!v; }, setZoom(z) { if (VT) VT.cam.zoom = z; }, setChat(v) { st.chatOn = !!v; }, get voices() { return voice; },
      setVoice(name, speed) { voice = [name, speed || 1]; cache.clear(); prewarm(); },
      play: P, LAY,
      // 雑談のいまの様子（確かめ用）：積んである数、締めの雑談の段階、投げ銭の数
      get zatsu() { return { queued: Z.q.length, outro: Z.outro ? Z.outro.stage : null, tips: Z.tips, english: isEN(VT && VT.id) }; },
    };
    return api;
  }
  return { VERSION, LAY, play, plays, mount, check, zen, scTier, zatsudan, english, enNum, kanaNum, yen, localize };
})();
