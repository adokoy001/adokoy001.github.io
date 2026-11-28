/* ===== 回：「井戸底ソフト 3in1」を、3本ぜんぶ遊ぶ配信（雑談つき） =====
   ゲームは games/idozoko.html。ゲーム機のように、起動ロゴ → メニュー → ゲームの順に進む。
   ゲームは window.__idz に窓口を出している：auto（ゲームの中の自動の遊び手）、slow（しゃべっているときの手の遅れ 0〜1）、
   goto / quit / retry / menu / tap（コントローラーのボタンを押す。押したボタンは、画面のドットのコントローラーでへこむ）、info()（いまの様子）、events（出来事）、sfx（効果音）。
   進行：あいさつ → 雑談（自己紹介つき）→ 1本目 → 雑談（振り返りつき）→ 2本目 → 雑談 → 3本目 → 締めの雑談 → おわり。
   雑談は土台の仕組み（J.zatsu）で流す。出演者ごとの話・世間話・投げ銭とお礼は zatsudan.js（共通）。この回だけの話（ゲーム集の話・振り返り）は、ここに書く。
   この回は進行を自分で決めるので、zatsu.auto は false。合間の雑談のときに、J.zatsu に掛け合いを積む。
   名前はすべて作りもの。お金のやりとりは演出で、本物ではない */
const IDZKANA = (() => {
  const num = n => Jikkyo.kanaNum(n), en = n => Jikkyo.enNum(n);
  const ki = n => ['ぜろき', 'いっき', 'にき', 'さんき', 'よんき', 'ごき'][n] || num(n) + 'き';
  // 差しこむ値：['字幕', '読み', '英語の字幕', '英語の読み']
  return { num, ki, m: n => [n + 'メートル', num(n) + 'めーとる', n + ' m', '[ ' + en(n) + " 'mit@rz ]"] };
})();

/* ---------- この回だけの話（共通の雑談は zatsudan.js） ---------- */
const IDZ_TALK = {
  // ゲームが終わったあとの振り返り（合間の雑談のはじめ）
  reflect: {
    well: [
      [['c', '井戸、どこまで行けた？'], ['s', { t: '{name}さん、{m}まで行けたよ。下に行くほど、どきどきした。', k: '{name}さん、{m}まで いけたよ。したに いくほど、どきどき した。', m: 'proud', g: 'nod' }]],
      [['c', 'コウモリしつこかったね'], ['s', { t: '{name}さん、ほんと！後ろからずっとついてくるんだもん。', k: '{name}さん、ほんと！ うしろから ずっと ついて くるんだもん。', m: 'sad', g: 'sigh' }],
        ['c2', '踏めば倒せるよ'], ['s', { t: '{name2}さん、知ってる〜。でも、上から来られると無理なの。', k: '{name2}さん、しってる〜。でも、うえから こられると むりなの。', m: 'smile', g: 'hesitate' }]],
    ],
    knight: [
      [['c', 'ステージいくつまで行った？'], ['s', { t: '{name}さん、ステージ{n}まで！ゴールの旗、気持ちよかった〜。', k: '{name}さん、すてーじ {n}まで！ ごーるの はた、きもち よかった〜。', m: 'proud', g: 'cheer' }]],
      [['c', '火の粉かっこよかった'], ['s', { t: '{name}さん、でしょ？騎士なのに剣じゃないところが、いいよね。', k: '{name}さん、でしょ？ きしなのに けんじゃ ない ところが、いいよね。', m: 'smile', g: 'nod' }]],
    ],
    lancer: [
      [['c', 'ボス倒せた？'], ['s', { if: 'boss', yes: { t: '{name}さん、倒せた！最後のほう、手がぷるぷるしてた。', k: '{name}さん、たおせた！ さいごの ほう、てが ぷるぷる してた。', m: 'proud', g: 'cheer' },
        no: { t: '{name}さん、倒せなかった〜。弾が多すぎるんだもん。次こそ。', k: '{name}さん、たおせなかった〜。たまが おおすぎるんだもん。つぎこそ。', m: 'sad', g: 'sigh' } }]],
      [['c', 'シューティングどうだった？'], ['s', { t: '{name}さん、弾がいっぱいで目が回った〜。でも楽しかった。', k: '{name}さん、たまが いっぱいで めが まわった〜。でも たのしかった。', m: 'smile', g: 'settle' }]],
    ],
    end: [
      [['c', 'どれが一番好きだった？'], ['s', { t: '{name}さん、うーん…ぜんぶ！でも、どきどきしたのは井戸かな。', k: '{name}さん、うーん… ぜんぶ！ でも、どきどき したのわ いどかな。', m: 'smile', g: 'think' }],
        ['c2', '騎士派です'], ['c3', 'シューティング派'], ['s', { t: 'みんなばらばら！3本入りで、ちょうどよかったね。', k: 'みんな ばらばら！ さんぼん いりで、ちょうど よかったね。', m: 'smile', g: 'cheer' }]],
    ],
  },
};

