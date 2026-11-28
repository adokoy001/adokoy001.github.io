/*! otosing.js v0.7.2 — 歌声の音源（依存なし・外部通信なし・録音なし）
 *
 * 声帯の波を、口の3つの共鳴に通して歌わせる。子音は雑音を1つの共鳴に通して足す。出来上がりは 32kHz のモノラル。
 *
 *   OtoSing.sing(譜面, {voice:'onna'})        → Float32Array   音符の行と歌詞の行を交互に書いた譜面から（試聴・単体用）
 *   OtoSing.singNotes(音符の配列, {voice})    → Float32Array   時刻つきの音符から（テキスト譜スタジオのエンジンが使う）
 *       音符: {t 秒, dur 秒, midi, m 拍（OtoSing.kana が返すもの）, vel 強さ（1 がふつう）, join 次の音符へつなぐ, bend {amt 半音, at 秒, dur 秒}}
 *
 * ■ o（どれも省ける）
 *   voice   'onna' 女 / 'otoko' 男 / 'tenor' 高い男声 / 'kodomo' 子供
 *   vib     ビブラートの深さ（1 が既定、0 で切る）
 *   expr    歌いまわし（1 が既定、0 で機械的に）。しゃくり、行きすぎ、ゆらぎ、フレーズの抑揚、語尾の下がり、息つぎの音
 *   breath  息の量（1 が既定）。高い声で母音を保つ手でもある
 *   glide   音から音への移りを長くする秒数
 *   tune / shape / onset   高い声で母音を保つ手（あごを開ける・明るさの差・入りの息）。0〜1、既定 1
 *   air     息の高さ（0〜2、既定 0）。息の雑音（囁き・息まじり・入りの息）を、口の低い共鳴から外して、上の帯域へ移す（0.7）
 *           0：息を3つの共鳴に同じように通す（0.6 までと同じ波形）。息の重心は 1kHz あたりで、高い裏声では、息が声より低く鳴る
 *           1：第1共鳴の息をほぼ外し、第3共鳴を強め、5.5kHz の広い帯域を足す。第2共鳴の息は残す（母音の手がかり）。重心は 3kHz あたり
 *           2：第2共鳴の息も外す。重心は 4.6kHz あたり。息はいちばん高くなるが、高い声では母音が分かりにくくなる
 *           荒れ（rough、shout で入る分も）の雑音は動かさない（0.7.1。0.7 では、荒れの雑音もいっしょに上へ移っていた）
 *   level   音符ごとの大きさをそろえる度合い（0〜1、既定 0.85）
 *   pad     頭に置く無音の秒数（既定 0。最初の子音は拍の手前に入るので、0 だと最初の音だけ母音が少し遅れる）
 *   seed    乱数の種（同じ種なら、同じ音になる）
 *   artic   子音の作り（1 が既定）。1 は、0.6 で作り直した子音：口のどこで閉じたかで決まる出発点（ローカス）から母音へわたり、破裂・鼻音・息を
 *           作り分け、子音を次の拍までに収める。0 にすると、0.5 までの子音（波形も 0.5 と同じ）
 *
 * ■ 声の出し方（o.reg / o.shout / o.rough。歌詞の中の【 】でも、途中から切りかえられる）
 *   reg     声区。'chest' 地声 / 'mix' ミックス / 'falsetto' 裏声 / 'auto' 高さで自動（低い音は地声、換声点のあたりでミックス、上は裏声）。
 *           0〜1 の数でも書ける（0 地声、0.5 ミックス、1 裏声）。書かなければ、0.2 までと同じ声
 *           地声は、声帯が開いている割合が 0.45、裏声は 0.75（実測の平均は 地声 0.45 前後、裏声 0.72 前後）。裏声は基音ばかりが強く、高い倍音が
 *           弱く、息がもれ、口の共鳴が1割ほど低い。ミックスは、そのあいだ
 *   shout   叫び（0〜1）。声帯を押しつけて短く開き、するどく閉じる。高い倍音が強くなり、あごが開いて母音どうしが近づき、子音は短く、
 *           ビブラートは浅く、頭のしゃくりと語尾の落ちが大きくなる
 *   rough   荒れ（0〜1）。声帯の上のひだ（仮声帯など）がいっしょに不規則にふるえる音。1周期おきに強さと長さが変わり（1オクターブ下が
 *           混じる）、周期がばらつき、ふるえに合わせて雑音が出る。shout を使うと、書かなくても shout の半分だけ入る
 *   edge    鋭さ（0〜1）。喉の奥を絞った、耳に刺さる声。口の共鳴を寄せ（第1・第2は上へ、第3は下へ）、3kHz あたりに山を足し、1〜3kHz を強くする。
 *           声帯はより強く閉じ、母音の入りは硬く、語尾はぶつ切りになる
 *   whisper 囁き（0〜1）。声帯が閉じきらず、息がもれつづける声（有声のまま）。声帯が開いている割合が 0.85 まで上がり、基音ばかりが残って、
 *           2kHz から上は倍音の代わりに息の雑音が鳴る。第1共鳴の山はなだらかになり、母音の入りはやわらかく、ビブラートは浅くなる。【囁】【囁0.5】
 *   【返】  ここで裏声へひっくり返る（なめらかにつながず、一瞬で切りかわる。戻るときも一瞬）
 *   【跳】  次のかな1つだけ、語尾が裏声で上へ跳ねる（既定は1オクターブ。【跳7】で半音7つ）
 *   【地】【ミ】【裏】【自】で声区、【鋭】【鋭0.5】で鋭さ、【叫】【叫0.5】で叫び、【荒】【荒0.3】で荒れを、その場所から切りかえる。【】で、トラックの設定に戻る
 *
 * ■ 強弱
 *   vel が大きいほど、大きく、明るく、息が少なくなる。小さいほど、弱く、やわらかく、息が多くなる。
 *
 * (推定) 共鳴の値、息の量は、実測ではなく見積もり。子音（0.6）は、話し声の合成 RSP の値を移し、強さの釣り合いを、音声認識（Whisper small、
 *        ReazonSpeech、SenseVoice）に歌を聞かせた結果を見ながら決めた。調整に使っていない30文での子音の聞きまちがいは、0.5 の 23〜38% に対して 8〜15%。
 */
