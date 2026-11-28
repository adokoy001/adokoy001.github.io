/*! Kaisetsu 1.1.0 — 丸い顔のキャラクター2人が、掛け合いで解説する動画を、ブラウザの中で作る土台
 *
 * 声（OtoVoice）、口の動き、字幕、ボード、ラベル、BGM（TextScore）、キャラクター、動画ファイルへの書き出し、台本チェックを受け持つ。
 * 動画ごとに書くのは「回（エピソード）」のファイル1つ：台本（lines）と、3Dの場面のコード（world）。
 * このコメントは、回を書く人・AI のための手引き。
 *
 * ■ 読み込む順番
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
 *   <script src="otovoice.js"></script>       声
 *   <script src="textscore.js"></script>      BGM（なくても動く。そのときは BGM なし）
 *   <script src="kaisetsu.js"></script>       このファイル
 *   <script src="episode-xxx.js"></script>    回（Kaisetsu.episode({...}) を呼ぶ）
 *   書き出しには webm-muxer.js か mp4-muxer.js も要る（どちらも npm のものをそのまま）
 *
 * ■ 回の書き方
 *   Kaisetsu.episode({
 *     id: 'gps',                               ページの #gps で開く名前（英数字）
 *     fileName: 'GPSと相対性理論',             書き出すファイルの名前
 *     title: 'GPSは相対性理論なしでは使えない？', titleLines: ['GPSは', '相対性理論なしでは', '使えない？'],   はじめの札（行を分けて書く）
 *     eyebrow: '3D解説',
 *     cast: {                                  出演。A は右、B は左に座る。A が解説、B が聞き役にすると収まりがよい
 *       A: { name: 'ノア', role: '解説', color: '#B0487A',
 *            voice: { voice: 'otona', speed: 1.05 },                          OtoVoice の声（OtoVoice.voices() の名前）と速さ
 *            look: { hair: 'bob', hairColor: 'budou', eye: 'sumire', ornament: 'orbit', hat: 'none' } },
 *       B: { ... },
 *     },
 *     chapters: [['はじめに', ['intro']], ['しくみ', ['orbits', 'signal']], ...],   章の名前と、その章の場面
 *     bgm: { intro: 'opening', orbits: 'explain', ... },                     場面ごとの BGM（下の5つから。書かない場面は BGM なし）
 *     world(K) { ...; return { scenes, enter, update, camera, labels }; },   3Dの場面（下）
 *     lines: [ { w: 'A', s: 'intro', t: '字幕', k: '読み', e: {...}, st: 'joy', b: {...}, p: 0.5 }, ... ],
 *   });
 *
 * ■ セリフ（lines の1つ）
 *   w   話し手（cast の A か B）
 *   s   場面の名前（world が返す scenes のどれか）。前のセリフと場面が変わると、カメラが動く（遠ければ、暗転して切りかわる）
 *   t   字幕。漢字かなまじりの、ふつうの文
 *   k   読み。OtoVoice に渡す文。ひらがなで書く（漢字・数字・英字は読めない）。助詞の は・へ は わ・え と書く
 *       文節ごとに空白、アクセントの核は拍のあとに '（かみ'なり）。数字はかなに（さんじゅうはち、にま'ん）
 *       「えっ」のように声門で切るときは / / の音素で：/eq/、。英語は [ ] に発音記号で
 *   e   表情 { A: 'smile', B: 'surprise' }。normal smile surprise jito。そのセリフのあいだだけ（書かなければ normal）
 *   st  調子 calm panic joy sad whisper（OtoVoice の style）。話し手が surprise か joy のときは、話しはじめに跳ねる
 *   b   ボード { h: '見出し', r: ['行', '行'] }。左上に出る。同じ場面の、次の b まで出しつづける
 *   p   このセリフの前に足す間（秒）
 *
 * ■ 決まり（レギュレーション）。ページの「台本チェック」と Kaisetsu.mount(...).check() で調べられる
 *   字幕  全角48字まで（半角は0.5字）。字幕の枠で折り返して2行まで（1行はおよそ全角28〜30字）
 *   声    1セリフ9秒まで（長くなったら、セリフを分ける。話し手が同じでよい）
 *   ボード 見出し 全角20字まで、行は3行まで、1行 全角26字まで
 *   ラベル 名前 全角12字まで
 *   読み  OtoVoice.check(k).ok が true であること（まちがいは、ページの台本チェックに出る）
 *   目安  1つの場面に、セリフ3〜8個。1つの回に、40〜60セリフ（4〜5分）
 *
 * ■ 3Dの場面：world(K)
 *   K は道具：K.THREE、K.scene（ここに物を足す）、K.camera（見るだけ。動かすのはエンジン）、K.sun（平行光）、
 *            K.toon(色, {map}) 1段のセル影の材質、K.outline(mesh, 色, 倍率) 輪郭線、K.glow(色, 大きさ) 光の玉、
 *            K.fade(group, 0〜1) まとまりごとに透明にする、K.rand(種) 乱数、K.clamp K.lerp K.sstep
 *   world は、次のものを返す
 *     scenes:  場面の名前の一覧
 *     enter(name, prev)          場面が変わった瞬間に1回
 *     update(dt, t, T, name)     毎コマ。t はその場面に入ってからの秒、T は動画の頭からの秒。
 *                                動きは t と T から決める（書き出しでも同じ動きになる）。dt で少しずつ寄せる動きもよい
 *     camera(name, t)            → [カメラの位置, 見る点]（THREE.Vector3 2つ）。エンジンがなめらかに寄せる
 *     labels(name, t, T)         → [{ id, p: Vector3, t: '名前', sub: '補足', dot: '#色', mono: true/false }]
 *                                3Dの物に付ける名前。重ならない場所をエンジンが探す（ボード・字幕・キャラクターも避ける）
 *   場面ごとに物を出し分けるとき：場面ごとの物を別々の Group にして、update の中で K.fade(group, 出す量) を寄せる
 *   場面を遠く（座標で 100 以上）に分けて置くと、切りかわりで暗転する。近くに置くと、カメラが動いて移る
 *   画面の割りつけ：左上はボード（地は半透明で、後ろの物が透けて見える。ラベルはボードを避ける）、右上は章の札、
 *   下のまんなかは字幕、左下と右下はキャラクター（B が左、A が右）。見せたい物は、まんなかの少し上に来る（エンジンが寄せる）
 *
 * ■ BGM の見本（Kaisetsu.BGM。TextScore の譜面）
 *   opening はじまり（明るい）  explain 説明（落ち着いた）  wonder ふしぎ（考える）  tension 緊張（時計の音）  resolve 解決（あたたか）
 *   自分の曲を足すとき：Kaisetsu.BGM.名前 = { label, gain: 0.8, score: `TextScore の譜面` }。8小節くらいの曲で、
 *   トラックの中身を [ ... ]*R で書く（R は、書き出すときに 2 になる）。2回目の頭から終わりまでがループになる
 *
 * ■ ページから使う
 *   const k = Kaisetsu.mount({ episode, canvas, overlay });   canvas は 3D、overlay は文字（同じ大きさで重ねる）
 *   await k.ready;  k.play()  k.pause()  k.seek(秒)  k.seekLine(i)  k.setVolume({voice, bgm})  k.setSubtitles(true)
 *   k.setVoice('A', {voice, speed})  k.setLook('A', {hair, ...})  k.check()  k.on('state'|'tick'|'progress'|'report', fn)
 *   await k.exportVideo({ format: 'webm'|'mp4', height: 720|1080, onProgress, signal })  → { data: ArrayBuffer, name, ... }
 *
 * ■ 知っておくこと
 *   ・音は耳で確かめて作ったものではない（作った環境では音が出なかった）。読みのアクセントは、書き手の見積もり
 *   ・書き出しは、1コマずつ描いて WebCodecs で圧縮する。Chrome・Edge で動く。時間は端末しだい（4分の動画で数分）
 *   ・数字や事実は、回を書く人が確かめる。図の中で大げさにしたものは、ボードか字幕でそう言う
 */