Jikkyo.play({
  id: 'idozoko',
  title: '【井戸底ソフト 3in1】ドット絵のミニゲーム3本を、雑談しながらゆっくり遊ぶ',
  short: '井戸底ソフト 3in1',
  blurb: 'ドット絵のゲーム3本を、雑談しながら順番に',
  minutes: 15,
  tags: ['自作ゲーム', 'ドット絵', '雑談多め'],
  game: 'games/idozoko.html',
  character: 'mio',
  endDelay: 2,
  IDS: ['well', 'knight', 'lancer'],
  BUDGET: { well: 170, knight: 190, lancer: 190 },
  SEG: { open: 46, mid: 80, end: 86 },
  // 雑談：この回だけの掛け合い（ゲーム集の話）と投げ銭。共通の話は zatsudan.js。進行はこの回が決める（auto: false）
  zatsu: {
    auto: false,
    bits: [
      { on: 'mid', bit: [['c', '初めて遊んだゲーム覚えてる？'], ['s', { t: '{name}さん、覚えてる。ボタンが二つしかないのに、ずっと遊べたんだよね。', k: '{name}さん、おぼえてる。ぼたんが ふたつしか ないのに、ずっと あそべたんだよね。', m: 'focus', g: 'think' }],
        ['c2', '今日のゲームもボタン2つだね'], ['s', { t: '{name2}さん、ほんとだ！AとB、それで十分なんだね。', k: '{name2}さん、ほんとだ！ えーと びー、それで じゅうぶんなんだね。', m: 'surprise', g: 'nod' }]] },
      { on: 'mid', bit: [['c', 'ドット絵描いてみたくなった'], ['s', { t: '{name}さん、描いてみて！小さいマス目から始めると楽しいよ。', k: '{name}さん、かいて みて！ ちいさい ますめから はじめると たのしいよ。', m: 'smile', g: 'cheer' }],
        ['c2', '8×8から始めよう'], ['s', { t: '{name2}さん、それいい！今日の主人公たちも、8×8なんだよ。', k: '{name2}さん、それ いい！ きょうの しゅじんこうたちも、はち かける はちなんだよ。', m: 'proud', g: 'nod' }]] },
      { on: 'open mid', bit: [['c', '井戸底ソフトってなに？'], ['s', { t: '{name}さん、このゲームを作ったところの名前なんだって。最初のゲームが井戸だからかな？', k: '{name}さん、この げーむを つくった ところの なまえなんだって。さいしょの げーむが いどだからかな？', m: 'focus', g: 'think' }]] },
      { on: 'mid play', bit: [['need', 'well'], ['c', 'ゲーム下手でも楽しめるかな'], ['s', { t: '{name}さん、もちろん！わたしも、さっき何回もやられてたし。', k: '{name}さん、もちろん！ わたしも、さっき なんかいも やられてたし。', m: 'smile', g: 'cheer' }]] },
      { on: 'end', bit: [['c', 'リクエストいい？'], ['s', { t: '{name}さん、どうぞ！', k: '{name}さん、どうぞ！', m: 'smile', g: 'nod' }],
        ['c', 'またこのゲーム集やってほしい'], ['s', { t: '{name}さん、うん、また遊ぼう。新しいのが増えてたら、もっと楽しいね。', k: '{name}さん、うん、また あそぼう。あたらしいのが ふえてたら、もっと たのしいね。', m: 'smile', g: 'cheer' }]] },
      { on: 'mid end', bit: [['c', 'ゲーム集、他に入れてほしいのある？'], ['c2', 'パズル！'], ['c3', 'レースゲーム'],
        ['s', { t: 'パズルにレース、いいね！…作る人は大変そうだけど。', k: 'ぱずるに れーす、いいね！ …つくる ひとわ たいへんそうだけど。', m: 'smile', g: 'think' }]] },
      { on: 'play', bit: [['c', '効果音いいね'], ['s', { t: '{name}さん、ピコピコ音、クセになるよね。', k: '{name}さん、ぴこぴこおん、くせに なるよね。', m: 'smile', g: 'nod' }]] },
      { on: 'play', bit: [['c', '何時までやるの？'], ['s', { t: '{name}さん、3本ぜんぶ遊んだら、おしまい。もうちょっと付き合ってね。', k: '{name}さん、さんぼん ぜんぶ あそんだら、おしまい。もう ちょっと つきあってね。', m: 'smile', g: 'nod' }]] },
    ],
    sc: [
      { a: 300, w: 3, need: 'well', text: 'さっきのやられ方おもしろかったw', r: { t: 'もう、笑わないで〜。でも、ありがとう！', k: 'もう、わらわないで〜。でも、ありがとう！', m: 'sad', g: 'hesitate' } },
      { a: 1500, w: 1.2, need: 'well', text: 'BGMもほしいって作った人に伝えて', r: { t: '伝えておくね。…届くかな？', k: 'つたえて おくね。 …とどくかな？', m: 'smile', g: 'look' } },
    ],
  },

  // ゲームの絵は 228×128 のドット。ふつうに写すとにじむので、写すのはここで、点のまま拡大する（投げ銭の知らせは、土台が重ねる）
  canvases: () => [],
  overlay(ctx, x, y, w, h, s) {
    const c = this._cv; if (!c || !c.width) return;
    ctx.save(); ctx.imageSmoothingEnabled = false; ctx.drawImage(c, x, y, w, h); ctx.restore();
    if (!this._scan || this._scanS !== s) {
      const p = document.createElement('canvas'); p.width = 4; p.height = Math.max(2, Math.round(3 * s));
      const q = p.getContext('2d'); q.fillStyle = 'rgba(0,0,0,.14)'; q.fillRect(0, 0, 4, Math.max(1, Math.round(s)));
      this._scan = ctx.createPattern(p, 'repeat'); this._scanS = s;
    }
    ctx.save(); ctx.translate(x, y); ctx.fillStyle = this._scan; ctx.fillRect(0, 0, w, h); ctx.restore();
  },
  setup(g) { this._cv = g.doc.getElementById('screen'); },
  _info(g) { const I = g.win.__idz; return I ? I.info() : {}; },
  start(g) {
    const I = g.win.__idz; if (I) { I.auto = false; I.slow = 0.2; I.events.length = 0; }
    this._F = { ph: 'boot', gi: 0, at: 0, gStart: 0, tries: 0, done: false, bye: false, res: { well: { depth: 0 }, knight: { stage: 1 }, lancer: { score: 0, boss: 0 } }, played: new Set() };
    this._Z = { lastSpoke: 0, nextPlay: 1e9 };
    this._g = g;
  },

  /* ---------- 雑談（土台の J.zatsu に積む） ---------- */
  _startChat(J, t, seg, prev) {
    const F = this._F;
    F.ph = 'chat'; F.seg = seg; F.prev = prev; F.at = t; F.segEnd = t + this.SEG[seg]; F.first = true;
    F.scAt = t + (seg === 'open' ? (Math.random() < 0.4 ? 26 : 1e9) : 14 + Math.random() * (this.SEG[seg] - 40));
    F.sc2 = seg === 'end' && Math.random() < 0.6;
    J.phase(seg === 'end' ? 'outro' : 'menu'); J.mood('smile');
  },
  _resVars() { const r = this._F.res; return { m: IDZKANA.m(r.well.depth), n: [String(r.knight.stage), IDZKANA.num(r.knight.stage)], boss: r.lancer.boss > 0 }; },
  // 合間の雑談：はじめは自己紹介か振り返り、ときどき投げ銭、あとは場面に合う掛け合い
  _chatBit(J, t) {
    const F = this._F, Zt = J.zatsu;
    if (F.first) {
      F.first = false;
      if (F.seg === 'open') { if (Zt.intro()) return; }
      else { const pool = F.seg === 'end' ? IDZ_TALK.reflect.lancer : IDZ_TALK.reflect[F.prev]; if (Zt.queue(Zt.fresh(pool), this._resVars())) return; }
    }
    if (t >= F.scAt) { F.scAt = F.sc2 ? t + 25 : 1e9; F.sc2 = false; if (Zt.tip()) return; }
    if (F.seg === 'end' && !F.endAsked && t - F.at > 30) { F.endAsked = true; if (Zt.queue(Zt.fresh(IDZ_TALK.reflect.end))) return; }
    Zt.queue(Zt.pick(F.seg), this._resVars());
  },
  // 遊んでいる最中：ときどき投げ銭、あとは短めの掛け合い
  _playBit(J) {
    if (Math.random() < 0.35 && J.zatsu.tip()) return;
    J.zatsu.queue(J.zatsu.pick('play'));
  },
  // 雑談のあいだは、土台の「間つなぎ・掛け合い・返事」を止める（順番待ちの掛け合いとぶつからないように）
  busy() { const F = this._F; return !!(F && (F.ph === 'chat' || F.ph === 'outro')); },
  // 回が自分で読むセリフ（台本チェックと、声の先読みに使う）
  allLines() {
    const out = [], add = (w, L) => { if (!L) return; if (L.if) { out.push([w + '(はい)', L.yes]); out.push([w + '(いいえ)', L.no]); } else out.push([w, L]); };
    for (const [g, list] of Object.entries(IDZ_TALK.reflect)) list.forEach((b, i) => b.forEach(s => s[0] === 's' && add(`振り返り(${g})#${i + 1}`, s[1])));
    return out;
  },

  /* ---------- 進行と、出来事の見張り ---------- */
  step(g, dt, t, J) {
    const I = g.win.__idz, F = this._F, Z = this._Z; if (!I || !F) return;
    for (const e of I.events.splice(0)) this._onEv(e, J);
    if (J.speaking()) Z.lastSpoke = t;
    // しゃべっているあいだは、手が遅れる（視聴者に向いて話しているときは、もっと）
    I.slow = J.talking() ? 1 : J.speaking() ? 0.5 : 0.15;
    const info = I.info(), id = this.IDS[F.gi], over = info.st === 'dead' || info.st === 'over';
    if (info.cstate === 'game' && info.id) {
      const r = F.res[info.id];
      if (info.id === 'well') r.depth = Math.max(r.depth, info.depth || 0);
      if (info.id === 'knight') r.stage = Math.max(r.stage, info.stage || 1);
      if (info.id === 'lancer') r.score = Math.max(r.score, info.score || 0);
    }
    const quiet = !J.zatsu.pending() && !J.speaking() && t - Z.lastSpoke > 1.4;
    switch (F.ph) {
      case 'boot':
        if (info.cstate === 'menu' && t > 22) this._startChat(J, t, 'open', null);
        break;
      case 'chat':
        if (quiet) {
          if (t > F.segEnd) {
            if (F.seg === 'end') { F.ph = 'outro'; F.at = t; }
            else { F.ph = 'pick'; F.at = t; J.phase('menu'); J.emit('pick_' + this.IDS[F.gi]); }
          } else this._chatBit(J, t);
        }
        break;
      case 'pick':
        if (t - F.at > 5 && !I.busy()) { I.goto(F.gi); F.ph = 'launching'; F.at = t; }
        break;
      case 'launching':
        if (!I.busy() && info.cstate === 'game' && info.id === id) {
          F.ph = 'play'; F.gStart = t; F.tries = 1; F.played.add(id); J.zatsu.flag(id); I.auto = true; J.phase(id); J.emit('start_' + id);
          Z.nextPlay = t + 24 + Math.random() * 14;
        } else if (t - F.at > 9 && !I.busy()) I.launchNow(F.gi);
        break;
      case 'play':
        if (over) { I.auto = false; F.ph = 'over'; F.at = t; break; }
        if (t - F.gStart > this.BUDGET[id] && info.canPause) { F.ph = 'timeup'; F.at = t; J.emit('timeup'); break; }
        // 遊んでいるあいだも、ときどき書き込みに答える。投げ銭も
        if (quiet && t > Z.nextPlay && info.st === 'play' && t - F.gStart < this.BUDGET[id] - 12) {
          this._playBit(J); Z.nextPlay = t + 40 + Math.random() * 26;
        }
        J.mood(J.speaking() ? 'neutral' : 'focus');
        break;
      case 'timeup':
        if (over) { I.auto = false; F.ph = 'over'; F.at = t; F.gStart = -1e9; break; }
        if (t - F.at > 5 && info.canPause && !I.busy()) { I.auto = false; I.quit(); F.ph = 'quitting'; F.at = t; }
        break;
      case 'over':
        if (t - F.at > 6.5 && !I.busy()) {
          const left = this.BUDGET[id] - (t - F.gStart);
          if (left > 55 && F.tries < 4) { J.emit('retry'); I.retry(); F.tries++; F.ph = 'reloading'; F.at = t; }
          else { J.emit('to_menu'); I.menu(); F.ph = 'quitting'; F.at = t; }
        }
        break;
      case 'reloading':
        if (!I.busy() && info.cstate === 'game' && !over) { I.auto = true; F.ph = 'play'; }
        else if (t - F.at > 5 && !I.busy()) { I.retry(); F.at = t; }
        break;
      case 'quitting':
        if (!I.busy() && info.cstate === 'menu') { F.ph = 'next'; F.at = t; J.mood('smile'); }
        else if (t - F.at > 6 && !I.busy()) I.forceMenu();
        break;
      case 'next':
        if (t - F.at > 2 && quiet) {
          const prev = this.IDS[F.gi]; F.gi++;
          if (F.gi < this.IDS.length) this._startChat(J, t, 'mid', prev);
          else { J.emit('outro'); this._startChat(J, t, 'end', prev); }
        }
        break;
      case 'outro':
        if (quiet && !F.wrap) { F.wrap = t; J.emit('wrap'); }
        else if (quiet && F.wrap && t - F.wrap > 1 && !F.bye) { F.bye = true; F.byeAt = t; J.emit('bye'); }
        if (F.bye && t - F.byeAt > 8 && !J.speaking()) F.done = true;
        break;
    }
  },
  // ゲームの出来事 → 配信の出来事（セリフと書き込み）
  _onEv(e, J) {
    const d = e.data || {}, K = IDZKANA;
    switch (e.name) {
      case 'w_combo': J.emit('w_combo', { vars: { n: [String(d.n), K.num(d.n)] } }); break;
      case 'w_mile': J.emit(d.healed ? 'w_mile' : 'w_mile2', { vars: { m: K.m(d.m) } }); break;
      case 'w_die': J.emit('w_die', { vars: { m: K.m(d.depth) } }); if (d.best) J.later(4.5, () => J.emit('best')); break;
      case 'k_stage': if (d.stage > 1) J.emit('k_stage', { vars: { n: [String(d.stage), K.num(d.stage)] } }); break;
      case 'k_over': J.emit('k_over', { vars: { n: [String(d.stage), K.num(d.stage)] } }); if (d.best) J.later(4.5, () => J.emit('best')); break;
      case 'l_hit': if (d.lives > 0) J.emit('l_hit', { vars: { n: [d.lives + '機', K.ki(d.lives)] } }); else J.emit('l_last'); break;
      case 'l_over': J.emit('l_over', { vars: { s: [String(d.score), K.num(d.score)] } }); if (d.best) J.later(4.5, () => J.emit('best')); break;
      case 'l_bossdown': this._F.res.lancer.boss++; J.emit('l_bossdown'); break;
      default: J.emit(e.name);
    }
  },
  end() { return !!(this._F && this._F.done); },

  /* ---------- セリフ（字幕 t と、OtoVoice の読み k） ---------- */
  script: [[1.2, 'hello'], [8.5, 'about'], [16.5, 'menu_look']],
  lines: {
    hello: { p: 3, say: [{ t: 'こんばんは〜！今日はのんびり、レトロゲームの日です。', k: 'こんばんわ〜！ きょうわ のんびり、れとろ げーむの ひです。', m: 'smile', g: 'nod', cam: true }] },
    about: { p: 2, say: [{ t: '遊ぶのは自作のゲーム集「井戸底ソフト 3in1」。3本入りだよ。', k: 'あそぶのわ じさくの げーむしゅう、いどぞこ そふと すりー いん わん。さんぼん いりだよ。', m: 'smile', cam: true }] },
    menu_look: { p: 2, say: [{ t: 'ロゴが出て…メニュー！昔のゲーム集のカセットみたい。', k: 'ろごが でて… めにゅー！ むかしの げーむしゅうの かせっとみたい。', m: 'smile', g: 'look' }] },

    pick_well: { p: 2, say: [{ t: '1本目は「WELL DIVE」。井戸の底へ、どんどん落ちていくゲーム。', k: 'いっぽんめわ、うえる だいぶ。いどの そこえ、どんどん おちて いく げーむ。', m: 'smile', g: 'declare', cam: true }] },
    start_well: { p: 2, say: [{ t: 'Aでジャンプ、Bで足元に撃つ。空中でAを押しても撃てるよ。', k: 'えーで じゃんぷ、びーで あしもとに うつ。くうちゅうで えーを おしても うてるよ。', m: 'focus', g: 'think' }] },
    w_kill: { p: 1, cd: 9, ch: .6, say: [
      { t: '踏んだ！', k: 'ふんだ！', m: 'smile', g: 'approve' },
      { t: 'えいっ、当たった。', k: 'えいっ、あたった。', m: 'focus' },
      { t: 'じゃまだよ〜。', k: 'じゃまだよ〜。', m: 'proud' },
      { t: '下にいたのは、撃っちゃう。', k: 'したに いたのわ、うっちゃう。', m: 'focus' }] },
    w_combo: { p: 2, cd: 10, say: [{ t: '空中で{n}連続！ジェムがもらえた！', k: 'くうちゅうで {n}れんぞく！ じぇむが もらえた！', m: 'proud', g: 'cheer' }] },
    w_hurt: { p: 2, cd: 6, say: [
      { t: 'いたっ！', k: 'いたっ！', m: 'sad', g: 'recoil' },
      { t: 'ぶつかった〜…ハートが減っちゃう。', k: 'ぶつかった〜… はーとが へっちゃう。', m: 'sad', g: 'sigh' },
      { t: 'うわっ、横から来た！', k: 'うわっ、よこから きた！', m: 'surprise', g: 'recoil' }] },
    w_mile: { p: 3, cd: 4, say: [{ t: '{m}到達！ハートもひとつ戻ったよ。', k: '{m} とうたつ！ はーとも ひとつ もどったよ。', m: 'smile', g: 'cheer', st: 'joy' }] },
    w_mile2: { p: 2, cd: 4, say: [{ t: '{m}到達！どんどん深くなる。', k: '{m} とうたつ！ どんどん ふかく なる。', m: 'smile', g: 'nod' }] },
    w_record: { p: 3, say: [{ t: '前の記録、越えた！ここから先は初めて。', k: 'まえの きろく、こえた！ ここから さきわ はじめて。', m: 'surprise', g: 'cheer' }] },
    w_break: { p: 1, cd: 70, ch: .5, say: [
      { t: '茶色いブロックは、撃てば壊れる。', k: 'ちゃいろい ぶろっくわ、うてば こわれる。', m: 'focus' },
      { t: '掘って進む〜。', k: 'ほって すすむ〜。', m: 'smile' }] },
    w_empty: { p: 1, cd: 40, ch: .7, say: [{ t: '弾切れ！着地すると戻るんだよね。', k: 'たまぎれ！ ちゃくち すると もどるんだよね。', m: 'surprise', g: 'hesitate' }] },
    w_die: { p: 3, say: [{ t: 'あ〜、やられちゃった…。{m}まで来れたよ。', k: 'あ〜、やられちゃった…。{m}まで これたよ。', m: 'sad', g: 'sigh' }] },

    pick_knight: { p: 2, say: [{ t: '2本目は「MOSS KNIGHT」。夜の廃墟を走る、横スクロール！', k: 'にほんめわ、もす ないと。よるの はいきょを はしる、よこすくろーる！', m: 'smile', g: 'declare', cam: true }] },
    start_knight: { p: 2, say: [{ t: 'Aでジャンプ、Bで火の粉を投げる。騎士なのに剣は使わないんだ。', k: 'えーで じゃんぷ、びーで ひのこを なげる。きしなのに けんわ つかわないんだ。', m: 'smile', g: 'think' }] },
    k_stage: { p: 2, cd: 5, say: [{ t: 'ステージ{n}、スタート！', k: 'すてーじ {n}、すたーと！', m: 'smile', g: 'declare' }] },
    k_stomp: { p: 1, cd: 9, ch: .65, say: [
      { t: '踏んづけた！', k: 'ふんづけた！', m: 'smile', g: 'approve' },
      { t: 'ぴょーん！', k: 'ぴょーん！', m: 'smile' },
      { t: '上からが一番。', k: 'うえからが いちばん。', m: 'proud' }] },
    k_kill: { p: 1, cd: 10, ch: .6, say: [
      { t: '火の粉、命中！', k: 'ひのこ、めいちゅう！', m: 'proud' },
      { t: '燃えちゃった。ごめんね〜。', k: 'もえちゃった。ごめんね〜。', m: 'smile' }] },
    k_hurt: { p: 2, cd: 6, say: [
      { t: 'いたっ、ぶつかった！', k: 'いたっ、ぶつかった！', m: 'sad', g: 'recoil' },
      { t: 'トゲ、見えてなかった〜。', k: 'とげ、みえて なかった〜。', m: 'sad', g: 'sigh' }] },
    k_fall: { p: 3, cd: 5, say: [
      { t: '落ちた〜！穴、深すぎ！', k: 'おちた〜！ あな、ふかすぎ！', m: 'surprise', g: 'recoil', st: 'panic' },
      { t: 'あっ…足が届かなかった。', k: 'あっ… あしが とどかなかった。', m: 'sad', g: 'sigh' }] },
    k_check: { p: 2, say: [{ t: 'チェックポイント！旗の色が変わった。', k: 'ちぇっくぽいんと！ はたの いろが かわった。', m: 'smile', g: 'nod' }] },
    k_clear: { p: 3, say: [{ t: 'ゴール！ステージクリア〜！', k: 'ごーる！ すてーじ くりあ〜！', m: 'smile', g: 'cheer', st: 'joy', cam: true }] },
    k_over: { p: 3, say: [{ t: 'ゲームオーバー…ステージ{n}までだった。', k: 'げーむおーばー… すてーじ {n}までだった。', m: 'sad', g: 'sigh' }] },

    pick_lancer: { p: 2, say: [{ t: '最後は「STAR LANCER」。縦スクロールのシューティング！', k: 'さいごわ、すたー らんさー。たてすくろーるの しゅーてぃんぐ！', m: 'smile', g: 'declare', cam: true }] },
    start_lancer: { p: 2, say: [{ t: 'Aで撃ちっぱなし、Bはボム。ボムは大事に使おう。', k: 'えーで うちっぱなし、びーわ ぼむ。ぼむわ だいじに つかおう。', m: 'focus', g: 'think' }] },
    l_kill: { p: 1, cd: 14, ch: .45, say: [
      { t: '落とした！', k: 'おとした！', m: 'proud' },
      { t: 'まとめて倒せた〜。', k: 'まとめて たおせた〜。', m: 'smile' },
      { t: 'いい感じに当たってる。', k: 'いい かんじに あたってる。', m: 'focus' }] },
    l_power: { p: 2, cd: 5, say: [{ t: 'パワーアップ！弾が増えた！', k: 'ぱわーあっぷ！ たまが ふえた！', m: 'smile', g: 'cheer' }] },
    l_bomb: { p: 3, cd: 4, say: [{ t: 'ボム！全部消えて〜！', k: 'ぼむ！ ぜんぶ きえて〜！', m: 'surprise', g: 'declare', st: 'panic' }] },
    l_bombitem: { p: 1, cd: 20, say: [{ t: 'ボム拾った。お守りにしとこう。', k: 'ぼむ ひろった。おまもりに しとこう。', m: 'smile' }] },
    l_hit: { p: 3, cd: 3, say: [{ t: 'やられた！あと{n}…。', k: 'やられた！ あと {n}…。', m: 'sad', g: 'recoil' }] },
    l_last: { p: 3, say: [{ t: 'やられた〜！残機ゼロ、もう後がない…！', k: 'やられた〜！ ざんき ぜろ、もう あとが ない…！', m: 'surprise', g: 'recoil', st: 'panic' }] },
    l_boss: { p: 3, say: [{ t: 'ワーニング…ボスだ！おっきい！', k: 'わーにんぐ… ぼすだ！ おっきい！', m: 'surprise', g: 'recoil', st: 'panic' }] },
    l_bossdown: { p: 3, say: [{ t: 'ボス、倒した〜！やった！', k: 'ぼす、たおした〜！ やった！', m: 'smile', g: 'cheer', st: 'joy', cam: true }] },
    l_over: { p: 3, say: [{ t: 'ゲームオーバー！スコアは{s}点でした。', k: 'げーむおーばー！ すこあわ {s}てん でした。', m: 'sad', g: 'settle' }] },

    best: { p: 3, say: [{ t: 'でもハイスコア更新！やった〜！', k: 'でも はいすこあ こうしん！ やった〜！', m: 'proud', g: 'cheer', st: 'joy', cam: true }] },
    retry: { p: 2, cd: 5, say: [
      { t: 'もう1回！今度はもっと先まで行く。', k: 'もう いっかい！ こんどわ もっと さきまで いく。', m: 'proud', g: 'declare' },
      { t: 'くやしいから、もう1回だけ。', k: 'くやしいから、もう いっかいだけ。', m: 'sad', g: 'hesitate' }] },
    timeup: { p: 2, say: [
      { t: 'そろそろ次のゲームにいこうかな。', k: 'そろそろ つぎの げーむに いこうかな。', m: 'smile', g: 'think' },
      { t: '名残惜しいけど、ここまで。次いこう！', k: 'なごりおしいけど、ここまで。つぎ いこう！', m: 'smile', g: 'settle' }] },
    to_menu: { p: 2, say: [{ t: 'メニューに戻るね。次は…', k: 'めにゅーに もどるね。つぎわ…', m: 'smile' }] },
    outro: { p: 3, say: [{ t: '3本ぜんぶ遊べた〜！みんなはどれが好きだった？', k: 'さんぼん ぜんぶ あそべた〜！ みんなわ どれが すきだった？', m: 'smile', g: 'cheer', cam: true }] },
    wrap: { p: 3, say: [{ t: 'そろそろ、おしまいの時間。あっという間だったね。', k: 'そろそろ、おしまいの じかん。あっと いう まだったね。', m: 'smile', g: 'settle', cam: true }] },
    bye: { p: 3, say: [{ t: '見てくれてありがとう！またね〜！', k: 'みて くれて ありがとう！ またね〜！', m: 'smile', g: 'nod', cam: true }] },
  },
  idle: { after: 15, say: [
    { t: 'ドット絵って、見てると落ち着くよね。', k: 'どっとえって、みてると おちつくよね。', m: 'smile' },
    { t: 'メニューのカーソル、ちかちかしてるのかわいい。', k: 'めにゅーの かーそる、ちかちか してるの かわいい。', m: 'smile', g: 'look' },
    { t: 'コメント、ちゃんと読んでるよ〜。', k: 'こめんと、ちゃんと よんでるよ〜。', m: 'smile', cam: true },
    { t: '画面のコントローラー、押したボタンがへこむんだよ。', k: 'がめんの こんとろーらー、おした ぼたんが へこむんだよ。', m: 'smile', cam: true }],
    well: [
      { t: '井戸って、どこまで続いてるんだろう。', k: 'いどって、どこまで つづいてるんだろう。', m: 'focus', g: 'think' },
      { t: '踏むと弾が満タンに戻るの、便利。', k: 'ふむと たまが まんたんに もどるの、べんり。', m: 'smile' },
      { t: '明かりの周りしか見えないの、雰囲気あるよね。', k: 'あかりの まわりしか みえないの、ふんいき あるよね。', m: 'smile', cam: true },
      { t: '下に行くほど、敵が増えてくる…。', k: 'したに いくほど、てきが ふえて くる…。', m: 'focus' },
      { t: '着地したら弾が戻る。忘れないようにしなきゃ。', k: 'ちゃくち したら たまが もどる。わすれないように しなきゃ。', m: 'focus' }],
    knight: [
      { t: '後ろの廃墟、窓に明かりがついてる。', k: 'うしろの はいきょ、まどに あかりが ついてる。', m: 'smile', g: 'look' },
      { t: 'お月さま、ずっとついてくる。', k: 'おつきさま、ずっと ついて くる。', m: 'smile' },
      { t: '穴の手前でジャンプ、穴の手前でジャンプ…。', k: 'あなの てまえで じゃんぷ、あなの てまえで じゃんぷ…。', m: 'focus', g: 'think' },
      { t: '騎士の羽根飾り、黄色でかわいい。', k: 'きしの はねかざり、きいろで かわいい。', m: 'smile', cam: true },
      { t: '時間切れでも、やられはしないんだって。やさしい。', k: 'じかんぎれでも、やられわ しないんだって。やさしい。', m: 'smile' }],
    lancer: [
      { t: '敵の弾、よく見て、よける…。', k: 'てきの たま、よく みて、よける…。', m: 'focus', g: 'think' },
      { t: '星が流れてくの、きれい。', k: 'ほしが ながれてくの、きれい。', m: 'smile' },
      { t: 'パワーアップは、4段階まであるんだって。', k: 'ぱわーあっぷわ、よんだんかいまで あるんだって。', m: 'focus' },
      { t: '画面の端に、追い詰められないように。', k: 'がめんの はしに、おいつめられないように。', m: 'focus' }],
    outro: [
      { t: '今日も楽しかった〜。', k: 'きょうも たのしかった〜。', m: 'smile', g: 'settle' },
      { t: 'またゲームが増えたら、遊ぼうね。', k: 'また げーむが ふえたら、あそぼうね。', m: 'smile', cam: true }] },
  reply: [
    { t: '{name}さん、こんばんは〜！', k: '{name}さん、こんばんわ〜！', m: 'smile', g: 'nod', early: true, to: /こんばんは|わこつ|きたー|待ってた|初見/ },
    { t: '{name}さん、コメントありがとう！', k: '{name}さん、こめんと ありがとう！', m: 'smile', g: 'nod' },
    { t: '{name}さん、わかる〜。', k: '{name}さん、わかる〜。', m: 'smile', g: 'approve', to: /すき|いい|かわいい|きれい|懐かし|すご|うま/ },
    { t: '{name}さん、見てくれてありがとう！', k: '{name}さん、みて くれて ありがとう！', m: 'smile', g: 'nod' }],

  /* ---------- 掛け合い：視聴者の問いかけと、その答え（答えたあと、ボタンを押してみせるものもある） ---------- */
  talk: {
    every: [40, 62],
    items: [
      { q: '今何メートル？', when(g) { const i = this._info(g); return i.id === 'well' && i.st === 'play' && i.depth >= 20; },
        vars(g) { return { m: IDZKANA.m(this._info(g).depth || 0) }; },
        a: { t: '{name}さん、いま{m}！まだまだ行くよ。', k: '{name}さん、いま {m}！ まだまだ いくよ。', m: 'proud' } },
      { q: '弾って何発あるの？', when(g) { return this._info(g).id === 'well'; },
        a: { t: '{name}さん、8発！着地すると満タンに戻るの。', k: '{name}さん、はっぱつ！ ちゃくち すると まんたんに もどるの。', m: 'smile', g: 'nod' } },
      { q: '敵って踏めるの？', when(g) { return this._info(g).id === 'well'; },
        a: { t: '{name}さん、踏めるよ。でも赤いトゲトゲはだめ。', k: '{name}さん、ふめるよ。でも あかい とげとげわ だめ。', m: 'focus', g: 'think' } },
      { q: 'ジャンプ見せて！', when(g) { const i = this._info(g); return i.id === 'knight' && i.st === 'play'; },
        a: { t: '{name}さん、ジャンプ？いくよ、ほっ！', k: '{name}さん、じゃんぷ？ いくよ、ほっ！', m: 'smile', g: 'cheer' }, act(g) { g.win.__idz.tap('a', 16); } },
      { q: '騎士の名前は？', when(g) { return this._info(g).id === 'knight'; },
        a: { t: '{name}さん、名前は…決めてない。モスくんでいい？', k: '{name}さん、なまえわ… きめて ない。もすくんで いい？', m: 'smile', g: 'hesitate' } },
      { q: '今ステージいくつ？', when(g) { const i = this._info(g); return i.id === 'knight' && i.stage >= 1; },
        vars(g) { const n = this._info(g).stage || 1; return { n: [String(n), IDZKANA.num(n)] }; },
        a: { t: '{name}さん、いまステージ{n}だよ。', k: '{name}さん、いま すてーじ {n}だよ。', m: 'smile' } },
      { q: 'ボム撃って！', when(g) { const i = this._info(g); return i.id === 'lancer' && i.st === 'play' && i.bombs > 0; },
        a: { t: '{name}さん、ボム？えいっ！', k: '{name}さん、ぼむ？ えいっ！', m: 'proud', g: 'declare' }, act(g) { g.win.__idz.tap('b', 4); } },
      { q: 'パワーいくつ？', when(g) { return this._info(g).id === 'lancer'; },
        vars(g) { const n = this._info(g).power || 1; return { n: [String(n), IDZKANA.num(n)] }; },
        a: { t: '{name}さん、いまパワー{n}。最大は4だよ。', k: '{name}さん、いま ぱわー {n}。さいだいわ よんだよ。', m: 'focus' } },
      { q: 'どのゲームが好き？', a: { t: '{name}さん、どれも好き。でも今のが一番かも。', k: '{name}さん、どれも すき。でも いまのが いちばんかも。', m: 'smile', g: 'think' } },
      { q: 'このゲーム自作？', a: { t: '{name}さん、そうなの。手作りのゲーム集なんだって。', k: '{name}さん、そうなの。てづくりの げーむしゅうなんだって。', m: 'smile' } },
      { q: 'コントローラーかわいい', a: { t: '{name}さん、わかる！ボタンが押されるの、見えるでしょ。', k: '{name}さん、わかる！ ぼたんが おされるの、みえるでしょ。', m: 'smile', g: 'nod' } },
      { q: 'BGMないの？', a: { t: '{name}さん、効果音だけなの。そのぶん、わたしがしゃべるね。', k: '{name}さん、こうかおんだけなの。そのぶん、わたしが しゃべるね。', m: 'smile' } },
      { q: '声かわいい', a: { t: '{name}さん、えへへ、ありがとう。照れる〜。', k: '{name}さん、えへへ、ありがとう。てれる〜。', m: 'smile', g: 'nod' } },
      { q: '初見です', when(g, t) { return t < 300; }, a: { t: '{name}さん、いらっしゃい！ゆっくりしていってね。', k: '{name}さん、いらっしゃい！ ゆっくり して いってね。', m: 'smile', g: 'nod' } },
    ],
  },

  /* ---------- 視聴者の書き込み（名前はすべて作りもの） ---------- */
  chat: {
    rate: 1.3,
    names: [['ドット好き', 'どっとずき'], ['ねむねむ', 'ねむねむ'], ['ぴこぴこ', 'ぴこぴこ'], ['カセット', 'かせっと'], ['8ビット', 'はちびっと'], ['しろくま', 'しろくま'],
      ['あんこ', 'あんこ'], ['こんぺいとう', 'こんぺいとう'], ['もぐら', 'もぐら'], ['井戸端', 'いどばた'], ['ほしぞら', 'ほしぞら'], ['みずたま', 'みずたま'], ['からあげ', 'からあげ'],
      ['ぽてと', 'ぽてと'], ['よもぎ', 'よもぎ'], ['くるみ', 'くるみ'], ['ゆずこ', 'ゆずこ'], ['ちくわ', 'ちくわ'], ['ねこじた', 'ねこじた'], ['あまぐり', 'あまぐり']],
    base: ['こんばんは', 'わこつ', 'きたー', '待ってた', '初見です', 'ドット絵すき', 'レトロいいね', '音かわいい', '懐かしい感じ', 'のんびり見る', '作業用にしてる', '3本立てお得',
      'メニュー画面すき', 'コントローラーかわいい', 'ボタン押してるの見える'],
    menu: ['次なに？', 'メニューいい', 'カーソル動いた', 'どれにする？', 'ロゴいい'],
    well: ['落ちてく〜', '井戸深い', '暗いのいい', '弾いくつ？', 'コウモリこわ', '下へ下へ', 'ジェムきれい', '明かりいいね'],
    knight: ['横スクきた', '騎士かわいい', '月きれい', '廃墟の窓いい', '穴こわ', 'がんばれ騎士', 'ジャンプうまい'],
    lancer: ['シューティングきた', '弾こわ', '避けて避けて', '星きれい', '自機かわいい', 'パワーアップほしい', 'ボムあるよ'],
    outro: ['おつかれ〜', '楽しかった', '全部よかった', 'また見る', 'どれも好き'],
    on: {
      start_well: ['いけー', 'スタート！', '落ちろ〜'], start_knight: ['騎士！', 'がんばれ', '横スク'], start_lancer: ['シューティング！', '撃てー'],
      w_kill: ['ナイス', '踏んだ', 'うま'], w_combo: ['コンボ！', '888', 'つながった'], w_hurt: ['いたそう', 'あー', 'ドンマイ'], w_mile: ['おめ！', '到達！', 'すごい'],
      w_mile2: ['深い', 'まだまだ'], w_die: ['あーー', 'おしい', 'ドンマイ', '次いこ'], w_record: ['ベスト更新！', 'すご'],
      k_stomp: ['ぴょん', 'ナイス'], k_kill: ['火の粉つよい', 'ナイス'], k_hurt: ['いたい', 'あぶない'], k_fall: ['落ちたw', '穴ー！', 'ドンマイ'],
      k_clear: ['クリアおめ！', '888888', 'ゴール！'], k_check: ['中間きた'], k_over: ['あーー', 'おつ', 'おしい'],
      l_power: ['パワーアップ！', '弾増えた'], l_bomb: ['ボム！', '全消し', 'ドカーン'], l_hit: ['あーー', '被弾', 'ドンマイ'], l_last: ['がんばれ！', 'あとがない'],
      l_boss: ['ボスでか', 'ワーニング！', 'きた'], l_bossdown: ['撃破！', '888888', 'つよい'], l_over: ['おつかれ', 'おしい', 'ナイスファイト'],
      best: ['ハイスコア！', 'おめでとう'], retry: ['もう1回！', 'リベンジ'], outro: ['おつかれ〜', '楽しかった'], bye: ['おつ〜', 'またね', 'おやすみ'],
    },
  },
});