(function(root){
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
const CN={k:['s','v',0,62],g:['s','v',1,50],t:['s','a',0,55],d:['s','a',1,45],p:['s','l',0,62],b:['s','l',1,50],ch:['a','y',0,80],ts:['a','a',0,80],j:['a','y',1,62],dz:['a','a',1,65],
  s:['f','a',0,80],z:['f','a',1,60],sh:['f','y',0,85],f:['f','l',0,65],C:['f','y',0,70],h:['h','',0,65],n:['n','a',1,48],m:['n','l',1,52],r:['4','a',1,24]};
const LOCS={l:[.75,130],a:[.5,900],v:[.79,600],y:[.3,1600]},TRP={l:.04,a:.05,v:.06,y:.05},VOT={l:.02,a:.025,v:.04},
  BURN={l:[600,1,.9],a:[4800,1.1,.45],v:[0,3,1]},
  FRS={s:[6000,1.3,.36,0],z:[6000,1.3,.22,.35],sh:[3500,2.6,.56,0],ch:[4250,1.3,.7,0],j:[4250,1.3,.5,.3],ts:[5600,1.3,.36,0],dz:[6000,1.3,.26,.35],f:[2200,.4,.05,0],C:[4300,1.1,.1,0]};
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
    const line=raw.replace(/#.*$/,'').replace(/\/\/.*$/,'').trim();if(!line)return;
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
  const tune=df(o.tune,1),shape=df(o.shape,1),brM=df(o.breath,1),onM=df(o.onset,1),vibM=df(o.vib,1),E=df(o.expr,1),gl0=o.glide||0,T0=o.pad||0,ROOM=df(o.room,.43);   // room: 音符の手前の何秒までに、息つぎと子音を収めるか
  const V=vc.V,br0=vc.breath*brM,onB=.5*onM,n0=N.length;
  const ASL=df(o._asl,.4),ASH=df(o._ash,1.25),KQ=df(o._kq,2),HA=df(o._ha,.7);
  const HC=df(o._hc,0),GN=df(o._gn,0),BL=df(o._bl,1),BV=df(o._bv,1),GV=df(o._gv,.5);
  const AR=df(o.artic,ARTIC)>0,fsc=vc.neut[1]/1700,NA=df(o._na,.83),NZG=df(o._nz,.72),mixF=(a,b,u)=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u];
  // ローカス：子音と母音の境い目での共鳴。母音の第2共鳴から、閉じる場所ごとの直線で決める（男の声の値で作ってあるので、声の大きさに合わせて伸び縮みさせる）
  const locus=(pl,F)=>{const f2=F[1]/fsc,f3=F[2]/fsc,L=LOCS[pl],x=L[0]*f2+L[1];let r;
    if(pl==='l')r=[230,x,f3-350];else if(pl==='a')r=[230,x,.4*f3+1620];else if(pl==='v'){const y=Math.min(2350,x,f2+180);r=[230,y,Math.max(2050,Math.min(2950,y+450))]}else r=[250,x,.3*f3+1950];
    return[r[0]*fsc,r[1]*fsc,r[2]*fsc]};
  if(!n0)return new Float32Array(0);
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
    X.forEach((x,i)=>{const s=x.m,e=x.e,pv=i>0?X[i-1]:null,joined=!!(pv&&pv.e.join),prevF=joined?(pv.vt||lastV):null;
      if(s.l){x.vt=prevF||lastV||V.a;x.nzt=pv&&joined?pv.nzt||0:0;return}
      let v,nzt=0;
      if(s.n){const nx=X[i+1],c2=nx&&e.join&&!nx.m.n&&!nx.m.l?(nx.m.c||''):null,ty=c2==='p'||c2==='b'||c2==='m'?'m':c2==='k'||c2==='g'?'N':c2==='t'||c2==='d'||c2==='n'||c2==='r'||c2==='z'||c2==='ch'||c2==='ts'||c2==='j'||c2==='s'||c2==='sh'?'n':'X';
        v=[V.N[0],{m:1100,n:1600,N:2100,X:1350}[ty]*fsc,{m:2150,n:2600,N:2600,X:2450}[ty]*fsc];nzt=1;
        if(ty==='N'&&nx.m.v){const L=locus('v',V[nx.m.v]);v=[V.N[0],L[1],L[2]]}}
      else v=V[s.v];
      const c0=s.n?'':(s.c||''),pal=(c0==='n'||c0==='r')&&(s.v==='i'||s.g==='y'),ini=!prevF||!!(pv&&(pv.m.n||pv.m.q)),gem=pv&&pv.m.q&&prevF?.09:0;
      let key=c0==='h'&&s.v==='i'&&!s.g&&HC?'C':c0;if(key==='z'&&ini)key='dz';
      const cn=CN[key]||null,pl=cn&&cn[1]?(pal?'y':cn[1]):null,G=s.g?(s.g==='y'?[260,2200,3000]:[290,610,2150]).map(y=>y*fsc):null,vT=G||v;
      const seg=[];let Rb=vT,TR=.03,tr0=0,q0=0;
      if(cn){const m=cn[0],vd=cn[2],D=cn[3]/1000,bar=vd&&!!prevF,lo1=200*fsc;if(pl){Rb=locus(pl,vT);TR=TRP[pl]}
        const Lb=prevF&&pl?locus(pl,prevF):Rb;
        if(m==='s'&&key==='g'&&GN&&prevF&&!ini){const M=[V.N[0],Rb[1],Rb[2]];seg.push([.008,[V.N[0],Lb[1],Lb[2]],.5,0,1,null,GN],[D-.01,M,.5,0,1,null,GN],[.004,Rb,.55,BURN.v[2]*NA*.25,1,[cl(Rb[1]*1.25,1500*fsc,2800*fsc),3],0],[.008,Rb,.6,0,1,null,0])}
        else if(m==='s'){const iv=vd&&!prevF,bl=pl==='l'?.008:pl==='a'?(vd?.006:.009):vd?.01:.018,clo=Math.max(.02,D-bl)+gem,B=BURN[pl],A=B[2]*NA*(pl==='v'?BV:pl==='l'?BL:1)*(vd?(iv?.8:pl==='v'?GV:.3):1),bc=pl==='v'?cl(Rb[1]*1.25,1100*fsc,2800*fsc):B[0]*vc.cs,vot=vd?0:VOT[pl];
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
      if(G){if(cn)seg.push([.025,G,.7,0,1],[.015,G,.75,0,1]);else seg.push([.045,G,.78,0,1],[.02,G,.78,0,1]);Rb=G;TR=.075;tr0=0}        // や・ゆ・よ・わ：閉じない。ゆっくり寄って、ゆっくり開く
      if(x.sh>0)for(const y of seg)y[0]*=1-.2*x.sh;
      // 次の拍までに収める：前の音符の母音を、少なくとも4割（40ミリ秒）は残す。子音は、もとの長さの45%までしか縮めない
      let lead=seg.reduce((a,y)=>a+y[0],0);
      if(pv&&lead>0){const room=e.t-pv.e.t-Math.max(.04,.4*Math.min(pv.e.dur,e.t-pv.e.t)),cf=cl(room/lead,.45,1);if(cf<1){for(const y of seg)y[0]*=cf;lead*=cf;tr0*=cf}}
      x.seg=seg;x.lead=lead;x.Rb=Rb;x.TR=TR;x.tr0=tr0;x.vt=v;x.nzt=nzt;x.q0=q0;x.gem=gem;lastV=v})}
  X.forEach((x,i)=>{
    const e=x.e,s=x.m,t0=e.t+T0,st=x.amp*r2(.94,1);tm=x.tm;bm=x.bm;
    if(s.l){                                                           // ー：母音はそのまま、高さだけ変わる
      if(cav<.2){hold(t0);k(.03,cur,st)}else if(x.flip!==(i>0&&X[i-1].flip)){hold(t0-.016);k(.01,cur,cav*.3);k(.02,cur,st)}   // ひっくり返る瞬間は、声が一瞬とぎれる
      else{hold(t0);k(.05,cur,st)}
    }else if(AR){
      const v=x.vt,pre=x.seg,lead=x.lead,Rb=x.Rb,TR=x.TR,nx=X[i+1],avail=(nx&&e.join?nx.e.t+T0-(nx.lead||0)-(nx.tV||0):t0+e.dur)-t0,am=Math.min(1.2,x.amp),nm=Math.min(1.25,.5+.5*x.vel);
      // 息つぎ：フレーズの前に間があれば、息を吸う音を小さく入れる
      if(x.first&&cav<.05&&E>0&&brM>0){const gap=t0-lead-tt,len=Math.min(.28,gap-.16,ROOM-.07-lead);
        if(gap>.42&&len>.1){const tb=t0-lead-.07-len,nf=vc.neut,a=.17*E*Math.min(1.5,brM);noise(2400*vc.cs,.7);hold(tb);P(tb+.002,nf,0,0,0);P(tb+len*.55,nf,a,0,0);P(tb+len,nf,a*.5,0,0);k(.03,nf,0,0,0)}}
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
      k(on,mixF(Rb,v,pr(x.tr0+on)),a*a1,0,1,br0*bm+onB*x.ob);k(d2,d3>.004?mixF(Rb,v,pr(x.tr0+on+d2)):v,a*(1+.15*x.ed),0,1,br0*bm+onB*x.ob*(d3>.004?.6:.2));tm=x.tm;
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
        if(gap>.42&&len>.1){const tb=t0-lead-.07-len,nf=vc.neut,a=.17*E*Math.min(1.5,brM);fc=2400*vc.cs;fq=.7;hold(tb);P(tb+.002,nf,0,0,0);P(tb+len*.55,nf,a,0,0);P(tb+len,nf,a*.5,0,0);k(.03,nf,0,0,0)}}
      if(B||F){fc=(B||F)[0]*vc.cs;fq=(B||F)[1]}
      if(!pre.length&&cav>.3){hold(t0-.03);k(.03,cur,cav*.55)}       // 母音だけの拍：いったん弱めて、言い直す
      else if(pq){hold(t0-lead-.09);k(.02,cur,0);hold(t0-lead)}       // っ：前の音を切って、間を置く
      else{hold(t0-lead);if(!pre.length&&cav<.05)P(Math.max(tt,t0-.004),v,0)}
      pre.forEach(y=>k(y[0],y[1],y[2]*Math.min(1.2,x.amp),y[3]*Math.min(1.25,.5+.5*x.vel),y[4]));
      const a=s.n?.5*st:st;if(o._on)o._on.push([i,tt-t0]);
      tm=x.tm*(1+.6*x.ed);                                             // 鋭い声は、母音の入りが硬い（速く、いったん行きすぎて、明るい）
      k(on*(1-.5*x.ed)*(1+x.wh),v,a*(.8+.5*x.ed),0,1,br0*bm+onB*x.ob);k(.03,v,a*(1+.15*x.ed),0,1,br0*bm+onB*x.ob*.6);tm=x.tm;k(.09,v,a,0,1,br0*bm); // 母音の入り：息を一瞬だけ多く
    }
    if(x.hic){const th=t0+e.dur-x.hd;hold(th-.012);k(.012,cur,cav*.3);k(.018,cur,st*.85)}   // 語尾が跳ねる手前で、声が一瞬とぎれる
    if(!e.join){const tE=t0+e.dur,rl=Math.max(.012,cl(.06+.05*E*Math.min(1,e.dur),.06,.14)*(1-.7*x.ed));hold(tE-rl);k(rl,cur,0)}   // 休みの前は、声を抜く
  });
  k(.1,cur,0);
  const n=Math.ceil((tt+.05)*SR),out=new Float32Array(n);out.sampleRate=SR;
  const flt=()=>({a:0,b:0,k:1,a1:0,a2:0,a3:0}),set=(F,f,q)=>{const g=Math.tan(Math.PI*Math.min(f,SR*.45)/SR);F.k=1/q;F.a1=1/(1+g*(g+F.k));F.a2=g*F.a1;F.a3=g*F.a2},
    run=(F,x)=>{const v3=x-F.b,v1=F.a1*F.a+F.a2*v3,v2=F.b+F.a2*F.a+F.a3*v3;F.a=2*v1-F.a;F.b=2*v2-F.b;return v1*F.k};
  const AIR=cl(df(o.air,0),0,2),AR1=Math.min(AIR,1),AR2=Math.max(AIR-1,0),AIL=1-df(o._al,.92)*AR1,AIM=1-df(o._am,.9)*AR2,AIH=1+df(o._ah,.3)*AR1,AIG=df(o._ag,.25)*AR1,f5=flt();set(f5,df(o._af,5500),df(o._aq,1));   // 息の高さ：1 までは、低い共鳴へ通す息を 8% まで絞り、第3共鳴へ 130%、5.5kHz の広い帯域を足す（第2共鳴の息は残す：高い声では、これが母音の手がかり）。1 から 2 では、第2共鳴の息も 10% まで絞る
  const f1=flt(),f1n=flt(),f2=flt(),f3=flt(),f4=flt(),ff=flt(),FL=[f1,f1n,f2,f3,f4,f5],lo=Math.log(V.i[0]),lspan=Math.log(V.a[0])-lo,d0=V.o[1]*.95,dspan=V.e[1]*.85-V.o[1]*.95,dtc=CT/SR,sm=1-Math.exp(-dtc/.004),kS=1-Math.exp(-dtc/.02),S=X[0].P.slice(),SRC=!!o.src;
  let oq=S[0],tp=oq*S[1],tn=oq-tp;
  const LV=df(o.level,.85),PREF=df(o.pref,.2),zeta=1-.32*cl(E,0,1.5),GAIN=df(o.gain,1),ktb=6.2832*vc.tilt/SR;
  let ki=0,c1=K[0][1],c2=K[0][2],c3=K[0][3],av=0,af=0,vo=1,br=br0,ni=-1,lp=N[0].midi,lv=0,w0=60,vph=R(),vd=0,jit=0,dr=0,f0=220,ph=0,dl=0,inc=.01,g1=1,g2=.8,g3=.5,kt=.5,trm=1,lvl=1,ca=1,cp=1,cyc=0,sp=0,fvi=0,rn=0,rg=0,r4=0,hon=-2,wn=0;
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
        if(q.first){lp=q.e.midi-.55*E*Math.min(1,q.vel)*(1+q.sh);lv=0;w0=1/(.03+gl0*.4)}}
      const q=X[Math.max(0,ni)],e=q.e,ta=x-(e.t+T0),tE=e.t+T0+e.dur;
      let tg=e.midi;if(e.bend&&e.bend.amt)tg+=e.bend.amt*cl((ta-(e.bend.at||0))/Math.max(.01,e.bend.dur||.1),0,1);
      if(q.hic&&x>=tE-q.hd){tg+=q.hic;if(hon!==ni){hon=ni;for(let j=0;j<15;j++)S[j]=q.PH[j];lp=tg+.4;lv=0;w0=1/.01}}   // 語尾が、裏声で上へ跳ねる
      else if(q.last&&E>0)tg-=.4*E*(1+1.5*q.sh)*(1-q.ed)*cl((x-(tE-.1))/.1,0,1.5);                  // 語尾は、少し下がりながら消える
      lv+=(w0*w0*(tg-lp)-2*zeta*w0*lv)*dtc;lp+=lv*dtc;
      dr+=((R()-.5)-dr)*.0025;
      const long=e.join&&!q.last?e.dur>.5:e.dur>.4,want=long?vibM*.34*(1+.12*(q.vel-1))*cl((ta-.19)/.32,0,1)*cl((tE-x)/.12,0,1)*(e.dur>1.3?1.15:1)*q.vb:0;vd+=(want-vd)*.02;
      vph+=dtc*5.5*(1+.08*jit+.03*Math.min(1,ta));jit+=((R()-.5)-jit)*.3;
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
    if(wn>0)nx+=w2*wn*a*vo*(.25+.75*gl);                               // 囁き：閉じきらない声帯から、息がもれつづける
    const exc=AIR>0?hx+nx+nr+na*ASH:hx+nx+na*ASH;
    let y;
    if(AIR>0)y=(run(f1,hx)+run(f1n,nx*AIL+nr+na*ASL))*g1+run(f2,hx+nx*AIM+nr+na*ASH)*g2+run(f3,hx+nx*AIH+nr+na*ASH)*g3+af*.3*run(ff,w)+run(f5,nx)*AIG;   // 息の高さ：息を低い共鳴から外して、上へ移す。荒れの雑音（nr）は動かさない（0.7.1）
    else y=(run(f1,hx)+run(f1n,nx+na*ASL))*g1+run(f2,exc)*g2+run(f3,exc)*g3+af*.3*run(ff,w);
    if(r4>0)y-=r4*run(f4,exc);                                          // 鳴り：3kHz あたりの山
    out[i]=SRC?hx:y*GAIN}
  if(o.norm){let pk=1e-6;for(let i=0;i<n;i++){const a=out[i]<0?-out[i]:out[i];if(a>pk)pk=a}const g=.9/pk;for(let i=0;i<n;i++)out[i]*=g}
  return out;
}
return{VERSION:'0.7.2',sing,singNotes,parse,kana,VOICES,REGS,SR};
})();
/*</OTOSING-CORE>*/
root.OtoSing=OtoSing;if(typeof module!=='undefined'&&module.exports)module.exports=OtoSing;
})(typeof self!=='undefined'?self:this);