(function () {
/* ---------- BGM の見本（TextScore の譜面） ----------
   どれも8小節。中身を2回くり返して書き出し、2回目の頭から終わりまでをループにする（残響のしっぽが、継ぎ目にちゃんと入る）。
   譜面の中の *R は、くり返しの回数に置きかえる。セリフのあいだは、自動で音量が下がる */
const BGM_PRESETS = {
  opening: { label: 'はじまり（明るい）', gain: 0.8, score: `
title opening
tempo 112
reverb 1.8
delay 0.75
def cF = F3+A3+C4+E4:1.5 F3+A3+C4+E4:1 F3+A3+C4+E4:1.5
def cE = E3+G3+C4:1.5 E3+G3+C4:1 E3+G3+C4:1.5
def cD = D3+F3+A3+C4:1.5 D3+F3+A3+C4:1 D3+F3+A3+C4:1.5
def cB = Bb2+D3+F3+A3:1.5 Bb2+D3+F3+A3:1 Bb2+D3+F3+A3:1.5
def cC = C3+E3+G3+D4:1.5 C3+E3+G3+D4:1 C3+E3+G3+D4:1.5
def beat = k h s h k h s h
@mel marimba vol=0.42 rev=0.3 dly=0.2
def q1a = C5:0.5 F5:0.5 A5:1 G5:0.5 F5:0.5 -:1 | E5:0.5 G5:0.5 C6:1 G5:1 -:1 | D5:0.5 F5:0.5 A5:1 C6:0.5 A5:0.5 -:1 | Bb4:1 D5:1 F5:1.5 -:0.5 |
def q1b = A5:0.5 G5:0.5 F5:0.5 C5:0.5 F5:1 -:1 | E5:0.5 F5:0.5 G5:1 C5:1 -:1 | D5:0.5 F5:0.5 Bb5:1 A5:0.5 G5:0.5 -:1 | G5:1.5 E5:0.5 C5:1 -:1 |
[$q1a $q1b]*R
@keys epiano vol=0.34 rev=0.3 pan=-0.2
[$cF | $cE | $cD | $cB | $cF | $cC | $cB | $cC |]*R
@bass bass vol=0.5
def q2a = F1:1 -:0.5 F1:0.5 C2:1 F2:1 | E1:1 -:0.5 E1:0.5 G1:1 C2:1 | D2:1 -:0.5 D2:0.5 A1:1 D2:1 | Bb1:1 -:0.5 Bb1:0.5 F2:1 Bb1:1 |
def q2b = F1:1 -:0.5 F1:0.5 C2:1 F2:1 | C2:1 -:0.5 C2:0.5 G1:1 C2:1 | Bb1:1 -:0.5 Bb1:0.5 F2:1 Bb1:1 | C2:1 -:0.5 C2:0.5 G1:1 C2:1 |
[$q2a $q2b]*R
@drums drums vol=0.36 len=0.5
[[$beat |]*7 k h s h k k s s |]*R
` },
  explain: { label: '説明（落ち着いた）', gain: 0.85, score: `
title explain
tempo 84
swing 0.3
reverb 2.4
def cG = G3+B3+D4+F#4:3 G3+B3+D4+F#4?:1
def cF = F#3+A3+C#4+E4:3 F#3+A3+C#4+E4?:1
def cE = E3+G3+B3+D4:3 E3+G3+B3+D4?:1
def cA = A3+D4+E4+G4:2 A3+C#4+E4+G4:2
def beat = k - h k s - h h
@keys epiano vol=0.36 rev=0.35 pan=-0.15
[$cG | $cF | $cE | $cA | $cG | $cF | $cE | $cA |]*R
@kal kalimba vol=0.3 rev=0.45 dly=0.25 pan=0.2
[-:2 B5:0.5 A5:0.5 F#5:1 | -:4 | -:2 G5:0.5 F#5:0.5 E5:1 | -:2 C#6:1 A5:1 | -:2 B5:0.5 A5:0.5 F#5:1 | -:4 | -:1 E5:0.5 F#5:0.5 G5:1 B5:1 | A5:2 -:2 |]*R
@bass bass vol=0.46
def q3a = G1:2 -:0.5 G1:0.5 D2:1 | F#1:2 -:0.5 F#1:0.5 C#2:1 | E1:2 -:0.5 E1:0.5 B1:1 | A1:2 -:0.5 A1:0.5 E2:1 |
def q3b = G1:2 -:0.5 G1:0.5 D2:1 | F#1:2 -:0.5 F#1:0.5 C#2:1 | E1:2 -:0.5 E1:0.5 B1:1 | A1:2 -:0.5 A1:0.5 E2:1 |
[$q3a $q3b]*R
@drums drums vol=0.3 len=0.5
[[$beat |]*8]*R
` },
  wonder: { label: 'ふしぎ（考える）', gain: 0.85, score: `
title wonder
tempo 96
reverb 3.2
delay 0.75
@box musicbox vol=0.34 rev=0.5 dly=0.3 len=0.5
def q4a = A4 C5 E5 B5 E5 C5 B4 C5 | F4 A4 C5 E5 B5 E5 C5 A4 | C5 E5 G5 D6 G5 E5 D5 E5 | G4 B4 D5 E5 D5 B4 A4 B4 |
def q4b = A4 C5 E5 B5 E5 C5 B4 C5 | F4 A4 C5 E5 B5 E5 C5 A4 | C5 E5 G5 D6 G5 E5 D5 E5 | G4 B4 D5 E5 A5:1.5 -:0.5 |
[$q4a $q4b]*R
@pad pad vol=0.22 rev=0.5
[A3+C4+E4+B4:4 | F3+A3+C4+E4:4 | C3+E3+G3+D4:4 | G3+B3+D4+E4:4 | A3+C4+E4+B4:4 | F3+A3+C4+E4:4 | C3+E3+G3+D4:4 | G3+B3+D4+E4:4 |]*R
@sub sub vol=0.36
[A1:4 | F1:4 | C2:4 | G1:4 | A1:4 | F1:4 | C2:4 | G1:4 |]*R
@shk drums vol=0.26 len=0.5
[[b? b?? b? b?? b? b?? b? b?? |]*8]*R
` },
  tension: { label: '緊張（時計の音）', gain: 0.8, score: `
title tension
tempo 120
reverb 1.6
def tick = k+w - w? - w - w? -
@ost pluck vol=0.36 rev=0.25 len=0.5
def q5a = D4 F4 A4 F4 D4 F4 A4 F4 | Bb3 D4 F4 D4 Bb3 D4 F4 D4 | G3 Bb3 D4 Bb3 G3 Bb3 D4 Bb3 | A3 C#4 E4 C#4 A3 C#4 E4 G4 |
def q5b = D4 F4 A4 F4 D4 F4 A4 F4 | Bb3 D4 F4 D4 Bb3 D4 F4 D4 | G3 Bb3 D4 Bb3 G3 Bb3 D4 Bb3 | A3 C#4 E4 G4 A4 G4 E4 C#4 |
[$q5a $q5b]*R
@str strings vol=0.24 rev=0.35
[D3+A3:4 | Bb2+F3:4 | G2+D3:4 | A2+E3:4 | D3+A3:4 | Bb2+F3:4 | G2+D3:4 | A2+C#3+E3:4 |]*R
@bass bass vol=0.48 len=0.5
def q6a = D2 D2 D2 D2 D2 D2 D2 D2 | Bb1 Bb1 Bb1 Bb1 Bb1 Bb1 Bb1 Bb1 | G1 G1 G1 G1 G1 G1 G1 G1 | A1 A1 A1 A1 A1 A1 A1 A1 |
def q6b = D2 D2 D2 D2 D2 D2 D2 D2 | Bb1 Bb1 Bb1 Bb1 Bb1 Bb1 Bb1 Bb1 | G1 G1 G1 G1 G1 G1 G1 G1 | A1 A1 A1 A1 A1 A1 A1 A1 |
[$q6a $q6b]*R
@drums drums vol=0.34 len=0.5
[[$tick |]*8]*R
` },
  resolve: { label: '解決（あたたか）', gain: 0.85, score: `
title resolve
tempo 100
reverb 2.2
def pG = G2+D3+B3:1.5 G2+D3+B3:1 G2+D3+B3:1.5
def pD = F#2+D3+A3:1.5 F#2+D3+A3:1 F#2+D3+A3:1.5
def pE = E2+B2+G3:1.5 E2+B2+G3:1 E2+B2+G3:1.5
def pC = C3+G3+E4:1.5 C3+G3+E4:1 C3+G3+E4:1.5
def pD2 = D3+A3+F#4:1.5 D3+A3+F#4:1 D3+A3+F#4:1.5
@pno piano vol=0.34 rev=0.35 pan=-0.15
[$pG | $pD | $pE | $pC | $pG | $pD2 | $pC | $pD2 |]*R
@mel flute vol=0.32 rev=0.4 dly=0.15 vib=0.6
def q7a = B4:1.5 A4:0.5 G4:1 D5:1 | D5:2 C5:1 B4:1 | B4:1.5 A4:0.5 G4:1 E4:1 | E4:3 -:1 |
def q7b = G4:1 B4:1 D5:1 G5:1 | F#5:2 E5:1 D5:1 | E5:1.5 D5:0.5 C5:1 B4:1 | A4:3 -:1 |
[$q7a $q7b]*R
@str strings vol=0.2 rev=0.4
[G3+D4:4 | F#3+D4:4 | E3+B3:4 | E3+C4:4 | G3+D4:4 | F#3+A3:4 | E3+C4:4 | F#3+A3:4 |]*R
@bass bass vol=0.45
[G1:2 D2:2 | F#1:2 D2:2 | E1:2 B1:2 | C2:2 G1:2 | G1:2 D2:2 | D2:2 A1:2 | C2:2 G1:2 | D2:2 A1:2 |]*R
@drums drums vol=0.28 len=0.5
[[k - h - s - h h |]*8]*R
` },
};

/* ===== まんじゅうのキャラクター =====
   「ミオ 3D頭部モデル」のトゥーン描画（1段のセル影）・輪郭線・顔のデカール（目・眉・口・頬）・髪の房を流用し、
   頭の形を、平たい底のまんじゅう形に置きかえたもの。髪型・髪飾り・帽子は部品として差しかえられる */
const Manju = (() => {
'use strict';
const T = THREE, V3 = T.Vector3, D2R = Math.PI / 180;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const L2 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const hexA = (h, a) => { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 色 ---------- */
const SKIN = { base: '#FFF1E6', shade: '#EFC3AE', line: '#7A4A40' };
const HAIR = {
  budou:  { name: '葡萄', base: '#7E3E5E', shade: '#56263F', hi: '#D59BB8', line: '#2C1020', brow: '#56263F' },
  akagane:{ name: '赤銅', base: '#B8703A', shade: '#84491F', hi: '#F2C091', line: '#3A1F0E', brow: '#84491F' },
  nureba: { name: '濡羽', base: '#363C55', shade: '#1F2335', hi: '#7D8BBE', line: '#10121B', brow: '#2A2F45' },
  gin:    { name: '白銀', base: '#DCDFEA', shade: '#A4A9C2', hi: '#FFFFFF', line: '#565B74', brow: '#8E93AD' },
  sakura: { name: '桜',   base: '#F1A7BA', shade: '#CD7791', hi: '#FFE0E8', line: '#6E3044', brow: '#B06079' },
  matcha: { name: '抹茶', base: '#77A05F', shade: '#4E723E', hi: '#C4E0AC', line: '#22331A', brow: '#4E723E' },
};
const EYE = {
  kohaku: { name: '琥珀', top: '#5A230B', mid: '#CF7A27', low: '#FFD98C' },
  sora:   { name: '空',   top: '#182C6E', mid: '#4884D9', low: '#B0E6FF' },
  midori: { name: '翠',   top: '#13432B', mid: '#35985F', low: '#C0F2A6' },
  sumire: { name: '菫',   top: '#33205C', mid: '#8356CD', low: '#E5CBFF' },
};
const PART = {   // 髪飾り・帽子の色
  gold:   { base: '#F2C14E', shade: '#C4892A', line: '#5A3A0A' },
  silver: { base: '#E4E9F2', shade: '#9FA9BE', line: '#3E4558' },
  cyan:   { base: '#7FE0F0', shade: '#3FA7BF', line: '#164452' },
  petal:  { base: '#F7A8C0', shade: '#D9728F', line: '#6E2C42' },
  teal:   { base: '#3E9C97', shade: '#26706C', line: '#123432' },
  cream:  { base: '#F4EEDC', shade: '#CFC5A8', line: '#4A4433' },
  navy:   { base: '#343A66', shade: '#20244A', line: '#0C0E22' },
  wine:   { base: '#A8414F', shade: '#792B37', line: '#3A1219' },
  mustard:{ base: '#D9A43A', shade: '#A9781F', line: '#47300A' },
};

/* ---------- 体：平たい底のまんじゅう ---------- */
const MX = 1.24, MZ = 1.08, TOP = 1.06, BOT = 0.76;
function deformUnit(nx, ny, nz) {
  const hr = Math.hypot(nx, nz), cx = hr > 1e-6 ? nx / hr : 0, cz = hr > 1e-6 ? nz / hr : 1;
  let y, r = hr;
  if (ny >= 0) y = TOP * ny;
  else {
    const s = -ny, w = sstep(0, 0.6, s);
    y = -((1 - w) * 0.92 * s + w * BOT * Math.sin(s * Math.PI / 2));
    r = hr * (1 + 0.07 * Math.exp(-Math.pow((s - 0.35) / 0.3, 2)));      // 下のほうが少しふくらむ
  }
  return new V3(cx * r * MX, y, cz * r * MZ);
}
const dirOf = (th, ph) => { th *= D2R; ph *= D2R; return [Math.sin(th) * Math.sin(ph), Math.cos(th), Math.sin(th) * Math.cos(ph)]; };
const S = (r, th, ph) => { const d = dirOf(th, ph); return deformUnit(d[0], d[1], d[2]).multiplyScalar(r); };
const nrmAt = p => new V3(p.x / (MX * MX), p.y / ((p.y >= 0 ? TOP : BOT) ** 2), p.z / (MZ * MZ)).normalize();

function smoothSeams(g) {
  g.computeVertexNormals();
  const p = g.attributes.position, n = g.attributes.normal, map = new Map();
  for (let i = 0; i < p.count; i++) {
    const k = Math.round(p.getX(i) * 1e4) + ',' + Math.round(p.getY(i) * 1e4) + ',' + Math.round(p.getZ(i) * 1e4);
    let e = map.get(k); if (!e) { e = [0, 0, 0, []]; map.set(k, e); }
    e[0] += n.getX(i); e[1] += n.getY(i); e[2] += n.getZ(i); e[3].push(i);
  }
  map.forEach(e => { const l = Math.hypot(e[0], e[1], e[2]) || 1; for (const i of e[3]) n.setXYZ(i, e[0] / l, e[1] / l, e[2] / l); });
  n.needsUpdate = true;
}
function bodyGeo() {
  const g = new T.SphereGeometry(1, 96, 64), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const v = deformUnit(p.getX(i), p.getY(i), p.getZ(i)); p.setXYZ(i, v.x, v.y, v.z); }
  g.deleteAttribute('uv'); smoothSeams(g); return g;
}

/* ---------- 髪の房（ミオのモデルから流用） ---------- */
const CENTER = new V3(0, 0, 0);
const defProfile = s => Math.pow(1 - s, 0.85) * (0.8 + 0.5 * Math.sin(Math.PI * Math.min(1, s * 1.3)));
const HAIR_ATTRS = { aT: 1, aPhase: 1, aAmp: 1, aU: 1, aSide: 1, aHi: 1, aLine: 1, aDark: 1, aSN: 3 };
function fillAttrs(g, vals) {
  const n = g.attributes.position.count;
  for (const k in HAIR_ATTRS) {
    if (g.attributes[k]) continue;
    const sz = HAIR_ATTRS[k], arr = new Float32Array(n * sz);
    if (k === 'aSN') arr.set(g.attributes.normal.array); else arr.fill(vals[k] || 0);
    g.setAttribute(k, new T.BufferAttribute(arr, sz));
  }
  return g;
}
/* 房ひとつ：下にあるもの（頭、結んだ房の軸）に沿って曲がる三日月形の断面を、先へ細らせた帯 */
function strandGeo(pts, o) {
  const curve = new T.CatmullRomCurve3(pts, false, 'centripetal');
  const NS = Math.round(o.seg || 26), NR = 12, nV = (NS + 1) * NR;
  const prof = o.profile || defProfile, c = o.center || CENTER, wrap = o.wrap === undefined ? 0.28 : o.wrap;
  const pos = new Float32Array(nV * 3), at = new Float32Array(nV), au = new Float32Array(nV), aside = new Float32Array(nV), rings = [], idx = [];
  const P = new V3(), Tn = new V3(), N = new V3(), B = new V3(), q = new V3();
  for (let i = 0; i <= NS; i++) {
    const s = i / NS; curve.getPoint(s, P); curve.getTangent(s, Tn).normalize();
    if (o.hint) N.copy(o.hint);
    else if (o.axis) N.copy(P).sub(o.axis.getPointAt(clamp(o.axisMap(s), 0, 1)));
    else N.copy(nrmAt(P));
    N.addScaledVector(Tn, -N.dot(Tn));
    if (N.lengthSq() < 1e-10) { N.set(0, 0, 1).addScaledVector(Tn, -Tn.z); if (N.lengthSq() < 1e-10) N.set(1, 0, 0); }
    N.normalize(); B.crossVectors(Tn, N).normalize(); rings.push(N.clone());
    const f = Math.max(0, prof(s)), w = o.w * f * 0.5, th = o.th * Math.pow(f, 0.55) * 0.5;
    for (let j = 0; j < NR; j++) {
      const a = j / NR * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a), k = i * NR + j;
      q.copy(P).addScaledVector(B, ca * w).addScaledVector(N, (sa > 0 ? sa : sa * 0.4) * th - wrap * ca * ca * w);
      pos[k * 3] = q.x; pos[k * 3 + 1] = q.y; pos[k * 3 + 2] = q.z; at[k] = s; au[k] = ca; aside[k] = j === NR / 2 ? 0 : sa;
    }
  }
  for (let i = 0; i < NS; i++) for (let j = 0; j < NR; j++) {
    const a = i * NR + j, b = i * NR + (j + 1) % NR, cc = (i + 1) * NR + j, d = (i + 1) * NR + (j + 1) % NR;
    idx.push(a, cc, b, b, cc, d);
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  // 影の向きは、下にある大きな形に寄せる（セル影がきれいな形で落ちるように）
  const nrm = g.attributes.normal.array, sn = new Float32Array(nV * 3), t = new V3();
  for (let i = 0; i <= NS; i++) for (let j = 0; j < NR; j++) {
    const k = i * NR + j, sg = aside[k] >= 0 ? 1 : -1;
    t.set(nrm[k * 3], nrm[k * 3 + 1], nrm[k * 3 + 2]).multiplyScalar(0.3).addScaledVector(rings[i], 0.7 * sg).normalize();
    sn[k * 3] = t.x; sn[k * 3 + 1] = t.y; sn[k * 3 + 2] = t.z;
  }
  g.setAttribute('aT', new T.BufferAttribute(at, 1));
  g.setAttribute('aU', new T.BufferAttribute(au, 1));
  g.setAttribute('aSide', new T.BufferAttribute(aside, 1));
  g.setAttribute('aSN', new T.BufferAttribute(sn, 3));
  return fillAttrs(g, { aPhase: o.phase || 0, aAmp: o.amp === undefined ? 1 : o.amp, aHi: o.hi === undefined ? 0 : o.hi, aLine: o.line === undefined ? 1 : o.line, aDark: o.dark || 0 });
}
// 生えぎわ：[前からの角度, 頭のてっぺんからの角度] を、なめらかにつなぐ
function makeHL(K) {
  const n = K.length, d = [], m = [0];
  for (let i = 0; i < n - 1; i++) d.push((K[i + 1][1] - K[i][1]) / (K[i + 1][0] - K[i][0]));
  for (let i = 1; i < n - 1; i++) m.push(d[i - 1] * d[i] <= 0 ? 0 : 2 / (1 / d[i - 1] + 1 / d[i]));
  m.push(0);
  return ph => {
    const a = Math.abs(Math.atan2(Math.sin(ph * D2R), Math.cos(ph * D2R))) / D2R;
    let i = 0; while (i < n - 2 && a > K[i + 1][0]) i++;
    const h = K[i + 1][0] - K[i][0], t = clamp((a - K[i][0]) / h, 0, 1), t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * K[i][1] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * K[i + 1][1] + (t3 - t2) * h * m[i + 1];
  };
}
function shellGeo(thMaxOf, R0, R1, NP, NT) {   // 頭を覆う殻（髪の地、帽子）
  NP = NP || 180; NT = NT || 30;
  const pos = [], idx = [];
  for (let i = 0; i <= NP; i++) {
    const ph = i / NP * 360, thMax = thMaxOf(ph);
    for (let j = 0; j <= NT; j++) {
      const th = j / NT * thMax, R = R0 + (R1 - R0) * sstep(0, 9, thMax - th), d = dirOf(th, ph);
      const v = deformUnit(d[0], d[1], d[2]).multiplyScalar(R); pos.push(v.x, v.y, v.z);
    }
  }
  for (let i = 0; i < NP; i++) for (let j = 0; j < NT; j++) { const a = i * (NT + 1) + j, b = (i + 1) * (NT + 1) + j; idx.push(a, a + 1, b, b, a + 1, b + 1); }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); smoothSeams(g);
  return g;
}
function merge(list) {
  const names = Object.keys(list[0].attributes);
  let nv = 0, ni = 0;
  for (const g of list) { nv += g.attributes.position.count; ni += g.index.count; }
  const out = {}, idx = new Uint32Array(ni);
  for (const nm of names) out[nm] = new Float32Array(nv * list[0].attributes[nm].itemSize);
  let vo = 0, io = 0;
  for (const g of list) {
    for (const nm of names) { const a = g.attributes[nm]; out[nm].set(a.array, vo * a.itemSize); }
    const ix = g.index.array; for (let k = 0; k < ix.length; k++) idx[io + k] = ix[k] + vo;
    vo += g.attributes.position.count; io += ix.length;
    g.dispose();
  }
  const m = new T.BufferGeometry();
  for (const nm of names) m.setAttribute(nm, new T.BufferAttribute(out[nm], list[0].attributes[nm].itemSize));
  m.setIndex(new T.BufferAttribute(idx, 1));
  return m;
}
let seed = 11;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const bobProf = s => (0.8 + 0.2 * sstep(0, 0.2, s)) * Math.pow(1 - sstep(0.72, 1, s), 0.75);
const lockProf = s => (0.85 + 0.15 * sstep(0, 0.12, s)) * Math.pow(1 - sstep(0.7, 1, s), 0.75);
const bangProf = s => Math.pow(1 - s, 0.8) * (0.75 + 0.55 * Math.sin(Math.PI * Math.min(1, s * 1.25)));
function collide(p, m) {        // まんじゅうの外に出す（だ円体で近似）
  const ry = p.y >= 0 ? TOP : BOT;
  const qx = p.x / (MX + m), qy = p.y / (ry + m), qz = p.z / (MZ + m), l = Math.hypot(qx, qy, qz);
  if (l < 1 && l > 1e-4) { p.x = qx / l * (MX + m); p.y = qy / l * (ry + m); p.z = qz / l * (MZ + m); }
  if (p.y < -BOT + 0.03) p.y = -BOT + 0.03;
  return p;
}

const HL = {
  long:  makeHL([[0, 50], [25, 52], [45, 58], [60, 66], [75, 80], [90, 98], [110, 118], [130, 132], [155, 141], [180, 144]]),
  short: makeHL([[0, 50], [25, 52], [45, 58], [60, 66], [75, 78], [90, 90], [110, 98], [130, 102], [155, 104], [180, 105]]),
};
function makeHair(key) {
  seed = 11;
  const st = STYLES[key], parts = [fillAttrs(shellGeo(HL[st.hl], 1.006, 1.04), { aSide: 1, aHi: -1, aLine: 1 })], ties = [];
  const add = (pts, o) => parts.push(strandGeo(pts, Object.assign({ phase: rnd() * 6.28 }, o)));
  const H = {
    ahoge() {
      add([new V3(0.0, 0.94, 0.1), new V3(0.05, 1.16, 0.2), new V3(0.15, 1.32, 0.22), new V3(0.3, 1.35, 0.1), new V3(0.36, 1.27, -0.03)],
        { w: 0.13, th: 0.045, wrap: 0, hi: -1, hint: new V3(0, 0, 1), profile: s => Math.pow(1 - s, 0.7) * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, s * 1.6))) });
    },
    bangs() {
      for (const ph of [-56, -40, -24, -8, 8, 24, 40, 56]) {
        const sg = ph >= 0 ? 1 : -1;
        add([S(1.04, 44, ph * 0.76), S(1.06, 54, ph * 0.86), S(1.07, 63, ph * 0.96), S(1.075, 71 + rnd() * 2, ph + 3 * sg)], { w: 0.42, th: 0.07, dark: 1, hi: -1 });
      }
      const main = [[-66, 78, 0.42], [-52, 74, 0.46], [-37, 71, 0.5], [-22, 70, 0.48], [-7, 73, 0.5], [7, 76, 0.46], [21, 70, 0.5], [36, 71, 0.5], [51, 74, 0.46], [64, 78, 0.42]];
      for (const [ph, tip, w] of main) {
        const sg = ph >= 0 ? 1 : -1, drift = Math.abs(ph) > 45 ? 7 * sg : (ph === 7 ? -5 : 2.5 * sg);
        add([S(0.99, 14, ph * 0.3), S(1.06, 40, ph * 0.75), S(1.08, 58, ph * 0.95 - drift * 0.15), S(1.085, tip - 8, ph + drift * 0.5), S(1.095, tip, ph + drift)],
          { w, th: 0.09, wrap: 0.3, profile: bangProf });
      }
    },
    sides(len) {
      for (const sg of [1, -1]) for (const [a, w, dl] of [[70, 0.4, -6], [83, 0.46, 0]]) {
        const ph = a * sg;
        add([S(0.99, 12, ph * 0.5), S(1.07, 40, ph * 0.9), S(1.09, 70, ph), S(1.09, 96, ph + 2 * sg), S(1.085, len - 10 + dl, ph + 4 * sg), S(1.07, len + dl, ph + 3 * sg)].map(p => collide(p, 0.04)),
          { w, th: 0.09, wrap: 0.3, profile: lockProf });
      }
    },
    back(len) {
      const n = 11, span = 190, start = 85;
      for (let k = 0; k < n - 1; k++) {
        const ph = start + (k + 0.5) * span / (n - 1);
        add([S(0.985, 8, ph), S(1.05, 45, ph), S(1.07, 85, ph), S(1.07, (85 + len) / 2, ph), S(1.06, len, ph)], { w: 0.62, th: 0.1, dark: 1, hi: -1, profile: bobProf });
      }
      for (let k = 0; k < n; k++) {
        const ph = start + k * span / (n - 1) + (rnd() - 0.5) * 3, up = k % 2 ? 0.015 : 0, l = len + (rnd() - 0.5) * 5;
        add([S(0.98, 6, ph), S(1.07 + up, 45, ph), S(1.1 + up, 85, ph), S(1.1 + up, (85 + l) / 2, ph + 1), S(1.08 + up, l, ph + 2)], { w: 0.74, th: 0.12, wrap: 0.3, profile: bobProf });
      }
    },
    scrunchie(pos, dir, R, tube) {
      const U = 48, Vn = 10, P = [], idx = [];
      for (let i = 0; i <= U; i++) {
        const u = i / U * Math.PI * 2, ruff = 1 + 0.24 * Math.sin(u * 11), rr = tube * ruff, RR = R + 0.25 * tube * Math.cos(u * 11);
        for (let j = 0; j <= Vn; j++) { const v = j / Vn * Math.PI * 2; P.push((RR + rr * Math.cos(v)) * Math.cos(u), (RR + rr * Math.cos(v)) * Math.sin(u), rr * Math.sin(v) * 1.15); }
      }
      for (let i = 0; i < U; i++) for (let j = 0; j < Vn; j++) { const a = i * (Vn + 1) + j, b = a + Vn + 1; idx.push(a, b, a + 1, a + 1, b, b + 1); }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(P, 3)); g.setIndex(idx);
      g.applyMatrix4(new T.Matrix4().makeRotationFromQuaternion(new T.Quaternion().setFromUnitVectors(new V3(0, 0, 1), dir.clone().normalize())));
      g.translate(pos.x, pos.y, pos.z); smoothSeams(g); ties.push(g);
    },
    tail(axisPts, o) {
      const pts = axisPts.map((p, i) => i ? collide(p.clone(), o.r + 0.05) : p.clone());
      const axis = new T.CatmullRomCurve3(pts, false, 'centripetal'), F = 120, fr = axis.computeFrenetFrames(F, false);
      const frame = s => { const i = Math.round(clamp(s, 0, 1) * F); return [fr.normals[i], fr.binormals[i]]; };
      const env = s => (0.42 + 0.58 * sstep(0, 0.16, s)) * (1 + 0.15 * Math.sin(Math.PI * clamp((s - 0.1) / 0.5, 0, 1))) * (1 - 0.8 * sstep(0.66, 1, s));
      const n = o.n || 7, M = 34, ph0 = rnd() * 6.28, R0 = o.r;
      const core = []; for (let i = 0; i <= 16; i++) core.push(axis.getPointAt(i / 16 * 0.86));
      add(core, { w: R0 * 1.3, th: R0 * 1.3, seg: 32, amp: o.amp, phase: ph0, dark: 1, hi: -1, wrap: 0, axis, axisMap: s => s * 0.86, profile: s => env(s * 0.86) * (1 - 0.6 * sstep(0.7, 1, s)) });
      for (let k = 0; k < n; k++) {
        const a0 = k / n * Math.PI * 2 + rnd() * 0.3, sEnd = k % 3 === 0 ? 0.86 + rnd() * 0.04 : 0.95 + rnd() * 0.05, spread = 0.3 + rnd() * 0.25, sp = [];
        for (let i = 0; i <= M; i++) {
          const s = i / M * sEnd, P = axis.getPointAt(s), [Nn, Bn] = frame(s), a = a0 + o.twist * s;
          const R = R0 * ((k % 2 ? 0.7 : 0.58) * env(s) + spread * Math.pow(sstep(0.62, 1, s / sEnd), 1.3));
          sp.push(P.addScaledVector(Nn, Math.cos(a) * R).addScaledVector(Bn, Math.sin(a) * R));
        }
        add(sp, { w: 2 * Math.PI * 0.62 * R0 / n * 1.75, th: R0 * 0.42, seg: 36, amp: o.amp, phase: ph0 + k * 0.12, wrap: 0.35, hi: 1.14 + rnd() * 0.03, axis, axisMap: s => s * sEnd,
          profile: s => env(s * sEnd) * Math.pow(1 - sstep(0.72, 1, s), 0.7) });
      }
      H.scrunchie(axis.getPointAt(0.04), axis.getTangentAt(0.04), R0 * 0.5, 0.05);
    },
  };
  st.build(H);
  return { hair: merge(parts), ties };
}
const STYLES = {
  bob:   { name: 'ボブ', hl: 'long', build: H => { H.bangs(); H.back(140); H.sides(138); } },
  short: { name: 'ショート', hl: 'short', ahoge: true, build: H => { H.bangs(); H.back(106); H.sides(104); } },
  twin:  { name: 'ツインテール', hl: 'short', build: H => {
    H.bangs(); H.back(110); H.sides(118);
    for (const sg of [1, -1]) {
      const Tt = S(1.07, 60, 110 * sg), out = new V3(Tt.x, 0, Tt.z).normalize();
      H.tail([Tt, Tt.clone().addScaledVector(out, 0.28).add(new V3(0, 0.08, 0)), Tt.clone().addScaledVector(out, 0.55).add(new V3(0, -0.02, 0)),
        new V3(sg * 1.95, -0.12, -0.4), new V3(sg * 2.06, -0.42, -0.32), new V3(sg * 2.0, -0.64, -0.22)], { r: 0.25, n: 7, amp: 3, twist: 0.8 * sg });
    }
  } },
};