/* ---------- 英語で話す出演者（アオイ・レイ）のときのセリフ：日本語の字幕 → [英語の字幕, 英語の読み] ---------- */
Jikkyo.english({ lines: {
    "こんばんは〜！今日はのんびり、レトロゲームの日です。": ["Good evening, everyone! Tonight is a cozy retro game night.", "[ gUd 'ivnIN, 'Evriw%Vn! t@'naIt Iz @ 'koUzi 'rEtroU 'geIm 'naIt. ]"],
    "遊ぶのは自作のゲーム集「井戸底ソフト 3in1」。3本入りだよ。": ["We're playing a homemade game collection, Idozoko Soft 3-in-1. Three games in one!", "[ wIr 'pleIIN @ 'hoUm%meId 'geIm k@'lEkS@n, ] いどぞこ そふと [ 'Tri In 'wVn. 'Tri 'geImz In 'wVn! ]"],
    "ロゴが出て…メニュー！昔のゲーム集のカセットみたい。": ["The logo, and… a menu! Just like an old multi-game cartridge.", "[ D@ 'loUgoU, @nd… @ 'mEnju! 'dZVst laIk @n 'oUld 'mVlti%geIm 'kArtrIdZ. ]"],
    "1本目は「WELL DIVE」。井戸の底へ、どんどん落ちていくゲーム。": ["Game one is WELL DIVE. You just keep falling down a well.", "[ 'geIm 'wVn Iz 'wEL 'daIv. ju 'dZVst 'kip 'fOlIN 'daUn @ 'wEL. ]"],
    "Aでジャンプ、Bで足元に撃つ。空中でAを押しても撃てるよ。": ["A to jump, B to shoot down. In the air, A shoots too.", "[ 'eI t@ 'dZVmp, 'bi t@ 'Sut 'daUn. In Di 'Er, 'eI 'Suts 'tu. ]"],
    "踏んだ！": ["Stomped it!", "[ 'stAmpt It! ]"],
    "えいっ、当たった。": ["Hah, got it.", "[ 'hA, 'gAt It. ]"],
    "じゃまだよ〜。": ["Out of my way!", "[ 'aUt @v maI 'weI! ]"],
    "下にいたのは、撃っちゃう。": ["Anything below me gets shot.", "[ 'EniTIN bI'loU mi gEts 'SAt. ]"],
    "空中で{n}連続！ジェムがもらえた！": ["{n} in a row in midair! I got gems!", "{n} [ In @ 'roU In 'mId%Er! aI 'gAt 'dZEmz! ]"],
    "いたっ！": ["Ouch!", "[ 'aUtS! ]"],
    "ぶつかった〜…ハートが減っちゃう。": ["Bumped into it… there goes a heart.", "[ 'bVmpt 'Intu It… 'DEr goUz @ 'hArt. ]"],
    "うわっ、横から来た！": ["Whoa, from the side!", "[ 'woU, frVm D@ 'saId! ]"],
    "{m}到達！ハートもひとつ戻ったよ。": ["{m}! I got a heart back.", "{m}！ [ aI 'gAt @ 'hArt 'b{k. ]"],
    "{m}到達！どんどん深くなる。": ["{m}! It just keeps getting deeper.", "{m}！ [ It 'dZVst 'kips 'gEtIN 'dip@r. ]"],
    "前の記録、越えた！ここから先は初めて。": ["I beat my old record! Everything past here is new.", "[ aI 'bit maI 'oUld 'rEk@rd! 'EvriTIN 'p{st 'hIr Iz 'nu. ]"],
    "茶色いブロックは、撃てば壊れる。": ["Brown blocks break if you shoot them.", "[ 'braUn 'blAks 'breIk If ju 'Sut D@m. ]"],
    "掘って進む〜。": ["Digging my way down!", "[ 'dIgIN maI 'weI 'daUn! ]"],
    "弾切れ！着地すると戻るんだよね。": ["Out of ammo! It refills when I land.", "[ 'aUt @v '{mjoU! It ri'fIlz wEn aI 'l{nd. ]"],
    "あ〜、やられちゃった…。{m}まで来れたよ。": ["Aw, I'm down… I made it to {m}.", "[ 'O, aIm 'daUn… aI 'meId It tu ] {m}。"],
    "2本目は「MOSS KNIGHT」。夜の廃墟を走る、横スクロール！": ["Game two is MOSS KNIGHT. A side-scroller through ruins at night!", "[ 'geIm 'tu Iz 'mOs 'naIt. @ 'saId%skroUl@r Tru 'ruInz @t 'naIt! ]"],
    "Aでジャンプ、Bで火の粉を投げる。騎士なのに剣は使わないんだ。": ["A to jump, B to throw embers. A knight with no sword!", "[ 'eI t@ 'dZVmp, 'bi t@ 'TroU 'Emb@rz. @ 'naIt wID 'noU 'sOrd! ]"],
    "ステージ{n}、スタート！": ["Stage {n}, go!", "[ 'steIdZ ] {n}、[ 'goU! ]"],
    "踏んづけた！": ["Stomped!", "[ 'stAmpt! ]"],
    "ぴょーん！": ["Boing!", "[ 'bOIN! ]"],
    "上からが一番。": ["From above is best.", "[ frVm @'bVv Iz 'bEst. ]"],
    "火の粉、命中！": ["Ember, direct hit!", "[ 'Emb@r, dI'rEkt 'hIt! ]"],
    "燃えちゃった。ごめんね〜。": ["Oops, it burned. Sorry!", "[ 'Ups, It 'b3nd. 'sAri! ]"],
    "いたっ、ぶつかった！": ["Ouch, I ran into it!", "[ 'aUtS, aI 'r{n 'Intu It! ]"],
    "トゲ、見えてなかった〜。": ["Didn't see those spikes…", "[ 'dIdnt 'si DoUz 'spaIks… ]"],
    "落ちた〜！穴、深すぎ！": ["I fell! That pit's too deep!", "[ aI 'fEL! 'D{t 'pIts tu 'dip! ]"],
    "あっ…足が届かなかった。": ["Ah… my feet didn't reach.", "[ 'A… maI 'fit 'dIdnt 'ritS. ]"],
    "チェックポイント！旗の色が変わった。": ["Checkpoint! The flag changed color.", "[ 'tSEk%pOInt! D@ 'fl{g 'tSeIndZd 'kVl@r. ]"],
    "ゴール！ステージクリア〜！": ["Goal! Stage clear!", "[ 'goUL! 'steIdZ 'klIr! ]"],
    "ゲームオーバー…ステージ{n}までだった。": ["Game over… I made it to stage {n}.", "[ 'geIm 'oUv@r… aI 'meId It tu 'steIdZ ] {n}。"],
    "最後は「STAR LANCER」。縦スクロールのシューティング！": ["Last up, STAR LANCER. A vertical shooter!", "[ 'l{st 'Vp, 'stAr 'l{ns@r. @ 'v3tIk@L 'Sut@r! ]"],
    "Aで撃ちっぱなし、Bはボム。ボムは大事に使おう。": ["A fires nonstop, B is a bomb. Use bombs wisely.", "[ 'eI 'faI@rz nAn'stAp, 'bi Iz @ 'bAm. 'juz 'bAmz 'waIzli. ]"],
    "落とした！": ["Shot it down!", "[ 'SAt It 'daUn! ]"],
    "まとめて倒せた〜。": ["Got a bunch at once!", "[ 'gAt @ 'bVntS @t 'wVns! ]"],
    "いい感じに当たってる。": ["I'm hitting nicely.", "[ aIm 'hItIN 'naIsli. ]"],
    "パワーアップ！弾が増えた！": ["Power up! More shots!", "[ 'paU@r 'Vp! 'mOr 'SAts! ]"],
    "ボム！全部消えて〜！": ["Bomb! Everything, disappear!", "[ 'bAm! 'EvriTIN, %dIs@'pIr! ]"],
    "ボム拾った。お守りにしとこう。": ["Got a bomb. My lucky charm.", "[ 'gAt @ 'bAm. maI 'lVki 'tSArm. ]"],
    "やられた！あと{n}…。": ["I got hit! {n} left…", "[ aI 'gAt 'hIt! ] {n} [ 'lEft… ]"],
    "やられた〜！残機ゼロ、もう後がない…！": ["Hit again! No ships left, no more chances…!", "[ 'hIt @'gEn! 'noU 'SIps 'lEft, 'noU 'mOr 'tS{nsIz…! ]"],
    "ワーニング…ボスだ！おっきい！": ["Warning… it's the boss! It's huge!", "[ 'wOrnIN… Its D@ 'bOs! Its 'hjudZ! ]"],
    "ボス、倒した〜！やった！": ["Boss down! Yes!", "[ 'bOs 'daUn! 'jEs! ]"],
    "ゲームオーバー！スコアは{s}点でした。": ["Game over! My score was {s} points.", "[ 'geIm 'oUv@r! maI 'skOr w@z ] {s} [ 'pOInts. ]"],
    "でもハイスコア更新！やった〜！": ["But it's a new high score! Yay!", "[ bVt Its @ 'nu 'haI 'skOr! 'jeI! ]"],
    "もう1回！今度はもっと先まで行く。": ["One more time! I'll go further this time.", "[ 'wVn 'mOr 'taIm! aIL 'goU 'f3D@r DIs 'taIm. ]"],
    "くやしいから、もう1回だけ。": ["So frustrating. Just one more try.", "[ 'soU 'frVstreItIN. 'dZVst 'wVn 'mOr 'traI. ]"],
    "そろそろ次のゲームにいこうかな。": ["Maybe it's time for the next game.", "[ 'meIbi Its 'taIm fOr D@ 'nEkst 'geIm. ]"],
    "名残惜しいけど、ここまで。次いこう！": ["I'll miss it, but that's it. On to the next!", "[ aIL 'mIs It, bVt 'D{ts It. 'An tu D@ 'nEkst! ]"],
    "メニューに戻るね。次は…": ["Back to the menu. Next is…", "[ 'b{k t@ D@ 'mEnju. 'nEkst Iz… ]"],
    "3本ぜんぶ遊べた〜！みんなはどれが好きだった？": ["I played all three! Which one did you all like?", "[ aI 'pleId 'OL 'Tri! 'wItS 'wVn dId ju 'OL 'laIk? ]"],
    "そろそろ、おしまいの時間。あっという間だったね。": ["It's almost time to wrap up. That went by so fast.", "[ Its 'OlmoUst 'taIm t@ 'r{p 'Vp. 'D{t wEnt 'baI soU 'f{st. ]"],
    "見てくれてありがとう！またね〜！": ["Thank you for watching! See you next time!", "[ 'T{Nk ju fOr 'wAtSIN! 'si ju 'nEkst 'taIm! ]"],
    "ドット絵って、見てると落ち着くよね。": ["Pixel art is so calming to look at.", "[ 'pIks@L 'Art Iz soU 'kAmIN t@ 'lUk @t. ]"],
    "メニューのカーソル、ちかちかしてるのかわいい。": ["The menu cursor blinking is so cute.", "[ D@ 'mEnju 'k3s@r 'blINkIN Iz soU 'kjut. ]"],
    "コメント、ちゃんと読んでるよ〜。": ["I'm reading all your comments!", "[ aIm 'ridIN 'OL jOr 'kAmEnts! ]"],
    "画面のコントローラー、押したボタンがへこむんだよ。": ["See the controller? The buttons sink when pressed.", "[ 'si D@ k@n'troUl@r? D@ 'bVt@nz 'sINk wEn 'prEst. ]"],
    "井戸って、どこまで続いてるんだろう。": ["I wonder how deep this well goes.", "[ aI 'wVnd@r haU 'dip DIs 'wEL goUz. ]"],
    "踏むと弾が満タンに戻るの、便利。": ["Stomping refills your ammo. So handy.", "[ 'stAmpIN ri'fIlz jOr '{mjoU. soU 'h{ndi. ]"],
    "明かりの周りしか見えないの、雰囲気あるよね。": ["Only seeing what's near the light. Such a mood.", "[ 'oUnli 'siIN wVts 'nIr D@ 'laIt. 'sVtS @ 'mud. ]"],
    "下に行くほど、敵が増えてくる…。": ["The deeper you go, the more enemies…", "[ D@ 'dip@r ju 'goU, D@ 'mOr 'En@miz… ]"],
    "着地したら弾が戻る。忘れないようにしなきゃ。": ["Landing refills ammo. Gotta remember.", "[ 'l{ndIN ri'fIlz '{mjoU. 'gA4@ rI'mEmb@r. ]"],
    "後ろの廃墟、窓に明かりがついてる。": ["The ruins in the back have lit windows.", "[ D@ 'ruInz In D@ 'b{k h{v 'lIt 'wIndoUz. ]"],
    "お月さま、ずっとついてくる。": ["The moon keeps following me.", "[ D@ 'mun 'kips 'fAloUIN mi. ]"],
    "穴の手前でジャンプ、穴の手前でジャンプ…。": ["Jump before the pit, jump before the pit…", "[ 'dZVmp bI'fOr D@ 'pIt, 'dZVmp bI'fOr D@ 'pIt… ]"],
    "騎士の羽根飾り、黄色でかわいい。": ["The knight's yellow plume is so cute.", "[ D@ 'naIts 'jEloU 'plum Iz soU 'kjut. ]"],
    "時間切れでも、やられはしないんだって。やさしい。": ["Even if time runs out, you don't lose. How kind.", "[ 'iv@n If 'taIm 'rVnz 'aUt, ju 'doUnt 'luz. haU 'kaInd. ]"],
    "敵の弾、よく見て、よける…。": ["Watch the enemy bullets, and dodge…", "[ 'wAtS Di 'En@mi 'bUlIts, @nd 'dAdZ… ]"],
    "星が流れてくの、きれい。": ["The stars flowing by are so pretty.", "[ D@ 'stArz 'floUIN 'baI Ar soU 'prIti. ]"],
    "パワーアップは、4段階まであるんだって。": ["Power up goes up to level four.", "[ 'paU@r 'Vp goUz 'Vp tu 'lEv@L 'fOr. ]"],
    "画面の端に、追い詰められないように。": ["Don't get cornered at the edge.", "[ 'doUnt gEt 'kOrn@rd @t Di 'EdZ. ]"],
    "今日も楽しかった〜。": ["Today was fun too.", "[ t@'deI w@z 'fVn 'tu. ]"],
    "またゲームが増えたら、遊ぼうね。": ["When more games come out, let's play again.", "[ wEn 'mOr 'geImz kVm 'aUt, lEts 'pleI @'gEn. ]"],
    "{name}さん、こんばんは〜！": ["{name}-san, good evening!", "{name}さん、[ gUd 'ivnIN! ]"],
    "{name}さん、コメントありがとう！": ["{name}-san, thanks for the comment!", "{name}さん、[ 'T{Nks fOr D@ 'kAmEnt! ]"],
    "{name}さん、わかる〜。": ["{name}-san, I know, right?", "{name}さん、[ aI 'noU, 'raIt? ]"],
    "{name}さん、見てくれてありがとう！": ["{name}-san, thanks for watching!", "{name}さん、[ 'T{Nks fOr 'wAtSIN! ]"],
    "{name}さん、いま{m}！まだまだ行くよ。": ["{name}-san, {m} right now! Still going.", "{name}さん、{m} [ 'raIt 'naU! 'stIL 'goUIN. ]"],
    "{name}さん、8発！着地すると満タンに戻るの。": ["{name}-san, eight shots! Landing refills them.", "{name}さん、[ 'eIt 'SAts! 'l{ndIN ri'fIlz D@m. ]"],
    "{name}さん、踏めるよ。でも赤いトゲトゲはだめ。": ["{name}-san, you can! But not the red spiky ones.", "{name}さん、[ ju 'k{n! bVt 'nAt D@ 'rEd 'spaIki 'wVnz. ]"],
    "{name}さん、ジャンプ？いくよ、ほっ！": ["{name}-san, a jump? Here goes, hup!", "{name}さん、[ @ 'dZVmp? 'hIr 'goUz, 'hVp! ]"],
    "{name}さん、名前は…決めてない。モスくんでいい？": ["{name}-san, its name… I haven't decided. Mossy?", "{name}さん、[ Its 'neIm… aI 'h{v@nt dI'saIdId. 'mOsi? ]"],
    "{name}さん、いまステージ{n}だよ。": ["{name}-san, we're on stage {n}.", "{name}さん、[ wIr An 'steIdZ ] {n}。"],
    "{name}さん、ボム？えいっ！": ["{name}-san, a bomb? Here!", "{name}さん、[ @ 'bAm? 'hIr! ]"],
    "{name}さん、いまパワー{n}。最大は4だよ。": ["{name}-san, power {n} now. Max is four.", "{name}さん、[ 'paU@r ] {n} [ 'naU. 'm{ks Iz 'fOr. ]"],
    "{name}さん、どれも好き。でも今のが一番かも。": ["{name}-san, I love them all. But this one might be the best.", "{name}さん、[ aI 'lVv D@m 'OL. bVt 'DIs wVn maIt bi D@ 'bEst. ]"],
    "{name}さん、そうなの。手作りのゲーム集なんだって。": ["{name}-san, yes! It's a handmade collection.", "{name}さん、[ 'jEs! Its @ 'h{nd%meId k@'lEkS@n. ]"],
    "{name}さん、わかる！ボタンが押されるの、見えるでしょ。": ["{name}-san, right? You can see the buttons press.", "{name}さん、[ 'raIt? ju k@n 'si D@ 'bVt@nz 'prEs. ]"],
    "{name}さん、効果音だけなの。そのぶん、わたしがしゃべるね。": ["{name}-san, only sound effects. So I'll talk extra.", "{name}さん、[ 'oUnli 'saUnd I'fEkts. 'soU aIL 'tOk 'Ekstr@. ]"],
    "{name}さん、えへへ、ありがとう。照れる〜。": ["{name}-san, hehe, thank you. I'm blushing.", "{name}さん、[ 'hihi, 'T{Nk ju. aIm 'blVSIN. ]"],
    "{name}さん、いらっしゃい！ゆっくりしていってね。": ["{name}-san, welcome! Make yourself at home.", "{name}さん、[ 'wElk@m! 'meIk j@r'sElf @t 'hoUm. ]"],
    "{name}さん、覚えてる。ボタンが二つしかないのに、ずっと遊べたんだよね。": ["{name}-san, I remember. Only two buttons, and I played forever.", "{name}さん、[ aI rI'mEmb@r. 'oUnli 'tu 'bVt@nz, @nd aI 'pleId f@'rEv@r. ]"],
    "{name2}さん、ほんとだ！AとB、それで十分なんだね。": ["{name2}-san, oh, you're right! A and B is all you need.", "{name2}さん、[ 'oU, jOr 'raIt! 'eI @nd 'bi Iz 'OL ju 'nid. ]"],
    "{name}さん、描いてみて！小さいマス目から始めると楽しいよ。": ["{name}-san, give it a try! Starting with a tiny grid is fun.", "{name}さん、[ 'gIv It @ 'traI! 'stArtIN wID @ 'taIni 'grId Iz 'fVn. ]"],
    "{name2}さん、それいい！今日の主人公たちも、8×8なんだよ。": ["{name2}-san, love that! Today's heroes are 8 by 8 too.", "{name2}さん、[ 'lVv 'D{t! t@'deIz 'hIroUz Ar 'eIt baI 'eIt 'tu. ]"],
    "{name}さん、このゲームを作ったところの名前なんだって。最初のゲームが井戸だからかな？": ["{name}-san, it's the name of the maker. Maybe because the first game is a well?", "{name}さん、[ Its D@ 'neIm @v D@ 'meIk@r. 'meIbi bI'kVz D@ 'f3st 'geIm Iz @ 'wEL? ]"],
    "{name}さん、もちろん！わたしも、さっき何回もやられてたし。": ["{name}-san, of course! I got taken out a bunch of times earlier.", "{name}さん、[ @v 'kOrs! aI gAt 'teIk@n 'aUt @ 'bVntS @v 'taImz '3li@r. ]"],
    "{name}さん、どうぞ！": ["{name}-san, go ahead!", "{name}さん、[ 'goU @'hEd! ]"],
    "{name}さん、うん、また遊ぼう。新しいのが増えてたら、もっと楽しいね。": ["{name}-san, yes, let's play again. Even better with new games.", "{name}さん、[ 'jEs, lEts 'pleI @'gEn. 'iv@n 'bEt@r wID 'nu 'geImz. ]"],
    "パズルにレース、いいね！…作る人は大変そうだけど。": ["Puzzles, racing, nice! …Sounds hard to make, though.", "[ 'pVz@Lz, 'reIsIN, 'naIs! … 'saUndz 'hArd t@ 'meIk, 'DoU. ]"],
    "{name}さん、ピコピコ音、クセになるよね。": ["{name}-san, the bleepy sounds are addictive, right?", "{name}さん、[ D@ 'blipi 'saUndz Ar @'dIktIv, 'raIt? ]"],
    "{name}さん、3本ぜんぶ遊んだら、おしまい。もうちょっと付き合ってね。": ["{name}-san, once I've played all three, we're done. Stay a bit longer?", "{name}さん、[ 'wVns aIv 'pleId 'OL 'Tri, wIr 'dVn. 'steI @ 'bIt 'lONg@r? ]"],
    "{name}さん、{m}まで行けたよ。下に行くほど、どきどきした。": ["{name}-san, I made it to {m}. The deeper I went, the more nervous I got.", "{name}さん、[ aI 'meId It tu ] {m}。[ D@ 'dip@r aI 'wEnt, D@ 'mOr 'n3v@s aI 'gAt. ]"],
    "{name}さん、ほんと！後ろからずっとついてくるんだもん。": ["{name}-san, right! It kept following me from behind.", "{name}さん、[ 'raIt! It 'kEpt 'fAloUIN mi frVm bI'haInd. ]"],
    "{name2}さん、知ってる〜。でも、上から来られると無理なの。": ["{name2}-san, I know. But not when they come from above.", "{name2}さん、[ aI 'noU. bVt 'nAt wEn DeI kVm frVm @'bVv. ]"],
    "{name}さん、ステージ{n}まで！ゴールの旗、気持ちよかった〜。": ["{name}-san, up to stage {n}! The goal flag felt great.", "{name}さん、[ Vp tu 'steIdZ ] {n}！[ D@ 'goUL 'fl{g 'fElt 'greIt. ]"],
    "{name}さん、でしょ？騎士なのに剣じゃないところが、いいよね。": ["{name}-san, right? A knight with no sword, I love it.", "{name}さん、[ 'raIt? @ 'naIt wID 'noU 'sOrd, aI 'lVv It. ]"],
    "{name}さん、倒せた！最後のほう、手がぷるぷるしてた。": ["{name}-san, I did it! My hands were shaking at the end.", "{name}さん、[ aI 'dId It! maI 'h{ndz w3 'SeIkIN @t Di 'End. ]"],
    "{name}さん、倒せなかった〜。弾が多すぎるんだもん。次こそ。": ["{name}-san, couldn't beat it. Too many bullets. Next time!", "{name}さん、[ 'kUdnt 'bit It. 'tu 'mEni 'bUlIts. 'nEkst 'taIm! ]"],
    "{name}さん、弾がいっぱいで目が回った〜。でも楽しかった。": ["{name}-san, so many bullets, I got dizzy. But it was fun.", "{name}さん、[ soU 'mEni 'bUlIts, aI gAt 'dIzi. bVt It w@z 'fVn. ]"],
    "{name}さん、うーん…ぜんぶ！でも、どきどきしたのは井戸かな。": ["{name}-san, hmm… all of them! But the well was the most thrilling.", "{name}さん、[ 'hVm… 'OL @v D@m! bVt D@ 'wEL w@z D@ 'moUst 'TrIlIN. ]"],
    "みんなばらばら！3本入りで、ちょうどよかったね。": ["Everyone's split! Three in one was just right.", "[ 'Evriw%Vnz 'splIt! 'Tri In 'wVn w@z 'dZVst 'raIt. ]"],
    "もう、笑わないで〜。でも、ありがとう！": ["Hey, don't laugh! But thank you!", "[ 'heI, 'doUnt 'l{f! bVt 'T{Nk ju! ]"],
    "伝えておくね。…届くかな？": ["I'll pass it on. …I wonder if it'll reach them?", "[ aIL 'p{s It 'An. … aI 'wVnd@r If 'It@L 'ritS D@m? ]"],
} });
