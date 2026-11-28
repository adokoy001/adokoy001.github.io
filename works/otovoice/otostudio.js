/*! OtoStudio 1.3.0（TextScore 2.1.0 ＋ OtoVoice 1.4.4）— 演奏（楽器・ドラム・歌声）と、話し声・歌声の合成を、1つのファイルに。依存なし・外部通信なし・録音なし
 *  はじめに OtoVoice（話す・歌う）、つづいて TextScore（譜面・楽器・再生・書き出し）。それぞれの手引きは、それぞれの頭のコメントにある。効果音は、別のファイル otofx.js（OtoFX）。
 *  ブラウザでは OtoStudio.TextScore・OtoStudio.OtoVoice。TextScore・OtoVoice という名前でも使える。Node では require の返り値が OtoStudio */
(function(){
var __OV,__TS;
/*! OtoVoice 1.4.4 — 話す・歌う。音素で書く、軽い音声合成（依存なし・外部通信なし・録音なし）
 *
 * 文を書くと、その場で計算して声にする。話し声（16kHz）と歌声（32kHz）。録音・辞書・通信は使わない。
 * 読み方を、音素（発音のいちばん小さな単位）で書ける。AI が台詞を書く前提なので、読めないところは、黙って飛ばさずにエラーで知らせる。
 * 日本語と英語で、話すことも歌うこともできる。
 * 中身は、話し声の合成 RSP（作品「大通り・砲手」の版に、音素の入口を足したもの）、その無線機、歌声の合成 OtoSing 0.9.0（0.7.2 に、英語の音節と、音符ごとの指定を足したもの）。
 *
 * ■ いちばん短い使い方
 *   （HTML の script タグで、このファイル otostudio.js を読みこむ。HTML の中にじかに貼ってもよいように、ここにはタグを書かない）
 *   const ac=new AudioContext();
 *   const x=OtoVoice.speak("こんにちわ。きょ'うわ い'い て'んきです。",{voice:'onna'});
 *   const s=ac.createBufferSource();s.buffer=OtoVoice.buffer(ac,x);s.connect(ac.destination);s.start();
 *   （文の中で ' を使うので、JavaScript では、文を " " か ` ` でかこむ。音を出すのは、ボタンを押すなど、人の操作のあとで）
 *
 * ■ API
 *   OtoVoice.speak(文,o)       話す → Float32Array（16kHz）。読めないところがあれば Error を投げる（e.errors に一覧）
 *   OtoVoice.check(文,o)       確かめる → {ok, errors, seconds, kana, phonemes, segments, contour, marks}。音は作らない。文がどう読まれるかを、かなと音素で返す
 *                              （contour は高さの動き [秒, Hz, 声が出ているか]、marks は音素の始まる時刻。図にするとき用）
 *   OtoVoice.toPhonemes(文,o)  かなの文を、自動の規則をかけたあとの音素の列（/ … /）に直す。直した文は、かなのときと同じ音になる
 *   OtoVoice.speakRows(行,o)   手で書いた行を話す → Float32Array（16kHz）。.report に読み戻し（下の「手で書く行」）
 *   OtoVoice.checkRows(行,o)   行を鳴らして測った結果を返す → {ok, errors, rows, warnings, text}
 *   OtoVoice.toRows(文,o)      文を、自動の規則をかけた結果の行に直す（手で直すための下書き）
 *   OtoVoice.sing(譜面,o)      歌う → Float32Array（32kHz）
 *   OtoVoice.lyric(歌詞)       歌詞 → 拍の並び（OtoVoice.OtoSing.singNotes の音符の m に入れる）
 *   OtoVoice.radio(声,o)       話し声を無線機に通す → Float32Array（24kHz）
 *   OtoVoice.buffer(ac,x)      speak・sing・radio の返り値を、AudioBuffer にする
 *   OtoVoice.STYLES            調子の名前の一覧 ／ OtoVoice.RSP・OtoVoice.OtoSing は、中の芯（これまでどおり、じかに呼べる）
 *   OtoVoice.VOICES            声：見本5つ（otoko 男、onna 女、kodomo 子供、tenor 高い男、rou 年配の男）と、テンプレート20個（下の「声のテンプレート」）。自分の声も足せる
 *   OtoVoice.voices()          声の一覧 [{name, label, template, f0, size, …}]（画面に並べるとき用）
 *   speak の o（どれも省ける）
 *     voice 声の見本の名前 ／ f0 声の高さ（Hz。男 100〜130、女 200〜250）／ speed 速さ ／ 声の質：size soft bright breathy rough shake whisper（下の「声の質」）
 *     style 調子：calm 冷静・panic 焦り・joy 歓喜・sad 沈んだ声・whisper 囁き ／ range 抑揚の幅 ／ long 文末の伸ばし
 *     （もとの設定もそのまま使える：scale 口の共鳴の倍率 ／ oq 声帯が開いている割合 ／ breath 息の量 ／ sharp 声の硬さ。声の質の項目を書くと、そちらが優先）
 *     nat・con 声の出し方の改良・子音の改良（1.4 から、書かなければ入る。false で 1.3.0 と同じ音。下の「声の出し方と子音の改良」）
 *     seed 乱数の種（同じ種なら、同じ音）／ strict:false 読めないところを飛ばして続ける（飛ばしたものは o.diag の配列に入る）
 *     かなの読み方：bidaku:true 語の中の が行を鼻にかける ／ devoice:false 母音の声を抜かない ／ wa:true 語の最後の は・へ を わ・え と読む ／ literal:true 字のとおりに読む
 *
 * ■ 文の書き方：3つの書き方を、1つの文の中にまぜて書ける
 *   かな              ひらがな・カタカナ。実際の発音に直す自動の規則がかかる（下の「かなの自動の規則」）
 *   / 日本語の音素 /  書いたとおりに読む。自動の規則はかからない。細かく決めたいところは、これで書く
 *   [ 英語の音素 ]    英語。つづりは読めないので、発音記号で書く
 *   < 指定 >          速さ・高さ・強さ・間・声・調子を、文の途中から変える
 *   どれにも共通の記号
 *     空白  語の切れ目。日本語では、アクセントのまとまり（文節くらい）ごとに空白を入れる。入れないと、文ぜんたいが1語になって、抑揚がつかない
 *     、,   息つぎ（短い間。高さの山を作り直す）    。.  言い切り（下がる）    ？?  問い（上がる）    ！!  強い言い切り    …  言いよどみ（... でもよい）
 *     '     日本語：アクセントの核。その拍まで高く、次の拍で下がる。拍のあとに書く。書いてない語は平板（下がらない）
 *           英語：強勢。強く読む音節の前に書く（% は第二強勢）
 *     漢字・数字・アルファベットは読めない（エラーになる）。かなに直して書く。助詞の は・へ は、わ・え と書く（または wa:true）
 *
 * ■ 日本語の音素（/ / の中）
 *   母音  a i u e o
 *   子音  k g s z t d n h b p m r w j（や行。y でもよい）
 *         S し  tS ち  ts つ  dZ じ  dz 語頭の ざ行（閉じてから出る）  Z 母音のあいだの じ  F ふ  C ひ  N 鼻にかけた が行
 *         きゃ ぎゃ にゃ ひゃ びゃ ぴゃ みゃ りゃ は kja gja nja hja bja pja mja rja。しゃ ちゃ じゃ は Sa tSa dZa。ふぁ は Fa、てぃ は ti
 *   拍    子音＋(j か w)＋母音 で1拍。母音だけでも1拍。日本語は1拍がほぼ同じ長さになる
 *   ん    母音のつかない鼻音で書く。次の音で決まる： m（ぱ ば ま行の前）／ n（た だ な ら ざ行、ち つ じ の前）／ N（か が行の前）／ X（母音・や行・わ・さ行・は行の前と、文の終わり）
 *   っ    Q、または同じ子音を2つ（kiQte も kitte も「きって」。ほかに kk pp ss SS ttS tts）
 *   長音  母音のあとに :（1拍ぶん伸ばす）。:: はもっと長く、:1.5 は拍の数で。aa と書くと、あ を2回言う
 *   s()   母音を落とす：子音だけを言って切る。des() は「です」を s で切る。mas() は「ます」
 *   k(u)  声を抜く：母音を、声を出さずに息だけで言う。gak(u)se:（がくせい）、S(i)ta（した）、k(i)Qpu（きっぷ）、ts(u)kue（つくえ）
 *         東京の話しことばでは、澄んだ子音（k s S t tS ts h F p）にはさまれた i と u は、ふつう声が抜ける。抜かないと、ていねいに区切った言い方になる
 *   q     ぷつっと切る：母音を急に止める。aq（あっ）、eq（えっ）。文の終わりの「っ」は、Q ではなく、これで書く
 *   例
 *     > /konnitSiwa. kjo':wa i': te'Nkides()./
 *     > /gak(u)se: ga, ts(u)kue no ue ni, k(i)Qpu o okimaS(i)ta./
 *     > /aq, so': des() ka? Sirimase'N deS(i)ta./
 *     > /sampo, kanda, kaNko:, hoXo jo'mu, kaXi./
 *
 * ■ かなの自動の規則（かなで書いたところだけ）
 *   おう → おー、えい → えー、同じ母音の連続 → 長音 ／「ん」は次の音に合わせる ／ 文や句の終わりの「す」と、澄んだ子音の前の「す」「し」は母音が落ちる
 *   き く ち つ ひ ふ ぴ ぷ は、澄んだ子音の前で声が抜ける ／ 語頭と「ん」「っ」のあとの ざ行は dz ／「という」の いう → ゆー
 *   規則の結果は OtoVoice.toPhonemes で見られる。気に入らないところは、返ってきた音素の列を直して使う
 *     > がくせいが つくえの うえに きっぷを おきました。
 *
 * ■ アクセントと抑揚（日本語）
 *   辞書は持っていないので、語のアクセントは書き手が ' で書く。書かなければ、どの語も平板になる（まちがいではないが、棒読みに近くなる）
 *     > あ'めが ふって いま'す。
 *     > あめが ほし'い。
 *     > /ha'Si de tabe'ru./
 *     > /haSi' o wataru./
 *   高さは、藤崎モデル（句の頭で上がってゆっくり下がる山 ＋ 語ごとのアクセントの山）で作る。核のある語のあとは、同じ息のなかで次の語の山が低くなる
 *   文の終わりは記号で決まる：。は下がる、？は最後の拍で上がる、！は強く、… は弱く伸びる、、は少し浮いて続く
 *   強調したい語は、<acc 1.6> … <acc 1> ではさむ（その語の山が大きくなる。平均の高さを保つので、ほかの語は少し下がる）
 *
 * ■ 文の中の指定（< >）：書いたところから先に効く。<> または <reset> で、ぜんぶ元に戻る
 *   音素1つ・拍1つの単位で効くもの（どこに書いてもよい）
 *     <rate 1.3>  速さの倍率（0.25〜4）       <pitch 3>  高さを半音で上下（−36〜36。なめらかに移る）     <vol 0.6>  強さの倍率（0〜3）
 *     <acc 1.6>   アクセントの山の大きさ（0〜4。0 で平ら）   <decl 0.5>  句の頭の山の大きさ（0〜3。0 で、だんだん下がる動きがなくなる）
 *     <pause 0.4> その場に、秒で指定した間を置く
 *   息つぎのところで書くもの（そこで文を切って、別々に作ってつなぐ。語の途中に書くと、そこで短く切れる）
 *     <voice onna>  <style whisper>  <f0 180>  <speed 1.2>  <range 1.4>  <long 1.3>  <gain 0.5>（その区切りの大きさ）
 *     声の質： <size 1.2>  <soft 0.7>  <bright 0.6>  <breathy 0.4>  <rough 0.3>  <shake 0.5>  <whisper 0.5>　／　もとの設定： <scale 1.1>  <oq 0.7>  <breath 0.5>  <sharp 0.6>
 *   1つの < > に、いくつも書ける： <voice onna style joy speed 1.1>
 *   例
 *     > /ano: , <rate 0.8>tSoQto<rate 1> , <pitch 3>ma'Qte<pitch 0> kudasa'i./
 *     > <voice onna>ねえ、きいて。<voice otoko style panic>たいへんだ！<voice onna style whisper>しずかに…
 *     > <acc 0><decl 0>/ware ware wa , <pitch 4>u<pitch 0>tSu:<pitch -3>dZiN<pitch 0> da./
 *     > きょ'うわ <acc 1.7>ぜったいに<acc 1> いきま'せん。<pause 0.6>わかりま'したか？
 *
 * ■ 声の質：数で、連続して動かす（話す・歌うで同じ名前。書かなければ、その声のまま）
 *   size    体の大きさ（口の共鳴ぜんたいの倍率）。1＝大人の男、1.09＝高い男、1.15＝女、1.32＝子供。0.7〜1.7（小さいほど、大きな体の声）
 *   soft    やわらかさ 0〜1。0＝硬く張った声、0.45＝ふつう、1＝やわらかく丸い声
 *   bright  明るさ 0〜1。0＝こもった声、0.5＝ふつう、1＝明るく鋭い声
 *   breathy 息まじり 0〜1。0＝息なし、1＝息がたっぷりまじる
 *   rough   ざらつき 0〜1（声帯のふるえの不ぞろい。しわがれ声）
 *   shake   ふるえ 0〜1（話し声は細かい震え、歌声はビブラートが深くなる）
 *   whisper 囁き 0〜1（1 で、声帯を鳴らさない囁き声）
 *   話し声の高さは f0（Hz）で決める。歌声の高さは音符で決まる
 *   書く場所は3つ
 *     設定          OtoVoice.speak(文,{f0:190,size:1.12,soft:.7,breathy:.3})　／　OtoVoice.sing(譜面,{size:1.25,bright:.7})
 *     文の中        <f0 190 size 1.12 soft 0.7> のように、息つぎのところに書く（話し声だけ）
 *     名前をつける  OtoVoice.VOICES.haha={f0:190,size:1.12,soft:.7,breathy:.3} と足しておくと、{voice:'haha'}、<voice haha>、譜面の voice haha で使える
 *   声の見本に、項目を足して動かすこともできる： {voice:'onna',size:1.25,rough:.3}
 *   ★ 大きさ（size）と、聞こえ方（1.4.3。2026-11-28 に、大きさだけを変えた聴きくらべを人が聴いた結果）
 *       1.05 男が女のふりをしている ／ 1.15 低めの声の女 ／ 1.25 平均的な高さの声の女 ／ 1.45 子供 ／ 1.55 やや幼い子供（1.35 は、聞いていない）
 *     見本の onna（1.15）は「低めの女」、kodomo（1.32）は「平均より少し高い女」に聞こえる。ふつうの女の声がほしいときは josei、子供の声がほしいときは warabe を使う
 *     josei 女（平均）1.25 ／ wakai 若い女 1.35 ／ warabe 子供 1.45 ／ osanago やや幼い子供 1.55（これまでの声は、名前も音も変えていない）
 *   歌声では、size が見本と同じ値（otoko 1、tenor 1.0882、onna 1.1471、kodomo 1.3235）のとき、見本そのものの声になる。あいだの値は、となりあう見本をなめらかにつないだ声
 *   例
 *     > <f0 95 size 0.9 soft 0.3 rough 0.5>わしが そんちょ'うじゃ。<f0 260 size 1.3 bright 0.7>ほんとう？<f0 180 size 1.1 soft 0.8 breathy 0.5>しずかに しなさ'い。
 *   (推定) 項目から芯の設定への直し方は、見積もり。歌声の bright は、息の多い声では効きが小さい（高い側を息の音が占めるため。breathy を下げると効く）
 *
 * ■ 声のテンプレート 20個（voice に名前を書く。話す・歌うの両方で使える。項目を足せば、そこから動かせる： {voice:'jiji', rough:.8}）
 *   子供        youji 幼い子 ／ shounen 少年 ／ shoujo 少女
 *   女          musume 明るい若い女 ／ yasashii やさしい女（やわらかく、息まじり）／ otona 落ち着いた女 ／ kinkin 甲高い声（硬く鋭い）
 *   男          seinen 青年 ／ kibikibi きびきびした男（硬く通る。司令・アナウンス）／ odayaka おだやかな男 ／ shibui 渋い男（少しかすれ）／ teion 低く太い男
 *   どちらでも  chuusei 中性的な声
 *   年配        jiji おじいさん ／ baba おばあさん（ざらつきと、ふるえ）
 *   変わった声  kyojin 巨人 ／ kobito 小人・妖精 ／ sasayaki ささやき ／ shagare しゃがれ声 ／ furue ふるえ声
 *   どれも、声の質の項目（f0 size soft bright breathy rough shake whisper）だけで書いてある。値は OtoVoice.VOICES.名前 で見られる
 *     > <voice jiji>むかし むかしの はなしじゃ。<voice youji>それで、どう なったの？<voice kyojin>だれだ。<voice sasayaki>しずかに。
 *   (推定) 値は、聴かずに決めた見積もり。確かめたのは、20個が互いにちがう音になっていること（高さ・帯ごとの強さ・周期のそろい方を測った）と、
 *          英語の文を話させて音声認識に聞かせ、ことばが崩れていないこと。巨人・小人・ささやきは、ほかより聞き取りにくい
 *
 * ■ 英語（[ ] の中）
 *   母音  i(beat) I(bit) E(bet) {(bat) A(father) O(thought) U(book) u(boot) V(but) @(about) 3(bird)  eI aI oU aU OI
 *   子音  p b t d k g tS dZ f v T(thin) D(this) s z S Z h m n N(sing) l L(語末の暗い l) r w j 4(はじく t)
 *   ' は次の音節に第一強勢、% は第二強勢、: は母音を伸ばす。空白が語の切れ目。強勢のない音節は、短く弱くなる
 *     > [ h@'loU, 'haU A:r 'ju? ]
 *     > かくき、さんかいして こうげきせよ。[ 'klIrd tu In'geIdZ. ]
 *
 * ■ 歌（OtoVoice.sing）
 *   譜面は、音符の行と歌詞の行を交互に書く。音符：C4 D#4 Bb3、休みは R、長さは :2（拍の数）、強く ! 弱く ?。tempo 120、voice onna（otoko tenor kodomo）
 *   歌詞の書き方は3つ。1行の中にまぜて書ける。どれも、1つが音符1つに当たる（数が合わないと、エラーになる）
 *     かな              1拍が音符1つ（ん・ー も1つ。っ は前の拍につく）
 *     / 日本語の音素 /  1拍が音符1つ。話し声と同じ記号。歌では、母音は落とせない（s() k(u) は、母音をつけて歌う）
 *     [ 英語の音節 ]    1音節が音符1つ。音節ごとに空白で区切る。記号は、話し声の [ ] と同じ
 *                       1音節 ＝ 頭の子音（いくつでも）＋ 母音1つ ＋ 語末の子音（いくつでも）： strit（street）、frEndz（friends）、wVn d@r（won-der）
 *                       母音のない音節は書けない： little は lI t@l、button は bV t@n、rhythm は rI D@m
 *                       - は、前の音節を次の音符へ伸ばす。語末の子音と、二重母音の終わりの滑りは、伸ばした最後の音符で鳴る： laIt - （light を2音符で）
 *                       強勢の印 ' % と : は、歌では読みとばす（強さは音符の ! ? で書く）
 *   【裏】【ミ】【地】【叫】【荒】【鋭】【囁】【返】【跳】で、声の出し方を途中から変える（どの書き方の中でも使える）。< > は、歌詞では使えない（高さと長さは音符で書く）
 *   --- 譜面
 *   tempo 120
 *   voice onna
 *   C4 D4 E4 F4 G4:2
 *   /ka ze ni na Q te/
 *   A4 G4 E4:2
 *   そ【裏】/ra e/
 *   ---
 *   --- 譜面（英語）
 *   tempo 100
 *   voice onna
 *   C4 C4 G4 G4 A4 A4 G4:2
 *   [ twIN k@l twIN k@l lI t@l stAr ]
 *   F4 F4 E4 E4 D4 D4 C4:2
 *   [ haU aI wVn d@r wVt ju Ar ]
 *   ---
 *   --- 譜面（日本語と英語）
 *   tempo 110
 *   voice onna
 *   E4 E4 G4 A4:2 A4 G4 E4 D4 C4:2
 *   よぞらに [ SaI nIN lI t@l stAr ]
 *   ---
 *
 * ■ 手で書く行（OtoVoice.speakRows）：音素1つを1行に書いて、長さ・高さ・強さ・声の質を、書いたとおりに鳴らす（1.4）
 *   かなの文は、アクセントの山や拍の長さを自動で決める。行は、それをぜんぶ書き手が決める。自動の規則は、かからない
 *   書式（# から行末は注釈）
 *     はじめに書くもの    voice 名前 ／ f0 数（高さの基準 Hz。書かなければ、声の高さ）／ nat on|off ／ con on|off ／ smooth 数（高さの線の丸め。ミリ秒）／ seed 数
 *     どこでも書けるもの  lang ja|en（ここから先の音素を、日本語として・英語として作る）
 *     音素の行            音素  長さ（ミリ秒）  項目 値 …
 *     間の行              _  長さ（ミリ秒）
 *   音素の記号は、話し声の / / と [ ] の中と同じ（日本語の う は u、ら行は r）。長い母音・っ は、長さで書く（っ は、次の子音を長くする）
 *   項目
 *     p 値 …               高さの通過点。値は、音名（A3、C#4、A3+30 はセント）／ 220hz ／ 基準からの半音（+2、-3.5、0）。うしろに @位置（その音素の頭から％）
 *                          位置をぜんぶ省くと、1つは真ん中、2つは頭と終わり、3つ以上は等間隔。一部に書くときは、頭と終わりだけ省ける。書かない行は、前後の点のあいだを通る
 *     vib 深さ 速さ 遅れ   その音素の中で、高さをゆらす（半音、Hz、ミリ秒）
 *     vol 数               強さの倍率
 *     soft bright breathy  声の質（0〜1）。書いた行から先に効き、行の真ん中どうしを、なめらかにつなぐ（文を切らない）
 *     creak 数             きしみ（0〜1）。語尾の、がらがらした声
 *     asp 数               p t k のあとの息の長さ（ミリ秒）      noise 数   子音の雑音の強さの倍率      unv   母音の声を抜く
 *     nc 数  nq 数         子音の雑音の山の中心（Hz）と鋭さ      n2 中心 鋭さ 強さ   2つめの山を足す      click 数   破裂の頭の衝撃の倍率（0 で無し）
 *     mix 母音 数          ほかの母音へ寄せる（0〜1）            f1 f2 f3 数   共鳴の高さを、Hz でずらす
 *   --- 行
 *   voice onna
 *   f0 215
 *   k    60   asp 20
 *   j    66   p +4.6
 *   o    150  p +5.4 +5.8@25 +4.0@60 +1.8@100   soft .3 bright .7
 *   w    55   p +1.0
 *   a    100  p +0.8 +1.3 +1.8                  soft .5 bright .55
 *   _    300
 *   ---
 *   読み戻し：speakRows の返り値の .report（checkRows も同じもの）。耳のない書き手が、結果を確かめるためのもの
 *     .text      行ごとの表（頭の時刻、実際の長さ、書いた高さ、音名、音から測った高さ、強さ、子音の雑音の山）と、注意
 *     .rows      同じ中身を、数で      .warnings   注意の一覧 [{line, msg}]
 *     注意が出るのは：書いた長さにできなかった／母音が 40 ミリ秒より短い／高さの動きが急すぎる／長い母音の高さが動かない／母音の長さがどれも同じ／
 *                     破裂音が短すぎる／息が次の音素の半分ちかく／測った高さが指定と半音より大きくずれた
 *   句の終わりの音素には、消えぎわの余韻がつく。そのぶんは次の間の中に入るので、全体の時刻は、書いた長さの合計になる
 *   作りの下限より短くは書けない音素がある（破擦音は約 123 ミリ秒、や行の j は約 66 ミリ秒）。そのときは、注意が出る
 *   OtoVoice.toRows(文) は、かなの文を、自動の規則をかけた結果の行に直す。ほぼ同じ長さ・同じ高さの動きで鳴るので、そこから気になる行だけを直せる
 *   書くときの目安（(推定) 音声学の一般的な値からの見積もり。この目安で書いた見本を、人が聴いて「自動より良い」と確かめた）
 *     ・アクセントの山では声を張り（soft .3 bright .7）、句の終わりへゆるめる（soft .7、breathy .3）。山の高さは、あとの語ほど低くする
 *     ・澄んだ子音（k s t など）のあとの母音は、半音ほど高く入って、目標へ下がる。濁った子音（d z など）のところは、半音ほど沈める
 *     ・母音の長さは、そろえない。句の終わりは 1.5〜2 倍に伸ばし、助詞や「です」の う は短く、弱く（vol .7）
 *     ・い は、あ・お より弱く鳴る（読み戻しの「強さ」で見える）。強めたい い には vol 1.3
 *     ・問いは、最後の母音を長くして、後ろの半分で大きく上げる。言い切りは、最後の母音で 5 半音ほど下げ、creak .3 を足す
 *     ・p t k の息（asp）は、次の母音の3分の1より短く
 *
 * ■ 声の出し方と子音の改良（nat・con）：話し声の音づくり（1.4 から、書かなければ入る）
 *   nat（声の出し方）  sync 息の雑音を声帯の開閉に合わせる ／ jit・shim 1周期ごとの長さと強さのゆらぎ ／ drift 高さのゆっくりした漂い ／ b1 声帯が開いているあいだ第1共鳴の幅を広げる
 *   con（子音）        vmod 濁った摩擦音の雑音を声に合わせる ／ bands 雑音の山の形（さ行・しゃ行のすそを切り、2つめの山を足す）／ click 破裂の頭の衝撃 ／
 *                      tap ら行を短く閉じてはじく ／ round お・う の前で、さ行・しゃ行の雑音を低く ／ vbar 濁った破裂音のうなり ／ vz 濁った摩擦音の雑音を弱め、声を強める
 *   書き方  {nat:false, con:false} で、1.3.0 と同じ音（同じ波形）。1つずつ選ぶなら {con:{vmod:1, tap:1}}（書かないものは切れる）。行では、はじめに nat off ／ con off
 *
 * ■ 歌の音符ごとの指定（1.4）：音符のうしろに書く
 *   C4+30         セントで上げ下げ（C4-20 は 20 セント低く）
 *   C4:2{…}       { } の中に、項目を , で区切って書く
 *     vib 数      ゆらしの深さの倍率（0 で無し、1 でふつう。短い音符でも、書けばゆれる）      rate 数   ゆらしの速さ（Hz。ふつうは 5.5）      delay 数   ゆれはじめるまでの秒（ふつうは 0.19）
 *     scoop 数    頭を、何半音下から入るか（0 でまっすぐ。負の数は、上から）                    cent 数   セント
 *     p 半音@位置/…   音符の中の高さの線。位置は、音符の頭から％。点のあいだは、まっすぐ（p -1@0/0@25/0@80/-2@100）
 *   o.nat  歌い方の改良（書かなければ入る。{nat:false} で、これまでと同じ音）：dip 濁った子音で高さが沈み、澄んだ子音のあとは少し高く入る ／ prep 大きく跳ぶ前に、反対へ少し振れる
 *   --- 譜面（音符ごとの指定）
 *   tempo 96
 *   voice onna
 *   C4{scoop 1.5} D4 E4:2{vib 1.4, delay .25} G4+15 E4 D4:2{p 0@0/0@60/-1.5@100, vib 0}
 *   そ ら へ と ん で
 *   ---
 *   これまで、# のつく音名（C#4）は、# から先が注釈として切られて、エラーになっていた。1.4 で直した（注釈の # は、行の頭か、空白のあとに書く）
 *
 * ■ AI が台詞を書くときの手順
 *   1 まず、かなで書く。文節ごとに空白を入れ、下がり目のある語に ' を打つ。漢字・数字は、かなに直す
 *   2 OtoVoice.check(文) を通す。ok が false なら errors を読んで直す。kana が、思ったとおりの読みになっているかを見る
 *   3 読み方を細かく決めたいところは、OtoVoice.toPhonemes(文) で音素の列にしてから、そこを書きかえる（母音を落とす・残す、ん の音、長さ、切り方）
 *   4 気持ちは style で大きく決め、語の強調は <acc>、言いよどみは <rate> と … と <pause>、驚きは <pitch> と q、ひそひそ声は <style whisper> で足す
 *   5 話し手が代わるところは <voice 名前>。1つの文字列に、何人ぶんでも続けて書ける
 *
 * ■ 知っておくこと
 *   ・1.4 の話し声の改良（声の出し方・子音）と、手で書いた行の見本は、人が聴いて「前より良い」と確かめた。歌声の 1.4 の足しものは、まだ聴いて確かめていない
 *   ・それより前の部分は、音を耳で聴いて確かめたものではない（音の出ない環境で作った）。確かめたのは、書いたとおりの長さ・高さ・音素の列になっていることと、
 *     これまでの書き方（かな、[ ]）の文が、足す前の RSP と同じ波形になること、かなを音素に直しても同じ波形になること
 *   ・(推定) 声の見本（VOICES）、声の質の項目の効き方、調子ごとの大きさは、見積もりの値
 *   ・話し声は 16kHz（8kHz から上の音はない）、歌声は 32kHz。まぜて鳴らすと、明るさがちがう
 *   ・長い文は、作るのに時間がかかる（話し声は実時間の数百倍の速さ、歌声は、はじめての長い曲で数秒）。画面を止めたくなければ、文を短く区切って作る
 *   ・無線機（radio）は、送信ごとの最大の音に合わせて丸めるので、1回の送信を1文ずつにする
 */
(function(root){
/*<SPEECH-CORE>*/
/* ---------- 話し声 ----------
   文を、いったん発音記号（音素）の列に直してから、音にする。音素ごとに、口の共鳴の形・雑音・声帯の有無・長さが決まっていて、前後の音にあわせて滑らかにつなぐ。
   声そのものは、声帯の波を3つの共鳴に通して作る。

   日本語：ひらがな・カタカナで書く。音素に直すときに、次のことが起きる
     ・「ん」は、次の音で変わる（ぱ・ば・ま行の前は m、た・だ・な・ら・ざ行の前は n、か・が行の前は ŋ、母音や文末の前は口の奥の ɴ）
     ・「おう」「えい」と、同じ母音の連続は、長い母音になる（こうげき → koːgeki、めいちゅう → meːtɕɯː）
     ・文や句の終わりの「す」と、声を使わない子音にはさまれた「す」「し」は、母音が落ちる（です → des、ました → maɕta）
     ・「ひ」は ç、「ふ」は ɸ、ら行は弾き音 ɾ
     拍のすぐあとに「'」を書くと、そこがアクセントの核。書かなければ、語ごとに適当に決める
   英語：[ ] の中に、発音記号（X-SAMPA 風の ASCII）で書く。空白が語の切れ目、' は次の音節に第一強勢、% は第二強勢
     母音  i(beat) I(bit) E(bet) {(bat) A(father) O(thought) U(book) u(boot) V(but) @(about) 3(bird)  eI aI oU aU OI
     子音  p b t d k g tS dZ f v T(thin) D(this) s z S Z h m n N(sing) l L(暗い l) r w j 4(弾き音)
     強勢のある音節は長く・高く・強く、ない音節は短く弱く。強勢の前の p t k は息をともなう。母音は、濁った子音の前で伸び、澄んだ子音の前で縮む
   共通の記号：空白は語の切れ目、「、」「,」は息つぎ、「。」「.」は言い切り（下がる）、「？」は上がる、「！」は強く言い切る、「…」は言いよどむ、「ー」は伸ばす、「〜」はもっと伸ばす、「っ」は詰まる

   speak(text,o)：o.f0 声の高さ（Hz。男は100〜130、女は200〜250）／o.scale 共鳴ぜんたいの倍率（女は1.15〜1.2）／o.speed 速さ／o.oq 声帯が開いている割合（大きいほど柔らかい声）
   ／o.breath 息まじりの量／o.range 抑揚の幅の倍率／o.long 伸ばす長さの倍率／o.style 'calm' 冷静・'panic' 焦り・'joy' 歓喜
   調子（STY）：sp 速さ／pm 高さ／rg 抑揚の幅／jit 高さのふらつき／trem 震え／lng 文末の伸ばし／amp 強さ／br 息／crack 声が裏返る拍の割合／up 句の頭と終わりを持ち上げる量 */
/* 話し声の合成（RSP）。「深夜放送」のために作り直した版に入れ替えた（もとは「上空」の RSP）。
   口の共鳴を直列6つにし、鼻音には鼻の共鳴と谷を足し、子音は種類ごとに、母音への共鳴の渡り・閉鎖・破裂・息を作り分ける。
   speak(文,{jp:'new'}) で、日本語もこの新しい道すじで作る（指定しなければ、日本語だけの文は元の音のまま。[ ] の英語を含む文は、いつも新しい道すじ）。
   新しい道すじでは、かなと実際の音のずれも直す：母音の無声化（です・した）、長音（おう→おー、えい→えー）、「ん」の同化、語頭のざ行の破擦。
   ほかの指定：style 'sad' 'whisper'、sharp（声の硬さ）、bidaku:true（鼻濁音）、devoice:false、literal:true（かなのとおりに読む）、wa:true（語の最後の は・へ を、助詞の わ・え として読む）、fuji:false（高さを、もとの作り方で）
   日本語の高さは、藤崎モデルで作る（下の fuji）。アクセントの核は、拍のあとの ' で書く。書いてない語は、平板 */
const RSP_H={rnd:(a,b)=>a+Math.random()*(b-a),clamp:(x,a,b)=>x<a?a:x>b?b:x,mix:(a,b,t)=>a+(b-a)*t};
const RSP=(function(){const {rnd,clamp,mix}=RSP_H;
return (()=>{
  const SRV=16000,NEU=[400,1700,2600];
  // 母音：共鳴 F1,F2,F3（男の声の値）、英語での基準の長さ（秒）、二重母音は滑っていく先の形。M は日本語の「う」
  const VW={a:[730,1250,2500,.09],i:[290,2250,2950,.085],M:[330,1300,2350,.07],e:[480,1900,2550,.07],o:[480,880,2500,.09],
    I:[390,1990,2550,.05],E:[530,1840,2480,.062],'{':[660,1720,2410,.095],A:[730,1090,2440,.095],O:[570,840,2410,.095],U:[440,1020,2240,.052],u:[300,870,2240,.085],V:[640,1190,2390,.058],'@':[500,1500,2500,.034],'3':[490,1350,1690,.09],
    eI:[480,1950,2550,.115,[330,2200,2800]],aI:[730,1200,2500,.135,[400,2000,2600]],oU:[540,1000,2400,.115,[360,850,2300]],aU:[720,1350,2450,.135,[430,950,2300]],OI:[550,850,2400,.135,[380,2000,2600]]};
  // 破裂音・破擦音：[雑音の中心, Q, 長さ(秒), 強さ, 声帯が鳴るか]
  const STOP={k:[2000,3,.02,.6,0],g:[1900,3,.012,.35,1],t:[4300,1.6,.016,.5,0],d:[3800,1.6,.01,.3,1],p:[900,1.5,.012,.4,0],b:[800,1.5,.008,.25,1],tS:[3200,2,.05,.5,0],ts:[5200,1.6,.045,.45,0],dZ:[3000,2,.04,.35,1]};
  // 摩擦音：同じ並び。C は「ひ」の ç、F は「ふ」の ɸ、T・D は英語の th
  const FRIC={s:[5600,1.4,.055,.3,0],z:[5200,1.4,.04,.22,1],S:[3200,2,.06,.38,0],Z:[3000,2,.045,.25,1],f:[4200,.8,.04,.14,0],F:[4200,.8,.04,.14,0],C:[3600,2,.045,.2,0],v:[4000,.8,.035,.09,1],T:[4800,.9,.045,.12,0],D:[4200,.9,.03,.06,1]};
  // 鼻音：共鳴の形。X は日本語の語末の「ん」（ɴ）
  const NAS={m:[280,1050,2500],n:[280,1500,2500],N:[280,1900,2600],X:[280,1300,2400]};
  // 接近音：[F1,F2,F3, 強さ, 長さ(秒)]。r は F3 が低い（英語の r の色）。L は語末の暗い l
  const APX={l:[360,1250,2700,.5,.05],L:[450,870,2600,.5,.06],r:[420,1300,1600,.55,.055],w:[300,650,2200,.5,.045],j:[270,2100,3000,.5,.04]};
  /* ---- 英語（作り直し）の表 ----
     元の英語は、3つの共鳴を並べて同じ割合で足す作りで、子音はどれも「母音とまんなかの口の形のあいだ」から始まっていた。新しい道すじは、
       ・共鳴を直列につなぐ（母音ごとの山の高さの釣り合いが、ひとりでに合う）。高い共鳴を3つ足す（3.3、3.75、4.9kHz。動かさない）
       ・子音ごとに、口のどこを閉じるかで決まる出発点（ローカス）から、母音へわたる。わたりの長さは、場所ごとに違う
       ・p t k は、閉鎖 → 破裂 → 息（強勢の前で長い）→ 声。b d g は、閉鎖のあいだ低くうなる
       ・鼻音は、鼻の共鳴（270Hz）と谷（450Hz）を入れた、こもった音。出入りは急に変わる
       ・長さは、音ごとの「もとの長さ」と「最小の長さ」から、規則で決める（句の最後で伸び、強勢がないと縮み、澄んだ破裂音の前で縮む…）
     母音の値（共鳴 F1〜F3 と幅 B1〜B3、二重母音の行き先）と、w y r l の値は Klatt (1980) の表から。長さの規則と、もとの長さ・最小の長さは Klatt (1979) から。
     破裂音の息の長さは、Lisker と Abramson の値（p 58、t 70、k 80 ミリ秒。単語を1つずつ読んだとき）より短くしてある（つづけて話すときは短い）。
     (推定) 次のものは、文献の値ではなく、機械の聞き取り（Whisper と PocketSphinx）を見ながら私が決めた：
       ・Klatt の表から動かした母音（i、æ、ɑ、aɪ と aʊ の入り）。あいまい母音、暗い l、鼻音の共鳴と幅
       ・ローカスの式（傾きは Sussman らの測定 唇 .91／歯ぐき .54／奥 .79 を目安にしたが、切片と、歯・歯ぐきの後ろの式は見積もり）
       ・わたりの長さ、破裂と摩擦の雑音の帯域と強さ、破擦音の長さ、母音の強さのそろえ方 */
  // 母音：F1,F2,F3,B1,B2,B3（入り）、F1,F2,F3（終わり）、もとの長さ・最小の長さ（ミリ秒）
  const EV={i:[300,2250,2950,45,130,250,285,2300,3000,160,50],I:[400,1800,2570,50,100,140,470,1600,2600,130,40],eI:[480,1720,2520,70,100,200,330,2020,2600,190,70],
    E:[530,1680,2500,60,90,200,620,1530,2530,150,60],'{':[700,1750,2450,70,130,300,720,1620,2470,230,60],A:[730,1100,2500,100,80,160,730,1100,2500,240,80],
    O:[600,990,2570,90,100,80,630,1040,2600,240,80],V:[620,1220,2550,80,50,140,620,1220,2550,140,50],oU:[540,1100,2300,80,70,70,450,900,2300,220,70],
    U:[450,1100,2350,80,100,80,500,1180,2390,160,50],u:[350,1250,2200,65,110,140,320,900,2200,210,60],'3':[470,1270,1540,100,60,110,420,1310,1540,180,60],
    aI:[710,1260,2550,100,70,200,400,1880,2500,250,90],aU:[730,1350,2500,90,80,140,450,950,2350,260,100],OI:[550,960,2400,80,50,130,360,1820,2450,280,110],
    '@':[500,1400,2500,80,90,150,500,1400,2500,120,40],
    // 日本語の母音（あ え お う。「い」は英語の i と共用）。長さは、拍の長さから決めるので、ここには持たない
    a:[730,1250,2500,90,90,160,730,1250,2500],e:[480,1900,2550,60,100,200,480,1900,2550],o:[480,880,2500,80,80,120,480,880,2500],M:[330,1300,2350,60,100,150,330,1300,2350]};
  // 子音：[作り方, 閉じる場所, 声帯が鳴るか, もとの長さ, 最小の長さ]。作り方 s 破裂 / a 破擦 / f 摩擦 / n 鼻 / x 接近 / h 息 / 4 はじき。場所 l 唇 / a 歯ぐき / v 奥 / d 歯 / p 歯ぐきの後ろ
  const EC={p:['s','l',0,85,50],b:['s','l',1,85,60],t:['s','a',0,65,40],d:['s','a',1,75,50],k:['s','v',0,80,60],g:['s','v',1,80,60],tS:['a','p',0,125,75],dZ:['a','p',1,105,65],
    f:['f','l',0,100,80],v:['f','l',1,60,40],T:['f','d',0,110,80],D:['f','d',1,50,30],s:['f','a',0,125,50],z:['f','a',1,75,40],S:['f','p',0,125,50],Z:['f','p',1,70,40],
    m:['n','l',1,75,60],n:['n','a',1,70,55],N:['n','v',1,85,60],l:['x','a',1,80,40],L:['x','a',1,80,40],r:['x','a',1,80,30],w:['x','l',1,80,60],j:['x','p',1,80,50],h:['h','',0,80,20],'4':['4','a',1,20,20],
    ts:['a','a',0],dz:['a','a',1],F:['f','l',0],C:['f','p',0],X:['n','u',1]};       // 日本語だけの子音：つ、語頭の ざ行（dz）、ふ、ひ、語末の ん
  const NASM={m:[480,1100,2150,40,400,520],n:[480,1600,2600,40,400,520],N:[480,2100,2600,40,400,520],X:[480,1350,2450,40,400,520]},NP=270,NZ=450,
    APT={w:[290,610,2150,50,80,250],j:[260,2200,3000,40,150,300],r:[310,1060,1380,70,100,120],l:[310,1050,2880,50,100,280],L:[430,850,2750,60,90,200]},
    VOT={l:.045,a:.055,v:.065},TRP={l:.04,a:.05,v:.06,d:.04,p:.05,u:.03},
    BUR={l:[1000,.5,.4],a:[4800,1.1,.45],v:[2500,3,.7]},                      // 破裂の雑音：[中心, Q, 強さ]。奥（k g）の中心は、次の母音で動かす
    FRS={s:[6000,1.3,.36,0],z:[6000,1.3,.22,.35],S:[2800,2.6,.4,0],Z:[2800,2.6,.22,.35],f:[2800,.35,.035,0],v:[2800,.35,.012,.42],T:[4200,.4,.035,0],D:[2500,.35,.005,.42],tS:[3400,1.3,.5,0],dZ:[3400,1.3,.4,.12],ts:[5600,1.3,.36,0],dz:[6000,1.3,.26,.2],F:[2200,.4,.05,0],C:[3800,1.6,.22,0]};   // 摩擦の雑音：[中心, Q, 強さ, 声の強さ]
  // ローカス：子音と母音の境い目での共鳴。母音の F2 から、場所ごとの直線で決める（傾きは、唇で急、歯ぐきでゆるい）
  const LOC={l:[.75,130],a:[.5,900],v:[.79,600],d:[.5,800],p:[.5,950],y:[.3,1600]};       // y は、日本語の し・ち・じ・ひ（舌の前を上あごに寄せる）
  function locus(pl,F){const f2=F[1],f3=F[2],L=LOC[pl]||LOC.p,x=L[0]*f2+L[1];
    if(pl==='l')return[230,x,f3-350];
    if(pl==='a')return[230,x,.4*f3+1620];
    if(pl==='v'){const y=Math.min(2350,x);return[230,y,Math.max(2050,Math.min(2950,y+450))]}
    if(pl==='d')return[260,x,.5*f3+1270];
    return[250,x,.3*f3+1950]}
  // 日本語：子音の長さ（ミリ秒）と、1拍の長さ（秒）。母音は、拍の残りを埋める（拍の長さがそろう）
  const PZ=2.1,JD={k:62,g:50,s:80,z:60,t:55,d:45,n:48,h:55,b:50,p:62,m:52,'4':24,S:85,tS:80,ts:80,dZ:62,dz:65,N:50,F:65,C:70,j:40,w:50},JT=.105;      // PZ＝息つぎの間の倍率（藤崎モデルで作るとき）。1拍の長さと間は、参照の声（1拍 0.106〜0.131 秒、間 0.44〜0.71 秒）に寄せた
  const STY={calm:{sp:1,pm:1,rg:.85,jit:.03,trem:0,lng:1,amp:1,br:0,crack:0,up:0},
    panic:{sp:1.3,pm:1.24,rg:1.5,jit:.1,trem:.035,lng:1.45,amp:1.25,br:.5,crack:.13,up:.06,eff:.25,pz:.55,gasp:.5,fs:1.02},
    joy:{sp:1.1,pm:1.15,rg:1.7,jit:.05,trem:0,lng:1.75,amp:1.15,br:.15,crack:0,up:.11,eff:.2,pz:.85,fs:1.05},
    // 下の2つと、上の eff・pz・gasp・fs は、新しい道すじで足したもの（(推定) 値は私の見積もり）
    sad:{sp:.86,pm:.92,rg:.55,jit:.05,trem:.012,lng:1.25,amp:.85,br:.35,crack:0,up:0,eff:-.25,pz:1.4},
    whisper:{sp:.9,pm:1,rg:.5,jit:.03,trem:0,lng:1,amp:.9,br:0,crack:0,up:0,wh:1,pz:1.1}};
  const KT={},CMAP={sh:'S',j:'dZ',ch:'tS',f:'F',r:'4',ng:'N'};
  ('あa いi うu えe おo かka きki くku けke こko さsa しshi すsu せse そso たta ちchi つtsu てte とto なna にni ぬnu ねne のno '+
   'はha ひhi ふfu へhe ほho まma みmi むmu めme もmo やya ゆyu よyo らra りri るru れre ろro わwa をo '+
   'がga ぎgi ぐgu げge ごgo ざza じji ずzu ぜze ぞzo だda ぢji づzu でde どdo ばba びbi ぶbu べbe ぼbo ぱpa ぴpi ぷpu ぺpe ぽpo').split(' ').forEach(p=>{KT[p[0]]=p.slice(1)});
  const punct=(ch,T)=>{if(ch==='。'||ch==='.')T.push({p:2,e:'f'});else if(ch==='？'||ch==='?')T.push({p:2,e:'q'});else if(ch==='！'||ch==='!')T.push({p:1.5,e:'x'});
    else if(ch==='…')T.push({p:2.8,e:'d'});else if(ch==='、'||ch===',')T.push({p:1.2});else if(/\s/.test(ch)){if(T.length&&!T[T.length-1].w&&!T[T.length-1].p)T.push({w:1})}else return false;return true};
  /* ---- 日本語：かな → 拍の列 → 音素の列 ---- */
  /* X があるとき（新しい道すじ）は、かなの字づらと実際の音のちがいを直す：
       ・「という」「そういう」の いう → ゆー。「ている」「でいく」の て＋い は、長い母音にしない（えいが・せんせい は、えー）
       ・き く ち つ ひ ふ ぴ ぷ の母音は、澄んだ子音にはさまれると声が出ない（つくえ、きっぷ、ふたつ、がくせい）
       ・ざ ず ぜ ぞ は、語の頭と「ん」「っ」のあとでは、いったん閉じる（dz）
       ・X.bidaku なら、語の中の が行 を、鼻にかける（鼻濁音。かがみ、おんがく、助詞の が）
     「=」は、その語が平板（下がり目なし）という印 */
  function parse(text,X){
    const T=[];let src=String(text);if(X)src=src.replace(/(^|[\s、。！？!?…とうあ])いう/g,'$1ゆー');
    const CH=[...src];
    for(let ci=0;ci<CH.length;ci++){const ch0=CH[ci];
      let ch=ch0;const cc=ch.charCodeAt(0);if(cc>=0x30a1&&cc<=0x30f6)ch=String.fromCharCode(cc-0x60);
      const last=T[T.length-1];
      if(KT[ch]){const r=KT[ch];let c=r.slice(0,-1),g='';if(c==='y'||c==='w'){g=c;c=''}
        if(X){const ini=!last||last.w||last.p;if(c==='g'&&X.bidaku&&!ini)c='ng';else if(c==='z'&&X.dz&&(ini||last.n||last.q))c='dz'}
        // 長い母音：同じ母音がつづくとき、「お」のあとの「う」、「え」のあとの「い」
        if(!c&&!g&&ch!=='を'&&last&&(last.v||last.l)&&last.lv&&(r===last.lv||(last.lv==='o'&&r==='u')||(last.lv==='e'&&r==='i'&&!(X&&(last.c==='t'||last.c==='d')&&last.v==='e'&&'るまたてなくきけいれろ'.includes(CH[ci+1]||'')))))T.push({l:1,lv:last.lv});
        else T.push({c,g,v:r.slice(-1),lv:r.slice(-1)})}
      else if('ゃゅょ'.includes(ch)&&last&&last.v){last.v=last.lv={'ゃ':'a','ゅ':'u','ょ':'o'}[ch];if(last.c!=='sh'&&last.c!=='ch'&&last.c!=='j')last.g='y'}
      else if('ぁぃぅぇぉ'.includes(ch)&&last&&last.v)last.v=last.lv={'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o'}[ch];
      else if(ch==='ん')T.push({n:1});else if(ch==='っ')T.push({q:1});else if(ch==='ー')T.push({l:1,lv:last&&last.lv});else if(ch==='〜'||ch==='～')T.push({l:2.6,lv:last&&last.lv});
      else if(ch==="'"){if(last)last.ac=1}
      else if(ch==='='){if(last)last.hb=1}
      else if(cc>=0xE000&&cc<0xF000)TGS.push([T.length,cc-0xE000]);                                     // 指定（< >）の印
      else if(!punct(ch,T)&&DIAG&&/[\u3400-\u9fff々A-Za-z0-9０-９]/.test(ch))note('読めない文字「'+ch+'」（かなと記号だけが読めます。漢字や数字は、かなに直してください。音素は / / の中、英語は [ ] の中）',ch);
    }
    // 助詞の「は」「へ」を、わ・え と読む（{wa:true} をつけたときだけ。語の最後の は・へ を助詞とみなすので、「げきは（撃破）」「よは（余波）」のような語があると読みまちがえる。ふだんは、台詞のほうに わ・え と書く）
    if(X&&X.wa){let a=0;while(a<T.length){let b=a;while(b<T.length&&!T[b].w&&!T[b].p)b++;
      const W=T.slice(a,b).filter(s=>s.v||s.n||s.l||s.q),L=W[W.length-1],h=s=>s&&s.v&&!s.g&&s.c==='h';
      if(h(L)&&L.v==='a'&&!(W.length===2&&h(W[0])&&W[0].v==='a')){L.c='';L.g='w'}else if(h(L)&&L.v==='e')L.c='';
      a=b+1}}
    // 母音の落ちる拍
    for(let i=0;i<T.length;i++){const s=T[i];if(!s.v||s.g||s.ac||!(s.c==='s'&&s.v==='u'||s.c==='sh'&&s.v==='i'))continue;
      let j=i+1;while(T[j]&&T[j].w)j++;const nx=T[j],pv=T[i-1];
      if(nx&&nx.l)continue;
      if(s.c==='s'&&(!nx||nx.p)){if(pv&&(pv.v||pv.l))s.dv=1}
      else if(nx&&nx.v&&!nx.dv&&'k t p ch ts s sh h'.split(' ').includes(nx.c)&&!(pv&&pv.dv))s.dv=2}
    if(X&&X.dv)for(let i=0;i<T.length;i++){const s=T[i];if(!s.v||s.g||s.ac||s.dv||!(s.v==='i'||s.v==='u')||!'k s sh ch ts h f p'.split(' ').includes(s.c))continue;
      let nx=T[i+1];const pv=T[i-1];if(nx&&nx.q)nx=T[i+2];
      if(nx&&nx.v&&!nx.l&&!nx.dv&&!(pv&&pv.dv)&&'k t p ch ts s sh h f'.split(' ').includes(nx.c))s.dv=2}
    return T;
  }
  // 日本語の抑揚：語ごとのアクセントと、文の終わりの調子から、拍ごとの 高さ(pm)・長さ(dm)・強さ(am) を決める
  function prosody(T,S,R,JX){
    const isM=s=>(s.v&&!s.dv)||s.n||s.l;let i=0;
    while(i<T.length){
      let j=i;while(j<T.length&&!T[j].p)j++;
      const end=T[j]&&T[j].e,ph=T.slice(i,j);let mi=0,ds=1,a=0,first=true;
      while(a<ph.length){let b=a;while(b<ph.length&&!ph[b].w)b++;
        const M=ph.slice(a,b).filter(isM),n=M.length;
        if(n){let nuc=M.findIndex(s=>s.ac)+1;
          if(JX)nuc=nuc||0;else if(!nuc&&!M.some(s=>s.hb)){const r=R();nuc=n<=2?(r<.6?0:1):r<.45?0:r<.62?1:Math.min(n,2+((R()*(n-1))|0))}
          M.forEach((s,q)=>{const k=q+1,pat=k===1?(nuc===1?1.13:.9):(nuc===0||k<=nuc)?1.08:.84,dec=Math.max(.76,1-.02*mi);mi++;
            s.pm=Math.pow(pat*dec*ds,S.rg);s.dm=1;s.am=1});
          if(nuc)ds*=.94;
          if(first&&S.up)M[0].pm*=1+S.up;first=false}
        a=b+1}
      if(JX){const W=[];let cw=[];for(const s of ph){if(s.w){if(cw.length)W.push(cw);cw=[]}else if(s.v||s.n||s.l||s.q)cw.push(s)}if(cw.length)W.push(cw);
        if(W.length)(JX.bg=JX.bg||[]).push({end,W:W.map(M=>({M,nuc:M.findIndex(s=>s.ac)+1}))})}
      const Mp=ph.filter(isM),last=Mp[Mp.length-1];
      /* 拍の中での高さの動き：前の拍の高さから入って、母音の中で自分の高さへ滑りこむ（段にならない）。
         核の次の拍（大きく下がる拍）は、母音のほとんどを使って遅めに落ちる。核の拍は、気持ちが入っているほど、小さな山を作る */
      {const D=.1*S.rg;Mp.forEach((s,q)=>{const pv=Mp[q-1],r=pv?pv.pm/s.pm:.97,drop=r>1.12;
        s.c0=1+(r-1)*(drop?.8:.6);s.ct=drop?[[.85,1]]:s.ac||(pv&&r<.9)?[[.5,1+.35*D],[1,1]]:[[.6,1]]})}
      if(last){
        const D=.1*S.rg,g0=1+((last.c0||1)-1)*.5;last.c0=1;                                                    // ひとつの母音の中での、高さの動きの深さ
        if(end==='f'){last.dm=1.3;last.c0=1.03*g0;last.ct=[[.3,1.02],[1,.82]]}                               // 言い切り：最後の拍の中で、すっと落ちる
        else if(end==='q'){last.dm=1.6;last.c0=.94*g0;last.ct=[[.4,.96],[1,1.42]]}                 // 問い：いったん低く、しゃくり上げる
        else if(end==='x'){last.dm=1.45*S.lng;last.pm*=1.1+S.up;last.am=1.25;
          last.c0=g0;last.ct=S.up>.08?[[.35,1+1.8*D],[.8,1+1.2*D],[1,1+.3*D]]:[[.3,1+1.3*D],[1,1-1.6*D]];        // 強い言い切り：山を作って落とす。歓喜は、高いまま保つ
          const p2=Mp[Mp.length-2];if(p2){p2.pm*=1.06+S.up;p2.am=1.15}}
        else if(end==='d'){last.dm=1.7;last.am=.7;last.c0=.96*g0;last.ct=[[1,.84]]}
        else{last.dm=1.15;last.c0=g0;last.ct=[[.5,1],[1,.95]]}}
      if(S.crack)for(const s of Mp)if(R()<S.crack){s.pm*=1.3;s.am=1.15}
      i=j+1}
  }
  // 拍を音素にひらく。「ん」は、次の音で形が変わる
  function expandJP(T){
    const G=[];
    T.forEach((s,n)=>{
      if(s.w||s.p||s.q){G.push(s);return}
      if(s.l){G.push({l:s.l,pm:s.pm,len:s.dm,am:s.am,ct:s.ct,c0:s.c0,mo:s});return}
      let j=n+1;while(T[j]&&T[j].w)j++;const nx=T[j];
      if(s.n){const c=nx&&nx.v?nx.c:null,ph=s.nph?s.nph:c==null||c===''||c==='s'||c==='sh'||c==='h'||c==='f'?'X':c==='p'||c==='b'||c==='m'?'m':c==='k'||c==='g'||c==='ng'?'N':'n';
        G.push({ph,mora:1,pm:s.pm,len:s.dm,am:s.am,mo:s});return}
      const c=CMAP[s.c]||s.c,last=!T[n+1]||!!T[n+1].p;
      if(s.dv){G.push({ph:c==='h'&&s.v==='i'?'C':c,dv:s.dv,jp:1,mo:s});if(s.dv===2&&c!=='s'&&c!=='S')G.push({ph:s.v==='u'?'M':s.v,jp:1,wv:1,mo:s});return}
      if(c)G.push({ph:c==='h'&&s.v==='i'?'C':c,jp:1,pm:s.pm*(s.c0||1),am:s.am,mo:s});                     // 子音は、母音の入りの高さで
      if(s.g)G.push({ph:s.g==='y'?'j':'w',jp:1,am:s.am,mo:s});
      G.push({ph:s.v==='u'?'M':s.v,jp:1,pm:s.pm,len:s.dm,am:s.am,ct:s.ct,c0:s.c0,last,bare:!c&&!s.g,mo:s});
    });
    return G;
  }
  /* ---- 英語：発音記号 → 音素の列 ---- */
  const SYM=['tS','dZ','eI','aI','oU','aU','OI'],ALIAS={e:'E',o:'O',a:'A'};
  function parseEN(text){
    const G=[];let st=0;const s=String(text);
    for(let i=0;i<s.length;i++){const ch=s[i];
      if(ch==="'"||ch==='ˈ'){st=1;continue}if(ch==='%'||ch==='ˌ'){st=2;continue}
      if(ch===':'){const l=G[G.length-1];if(l&&VW[l.ph])l.lng=1.5;continue}
      {const cc=s.charCodeAt(i);if(cc>=0xE000&&cc<0xF000){TGS.push([G.length,cc-0xE000]);continue}}
      if(punct(ch,G))continue;
      let ph=SYM.find(x=>s.startsWith(x,i));if(ph)i++;else ph=ALIAS[ch]||ch;
      if(!(VW[ph]||STOP[ph]||FRIC[ph]||NAS[ph]||APX[ph]||ph==='h'||ph==='4')){note('[ ] の中に、知らない記号「'+ch+'」',s.slice(Math.max(0,i-8),i+8).replace(/[\uE000-\uEFFF]/g,''));continue}
      if(DIAG&&(ph==='M'||ph==='C'||ph==='F'||ph==='X'||ph==='ts'))note('「'+ph+'」は日本語の音です。[ ] は英語の音だけ。日本語の音素は / / の中に書きます',s.slice(Math.max(0,i-8),i+8).replace(/[\uE000-\uEFFF]/g,''));
      const g={ph,en:1};if(VW[ph]){g.st=st;st=0}G.push(g)}
    return G;
  }
  // 英語の抑揚：強勢のある音節を、長く・高く・強く。句の中で少しずつ下がり、最後の強勢（核）のあとで落ちる
  function prosodyEN(G,S,R){
    let i=0;
    while(i<G.length){
      let j=i;while(j<G.length&&!G[j].p)j++;
      const end=G[j]&&G[j].e,V=[];for(let q=i;q<j;q++)if(G[q].en&&VW[G[q].ph])V.push(q);
      if(V.length){let nuc=-1;V.forEach((q,n)=>{if(G[q].st===1)nuc=n});if(nuc<0)nuc=V.length-1;
        V.forEach((q,n)=>{const g=G[q],dec=Math.max(.76,1-.028*n),pat=(g.st===1?1.16:g.st===2?1.05:.94)*(n===nuc?1.07:1)*(n>nuc&&end!=='q'?(end==null?.93:.86):1);
          g.pm=Math.pow(pat*dec,S.rg);g.len=(g.st===1?1.3:g.st===2?1.08:.8)*(g.lng||1);g.am=g.st===1?1.12:g.st===2?1:.82;
          const nx=G[q+1]&&!G[q+1].p&&!G[q+1].w?G[q+1]:G[q+2]&&G[q+1]&&G[q+1].w?G[q+2]:null;                       // 母音は、濁った子音の前で伸び、澄んだ子音の前で縮む
          if(nx&&nx.ph){const o=STOP[nx.ph]||FRIC[nx.ph];g.len*=o?(o[4]?1.12:.86):1}});
        const L=G[V[V.length-1]],Nc=G[V[nuc]],F0=G[V.find(q=>G[q].st===1)]||G[V[0]];
        if(S.up)F0.pm*=1+S.up;
        if(end==='f'){L.len*=1.35;L.pm*=.92}
        else if(end==='q'){L.len*=1.5}
        else if(end==='x'){Nc.pm*=1.1+S.up;Nc.len*=1.2*Math.sqrt(S.lng);Nc.am=1.28;L.len*=1.25}
        else if(end==='d'){L.len*=1.6;L.am*=.75}
        else L.len*=1.15;
        /* ひとつの母音の中での高さの動き（c0＝はじめの倍率、ct＝[母音の中の位置 0〜1, 倍率] の並び）。
           強勢のある母音は、下から入って山を作り、少し下りる。句の核（最後の強勢）は、言い切りなら高く入って大きく落ち、問いなら低く入って上がりつづけ、
           強い言い切りなら大きな山を作る。強勢のない母音は、ほぼ平らに少し下がる */
        const D=.1*S.rg,nl=V.length-1;
        V.forEach((q,n)=>{const g=G[q];
          if(n===nuc){
            if(end==='q'){g.c0=1-D;g.ct=n===nl?[[.45,1-.5*D],[1,1+3.4*D]]:[[1,1+.8*D]]}
            else if(end==='x'){g.c0=1-.3*D;g.ct=[[.35,1+2.1*D],[1,S.up>.08?1+.5*D:1-1.7*D]]}
            else if(end==null){g.c0=1+.3*D;g.ct=n===nl?[[.3,1+.9*D],[.72,1-.5*D],[1,1+.3*D]]:[[.3,1+.9*D],[1,1-.7*D]]}       // つづく句：核は浅く下りるだけ。核が最後の母音なら、下りてから少し戻る
            else{g.c0=1+.5*D;g.ct=[[.25,1+1.1*D],[1,1-2*D]]}}
          else if(n>nuc&&end==null&&n===nl){g.c0=1;g.ct=[[1,1+.7*D]]}                                                    // つづく句の最後の母音は、少し上がって終わる
          else if(n>nuc&&end==='q'){g.c0=1+.8*D;g.ct=[[1,1+(n===nl?3.4:1.8)*D]]}
          else if(g.st===1){g.c0=1-.7*D;g.ct=[[.4,1+.7*D],[1,1-.3*D]]}
          else if(g.st===2){g.c0=1-.3*D;g.ct=[[.4,1+.35*D],[1,1-.15*D]]}
          else{g.c0=1;g.ct=[[1,.97]]}});
        if(S.crack)for(const q of V)if(R()<S.crack){G[q].pm*=1.3}
        // 子音は、同じ音節の母音の高さと強さを受けつぐ。強勢の前の p t k は、息をともなう。母音の前でない l は、暗い l
        let am=G[V[0]].am;
        for(let q=j-1,nv=null;q>=i;q--){const g=G[q];if(!g.en)continue;if(VW[g.ph]){nv=g;continue}
          if(nv){g.pm=nv.pm*(nv.c0||1);g.am=nv.am}}                                   // 音節の頭の子音は、母音の入りの高さで
        for(let q=i;q<j;q++){const g=G[q];if(!g.en||!g.ph)continue;if(VW[g.ph]){am=g.am;continue}if(g.am==null)g.am=am*.9;                         // 音節の終わりの子音は、母音の終わりの高さのまま
          let nq=q+1;while(G[nq]&&G[nq].w)nq++;const nx=nq<j?G[nq]:null,pv=G[q-1];
          if('ptk'.includes(g.ph)&&g.ph.length===1&&nx&&VW[nx.ph]&&nx.st===1&&!(pv&&pv.ph==='s'))g.asp=1;
          if(STOP[g.ph]&&(!nx||!nx.ph||STOP[nx.ph]||FRIC[nx.ph]||NAS[nx.ph]))g.weak=1;
          if(g.ph==='l'&&!(nx&&VW[nx.ph]))g.ph='L'}
        for(const q of V)G[q].last=!G[q+1]||!!G[q+1].p}
      i=j+1}
  }
  /* 英語の音素に、長さ（秒）と、前後の音素を入れる。長さ＝（もとの長さ−最小）×割合＋最小。割合は、規則を掛けあわせて作る（Klatt 1979） */
  function planEN(G){
    let i=0;
    while(i<G.length){let j=i;while(j<G.length&&!G[j].p)j++;
      const end=G[j]&&G[j].e,P=[];for(let q=i;q<j;q++)if(G[q].en&&G[q].ph)P.push(G[q]);
      for(let a=i;a<j;){let b=a;while(b<j&&!G[b].w)b++;const W=[];for(let q=a;q<b;q++)if(G[q].en&&G[q].ph)W.push(G[q]);
        const vs=W.filter(g=>EV[g.ph]);W.forEach((g,x)=>{g.wi=x;g.wvs=vs;if(EV[g.ph]){g.wfin=g===vs[vs.length-1];g.wmed=!g.wfin&&g!==vs[0];g.open=x===W.length-1}});a=b+1}
      let lv=null,after=false;for(const g of P)if(EV[g.ph])lv=g;
      P.forEach((g,x)=>{g.P=P[x-1]||null;g.N=P[x+1]||null});
      P.forEach((g,x)=>{const v=EV[g.ph],c=EC[g.ph],pv=g.P,nx=g.N,pc=pv&&!EV[pv.ph],nc=nx&&!EV[nx.ph];let pr=1,inh,mn;
        if(v){inh=v[9];mn=v[10];
          pr*=g===lv?1.4:.6;if(!g.wfin)pr*=.85;if(g.wvs.length>1)pr*=.8;                      // 句の最後の音節は伸び、ほかは縮む。語の最後でない音節、音節の多い語は、縮む
          if(!g.st){mn/=2;pr*=g.wmed?.5:.7}                                                  // 強勢がない
          let p1=1;const k=nc&&EC[nx.ph];                                                    // うしろの子音：濁った摩擦の前で伸び、澄んだ破裂の前で縮む
          if(g.open)p1=1.2;else if(k){if(k[0]==='f'&&k[2])p1=1.6;else if(k[0]==='s'&&k[2])p1=1.2;else if(k[0]==='n')p1=.85;else if(k[0]==='s'&&!k[2])p1=.7}
          pr*=g===lv?p1:.7+.3*p1;
          if(nx&&!nc)pr*=1.2;if(pv&&!pc)pr*=.7;
          g.D=((inh-mn)*pr+mn)/1000*(g.lng||1)*(g===lv?(end==='q'?1.15:end==='d'?1.3:1):1);
          if(g===lv)after=true}
        else{inh=c[3];mn=c[4];
          if(after)pr*=1.4;if(g.wi>0)pr*=.85;
          let sv=nx&&!nc?nx:null;if(!sv)for(let y=x-1;y>=0;y--)if(EV[P[y].ph]){sv=P[y];break}   // その子音がついている音節の強勢
          if(sv&&!sv.st){mn/=2;pr*=c[0]==='x'&&nx&&!nc?.5:.7}
          if(pc&&nc)pr*=.5;else if(pc||nc)pr*=.7;
          g.D=((inh-mn)*pr+mn)/1000}});
      i=j+1}
  }
  /* 日本語の音素に、長さと前後の音素を入れる（新しい道すじで日本語を作るとき）。子音＋母音で1拍。長い母音「ー」と「ん」は、それだけで1拍。
     「っ」は、次の子音の閉鎖（または摩擦）を1拍ぶん近く伸ばす。母音の落ちた「す」「し」は、摩擦だけを長めに */
  function planJP(G,T){
    const link=P=>{let acc=0;P.forEach((g,x)=>{g.P=P[x-1]||null;g.N=P[x+1]||null;const len=g.len||1;
      if(g.jl||g.mora){g.D=T*.85*(g.jl||1)*len;acc=0}
      else if(EV[g.ph]){g.D=g.wv?.055:Math.max(.045,(acc?T:T*.9)*len-acc);acc=0}                // wv＝声の出ない母音（き・く・ち・つ・ぴ・ぷ の母音が落ちたとき）。息だけを短く
      else{let d=(JD[g.ph]||50)/1000;if(g.dv&&(g.ph==='s'||g.ph==='S')){d=d*1.25+(g.dv===1?.05:.02);acc=0}else acc+=d;if(g.gem)d+=T*.85;g.D=d}})};
    let P=[],lv=null,gem=0;
    for(const g of G){
      if(g.p||g.en){if(P.length)link(P);P=[];lv=null;gem=0;continue}
      if(g.w){g.J=1;g.skip=1;continue}
      if(g.q){g.J=1;g.skip=1;gem=1;continue}
      if(g.l){g.J=1;if(!lv){g.skip=1;continue}g.ph=lv;g.jl=g.l;P.push(g);continue}
      if(!g.ph||!(EV[g.ph]||EC[g.ph]))continue;
      g.J=1;g.gem=gem;gem=0;if(EV[g.ph])lv=g.ph;P.push(g)}
    if(P.length)link(P);
  }
  /* ---- 日本語の高さ：藤崎モデル（基本周波数パターン生成過程モデル） ----
     声の高さ（の対数）を、「句の成分」と「アクセントの成分」の足し算で作る。
       句の成分：息つぎごとに、ぽんと叩いた反応。すぐ上がって、ゆっくり下がる（Gp(t)=α²t·e^(-αt)、α=3）。文がだんだん下がっていくのは、これ
       アクセントの成分：語ごとに、高い区間を四角い指令で与え、その反応（Ga(t)=1-(1+βt)e^(-βt)、β=20、上限0.9）。段にならず、なめらかに上がり下がりする
     語（分かち書きの一区切り＝アクセント句）ごとの指令：
       ・核が1拍め → 語の頭から高く、2拍めで下がる。核がそれ以外 → 1拍めは低く、2拍めから高い（2拍めが ん・ー・っ なら、頭から上がる）。核の拍のあとで下がる
       ・核なし（平板）→ 2拍めから高いまま、語の終わりまで。高さは、核のある語より低い
       ・核のある語のあとは、同じ息のなかで、次の語の山が低くなる（ダウンステップ）
     α・β は文献の値（話し手によらず、ほぼ α=3、β=20）。
     指令の大きさと時刻（FJP）は、Open JTalk の声（人の声から学習した HMM の声）に、この作品の台詞 34 文を読ませ、その高さの動きにいちばん近くなるように探して決めた：
       句の指令は、声の出はじめの 20 ミリ秒前（ここから 0.3 秒ほどかけて上がる）。大きさ 0.30（息つぎのあとは 0.28）
       アクセントの指令は、核あり 0.36／核なし 0.26（アナウンサーの測定 0.35〜0.39／0.23〜0.25 と、ほぼ同じになった）。ダウンステップは 0.8 倍
       上がりはじめは 2拍めの頭。下がりはじめは、核の次の拍に 30 ミリ秒入ってから（「おそ下がり」）。頭高は、語の 80 ミリ秒前から。言い切りの下げは小さい（0.06）
     (推定) 強い言い切り・問い・言いよどみの終わり方と、長い息の途中の持ち直しは、参照に例がなく、私の見積もりのまま */
  const FJP={t0:.02,ap1:.3,ap2:.28,apr:.13,aa:.36,af:.26,ds:.8,t1h:.08,t1:0,t1v:-.04,t2:-.03,fl:.06,flw:.4,em:1.25};
  function fuji(K,JX,S,sp,jt,R,PX){
    const DC=w=>{const d=w.M[0].dc;return d==null?1:d},AX=w=>{const a=w.M[0].ax;return a==null?1:a};      // 文の中の指定（<decl> <acc>）。書いてなければ 1
    const P=Object.assign({},FJP,PX),A=3,B=20,CE=.9,rg=S.rg,cmdP=[],cmdA=[],fin=[],pk=.55+.45*rg;let first=true;
    for(const bg of JX.bg||[]){const Ws=bg.W.filter(w=>w.M.every(s=>s.t0!=null));if(!Ws.length)continue;
      for(const w of Ws){w.t=w.M.map((s,x)=>{const pv=w.M[x-1];return pv&&pv.q?pv.t0+.85*jt*sp:s.t0});w.te=w.M[w.M.length-1].t1}
      const tS=Ws[0].t[0],lw=Ws[Ws.length-1],tE=lw.te,em=bg.end==='x';
      cmdP.push([tS-P.t0,(first?P.ap1:P.ap2)*pk*(em?1.15:1)*DC(Ws[0])]);first=false;let ds=1,mc=0;
      Ws.forEach((w,wi)=>{const n=w.M.length,k=w.nuc>0&&w.nuc<n?w.nuc:0,t=w.t,nx=Ws[wi+1];
        if(mc>=9&&n>=3&&wi>0){cmdP.push([t[0]-P.t0*.7,P.apr*pk*DC(w)]);mc=0}                                         // 長い息のなかでは、ところどころで小さく持ち直す
        const heavy=n>1&&(w.M[1].n||w.M[1].l||w.M[1].q),T1=k===1||n===1?t[0]-P.t1h:heavy?t[0]-P.t1v:t[1]-P.t1,T2=k?t[k]-P.t2:nx?nx.t[0]-.04:w.te-.02;
        let a=(k?P.aa:P.af)*rg*ds*(em?P.em:1)*AX(w);if(S.crack&&R()<S.crack*1.5)a*=1.4;
        cmdA.push([T1,Math.max(T1+.03,T2),a]);if(k)ds=Math.max(.45,ds*P.ds);mc+=n});
      fin.push([tE,bg.end,Math.max(.08,tE-lw.t[lw.t.length-1])])}
    const gp=t=>t>0?A*A*t*Math.exp(-A*t):0,ga=t=>t>0?Math.min(1-(1+B*t)*Math.exp(-B*t),CE):0,ss=x=>x<=0?0:x>=1?1:x*x*(3-2*x);
    const at=t=>{let p=0,a=0,f=0;for(const c of cmdP)p+=c[1]*gp(t-c[0]);for(const c of cmdA)a+=c[2]*(ga(t-c[0])-ga(t-c[1]));
      for(const c of fin){const u=t-c[0];if(u>.12||u<-.5)continue;const e=c[1],d=c[2];                    // 息の終わり：言い切りは下げ、問いは最後の拍でしゃくり上げ、つづくときは少し浮かせる
        f+=e==='f'?-P.fl*ss((u+P.flw)/P.flw):e==='q'?.42*Math.pow(ss((u+d*.75)/(d*.75)),1.3):e==='x'?-.08*ss((u+.2)/.2):e==='d'?-.12*ss((u+.35)/.35):.035*ss((u+d)/d)}
      return[p,a,f]};
    let m=0,n=0;const V=[];for(let i=0;i<K.length;i++){const k=K[i];if(!k.J)continue;const v=at(k[0]);V[i]=v;if(k[4]>0&&k[8]>0){m+=v[0]+v[1];n++}}
    const base=Math.exp(-(n?m/n:0))*(1+(S.up||0));                                                       // 声の平均の高さが、指定した高さ（f0）になるようにそろえる
    for(let i=0;i<K.length;i++){const v=V[i];if(!v)continue;K[i][9]=base*Math.exp(v[0]+v[1]+v[2]);K[i][4]*=.93+.4*v[1]}                 // 高いところは、少し強く
    return{cmdP,cmdA,fin,base,at}}
  /* ---- 音素の列 → 音 ---- */
  /* ================= ここから、音素で書く入口と、文の中の指定（OtoVoice で足したもの） ================= */
  let TGS=[],DIAG=null;                                  // TGS＝指定（< >）が、何番めの拍・音素の前にあったか。DIAG＝読めなかったものを書きとめる先（o.diag）
  const note=(msg,near)=>{if(DIAG)DIAG.push({msg,near:near||''})};
  /* < … > の指定を読んで、文からは外す（1つの指定を、目に見えない1文字に置きかえる）。
       rate 速さの倍率／pitch 高さ（半音。＋で高く）／vol 強さの倍率／acc アクセントの強さの倍率／decl 句の頭の高さの山の倍率／pause 間（秒）
     どれも「ここから先」に効く。<> または <reset> で、ぜんぶ元に戻す（pause は、その場に間を1つ置くだけ） */
  const TAGK={rate:'rt',pitch:'px',vol:'vx',acc:'ax',decl:'dc'},TAGR={rate:[.25,4],pitch:[-36,36],vol:[0,3],acc:[0,4],decl:[0,3],pause:[0,10]};
  function pretag(s){const tags=[];
    s=s.replace(/<([^<>]*)>/g,(m,body)=>{const t=[],w=body.trim().split(/[\s,=]+/).filter(Boolean);
      if(!w.length)t.push(['reset',1]);
      for(let i=0;i<w.length;i++){const k=w[i].toLowerCase();
        if(k==='reset'){t.push(['reset',1]);continue}
        const r=TAGR[k],v=parseFloat(w[i+1]);
        if(!r){note('知らない指定「'+k+'」（文の中で使えるのは rate pitch vol acc decl pause reset）',m);if(isFinite(v))i++;continue}
        if(!isFinite(v)){note('「'+k+'」のあとに数がありません',m);continue}
        t.push([k,Math.min(r[1],Math.max(r[0],v))]);i++}
      tags.push(t);return String.fromCharCode(0xE000+tags.length-1)});
    if(/[<>]/.test(s))note('< > が対になっていません',s.slice(Math.max(0,s.search(/[<>]/)-6),s.search(/[<>]/)+6));
    return{s,tags}}
  // 指定を、拍（または英語の音素）の1つ1つに書きこむ。st は「いまの指定」で、文の終わりまで持ちこす
  function stamp(L,tags,st){
    if(!TGS.length&&st.rt===1&&st.px===0&&st.vx===1&&st.ax===1&&st.dc===1)return L;
    const out=[];let ti=0;
    for(let i=0;i<=L.length;i++){
      while(ti<TGS.length&&TGS[ti][0]<=i){const tg=tags[TGS[ti][1]]||[];ti++;
        for(const [k,v] of tg){if(k==='reset'){st.rt=1;st.px=0;st.vx=1;st.ax=1;st.dc=1}else if(k==='pause')out.push({p:1.2,ps:v});else st[TAGK[k]]=v}}
      if(i<L.length){const x=L[i];if(st.rt!==1)x.rt=st.rt;if(st.px)x.px=st.px;if(st.vx!==1)x.vx=st.vx;if(st.ax!==1)x.ax=st.ax;if(st.dc!==1)x.dc=st.dc;out.push(x)}}
    return out}
  /* ---- 日本語：音素の列（/ … / の中）→ 拍の列 ----
     かなとちがって、書いたとおりに読む（母音を落とす・長い母音にする・「ん」の音を変える、といった自動の規則は、かけない）。
       母音  a i u e o（u は日本語の「う」。M と書いてもよい）
       子音  k g s z t d n h b p m r w j   S(し) tS(ち) ts(つ) dZ(じ) dz(語頭の ざ行) Z F(ふ) C(ひ) N(鼻にかけた が行)
             r は日本語の ら行（4 と書いてもよい）。j は や行（y と書いてもよい）。kj gj nj hj bj pj mj rj で きゃ ぎゃ にゃ …。hi は ç で鳴る
       拍    子音＋(j|w)＋母音 で1拍。母音だけでも1拍
       ん    母音のつかない鼻音で書く：m（ぱ ば ま行の前）n（た だ な ら ざ行、ち つ じ の前）N（か が行の前）X（母音・や行・わ・さ行・は行の前、文の終わり）
       っ    Q。または、同じ子音を2つ（kk tt pp ss SS ttS tts）
       長音  :（1拍ぶん）、::（もっと長く）、:1.5（拍の数で）
       ぷつっと切る   母音のあとに q：声門を閉じて、母音を急に止める（あっ → aq、えっ → eq）。っ（Q）は次の子音を詰まらせる印で、文の終わりでは何も起きないので、こちらを使う
       母音を落とす   子音のあとに ()：s() は「す」を s だけで切る（です → des()）。子音だけが残る
       声を抜く       子音のあとに (u) (i)：k(u) は「く」の母音を、声を出さずに息だけで言う（がくせい → gak(u)se:）。s と S では、母音は鳴らない
       アクセントの核 拍のあとの '（そこまで高く、次の拍で下がる）。書いてない語は、平板
       切れ目         空白＝語（アクセントのまとまり）の切れ目／ , ＝息つぎ／ . ＝言い切り／ ? ＝問い／ ! ＝強い言い切り／ … ＝言いよどみ */
  const PHC=['tS','dZ','ts','dz','k','g','s','z','S','Z','t','d','n','h','C','F','f','b','p','m','4','r','N','X','v','l'],
    PHK={S:'sh',tS:'ch',dZ:'j',F:'f',f:'f','4':'r',r:'r',N:'ng'},PHV={a:'a',i:'i',u:'u',M:'u',e:'e',o:'o'},PHNAS={m:1,n:1,N:1,X:1},
    PHHINT={'(':'( ) は、子音のすぐあとに書きます（k(u)、s() のように）',')':'( ) は、子音のすぐあとに書きます',c:'「ち」は tS、「つ」は ts',x:'「ん」は大文字の X（または m n N）',A:'英語の母音は [ ] の中に',E:'英語の母音は [ ] の中に',O:'英語の母音は [ ] の中に',I:'英語の母音は [ ] の中に',U:'英語の母音は [ ] の中に','@':'英語の母音は [ ] の中に',T:'英語の th は [ ] の中に',D:'英語の th は [ ] の中に',L:'英語の l は [ ] の中に'};
  function parsePH(text,dg){
    if(dg!==undefined){DIAG=dg;TGS=[]}                       // 外から呼ぶとき（歌詞）は、まちがいを書きとめる先を渡す
    const T=[],s=String(text).replace(/\.\.\./g,'…'),near=i=>s.slice(Math.max(0,i-8),i+8).replace(/[-]/g,'');
    const prev=()=>{for(let k=T.length-1;k>=0;k--){const x=T[k];if(x.w||x.p)return null;if(x.v||x.n||x.l||x.q)return x}return null};
    let i=0;
    while(i<s.length){const ch=s[i],cc=s.charCodeAt(i);
      if(cc>=0xE000&&cc<0xF000){TGS.push([T.length,cc-0xE000]);i++;continue}
      if(ch==="'"||ch==='ˈ'){const m=T[T.length-1];if(m&&(m.v||m.n||m.l))m.ac=1;else note("' の前に拍がありません（核は、拍のあとに書きます）",near(i));i++;continue}
      if(ch==='='){const m=T[T.length-1];if(m)m.hb=1;i++;continue}
      if(ch===':'||ch==='ー'){const m=prev();let l=1,j=i+1;if(s[j]===':'){l=2.6;j++}else{const mm=/^\d*\.?\d+/.exec(s.slice(j));if(mm){l=+mm[0];j+=mm[0].length}}
        if(m)T.push({l,lv:m.lv});else note(': の前に拍がありません',near(i));i=j;continue}
      if(ch==='Q'){T.push({q:1});i++;continue}
      if(ch==='q'){const m=T[T.length-1];if(m&&m.v&&!m.dv)m.cut=1;else note('q（声門で、ぷつっと切る）は、母音のすぐあとに書きます',near(i));i++;continue}
      if(punct(ch,T)){i++;continue}
      const c=PHC.find(x=>s.startsWith(x,i))||'';let j=i+c.length;
      if(c&&!PHNAS[c]){const c2=PHC.find(x=>s.startsWith(x,j));                                           // 同じ子音が2つ → っ
        if(c2&&(c2===c||(c==='t'&&(c2==='tS'||c2==='ts'))||(c==='d'&&(c2==='dZ'||c2==='dz')))){T.push({q:1});i=j;continue}}
      let g='';if(c!=='X'){if(s[j]==='j'||s[j]==='y'){g='y';j++}else if(s[j]==='w'){g='w';j++}}
      let v=null,dv=0;
      if(c&&c!=='X'&&s[j]==='('){const e=s.indexOf(')',j),inn=e<0?null:s.slice(j+1,e).trim();
        if(inn===null){note('( が閉じていません',near(j));i=s.length;continue}
        if(inn===''){dv=1;v=c==='S'||c==='tS'||c==='dZ'||c==='C'?'i':'u'}else if(PHV[inn]){dv=2;v=PHV[inn]}else{note('( ) の中には、落とす母音を1つだけ書きます（s(u)、S(i) など。からの () なら、子音だけ）',near(j));v='u';dv=2}
        j=e+1}
      else if(c!=='X'&&PHV[s[j]]){v=PHV[s[j]];j++}
      if(v){const m={c:PHK[c]||c,g,v,lv:v};if(dv)m.dv=dv;T.push(m);i=j;continue}
      if(c&&PHNAS[c]&&!g){T.push({n:1,nph:c});i+=c.length;continue}                                       // 母音のつかない鼻音 ＝「ん」
      if(c||g){note('子音「'+(c||s[i])+'」のあとに母音がありません（し は S、ち は tS。母音を落とすなら '+(c||'s')+'()、声を抜くなら '+(c||'s')+'(u)）',near(i));i=Math.max(j,i+1);continue}
      note('知らない記号「'+ch+'」'+(PHHINT[ch]?'（'+PHHINT[ch]+'）':/[ぁ-ヿ]/.test(ch)?'（かなは / / の外に書きます）':''),near(i));i++}
    return T}
  // 「ん」が、次の音でどの鼻音になるか（expandJP と同じ決まり）
  const nasOf=(T,n)=>{if(T[n].nph)return T[n].nph;let j=n+1;while(T[j]&&T[j].w)j++;const nx=T[j],c=nx&&nx.v?nx.c:null;
    return c==null||c===''||c==='s'||c==='sh'||c==='h'||c==='f'?'X':c==='p'||c==='b'||c==='m'?'m':c==='k'||c==='g'||c==='ng'?'N':'n'};
  /* かなで書いた文を、自動の規則をかけたあとの音素の列（/ … /）に直す。[ ] と、もとから / / のところ、< > は、そのまま残す。
     返ってきた文を speak に渡すと、かなのときと同じ音になる。そこから、音素の単位で手を入れられる */
  function toPH(text,o){o=o||{};const X=o.literal?null:{bidaku:!!o.bidaku,dv:o.devoice!==false,dz:o.dz!==false,wa:!!o.wa},keep=DIAG;DIAG=null;
    const raw=[];String(text).replace(/<[^<>]*>/g,m=>{raw.push(m);return m});
    const TX=pretag(String(text)),back=x=>x.replace(/[-]/g,c=>raw[c.charCodeAt(0)-0xE000]||''),SYM={sh:'S',ch:'tS',j:'dZ',f:'F',ng:'N'};
    const ser=T=>{let out='',ti=0;const tg=n=>{while(ti<TGS.length&&TGS[ti][0]<=n){out+=raw[TGS[ti][1]]||'';ti++}};
      T.forEach((s,n)=>{tg(n);
        if(s.w)out+=' ';else if(s.p)out+=(s.e==='f'?'.':s.e==='q'?'?':s.e==='x'?'!':s.e==='d'?'…':',')+(T[n+1]?' ':'');
        else if(s.q)out+='Q';else if(s.n)out+=nasOf(T,n);else if(s.l)out+=s.l===1?':':s.l===2.6?'::':':'+s.l;
        else out+=(SYM[s.c]||s.c)+(s.g==='y'?'j':s.g==='w'?'w':'')+(s.dv===1?'()':s.dv?'('+s.v+')':s.v);
        if(s.ac)out+="'";if(s.hb)out+='='});tg(T.length+1);return out};
    const res=TX.s.split(/\[([^\]]*)\]/).map((part,ix)=>ix%2?'['+back(part)+']':
      part.split('/').map((sub,jx)=>{if(jx%2)return'/'+back(sub)+'/';if(!sub.replace(/\s/g,''))return sub;TGS=[];return'/'+ser(parse(sub,X))+'/'}).join('').replace(/\/\//g,'')).join('');
    DIAG=keep;return res}
  /* ================= ここまで ================= */
  function speak(text,o){
    o=o||{};const S=Object.assign({},STY[o.style]||STY.calm);if(o.sty)for(const k in o.sty)S[k]=o.sty[k];if(o.range!=null)S.rg*=o.range;if(o.long!=null)S.lng*=o.long;
    const sp=1/((o.speed||1)*S.sp),f0b=(o.f0||150)*S.pm,sc=o.scale||1,oq=o.oq||.58,brv=(o.breath||0)+S.br,R=Math.random,r2=(a,b)=>a+R()*(b-a),cl=(x,a,b)=>x<a?a:x>b?b:x;
    // [ ] の中は英語の発音記号、外は日本語
    const JX=!o.literal&&o.jp!=='old'&&o.en!=='old'&&(o.jp==='new'||/[\[\/]/.test(String(text)))?{bidaku:!!o.bidaku,dv:o.devoice!==false,dz:o.dz!==false,wa:!!o.wa}:null;       // かなと実際の音のちがいを直すか（新しい道すじのときだけ。{literal:true} で、字づらのまま）
    const FJ=!!JX&&o.jp!=='old'&&o.en!=='old'&&o.fuji!==false;                                           // 日本語の高さを、藤崎モデルで作るか
    DIAG=o.diag||null;const TX=pretag(String(text)),AS={rt:1,px:0,vx:1,ax:1,dc:1};let G=[],PHN=0,T_ALL=[];
    if(DIAG&&(TX.s.split('/').length%2===0))note('/ が対になっていません（音素の列は / と / ではさみます）','');
    if(DIAG&&/\//.test(TX.s)&&(o.jp==='old'||o.en==='old'||o.literal))note('/ / の音素は、新しい道すじでだけ読めます（jp:\'old\'・en:\'old\'・literal とは、いっしょに使えません）','');
    TX.s.split(/\[([^\]]*)\]/).forEach((part,ix)=>{if(!part.trim())return;
      if(ix%2){TGS=[];const g=stamp(parseEN(part),TX.tags,AS);prosodyEN(g,S,R);for(const x of g)if(x.pm&&x.ax!=null&&x.ax!==1)x.pm=Math.pow(x.pm,x.ax);if(G.length&&!G[G.length-1].p)G.push({p:1});G=G.concat(g)}
      else{let T=[];const TG=[];part.split('/').forEach((sub,jx)=>{TGS=[];const t=jx%2?parsePH(sub):parse(sub,JX);if(jx%2)PHN++;for(const x of TGS)TG.push([x[0]+T.length,x[1]]);T=T.concat(t)});
        TGS=TG;T=stamp(T,TX.tags,AS);prosody(T,S,R,FJ?JX:null);if(o.dbg)T_ALL=T_ALL.concat(T);G=G.concat(expandJP(T))}});
    const NEW=o.en!=='old'&&(o.jp==='new'||PHN>0||G.some(g=>g.en));if(NEW){planEN(G);if(o.jp!=='old')planJP(G,JT*(o.x&&o.x.jt||1))}if(o.gfix)o.gfix(G);       // 英語を含む文と、{jp:'new'} をつけた文は、新しい道すじで作る（何もつけない日本語だけの文は、元のまま）
    // 制御点：[時刻, F1,F2,F3, 声の強さ, 雑音の強さ, 雑音の中心, 雑音のQ, 声帯が鳴っているか, 高さの倍率, 鼻の谷の高さ, 共鳴の幅 B1,B2,B3]（うしろの4つは、新しい道すじだけが使う）
    const K=[];let tt=0,cur=VW.a,fc=4000,fq=1,pf=1,cav=0;
    const k=(dt,F,av,af,vo)=>{tt+=dt*sp;cur=F;cav=av;K.push([tt,F[0],F[1],F[2],NEW?av*1.6:av,af,fc,fq,vo,pf,NP,70,100,160])};
    K.push([0,cur[0],cur[1],cur[2],0,0,fc,fq,1,pf,NP,70,100,160]);k(.02,cur,0,0,1);
    /* 英語の音素ひとつぶんの制御点を置く（新しい道すじ）。F は [F1,F2,F3,B1,B2,B3]。
       境い目（bnd）＝隣どうしの音素が出会う点での共鳴。子音は、左の境い目から右の境い目へ動く。母音は、左の境い目から自分の形へわたり、右の境い目へ出ていく */
    const NEU6=[500,1500,2500,70,100,160],ss=x=>x<=0?0:x>=1?1:x*x*(3-2*x),
      mixA=(a,b,t)=>[0,1,2,3,4,5].map(j=>{const x=a[j]==null?NEU6[j]:a[j],y=b[j]==null?NEU6[j]:b[j];return x+(y-x)*t}),
      vS=g=>EV[g.ph],vE=g=>{const v=EV[g.ph];return[v[6],v[7],v[8],v[3],v[4],v[5]]},
      nearV=(g,d)=>{for(let x=d>0?g.N:g.P;x;x=d>0?x.N:x.P)if(EV[x.ph])return d>0?vS(x):vE(x);return null},
      own=(g,d)=>{const c=EC[g.ph];if(c[0]==='x')return APT[g.ph];const V=nearV(g,d)||nearV(g,-d)||NEU6;if(c[0]==='h'||c[1]==='u')return V;const L=locus(g.J&&(c[1]==='p'||(c[1]==='a'&&(c[0]==='n'||c[0]==='4')&&g.N&&(g.N.ph==='i'||g.N.ph==='j')))?'y':c[1],V);return[L[0],L[1],L[2],c[2]?60:180,110,170]},
      bnd=(a,b)=>{const va=a&&EV[a.ph],vb=b&&EV[b.ph];
        if(!a)return vb?vS(b):own(b,1);if(!b)return va?vE(a):own(a,-1);
        if(va&&vb)return mixA(vE(a),vS(b),.5);
        if(va){const c=EC[b.ph];return c[0]==='x'?mixA(vE(a),APT[b.ph],.5):c[0]==='h'?vE(a):own(b,-1)}
        if(vb){const c=EC[a.ph];return c[0]==='x'?mixA(APT[a.ph],vS(b),.5):c[0]==='h'?vS(b):own(a,1)}
        return mixA(own(a,1),own(b,-1),.5)},
      trOf=g=>{const c=EC[g.ph];return c[0]==='x'?(g.ph==='l'||g.ph==='L'?.04:g.ph==='w'?.06:.06):c[0]==='h'?0:c[0]==='4'?.025:TRP[c[1]]},
      e=(dt,F,av,af,vo,nz)=>{tt+=Math.max(.001,dt);cur=F;cav=av;K.push([tt,F[0],F[1],F[2],av,af,fc,fq,vo,pf,nz||NP,F[3]||70,F[4]||100,F[5]||160])},
      noise=(c,q)=>{fc=c;fq=q;const L=K[K.length-1];if(!L[5]){L[6]=c;L[7]=q}};
    // 日本語の し・ち・じ は、英語の sh・ch・j より、雑音が高く、強い
    const frs0=g=>{const f=FRS[g.ph];return g.J&&(g.ph==='S'||g.ph==='tS'||g.ph==='dZ')?[f[0]*1.25,f[1],f[2]*1.4,f[3]]:f},
      RND={o:1,M:1,u:1,U:1,oU:1,O:1,w:1},SIB={s:1,z:1,S:1,Z:1,ts:1,dz:1,tS:1,dZ:1},
      frs=g=>{let f=frs0(g);if(CON&&CON.vz&&f[3]>0)f=[f[0],f[1],f[2]*(1-.4*CON.vz),f[3]*(1+.5*CON.vz)];return CON&&CON.round&&SIB[g.ph]&&g.N&&RND[g.N.ph.split('~')[0]]?[f[0]*(1-.12*CON.round),f[1],f[2],f[3]]:f};   // 唇が丸まると、口の前の部屋が長くなって、雑音の山が下がる
    /* 子音の改良（1.4 試作）。CNB＝雑音の山の形：[すそを切るか, 2つめの山の中心, 鋭さ, 強さ]。(推定) 値は見積もり */
    const CON=o.con||null,CONB=CON?CON.bands:0,CLK={l:4,a:6,v:6},VB=CON&&CON.vbar?1+.6*CON.vbar:1,
      CNB={s:[1,7000,1.2,.7],z:[1,7000,1.2,.7],ts:[1,7000,1.2,.7],dz:[1,7000,1.2,.7],S:[1,5200,1.5,.5],Z:[1,5200,1.5,.5],tS:[1,5200,1.5,.5],dZ:[1,5200,1.5,.5],
        T:[0,6500,1,1],D:[0,6000,1,.8],C:[0,6000,1.2,.4],t:[0,6800,1,.6],d:[0,6800,1,.6]},
      cnbFix=(s,kb)=>{let t=CNB[s.ph];if(s.nbX)t=[t?t[0]:0,s.nbX[0],s.nbX[1],s.nbX[2]];if(!t)return;const v=[t[0],t[1]*(s.J&&(s.ph==='S'||s.ph==='tS'||s.ph==='dZ')&&!s.nbX?1.1:1),t[2],t[3]*(CONB||1)];for(let i=Math.max(0,kb-1);i<K.length;i++)K[i].nb=v};
    const emitEN=g=>{
      const P=g.P,N=g.N,v=EV[g.ph],c=EC[g.ph],D=Math.max(.012,g.D*sp)+(EV[g.ph]&&!g.wv&&!g.xd?(g.aspT||0)*.7:0),st=r2(.9,1)*(g.am||1)*S.amp,Lb=bnd(P,g),Rb=bnd(g,N),Nv=N&&EV[N.ph],Pv=P&&EV[P.ph],voiced=x=>x&&(EV[x.ph]||EC[x.ph][2]);
      if(o.dbg)(o.dbg.ph=o.dbg.ph||[]).push([tt,g.ph]);
      if(!P)e(.004,Lb,0,0,1);
      if(v&&g.wv&&1){
        /* 声の出ない母音（き・く・ち・つ・ひ・ふ・ぴ・ぷ の母音が落ちたとき）：声帯は鳴らず、口の狭い所でこすれる音だけが残る。
           前が摩擦・破擦なら、その雑音をそのまま伸ばす（ち→しー、つ→すー、ひ・ふ はそのまま）。前が破裂（k p）なら、「い」は ひ に近い高い雑音、「う」は低く弱い雑音 */
        const pc=P&&EC[P.ph],f=pc&&(pc[0]==='f'||pc[0]==='a')?frs(P):g.ph==='i'?[3000,1.8,.2]:[1600,1,.12],a=f[2]*(P&&P.ph==='F'?2.2:.85)*1,r=Math.min(.012*sp,D*.3);
        noise(P&&P.ph==='F'?1800:f[0],P&&P.ph==='F'?.6:f[1]);e(r,v,0,a,0);e(D-2*r,v,0,a,0);e(r,Rb,0,a*.3,0);if(!N)e(.02*sp,cur,0,0,0);return}
      if(v){
        // 母音：左の境い目 → 自分の形（二重母音は、入りの形から終わりの形へ）→ 右の境い目。高さの動き（ct）も、同じ制御点に乗せる。頭に息がつくなら（p t k のあと）、そのあいだは声帯を鳴らさない
        const Te=vE(g),uL=P?(Pv?.25:Math.min(.4,trOf(P)*sp/D)):0,uR=1-(N?(Nv?.25:Math.min(.4,trOf(N)*sp/D)):0),ua=g.wv?1:Math.min(.5,(g.aspT||0)/D),
          base=u=>mixA(v,Te,ss((u-.25)/.6)),bL=base(uL),bR=base(uR),
          F=u=>u<uL?mixA(Lb,bL,1-Math.pow(1-u/uL,2)):u>uR?mixA(bR,Rb,Math.pow((u-uR)/(1-uR),1.4)):base(u),
          nzL=P&&EC[P.ph]&&EC[P.ph][0]==='n',nzR=N&&EC[N.ph]&&EC[N.ph][0]==='n',nzAt=0?(u=>nzR&&u>uR?NP+(NZ-NP)*(u-uR)/(1-uR):nzL&&u<uL?NZ-(NZ-NP)*u/uL:NP):(u=>(nzR&&u>=.999)||(nzL&&u<=uL*.5+.001)?400:NP),
          b0=pf,ct=g.ct,pAt=u=>{if(!ct)return b0;let a=[0,g.c0||1];for(const x of ct){if(u<=x[0])return b0*(a[1]+(x[1]-a[1])*(u-a[0])/(x[0]-a[0]||1));a=x}return b0*a[1]};
        let us=[uL*.5,uL,.4,.55,.7,.85,uR,(1+uR)/2,1];if(ct)for(const x of ct)us.push(x[0]);if(!P)us.push(.018*sp/D);
        us=us.filter(u=>u>.004&&u<=1).sort((a,b)=>a-b).filter((u,i,A)=>!i||u-A[i-1]>.012);if(us[us.length-1]<1)us.push(1);
        if(ua){us=us.filter(u=>Math.abs(u-ua)>.012);us.push(ua);us.sort((a,b)=>a-b)}
        let pu=0;
        for(const u of us){pf=pAt(u);
          const f=F(u),a=st*cl(f[0]/480,.6,1.5);                                // 口の開きの狭い母音（F1 が低い）は、そのままだと大きく鳴りすぎるので、開きに合わせて強さをそろえる
          if(u<=ua){e(D*(u-pu),f,(g.wv?.7:.3)*st,0,0);if(u===ua&&!g.wv)e(.006*sp,f,a,0,1)}
          else e(D*(u-pu),f,a,0,1,nzAt(u));
          pu=u}
        if(!N)e(.05*sp,cur,0,0,1);return}
      const k0=g.J&&g.ph==='dZ'&&Pv&&0?'f':c[0],vd=c[2],bar=vd&&(voiced(P)||!!(CON&&CON.vbar&&!P&&(c[0]==='s'||c[0]==='a')));                 // 日本語の じ は、母音のあいだでは、閉じずに摩擦だけになる
      if(k0==='s'){
        // 破裂音：閉鎖（濁音は、低いうなり）→ 破裂の雑音 →（澄んだ音は）次の音の頭に息。次が破裂・摩擦・鼻音なら、破裂させない
        const pl=c[1],nx=N&&EC[N.ph],rel=!N||Nv||(nx&&(nx[0]==='x'||nx[0]==='h')),bl=(pl==='l'?.005:pl==='a'?.009:.014)*sp,clo=Math.max(.02*sp,D-bl),B=BUR[pl],A=B[2]*1*(vd?.7:1)*(rel?1:.4);
        e(.012*sp,[bar?200:Lb[0],Lb[1],Lb[2],60,110,170],bar?.16*st*VB:0,0,1);
        e(clo-.012*sp,[bar?200:Rb[0],Rb[1],Rb[2],60,110,170],bar?.1*st*VB:0,0,vd?1:0);
        {noise(pl==='v'?cl(Rb[1]*1.25,1500,3200):B[0],B[1]);e(.0015,Rb,vd?.12*st:0,A,vd?1:0);if(rel&&(g.clkX!=null||CON&&CON.click&&(N||pl!=='l')))K[K.length-1][pl==='l'?'clk':'clkn']=(g.clkX!=null?g.clkX:1)*(CON&&CON.click||1)*(vd?.5:1)*CLK[pl]*st;e(bl,Rb,vd?.2*st:0,A*.45,vd?1:0);}
        if(rel){
          if(!vd&&N&&g.aspX!=null)N.aspT=g.aspX;else if(!vd&&N){const sv=Nv?N:N.N&&EV[N.N.ph]?N.N:null;N.aspT=VOT[pl]*(g.J?.45:sv&&sv.st===1?1:g.wi===0?.8:.5)*(P&&P.ph==='s'&&g.wi>0?.3:1)*sp}
          if(!N)e(.035*sp,Rb,vd?0:.14*st,0,0)}}
      else if(k0==='a'){
        const dz=g.ph==='dz',f=frs(g),clo=dz?.025*sp:Math.max(.045*sp,D*.5),fr=dz?Math.max(.04*sp,D-clo):Math.max((vd?.06:.075)*sp,D-clo)*1,va=vd?f[3]*st:0;
        e(.012*sp,[bar?200:Lb[0],Lb[1],Lb[2],60,110,170],bar?.14*st*VB:0,0,1);e(clo-.012*sp,Rb,bar?.1*st*VB:0,0,vd?1:0);noise(f[0],f[1]);
        e(.003,Rb,va*.5,f[2]*1.3,vd?1:0);e(fr*.75,Rb,va,f[2]*.9,vd?1:0);e(fr*.25,Rb,va,f[2]*.2,vd?1:0)}
      else if(k0==='f'){
        const f=frs(g),r=Math.min(.02*sp,D*.3),a=f[2]*(N||P?1:.8),va=vd?f[3]*st:0;noise(f[0],f[1]);
        e(r,mixA(Lb,Rb,.25),va,a,vd?1:0);e(D-2*r,mixA(Lb,Rb,.75),va,a,vd?1:0);e(r,Rb,va,a*.25,vd?1:0)}
      else if(k0==='h'){const V=Nv?vS(N):Lb;e(.012*sp,V,.28*st,0,0);e(D-.012*sp,V,.3*st,0,0)}
      else if(k0==='n'&&g.ph==='X'&&N&&1){const M=mixA(Pv?vE(P):Lb,Nv?vS(N):Rb,.5),a=.7*st;M[3]=150;e(.02*sp,M,a,0,1,NZ);e(Math.max(.02,D-.04*sp),M,a,0,1,NZ);e(.02*sp,Rb,Nv?.8*st:a,0,1,NZ)}       // 母音・摩擦・は行の前の「ん」：鼻にかかった母音
      else if(k0==='n'){const M0=g.ph==='N'&&1?[480,Nv?Rb[1]:Lb[1],Nv?Rb[2]:Lb[2],40,400,520]:NASM[g.ph],nb=0,M=[M0[0],g.ph==='n'?M0[1]:M0[1],M0[2],40,nb||M0[4],nb?nb*1.3:M0[5]],a=.85*st,Dn=Math.max(D,.045*sp)*(P?1:.75),z=NZ;e(.006*sp,M,a,0,1,z);e(Dn-.012*sp,M,a,0,1,z);e(.006*sp,Rb,Nv?.8*st:st,0,1,z)}
      else if(k0==='x'){const T=APT[g.ph],a=.75*st,ua=1?(g.aspT||0)*.8:Math.min(D*.7,g.aspT||0);
        if(ua){e(ua,mixA(Lb,T,.7),.2*st,0,0);e(.006*sp,T,a,0,1);e(Math.max(1?.03*sp:.005,D*.65-ua),T,a,0,1)}else{e(D*.35,T,a,0,1);e(D*.3,T,a,0,1)}
        e(D*.35,Rb,a*1.1,0,1)}
      else if(k0==='4'&&CON&&CON.tap){const B=BUR.a;                                  // ら行：舌先で短く閉じて（声は弱く続く）、小さくはじく
        e(D*.3,[260,Lb[1],Lb[2],80,110,170],.3*st,0,1);e(D*.35,[260,Rb[1],Rb[2],80,110,170],.14*st,0,1);noise(B[0],B[1]);
        e(.0015,Rb,.35*st,B[2]*.3*CON.tap,1);if(CON.click)K[K.length-1].clkn=2*CON.click*st;e(Math.max(.004,D*.35-.0015),Rb,.6*st,B[2]*.06,1)}
      else{e(D*.5,[Lb[0]*.8,Lb[1],Lb[2],60,110,170],.45*st,0,1);e(D*.5,Rb,.55*st,0,1)}
      if(!N)e(.02*sp,cur,0,0,K[K.length-1][8])};

    // 次に来る母音（子音は、次の母音の口の形へ寄りながら鳴る）。あいだの語の切れ目と子音は越える
    const nextV=n=>{for(let j=n+1;j<G.length;j++){const g=G[j];if(g.p||g.q)return null;if(g.ph&&VW[g.ph])return VW[g.ph]}return null};
    const direct=n=>{let j=n+1;while(G[j]&&G[j].w)j++;const g=G[j];return!!(g&&g.ph&&(VW[g.ph]||(g.jp&&APX[g.ph])))};
    const step=(s,n)=>{
      if(NEW&&s.J){if(s.pm)pf=s.pm;const kb=K.length,m=s.mo||(s.q?s:null);if(m&&m.t0==null)m.t0=tt;if(!s.skip)emitEN(s);if(m)m.t1=tt;if(FJ)for(let i=kb;i<K.length;i++)K[i].J=1;return}
      if(s.w){if(!(G[n+1]&&G[n+1].en))k(.013,cur,cav*.6,0,1);return}                       // 日本語は語の切れ目で小さな谷。英語は、語と語を切らずにつなぐ
      if(s.p){k(.03,cur,0,0,1);k(s.p*r2(.07,.11)*(NEW&&S.pz||1)*(FJ?PZ:1),cur,0,0,1);
        if(NEW&&S.gasp&&n<G.length-1&&R()<S.gasp){e(.03,NEU6,0,0,0);e(.11,[620,1500,2600,150,150,200],.2,0,0);e(.05,NEU6,0,0,0)}       // あわてているときは、句のあいだで、息を吸う音が入る
        return}
      if(s.q){k(.02,cur,0,0,1);k(.045,cur,0,0,1);return}
      if(NEW&&s.en){if(s.pm)pf=s.pm;emitEN(s);return}
      if(s.pm)pf=s.pm;const len=s.len||1,am=(s.am||1)*S.amp,st=r2(.8,1)*am,ph=s.ph;
      if(s.l){const b=pf,D=.055*s.l*len;if(s.ct){let pu=0,a=[0,s.c0||1];pf=b*a[1];for(const c of s.ct){pf=b*c[1];k(D*(c[0]-pu)+(c[0]===1?.03:0),cur,cav*.95,0,1);pu=c[0]}}else k(D,cur,cav*.95,0,1);return}
      const F=VW[ph],v=F?F:nextV(n),tov=F?false:direct(n),mx=(v||cur).slice(0,3).map((x,j)=>x*.55+NEU[j]*.45);
      if(F){
        // 母音の本体：高さの動き（ct）と、二重母音の口の動きを、いくつかの制御点に割って置く。計算が増えるのは制御点の数だけ
        const base=pf,ct=s.ct||(s.rise?[[.45,1],[1,s.rise]]:null);if(ct)pf=base*(s.c0||1);
        const body=(D,amp)=>{
          if(!ct&&!F[4]){k(D,F,amp,0,1);return}
          const us=[1];if(ct)for(const c of ct)if(!us.includes(c[0]))us.push(c[0]);if(F[4]&&!us.includes(.42))us.push(.42);us.sort((a,b)=>a-b);let pu=0;
          for(const u of us){
            if(ct){let a=[0,s.c0||1];for(const c of ct){if(u<=c[0]){pf=base*(a[1]+(c[1]-a[1])*(u-a[0])/(c[0]-a[0]||1));break}a=c}}
            const f=F[4]&&u>.42?[0,1,2].map(j=>F[j]+(F[4][j]-F[j])*(u-.42)/.58):F;
            k(D*(u-pu),f,amp*(u===1?.95:1),0,1);pu=u}};
        if(s.en){k(.022,F,st,0,1);body(F[3]*len,st);if(s.last)k(.05,cur,0,0,1)}
        else{if(s.bare)k(.02,F,st*.7,0,1);
          k(.02,F,st,0,1);
          body(r2(.027,.036)*(s.last?1.5:1)*len*(len>1.2?2.2:1),st*.9);
          if(s.last)k(.05,cur,0,0,1)}
        return}
      const B=STOP[ph],Fr=FRIC[ph],Nf=NAS[ph],Ap=APX[ph];
      if(s.dv){const e=s.dv===1;fc=ph==='s'?4300:Fr[0];fq=Fr[1];                             // 母音の落ちた拍：息の音だけ。文末の s は、長めに、はっきり
        k(.014,cur,0,Fr[3]*(e?1.05:.85),0);k(Fr[2]*(e?1.6:1.15),cur,0,Fr[3]*(e?1.05:.85),0);k(e?.05:.016,cur,0,0,0);return}
      if(B){fc=ph==='k'&&v&&v[1]>1700?2700:B[0];fq=B[1];const ba=s.weak?.45:1;
        if(B[4]){k(.018,[250,mx[1],mx[2]],.16,0,1);k(.004,mx,.2,B[3]*ba,1);k(B[2],mx,.3,B[3]*.6*ba,1)}
        else{k(.012,mx,0,0,1);k(.016,mx,0,0,0);k(.004,mx,0,B[3]*ba,0);k(B[2],mx,.08,B[3]*.7*ba,0);if(s.asp&&v){k(.014,v,.2,0,0);k(.022,v,.26,0,0)}}
        if(tov)k(.016,v,st*.75,0,1);else k(.012,mx,0,0,1)}
      else if(Fr){fc=Fr[0];fq=Fr[1];const vd=Fr[4];k(.012,mx,vd*.2,Fr[3],vd);k(Fr[2]*(s.en?len:1),mx,vd*.2,Fr[3],vd);if(tov)k(.018,v,st*.7,0,1);else k(.012,mx,0,0,vd)}
      else if(ph==='h'){const f=v||cur;k(.012,f,.2,0,0);k(.028,f,.32,0,0);if(tov)k(.014,v,st*.75,0,1)}
      else if(Nf){
        if(s.mora){k(.02,Nf,.42*am,0,1);k(.04*len,Nf,.4*am,0,1)}                             // 日本語の「ん」：1拍ぶん
        else if(tov){k(.014,Nf,.3,0,1);k(.028,Nf,.36,0,1);k(.018,v,st*.8,0,1)}               // 音節の頭の鼻音
        else{k(.016,Nf,.34*am,0,1);k(.05*len,Nf,.34*am,0,1)}}                                // 音節の終わりの鼻音
      else if(ph==='4'){const f=v||cur;k(.012,[f[0]*.8,f[1],1900],.3,0,1);if(tov)k(.016,v,st*.8,0,1)}
      else if(Ap){
        if(s.jp){const f=v||cur;k(.014,ph==='j'?VW.i:VW.M,st*.5,0,1);k(.022,f,st*.9,0,1)}    // 日本語の「や行」「わ」
        else{k(.022,Ap,Ap[3]*st,0,1);k(Ap[4]*len,Ap,Ap[3]*st,0,1);if(tov)k(.03,v,st*.85,0,1)}}
    };
    /* 文の中の指定：音素を1つ置くごとに、置いた制御点の時刻を伸び縮みさせ（rate、pause）、強さを掛け（vol）、高さのずれを書きとめる（pitch）。
       指定がなければ、何もしない（当てる前と同じ波形） */
    G.forEach((s,n)=>{const kb=K.length,t0=tt,a=s.mo||s;s._k0=kb;s._ta=t0;step(s,n);if((CONB||s.nbX)&&s.ph)cnbFix(s,kb);
      if(a.cut&&NEW&&s.J&&EV[s.ph]&&!s.wv){const L=K[K.length-1],P=K[K.length-2];                         // q：母音を急に止めて、短い無音を置く
        if(L[4]===0&&P&&L[0]-P[0]>.02){tt=P[0]+.012;L[0]=tt}else e(.012,cur,0,0,1);e(.045*sp,cur,0,0,1)}
      let z=1;if(s.ps!=null&&tt>t0)z=s.ps/(tt-t0);else if(a.rt&&a.rt!==1)z=1/a.rt;
      if(z!==1){for(let i=kb;i<K.length;i++)K[i][0]=t0+(K[i][0]-t0)*z;tt=t0+(tt-t0)*z;if(NEW&&s.J){const m=s.mo||(s.q?s:null);if(m)m.t1=tt}}
      if(a.px||(a.vx!=null&&a.vx!==1))for(let i=kb;i<K.length;i++){if(a.px)K[i].px=a.px;if(a.vx!=null&&a.vx!==1){K[i][4]*=a.vx;K[i][5]*=a.vx}}s._k1=K.length;s._tb=tt});
    k(.04,cur,0,0,1);if(FJ){const fj=fuji(K,JX,S,sp,JT*(o.x&&o.x.jt||1),R,o.x&&o.x.fj);if(o.dbg){o.dbg.fj=fj;o.dbg.bg=JX.bg}}{let any=0;for(const q of K)if(q.px){any=1;break}                                                  // 高さのずれ（<pitch>）：30ミリ秒ほどでなめらかに移る
      if(any){let y=0,pt=0;for(const q of K){const d=q[0]-pt;pt=q[0];y+=((q.px||0)-y)*(1-Math.exp(-d/.03));q[9]*=Math.pow(2,y/12)}}}
    if(o.kfix)o.kfix(K,G,f0b);
    if(DIAG&&!(tt>=0))note('長さが計算できませんでした','');
    if(o.dbg){o.dbg.K=K;o.dbg.G=G;o.dbg.T=T_ALL;o.dbg.dur=tt}if(o.dry)return new Float32Array(0);
    const N=Math.ceil(tt*SRV),out=new Float32Array(N);
    const flt=()=>({a:0,b:0,k:1,a1:0,a2:0,a3:0}),set=(F,f,q)=>{const g=Math.tan(Math.PI*Math.min(f,SRV*.45)/SRV);F.k=1/q;F.a1=1/(1+g*(g+F.k));F.a2=g*F.a1;F.a3=g*F.a2},
      run=(F,x)=>{const v3=x-F.b,v1=F.a1*F.a+F.a2*v3,v2=F.b+F.a2*F.a+F.a3*v3;F.a=2*v1-F.a;F.b=2*v2-F.b;return v1*F.k};
    const f1=flt(),f2=flt(),f3=flt(),ff=flt(),sm=1-Math.exp(-8/SRV/.004),tp=R()*6.28;
    /* 声帯の閉じ方の鋭さ（o.sharp、0〜1。書かなければ 0 で、元の音のまま）：元の波は、開くのと閉じるのが同じ形の、なだらかな山で、高い倍音が弱い（こもった声）。
       sharp を上げると、山の頂きが後ろへ寄り、閉じぎわが急になって、高い倍音が強くなる（口の共鳴の2つめ・3つめが、はっきり鳴る）。ラジオの狭い帯域を通さない声のために足した */
    const shp=cl(o.sharp||0,0,1),tpk=oq*(.5+.22*shp),cex=2-shp;
    let ki=0,c1=K[0][1],c2=K[0][2],c3=K[0][3],av=0,af=0,vo=1,f0=f0b,ph=0,prev=0,pk=1e-6,jit=0;
    if(NEW){
      /* 新しい道すじの音づくり：声帯の波と息の雑音を、鼻の谷と山 → 6つの共鳴の直列 に通す。摩擦と破裂の雑音は、別の1つの共鳴に通して足す */
      const W2=6.283185307/SRV,rs=()=>({a:1,b:0,c:0,p:0,q:0}),sr=(r,f,bw)=>{const c=-Math.exp(-W2*bw),b=2*Math.exp(-.5*W2*bw)*Math.cos(W2*Math.min(f,SRV*.46));r.c=c;r.b=b;r.a=1-b-c},
        R1=rs(),R2=rs(),R3=rs(),R4=rs(),R5=rs(),R6=rs(),RN=rs(),RZ=rs(),smn=1-Math.exp(-8/SRV/.002),shn=cl((shp||.6)+(S.eff||0),.1,1),tpn=oq*(.5+.22*shn),cxn=2-shn,scn=sc*(S.fs||1),wh=S.wh||0;       // 気持ち：力んだ声は鋭く（eff）、笑顔の声は口が横に開いて共鳴が上がる（fs）、ささやきは声帯を鳴らさない（wh）
      sr(R4,3300*scn,250);sr(R5,3750*scn,200);sr(R6,4900*scn,1000);sr(RN,NP,100);
      let b1=70,b2=100,b3=160,za=1,zb=0,zc=0,x1=0,x2=0,hl=0;
      /* 試作（1.4）：kx＝制御点の 14〜17 列め（声帯が開いている割合・閉じ方の鋭さ・息の量・きしみ）を読む。
         nat＝声の出し方の改良 {sync 息を声帯の開閉に合わせる, jit 1周期ごとの長さのゆらぎ, shim 強さのゆらぎ, drift 高さの漂い, b1 開いているあいだ第1共鳴の幅を広げる}。
         どちらも無ければ、1.3.0 と同じ波形（乱数の引き方も変えない） */
      const VM=o.con?o.con.vmod:0,fn2=flt(),ffb=flt();let nb=null,imp=0,impn=0;
      const NT=o.nat||null,KX=!!o.kx,B1M=!!(NT&&NT.b1),SYN=!!(NT&&NT.sync),R1o=rs();let oqv=oq,brx=brv,crk=0,tpx=tpn,cxx=cxn,pj=1,sh=1,cy=0,drf=0;
      for(let i=0;i<N;i++){
        if((i&7)===0){const x=i/SRV;while(ki<K.length-2&&K[ki+1][0]<=x){ki++;if(K[ki].clk)imp+=K[ki].clk;if(K[ki].clkn)impn+=K[ki].clkn}
          const A=K[ki],B=K[ki+1],u=cl((x-A[0])/(B[0]-A[0]||1),0,1),L=j=>A[j]+(B[j]-A[j])*u;
          c1+=(L(1)-c1)*smn;c2+=(L(2)-c2)*smn;c3+=(L(3)-c3)*smn;av=L(4);af=L(5);vo=L(8)*(1-wh);b1=L(11);b2=L(12);b3=L(13);
          if(KX){oqv=L(14);const sv=L(15);brx=L(16);crk=L(17);tpx=oqv*(.5+.22*sv);cxx=2-sv}
          jit+=((R()-.5)-jit)*.3;f0=f0b*L(9)*(1+S.jit*1.4*jit)*(1+S.trem*Math.sin(x*46+tp));if(NT){drf+=((R()-.5)-drf)*.004;f0*=1+NT.drift*drf}
          sr(R1,c1*scn,b1);if(B1M)sr(R1o,c1*scn*(1+.03*NT.b1),b1+NT.b1*(40+.8*b1));sr(R2,c2*scn,b2);sr(R3,c3*scn,b3);sr(RZ,L(10),100);za=1/RZ.a;zb=-RZ.b*za;zc=-RZ.c*za;set(ff,L(6),L(7));nb=A.nb||null;if(nb){if(nb[0])set(ffb,L(6),L(7));set(fn2,nb[1],nb[2])}}
        ph+=f0*pj/SRV;if(ph>=1){ph-=1;
          if(NT||crk>0){cy^=1;if(crk>0&&R()<.06)cy^=1;const sg=cy?1:-1,j=NT?NT.jit:0,s=NT?NT.shim:0;   // 1周期ごとに、長さと強さが少しずつ変わる。きしみ：1周期おきに長い・短いが入れかわる
            pj=1+j*(R()*2-1)+crk*(.28*sg+.25*(R()-.5));sh=1+s*(R()*2-1)+crk*(.35*sg+.3*(R()-.5))}}
        const w=R()*2-1,gl=ph<tpx?Math.pow(Math.sin(1.5708*ph/tpx),2):ph<oqv?Math.pow(Math.max(0,Math.cos(1.5708*(ph-tpx)/(oqv-tpx))),cxx):0,src=gl-oqv*.5,d=src-prev;prev=src;
        const x=d*GV*av*vo*sh+w*GA2*av*(1-vo)*(1+1.6*wh)+w*GA2*brx*.5*av*vo*(SYN?.3+1.7*gl:1)+imp,z=za*x+zb*x1+zc*x2;x2=x1;x1=x;imp=0;
        let y=RN.a*z+RN.b*RN.p+RN.c*RN.q;RN.q=RN.p;RN.p=y;
        y=R6.a*y+R6.b*R6.p+R6.c*R6.q;R6.q=R6.p;R6.p=y;y=R5.a*y+R5.b*R5.p+R5.c*R5.q;R5.q=R5.p;R5.p=y;y=R4.a*y+R4.b*R4.p+R4.c*R4.q;R4.q=R4.p;R4.p=y;
        y=R3.a*y+R3.b*R3.p+R3.c*R3.q;R3.q=R3.p;R3.p=y;y=R2.a*y+R2.b*R2.p+R2.c*R2.q;R2.q=R2.p;R2.p=y;y=B1M&&ph<oqv?R1o.a*y+R1o.b*R1.p+R1o.c*R1.q:R1.a*y+R1.b*R1.p+R1.c*R1.q;R1.q=R1.p;R1.p=y;
        hl+=(x-hl)*.75;                                                    // 4kHz から上の、うすい息（直列の共鳴だけだと、ここが空になる）
        let nz=run(ff,w+impn);impn=0;if(nb){if(nb[0])nz=run(ffb,nz)*1.5;nz+=nb[3]*run(fn2,w)}if(VM&&vo>0)nz*=1+VM*vo*(1.7*gl-.6);   // 雑音：山を足す・すそを切る。濁った摩擦音は、声帯が開くたびに強まる
        const s=y+(x-hl)*HA+af*GF2*nz;
        out[i]=s;const a=s<0?-s:s;if(a>pk)pk=a}
    }else
    for(let i=0;i<N;i++){
      if((i&7)===0){const x=i/SRV;while(ki<K.length-2&&K[ki+1][0]<=x)ki++;
        const A=K[ki],B=K[ki+1],u=cl((x-A[0])/(B[0]-A[0]||1),0,1),L=j=>A[j]+(B[j]-A[j])*u;
        c1+=(L(1)-c1)*sm;c2+=(L(2)-c2)*sm;c3+=(L(3)-c3)*sm;av=L(4);af=L(5);vo=L(8);
        jit+=((R()-.5)-jit)*.3;f0=f0b*L(9)*(1+S.jit*1.4*jit)*(1+S.trem*Math.sin(x*46+tp));
        set(f1,c1*sc,5);set(f2,c2*sc,9);set(f3,c3*sc,10);set(ff,L(6),L(7))}
      ph+=f0/SRV;if(ph>=1)ph-=1;
      // 声帯の波（開いて閉じる山）を微分して、口の共鳴に通す。声帯の鳴らない音は、息の雑音。息まじりの声は、声帯の波に雑音を足す
      const w=R()*2-1,gl=shp?(ph<tpk?Math.pow(Math.sin(1.5708*ph/tpk),2):ph<oq?Math.pow(Math.max(0,Math.cos(1.5708*(ph-tpk)/(oq-tpk))),cex):0):ph<oq?Math.pow(Math.sin(Math.PI*ph/oq),2):0,src=gl-oq*.5,d=src-prev;prev=src;
      const exc=d*GV*av*vo+w*GA*av*(1-vo)+w*GA*brv*.5*av*vo;
      const s=run(f1,exc)+run(f2,exc)*.8+run(f3,exc)*.5+af*GF*run(ff,w);
      out[i]=s;const a=s<0?-s:s;if(a>pk)pk=a}
    for(let i=0;i<N;i++)out[i]*=.9/pk;
    return out;
  }
  // 確かめ用：文が、どんな音素の列になるかを文字で返す
  function phones(text,X){let o=[];String(text).split(/\[([^\]]*)\]/).forEach((part,ix)=>{if(!part.trim())return;const G=ix%2?parseEN(part):expandJP(parse(part,X&&{bidaku:!!X.bidaku,dv:X.devoice!==false,dz:X.dz!==false}));
    o.push(G.map(g=>g.p?'|':g.w?' ':g.q?'Q':g.l?':':g.ph+(g.wv?'°':'')+(g.dv&&!['k','p','tS','ts'].includes(g.ph)?'°':'')+(g.st===1?"'":'')).join(''))});return o.join(' ')}
  const GV=14,GA=.35,GF=.3,GA2=.25,GF2=1.5,HA=.7;
  return{speak,parse,parseEN,parsePH,toPH,phones,STY,SRV,PH:2,isV:ph=>!!EV[ph],EV,EC};
})();
})();
/*</SPEECH-CORE>*/
/*<RADIO>*/
const rnd=RSP_H.rnd;
/* 無線機を通す：帯域を狭め、約6kHzで標本化し直して、9段階（0、±.25、±.5、±.75、±1）に丸める。その送信でいちばん大きい音の5%より小さい音は消え、54%より大きい音は頭打ちになる（もとは3段階で、しきい値は18%。作り直した合成器は音ごとの強弱の差が大きく、18%のままだと声のある区間の4割が無音になったので、聞き比べて決めた）。
   小さな音は消えるか、雑音と一緒にばりばりと割れる。送信の頭と尻で雑音がはじけ、最後に短い確認音が鳴る。d は出力（標本化周波数 sr、長さ n）、v は16kHzの声 */
function triRadio(d,n,v,sr){
  const op=fc=>1-Math.exp(-6.283*fc/sr),k1=op(350),k2=op(3000),kn1=op(500),kn2=op(3200),L=v.length,durV=L/RSP.SRV,T0=.18,HOLD=Math.max(1,Math.round(sr/6000));
  const fp=rnd(0,6.28),fr2=rnd(.4,1.1),ke=1-Math.exp(-1/(sr*.03));
  let h1=0,h2=0,l1=0,l2=0,n1=0,n2=0,env=.05,qv=0,cr=0,ck=1e9;
  let i=0;
  return m=>{const e=Math.min(n,i+m);for(;i<e;i++){const t=i/sr,tv=t-T0,j=tv*RSP.SRV;       // 少しずつ作れるように、続きから m 個ぶん進める関数を返す（終わったら true）
    let x=0;if(j>=0&&j<L-1){const j0=j|0;x=v[j0]+(v[j0+1]-v[j0])*(j-j0)}
    const fade=.8+.2*Math.sin(6.283*fr2*t+fp);
    h1+=(x-h1)*k1;const a=x-h1;h2+=(a-h2)*k1;const b=a-h2;l1+=(b-l1)*k2;l2+=(l1-l2)*k2;                 // 350Hz〜2.6kHz だけ残す
    const w=Math.random()*2-1;n1+=(w-n1)*kn1;n2+=(w-n2)*kn2;const hiss=n2-n1,s=l2*fade+hiss*.03,as=s<0?-s:s;
    env+=((as>env?as:env*.9995)-env)*(as>env?.2:ke);
    if(i%HOLD===0){const th=Math.max(.012,env*.05),top=Math.max(env*.54,th*1.5,.07);if(as<=th)qv=0;else{const q=Math.min(4,1+Math.floor((as-th)/(top-th)*3))/4;qv=s<0?-q:q}}       // 9段階（0、±.25、±.5、±.75、±1）
    let y=qv*.62*2;        // 段が細かくなると声が小さくなるので、もとの3段階のときと同じ大きさ（実効値）に戻す
    if(Math.random()<5/sr){cr=rnd(.2,.6)*(Math.random()<.5?-1:1);ck=0}const pop=cr*Math.exp(-ck/sr*900);ck++;
    const on=tv>-.14&&tv<durV+.1?1:0,sq=(tv>-.16&&tv<-.1)||(tv>durV+.06&&tv<durV+.15)?1:0;
    y+=hiss*(.045+.135*(1-fade))*on+hiss*.5*sq+pop*.14*on;   // v6：雑音を小さく（もとは .1+.3／1.2／.3）
    if(tv>durV+.015&&tv<durV+.06)y+=.2*Math.sin(6.283*1760*t);
    d[i]=y}
  return i>=n}
}
/*</RADIO>*/
/*<OTOSING-CORE>*/
const OtoSing=(function(){
const SR=32000,CT=16,ARTIC=1;
// 母音の共鳴 F1,F2,F3（Hz）。N は「ん」。neut は子音のときの口の形、cs は子音の雑音の高さの倍率、oq は声帯が開いている割合、tilt は声の明るさ
const VOICES={
  otoko:{label:'男',V:{a:[730,1250,2500],i:[290,2250,2950],u:[330,1300,2350],e:[480,1900,2550],o:[480,880,2500],N:[280,1300,2400]},neut:[400,1700,2600],cs:1,oq:.58,tilt:3200,breath:.08,brk:[62,69],ring:3000},
  tenor:{label:'男（高）',V:{a:[790,1360,2700],i:[310,2450,3200],u:[355,1420,2550],e:[520,2070,2760],o:[520,950,2700],N:[300,1420,2600]},neut:[435,1850,2820],cs:1.06,oq:.56,tilt:3600,breath:.1,brk:[64,71],ring:3150},
  onna:{label:'女',V:{a:[890,1350,2900],i:[330,2850,3450],u:[380,1550,2750],e:[520,2250,2950],o:[510,880,2850],N:[310,1500,2800]},neut:[480,1950,3000],cs:1.12,oq:.64,tilt:3800,breath:.22,brk:[67,75],ring:3350},
  kodomo:{label:'子供',V:{a:[1030,1580,3350],i:[380,3250,3950],u:[440,1800,3200],e:[610,2600,3450],o:[590,1020,3300],N:[350,1700,3200]},neut:[560,2250,3400],cs:1.25,oq:.62,tilt:4200,breath:.18,brk:[69,77],ring:3700}};
const REGS={chest:0,mix:.5,falsetto:1,head:1,auto:'auto'};
const BUR={k:[2000,3,.022,.6],g:[1900,3,.012,.35],t:[4300,1.6,.016,.5],d:[3800,1.6,.01,.3],p:[900,1.5,.012,.4],b:[800,1.5,.008,.25],ch:[3200,2,.05,.5],ts:[5200,1.6,.045,.45],j:[3000,2,.04,.35]};
const FRI={s:[5600,1.4,.07,.3],z:[5200,1.4,.05,.22],sh:[3200,2,.075,.38],f:[4200,.8,.05,.14]};
const VOICED={g:1,d:1,b:1,j:1,z:1};
/* ---- 子音の作り直し（0.6。o.artic）----
   話し声の合成（RSP）で作り直した子音の作り方を、歌声に移したもの。前の作りは、どの子音も「母音とまんなかの口の形のあいだ」から始めていたので、
   口のどこで閉じた音か（ぱ・た・か、ば・だ・が、ま・な）が、聞きわけにくかった。
     ・子音ごとに、口のどこを閉じるかで決まる出発点（ローカス）から、母音へわたる。前の母音も、閉じる手前で、その出発点へ寄っていく
     ・ぱ た か は、閉鎖 → 破裂 → 短い息 → 声。ば だ が は、閉鎖のあいだ低くうなる。破裂の雑音の高さは、閉じる場所で決まる（か行は、次の母音で動く）
     ・ま行・な行・「ん」は、鼻へ抜ける低いこもった音（上の共鳴を弱める）。出入りは急に変わる。「ん」は、次の音で形が変わる（ぱ行の前は m、た行の前は n、か行の前は ŋ）
     ・ざ行は、語の頭と「ん」「っ」のあとでは、いったん閉じる（dz）。「ひ」は ç、「ふ」は ɸ
     ・子音と母音の入りは、次の拍までに収まるように縮める（前の作りは、速い曲で、歌詞が拍から遅れていった）
   子音の表（CN）：[作り方, 閉じる場所, 声帯が鳴るか, 長さ(ミリ秒)]。作り方 s 破裂 / a 破擦 / f 摩擦 / n 鼻 / h 息 / 4 はじき。場所 l 唇 / a 歯ぐき / v 奥 / y 舌の前（し・ち・じ・ひ・に）
   長さは RSP の値（参照の声に寄せたもの）。ローカスの式・破裂と摩擦の雑音の帯域も RSP から（(推定) 文献を目安にした見積もりを含む）。強さの釣り合いは、歌声に合わせて決め直した */
const CN={v:['f','l',1,60],T:['f','a',0,90],D:['f','a',1,50],Z:['f','y',1,65],N:['n','v',1,70],L:['x','a',1,70],R:['x','a',1,70],W:['x','l',1,60],Y:['x','y',1,60],   // ← 英語（0.8）
  k:['s','v',0,62],g:['s','v',1,50],t:['s','a',0,55],d:['s','a',1,45],p:['s','l',0,62],b:['s','l',1,50],ch:['a','y',0,80],ts:['a','a',0,80],j:['a','y',1,62],dz:['a','a',1,65],
  s:['f','a',0,80],z:['f','a',1,60],sh:['f','y',0,85],f:['f','l',0,65],C:['f','y',0,70],h:['h','',0,65],n:['n','a',1,48],m:['n','l',1,52],r:['4','a',1,24]};
const LOCS={l:[.75,130],a:[.5,900],v:[.79,600],y:[.3,1600]},TRP={l:.04,a:.05,v:.06,y:.05},VOT={l:.02,a:.025,v:.04},
  BURN={l:[600,1,.9],a:[4800,1.1,.45],v:[0,3,1]},
  FRS={v:[2800,.35,.03,.42],T:[4200,.4,.05,0],D:[2500,.35,.012,.42],Z:[3500,2.6,.3,.35],s:[6000,1.3,.36,0],z:[6000,1.3,.22,.35],sh:[3500,2.6,.56,0],ch:[4250,1.3,.7,0],j:[4250,1.3,.5,.3],ts:[5600,1.3,.36,0],dz:[6000,1.3,.26,.35],f:[2200,.4,.05,0],C:[4300,1.1,.1,0]};
/* ---- 英語の音節（0.8）----
   英語を歌うために足した材料。値は、話し声の合成 RSP の英語の表（男の声）から移した（(推定) 強さは、歌声に合わせた見積もり）。
   母音：男の声の共鳴。声ごとの値は、その声の あいうえお が男の声の何倍かを、共鳴ごとにならして掛ける（XV）。'eI>' のように > のつく行は、二重母音の終わりの形
   接近音（XAP）：l・r・w・y の口の形。Ld は、語末の暗い l */
const EVM={I:[400,1800,2570],E:[530,1680,2500],'{':[700,1750,2450],A:[730,1100,2500],O:[600,990,2570],U:[450,1100,2350],uw:[330,950,2200],V:[620,1220,2550],'@':[500,1400,2500],'3':[470,1270,1540],
  eI:[480,1720,2520],'eI>':[330,2020,2600],aI:[710,1260,2550],'aI>':[400,1880,2500],oU:[540,1100,2300],'oU>':[450,900,2300],aU:[730,1350,2500],'aU>':[450,950,2350],OI:[550,960,2400],'OI>':[360,1820,2450]},
  VD={eI:1,aI:1,oU:1,aU:1,OI:1},XAP={L:[310,1050,2880],R:[310,1060,1380],W:[290,610,2150],Y:[260,2200,3000],Ld:[430,850,2750]},GLD={y:[260,2200,3000],w:[290,610,2150],L:[310,1050,2880],R:[310,1060,1380]};
function XV(vc){const B=VOICES.otoko.V,r=[0,1,2].map(j=>Math.exp(['a','i','u','e','o'].reduce((s,v)=>s+Math.log(vc.V[v][j]/B[v][j]),0)/5)),o=Object.assign({},vc.V);
  for(const k in EVM)o[k]=EVM[k].map((y,j)=>y*r[j]);return o}
const KT={};
('あa いi うu えe おo かka きki くku けke こko さsa しshi すsu せse そso たta ちchi つtsu てte とto なna にni ぬnu ねne のno '+
 'はha ひhi ふfu へhe ほho まma みmi むmu めme もmo やya ゆyu よyo らra りri るru れre ろro わwa をo '+
 'がga ぎgi ぐgu げge ごgo ざza じji ずzu ぜze ぞzo だda ぢji づzu でde どdo ばba びbi ぶbu べbe ぼbo ぱpa ぴpi ぷpu ぺpe ぽpo').split(' ').forEach(p=>{KT[p[0]]=p.slice(1)});
/* かなの行 → 拍の並び。{c,g,v} / {n:1} ん / {l:1} ー。っ は前の拍に q:1 をつける。ch は見せる文字 */
function kana(text){
  const T=[];let st=null,tag=null;
  const style=(st,tag)=>{if(!tag||tag.includes('戻'))return null;const o=Object.assign({},st);delete o.flip;
    for(const m of tag.matchAll(/([地ミ混裏自叫荒鋭返跳囁])\s*(\d*\.?\d+)?/g)){const n=m[2]==null?null:+m[2];
      if(m[1]==='地')o.reg=0;else if(m[1]==='ミ'||m[1]==='混')o.reg=.5;else if(m[1]==='裏')o.reg=1;else if(m[1]==='自')o.reg='auto';else if(m[1]==='叫')o.sh=n==null?1:n;else if(m[1]==='鋭')o.ed=n==null?1:n;else if(m[1]==='返'){o.reg=1;o.flip=1}else if(m[1]==='跳')o.hic=n==null?12:n;else if(m[1]==='囁')o.wh=n==null?1:n;else o.ro=n==null?.6:n}
    return o};
  for(const ch0 of String(text)){
    if(tag!==null){if(ch0==='】'){st=style(st,tag);tag=null}else tag+=ch0;continue}   // 【 】：声の出し方を、ここから切りかえる
    if(ch0==='【'){tag='';continue}
    let ch=ch0;const cc=ch.charCodeAt(0);if(cc>=0x30a1&&cc<=0x30f6)ch=String.fromCharCode(cc-0x60);
    const last=T[T.length-1],n0=T.length;
    if(KT[ch]){const r=KT[ch];let c=r.slice(0,-1),g='';if(c==='y'||c==='w'){g=c;c=''}T.push(Object.assign({c,g,v:r.slice(-1),ch:ch0},st))}
    else if('ゃゅょ'.includes(ch)&&last&&last.v){last.v={'ゃ':'a','ゅ':'u','ょ':'o'}[ch];if(last.c!=='sh'&&last.c!=='ch'&&last.c!=='j')last.g='y';last.ch+=ch0}
    else if('ぁぃぅぇぉ'.includes(ch)&&last&&last.v){last.v={'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o'}[ch];last.ch+=ch0}
    else if(ch==='ん')T.push(Object.assign({n:1,ch:ch0},st));else if(ch==='ー'||ch==='〜')T.push(Object.assign({l:1,ch:'ー'},st));
    else if(ch==='っ'){if(last)last.q=1}
    if(T.length>n0&&st&&st.hic!=null){st=Object.assign({},st);delete st.hic}   // 【跳】は、次のかな1つだけ
  }
  return T;
}
const SEMI={c:0,d:2,e:4,f:5,g:7,a:9,b:11},AH={c:'',g:'',v:'a',ch:'あ'};
/* 譜面 → {tempo, voice, notes:[{t,dur,midi,m,vel,join}], end}（t と dur は秒） */
function parse(score,o){
  o=o||{};let tempo=96,voice=null;const ev=[];let beat=0,pend=[];const errs=[];
  String(score).split(/\r?\n/).forEach((raw,li)=>{
    const line=raw.replace(/(^|\s)#.*$/,'').replace(/\/\/.*$/,'').trim();if(!line)return;
    let m;
    if((m=/^tempo\s+([\d.]+)$/i.exec(line))){tempo=+m[1];return}
    if((m=/^voice\s+(\w+)$/i.exec(line))){voice=m[1];return}
    const toks=line.split(/\s+/).filter(x=>x!=='|');
    const isNote=x=>/^([A-Ga-g][#b]?-?\d|[Rr_])[!?]*(:[\d.]+)?[!?]*$/.test(x);
    if(toks.every(isNote)){
      for(const x0 of toks){let vel=1;const x=x0.replace(/[!?]/g,c=>{vel*=c==='!'?1.3:.55;return''}),[h,l]=x.split(':'),len=l?+l:1;
        if(!/^[Rr_]$/.test(h)){const mm=/^([A-Ga-g])([#b]?)(-?\d)$/.exec(h);
          const n={beat,len,vel,midi:SEMI[mm[1].toLowerCase()]+(mm[2]==='#'?1:mm[2]==='b'?-1:0)+12*(+mm[3]+1)};ev.push(n);pend.push(n)}
        beat+=len}
      return}
    const T=kana(line);
    if(!T.length){errs.push((li+1)+'行目: 読めない行です（音符でも、かなでもない）');return}
    if(T.length!==pend.length)errs.push((li+1)+'行目: 音符 '+pend.length+' 個に、かな '+T.length+' 個');
    T.forEach((s,i)=>{if(pend[i])pend[i].m=s});pend=[];
  });
  if(errs.length)throw new Error(errs.join('\n'));
  if(!ev.length)throw new Error('音符がありません');
  if(o.tempo)tempo=o.tempo;const spb=60/tempo;
  return{tempo,voice:o.voice||voice||'onna',end:beat*spb,beats:beat,
    notes:ev.map((n,i)=>({t:n.beat*spb,dur:n.len*spb,midi:n.midi,m:n.m||AH,vel:n.vel,beat:n.beat,len:n.len,join:!!ev[i+1]&&Math.abs(ev[i+1].beat-n.beat-n.len)<1e-6}))};
}
function sing(score,o){
  o=Object.assign({pad:.12},o);const S=typeof score==='string'?parse(score,o):score;
  if(o.transpose)S.notes.forEach(n=>n.midi+=o.transpose);
  if(!o.voice)o.voice=S.voice;
  const out=singNotes(S.notes,o);out.lead=o.pad;return out;
}
/* 時刻つきの音符を歌う */
function singNotes(N,o){
  o=o||{};const vc=VOICES[o.voice]||VOICES.onna,df=(x,d)=>x==null?d:x,cl=(x,a,b)=>x<a?a:x>b?b:x;
  let sd=(df(o.seed,1)*2654435761)>>>0;const R=()=>{sd=(sd+0x6D2B79F5)>>>0;let t=sd;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296},r2=(a,b)=>a+R()*(b-a);
  const SN=o.nat||null,VOB={b:1,d:1,g:1,z:1,j:1,v:1,D:1,Z:1},VLS={k:1,s:1,sh:1,t:1,ch:1,ts:1,h:1,f:1,p:1,T:1},
    pcAt=(A,u)=>{if(u<=A[0][0])return A[0][1];for(let i=1;i<A.length;i++)if(u<=A[i][0]){const a=A[i-1],b=A[i];return a[1]+(b[1]-a[1])*(u-a[0])/(b[0]-a[0]||1)}return A[A.length-1][1]};
  const tune=df(o.tune,1),shape=df(o.shape,1),brM=df(o.breath,1),onM=df(o.onset,1),vibM=df(o.vib,1),E=df(o.expr,1),gl0=o.glide||0,T0=o.pad||0,ROOM=df(o.room,.43);   // room: 音符の手前の何秒までに、息つぎと子音を収めるか
  const V=vc.VX||(vc.VX=XV(vc)),br0=vc.breath*brM,onB=.5*onM,n0=N.length;
  const PF1=df(o._pf1,.6),PF2=df(o._pf2,.2),PUF=o.oldpuff?(x,bm)=>onB*x.ob:(x,bm)=>Math.min(onB*x.ob,br0*bm*onM*(x.first?PF1:PF2));   // 0.9.2：音符の頭の息は、伸ばしているあいだの息に比例（フレーズの頭 0.6 倍、つながった頭 0.2 倍まで）
  const INH=df(o.inhale,1),BATK=Math.max(0,df(o.batk,0)),BVG=df(o._bvg,.4),BVF=o.bvow&&V[o.bvow]&&V[o.bvow].length>=3?V[o.bvow]:null;   // 0.9.1：息を吸う音の大きさ／息の雑音を通す母音
  const ASL=df(o._asl,.4),ASH=df(o._ash,1.25),KQ=df(o._kq,2),HA=df(o._ha,.7);
  const HC=df(o._hc,0),GN=df(o._gn,0),BL=df(o._bl,1),BV=df(o._bv,1),GV=df(o._gv,.5);
  const AR=df(o.artic,ARTIC)>0,fsc=vc.neut[1]/1700,NA=df(o._na,.83),NZG=df(o._nz,.72),mixF=(a,b,u)=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u];
  // ローカス：子音と母音の境い目での共鳴。母音の第2共鳴から、閉じる場所ごとの直線で決める（男の声の値で作ってあるので、声の大きさに合わせて伸び縮みさせる）
  const locus=(pl,F)=>{const f2=F[1]/fsc,f3=F[2]/fsc,L=LOCS[pl],x=L[0]*f2+L[1];let r;
    if(pl==='l')r=[230,x,f3-350];else if(pl==='a')r=[230,x,.4*f3+1620];else if(pl==='v'){const y=Math.min(2350,x,f2+180);r=[230,y,Math.max(2050,Math.min(2950,y+450))]}else r=[250,x,.3*f3+1950];
    return[r[0]*fsc,r[1]*fsc,r[2]*fsc]};
  if(!n0)return new Float32Array(0);
  /* 英語の子音ひとつぶんの区間を作る（頭の子音の前に足す子音と、語末の子音）。Fa＝前の音の共鳴、Fb＝後ろの音の共鳴（なければ null）。
     rel＝破裂させるか（次が破裂音なら、破裂させずに次へ）。coda＝語末か。区間の形は、下の「下ごしらえ」と同じ */
  /* 調整のための切りかえ。_xa 英語の l・r を長く保つ（既定で入）／_xb 語末の鼻音を、手前の母音から鼻にかけて長めにする（既定で切）／_xc 語末の子音を縮める下限。
     音声認識（Whisper tiny.en・base.en）に英語の歌 64本を聞かせてくらべた。_xa は、調整用の句で少し良く（語の正解 67.5% → 70%）、使わなかった句でも悪くならなかったので入れた。
     _xb は、調整用では少し良かったが、使わなかった句では2つの聞き手とも下がったので、入れていない。_xc は差が出なかった（(推定) どれも差は小さく、句の数も少ない） */
  const XA_=df(o._xa,1)>0,XB_=df(o._xb,0)>0,XC_=df(o._xc,.4);
  const xs=(key,Fa,Fb,rel,coda)=>{const cn=CN[key];if(!cn)return[];const m=cn[0],pl=cn[1],vd=cn[2],D=cn[3]/1000,lo1=200*fsc,cx=Fb||Fa||vc.neut,
      Lb=pl&&m!=='x'?locus(pl,Fa||cx):(Fa||cx),Rb=pl&&m!=='x'?locus(pl,Fb||cx):(Fb||cx),bar=vd&&!!Fa;
    if(m==='x'){const T=XAP[key==='L'&&coda?'Ld':key].map(y=>y*fsc);return[[D*.45,T,.7,0,1],[D*.55,T,.72,0,1]]}
    if(m==='s'){const bl=pl==='l'?.008:pl==='a'?(vd?.006:.009):vd?.01:.018,B=BURN[pl],A=B[2]*NA*(pl==='v'?BV:pl==='l'?BL:1)*(vd?.35:1)*(rel?1:.3),bc=pl==='v'?cl(Rb[1]*1.25,1100*fsc,2800*fsc):B[0]*vc.cs,
        q=[[.012,[bar?lo1:Lb[0],Lb[1],Lb[2]],bar?.16:0,0,1],[Math.max(.02,D-bl)-.012,[bar?lo1:Rb[0],Rb[1],Rb[2]],bar?.1:0,0,vd?1:0],[.002,Rb,vd?.12:0,A,vd?1:0,[bc,pl==='v'?KQ:B[1]]],[bl,Rb,vd?.2:0,A*.45,vd?1:0]];
      if(!vd&&rel&&coda)q.push([.03,Rb,.18,0,0]);return q}
    if(m==='a'){const f=FRS[key],clo=Math.max(.04,D*.45),fr=Math.max(vd?.05:.065,D*.5),va=vd?f[3]:0;
      return[[.012,[bar?lo1:Lb[0],Lb[1],Lb[2]],bar?.14:0,0,1],[clo-.012,[bar?lo1:Rb[0],Rb[1],Rb[2]],bar?.1:0,0,vd?1:0],[.003,Rb,va*.5,f[2]*NA*1.3,vd?1:0,[f[0]*vc.cs,f[1]]],[fr*.75,Rb,va,f[2]*NA*.9,vd?1:0],[fr*.25,Rb,va,f[2]*NA*.2,vd?1:0]]}
    if(m==='f'){const f=FRS[key],r=Math.min(.02,D*.3),a=f[2]*NA,va=vd?f[3]:key==='f'?.15:0;return[[r,mixF(Lb,Rb,.25),va,a,vd?1:0,[f[0]*vc.cs,f[1]]],[D-2*r,mixF(Lb,Rb,.75),va,a,vd?1:0],[r,Rb,va,a*.25,vd?1:0]]}
    if(m==='h')return[[.012,cx,.8*HA,0,0],[D-.012,cx,HA,0,0]];
    if(m==='n'){const M=[V.N[0],(pl==='l'?1100:pl==='v'?2100:1600)*fsc,(pl==='l'?2150:2600)*fsc],Dn=Math.max(D,coda&&XB_?.085:.06);return[[.006,M,.42,0,1,null,1],[Dn-.012,M,.42,0,1,null,1],[.006,M,.36,0,1,null,1]]}
    return[[D*.5,[Lb[0]*.8,Lb[1],Lb[2]],.45,0,1],[D*.5,Rb,.55,0,1]]};
  // フレーズ（つながった音符のまとまり）ごとに、位置と高さの平均を出しておく
  const X=N.map(e=>({e,m:e.m||AH,vel:cl(df(e.vel,1),.25,2.2)}));
  // 声の出し方：音符ごとに [開いている割合, 山のかたより, 明るさ, 息, 強さ, 第1共鳴の倍率, 第2共鳴の倍率, 荒れ, あごの開き, 母音の寄り, 第3共鳴の倍率, 鳴り, 高い側の強さ, 第1共鳴のなだらかさ, 囁きの息]
  const oReg=o.reg==null||o.reg===''?null:(o.reg in REGS?REGS[o.reg]:+o.reg),oSh=cl(+o.shout||0,0,1),oEd=cl(+o.edge||0,0,1),oWh=cl(+o.whisper||0,0,1);
  const BW=df(o._bw,7),AW=df(o._aw,.4),mkP=(reg,sh,ed,ro,vel,wh)=>{
    let oq=vc.oq,sk=.7,tl=1,bm=1,am=1,f1s=1,f2s=1,vb=1,ob=1,f3s=1,ring=0,gm=1,q1=1;
    if(reg!=null&&isFinite(reg)){const r=cl(+reg,0,1);oq=.45+.3*r;sk=.72-.14*r;tl=1.15*Math.pow(.26,r);bm=.7+1.5*r;am=1.08-.59*r;f1s=1-.08*r;f2s=1-.06*r;vb=1-.15*r;ob=1+.8*r}
    if(sh>0){oq+=sh*(.36-oq);sk+=sh*(.8-sk);tl*=1+.9*sh;bm*=1-.5*sh;am*=1+.65*sh;vb*=1-.6*sh;ob*=1-sh}
    // 鋭さ：口の共鳴を寄せ（第1・第2は上へ、第3は下へ）、3kHz あたりに山を足し、1〜3kHz を強くする。声帯はより強く閉じる
    if(ed>0){oq=Math.max(.3,oq-.05*ed);tl*=1+.5*ed;bm*=1-.3*ed;f1s*=1+.16*ed;f2s*=1+.08*ed;f3s=1-.07*ed;ring=.7*ed;gm=1+.5*ed}
    // 囁き：声帯が閉じきらない。開いている割合が大きく、山は左右対称に近く、高い倍音は出ず、息の雑音が多い。第1共鳴の山はなだらか
    if(wh>0){oq+=wh*(.85-oq);sk+=wh*(.56-sk);tl*=Math.pow(.2,wh);am*=1-AW*wh;vb*=1-.5*wh;ob*=1+2*wh;q1=1+wh}
    return{vb,ob,P:[oq,sk,tl,bm,am,f1s,f2s,cl(ro,0,1.2)*cl(.5+.5*vel,.5,1.4),.3*sh,.12*sh,f3s,ring,gm,q1,BW*br0*wh]}};
  for(const x of X){const m=x.m;let reg=m.reg!=null?m.reg:oReg;const sh=cl(m.sh!=null?m.sh:oSh,0,1),ed=cl(m.ed!=null?m.ed:oEd,0,1),wh=cl(m.wh!=null?m.wh:oWh,0,1),ro=m.ro!=null?m.ro:(o.rough!=null?+o.rough:.5*sh);
    if(reg==='auto'){const u=cl((x.e.midi-vc.brk[0])/(vc.brk[1]-vc.brk[0]),0,1);reg=u*u*(3-2*u)}
    if(reg!=null&&!isFinite(reg))reg=null;
    const y=mkP(reg,sh,ed,ro,x.vel,wh);x.sh=sh;x.ed=ed;x.wh=wh;x.vb=y.vb;x.ob=y.ob;x.P=y.P;x.leg=reg==null&&sh===0&&ed===0&&wh===0;x.flip=!!m.flip;
    if(m.hic){x.hic=+m.hic;x.hd=Math.min(.11,x.e.dur*.4);x.PH=mkP(1,sh,ed,ro,x.vel,wh).P}}
  for(let i=0;i<n0;){let j=i;while(j<n0-1&&N[j].join)j++;
    const a=N[i].t,b=N[j].t+N[j].dur;let ms=0,ws=0;for(let q=i;q<=j;q++){ms+=N[q].midi*N[q].dur;ws+=N[q].dur}
    for(let q=i;q<=j;q++){const x=X[q],p=(N[q].t+N[q].dur*.5-a)/Math.max(.001,b-a);x.first=q===i;x.last=q===j;x.plen=b-a;
      // 抑揚：フレーズの6割あたりまでふくらんで、おさまる。高い音は少し強く
      const arch=1-.14*E*Math.pow(Math.abs(p-.6)/.6,1.6),hi=1+cl(.014*E*(N[q].midi-ms/ws),-.12,.14);
      x.amp=x.vel*(b-a>1.2?arch:1)*hi;x.tm=Math.pow(cl(x.vel*hi,.4,1.9),.6);x.bm=Math.pow(x.vel,-.6)}
    i=j+1}
  // 制御点：[時刻, F1,F2,F3, 声の強さ, 雑音の強さ, 雑音の中心, 雑音のQ, 声帯が鳴っているか, 息の量, 明るさ]
  const K=[];let tt=0,cur=V.a,cav=0,fc=4000,fq=1,tm=1,bm=1,nzc=0;
  const P=AR?(t,F,av,af,vo,br)=>{if(t<tt+.0015)t=tt+.0015;tt=t;cur=F;cav=av;K.push([t,F[0],F[1],F[2],av,af||0,fc,fq,vo==null?1:vo,br==null?br0*bm:br,tm,nzc])}
    :(t,F,av,af,vo,br)=>{if(t<tt+.003)t=tt+.003;tt=t;cur=F;cav=av;K.push([t,F[0],F[1],F[2],av,af||0,fc,fq,vo==null?1:vo,br==null?br0*bm:br,tm])};
  const noise=(c,q)=>{fc=c;fq=q;const L=K[K.length-1];if(!L[5]){L[6]=c;L[7]=q}};
  const k=(dt,F,av,af,vo,br)=>P(tt+dt,F,av,af,vo,br),hold=t=>{if(t>tt+.006)P(t,cur,cav,0,1)};
  K.push([0,cur[0],cur[1],cur[2],0,0,fc,fq,1,br0,1,0]);
  if(AR){
    /* 下ごしらえ：音符ごとに、子音を「区間の並び」に直しておく。区間＝[長さ, 共鳴, 声の強さ, 雑音の強さ, 声帯が鳴るか, 雑音の帯域, 鼻] */
    let lastV=null;
    X.forEach((x,i)=>{const s=x.m,e=x.e,pv=i>0?X[i-1]:null,joined=!!(pv&&pv.e.join),prevF=joined?(pv.vE||pv.vt||lastV):null;
      if(s.l){x.vt=prevF||lastV||V.a;x.nzt=pv&&joined?pv.nzt||0:0;if(s.dg&&V[s.dg+'>']){x.vE=x.v2g=V[s.dg+'>'];lastV=x.vE}return}
      let v,nzt=0;
      if(s.n){const nx=X[i+1],c2=nx&&e.join&&!nx.m.n&&!nx.m.l?(nx.m.c||''):null,ty=c2==='p'||c2==='b'||c2==='m'?'m':c2==='k'||c2==='g'?'N':c2==='t'||c2==='d'||c2==='n'||c2==='r'||c2==='z'||c2==='ch'||c2==='ts'||c2==='j'||c2==='s'||c2==='sh'?'n':'X';
        v=[V.N[0],{m:1100,n:1600,N:2100,X:1350}[ty]*fsc,{m:2150,n:2600,N:2600,X:2450}[ty]*fsc];nzt=1;
        if(ty==='N'&&nx.m.v){const L=locus('v',V[nx.m.v]);v=[V.N[0],L[1],L[2]]}}
      else v=V[s.v];
      const c0=s.n?'':(s.c||''),pal=(c0==='n'||c0==='r')&&(s.v==='i'||s.g==='y'),ini=!prevF||!!(pv&&(pv.m.n||pv.m.q)),gem=pv&&pv.m.q&&prevF?.09:0;
      let key=c0==='h'&&s.v==='i'&&!s.g&&HC?'C':c0;if(key==='z'&&ini)key='dz';
      const cn=CN[key]||null,pl=cn&&cn[1]?(pal?'y':cn[1]):null,G=s.g?(GLD[s.g]||GLD.w).map(y=>y*fsc):null,vT=G||v;
      const seg=[];let Rb=vT,TR=.03,tr0=0,q0=0;
      if(cn){const m=cn[0],vd=cn[2],D=cn[3]/1000,bar=vd&&!!prevF,lo1=200*fsc;if(pl){Rb=locus(pl,vT);TR=TRP[pl]}
        const Lb=prevF&&pl?locus(pl,prevF):Rb;
        if(m==='s'&&key==='g'&&GN&&prevF&&!ini){const M=[V.N[0],Rb[1],Rb[2]];seg.push([.008,[V.N[0],Lb[1],Lb[2]],.5,0,1,null,GN],[D-.01,M,.5,0,1,null,GN],[.004,Rb,.55,BURN.v[2]*NA*.25,1,[cl(Rb[1]*1.25,1500*fsc,2800*fsc),3],0],[.008,Rb,.6,0,1,null,0])}
        else if(m==='s'){const iv=vd&&!prevF,bl=pl==='l'?.008:pl==='a'?(vd?.006:.009):vd?.01:.018,clo=Math.max(.02,D-bl)+gem,B=BURN[pl],A=B[2]*NA*(pl==='v'?BV:pl==='l'?BL:1)*(vd?(iv?.8:pl==='v'?GV:.3):1),bc=pl==='v'?cl(Rb[1]*1.25,1100*fsc,2800*fsc):B[0]*vc.cs,vot=vd?0:VOT[pl]*(s.asp?2.2:1);
          // 閉鎖（濁音は、低いうなり。フレーズの頭の濁音は、うなりを先に出してから、はっきり破裂させる）→ 破裂 →（澄んだ音は）短い息
          seg.push([.012,[bar||iv?lo1:Lb[0],Lb[1],Lb[2]],bar?.16:iv?.1:0,0,1],[clo-.012,[bar||iv?lo1:Rb[0],Rb[1],Rb[2]],bar?.1:iv?.14:0,0,vd?1:0],[.002,Rb,vd?.12:0,A,vd?1:0,[bc,pl==='v'?KQ:B[1]]],[bl,Rb,vd?.2:0,A*.45,vd?1:0]);
          if(vot){const u=1-Math.pow(1-Math.min(1,vot/TR),2);seg.push([vot,mixF(Rb,vT,u),pl==='l'?.1:.25,0,0]);tr0=vot}q0=2}
        else if(m==='a'){const iv=vd&&!prevF,f=FRS[key],dz=key==='dz',clo=(dz?(iv?.04:.025):Math.max(.045,D*.5))+gem,fr=dz?Math.max(.04,D-.025):Math.max(vd?.06:.075,D*.5),va=vd?f[3]:0;
          seg.push([.012,[bar||iv?lo1:Lb[0],Lb[1],Lb[2]],bar?.14:iv?.1:0,0,1],[clo-.012,[bar||iv?lo1:Rb[0],Rb[1],Rb[2]],bar?.1:iv?.14:0,0,vd?1:0],[.003,Rb,va*.5,f[2]*NA*(iv?1.9:1.3),vd?1:0,[f[0]*vc.cs,f[1]]],[fr*.75,Rb,va,f[2]*NA*(iv?1.4:.9),vd?1:0],[fr*.25,Rb,va,f[2]*NA*.2,vd?1:0]);q0=2}
        else if(m==='f'){const f=FRS[key],Df=D+gem,r=Math.min(.02,Df*.3),a=f[2]*NA,va=vd?f[3]:key==='f'?.15:key==='C'?.4:0;       // ふ・ひ は、息の音（口の共鳴を通った雑音）に、こすれる音を少し足したもの
          seg.push([r,mixF(Lb,Rb,.25),va,a,vd?1:0,[f[0]*vc.cs,f[1]]],[Df-2*r,mixF(Lb,Rb,.75),va,a,vd?1:0],[r,Rb,va,a*.25,vd?1:0])}
        else if(m==='h')seg.push([.012,vT,.8*HA,0,0],[D-.012,vT,HA,0,0]);
        else if(m==='n'){const M=[V.N[0],(pl==='l'?1100:pl==='y'?1900:1600)*fsc,(pl==='l'?2150:2600)*fsc],Dn=Math.max(D,.06)+gem*.6;seg.push([.006,M,.42,0,1,null,1],[Dn-.012,M,.42,0,1,null,1],[.006,Rb,.9,0,1,null,0]);q0=3}
        else seg.push([D*.5,[Lb[0]*.8,Lb[1],Lb[2]],.45,0,1],[D*.5,Rb,.55,0,1]);
        x.Lb=prevF&&pl&&m!=='h'?Lb:null;x.tV=pl?Math.min(TR*.7,.05):0}
      if(G){if(cn)seg.push([.025,G,.7,0,1],[.015,G,.75,0,1]);else seg.push([.045,G,.78,0,1],[.02,G,.78,0,1]);Rb=G;TR=.075;tr0=0;if(XA_&&(s.g==='R'||s.g==='L')){const n=seg.length;seg[n-2][0]*=s.g==='R'?1.8:1.4;seg[n-1][0]*=1.5;TR=s.g==='R'?.1:.055}}        // や・ゆ・よ・わ：閉じない。ゆっくり寄って、ゆっくり開く
      if(s.pre&&s.pre.length){const ps=[];let La=prevF;for(const c of s.pre){for(const y of xs(c,La,vT,false,false))ps.push(y);La=null}      // 頭の子音の前に置く子音（英語の s+t など）
        for(let q=ps.length-1;q>=0;q--)seg.unshift(ps[q]);
        const p0=CN[s.pre[0]];if(prevF&&p0&&p0[1]&&p0[0]!=='h'&&p0[0]!=='x'){x.Lb=locus(p0[1],prevF);x.tV=Math.min(TRP[p0[1]]*.7,.05)}else{x.Lb=null;x.tV=0}}
      if(x.sh>0)for(const y of seg)y[0]*=1-.2*x.sh;
      // 次の拍までに収める：前の音符の母音を、少なくとも4割（40ミリ秒）は残す。子音は、もとの長さの45%までしか縮めない
      let lead=seg.reduce((a,y)=>a+y[0],0);
      if(pv&&lead>0){const room=e.t-pv.e.t-Math.max(.04,.4*Math.min(pv.e.dur,e.t-pv.e.t)),cf=cl(room/lead,.45,1);if(cf<1){for(const y of seg)y[0]*=cf;lead*=cf;tr0*=cf}}
      x.seg=seg;x.lead=lead;x.Rb=Rb;x.TR=TR;x.tr0=tr0;x.vt=v;x.nzt=nzt;x.q0=q0;x.gem=gem;if(VD[s.v]&&!s.nog&&V[s.v+'>'])x.vE=x.v2g=V[s.v+'>'];lastV=x.vE||v});
    // 語末の子音（英語）：音符の終わりに置く区間を、作っておく。次の音符が破裂音で始まるなら、最後の破裂音は破裂させない
    X.forEach((x,i)=>{const s=x.m;if(!s.coda||!s.coda.length)return;const nx=X[i+1],e=x.e,Fv=x.vE||x.vt||V.a,cs=[],
        nc=nx&&e.join&&!nx.m.l&&!nx.m.n?(nx.m.pre&&nx.m.pre[0])||nx.m.c||'':'',nb=!!CN[nc]&&(CN[nc][0]==='s'||CN[nc][0]==='a');
      s.coda.forEach((c,q)=>{for(const y of xs(c,q?null:Fv,null,!(q===s.coda.length-1&&nb),true))cs.push(y)});
      const p0=CN[s.coda[0]];if(p0&&p0[1]&&p0[0]!=='x'&&p0[0]!=='h'){x.cLb=locus(p0[1],Fv);x.ctV=Math.min(TRP[p0[1]]*.7,.05)}
      x.cod=cs})}
  X.forEach((x,i)=>{
    const e=x.e,s=x.m,t0=e.t+T0,st=x.amp*r2(.94,1);tm=x.tm;bm=x.bm;
    if(s.l){                                                           // ー：母音はそのまま、高さだけ変わる
      if(cav<.2){hold(t0);k(.03,cur,st)}else if(x.flip!==(i>0&&X[i-1].flip)){hold(t0-.016);k(.01,cur,cav*.3);k(.02,cur,st)}   // ひっくり返る瞬間は、声が一瞬とぎれる
      else{hold(t0);k(.05,cur,st)}
    }else if(AR){
      const v=x.vt,pre=x.seg,lead=x.lead,Rb=x.Rb,TR=x.TR,nx=X[i+1],avail=(nx&&e.join?nx.e.t+T0-(nx.lead||0)-(nx.tV||0):t0+e.dur)-t0,am=Math.min(1.2,x.amp),nm=Math.min(1.25,.5+.5*x.vel);
      // 息つぎ：フレーズの前に間があれば、息を吸う音を小さく入れる
      if(x.first&&cav<.05&&E>0&&brM>0){const gap=t0-lead-tt,len=Math.min(.28,gap-.16,ROOM-.07-lead);
        if(gap>.42&&len>.1){const tb=t0-lead-.07-len,nf=vc.neut,a=.17*E*Math.min(1.5,brM)*INH;noise(2400*vc.cs,.7);hold(tb);P(tb+.002,nf,0,0,0);P(tb+len*.55,nf,a,0,0);P(tb+len,nf,a*.5,0,0);k(.03,nf,0,0,0)}}
      if(!pre.length&&!s.n&&cav>.3){hold(t0-.03);k(.03,cur,cav*.55)}       // 母音だけの拍：いったん弱めて、言い直す
      else if(!pre.length&&cav>.05)hold(t0-.01);                             // ん：言い直さず、そのまま鼻へ抜ける
      else if(pre.length&&cav>.05){const tc=t0-lead;                          // 前の母音は、閉じる手前で、子音の出発点へ寄っていく
        if(x.Lb){hold(tc-x.tV);if(tc>tt+.004)P(tc,x.Lb,cav*.92)}else hold(tc)}
      else{hold(t0-lead);if(!pre.length&&cav<.05)P(Math.max(tt,t0-.004),v,0)}
      for(const y of pre){if(y[5])noise(y[5][0],y[5][1]);nzc=y[6]||0;k(y[0],y[1],y[2]*am,y[3]*nm,y[4])}
      const a=s.n?.6*st:st,pr=t=>1-Math.pow(1-Math.min(1,t/TR),2),on=(pre.length?(x.q0===3?.01:x.q0?.016:.02):.02)*(1-.5*x.ed)*(1+x.wh),a1=x.q0===3?.92:.8+.5*x.ed;      // 鼻音のあとは、母音がいきなり鳴る（ここで段がつかないと、な行が や行に聞こえる）
      // 母音の入り：子音の出発点から、母音の形へわたる。入りの3点は、次の子音が始まるまでに収める
      const d2=cl((avail-on)*.3,.008,.03),d3=cl(avail-on-d2-.004,0,.09);
      nzc=x.nzt;tm=x.tm*(1+.6*x.ed);if(o._on)o._on.push([i,tt-t0]);
      k(on,mixF(Rb,v,pr(x.tr0+on)),a*a1,0,1,br0*bm+PUF(x,bm));k(d2,d3>.004?mixF(Rb,v,pr(x.tr0+on+d2)):v,a*(1+.15*x.ed),0,1,br0*bm+PUF(x,bm)*(d3>.004?.6:.2));tm=x.tm;
      if(d3>.004)k(d3,v,a,0,1,br0*bm);
    }else{
      const v=s.n?V.N:V[s.v],mx=v.map((y,j)=>y*.55+vc.neut[j]*.45),c=s.c||'',B=BUR[c],F=FRI[c],pre=[];let on=.02;
      // 子音は拍の手前に置く。母音の頭が、拍に乗る
      if(B){
        if(VOICED[c])pre.push([.02,[250,mx[1],mx[2]],.16,0,1],[.03,[250,mx[1],mx[2]],.15,0,1],[.004,mx,.2,B[3],1],[B[2],mx,.3,B[3]*.6,1]);
        else pre.push([.014,mx,0,0,1],[.045,mx,0,0,0],[.004,mx,0,B[3],0],[B[2]*1.2,mx,.08,B[3]*.7,0]);
      }else if(F){const vd=VOICED[c]?1:0;pre.push([.014,mx,vd*.2,F[3],vd],[F[2],mx,vd*.2,F[3],vd]);on=.022}
      else if(c==='h'){pre.push([.012,v,.2,0,0],[.05,v,.32,0,0]);on=.016}
      else if(c==='n'||c==='m'){const nf=[V.N[0],(c==='n'?1500:1050)*vc.cs,V.N[2]];pre.push([.016,nf,.3,0,1],[.05,nf,.38,0,1])}
      else if(c==='r'){const rf=[v[0]*.8,v[1],1900*vc.cs];pre.push([.012,rf,.3,0,1],[.012,rf,.3,0,1]);on=.018}
      if(s.g){const gv=s.g==='y'?V.i:V.u;pre.push([.02,gv,.5,0,1],[.02,gv,.55,0,1]);on=.035}
      if(x.sh>0)for(const y of pre)y[0]*=1-.2*x.sh;                    // 叫ぶときは、子音が短い
      const lead=pre.reduce((a,y)=>a+y[0],0),pq=i>0&&X[i-1].m.q&&cav>0;
      // 息つぎ：フレーズの前に間があれば、息を吸う音を小さく入れる
      if(x.first&&cav<.05&&E>0&&brM>0){const gap=t0-lead-tt,len=Math.min(.28,gap-.16,ROOM-.07-lead);
        if(gap>.42&&len>.1){const tb=t0-lead-.07-len,nf=vc.neut,a=.17*E*Math.min(1.5,brM)*INH;fc=2400*vc.cs;fq=.7;hold(tb);P(tb+.002,nf,0,0,0);P(tb+len*.55,nf,a,0,0);P(tb+len,nf,a*.5,0,0);k(.03,nf,0,0,0)}}
      if(B||F){fc=(B||F)[0]*vc.cs;fq=(B||F)[1]}
      if(!pre.length&&cav>.3){hold(t0-.03);k(.03,cur,cav*.55)}       // 母音だけの拍：いったん弱めて、言い直す
      else if(pq){hold(t0-lead-.09);k(.02,cur,0);hold(t0-lead)}       // っ：前の音を切って、間を置く
      else{hold(t0-lead);if(!pre.length&&cav<.05)P(Math.max(tt,t0-.004),v,0)}
      pre.forEach(y=>k(y[0],y[1],y[2]*Math.min(1.2,x.amp),y[3]*Math.min(1.25,.5+.5*x.vel),y[4]));
      const a=s.n?.5*st:st;if(o._on)o._on.push([i,tt-t0]);
      tm=x.tm*(1+.6*x.ed);                                             // 鋭い声は、母音の入りが硬い（速く、いったん行きすぎて、明るい）
      k(on*(1-.5*x.ed)*(1+x.wh),v,a*(.8+.5*x.ed),0,1,br0*bm+PUF(x,bm));k(.03,v,a*(1+.15*x.ed),0,1,br0*bm+PUF(x,bm)*.6);tm=x.tm;k(.09,v,a,0,1,br0*bm); // 母音の入り：息を一瞬だけ多く
    }
    if(AR&&(x.v2g||(x.cod&&x.cod.length))){const nx=X[i+1],tEnd=nx&&e.join?nx.e.t+T0-(nx.lead||0)-(nx.tV||0):t0+e.dur,am=Math.min(1.2,x.amp),nm=Math.min(1.25,.5+.5*x.vel),cs=x.cod||[];
      let cd=0;for(const y of cs)cd+=y[0];
      // 語末の子音は、次の音符の子音が始まるまでに収める（母音を3割は残し、子音は、もとの長さの4割までしか縮めない）。休みの前なら、音符の終わりをまたいで置く
      const f=cd>0&&e.join&&nx?cl((tEnd-tt-.03)*.7/cd,XC_,1):1,tv=x.cLb?x.ctV:0,tc=Math.max(tt+.02,cs.length?(e.join&&nx?tEnd-cd*f:tEnd-cd*.6):tEnd-(e.join?0:.07));
      if(x.v2g){const gl=cl((tc-tv-tt)*.5,.03,.18);hold(tc-tv-gl);if(tc-tv>tt+.004)P(tc-tv,x.v2g,cav)}             // 二重母音：はじめの形を保って、終わりぎわに、終わりの形へ滑る
      if(cs.length){if(XB_&&cs[0][6]){hold(tc-tv-.04);nzc=.7}                                                       // 語末が鼻音なら、手前の母音から鼻にかける
        if(x.cLb){hold(tc-tv);if(tc>tt+.004)P(tc,x.cLb,cav*.92)}else hold(tc);
        for(const y of cs){if(y[5])noise(y[5][0],y[5][1]);nzc=y[6]||0;k(y[0]*f,y[1],y[2]*am,y[3]*nm,y[4])}nzc=0;
        if(!e.join)k(.03,cur,0)}}
    if(x.hic){const th=t0+e.dur-x.hd;hold(th-.012);k(.012,cur,cav*.3);k(.018,cur,st*.85)}   // 語尾が跳ねる手前で、声が一瞬とぎれる
    if(!e.join&&!(AR&&x.cod&&x.cod.length)){const tE=t0+e.dur,rl=Math.max(.012,cl(.06+.05*E*Math.min(1,e.dur),.06,.14)*(1-.7*x.ed));hold(tE-rl);k(rl,cur,0)}   // 休みの前は、声を抜く
  });
  k(.1,cur,0);
  const n=Math.ceil((tt+.05)*SR),out=new Float32Array(n);out.sampleRate=SR;
  const flt=()=>({a:0,b:0,k:1,a1:0,a2:0,a3:0}),set=(F,f,q)=>{const g=Math.tan(Math.PI*Math.min(f,SR*.45)/SR);F.k=1/q;F.a1=1/(1+g*(g+F.k));F.a2=g*F.a1;F.a3=g*F.a2},
    run=(F,x)=>{const v3=x-F.b,v1=F.a1*F.a+F.a2*v3,v2=F.b+F.a2*F.a+F.a3*v3;F.a=2*v1-F.a;F.b=2*v2-F.b;return v1*F.k};
  const AIR=cl(df(o.air,0),0,2),AR1=Math.min(AIR,1),AR2=Math.max(AIR-1,0),AIL=1-df(o._al,.92)*AR1,AIM=1-df(o._am,.9)*AR2,AIH=1+df(o._ah,.3)*AR1,AIG=df(o._ag,.25)*AR1,f5=flt();set(f5,df(o._af,5500),df(o._aq,1));   // 息の高さ：1 までは、低い共鳴へ通す息を 8% まで絞り、第3共鳴へ 130%、5.5kHz の広い帯域を足す（第2共鳴の息は残す：高い声では、これが母音の手がかり）。1 から 2 では、第2共鳴の息も 10% まで絞る
  const b1=flt(),b2=flt(),b3=flt();if(BVF){set(b1,BVF[0],5);set(b2,BVF[1],9);set(b3,BVF[2],10)}   // 0.9.1：息の雑音だけを通す、決まった母音の共鳴
  const f1=flt(),f1n=flt(),f2=flt(),f3=flt(),f4=flt(),ff=flt(),FL=BVF?[f1,f1n,f2,f3,f4,f5,b1,b2,b3]:[f1,f1n,f2,f3,f4,f5],lo=Math.log(V.i[0]),lspan=Math.log(V.a[0])-lo,d0=V.o[1]*.95,dspan=V.e[1]*.85-V.o[1]*.95,dtc=CT/SR,sm=1-Math.exp(-dtc/.004),kS=1-Math.exp(-dtc/.02),S=X[0].P.slice(),SRC=!!o.src;
  let oq=S[0],tp=oq*S[1],tn=oq-tp;
  const LV=df(o.level,.85),PREF=df(o.pref,.2),zeta=1-.32*cl(E,0,1.5),GAIN=df(o.gain,1),ktb=6.2832*vc.tilt/SR;
  let ki=0,c1=K[0][1],c2=K[0][2],c3=K[0][3],av=0,af=0,vo=1,br=br0,ni=-1,lp=N[0].midi,lv=0,w0=60,vph=R(),vd=0,jit=0,dr=0,f0=220,ph=0,dl=0,inc=.01,g1=1,g2=.8,g3=.5,kt=.5,trm=1,lvl=1,ca=1,cp=1,cyc=0,sp=0,fvi=0,rn=0,rg=0,r4=0,hon=-2,wn=0,bat=1;
  for(let i=0;i<n;i++){
    if(i%CT===0){const x=i/SR;while(ki<K.length-2&&K[ki+1][0]<=x)ki++;
      const A=K[ki],B=K[ki+1],u=cl((x-A[0])/(B[0]-A[0]||1),0,1),L=j=>A[j]+(B[j]-A[j])*u;
      c1+=(L(1)-c1)*sm;c2+=(L(2)-c2)*sm;c3+=(L(3)-c3)*sm;av=L(4);af=L(5);vo=L(8);br=L(9);
      // 休みのあいだ、共鳴の中の値は 0 へ向かって小さくなりつづけ、ついには非正規化数になって、計算が何倍も遅くなる（長い休みのある歌で、数秒の差）。
      // 32bit の出力で 0 になる大きさ（1.4e-45）よりずっと下（1e-60）まで小さくなったら、きっぱり 0 にする。出力は変わらない（0.7.2）
      if(av===0)for(const F of FL)if(F.a<1e-60&&F.a>-1e-60&&F.b<1e-60&&F.b>-1e-60){F.a=0;F.b=0}
      // 高さ：音符の高さへ、拍の少し手前から移る。跳ぶ幅が大きいほどゆっくり、少し行きすぎて戻る。フレーズの頭は下からしゃくる
      while(ni<n0-1&&N[ni+1].t+T0-(X[ni+1].flip!==X[ni<0?0:ni].flip?.014:.035)<=x){ni++;const q=X[ni],pv=ni>0?N[ni-1].midi:q.e.midi,iv=Math.abs(q.e.midi-pv);
        w0=1/(cl(.014+.0032*iv,.014,.042)+gl0*.4);
        if(ni>0&&q.flip!==X[ni-1].flip){for(let j=0;j<15;j++)S[j]=q.P[j];lp=q.e.midi+(q.flip?.5:-.3);lv=0;w0=1/.01}   // ひっくり返る：出し方も高さも、一瞬で切りかわる
        if(q.first){lp=q.e.midi-.55*E*Math.min(1,q.vel)*(1+q.sh);lv=0;w0=1/(.03+gl0*.4)}
        if(q.e.scoop!=null){lp=q.e.midi-q.e.scoop;lv=0;if(q.e.scoop>0)w0=Math.min(w0,1/.03)}}
      const q=X[Math.max(0,ni)],e=q.e,ta=x-(e.t+T0),tE=e.t+T0+e.dur;if(BATK>0){bat=q.first?cl(ta/BATK,0,1):1;bat*=bat}
      let tg=e.midi+(e.cent?e.cent/100:0);if(e.pc)tg+=pcAt(e.pc,ta/e.dur);
      if(SN){const c=q.m&&q.m.c;if(SN.dip){if(VOB[c])tg-=.5*SN.dip*cl(1-ta/.04,0,1);else if(VLS[c]&&ta>0)tg+=.3*SN.dip*cl(1-ta/.06,0,1)}   // 子音のところの、細かい高さの動き
        if(SN.prep&&e.join&&ni>=0&&ni<n0-1){const nx=N[ni+1],iv=nx.midi-e.midi,u=x-(nx.t+T0-.125);if(u>0&&(iv>=3||iv<=-3))tg-=(iv>0?1:-1)*Math.min(.6,.07*Math.abs(iv))*SN.prep*Math.min(1,u/.05)}}   // 跳ぶ前の、反対向きの予備動作
      if(e.bend&&e.bend.amt)tg+=e.bend.amt*cl((ta-(e.bend.at||0))/Math.max(.01,e.bend.dur||.1),0,1);
      if(q.hic&&x>=tE-q.hd){tg+=q.hic;if(hon!==ni){hon=ni;for(let j=0;j<15;j++)S[j]=q.PH[j];lp=tg+.4;lv=0;w0=1/.01}}   // 語尾が、裏声で上へ跳ねる
      else if(q.last&&E>0)tg-=.4*E*(1+1.5*q.sh)*(1-q.ed)*cl((x-(tE-.1))/.1,0,1.5);                  // 語尾は、少し下がりながら消える
      lv+=(w0*w0*(tg-lp)-2*zeta*w0*lv)*dtc;lp+=lv*dtc;
      dr+=((R()-.5)-dr)*.0025;
      const long=e.vib>0||(e.join&&!q.last?e.dur>.5:e.dur>.4),want=long?(e.vib!=null?e.vib:1)*vibM*.34*(1+.12*(q.vel-1))*cl((ta-(e.vibDelay!=null?e.vibDelay:.19))/.32,0,1)*cl((tE-x)/.12,0,1)*(e.dur>1.3?1.15:1)*q.vb:0;vd+=(want-vd)*.02;
      vph+=dtc*(e.vibRate||5.5)*(1+.08*jit+.03*Math.min(1,ta));jit+=((R()-.5)-jit)*.3;
      const sv=Math.sin(6.2832*vph),fs=440*Math.pow(2,(lp+dr*7*E-69)/12);f0=fs*Math.pow(2,vd*sv/12)*(1+.012*jit);inc=f0/SR;
      trm=1+.09*vd*sv+.03*jit*E;                                          // ビブラートは、強さもわずかにゆれる
      // 声の出し方は、音符の変わり目でなめらかに移す
      const QP=hon===ni?q.PH:q.P;for(let j=0;j<15;j++)S[j]+=(QP[j]-S[j])*kS;r4=S[11];wn=S[14];
      oq=S[0];tp=oq*S[1];tn=oq-tp;kt=1-Math.exp(-ktb*L(10)*S[2]);br*=S[3];av*=S[4];rg=S[7];
      if(rg>.002){rn+=((R()-.5)-rn)*.06;fvi=fs*(.5+.6*rn)/SR}       // 上のひだのふるえ：声の高さの半分あたりで、定まらない
      // あごを開ける：声の高さが第1共鳴に迫ったら、口の開いた母音ほど、第1共鳴を上へ逃がす。叫ぶときは、はじめから開く
      let F1=c1*S[5];if(S[8]>0)F1+=S[8]*(V.a[0]-F1);const open=cl((Math.log(c1)-lo)/lspan,0,1),lim=fs*(1.02+.28*open);if(lim>F1)F1+=tune*open*(lim-F1);
      let F2=c2*S[6];if(S[9]>0)F2+=S[9]*(vc.neut[1]-F2);if(F2<F1*1.18)F2=F1*1.18;if(!q.leg&&F2<fs*1.02)F2=fs*1.02;
      // 明るさの差：奥の母音（う・お。第2共鳴が低い）は、第3共鳴を弱くして暗くする。共鳴の符号は交互にして、あいだに深い谷を作らない
      const F3=c3*S[10];
      if(shape>0){g1=1;g2=-.8*S[12];g3=.5*(1-shape+shape*cl((F2-d0)/dspan,.12,1))*S[12]}else{g1=1;g2=.8*S[12];g3=.5*S[12]}
      // 大きさをそろえる：倍音が共鳴の山に乗るかどうかで、音符ごとに大きさが 15dB ほど変わる。倍音ごとの通り方から大きさを見積もって、7割がた打ち消す
      if(LV>0){let pw=1e-9;const tl=vc.tilt*L(10)*S[2],w1=q.leg?1:Math.exp(.2303*(-8+30*(oq-.45)));   // 基音の強さは、声帯が開いている割合で変わる（測って合わせた）
        for(let h=1;h<=12;h++){const f=h*fs;if(f>9000)break;const r1=f/F1,r2=f/F2,r3=f/F3,x1=r1*.2*S[13],x2=r2/9,x3=r3*.1,ft=f/tl;
          pw+=(g1*g1*x1*x1/((1-r1*r1)*(1-r1*r1)+x1*x1)+g2*g2*x2*x2/((1-r2*r2)*(1-r2*r2)+x2*x2)+g3*g3*x3*x3/((1-r3*r3)*(1-r3*r3)+x3*x3))/(h*h*(1+ft*ft))*(h===1?w1:1);
          if(r4>0){const r=f/vc.ring,x4=r/7;pw+=r4*r4*x4*x4/((1-r*r)*(1-r*r)+x4*x4)/(h*h*(1+ft*ft))}}
        if(o.probe)o.probe.push(pw);
        if(!(AR&&(c1<260*fsc||L(11)>.3)))lvl+=(cl(Math.pow(PREF/pw,.5*LV),.4,2.8)-lvl)*.03}          // 閉鎖と鼻音のあいだは、そろえ方を前の母音のまま止めておく（ここで上げると、次の母音の頭がはねる）
      if(AR){const nz=L(11);if(nz>.001){g2*=1-NZG*nz;g3*=1-NZG*nz}}                 // 鼻へ抜ける音：上の共鳴を弱める
      set(f1,F1,5/S[13]);set(f1n,c1*S[5],5/S[13]);set(f2,F2,9);set(f3,F3,10);if(r4>0)set(f4,vc.ring,7);set(ff,L(6),L(7))}
    ph+=inc*cp;
    if(ph>=1){ph-=1;
      // 荒れ：1周期おきに強さと長さが変わる（ときどき入れかわる）。そのうえ、周期ごとにばらつく
      if(rg>.002){cyc^=1;if(R()<.05)cyc^=1;const sg=cyc?1:-1;ca=1+rg*(.42*sg+.3*(R()-.5));cp=1+rg*(.045*sg+.05*(R()-.5))}else{ca=1;cp=1}}
    // 声帯の波：ゆっくり開いて、すばやく閉じる。その傾き（微分）を口の共鳴に通す。閉じた瞬間の段差が、高い倍音のもとになる。
    // 段差は角を丸めて、折り返しの雑音を抑える
    let d,gl;
    if(ph<tp){const a=Math.PI*ph/tp;d=Math.sin(a)*tn/tp;gl=.5-.5*Math.cos(a)}
    else if(ph<oq){const a=Math.PI*(ph-tp)/(2*tn);d=-Math.sin(a);gl=Math.cos(a)}
    else{d=0;gl=0}
    const td=(ph-oq)/(inc*cp);if(td>=0&&td<1)d-=(1-td)*(1-td)*.5;else if(td<0&&td>-1)d+=(td+1)*(td+1)*.5;
    dl+=(d-dl)*kt;d=dl;                                                  // 声の明るさ（閉じ方のするどさ）。強い音ほど明るい
    const w=R()*2-1,w2=R()*2-1,a=av*trm*lvl;
    const na=AR?w*.35*a*(1-vo):0;                                       // 息の音（は行、ぱ た か のあとの息）。新しい子音では、第1共鳴に弱く、上の共鳴に強く通す
    let hx=d*.7*a*vo*ca,nx=(AR?0:w*.35*a*(1-vo))+w2*br*a*vo*(.25+.75*gl);
    let nr=0;
    if(rg>.002){sp+=fvi;if(sp>=1)sp-=1;const u=2*sp-1,b=(1-u*u)*(1-u*u);hx*=1-.5*rg*b;nr=w2*.3*rg*b*a*vo;if(AIR<=0)nx+=nr}   // 上のひだが閉じかかるたびに、声が弱まり、雑音が出る
    if(wn>0)nx+=w2*wn*a*vo*(.25+.75*gl);if(BATK>0)nx*=bat;                               // 囁き：閉じきらない声帯から、息がもれつづける
    const exc=AIR>0?hx+nx+nr+na*ASH:hx+nx+na*ASH;
    let y;
    if(BVF){const e2=hx+na*ASH;y=(run(f1,hx)+run(f1n,na*ASL))*g1+run(f2,e2)*g2+run(f3,e2)*g3+af*.3*run(ff,w)+(run(b1,nx)-.6*run(b2,nx)+.2*run(b3,nx))*BVG}   // 声は音符の口の形へ、息は決まった母音の口の形へ
    else if(AIR>0)y=(run(f1,hx)+run(f1n,nx*AIL+nr+na*ASL))*g1+run(f2,hx+nx*AIM+nr+na*ASH)*g2+run(f3,hx+nx*AIH+nr+na*ASH)*g3+af*.3*run(ff,w)+run(f5,nx)*AIG;   // 息の高さ：息を低い共鳴から外して、上へ移す。荒れの雑音（nr）は動かさない（0.7.1）
    else y=(run(f1,hx)+run(f1n,nx+na*ASL))*g1+run(f2,exc)*g2+run(f3,exc)*g3+af*.3*run(ff,w);
    if(r4>0)y-=r4*run(f4,exc);                                          // 鳴り：3kHz あたりの山
    out[i]=SRC?hx:y*GAIN}
  if(o.norm){let pk=1e-6;for(let i=0;i<n;i++){const a=out[i]<0?-out[i]:out[i];if(a>pk)pk=a}const g=.9/pk;for(let i=0;i<n;i++)out[i]*=g}
  return out;
}
return{VERSION:'0.9.2',sing,singNotes,parse,kana,VOICES,REGS,SR,EV:EVM};
})();
/*</OTOSING-CORE>*/
/*<OTOVOICE-API>*/
/* ---------- 入口：話す・歌う・確かめる ----------
   芯は2つ（話し声 RSP＝16kHz、歌声 OtoSing＝32kHz）で、ここは、その前に立つ薄い層。
   ・文の中の指定（< >）のうち、声や調子の切りかえ（voice style f0 scale speed oq breath sharp range long gain）は、そこで文を切って、別々に作ってつなぐ
   ・読めなかった文字・記号があれば、黙って飛ばさずに、エラーにする（{strict:false} で、飛ばして続ける）
   ・歌は、歌詞の / / のところを拍に直して、OtoSing に渡す（OtoSing そのものは変えていない） */
const OtoVoice=(function(){
  const VERSION='1.4.4';
  // 声の見本（(推定) 値は見積もり。f0＝高さ Hz、scale＝口の大きさの逆数：大きいほど小さな体）。OtoVoice.VOICES.名前={f0,scale,…} で足せる
  // sing＝歌うときに使う歌声の見本の名前。自分で足す声は、下の「声の質」の項目でも書ける： OtoVoice.VOICES.haha={f0:190,size:1.12,soft:.7,breathy:.3}
  const VOICES={otoko:{label:'男（見本）',f0:118,scale:1,sing:'otoko'},onna:{label:'女（見本。低めの女に聞こえる）',f0:215,scale:1.17,sing:'onna'},kodomo:{label:'子供（見本。平均より少し高い女に聞こえる）',f0:290,scale:1.3,sing:'kodomo'},
    tenor:{label:'高い男（見本）',f0:150,scale:1.08,sing:'tenor'},rou:{label:'年配の男（見本）',f0:98,scale:.97,oq:.64,sing:'otoko'},
    /* 声のテンプレート 20個（1.3）。どれも、下の「声の質」の項目だけで書いてあるので、話す・歌うの両方で使えて、項目を足せば、そこから動かせる
       （{voice:'jiji',rough:.8} のように）。(推定) 値は、聴かずに決めた見積もり。確かめたのは、20個が互いにちがう音になっていることと、
       英語の文を音声認識に聞かせて、ことばが崩れていないこと（囁きは、もともと聞き取りにくい） */
    youji:{label:'幼い子',f0:320,size:1.42,soft:.55,bright:.6,breathy:.15},shounen:{label:'少年',f0:245,size:1.27,soft:.35,bright:.6,breathy:.03},
    shoujo:{label:'少女',f0:272,size:1.3,soft:.65,bright:.5,breathy:.25},musume:{label:'明るい若い女',f0:218,size:1.16,soft:.4,bright:.7,breathy:.1},
    yasashii:{label:'やさしい女',f0:200,size:1.15,soft:.9,bright:.3,breathy:.45},otona:{label:'落ち着いた女',f0:182,size:1.13,soft:.65,bright:.35,breathy:.12},
    kinkin:{label:'甲高い声',f0:290,size:1.2,soft:.05,bright:1,breathy:0},seinen:{label:'青年',f0:130,size:1.05,soft:.35,bright:.7,breathy:.05},
    teion:{label:'低く太い男',f0:90,size:.92,soft:.5,bright:.4,breathy:.05},shibui:{label:'渋い男',f0:100,size:.96,soft:.4,bright:.5,breathy:.2,rough:.45},
    kibikibi:{label:'きびきびした男',f0:110,size:.99,soft:.1,bright:.9,breathy:0},odayaka:{label:'おだやかな男',f0:122,size:1.02,soft:.85,bright:.3,breathy:.3},
    chuusei:{label:'中性的な声',f0:155,size:1.09,soft:.4,bright:.65,breathy:.1},jiji:{label:'おじいさん',f0:118,size:1,soft:.7,bright:.25,breathy:.35,rough:.45,shake:.8},
    baba:{label:'おばあさん',f0:188,size:1.1,soft:.6,bright:.4,breathy:.3,rough:.6,shake:.8},kyojin:{label:'巨人',f0:70,size:.76,soft:.5,bright:.3,breathy:.1,rough:.3},
    kobito:{label:'小人・妖精',f0:330,size:1.6,soft:.5,bright:.7,breathy:.1},sasayaki:{label:'ささやき',f0:150,size:1.1,soft:.7,bright:.5,breathy:.5,whisper:1},
    shagare:{label:'しゃがれ声',f0:105,size:.98,soft:.2,bright:.6,breathy:.45,rough:1},furue:{label:'ふるえ声',f0:235,size:1.17,soft:.7,bright:.5,breathy:.4,shake:1},
    // 聴いて合わせた基準（1.4.3）。大きさは、聴きくらべで「そう聞こえる」と確かめた値
    josei:{label:'女（平均。聴いて合わせた）',f0:230,size:1.25,soft:.5,bright:.5,breathy:.15},wakai:{label:'若い女（高め。聴いて合わせた範囲のあいだ）',f0:250,size:1.35,soft:.5,bright:.5,breathy:.15},
    warabe:{label:'子供（聴いて合わせた）',f0:290,size:1.45,soft:.5,bright:.5,breathy:.15},osanago:{label:'やや幼い子供（聴いて合わせた）',f0:320,size:1.55,soft:.5,bright:.5,breathy:.15}};
  // 声の一覧（画面に並べるとき用）： [{name, label, template（テンプレートか、見本か）, f0, size, …}]
  const voices=()=>Object.keys(VOICES).map(n=>Object.assign({name:n,template:VOICES[n].sing==null},VOICES[n]));
  /* ---- 声の質（連続して動かせる項目。話す・歌うで同じ名前。書かなければ、その声のまま）----
       size    体の大きさ（口の共鳴ぜんたいの倍率）。1＝大人の男、1.09＝高い男、1.15＝女、1.32＝子供。0.7〜1.7。小さいほど大きな体
       soft    やわらかさ 0〜1（声帯が開いている割合）。0＝硬く張った声、0.45＝ふつう、1＝やわらかく丸い声
       bright  明るさ 0〜1（高い倍音の強さ）。0＝こもった声、0.5＝ふつう、1＝明るく鋭い声
       breathy 息まじり 0〜1。0＝息なし、1＝息がたっぷりまじる
       rough   ざらつき 0〜1（声帯のふるえの不ぞろい）
       shake   ふるえ 0〜1（話し声は細かい震え、歌声はビブラートが深くなる）
       whisper 囁き 0〜1（1 で、声帯を鳴らさない囁き声）
     話し声では、RSP の scale・oq・sharp・breath と、調子の jit・trem・wh に直す。歌声では、size から、4つの見本（otoko tenor onna kodomo）の
     あいだをなめらかにつないだ声の表を作り（見本と同じ size なら、見本そのもの）、soft・bright・breathy をその表に書きこむ。(推定) 直し方の係数は見積もり */
  const DIMS=['size','soft','bright','breathy','rough','shake','whisper'],c01=x=>x<0?0:x>1?1:+x;
  function speakDims(q){
    if(q.size!=null)q.scale=Math.min(1.7,Math.max(.7,+q.size));
    if(q.soft!=null)q.oq=.42+.36*c01(q.soft);
    if(q.bright!=null)q.sharp=.1+.9*c01(q.bright);
    if(q.breathy!=null)q.breath=1.5*c01(q.breathy);
    const B=RSP.STY[q.style]||RSP.STY.calm,sty={};
    if(q.rough!=null)sty.jit=B.jit+.25*c01(q.rough);
    if(q.shake!=null)sty.trem=(B.trem||0)+.045*c01(q.shake);
    if(q.whisper!=null)sty.wh=Math.max(B.wh||0,c01(q.whisper));
    for(const k in sty){q.sty=sty;break}
    for(const k of DIMS)delete q[k];return q}
  // 歌声：size から、見本のあいだをつないだ声の表を作る。見本より外は、いちばん近い見本を、そのまま伸び縮みさせる
  const ANC=['otoko','tenor','onna','kodomo'],sizeOf=n=>OtoSing.VOICES[n].neut[1]/1700,vcache={};
  function voiceAt(size){
    const A=ANC.map(n=>OtoSing.VOICES[n]),Z=ANC.map(sizeOf),g=(a,b,u)=>u<=0?a:u>=1?b:a*Math.pow(b/a,u),l=(a,b,u)=>u<=0?a:u>=1?b:a+(b-a)*u;let a,b,u,k=1;
    if(size<=Z[0]){a=b=A[0];u=0;k=size/Z[0]}else if(size>=Z[3]){a=b=A[3];u=0;k=size/Z[3]}
    else{let i=0;while(size>Z[i+1])i++;a=A[i];b=A[i+1];u=Math.log(size/Z[i])/Math.log(Z[i+1]/Z[i])}
    const V={};for(const v in a.V)V[v]=a.V[v].map((y,j)=>g(y,b.V[v][j],u)*k);const sh=12*Math.log2(k);
    return{label:'size '+size,V,neut:a.neut.map((y,j)=>g(y,b.neut[j],u)*k),cs:g(a.cs,b.cs,u)*k,oq:l(a.oq,b.oq,u),tilt:g(a.tilt,b.tilt,u)*Math.sqrt(k),breath:l(a.breath,b.breath,u),
      brk:[l(a.brk[0],b.brk[0],u)+sh,l(a.brk[1],b.brk[1],u)+sh],ring:g(a.ring,b.ring,u)*k}}
  /* 歌うときの声を決める。name は、歌声の見本（otoko tenor onna kodomo）か、OtoVoice.VOICES の名前。d は、声の質の項目。
     返すのは、OtoSing.VOICES の中の名前（質を動かしたときは、作った表を仮の名前で入れる）と、歌い方に足す設定 */
  function singVoice(name,d){
    const P=VOICES[name]||{},D=Object.assign({},P,d),base=OtoSing.VOICES[name]?name:(P.sing&&OtoSing.VOICES[P.sing]?P.sing:'onna'),add={};
    if(D.rough!=null)add.rough=c01(D.rough);if(D.whisper!=null)add.whisper=c01(D.whisper);if(D.shake!=null)add.vib=1+1.2*c01(D.shake);
    if(D.size==null&&D.soft==null&&D.bright==null&&D.breathy==null)return{voice:base,add};
    const size=D.size!=null?Math.min(1.7,Math.max(.7,+D.size)):sizeOf(base),key='~'+[size,D.soft,D.bright,D.breathy].join('|');
    if(!vcache[key]){const vc=voiceAt(size);if(D.soft!=null)vc.oq=.42+.36*c01(D.soft);if(D.bright!=null){const m=Math.pow(2,3.6*(c01(D.bright)-.5));vc.tilt*=m}          // 明るさ：声帯の波の高い側を、どこまで残すか（0 で約 1/3.5、1 で約 3.5倍の高さまで）
      if(D.breathy!=null)vc.breath=.03+.5*c01(D.breathy);vcache[key]=vc}
    OtoSing.VOICES[key]=vcache[key];return{voice:key,add}}
  const SEGNUM={f0:[50,500],scale:[.7,1.7],speed:[.4,2.5],oq:[.3,.9],breath:[0,2],sharp:[0,1],range:[0,3],long:[.3,3],gain:[0,2],size:[.7,1.7],soft:[0,1],bright:[0,1],breathy:[0,1],rough:[0,1],shake:[0,1],whisper:[0,1]},
    CORE={rate:1,pitch:1,vol:1,acc:1,decl:1,pause:1},COREDEF={rate:1,pitch:0,vol:1,acc:1,decl:1},
    SGAIN={whisper:.55,sad:.8};                             // (推定) 調子ごとの大きさ。区切りごとに最大値をそろえるので、囁きが大声にならないように
  const ALLK='rate pitch vol acc decl pause reset ／ voice style f0 speed range long gain ／ size soft bright breathy rough shake whisper ／ scale oq breath sharp';
  /* 文を、声・調子の切りかえのところで区切る。返すのは [{t:文, set:{その区切りの設定}}] と、見つけたまちがい */
  function plan(text,errs){
    const segs=[];let set={},core={},cur={t:'',set},last=0;const src=String(text);
    const speakable=t=>/pause/.test(t)||!!t.replace(/<[^<>]*>/g,'').replace(/[\s\/\[\]]/g,''),
      flush=()=>{if(speakable(cur.t))segs.push(cur)},
      carry=()=>{const k=Object.keys(core).filter(x=>core[x]!==COREDEF[x]);return k.length?'<'+k.map(x=>x+' '+core[x]).join(' ')+'>':''};
    src.replace(/<([^<>]*)>/g,(m,body,off)=>{cur.t+=src.slice(last,off);last=off+m.length;
      const w=body.trim().split(/[\s,=]+/).filter(Boolean),keep=[];let ch=null,rs=false;
      if(!w.length){rs=true;keep.push('reset')}
      for(let i=0;i<w.length;i++){const k=w[i].toLowerCase(),v=w[i+1];
        if(k==='reset'){rs=true;keep.push('reset');continue}
        if(k==='style'){if(v&&RSP.STY[v])(ch=ch||{}).style=v;else errs.push({msg:'知らない調子「'+(v||'')+'」（使えるのは '+Object.keys(RSP.STY).join(' ')+'）',near:m});i++;continue}
        if(k==='voice'){if(v&&VOICES[v])(ch=ch||{}).voice=v;else errs.push({msg:'知らない声「'+(v||'')+'」（使えるのは '+Object.keys(VOICES).join(' ')+'。OtoVoice.VOICES に足せます）',near:m});i++;continue}
        const r=SEGNUM[k],x=parseFloat(v);
        if(r){if(isFinite(x))(ch=ch||{})[k]=Math.min(r[1],Math.max(r[0],x));else errs.push({msg:'「'+k+'」のあとに数がありません',near:m});i++;continue}
        if(CORE[k]){if(isFinite(x)){keep.push(k+' '+x);if(k!=='pause')core[k]=x}else errs.push({msg:'「'+k+'」のあとに数がありません',near:m});i++;continue}
        errs.push({msg:'知らない指定「'+k+'」（使えるのは '+ALLK+'）',near:m});if(isFinite(x))i++}
      if(rs){core={};if(Object.keys(set).length)ch=ch||{}}
      if(ch){flush();set=Object.assign({},rs?{}:set,ch);cur={t:rs?'':carry(),set}}
      if(keep.length)cur.t+='<'+keep.join(' ')+'>';
      return m});
    cur.t+=src.slice(last);flush();
    return segs}
  const segOpts=(o,set)=>{const v=set.voice?VOICES[set.voice]:null,q=Object.assign({jp:'new'},o,v,set);delete q.voice;delete q.gain;delete q.strict;delete q.sing;delete q.label;return speakDims(q)};
  const fail=(errs,text)=>{const e=new Error('OtoVoice: 読めないところがあります\n'+errs.map(x=>'  ・'+x.msg+(x.near?'  〔'+x.near+'〕':'')).join('\n'));e.errors=errs;e.text=text;return e};

  /* 話す：文 → 16kHz の Float32Array。
     o：voice（見本の名前）、f0、scale、speed、style（calm panic joy sad whisper）、oq、breath、sharp、range、long、
        bidaku（かなの が行を鼻にかける）、devoice:false・dz:false・wa:true・literal:true（かなの読み方）、fuji:false（高さを元の作り方で）、
        strict:false（読めないところを飛ばして続ける。飛ばしたものは o.diag に入る）、seed（乱数の種。同じ種なら同じ音） */
  function speak(text,o){
    o=Object.assign({},o);o.nat=natOf(o.nat);o.con=conOf(o.con);const errs=[],base=Object.assign({},o.voice&&VOICES[o.voice],o);delete base.voice;
    if(o.voice&&!VOICES[o.voice])errs.push({msg:'知らない声「'+o.voice+'」',near:''});
    const segs=plan(text,errs),parts=[];let n=0,keepR=null;
    if(o.seed!=null){let sd=(o.seed*2654435761)>>>0;keepR=Math.random;Math.random=()=>{sd=(sd+0x6D2B79F5)>>>0;let t=sd;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
    try{
      for(const s of segs){const q=segOpts(base,s.set);q.diag=errs;delete q.seed;
        const x=RSP.speak(s.t,q),g=(s.set.gain!=null?s.set.gain:o.gain!=null?o.gain:1)*(SGAIN[q.style]||1);
        if(g!==1)for(let i=0;i<x.length;i++)x[i]*=g;parts.push(x);n+=x.length}
    }finally{if(keepR)Math.random=keepR}
    if(o.diag)for(const e of errs)o.diag.push(e);
    if(errs.length&&o.strict!==false)throw fail(errs,text);
    const out=new Float32Array(n);let p=0;for(const x of parts){out.set(x,p);p+=x.length}
    out.rate=RSP.SRV;return out}

  // 拍 → かな（確かめ用。声を抜いた・落とした母音は、かっこに入れる）
  const KR={};('あa いi うu えe おo かka きki くku けke こko さsa しshi すsu せse そso たta ちchi つtsu てte とto なna にni ぬnu ねne のno はha ひhi ふfu へhe ほho まma みmi むmu めme もmo やya ゆyu よyo らra りri るru れre ろro わwa '+
    'がga ぎgi ぐgu げge ごgo ざza じji ずzu ぜze ぞzo だda でde どdo ばba びbi ぶbu べbe ぼbo ぱpa ぴpi ぷpu ぺpe ぽpo').split(' ').forEach(p=>{KR[p.slice(1)]=p[0]});
  const SM={a:'ぁ',i:'ぃ',u:'ぅ',e:'ぇ',o:'ぉ'},YO={a:'ゃ',u:'ゅ',o:'ょ',e:'ぇ',i:''};
  function kanaOf(s){
    let c=s.c||'';const g=s.g,v=s.v;c=c==='ng'?'g':c==='dz'?'z':c==='C'?'h':c==='Z'?'j':c==='4'?'r':c;let k;
    if(s.c==='C'&&v!=='i')k='ひ'+YO[v];
    else if(c==='sh'||c==='ch'||c==='j'){const b=KR[c==='sh'?'shi':c==='ch'?'chi':'ji'];k=v==='i'?b:b+YO[v]}
    else if(g==='y')k=c?(KR[c+'i']||c+'i')+YO[v]:(KR['y'+v]||'い'+SM[v]);
    else if(g==='w')k=c?(KR[c+'u']||c+'u')+SM[v]:v==='a'?'わ':'う'+SM[v];
    else if(c==='ts')k=v==='u'?'つ':'つ'+SM[v];else if(c==='f')k=v==='u'?'ふ':'ふ'+SM[v];
    else if((c==='t'||c==='d')&&v==='i')k=(c==='t'?'て':'で')+'ぃ';else if((c==='t'||c==='d')&&v==='u')k=(c==='t'?'と':'ど')+'ぅ';
    else if(c==='h'&&v==='u')k='ほぅ';else if((c==='s'||c==='z')&&v==='i')k=(c==='s'?'す':'ず')+'ぃ';
    else k=KR[c+v]||(c+v);
    return s.dv?'('+k+')':k+(s.cut?'っ':'')}
  /* 確かめる：音は作らずに、その文がどう読まれるかを返す。
     {ok, errors:[{msg,near}], seconds, kana（読みを、かなで）, phonemes（実際に鳴る音素の列）, segments:[{text,set}],
      contour:[[秒, 高さHz, 声が出ているか]…]（高さの動き。図にするとき用）, marks:[[秒, 音素]…]}
     phonemes は、日本語のところは / / の書き方の記号で出す（u、r）。印： 空白＝語の切れ目、|＝間、Q＝っ、:＝長音、°＝声の出ない母音、'＝アクセントの核（日本語は拍のあと、英語は強い音節の母音のあと） */
  function check(text,o){
    o=Object.assign({},o);const errs=[],base=Object.assign({},o.voice&&VOICES[o.voice],o);delete base.voice;
    const segs=plan(text,errs),pts=[],marks=[];let sec=0,kana='',ph='';const keepR=Math.random;let sd=1;Math.random=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296};
    try{for(const s of segs){const d={},q=segOpts(base,s.set);q.diag=errs;q.dbg=d;q.dry=true;delete q.seed;RSP.speak(s.t,q);{const f=(q.f0||150)*(RSP.STY[q.style]||RSP.STY.calm).pm;for(const k of d.K||[])pts.push([sec+k[0],f*k[9],k[4]>0&&k[8]>0?1:0]);for(const m of d.ph||[])marks.push([sec+m[0],m[1]])}sec+=d.dur>0?d.dur:0;
      let en=false;for(const g of d.G||[]){
        if(g.en&&!en){kana+=' [';en=true}else if(!g.en&&en&&!g.w&&!g.p){kana+='] ';en=false}
        if(g.p){ph+=' | ';kana+=en?', ':(g.ps!=null?' ':g.e==='f'?'。':g.e==='q'?'？':g.e==='x'?'！':g.e==='d'?'…':'、')}
        else if(g.w){ph+=' ';kana+=' '}
        else if(g.q){ph+='Q';kana+='っ'}
        else if(g.l&&!g.en){ph+=':';kana+='ー'}
        else if(g.ph){ph+=(g.en?g.ph:g.ph==='M'?'u':g.ph==='4'?'r':g.ph)+(g.wv?'°':'')+(g.en?(g.st===1?"'":g.st===2?'%':''):'');
          if(g.en)kana+=g.ph;else if(g.mora){kana+='ん';if(g.mo&&g.mo.ac)ph+="'"}else if(g.mo&&g.mo.v&&(RSP.isV(g.ph)||g.dv)&&!g.mo._k){g.mo._k=1;kana+=kanaOf(g.mo);if(g.mo.cut)ph+='q';if(g.mo.ac)ph+="'"}}}
      if(en)kana+=']';ph+=' ‖ ';kana+=' '}
      kana=kana.replace(/,\s*\]/g,']');
    }finally{Math.random=keepR}
    return{ok:!errs.length,errors:errs,seconds:Math.round(sec*1000)/1000,kana:kana.replace(/\s+/g,' ').trim(),phonemes:ph.replace(/ ‖ $/,'').replace(/\s+/g,' ').trim(),segments:segs.map(s=>({text:s.t,set:s.set})),contour:pts,marks}}
  /* かなの文 → 自動の規則をかけたあとの音素の列（/ … /）。そこから音素の単位で手を入れて、speak に渡す */
  const toPhonemes=(text,o)=>RSP.toPH(text,o);

  /* ---- 歌 ----
     歌詞 → 拍の並び（OtoSing.singNotes に渡す m）。かなのほかに、/ / の中の音素も読む。【 】の声の出し方は、どちらの中でも使える */
  const SC={ng:'g','4':'r',l:'r'};
  /* 英語の音節（[ ] の中の、空白で区切った1つ）→ 拍。音節＝頭の子音（いくつでも）＋母音1つ＋語末の子音（いくつでも）。1音節が音符1つ。
     頭の子音のうち、母音のすぐ前の l r w j は「わたり」に、その前の1つが拍の子音に、さらに前（s など）は pre に入る。' % : は読みとばす */
  const ESY=['tS','dZ','eI','aI','oU','aU','OI'],EVW={i:'i',I:'I',E:'E','{':'{',A:'A',O:'O',U:'U',u:'uw',V:'V','@':'@','3':'3',eI:'eI',aI:'aI',oU:'oU',aU:'aU',OI:'OI'},
    ECN={p:'p',b:'b',t:'t',d:'d',k:'k',g:'g',s:'s',z:'z',h:'h',m:'m',n:'n',S:'sh',tS:'ch',dZ:'j',f:'f',v:'v',T:'T',D:'D',Z:'Z',N:'N','4':'r',l:'L',L:'L',r:'R',w:'W',j:'Y'},
    APG={L:'L',R:'R',W:'w',Y:'y'},DIP={eI:1,aI:1,oU:1,aU:1,OI:1};
  function syllable(tok,warn){
    const on=[],co=[];let v=null;
    for(let i=0;i<tok.length;i++){const ch=tok[i];if(ch==="'"||ch==='%'||ch===':'||ch==='ˈ'||ch==='ˌ'||ch==='.'||ch===','||ch==='!'||ch==='?')continue;
      let p=ESY.find(x=>tok.startsWith(x,i));if(p)i++;else p=ch;
      if(EVW[p]){if(v){warn.push({msg:'1つの音節に母音が2つあります（歌詞の [ ] の中は、音節ごとに空白で区切ります。1音節が音符1つ）',near:tok});return null}v=EVW[p]}
      else if(ECN[p])(v?co:on).push(ECN[p]);
      else{warn.push({msg:'歌詞の [ ] の中に、知らない記号「'+ch+'」',near:tok});return null}}
    if(!v){warn.push({msg:'音節に母音がありません（little は lI t@l のように、@ を入れます）',near:tok});return null}
    const m={c:'',g:'',v,ch:tok.replace(/['%:]/g,'')};
    if(on.length&&APG[on[on.length-1]])m.g=APG[on.pop()];
    if(on.length&&!APG[on[on.length-1]])m.c=on.pop();
    if(on.length)m.pre=on;
    if((m.c==='p'||m.c==='t'||m.c==='k')&&!(m.pre&&m.pre[m.pre.length-1]==='s'))m.asp=1;      // 音節の頭の p t k は、息をともなう（s のあとは、ともなわない）
    if(co.length)m.coda=co;
    return m}
  /* 歌詞 → 拍の並び（OtoSing.singNotes の音符の m）。かな、/ / の日本語の音素、[ ] の英語の音節。【 】の声の出し方は、どの中でも使える。
     [ ] の中の - は、前の音節を次の音符へ伸ばす（語末の子音と、二重母音の滑りは、伸ばした最後の音符へ送る） */
  function lyric(text,warn){
    warn=warn||[];let line='';const ov=[];
    const japanese=part=>part.split('/').forEach((sub,ix)=>{
      if(!(ix%2)){line+=sub;for(const m of OtoSing.kana(sub))ov.push(null);return}
      sub.split(/(【[^】]*】)/).forEach(seg=>{if(/^【/.test(seg)){line+=seg;return}
        const dg=[],T=RSP.parsePH(seg.replace(/<[^<>]*>/g,()=>{warn.push({msg:'歌詞の中の < > は使えません（高さと長さは音符で、声の出し方は【 】で書きます）',near:seg});return''}),dg);
        for(const e of dg)warn.push(e);
        for(const s of T){
          if(s.q)line+='っ';else if(s.n){line+='ん';ov.push(null)}else if(s.l){line+='ー';ov.push(null)}
          else if(s.v){let c=s.c||'';if(SC[c]){if(c==='l')warn.push({msg:'/ / の中の「l」は、近い音（r）で歌います（英語の l は [ ] の中に）',near:seg});c=SC[c]}
            if(s.dv)warn.push({msg:'歌では、母音を落とせません（1音符＝1拍）。母音をつけて歌います',near:seg});
            const o={c,g:s.g||'',v:s.v};o.ch=kanaOf(o);line+='あ';ov.push(o)}
          else line+=' '}})});
    String(text).split(/\[([^\]]*)\]/).forEach((part,bx)=>{
      if(!(bx%2)){japanese(part);return}
      let prev=null;
      part.split(/(【[^】]*】)/).forEach(seg=>{if(/^【/.test(seg)){line+=seg;return}
        for(const tok of seg.trim().split(/\s+/).filter(Boolean)){
          if(tok==='-'||tok==='ー'||tok==='~'){const o={};
            if(prev){if(prev.coda){o.coda=prev.coda;delete prev.coda}const d=prev.dg||(prev.v&&DIP[prev.v]?prev.v:null);if(d){o.dg=d;delete prev.dg;if(prev.v)prev.nog=1}}
            else warn.push({msg:'- （前の音節を伸ばす）の前に、音節がありません',near:seg});
            line+='ー';ov.push(o);prev=o;continue}
          const m=syllable(tok,warn);if(!m)continue;line+='あ';ov.push(m);prev=m}})});
    const M=OtoSing.kana(line);M.forEach((m,i)=>{if(ov[i])Object.assign(m,ov[i])});
    return M}
  const isNoteTok=x=>/^([A-Ga-g][#b]?-?\d|[Rr_])[!?]*(:[\d.]+)?[!?]*$/.test(x);
  /* 歌う：譜面（音符の行と歌詞の行を交互に）→ 32kHz の Float32Array。譜面の書き方と o は OtoSing.sing と同じ。歌詞の行に、/ / の日本語の音素と、[ ] の英語の音節が書ける。
     o.strict:false で、歌詞の読めないところを飛ばして続ける */
  /* 音符のうしろに書ける指定（1.4）： C4+30（セント）、C4:2{vib 1.5, rate 6, delay .3, scoop 1, cent -20, p -1@0/0@25/0@100}
     vib ゆらしの深さの倍率（0 で無し。短い音符でも、書けばゆれる）／rate ゆらしの速さ Hz／delay ゆれはじめるまでの秒／scoop 頭を何半音下から入るか（0 でまっすぐ）／
     cent 高さのずれ（セント）／p 音符の中の高さの線：半音@位置％ を / で区切る（点のあいだは、まっすぐ） */
  const NOTEX=/^([A-Ga-g][#b]?-?\d|[Rr_])([+-]\d+(?:\.\d+)?)?([!?]*(?::[\d.]+)?[!?]*)(\{[^}]*\})?$/;
  function noteAttr(m,warn,near){const a={};let any=0;if(m[2]){a.cent=+m[2];any=1}if(!m[4])return any?a:null;
    for(const it of m[4].slice(1,-1).split(/[,;]/).filter(Boolean)){const k=/^([a-z]+)=?(.*)$/.exec(it);if(!k){warn.push({msg:'音符の { } の中が読めません',near});continue}const key=k[1],v=k[2],x=parseFloat(v);any=1;
      if(key==='p'){const P=v.split('/').map(s=>{const q=/^([+-]?[\d.]+)@([\d.]+)%?$/.exec(s);return q?[Math.min(1,Math.max(0,+q[2]/100)),+q[1]]:null});if(!P.length||P.some(q=>!q)||P.some((q,j)=>j&&q[0]<P[j-1][0])){warn.push({msg:'音符の p は「半音@位置」を / で区切って、位置の小さい順に書きます（p -1@0/0@25）',near});continue}a.pc=P;continue}
      if(!isFinite(x)){warn.push({msg:'音符の「'+key+'」のあとに数がありません',near});continue}
      if(key==='vib')a.vib=Math.min(4,Math.max(0,x));else if(key==='rate')a.vibRate=Math.min(9,Math.max(2,x));else if(key==='delay')a.vibDelay=Math.min(3,Math.max(0,x));else if(key==='scoop')a.scoop=Math.min(7,Math.max(-7,x));
      else if(key==='cent')a.cent=(a.cent||0)+x;else warn.push({msg:'音符の { } に、知らない項目「'+key+'」があります（使えるのは vib rate delay scoop cent p）',near})}
    return any?a:null}
  function sing(score,o){
    o=Object.assign({},o);const warn=[],fix=[],attrs=[];let idx=0,nidx=0;
    const lines=String(score).split(/\r?\n/).map(raw=>{
      const line=raw.replace(/(^|\s)#.*$/,'').replace(/(^|\s)\/\/.*$/,'').trim();if(!line)return'';
      if(/^tempo\s+[\d.]+$/i.test(line)||/^voice\s+\w+$/i.test(line))return line;
      {const tk=line.replace(/\s*\{\s*/g,'{').replace(/\{[^}]*\}/g,s=>s.replace(/\s+/g,'')).split(/\s+/).filter(x=>x!=='|');
        if(tk.every(x=>NOTEX.test(x)))return tk.map(x=>{const m=NOTEX.exec(x);if(/^[Rr_]/.test(x))return m[1]+m[3];const a=noteAttr(m,warn,line);if(a)attrs.push([nidx,a]);nidx++;return m[1]+m[3]}).join(' ')}
      if(!/[\/\[]/.test(line)){idx+=OtoSing.kana(line).length;return line}
      const M=lyric(line,warn);M.forEach((m,i)=>fix.push([idx+i,m]));idx+=M.length;
      return M.map(m=>m.n?'ん':m.l?'ー':'あ').join('')+' '});       // 数だけ合わせた仮の歌詞。あとで、本物の拍に入れかえる
    if(o.diag)for(const e of warn)o.diag.push(e);
    const hard=warn.filter(e=>!/近い音|母音をつけて/.test(e.msg));
    if(hard.length&&o.strict!==false)throw fail(hard,score);
    const S=OtoSing.parse(lines.join('\n'),o);
    for(const [i,m] of fix)if(S.notes[i])S.notes[i].m=m;for(const [i,a] of attrs)if(S.notes[i])Object.assign(S.notes[i],a);
    o.nat=o.nat===false||o.nat==='off'||o.nat===0?null:Object.assign({dip:1,prep:1},typeof o.nat==='object'&&o.nat?Object.assign({dip:0,prep:0},o.nat):null);                 // 歌詞は、行の順に、頭の音符から1つずつ当たっている（数が合わなければ、上の parse がエラーにする）
    // 声：譜面の voice（または o.voice）と、声の質の項目から決める。質を動かさなければ、歌声の見本そのまま
    {const d={};for(const k of DIMS)if(o[k]!=null){d[k]=o[k];delete o[k]}const r=singVoice(o.voice||S.voice,d);o.voice=r.voice;for(const k in r.add)if(o[k]==null)o[k]=r.add[k]}
    delete o.strict;delete o.diag;const out=OtoSing.sing(S,o);out.rate=OtoSing.SR;return out}

  /* 無線機を通す：16kHz の声 → 無線機の音（既定は 24kHz。o.sr で変えられる）。作品「大通り・砲手」の無線機（9段階、しきい値5%、54%で頭打ち、雑音は小さめ）と同じ処理 */
  function radio(voice,o){
    const sr=(o&&o.sr)||24000,g=o&&o.gain!=null?o.gain:.7,n=Math.ceil((voice.length/RSP.SRV+.42)*sr),d=new Float32Array(n),st=triRadio(d,n,voice,sr);while(!st(n));
    if(g!==1)for(let i=0;i<n;i++)d[i]*=g;                    // もとの処理は最大値が 1.3 ほどになるので、そのまま鳴らしても割れないように 0.7 倍（{gain:1} で、作品と同じ大きさ）
    d.rate=sr;return d}
  // AudioContext で鳴らせる形にする（speak・sing・radio の返り値を渡す）
  const buffer=(ac,x,rate)=>{const b=ac.createBuffer(1,Math.max(1,x.length),rate||x.rate||RSP.SRV);b.getChannelData(0).set(x);return b};
  /* ---------- 手で書く行（1.4.0）----------
     音素1つを1行に書いて、長さ・高さ・強さ・声の質を、書いたとおりに鳴らす。自動の規則（アクセントの山、拍の長さ、母音の無声化）は、かからない。
     書式（# から行末は注釈）：
       はじめに書くもの   voice 名前 ／ f0 数（高さの基準 Hz。書かなければ声の高さ）／ nat on|off（声の出し方の改良）／ con on|off（子音の改良）／ smooth 数（高さの線の丸め、ミリ秒）／ seed 数
       どこでも書けるもの lang ja|en（ここから先の音素を、日本語として・英語として作る）
       音素の行           音素  長さ(ミリ秒)  [項目 値 …]
       間の行             _  長さ(ミリ秒)
     項目：
       p 値 値 …    高さの通過点。値は、音名（A3、C#4、A3+30 はセント）／ 220hz ／ 基準からの半音（+2、-3.5、0）。うしろに @位置（その音素の頭から％）
                    位置をぜんぶ省くと、1つなら真ん中、2つなら頭と終わり、3つ以上は等間隔。一部に書くときは、頭と終わりだけ省ける（0 と 100）。点のあいだは、まっすぐつないで角を丸める。書かない行は、前後の点のあいだを通る
       vib 深さ 速さ [遅れ]   その音素の中で、高さをゆらす（半音、Hz、ミリ秒）
       vol 数       強さの倍率
       soft bright breathy   声の質（0〜1。話し声の声の質と同じ意味）。書いた行から先に効き、行の真ん中どうしを、なめらかにつなぐ
       creak 数     きしみ（0〜1）。1周期おきに、長い・短い、強い・弱いが入れかわる
       asp 数       p t k のあとの息の長さ（ミリ秒）。次の音素の頭に入る
       noise 数     子音の雑音（破裂・摩擦）の強さの倍率
       nc 数  nq 数  子音の雑音の山の中心（Hz）と鋭さ       n2 中心 鋭さ 強さ   2つめの山を足す       click 数   破裂の頭の衝撃の倍率（0 で無し）
       unv          母音の声を抜く（息だけ）
       mix 母音 数  ほかの母音へ寄せる（0〜1）       f1 f2 f3 数   共鳴の高さを、Hz でずらす
     音素の記号は、話し声の / / と [ ] の中と同じ（日本語の う は u、ら行は r と書いてもよい）。長い母音・っ は、長さで書く
     (推定) 読み戻しの注意（短すぎる母音、急すぎる高さの動き、など）のしきい値は、見積もり */
  const NATDEF={sync:1,jit:.008,shim:.04,drift:.6,b1:1};
  const natOf=v=>v==null||v===true||v==='on'||v===1?Object.assign({},NATDEF):v===false||v==='off'||v===0?null:typeof v==='object'?Object.assign({sync:0,jit:0,shim:0,drift:0,b1:0},v):Object.assign({},NATDEF);
  const CONDEF={vmod:1,bands:1,click:1,tap:1,round:1,vbar:1,vz:1};
  const conOf=v=>v==null||v===true||v==='on'||v===1?Object.assign({},CONDEF):v===false||v==='off'||v===0?null:typeof v==='object'?Object.assign({vmod:0,bands:0,click:0,tap:0,round:0,vbar:0,vz:0},v):Object.assign({},CONDEF);
  const RK={nc:1,nq:1,n2:1,click:1,p:1,vib:1,vol:1,soft:1,bright:1,breathy:1,creak:1,asp:1,noise:1,unv:1,mix:1,f1:1,f2:1,f3:1},HK={voice:1,f0:1,nat:1,con:1,smooth:1,seed:1,lang:1};
  const NOTE_RE=/^([A-Ga-g])([#b]?)(-?\d)([+-]\d+(?:\.\d+)?)?$/,SEMI2={c:0,d:2,e:4,f:5,g:7,a:9,b:11},NN=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const noteName=hz=>{if(!(hz>0))return'';const m=69+12*Math.log2(hz/440),r=Math.round(m),c=Math.round((m-r)*100);return NN[((r%12)+12)%12]+(Math.floor(r/12)-1)+(c?(c>0?'+':'')+c:'')};
  const pitchTok=s=>{let pos=null;const at=s.indexOf('@');if(at>=0){pos=parseFloat(s.slice(at+1));s=s.slice(0,at)}
    const m=NOTE_RE.exec(s);let o=null;
    if(m){const midi=12*(+m[3]+1)+SEMI2[m[1].toLowerCase()]+(m[2]==='#'?1:m[2]==='b'?-1:0)+(m[4]?+m[4]/100:0);o={hz:440*Math.pow(2,(midi-69)/12)}}
    else if(/^\d+(\.\d+)?hz$/i.test(s))o={hz:parseFloat(s)};
    else if(/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s))o={st:parseFloat(s)};
    if(!o||(at>=0&&!(pos>=0&&pos<=100)))return null;o.pos=pos;return o};
  const phKey=(sym,en)=>{const EV=RSP.EV,EC=RSP.EC,k=!en&&sym==='u'?'M':!en&&sym==='r'?'4':sym;return EV[k]||EC[k]?k:null};

  function parseRows(src,errs){
    const head={},rows=[];let en=false;const EV=RSP.EV;
    String(src).split(/\r?\n/).forEach((raw,ix)=>{
      const line=raw.replace(/#.*$/,'').trim(),ln=ix+1,bad=(msg)=>errs.push({msg:ln+'行め：'+msg,near:line});if(!line)return;
      const w=line.split(/[\s,]+/).filter(Boolean),k=w[0];
      if(HK[k]){const v=w[1];
        if(k==='lang'){if(v==='ja'||v==='en')en=v==='en';else bad('lang は ja か en');return}
        if(k==='voice'){if(VOICES[v])head.voice=v;else bad('知らない声「'+(v||'')+'」');return}
        if(k==='nat'||k==='con'){if(v==='on'||v==='off')head[k]=v;else bad(k+' は on か off');return}
        const x=parseFloat(v);if(!isFinite(x)){bad('「'+k+'」のあとに数がありません');return}head[k]=x;return}
      const dur=parseFloat(w[1]);
      if(!(dur>0)||!/^\d+(\.\d+)?(ms)?$/.test(w[1]||'')){bad('2つめに、長さ（ミリ秒）を書きます');return}
      if(k==='_'){if(w.length>2)bad('間の行には、長さだけを書きます');rows.push({ln,pause:1,dur});return}
      const key=phKey(k,en);if(!key){bad('知らない音素「'+k+'」'+(en?'':'（日本語の音素として読みました。英語は、前の行に lang en）'));return}
      const r={ln,sym:k,key,en,dur,vowel:!!EV[key]};let i=2;
      while(i<w.length){const f=w[i++];if(!RK[f]){bad('知らない項目「'+f+'」（使えるのは '+Object.keys(RK).join(' ')+'）');return}
        const args=[];while(i<w.length&&!RK[w[i]])args.push(w[i++]);const num=j=>parseFloat(args[j]),need=n=>{if(args.length<n||args.slice(0,n).some((a,j)=>f==='mix'&&j===0?false:!isFinite(parseFloat(a)))){bad('「'+f+'」の値が足りないか、数ではありません');return false}return true};
        if(f==='unv'){if(!r.vowel)bad('unv は、母音の行に書きます');r.unv=1;continue}
        if(f==='p'){const P=args.map(pitchTok);if(!P.length||P.some(x=>!x)){bad('高さの値が読めません（音名 A3、220hz、半音 +2 のどれか。位置は @0〜@100）');return}
          const np=P.filter(x=>x.pos==null).length,L=P.length-1;
          if(np===P.length)P.forEach((x,j)=>{x.pos=L?100*j/L:50});
          else{if(P[0].pos==null)P[0].pos=0;if(P[L].pos==null)P[L].pos=100;if(P.some(x=>x.pos==null)){bad('高さの位置（@）を書くときは、あいだの点にはぜんぶ書きます（頭と終わりは省けて、0 と 100 になる）');return}}
          if(P.some((x,j)=>j&&x.pos<P[j-1].pos)){bad('高さの位置は、左から右へ大きくなる順に書きます');return}r.p=P;continue}
        if(f==='n2'){if(r.vowel||!need(3)){if(r.vowel)bad('n2 は、子音の行に書きます');return}r.n2=[Math.min(7200,Math.max(300,num(0))),Math.max(.2,num(1)),Math.max(0,num(2))];continue}
        if(f==='vib'){if(!need(2))return;r.vib=[num(0),num(1),args.length>2?num(2):0];continue}
        if(f==='mix'){const mk=phKey(args[0]||'',en);if(!r.vowel||!mk||!EV[mk]||!isFinite(num(1))){bad('mix は、母音の行に「mix 母音 数」と書きます');return}r.mix=[mk,Math.min(1,Math.max(0,num(1)))];continue}
        if(!need(1))return;const x=num(0);
        if(f==='f1'||f==='f2'||f==='f3'){if(!r.vowel){bad(f+' は、母音の行に書きます');return}(r.df=r.df||[0,0,0])[+f[1]-1]=x;continue}
        if(f==='soft'||f==='bright'||f==='breathy'||f==='creak'){r[f]=Math.min(1,Math.max(0,x));continue}
        if(f==='vol'){r.vol=Math.min(3,Math.max(0,x));continue}
        if(f==='noise'){r.noise=Math.min(4,Math.max(0,x));continue}
        if(f==='asp'){r.asp=Math.min(150,Math.max(0,x));continue}
        if(f==='nc'||f==='nq'||f==='click'){if(r.vowel){bad(f+' は、子音の行に書きます');return}r[f]=f==='nc'?Math.min(7200,Math.max(300,x)):f==='nq'?Math.min(8,Math.max(.2,x)):Math.min(4,Math.max(0,x));continue}}
      rows.push(r)});
    if(!rows.some(r=>!r.pause)&&!errs.length)errs.push({msg:'音素の行がありません',near:''});
    return{head,rows}}

  const withSeed=(seed,fn)=>{if(seed==null)return fn();let sd=(seed*2654435761)>>>0;const keep=Math.random;
    Math.random=()=>{sd=(sd+0x6D2B79F5)>>>0;let t=sd;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296};
    try{return fn()}finally{Math.random=keep}};
  const lerpAt=(A,t)=>{if(!A.length)return null;if(t<=A[0][0])return A[0][1];for(let i=1;i<A.length;i++)if(t<=A[i][0]){const a=A[i-1],b=A[i];return a[1]+(b[1]-a[1])*(t-a[0])/(b[0]-a[0]||1)}return A[A.length-1][1]};

  // 行を鳴らす（dry なら、音は作らずに、時刻と高さの線だけ）
  function runRows(P,o,dry){
    const H=P.head,rows=P.rows,EV=RSP.EV,vname=o.voice||H.voice,base=Object.assign({},vname&&VOICES[vname],o);delete base.voice;
    if(H.f0!=null&&o.f0==null)base.f0=H.f0;
    const q=segOpts(base,{}),S0=RSP.STY[q.style]||RSP.STY.calm,seed=o.seed!=null?o.seed:H.seed,smooth=(o.smooth!=null?o.smooth:H.smooth!=null?H.smooth:10)/1000;
    q.sty=Object.assign({},q.sty,{sp:1,pm:1});q.speed=1;q.fuji=false;q.kx=1;q.dry=!!dry;q.nat=natOf(o.nat!=null?o.nat:H.nat);q.con=conOf(o.con!=null?o.con:H.con);delete q.seed;delete q.smooth;if(!q.diag)q.diag=[];
    const cl=(x,a,b)=>x<a?a:x>b?b:x,D0={soft:q.oq||.58,bright:cl((q.sharp||.6)+(S0.eff||0),.1,1),breathy:(q.breath||0)+S0.br,creak:0},tmp=[],out={P,q,f0b:q.f0||150};
    rows.forEach((r,n)=>{r.use=r.key;if(r.pause||(!r.mix&&!r.df))return;const a=EV[r.key].slice();                     // 母音を寄せる・ずらす：その行だけの母音を、いっとき表に足す
      if(r.mix){const b=EV[r.mix[0]];for(let j=0;j<9;j++)a[j]+=(b[j]-a[j])*r.mix[1]}
      if(r.df)for(let j=0;j<3;j++){a[j]=Math.max(150,a[j]+r.df[j]);a[j+6]=Math.max(150,a[j+6]+r.df[j])}
      r.use=r.key+'~'+n;EV[r.use]=a;tmp.push(r.use)});
    /* 長さ：芯は、音素によって少し長く作る（破擦音の下限、息のあとの継ぎ目、など）。書いた長さになるまで、渡す長さを直す（下の3回の空回し）。
       句の終わりの音素には、芯が消えぎわ（余韻）を足す。そのぶんは、次の間の中に入れて、全体の時刻が「書いた長さの合計」になるようにする */
    const EC=RSP.EC,tailOf=(r,nx)=>nx&&!nx.pause?0:r.vowel?(r.unv?.02:.05):EC[r.key][0]==='s'?.055:.02;
    rows.forEach((r,n)=>{if(r.pause){const pv=rows[n-1];r.tail=pv&&!pv.pause?pv.tail:0}else{r.tail=tailOf(r,rows[n+1]);if(r.d==null)r.d=r.dur/1000}});
    q.gfix=G=>{G.length=0;let pv=null;
      for(const r of rows){if(r.pause){G.push(r.g={p:1,ps:Math.max(.004,r.dur/1000-r.tail)});pv=null;continue}
        const g={ph:r.use,D:r.d,xd:1,am:1};if(r.en)g.en=1;else{g.J=1;g.jp=1}
        if(r.vol!=null&&r.vol!==1)g.vx=r.vol;if(r.unv)g.wv=1;if(r.asp!=null)g.aspX=r.asp/1000;if(r.n2)g.nbX=r.n2;if(r.click!=null)g.clkX=r.click;
        g.P=pv;g.N=null;if(pv)pv.N=g;pv=g;G.push(g);r.g=g}};
    q.kfix=(K,G,f0b)=>{
      for(const r of rows){const g=r.g;r.ta=g._ta;r.tb=g._tb;if(r.pause)r.ta-=r.tail;else r.tb-=r.tail;if(q.dry===2)continue;if(r.pause)continue;if(r.noise!=null)for(let i=g._k0;i<g._k1;i++)K[i][5]*=r.noise;
        if(r.nc!=null||r.nq!=null)for(let i=Math.max(0,g._k0-1);i<g._k1;i++){if(i<g._k0&&K[i][5])continue;if(r.nc!=null)K[i][6]=r.nc;if(r.nq!=null)K[i][7]=r.nq}}
      if(q.dry===2)return;
      const T=K[K.length-1][0],h=.0025,n=Math.ceil(T/h)+2,y=new Float32Array(n),W=[];
      // 高さ：通過点をまっすぐつなぎ、角を丸める（前から・後ろからの2回がけで、時刻はずれない）。そのあとで、ゆらし（vib）を足す
      for(const r of rows)if(r.p&&!r.pause)for(const pt of r.p)W.push([r.ta+(r.tb-r.ta)*pt.pos/100,pt.hz!=null?12*Math.log2(pt.hz/f0b):pt.st]);
      for(let i=0;i<n;i++)y[i]=W.length?lerpAt(W,i*h):0;
      if(smooth>0){const a=1-Math.exp(-h/(smooth*.6));let s=y[0];for(let i=0;i<n;i++){s+=(y[i]-s)*a;y[i]=s}s=y[n-1];for(let i=n-1;i>=0;i--){s+=(y[i]-s)*a;y[i]=s}}
      for(const r of rows)if(r.vib&&!r.pause){const t0=r.ta+r.vib[2]/1000;for(let i=Math.max(0,Math.ceil(t0/h));i<n&&i*h<=r.tb;i++){const t=i*h;y[i]+=r.vib[0]*Math.sin(6.2832*r.vib[1]*(t-t0))*cl((t-t0)/.12,0,1)*cl((r.tb-t)/.06,0,1)}}
      const yAt=t=>{const u=cl(t/h,0,n-1),i=Math.min(n-2,Math.floor(u));return y[i]+(y[i+1]-y[i])*(u-i)};
      // 声の質：書いた行から先に効く。行の真ん中どうしを、まっすぐつなぐ
      const LN=['soft','bright','breathy','creak'],lane=LN.map(k=>{const A=[];let v=D0[k];for(const r of rows){if(r.pause)continue;if(r[k]!=null)v=k==='soft'?.42+.36*r[k]:k==='bright'?.1+.9*r[k]:k==='breathy'?1.5*r[k]:r[k];A.push([(r.ta+r.tb)/2,v])}return A});
      // 制御点を 5 ミリ秒おきに足して（足した点は、前後をまっすぐつないだ値なので、ほかの列は変わらない）、高さと声の質を書きこむ
      const N2=[];for(let i=0;i<K.length;i++){const A=K[i];N2.push(A);const B=K[i+1];if(!B)break;
        for(let t=(Math.floor(A[0]/.005)+1)*.005;t<B[0]-1e-6;t+=.005){const u=(t-A[0])/(B[0]-A[0]),C=new Array(14);for(let j=0;j<14;j++)C[j]=A[j]+(B[j]-A[j])*u;C[0]=t;if(A.nb)C.nb=A.nb;N2.push(C)}}
      for(const A of N2){const t=A[0];A[9]=Math.pow(2,yAt(t)/12);for(let j=0;j<4;j++)A[14+j]=lerpAt(lane[j],t);if(A[14]==null){A[14]=D0.soft;A[15]=D0.bright;A[16]=D0.breathy;A[17]=0}}
      K.length=0;for(const A of N2)K.push(A);
      out.curve={h,y,f0b,at:t=>f0b*Math.pow(2,yAt(t)/12)};out.f0b=f0b;out.dur=T};
    try{q.dry=2;for(let it=0;it<3;it++){RSP.speak('/a/',q);let m=0;for(const r of rows)if(!r.pause){const e=r.dur/1000-(r.tb-r.ta);r.d=Math.max(.004,r.d+e);if(Math.abs(e)>m)m=Math.abs(e)}if(m<.0005)break}
      q.dry=!!dry;out.x=withSeed(seed,()=>RSP.speak('/a/',q))}finally{for(const k of tmp)delete EV[k]}
    out.x.rate=RSP.SRV;return out}

  // 読み戻し：鳴らした結果を測って、行ごとに返す。おかしな所は warnings に
  function readback(R){
    const x=R.x,rows=R.P.rows,sr=RSP.SRV,EC=RSP.EC,cv=R.curve,warn=[],out=[],W=(r,msg)=>warn.push({line:r?r.ln:0,msg:(r?r.ln+'行め（'+r.sym+'）：':'')+msg});
    const measF0=(tc,fe)=>{const half=Math.max(.02,1.5/fe),a=Math.max(0,Math.round((tc-half)*sr)),b=Math.min(x.length,Math.round((tc+half)*sr)),n=b-a;if(n<sr*.03)return null;
      const lo=Math.max(2,Math.floor(sr/Math.min(700,fe*1.5))),hi=Math.min(n-2,Math.ceil(sr/Math.max(40,fe/1.5))),c=[];let best=0,bl=0;
      for(let L=lo;L<=hi;L++){let s=0,e1=0,e2=0;for(let i=a;i<b-L;i++){s+=x[i]*x[i+L];e1+=x[i]*x[i];e2+=x[i+L]*x[i+L]}c[L]=s/Math.sqrt(e1*e2+1e-12);if(c[L]>best){best=c[L];bl=L}}
      if(best<.5||bl<=lo||bl>=hi)return null;const L=bl,d=(c[L-1]-c[L+1])/(2*(c[L-1]-2*c[L]+c[L+1])||1);return sr/(L+d)};   // 指定の高さの前後（0.67〜1.5倍）で、いちばん周期のそろう所
    const rms=(ta,tb)=>{const a=Math.max(0,Math.round(ta*sr)),b=Math.min(x.length,Math.round(tb*sr));let s=0;for(let i=a;i<b;i++)s+=x[i]*x[i];return b>a?Math.sqrt(s/(b-a)):0};
    // 子音の雑音：250Hz きざみで強さを測り、いちばん強い所（山）と、重心を返す。破裂音は終わりの4割、破擦音は終わりの6割、摩擦音は真ん中の7割を測る
    const spec=(ta,tb)=>{const a=Math.max(0,Math.round(ta*sr)),b=Math.min(x.length,Math.round(tb*sr)),n=b-a;if(n<48)return null;let pk=0,pf=0,s0=0,s1=0;
      for(let f=750;f<=7750;f+=250){const w=6.2832*f/sr,c=2*Math.cos(w);let q1=0,q2=0;for(let i=0;i<n;i++){const q0=x[a+i]*(.5-.5*Math.cos(6.2832*i/(n-1)))+c*q1-q2;q2=q1;q1=q0}const e=q1*q1+q2*q2-c*q1*q2;if(e>pk){pk=e;pf=f}s0+=e;s1+=e*f}
      return s0>0?[pf,Math.round(s1/s0/10)*10]:null};
    let top=1e-9,lo=1e9,hi=0;const vd=[];
    for(const r of rows){const o={line:r.ln,ph:r.pause?'_':r.sym,start:Math.round(r.ta*1e4)/10,dur:Math.round((r.tb-r.ta)*1e4)/10};out.push(o);if(r.pause)continue;
      const voiced=r.vowel?!r.unv:!!(EC[r.key]&&EC[r.key][2]),d=r.tb-r.ta;if(Math.abs(d*1000-r.dur)>4)W(r,'書いた長さ（'+r.dur+' ミリ秒）にできず、'+Math.round(d*1000)+' ミリ秒になりました（この音素の作りの下限）');o.voiced=voiced;o.rms=rms(r.ta,r.tb);
      if(voiced){o.f0=[r.ta,(r.ta+r.tb)/2,r.tb].map(t=>Math.round(cv.at(t)*10)/10);o.note=noteName(o.f0[1]);for(const f of o.f0){if(f<lo)lo=f;if(f>hi)hi=f}}
      if(r.vowel&&voiced){if(o.rms>top)top=o.rms;vd.push(d);
        if(d>=.045){const m=measF0((r.ta+r.tb)/2,o.f0[1]);o.meas=m?Math.round(m*10)/10:null;
          if(m&&!r.vib&&!(r.creak>0)&&Math.abs(12*Math.log2(m/o.f0[1]))>1)W(r,'測った高さ（'+o.meas+'Hz）が、指定（'+o.f0[1]+'Hz）と半音より大きくずれています')}
        if(d<.04)W(r,'母音が '+Math.round(d*1000)+' ミリ秒しかありません。40 ミリ秒より短いと、母音に聞こえにくくなります');
        const sl=Math.abs(12*Math.log2(o.f0[2]/o.f0[0]))/d;if(sl>60&&Math.abs(12*Math.log2(o.f0[2]/o.f0[0]))>2)W(r,'高さの動きが急です（1秒あたり '+Math.round(sl)+' 半音）。人の声は、1秒あたり 50 半音あたりまで');
        if(d>.4&&!r.vib&&Math.abs(12*Math.log2(o.f0[2]/o.f0[0]))<.4)W(r,'400 ミリ秒より長い母音の高さが、ほとんど動いていません（機械のように聞こえやすい）')}
      if(!r.vowel){const c=EC[r.key];if(c&&(c[0]==='s'||c[0]==='a'||c[0]==='f')){const nzm=c[0]==='s'?spec(r.tb-d*.4,r.tb+.004):c[0]==='a'?spec(r.tb-d*.6,r.tb):spec(r.ta+d*.15,r.tb-d*.15);if(nzm)o.noise=nzm}
        if(c&&c[0]==='s'&&d<.03)W(r,'破裂音が 30 ミリ秒より短く、閉じる間がほとんどありません');
        if(c&&c[0]==='s'&&!c[2]&&r.g.N&&r.g.N.aspT>(r.g.N._tb-r.g.N._ta)*.45)W(r,'息（asp）が、次の音素の半分ちかくを占めています')}}
    for(const o of out)if(o.rms!=null){o.level=Math.round(200*Math.log10((o.rms+1e-9)/top))/10;delete o.rms}
    if(!rows.some(r=>r.p))W(null,'高さ（p）がどの行にも書かれていません。ぜんぶ基準の高さで、平らに鳴ります');
    if(hi>0&&(lo<55||hi>520))W(null,'高さが '+Math.round(lo)+'〜'+Math.round(hi)+'Hz に広がっています（人の話し声は、だいたい 60〜500Hz）');
    if(vd.length>=6){const m=vd.reduce((a,b)=>a+b,0)/vd.length,sd=Math.sqrt(vd.reduce((a,b)=>a+(b-m)*(b-m),0)/vd.length);if(sd/m<.06)W(null,'母音の長さが、ほとんど同じです（ばらつき '+Math.round(sd/m*100)+'%）。句の終わりを伸ばす、強めたい拍を長くする、などの差をつけると、棒読みから離れます')}
    const pad=(s,n)=>{s=String(s);while(s.length<n)s=' '+s;return s};
    const text=['行   音素   頭ms  長さms  高さHz（頭→中→終）       音名      測った高さ  強さdB  雑音の山Hz（重心）'].concat(out.map(o=>pad(o.line,3)+'  '+pad(o.ph,4)+'  '+pad(o.start.toFixed(0),6)+'  '+pad(o.dur.toFixed(0),5)+'   '+
      (o.f0?pad(o.f0.map(f=>f.toFixed(0)).join('→'),15)+'   '+pad(o.note,8)+'  '+pad(o.meas!=null?o.meas.toFixed(0)+'Hz':'—',9):pad(o.ph==='_'?'（間）':'（声なし）',15)+pad('',23))+'  '+pad(o.level!=null?o.level.toFixed(1):'',6)+(o.noise?'  '+pad(o.noise[0],6)+'（'+o.noise[1]+'）':''))).join('\n')+
      '\n全体 '+(R.dur*1000).toFixed(0)+' ミリ秒'+(hi>0?'、高さ '+lo.toFixed(0)+'〜'+hi.toFixed(0)+'Hz（'+(12*Math.log2(hi/lo)).toFixed(1)+' 半音）':'')+(warn.length?'\n注意：\n'+warn.map(w=>'  ・'+w.msg).join('\n'):'\n注意：なし');
    return{ok:true,rows:out,warnings:warn,dur:R.dur,range:hi>0?[lo,hi]:null,curve:R.curve,text}}

  /* 行を鳴らす → 16kHz の Float32Array（.report に読み戻し）。o：voice、f0、nat（true/false か {sync,jit,shim,drift,b1}）、seed、smooth、
     声の質（size soft bright breathy rough shake whisper）、strict:false（読めない行を飛ばして続ける） */
  function speakRows(src,o){o=Object.assign({},o);const errs=[],P=parseRows(src,errs);
    if(errs.length&&(o.strict!==false||!P.rows.some(r=>!r.pause)))throw fail(errs,src);
    const R=runRows(P,o,false);R.x.report=readback(R);R.x.report.errors=errs;return R.x}
  // 行を確かめる：鳴らして測った結果を返す（読めない行があれば ok:false と errors）
  function checkRows(src,o){o=Object.assign({},o);const errs=[],P=parseRows(src,errs);if(errs.length)return{ok:false,errors:errs,text:'読めない行があります\n'+errs.map(e=>'  ・'+e.msg).join('\n')};
    const R=runRows(P,o,false),rep=readback(R);rep.errors=[];return rep}

  /* おまけ：かな（や / / [ ]）の文を、自動の規則をかけた結果の「行」に直す。直した行は、もとの文と、ほぼ同じ長さ・同じ高さの動きで鳴る（手で直すための下書き）。
     声や調子の切りかえ（<voice> など）のある文は、まだ直せない */
  function toRows(text,o){o=Object.assign({},o);const errs=[],base=Object.assign({},o.voice&&VOICES[o.voice],o);delete base.voice;
    const segs=plan(text,errs);if(segs.length>1)errs.push({msg:'声や調子の切りかえ（<voice> など）のある文は、まだ行に直せません',near:''});
    if(!segs.length)errs.push({msg:'読む文がありません',near:''});if(errs.length)throw fail(errs,text);
    const q=segOpts(base,segs[0].set);q.diag=errs;q.dry=true;q.dbg={};delete q.seed;delete q.nat;delete q.con;
    withSeed(o.seed!=null?o.seed:1,()=>RSP.speak(segs[0].t,q));if(errs.length&&o.strict!==false)throw fail(errs,text);
    const EV=RSP.EV,EC=RSP.EC,S=Object.assign({},RSP.STY[q.style]||RSP.STY.calm,q.sty),K=q.dbg.K,f0b=(q.f0||150)*S.pm,KA=K.map(k=>[k[0],k[9]]),st=t=>12*Math.log2(lerpAt(KA,t)),rows=[];
    for(const g of q.dbg.G){if(g._ta==null)continue;let d=g._tb-g._ta;const ok=g.ph&&!g.skip&&(EV[g.ph]||EC[g.ph]);
      if(!ok){if(d>.0015)rows.push({ln:0,pause:1,dur:d*1000});continue}
      const vowel=!!EV[g.ph],en=!!g.en,c=EC[g.ph],cut=(g.mo||g).cut&&vowel&&!g.wv?Math.min(d*.5,.012+.045/((q.speed||1)*S.sp)):0;d-=cut;
      const r={ln:0,sym:!en&&g.ph==='M'?'u':!en&&g.ph==='4'?'r':g.ph,key:g.ph,en,vowel,dur:d*1000,target:d};
      if(g.wv)r.unv=1;if((vowel&&!g.wv)||(c&&c[2])){const a=g._ta+Math.min(.004,d*.1),b=g._ta+d-Math.min(.002,d*.05);r.p=(vowel?[a,(a+b)/2,b]:[(a+b)/2]).map((t,j,A)=>({st:Math.round(st(t)*10)/10,pos:A.length===1?50:50*j}))}
      if(c&&c[0]==='s'&&!c[2]&&g.N&&g.N.aspT)r.asp=Math.round(g.N.aspT*1000);
      if(g.am&&Math.abs(g.am-1)>.03)r.vol=Math.round(g.am*100)/100;
      rows.push(r);if(cut)rows.push({ln:0,pause:1,dur:cut*1000})}
    // 句の終わりの余韻は、次の間に入れる（行の書式の決まり）。長さ合わせは、鳴らすときに runRows がする
    rows.forEach((r,n)=>{if(r.pause)return;const nx=rows[n+1];if(nx&&!nx.pause)return;const t=r.vowel?(r.unv?.02:.05):EC[r.key][0]==='s'?.055:.02,sp=1/((q.speed||1)*S.sp);r.dur=Math.max(10,r.dur-t*sp*1000);if(nx)nx.dur+=t*sp*1000});
    const P={head:{f0:Math.round(f0b*10)/10}};if(o.voice)P.head.voice=o.voice;
    const L=[];if(P.head.voice)L.push('voice '+P.head.voice);L.push('f0 '+P.head.f0);let en=false;const pad=(s,n)=>{s=String(s);while(s.length<n)s+=' ';return s};
    for(const r of rows){if(r.pause){L.push(pad('_',5)+Math.round(r.dur));continue}if(r.en!==en){en=r.en;L.push('lang '+(en?'en':'ja'))}
      L.push((pad(r.sym,5)+pad(Math.round(r.dur),5)+(r.p?' p '+r.p.map(x=>(x.st>0?'+':'')+x.st).join(' '):'')+(r.unv?' unv':'')+(r.asp!=null?' asp '+r.asp:'')+(r.vol!=null?' vol '+r.vol:'')).trimEnd())}
    return L.join('\n')}
  return{speakRows,checkRows,toRows,parseRows,NAT:NATDEF,CON:CONDEF,singVoice,noteAttr,VERSION,speak,sing,check,toPhonemes,lyric,radio,buffer,VOICES,voices,DIMS,voiceAt,STYLES:Object.keys(RSP.STY),RSP,OtoSing,SR:{speak:RSP.SRV,sing:OtoSing.SR,radio:24000}};
})();
/*</OTOVOICE-API>*/
root.OtoVoice=OtoVoice;__OV=OtoVoice;
})(typeof self!=='undefined'?self:this);
/*! TextScore 2.1.0 — テキスト譜スタジオの演奏エンジン（テキストの楽譜を Web Audio の合成音で鳴らす）
 *  TextScore.bgm(text) / TextScore.play(text, {loop:false}) / TextScore.note('bell','C6') …  使い方と譜面の書き方は、すぐ下の手引き。詳しくは README.md
 *  サンプル音源なし・依存なし・1ファイル。(c) Toshiaki Yokoda. 楽器と編集は Claude (Anthropic) と作成。 */
/*!
 * ==========================================================================================
 *  TextScore の手引き — このファイルだけを渡された人・AI が、作品に組み込んで曲を書くためのもの
 *  （書き方と値の範囲は、このファイルのコードと照らしてある。「目安」と書いた数値は、同梱の曲集で使っている値）
 * ==========================================================================================
 *
 * ■ 1. これは何か
 *   テキストで書いた楽譜を、ブラウザの中で合成して鳴らす。1ファイル、依存なし、音声ファイルなし、通信なし。
 *   <script src="textscore.js"> で TextScore というグローバルが1つできる。1つのHTMLにまとめる作品では、このファイルの中身を
 *   <script> の中にそのまま貼ればよい（このファイルの中に、script の閉じタグと同じ文字列は入っていない）。
 *   ES モジュール版は textscore.esm.js（import TextScore from './textscore.esm.js'）。Node で require すると、parse だけ使える。
 *
 * ■ 2. いちばん短い使い方
 *     const SONG = `
 *     tempo 120
 *     @lead violin vol=0.8 rev=0.4
 *     E5:2 G5 A5 | B5:3 A5 |
 *     @bass bass vol=0.7
 *     E2:4 | G2:4 |
 *     `;
 *     button.onclick = () => TextScore.bgm(SONG);
 *   ・ブラウザは、クリックやキー操作があるまで音を出さない。操作の前に bgm() を呼んでもよい（最初の操作で、曲の頭から鳴り始める）。
 *   ・譜面は JS のテンプレート文字列に入れてよい。譜面の中の $名前 はそのままで安全（$ のすぐあとに { を書かないこと）。
 *
 * ■ 3. API
 *   TextScore.bgm(text, {fade:1.2, volume:0.8})  BGM の枠は1つ。違う曲ならクロスフェード、同じ曲なら何もしない（毎フレーム呼んでよい）。
 *                                                bgm(null, {fade:2}) で、フェードして止める。Player を返す
 *   TextScore.play(text, {loop, volume, fadeIn, from, onEnd, onLoop})   好きなだけ重ねて鳴らす（ジングル、効果音の譜面）。Player を返す
 *                                                loop は true（ずっと）/ false（1回）/ 数（その回数）。from は始める位置（拍）
 *   TextScore.stopAll({fade:0.5})
 *   TextScore.note('bell', 'E6', {dur:0.3, vol, pan, rev, vel, delay})   1音だけ。和音は ['C4','E4','G4']。vel 1.3 以上で鋭く、0.55 以下でやわらかく
 *   TextScore.drum('k')   TextScore.drum(['k','y'], {kit:'dnb', vel:0.5})   1打だけ
 *   await TextScore.preload(text)   先にぜんぶ書き出しておく（重い曲を、頭から安定して鳴らす）
 *   await TextScore.render(text, {sampleRate:48000, onProgress:(done,total)=>{}})   曲を1回ぶん（頭から終わりまで）書き出して、
 *                                   2ch の AudioBuffer を返す（1.9.0）。鳴らしたときと同じ出口（エコー → コンプレッサー → リミッター）を通す。
 *                                   全体の音量と Player の音量は入らない。音声ファイルにするのは、呼ぶ側（WebCodecs の AudioEncoder など）
 *   TextScore.unlock()              クリックなどの中で呼ぶと、その場で音声を有効にする
 *   TextScore.parse(text)           読み取りだけ → {errors:[{line,msg}], warns:[{line,msg}], tempo, length（拍）, tracks, events}
 *   TextScore.masterVolume = 0.7    全体の音量
 *   TextScore.config({lite:true, prerender:true, reverb:'auto', cacheMB:160})   lite は軽量モード。reverb は 'auto' / 'conv' / 'iir'
 *                                   自分の Web Audio につなぐときは、最初の音より前に config({context, destination})
 *   Player（bgm と play が返すもの）
 *     p.stop({fade})  p.pause()  p.resume()  p.setVolume(v, 秒)  p.mute('drums')  p.mute(['pad','bass'], false)  p.load(text)
 *     p.on('end', fn)  p.on('loop', fn)     p.position → {beat, bar, beatInBar, seconds, loop}（毎フレーム読めば、絵を拍に合わせられる）
 *     p.errors  p.warnings  p.title  p.tracks  p.duration  p.stats  p.playing  p.paused
 *   TextScore.instruments（楽器名の一覧）  TextScore.drums（ドラムの文字の一覧）  TextScore.version
 *
 * ■ 4. 譜面の書き方（1行に1つ。// から行末まではコメント）
 *   ［曲の設定］ 頭にまとめて書く。曲の途中では変えられない（1曲に1つの値）
 *     title 曲名
 *     tempo 120        30〜300（bpm と書いても同じ）
 *     meter 4          1小節の拍数（1〜12。書かなければ 4）
 *     swing 0.33       0〜0.5。裏の8分音符を後ろへずらす（0.33 で3連のシャッフル）
 *     reverb 2.4       残響の長さ（秒、0.3〜8）          revtype conv   残響の種類（conv / iir。ふつうは書かない）
 *     delay 0.75       エコーの間隔（拍、0.125〜4。3/4 のような分数も可。0.75 は付点8分）
 *     intro 4          頭の4小節は前奏。ループの2周目からは飛ばす
 *   ［トラック］ @名前 楽器 設定 設定 …   その下の行が、そのトラックの音符（次の @ の行まで）
 *     同じ @名前 をもう一度書くと、続きにはならず、別のトラックが1本増える。1トラックは1回の @ で、音符の行を何行でも続ける
 *     どの楽器にも書ける設定:
 *       vol=0.8（0〜1.5）  pan=0（-1 左 〜 1 右）  rev=0.2（残響へ送る量 0〜1）  dly=0（エコーへ送る量 0〜1）
 *       len=1（長さを書かない音符の長さ、拍。len=1/4 のような分数も可。drums の既定は 0.5）
 *       oct=1（オクターブ移動 ±4）  tr=7（半音の移調 ±24）  det=7（セント ±100）  glide=0.05（前の音からすべる秒数）  vib=1（ビブラートの深さ 0〜3）
 *       cut=2400（これより高い側を落とす、Hz）  hp=200（低い側を落とす、Hz）  q=8（フィルターの共鳴）
 *       drive=0.5（歪み 0〜1）  bits=6（ビット落とし 1〜12）  chorus=0.4（0〜1）  wah=4  phaser=0.5  trem=6（ゆれの速さ、Hz）
 *       loop（単語だけ書く。そのトラックの中身を、曲の終わりまでくり返す。ドラムや伴奏の型に）
 *   ［音符］ 空白で区切る。長さの単位は拍（4分音符が 1）
 *     C4  D#4  Bb3            音名＋オクターブ（C4 がまんなかのド）
 *     C4:2  E4:0.5  G4:1/3    「:長さ」。書かなければ、そのトラックの len
 *     C4+E4+G4:2              和音（長さは、和音ぜんたいに1つ）
 *     -:1                     休み（r . と書いても同じ）
 *     _:1                     前の音をのばす（タイ）
 *     C5!  C5!!  C5?  C5??    強く（1つで 1.3倍）／弱く（1つで 0.55倍）。多くの楽器は、強さで音色と立ち上がりも変わる
 *     A4^2:2  A4^-1@0.5~0.5:2 ベンド（^半音。@ は始める位置、~ はかける長さ。どちらも拍）
 *     E5tr:2  E5tr1:2         トリル（数は半音の幅。書かなければ 2）
 *     |                       小節線。なくても鳴るが、小節の途中に置くと警告が出るので、数えまちがいを見つけられる。書くことをすすめる
 *   ［まとめ書き］
 *     def 名前 = 中身          $名前 で呼ぶ（def はどこに書いてもよい。中で、ほかの $名前 も呼べる）
 *     [C4 E4 G4]*4  [$beat |]*8   くり返し（入れ子も可）
 *   ［ドラム］ 楽器 drums。文字1つが1打、+ で同時に打つ。- は休み
 *     k キック  s スネア  p リム  c クラップ  h ハイハット  o オープンハイハット  b シェイカー  t タム  l ロータム  y クラッシュ  z ライド
 *     g ゴング  w ウッドブロック  v カウベル  q コンガ  x 指パッチン
 *     kit=std（既定）/ dnb（やわらかいブレイク。ドラムンベース向き）/ chip（8bit）。s?? は、ごく弱いゴーストノート
 *
 * ■ 5. 楽器
 *   8bit: sine triangle square saw pulse
 *   鍵盤・はじく音: piano epiano organ accordion harp guitar（澄んだギター）pluck kalimba musicbox marimba steeldrum bell
 *   弦・管: violin violins strings brass flute sax        シンセ: lead pad choir
 *   低音: bass sub acid fmbass reese                      ロックギター: rockgtr distgtr（7章）
 *   歌声: voice voicem voiceh voicek（6章）               打楽器: drums
 *
 * ■ 6. 歌声（楽器を voice 女 / voicem 男 / voiceh 高い男声 / voicek 子供 にする）
 *   音符の行のあとに、かなで歌詞の行を書く。かな1つが、音符1つ（きゃ・しゃ などは2文字で1つ）
 *     @uta voice vol=1.0 rev=0.35
 *     E4 G4 G4 A4 | G4 D4:2 -:1 |
 *     まどのそとに
 *   ・歌詞は、そのトラックの、まだ歌詞のついていない音符に、前から順に当たる。かなが音符より多いとエラー。
 *     少ないと、残りの音符は「あ」で歌う（歌詞の行を書かなければ、ぜんぶ「あ」＝歌詞のない声）
 *   ・ー は、前の母音のまま次の音符へ。ん は音符を1つ取る。っ は音符を取らず、前の音を短く切る。助詞の は・へ は、わ・え と書く。カタカナも可
 *   ・和音を書いても、いちばん上の音だけを歌う（ハモりは、トラックを分ける）。音符がつながっていればひと息、休みで息つぎ
 *   ・! は強く明るく、? は弱く息まじりに歌う。^（ベンド）と _（タイ）は使える。tr（トリル）は無視
 *   英語の歌詞（1.9.0）: 歌詞の行の [ ] の中に、英語の音節を空白で区切って書く。1音節が音符1つ。つづりではなく、発音の記号で書く
 *     @uta voice vol=1.0 rev=0.35
 *     C4 C4 G4 G4 | A4 A4 G4:2 |
 *     [ twIN k@l twIN k@l lI t@l stAr ]
 *     母音  i（see）I（sit）E（bed）{（cat）A（father）O（law）U（book）u（food）V（cup）@（about）3（bird）
 *           eI（day）aI（my）oU（go）aU（now）OI（boy）
 *     子音  p b t d k g f v T（thin）D（this）s z S（she）Z（vision）tS（church）dZ（judge）h m n N（sing）l r w j（yes）4（はじき）
 *   ・音節は、頭の子音（いくつでも）＋母音1つ＋語末の子音（いくつでも）。母音のない音節は書けない（little は lI t@l）
 *   ・- は、前の音節を次の音符へ伸ばす（[ laIt - ] で2音符。語末の子音と、二重母音の終わりは、伸ばした最後の音符で鳴る）
 *   ・' % : は読みとばす（強勢の印は効かない。強くしたい音符は ! で）。かなと同じ行に書ける（よぞらに [ SaI nIN ]）。【 】も使える
 *   ・[ で始まる行は、音符・休み・$名前・| が1つもなければ、歌詞の行として読む。行の頭に > をつけると、かならず歌詞の行になる
 *   トラックの設定:
 *     vib=1  expr=1（歌いまわし 0〜2。0 で機械的）  breath=1（息の量 0〜2.5）  glide=
 *     reg=chest / mix / falsetto / auto、または 0〜1（声区。0 地声、0.5 ミックス、1 裏声。auto は高さで切りかわる）
 *     shout=0〜1（叫び）  rough=0〜1.2（荒れ）  edge=0〜1（鋭さ。喉を絞った刺さる声）  whisper=0〜1（囁き。0.4 で息まじり、0.7 で囁き歌い）
 *     air=0〜2（息の雑音の高さ。囁きを使う高い声では 1。1 を超えると母音が分かりにくくなる）
 *     onset=0〜1（音符の頭の息。裏声＋囁きでは、0.5 くらいに下げると頭がなだらかになる）
 *     bvow=a（息の雑音を、音符の口の形ではなく、その母音の口の形に通す。a i u e o。鼻歌（ん）の息は「う」のように鳴るが、bvow=a で「あ」のように鳴る。声の成分は変わらない。2.0.1）
 *     inhale=0〜1（フレーズの前の、息を吸う音の大きさ。書かなければ 1。2.0.1）
 *     batk=0.3（フレーズの頭で、息の雑音が立ち上がるまでの秒。声より遅れて、息がそっと入ってくる。書かなければ 0。2.0.1）
 *     ★ 2.0.2 から、音符の頭の息は、伸ばしているあいだの息に比例する（フレーズの頭で 0.6 倍、つながった音符の頭で 0.2 倍まで。onset を掛ける）。
 *        breath を下げれば、頭の息も下がる。それまでは決まった量を足していて、裏声や囁きで、頭だけ雑音が強く出ていた。oldpuff=1 で、2.0.1 までの決め方に戻る
 *   歌詞の中の【 】で、その場所から行の終わりまで、出し方を切りかえる（次の歌詞の行は、トラックの設定に戻る）
 *     【地】【ミ】【裏】【自】        声区（地声・ミックス・裏声・自動）
 *     【叫0.6】【荒0.3】【鋭0.5】【囁0.5】   量つき（数を省くと、叫・鋭・囁は 1、荒は 0.6）。【裏叫】のように重ねて書ける。【】で、トラックの設定に戻る
 *     【返】  ここで裏声へひっくり返る（声が一瞬とぎれて、高さも出し方も切りかわる）
 *     【跳】  次のかな1つだけ、語尾が1オクターブ上へ跳ねる（【跳7】で半音7つ）
 *   高さ: 出しやすいのは、女 A3〜E5、男 A2〜E4、子供 C4〜G5（作りの上での目安）。同梱の曲では、叫びや裏声で、女は A5、男は E5 まで、高い男声は E4〜E6 を使っている
 *   コツ:
 *   ・かな1つは、0.2秒より長いほうが子音がつぶれない（192BPM の8分音符＝0.16秒でも拍には乗るが、ことばは聞き取りにくくなる）
 *   ・D5（約600Hz）から上は、母音が聞き取りにくくなる。ことばを聞かせたい所は低めに、高い所は長い音や「あー」「うー」にする
 *   ・出し方の型（同梱の曲から）:
 *       力のある高い声        reg=mix edge=0.6             サビの叫び          歌詞に【叫0.8鋭】
 *       息まじりの細い声      reg=0.64 whisper=0.25 edge=0.5 air=1
 *       息の抜ける裏声        reg=falsetto whisper=0.4 edge=0.2 onset=0.5 air=1.5
 *       囁き歌い              whisper=0.75 air=1           荒れた地声          reg=chest rough=0.25
 *   ・小数の reg は、トラックの設定にしか書けない（タグは 地・ミ・裏 の3つ）。出し方ごとに音量や残響を変えたいときは、トラックを分ける
 *   ・のばす音の終わりを息へ抜くには、同じ高さの音符2つに分けて、あとの音符に【囁0.7】（歌詞は「あー【囁0.7】ー」）
 *   ・歌のあるトラックは、鳴らす前に1曲ぶんをまとめて計算する（1分の歌で 0.3秒ほど）
 *   ・英語は、1音節に子音がいくつも入るので、かなより長い音符が要る（0.3秒より長いと聞き取りやすい）。語末の子音は、次の音符の手前で鳴る
 *
 * ■ 7. ロックギター（rockgtr は5段のアンプ、distgtr は3段。歪みはトラックにかかるので、和音は弦を足してからまとめて歪む）
 *   ・パワーコードは E2+B2 や E2+B2+E3。? は刻み（ブリッジミュート）、?? はもっと短い刻み、! は強いピッキング
 *   ・速いリフは len=0.25（16分）や len=0.5（8分）で書く。8分より短い音符は、下げ弾きと上げ弾きが自動で交互になる
 *   ・左右に1本ずつ置く: 同じ譜面を、pan=-0.45 のトラックと、pan=0.45 det=7 のトラックに書く（def にまとめて、両方から $名前 で呼ぶ）
 *   ・リードは amp=0.8 fb=0.3 dly=0.2。のばした単音には、遅れてビブラートとフィードバックがかかる。3度上をもう1本重ねると、ツインリード
 *   ・設定: amp=0〜1（歪みの深さ。既定 0.7）  steps=段の数  pick=0〜3（ピックの音）  mute=0〜1（? の深さ）  fb=0〜1（フィードバック）
 *     amp= と steps= は、ほかの楽器のトラックにも書ける
 *
 * ■ 8. 作るときのコツ
 *   まず確かめる（鳴らす前に、かならず）:
 *     const s = TextScore.parse(text);   s.errors と s.warns が、どちらも空であること。行番号と理由が入っている
 *     よく出るもの: トラックの長さがそろっていない（短いトラックは -:8 のような休みで埋める）／ 小節線が小節の途中にある ／
 *                   かなが音符より多い ／ $名前 が定義されていない ／ 楽器名のまちがい（sine で代用されて鳴ってしまう）
 *   音量の目安（同梱の曲集で使っている vol。合計が大きくなっても、出口のコンプレッサーが抑える）:
 *     drums 0.3〜0.62（kit=dnb は 0.8〜1.1）／ bass 0.36〜0.6、reese 0.75〜0.9 ／ 和音の楽器（pad epiano guitar strings）0.2〜0.5
 *     主旋律の楽器（piano sax violin flute pluck）0.35〜0.85 ／ rockgtr のリズム 0.26〜0.6（左右1本ずつ）、リード 0.5〜0.64
 *     歌は、主の声 0.9〜1.5、ハモりや重ねる声 0.5〜0.9（vol は 1.5 まで。それより上を書いても 1.5 になる）
 *   書き方:
 *   ・同じ型は def と [ ]*n にまとめる。区間（前奏・A・サビ）ごとに def を作り、トラックの行に「$A $B $C」と並べると、長さをそろえやすい
 *   ・曲の途中で、テンポ・拍子・トラックの音量は変えられない。静かな所と大きな所は、! と ?、鳴らす楽器の数、トラックの分け方で作る
 *   ・ループさせる BGM は intro を使う（前奏は1回だけ鳴る）。終わりの小節から、前奏の次の小節へ戻っても、つながるように書く
 *   ・残響とエコー: 曲の頭で reverb（長さ）と delay（間隔）を決め、トラックごとに rev= と dly= で送る量を決める。低音とドラムは少なめ（0.1 前後）
 *   ・左右: 低音・キック・主旋律・歌は、まんなか。和音やハモりを pan=±0.2〜0.45 に振る
 *   ・速い曲のドラムは len=0.25 にして、16分の升目で書く:  k - h - s - h - k k h - s - h - |
 *   ・短い効果音は TextScore.note / drum で。凝った効果音は、1〜2小節の譜面を play(text, {loop:false}) で鳴らす
 *   重さ:
 *   ・初めて鳴らす曲の頭の約3秒は、その場で合成する。あとは、先に書き出したものを流す。重い曲は preload() してから鳴らす
 *   ・遅い端末では config({lite:true})。同時に鳴らせる音は、ぜんぶ合わせて 96（軽量モードは 40）
 *
 * ■ 9. 作例（どちらも、そのまま鳴る。parse でエラーも警告も出ないことを確かめてある）
 *     title 例1：楽器だけの8小節（ループ）
 *     tempo 124
 *     reverb 2.0
 *     def beat = k h s h k k s o
 *     def Am = A3+C4+E4:2 -:0.5 A3+C4+E4:1.5
 *     def F  = F3+A3+C4:2 -:0.5 F3+A3+C4:1.5
 *     def G  = G3+B3+D4:2 -:0.5 G3+B3+D4:1.5
 *     @lead lead vol=0.5 rev=0.3 dly=0.25 glide=0.03
 *     E5:1.5 D5:0.5 C5 A4 | C5:3 -:1 | D5:1.5 C5:0.5 B4 G4 | A4!:3 -:1 |
 *     E5:1.5 D5:0.5 C5 A4 | C5:2 E5:2 | G5^2@0.5~0.5:2 F5 D5 | E5:3 -:1 |
 *     @keys epiano vol=0.4 rev=0.3 pan=-0.2
 *     $Am | $F | $G | $Am | $Am | $F | $G | $Am |
 *     @bass bass len=0.5 vol=0.55
 *     [A1 A1 A2 A1]*2 | [F1 F1 F2 F1]*2 | [G1 G1 G2 G1]*2 | [A1 A1 A2 A1]*2 |
 *     [A1 A1 A2 A1]*2 | [F1 F1 F2 F1]*2 | [G1 G1 G2 G1]*2 | A1:1 -:1 A1 A1 E2:1 |
 *     @drums drums vol=0.6
 *     [$beat |]*7 k+y h s h s s t l |
 *
 *     title 例2：歌とロックギターの4小節
 *     tempo 150
 *     @uta voiceh vol=1.2 rev=0.25 reg=mix edge=0.5
 *     E4 G4 A4 A4 | B4 A4 G4:1.5 -:0.5 |
 *     よあけのまちを
 *     E5! D5 B4 A4 | B4:3 -:1 |
 *     【叫0.5鋭】かけぬ【返】けろ
 *     @gtrL rockgtr len=0.5 vol=0.45 pan=-0.4
 *     [E2? E2? E2+B2! E2?]*2 | [C3? C3? C3+G3! C3?]*2 | [G2+D3 G2+D3? G2+D3? G2+D3]*2 | E2+B2+E3!:4 |
 *     @gtrR rockgtr len=0.5 vol=0.45 pan=0.4 det=7
 *     [E2? E2? E2+B2! E2?]*2 | [C3? C3? C3+G3! C3?]*2 | [G2+D3 G2+D3? G2+D3? G2+D3]*2 | E2+B2+E3!:4 |
 *     @bass bass len=0.5 vol=0.55
 *     [E1]*8 | [C2]*8 | [G1]*8 | E1:4 |
 *     @drums drums vol=0.6
 *     k+y h s h k k s h | k h s h k k s h | k h s h k k s o | k+y:2 s s t l |
 *
 * ■ 10. 知っておくこと
 *   ・音色も歌声も、計算で作った音（録音は使っていない）。歌詞は、高い声・囁き・早口ほど聞き取りにくい
 *   ・作り手が動作を確かめたのは、Chrome 系のブラウザ。Safari・Firefox・スマホの実機では、確かめていない
 *   ・測定値や、作りの細かい説明は README.md にある
 *
 * ■ 11. OtoVoice と1つのファイル otostudio.js に（2.0.0）
 *   このファイルには、話し声・歌声の合成 OtoVoice も入っている。歌声の芯は、OtoVoice のもの1つだけを使う（これまでの曲は、同じ音で鳴る）
 *   OtoStudio.OtoVoice（TextScore.OtoVoice、ブラウザでは OtoVoice でも）で、話す・歌う・手で書く行が使える。書き方は、このファイルのはじめにある OtoVoice の手引き
 *   歌声のトラックに足したもの
 *     as=名前      声を、OtoVoice の声の見本・テンプレートから選ぶ（jiji、youji、yasashii など。楽器名の voice／voicem／voiceh／voicek は、どれでもよい）
 *                  ★ 2.1.0 から、楽器名だけの voice は「女（平均的な高さ。大きさ 1.25）」、voicek は「子供（大きさ 1.45）」。人が聴いて合わせた基準（2026-11-28）。
 *                     それまでの voice は「低めの女」、voicek は「平均より少し高い女」に聞こえていた。その音がほしいときは voice as=onna、voicek as=kodomo と書く
 *                     （2.0.2 までの譜面を、同じ音で鳴らすには、歌声のトラックに as=onna／as=kodomo を足す。size= を書いたトラックは、書いた大きさのまま）
 *                     やや幼い子供は as=osanago、若い女は as=wakai
 *     size= soft= bright= breathy= shake=   声の質（OtoVoice の声の質と同じ意味）。rough と whisper は、これまでの歌声の設定のほうが効く
 *     nat=1        歌い方の改良：濁った子音で高さが沈み、大きく跳ぶ前に反対へ少し振れる（書かなければ切。これまでの曲の音を変えないため）
 *     音符の { }   C4:2{vib 1.5, rate 6, delay .3}　{scoop 1}　{cent 30}　{p 0@0/-2@100}
 *                  vib ゆらしの深さの倍率／rate 速さ Hz／delay ゆれはじめるまでの秒／scoop 頭を何半音下から入るか／cent セント／p 音符の中の高さの線（半音@位置％）
 *                  セントは { } の中に書く（C4+30 とは書けない。+ は和音）
 *     歌詞の行に、日本語の音素（/ka ze ni/）も書ける。行の頭が / のときは、歌詞の行として読む
 *       @uta voice as=yasashii nat=1 rev=0.3
 *       C4{scoop 1.5} D4 E4:2{vib 1.4, delay .25} | G4{cent 15} E4 D4:2{p 0@0/0@60/-1.5@100, vib 0} |
 *       そらへ /to N de/
 *   まだ無いもの：曲の中に話し声（台詞）を置くトラック。話し声は TextScore.OtoVoice.speak で作って、別に鳴らす
 */
(function(root,factory){ __TS=factory(); })(typeof self!=='undefined'?self:this,function(){
'use strict';
const INSTRUMENTS = {
  sine:'正弦波', triangle:'三角波', square:'矩形波', saw:'ノコギリ波', pulse:'8bitパルス',
  lead:'シンセリード', pluck:'プラック', guitar:'ギター', harp:'ハープ', epiano:'エレピ',
  bell:'ベル', musicbox:'オルゴール', marimba:'マリンバ', organ:'オルガン', strings:'ストリングス',
  brass:'ブラス', flute:'フルート', choir:'コーラス', pad:'シンセパッド', bass:'シンセベース',
  sub:'サブベース', acid:'アシッドベース', fmbass:'FMベース', reese:'リースベース',
  piano:'ピアノ', distgtr:'歪みギター（3段）', rockgtr:'ロックギター（5段）', accordion:'アコーディオン', kalimba:'カリンバ', steeldrum:'スチールパン', violin:'バイオリン', violins:'バイオリン合奏', sax:'サックス', voice:'歌声（女）', voicem:'歌声（男）', voiceh:'歌声（男・高）', voicek:'歌声（子供）', drums:'ドラム'
};
const DRUM_NAMES = {k:'キック',s:'スネア',p:'リム',c:'クラップ',h:'ハイハット',o:'オープンHH',b:'シェイカー',t:'タム',l:'ロータム',y:'クラッシュ',z:'ライド',g:'ゴング',w:'ウッドブロック',v:'カウベル',q:'コンガ',x:'フィンガースナップ'};
const DRUM_ROWS = ['g','y','z','o','h','b','x','c','s','p','w','v','q','t','l','k'];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const fmt=x=>String(Math.round(x*1000)/1000);

function parseDur(s){
  if(s==null) return NaN;
  const m=String(s).match(/^(\d+(?:\.\d+)?)(?:\/(\d+(?:\.\d+)?))?$/);
  if(!m) return NaN;
  return m[2]?(+m[1])/(+m[2]):+m[1];
}
function noteToMidi(n){
  const m=n.match(/^([A-Ga-g])([#b]?)(-?\d)$/);
  if(!m) return null;
  const base={C:0,D:2,E:4,F:5,G:7,A:9,B:11}[m[1].toUpperCase()];
  return (parseInt(m[3])+1)*12+base+(m[2]==='#'?1:m[2]==='b'?-1:0);
}
const stripComment=s=>s.replace(/\/\/.*$/,'');
function expandLine(s,macros,onMissing){
  for(let d=0;d<12&&s.includes('$');d++){
    s=s.replace(/\$([A-Za-z_]\w*)/g,(m,n)=>{ if(n in macros) return ' '+macros[n]+' '; onMissing(n); return ' '; });
  }
  const re=/\[([^\[\]]*)\]\s*\*\s*(\d+)/g; let prev;
  do{ prev=s; s=s.replace(re,(m,b,n)=>Array(Math.min(+n,256)).fill(b).join(' ')); }while(s!==prev);
  return s.replace(/[\[\]]/g,' ').replace(/\|/g,' | ');
}

function parse(text){
  const song={title:'',tempo:100,meter:4,swing:0,delay:0.75,reverb:2.4,revtype:'',tracks:[],events:[],errors:[],warns:[],length:0,intro:0};
  let introBars=0, introLine=0;
  const lines=text.split('\n'), macros={};
  const err=(i,msg)=>song.errors.push({line:i+1,msg});
  const warn=(i,msg)=>song.warns.push({line:i+1,msg});
  lines.forEach(raw=>{ const m=stripComment(raw).trim().match(/^def\s+([A-Za-z_]\w*)\s*=(.*)$/); if(m) macros[m[1]]=m[2]; });
  let cur=null;
  lines.forEach((raw,i)=>{
    const line=stripComment(raw).trim();
    if(!line) return;
    let m;
    if(/^def\b/.test(line)){ if(!/^def\s+[A-Za-z_]\w*\s*=/.test(line)) err(i,'def は「def 名前 = 中身」の形で書きます'); return; }
    if((m=line.match(/^title\s+(.+)$/i))){ song.title=m[1].trim(); return; }
    if((m=line.match(/^revtype\s+(\S+)$/i))){ const v=m[1].toLowerCase(); if(REV_TYPES.includes(v)) song.revtype=v; else err(i,`revtype は ${REV_TYPES.join(' / ')} のどれかです`); return; }
    if((m=line.match(/^intro\s+(\S+)$/i))){ const v=parseFloat(m[1]); if(!(v>=0)){ err(i,`intro の値「${m[1]}」が読めません`); return; } introBars=v; introLine=i; return; }
    if((m=line.match(/^(tempo|bpm|meter|swing|delay|reverb)\s+(\S+)$/i))){
      const k=m[1].toLowerCase(), v=k==='delay'?parseDur(m[2]):parseFloat(m[2]);
      if(!isFinite(v)){ err(i,`${m[1]} の値「${m[2]}」が読めません`); return; }
      if(k==='tempo'||k==='bpm') song.tempo=clamp(v,30,300);
      else if(k==='meter') song.meter=clamp(Math.round(v),1,12);
      else if(k==='swing') song.swing=clamp(v,0,0.5);
      else if(k==='delay') song.delay=clamp(v,0.125,4);
      else song.reverb=clamp(v,0.3,8);
      return;
    }
    if(line[0]==='@'){
      const parts=line.slice(1).trim().split(/\s+/);
      const name=parts[0]||('track'+(song.tracks.length+1));
      let inst=(parts[1]||'sine').toLowerCase();
      if(!(inst in INSTRUMENTS)){ err(i,`楽器「${parts[1]}」はありません（sine で代用）`); inst='sine'; }
      cur={name,inst,det:0,glide:0,hp:0,q:null,drive:0,bits:0,wah:0,phaser:0,chorus:0,trem:0,lastTop:null,len:inst==='drums'?0.5:1,vol:0.8,pan:0,rev:inst==='drums'?0.12:0.2,dly:0,oct:0,tr:0,cut:0,kit:'std',loop:false,t:0,last:null,idx:song.tracks.length,line:i+1};
      for(const kv of parts.slice(2)){
        if(kv==='loop'){ cur.loop=true; continue; }
        const [k,v]=kv.split('='); const x=parseFloat(v);
        const bad=()=>err(i,`設定「${kv}」が読めません`);
        switch(k){
          case 'len': { const d=parseDur(v); d>0?cur.len=d:bad(); break; }
          case 'vol': isFinite(x)?cur.vol=clamp(x,0,1.5):bad(); break;
          case 'pan': isFinite(x)?cur.pan=clamp(x,-1,1):bad(); break;
          case 'rev': isFinite(x)?cur.rev=clamp(x,0,1):bad(); break;
          case 'dly': isFinite(x)?cur.dly=clamp(x,0,1):bad(); break;
          case 'oct': isFinite(x)?cur.oct=clamp(Math.round(x),-4,4):bad(); break;
          case 'tr': isFinite(x)?cur.tr=clamp(Math.round(x),-24,24):bad(); break;
          case 'glide': isFinite(x)?cur.glide=clamp(x,0,2):bad(); break;
          case 'hp': isFinite(x)?cur.hp=clamp(x,20,8000):bad(); break;
          case 'q': isFinite(x)?cur.q=clamp(x,0,30):bad(); break;
          case 'drive': isFinite(x)?cur.drive=clamp(x,0,1):bad(); break;
          case 'bits': isFinite(x)?cur.bits=clamp(Math.round(x),1,12):bad(); break;
          case 'wah': isFinite(x)?cur.wah=clamp(x,0,20):bad(); break;
          case 'phaser': isFinite(x)?cur.phaser=clamp(x,0,10):bad(); break;
          case 'chorus': isFinite(x)?cur.chorus=clamp(x,0,1):bad(); break;
          case 'trem': isFinite(x)?cur.trem=clamp(x,0,20):bad(); break;
          case 'det': isFinite(x)?cur.det=clamp(x,-100,100):bad(); break;
          case 'vib': isFinite(x)?cur.vib=clamp(x,0,3):bad(); break;
          case 'cut': isFinite(x)?cur.cut=clamp(x,80,20000):bad(); break;
          case 'amp': isFinite(x)?cur.amp=clamp(x,0,1):bad(); break;                    // 段々のアンプ：歪みの深さ
          case 'steps': isFinite(x)&&(Math.round(x)===0||Math.round(x)>=2)?cur.steps=clamp(Math.round(x),0,16):bad(); break;   // アンプの段の数（rockgtr は5、distgtr は3。0はなめらか）
          case 'pick': isFinite(x)?cur.pick=clamp(x,0,3):bad(); break;                  // ピックの当たる音の強さ
          case 'mute': isFinite(x)?cur.mute=clamp(x,0,1):bad(); break;                  // ? をつけた音のミュートの深さ
          case 'fb': isFinite(x)?cur.fb=clamp(x,0,1):bad(); break;                      // のばした音のフィードバック
          case 'kit': (v==='chip'||v==='std'||v==='dnb')?cur.kit=v:bad(); break;
          case 'breath': isFinite(x)?cur.breath=clamp(x,0,2.5):bad(); break;
          case 'expr': isFinite(x)?cur.expr=clamp(x,0,2):bad(); break;
          case 'reg': (v in OtoSing.REGS)?cur.reg=v:isFinite(x)?cur.reg=clamp(x,0,1):bad(); break;      // 声区：chest / mix / falsetto / auto、または 0〜1
          case 'shout': isFinite(x)?cur.shout=clamp(x,0,1):bad(); break;
          case 'rough': isFinite(x)?cur.rough=clamp(x,0,1.2):bad(); break;
          case 'edge': isFinite(x)?cur.edge=clamp(x,0,1):bad(); break;
          case 'whisper': isFinite(x)?cur.whisper=clamp(x,0,1):bad(); break;
          case 'artic': isFinite(x)?cur.artic=x>0?1:0:bad(); break;                      // 子音の作り（1 が既定。0 で、0.5 までの作り）
          case 'air': isFinite(x)?cur.air=clamp(x,0,2):bad(); break;                       // 息の高さ（0 が既定。1 で息が 3kHz あたりへ、2 でさらに上へ）
          case 'onset': isFinite(x)?cur.onset=clamp(x,0,1):bad(); break;
          case 'as': OtoVoice.VOICES[v]?cur.as=v:bad(); break;                             // 歌声：声の見本・テンプレートの名前（2.0.0）
          case 'size': case 'soft': case 'bright': case 'breathy': case 'shake': isFinite(x)?(cur.dims=cur.dims||{})[k]=k==='size'?clamp(x,0.7,1.7):clamp(x,0,1):bad(); break;   // 歌声：声の質
          case 'nat': isFinite(x)?cur.nat=clamp(x,0,1):bad(); break;                       // 歌声：歌い方の改良（濁った子音での沈み、跳ぶ前の予備動作）
          case 'bvow': /^[aiueo]$/.test(v)?cur.bvow=v:bad(); break;                        // 歌声：息の雑音を通す母音（2.0.1）
          case 'inhale': isFinite(x)?cur.inhale=clamp(x,0,1):bad(); break;                 // 歌声：フレーズの前の、息を吸う音の大きさ（2.0.1）
          case 'batk': isFinite(x)?cur.batk=clamp(x,0,2):bad(); break;                     // 歌声：フレーズの頭で、息の雑音が立ち上がるまでの秒（2.0.1）
          case 'oldpuff': isFinite(x)?cur.oldpuff=x>0:bad(); break;                        // 歌声：音符の頭の息を、2.0.1 までの決め方に戻す（2.0.2）                   // 母音の入りの息（1 が既定。裏声＋囁きでは、小さくすると頭の息の山が減る）
          default: bad();
        }
      }
      song.tracks.push(cur); return;
    }
    if(!cur){ err(i,'先に「@名前 楽器」でトラックを始めてください'); return; }
    if(VOX_INST[cur.inst]&&(/^[>\u3010\u3041-\u3096\u30a1-\u30fa\u30fc\u301c]/.test(line)||enLine(line)||/^\/[^\/]/.test(line))){ voxLyrics(cur,line.replace(/^>/,''),i,err); return; }   // 歌詞の行（かな、【 】、>、英語の [ ]）
    const body=expandLine(line,macros,n=>err(i,`$${n} は定義されていません`)).replace(/\s*\{[^}]*\}/g,s=>s.replace(/\s+/g,''));   // { } の中の空白は取る（音符の指定。歌声のトラックだけ）
    let barWarned=false;
    for(const tok0 of body.split(/\s+/).filter(Boolean)){
      if(tok0==='|'){
        const r=cur.t%song.meter;
        if(!barWarned && r>1e-6 && song.meter-r>1e-6){ barWarned=true; warn(i,`「${cur.name}」の小節線が${Math.floor(cur.t/song.meter)+1}小節目の途中（${fmt(r)}拍のあと）にあります`); }
        continue;
      }
      let vel=1;
      let bend=null, trill=0, va=null;
      const tok1=tok0.replace(/\{[^}]*\}/,s=>{ if(!VOX_INST[cur.inst]){ err(i,`「${tok0}」：{ } の指定は、歌声のトラックだけで使えます`); return ''; }
        const W=[]; va=OtoVoice.noteAttr([null,null,null,null,s],W,tok0); for(const w of W) err(i,w.msg+'：'+tok0); return ''; });
      const tok=tok1.replace(/[!?]/g,c=>{ vel*=c==='!'?1.3:0.55; return ''; })
        .replace(/\^([+-]?\d*\.?\d+)(?:@(\d*\.?\d+))?(?:~(\d*\.?\d+))?/,(m0,a,at,du)=>{ bend={amt:clamp(+a,-24,24),at:at?+at:0,dur:du?+du:null}; return ''; })
        .replace(/tr([1-4])?/,(m0,a)=>{ if(cur.inst==='drums') return m0; trill=a?+a:2; return ''; });
      const ci=tok.indexOf(':');
      const head=ci<0?tok:tok.slice(0,ci);
      const d=ci<0?cur.len:parseDur(tok.slice(ci+1));
      if(!(d>0)){ err(i,`「${tok0}」の長さが読めません`); continue; }
      if(head==='-'||head==='r'||head==='.'){ cur.t+=d; cur.last=null; continue; }
      if(head==='_'){ if(cur.last) cur.last.d+=d; cur.t+=d; continue; }
      const notes=[]; let bad=null;
      for(const n of head.split('+')){
        if(cur.inst==='drums'){ const k=n.toLowerCase(); if(DRUM_NAMES[k]) notes.push(k); else bad=n; }
        else { const mm=noteToMidi(n); if(mm==null) bad=n; else notes.push(mm); }
      }
      if(bad!==null||!notes.length){ err(i,`「${bad??tok0}」が読めません`); cur.t+=d; continue; }
      const ev={t:cur.t,d,notes,vel,track:cur};
      if(cur.inst!=='drums'){
        if(bend&&bend.amt) ev.bend=bend;
        if(va) ev.va=va;
        if(trill) ev.trill=trill;
        const top=Math.max(...notes);
        if(cur.glide>0&&cur.lastTop!=null&&cur.lastTop!==top) ev.glideFrom=cur.lastTop-top;
        cur.lastTop=top+(ev.bend?ev.bend.amt:0);
      }
      song.events.push(ev); cur.last=ev; cur.t+=d;
      if(VOX_INST[cur.inst]) (cur.unsung||(cur.unsung=[])).push(ev);
    }
  });
  const fixed=song.tracks.filter(t=>!t.loop);
  const raw=Math.max(0,...(fixed.length?fixed:song.tracks).map(t=>t.t));
  song.length=raw>0?Math.ceil(raw/song.meter-1e-9)*song.meter:0;
  for(const t of fixed) if(Math.abs(t.t-raw)>1e-6) song.warns.push({line:t.line,msg:`「${t.name}」は${fmt(t.t)}拍で、最長の${fmt(raw)}拍とそろっていません`});
  for(const t of song.tracks.filter(t=>t.loop)){
    if(!(t.t>0)||!song.length) continue;
    const base=song.events.filter(e=>e.track===t);
    for(let k=1;k*t.t<song.length-1e-9;k++) for(const e of base){ const nt=e.t+k*t.t; if(nt<song.length-1e-9) song.events.push({...e,t:nt}); }
  }
  for(const e of song.events){ const t=e.track; if(t.inst==='drums') continue; const lo=Math.min(...e.notes)+12*t.oct+t.tr; if(!(t.lo<=lo)) t.lo=lo; }   // lowest note of each track
  song.events.sort((a,b)=>a.t-b.t);
  if(introBars>0 && song.length){
    const I=introBars*song.meter;
    if(I<song.length-1e-9) song.intro=I;
    else song.warns.push({line:introLine+1,msg:`intro ${fmt(introBars)}小節が曲の長さ（${fmt(song.length/song.meter)}小節）以上なので無視します`});
  }
  for(const t of song.tracks){ delete t.unsung; if(VOX_INST[t.inst]){ t.vox={song}; song.vox=true; } }
  return song;
}
const swingBeat=(t,sw)=>{ if(!sw) return t; const f=t-Math.floor(t); return Math.abs(f-0.5)<1e-6?t+sw*0.5:t; };

/* ---------- audio graph ---------- */
let ctx=null, outIn=null, noiseBuf=null; const waves={}; const irCache=new Map(); const ksCache=new Map();
// LITE: lightweight mode — fewer oscillators per note, no vibrato, short mono reverb, smaller voice cap
let LITE=false;
const voiceCap=()=>LITE?40:96;
let active=[];      // sounding / scheduled voices, for the voice cap and for stopping everything at once
let collect=null;   // sources created by the voice currently being built
const lfos=[];      // shared vibrato LFOs (one per rate) instead of one oscillator per note
function audioInit(c){
  ctx=c; mainCtx=c;
  worklet={ok:false,tried:false,failed:false,ready:Promise.resolve(false)}; irCache.clear(); ksCache.clear(); active=[]; lfos.length=0;
  const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-16; comp.knee.value=8; comp.ratio.value=3; comp.attack.value=0.008; comp.release.value=0.25;
  const lim=ctx.createDynamicsCompressor(); lim.threshold.value=-3; lim.knee.value=0; lim.ratio.value=20; lim.attack.value=0.002; lim.release.value=0.1;
  const mg=ctx.createGain(); mg.gain.value=0.72*masterVol; masterGain=mg;
  comp.connect(lim); lim.connect(mg); mg.connect(DEST||ctx.destination); outIn=comp;
  noiseBuf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
  const nd=noiseBuf.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
  initWaves();
  buildDrumBank();
}
// periodic waves belong to one context, so the pre-renderer makes its own set with this
function initWaves(){
  if(!waves.dist){ const n=1024, c=new Float32Array(n); for(let i=0;i<n;i++){ const x=i*2/(n-1)-1; c[i]=Math.tanh(x*3.2)/Math.tanh(3.2); } waves.dist=c; }
}
function getIR(sec){
  const cap=LITE?1.4:4, key=Math.round(Math.min(sec,cap)*10)/10;
  if(irCache.has(key)) return irCache.get(key);
  const sr=ctx.sampleRate, len=Math.floor(sr*key), pre=Math.floor(sr*0.012), chs=LITE?1:2;
  const buf=ctx.createBuffer(chs,len,sr);
  for(let c=0;c<chs;c++){
    const d=buf.getChannelData(c); let lp=0;
    for(let i=pre;i<len;i++){
      const x=(i-pre)/(len-pre);
      lp+=((Math.random()*2-1)-lp)*(1-0.85*x);
      d[i]=lp*Math.pow(1-x,2)*Math.exp(-x*3);
    }
  }
  irCache.set(key,buf); return buf;
}
/* ---------- reverbs ----------
   conv: convolution with a generated impulse (the original sound)
   iir: Freeverb-style — parallel feedback combs, then series allpasses (lite: fewer of each, mono)
   Stability: each comb loop is delay -> one-pole low-pass (gain never above 1) -> g = 10^(-3·delay/T60), capped at 0.97,
   and the allpass loops have gain 0.5. No loop is cross-coupled with another, so even if the browser inserts an extra
   128-sample block of delay anywhere in a cycle (Web Audio does this where it breaks feedback cycles), every loop's
   gain stays below 1 and nothing can grow. A feedback-delay-network was tried and dropped: its cross-coupled loops
   came out differently run to run in Chrome, which voids that guarantee. */
const REV_TYPES=['conv','iir'];
let REV_FORCE='';                       // set from the page's reverb selector; '' = song / mode default
const LITE_REV='iir';
// decay time and level matched to conv by measurement (the node-graph fallback decays longer: the browser adds hidden block delays to its loops)
const REV_CAL={iir:{t:1.12,lvl:0.186,lvlLite:0.28,tNode:0.95,lvlLiteNode:0.35}};
function revType(song){ const v=REV_FORCE||song.revtype; return REV_TYPES.includes(v)?v:(LITE?LITE_REV:'conv'); }

// Freeverb in one AudioWorklet: every feedback path is exact (no hidden 128-sample blocks), and the whole reverb is
// one node instead of ~90, which is what makes it cheap. Loop gains: comb g <= 0.97 after a one-pole low-pass, allpass 0.5.
const FV_SRC=`
class FvReverb extends AudioWorkletProcessor{
  constructor(o){
    super(); const p=o.processorOptions, sr=sampleRate, k=sr/44100;
    this.lvl=p.lvl; this.d=p.damp; this.T=p.T; this.quiet=0;
    this.pre=new Float32Array(Math.max(1,Math.round(0.012*sr))); this.pi=0;
    this.ch=[];
    for(let c=0;c<p.chs;c++){
      const sp=c?23:0;
      const combs=p.combs.map(n=>{ const len=Math.max(1,Math.round((n+sp)*k)); return {b:new Float32Array(len),i:0,f:0,g:Math.min(0.97,Math.pow(10,-3*len/sr/p.T))}; });
      const aps=p.aps.map(n=>({b:new Float32Array(Math.max(1,Math.round((n+sp)*k))),i:0}));
      this.ch.push({combs,aps});
    }
    this.x=new Float32Array(128);
  }
  process(inputs,outputs){
    const inp=inputs[0], out=outputs[0], n=out[0].length;
    let x=this.x; if(x.length!==n) x=this.x=new Float32Array(n);
    let any=false;
    if(inp&&inp.length){ const a=inp[0], b=inp[1]; for(let j=0;j<n;j++){ const v=b?(a[j]+b[j])*0.5:a[j]; x[j]=v; if(v!==0) any=true; } }
    else x.fill(0);
    if(any) this.quiet=0; else this.quiet+=n;
    // tail finished and nothing coming in: output silence without running the filters
    if(this.quiet>sampleRate*(this.T*1.5+0.5)){ for(const o of out) o.fill(0); return inp&&inp.length>0; }
    const pre=this.pre, P=pre.length, d=this.d, d1=1-d, lvl=this.lvl;
    let xd=this.xd; if(!xd||xd.length!==n) xd=this.xd=new Float32Array(n);
    let pi=this.pi;
    for(let j=0;j<n;j++){ pre[pi]=x[j]; pi=(pi+1)%P; xd[j]=pre[pi]; }   // 12 ms pre-delay
    this.pi=pi;
    for(let c=0;c<this.ch.length;c++){
      const st=this.ch[c], o=out[c];
      for(let j=0;j<n;j++){
        const xin=xd[j];
        let acc=0;
        for(const cb of st.combs){ const y=cb.b[cb.i]; cb.f=y*d1+cb.f*d; cb.b[cb.i]=xin+cb.f*cb.g; if(++cb.i===cb.b.length) cb.i=0; acc+=y; }
        acc*=lvl;
        for(const ap of st.aps){ const bo=ap.b[ap.i]; ap.b[ap.i]=acc+bo*0.5; acc=bo-acc; if(++ap.i===ap.b.length) ap.i=0; }
        o[j]=acc;
      }
    }
    for(let c=this.ch.length;c<out.length;c++) out[c].set(out[0]);
    return true;
  }
}
registerProcessor('fv-reverb',FvReverb);
`;
let worklet={ok:false,ready:Promise.resolve(false)};
function loadWorklet(c){
  const w={ok:false,ready:Promise.resolve(false)};
  try{
    if(c&&c.audioWorklet&&typeof AudioWorkletNode!=='undefined'){
      // blob: first, data: as a second try (some setups refuse one or the other)
      const blob=()=>c.audioWorklet.addModule(URL.createObjectURL(new Blob([FV_SRC],{type:'text/javascript'})));
      const data=()=>c.audioWorklet.addModule('data:text/javascript;base64,'+btoa(unescape(encodeURIComponent(FV_SRC))));
      w.ready=blob().catch(data).then(()=>{ w.ok=true; return true; },()=>false);
    }
  }catch(e){}
  return w;
}
// the AudioWorklet is loaded the first time the IIR reverb is asked for, so songs that never use it run exactly as before
function ensureWorklet(){
  if(worklet.tried) return worklet.ready;
  const c=ctx, w=loadWorklet(c); w.tried=true; worklet=w;
  w.ready=w.ready.then(ok=>{ if(!ok) w.failed=true;
    // a session that started before the worklet was ready gets the real reverb now
    if(ok&&ctx===c) onWorkletReady();
    return ok; });
  return w.ready;
}
function buildIIRWorklet(inp,out,sec){
  const lite=LITE, C=[1116,1188,1277,1356,1422,1491,1557,1617], A=[556,441,341,225];
  const combs=lite?[C[0],C[2],C[5],C[7]]:C, aps=lite?[A[0],A[3]]:A, chs=lite?1:2;
  const node=new AudioWorkletNode(ctx,'fv-reverb',{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,
    processorOptions:{T:Math.max(0.2,Math.min(sec,4)*REV_CAL.iir.t),chs,combs,aps,damp:0.3,lvl:(lite?REV_CAL.iir.lvlLite:REV_CAL.iir.lvl)*0.6/combs.length}});
  inp.connect(node); node.connect(out); return node;
}
const onePole=a=>ctx.createIIRFilter([1-a],[1,-a]);
function predelay(inp){ const d=ctx.createDelay(0.1); d.delayTime.value=0.012; inp.connect(d); return d; }
const loopGain=(D,T)=>Math.min(0.97,Math.pow(10,-3*D/T));
function buildIIR(inp,out,sec){
  const C=[1116,1188,1277,1356,1422,1491,1557,1617], A=[556,441,341,225];
  const combs=LITE?[C[0],C[2],C[5],C[7]]:C, aps=LITE?[A[0],A[3]]:A, chs=LITE?1:2;
  const T=Math.max(0.2,Math.min(sec,4)*REV_CAL.iir.tNode), x=predelay(inp);   // conv also stops at 4 s
  const mg=chs===2?ctx.createChannelMerger(2):null; if(mg) mg.connect(out);
  for(let ch=0;ch<chs;ch++){
    const sp=ch?23:0, sum=ctx.createGain(); sum.gain.value=(LITE?REV_CAL.iir.lvlLiteNode:REV_CAL.iir.lvl)*0.6/combs.length;
    for(const c of combs){
      const D=(c+sp)/44100, d=ctx.createDelay(0.1), f=onePole(0.3), g=ctx.createGain();
      d.delayTime.value=D; g.gain.value=loopGain(D,T);
      x.connect(d); d.connect(f); f.connect(g); g.connect(d); d.connect(sum);
    }
    let y=sum;
    for(const a of aps){   // Freeverb allpass: w = x + 0.5·w[n-D], y = w[n-D] - x
      const w=ctx.createGain(), d=ctx.createDelay(0.1), fb=ctx.createGain(), inv=ctx.createGain(), o=ctx.createGain();
      d.delayTime.value=(a+sp)/44100; fb.gain.value=0.5; inv.gain.value=-1;
      y.connect(w); w.connect(d); d.connect(fb); fb.connect(w); d.connect(o); y.connect(inv); inv.connect(o); y=o;
    }
    if(mg) y.connect(mg,0,ch); else y.connect(out);
  }
}
function buildReverb(s,song){
  const hp=ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=180;
  const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=6000;
  const rg=ctx.createGain(); rg.gain.value=0.9;
  const type=revType(song);
  let wantWorklet=false;
  if(type==='iir'){
    const explicit=REV_FORCE==='iir'||song.revtype==='iir';
    if(worklet.ok) buildIIRWorklet(hp,lp,song.reverb);
    else {
      ensureWorklet();
      if(worklet.failed&&explicit) buildIIR(hp,lp,song.reverb);           // no AudioWorklet in this browser: node-graph version
      else { wantWorklet=!worklet.failed; const conv=ctx.createConvolver(); conv.buffer=getIR(song.reverb); hp.connect(conv); conv.connect(lp); } // until the worklet loads
    }
  }
  else { const conv=ctx.createConvolver(); conv.buffer=getIR(song.reverb); hp.connect(conv); conv.connect(lp); }
  s.revIn.connect(hp); lp.connect(rg); rg.connect(s.live||s.bus);
  s.rev={hp,rg,type,wantWorklet};
}
// switch reverb type on a running session: the old tail rings out, new input goes to the new reverb
function swapReverb(s,song){
  if(!s||!s.rev) return; const old=s.rev;
  try{ s.revIn.disconnect(old.hp); }catch(e){}
  buildReverb(s,song);
  setTimeout(()=>{ try{ old.rg.disconnect(); }catch(e){} },6000);
}

/* ---------- pre-rendering (先読み) ----------
   The song is cut into chunks of whole bars (about 3 s). Each chunk is rendered in an OfflineAudioContext, which runs on
   its own thread, with the same voice and track-effect code as live playback. A chunk holds the notes that start inside
   it plus their ring-out, so overlapping chunks simply add up. Everything after the notes is linear except drive/bits,
   so the only difference from live playback is that distortion is applied to each chunk's notes separately where two
   chunks overlap. The reverb is added to each chunk afterwards (see bakeWet); the echo and the master compressor are live. */
let PRERENDER=true;
let PR_LAZY=true, PR_WINDOW=0.3;   // pre-render adds notes to its graph this many seconds before they sound
const prBudget=()=>(LITE?64:96)*1024*1024;   // bytes of rendered audio kept per song (about 100 s of music at the normal rate)
const REL_TAIL={bell:6,harp:3.2,guitar:2.6,musicbox:2.6,kalimba:2.2,steeldrum:2,violin:1.3,violins:1.35,piano:1.6,epiano:1.6,pad:1.8,strings:1.3,choir:1.4,marimba:1.1};
function noteTail(ev){
  const t=ev.track;
  if(t.vox) return 0.7;
  if(t.inst==='drums') return ev.notes.includes('g')?2.6:ev.notes.includes('y')?(t.kit==='dnb'?2.5:1.9):t.kit==='dnb'&&ev.notes.includes('z')?1.7:0.8;
  return (REL_TAIL[t.inst]||0.7)+(t.chorus?0.08:0);
}
function chunkPlan(sg){
  const L=sg.length, I=sg.intro||0, spb=60/sg.tempo, barB=sg.meter;
  const C=Math.max(1,Math.round(3/(barB*spb)))*barB, plan=[];
  const add=(a,b)=>{ for(let x=a;x<b-1e-9;x+=C) plan.push({s:x,e:Math.min(b,x+C)}); };
  add(0,I); add(I,L);
  let k=0; for(const ev of sg.events){ while(k<plan.length-1&&ev.t>=plan[k].e-1e-9) k++; ev.ci=k; }
  return plan;
}
// build one chunk's graph in its own context, reusing the engine's voice code by pointing the engine's globals at it
/* ---------- reverb baked into the chunks ----------
   The reverb is linear and does not change while a song plays, so it does not have to run on the audio thread: a
   chunk's reverb send is turned into its wet signal once, in a Worker, and added to the chunk. Tails of neighbouring
   chunks overlap and add up to exactly what one long-running reverb would give. After that, playing a song is buffer
   playback into the master compressor. The echo stays live: it costs little, and its long ring-out would make every
   chunk several times longer. The live reverb remains for notes that are scheduled live.
   wetCore is self-contained on purpose: the Worker is made from its source text. */
function wetCore(){
  const TW=new Map();
  function fft(re,im,inv){   // in-place radix-2, length a power of two
    const n=re.length; let t=TW.get(n);
    if(!t){ const c=new Float64Array(n/2), s=new Float64Array(n/2); for(let i=0;i<n/2;i++){ c[i]=Math.cos(2*Math.PI*i/n); s[i]=Math.sin(2*Math.PI*i/n); }
      const rev=new Uint32Array(n); let bits=0; while((1<<bits)<n) bits++; for(let i=0;i<n;i++){ let r=0; for(let b=0;b<bits;b++) if(i&(1<<b)) r|=1<<(bits-1-b); rev[i]=r; }
      TW.set(n,t={c,s,rev}); if(TW.size>3) TW.delete(TW.keys().next().value); }
    const {c,s,rev}=t, sg=inv?1:-1;
    for(let i=0;i<n;i++){ const j=rev[i]; if(j>i){ let x=re[i]; re[i]=re[j]; re[j]=x; x=im[i]; im[i]=im[j]; im[j]=x; } }
    for(let size=2;size<=n;size<<=1){
      const half=size>>1, step=n/size;
      for(let i=0;i<n;i+=size){
        for(let j=0,k=0;j<half;j++,k+=step){
          const wr=c[k], wi=sg*s[k], a=i+j, b=a+half, xr=re[b]*wr-im[b]*wi, xi=re[b]*wi+im[b]*wr;
          re[b]=re[a]-xr; im[b]=im[a]-xi; re[a]+=xr; im[a]+=xi;
        }
      }
    }
    if(inv){ const k=1/n; for(let i=0;i<n;i++){ re[i]*=k; im[i]*=k; } }
  }
  // Web Audio biquad (Q in dB, as BiquadFilterNode low-pass / high-pass), run in place
  function biquad(x,type,f,sr){
    const w=2*Math.PI*Math.min(f,sr*0.45)/sr, cs=Math.cos(w), al=Math.sin(w)/(2*Math.pow(10,1/20)), a0=1+al;
    const b0=(type==='lp'?(1-cs)/2:(1+cs)/2)/a0, b1=(type==='lp'?1-cs:-(1+cs))/a0, a1=-2*cs/a0, a2=(1-al)/a0;
    let x1=0,x2=0,y1=0,y2=0;
    for(let i=0;i<x.length;i++){ const v=x[i], y=b0*v+b1*x1+b0*x2-a1*y1-a2*y2; x2=x1; x1=v; y2=y1; y1=y; x[i]=y; }
  }
  // half-band low-pass (windowed sinc, 31 taps: flat to 8 kHz, -60 dB from 16 kHz at 48 kHz) for 2:1 down and 1:2 up.
  // Only the odd taps and the centre are non-zero, so each output sample costs 8 multiplications.
  const HT=(()=>{ const N=31, m=15, h=new Float64Array(N); let sum=0; for(let i=0;i<N;i++){ const k=i-m, sinc=k===0?0.5:Math.sin(Math.PI*k/2)/(Math.PI*k), wnd=0.42-0.5*Math.cos(2*Math.PI*i/(N-1))+0.08*Math.cos(4*Math.PI*i/(N-1)); h[i]=sinc*wnd; sum+=h[i]; }
    const t=new Float64Array(8); for(let q=0;q<8;q++) t[q]=h[m+2*q+1]/sum; return {c:h[m]/sum,t}; })();
  function down2(x,len){ const n=Math.ceil(len/2), p=new Float64Array(2*n+32), y=new Float64Array(n), t=HT.t, c=HT.c; p.set(len<x.length?x.subarray(0,len):x,16);
    for(let i=0;i<n;i++){ const k=2*i+16; y[i]=c*p[k]+t[0]*(p[k-1]+p[k+1])+t[1]*(p[k-3]+p[k+3])+t[2]*(p[k-5]+p[k+5])+t[3]*(p[k-7]+p[k+7])+t[4]*(p[k-9]+p[k+9])+t[5]*(p[k-11]+p[k+11])+t[6]*(p[k-13]+p[k+13])+t[7]*(p[k-15]+p[k+15]); }
    return y; }
  // y (low rate, padded with 8 zeros in front and behind: y[8] is the first sample) -> out (full rate), added with gain g
  function up2add(y,n,out,at,g){ const t=HT.t, g2=2*g, c2=2*HT.c*g, N=out.length;
    for(let i=0;i<n;i++){ const k=i+8, e=at+2*i; if(e+1>=N){ if(e<N) out[e]+=c2*y[k]; break; }
      out[e]+=c2*y[k];
      out[e+1]+=g2*(t[0]*(y[k]+y[k+1])+t[1]*(y[k-1]+y[k+2])+t[2]*(y[k-2]+y[k+3])+t[3]*(y[k-3]+y[k+4])+t[4]*(y[k-4]+y[k+5])+t[5]*(y[k-5]+y[k+6])+t[6]*(y[k-6]+y[k+7])+t[7]*(y[k-7]+y[k+8])); } }
  function rng(q){ return ()=>{ q=(q+0x6D2B79F5)|0; let t=Math.imul(q^(q>>>15),1|q); t=(t+Math.imul(t^(t>>>7),61|t))^t; return ((t^(t>>>14))>>>0)/4294967296*2-1; }; }
  /* The impulse response the live ConvolverNode gets (getIR), with the node's own loudness normalisation and with the
     180 Hz high-pass and 6 kHz low-pass that sit around the live reverb already applied to it, kept at half the sample
     rate (nothing above 6 kHz is left to lose). The last 15% of the response is below -55 dB and is dropped. */
  const IRS=new Map();
  function ir(sr,sec,chs){
    const key=sr+'|'+sec+'|'+chs; let r=IRS.get(key); if(r) return r;
    const len=Math.floor(sr*sec), pre=Math.floor(sr*0.012), use=Math.min(len,Math.ceil(len*0.85))+Math.round(0.03*sr), h=[]; let pw=0;
    for(let c=0;c<chs;c++){ const d=new Float64Array(Math.max(len,use)), rnd=rng(0x51ED+c*7919+Math.round(sec*10)); let lp=0;
      for(let i=pre;i<len;i++){ const x=(i-pre)/(len-pre); lp+=(rnd()-lp)*(1-0.85*x); d[i]=lp*Math.pow(1-x,2)*Math.exp(-x*3); pw+=d[i]*d[i]; }
      h.push(d); }
    const scale=0.00125/Math.max(Math.sqrt(pw/(chs*len)),0.000125)*44100/sr;
    const low=h.map(d=>{ biquad(d,'hp',180,sr); biquad(d,'lp',6000,sr); const e=Math.round(0.02*sr); for(let i=0;i<e;i++) d[use-1-i]*=i/e; return down2(d,use); });
    r={scale,low,n:low[0].length,spec:null}; IRS.set(key,r); if(IRS.size>3) IRS.delete(IRS.keys().next().value); return r;
  }
  // x * h by FFT in blocks (overlap-add); the transform stays at 131072 points or less while the response allows it,
  // because larger ones fall out of the processor cache and cost more than twice as much per sample
  function conv(x,len,sr,sec,chs,L,R,g){
    const h=ir(sr,sec,chs), xd=down2(x,len), nx=xd.length; let n=h.spec?h.spec.n:4096; while(n<h.n+Math.min(nx,4096)||(n<131072&&n<h.n+nx)) n<<=1;   // never smaller than last time: the response's transform is kept for one size
    if(!h.spec||h.spec.n!==n){ const re=new Float64Array(n), im=new Float64Array(n); re.set(h.low[0]); if(chs>1) im.set(h.low[1]); fft(re,im,false); h.spec={n,re,im}; }   // H = H_L + i·H_R
    const hr=h.spec.re, hi=h.spec.im, B=n-h.n+1, re=new Float64Array(n+16), im=new Float64Array(n+16), k=g*h.scale*2;
    const fr=re.subarray(8,8+n), fi=im.subarray(8,8+n);      // 8 samples of padding on both sides for the interpolator
    for(let at=0;at<nx;at+=B){
      const m=Math.min(B,nx-at); fr.fill(0); fi.fill(0); fr.set(xd.subarray(at,at+m)); fft(fr,fi,false);
      for(let i=0;i<n;i++){ const a=fr[i], b=fi[i]; fr[i]=a*hr[i]-b*hi[i]; fi[i]=a*hi[i]+b*hr[i]; }
      fft(fr,fi,true);                                   // real part: left, imaginary part: right
      const cnt=Math.min(n,m+h.n-1); up2add(re,cnt,L,2*at,k); up2add(chs>1?im:re,cnt,R,2*at,k);
    }
  }
  // Freeverb, the same structure and numbers as the live AudioWorklet version
  function freeverb(x,sr,p,L,R,g){
    const k=sr/44100, P=Math.max(1,Math.round(0.012*sr)), n=L.length, d=p.damp, d1=1-d, out=[L,R];
    for(let c=0;c<p.chs;c++){
      const sp=c?23:0, combs=p.combs.map(m=>{ const len=Math.max(1,Math.round((m+sp)*k)); return {b:new Float32Array(len),i:0,f:0,g:Math.min(0.97,Math.pow(10,-3*len/sr/p.T))}; });
      const aps=p.aps.map(m=>({b:new Float32Array(Math.max(1,Math.round((m+sp)*k))),i:0})), o=out[c], nc=combs.length, na=aps.length;
      for(let j=0;j<n;j++){
        const q=j-P, xin=q>=0&&q<x.length?x[q]:0; let acc=0;
        for(let u=0;u<nc;u++){ const cb=combs[u], y=cb.b[cb.i]; cb.f=y*d1+cb.f*d; cb.b[cb.i]=xin+cb.f*cb.g; if(++cb.i===cb.b.length) cb.i=0; acc+=y; }
        acc*=p.lvl;
        for(let u=0;u<na;u++){ const ap=aps[u], bo=ap.b[ap.i]; ap.b[ap.i]=acc+bo*0.5; acc=bo-acc; if(++ap.i===ap.b.length) ap.i=0; }
        o[j]+=g*acc;
      }
    }
    if(p.chs<2) for(let j=0;j<n;j++) R[j]+=L[j];
  }
  /* job: {sr, n (output length), rev (the reverb send, Float32Array), type 'conv'|'iir', sec, chs, fv (freeverb numbers)}
     returns the wet signal {L,R}, already at the level the live graph would add to the bus */
  return function(job){
    const L=new Float32Array(job.n), R=new Float32Array(job.n);
    if(job.rev){
      // the send's ring-out below -70 dB adds nothing audible to a reverb; leaving it out keeps the transform small
      const rv=job.rev; let pk=0; for(let i=0;i<rv.length;i++){ const v=rv[i]<0?-rv[i]:rv[i]; if(v>pk) pk=v; }
      let len=rv.length; const th=pk*3e-4; while(len>1&&rv[len-1]<th&&rv[len-1]>-th) len--;
      const x=new Float64Array(rv.subarray(0,len));
      if(job.type==='iir'){
        biquad(x,'hp',180,job.sr); const wl=new Float32Array(job.n), wr=new Float32Array(job.n); freeverb(x,job.sr,job.fv,wl,wr,1);
        biquad(wl,'lp',6000,job.sr); biquad(wr,'lp',6000,job.sr); for(let i=0;i<job.n;i++){ L[i]+=0.9*wl[i]; R[i]+=0.9*wr[i]; }
      }
      else conv(x,len,job.sr,job.sec,job.chs,L,R,0.9);
    }
    return {L,R};
  };
}

let BAKE=true;                        // off: chunks keep both send channels and feed the live reverb
let wetWorker=null, wetLocal=null, wetSeq=0; const wetWait=new Map();
function wetRun(job){
  const local=()=>{ const t=performance.now(); if(!wetLocal) wetLocal=wetCore(); const r=wetLocal(job); return {L:r.L,R:r.R,ms:performance.now()-t}; };
  if(wetWorker===null){
    try{
      const src='const f=('+wetCore.toString()+')(); onmessage=e=>{ const j=e.data, t=performance.now(), r=f(j); postMessage({id:j.id,L:r.L,R:r.R,ms:performance.now()-t},[r.L.buffer,r.R.buffer]); };';
      wetWorker=new Worker(URL.createObjectURL(new Blob([src],{type:'text/javascript'})));
      wetWorker.onmessage=e=>{ const w=wetWait.get(e.data.id); if(w){ wetWait.delete(e.data.id); w.ok(e.data); } };
      wetWorker.onerror=()=>{ wetWorker=false; for(const w of wetWait.values()) w.local(); wetWait.clear(); };   // no Worker here: same code on this thread
    }catch(e){ wetWorker=false; }
  }
  if(!wetWorker) return Promise.resolve(local());
  return new Promise(ok=>{ const id=++wetSeq; wetWait.set(id,{ok,local:()=>ok(local())}); wetWorker.postMessage(Object.assign({id},job)); });
}
// what the baked reverb depends on besides the song text (part of the cache key of rendered chunks)
const bakeSig=()=>BAKE?'bake:'+REV_FORCE:'sends';
async function bakeWet(sg,buf,dur){
  const sr=buf.sampleRate, peak=d=>{ let m=0; for(let i=0;i<d.length;i++){ const v=d[i]<0?-d[i]:d[i]; if(v>m) m=v; } return m; };
  const rv=buf.getChannelData(2), dl=buf.getChannelData(3), echo=peak(dl)>1e-5;
  let job=null, tail=0, w={L:null,R:null,ms:0};
  if(peak(rv)>1e-5){
    const type=revType(sg), sec=Math.round(Math.min(sg.reverb,LITE?1.4:4)*10)/10, chs=LITE?1:2;
    job={sr,rev:rv,type,sec,chs}; tail=sec;
    if(type==='iir'){ const C=[1116,1188,1277,1356,1422,1491,1557,1617], A=[556,441,341,225], combs=LITE?[C[0],C[2],C[5],C[7]]:C;
      job.fv={T:Math.max(0.2,Math.min(sg.reverb,4)*REV_CAL.iir.t),chs,combs,aps:LITE?[A[0],A[3]]:A,damp:0.3,lvl:(LITE?REV_CAL.iir.lvlLite:REV_CAL.iir.lvl)*0.6/combs.length};
      tail=job.fv.T*1.3+0.05; }
  }
  const n=buf.length+Math.ceil(tail*sr);
  if(job){ job.n=n; w=await wetRun(job); }
  const out=[new Float32Array(n),new Float32Array(n)];
  for(let c=0;c<2;c++){ out[c].set(buf.getChannelData(c)); const a=out[c], b=c?w.R:w.L; if(b) for(let i=0;i<n;i++) a[i]+=b[i]; }
  // keep only what can be heard: cut shortly after the last sample above -72 dB, with a fade
  let last=0; for(const a of out){ for(let i=n-1;i>last;i--) if(a[i]>2.5e-4||a[i]<-2.5e-4){ last=i; break; } }
  if(echo) for(let i=dl.length-1;i>last;i--) if(dl[i]>2.5e-4||dl[i]<-2.5e-4){ last=i; break; }
  const fade=Math.round(0.03*sr), m=Math.min(n,Math.max(Math.ceil(dur*sr)+128,last+1+fade));
  if(m<n&&m>=last+1+fade) for(const a of out) for(let i=0;i<fade;i++) a[m-1-i]*=i/fade;
  // two channels, or three when the song uses the echo: its send stays a channel of its own and feeds the live echo
  const res=new AudioBuffer({length:m,numberOfChannels:echo?3:2,sampleRate:sr});
  for(let c=0;c<2;c++) res.copyToChannel(out[c].subarray(0,m),c);
  if(echo) res.copyToChannel(dl.subarray(0,Math.min(m,dl.length)),2);
  return {buf:res,ms:w.ms};
}
async function renderChunk(sg,ch,mutedSet,upFront){
  const spb=60/sg.tempo, sr=ctx.sampleRate, evs=sg.events, dur=(ch.e-ch.s)*spb, PRE=sg.vox?VOX_PRE:0, durP=PRE+dur;
  if(PRE) for(const t of sg.tracks) if(t.vox&&!mutedSet.has(t.name)) voxTrack(t);
  let i0=0; while(i0<evs.length&&evs[i0].t<ch.s-1e-9) i0++;
  let i1=i0, tail=0.3;
  for(;i1<evs.length&&evs[i1].t<ch.e-1e-9;i1++){
    const ev=evs[i1]; if(mutedSet.has(ev.track.name)) continue;
    const end=(swingBeat(ev.t,sg.swing)-ch.s+ev.d)*spb+noteTail(ev); if(end-dur>tail) tail=end-dur;
  }
  tail=Math.min(tail,7);
  const oc=new OfflineAudioContext(4,Math.ceil((durP+tail)*sr),sr);
  // the engine's globals point at this context only while its graph is being touched
  const st={lfos:[],active:[]};
  const enter=T=>{ const sv={ctx,lfos:lfos.slice(),active,collect,T0:LFO_T0}; ctx=oc; lfos.length=0; lfos.push(...st.lfos); active=st.active; collect=null; LFO_T0=ch.s*spb-PRE+T; return sv; };
  const leave=sv=>{ st.lfos=lfos.slice(); st.active=active; ctx=sv.ctx; lfos.length=0; lfos.push(...sv.lfos); active=sv.active; collect=sv.collect; LFO_T0=sv.T0; };
  const todo=[]; for(let i=i0;i<i1;i++){ const ev=evs[i], w=PRE+Math.max(0,(swingBeat(ev.t,sg.swing)-ch.s)*spb); todo.push([w-voxPre(ev),ev,w]); }   // rounding can give -1e-13 at the chunk start
  todo.sort((a,b)=>a[0]-b[0]);
  const quantum=128/sr, WIN=Math.round(PR_WINDOW/quantum)*quantum, lazy=PR_LAZY&&!upFront&&typeof oc.suspend==='function'&&typeof oc.resume==='function';
  let cs=null, next=0;
  const addNotes=until=>{ for(;next<todo.length&&todo[next][0]<until;next++) playEvent(cs,todo[next][1],todo[next][2],todo[next][1].d*spb,mutedSet); };
  let sv=enter(0);
  try{
    initWaves();
    const mg=oc.createChannelMerger(4); mg.connect(oc.destination);
    const bus=oc.createGain(), revIn=oc.createGain(), dIn=oc.createGain(), sp=oc.createChannelSplitter(2);
    bus.connect(sp); sp.connect(mg,0,0); sp.connect(mg,1,1);
    for(const g of [revIn,dIn]){ g.channelCount=1; g.channelCountMode='explicit'; }
    revIn.connect(mg,0,2); dIn.connect(mg,0,3);
    cs={tracks:new Map(),bus,revIn,dIn};
    for(const t of sg.tracks) trackChain(cs,t,mutedSet.has(t.name));
    // heavy drive / bits: live, a new note squashes the previous note's ring-out inside the shaper. Rendered apart, both
    // would be distorted separately and add up, so the ring-out is faded the moment this track's next note starts
    const nextPos=ch.e>=sg.length-1e-9?(sg.intro||0):ch.e;
    for(const t of sg.tracks){
      if(!((t.drive||0)>=0.5||t.bits||gAmp(t)>0)||mutedSet.has(t.name)) continue;
      let nx=null; for(const ev of evs){ if(ev.t<nextPos-1e-9) continue; if(ev.t>nextPos+4*sg.meter) break; if(ev.track===t){ nx=ev; break; } }
      if(!nx) continue;
      const at=durP+(swingBeat(nx.t,sg.swing)-nextPos)*spb; if(at>durP+tail) continue;
      const n=cs.tracks.get(t.idx), gate=oc.createGain(); n.gain.disconnect(n.pan); n.gain.connect(gate); gate.connect(n.pan);
      gate.gain.setValueAtTime(1,at); gate.gain.linearRampToValueAtTime(0,at+0.03);
    }
    addNotes(lazy?WIN:Infinity);
  } finally { leave(sv); }
  if(lazy) for(let T=WIN;next<todo.length&&T<durP;T+=WIN){
    if(!todo.some((x,i)=>i>=next&&x[0]>=T&&x[0]<T+WIN)&&T+WIN<durP) continue;      // nothing starts in this window
    const at=T;
    oc.suspend(at).then(()=>{ const v=enter(at); try{ addNotes(at+WIN>=durP?Infinity:at+WIN); }catch(e){ console.error(e); } finally { leave(v); } oc.resume(); },()=>{});
  }
  const t0=performance.now(), buf=await oc.startRendering(), ms=performance.now()-t0;
  if(next<todo.length&&!upFront) return renderChunk(sg,ch,mutedSet,true);   // a suspension was refused, so notes are missing: once more, everything built up front
  if(BAKE){ const t1=performance.now(), w=await bakeWet(sg,buf,durP); w.buf._pre=PRE; return {buf:w.buf,ms:ms+w.ms,wet:w.ms,wall:performance.now()-t1,sec:dur+tail}; }
  // drop the silent end so a chunk keeps only what it needs
  let last=0; for(let c=0;c<4;c++){ const d=buf.getChannelData(c); for(let i=d.length-1;i>last;i--) if(Math.abs(d[i])>1e-4){ last=i; break; } }
  const n=Math.min(buf.length,Math.max(Math.ceil(durP*sr),last+1)+128);
  let out=buf;
  if(n<buf.length){ out=new AudioBuffer({length:n,numberOfChannels:4,sampleRate:sr}); for(let c=0;c<4;c++) out.copyToChannel(buf.getChannelData(c).subarray(0,n),c); }
  out._pre=PRE;
  return {buf:out,ms,sec:dur+tail};
}
// where a chunk with send channels goes: 3 channels = L, R, echo send; 4 = L, R, reverb send, echo send (BAKE off)
function chunkInput(s,nc){
  const key='chunkIn'+nc; if(s[key]) return s[key];
  const g=s[key]=ctx.createGain(); g.channelCount=nc; g.channelCountMode='explicit'; g.channelInterpretation='discrete';
  const sp=ctx.createChannelSplitter(nc), mg=ctx.createChannelMerger(2);
  g.connect(sp); sp.connect(mg,0,0); sp.connect(mg,1,1); mg.connect(s.bus); sp.connect(s.dIn,nc-1); echoTouch(s);
  if(nc===4){ sp.connect(s.revIn,2); liveTouch(s,Infinity); }      // the live reverb is needed throughout
  return g;
}
function playChunk(s,buf,when,rec){
  const src=ctx.createBufferSource(), g=ctx.createGain(), nc=buf.numberOfChannels; src.buffer=buf; src.connect(g); g.connect(nc===2?s.bus:chunkInput(s,nc));   // two channels: the reverb is already in it and nothing else is needed
  const pre=buf._pre||0; if(pre&&when-pre>=ctx.currentTime) src.start(when-pre); else src.start(when,pre);   // 歌声のある曲のチャンクは、VOX_PRE 秒だけ手前から始まる
  rec.src=src; rec.g=g; rec.end=when+buf.duration; s.chunkSrcs.push(rec);
  src.onended=()=>{ const k=s.chunkSrcs.indexOf(rec); if(k>=0) s.chunkSrcs.splice(k,1); try{ g.disconnect(); }catch(e){} };
}
/* The live half of a session (track chains, reverb, echo) is only needed while notes scheduled live are sounding. The
   rest of the time it is unplugged from the output: the browser does not run nodes that lead nowhere, and otherwise an
   idle reverb and a few dozen idle nodes cost more than playing the rendered chunks does. Anything that plays into a
   session's tracks calls liveTouch with the time its sound (and its reverb and echo) will be over. */
const LIVE_TAIL=13;
function liveTouch(s,until){
  if(!s||!s.live) return;
  if(until>s.liveUntil) s.liveUntil=until;
  if(!s.liveOn){ s.live.connect(s.bus); s.dLive.connect(s.dIn); s.liveOn=true; }
  if(s.liveTimer||s.offline||s.liveUntil===Infinity) return;      // offline contexts and sessions that need it throughout: stays plugged in
  let polls=0;
  s.liveTimer=setInterval(()=>{
    const c=s.ctx, t=c.currentTime, done=t>s.liveUntil;
    if(c.state==='closed'||done||s.liveUntil===Infinity||++polls>3600){ clearInterval(s.liveTimer); s.liveTimer=null; if(done&&c.state!=='closed'){ try{ s.live.disconnect(); s.dLive.disconnect(); }catch(e){} s.liveOn=false; } }
  },1000);
}
function echoTouch(s){ if(s&&s.dOut&&!s.echoOn){ s.dOut.connect(s.bus); s.echoOn=true; } }
function makeSession(song){
  const s={tracks:new Map()};
  s.bus=ctx.createGain(); s.bus.gain.value=0.8; s.bus.connect(outIn);
  s.ctx=ctx; s.live=ctx.createGain(); s.liveOn=false; s.liveUntil=-1; s.offline=typeof OfflineAudioContext!=='undefined'&&ctx instanceof OfflineAudioContext;
  s.revIn=ctx.createGain();
  if(LITE){ s.revIn.channelCount=1; s.revIn.channelCountMode='explicit'; } // mono reverb: one convolution instead of two
  buildReverb(s,song);
  s.dIn=ctx.createGain(); s.dLive=ctx.createGain(); s.dL=ctx.createDelay(4); s.dR=ctx.createDelay(4);
  const fb=ctx.createGain(); fb.gain.value=0.38;
  const dlp=ctx.createBiquadFilter(); dlp.type='lowpass'; dlp.frequency.value=3200;
  const pl=ctx.createStereoPanner(); pl.pan.value=-0.7; const pr=ctx.createStereoPanner(); pr.pan.value=0.7;
  const dg=ctx.createGain(); dg.gain.value=0.7;
  s.dIn.connect(s.dL); s.dL.connect(pl); s.dL.connect(s.dR); s.dR.connect(pr); s.dR.connect(dlp); dlp.connect(fb); fb.connect(s.dL);
  pl.connect(dg); pr.connect(dg); s.dOut=dg; s.echoOn=false;   // plugged in by echoTouch the first time something sends to it
  setDelayTime(s,song);
  s.chunkSrcs=[];
  return s;
}
function setDelayTime(s,song){
  const t=Math.min(3.9,song.delay*60/song.tempo);
  s.dL.delayTime.value=t; s.dR.delayTime.value=t;      // a plain value: a scheduled one would make the delay lines read their time sample by sample from then on
}
/* ---------- track effects ----------
   Effects sit once per track (not per note), so their cost does not grow with the number of notes.
   Nothing is inserted unless the track asks for it. */
const fxSig=t=>[gAmp(t),gAmp(t)>0?gSteps(t):'',t.hp||0,t.drive||0,t.bits||0,t.q??'',t.wah||0,t.phaser||0,t.chorus||0,t.trem||0,t.cut?1:0].join(',');
const cutFreq=t=>Math.min(t.cut||(t.wah?1500:t.drive?6500:20000),ctx.sampleRate*0.45);
function stopLfos(n){ if(n&&n.lfos) for(const o of n.lfos){ try{ o.stop(); }catch(e){} } }
let LFO_T0=null;   // song time (s) at the start of the chunk being pre-rendered; null during live playback
function lfoOsc(rate,type){
  const o=ctx.createOscillator(); o.frequency.value=rate; type=type||'sine';
  if(LFO_T0==null){ o.type=type; return o; }
  // same waveform with its phase moved to where a free-running LFO would be at this point of the song
  const ph=2*Math.PI*((rate*LFO_T0)%1), K=type==='triangle'?15:1, re=new Float32Array(K+1), im=new Float32Array(K+1);
  for(let k=1;k<=K;k++){
    if(type==='triangle'&&k%2===0) continue;
    const c=type==='triangle'?8/(Math.PI*Math.PI*k*k)*(((k-1)/2)%2?-1:1):1;
    re[k]=c*Math.sin(k*ph); im[k]=c*Math.cos(k*ph);
  }
  o.setPeriodicWave(ctx.createPeriodicWave(re,im,{disableNormalization:true})); return o;
}
function LFO(n,rate,amt,param,type){
  const o=lfoOsc(rate,type);
  const g=ctx.createGain(); g.gain.value=amt; o.connect(g); g.connect(param); o.start(); n.lfos.push(o); return o;
}
const curveCache=new Map();
function driveCurve(d){
  const n=LITE?1024:2048, key='d'+n+'_'+d; if(curveCache.has(key)) return curveCache.get(key);
  const K=1+d*24, c=new Float32Array(n), th=Math.tanh(K);
  for(let i=0;i<n;i++){ const x=i*2/(n-1)-1; c[i]=Math.tanh(K*x)/th; }
  // loudness compensation measured on a typical voice level, so turning drive up mostly changes the tone
  let ei=0, eo=0; for(let i=0;i<256;i++){ const x=0.15*Math.sin(i/256*2*Math.PI), y=Math.tanh(K*2*x)/th; ei+=x*x; eo+=y*y; }
  const r={c,makeup:Math.sqrt(ei/eo)}; curveCache.set(key,r); return r;
}
function bitsCurve(b){
  const key='b'+b; if(curveCache.has(key)) return curveCache.get(key);
  const n=4096, c=new Float32Array(n), L=Math.pow(2,b)/2;
  for(let i=0;i<n;i++){ const x=i*2/(n-1)-1; c[i]=Math.round(x*L)/L; }
  curveCache.set(key,c); return c;
}
// a slow LFO only needs the filter recomputed once per 128-sample block, not every sample
function kRate(f){ for(const k of ['frequency','detune','Q']){ try{ f[k].automationRate='k-rate'; }catch(e){} } }
let DRIVE_OS='2x';
function buildFx(n,t){
  let last=n.input; const link=node=>{ last.connect(node); last=node; return node; };
  if(t.hp){ const h=ctx.createBiquadFilter(); h.type='highpass'; h.frequency.value=Math.min(t.hp,ctx.sampleRate*0.45); link(h); }
  if(gAmp(t)>0) ampFx(t,link);
  if(t.drive){
    const dc=driveCurve(t.drive), pre=ctx.createGain(), ws=ctx.createWaveShaper(), post=ctx.createGain();
    pre.gain.value=2; ws.curve=dc.c; ws.oversample=LITE?'none':DRIVE_OS; post.gain.value=dc.makeup;
    link(pre); link(ws); link(post);
  }
  if(t.bits){
    const pre=ctx.createGain(), ws=ctx.createWaveShaper(), post=ctx.createGain();
    pre.gain.value=2.5; ws.curve=bitsCurve(t.bits); post.gain.value=0.4;
    link(pre); link(ws); link(post);
  }
  if(t.q!=null) n.filter.Q.value=t.q; else if(t.wah) n.filter.Q.value=10;
  if(t.cut||t.wah||t.drive||t.q!=null) link(n.filter);
  if(t.wah){ kRate(n.filter); LFO(n,t.wah,2400,n.filter.detune,'triangle'); }   // sweeps the low-pass ±2 octaves around cut
  if(t.phaser){
    const N=LITE?2:4, fr=LITE?[500,1500]:[350,700,1400,2800], mix=ctx.createGain(), dry=ctx.createGain(), wet=ctx.createGain();
    dry.gain.value=0.6; wet.gain.value=0.6; last.connect(dry); dry.connect(mix);
    const lg=ctx.createGain(); lg.gain.value=1800; const o=lfoOsc(t.phaser); o.connect(lg); o.start(); n.lfos.push(o);
    let a=last;
    for(let i=0;i<N;i++){ const ap=ctx.createBiquadFilter(); ap.type='allpass'; ap.frequency.value=fr[i]; ap.Q.value=0.7; kRate(ap); lg.connect(ap.detune); a.connect(ap); a=ap; }
    a.connect(wet); wet.connect(mix); last=mix;
  }
  if(t.chorus){
    const mix=ctx.createGain(), dry=ctx.createGain(); dry.gain.value=0.75; last.connect(dry); dry.connect(mix);
    const depth=0.0008+0.004*t.chorus;
    const mk=(base,rate)=>{ const d=ctx.createDelay(0.06); d.delayTime.value=base; LFO(n,rate,depth,d.delayTime); last.connect(d); return d; };
    if(LITE){ const d=mk(0.018,0.8), w=ctx.createGain(); w.gain.value=0.6; d.connect(w); w.connect(mix); }
    else { const m=ctx.createChannelMerger(2), w=ctx.createGain(); w.gain.value=0.6; mk(0.017,0.83).connect(m,0,0); mk(0.023,0.61).connect(m,0,1); m.connect(w); w.connect(mix); }
    last=mix;
  }
  if(t.trem){ const g=ctx.createGain(); g.gain.value=0.7; LFO(n,t.trem,0.3,g.gain); link(g); }
  last.connect(n.gain);
}
function trackChain(s,t,isMuted){
  let n=s.tracks.get(t.idx);
  const sig=fxSig(t);
  if(n&&n.sig!==sig){
    // effects changed while editing: build a new chain and let the old one ring out
    const old=n; s.tracks.delete(t.idx); n=null;
    setTimeout(()=>{ stopLfos(old); try{ old.pan.disconnect(); }catch(e){} },3000);
  }
  if(!n){
    n={input:ctx.createGain(),filter:ctx.createBiquadFilter(),gain:ctx.createGain(),pan:ctx.createStereoPanner(),rev:ctx.createGain(),dly:ctx.createGain(),lfos:[],sig};
    n.filter.type='lowpass';
    if(sig==='0,0,0,,0,0,0,0,0') n.input.connect(n.gain); else if(sig==='0,0,0,,0,0,0,0,1') n.input.connect(n.filter), n.filter.connect(n.gain); else buildFx(n,t);
    n.gain.connect(n.pan); n.pan.connect(s.live||s.bus);
    n.pan.connect(n.rev); n.rev.connect(s.revIn); n.pan.connect(n.dly); n.dly.connect(s.dLive||s.dIn);
    if(t.dly>0) echoTouch(s);
    n.filter.frequency.value=cutFreq(t); n.gain.gain.value=isMuted?0:t.vol; n.pan.pan.value=t.pan; n.rev.gain.value=t.rev; n.dly.gain.value=t.dly;
    s.tracks.set(t.idx,n); return n;
  }
  const now=ctx.currentTime;
  n.filter.frequency.setTargetAtTime(cutFreq(t),now,0.02);
  n.gain.gain.setTargetAtTime(isMuted?0:t.vol,now,0.02);
  n.pan.pan.setTargetAtTime(t.pan,now,0.02);
  n.rev.gain.setTargetAtTime(t.rev,now,0.02);
  n.dly.gain.setTargetAtTime(t.dly,now,0.02); if(t.dly>0) echoTouch(s);
  return n;
}
// stop voices so they free CPU; t defaults to now
function killVoice(x,t){
  try{ x.g.gain.cancelScheduledValues(t); x.g.gain.setTargetAtTime(0,t,0.012); }catch(e){}
  for(const s of x.srcs){ try{ s.stop(t+0.06); }catch(e){} }
}
function killAll(){ if(!ctx) return; const t=ctx.currentTime; for(const x of active) killVoice(x,t); active=[]; }
function reserve(when){
  const now=ctx.currentTime;
  if(active.length>=16) active=active.filter(x=>x.stop>when); // voices that end before this note starts don't count
  const cap=voiceCap();
  while(active.length>=cap){
    let k=0; for(let i=1;i<active.length;i++) if(active[i].end<active[k].end) k=i;
    killVoice(active.splice(k,1)[0],Math.max(when,now));
  }
}

/* ---------- voices ---------- */
const mtof=m=>440*Math.pow(2,(m-69)/12);
function O(type,f,when,stop,dest,det){
  const o=ctx.createOscillator();
  if(typeof type==='string') o.type=type; else o.setPeriodicWave(type);
  o.frequency.value=f; if(det) o.detune.value=det;
  o.connect(dest); o.start(when); o.stop(stop); if(collect) collect.push(o); return o;
}
function ENV(dest,when,dur,A,D,S,R,peak){
  const g=ctx.createGain(); g.gain.value=0; g.connect(dest);
  g.gain.setValueAtTime(0,when);
  g.gain.linearRampToValueAtTime(peak,when+A);
  const tau=Math.max(D,0.002)/3;
  g.gain.setTargetAtTime(peak*S,when+A,tau);
  const end=when+Math.max(dur,A+0.002);
  // value the decay curve has reached at note-off; anchoring it avoids chaining two setTargetAtTime calls
  g.gain.setValueAtTime(peak*S+(peak-peak*S)*Math.exp(-(end-when-A)/tau),end);
  g.gain.setTargetAtTime(0,end,Math.max(R,0.004)/3);
  // stop sources once the sound is ~60dB down: after the release, or after the decay for percussive voices
  let stop=end+R*2.4+0.02;
  if(S===0) stop=Math.min(stop,when+A+D*2.4+0.02);
  return {g,stop};
}
function F(dest,type,freq,Q){ const f=ctx.createBiquadFilter(); f.type=type; f.frequency.value=Math.min(freq,ctx.sampleRate*0.45); if(Q!=null) f.Q.value=Q; f.connect(dest); return f; }
function G(dest,v){ const g=ctx.createGain(); g.gain.value=v; g.connect(dest); return g; }
let VIBK=1;   // vib= of the track whose voice is being built
function VIB(oscs,when,stop,rate,cents,delay){
  if(LITE||!lfos.length||VIBK<=0) return; cents*=VIBK;  // vibrato modulates pitch every sample, so the light mode skips it
  let l=lfos[0]; for(const x of lfos) if(Math.abs(x.rate-rate)<Math.abs(l.rate-rate)) l=x;
  const hz=oscs[0].frequency.value*(Math.pow(2,cents/1200)-1);
  const g=ctx.createGain(); g.gain.value=0;
  g.gain.setValueAtTime(0,when+delay); g.gain.linearRampToValueAtTime(hz,when+delay+0.3);
  l.o.connect(g); for(const o of oscs) g.connect(o.frequency);
  // detach from the shared LFO once the note ends so the note's nodes can be freed
  oscs[0].addEventListener('ended',()=>{ try{ l.o.disconnect(g); }catch(e){} },{once:true});
}
function FM(f,ratio,i0,i1,decay,when,stop,dest){
  const c=ctx.createOscillator(); c.frequency.value=f;
  const m=ctx.createOscillator(); m.frequency.value=f*ratio;
  const mg=ctx.createGain(); const dev=f*ratio;
  mg.gain.setValueAtTime(dev*i0,when); mg.gain.setTargetAtTime(dev*i1,when,decay/3);
  m.connect(mg); mg.connect(c.frequency); c.connect(dest);
  c.start(when); m.start(when); c.stop(stop); m.stop(stop);
  if(collect) collect.push(c,m); return c;
}
function voice(inst,m,when,dur,v,dest,pb,t,vel){
  reserve(when);
  collect=[];
  let e;
  try{ e=buildVoice(inst,m,when,dur,v,dest,pb,t,vel); } finally { var srcs=collect; collect=null; }
  if(e&&srcs.length){ if(pb) bendSources(srcs,when,pb); active.push({end:when+dur,stop:e.stop,g:e.g,srcs,owner:OWNER}); }
}
// pitch bend / glide: automates the pitch of the sources a voice already made, so it adds no audio nodes.
// pb = {g0: semitones to start from (glide), gt: glide seconds, b: bend semitones, bAt: bend start (s), bDur: bend time (s)}
// trill: main note and the note tr semitones above, about 15 changes a second, starting and ending on the main note
function trillSources(srcs,when,pb){
  let k=Math.max(3,Math.round(pb.trDur/0.065)); if(k%2===0) k++;
  const step=pb.trDur/k;
  for(const s of srcs){
    try{
      const p=s instanceof OscillatorNode?s.detune:s.playbackRate; if(!p) continue;
      if(s instanceof OscillatorNode) p.automationRate='k-rate';
      const b=p.value, up=s instanceof OscillatorNode?b+pb.tr*100:b*Math.pow(2,pb.tr/12);
      for(let i=0;i<k;i++) p.setValueAtTime(i%2?up:b,when+i*step);
    }catch(e){}
  }
}
function bendSources(srcs,when,pb){
  if(pb.tr&&!pb.g0&&!pb.b){ trillSources(srcs,when,pb); return; }
  // a trill on a note reached by glide: slide in first, then trill for the rest of the note (a short note keeps only the slide)
  if(pb.tr&&pb.g0&&!pb.b){ const gt=Math.max(0.004,pb.gt);
    if(pb.trDur-gt>0.13){
      for(const s of srcs){ try{
        if(s instanceof OscillatorNode){ const p=s.detune, b=p.value; p.automationRate='k-rate'; p.setValueAtTime(b+pb.g0*100,when); p.linearRampToValueAtTime(b,when+gt); }
        else if(s.playbackRate){ const p=s.playbackRate, b=p.value; p.setValueAtTime(b*Math.pow(2,pb.g0/12),when); p.exponentialRampToValueAtTime(b,when+gt); }
      }catch(e){} }
      trillSources(srcs,when+gt,Object.assign({},pb,{trDur:pb.trDur-gt})); return; } }
  const pts=[[when,pb.g0*100]]; let t=when;
  if(pb.g0){ t=when+Math.max(0.004,pb.gt); pts.push([t,0]); }
  if(pb.b){ const a=Math.max(t,when+pb.bAt); if(a>t+1e-4) pts.push([a,pts[pts.length-1][1]]); pts.push([a+Math.max(0.004,pb.bDur),pb.b*100]); }
  if(pts.length<2) return;
  for(const s of srcs){
    try{
      if(s instanceof OscillatorNode){
        const p=s.detune, b=p.value; p.automationRate='k-rate';
        p.setValueAtTime(b+pts[0][1],pts[0][0]);
        for(let i=1;i<pts.length;i++) p.linearRampToValueAtTime(b+pts[i][1],pts[i][0]);
      } else if(s.playbackRate){
        const p=s.playbackRate, b=p.value, r=c=>b*Math.pow(2,c/1200);
        p.setValueAtTime(r(pts[0][1]),pts[0][0]);
        for(let i=1;i<pts.length;i++) p.exponentialRampToValueAtTime(r(pts[i][1]),pts[i][0]);
      }
    }catch(e){}
  }
}
/* ---------- violin ----------
   A bowed string built from the parts that make a violin recognisable, not from a sample:
   - source: one band-limited sawtooth (the Helmholtz motion of a bowed string), with soft dips near every 9th harmonic
     (bow about 1/9 of the string from the bridge)
   - bow: a brightness filter that follows bow pressure (louder = brighter), and rosin noise that is strongest while the
     string is being caught at the start of a stroke
   - left hand: vibrato that starts late and widens on long notes, from a shared LFO whose rate wanders a little;
     a tiny pitch scoop into long notes
   - body: a fixed response made of ~50 decaying modes (air A0 near 275 Hz, main wood modes near 470/550 Hz, a dip
     around 1-1.5 kHz, the bridge hill near 2.7 kHz). It is linear and the same for every note, so it sits once per
     destination (track) instead of once per note. Vibrato sweeps the harmonics across its peaks, which is what makes
     the tone shimmer. A track whose lowest note lies below the violin's G string gets a larger body: a viola's below G3,
     a cello's below C3 (the same modes moved down, so the low notes keep their fundamental).
   Articulation comes from the note itself: short notes bounce off the string, middle notes are separate bows, long
   notes swell and sing; ! accents (fast bite, overshoot, more rosin), ? plays softer and darker, glide slurs. */
const VN={level:0.23, secLevel:1.2, vib:24, vibRate:5.8, attack:1, noise:1, bright:1, ring:1, scoop:1, swell:1, body:1};
const vnCache=new WeakMap();            // per audio context: waveform, vibrato LFO, body per destination
function vnCtx(){
  let c=vnCache.get(ctx); if(c) return c;
  const N=64, re=new Float32Array(N), im=new Float32Array(N);
  for(let n=1;n<N;n++) im[n]=(0.62+0.38*Math.abs(Math.sin(Math.PI*n/9.3)))/n;
  const wave=ctx.createPeriodicWave(re,im);
  // one vibrato LFO for every violin note in this context; its rate drifts ±0.35 Hz so the vibrato never sounds machine-made.
  // When pre-rendering, both start where they would be at this point of the song (the drift's effect on the phase included)
  const T=LFO_T0||0, fr=VN.vibRate, fw=0.29, dw=0.35;
  const sine=(f,ph)=>{ const x=ctx.createOscillator(); x.frequency.value=f; x.setPeriodicWave(ctx.createPeriodicWave(new Float32Array([0,Math.sin(ph)]),new Float32Array([0,Math.cos(ph)]),{disableNormalization:true})); return x; };
  const o=sine(fr,2*Math.PI*fr*T+(dw/fw)*(1-Math.cos(2*Math.PI*fw*T))), w=sine(fw,2*Math.PI*((fw*T)%1));
  const wg=ctx.createGain(); wg.gain.value=dw; w.connect(wg); wg.connect(o.frequency);
  o.start(); w.start();
  c={wave,lfo:o,bodies:new WeakMap(),sections:new WeakMap(),vs:{}}; vnCache.set(ctx,c); return c;
}
const vnIRs=new Map();
const VN_BODY=[1,0.85,0.42];             // violin, viola, cello: how far the body modes move down
function vnIR(sr,k=0){
  const key=sr+':'+k; if(vnIRs.has(key)) return vnIRs.get(key);
  const s0=VN_BODY[k], sh=Math.pow(s0,0.6);   // the low modes scale with the size; the bridge hill and the roll-off move less
  let s=0x2545F491;                      // fixed seed: every render gets the same instrument
  const rnd=()=>{ s=(s+0x6D2B79F5)|0; let t=Math.imul(s^(s>>>15),1|s); t=(t+Math.imul(t^(t>>>7),61|t))^t; return ((t^(t>>>14))>>>0)/4294967296; };
  // [Hz, Q, dB, sign]: A0 air, CBR, B1- wood, A1 air, B1+ wood. Same sign keeps the 300-370 Hz dip shallow, so E4-F#4 keep their fundamental
  const modes=[[275,16,0,1],[405,24,-5,1],[466,32,0,1],[520,26,-5,1],[552,30,-1,1]].map(([f,...r])=>[f*s0,...r]);
  // level of the denser modes above 600 Hz: nasal dip near 1-1.5 kHz, bridge hill 2-3.2 kHz, then falling off
  const shape=[[600,-3],[850,-4],[1100,-8],[1500,-8],[1900,-4],[2300,0],[2800,1],[3300,-1],[4200,-7],[5500,-13],[8000,-24],[11000,-34]];
  const lvl=f0=>{ const f=f0/sh; for(let i=1;i<shape.length;i++){ const [f1,d1]=shape[i]; if(f<=f1){ const [f0,d0]=shape[i-1], x=Math.log(f/f0)/Math.log(f1/f0); return d0+(d1-d0)*x; } } return shape[shape.length-1][1]; };
  for(let f=600*s0;;){ f*=1.035+0.03*rnd(); if(f>10000) break; const Q=(f<1200?26:f<3000?20:16)*(0.75+0.5*rnd()); modes.push([f,Q,lvl(f)+rnd()*6-3,rnd()<0.5?-1:1]); }
  const len=Math.round(sr*0.18), d=new Float32Array(len);
  for(const [f,Q,db,sign] of modes){
    if(f>=sr*0.45) continue;
    const a=Math.PI*f/Q, A=sign*Math.pow(10,db/20)*a, w=2*Math.PI*f/sr, k=Math.exp(-a/sr);
    let env=A; for(let i=0;i<len;i++){ d[i]+=env*Math.sin(w*i); env*=k; }
  }
  { // below the air mode a violin hardly radiates: the fundamental of the open G stays weak
    const w=2*Math.PI*230*s0/sr, al=Math.sin(w)/(2*0.707), c=Math.cos(w), a0=1+al;
    const b0=(1+c)/2/a0, b1=-(1+c)/a0, a1=-2*c/a0, a2=(1-al)/a0;
    let x1=0,x2=0,y1=0,y2=0; for(let i=0;i<len;i++){ const x=d[i], y=b0*x+b1*x1+b0*x2-a1*y1-a2*y2; x2=x1; x1=x; y2=y1; y1=y; d[i]=y; }
  }
  const fade=Math.round(sr*0.03); for(let i=0;i<fade;i++) d[len-1-i]*=i/fade;
  // scale so a sawtooth keeps about the same loudness through the body (power gain 1 between 250 Hz and 5 kHz)
  let p=0, n=0;
  for(let f=250*s0;f<Math.min(5000,sr*0.45);f*=1.03){ const w=2*Math.PI*f/sr; let r=0,q=0; for(let i=0;i<len;i++){ r+=d[i]*Math.cos(w*i); q+=d[i]*Math.sin(w*i); } p+=r*r+q*q; n++; }
  const g=1/Math.sqrt(p/n); for(let i=0;i<len;i++) d[i]*=g;
  const buf=new AudioBuffer({length:len,numberOfChannels:1,sampleRate:sr}); buf.copyToChannel(d,0);
  vnIRs.set(key,buf); return buf;
}
function vnBody(dest,k=0){
  const c=vnCtx(); let bs=c.bodies.get(dest); if(!bs){ bs=[]; c.bodies.set(dest,bs); }
  let b=bs[k];
  if(!b){
    b=ctx.createConvolver(); b.normalize=false; b.buffer=vnIR(ctx.sampleRate,k);
    const mono=ctx.createGain(); mono.channelCount=1; mono.channelCountMode='explicit';   // keep the track mono, like every other voice
    b.connect(mono); mono.connect(dest); bs[k]=b;
  }
  return b;
}
// which body a track gets, from its lowest note (set by parse); a single note without a track is a violin
const vnBodyOf=t=>!t||t.lo==null||t.lo>=55?0:t.lo>=48?1:2;
/* ---------- violins: a section from one voice ----------
   Not N separate violins. Each note is played once; then, once per destination (track), the sound is copied into a few
   delay lines whose delay time wanders. A wandering delay bends pitch, so every copy gets a vibrato of its own
   (5.3-6.4 Hz, about ±22 cents), a slow intonation drift (±5 cents), its own small lateness (3.5-12.5 ms) and its own place
   in the stereo field. The cost is fixed per track, not per note, so a section costs about
   as much as a solo line. The per-note vibrato is turned down for sections, so the players' vibratos do not move together.
   The LFOs are shared by every section in a context; each track takes them in a different order and sign. */
// [lateness s, drift Hz, vibrato as a harmonic of the drift (5.3-6.4 Hz), pan]
// lateness is kept just above the largest delay swing (2.7 ms drift + 0.3 ms vibrato), so attacks stay tight
const VS_LINES=[[0.0035,0.17,31,-0.75],[0.0065,0.23,26,0.3],[0.0095,0.19,32,-0.3],[0.0125,0.29,22,0.75]];
const VS_GAIN={lines:0.42,lite:0.6};
// one LFO per line carries both the slow drift (its fundamental) and the vibrato (harmonic n), already scaled to seconds
// of delay; when pre-rendering, it starts where it would be at this point of the song
function vsLfo(fd,n,vib,i){
  // a delay that moves by A·sin(2πft) bends pitch by ±2πf·A, so A is set from the wanted cents
  const aD=(Math.pow(2,5/1200)-1)/(2*Math.PI*fd), aV=(Math.pow(2,22*vib/1200)-1)/(2*Math.PI*fd*n);
  const ph=LFO_T0==null?0:2*Math.PI*((fd*LFO_T0)%1), p1=i*2.3+0.5+ph, pn=i*1.7+n*ph;
  const re=new Float32Array(n+1), im=new Float32Array(n+1);
  re[1]=aD*Math.sin(p1); im[1]=aD*Math.cos(p1); re[n]+=aV*Math.sin(pn); im[n]+=aV*Math.cos(pn);
  const o=ctx.createOscillator(); o.frequency.value=fd; o.setPeriodicWave(ctx.createPeriodicWave(re,im,{disableNormalization:true})); o.start(); return o;
}
function vsSection(dest,vib,k){
  const c=vnCtx(), key=Math.round(vib*100);
  if(!c.vs[key]) c.vs[key]={lfos:VS_LINES.map(([,fd,n],i)=>vsLfo(fd,n,vib,i))};
  let m=c.sections.get(dest); if(!m){ m=new Map(); c.sections.set(dest,m); }
  let inp=m.get(key); if(inp) return inp;
  inp=ctx.createGain(); m.set(key,inp);
  const set=c.vs[key];   // k: track number, so a track keeps the same players in every pre-rendered chunk
  for(const li of LITE?[0,3]:[0,1,2,3]){
    const [late,,,pan]=VS_LINES[li], d=ctx.createDelay(0.05); d.delayTime.value=late;
    const sg=ctx.createGain(); sg.gain.value=(k>>2)&1?-1:1; set.lfos[(li+k)%4].connect(sg); sg.connect(d.delayTime);   // other tracks take the LFOs in another order and sign
    const g=ctx.createGain(); g.gain.value=LITE?VS_GAIN.lite:VS_GAIN.lines;
    const p=ctx.createStereoPanner(); p.pan.value=pan*(LITE?0.75:1);
    inp.connect(d); d.connect(g); g.connect(p); p.connect(dest);
  }
  return inp;
}
// v: level of this note (velocity, already scaled down for chords); vel: the written ! / ? of the event, if known
function vnVoice(m,f,when,dur,v,dest,pb,t,vel,sec){
  const C=vnCtx(), sr=ctx.sampleRate, L=LITE, nyq=sr*0.45;
  const ve=vel??v, acc=ve>1.1, soft=ve<0.8, leg=!!(pb&&pb.g0);
  const short=dur<0.17, long=dur>0.7, vibAmt=t&&t.vib!=null?t.vib:1;
  // bow stroke: attack time from note length and dynamics
  let ta=leg?0.03:short?0.012+0.018*dur/0.17:long?0.11:0.035+0.075*(dur-0.17)/0.53;
  if(acc) ta*=sec&&short?0.3:0.45; else if(soft) ta*=1.35;
  if(sec&&!short&&!acc) ta*=1.2;                 // a section never bites quite as sharply as one player, unless told to (!)
  ta=Math.max(0.006,Math.min(ta*VN.attack,dur*0.6));
  const P=VN.level*clamp(v,0.2,1.7)*Math.pow(2,(m-69)/80)*(short?1.2:1)*(sec?VN.secLevel:1);   // a little stronger up on the E string; bounced notes start higher, since they fade within the note
  // amplitude breakpoints [time, level relative to P]
  const end=when+dur, pts=[[when+ta,1]];
  // a section playing ! on quick notes digs in together: a spike at the start, then the bounce
  if(acc&&short&&sec){ pts[0][1]=1.35; const t2=Math.min(when+ta+0.025,end); if(t2>when+ta+0.005) pts.push([t2,0.85]); }
  else if(acc&&!short){ pts[0][1]=1.3; const t2=Math.min(when+ta+0.13,end); if(t2>when+ta+0.01) pts.push([t2,0.82]); if(long) pts.push([end,0.92]); }
  else if(long){ const sw=0.2*VN.swell; pts[0][1]=1-sw; pts.push([when+dur*0.55,1],[end,1-sw*0.5]); }
  // short notes: the bow bounces off, so the note dies away inside its own length; separate bows ease off a little
  if(pts[pts.length-1][0]<end-1e-4) pts.push([end,pts[pts.length-1][1]*(short?0.4:long||leg?1:0.85)]);
  const Le=pts[pts.length-1][1];
  const eg=ctx.createGain(); eg.gain.value=0; eg.gain.setValueAtTime(0,when);
  for(const [tt,l] of pts) eg.gain.linearRampToValueAtTime(l*P,tt);
  // bow leaves the string: quick drop, then the string rings out
  const t1=0.06, r1=Le*P*(0.27+0.73*Math.exp(-t1/0.02)), tr=(short?0.06:long?0.14:0.1)*VN.ring;
  eg.gain.setTargetAtTime(Le*P*0.27,end,0.02); eg.gain.setValueAtTime(r1,end+t1); eg.gain.setTargetAtTime(0,end+t1,tr);
  const stop=end+t1+tr*6;
  // brightness follows bow pressure
  const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=0.5; kRate(lp);
  const bf=(acc?1.35:soft?0.62:1)*VN.bright, fcP=Math.min(nyq,Math.max(f*3.5,1100+3000*Math.pow(bf,1.6))), fc=l=>Math.min(nyq,fcP*(0.42+0.58*Math.min(1.3,l)));
  lp.frequency.setValueAtTime(fc(0),when); for(const [tt,l] of pts) lp.frequency.exponentialRampToValueAtTime(fc(l),tt);
  lp.frequency.setTargetAtTime(fcP*0.35,end,0.06);
  lp.connect(eg);
  const o=ctx.createOscillator(); o.setPeriodicWave(C.wave); o.frequency.automationRate='k-rate'; o.frequency.value=f; o.detune.value=(Math.random()*2-1)*1.5;
  if(!leg&&!short&&!sec&&VN.scoop){ const c=(long?9:4)*VN.scoop; o.frequency.setValueAtTime(f*Math.pow(2,-c/1200),when); o.frequency.setTargetAtTime(f,when,acc?0.012:0.028); }
  o.connect(lp); o.start(when); o.stop(stop); collect.push(o);
  // vibrato: none on quick notes, late and narrow on middle ones, later and wider (and still widening) on long ones
  const depth=VN.vib*vibAmt*(soft?0.8:acc?1.1:1)*(sec?0.35:1);   // in a section most of the vibrato comes from the players' own lines
  if(dur>=0.25&&depth>0){
    const mid=dur<0.4, d0=leg?0.06:mid?0.07:0.18+Math.random()*0.1, ramp=mid?0.12:0.35;
    const hz=f*(Math.pow(2,depth*(mid?0.6:1)/1200)-1), vg=ctx.createGain();
    vg.gain.value=0; vg.gain.setValueAtTime(0,when+d0); vg.gain.linearRampToValueAtTime(hz,when+d0+ramp);
    if(long&&dur>d0+ramp+0.05) vg.gain.linearRampToValueAtTime(hz*1.25,end);
    C.lfo.connect(vg); vg.connect(o.frequency);
    o.addEventListener('ended',()=>{ try{ C.lfo.disconnect(vg); }catch(e){} },{once:true});
  }
  // rosin noise: a scratch while the string is caught, then a faint hiss under the tone
  if(!L&&VN.noise>0){
    const ns=ctx.createBufferSource(); ns.buffer=noiseBuf; ns.loop=true;
    const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=Math.min(nyq,2600+f*1.5); bp.Q.value=0.7;
    const nz=VN.noise*(sec?(acc?0.8:0.45):1), B=(leg?0.3:short?1.6:acc?2.2:soft?0.7:1.4)*nz, S=0.055*nz, ng=ctx.createGain();
    ng.gain.setValueAtTime(B,when); ng.gain.setTargetAtTime(S,when,Math.max(0.008,ta*0.45));
    ns.connect(bp); bp.connect(ng); ng.connect(eg); ns.start(when,Math.random()*1.5); ns.stop(Math.min(stop,end+0.12)); collect.push(ns);   // the hiss is gone once the bow leaves
  }
  const out=sec?vsSection(dest,vibAmt,t&&t.idx>=0?t.idx:0):dest, bk=vnBodyOf(t);
  if(VN.body>=1) eg.connect(vnBody(out,bk));
  else { if(VN.body>0) eg.connect(G(vnBody(out,bk),VN.body)); eg.connect(G(out,1-VN.body)); }
  return {g:eg,stop};
}
/* ---------- drum kit "dnb" and the reese bass ----------
   The kit is synthesised once per hit into the drum bank (like the other kits), so it can afford many more parts per
   hit than a voice could: playing it costs one buffer source per hit, whatever went into making it.
   - two layers per drum: hard (normal and !) and soft (? and ??: darker, less crack; ghost notes sound like ghost
     notes instead of a quieter copy of a backbeat), and two slightly different takes of each, picked from the beat
     position, so 16th hats and ghost notes do not repeat the very same sample
   - kick: a short pitch drop into a low body, soft-clipped, with a beater click
   - snare: two shell modes, the stick crack, the wires, and a small room (a few early reflections)
   - hats, ride, crash: six square waves at inharmonic ratios (the metallic part) plus noise, band-limited
   Drums the kit does not define (clap, toms, shaker, ...) fall back to the standard kit.
   reese: a clean sine sub, plus two sawtooths a few cents apart (their slow beating is the moving, "phasing" sound),
   high-passed so they leave the fundamental to the sub, soft-clipped and low-passed (opens with velocity). */
const DNB={soft:0,take:0};
const dnbCurves=new Map();
function dnbCurve(k){
  let c=dnbCurves.get(k); if(c) return c;
  c=new Float32Array(1025); for(let i=0;i<1025;i++){ const x=i/512-1; c[i]=Math.tanh(k*x)/Math.tanh(k); }
  dnbCurves.set(k,c); return c;
}
const DNB_LEN={k:0.6,s:0.75,h:0.3,o:0.8,z:1.7,y:2.5,p:0.3};
const DNB_GAIN={k:1,s:0.5,h:2.2,o:1.1,z:0.7,y:0.9,p:0.7};
const DNB_METAL=[205.3,304.4,369.6,522.7,540,800];
function dnbDrum(n,when,v,dest){
  if(!DNB_LEN[n]) return false;
  const S=DNB.soft, j=DNB.take?1.013:0.992, nyq=ctx.sampleRate*0.45;
  // a decaying gain: peak after a, then down with time constant tau
  const env=(to,peak,a,tau)=>{ const g=ctx.createGain(); g.gain.value=0; g.gain.setValueAtTime(0,when); g.gain.linearRampToValueAtTime(peak*v,when+a); g.gain.setTargetAtTime(0,when+a,tau); g.connect(to); return g; };
  const osc=(type,f0,f1,t,to,len)=>{ const o=ctx.createOscillator(); o.type=type; o.frequency.setValueAtTime(Math.min(f0,nyq),when); if(f1!==f0) o.frequency.exponentialRampToValueAtTime(Math.min(f1,nyq),when+t); o.connect(to); o.start(when); o.stop(when+len); return o; };
  const noise=(to,len)=>{ const s=ctx.createBufferSource(); s.buffer=noiseBuf; s.loop=true; s.connect(to); s.start(when,(DNB.take?0.71:0.23)+(S?0.37:0)); s.stop(when+len); };
  const filt=(to,type,f,Q)=>F(to,type,Math.min(f,nyq),Q);
  const shaper=(to,k)=>{ const w=ctx.createWaveShaper(); w.curve=dnbCurve(k); w.oversample='2x'; w.connect(to); return w; };
  const metal=(to,mul,len)=>{ for(const f of DNB_METAL) osc('square',f*mul*j,f*mul*j,0,to,len); };
  const len=DNB_LEN[n];
  dest=G(dest,DNB_GAIN[n]);       // levels matched to the standard kit (A-weighted), snare and ride a little above it
  switch(n){
    case 'k': {
      const body=env(shaper(G(dest,0.55),S?1.6:2.4),1,0.001,S?0.085:0.11);
      const o=osc('sine',210*j,55*j,0.042,body,len); o.frequency.exponentialRampToValueAtTime(46*j,when+0.3);
      noise(env(filt(dest,'bandpass',4200,0.8),S?0.1:0.32,0.0005,0.004),0.04);
      osc('triangle',1500*j,520,0.008,env(dest,S?0.05:0.14,0.0005,0.006),0.04);
      break; }
    case 's': {
      // everything goes through a small room: the dry hit plus early reflections, darker than the hit
      const bus=ctx.createGain(); const sh=shaper(dest,1.4); bus.connect(sh);
      const room=filt(G(dest,1),'lowpass',5200,0.5);
      [[0.0083,0.3],[0.0131,0.24],[0.0197,0.19],[0.0289,0.14],[0.0413,0.1],[0.0571,0.07]].forEach(([d,g])=>{ const dl=ctx.createDelay(0.1); dl.delayTime.value=d; bus.connect(dl); dl.connect(G(room,g)); });
      osc('sine',196*j,178*j,0.05,env(bus,S?0.32:0.55,0.001,0.055),len);
      osc('sine',335*j,318*j,0.04,env(bus,S?0.12:0.25,0.001,0.035),len);
      noise(env(filt(bus,'highpass',1800,0.6),S?0.22:0.75,0.0005,S?0.008:0.012),0.08);
      noise(env(filt(bus,'bandpass',S?4200:5200,0.7),S?0.36:0.46,0.002,S?0.06:0.075),len);
      noise(env(filt(bus,'highpass',7200,0.7),S?0.08:0.2,0.001,0.05),len);
      break; }
    case 'h': case 'o': {
      const open=n==='o', top=S?filt(dest,'lowpass',9000,0.5):dest;
      const hp=filt(top,'highpass',7000,0.7), bp=filt(hp,'bandpass',10000,0.8);
      metal(env(bp,S?0.13:0.2,0.0005,open?0.13:0.017),1,len);
      noise(env(filt(top,'highpass',8000,0.7),S?0.05:0.09,0.0005,open?0.11:0.014),len);
      break; }
    case 'z': {
      const top=S?filt(dest,'lowpass',8000,0.5):dest;
      metal(env(filt(filt(top,'highpass',5000,0.7),'bandpass',8200,0.9),S?0.07:0.1,0.0008,0.38),1.62,len);
      osc('sine',3170*j,3170*j,0,env(top,S?0.02:0.035,0.001,0.45),len); osc('sine',4730*j,4730*j,0,env(top,S?0.012:0.02,0.001,0.3),len);
      noise(env(filt(top,'bandpass',9000,1.2),S?0.02:0.04,0.0008,0.2),len);
      break; }
    case 'y': {
      const top=S?filt(dest,'lowpass',8000,0.5):dest;
      metal(env(filt(top,'highpass',4000,0.7),S?0.06:0.09,0.002,0.65),1.31,len);
      noise(env(filt(top,'highpass',5200,0.6),S?0.12:0.2,0.002,0.7),len);
      noise(env(filt(top,'bandpass',3200,1),S?0.03:0.05,0.002,0.25),len);
      break; }
    case 'p': {
      osc('triangle',1720*j,1640*j,0.02,env(dest,S?0.18:0.3,0.0005,0.012),len);
      osc('sine',520*j,500*j,0.02,env(dest,S?0.1:0.16,0.0005,0.02),len);
      noise(env(filt(dest,'bandpass',2800,2),S?0.1:0.2,0.0005,0.01),0.05);
      break; }
  }
  return true;
}
// which bank entry a dnb hit uses: soft layer for ? / ??, and one of two takes from the beat position
function dnbPlay(n,when,v,dest,beat){
  const S=v<0.8?1:0, T=((Math.round((beat||0)*16)*2654435761)>>>0)>>>31, b=drumBankReady&&drumBank.get('dnb'+n+S+T);
  if(!b){ DNB.soft=S; DNB.take=T; try{ drum('dnb',n,when,v,dest); } finally { DNB.soft=0; DNB.take=0; } return; }
  const src=ctx.createBufferSource(); src.buffer=b;
  if(Math.abs(v-1)>1e-3){ const g=ctx.createGain(); g.gain.value=v; src.connect(g); g.connect(dest); } else src.connect(dest);
  src.start(when);
}
function reeseVoice(f,when,dur,v,dest){
  const L=LITE, nyq=ctx.sampleRate*0.45, e=ENV(dest,when,dur,.006,.3,.85,.09,.355*v);
  O('sine',f,when,e.stop,G(e.g,0.65));
  const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=1.1; kRate(lp);
  const fc=Math.min(nyq,240+f*3+900*Math.pow(clamp(v,0,1.6),2));     // the filter opens with how hard the note is played
  lp.frequency.setValueAtTime(Math.min(nyq,fc*2.2),when); lp.frequency.setTargetAtTime(fc,when,0.09);
  lp.connect(G(e.g,0.42));
  const sh=ctx.createWaveShaper(); sh.curve=dnbCurve(2.2); sh.connect(lp);
  WO(W.reese,f,when,e.stop,sh,-11); WO(W.reese,f,when,e.stop,sh,11);
  if(!L) O('sawtooth',f*2,when,e.stop,G(sh,0.27),4);
  return e;
}
/* ---------- sax ----------
   A single-reed horn, built from what makes a saxophone recognisable:
   - reed: two waves in the same phase, a round one (the reed barely closing) and a pulse-like one (the reed slapping
     shut each cycle, all harmonics). The mix follows how hard the note is blown, so loud notes get the edge and soft
     notes stay round; a brightness filter after it trims the top. (A static clipper was tried first: on a wave this
     rich it changed the tone by only a few dB, so the mix is driven directly.)
   - breath: broadband noise, strongest at the start of a tongued note and throughout a subtone (?) note
   - mouth and bell: a fixed set of resonances (two formants and a top roll-off) placed once per destination, scaled
     down for a tenor or baritone register (the track's lowest note decides, like the violin's body)
   - phrasing: tongued short notes with a key click, breathy soft attacks, a scoop up into longer notes, a swell,
     vibrato that comes in late and deepens (pitch and loudness together), a quick fall-off when the note is let go.
     ! is a hard tongue and a brighter tone, !! adds a growl (a rough 25-30 Hz modulation), ? plays subtone, glide slurs. */
const SX={level:0.13, vib:30, vibRate:5.3, scoop:1, noise:1, drive:1};
const sxCache=new WeakMap();
function sxCtx(){
  let c=sxCache.get(ctx); if(c) return c;
  const N=48, re=new Float32Array(N), im=new Float32Array(N);
  const imB=new Float32Array(N);
  for(let n=1;n<N;n++){ im[n]=(n<=2?1:0.55)/Math.pow(n,2.2); imB[n]=(n%2?1:0.8)/Math.pow(n,0.6)*Math.pow(0.965,n); }
  const wave=ctx.createPeriodicWave(re,im), waveB=ctx.createPeriodicWave(re,imB);
  const T=LFO_T0||0, fr=SX.vibRate, fw=0.23, dw=0.3;
  const sine=(f,ph)=>{ const x=ctx.createOscillator(); x.frequency.value=f; x.setPeriodicWave(ctx.createPeriodicWave(new Float32Array([0,Math.sin(ph)]),new Float32Array([0,Math.cos(ph)]),{disableNormalization:true})); return x; };
  const o=sine(fr,2*Math.PI*fr*T+(dw/fw)*(1-Math.cos(2*Math.PI*fw*T))), w=sine(fw,2*Math.PI*((fw*T)%1));
  const wg=ctx.createGain(); wg.gain.value=dw; w.connect(wg); wg.connect(o.frequency); o.start(); w.start();
  c={wave,waveB,lfo:o,bodies:new WeakMap()}; sxCache.set(ctx,c); return c;
}
const SX_REG=[1,0.74,0.55];        // alto, tenor, baritone: how far the formants move down
const sxRegOf=t=>!t||t.lo==null||t.lo>=53?0:t.lo>=44?1:2;   // lowest note F3 and up: alto; G#2 and up: tenor; below: baritone
function sxBody(dest,k){
  const c=sxCtx(); let bs=c.bodies.get(dest); if(!bs){ bs=[]; c.bodies.set(dest,bs); }
  if(bs[k]) return bs[k];
  const s=SX_REG[k], nyq=ctx.sampleRate*0.45;
  const mk=(type,f,Q,db,to)=>{ const b=ctx.createBiquadFilter(); b.type=type; b.frequency.value=Math.min(nyq,f); b.Q.value=Q; b.gain.value=db; b.connect(to); return b; };
  const hs=mk('highshelf',4200*Math.pow(s,0.5),0.7,-7,dest);
  const f2=mk('peaking',1900*s,1.6,4.5,hs);
  const f1=mk('peaking',760*s,1.3,7,f2);
  const lo=mk('lowshelf',180*s,0.7,-4,f1);     // the horn radiates little below its bell note
  bs[k]=lo; return lo;
}
function sxVoice(m,f,when,dur,v,dest,pb,t,vel){
  const C=sxCtx(), sr=ctx.sampleRate, L=LITE, nyq=sr*0.45;
  const ve=vel??v, acc=ve>1.1, growl=ve>1.6, soft=ve<0.8, leg=!!(pb&&pb.g0);
  const short=dur<0.16, long=dur>0.6, vibAmt=t&&t.vib!=null?t.vib:1;
  // tongue or breath: attack time
  let ta=leg?0.035:short?0.012+0.012*dur/0.16:long?0.07:0.03+0.04*(dur-0.16)/0.44;
  if(acc) ta*=0.5; else if(soft) ta*=1.6;
  ta=Math.max(0.006,Math.min(ta,dur*0.6));
  const P=SX.level*clamp(v,0.2,1.7)*(short?1.1:1);
  const end=when+dur, pts=[[when+ta,1]];
  if(acc&&!short){ pts[0][1]=1.25; const t2=Math.min(when+ta+0.1,end); if(t2>when+ta+0.01) pts.push([t2,0.9]); if(long) pts.push([end,0.95]); }
  else if(long){ pts[0][1]=0.82; pts.push([when+dur*0.5,1],[end,0.9]); }
  if(pts[pts.length-1][0]<end-1e-4) pts.push([end,pts[pts.length-1][1]*(short?0.75:long||leg?1:0.9)]);
  const Le=pts[pts.length-1][1];
  const eg=ctx.createGain(); eg.gain.value=0; eg.gain.setValueAtTime(0,when);
  for(const [tt,l] of pts) eg.gain.linearRampToValueAtTime(l*P,tt);
  // let go: the reed stops almost at once, the bore rings for a few ms
  const tr=short?0.025:soft?0.06:0.04; eg.gain.setTargetAtTime(0,end,tr); const stop=end+tr*7;
  // reed: the share of the pulse-like wave follows the dynamics (louder = the reed closes harder = more harmonics)
  const dk=(growl?1.2:acc?1:soft?0.28:0.62)*SX.drive, bmix=l=>clamp(dk*l,0,1);
  const gR=ctx.createGain(), gB=ctx.createGain(); gR.gain.value=0; gB.gain.value=0;
  gR.gain.setValueAtTime(1-0.75*bmix(0.3),when); gB.gain.setValueAtTime(bmix(0.3),when);
  for(const [tt,l] of pts){ gR.gain.linearRampToValueAtTime(1-0.75*bmix(l),tt); gB.gain.linearRampToValueAtTime(bmix(l),tt); }
  gR.gain.setTargetAtTime(1-0.75*bmix(0.4),end,tr); gB.gain.setTargetAtTime(bmix(0.4),end,tr);
  // brightness: a lowpass that opens with the dynamics (on top of what the reed does)
  const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.Q.value=0.7; kRate(lp);
  const bf=(acc?1.3:soft?0.55:1), fcP=Math.min(nyq,Math.max(f*4,900+3800*Math.pow(bf,1.5))), fc=l=>Math.min(nyq,fcP*(0.5+0.5*Math.min(1.3,l)));
  lp.frequency.setValueAtTime(fc(0.3),when); for(const [tt,l] of pts) lp.frequency.exponentialRampToValueAtTime(fc(l),tt);
  lp.frequency.setTargetAtTime(fcP*0.4,end,0.05);
  const det=(Math.random()*2-1)*2, o=ctx.createOscillator(), oB=ctx.createOscillator();
  o.setPeriodicWave(C.wave); oB.setPeriodicWave(C.waveB); o.frequency.automationRate='k-rate'; oB.frequency.automationRate='k-rate'; o.frequency.value=f; oB.frequency.value=f; o.detune.value=det; oB.detune.value=det;
  // scoop up into the note (jazz phrasing); a subtone note slides more slowly, a tongued short note hardly at all
  if(!leg&&SX.scoop){ const c=(short?8:long?45:30)*(acc?1.3:soft?0.7:1)*SX.scoop; for(const x of [o,oB]){ x.frequency.setValueAtTime(f*Math.pow(2,-c/1200),when); x.frequency.setTargetAtTime(f,when,short?0.012:soft?0.06:0.035); } }
  o.connect(gR); oB.connect(gB); gR.connect(lp); gB.connect(lp);
  o.start(when); oB.start(when); o.stop(stop); oB.stop(stop); collect.push(o,oB);
  // growl (!!): a rough modulation of the level, like humming into the horn
  let post=lp;
  if(growl&&!L){ const gm=ctx.createGain(); gm.gain.value=1; const go=ctx.createOscillator(); go.type='triangle'; go.frequency.value=26+Math.random()*5; const gd=ctx.createGain(); gd.gain.value=0.45; go.connect(gd); gd.connect(gm.gain); go.start(when); go.stop(stop); collect.push(go); lp.connect(gm); post=gm; }
  post.connect(eg);
  // vibrato: late and deepening on long notes, pitch and loudness together
  const depth=SX.vib*vibAmt*(soft?0.7:1);
  if(dur>=0.3&&depth>0){
    const mid=dur<0.6, d0=leg?0.08:mid?0.1:0.2+Math.random()*0.08, ramp=mid?0.15:0.3;
    const hz=f*(Math.pow(2,depth*(mid?0.5:1)/1200)-1), vg=ctx.createGain();
    vg.gain.value=0; vg.gain.setValueAtTime(0,when+d0); vg.gain.linearRampToValueAtTime(hz,when+d0+ramp);
    if(long&&dur>d0+ramp+0.05) vg.gain.linearRampToValueAtTime(hz*1.3,end);
    C.lfo.connect(vg); vg.connect(o.frequency); vg.connect(oB.frequency);
    const ag=ctx.createGain(); ag.gain.value=0; ag.gain.setValueAtTime(0,when+d0); ag.gain.linearRampToValueAtTime(0.12*P*Le,when+d0+ramp);   // the loudness swings with the pitch
    C.lfo.connect(ag); ag.connect(eg.gain);
    o.addEventListener('ended',()=>{ try{ C.lfo.disconnect(vg); C.lfo.disconnect(ag); }catch(e){} },{once:true});
  }
  // breath: a puff at the start of a tongued note, a steady hiss under a subtone; a key click on short notes
  if(!L&&SX.noise>0){
    const ns=ctx.createBufferSource(); ns.buffer=noiseBuf; ns.loop=true;
    const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=Math.min(nyq,2200+f*2); bp.Q.value=0.5;
    const nz=SX.noise, B=(leg?0.25:short?0.9:acc?1.3:soft?0.9:0.8)*nz, S=(soft?0.22:0.06)*nz, ng=ctx.createGain();
    ng.gain.setValueAtTime(B,when); ng.gain.setTargetAtTime(S,when,Math.max(0.01,ta*0.6));
    ns.connect(bp); bp.connect(ng); ng.connect(eg); ns.start(when,Math.random()*1.5); ns.stop(Math.min(stop,end+0.08)); collect.push(ns);
    if(short||acc){ const k=ctx.createBufferSource(); k.buffer=noiseBuf; const kf=ctx.createBiquadFilter(); kf.type='bandpass'; kf.frequency.value=Math.min(nyq,3400); kf.Q.value=2; const kg=ctx.createGain(); kg.gain.setValueAtTime(0.5*P,when); kg.gain.setTargetAtTime(0,when,0.004); k.connect(kf); kf.connect(kg); kg.connect(dest); k.start(when,0.3+Math.random()); k.stop(when+0.03); collect.push(k); }
  }
  eg.connect(sxBody(dest,sxRegOf(t)));
  return {g:eg,stop};
}
/* ---------- expressive voices ----------
   Every pitched instrument now reacts to how a note is written, the way violin and sax already did:
   - dynamics change the tone, not only the level: ? is darker and speaks more slowly, ! is brighter with a sharper
     attack (!! more so). bx below is the brightness from the note's velocity (?? 0, ? 0.25, plain 0.7, ! 1, !! 1.39)
   - length changes the articulation: short notes are tongued / detached, long notes swell and get vibrato that starts
     late and widens; glide notes are slurred
   - struck and plucked instruments get harder or softer mallets: upper partials are louder and ring longer on hard hits
   and it costs less than before. The costs that matter in Web Audio (measured, per voice-second): an oscillator is
   cheap, a biquad filter costs more than an oscillator, pitch modulation at audio rate costs 2.5 oscillators, and a
   buffer played at a rate other than 1 costs 4. So a voice is built from:
   - one or two oscillators with fixed spectra (PeriodicWave): a dark one and a bright one, mixed by gains that follow
     the dynamics. This replaces a filter per note. A spectrum is made once and shared by every note and every
     pre-render context of the same sample rate.
   - tone that is the same for every note of a track (formants, cabinet, the old fixed low-pass) sits once per track
     (BODY), not once per note
   - vibrato and pitch scoops run at control rate (one value per 128 samples)
   - struck instruments are 2-3 groups of partials, each with its own decay; inharmonic partials (bells, tines, bars)
     come from one oscillator running at a fraction of the note's frequency, so its harmonics land on the wanted ratios
   - plucked strings are tuned so their buffers play at rate 1 */
let mainCtx=null;                     // the context audioInit was called with (pre-render swaps ctx for a while)
const waveBank=new Map();             // sample rate -> Map(key -> PeriodicWave)
const ctxWaves=new WeakMap();         // fallback for browsers that refuse a wave made in another context
let WAVE_SHARE=true;
function waveMap(){
  if(WAVE_SHARE){ const sr=ctx.sampleRate; let b=waveBank.get(sr); if(!b) waveBank.set(sr,b=new Map()); return b; }
  let b=ctxWaves.get(ctx); if(!b) ctxWaves.set(ctx,b=new Map()); return b;
}
function WV(w){
  const b=waveMap(); let x=b.get(w[0]);
  if(!x){ const im=w[1](), c=WAVE_SHARE&&mainCtx&&mainCtx.sampleRate===ctx.sampleRate?mainCtx:ctx; x=c.createPeriodicWave(new Float32Array(im.length),im,{disableNormalization:true}); b.set(w[0],x); }
  return x;
}
// oscillator with a cached spectrum; w = [key, () => Float32Array of harmonic amplitudes]
function WO(w,f,when,stop,dest,det){
  const o=ctx.createOscillator();
  try{ o.setPeriodicWave(WV(w)); }catch(e){ if(!WAVE_SHARE) throw e; WAVE_SHARE=false; o.setPeriodicWave(WV(w)); }
  o.frequency.value=f; if(det) o.detune.value=det;
  o.connect(dest); o.start(when); o.stop(stop); if(collect) collect.push(o); return o;
}
const SP=(N,fn)=>()=>{ const a=new Float32Array(N+1); for(let n=1;n<=N;n++) a[n]=fn(n); return a; };
const SL=pairs=>()=>{ const a=new Float32Array(Math.max(...pairs.map(p=>p[0]))+1); for(const [n,v] of pairs) a[n]=v; return a; };
const roll=(nc,p=1)=>n=>Math.pow(n,-p)*Math.exp(-(n-1)/nc);
const W={
  one:['one',SL([[1,1]])],
  gsA:['gsA',SP(16,roll(5))], gsB:['gsB',SP(40,n=>n<2?0:Math.sqrt(Math.abs(Math.sin(n*Math.PI*0.17)))/n*Math.exp(-(n-1)/22))],
  gsL:['gsL',SP(24,n=>roll(5)(n)+(n<2?0:0.5*Math.sqrt(Math.abs(Math.sin(n*Math.PI*0.17)))/n*Math.exp(-(n-1)/22)))],
  pulse:['pulse',SP(64,n=>(2/(n*Math.PI))*Math.sin(n*Math.PI*0.25))],
  sqr:['sqr',SP(64,n=>n%2?1/n:0)], saw:['saw',SP(64,n=>1/n)],
  leadA:['leadA',SP(40,roll(4.5))], leadB:['leadB',SP(56,roll(26))],
  strA:['strA',SP(32,roll(4))], strB:['strB',SP(48,n=>roll(15)(n)*(n===1?0.4:n===2?0.7:1))],
  padA:['padA',SP(24,roll(2.4))], padB:['padB',SP(40,n=>roll(14)(n)*(n===1?0.35:n===2?0.7:1))],
  chA:['chA',SP(32,roll(5))], chB:['chB',SP(48,n=>roll(18)(n)*(n===1?0.5:1))],
  brA:['brA',SP(24,roll(3))], brB:['brB',SP(48,n=>roll(20)(n)*(n===1?0.25:n===2?0.6:1))],
  flA:['flA',SL([[1,1],[2,0.1],[3,0.045],[4,0.012]])], flB:['flB',SL([[2,0.5],[3,0.36],[4,0.2],[5,0.12],[6,0.07],[7,0.035],[8,0.02]])],
  orA:['orA',SL([[1,1],[2,0.75],[3,0.5],[4,0.22]])], orB:['orB',SL([[4,0.22],[6,0.3],[8,0.24],[10,0.12],[12,0.1],[16,0.05]])],
  acA:['acA',SL([[1,1],[2,0.65],[3,0.5],[4,0.3],[5,0.2],[6,0.1],[7,0.05]])], acB:['acB',SP(28,n=>(n===1?0.5:1)*0.9*Math.pow(n,-0.5)*Math.exp(-(n-1)/9))],
  baA:['baA',SP(12,roll(2.2))], baB:['baB',SP(32,n=>(n%2?1:0.45)*roll(8)(n)*(n===1?0.2:1))],
  suA:['suA',SL([[1,1],[2,0.05]])], suB:['suB',SL([[2,0.5],[3,0.3],[4,0.12]])],
  fmA:['fmA',SL([[1,1],[2,0.3],[3,0.05]])], fmB:['fmB',SL([[1,0.14],[2,0.4],[3,0.49],[4,0.38],[5,0.21],[6,0.09],[7,0.035],[8,0.012]])],
  reese:['reese',SP(64,n=>(n===1?0.32:n===2?0.72:n===3?0.87:n===4?0.93:1)/n)],     // a sawtooth after the old high-pass at 1.6x the note
  pnA:['pnA',SL([[1,1],[2,0.5],[3,0.26],[4,0.16],[5,0.06]])], pnB:['pnB',SL([[2,0.28],[3,0.34],[4,0.3],[5,0.24],[6,0.17],[7,0.11],[8,0.08],[9,0.05],[10,0.03]])],
  pnC:['pnC',SP(28,n=>n<5?0:Math.pow(n/5,-1.3)*0.5)],
  epA:['epA',SL([[1,1],[2,0.1],[3,0.04]])], epB:['epB',SL([[2,0.5],[3,0.42],[4,0.25],[5,0.16],[6,0.08],[7,0.04]])], epT:['epT',SL([[7,1],[13,0.3],[14,0.15]])],
  // bell partials on a grid of a tenth of the note: hum 0.5, prime 1, tierce 1.2, quint 1.5, nominal 2, then 2.5, 3, 4, 5.3, 6.7, 8
  blA:['blA',SL([[5,0.3],[10,1],[12,0.38]])], blB:['blB',SL([[15,0.35],[20,0.6],[25,0.24],[30,0.3]])], blC:['blC',SL([[40,0.32],[53,0.2],[67,0.13],[80,0.07]])],
  mbA:['mbA',SL([[1,1],[2,0.07]])], mbB:['mbB',SL([[25,1],[70,0.12]])],        // on a quarter of the note: 6.25x and 17.5x (a clamped bar)
  h4:['h4',SL([[4,1]])], h10:['h10',SL([[10,1]])],
  kaB:['kaB',SL([[59,1],[90,0.2]])],                                            // on a tenth of the note: 5.9x and 9x (a tine)
  sdA:['sdA',SL([[1,1],[2,0.3]])], sdB:['sdB',SL([[2,0.55],[3,0.2],[4,0.1]])], sdC:['sdC',SL([[3,0.3],[5,0.14],[6,0.1],[8,0.06]])],
  plA:['plA',SP(16,roll(1.5))], plB:['plB',SP(48,roll(12))],
};
// peak level of each instrument, set so the loudness of a plain (mf) note matches what the instrument had before
const XL={lead:0.1143,strings:0.1242,pad:0.095,choir:0.0976,brass:0.1133,flute:0.1701,organ:0.0862,accordion:0.1101,bass:0.3727,sub:0.3208,fmbass:0.2822,piano:0.1963,epiano:0.2321,bell:0.2132,musicbox:0.2378,marimba:0.345,kalimba:0.3286,steeldrum:0.2229,pluck:0.2202};

// tone shared by all notes of a track: built once per destination
const bodyCache=new WeakMap();
function BODY(dest,key,build){ let m=bodyCache.get(dest); if(!m) bodyCache.set(dest,m=new Map()); let n=m.get(key); if(!n){ n=build(dest); m.set(key,n); } return n; }
function BQ(to,type,f,Q,db){ const b=ctx.createBiquadFilter(); b.type=type; b.frequency.value=Math.min(f,ctx.sampleRate*0.45); if(Q!=null) b.Q.value=Q; if(db!=null) b.gain.value=db; b.connect(to); return b; }

// short filtered noises (breath, hammer thump, key click, pick), made once per sample rate; buffers work in any context
const noiseBank=new Map();
function NB(key){
  const sr=ctx.sampleRate, k=key+'@'+sr; let b=noiseBank.get(k); if(b) return b;
  const spec={breath:[1.5,'bp',3200,0.6,0],thump:[0.05,'lp',320,0.7,0.012],click:[0.02,'bp',3000,1.2,0.003],pick:[0.03,'hp',1800,0.7,0.006],gpick:[0.03,'bp',2400,0.7,0.0045]}[key];
  const [len,type,fc,Q,tau]=spec, n=Math.floor(sr*len), d=new Float32Array(n);
  // RBJ biquad run here once, so no filter node is needed per note
  const w=2*Math.PI*fc/sr, al=Math.sin(w)/(2*Q), c=Math.cos(w), a0=1+al;
  const B=type==='lp'?[(1-c)/2,1-c,(1-c)/2]:type==='hp'?[(1+c)/2,-(1+c),(1+c)/2]:[al,0,-al], a1=-2*c/a0, a2=(1-al)/a0;
  let x1=0,x2=0,y1=0,y2=0,q=0x2F6E2B1^n,sum=0;
  for(let i=-2000;i<n;i++){
    q=(q+0x6D2B79F5)|0; let t=Math.imul(q^(q>>>15),1|q); t=(t+Math.imul(t^(t>>>7),61|t))^t; const x=((t^(t>>>14))>>>0)/2147483648-1;
    const y=(B[0]*x+B[1]*x1+B[2]*x2)/a0-a1*y1-a2*y2; x2=x1; x1=x; y2=y1; y1=y;
    if(i>=0){ d[i]=tau?y*Math.exp(-i/(tau*sr)):y; sum+=d[i]*d[i]; }
  }
  let pk=0; for(let i=0;i<n;i++) if(Math.abs(d[i])>pk) pk=Math.abs(d[i]);
  const g=tau?1/(pk+1e-12):0.3/Math.sqrt(sum/n+1e-12);             // bursts: peak 1; loops: RMS 0.3
  for(let i=0;i<n;i++) d[i]*=g;
  if(!tau){ const f=Math.floor(sr*0.02); for(let i=0;i<f;i++){ const a=i/f; d[i]=d[i]*a+d[n-f+i]*(1-a); } b=new AudioBuffer({length:n-f,numberOfChannels:1,sampleRate:sr}); b.copyToChannel(d.subarray(0,n-f),0); }   // seamless loop
  else { b=new AudioBuffer({length:n,numberOfChannels:1,sampleRate:sr}); b.copyToChannel(d,0); }
  noiseBank.set(k,b); return b;
}
function NS(key,when,lvl,dest){ if(LITE||lvl<=0.002) return; const s=ctx.createBufferSource(); s.buffer=NB(key); s.connect(G(dest,lvl)); s.start(when); if(collect) collect.push(s); }

// how a note is to be played, from its length and dynamics
function xa(dur,vel,pb){ return {bx:clamp(vel-0.3,0,1.4),short:dur<0.16,long:dur>0.6,soft:vel<0.8,acc:vel>1.1,hard:vel>1.6,leg:!!(pb&&pb.g0)}; }
function AUTO(p,pts,when,end){
  p.value=pts[0][1]; p.setValueAtTime(pts[0][1],when); let last=when;
  for(let i=1;i<pts.length;i++){ const t=Math.min(Math.max(pts[i][0],last),end); p.linearRampToValueAtTime(pts[i][1],t); last=t; }
}
// level over a sustained note: accents overshoot, long notes swell, short notes fall away
function susPts(when,dur,ta,a,o={}){
  const end=when+dur, t1=when+Math.min(ta,dur*0.7), pts=[];
  if(a.acc&&!a.short){ pts.push([t1,o.over||1.22],[Math.min(t1+0.12,end),0.9]); if(a.long) pts.push([end,o.tail||0.92]); }
  else if(a.long&&o.swell){ pts.push([t1,o.swell],[when+dur*0.5,1],[end,o.tail||0.9]); }
  else pts.push([t1,1],[end,a.short?(o.shortEnd||0.8):(o.midEnd||0.92)]);
  return pts;
}
// vibrato / pitch scoop at control rate on every oscillator of the voice
function lfoFor(rate){
  let r=5; for(const x of [5.5,6.3]) if(Math.abs(x-rate)<Math.abs(r-rate)) r=x;
  for(const x of lfos) if(x.rate===r&&x.o.context===ctx) return x;
  const o=ctx.createOscillator(); o.frequency.value=r; o.start(); const l={rate:r,o}; lfos.push(l); return l;
}
function XVIB(oscs,when,end,o){
  if(VIBK<=0||!o||o.cents<=0) return;
  const l=lfoFor(o.rate);
  const c=o.cents*VIBK, g=ctx.createGain(), t1=when+o.d0+o.ramp; g.gain.value=0;
  g.gain.setValueAtTime(0,when+o.d0); g.gain.linearRampToValueAtTime(c,t1);
  if(o.grow&&o.grow!==1&&end>t1+0.05) g.gain.linearRampToValueAtTime(c*o.grow,end);
  l.o.connect(g);
  for(const x of oscs){ x.detune.automationRate='k-rate'; g.connect(x.detune); }
  oscs[0].addEventListener('ended',()=>{ try{ l.o.disconnect(g); }catch(e){} },{once:true});
  return {l,g};
}
function SCOOP(oscs,when,cents,t){ for(const x of oscs){ const p=x.detune, b=p.value; p.automationRate='k-rate'; p.setValueAtTime(b+cents,when); p.linearRampToValueAtTime(b,when+t); } }
/* sustained voice: o = {f,when,dur,dest,peak, wa,wb (spectra), da,db (cents), pts (level), mix (gain of the bright
   oscillator over time), tr (release time constant), vib, trem, scoop:[cents,seconds], nz:{key,a,s,tc}} */
function SUS(o){
  const {f,when,dur,dest}=o, end=when+dur, tr=o.tr, stop=end+tr*6.5+0.01;
  const eg=ctx.createGain(); eg.gain.value=0; eg.gain.setValueAtTime(0,when);
  let last=when; for(const [tt,l] of o.pts){ const x=Math.min(Math.max(tt,last),end); eg.gain.linearRampToValueAtTime(l*o.peak,x); last=x; }
  eg.gain.setTargetAtTime(0,end,tr); eg.connect(dest);
  const oscs=[WO(o.wa,f,when,stop,eg,o.da||0)];
  if(o.wb){ const gb=ctx.createGain(); AUTO(gb.gain,o.mix,when,end); gb.connect(eg); oscs.push(WO(o.wb,f,when,stop,gb,o.db||0)); }
  if(o.scoop) SCOOP(oscs,when,o.scoop[0],o.scoop[1]);
  const vb=o.vib&&XVIB(oscs,when,end,o.vib);
  if(vb&&o.trem){ const tg=ctx.createGain(); tg.gain.value=0; tg.gain.setValueAtTime(0,when+o.vib.d0); tg.gain.linearRampToValueAtTime(o.trem*o.peak,when+o.vib.d0+o.vib.ramp); vb.l.o.connect(tg); tg.connect(eg.gain);
    oscs[0].addEventListener('ended',()=>{ try{ vb.l.o.disconnect(tg); }catch(e){} },{once:true}); }
  if(o.nz&&!LITE){
    const s=ctx.createBufferSource(), ng=ctx.createGain(); s.buffer=NB(o.nz.key); s.loop=true;
    ng.gain.setValueAtTime(o.nz.a,when); ng.gain.setTargetAtTime(o.nz.s,when,o.nz.tc);
    s.connect(ng); ng.connect(eg); s.start(when,Math.random()); s.stop(Math.min(stop,end+0.12)); if(collect) collect.push(s);
  }
  return {g:eg,stop,oscs};
}
/* struck / plucked voice: groups of partials, each {w, fm (frequency multiplier), det, lvl, a (attack), tau (decay),
   floor (level it settles on, as a fraction)}; rel = damping after the note is let go */
function PV(o){
  const {f,when,dur,dest}=o, end=when+dur, gs=o.groups.filter(g=>g&&g.lvl>1e-3), mx=Math.max(...gs.map(g=>g.lvl));
  const eg=ctx.createGain(); eg.gain.value=o.peak; eg.gain.setValueAtTime(o.peak,end); eg.gain.setTargetAtTime(0,end,o.rel); eg.connect(dest);
  let stop=0; const oscs=[];
  for(const g of gs){
    const gg=ctx.createGain(), a=g.a||0.002, fl=(g.floor||0)*g.lvl;
    gg.gain.value=0; gg.gain.setValueAtTime(0,when); gg.gain.linearRampToValueAtTime(g.lvl,when+a); gg.gain.setTargetAtTime(fl,when+a,g.tau);
    gg.connect(eg);
    // stop a group when it is about 56 dB under the loudest one
    const life=fl>0?Infinity:a+g.tau*Math.max(2,6.5+Math.log(g.lvl/mx)), st=Math.min(end+o.rel*6.5,when+life)+0.01;
    oscs.push(WO(g.w,f*(g.fm||1),when,st,gg,g.det||0)); if(st>stop) stop=st;
  }
  return {g:eg,stop,oscs};
}
// plucked string (Karplus-Strong), tuned exactly so the buffer plays at rate 1 (4x cheaper than any other rate)
function ks(midi,kind){
  const sr=ctx.sampleRate, key=kind+midi+'@'+sr; if(ksCache.has(key)) return ksCache.get(key);
  const f=mtof(midi), p=Math.max(2,Math.round(sr/f-0.5));
  const len=Math.floor(sr*(LITE?1.3:(kind==='harp'?3:2.4))), d=new Float32Array(len);
  const damp=kind==='harp'?0.9988:0.9965;
  let prev=0, mean=0;
  for(let i=0;i<p;i++){ let n=Math.random()*2-1; if(kind==='guitar'){ prev+=(n-prev)*0.45; n=prev; } d[i]=n; mean+=n; }
  mean/=p; for(let i=0;i<p;i++) d[i]-=mean;
  for(let i=p;i<len;i++) d[i]=damp*0.5*(d[i-p]+(i-p-1>=0?d[i-p-1]:0));
  // the loop above has a period of p+0.5 samples; resample (cubic) to the exact pitch
  const r=f*(p+0.5)/sr, n=Math.floor((len-3)/r), out=new Float32Array(n);
  for(let i=0;i<n;i++){ const x=i*r, k=Math.floor(x), t=x-k, y0=d[k>0?k-1:0], y1=d[k], y2=d[k+1], y3=d[k+2];
    out[i]=y1+0.5*t*(y2-y0+t*(2*y0-5*y1+4*y2-y3+t*(3*(y1-y2)+y3-y0))); }
  if(kind==='guitar'){ // the body's low-pass (3.4 kHz), which used to be a filter node on every note
    const w=2*Math.PI*Math.min(3400,sr*0.45)/sr, al=Math.sin(w)/(2*0.5), c=Math.cos(w), a0=1+al, b0=(1-c)/2/a0, b1=(1-c)/a0, a1=-2*c/a0, a2=(1-al)/a0;
    let x1=0,x2=0,y1=0,y2=0; for(let i=0;i<n;i++){ const x=out[i], y=b0*x+b1*x1+b0*x2-a1*y1-a2*y2; x2=x1; x1=x; y2=y1; y1=y; out[i]=y; } }
  { const k=Math.min(n,Math.floor(sr*0.1)); let e=0; for(let i=0;i<k;i++) e+=out[i]*out[i];
    const want=kind==='harp'?-8.2-0.117*(midi-36):-12.6+0.053*(midi-36)-0.0027*(midi-36)*(midi-36), g=Math.pow(10,want/20)/Math.sqrt(e/k+1e-12); for(let i=0;i<n;i++) out[i]*=g; }
  if(LITE){ const fade=Math.floor(sr*0.15); for(let i=0;i<fade;i++) out[n-1-i]*=i/fade; }
  const buf=new AudioBuffer({length:n,numberOfChannels:1,sampleRate:sr}); buf.copyToChannel(out,0);
  const res={buf,rate:1}; ksCache.set(key,res); return res;
}
function buildVoice(inst,m,when,dur,v,dest,pb,t,vel){
  const f=mtof(m), L=LITE; let e;
  if(vel==null) vel=v;
  VIBK=t&&t.vib!=null?t.vib:1;
  const a=xa(dur,vel,pb), b=a.bx, end=when+dur;
  switch(inst){
    case 'voice': case 'voicem': case 'voiceh': case 'voicek': e=voxNote(inst,m,when,dur,v,dest,t,vel); break;
    case 'violin': case 'violins': e=vnVoice(m,f,when,dur,v,dest,pb,t,vel,inst==='violins'); break;
    case 'rockgtr': case 'distgtr': e=gtrVoice(m,f,when,dur,dest,pb,t,vel); break;
    case 'reese': e=reeseVoice(f,when,dur,v,dest); break;
    case 'sax': e=sxVoice(m,f,when,dur,v,dest,pb,t,vel); break;
    // the plain waveforms stay plain on purpose (they are the chip / raw-synth colours); only their cost changed
    case 'sine': e=ENV(dest,when,dur,.008,.3,.7,.15,.3*v); O('sine',f,when,e.stop,e.g); break;
    case 'triangle': e=ENV(dest,when,dur,.006,.3,.7,.12,.36*v); O('triangle',f,when,e.stop,e.g); break;
    case 'square': e=ENV(BODY(dest,'sq',d=>BQ(d,'lowpass',3400,.7)),when,dur,.005,.2,.6,.08,.17*v); O('square',f,when,e.stop,e.g); break;
    case 'saw': e=ENV(BODY(dest,'sw',d=>BQ(d,'lowpass',3000,.7)),when,dur,.005,.2,.6,.08,.25*v); O('sawtooth',f,when,e.stop,e.g); break;
    case 'pulse': e=ENV(dest,when,dur,.002,.12,.75,.025,.285*v); WO(W.pulse,f,when,e.stop,e.g); break;
    case 'lead': {
      const m0=clamp(.1+.95*b,0,1.5); let ta=a.leg?.02:a.short?.006:.012; if(a.soft) ta*=2.5;
      e=SUS({f,when,dur,dest,peak:XL.lead*v,wa:W.leadA,wb:W.leadB,da:-7,db:7,pts:susPts(when,dur,ta,a,{swell:.92,shortEnd:.6}),
        mix:a.acc?[[when,Math.min(1.6,m0*1.7)],[when+.14,m0]]:a.long?[[when,m0*.8],[when+dur*.5,m0],[end,m0*.9]]:[[when,m0]],
        tr:.045,vib:dur>=.3?{d0:a.leg?.08:.22,ramp:.3,cents:14,grow:a.long?1.3:1,rate:5.6}:null});
      break; }
    case 'strings': {
      const m0=clamp(.2+.65*b,0,1.2);
      let ta=a.leg?.05:a.short?.03+.03*dur/.16:a.long?.2:.07+.13*(dur-.16)/.44; if(a.acc) ta*=.35; else if(a.soft) ta*=1.5;
      e=SUS({f,when,dur,dest,peak:XL.strings*v,wa:W.strA,wb:W.strB,da:-9,db:9,pts:susPts(when,dur,ta,a,{swell:.84,over:1.18}),
        mix:a.acc?[[when,m0*1.5],[when+.25,m0]]:a.long?[[when,m0*.55],[when+dur*.5,m0],[end,m0*.8]]:[[when,m0]],
        tr:a.short?.05:.15,vib:dur>=.35?{d0:.25,ramp:.35,cents:9,grow:1.3,rate:5}:null});
      break; }
    case 'pad': {
      const m0=clamp(.06+.85*b,0,1.3); let ta=a.short?.08:.3; if(a.acc) ta*=.4; else if(a.soft) ta*=1.6;
      e=SUS({f,when,dur,dest,peak:XL.pad*v,wa:W.padA,wb:W.padB,da:-9,db:9,pts:susPts(when,dur,ta,a,{swell:.88,over:1.1}),
        mix:[[when,m0*.4],[when+Math.min(dur*.6,2.5),m0*1.1],[end,m0*.7]],tr:.21});
      break; }
    case 'choir': {
      const m0=clamp(.12+.7*b,0,1.2);
      let ta=a.leg?.06:a.short?.05:a.long?.26:.1+.16*(dur-.16)/.44; if(a.acc) ta*=.4; else if(a.soft) ta*=1.4;
      // the vowel: fixed formants (an open "ah"), once per track
      const body=BODY(dest,'choir',d=>BQ(BQ(BQ(BQ(G(d,.5),'highshelf',4500,.7,-9),'peaking',2900,6,9),'peaking',1150,4.5,7),'peaking',650,3.5,9));
      e=SUS({f,when,dur,dest:body,peak:XL.choir*v,wa:W.chA,wb:W.chB,da:-8,db:8,pts:susPts(when,dur,ta,a,{swell:.82,over:1.15}),
        mix:a.acc?[[when,m0*1.5],[when+.25,m0]]:a.long?[[when,m0*.5],[when+dur*.5,m0],[end,m0*.8]]:[[when,m0]],
        tr:a.short?.07:.17,vib:dur>=.4?{d0:.3,ramp:.4,cents:11,grow:1.2,rate:5.2}:null});
      break; }
    case 'brass': {
      const m0=clamp(.06+.95*Math.pow(b,1.3),0,1.6);
      let ta=a.leg?.02:a.short?.016:a.long?.045:.03; if(a.acc) ta*=.6; else if(a.soft) ta*=1.7;
      const mix=[[when,m0*.25],[when+ta+.015,m0*(a.acc?1.7:1.25)],[when+ta+.14,m0]]; if(a.long) mix.push([when+dur*.55,m0*1.12],[end,m0*.9]);
      const body=BODY(dest,'brass',d=>BQ(BQ(d,'highshelf',5200,.7,-5),'peaking',1250,1.1,4.5));
      e=SUS({f,when,dur,dest:body,peak:XL.brass*v,wa:W.brA,wb:W.brB,da:-4,db:4,pts:susPts(when,dur,ta,a,{swell:.86,over:1.25}),mix,
        scoop:pb||a.leg?null:a.acc?[-28,.045]:a.short?null:[-10,.03],
        tr:a.short?.03:.06,vib:dur>=.5?{d0:.3,ramp:.35,cents:8,grow:1.4,rate:5.5}:null});
      break; }
    case 'flute': {
      const m0=clamp(.04+.75*b,0,1.3); let ta=a.leg?.03:a.short?.022:.055; if(a.acc) ta*=.5; else if(a.soft) ta*=1.5;
      e=SUS({f,when,dur,dest,peak:XL.flute*v,wa:W.flA,wb:W.flB,pts:susPts(when,dur,ta,a,{swell:.88,over:1.2}),
        mix:a.acc?[[when,Math.min(1.5,m0*1.8)],[when+.1,m0]]:[[when,m0*.6],[when+ta+.05,m0]],
        nz:{key:'breath',a:a.leg?.1:a.acc?.9:a.soft?.5:.6,s:a.soft?.2:.08,tc:.035},
        tr:.045,vib:dur>=.3?{d0:.28,ramp:.4,cents:6,grow:1.2,rate:5}:null,trem:a.soft?.06:.1});
      break; }
    case 'organ': {
      const m0=clamp(.2+1.15*b,0,1.7);
      e=SUS({f,when,dur,dest,peak:XL.organ*v,wa:W.orA,wb:W.orB,pts:[[when+.006,1]],
        mix:a.acc?[[when,m0+.9],[when+.2,m0]]:[[when,m0]],     // accents: the percussion stop
        tr:.028,vib:{d0:0,ramp:.05,cents:6,rate:6.3}});
      if(!a.soft) NS('click',when,.35*(a.acc?1.8:1)*XL.organ*v,dest);
      break; }
    case 'accordion': {
      const m0=clamp(.08+.95*b,0,1.5); let ta=a.short?.014:.03; if(a.acc) ta*=.6; else if(a.soft) ta*=2;
      e=SUS({f,when,dur,dest,peak:XL.accordion*v,wa:W.acA,wb:W.acB,da:-7,db:7,pts:susPts(when,dur,ta,a,{swell:.8,over:1.3}),   // the bellows
        mix:a.acc?[[when,m0*1.5],[when+.15,m0]]:a.long?[[when,m0*.7],[when+dur*.5,m0*1.1],[end,m0*.9]]:[[when,m0]],tr:.035});
      break; }
    case 'bass': {
      const m0=clamp(.08+.95*b,0,1.5), ta=a.soft?.012:.004, t1=when+Math.min(ta,dur*.7);
      e=SUS({f,when,dur,dest,peak:XL.bass*v,wa:W.baA,wb:W.baB,pts:[[t1,1],[t1+.25,.68]],
        mix:[[when,m0*(a.acc?2.8:1.9)],[when+.08,m0]],tr:.02});      // the pluck: bright at first
      break; }
    case 'sub': {
      const m0=clamp(.06+.5*b,0,1), t1=when+Math.min(.006,dur*.7);
      e=SUS({f,when,dur,dest,peak:XL.sub*v,wa:W.suA,wb:W.suB,pts:[[t1,1],[t1+.2,.9]],mix:[[when,m0*(a.acc?2.2:1.2)],[when+.1,m0]],tr:.023});
      break; }
    case 'fmbass': {
      const t1=when+Math.min(.003,dur*.7);
      e=SUS({f,when,dur,dest,peak:XL.fmbass*v,wa:W.fmA,wb:W.fmB,pts:[[t1,1],[t1+.3,.65]],
        mix:[[when,clamp(.45+.65*b,0,1.6)],[when+.05,clamp(.3+.4*b,0,1)],[when+.22,.06+.28*b]],tr:.02});
      break; }
    case 'acid': {
      // the filter sweep is the instrument, so this one keeps a (control-rate) resonant filter; ! is the 303's accent
      e=ENV(dest,when,dur,.003,.2,.6,.05,.24*v*(a.acc?1.15:1));
      const lp=F(e.g,'lowpass',2600,a.acc?16:a.soft?9:13); kRate(lp);
      const k=a.acc?1.7:a.soft?.45:1;
      lp.frequency.setValueAtTime(Math.min(9000,(f*20+600)*k),when); lp.frequency.exponentialRampToValueAtTime(Math.max(150,f*2*(a.acc?1.3:1)),when+(a.acc?.28:.2));
      O('sawtooth',f,when,e.stop,lp); break; }
    case 'piano': {
      const D=clamp(2.6-(m-60)*0.035,0.7,4.5), at=a.soft?.006:.002;   // low strings ring longer
      e=PV({f,when,dur,dest,peak:XL.piano*v,rel:.1,groups:[
        {w:W.pnA,det:1.2,lvl:1,a:at,tau:D/2.6},
        {w:W.pnB,det:-1,lvl:.75*(.12+.88*Math.pow(b,1.2)),a:at,tau:D/6.5*(.7+.5*b)},
        !L&&{w:W.pnC,lvl:.85*Math.pow(b,1.8),a:.0015,tau:Math.max(.05,D/16*(.7+.5*b))}]});
      NS('thump',when,.5*b*XL.piano*v,dest);
      break; }
    case 'epiano': {
      const at=a.soft?.005:.002;
      e=PV({f,when,dur,dest,peak:XL.epiano*v,rel:.13,groups:[
        {w:W.epA,lvl:1,a:at,tau:.5,floor:.3},
        {w:W.epB,lvl:1.05*Math.pow(b,1.5),a:at,tau:.22,floor:.08},      // the bark of a hard-struck tine
        !L&&{w:W.epT,lvl:.1+.3*b,a:.001,tau:.07}]});
      break; }
    case 'bell': {
      e=PV({f,when,dur,dest,peak:XL.bell*v,rel:.5,groups:[
        {w:W.blA,fm:.1,lvl:1,a:.001,tau:.85},
        {w:W.blB,fm:.1,lvl:.85*(.35+.75*b),a:.001,tau:.4},
        !L&&{w:W.blC,fm:.1,lvl:Math.pow(b,1.3),a:.001,tau:.11+.05*b}]});
      break; }
    case 'musicbox': {
      e=PV({f,when,dur,dest,peak:XL.musicbox*v,rel:.3,groups:[
        {w:W.mbA,lvl:1,a:.001,tau:.37},
        {w:W.mbB,fm:.25,lvl:.45*(.25+b),a:.001,tau:.05+.03*b}]});
      NS('click',when,.3*b*XL.musicbox*v,dest);
      break; }
    case 'marimba': {
      const k=clamp(Math.pow(261.6/f,.35),.6,2);    // low bars ring longer
      e=PV({f,when,dur,dest,peak:XL.marimba*v,rel:.085,groups:[
        {w:W.one,lvl:1,a:a.soft?.004:.001,tau:.15*k},
        {w:W.h4,lvl:.6*(.08+1.35*b),a:.001,tau:.03*k*(.7+.6*b)},
        !L&&{w:W.h10,lvl:.4*Math.pow(b,1.5),a:.001,tau:.008}]});
      NS('thump',when,.35*b*XL.marimba*v,dest);
      break; }
    case 'kalimba': {
      e=PV({f,when,dur,dest,peak:XL.kalimba*v,rel:.15,groups:[
        {w:W.one,lvl:1,a:.001,tau:.3},
        {w:W.kaB,fm:.1,lvl:.36*(.2+1.1*b),a:.001,tau:.04+.03*b}]});
      NS('click',when,.25*b*XL.kalimba*v,dest);
      break; }
    case 'steeldrum': {
      e=PV({f,when,dur,dest,peak:XL.steeldrum*v,rel:.1,groups:[
        {w:W.sdA,lvl:1,a:.003,tau:.27},
        {w:W.sdB,lvl:.95*(.3+.85*b),a:.003,tau:.13,floor:.12},
        !L&&{w:W.sdC,det:7,lvl:.75*b*b,a:.002,tau:.06}]});
      if(a.acc&&!pb) SCOOP(e.oscs,when,22,.06);      // a hard hit bends the pan's note for a moment
      break; }
    case 'pluck': {
      e=PV({f,when,dur,dest,peak:XL.pluck*v,rel:.04,groups:[
        {w:W.plA,lvl:1,a:.002,tau:.133},
        {w:W.plB,lvl:.1+1.45*b,a:.002,tau:.028+.055*b}]});
      break; }
    case 'guitar': case 'harp': {
      const k=ks(m,inst), src=ctx.createBufferSource(); src.buffer=k.buf; src.playbackRate.value=k.rate;
      // a plucked string darkens as it rings, so a soft pluck starts a little way into the tone
      const off=b<.7?Math.min(.22,(.7-b)*.3):0;
      e=ENV(dest,when,dur,off?.004:.001,.05,1,inst==='harp'?.7:.2,(inst==='harp'?.75:1.0)*v*(off?1+off*4:1));
      src.connect(e.g);
      e.stop=Math.min(e.stop,when+k.buf.duration-off);
      src.start(when,off); src.stop(e.stop); if(collect) collect.push(src);
      if(a.acc) NS('pick',when,(inst==='harp'?.12:.2)*v,dest);
      break; }
  }
  return e;
}
function hit(dest,when,peak,len,attack){
  const g=ctx.createGain(); g.gain.value=0; g.connect(dest);
  if(attack){ g.gain.setValueAtTime(0.0001,when); g.gain.linearRampToValueAtTime(peak,when+attack); }
  else g.gain.setValueAtTime(peak,when);
  g.gain.exponentialRampToValueAtTime(0.001,when+len); return g;
}
function noiseHit(dest,when,len,type,freq,Q){ const s=ctx.createBufferSource(); s.buffer=noiseBuf; s.connect(F(dest,type,freq,Q)); s.start(when,Math.random()*1.5); s.stop(when+len+.02); }
const DV={tune:1};   // the take being rendered into the drum bank: its drums are tuned a little differently
function sweep(dest,type,f0,f1,t,when,len){ const o=ctx.createOscillator(); o.type=type; o.frequency.setValueAtTime(f0*DV.tune,when); o.frequency.exponentialRampToValueAtTime(f1*DV.tune,when+t); o.connect(dest); o.start(when); o.stop(when+len+.02); }
function drum(kit,n,when,v,dest){
  if(kit==='dnb'&&dnbDrum(n,when,v,dest)) return;
  if(kit==='chip'){ switch(n){
    case 'k': sweep(hit(dest,when,.32*v,.12),'square',380,50,.07,when,.12); break;
    case 's': noiseHit(hit(dest,when,.3*v,.13),when,.13,'bandpass',2200,.8); sweep(hit(dest,when,.12*v,.05),'square',240,180,.04,when,.05); break;
    case 'h': noiseHit(hit(dest,when,.13*v,.03),when,.03,'highpass',9000); break;
    case 'o': noiseHit(hit(dest,when,.11*v,.16),when,.16,'highpass',8000); break;
    case 'c': noiseHit(hit(dest,when,.25*v,.09),when,.09,'bandpass',1800,1); break;
    case 'p': sweep(hit(dest,when,.15*v,.03),'square',1200,1000,.02,when,.03); break;
    case 't': sweep(hit(dest,when,.25*v,.12),'square',300,140,.1,when,.12); break;
    case 'l': sweep(hit(dest,when,.27*v,.16),'square',190,85,.14,when,.16); break;
    case 'y': noiseHit(hit(dest,when,.16*v,.7),when,.7,'highpass',3000); break;
    case 'z': noiseHit(hit(dest,when,.09*v,.22),when,.22,'highpass',10000); break;
    case 'b': noiseHit(hit(dest,when,.1*v,.05,.01),when,.06,'highpass',7000); break;
    case 'g': noiseHit(hit(dest,when,.16*v,1.2,.01),when,1.2,'bandpass',600,1.5); break;
    case 'w': sweep(hit(dest,when,.2*v,.04),'square',1500,1400,.03,when,.04); break;
    case 'v': sweep(hit(dest,when,.14*v,.12),'square',800,780,.1,when,.12); break;
    case 'q': sweep(hit(dest,when,.25*v,.12),'triangle',330,260,.1,when,.12); break;
    case 'x': noiseHit(hit(dest,when,.2*v,.04),when,.04,'bandpass',2600,3); break;
  } return; }
  switch(n){
    case 'k': sweep(hit(dest,when,.95*v,.38),'sine',155,44,.13,when,.38); noiseHit(hit(dest,when,.12*v,.012),when,.012,'highpass',3500); break;
    case 's': noiseHit(hit(dest,when,.6*v,.2),when,.2,'bandpass',3200,.6); sweep(hit(dest,when,.32*v,.1),'triangle',200,165,.08,when,.1); break;
    case 'p': sweep(hit(dest,when,.3*v,.035),'triangle',1750,1650,.03,when,.035); noiseHit(hit(dest,when,.2*v,.03),when,.03,'bandpass',2600,2); break;
    case 'h': noiseHit(hit(dest,when,.22*v,.05),when,.05,'highpass',7800); break;
    case 'o': noiseHit(hit(dest,when,.13*v,.32),when,.32,'highpass',7200); break;
    case 'c': {
      const g=ctx.createGain(); g.gain.value=0; g.connect(dest); g.gain.setValueAtTime(0,when);
      [0,.011,.022].forEach(o=>{ g.gain.setValueAtTime(.42*v,when+o); g.gain.exponentialRampToValueAtTime(.05*v,when+o+.009); });
      g.gain.setValueAtTime(.34*v,when+.031); g.gain.exponentialRampToValueAtTime(.001,when+.17);
      noiseHit(g,when,.19,'bandpass',1600,1.2); break; }
    case 't': sweep(hit(dest,when,.55*v,.3),'sine',230,135,.2,when,.3); break;
    case 'l': sweep(hit(dest,when,.62*v,.42),'sine',140,78,.3,when,.42); break;
    case 'y': noiseHit(hit(dest,when,.22*v,LITE?1.1:1.7),when,LITE?1.1:1.7,'highpass',4200); if(!LITE) noiseHit(hit(dest,when,.08*v,1.2),when,1.2,'bandpass',9000,1.5); break;
    case 'z': noiseHit(hit(dest,when,.09*v,.5),when,.5,'bandpass',7800,1.5); if(!LITE) sweep(hit(dest,when,.03*v,.5),'sine',3150,3100,.1,when,.5); break;
    case 'b': noiseHit(hit(dest,when,.17*v,.1,.012),when,.1,'highpass',6200); break;
    case 'g': [196,277,368,505,690].forEach((fr,i)=>{ const o=ctx.createOscillator(); o.frequency.value=fr; const gg=hit(dest,when,[.2,.16,.12,.09,.06][i]*v,2.4,.02); o.connect(gg); o.start(when); o.stop(when+2.45); }); noiseHit(hit(dest,when,.05*v,.6,.01),when,.6,'bandpass',900,1); break;
    case 'w': sweep(hit(dest,when,.32*v,.07),'sine',1250,1150,.05,when,.07); noiseHit(hit(dest,when,.1*v,.015),when,.015,'bandpass',3000,2); break;
    case 'v': { const g=hit(dest,when,.2*v,.35); const bp=F(g,'bandpass',900,2.5); [545,815].forEach(fr=>{ const o=ctx.createOscillator(); o.type='square'; o.frequency.value=fr; o.connect(bp); o.start(when); o.stop(when+.37); }); break; }
    case 'q': sweep(hit(dest,when,.5*v,.28),'sine',360,290,.06,when,.28); noiseHit(hit(dest,when,.08*v,.02),when,.02,'bandpass',1800,1.5); break;
    case 'x': noiseHit(hit(dest,when,.32*v,.05,.002),when,.05,'bandpass',2400,3.5); break;
  }
}
const drumBank=new Map(); let drumBankReady=false;
function buildDrumBank(){
  drumBankReady=false; drumBank.clear();
  const main=ctx, sr=ctx.sampleRate;
  if(typeof OfflineAudioContext==='undefined') return;
  const jobs=[];
  try{
    const len=n=>Math.ceil(sr*(n==='g'?2.5:n==='y'?1.8:0.6));
    for(const n of Object.keys(DRUM_NAMES)){
      const oc=new OfflineAudioContext(1,len(n),sr);
      ctx=oc; try{ drum('chip',n,0.001,1,oc.destination); } finally { ctx=main; }
      jobs.push(oc.startRendering().then(b=>drumBank.set('chip'+n,b)));
      // std: hard and soft layer x two takes. The soft layer is the same drum through a low-pass (a drum hit lightly
      // loses its top first); the second take is tuned 1.2% higher and gets different noise.
      for(const S of [0,1]) for(const T of [0,1]){
        const oc=new OfflineAudioContext(1,len(n),sr);
        ctx=oc; DV.tune=T?1.012:1;
        try{ let d=oc.destination; if(S){ const f=oc.createBiquadFilter(); f.type='lowpass'; f.frequency.value=Math.min(STD_SOFT[n]||4000,sr*0.45); f.Q.value=0.5; f.connect(d); d=f; } drum('std',n,0.001,1,d); }
        finally { ctx=main; DV.tune=1; }
        jobs.push(oc.startRendering().then(b=>drumBank.set('std'+n+S+T,b)));
      }
    }
    for(const n of Object.keys(DNB_LEN)) for(const S of [0,1]) for(const T of [0,1]){   // dnb: two layers x two takes
      const oc=new OfflineAudioContext(1,Math.ceil(sr*DNB_LEN[n]),sr);
      ctx=oc; DNB.soft=S; DNB.take=T; try{ drum('dnb',n,0.001,1,oc.destination); } finally { ctx=main; DNB.soft=0; DNB.take=0; }
      jobs.push(oc.startRendering().then(b=>drumBank.set('dnb'+n+S+T,b)));
    }
  }catch(e){ ctx=main; return; }
  Promise.all(jobs).then(()=>{ if(ctx===main) drumBankReady=true; }).catch(()=>{});
}
const STD_SOFT={k:700,s:3600,p:3200,h:8600,o:8200,c:2600,t:900,l:650,y:6500,z:8200,b:7000,g:1400,w:2400,v:1700,q:1100,x:3200};   // low-pass of each drum's soft layer (Hz)
function bufHit(b,when,v,dest){
  const src=ctx.createBufferSource(); src.buffer=b;
  if(Math.abs(v-1)>1e-3){ const g=ctx.createGain(); g.gain.value=v; src.connect(g); g.connect(dest); } else src.connect(dest);
  src.start(when);
}
function playDrum(kit,n,when,v,dest,beat){
  if(kit==='dnb'&&DNB_LEN[n]){ dnbPlay(n,when,v,dest,beat); return; }
  if(kit==='chip'){ const b=drumBankReady&&drumBank.get('chip'+n); if(b) bufHit(b,when,v,dest); else drum(kit,n,when,v,dest); return; }
  // which take follows from the position in the song, so the same bar always sounds the same and repeats do not all use one sample
  let h=Math.round((beat||0)*16)|0; h=Math.imul(h^(h>>>3)^0x9E37,0x85EBCA6B); h^=h>>>13; h=Math.imul(h,0xC2B2AE35); h^=h>>>16;
  const T=h&1, hard=drumBankReady&&drumBank.get('std'+n+'0'+T), soft=hard&&drumBank.get('std'+n+'1'+T);
  if(!hard){ drum('std',n,when,v,dest); return; }
  v*=0.96+0.08*((h>>>8)&255)/255;                       // no drummer hits twice with exactly the same force (about ±0.35 dB)
  const x=!soft?1:clamp((v-0.45)/0.4,0,1);        // 1: hard layer only (normal hits and accents); 0: soft layer only (?? ghost notes)
  if(x>0.001) bufHit(hard,when,v*x,dest);
  if(x<0.999) bufHit(soft,when,v*(1-x),dest);
}
/* ---------- singing voice (歌声) ----------
   A voice track is sung as one line: OtoSing renders the whole track once into a mono buffer (about 200x faster than
   real time), and each note event plays its own slice of that buffer through the track's chain. Neighbouring slices
   cross-fade with complementary ramps over the same few milliseconds, so they add up to the original line whether a
   slice is scheduled live or sits in a pre-rendered chunk. A slice starts before its note where a phrase begins: the
   consonant (and the breath before it) sounds ahead of the beat so that the vowel lands on it. Pre-rendered chunks of a
   song with a voice track therefore start VOX_PRE seconds early (see renderChunk / playChunk). */
const OtoVoice=__OV, OtoSing=OtoVoice.OtoSing;      // 歌声の芯は、同じファイルの上にある OtoVoice のものを使う（2.0.0。それまでは、ここに丸ごと入っていた）
/* ---- 英語の歌詞（1.9.0）----
   歌詞の行の [ ] の中に、英語の音節を空白で区切って書く。1音節が音符1つ（OtoVoice の歌詞と同じ書き方）。
   音節＝頭の子音（いくつでも）＋母音1つ＋語末の子音（いくつでも）。母音のすぐ前の l r w j は「わたり」に、その前の1つが拍の子音に、
   さらに前（s など）は pre に入る。' % : は読みとばす。- は、前の音節を次の音符へ伸ばす（語末の子音と二重母音の滑りは、伸ばした最後の音符へ送る）。
   かなと同じ行に書ける（よぞらに [ SaI nIN ]）。【 】の出し方は、[ ] の中でも使える */
const EN_SY=['tS','dZ','eI','aI','oU','aU','OI'],EN_V={i:'i',I:'I',E:'E','{':'{',A:'A',O:'O',U:'U',u:'uw',V:'V','@':'@','3':'3',eI:'eI',aI:'aI',oU:'oU',aU:'aU',OI:'OI'},
  EN_C={p:'p',b:'b',t:'t',d:'d',k:'k',g:'g',s:'s',z:'z',h:'h',m:'m',n:'n',S:'sh',tS:'ch',dZ:'j',f:'f',v:'v',T:'T',D:'D',Z:'Z',N:'N','4':'r',l:'L',L:'L',r:'R',w:'W',j:'Y'},
  EN_G={L:'L',R:'R',W:'w',Y:'y'},EN_DIP={eI:1,aI:1,oU:1,aU:1,OI:1};
function enSyllable(tok,warn){
  const on=[],co=[];let v=null;
  for(let i=0;i<tok.length;i++){ const ch=tok[i]; if("'%:ˈˌ.,!?".includes(ch)) continue;
    let p=EN_SY.find(x=>tok.startsWith(x,i)); if(p) i++; else p=ch;
    if(EN_V[p]){ if(v){ warn.push({msg:'1つの音節に母音が2つあります（[ ] の中は、音節ごとに空白で区切ります。1音節が音符1つ）',near:tok}); return null; } v=EN_V[p]; }
    else if(EN_C[p]) (v?co:on).push(EN_C[p]);
    else { warn.push({msg:'[ ] の中に、知らない記号「'+ch+'」があります',near:tok}); return null; } }
  if(!v){ warn.push({msg:'音節に母音がありません（little は lI t@l のように、@ を入れます）',near:tok}); return null; }
  const m={c:'',g:'',v,ch:tok.replace(/['%:]/g,''),en:1};
  if(on.length&&EN_G[on[on.length-1]]) m.g=EN_G[on.pop()];
  if(on.length&&!EN_G[on[on.length-1]]) m.c=on.pop();
  if(on.length) m.pre=on;
  if((m.c==='p'||m.c==='t'||m.c==='k')&&!(m.pre&&m.pre[m.pre.length-1]==='s')) m.asp=1;     // 音節の頭の p t k は息をともなう（s のあとは、ともなわない）
  if(co.length) m.coda=co;
  return m;
}
// 歌詞の行 → 拍の並び（OtoSing.kana が返すものと同じ形。英語の音節は、かな「あ」「ー」の場所に、音節の中身を入れる）
function enLyric(text,warn){ const M=OtoVoice.lyric(text,warn); let i=0;      // [ ] の中から来た拍には、これまでどおり en の印をつける
  String(text).split(/\[([^\]]*)\]/).forEach((part,bx)=>{ const n=OtoVoice.lyric(bx%2?'['+part+']':part,[]).length; if(bx%2) for(let k=0;k<n;k++) if(M[i+k]) M[i+k].en=1; i+=n; });
  return M; }
// [ で始まる行が、英語の歌詞の行か（音符・休み・$名前・小節線・*回数 が1つもなく、母音のある音節が1つはある）
function enLine(s){
  if(s[0]!=='[') return false;
  const T=s.replace(/【[^】]*】/g,' ').replace(/[\[\]]/g,' ').split(/\s+/).filter(Boolean);
  if(!T.length||T.some(x=>/^[A-Ga-g][#b]?-?\d([:!?+^]|tr|$)/.test(x)||/^([-_.rR]:|[*$|\d])/.test(x)||/^[rR._]$/.test(x))) return false;
  return T.some(x=>!/^[-ー~]$/.test(x));
}
const VOX_INST={voice:'onna',voicem:'otoko',voiceh:'tenor',voicek:'kodomo'};
const VOX_PRE=0.45, VOX_XF=0.006, VOX_LEVEL=1.4;
const voxCache=new Map();
function voxBuffer(key,make){
  let buf=voxCache.get(key);
  if(!buf){ const pcm=make(); buf=new AudioBuffer({length:Math.max(1,pcm.length),numberOfChannels:1,sampleRate:OtoSing.SR}); buf.copyToChannel(pcm,0); voxCache.set(key,buf); if(voxCache.size>12) voxCache.delete(voxCache.keys().next().value); }
  else { voxCache.delete(key); voxCache.set(key,buf); }
  return buf;
}
// lyrics line of a voice track: one kana (or kana + small kana) per note, in the order the notes were written
function voxLyrics(t,text,i,err){
  const en=/[\[\/]/.test(text), W=[], T=en?enLyric(text,W):OtoSing.kana(text), q=t.unsung||(t.unsung=[]);
  for(const w of W) err(i,w.msg+(w.near?'：'+w.near:''));
  if(!T.length){ if(!W.length) err(i,en?'歌詞の行が読めません（かなか、[ ] の中の英語の音節で書きます）':'歌詞の行が読めません（かなで書きます）'); return; }
  if(T.length>q.length) err(i,en?`「${t.name}」の歌詞が、音符より${T.length-q.length}個多いです（音符1つに、かな1つか英語の1音節）`:`「${t.name}」の歌詞のかなが、音符より${T.length-q.length}個多いです（音符1つに、かな1つ）`);
  for(const m of T){ const ev=q.shift(); if(!ev) break; ev.ly=m; }
}
// render the track's line (once per song text) and give every event its slice [from, to, note start] in seconds of that buffer
function voxTrack(t){
  const vx=t.vox; if(!vx) return null;
  if(vx.done) return vx;
  vx.done=true;
  const sg=vx.song, spb=60/sg.tempo, evs=sg.events.filter(e=>e.track===t); if(!evs.length) return vx;
  const N=evs.map((e,i)=>{
    const nx=evs[i+1], t0=swingBeat(e.t,sg.swing)*spb, join=!!nx&&nx.t-(e.t+e.d)<1e-6, end=join?swingBeat(nx.t,sg.swing)*spb:t0+e.d*spb, B=e.bend;
    return {t:t0,dur:Math.max(0.03,end-t0),midi:Math.max(...e.notes)+12*t.oct+t.tr+(t.det||0)/100,m:e.ly||null,vel:e.vel,join,
      bend:B&&B.amt?{amt:B.amt,at:B.at*spb,dur:B.dur!=null?B.dur*spb:Math.max(0.01,(e.d-B.at)*spb)}:null,...(e.va||{})};
  });
  const o={voice:VOX_INST[t.inst],vib:t.vib!=null?t.vib:1,expr:t.expr!=null?t.expr:1,breath:t.breath!=null?t.breath:1,glide:t.glide||0,room:VOX_PRE-0.02,reg:t.reg!=null?t.reg:null,shout:t.shout||0,rough:t.rough!=null?t.rough:null,edge:t.edge||0,whisper:t.whisper||0,artic:t.artic!=null?t.artic:null,onset:t.onset!=null?t.onset:null,air:t.air||0}, r=x=>Math.round(x*1e4);
  const D0=t.as?null:t.inst==='voice'?{size:1.25}:t.inst==='voicek'?{size:1.45}:null;   // 2.1.0：楽器名だけの voice は 女（平均）、voicek は 子供。人が聴いて合わせた大きさ。それまでの音は as=onna、as=kodomo
  if(t.as||t.dims||D0){ const R=OtoVoice.singVoice(t.as||o.voice,Object.assign({},D0,t.dims)); o.voice=R.voice; for(const k in R.add) if(t[k]==null) o[k]=R.add[k]; }   // 声の名前・声の質 → 歌声の芯の設定（トラックに書いた設定が先）
  if(t.nat) o.nat={dip:t.nat,prep:t.nat};
  if(t.bvow) o.bvow=t.bvow; if(t.inhale!=null) o.inhale=t.inhale; if(t.batk) o.batk=t.batk; if(t.oldpuff) o.oldpuff=true;   // 息の雑音を通す母音、息を吸う音の大きさ（2.0.1）
  const key=JSON.stringify([o,N.map(n=>[n.cent,n.vib,n.vibRate,n.vibDelay,n.scoop,n.pc,r(n.t),r(n.dur),n.midi,n.m?n.m.ch+(n.m.q?'っ':'')+[n.m.reg,n.m.sh,n.m.ro,n.m.ed,n.m.flip,n.m.hic,n.m.wh].join('/')+JSON.stringify([n.m.c,n.m.g,n.m.v,n.m.pre,n.m.coda,n.m.asp,n.m.dg,n.m.nog]):'',n.vel,n.join?1:0,n.bend?[n.bend.amt,r(n.bend.at),r(n.bend.dur)]:0])]);
  vx.buf=voxBuffer(key,()=>OtoSing.singNotes(N,o));
  let prevEnd=0;
  evs.forEach((e,i)=>{
    const n=N[i], nx=N[i+1], tE=n.t+n.dur, pre=i&&N[i-1].join?0:Math.min(Math.max(0,n.t-prevEnd),VOX_PRE);
    const to=n.join?nx.t:(nx&&nx.t-tE<=VOX_PRE?tE:tE+0.04);
    e.vx=[n.t-pre,to,n.t]; prevEnd=tE;
  });
  return vx;
}
const voxPre=ev=>ev.vx?ev.vx[2]-ev.vx[0]:0;
function voxEvent(ev,when,dur,dest){
  const vx=voxTrack(ev.track); if(!vx||!vx.buf||!ev.vx) return;
  const [a,b,t0]=ev.vx, now=ctx.currentTime; let start=when-(t0-a), off=a;
  if(start<now){ off+=now-start; start=now; }                       // scheduled late: the start of the slice is lost
  const end=start+(b-off); if(!(end>start+0.004)) return;
  reserve(when);
  const src=ctx.createBufferSource(), g=ctx.createGain(); src.buffer=vx.buf; g.gain.value=0; src.connect(g); g.connect(dest);
  g.gain.setValueAtTime(0,start); g.gain.linearRampToValueAtTime(VOX_LEVEL,start+VOX_XF); g.gain.setValueAtTime(VOX_LEVEL,end); g.gain.linearRampToValueAtTime(0,end+VOX_XF);
  src.start(start,off,b-off+VOX_XF+0.002);
  active.push({end:when+dur,stop:end+VOX_XF,g,srcs:[src],owner:typeof OWNER==='undefined'?null:OWNER});
}
// one note on its own (auditioning a pitch, sound effects): sung on "a"
function voxNote(inst,m,when,dur,v,dest,t,vel){
  const who=VOX_INST[inst], vl=vel||1, vib=t&&t.vib!=null?t.vib:1;
  const buf=voxBuffer(['1',who,m.toFixed(2),dur.toFixed(3),vl.toFixed(2),vib].join('|'),()=>OtoSing.singNotes([{t:0,dur,midi:m,m:null,vel:vl,join:false}],{voice:who,vib,pad:0.01}));
  const g=G(dest,VOX_LEVEL*v/vl), src=ctx.createBufferSource(); src.buffer=buf; src.connect(g); src.start(when); if(collect) collect.push(src);
  return {g,stop:when+buf.duration+0.02};
}
/* ---------- guitars through a stepped amp: rockgtr (5 steps), distgtr (3 steps); amp= / steps= ----------
   The amp is a track effect, so the strings of a chord are added up first and distorted together: the root and the
   fifth of a power chord then make the sum and difference tones a real amp makes (the old distgtr distorted each note
   alone and could not). Its transfer curve is a staircase. steps=5 rounds the signal to five levels (-1, -1/2, 0, 1/2, 1): the
   outer steps clip, the inner ones keep a coarse picture of the waveform, and the middle one is a dead band that shuts
   the amp like a noise gate once the strings have died away. Before the curve the lows are thinned (so the steps
   follow the grind of the harmonics, not the boom of the fundamental), after it comes a speaker: lows back, a
   presence bump, and a steep roll-off above 5 kHz that takes the fizz off the step edges.
   distgtr is the same guitar through three levels (-1, 0, 1): a wider dead band and a squarer, brighter tone.
   The voice is the string before the amp, built so that the level arriving at the staircase is known:
     pick    a burst of band-passed noise and a tone that starts sharp (a hard-picked string is stretched, so it starts
             a few cents high) and bright (the upper partials are a second oscillator with its own, faster decay; it is
             tuned 5 cents above the body, which keeps the stepped waveform moving the way a stiff string does)
     ?       palm mute: the string dies in a tenth of a second and the amp gates it - the "chug"; ?? is tighter still
     chords  the strings are picked one after another (a few ms apart); notes faster than an eighth alternate down
             and up strokes, the up stroke running from the top string down and a little lighter
     slide   a note reached by glide (glide=) is barely picked: it starts softer and without the sharp start */
const GTR_STEPS={rockgtr:5,distgtr:3};
const gAmp=t=>t?(t.amp!=null?t.amp:GTR_STEPS[t.inst]?0.7:0):0;
const gSteps=t=>t.steps!=null?t.steps:GTR_STEPS[t.inst]||5;
const AMP_G0=0.8, AMP_GR=16, AMP_OUT=0.077;
function stepCurve(N){
  const key='st'+N; let c=curveCache.get(key); if(c) return c;
  const n=4096, W=0.1, sm=u=>u<=0?0:u>=1?1:u*u*(3-2*u); c=new Float32Array(n);
  if(!N){ for(let i=0;i<n;i++){ const x=i*2/(n-1)-1; c[i]=Math.tanh(2.2*x)/Math.tanh(2.2); } }   // steps=0: a smooth curve, for comparison
  else {
    // N levels from -1 to 1 and the N-1 thresholds between them; each step is a short smooth ramp, not a jump
    const th=[], h=2/(N-1), sp=N%2?2/(N-1):2/N;
    if(N%2){ const M=(N-1)/2; for(let j=-M+1;j<=M;j++) th.push([(j-0.5)/M,W*sp]); }
    else { const H=N/2; for(let k=-H+1;k<H;k++) th.push([k/H,k?W*sp:Math.max(W*sp,0.06)]); }   // an even count has no level at zero; a soft middle keeps silence silent
    for(let i=0;i<n;i++){ const x=i*2/(n-1)-1; let y=-1; for(const [a,w] of th) y+=h*sm((x-a)/w+0.5); c[i]=y; }
  }
  curveCache.set(key,c); return c;
}
// output gain: the level of a typical power chord after the curve is measured here, so amp= and steps= change the tone, not the loudness
function ampMakeup(N,G){
  const key='sm'+N+'_'+G.toFixed(3); let r=curveCache.get(key); if(r) return r;
  const c=stepCurve(N), n=c.length; let e=0;
  for(let i=0;i<2048;i++){
    const p=i/2048*4*Math.PI, x=clamp(G*0.26*(Math.sin(p)+0.45*Math.sin(2*p+0.3)+0.3*Math.sin(3*p+0.9)+0.8*Math.sin(1.5*p+0.5)+0.35*Math.sin(4.5*p+1.4)),-1,1);
    const y=c[Math.round((x+1)/2*(n-1))]; e+=y*y;
  }
  r=AMP_OUT/Math.sqrt(e/2048+1e-4); curveCache.set(key,r); return r;
}
function ampFx(t,link){
  const A=gAmp(t), N=gSteps(t), G=AMP_G0*Math.pow(AMP_GR,A);
  const bq=(type,f,Q,db)=>{ const b=ctx.createBiquadFilter(); b.type=type; b.frequency.value=f; if(Q!=null) b.Q.value=Q; if(db!=null) b.gain.value=db; return link(b); };
  bq('highpass',75,0.7); bq('lowshelf',250,null,-12);
  const pre=ctx.createGain(), ws=ctx.createWaveShaper(), post=ctx.createGain();
  pre.gain.value=G; ws.curve=stepCurve(N); ws.oversample=LITE?'2x':'4x'; post.gain.value=ampMakeup(N,G);
  link(pre); link(ws); link(post);
  bq('highpass',85,0.7); bq('lowshelf',130,null,2); bq('peaking',1600,0.7,6);
  bq('lowpass',4800,0.8); if(!LITE) bq('lowpass',5400,0.7);
}
const GT_T=[0.004,0.012,0.025,0.045,0.075,0.12,0.19,0.3,0.5,0.9,1.6,3,6];
// piecewise-linear automation of fn(seconds since t0), up to dur
function gtrCurve(p,t0,dur,fn){
  p.setValueAtTime(fn(0),t0);
  for(const x of GT_T){ if(x>=dur-0.002) break; p.linearRampToValueAtTime(fn(x),t0+x); }
  p.linearRampToValueAtTime(fn(dur),t0+dur);
}
let GSTR=null;   // which string of the stroke is being started (set by gtrEvent)
function gtrVoice(m,f,when,dur,dest,pb,t,vel){
  const S=GSTR||{n:1,up:false}, L=LITE, leg=!!(pb&&pb.g0);
  const mk=t&&t.mute!=null?t.mute:1, mu=vel<0.8?mk*(vel<0.4?1.3:1):0, m1=Math.min(1,mu);       // how far the palm is on the strings
  const bq=mu>0?0.7+0.3*(1-m1)*(clamp(vel-0.3,0,1.4)-0.7):clamp(vel-0.3,0,1.4);                // pick strength: a chug is picked like a plain note
  const A0=0.42*(0.6+0.57*bq)*(S.up?0.9:1)/Math.pow(S.n,0.3)*(1+0.12*m1);
  // the amp thins the lows before its staircase, so low strings are made louder (as heavier strings are): every pitch then drives the steps about equally
  const A=A0*Math.pow(10,0.6*(12/(1+(f/250)*(f/250))+10*Math.log10(1+Math.pow(75/f,4)))/20);
  const ta=leg?0.012:0.003, end=when+Math.max(dur,ta+0.004), rel=0.05;
  const s=0.75*(1-m1), td=mu>0?0.036*(mu>1?0.6:1)*Math.pow(110/f,0.25)*(1+1.2*(1-m1)):0.07, ts=6*Math.pow(220/f,0.3);
  const g=ctx.createGain(); g.gain.value=0; g.connect(dest);
  g.gain.setValueAtTime(0,when); g.gain.linearRampToValueAtTime(A,when+ta);
  gtrCurve(g.gain,when+ta,end-when-ta,x=>A*(s+(1-s)*Math.exp(-x/td))*Math.exp(-x/ts));
  g.gain.setTargetAtTime(0,end,rel/3);
  let stop=end+rel*2.4+0.02; if(m1>=1) stop=Math.min(stop,when+ta+td*8+0.02);
  // the pick stretches the string: the note starts sharp and settles in a few hundredths of a second
  const c=leg?0:clamp((5+20*bq*bq)*(mu>0?1.25:1)*(f<160?1.2:1),0,45), r=Math.pow(2,c/1200);
  const sharp=o=>{ if(c>0.5){ o.frequency.setValueAtTime(f*r,when); o.frequency.setTargetAtTime(f,when,0.028); } };
  const os=[];
  if(L){ const o=WO(W.gsL,f,when,stop,g); sharp(o); os.push(o); }
  else {
    const a=WO(W.gsA,f,when,stop,g), gb=ctx.createGain(); gb.connect(g);
    const h0=(leg?0.3:0.9+1.0*bq)*(1-0.3*m1), h1=(0.3+0.25*bq)*(1-0.85*m1), th=mu>0?0.016+0.03*(1-m1):0.05;
    gtrCurve(gb.gain,when,Math.min(end-when,0.5),x=>h1+h0*Math.exp(-x/th));
    const b=WO(W.gsB,f,when,stop,gb,5); sharp(a); sharp(b); os.push(a,b);
  }
  // pick noise: straight into the amp, not through the string's envelope
  const pk=(t&&t.pick!=null?t.pick:1)*(leg?0.35:1);
  if(pk>0){ const n=ctx.createBufferSource(); n.buffer=NB('gpick'); n.connect(G(dest,pk*0.8*A0*(0.5+0.9*bq)*(S.up?0.85:1)*(1+0.15*m1))); n.start(when); if(collect) collect.push(n); }
  if(S.n===1&&!mu&&!pb){
    // a held note: feedback (fb=) lets the octave above grow under the string, then vibrato
    const fb=t&&t.fb||0;
    if(fb>0&&dur>=0.8&&!L){ const gf=ctx.createGain(); gf.gain.value=0; gf.connect(g); gf.gain.setValueAtTime(0,when+0.35); gf.gain.linearRampToValueAtTime(fb*1.6,when+Math.min(dur,1.4)); os.push(O('sine',f*(vel>1.1?3:2),when+0.3,stop,gf)); }
    if(dur>=0.7) XVIB(os,when,end,{d0:.4,ramp:.35,cents:9,grow:1.3,rate:5.5});
  }
  return {g,stop};
}
function gtrEvent(ev,when,dur,dest,pb,t){
  const ns=ev.notes.slice().sort((a,b)=>a-b), n=ns.length, mu=ev.vel<0.8;
  const up=ev.d<0.4&&Math.round(ev.t/ev.d)%2===1, sp=n>1?(mu?0.003:ev.vel>1.1?0.004:0.006):0;
  try{
    ns.forEach((m,i)=>{ const k=up?n-1-i:i; GSTR={n,up}; voice(t.inst,m+12*t.oct+t.tr+(t.det||0)/100,when+k*sp,Math.max(0.03,dur-k*sp),ev.vel,dest,pb,t,ev.vel); });
  } finally { GSTR=null; }
}
function playEvent(s,ev,when,dur,mutedSet){
  const t=ev.track; if(mutedSet&&mutedSet.has(t.name)) return;
  if(s.live) liveTouch(s,when+dur+noteTail(ev)+LIVE_TAIL);
  const n=s.tracks.get(t.idx)||trackChain(s,t,false);
  if(t.vox){ voxEvent(ev,when,dur,n.input); return; }
  if(t.inst==='drums'){ for(const d of ev.notes) playDrum(t.kit,d,when,ev.vel,n.input,ev.t); }
  else {
    const sc=ev.vel/Math.sqrt(ev.notes.length);
    let pb=null;
    if(ev.bend||ev.glideFrom||ev.trill){
      const sb=dur/ev.d, B=ev.bend;
      pb={g0:ev.glideFrom||0,gt:Math.min(t.glide||0,dur),b:B?B.amt:0,bAt:B?B.at*sb:0,bDur:B?(B.dur!=null?B.dur*sb:Math.max(0.01,dur-B.at*sb)):0,tr:ev.trill||0,trDur:dur};
    }
    if(GTR_STEPS[t.inst]) gtrEvent(ev,when,dur,n.input,pb,t);
    else for(const m of ev.notes) voice(t.inst,m+12*t.oct+t.tr+(t.det||0)/100,when,dur,sc,n.input,pb,t,ev.vel);
  }
}

/* ====================================================================================================================
   Library layer: players, shared chunk cache, one-shot notes, configuration.
   The engine above is the studio's engine, unchanged apart from three hooks (master gain, output node, voice owner).
   Several players can sound at once (BGM cross-fades, a jingle over the BGM); each has its own session and scheduler
   state, and they share one AudioContext, one timer and one cache of pre-rendered chunks.
   ==================================================================================================================== */
const VERSION='2.1.0';
const CFG={context:null,cacheMB:160};
let DEST=null, OWN_CTX=true, masterGain=null, masterVol=1, OWNER=null;
const players=new Set();                       // players whose scheduler is running
const isHidden=()=>typeof document!=='undefined'&&document.hidden;
// how far ahead notes are handed to the audio thread; a hidden tab gets a long window because its timers are throttled
const ahead=()=>isHidden()?2.0:(LITE?0.4:0.3);
const lowerBound=(arr,x)=>{ let lo=0,hi=arr.length; while(lo<hi){ const m=(lo+hi)>>1; if(arr[m].t<x) lo=m+1; else hi=m; } return lo; };
// absolute beat since start -> position in the song; after the first pass, playback wraps to the end of the intro
const songPos=(sg,b)=>{ const L=sg.length, I=sg.intro||0; if(!L) return 0; if(b<L) return Math.max(0,b); return I+((b-L)%(L-I)); };

function killOwner(o){
  if(!ctx) return; const t=ctx.currentTime, keep=[];
  for(const x of active){ if(x.owner===o) killVoice(x,t); else keep.push(x); }
  active=keep;
}
function onWorkletReady(){ for(const p of players) if(p.sess&&p.sess.rev&&p.sess.rev.wantWorklet) swapReverb(p.sess,p.song); }

/* ---------- audio context ---------- */
let unlockInstalled=false;
function resumeCtx(){ if(ctx&&ctx.state!=='running'&&ctx.state!=='closed'){ try{ const p=ctx.resume(); if(p&&p.catch) p.catch(()=>{}); return p; }catch(e){} } return Promise.resolve(); }
function installUnlock(){
  if(unlockInstalled||typeof document==='undefined') return; unlockInstalled=true;
  // browsers only start audio after a user gesture; these stay installed because mobile browsers suspend audio again
  for(const ev of ['pointerdown','keydown','touchend']) document.addEventListener(ev,resumeCtx,{capture:true,passive:true});
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden&&players.size) resumeCtx(); });
}
function ensureAudio(){
  if(!ctx){
    let c=CFG.context;
    if(c) OWN_CTX=false;
    else {
      const AC=window.AudioContext||window.webkitAudioContext, tries=[];
      if(LITE) tries.push({latencyHint:'playback',sampleRate:24000});
      tries.push({latencyHint:'playback'},null);
      for(const o of tries){ try{ c=o?new AC(o):new AC(); break; }catch(e){} }
      OWN_CTX=true;
    }
    audioInit(c); fxSess=null; installUnlock();
  }
  resumeCtx();
  return ctx;
}

/* ---------- one timer for every player (a Worker keeps ticking when the main thread is busy or the tab is hidden) ---------- */
let clock=null, timer=null;
function tickAll(){ for(const p of [...players]){ try{ p._tick(); }catch(e){ if(!tickAll.warned){ tickAll.warned=true; console.error('[TextScore]',e); } } } }
function clockSync(){
  if(players.size){
    if(clock===null){
      try{
        const url=URL.createObjectURL(new Blob(['let id=null;onmessage=e=>{clearInterval(id);id=null;if(e.data>0)id=setInterval(()=>postMessage(0),e.data);};'],{type:'text/javascript'}));
        clock=new Worker(url); clock.onmessage=tickAll; clock.onerror=()=>{ clock=false; clockSync(); };
      }catch(e){ clock=false; }
    }
    if(clock) clock.postMessage(25); else if(!timer) timer=setInterval(tickAll,25);
  } else { if(clock) clock.postMessage(0); clearInterval(timer); timer=null; }
}

/* ---------- pre-rendered chunks, shared by all players and kept across songs (least recently used songs go first) ---------- */
const CACHE=new Map(); let cacheTotal=0;
const chunkBytes=b=>b.length*b.numberOfChannels*4;
function cacheEntry(key){
  let e=CACHE.get(key); if(!e) e={key,chunks:new Map(),bytes:0,users:0};
  CACHE.delete(key); CACHE.set(key,e); return e;
}
function cacheDrop(e,k){ const b=e.chunks.get(k); if(b){ e.chunks.delete(k); e.bytes-=chunkBytes(b); cacheTotal-=chunkBytes(b); } }
function cacheTrim(keep){
  const max=CFG.cacheMB*1048576;
  for(const e of [...CACHE.values()]){
    if(cacheTotal<=max) break;
    if(e===keep||e.users>0) continue;
    for(const k of [...e.chunks.keys()]) cacheDrop(e,k);
    CACHE.delete(e.key);
  }
}
function cacheAdd(e,k,buf){ if(e.chunks.has(k)) return; e.chunks.set(k,buf); e.bytes+=chunkBytes(buf); cacheTotal+=chunkBytes(buf); cacheTrim(e); }
function cacheClear(){ for(const e of CACHE.values()) e.chunks.clear(), e.bytes=0; CACHE.clear(); cacheTotal=0; }
const cacheKey=(text,muted)=>[text,[...muted].sort().join(','),LITE,ctx?ctx.sampleRate:0,bakeSig()].join('\u0001');   // the reverb is part of a rendered chunk

// build plucked-string tones before playback so the first bars don't stall the scheduler
function prewarm(sg){
  for(const t of sg.tracks) if(t.vox) voxTrack(t);      // 歌声は、鳴らす前に1曲ぶん作っておく
  for(const t of sg.tracks){
    if(t.inst!=='guitar'&&t.inst!=='harp') continue;
    const seen=new Set();
    for(const ev of sg.events) if(ev.track===t) for(const m of ev.notes){ const p=m+12*t.oct+t.tr+(t.det||0)/100; if(!seen.has(p)){ seen.add(p); ks(p,t.inst); } }
  }
}

/* ---------- Player ---------- */
class Player{
  constructor(opts={}){
    this.text=''; this.song=parse(''); this.muted=new Set();
    this.volume=opts.volume!=null?+opts.volume:1;
    this.loop=opts.loop!=null?opts.loop:true;         // true: forever, false: once, n: n passes of the loop
    this.fadeIn=+opts.fadeIn||0;
    this.playing=false; this.paused=false; this.stopping=false;
    this.sess=null; this.out=null; this.t0=0; this.cursor=0; this.late=0;
    this._lc=0; this._loopBase=0; this._resume=null; this._haltTimer=null; this._ls={};
    this.pr={plan:[],entry:null,gen:0,decided:new Map(),busy:false,used:0,live:0,late:0,off:false,timer:null};
    for(const k of ['end','loop']){ const f=opts['on'+k[0].toUpperCase()+k.slice(1)]; if(typeof f==='function') this.on(k,f); }
    if(opts.mute) for(const n of [].concat(opts.mute)) this.muted.add(n);
  }
  on(name,fn){ (this._ls[name]||(this._ls[name]=[])).push(fn); return this; }
  off(name,fn){ const l=this._ls[name]; if(l){ const k=l.indexOf(fn); if(k>=0) l.splice(k,1); } return this; }
  _emit(name,arg){ for(const f of (this._ls[name]||[]).slice()){ try{ f(arg,this); }catch(e){ console.error('[TextScore]',e); } } }

  // text: a score in the text format. Parse problems are in .errors / .warnings (what could be read is still played)
  load(text){
    const was=this.playing&&!this.stopping;
    if(this.playing) this._halt(0.03);
    this.paused=false; this._resume=null;
    this.text=String(text==null?'':text); this.song=parse(this.text);
    if(was) this.play();
    return this;
  }
  get errors(){ return this.song.errors; }
  get warnings(){ return this.song.warns; }
  get title(){ return this.song.title; }
  get tracks(){ return this.song.tracks.map(t=>({name:t.name,inst:t.inst,muted:this.muted.has(t.name)})); }
  get duration(){ const sg=this.song, s=60/sg.tempo; return {total:sg.length*s,intro:(sg.intro||0)*s,loop:(sg.length-(sg.intro||0))*s,bars:sg.length/sg.meter}; }

  _spb(){ return 60/this.song.tempo; }
  _curBeat(){ return this.playing&&ctx?(ctx.currentTime-this.t0)/this._spb():0; }
  _loopsAt(b){ const sg=this.song, L=sg.length, P=L-(sg.intro||0); return b<L?0:1+Math.floor((b-L)/P+1e-9); }
  _endBeat(){
    if(this.loop===true) return Infinity;
    const sg=this.song, L=sg.length, P=L-(sg.intro||0), n=Math.max(1,(this.loop===false?1:Math.floor(+this.loop)||1)-this._loopBase);
    return L+P*(n-1);
  }
  // where playback is now: beat (in the song, from 0), bar and beatInBar (from 1), seconds, loop (passes completed)
  get position(){
    const sg=this.song;
    let p=0, lp=0;
    if(this.playing&&ctx){ const b=Math.max(0,this._curBeat()); p=songPos(sg,b); lp=this._loopsAt(b)+this._loopBase; }
    else if(this.paused&&this._resume){ p=this._resume.pos; lp=this._resume.loops; }
    return {beat:p,bar:Math.floor(p/sg.meter+1e-9)+1,beatInBar:p%sg.meter+1,seconds:p*60/sg.tempo,loop:lp};
  }
  get stats(){ const pr=this.pr; return {late:this.late,chunks:pr.entry?pr.entry.chunks.size:0,chunksTotal:pr.plan.length,chunksPlayed:pr.used,chunksLive:pr.live,prerenderOff:pr.off}; }

  play(opts={}){
    if(this.playing) this._halt(0.03);
    if(opts.loop!=null) this.loop=opts.loop;
    if(opts.volume!=null) this.volume=+opts.volume;
    if(opts.fadeIn!=null) this.fadeIn=+opts.fadeIn||0;
    this.paused=false; this._resume=null; this._loopBase=0;
    return this._start(Math.max(0,+opts.from||0),this.fadeIn);
  }
  _start(from,fadeIn){
    ensureAudio();
    const sg=this.song; if(!sg.length) return this;
    if(from>=sg.length) from=0;
    prewarm(sg);
    const s=makeSession(sg), out=ctx.createGain(), now=ctx.currentTime;
    s.bus.disconnect(); s.bus.connect(out); out.connect(outIn);
    if(fadeIn>0){ out.gain.value=0; out.gain.setValueAtTime(0,now+0.1); out.gain.linearRampToValueAtTime(this.volume,now+0.1+fadeIn); }
    else out.gain.value=this.volume;
    this.sess=s; this.out=out;
    for(const t of sg.tracks) trackChain(s,t,this.muted.has(t.name));
    this._prReset();
    this.t0=now+0.12-from*this._spb(); this.cursor=from; this.playing=true; this.stopping=false; this.late=0; this._lc=0;
    players.add(this); clockSync(); this._tick();
    if(PRERENDER){ clearTimeout(this.pr.timer); this._prLoop(this.pr.gen); }
    return this;
  }
  // stop({fade: seconds}); the music keeps running under the fade
  stop(opts={}){
    const fade=Math.max(0,+opts.fade||0);
    this.paused=false; this._resume=null;
    if(!this.playing) return this;
    if(fade>0.08){
      if(this.stopping) return this;
      const now=ctx.currentTime, g=this.out.gain;
      try{ g.cancelScheduledValues(now); g.setValueAtTime(g.value,now); g.linearRampToValueAtTime(0,now+fade); }catch(e){}
      this.stopping=true; clearTimeout(this._haltTimer);
      this._haltTimer=setTimeout(()=>{ if(this.stopping) this._halt(0.03); },fade*1000);
    } else this._halt(0.03);
    return this;
  }
  pause(){
    if(!this.playing||this.stopping) return this;
    const b=Math.max(0,this._curBeat());
    this._resume={pos:songPos(this.song,b),loops:this._loopsAt(b)+this._loopBase};
    this._halt(0.03); this.paused=true;
    return this;
  }
  resume(){
    if(!this.paused||!this._resume) return this;
    const r=this._resume; this.paused=false; this._resume=null; this._loopBase=r.loops;
    return this._start(r.pos,0);
  }
  setVolume(v,ramp=0.05){
    this.volume=Math.max(0,+v||0);
    if(this.out&&!this.stopping){ const now=ctx.currentTime, g=this.out.gain; try{ g.cancelScheduledValues(now); g.setValueAtTime(g.value,now); g.linearRampToValueAtTime(this.volume,now+Math.max(0.01,ramp)); }catch(e){} }
    return this;
  }
  // mute('drums'), mute('drums',false), mute(['pad','bass'])
  mute(names,on=true){
    for(const n of [].concat(names)){ if(on) this.muted.add(n); else this.muted.delete(n); }
    if(this.sess){ for(const t of this.song.tracks) trackChain(this.sess,t,this.muted.has(t.name)); this._prInvalidate(); }
    return this;
  }

  _release(){ const pr=this.pr; pr.gen++; clearTimeout(pr.timer); if(pr.entry){ pr.entry.users--; if(!pr.entry.chunks.size&&pr.entry.users<=0) CACHE.delete(pr.entry.key); pr.entry=null; } }
  _dispose(s,out,delay){
    setTimeout(()=>{ for(const n of s.tracks.values()) stopLfos(n); try{ s.bus.disconnect(); s.revIn.disconnect(); out.disconnect(); }catch(e){} },delay);
  }
  _halt(tc){
    clearTimeout(this._haltTimer); this._haltTimer=null;
    const s=this.sess, out=this.out;
    this.playing=false; this.stopping=false; players.delete(this); clockSync(); this._release();
    this.sess=null; this.out=null;
    if(!s) return;
    const now=ctx.currentTime;
    killOwner(s);
    for(const c of s.chunkSrcs){ try{ c.g.gain.setTargetAtTime(0,now,0.02); c.src.stop(now+0.15); }catch(e){} }
    s.chunkSrcs.length=0;
    try{ out.gain.cancelScheduledValues(now); out.gain.setTargetAtTime(0,now,tc); }catch(e){}
    this._dispose(s,out,300);
  }
  // a song played a set number of times has ended: let the last notes ring, then free the session
  _finish(){
    const s=this.sess, out=this.out;
    this.playing=false; players.delete(this); clockSync(); this._release();
    this.sess=null; this.out=null;
    setTimeout(()=>killOwner(s),8000); this._dispose(s,out,8300);
    this._emit('end');
  }

  /* pre-render state: chunks cached by plan index for the current song text / mutes / mode */
  _prReset(){
    const pr=this.pr; pr.gen++; pr.decided.clear(); pr.plan=chunkPlan(this.song);
    const k=cacheKey(this.text,this.muted);
    if(!pr.entry||pr.entry.key!==k){
      if(pr.entry){ pr.entry.users--; if(!pr.entry.chunks.size&&pr.entry.users<=0) CACHE.delete(pr.entry.key); }
      pr.entry=cacheEntry(k); pr.entry.users++; pr.late=0; pr.off=false;
    }
  }
  // cancel scheduled chunks after a mute change: fade them out and hand their remaining notes to the live scheduler
  _prCancel(){
    const sess=this.sess; if(!sess) return;
    const sg=this.song, now=ctx.currentTime, s=this._spb(), evs=sg.events;
    OWNER=sess;
    try{
      for(const c of sess.chunkSrcs.slice()){
        try{ c.g.gain.setTargetAtTime(0,now,0.015); c.src.stop(now+0.12); }catch(e){}
        for(let i=lowerBound(evs,c.s-1e-9); i<evs.length&&evs[i].t<c.e-1e-9; i++){
          const ev=evs[i], abs=c.base+ev.t, w=this.t0+(c.base+swingBeat(ev.t,sg.swing))*s;
          if(w>=now&&abs<this.cursor-1e-9) playEvent(sess,ev,w,ev.d*s,this.muted);
        }
      }
    } finally { OWNER=null; }
    sess.chunkSrcs.length=0;
  }
  _prInvalidate(){
    const pr=this.pr, was=(pr.entry&&pr.entry.chunks.size>0)||(this.sess&&this.sess.chunkSrcs.length>0);
    this._prReset();
    if(this.playing&&this.sess) this._prCancel();
    clearTimeout(pr.timer);
    if(this.playing&&PRERENDER) pr.timer=setTimeout(()=>this._prLoop(pr.gen),was?900:300);
  }
  // which chunk to render next: the first uncached one in playing order that can still be ready in time
  _prNext(){
    const pr=this.pr, P=pr.plan, sg=this.song, cache=pr.entry.chunks; if(!P.length) return -1;
    const I=sg.intro||0, s=this._spb(), pos=songPos(sg,this._curBeat());
    let loopStart=P.findIndex(c=>c.s>=I-1e-9); if(loopStart<0) loopStart=0;
    let k=P.findIndex(c=>pos<c.e-1e-9); if(k<0) k=loopStart;
    let t=(P[k].s-pos)*s;                // seconds until chunk k starts
    const seen=new Set();
    for(let n=0;n<P.length+1;n++){
      if(!seen.has(k)){ seen.add(k); if(!cache.has(k)&&t>0.45) return k; }
      t+=(P[k].e-P[k].s)*s; k++; if(k>=P.length) k=loopStart;
    }
    // nothing urgent: also keep the opening chunks, so playing the song again starts from rendered audio
    if(pr.entry.bytes<prBudget()*0.8) for(let i=0;i<P.length;i++) if(!cache.has(i)) return i;
    return -1;
  }
  _prEvict(){
    const pr=this.pr, e=pr.entry, sg=this.song; if(e.bytes<=prBudget()) return;
    const pos=songPos(sg,this._curBeat());
    // drop chunks that were just played (they come back last)
    const ks=[...e.chunks.keys()].sort((a,b)=>{ const da=(pr.plan[a].s-pos+sg.length)%sg.length, db=(pr.plan[b].s-pos+sg.length)%sg.length; return db-da; });
    for(const k of ks){ if(e.bytes<=prBudget()) break; cacheDrop(e,k); }
  }
  async _prLoop(gen){
    const pr=this.pr;
    if(pr.busy||!PRERENDER||pr.off) return;
    pr.busy=true;
    try{
      while(pr.gen===gen&&this.playing&&!pr.off){
        const k=this._prNext();
        if(k<0){ await new Promise(r=>setTimeout(r,400)); continue; }
        const sg=this.song, e=pr.entry, r=await renderChunk(sg,pr.plan[k],new Set(this.muted));
        if(pr.gen!==gen||sg!==this.song) break;
        cacheAdd(e,k,r.buf); this._prEvict();
        if(r.ms>r.sec*1000*0.9){ pr.late++; if(pr.late>=3) pr.off=true; }   // this device renders slower than real time
        await new Promise(r=>setTimeout(r,0));
      }
    }catch(e){ pr.off=true; }
    pr.busy=false;
    if(pr.gen!==gen&&this.playing&&PRERENDER){ clearTimeout(pr.timer); pr.timer=setTimeout(()=>this._prLoop(pr.gen),300); }
  }
  // decide for each chunk the first time the scheduler reaches it: play the rendered buffer, or schedule its notes live
  _prDecide(base,ci,a,s){
    const pr=this.pr, key=base+'|'+ci; let d=pr.decided.get(key);
    if(d) return d;
    const c=pr.plan[ci], buf=pr.entry.chunks.get(ci), when=this.t0+(base+c.s)*s;
    if(PRERENDER&&buf&&base+c.s>=a-1e-9&&when>=ctx.currentTime+0.005){ playChunk(this.sess,buf,when,{base,s:c.s,e:c.e}); d='chunk'; pr.used++; }
    else { d='live'; pr.live++; }
    pr.decided.set(key,d);
    if(pr.decided.size>256){ const k0=pr.decided.keys().next().value; pr.decided.delete(k0); }
    return d;
  }
  _tick(){
    const sg=this.song, L=sg.length, sess=this.sess, pr=this.pr; if(!L||!sess||!this.playing) return;
    const s=this._spb(), now=ctx.currentTime, end=this._endBeat(), hb=Math.min((now+ahead()-this.t0)/s,end), evs=sg.events; let guard=0;
    if((hb-this.cursor)*s>ahead()+2.5) this.cursor=Math.min((now-this.t0)/s,end); // after sleep or a long stall, skip ahead instead of firing every missed note at once
    OWNER=sess;
    try{
      while(this.cursor<hb-1e-9 && guard++<64){
        const cursor=this.cursor, I=(sg.intro>0&&sg.intro<L)?sg.intro:0, P=L-I;
        const base=cursor<L-1e-9?0:L+Math.floor((cursor-L)/P+1e-9)*P-I, a=cursor-base, b=Math.min(hb-base,L);
        for(let i=lowerBound(evs,a-1e-9); i<evs.length && evs[i].t<b-1e-9; i++){
          const ev=evs[i];
          if(pr.plan.length&&ev.ci!=null&&this._prDecide(base,ev.ci,a+base,s)==='chunk') continue;
          const w=this.t0+(base+swingBeat(ev.t,sg.swing))*s;
          if(w<now-0.01 && !isHidden()) this.late++;
          playEvent(sess,ev,Math.max(w,now),ev.d*s,this.muted);
        }
        if(pr.plan.length) for(const [ci,c] of pr.plan.entries()) if(c.s>=a-1e-9&&c.s<b-1e-9) this._prDecide(base,ci,a+base,s);
        this.cursor=base+b;
      }
    } finally { OWNER=null; }
    const cb=(now-this.t0)/s;
    if(cb>=end-1e-6){ this._finish(); return; }
    const lc=this._loopsAt(cb);
    if(lc>this._lc){ this._lc=lc; this._emit('loop',lc+this._loopBase); }
  }
}

/* ---------- conveniences ---------- */
function play(text,opts={}){ return new Player(opts).load(text).play({from:opts.from}); }

// one background-music slot with cross-fade: bgm(text) switches to that song, bgm(null) stops; the same text again is a no-op
let bgmCur=null;
function bgm(text,opts={}){
  const fade=opts.fade!=null?Math.max(0,+opts.fade):1, prev=bgmCur&&bgmCur.playing&&!bgmCur.stopping?bgmCur:null;
  if(text==null){ if(bgmCur) bgmCur.stop({fade}); bgmCur=null; return null; }
  text=String(text);
  if(prev&&prev.text===text){ if(opts.volume!=null) prev.setVolume(opts.volume,Math.max(0.05,fade)); return prev; }
  if(bgmCur) bgmCur.stop({fade});
  const o=Object.assign({loop:true},opts); if(o.fadeIn==null) o.fadeIn=prev?fade:0;
  bgmCur=new Player(o).load(text).play({from:opts.from});
  return bgmCur;
}
function stopAll(opts={}){ for(const p of [...players]) p.stop(opts); bgmCur=null; }

// render every chunk of a song ahead of time, so that it starts from rendered audio (resolves to the number of chunks)
async function preload(text,opts={}){
  ensureAudio();
  text=String(text); const sg=parse(text), plan=chunkPlan(sg), muted=new Set(opts.mute?[].concat(opts.mute):[]);
  if(!sg.length||!PRERENDER) return 0;
  const e=cacheEntry(cacheKey(text,muted)); e.users++;
  try{
    for(let k=0;k<plan.length;k++){
      if(e.chunks.has(k)) continue;
      if(e.bytes>prBudget()*0.8) break;          // long songs: the rest is rendered while playing
      const r=await renderChunk(sg,plan[k],muted);
      cacheAdd(e,k,r.buf);
      await new Promise(r=>setTimeout(r,0));
    }
  } finally { e.users--; }
  return e.chunks.size;
}

/* ---------- 曲まるごとの書き出し（1.9.0） ----------
   render(text, {sampleRate, mute, onProgress}) → Promise<AudioBuffer>（2ch）。曲を1回ぶん、頭から終わりまで（前奏も1回）。
   ライブ再生と同じ部品を使う：チャンクを焼いて（残響は焼きこみ）並べ、エコー → 出口（コンプレッサー → リミッター → 0.72倍）を
   OfflineAudioContext で通す。全体の音量（masterVolume）と、Player の音量は入れない。エコーと残響の余韻のあと、音が消えた所で切る。
   sampleRate を書くと、その標本化周波数で返す（書かなければ、音声コンテキストと同じ）。焼いたチャンクは、再生用のものを使い回す */
async function render(text,o={}){
  ensureAudio();
  text=String(text); const sg=parse(text);
  if(!sg.length) throw new Error('TextScore.render: 音符がありません');
  const plan=chunkPlan(sg), muted=new Set(o.mute?[].concat(o.mute):[]), spb=60/sg.tempo, sr=ctx.sampleRate;
  const rate=o.sampleRate?Math.max(8000,Math.min(192000,Math.round(+o.sampleRate))):sr, dly=Math.min(3.9,sg.delay*spb);
  const useEcho=sg.tracks.some(t=>(t.dly||0)>0&&!muted.has(t.name)), echoTail=useEcho?Math.min(12,20*dly):0;
  const n=Math.ceil((sg.length*spb+7.5+4.5+echoTail)*sr);
  const src=new AudioBuffer({length:n,numberOfChannels:useEcho?3:2,sampleRate:sr}), CH=[0,1,2].slice(0,src.numberOfChannels).map(c=>src.getChannelData(c));
  const e=PRERENDER?cacheEntry(cacheKey(text,muted)):null; if(e) e.users++;
  let last=0;
  try{
    for(let k=0;k<plan.length;k++){
      let b=e&&e.chunks.get(k);
      if(!b){ b=(await renderChunk(sg,plan[k],muted)).buf; if(e&&e.bytes<prBudget()*0.8) cacheAdd(e,k,b); }
      const off=Math.round((plan[k].s*spb-(b._pre||0))*sr), nc=b.numberOfChannels;
      const map=nc===2?[0,1]:nc===3?[0,1,2]:[0,1,-1,2];            // 4ch（残響を焼かない設定）は使われていない。来たら、残響の送りを捨てる
      for(let c=0;c<nc;c++){
        const to=map[c]; if(to<0||!CH[to]) continue;
        const d=b.getChannelData(c), dst=CH[to], i0=Math.max(0,-off), i1=Math.min(d.length,n-off);
        for(let i=i0;i<i1;i++) dst[off+i]+=d[i];
        if(off+i1>last) last=off+i1;
      }
      if(o.onProgress){ try{ o.onProgress(k+1,plan.length); }catch(err){} }
      await new Promise(r=>setTimeout(r,0));
    }
  } finally { if(e) e.users--; }
  // エコーと出口：ライブ再生（makeSession と audioInit）と同じつなぎ方・同じ値
  const len=Math.min(n,last+Math.ceil((echoTail+0.5)*sr)), N=Math.ceil(len*rate/sr);
  const oc=new OfflineAudioContext(2,N,rate), s=oc.createBufferSource(); s.buffer=src;
  const inp=oc.createGain(); inp.channelCount=src.numberOfChannels; inp.channelCountMode='explicit'; inp.channelInterpretation='discrete';
  const sp=oc.createChannelSplitter(src.numberOfChannels), mg=oc.createChannelMerger(2), bus=oc.createGain(); bus.gain.value=0.8;
  s.connect(inp); inp.connect(sp); sp.connect(mg,0,0); sp.connect(mg,1,1); mg.connect(bus);
  if(useEcho){
    const dL=oc.createDelay(4), dR=oc.createDelay(4); dL.delayTime.value=dly; dR.delayTime.value=dly;
    const fb=oc.createGain(); fb.gain.value=0.38; const lp=oc.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=3200;
    const pl=oc.createStereoPanner(); pl.pan.value=-0.7; const pr=oc.createStereoPanner(); pr.pan.value=0.7; const dg=oc.createGain(); dg.gain.value=0.7;
    const dIn=oc.createGain(); dIn.channelCount=1; dIn.channelCountMode='explicit'; sp.connect(dIn,2);
    dIn.connect(dL); dL.connect(pl); dL.connect(dR); dR.connect(pr); dR.connect(lp); lp.connect(fb); fb.connect(dL); pl.connect(dg); pr.connect(dg); dg.connect(bus);
  }
  const comp=oc.createDynamicsCompressor(); comp.threshold.value=-16; comp.knee.value=8; comp.ratio.value=3; comp.attack.value=0.008; comp.release.value=0.25;
  const lim=oc.createDynamicsCompressor(); lim.threshold.value=-3; lim.knee.value=0; lim.ratio.value=20; lim.attack.value=0.002; lim.release.value=0.1;
  const out=oc.createGain(); out.gain.value=0.72; bus.connect(comp); comp.connect(lim); lim.connect(out); out.connect(oc.destination);
  s.start(0);
  const r=await oc.startRendering();
  // 曲の終わりより後ろで、音が −80dB より小さくなった所で切る（0.03秒で消す）
  const A=r.getChannelData(0), B=r.getChannelData(1), minN=Math.ceil(sg.length*spb*rate); let end=minN;
  for(let i=r.length-1;i>=minN;i--) if(A[i]>1e-4||A[i]<-1e-4||B[i]>1e-4||B[i]<-1e-4){ end=i+1; break; }
  const fade=Math.round(0.03*rate), m=Math.min(r.length,end+fade);
  if(m>=r.length) return r;
  const res=new AudioBuffer({length:m,numberOfChannels:2,sampleRate:rate});
  for(let c=0;c<2;c++){ const d=r.getChannelData(c).subarray(0,m); for(let i=0;i<fade&&end+i<m;i++) d[end+i]*=1-i/fade; res.copyToChannel(d,c); }
  return res;
}

/* ---------- single notes and drum hits (sound effects, UI sounds) ---------- */
let fxSess=null;
function fxTrack(inst,o){
  ensureAudio();
  if(!fxSess){ fxSess=makeSession({reverb:2.2,delay:0.75,tempo:120}); }
  const pan=Math.round(clamp(+o.pan||0,-1,1)*4)/4, rev=Math.round(clamp(o.rev!=null?+o.rev:0.2,0,1)*10)/10, kit=o.kit||'std';
  const key=[inst,pan,rev,kit].join('|');
  let n=fxSess.tracks.get(key);
  if(!n){
    if(fxSess.tracks.size>=48){ const k0=fxSess.tracks.keys().next().value, old=fxSess.tracks.get(k0); fxSess.tracks.delete(k0); setTimeout(()=>{ stopLfos(old); try{ old.pan.disconnect(); }catch(e){} },8000); }
    n=trackChain(fxSess,{idx:key,name:key,inst,vol:0.8,pan,rev,dly:0,cut:0,oct:0,tr:0,kit},false);
  }
  return n;
}
// note('bell','C6'), note('piano',['C4','E4','G4'],{dur:1}), note('violin',69,{dur:0.8,vel:1.3,delay:0.2})
function note(inst,pitch,o={}){
  if(inst==="drums") return drumHit(pitch,o);
  if(!INSTRUMENTS[inst]) throw new Error('TextScore.note: unknown instrument "'+inst+'"');
  const n=fxTrack(inst,o), dur=Math.max(0.02,o.dur!=null?+o.dur:0.3), vel=o.vel!=null?+o.vel:1, vol=(o.vol!=null?+o.vol:0.8)/0.8;
  const ms=[].concat(pitch).map(p=>{ const m=typeof p==='number'?p:noteToMidi(String(p)); if(m==null||!isFinite(m)) throw new Error('TextScore.note: bad pitch "'+p+'"'); return m; });
  const w=ctx.currentTime+0.02+Math.max(0,+o.delay||0), sc=vel*vol/Math.sqrt(ms.length);
  liveTouch(fxSess,w+dur+(REL_TAIL[inst]||0.7)+LIVE_TAIL);
  OWNER=fxSess;
  try{ for(const m of ms) voice(inst,m,w,dur,sc,n.input,null,null,vel); } finally { OWNER=null; }
}
// drum('k'), drum('s',{kit:'dnb',vel:0.5}), drum(['k','y'])
function drumHit(names,o={}){
  const kit=o.kit||'std', n=fxTrack('drums',o), vel=(o.vel!=null?+o.vel:1), vol=(o.vol!=null?+o.vol:0.8)/0.8;
  const w=ctx.currentTime+0.02+Math.max(0,+o.delay||0);
  liveTouch(fxSess,w+3+LIVE_TAIL);
  for(const d of [].concat(names)){
    if(!DRUM_NAMES[d]) throw new Error('TextScore.drum: unknown drum "'+d+'"');
    playDrum(kit,d,w,vel*vol,n.input,0);
  }
}

/* ---------- configuration ---------- */
function setMasterVolume(v){ masterVol=Math.max(0,+v||0); if(masterGain&&ctx) masterGain.gain.setTargetAtTime(0.72*masterVol,ctx.currentTime,0.02); }
function setLite(on){
  on=!!on; if(on===LITE) return;
  if(ctx&&!OWN_CTX) throw new Error('TextScore.config: with your own AudioContext, set lite before the first sound');
  const was=[...players].filter(p=>!p.stopping).map(p=>{ const b=Math.max(0,p._curBeat()); return {p,pos:songPos(p.song,b),loops:p._loopsAt(b)+p._loopBase}; });
  for(const p of [...players]) p._halt(0.03);
  if(ctx){ const old=ctx; ctx=null; try{ old.close(); }catch(e){} }
  fxSess=null; cacheClear(); LITE=on;
  for(const {p,pos,loops} of was){ p._loopBase=loops; p._start(pos,0); }
}
// config({lite, prerender, reverb:'auto'|'conv'|'iir', masterVolume, cacheMB, context, destination})
function config(o={}){
  if(o.context||o.destination){
    if(ctx) throw new Error('TextScore.config: context / destination must be set before the first sound');
    CFG.context=o.context||o.destination.context; DEST=o.destination||null;
  }
  if(o.cacheMB!=null) CFG.cacheMB=Math.max(8,+o.cacheMB||160);
  if(o.masterVolume!=null) setMasterVolume(o.masterVolume);
  if(o.prerender!=null) PRERENDER=!!o.prerender;
  if(o.reverb!=null){ const v=o.reverb==='auto'?'':String(o.reverb); if(v!==''&&!REV_TYPES.includes(v)) throw new Error('TextScore.config: reverb must be "auto", "conv" or "iir"'); if(v!==REV_FORCE){ REV_FORCE=v; for(const p of players) if(p.sess){ swapReverb(p.sess,p.song); p._prInvalidate(); } } }
  if(o.lite!=null) setLite(o.lite);
  return API;
}

const API={
  version:VERSION,
  Player, play, bgm, stopAll, preload, render, note, drum:drumHit, config, parse,
  // call from a click / key handler if sound should start right away (browsers block audio until a user gesture)
  unlock(){ ensureAudio(); return Promise.resolve(resumeCtx()).then(()=>ctx.state==='running'); },
  get context(){ return ctx; },
  get lite(){ return LITE; },
  get masterVolume(){ return masterVol; }, set masterVolume(v){ setMasterVolume(v); },
  get playing(){ return [...players]; },
  instruments:Object.assign({},INSTRUMENTS),
  OtoSing,                                   // 歌声の音源そのもの（OtoSing.sing / singNotes / kana）。1.9.0 から 0.8.0（英語の音節）
  enLyric,                                   // 歌詞の行 → 拍の並び（英語の [ ] を含む行。確かめ用）
  OtoVoice,                                  // 話す・歌う・手で書く行（2.0.0 から、同じファイルの中）
  drums:Object.assign({},DRUM_NAMES),
};

return API;
});
var __R=typeof self!=='undefined'?self:this,OtoStudio={VERSION:'1.3.0',TextScore:__TS,OtoVoice:__OV};
__R.OtoStudio=OtoStudio;if(typeof module==='object'&&module.exports)module.exports=OtoStudio;else __R.TextScore=__TS;
}).call(typeof self!=='undefined'?self:this);