/* ---------- 描画（シェーダーはミオのモデルから。まんじゅう用に、前髪の影の高さ・天使の輪の高さ・ニットの畝を足した） ---------- */
const U = { time: { value: 0 }, sway: { value: reduceMotion ? 0 : 1 }, light: { value: new V3(-0.45, 0.55, 0.75).normalize() } };
const SWAY = `
attribute float aT; attribute float aPhase; attribute float aAmp;
uniform float uTime; uniform float uSway;
vec3 sway(vec3 p){
  float w = aT*aT*aAmp;
  p.x += sin(uTime*1.35 + aPhase)*0.022*w*uSway;
  p.z += sin(uTime*1.05 + aPhase*1.7)*0.014*w*uSway;
  p.y += sin(uTime*1.6 + aPhase*0.6)*0.006*w*uSway;
  return p;
}`;
const toonVS = SWAY + `
uniform float uFace;
varying vec3 vN; varying vec3 vL;
void main(){
  vec3 p = sway(position);
  vL = p;
  float fk = uFace * smoothstep(0.05, 0.55, position.z) * smoothstep(0.3, -0.1, position.y);
  vN = normalize(normalMatrix*normalize(mix(normal, vec3(0.0,0.0,1.0), fk)));
  gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.0);
}`;
const toonFS = `
uniform vec3 uBase; uniform vec3 uShade; uniform vec3 uLight;
uniform float uTh; uniform int uMode; uniform float uFore; uniform float uFB; uniform float uRib;
varying vec3 vN; varying vec3 vL;
void main(){
  vec3 n = normalize(vN); if(!gl_FrontFacing) n = -n;
  float lit = smoothstep(uTh-0.015, uTh+0.015, dot(n, normalize(uLight)));
  if(uMode==0){
    float fb = uFB + 0.03*sin(vL.x*22.0);
    float fsh = uFore*smoothstep(fb-0.006, fb+0.006, vL.y)*smoothstep(0.3,0.5,vL.z);
    lit = min(lit, 1.0-fsh);
  }
  vec3 col = mix(uShade,uBase,lit);
  if(uMode==4){ float a = atan(vL.x, vL.z); col *= 1.0 - 0.09*step(0.5, fract(a*uRib)); }
  gl_FragColor = vec4(col,1.0);
}`;
const lineVS = SWAY + `
uniform float uThick;
void main(){
  vec3 p = sway(position);
  p += normalize(normal)*uThick*(1.0-0.55*aT);
  gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.0);
}`;
const lineFS = `uniform vec3 uColor; void main(){ gl_FragColor = vec4(uColor,1.0); }`;
const hairVS = SWAY + `
attribute float aU; attribute float aSide; attribute float aHi; attribute float aDark; attribute vec3 aSN;
varying vec3 vSN; varying vec3 vL; varying float vT; varying float vPh; varying float vU; varying float vSide; varying float vHi; varying float vDark;
void main(){
  vec3 p = sway(position);
  vL = position; vT = aT; vPh = aPhase; vU = aU; vSide = aSide; vHi = aHi; vDark = aDark;
  vSN = normalize(normalMatrix*aSN);
  gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.0);
}`;
const hairFS = `
uniform vec3 uBase; uniform vec3 uShade; uniform vec3 uHi; uniform vec3 uLine; uniform vec3 uLight; uniform float uTh; uniform float uRing;
varying vec3 vSN; varying vec3 vL; varying float vT; varying float vPh; varying float vU; varying float vSide; varying float vHi; varying float vDark;
void main(){
  float lit = smoothstep(uTh-0.015, uTh+0.015, dot(normalize(vSN), normalize(uLight)));
  vec3 deep = mix(uShade, uLine, 0.3);
  bool outer = vSide >= 0.0;
  vec3 col = vDark > 0.5 ? mix(deep, uShade, lit) : mix(uShade, uBase, lit);
  if(!outer) col = deep;
  float edge = outer ? smoothstep(0.9, 0.95, abs(vU)) : 0.0;
  col = mix(col, (vDark > 0.5 || lit < 0.5) ? deep : uShade, edge*0.85);
  if(outer && vDark < 0.5 && vHi > -0.5 && fract(vPh*0.37) > 0.42){
    float lp = sin(vPh*7.13)*0.45;
    float a0 = 0.12 + 0.12*fract(vPh*1.7), a1 = 0.62 + 0.25*fract(vPh*2.3);
    float lw = 0.03*pow(max(0.0, sin(3.14159*clamp((vT-a0)/(a1-a0), 0.0, 1.0))), 0.8);
    float fl = (1.0 - smoothstep(lw-0.01, lw+0.01, abs(vU-lp))) * step(0.004, lw);
    col = mix(col, lit > 0.5 ? uShade : deep, fl*(lit > 0.5 ? 0.8 : 0.55));
  }
  if(outer && vDark < 0.5 && vHi > -0.5 && lit > 0.5){
    float hl;
    if(vHi < 0.5){
      float r = length(vL);
      float th = acos(clamp(vL.y/r,-1.0,1.0));
      float ph = atan(vL.x, vL.z);
      float c = uRing + 0.05*sin(vPh*5.3) + 0.03*vU*sin(vPh*2.9);
      float hw = (0.04 + 0.014*sin(vPh*3.1))*(1.0 - vU*vU)*step(0.3, fract(vPh*0.61));
      hl = (1.0 - smoothstep(hw-0.005, hw+0.005, abs(th-c))) * smoothstep(-0.6, -0.1, cos(ph)) * step(0.004, hw);
    } else {
      float hw = 0.02*(1.0 - vU*vU)*step(0.25, fract(vPh*0.83));
      hl = (1.0 - smoothstep(hw-0.004, hw+0.004, abs(vT-(vHi-1.0)))) * step(0.003, hw);
    }
    col = mix(col, uHi, hl);
  }
  gl_FragColor = vec4(col,1.0);
}`;
const hairLineVS = SWAY + `
attribute float aLine;
uniform float uThick;
void main(){
  vec3 p = sway(position);
  p += normalize(normal)*uThick*(1.0-0.55*aT)*aLine;
  gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.0);
}`;
function toonMat(pal, mode, th, extra) {
  return new T.ShaderMaterial({
    vertexShader: toonVS, fragmentShader: toonFS,
    uniforms: Object.assign({
      uBase: { value: new T.Color(pal.base) }, uShade: { value: new T.Color(pal.shade) },
      uLight: U.light, uTh: { value: th }, uMode: { value: mode }, uFace: { value: mode === 0 ? 0.6 : 0 }, uFore: { value: 1 }, uFB: { value: 0.31 }, uRib: { value: 4.2 },
      uTime: U.time, uSway: U.sway,
    }, extra || {}),
  });
}
function lineMat(color, thick) {
  return new T.ShaderMaterial({ vertexShader: lineVS, fragmentShader: lineFS, side: T.BackSide,
    uniforms: { uColor: { value: new T.Color(color) }, uThick: { value: thick }, uTime: U.time, uSway: U.sway } });
}
function toonMesh(geo, pal, mode, th, thick, parent) {
  const m = new T.Mesh(geo, toonMat(pal, mode, th)); parent.add(m);
  const o = new T.Mesh(geo, lineMat(pal.line, thick)); parent.add(o);
  return m;
}
function noAttrs(g) {   // 輪郭線のシェーダーが読む属性（aT など）を、ふつうの形にも足しておく
  const n = g.attributes.position.count;
  for (const k of ['aT', 'aPhase', 'aAmp']) if (!g.attributes[k]) g.setAttribute(k, new T.BufferAttribute(new Float32Array(n), 1));
  return g;
}

/* ---------- 顔のデカール ---------- */
function decalGeo(cx, cy, w, h, seg, lift) {
  seg = seg || 30; lift = lift || 0.004;
  const pos = [], uv = [], idx = [];
  for (let j = 0; j <= seg; j++) for (let i = 0; i <= seg; i++) {
    const u = i / seg, v = j / seg, X = cx + (u - 0.5) * w, Y = cy + (0.5 - v) * h;
    let nx = X / MX, ny = Y;
    for (let k = 0; k < 18; k++) {
      const d = deformUnit(nx, ny, Math.sqrt(Math.max(1e-4, 1 - nx * nx - ny * ny)));
      nx += (X - d.x) * 0.6; ny += (Y - d.y) * 0.8;
      const r2 = nx * nx + ny * ny; if (r2 > 0.995) { const s = Math.sqrt(0.995 / r2); nx *= s; ny *= s; }
    }
    const d = deformUnit(nx, ny, Math.sqrt(Math.max(1e-4, 1 - nx * nx - ny * ny))).multiplyScalar(1 + lift);
    pos.push(d.x, d.y, d.z); uv.push(u, 1 - v);
  }
  for (let j = 0; j < seg; j++) for (let i = 0; i < seg; i++) { const a = j * (seg + 1) + i, b = a + seg + 1; idx.push(a, b, a + 1, a + 1, b, b + 1); }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}
