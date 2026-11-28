/* ===== 回の雛形：「この解説ツールの使い方」 =====
   新しい回を作るときは、このファイルを写して、world（場面のコード）と lines（台本）を書きかえる。
   場面は5つ。物を横に並べておき、場面ごとにカメラを動かすだけの、いちばん簡単な作り */
Kaisetsu.episode({
  id: 'howto', fileName: 'この解説ツールの使い方',
  title: 'この解説ツールの使い方', titleLines: ['この解説ツールの', '使い方'], eyebrow: 'チュートリアル',
  cast: {
    A: { name: 'ノア', role: '解説', color: '#B0487A', voice: { voice: 'otona', speed: 1.05 },
         look: { hair: 'bob', hairColor: 'budou', eye: 'sumire', ornament: 'orbit', hat: 'none' } },
    B: { name: 'ヒナ', role: '聞き役', color: '#C9762C', voice: { voice: 'shoujo', speed: 1.1 },
         look: { hair: 'short', hairColor: 'akagane', eye: 'midori', ornament: 'none', hat: 'knit' } },
  },
  chapters: [['台本', ['script']], ['声', ['voice']], ['場面', ['scene']], ['BGM', ['music']], ['書き出し', ['export']]],
  bgm: { script: 'opening', voice: 'explain', scene: 'explain', music: 'wonder', export: 'resolve' },

  world(K) {
    const T = K.THREE, V3 = T.Vector3, { toon, outline, glow } = K;
    // 物を横に並べる（x = -12, -6, 0, 6, 12）
    const X = { script: -12, voice: -6, scene: 0, music: 6, export: 12 }, G = {};
    for (const k in X) { G[k] = new T.Group(); G[k].position.x = X[k]; K.scene.add(G[k]); }
    // 台本：紙の束
    for (let i = 0; i < 4; i++) { const m = new T.Mesh(new T.BoxGeometry(2.2, 0.04, 3), toon(i === 3 ? '#FFFFFF' : '#E7EAF2')); m.position.y = i * 0.07; m.rotation.y = (i - 1.5) * 0.06; outline(m, '#1A2240', 1.03); G.script.add(m); }
    for (let i = 0; i < 7; i++) { const l = new T.Mesh(new T.BoxGeometry(1.5 - (i % 3) * 0.3, 0.01, 0.08), toon('#5B6380')); l.position.set(-0.1, 0.28, -1.1 + i * 0.32); G.script.add(l); }
    G.script.rotation.x = 0.5;
    // 声：音の波の棒
    const bars = []; for (let i = 0; i < 15; i++) { const m = new T.Mesh(new T.BoxGeometry(0.22, 1, 0.22), toon('#7CE0FF')); m.position.x = (i - 7) * 0.32; outline(m, '#123', 1.06); G.voice.add(m); bars.push(m); }
    // 場面：地球のような球と、立方体
    const ball = new T.Mesh(new T.SphereGeometry(1.1, 48, 32), toon('#4F8FE0')); outline(ball, '#0B1638', 1.02); G.scene.add(ball);
    const cube = new T.Mesh(new T.BoxGeometry(0.7, 0.7, 0.7), toon('#FFD166')); cube.position.set(1.9, 0.6, 0); outline(cube, '#3A2608', 1.05); G.scene.add(cube);
    // BGM：音符
    const notes = []; for (let i = 0; i < 3; i++) { const n = new T.Group(); const h = new T.Mesh(new T.SphereGeometry(0.34, 20, 14), toon('#FF8FB1')); h.scale.y = 0.75; outline(h, '#3A1020', 1.06);
      const s = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 1.4, 8), toon('#FF8FB1')); s.position.set(0.3, 0.7, 0); n.add(h, s); n.position.set((i - 1) * 1.3, 0, 0); G.music.add(n); notes.push(n); }
    // 書き出し：フィルムのこま
    for (let i = 0; i < 3; i++) { const f = new T.Mesh(new T.BoxGeometry(1.3, 1, 0.06), toon('#2A2F4A')); f.position.x = (i - 1) * 1.45; outline(f, '#0A0C18', 1.04); G.export.add(f);
      const pic = new T.Mesh(new T.PlaneGeometry(1.05, 0.7), new T.MeshBasicMaterial({ color: ['#7CE0FF', '#FFD166', '#A8F08A'][i] })); pic.position.set((i - 1) * 1.45, 0, 0.04); G.export.add(pic); }
    G.export.add(glow('#FFFFFF', 3));
    let cur = 'script';
    return {
      scenes: Object.keys(X),
      enter(name) { cur = name; },
      update(dt, t, Tt) {
        bars.forEach((b, i) => { b.scale.y = 0.3 + 1.4 * Math.abs(Math.sin(Tt * 3 + i * 0.6) * Math.sin(Tt * 1.3 + i * 0.2)); });
        ball.rotation.y = Tt * 0.4; cube.rotation.set(Tt * 0.7, Tt * 0.5, 0);
        notes.forEach((n, i) => { n.position.y = Math.sin(Tt * 2 + i) * 0.3; });
        G.export.rotation.y = Math.sin(Tt * 0.5) * 0.25;
      },
      camera: (name, t) => [new V3(X[name] + Math.sin(t * 0.2) * 0.6, 1.6, 7.5), new V3(X[name], 0.6, 0)],
      labels(name) {
        if (name === 'voice') return [{ id: 'v', p: new V3(X.voice, 1.4, 0), t: 'OtoVoice', sub: '録音なし', dot: '#7CE0FF' }];
        if (name === 'scene') return [{ id: 's', p: new V3(X.scene + 1.9, 1.1, 0), t: '3Dの物', sub: 'three.js', dot: '#FFD166' }];
        return [];
      },
    };
  },

  lines: [
    { w: 'B', s: 'script', t: 'ねえノア、この解説って、どうやって作ってるの？',
      k: "ねえ のあ、この かいせつって、どうやって つくってるの？" },
    { w: 'A', s: 'script', e: { A: 'smile' }, t: '台本を書くのよ。1セリフに、字幕と、読みのかなを書くの。',
      k: "だいほんを かくのよ。いち せ'りふに、じまくと、よみの か'なを かくの。",
      b: { h: '1セリフ ＝ 字幕 ＋ 読み', r: ['字幕は2行・全角48字まで', '声は9秒まで'] } },
    { w: 'B', s: 'script', t: '読みは、かなで書くんだね。',
      k: "よみわ、か'なで かくんだね。" },
    { w: 'A', s: 'voice', t: '声は、その読みからその場で作るの。録音は使っていないわ。',
      k: "こ'えわ、その よみから そのばで つくるの。ろくおんわ つかって いないわ。" },
    { w: 'A', s: 'scene', t: '絵は、回ごとに場面のコードを書くの。地球でも、時計でも作れるわ。',
      k: "え'わ、か'いごとに ばめんの こ'ーどを かくの。ちきゅうでも、とけいでも つくれるわ。",
      b: { h: '場面は回ごとに作る', r: ['3Dの物と、カメラの位置と、ラベル'] } },
    { w: 'B', s: 'scene', e: { B: 'jito' }, t: 'BGMは？',
      k: "びーじーえ'むわ？" },
    { w: 'A', s: 'music', t: '場面ごとに雰囲気を選ぶの。セリフのあいだは、音量が自動で下がるわ。',
      k: "ばめんごとに ふんい'きを えらぶの。せ'りふの あいだわ、おんりょうが じどうで さがるわ。",
      b: { h: 'BGMは5種類', r: ['はじまり・説明・ふしぎ・緊張・解決'] } },
    { w: 'A', s: 'export', e: { A: 'smile' }, t: 'できたら、動画のファイルに書き出せるわ。',
      k: "できたら、どうがの ふぁ'いるに かきだせるわ。" },
    { w: 'B', s: 'export', e: { B: 'smile' }, st: 'joy', t: 'わたしも作ってみたい！',
      k: "わたしも つくって みたい！" },
  ],
});