function mirrorUV(g) { const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i)); uv.needsUpdate = true; return g; }
function makeCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function canvasTex(c) { const t = new T.CanvasTexture(c); t.minFilter = T.LinearMipmapLinearFilter; t.anisotropy = 4; return t; }
function decalMat(tex, extra) {
  return new T.MeshBasicMaterial(Object.assign({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }, extra || {}));
}
function bez(P, t) { const u = 1 - t; return [u*u*u*P[0][0] + 3*u*u*t*P[1][0] + 3*u*t*t*P[2][0] + t*t*t*P[3][0], u*u*u*P[0][1] + 3*u*u*t*P[1][1] + 3*u*t*t*P[2][1] + t*t*t*P[3][1]]; }
function bezD(P, t) { const u = 1 - t; return [3*u*u*(P[1][0]-P[0][0]) + 6*u*t*(P[2][0]-P[1][0]) + 3*t*t*(P[3][0]-P[2][0]), 3*u*u*(P[1][1]-P[0][1]) + 6*u*t*(P[2][1]-P[1][1]) + 3*t*t*(P[3][1]-P[2][1])]; }
function upN(P, t) { const d = bezD(P, t); let nx = d[1], ny = -d[0]; const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l; if (ny > 0) { nx = -nx; ny = -ny; } return [nx, ny]; }
function ribbon(ctx, P, thick, t0, t1, bias) {
  const N = 40, A = [], B = [];
  for (let i = 0; i <= N; i++) {
    const t = lerp(t0, t1, i / N), p = bez(P, t), n = upN(P, t), w = thick(t);
    A.push([p[0] + n[0] * w * bias, p[1] + n[1] * w * bias]); B.push([p[0] - n[0] * w * (1 - bias), p[1] - n[1] * w * (1 - bias)]);
  }
  ctx.beginPath(); ctx.moveTo(A[0][0], A[0][1]);
  for (let i = 1; i <= N; i++) ctx.lineTo(A[i][0], A[i][1]);
  for (let i = N; i >= 0; i--) ctx.lineTo(B[i][0], B[i][1]);
  ctx.closePath(); ctx.fill();
}
function strokeBez(ctx, P, t0, t1, dy) {
  ctx.beginPath();
  for (let i = 0; i <= 30; i++) { const p = bez(P, lerp(t0, t1, i / 30)); if (i) ctx.lineTo(p[0], p[1] + (dy || 0)); else ctx.moveTo(p[0], p[1] + (dy || 0)); }
  ctx.stroke();
}
function ell(ctx, x, y, rx, ry, rot) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot || 0, 0, Math.PI * 2); }
/* 目ひとつ（目頭が左）。もう片方は UV を左右反転して使う。ミオのモデルの描き方そのまま */
function drawEye(ctx, st, mirror, pal, lash) {
  ctx.clearRect(0, 0, 512, 512);
  const { open, happy, flat, wide } = st;
  const gx = mirror ? -st.gx : st.gx, gy = st.gy, hs = mirror ? -1 : 1, k = 1 - open;
  const I = L2([128, 352], [140, 370], happy * k), O = L2([404, 318], [392, 354], happy * k);
  let U1 = L2([160, 250], [156, 222], wide), U2 = L2([318, 204], [322, 176], wide);
  U1 = L2(U1, [176, 300], flat); U2 = L2(U2, [330, 290], flat);
  const C1 = L2([190, 394], [196, 302], happy), C2 = L2([334, 382], [330, 288], happy);
  const P1 = L2(C1, U1, open), P2 = L2(C2, U2, open);
  const UP = [I, P1, P2, O], LO = [O, [400, 422 + 10 * wide], [236, 470 + 12 * wide], I];
  if (open > 0.08) {
    ctx.save();
    ctx.beginPath(); ctx.moveTo(I[0], I[1]);
    ctx.bezierCurveTo(P1[0], P1[1], P2[0], P2[1], O[0], O[1]);
    ctx.bezierCurveTo(LO[1][0], LO[1][1], LO[2][0], LO[2][1], I[0], I[1]);
    ctx.closePath(); ctx.clip();
    ctx.fillStyle = '#FCFDFF'; ctx.fillRect(0, 0, 512, 512);
    const sc = 1 - 0.2 * wide, rx = 78 * sc, ry = 104 * sc, cx = 268 + gx * 48, cy = 352 + gy * 26 - wide * 4;
    ctx.save(); ell(ctx, cx, cy, rx, ry); ctx.clip();
    const g = ctx.createLinearGradient(0, cy - ry, 0, cy + ry);
    g.addColorStop(0, pal.top); g.addColorStop(0.5, pal.mid); g.addColorStop(1, pal.low);
    ctx.fillStyle = g; ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
    ctx.strokeStyle = hexA(pal.top, 0.35); ctx.lineWidth = 3; ell(ctx, cx, cy + 6, rx * 0.66, ry * 0.66); ctx.stroke();
    const ps = 1 - 0.45 * wide;
    ctx.fillStyle = hexA(pal.top, 0.92); ell(ctx, cx, cy - 2, rx * 0.36 * ps, ry * 0.44 * ps); ctx.fill();
    ctx.globalCompositeOperation = 'screen';
    const rg = ctx.createRadialGradient(cx, cy + ry * 0.62, 2, cx, cy + ry * 0.62, rx * 0.95);
    rg.addColorStop(0, hexA(pal.low, 0.95)); rg.addColorStop(1, hexA(pal.low, 0));
    ctx.fillStyle = rg; ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = hexA(pal.top, 0.55); ell(ctx, cx, cy - ry * 0.8, rx * 1.3, ry * 0.5); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = pal.top; ctx.lineWidth = 5; ell(ctx, cx, cy, rx, ry); ctx.stroke();
    ctx.strokeStyle = 'rgba(70,60,110,0.16)'; ctx.lineWidth = 30; ctx.lineCap = 'round';
    strokeBez(ctx, UP, 0, 1, 12);
    ctx.fillStyle = '#FFFFFF';
    ell(ctx, cx - 30 * hs, cy - 44 * sc, 21 * sc, 28 * sc, -0.35 * hs); ctx.fill();
    ell(ctx, cx + 28 * hs, cy + 40 * sc, 9 * sc, 9 * sc); ctx.fill();
    ctx.globalAlpha = 0.85; ell(ctx, cx - 6 * hs, cy + 24 * sc, 4.5 * sc, 4.5 * sc); ctx.fill(); ctx.globalAlpha = 1;
    ctx.restore();
    ctx.lineCap = 'round';
    ctx.strokeStyle = hexA(lash, 0.85 * sstep(0.3, 0.8, open)); ctx.lineWidth = 3.5;
    strokeBez(ctx, LO, 0.04, 0.45, 0);
  }
  const lw = lerp(0.95, 1, open);
  ctx.fillStyle = lash;
  ribbon(ctx, UP, t => (4 + 13 * sstep(0, 0.72, t) - 3 * sstep(0.86, 1, t)) * lw, 0, 1, 0.8);
  const d = [O[0] - P2[0], O[1] - P2[1]], dl = Math.hypot(d[0], d[1]) || 1;
  const ang = Math.atan2(d[1] / dl, d[0] / dl) - 0.8, n = upN(UP, 1);
  const tip = [O[0] + Math.cos(ang) * 30 * lw, O[1] + Math.sin(ang) * 30 * lw];
  ctx.beginPath(); ctx.moveTo(O[0] + n[0] * 11 * lw - 6, O[1] + n[1] * 11 * lw);
  ctx.lineTo(tip[0], tip[1]); ctx.lineTo(O[0] - n[0] * 3, O[1] - n[1] * 3); ctx.closePath(); ctx.fill();
  if (open > 0.5) for (const t of [0.6, 0.78]) {
    const p = bez(UP, t), nn = upN(UP, t), w = (4 + 13 * sstep(0, 0.72, t)) * 0.8 * lw;
    const bx = p[0] + nn[0] * w, by = p[1] + nn[1] * w, dx = nn[0] * 0.8 + 0.6, dy = nn[1] * 0.8 - 0.1;
    ctx.beginPath(); ctx.moveTo(bx - 7, by + 2); ctx.lineTo(bx + dx * 13, by + dy * 13); ctx.lineTo(bx + 5, by + 3); ctx.closePath(); ctx.fill();
  }
}
function drawBrow(ctx, st, color) {
  ctx.clearRect(0, 0, 512, 256);
  const dy = -st.brow * 34, ti = st.tilt;
  ctx.fillStyle = color;
  ribbon(ctx, [[146, 133 + dy + ti * 24], [200, 99 + dy + ti * 16], [318, 87 + dy], [402, 115 + dy - ti * 8]], t => 9 - 6 * t, 0, 1, 0.5);
}
/* 口：k＝開き（0〜1、話しているときの口パク）、base＝閉じているときの形 */
function drawMouth(ctx, k, base) {
  ctx.clearRect(0, 0, 256, 256);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const line = '#8E3B3F', inside = '#7A2231', tongue = '#E7727E';
  ctx.strokeStyle = line; ctx.fillStyle = inside;
  if (k < 0.06) {
    if (base === 'o') {
      ell(ctx, 128, 130, 15, 19); ctx.save(); ctx.fill(); ctx.clip(); ctx.fillStyle = tongue; ell(ctx, 128, 148, 13, 8); ctx.fill(); ctx.restore();
      ell(ctx, 128, 130, 15, 19); ctx.lineWidth = 5; ctx.stroke();
    } else if (base === 'flat') {
      ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(104, 128); ctx.quadraticCurveTo(128, 125, 152, 130); ctx.stroke();
    } else if (base === 'open') {
      const mp = () => { ctx.beginPath(); ctx.moveTo(86, 112); ctx.quadraticCurveTo(128, 122, 170, 110); ctx.bezierCurveTo(164, 162, 92, 164, 86, 112); ctx.closePath(); };
      mp(); ctx.save(); ctx.fill(); ctx.clip(); ctx.fillStyle = tongue; ell(ctx, 128, 156, 32, 17); ctx.fill(); ctx.restore();
      mp(); ctx.lineWidth = 5; ctx.stroke();
    } else {
      ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(100, 120); ctx.quadraticCurveTo(128, 140, 156, 119); ctx.stroke();
    }
    return;
  }
  const w = 28 + 18 * k, h = 14 + 46 * k, top = 116;
  const mp = () => { ctx.beginPath(); ctx.moveTo(128 - w, top); ctx.quadraticCurveTo(128, top + 8, 128 + w, top); ctx.bezierCurveTo(128 + w * 0.85, top + h * 1.2, 128 - w * 0.85, top + h * 1.2, 128 - w, top); ctx.closePath(); };
  mp(); ctx.save(); ctx.fill(); ctx.clip();
  ctx.fillStyle = tongue; ell(ctx, 128, top + h * 0.95, w * 0.75, h * 0.38); ctx.fill();
  ctx.restore();
  mp(); ctx.lineWidth = 5; ctx.stroke();
}
function drawBlush(ctx) {
  ctx.clearRect(0, 0, 256, 128);
  const g = ctx.createRadialGradient(128, 64, 4, 128, 64, 110);
  g.addColorStop(0, 'rgba(255,128,146,0.6)'); g.addColorStop(1, 'rgba(255,128,146,0)');
  ctx.save(); ctx.scale(1, 0.5); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(128, 128, 110, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  ctx.strokeStyle = 'rgba(226,86,110,0.85)'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (const x of [92, 122, 152]) { ctx.beginPath(); ctx.moveTo(x - 7, 78); ctx.lineTo(x + 9, 50); ctx.stroke(); }
}
let shadowTex = null;
function blobShadowTex() {
  if (shadowTex) return shadowTex;
  const c = makeCanvas(128, 128), x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 8, 64, 64, 62);
  g.addColorStop(0, 'rgba(10,14,40,0.55)'); g.addColorStop(1, 'rgba(10,14,40,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  return (shadowTex = new T.CanvasTexture(c));
}

/* ---------- 部品：髪飾り・帽子 ---------- */
// 体の表面の点に、表面の向きに合わせて置く（z が外向き、y がだいたい上）
function placeOn(obj, r, th, ph) {
  const p = S(r, th, ph), z = nrmAt(p), x = new V3(0, 1, 0).cross(z).normalize(), y = z.clone().cross(x);
  obj.position.copy(p); obj.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(x, y, z));
  return obj;
}
const ORNAMENTS = {
  none: { name: 'なし', build: () => null },
  orbit: { name: '軌道ピン', build: (g, upd) => {   // 原子のような、軌道の輪の髪飾り。小さな粒が輪を回る
    const o = new T.Group(), c = new T.SphereGeometry(0.075, 20, 14); noAttrs(c);
    toonMesh(c, PART.gold, 2, 0.05, 0.016, o);
    const rings = [];
    for (const [rx, ry] of [[1.25, 0.2], [-0.5, 1.1]]) {
      const tg = new T.TorusGeometry(0.2, 0.016, 8, 48); noAttrs(tg);
      const r = new T.Group(); r.rotation.set(rx, ry, 0); o.add(r);
      toonMesh(tg, PART.silver, 2, 0.05, 0.008, r);
      const eg = new T.SphereGeometry(0.038, 14, 10); noAttrs(eg); eg.translate(0.2, 0, 0);
      const e = new T.Group(); r.add(e); toonMesh(eg, PART.cyan, 2, 0.05, 0.01, e); rings.push(e);
    }
    upd.push(t => { rings[0].rotation.z = t * 1.6; rings[1].rotation.z = -t * 1.1 + 2; });
    g.add(placeOn(o, 1.13, 60, 56)); o.translateZ(0.05);
  } },
  flower: { name: '花', build: g => {
    const o = new T.Group();
    for (let k = 0; k < 5; k++) {
      const p = new T.SphereGeometry(1, 16, 10); p.scale(0.1, 0.062, 0.03); p.translate(0.1, 0, 0); p.rotateZ(k * Math.PI * 2 / 5 + 0.3); noAttrs(p);
      toonMesh(p, PART.petal, 2, 0.05, 0.012, o);
    }
    const c = new T.SphereGeometry(0.052, 14, 10); c.translate(0, 0, 0.02); noAttrs(c); toonMesh(c, PART.gold, 2, 0.05, 0.01, o);
    g.add(placeOn(o, 1.12, 60, -56)); o.translateZ(0.03);
  } },
  star: { name: '星', build: g => {
    const sh = new T.Shape();
    for (let i = 0; i < 10; i++) { const a = Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.075 : 0.17; if (i) sh.lineTo(Math.cos(a) * r, Math.sin(a) * r); else sh.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
    const eg = new T.ExtrudeGeometry(sh, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.018, bevelSize: 0.016, bevelSegments: 2 });
    eg.deleteAttribute('uv'); eg.computeVertexNormals(); noAttrs(eg);
    const o = new T.Group(); toonMesh(eg, PART.gold, 2, 0.05, 0.012, o);
    g.add(placeOn(o, 1.12, 60, 56)); o.translateZ(0.03); o.rotateZ(-0.25);
  } },
};
const HATS = {
  none: { name: 'なし', build: () => null },
  knit: { name: 'ニット帽', color: 'teal', build: (g, upd, pal) => {
    const brim = ph => 56 + 10 * (1 - Math.cos(ph * D2R)) / 2;
    const dome = shellGeo(brim, 1.17, 1.17, 120, 22); noAttrs(dome);
    const m = toonMesh(dome, pal, 4, 0.02, 0.022, g); m.material.uniforms.uRib.value = 5.4;
    const pts = []; for (let i = 0; i < 96; i++) { const ph = i / 96 * 360; pts.push(S(1.19, brim(ph) - 1, ph)); }
    const band = new T.TubeGeometry(new T.CatmullRomCurve3(pts, true), 160, 0.1, 12, true); band.deleteAttribute('uv'); noAttrs(band);
    const bm = toonMesh(band, pal, 4, 0.02, 0.02, g); bm.material.uniforms.uRib.value = 9;
    const pom = new T.SphereGeometry(0.25, 28, 20), pp = pom.attributes.position;
    for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), y = pp.getY(i), z = pp.getZ(i), b = 1 + 0.09 * Math.sin(x * 40) * Math.sin(y * 40) * Math.sin(z * 40); pp.setXYZ(i, x * b, y * b, z * b); }
    pom.computeVertexNormals(); pom.translate(0, TOP * 1.17 + 0.2, -0.02); noAttrs(pom);
    toonMesh(pom, PART.cream, 2, 0.0, 0.02, g);
  } },
  beret: { name: 'ベレー帽', color: 'wine', build: (g, upd, pal) => {
    const o = new T.Group(); o.position.set(0.12, TOP * 1.13, -0.06); o.rotation.set(-0.08, 0, -0.2); g.add(o);
    const b = new T.SphereGeometry(1, 48, 24); b.scale(1.1, 0.26, 1.02); noAttrs(b); toonMesh(b, pal, 2, 0.0, 0.022, o);
    const s = new T.CylinderGeometry(0.025, 0.045, 0.12, 10); s.translate(0, 0.3, 0); noAttrs(s); toonMesh(s, pal, 2, 0.0, 0.01, o);
  } },
  cap: { name: '角帽', color: 'navy', build: (g, upd, pal) => {
    const dome = shellGeo(() => 40, 1.16, 1.16, 96, 14); noAttrs(dome); toonMesh(dome, pal, 2, 0.05, 0.02, g);
    const top = TOP * 1.16 * Math.cos(0) + 0.0, o = new T.Group(); o.position.set(0, top + 0.02, 0); o.rotation.y = Math.PI / 4; g.add(o);
    const bd = new T.BoxGeometry(1.55, 0.07, 1.55); noAttrs(bd); toonMesh(bd, pal, 2, 0.05, 0.016, o);
    const bt = new T.CylinderGeometry(0.06, 0.06, 0.04, 14); bt.translate(0, 0.055, 0); noAttrs(bt); toonMesh(bt, PART.mustard, 2, 0.05, 0.01, o);
    const cord = new T.CylinderGeometry(0.014, 0.014, 1.18, 6); cord.rotateZ(Math.PI / 2); cord.translate(0.53, 0.05, 0); noAttrs(cord);
    const cg = new T.Group(); cg.rotation.y = -Math.PI / 4 + Math.PI / 2 * 0; o.add(cg); toonMesh(cord, PART.mustard, 2, 0.05, 0.006, cg);
    const hang = new T.Group(); hang.position.set(1.08, 0.04, 0); cg.add(hang);
    const tl = new T.CylinderGeometry(0.016, 0.016, 0.34, 6); tl.translate(0, -0.17, 0); noAttrs(tl); toonMesh(tl, PART.mustard, 2, 0.05, 0.006, hang);
    const fr = new T.CylinderGeometry(0.03, 0.075, 0.2, 12); fr.translate(0, -0.42, 0); noAttrs(fr); toonMesh(fr, PART.mustard, 2, 0.05, 0.008, hang);
    upd.push(t => { hang.rotation.z = Math.sin(t * 2.1) * 0.12; hang.rotation.x = Math.sin(t * 1.4 + 1) * 0.08; });
  } },
};

/* ---------- 表情 ---------- */
const EXPR = {
  normal:   { eo: [1, 1], hp: [0, 0], flat: 0, wide: 0, brow: 0,     tilt: 0,     mouth: 'smile', blush: 0.35 },
  smile:    { eo: [0, 0], hp: [1, 1], flat: 0, wide: 0, brow: 0.3,   tilt: -0.25, mouth: 'open',  blush: 0.85 },
  surprise: { eo: [1, 1], hp: [0, 0], flat: 0, wide: 1, brow: 0.9,   tilt: -0.1,  mouth: 'o',     blush: 0.2 },
  jito:     { eo: [1, 1], hp: [0, 0], flat: 1, wide: 0, brow: -0.35, tilt: 0.35,  mouth: 'flat',  blush: 0.1 },
};

/* ---------- キャラクターを作る ---------- */
const skinMat = toonMat(SKIN, 0, -0.12);
const skinLine = lineMat(SKIN.line, 0.03);
let bodyG = null;
const EYE_S = 0.8, EYE_C = [0.43, 0.05], BROW_Y = EYE_C[1] + 131 * EYE_S / 512;
let faceGeo = null;
function faceGeos() {
  if (faceGeo) return faceGeo;
  const eyes = [1, -1].map(sg => { const g = decalGeo(EYE_C[0] * sg, EYE_C[1], EYE_S, EYE_S, 34, 0.006); if (sg < 0) mirrorUV(g); return g; });
  const brows = [1, -1].map(sg => { const g = decalGeo(EYE_C[0] * sg, BROW_Y, EYE_S, EYE_S / 2, 24, 0.008); if (sg < 0) mirrorUV(g); return g; });
  const blush = [1, -1].map(sg => decalGeo(0.7 * sg, -0.22, 0.4, 0.2, 14, 0.005));
  const mouth = decalGeo(0, -0.4, 0.5, 0.5, 20, 0.006);
  return (faceGeo = { eyes, brows, blush, mouth });
}
function create(spec0) {
  if (!bodyG) bodyG = noAttrs(bodyGeo());
  const spec = Object.assign({ hair: 'bob', hairColor: 'budou', eye: 'sumire', ornament: 'none', hat: 'none' }, spec0);
  const root = new T.Group(), pivot = new T.Group(), inner = new T.Group();
  root.add(pivot); pivot.add(inner); inner.position.y = BOT;
  const shadow = new T.Mesh(new T.PlaneGeometry(3.2, 2.4), new T.MeshBasicMaterial({ map: blobShadowTex(), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.002; root.add(shadow);
  inner.add(new T.Mesh(bodyG, skinMat)); inner.add(new T.Mesh(bodyG, skinLine));
  // 顔
  const F = faceGeos();
  const eyeCv = [makeCanvas(512, 512), makeCanvas(512, 512)], eyeTx = eyeCv.map(canvasTex);
  const browCv = makeCanvas(512, 256), browTx = canvasTex(browCv);
  const mouthCv = makeCanvas(256, 256), mouthTx = canvasTex(mouthCv);
  const blushCv = makeCanvas(256, 128), blushTx = canvasTex(blushCv); drawBlush(blushCv.getContext('2d'));
  F.eyes.forEach((g, i) => { const m = new T.Mesh(g, decalMat(eyeTx[i])); m.renderOrder = 3; inner.add(m); });
  const browA = decalMat(browTx), browB = decalMat(browTx, { depthTest: false, opacity: 0.5 });
  F.brows.forEach(g => { const a = new T.Mesh(g, browA); a.renderOrder = 4; inner.add(a); const b = new T.Mesh(g, browB); b.renderOrder = 10; inner.add(b); });
  const blushMat = decalMat(blushTx, { opacity: 0.35 });
  F.blush.forEach(g => { const m = new T.Mesh(g, blushMat); m.renderOrder = 2; inner.add(m); });
  const mouth = new T.Mesh(F.mouth, decalMat(mouthTx)); mouth.renderOrder = 3; inner.add(mouth);
  // 髪
  const hp0 = HAIR[spec.hairColor] || HAIR.budou;
  const hairMat = new T.ShaderMaterial({ vertexShader: hairVS, fragmentShader: hairFS, side: T.DoubleSide,
    uniforms: { uBase: { value: new T.Color(hp0.base) }, uShade: { value: new T.Color(hp0.shade) }, uHi: { value: new T.Color(hp0.hi) }, uLine: { value: new T.Color(hp0.line) },
      uLight: U.light, uTh: { value: 0.1 }, uRing: { value: 0.62 }, uTime: U.time, uSway: U.sway } });
  const hairLine = new T.ShaderMaterial({ vertexShader: hairLineVS, fragmentShader: lineFS, side: T.BackSide,
    uniforms: { uColor: { value: new T.Color(hp0.line) }, uThick: { value: 0.024 }, uTime: U.time, uSway: U.sway } });
  let parts = null, partUpd = [];
  function disposeGroup(g) { g.traverse(o => { if (o.geometry && o.geometry !== bodyG) o.geometry.dispose(); if (o.material && o.material !== hairMat && o.material !== hairLine) o.material.dispose(); }); }
  function build() {
    if (parts) { inner.remove(parts); disposeGroup(parts); }
    parts = new T.Group(); partUpd = [];
    const res = makeHair(spec.hair), ahoge = STYLES[spec.hair].ahoge && spec.hat === 'none';
    if (ahoge) { /* アホ毛は帽子がないときだけ */ }
    parts.add(new T.Mesh(res.hair, hairMat)); parts.add(new T.Mesh(res.hair, hairLine));
    if (ahoge) { seed = 3; const b0 = TOP * 1.02, pts = [new V3(0.0, b0, 0.1), new V3(0.05, b0 + 0.22, 0.2), new V3(0.15, b0 + 0.38, 0.22), new V3(0.3, b0 + 0.41, 0.1), new V3(0.36, b0 + 0.33, -0.03)];
      const g = strandGeo(pts, { w: 0.13, th: 0.045, wrap: 0, hi: -1, hint: new V3(0, 0, 1), phase: 1, profile: s => Math.pow(1 - s, 0.7) * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, s * 1.6))) });
      parts.add(new T.Mesh(g, hairMat)); parts.add(new T.Mesh(g, hairLine)); }
    const tiePal = PART[(HATS[spec.hat] && HATS[spec.hat].color) || 'gold'] || PART.gold;
    res.ties.forEach(g => { noAttrs(g); toonMesh(g, spec.hat !== 'none' ? tiePal : PART.petal, 2, 0.05, 0.012, parts); });
    if (ORNAMENTS[spec.ornament]) ORNAMENTS[spec.ornament].build(parts, partUpd);
    const H = HATS[spec.hat]; if (H && H.build) H.build(parts, partUpd, PART[spec.hatColor || H.color] || PART.teal);
    inner.add(parts);
  }
  function applyColors() {
    const p = HAIR[spec.hairColor] || HAIR.budou, u = hairMat.uniforms;
    u.uBase.value.set(p.base); u.uShade.value.set(p.shade); u.uHi.value.set(p.hi); u.uLine.value.set(p.line); hairLine.uniforms.uColor.value.set(p.line);
    dirty = true;
  }
  build();
  // 状態
  const cur = { eo: [1, 1], hp: [0, 0], flat: 0, wide: 0, brow: 0, tilt: 0, blush: 0.35 };
  let dirty = true, lastEye = ['', ''], lastBrow = '', lastMouth = '', blinkAt = 1 + Math.random() * 2, blinkT = -1, talkS = 0, yaw = 0, hop = 0;
  const gaze = { x: 0, y: 0 };
  const q = x => Math.round(x * 60);
  function update(dt, now, st) {
    U.time.value = now;
    const ex = EXPR[st.expr] || EXPR.normal, ek = 1 - Math.exp(-dt * 12);
    for (let i = 0; i < 2; i++) { cur.eo[i] = lerp(cur.eo[i], ex.eo[i], ek); cur.hp[i] = lerp(cur.hp[i], ex.hp[i], ek); }
    for (const k of ['flat', 'wide', 'brow', 'tilt', 'blush']) cur[k] = lerp(cur[k], ex[k], ek);
    blushMat.opacity = cur.blush;
    // まばたき
    let blink = 1;
    if (blinkAt > now + 8) blinkAt = now + 1 + Math.random() * 2;      // 時刻が巻き戻ったとき（頭から再生など）
    if (blinkT >= 0) { blinkT += dt / 0.16; if (blinkT >= 1) { blinkT = -1; blinkAt = now + 2 + Math.random() * 3.5; } else blink = 1 - Math.sin(Math.PI * blinkT); }
    else if (now > blinkAt) blinkT = 0;
    gaze.x = lerp(gaze.x, st.gx || 0, 1 - Math.exp(-dt * 10)); gaze.y = lerp(gaze.y, st.gy || 0, 1 - Math.exp(-dt * 10));
    const pal = EYE[spec.eye] || EYE.sumire, hpp = HAIR[spec.hairColor] || HAIR.budou, lash = spec.hairColor === 'gin' ? '#3E4257' : hpp.line;
    for (let i = 0; i < 2; i++) {
      const s = { open: clamp(cur.eo[i] * blink, 0, 1), happy: cur.hp[i], flat: cur.flat, wide: cur.wide, gx: gaze.x, gy: gaze.y };
      const key = [q(s.open), q(s.happy), q(s.flat), q(s.wide), q(s.gx), q(s.gy)].join();
      if (key !== lastEye[i] || dirty) { drawEye(eyeCv[i].getContext('2d'), s, i === 1, pal, lash); eyeTx[i].needsUpdate = true; lastEye[i] = key; }
    }
    const bk = [q(cur.brow), q(cur.tilt)].join();
    if (bk !== lastBrow || dirty) { drawBrow(browCv.getContext('2d'), cur, hpp.brow); browTx.needsUpdate = true; lastBrow = bk; }
    dirty = false;
    // 口パク
    const tk = clamp(st.talk || 0, 0, 1);
    talkS = tk > talkS ? lerp(talkS, tk, 1 - Math.exp(-dt * 40)) : lerp(talkS, tk, 1 - Math.exp(-dt * 18));
    const lev = Math.round(talkS * 6) / 6, mk = lev + '|' + ex.mouth;
    if (mk !== lastMouth) { drawMouth(mouthCv.getContext('2d'), lev, ex.mouth); mouthTx.needsUpdate = true; lastMouth = mk; }
    // 体：息・話すときの弾み・向き
    const br = reduceMotion ? 0 : Math.sin(now * 1.8 + (st.phase || 0));
    const sq = 1 + 0.012 * br - 0.07 * talkS;
    hop = reduceMotion ? 0 : (st.hop || 0);                       // 跳ねる高さは、呼ぶ側が時刻から決める（書き出しでも同じ動きになるように）
    pivot.scale.set(1 / Math.sqrt(sq), sq, 1 / Math.sqrt(sq));
    pivot.position.y = hop;
    shadow.scale.setScalar(1 - 0.35 * clamp(hop, 0, 1)); shadow.material.opacity = 1 - 0.5 * clamp(hop, 0, 1);
    yaw = lerp(yaw, st.yaw || 0, 1 - Math.exp(-dt * 5));
    pivot.rotation.y = yaw; pivot.rotation.z = (reduceMotion ? 0 : 0.02 * Math.sin(now * 1.1 + (st.phase || 0))) + (st.tilt || 0);
    // 前髪ごしの眉は、顔がこちらを向いているときだけ透かす
    browB.opacity = 0.5 * sstep(0.6, 0.2, Math.abs(yaw));
    for (const f of partUpd) f(now);
  }
  function setSpec(s) {
    const need = ['hair', 'ornament', 'hat', 'hatColor'].some(k => s[k] !== undefined && s[k] !== spec[k]);
    Object.assign(spec, s);
    if (need) build();
    applyColors();
  }
  return { root, spec, update, setSpec };
}
return { create, HAIR, EYE, STYLES, ORNAMENTS, HATS, PART, U, BOT };
})();

/* ===== Kaisetsu 本体：時間割・声・BGM・画面の文字・キャラクター・書き出し・台本チェック ===== */
const Kaisetsu = (() => {
'use strict';
const T = THREE, V3 = T.Vector3;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const lin = (a, b, x) => clamp((x - a) / (b - a), 0, 1);
const VERSION = '1.1.0';

/* ---------- 決まり（レギュレーション）。check() と手引きは、この値を使う ---------- */
const RULE = {
  subChars: 48,      // 字幕（t）の長さ：全角48字まで（半角は0.5字と数える）
  subLines: 2,       // 字幕は2行まで（下の字幕の枠で、実際に折り返して数える）
  speechMax: 9,      // 1セリフの声は9秒まで
  speechMin: 0.6,
  boardHead: 20,     // ボードの見出し：全角20字まで
  boardRows: 3,      // ボードの行：3行まで
  boardRow: 26,      // ボードの1行：全角26字まで
  label: 12,         // ラベルの名前：全角12字まで
};
/* ---------- 画面の割りつけ（幅 W・高さ H に対する割合） ---------- */
const LAY = {
  sub: { w: 0.52, bottom: 0.03, font: 0.0172, lh: 1.42 },      // 字幕：下のまんなか（左右のキャラクターのあいだ）
  board: { x: 0.022, y: 0.032, maxW: 0.46, head: 0.025, row: 0.0158, fill: 0.36 },   // ボード：左上。fill は地の濃さ（後ろの物が透けて見える）
  chars: { unit: 0.118, w: 3.4, h: 3.1, gap: 0.012 },          // キャラクター：B は左下、A は右下。1単位 = 画面の高さの 11.8%。1人の枠は 3.4×3.1 単位
  view: { x: 0, y: 0.13 },                                     // 3Dの絵を、まんなかより上へ寄せる量
  chapter: { right: 0.022, top: 0.032, font: 0.0125 },
  label: { font: 0.0128 },
};
const TIMING = { lead: 2.8, gap: 0.35, sceneGap: 0.9, sceneLead: 0.7, tail: 2.6, fps: 30 };
const FD = '"Zen Maru Gothic","Hiragino Maru Gothic ProN","Hiragino Sans","Yu Gothic",sans-serif';
const FB = '"Zen Kaku Gothic New","Hiragino Sans","Yu Gothic",sans-serif';
const FM = '"JetBrains Mono",ui-monospace,Menlo,monospace';
const BGM = BGM_PRESETS;

/* ---------- 文字 ---------- */
const zen = s => [...String(s || '')].reduce((a, c) => a + (c.charCodeAt(0) < 0x2000 ? 0.5 : 1), 0);
const NOSTART = '、。，．・：；？！ー」』）】〕〉》…‥っゃゅょぁぃぅぇぉッャュョァィゥェォ%）,.!?:;';
const NOEND = '「『（【〔〈《(';
function units(s) {        // 英数字のかたまりは、途中で折り返さない
  const u = []; let buf = '';
  for (const ch of String(s)) { if (/[A-Za-z0-9.,%+\-−×μ\/=≒']/.test(ch)) buf += ch; else { if (buf) { u.push(buf); buf = ''; } u.push(ch); } }
  if (buf) u.push(buf); return u;
}
function wrap(ctx, s, maxW) {
  const lines = []; let cur = '';
  for (const u of units(s)) {
    if (!cur || ctx.measureText(cur + u).width <= maxW) { cur += u; continue; }
    if (NOSTART.includes(u[0])) { cur += u; continue; }                      // 行頭に来てはいけない字は、前の行にぶら下げる
    let carry = ''; if (NOEND.includes(cur[cur.length - 1])) { carry = cur[cur.length - 1]; cur = cur.slice(0, -1); }
    lines.push(cur); cur = carry + u;
  }
  if (cur) lines.push(cur);
  return lines;
}
function rr(ctx, x, y, w, h, r) { r = Math.min(r, h / 2, w / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
const darker = (hex, k) => { const n = parseInt(hex.slice(1), 16), f = c => Math.round(c * k); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; };
const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

/* ---------- 回（エピソード）の登録 ---------- */
const episodes = {};
function episode(ep) { episodes[ep.id] = ep; return ep; }

/* ---------- 3D の道具（回の world(K) に渡す） ---------- */
const grad = (() => { const t = new T.DataTexture(new Uint8Array([70, 150, 255]), 3, 1, T.LuminanceFormat); t.minFilter = t.magFilter = T.NearestFilter; t.needsUpdate = true; return t; })();
let glowTexC = null;
function makeK(scene, camera) {
  const toon = (color, extra) => new T.MeshToonMaterial(Object.assign({ color: new T.Color(color), gradientMap: grad }, extra || {}));
  const outline = (mesh, color, k) => { const o = new T.Mesh(mesh.geometry, new T.MeshBasicMaterial({ color: new T.Color(color || '#0A1028'), side: T.BackSide })); o.scale.setScalar(k || 1.04); mesh.add(o); return o; };
  const glow = (color, s) => {
    if (!glowTexC) { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.6)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); glowTexC = new T.CanvasTexture(c); }
    const m = new T.Sprite(new T.SpriteMaterial({ map: glowTexC, color: new T.Color(color), blending: T.AdditiveBlending, depthWrite: false, transparent: true })); m.scale.setScalar(s); return m;
  };
  const fade = (obj, a) => { obj.visible = a > 0.01; obj.traverse(o => { const m = o.material; if (!m) return; if (m.userData.base === undefined) m.userData.base = m.opacity; m.transparent = true; m.opacity = m.userData.base * a; if (m.uniforms && m.uniforms.a) m.uniforms.a.value = a; }); };
  const rand = s => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  return { THREE: T, scene, camera, toon, outline, glow, fade, rand, clamp, lerp, sstep, gradientMap: grad };
}

/* ======================================================================= */
function mount(opts) {
  const ep = opts.episode, glCanvas = opts.canvas, ovCanvas = opts.overlay, ev = {};
  const emit = (n, d) => (ev[n] || []).forEach(f => f(d));
  const LINES = ep.lines, CAST = {};
  for (const k in ep.cast) CAST[k] = JSON.parse(JSON.stringify(ep.cast[k]));
  const renderer = new T.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true });   // 書き出しで、描いた絵を2Dのキャンバスへ写すため
  renderer.autoClear = false; renderer.setClearColor(ep.background || '#070C22');
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  // 3D：回の場面
  const scene = new T.Scene(), camera = new T.PerspectiveCamera(40, 16 / 9, 0.05, 3000);
  scene.add(new T.AmbientLight(0x7886b8, 0.55)); const sun = new T.DirectionalLight(0xffffff, 1.05); sun.position.set(-4, 3, 6); scene.add(sun);
  const K = makeK(scene, camera); K.sun = sun;
  const W3 = ep.world(K);
  const fadeQuad = new T.Mesh(new T.PlaneGeometry(2, 2), new T.ShaderMaterial({ transparent: true, depthTest: false, depthWrite: false, uniforms: { a: { value: 0 }, c: { value: new T.Color(ep.background || '#070C22') } },
    vertexShader: 'void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }', fragmentShader: 'uniform float a; uniform vec3 c; void main(){ gl_FragColor = vec4(c, a); }' }));
  fadeQuad.frustumCulled = false; fadeQuad.renderOrder = 9999; scene.add(fadeQuad);
  // キャラクター
  const charScene = new T.Scene(), charCam = new T.PerspectiveCamera(22, 1.8, 0.1, 60), CHAR_EYE = [1.72, 1.25];   // カメラの高さと、見る高さ
  const keys = Object.keys(CAST);
  keys.forEach((k, i) => { const c = CAST[k]; c.m = Manju.create(c.look); c.x = keys.length === 1 ? 1.42 : (i === 0 ? 1.42 : -1.42); c.m.root.position.x = c.x; c.phase = i * 1.7; charScene.add(c.m.root); });
  // 1人ずつ、画面の端に枠を取って描く（x > 0 の人は右下、x < 0 の人は左下）。y は上から
  function charBoxes(Wp, Hp) {
    const s = Hp * LAY.chars.unit, w = Math.round(LAY.chars.w * s), h = Math.round(LAY.chars.h * s), out = {};
    keys.forEach(k => { out[k] = { x: CAST[k].x > 0 ? Wp - w : 0, y: Hp - h, w, h }; });
    return out;
  }
  function subBox(Wp, Hp) {      // 字幕の枠：キャラクターの枠のあいだに収める
    const fs = Wp * LAY.sub.font, lh = fs * LAY.sub.lh, pad = fs * 0.62, cw = Math.round(LAY.chars.w * Hp * LAY.chars.unit) + Wp * LAY.chars.gap;
    const sw = Math.min(Wp * LAY.sub.w, Wp - cw * 2), shh = pad * 2 + lh * 2 + fs * 0.25;
    return { fs, lh, pad, sw, shh, sx: (Wp - sw) / 2, sy: Hp * (1 - LAY.sub.bottom) - shh };
  }

  /* ---------- 声 ---------- */
  const speech = LINES.map(() => null);     // {x, buf, env, dur}
  function synth(i) {
    const L = LINES[i], c = CAST[L.w], o = Object.assign({ seed: i + 1 }, c.voice, L.st ? { style: L.st } : {});
    let x; try { x = OtoVoice.speak(L.k, o); } catch (e) { console.warn('OtoVoice', i, e.message); x = new Float32Array(Math.round(16000 * Math.max(1.5, zen(L.t) * 0.13))); x.rate = 16000; }
    const sr = x.rate || 16000, buf = new AudioBuffer({ length: Math.max(1, x.length), numberOfChannels: 1, sampleRate: sr }); buf.copyToChannel(x, 0);
    const n = Math.round(sr / 60), env = new Float32Array(Math.ceil(x.length / n));
    for (let f = 0; f < env.length; f++) { let s = 0; const a = f * n, b = Math.min(x.length, a + n); for (let j = a; j < b; j++) s += x[j] * x[j]; env[f] = Math.sqrt(s / Math.max(1, b - a)); }
    const sorted = Array.from(env).sort((a, b) => a - b), ref = sorted[Math.floor(sorted.length * 0.92)] || 1;
    for (let f = 0; f < env.length; f++) env[f] = clamp((env[f] / ref - 0.12) / 0.75, 0, 1);
    speech[i] = { buf, env, dur: x.length / sr, key: JSON.stringify(o) };
  }
  const synthAll = (only) => new Promise(res => {
    let i = 0;
    const step = () => { const t0 = performance.now(); while (i < LINES.length && performance.now() - t0 < 30) { if (!only || only.includes(LINES[i].w)) synth(i); i++; } emit('progress', { kind: 'voice', done: i, total: LINES.length }); if (i < LINES.length) setTimeout(step, 0); else res(); };
    step();
  });

  /* ---------- 時間割 ---------- */
  let TL = null;       // {start[], dur[], sceneStart[] (行ごと), scenes:[{name, from}], D, segs:[{preset, from, to}]}
  function buildTimeline() {
    const start = [], dur = [], sStarts = []; let t = TIMING.lead;
    const scenes = [{ name: LINES[0].s, from: 0, line: 0 }];
    LINES.forEach((L, i) => {
      if (i > 0) { const ch = L.s !== LINES[i - 1].s; t += dur[i - 1] + (ch ? TIMING.sceneGap : TIMING.gap); if (ch) scenes.push({ name: L.s, from: t - TIMING.sceneLead, line: i }); }
      t += L.p || 0; start.push(t); dur.push(speech[i].dur);
    });
    const D = start[start.length - 1] + dur[dur.length - 1] + TIMING.tail;
    // BGM：同じ曲がつづく場面は、ひとつながり
    const segs = [];
    for (const sc of scenes) { const p = (ep.bgm || {})[sc.name] || null; const last = segs[segs.length - 1];
      if (last && last.preset === p) continue; if (last) last.to = sc.from; segs.push({ preset: p, from: sc.from, to: D - 1.6 }); }
    TL = { start, dur, scenes, D, segs: segs.filter(s => s.preset) };
    emit('timeline', TL);
  }
  const lineAt = t => { let i = -1; for (let j = 0; j < LINES.length; j++) if (TL.start[j] <= t + 1e-6) i = j; else break; return i; };
  const sceneAt = t => { let s = TL.scenes[0]; for (const x of TL.scenes) if (x.from <= t + 1e-6) s = x; else break; return s; };
  function boardAt(t) {     // いまのボードと、出た時刻
    const i = lineAt(t); if (i < 0) return null; const sc = sceneAt(t);
    for (let j = i; j >= 0 && LINES[j].s === LINES[i].s; j--) if (LINES[j].b) return TL.start[j] >= sc.from - 1e-6 || j >= sc.line ? { b: LINES[j].b, t0: TL.start[j], id: j } : null;
    return null;
  }

  /* ---------- 音：再生と書き出しで、同じ組み立てを使う ---------- */
  const bgmBuf = {};          // preset → {buf, L}
  let bgmLoading = null;
  let bgmBusy = false;
  async function renderBgm() {
    bgmBusy = true;
    const need = [...new Set(TL.segs.map(s => s.preset))];
    for (const p of need) {
      if (bgmBuf[p] || !BGM[p] || typeof TextScore === 'undefined') continue;
      emit('progress', { kind: 'bgm', name: BGM[p].label, done: need.indexOf(p), total: need.length });
      const src = BGM[p].score.replace(/\*R/g, '*2'), info = TextScore.parse(src), L = info.length / 2 * 60 / info.tempo;
      try { const buf = await TextScore.render(src, { sampleRate: 48000 }); bgmBuf[p] = { buf, L }; emit('bgm', p); if (P.state === 'playing') TL.segs.filter(s => s.preset === p).forEach(s => schedSeg(P.ac, P.bgmBus, s, curT(), P.t0, P.nodes)); }
      catch (e) { console.warn('BGM', p, e); }
    }
    emit('progress', { kind: 'bgm', done: need.length, total: need.length });
    bgmBusy = false;
  }
  function duckAt(t) { let d = 0; for (let i = 0; i < LINES.length; i++) { const a = TL.start[i], b = a + TL.dur[i]; if (t < a - 0.2) break; d = Math.max(d, Math.min(lin(a - 0.15, a, t), 1 - lin(b, b + 0.45, t))); } return 1 - 0.58 * d; }
  function segEnv(s, t) {
    const fi = s.from <= 0.01 ? sstep(0, 2.2, t) : lin(s.from, s.from + 1.4, t), fo = 1 - lin(s.to, s.to + 1.6, t);
    return fi * fo * duckAt(t) * 0.42 * (BGM[s.preset].gain || 1);
  }
  function schedSeg(ctx, dest, s, fromT, t0, nodes) {
    const B = bgmBuf[s.preset]; if (!B) return;
    const a = Math.max(s.from, fromT), b = s.to + 1.6; if (b <= a + 0.05) return;
    const src = ctx.createBufferSource(), g = ctx.createGain(), L = B.L, u = a - s.from;
    src.buffer = B.buf; src.loop = true; src.loopStart = L; src.loopEnd = Math.min(2 * L, B.buf.duration);
    const off = u < 2 * L ? u : L + ((u - L) % L), n = Math.max(2, Math.ceil((b - a) * 20) + 1), curve = new Float32Array(n);
    for (let k = 0; k < n; k++) curve[k] = segEnv(s, a + (b - a) * k / (n - 1));
    const at = Math.max(t0 + a, ctx.currentTime);
    g.gain.value = curve[0]; g.gain.setValueCurveAtTime(curve, at, b - a);
    src.connect(g); g.connect(dest); src.start(at, off); src.stop(t0 + b + 0.05);
    nodes.push(src);
  }
  function schedule(ctx, voiceDest, bgmDest, fromT, t0, nodes) {
    LINES.forEach((L, i) => {
      const a = TL.start[i], d = TL.dur[i]; if (a + d <= fromT) return;
      const src = ctx.createBufferSource(); src.buffer = speech[i].buf; src.connect(voiceDest);
      src.start(Math.max(t0 + a, ctx.currentTime), Math.max(0, fromT - a)); nodes.push(src);
    });
    for (const s of TL.segs) schedSeg(ctx, bgmDest, s, fromT, t0, nodes);
  }

  /* ---------- 再生 ---------- */
  const P = { state: 'loading', ac: null, voiceBus: null, bgmBus: null, nodes: [], t0: 0, pausedT: 0, vol: { voice: 0.95, bgm: 0.7 }, subs: true, idle0: performance.now() / 1000 };
  const curT = () => P.state === 'playing' ? clamp(P.ac.currentTime - P.t0, 0, TL.D) : P.pausedT;
  function stopNodes() { for (const n of P.nodes) { try { n.stop(); } catch (e) {} try { n.disconnect(); } catch (e) {} } P.nodes = []; }
  function ensureAudio() {
    if (P.ac) return;
    P.ac = new (window.AudioContext || window.webkitAudioContext)();
    P.voiceBus = P.ac.createGain(); P.voiceBus.gain.value = P.vol.voice; P.voiceBus.connect(P.ac.destination);
    P.bgmBus = P.ac.createGain(); P.bgmBus.gain.value = P.vol.bgm; P.bgmBus.connect(P.ac.destination);
  }
  function startAt(t) {
    stopNodes(); P.ac.resume();
    P.t0 = P.ac.currentTime + 0.08 - t; schedule(P.ac, P.voiceBus, P.bgmBus, t, P.t0, P.nodes);
    setState('playing');
  }
  function setState(s) { P.state = s; emit('state', s); }
  const api = {
    get state() { return P.state; }, get time() { return TL ? curT() : 0; }, get duration() { return TL ? TL.D : 0; }, get timeline() { return TL; },
    get cast() { return CAST; }, lines: LINES, episode: ep, rule: RULE,
    on(n, f) { (ev[n] = ev[n] || []).push(f); return api; },
    lineAt: t => TL ? lineAt(t) : -1,
    play() {
      if (!TL || P.state === 'export') return; ensureAudio();
      if (P.state === 'paused') { startAt(P.pausedT); return; }
      startAt(P.state === 'ended' ? 0 : P.pausedT); snap = true;
    },
    pause() { if (P.state !== 'playing') return; P.pausedT = curT(); stopNodes(); setState('paused'); },
    seek(t) {
      if (!TL || P.state === 'export') return; t = clamp(t, 0, TL.D - 0.01); snap = true;
      if (P.state === 'playing') startAt(t); else { P.pausedT = t; if (P.state !== 'paused') setState('paused'); }
    },
    seekLine(i) { if (TL) api.seek(TL.start[clamp(i, 0, LINES.length - 1)] - 0.05); },
    playFrom(t) { if (!TL) return; ensureAudio(); P.pausedT = clamp(t, 0, TL.D - 0.01); snap = true; startAt(P.pausedT); },
    setVolume(v) { Object.assign(P.vol, v); if (P.voiceBus) P.voiceBus.gain.value = P.vol.voice; if (P.bgmBus) P.bgmBus.gain.value = P.vol.bgm; },
    setSubtitles(on) { P.subs = on; },
    async setVoice(k, v) {
      const was = P.state, t = curT(), i = Math.max(0, lineAt(t));
      if (was === 'playing') api.pause();
      Object.assign(CAST[k].voice, v); await synthAll([k]); buildTimeline();
      P.pausedT = i >= 0 ? TL.start[i] - 0.05 : 0; api.report = check(); emit('report', api.report);
      if (was === 'playing') startAt(P.pausedT);
    },
    setLook(k, look) { Object.assign(CAST[k].look, look); CAST[k].m.setSpec(look); },
    check: () => check(),
    exportVideo: o => exportVideo(o),
    bgmReady: () => TL && TL.segs.every(s => bgmBuf[s.preset]),
    ui: () => ({ scale: Wc < 700 ? Math.min(1.8, 700 / Wc) : 1, subs: Wc >= 560 }),     // 画面が狭いときは、ラベルとボードの文字を大きくし、字幕はページの側（ステージの下）に出す
    subtitleAt(t) { if (!TL) return null; const i = lineAt(t); if (i < 0 || t > TL.D - TIMING.tail) return null; const end = i + 1 < LINES.length ? Math.min(TL.start[i + 1] - 0.05, TL.start[i] + TL.dur[i] + 1) : TL.start[i] + TL.dur[i] + 1; return t <= end ? { i, line: LINES[i], who: CAST[LINES[i].w] } : null; },
  };

  /* ---------- 台本チェック ---------- */
  const mctx = document.createElement('canvas').getContext('2d');
  function check() {
    const issues = [], scenes = new Set(W3.scenes || []), ref = 1280, fs = ref * LAY.sub.font, maxW = ref * LAY.sub.w - fs * 1.2;
    mctx.font = `900 ${fs}px ${FD}`;
    let maxC = 0, maxS = 0, maxL = 0;
    LINES.forEach((L, i) => {
      const add = (kind, msg) => issues.push({ i, kind, msg });
      if (!CAST[L.w]) add('who', `話し手「${L.w}」が出演にいません`);
      if (!L.t) add('text', '字幕（t）がありません'); if (!L.k) add('read', '読み（k）がありません');
      if (scenes.size && !scenes.has(L.s)) add('scene', `場面「${L.s}」がありません`);
      const c = zen(L.t), n = wrap(mctx, L.t || '', maxW).length; maxC = Math.max(maxC, c); maxL = Math.max(maxL, n);
      if (c > RULE.subChars) add('chars', `字幕が長い：全角${c}字（${RULE.subChars}字まで）`);
      if (n > RULE.subLines) add('lines', `字幕が${n}行になる（${RULE.subLines}行まで）`);
      if (speech[i]) { const d = speech[i].dur; maxS = Math.max(maxS, d); if (d > RULE.speechMax) add('long', `声が長い：${d.toFixed(1)}秒（${RULE.speechMax}秒まで）`); if (d < RULE.speechMin) add('short', `声が短すぎる：${d.toFixed(1)}秒`); }
      try { const r = OtoVoice.check(L.k || '', Object.assign({}, CAST[L.w] && CAST[L.w].voice)); if (!r.ok) add('read', '読みのまちがい：' + r.errors.map(e => e.msg).join('／')); } catch (e) { add('read', String(e.message || e)); }
      if (L.b) { if (zen(L.b.h) > RULE.boardHead) add('board', `ボードの見出しが長い：全角${zen(L.b.h)}字（${RULE.boardHead}字まで）`);
        if ((L.b.r || []).length > RULE.boardRows) add('board', `ボードの行が多い：${L.b.r.length}行（${RULE.boardRows}行まで）`);
        (L.b.r || []).forEach(r => { if (zen(r) > RULE.boardRow) add('board', `ボードの行が長い：全角${zen(r)}字（${RULE.boardRow}字まで）`); }); }
    });
    return { issues, lines: LINES.length, maxChars: maxC, maxLines: maxL, maxSec: maxS, duration: TL ? TL.D : 0 };
  }

  /* ---------- 画面の文字（2D）：字幕・ボード・ラベル・章・タイトル ---------- */
  const labelA = new Map();
  let boardKey = -1;
  function drawOverlay(ctx, Wp, Hp, t, dt, live, ui) {
    ui = ui || { scale: 1, subs: true }; const us = ui.scale;
    if (!TL) return;
    const reserved = [];
    // キャラクターの範囲（ラベルが入らないように）
    const cb = charBoxes(Wp, Hp); for (const k of keys) { const b = cb[k]; reserved.push({ x: b.x + b.w * 0.06, y: b.y + b.h * 0.1, w: b.w * 0.88, h: b.h }); }
    const D = TL.D, inTitle = t < TIMING.lead, inEnd = t > D - TIMING.tail + 0.3;
    // 章
    const sc = sceneAt(t), chIdx = (ep.chapters || []).findIndex(c => c[1].includes(sc.name));
    if (chIdx >= 0 && !inTitle) {
      const fs = Wp * LAY.chapter.font * us, txt = ep.chapters[chIdx][0], num = `${chIdx + 1}/${ep.chapters.length}`;
      ctx.font = `700 ${fs}px ${FD}`; const tw = ctx.measureText(txt).width; ctx.font = `500 ${fs * 0.9}px ${FM}`; const nw = ctx.measureText(num).width;
      const h = fs * 2, w = tw + nw + fs * 2.4, x = Wp * (1 - LAY.chapter.right) - w, y = Hp * LAY.chapter.top;
      ctx.globalAlpha = lin(TIMING.lead, TIMING.lead + 0.5, t);
      rr(ctx, x, y, w, h, h / 2); ctx.fillStyle = 'rgba(8,12,32,.72)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.textBaseline = 'middle'; ctx.fillStyle = '#FFE27A'; ctx.fillText(num, x + fs * 0.9, y + h / 2);
      ctx.font = `700 ${fs}px ${FD}`; ctx.fillStyle = '#F3F5FF'; ctx.fillText(txt, x + fs * 1.5 + nw, y + h / 2);
      ctx.globalAlpha = 1; reserved.push({ x, y, w, h });
    }
    // ボード
    const bd = inTitle ? null : boardAt(t);
    if (bd) {
      const a = sstep(bd.t0 - 0.05, bd.t0 + 0.3, t), b = bd.b, fh = Wp * LAY.board.head * us, fr = Wp * LAY.board.row * us, pad = fh * 0.62;
      ctx.font = `900 ${fh}px ${FD}`; let hl = wrap(ctx, b.h, Wp * LAY.board.maxW * Math.min(us, 1.35) - pad * 2); let w = Math.max(...hl.map(s => ctx.measureText(s).width));
      ctx.font = `500 ${fr}px ${FB}`; const rows = (b.r || []).map(r => '・' + r); for (const r of rows) w = Math.max(w, ctx.measureText(r).width);
      const ew = fr * 0.8, h = pad * 2 + ew * 1.1 + hl.length * fh * 1.28 + (rows.length ? fr * 0.45 + rows.length * fr * 1.5 : 0), x = Wp * LAY.board.x, y = Hp * LAY.board.y - (1 - a) * fh * 0.4;
      w += pad * 2;
      // 地は薄い紺で、後ろの3Dが透けて見える。文字は縁どりで、明るい物の上でも読める
      ctx.globalAlpha = a; rr(ctx, x, y, w, h, fh * 0.4); ctx.fillStyle = `rgba(8,12,32,${LAY.board.fill})`; ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.26)'; ctx.lineWidth = Math.max(1, fh * 0.05); ctx.stroke();
      rr(ctx, x, y + fh * 0.5, fh * 0.14, h - fh, fh * 0.07); ctx.fillStyle = '#FFE27A'; ctx.fill();
      ctx.textBaseline = 'top'; ctx.lineJoin = 'round'; const ink = 'rgba(6,10,30,.88)';
      ctx.font = `700 ${ew}px ${FM}`; ctx.lineWidth = ew * 0.3; ctx.strokeStyle = ink; ctx.strokeText('POINT', x + pad, y + pad); ctx.fillStyle = '#FFE27A'; ctx.fillText('POINT', x + pad, y + pad);
      let yy = y + pad + ew * 1.1; ctx.font = `900 ${fh}px ${FD}`; ctx.lineWidth = fh * 0.22;
      for (const s of hl) { ctx.strokeText(s, x + pad, yy + fh * 0.1); ctx.fillStyle = '#FFFFFF'; ctx.fillText(s, x + pad, yy + fh * 0.1); yy += fh * 1.28; }
      yy += fr * 0.45; ctx.font = `700 ${fr}px ${FB}`; ctx.lineWidth = fr * 0.26;
      for (const r of rows) { ctx.strokeText(r, x + pad, yy + fr * 0.2); ctx.fillStyle = '#E2E8FF'; ctx.fillText(r, x + pad, yy + fr * 0.2); yy += fr * 1.5; }
      ctx.globalAlpha = 1; reserved.push({ x, y, w, h });
    }
    // 字幕（いつも同じ大きさの枠。2行ぶん）
    const { fs, lh, pad, sw, shh, sx, sy } = subBox(Wp, Hp);
    const i = lineAt(t);
    if (P.subs && ui.subs && i >= 0 && !inEnd) {
      const L = LINES[i], c = CAST[L.w], endT = i + 1 < LINES.length ? Math.min(TL.start[i + 1] - 0.05, TL.start[i] + TL.dur[i] + 1.0) : TL.start[i] + TL.dur[i] + 1.0;
      const a = lin(TL.start[i] - 0.06, TL.start[i] + 0.04, t) * (1 - lin(endT - 0.12, endT, t));
      if (a > 0.01) {
        ctx.globalAlpha = Math.min(1, a * 1.4) * 0.9; rr(ctx, sx, sy, sw, shh, fs * 0.5); ctx.fillStyle = 'rgba(6,10,30,.66)'; ctx.fill();
        ctx.globalAlpha = a;
        // 名前の札は、話している人の側（右の人なら右はし）
        ctx.font = `700 ${fs * 0.74}px ${FD}`; const nh = fs * 1.15, nw = ctx.measureText(c.name).width + fs * 1.1, nx = c.x > 0 ? sx + sw - nw - fs * 0.55 : sx + fs * 0.55, ny = sy - nh * 0.55;
        rr(ctx, nx, ny, nw, nh, nh / 2); ctx.fillStyle = c.color; ctx.fill(); ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.fillText(c.name, nx + fs * 0.55, ny + nh / 2 + fs * 0.02);
        let f = fs; ctx.font = `900 ${f}px ${FD}`; let ls = wrap(ctx, L.t, sw - pad * 2);
        while (ls.length > RULE.subLines && f > fs * 0.66) { f *= 0.94; ctx.font = `900 ${f}px ${FD}`; ls = wrap(ctx, L.t, sw - pad * 2); }
        ctx.textBaseline = 'top'; ctx.lineJoin = 'round'; ctx.lineWidth = f * 0.24; ctx.strokeStyle = darker(c.color, 0.62);
        ls.slice(0, RULE.subLines).forEach((s, k) => { const y = sy + pad + fs * 0.2 + k * lh; ctx.strokeText(s, sx + pad, y); ctx.fillStyle = '#FFFFFF'; ctx.fillText(s, sx + pad, y); });
        ctx.globalAlpha = 1;
      }
    }
    if (ui.subs) reserved.push({ x: sx, y: sy - fs, w: sw, h: shh + fs });
    // ラベル：3Dの物に付ける名前。ボード・字幕・キャラクター・ほかのラベルと重ならない場所を探す
    const want = !inTitle && W3.labels ? (W3.labels(sc.name, t - sc.from, t) || []) : [];
    const lf = Wp * LAY.label.font * us, seen = new Set(), placed = [];
    for (const lb of want) {
      const id = lb.id || lb.t; seen.add(id);
      const p = lb.p.clone().project(camera); if (p.z > 1) continue;
      const ax = (p.x * 0.5 + 0.5) * Wp, ay = (1 - (p.y * 0.5 + 0.5)) * Hp;
      ctx.font = `700 ${lf}px ${FB}`; const tw = ctx.measureText(lb.t).width; ctx.font = `500 ${lf}px ${lb.mono ? FM : FB}`; const sw2 = lb.sub ? ctx.measureText(lb.sub).width + lf * 0.6 : 0;
      const w = tw + sw2 + lf * 2.2, h = lf * 1.9, g = lf * 0.7;
      const cand = [[ax - w / 2, ay - h - g], [ax - w / 2, ay + g], [ax + g * 1.5, ay - h / 2], [ax - w - g * 1.5, ay - h / 2], [ax - w / 2, ay - h - g * 4], [ax - w / 2, ay + g * 4], [ax + g * 2, ay - h - g * 2], [ax - w - g * 2, ay - h - g * 2], [ax - w / 2, ay - h - g * 7]];
      let pick = null;
      for (let k = 0; k < cand.length; k++) { const r = { x: cand[k][0], y: cand[k][1], w, h, k };
        if (r.x < 6 || r.y < 6 || r.x + w > Wp - 6 || r.y + h > Hp - 6) continue;
        if (reserved.some(q => hit(r, q)) || placed.some(q => hit(r, q))) continue; pick = r; break; }
      const prev = labelA.get(id) || { a: 0 }; const target = pick ? 1 : 0;
      prev.a = live ? lerp(prev.a, target, 1 - Math.exp(-dt * 8)) : lerp(prev.a, target, 1 - Math.exp(-dt * 8));
      if (pick) { prev.r = pick; prev.ax = ax; prev.ay = ay; }
      labelA.set(id, prev);
      if (!prev.r || prev.a < 0.02) continue;
      const r = prev.r; placed.push(r);
      ctx.globalAlpha = prev.a;
      if (r.k > 0) {      // 物から離れた所に置いたときは、細い線でつなぐ
        const cx = clamp(prev.ax, r.x + h / 2, r.x + w - h / 2), cy = clamp(prev.ay, r.y, r.y + h);
        ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(1, lf * 0.09); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(prev.ax, prev.ay); ctx.stroke();
        ctx.fillStyle = lb.dot || '#fff'; ctx.beginPath(); ctx.arc(prev.ax, prev.ay, lf * 0.22, 0, Math.PI * 2); ctx.fill();
      }
      rr(ctx, r.x, r.y, w, h, h / 2); ctx.fillStyle = 'rgba(8,12,32,.86)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = lb.dot || '#fff'; ctx.beginPath(); ctx.arc(r.x + lf * 0.85, r.y + h / 2, lf * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.textBaseline = 'middle'; ctx.font = `700 ${lf}px ${FB}`; ctx.fillStyle = '#fff'; ctx.fillText(lb.t, r.x + lf * 1.45, r.y + h / 2 + 1);
      if (lb.sub) { ctx.font = `500 ${lf}px ${lb.mono ? FM : FB}`; ctx.fillStyle = lb.mono ? '#FFE7A0' : '#C6CEEA'; ctx.fillText(lb.sub, r.x + lf * 1.45 + tw + lf * 0.6, r.y + h / 2 + 1); }
      ctx.globalAlpha = 1;
    }
    for (const [id, v] of labelA) if (!seen.has(id)) { v.a = lerp(v.a, 0, 1 - Math.exp(-dt * 10)); if (v.a < 0.02) labelA.delete(id); }
    // はじめと終わりの札
    const tA = 1 - sstep(TIMING.lead - 0.75, TIMING.lead - 0.1, t), eA = sstep(D - TIMING.tail + 0.3, D - TIMING.tail + 1.0, t);
    if (tA > 0.01 || eA > 0.01) {
      const a = Math.max(tA, eA), big = Wp * 0.046;
      ctx.globalAlpha = a * 0.55; ctx.fillStyle = '#070C22'; ctx.fillRect(0, 0, Wp, Hp); ctx.globalAlpha = a;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      const lines = tA > eA ? (ep.titleLines || [ep.title]) : ['おわり'];
      const top = Hp * 0.36 - (lines.length - 1) * big * 0.62;
      ctx.font = `700 ${big * 0.42}px ${FD}`; ctx.lineWidth = big * 0.1; ctx.strokeStyle = '#0C1A4A';
      const eyebrow = tA > eA ? (ep.eyebrow || '3D解説') : ep.title;
      ctx.strokeText(eyebrow, Wp / 2, top - big * 0.95); ctx.fillStyle = '#FFE27A'; ctx.fillText(eyebrow, Wp / 2, top - big * 0.95);
      ctx.font = `900 ${big}px ${FD}`; ctx.lineWidth = big * 0.18;
      lines.forEach((s, k) => { const y = top + k * big * 1.24; ctx.strokeText(s, Wp / 2, y); ctx.fillStyle = '#fff'; ctx.fillText(s, Wp / 2, y); });
      if (tA > eA) { const who = keys.map(k => `${CAST[k].role} ${CAST[k].name}`).join('　'); ctx.font = `700 ${big * 0.36}px ${FD}`; ctx.lineWidth = big * 0.08;
        const y = top + lines.length * big * 1.24 + big * 0.1; ctx.strokeText(who, Wp / 2, y); ctx.fillStyle = '#E7EBFF'; ctx.fillText(who, Wp / 2, y); }
      ctx.textAlign = 'left'; ctx.globalAlpha = 1;
    }
  }

  /* ---------- 1コマ ---------- */
  let curScene = null, camP = new V3(0, 1, 8), camT = new V3(), snap = true, fadeV = 0, fadeDir = 0, cutPending = null;
  function resizeTo(Wp, Hp, pr) {
    renderer.setPixelRatio(pr); renderer.setSize(Wp, Hp, false);
    camera.aspect = Wp / Hp; camera.setViewOffset(Wp, Hp, Wp * LAY.view.x, Hp * LAY.view.y, Wp, Hp); camera.updateProjectionMatrix();
    charCam.aspect = LAY.chars.w / LAY.chars.h; charD = (LAY.chars.h / 2) / Math.tan(charCam.fov * Math.PI / 360); charCam.updateProjectionMatrix();
  }
  let charD = 9;
  function step(t, dt, dtC, Wp, Hp, charNow) {
    // 場面
    const sc = sceneAt(t), st = t - sc.from;
    if (sc.name !== curScene) {
      const prev = curScene; curScene = sc.name; W3.enter && W3.enter(sc.name, prev);
      const [p] = W3.camera(sc.name, 0);
      if (snap || p.distanceTo(camP) > 40) { if (snap) { const [pp, tt] = W3.camera(sc.name, st); camP.copy(pp); camT.copy(tt); fadeV = 0; fadeDir = 0; } else { fadeDir = 1; cutPending = sc.name; } }
    } else if (snap) { const [pp, tt] = W3.camera(sc.name, st); camP.copy(pp); camT.copy(tt); }
    snap = false;
    W3.update(dt, st, t, sc.name);
    const [p, tg] = W3.camera(sc.name, st);
    if (fadeDir === 1) { fadeV = Math.min(1, fadeV + dt / 0.28); if (fadeV >= 1) { camP.copy(p); camT.copy(tg); cutPending = null; fadeDir = -1; } }
    else if (fadeDir === -1) { fadeV = Math.max(0, fadeV - dt / 0.4); if (fadeV <= 0) fadeDir = 0; }
    if (!cutPending) { const k = 1 - Math.exp(-dt * 2.0); camP.lerp(p, k); camT.lerp(tg, k); }
    camera.position.copy(camP); camera.lookAt(camT); fadeQuad.material.uniforms.a.value = fadeV;
    // キャラクター
    const i = lineAt(t), L = i >= 0 ? LINES[i] : null, nextS = i + 1 < LINES.length ? TL.start[i + 1] : 1e9;
    const lw = L && t < nextS - 0.15 && t < TL.D - TIMING.tail ? L.w : null;
    let talk = 0; if (L && P.state !== 'paused') { const lt = t - TL.start[i]; if (lt >= 0 && lt < TL.dur[i]) { const e = speech[i].env; talk = e[Math.min(e.length - 1, Math.floor(lt * 60))] || 0; } }
    const ex = Object.assign({}, ...keys.map(k => ({ [k]: 'normal' })), L ? L.e || {} : {});
    keys.forEach((k, j) => {
      const c = CAST[k], other = c.x > 0 ? -1 : 1, me = lw === k, listening = lw && !me;
      let hop = 0; if (L && L.w === k && ((L.e && L.e[k] === 'surprise') || L.st === 'joy')) { const u = (t - TL.start[i]) / 0.34; if (u >= 0 && u <= 1) hop = 0.9 * u * (1 - u); }
      c.m.update(dtC, charNow, { expr: ex[k] || 'normal', talk: me ? talk : 0, phase: c.phase, hop, yaw: keys.length < 2 ? 0 : other * (listening ? 0.5 : me ? 0.14 : 0.1), gx: listening ? other * 0.55 : 0, gy: 0 });
    });
    // 描く
    renderer.setScissorTest(false); renderer.setViewport(0, 0, Wp, Hp); renderer.clear(); renderer.render(scene, camera);
    const cb = charBoxes(Wp, Hp); renderer.clearDepth(); renderer.setScissorTest(true);
    for (const k of keys) {     // 1人ずつ、自分の枠に。ほかの人は隠しておく
      const c = CAST[k], b = cb[k]; keys.forEach(o => { CAST[o].m.root.visible = o === k; });
      charCam.position.set(c.x, CHAR_EYE[0], charD); charCam.lookAt(c.x, CHAR_EYE[1], 0);
      renderer.setScissor(b.x, 0, b.w, b.h); renderer.setViewport(b.x, 0, b.w, b.h); renderer.render(charScene, charCam);
    }
    keys.forEach(o => { CAST[o].m.root.visible = true; }); renderer.setScissorTest(false);
  }

  /* ---------- 画面での再生 ---------- */
  let Wc = 0, Hc = 0, last = performance.now() / 1000, raf = 0, lastDraw = 0;
  const octx = ovCanvas.getContext('2d');
  function resize() {
    const r = glCanvas.getBoundingClientRect(); Wc = Math.round(r.width); Hc = Math.round(r.height); if (!Wc || !Hc) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2); resizeTo(Wc, Hc, dpr);
    ovCanvas.width = Math.round(Wc * dpr); ovCanvas.height = Math.round(Hc * dpr);
  }
  new ResizeObserver(() => { if (P.state !== 'export') resize(); }).observe(glCanvas); resize();
  function frame() {
    raf = requestAnimationFrame(frame);
    if (P.state === 'export' || !Wc) return;
    const now = performance.now() / 1000;
    if (!TL) return;
    if (bgmBusy && P.state !== 'playing' && now - lastDraw < 0.3) return;     // BGM を作っているあいだ、止まっている画面は描く回数を減らす（作るのが遅くならないように）
    const dt = Math.min(0.05, now - last); last = now; lastDraw = now;
    let t = curT();
    if (P.state === 'playing' && t >= TL.D - 0.001) { P.pausedT = TL.D; stopNodes(); setState('ended'); t = TL.D; }
    const moving = P.state === 'playing';
    step(t, P.state === 'paused' ? 0 : dt, dt, Wc, Hc, moving ? t : now);
    octx.setTransform(dpr, 0, 0, dpr, 0, 0); octx.clearRect(0, 0, Wc, Hc); drawOverlay(octx, Wc, Hc, P.state === 'idle' ? 0 : t, dt, true, api.ui());
    emit('tick', t);
  }

  /* ---------- 動画ファイルへの書き出し ---------- */
  let exporting = null;
  async function pickVideo(fmt, w, h, fps) {
    const tries = fmt === 'mp4' ? [['avc1.640028', 'avc'], ['avc1.4d0028', 'avc'], ['avc1.42001f', 'avc']] : [['vp09.00.10.08', 'V_VP9'], ['vp8', 'V_VP8']];
    for (const [codec, mux] of tries) { try { const c = { codec, width: w, height: h, bitrate: h >= 1000 ? 6e6 : 3e6, framerate: fps }; const r = await VideoEncoder.isConfigSupported(c); if (r && r.supported) return { cfg: r.config, mux }; } catch (e) {} }
    return null;
  }
  async function pickAudio(fmt) {
    const tries = fmt === 'mp4' ? [['mp4a.40.2', 'aac'], ['opus', 'opus']] : [['opus', 'A_OPUS']];
    for (const [codec, mux] of tries) { try { const r = await AudioEncoder.isConfigSupported({ codec, sampleRate: 48000, numberOfChannels: 2, bitrate: 160000 }); if (r && r.supported) return { cfg: r.config, mux }; } catch (e) {} }
    return null;
  }
  async function exportVideo(o) {
    o = Object.assign({ format: 'webm', height: 720, fps: TIMING.fps, onProgress: () => {}, signal: null, from: 0, to: null }, o);
    if (typeof VideoEncoder === 'undefined' || typeof AudioEncoder === 'undefined') throw new Error('このブラウザでは動画を作れません（WebCodecs が使えないため）。Chrome か Edge で開いてください。');
    const H = o.height, W = Math.round(H * 16 / 9 / 2) * 2, fps = o.fps;
    const vk = await pickVideo(o.format, W, H, fps), ak = await pickAudio(o.format);
    if (!vk || !ak) throw new Error(`このブラウザでは、この形式（.${o.format}）を作れません。もう一方の形式を選んでください。`);
    const Mux = o.format === 'mp4' ? window.Mp4Muxer : window.WebMMuxer; if (!Mux) throw new Error('動画をまとめる部品（muxer）を読み込めませんでした。');
    const was = P.state; if (was === 'playing') api.pause();
    exporting = { cancel: false };
    if (!api.bgmReady()) { o.onProgress({ phase: 'bgm', p: 0 }); await bgmLoading; }
    if (exporting.cancel || (o.signal && o.signal.aborted)) { exporting = null; throw Object.assign(new Error('書き出しを止めました'), { code: 'cancel' }); }
    try { await document.fonts.ready; } catch (e) {}
    const t0 = clamp(o.from, 0, TL.D), t1 = clamp(o.to == null ? TL.D : o.to, t0 + 0.5, TL.D), dur = t1 - t0, sr = 48000;
    setState('export');
    let err = null;
    try {
      // 音：全体を一度に組み立てて書き出す
      o.onProgress({ phase: 'audio', p: 0 });
      const off = new OfflineAudioContext(2, Math.ceil(dur * sr), sr), vb = off.createGain(), bb = off.createGain();
      vb.gain.value = P.vol.voice; bb.gain.value = P.vol.bgm; vb.connect(off.destination); bb.connect(off.destination);
      schedule(off, vb, bb, t0, -t0, []);
      const abuf = await off.startRendering();
      const isMp4 = o.format === 'mp4', target = new Mux.ArrayBufferTarget();
      const mux = new Mux.Muxer(isMp4 ? { target, video: { codec: vk.mux, width: W, height: H, frameRate: fps }, audio: { codec: ak.mux, numberOfChannels: 2, sampleRate: sr }, fastStart: 'in-memory', firstTimestampBehavior: 'offset' }
                                      : { target, video: { codec: vk.mux, width: W, height: H, frameRate: fps }, audio: { codec: ak.mux, numberOfChannels: 2, sampleRate: sr }, firstTimestampBehavior: 'offset' });
      const venc = new VideoEncoder({ output: (c, m) => { try { mux.addVideoChunk(c, m); } catch (e) { err = err || e; } }, error: e => { err = err || e; } });
      venc.configure(Object.assign({}, vk.cfg, { width: W, height: H, framerate: fps, latencyMode: 'quality' }));
      const aenc = new AudioEncoder({ output: (c, m) => { try { mux.addAudioChunk(c, m); } catch (e) { err = err || e; } }, error: e => { err = err || e; } });
      aenc.configure(Object.assign({}, ak.cfg, { sampleRate: sr, numberOfChannels: 2 }));
      const L = abuf.getChannelData(0), R = abuf.getChannelData(1), F = 4800;
      for (let i = 0; i < abuf.length && !err; i += F) {
        const m = Math.min(F, abuf.length - i), d = new Float32Array(2 * m); for (let x = 0; x < m; x++) { d[x] = clamp(L[i + x], -1, 1); d[m + x] = clamp(R[i + x], -1, 1); }
        const a = new AudioData({ format: 'f32-planar', sampleRate: sr, numberOfFrames: m, numberOfChannels: 2, timestamp: Math.round(i * 1e6 / sr), data: d }); aenc.encode(a); a.close();
        if (aenc.encodeQueueSize > 20) while (aenc.encodeQueueSize > 6 && !err) await new Promise(r => setTimeout(r, 2));
      }
      // 絵：1コマずつ描く
      resizeTo(W, H, 1);
      const comp = document.createElement('canvas'); comp.width = W; comp.height = H; const cctx = comp.getContext('2d');
      const N = Math.ceil(dur * fps), dt = 1 / fps; snap = true; curScene = null; labelA.clear();
      const tStart = performance.now();
      for (let f = 0; f < N && !err; f++) {
        if (exporting.cancel || (o.signal && o.signal.aborted)) throw Object.assign(new Error('書き出しを止めました'), { code: 'cancel' });
        const t = t0 + f * dt;
        step(t, dt, dt, W, H, t);
        cctx.drawImage(glCanvas, 0, 0, W, H); drawOverlay(cctx, W, H, t, dt, false);
        const vf = new VideoFrame(comp, { timestamp: Math.round(f * 1e6 / fps), duration: Math.round(1e6 / fps) });
        venc.encode(vf, { keyFrame: f % (fps * 2) === 0 }); vf.close();
        if (venc.encodeQueueSize > 4) while (venc.encodeQueueSize > 2 && !err) await new Promise(r => setTimeout(r, 1));
        if (f % 10 === 0) { const el = (performance.now() - tStart) / 1000, rest = el / (f + 1) * (N - f - 1); o.onProgress({ phase: 'video', p: (f + 1) / N, rest, frame: f + 1, frames: N }); await new Promise(r => setTimeout(r, 0)); }
      }
      await venc.flush(); await aenc.flush(); venc.close(); aenc.close();
      if (err) throw err;
      mux.finalize();
      const buf = target.buffer, name = `${ep.fileName || ep.id}.${o.format}`;
      return { data: buf, name, bytes: buf.byteLength, seconds: dur, width: W, height: H, codec: vk.cfg.codec, audio: ak.cfg.codec };
    } finally {
      exporting = null; P.pausedT = t0; P.state = 'paused'; emit('state', 'paused'); resize(); snap = true;
      if (err) throw err;
    }
  }
  api.cancelExport = () => { if (exporting) exporting.cancel = true; };

  /* ---------- 準備 ---------- */
  api.ready = (async () => {
    await synthAll(); buildTimeline();
    api.report = check(); emit('report', api.report);
    P.pausedT = 0; setState('idle');
    bgmLoading = renderBgm();
    return api;
  })();
  raf = requestAnimationFrame(frame);
  return api;
}

return { VERSION, RULE, LAY, TIMING, BGM, Manju, episode, episodes, mount, zen };
})();

window.Kaisetsu = Kaisetsu;
})();
