/*! OtoFX 1.1.0 — 効果音のコレクション（一発の音と、鳴りつづける床）。計算だけで作る（録音なし・依存なし・外部通信なし・Web Audio なしでも動く）
 *  これだけで動く、ひとつのファイル（otofx.js）。OtoStudio（otostudio.js）とは別で、どちらも相手を必要としない。
 *  ブラウザでは OtoFX、Node では require の返り値が OtoFX
 *
 * 作品「見返す太陽」の BGM エンジン（音響卓）の音づくりを、その場で標本を計算する形に移したもの。心拍・鐘・轟音・吸い込み・一撃と、鳴りつづける床の音。
 *   OtoFX.render(名前, o)   → [左, 右]（Float32Array 2本、48kHz。.rate と .seconds つき）
 *   OtoFX.buffer(ac, x)     → AudioBuffer（鳴らすとき用）
 *   OtoFX.NAMES             名前の一覧 [{name, label, kind, note}]
 * 一発の音（kind:'hit'）
 *   heartbeat  心拍（二連打）。o.agit 0〜1（動揺。強く、間が詰まる）
 *   thump      心拍の一打。o.f 高さ（Hz。既定 46）、o.amp
 *   bell       鐘の一打。倍音が調和しない10本の加算。o.f（Hz。既定 146.83）、o.bend 音程の垂れ下がり（セント。既定 25）、o.decay 余韻の倍率、o.echo:false で左右のこだまなし
 *   toll       鐘を、6.4 秒おきに o.count 打（既定 3）
 *   boom       轟音。o.amp（既定 1。0.45 で弱いフレア）
 *   reel       引き寄せる音。o.sec（既定 5）
 *   devour     飲みこむ音
 *   feed       捕食（reel のあとに devour）
 *   suck       吸いこみ：o.sec 秒（既定 7）かけて大きくなり、ぷつりと切れる
 *   sting      スティング：o.sec 秒（既定 7）吸いこみ、1.1 秒の無音、一撃
 *   rage       激昂：o.lead 秒（既定 1.6）の無音のあと、轟音・鐘3つ・悲鳴・耳鳴りが同時に鳴る
 *   scream     悲鳴だけ（高いノコギリ波3本が、ふるえながら下がる）
 *   tinnitus   耳鳴りだけ
 * 鳴りつづける床（kind:'bed'。o.sec 秒ぶん作る。既定 8）
 *   drone      低いうなり（D1 のサイン2本と、うなるノコギリ波）
 *   cluster    ぶつかった和音（D・E♭・A♭）
 *   shepard    終わらずに下がりつづける音。o.rate（既定 1。負で上がる）
 *   breath     呼吸（380Hz あたりの雑音）
 *   whisper    ささやき（1650Hz あたりの細い雑音）
 *   rumble     地鳴り（120Hz より下の雑音）
 * ---- ここから下は 1.1.0 で足した音。作品「〇〇県✕✕村 午前二時・リエゾン」の、焼き込みの音づくりから（group は NAMES の欄） ----
 * 車（group:'car'。どれも一発の音）
 *   tirethud   タイヤが段差を越える      rattle    内装のびびり            roofhit   屋根の鉄板に何かが当たる
 *   glasstap   窓ガラスを指で叩く        doorslam  扉が閉まる              scrape    屋根を何かが擦っていく
 *   wiper      ワイパーのひと拭き（ゴムの滑る音、モーターのうなり、折り返しの小さな音）
 * 天気と走り（group:'weather'）
 *   thunder    遠い雷鳴（一発、10 秒）。o.kind 0 頭に鈍い一打ち／1 弱い一打ち／2 轟きだけ（書かなければ、種から決まる）
 *   rain       雨（床）。屋根とガラスを打つ粒と、細かいさあっという音。o.amount 粒の多さの倍率（既定 1）、o.hiss さあっという音の量（既定 1）
 *   wind       風切り音（床）              road      タイヤと路面（床）。低いごうごうと、擦れる帯域。o.tire 擦れる音の量（既定 1）
 * 遠くの音（group:'far'。2km ほど先から届く音。街と山からの返りが、波形に入っている）
 *   cannon     遠い砲声                    aagun     高射砲の「ドン」        flak      上空での炸裂「パン」
 *   brrt       対空ガトリング砲「ブーーー」  zudon     重く大きな一発（0.2 秒で断ち切る）
 *   blast      爆風のあとの轟き            stomp     地響き（とても低い一発）  surf      海が崖に崩れかかる轟音（9 秒）
 *   jet        爆撃機が低く通りすぎる
 *   heli       ヘリのローター音（床）      siren     遠い街のサイレン（床。2つのモーターサイレン。40 秒でひとまわり）
 * 声と息（group:'voice'）
 *   laugh      子供の笑い声。o.pat 'down' 'up' 'arch' 'squeal' 'two' 'short' 'flat'（書かなければ、種から決まる）
 *   hum        鼻歌（8 秒）
 *   puff       息。o.kind 'nin' 鼻で吸う／'nout' 鼻で吐く／'in' 口で吸う／'out' 口で吐く／'gasp' 息をのむ／'haa' はぁー（既定 'out'）、o.sec、o.trem ふるえ（0〜1）
 *   laugh・hum は、o.radio:true で、AM ラジオを通した音になる（もとの作品では、いつもラジオごし）
 * OtoFX.radio(x, o)   どんな音でも、AM ラジオを通した音にする（帯域を狭め、歪ませ、電波がゆらぎ、雑音と空電が乗る）。
 *                     x は Float32Array か [左, 右]。o.rate 標本化周波数（書かなければ x.rate か 48000）、o.seed。返り値は、同じ形の新しい配列
 * 足した音の大きさは、どれも、いちばん大きい所をそろえてある（o.gain 1 で 0.4 ほど）。o.st（移調）が効くのは laugh・hum・siren だけ
 * (推定) もとの作品では Web Audio のつなぎで鳴らしていた wind・road・puff と、雨のさあっという音は、同じ帯域・同じ形になるように、標本の計算に書き直した。耳での照合はしていない
 * 入れていないもの：聞き取れない話し声（囁きの合成 Sasayaki を使うため）、囁き声そのもの、エンジン（別の物理モデル）
 * 音の大きさは、もとの卓の釣り合いのまま（床の音や悲鳴・耳鳴りは、単独ではごく小さい）。単独で使うときは o.gain で上げる。これは、はじめの 19 個（group:'horror'）の話
 * どれにも共通：o.st 移調（半音）、o.reverb 残響の量（既定 1。0 で無し）、o.seed 乱数の種（同じ種なら、同じ音）、o.gain
 * (推定) 残響は、もとの卓の「雑音を畳みこむ」やり方ではなく、軽い作り（遅延線4本の回しこみ）に置きかえた。響きは、もとと同じではない
 */
const OtoFX=(function(){
const SR=48000,VERSION='1.1.0',TAU=6.283185307179586;
let rs=1;const R=()=>{rs=(rs+0x6D2B79F5)>>>0;let t=rs;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296};
const N=s=>Math.max(1,Math.ceil(s*SR));
// 時刻つきの値（Web Audio の exponentialRamp・linearRamp と同じ動き）。P＝[[秒, 値, 'e'|'l'|'s'], …]
function env(P,n,t0=0){const o=new Float32Array(n);let k=0;for(let i=0;i<n;i++){const t=i/SR-t0;while(k<P.length-1&&t>=P[k+1][0])k++;const a=P[k],b=P[k+1];
  if(t<P[0][0])o[i]=P[0][1];else if(!b)o[i]=a[1];else{const u=(t-a[0])/(b[0]-a[0]||1e-9),m=b[2]||'e';o[i]=m==='s'?a[1]:m==='l'?a[1]+(b[1]-a[1])*u:a[1]*Math.pow(b[1]/a[1],u)}}return o}
const brown=n=>{const o=new Float32Array(n);let l=0;for(let i=0;i<n;i++){l=(l+.02*(R()*2-1))/1.02;o[i]=l*3.5}return o},white=n=>{const o=new Float32Array(n);for(let i=0;i<n;i++)o[i]=R()*2-1;return o};
// 2次のフィルタ（低域通過・帯域通過）。高さは、標本ごとの配列でも、数でもよい。32 標本ごとに係数を作り直す
function biq(x,type,f,q){const n=x.length,o=new Float32Array(n);let b0=0,b1=0,b2=0,a1=0,a2=0,x1=0,x2=0,y1=0,y2=0;
  for(let i=0;i<n;i++){if((i&31)===0){const fc=Math.min(SR*.45,Math.max(10,typeof f==='number'?f:f[i])),w=TAU*fc/SR,c=Math.cos(w),al=Math.sin(w)/(2*q),a0=1+al;
      if(type==='lp'){b0=(1-c)/2/a0;b1=(1-c)/a0;b2=b0}else{b0=al/a0;b1=0;b2=-al/a0}a1=-2*c/a0;a2=(1-al)/a0}
    const y=b0*x[i]+b1*x1+b2*x2-a1*y1-a2*y2;x2=x1;x1=x[i];y2=y1;y1=y;o[i]=y}return o}
// 発振。f は数か配列。cents は、セントのずれ（配列）
function osc(type,f,n,cents){const o=new Float32Array(n);let ph=R();for(let i=0;i<n;i++){let fr=typeof f==='number'?f:f[i];if(cents)fr*=Math.pow(2,cents[i]/1200);ph+=fr/SR;ph-=Math.floor(ph);
  o[i]=type==='sine'?Math.sin(TAU*ph):type==='saw'?2*ph-1:4*Math.abs(ph-.5)-1}return o}
const mul=(a,b)=>{for(let i=0;i<a.length;i++)a[i]*=typeof b==='number'?b:b[i];return a};
const lfo=(rate,depth,n,base=0)=>{const o=new Float32Array(n),p=R()*TAU;for(let i=0;i<n;i++)o[i]=base+depth*Math.sin(TAU*rate*i/SR+p);return o};
// 音を置く台（左・右、残響へ送るぶん）
function Mix(sec){const n=N(sec);return{n,L:new Float32Array(n),Rr:new Float32Array(n),W:new Float32Array(n),
  add(x,t,dry,wet,pan=0){const off=Math.round(t*SR),gl=dry*Math.cos((pan+1)*Math.PI/4)*1.4142,gr=dry*Math.sin((pan+1)*Math.PI/4)*1.4142;for(let i=0;i<x.length&&off+i<this.n;i++){if(off+i<0)continue;const v=x[i];this.L[off+i]+=v*gl;this.Rr[off+i]+=v*gr;this.W[off+i]+=v*wet}}}}
// 残響：遅延線4本を、たがいに回しこむ（高い音ほど早く消える）
function reverb(M,amt){if(!(amt>0))return;const D=[1687,2053,2671,3331].map(d=>Math.round(d*SR/44100)),B=D.map(d=>new Float32Array(d)),P=[0,0,0,0],lp=[0,0,0,0],fb=.86,dm=.32;
  for(let i=0;i<M.n;i++){const o=[0,0,0,0];for(let k=0;k<4;k++){o[k]=B[k][P[k]]}const s=(o[0]+o[1]+o[2]+o[3])*.5,x=M.W[i]*.25;
    for(let k=0;k<4;k++){const v=x+(o[k]-s)*fb;lp[k]+=(v-lp[k])*(1-dm);B[k][P[k]]=lp[k];P[k]=(P[k]+1)%D[k]}
    M.L[i]+=(o[0]+o[2])*amt*.5;M.Rr[i]+=(o[1]+o[3])*amt*.5}}
// ---- 一発の音。どれも（台, 時刻, …）に置く。rt は、移調の倍率 ----
function thump(M,t,amp,f0,rt){f0*=rt;const n=N(1.4),fr=env([[0,f0],[.55,f0*.5]],n),a=env([[0,1e-4],[.035,amp],[1.3,1e-4]],n),b=env([[0,1e-4],[.04,amp*.5],[.9,1e-4]],n),x=mul(osc('sine',fr,n),a),s=mul(osc('saw',fr,n),b);
  for(let i=0;i<n;i++)x[i]+=s[i];const nz=mul(biq(brown(N(.4)),'lp',130,.7),env([[0,1e-4],[.02,amp],[.35,1e-4]],N(.4)));for(let i=0;i<nz.length;i++)x[i]+=nz[i];M.add(biq(x,'lp',260,.7),t,1,.45)}
const BELL=[[.5,.9,10],[1,.75,7],[1.183,.6,5.5],[1.506,.35,4.2],[2,.55,4.8],[2.514,.28,3.2],[2.662,.22,3],[3.011,.2,2.4],[4.166,.12,1.7],[5.433,.07,1.2]];
function strike(M,t,f,amp,bend,rt,dec=1,echo=true){f*=rt;const K=1.9*dec,len=BELL[0][2]*K+.1,n=N(len),x=new Float32Array(n);
  BELL.forEach(([r,a,d],i)=>{const end=d*K,m=N(end+.05),g=env([[0,1e-4],[.006,a],[end,1e-4]],m),c=env([[0,0,'l'],[end,-bend,'l']],m),p=mul(osc('sine',f*r*(1+(R()-.5)*.002),m,c),g);for(let j=0;j<m;j++)x[j]+=p[j];
    if(i<4){const q=mul(osc('sine',f*r+.45+i*.2,m,c),g);for(let j=0;j<m;j++)x[j]+=q[j]*.5}});
  const cn=N(.15),ck=mul(biq(white(cn),'bp',f*4.2,3),env([[0,1e-4],[.003,.25],[.12,1e-4]],cn));for(let j=0;j<cn;j++)x[j]+=ck[j];
  const y=mul(biq(x,'lp',2800,.5),amp);M.add(y,t,.35,1.25);
  if(echo){let a=y,g=.85;const T=[.73,1.13];for(let k=0;k<7&&g>.03;k++){t+=T[k%2];a=biq(a,'lp',k%2?1300:1700,.4);M.add(a,t,.6*g*.9,.75*g*.9,k%2?.7:-.7);g*=.51}}}
function boom(M,t,amp){const n=N(8),x=mul(biq(brown(n),'lp',env([[0,420],[4.5,55]],n),.9),env([[0,1e-4],[.12,2.2*amp],[7.5,1e-4]],n));M.add(x,t,.8,.8);
  const m=N(4.7),s=mul(osc('sine',env([[0,52],[4,24]],m),m),env([[0,1e-4],[.08,.6*amp],[4.5,1e-4]],m));M.add(s,t,1,.3)}
function reel(M,t,dur){const n=N(dur+.5),x=mul(biq(brown(n),'bp',env([[0,70],[dur,170]],n),6),env([[0,1e-4],[dur,1.4],[dur+.4,1e-4]],n));M.add(x,t,.8,.6)}
function devour(M,t,rt){const n=N(3.7),x=mul(biq(osc('saw',env([[0,70],[3.1,28]],n),n),'lp',env([[0,420],[2.8,70]],n),8),env([[0,1e-4],[.25,.5],[3.6,1e-4]],n));M.add(x,t,.9,.6);
  const m=N(1.7),z=mul(biq(brown(m),'bp',env([[0,260],[1.3,70]],m),5),env([[0,1e-4],[.08,1.6],[1.6,1e-4]],m));M.add(z,t,.8,.5);strike(M,t+.8,103.83,.42,40,rt)}
function suck(M,t,IN){const n=N(IN+.1),x=mul(biq(white(n),'bp',env([[0,250],[IN,2600]],n),2.5),env([[0,1e-4],[IN,.32],[IN+.02,1e-4]],n));M.add(x,t,.7,.35)}
function scream(M,t){[1760,1864.7,2489].forEach((f,i)=>{const n=N(4.6),c=lfo(5.5+i,18,n),d=env([[0,0,'l'],[4,-300,'l']],n);for(let j=0;j<n;j++)c[j]+=d[j];
  M.add(mul(biq(osc('saw',f,n,c),'bp',f,6),env([[0,1e-4],[.03,.05],[4.5,1e-4]],n)),t,.5,.9,[-.4,.4,0][i])})}
function tinnitus(M,t){const n=N(8.8);M.add(mul(osc('sine',3400,n),env([[0,1e-4],[.5,.022],[8.7,1e-4]],n)),t+.3,1,0)}
function rageHit(M,t,rt){boom(M,t,1.6);strike(M,t,73.42,.55,90,rt);strike(M,t+.015,77.78,.45,110,rt);strike(M,t+.03,103.83,.4,70,rt);
  const n=N(4.2);M.add(mul(osc('sine',env([[0,60],[3.5,18]],n),n),env([[0,1e-4],[.02,.9],[4,1e-4]],n)),t,1,.2);scream(M,t);tinnitus(M,t)}
// ---- 鳴りつづける床 ----
const BED={
  drone(M,sec,rt){const n=N(sec),x=new Float32Array(n);for(const f of [36.71,36.93]){const s=osc('sine',f*rt,n);for(let i=0;i<n;i++)x[i]+=s[i]}
    const g=mul(biq(osc('saw',36.71*rt,n,lfo(.011,9,n)),'lp',lfo(.019,45,n,95),7),.16),o=mul(osc('tri',73.42*rt,n),lfo(.014,.05,n,.07));for(let i=0;i<n;i++)x[i]=(x[i]+g[i]+o[i])*.3;M.add(x,0,1,.25)},
  cluster(M,sec,rt){const n=N(sec),x=new Float32Array(n);for(const [f,b,r] of [[73.42,.05,.021],[77.78,.04,.013],[103.83,.035,.029],[146.83,.025,.017],[155.56,.018,.011],[311.13,.008,.037]]){const a=lfo(r*.6,b*.95,n,b);
      for(const c of [-5,5]){const s=osc('saw',f*rt*Math.pow(2,c/1200),n);for(let i=0;i<n;i++)x[i]+=s[i]*a[i]}}M.add(mul(biq(x,'lp',lfo(.012,220,n,420),1.2),.55),0,.45,.9)},
  shepard(M,sec,rt,o){const n=N(sec),x=new Float32Array(n),SN=7,rate=o.rate!=null?o.rate:1,ph=new Float64Array(SN);for(let i=0;i<n;i++){const p=((-(i/SR)/80*rate)%1+1)%1;let s=0;
      for(let k=0;k<SN;k++){const lp=(k+p)/SN,f=28*Math.pow(2,SN*lp),a=Math.exp(-Math.pow((lp-.48)/.17,2));ph[k]+=f/SR;s+=a*Math.sin(TAU*ph[k])}x[i]=s*.05}M.add(x,0,.25,1)},
  breath(M,sec){const n=N(sec);M.add(mul(biq(brown(n),'bp',lfo(.026,180,n,380),1.4),lfo(.037,.3,n,.35)),0,.5,.7)},
  whisper(M,sec){const n=N(sec);M.add(mul(biq(white(n),'bp',lfo(.042,420,n,1650),9),lfo(.018,.01,n,.012)),0,.3,1)},
  rumble(M,sec){const n=N(sec);M.add(mul(biq(brown(n),'lp',120,.7),.5),0,1,.3)}};
// ==== 1.1.0：車・天気・遠くの音・声（「午前二時・リエゾン」の焼き込みの音づくりから。乱数は、種つきの R に替えた） ====
const rnd=(a,b)=>a+R()*(b-a),opR=(fc,sr)=>1-Math.exp(-TAU*fc/(sr||SR)),op=fc=>opR(fc,SR),pickR=a=>a[(R()*a.length)|0],clamp=(x,a,b)=>x<a?a:x>b?b:x;
function modes(d,n,t0,list){const i0=(t0*SR)|0;for(const [f,dec,a] of list){const ph=R()*TAU,w=TAU*f/SR;for(let i=i0;i<n;i++){const k=i-i0,e=Math.exp(-k/SR*dec);if(e<.001)break;d[i]+=a*e*Math.sin(w*k+ph)*Math.min(1,k/8)}}}
function sweep(d,n,t0,f0,f1,k,dec,a){const i0=(t0*SR)|0;for(let i=i0;i<n;i++){const t=(i-i0)/SR,e=Math.exp(-t*dec);if(e<.001)break;d[i]+=a*e*Math.sin(TAU*(f1*t+(f0-f1)/k*(1-Math.exp(-k*t))))}}
function band(d,n,t0,lo,hi,env,a){const i0=(t0*SR)|0,ka=op(lo||1),kb=op(hi);let l1=0,l2=0;for(let i=i0;i<n;i++){const e=env((i-i0)/SR);if(e<0)break;const w=R()*2-1;l1+=(w-l1)*ka;l2+=(w-l2)*kb;d[i]+=a*e*(lo?l2-l1:l2)}}
const thudS=(d,n,t0,spec)=>spec.forEach(([lo,hi,dec,g])=>band(d,n,t0,lo,hi,t=>t>6/dec?-1:Math.min(1,t/.0012)*Math.exp(-t*dec),g));
const echoS=(d,n,n0,taps)=>{const src=d.slice(0,n0);for(const [dl,gn,fc] of taps){const o=(dl*SR)|0,k=op(fc);let lp=0;for(let i=0;i<n0&&i+o<n;i++){lp+=(src[i]-lp)*k;d[i+o]+=gn*lp}}};
const svf=(f,q)=>{const g=Math.tan(Math.PI*Math.min(f,SR*.45)/SR),k=1/q,a1=1/(1+g*(g+k));return{a:0,b:0,k,a1,a2:g*a1,a3:g*g*a1}};
const runF=(F,x)=>{const v3=x-F.b,v1=F.a1*F.a+F.a2*v3,v2=F.b+F.a2*F.a+F.a3*v3;F.a=2*v1-F.a;F.b=2*v2-F.b;return v1*F.k};
const peakTo=(A,pk0)=>{let pk=1e-6;for(const d of A)for(let i=0;i<d.length;i++){const a=Math.abs(d[i]);if(a>pk)pk=a}const g=pk0/pk;for(const d of A)for(let i=0;i<d.length;i++)d[i]*=g};
// AM ラジオ：320Hz〜2.5kHz だけ残し、片寄った歪み、電波のゆらぎ（弱いときほど雑音が上がる）、空電、ときどき混信の口笛
function amRadio(d,sr){const n=d.length;let pk=1e-6;for(let i=0;i<n;i++)pk=Math.max(pk,Math.abs(d[i]));
  const k1=opR(320,sr),k2=opR(2500,sr),kn1=opR(450,sr),kn2=opR(2900,sr),ff=rnd(.35,.9),fp=rnd(0,6.28),fl2=rnd(5,9),wf=rnd(1300,2600),wp=rnd(0,6.28),wOn=R()<.6?rnd(.2,.7)*n:1e12,wLen=rnd(.5,1.4)*sr;
  let h1=0,h2=0,l1=0,l2=0,n1=0,n2=0,cr=0,ck=0;
  for(let i=0;i<n;i++){const t=i/sr,x=d[i]/pk;h1+=(x-h1)*k1;const a=x-h1;h2+=(a-h2)*k1;const b=a-h2;l1+=(b-l1)*k2;l2+=(l1-l2)*k2;
    const fade=.72+.28*Math.sin(TAU*ff*t+fp)+.05*Math.sin(TAU*fl2*t),edge=Math.min(1,t/.05)*Math.min(1,(n-i)/(sr*.12));
    let v=Math.tanh(l2*3.4*fade+.14)-.139;const w=R()*2-1;n1+=(w-n1)*kn1;n2+=(w-n2)*kn2;
    if(R()<7/sr){cr=rnd(.15,.6)*(R()<.5?-1:1);ck=0}
    const pop=cr*Math.exp(-ck/sr*900);ck++;v+=(n2-n1)*(.3+.6*(1-fade))+pop*.6;
    if(i>wOn&&i<wOn+wLen){const u=(i-wOn)/wLen;v+=.035*Math.sin(Math.PI*u)*Math.sin(TAU*(wf+260*u)*t+wp)}
    d[i]=v*edge}}
const LPATS=['down','up','arch','squeal','two','short','flat'];
const VT={nin:[[900,.6,1],[2200,.8,.25]],nout:[[550,.6,1],[1400,.7,.2]],in:[[1300,.7,1],[2800,.8,.4]],out:[[500,.5,1],[1300,.6,.35]],gasp:[[1900,.9,1],[3600,1.1,.5]],haa:[[780,2.2,1],[1250,2.5,.7],[2700,3,.22],[1500,.4,.3]]};
const VLP={nin:2600,nout:2000,in:3400,out:2300,gasp:6000,haa:4800},VDUR={nin:1.1,nout:1.3,in:.9,out:1.2,gasp:.45,haa:1.6};
// 一発の音（モノラル）：名前 → [秒（数か、o から決める関数）, 作る関数(d, n, o, rt), 残響へ送る量]
const GEN={
  tirethud:[.3,(d,n)=>{const k=rnd(.85,1.2);thudS(d,n,0,[[0,130,26,1.6],[130,420,55*k,.8],[420,1600,150*k,.22]]);sweep(d,n,0,82,52,50,40,.5)},.08],
  rattle:[.16,(d,n)=>{const c=rnd(2,5)|0;for(let i=0;i<c;i++)band(d,n,rnd(0,.09),1800,6500,t=>t>.012?-1:Math.exp(-t*380),rnd(.4,1))},.05],
  roofhit:[.5,(d,n)=>{thudS(d,n,0,[[0,200,20,1.6],[200,700,45,.6],[700,2500,140,.15]]);modes(d,n,0,[[138*rnd(.9,1.1),26,.5],[262*rnd(.9,1.1),40,.3],[410,60,.12]])},.08],
  glasstap:[.2,(d,n)=>{const f=rnd(.92,1.1);modes(d,n,0,[[640*f,70,.5],[1390*f,95,.35],[2450*f,130,.2]]);band(d,n,0,1500,6000,t=>t>.008?-1:Math.exp(-t*500),.5);band(d,n,0,0,300,t=>t>.04?-1:Math.exp(-t*90),.4)},.05],
  doorslam:[.4,(d,n)=>{thudS(d,n,0,[[0,160,24,1.6],[160,600,50,.7],[600,2200,120,.2]]);band(d,n,.012,1500,5000,t=>t>.02?-1:Math.exp(-t*200),.35);modes(d,n,0,[[96,22,.5],[185,34,.25]])},.1],
  scrape:[1.5,(d,n)=>{const du=rnd(1.1,1.4),w=rnd(11,17);band(d,n,0,500,3200,t=>t>du?-1:Math.pow(Math.sin(Math.PI*t/du),.7)*(.55+.45*Math.sin(TAU*w*t+3*Math.sin(2.3*t))),1);band(d,n,0,0,220,t=>t>du?-1:Math.pow(Math.sin(Math.PI*t/du),.7),.6)},.08],
  wiper:[.68,(d,n)=>{const du=rnd(.5,.54),fl=rnd(27,36),ph=rnd(0,6.28),f0=rnd(142,160);
    band(d,n,.02,1100,4200,t=>t>du?-1:Math.pow(Math.sin(Math.PI*t/du),.75)*(.8+.2*Math.sin(TAU*fl*t+ph)),1);band(d,n,.02,180,700,t=>t>du?-1:Math.pow(Math.sin(Math.PI*t/du),.6),.6);
    for(let i=0;i<n;i++){const t=i/SR,e=t<du+.04?Math.min(1,t/.03)*Math.min(1,(du+.04-t)/.05):0;d[i]+=.02*e*(Math.sin(TAU*f0*t)+.6*Math.sin(TAU*f0*2.01*t+1)+.35*Math.sin(TAU*f0*3.02*t+2))}
    thudS(d,n,du+.02,[[0,170,45,.75],[170,650,95,.32]]);band(d,n,du+.02,1500,5200,t=>t>.01?-1:Math.exp(-t*520),.1)},.05],
  cannon:[2.6,(d,n)=>{const f0=rnd(40,58),kb=op(140),d1=(rnd(.28,.5)*SR)|0,d2=(rnd(.7,1.1)*SR)|0;let bd=0;
    for(let i=0;i<n;i++){const t=i/SR,w=R()*2-1;bd+=(w-bd)*kb;d[i]=Math.sin(TAU*f0*t*(1+.6*Math.exp(-t*14)))*Math.exp(-t*5)+bd*3*Math.exp(-t*7)*Math.min(1,t/.004)}
    for(let i=d1;i<n;i++)d[i]+=.38*d[i-d1];for(let i=d2;i<n;i++)d[i]+=.22*d[i-d2]},.15],
  surf:[9,(d,n)=>{const k1=op(260),k2=op(60),k3=op(900);let a=0,b=0,c=0,m=1;
    for(let i=0;i<n;i++){const t=i/SR,w=R()*2-1;a+=(w-a)*k1;b+=(a-b)*k2;c+=(w-c)*k3;if((i&255)===0)m=.7+.3*Math.sin(t*5.3)+.25*Math.sin(t*13.7+1);
      const e=Math.min(1,t/.5)*Math.exp(-Math.max(0,t-1.2)/2.4);d[i]=e*m*(a*2.2+b*9+(c-a)*.5*Math.exp(-t*.9))}},.2],
  zudon:[.3,(d,n)=>{const f0=rnd(40,46),k1=op(900),k2=op(180);let a=0,b=0,ph=0;
    for(let i=0;i<n;i++){const t=i/SR,w=R()*2-1;a+=(w-a)*k1;b+=(a-b)*k2;ph+=TAU*f0*(1+2.2*Math.exp(-t*34))/SR;
      const e=Math.min(1,t/.0015)*(t<.17?1:Math.max(0,.5+.5*Math.cos(Math.PI*(t-.17)/.07)))*(t<.24?1:0);
      d[i]=Math.tanh((Math.sin(ph)*1.5+.5*Math.sin(ph*2.01)*Math.exp(-t*12)+a*2.2*Math.exp(-t*45)+b*5*Math.exp(-t*9))*1.8)*e}},.1],
  blast:[7,(d,n)=>{const f0=rnd(34,42),k1=op(700),k2=op(110);let a=0,b=0;
    for(let i=0;i<n;i++){const t=i/SR,w=R()*2-1;a+=(w-a)*k1;b+=(a-b)*k2;d[i]=a*1.6*Math.exp(-t*16)*Math.min(1,t/.002)+Math.sin(TAU*f0*t*(1+1.2*Math.exp(-t*12)))*Math.exp(-t*2.2)*1.3+b*9*Math.exp(-t*1.1)*Math.min(1,t/.03)}
    for(const [dl,gn] of[[.42,.5],[.95,.42],[1.7,.34],[2.8,.26]]){const o=(dl*SR)|0;for(let i=n-1;i>=o;i--)d[i]+=gn*d[i-o]*.6}},.15],
  stomp:[3.2,(d,n)=>{const f0=rnd(26,34),kb=op(90),k2=op(38);let b1=0,b2=0;
    for(let i=0;i<n;i++){const t=i/SR,w=R()*2-1;b1+=(w-b1)*kb;b2+=(b1-b2)*k2;
      d[i]=Math.sin(TAU*f0*t*(1+.9*Math.exp(-t*9)))*Math.exp(-t*2.6)*Math.min(1,t/.012)+.55*Math.sin(TAU*f0*2.02*t)*Math.exp(-t*4)+.3*Math.sin(TAU*f0*3.1*t)*Math.exp(-t*6)+b2*26*Math.exp(-t*1.7)*Math.min(1,t/.05)+b1*1.2*Math.exp(-t*7)}},.1],
  aagun:[2.6,(d,n)=>{const f0=rnd(52,70),k1=op(1500),k2=op(190),n0=(.5*SR)|0;let a=0,b=0;
    for(let i=0;i<n0;i++){const t=i/SR,w=R()*2-1;a+=(w-a)*k1;b+=(a-b)*k2;d[i]=Math.sin(TAU*f0*t*(1+1.3*Math.exp(-t*40)))*Math.exp(-t*10)*1.2+a*2.4*Math.exp(-t*34)*Math.min(1,t/.0012)+b*6*Math.exp(-t*8)}
    echoS(d,n,n0,[[rnd(.2,.34),.5,900],[rnd(.6,.85),.36,520],[rnd(1.25,1.7),.24,320]])},.12],
  flak:[2.2,(d,n)=>{const f0=rnd(95,130),k1=op(2600),k2=op(420),n0=(.3*SR)|0;let a=0,b=0;
    for(let i=0;i<n0;i++){const t=i/SR,w=R()*2-1;a+=(w-a)*k1;b+=(a-b)*k2;d[i]=a*2.6*Math.exp(-t*30)*Math.min(1,t/.0008)+b*3*Math.exp(-t*13)+Math.sin(TAU*f0*t*(1+.8*Math.exp(-t*50)))*Math.exp(-t*16)*.8}
    echoS(d,n,n0,[[rnd(.45,.6),.34,1100],[rnd(.95,1.3),.22,600]])},.12],
  brrt:[3.2,(d,n)=>{const f=rnd(52,62),k1=op(1100),n0=(1.5*SR)|0;let a=0;
    for(let i=0;i<n0;i++){const t=i/SR,ph=(t*f)%1,w=R()*2-1;a+=((w*.7+.3)*Math.exp(-ph*9)-a)*k1;d[i]=a*Math.min(1,t/.02,(1.5-t)/.08)}
    echoS(d,n,n0,[[rnd(.42,.55),.42,700],[rnd(1,1.3),.26,380]])},.12],
  jet:[4.4,(d,n)=>{const tp=rnd(2,2.3),k2=op(130);let a=0,a2=0,b=0;
    for(let i=0;i<n;i++){const t=i/SR,w=R()*2-1,x=t-tp,fc=x<0?260+1500*Math.exp(-x*x/.5):170+1590*Math.exp(-x*x/.25),k=op(fc);
      a+=(w-a)*k;a2+=(a-a2)*k;b+=(w-b)*k2;const e=Math.exp(-x*x/(x<0?.9:1.5))*Math.min(1,t/.2,(4.4-t)/.4);d[i]=e*(a2*3+b*2.2*(x>0?1.3:.6))}},.15],
  laugh:[2.9,(d,n,o,rt)=>{const pat=LPATS.includes(o.pat)?o.pat:pickR(LPATS),open=R()<.4,voiced=open?rnd(.7,.95):rnd(.22,.45),f0s=rnd(430,540)*(open?.92:1.05)*(pat==='up'?.9:1)*rt;
    const F1=open?svf(980*rnd(.93,1.07),5):svf(620*rnd(.9,1.1),5),F2=open?svf(1850*rnd(.93,1.07),7):svf(2450*rnd(.93,1.07),7),F3=svf(3750,8);
    let ns=(open?rnd(4,7):rnd(5,9))|0;if(pat==='short')ns=rnd(2,4)|0;if(pat==='flat')ns=rnd(6,10)|0;
    const syl=[],half=Math.ceil(ns/2);let t0=.04,per=rnd(.15,.19)*(pat==='flat'?.8:1);
    for(let i=0;i<ns;i++){const u=ns>1?i/(ns-1):0;let fm=Math.pow(.955,i),am=Math.pow(.86,i);
      if(pat==='up'){fm=Math.pow(1.035,i);am=.6+.4*u}else if(pat==='arch'){fm=1+.22*Math.sin(Math.PI*u);am=.55+.45*Math.sin(Math.PI*Math.min(1,u*1.3))}
      else if(pat==='squeal'){fm=i?Math.pow(.95,i):1.38}else if(pat==='two'){const h=i<half,k=h?i:i-half;fm=(h?1:1.08)*Math.pow(.96,k);am=(h?1:.7)*Math.pow(.86,k)}
      else if(pat==='short'){fm=1-.03*i;am=1-.25*i}else if(pat==='flat'){fm=1+.02*Math.sin(i*2.1);am=.7+.3*Math.sin(i*1.3)}
      const first=pat==='squeal'&&i===0;syl.push([t0,per*rnd(.5,.62)*(first?2.2:1),am*rnd(.85,1.1)*(i?1:.85),f0s*fm*rnd(.97,1.03)]);
      t0+=per*(first?1.9:1);if(pat==='two'&&i===half-1)t0+=rnd(.3,.45);per*=pat==='up'?rnd(.95,1):rnd(1.02,1.09)}
    let ph=0,prev=0;
    for(let i=0;i<n;i++){const t=i/SR;let v=0,asp=0,f0=0;
      for(let j=0;j<ns;j++){const q=syl[j],x=(t-q[0])/q[1];if(x>=0&&x<1){v=q[2]*Math.sin(Math.PI*Math.pow(x,.7));f0=q[3]*(1+.1*Math.sin(Math.PI*x)-.06*x)}
        const xb=(t-q[0]+.035)/.05;if(xb>=0&&xb<1)asp=Math.max(asp,q[2]*.5*Math.sin(Math.PI*xb))}
      const w=R()*2-1;let src=w*asp*.25;
      if(v>0){ph+=f0*(1+.012*(R()-.5))/SR;ph-=Math.floor(ph);const gl=ph<.62?Math.pow(Math.sin(Math.PI*ph/.62),2):0;src+=(gl-.31)*voiced*v+w*v*(1-voiced)*.3*(.4+.6*gl)}
      const dx=src-prev;prev=src;d[i]=runF(F1,dx)+runF(F2,dx)*.8+runF(F3,dx)*.35}},.25],
  hum:[8,(d,n,o,rt)=>{const tonic=rnd(247,300)*rt,mel=pickR([[0,2,4,2,0,-3,0],[4,2,0,2,4,7,4,2],[0,0,-3,0,2,0,-3],[7,4,2,4,0,2]]),cut=R()<.4?mel.length-(rnd(1,3)|0):mel.length,notes=[];
    let t=.05,ph=0,f=tonic,l=0;for(let i=0;i<cut;i++){const du=rnd(.55,1.05);notes.push([t,du,tonic*Math.pow(2,(mel[i]+rnd(-.25,.05))/12)]);t+=du+(R()<.2?rnd(.3,.6):0)}
    const kf=1-Math.exp(-1/(SR*.045)),kn=op(900);
    for(let i=0;i<n;i++){const tt=i/SR;let a=0,tg=f;for(let j=0;j<notes.length;j++){const q=notes[j],x=(tt-q[0])/q[1];if(x>=0&&x<1){a=Math.pow(Math.sin(Math.PI*Math.pow(x,.6)),.7);tg=q[2]*(1+.011*Math.sin(32.7*tt)*Math.min(1,x*2))}}
      f+=(tg-f)*kf;ph+=f/SR;ph-=Math.floor(ph);const w=TAU*ph;l+=((R()*2-1)-l)*kn;d[i]=a*(Math.sin(w)+.32*Math.sin(2*w)+.1*Math.sin(3*w)+.04*Math.sin(4*w)+l*.5)}},.25],
  // 息：雑音を、口や鼻の形の共鳴（帯域通過を並べたもの）に通し、ふくらんで消える形をつける
  puff:[o=>(o.sec||VDUR[VT[o.kind]?o.kind:'out'])+.1,(d,n,o)=>{const kind=VT[o.kind]?o.kind:'out',dur=o.sec||VDUR[kind],tr=o.trem||0,tf=rnd(3.5,5.5),ph=rnd(0,6.28),m=Math.min(n,N(dur)),w=white(m),x=new Float32Array(m);
    VT[kind].forEach(([f,q,g],i)=>{const ff=f*rnd(.93,1.08),fr=kind==='haa'&&i===0?env([[0,ff,'l'],[.1,ff,'l'],[.1+dur*.8,600+(ff-600)*.135,'l']],m):ff,y=biq(w,'bp',fr,q);for(let j=0;j<m;j++)x[j]+=y[j]*g});
    const y=biq(x,'lp',VLP[kind],.5);
    for(let j=0;j<m;j++){const u=j/(m-1),t=u*dur;let a=kind==='haa'?Math.min(1,t/.07)*Math.exp(-3*u)*Math.sqrt(1-u):kind==='gasp'?Math.pow(Math.sin(Math.PI*Math.pow(u,1.7)),1.2):kind==='out'||kind==='nout'?Math.pow(Math.sin(Math.PI*Math.pow(u,.8)),1.6):Math.pow(Math.sin(Math.PI*u),1.6);
      a*=1-tr*.5*(.5+.5*Math.sin(TAU*tf*t+ph+1.1*Math.sin(1.7*t)));d[j]=Math.max(0,a)*y[j]}},.3]};
// 雷鳴：いつも遠い。腹に響く低い轟きが、ゆっくりふくらんで、長く転がる。山からの返りが3つ。左右は別の雑音
function thunder(M,o){const kind=o.kind===0||o.kind===1||o.kind===2?o.kind:(R()*3)|0,len=10,n=N(len),env_=new Float32Array(n),benv=new Float32Array(n),Lr=[new Float32Array(n),new Float32Array(n)];
  const t1=rnd(.9,2.2),rolls=[[t1,rnd(1.2,1.8),1],[rnd(.05,.4),rnd(.6,1),rnd(.35,.6)]];
  for(let i=(rnd(6,10)|0);i>0;i--){const t=rnd(.3,6.2);rolls.push([t,rnd(.5,1.5),Math.exp(-Math.abs(t-t1)/2.6)*rnd(.4,.9)])}
  for(const [t0,w,a] of rolls){const i0=(t0*SR)|0,m=Math.min(n-i0,(w*4.6*SR)|0);for(let j=0;j<m;j++){const x=j/SR;env_[i0+j]+=a*Math.min(1,x/.28)*Math.exp(-x/w)}}
  if(kind<2){const i0=(rnd(.02,.2)*SR)|0,m=(1.6*SR)|0,a=kind?.5:.9;for(let j=0;j<m;j++){const x=j/SR;benv[i0+j]+=a*Math.min(1,x/.06)*Math.exp(-x/.34)}}
  const ph=[rnd(0,6.28),rnd(0,6.28),rnd(0,6.28)],D=[1.1,2.3,3.7],GK=[.55,.4,.28],FK=[300,200,140];
  for(let c=0;c<2;c++){const d=Lr[c],k1=op(100),k3=op(42),k5=op(260),k7=op(170);let l1=0,l2=0,l3=0,l4=0,l5=0,l6=0,l7=0,mod=1;
    for(let i=0;i<n;i++){const w=R()*2-1,e=env_[i];l1+=(w-l1)*k1;l2+=(l1-l2)*k1;l3+=(w-l3)*k3;l4+=(l3-l4)*k3;l5+=(w-l5)*k5;l6+=(w-l6)*k7;l7+=(l6-l7)*k7;
      if((i&63)===0){const t=i/SR;mod=.6+.4*(.5*Math.sin(11.3*t+ph[0])+.3*Math.sin(21.7*t+ph[1])+.2*Math.sin(37.1*t+ph[2]+c))}
      d[i]=e*mod*(l2*7+l5*(kind===2?.9:1.8))+e*l4*26+benv[i]*(l7*5+l4*14)}
    const dry=d.slice();for(let k=0;k<3;k++){const dl=(D[k]*(c?1.04:1)*SR)|0,kf=op(FK[k]);let f=0;for(let i=dl;i<n;i++){f+=(dry[i-dl]-f)*kf;d[i]+=GK[k]*f}}
    const fo=(SR*1.5)|0;for(let i=0;i<fo;i++)d[n-1-i]*=i/fo}
  peakTo(Lr,.8);for(let i=0;i<n;i++){M.L[i]+=Lr[0][i];M.Rr[i]+=Lr[1][i];M.W[i]+=(Lr[0][i]+Lr[1][i])*.05}}
// 鳴りつづける床（1.1.0）
Object.assign(BED,{
  rain(M,sec,rt,o){const n=N(sec),Lc=new Float32Array(n),Rc=new Float32Array(n),cnt=Math.round(94*sec*(o.amount!=null?o.amount:1));
    for(let k=0;k<cnt;k++){const i0=(R()*n)|0,pan=R(),big=R()<.14,a=(big?1:.4)*Math.pow(R(),1.6)+.05,dec=big?rnd(130,240):rnd(380,900),kc=op(big?rnd(450,1300):rnd(1800,6500)),kl=op(big?110:900),m=Math.min(n,(SR*6/dec)|0);let l1=0,l2=0;
      for(let j=0;j<m;j++){const w=R()*2-1;l1+=(w-l1)*kc;l2+=(l1-l2)*kl;const v=a*(l1-l2)*Math.exp(-j/SR*dec)*Math.min(1,j/6),i=(i0+j)%n;Lc[i]+=v*(1-pan*.8);Rc[i]+=v*(.2+pan*.8)}}
    peakTo([Lc,Rc],.7);const hs=mul(biq(white(n),'bp',5200,.5),.05*(o.hiss!=null?o.hiss:1));
    for(let i=0;i<n;i++){M.L[i]+=Lc[i]+hs[i];M.Rr[i]+=Rc[i]+hs[i];M.W[i]+=(Lc[i]+Rc[i])*.04}},
  wind(M,sec){const n=N(sec),w=white(n),lp=biq(w,'lp',600,.5);for(let i=0;i<n;i++)w[i]-=lp[i];const x=mul(biq(w,'bp',lfo(.11,260,n,1500),.5),lfo(.07,.25,n,.75));peakTo([x],.6);M.add(x,0,1,.1)},
  road(M,sec,rt,o){const n=N(sec),hp=x=>{const l=biq(x,'lp',36,.5);for(let i=0;i<n;i++)x[i]-=l[i];return x},a=hp(biq(mul(white(n),.7),'lp',420,.6)),b=hp(biq(mul(white(n),.83),'lp',420,.6)),t=mul(biq(white(n),'bp',950,.7),.35*(o.tire!=null?o.tire:1));
    for(let i=0;i<n;i++){a[i]+=t[i]*.5;b[i]+=t[i]*.5}peakTo([a,b],.7);M.add(a,0,.7071,.04,-.55);M.add(b,0,.7071,.04,.55)},
  heli(M,sec){const n=N(sec),f=65/6,k1=op(520),k2=op(110),k3=op(1400),k4=op(380),dry=new Float32Array(n),d=new Float32Array(n);let a=0,b=0,c=0,e=0;
    for(let i=0;i<n;i++){const t=i/SR,ph=(t*f)%1,w=R()*2-1,pe=Math.exp(-ph*6.5)*Math.min(1,ph/.012);a+=(w-a)*k1;b+=(a-b)*k2;c+=(w-c)*k3;e+=(c-e)*k4;
      const am=.72+.2*Math.sin(TAU*t/3)+.08*Math.sin(TAU*t/1.2+1);dry[i]=am*(a*1.5*pe+b*5*pe+Math.sin(TAU*64*ph/f)*Math.exp(-ph*8)*.5+(c-e)*.1*(1+.5*Math.sin(TAU*t*f)))}
    const o=(.33*SR)|0,k=op(600);let lp=0;for(let i=0;i<n;i++){lp+=(dry[(i-o+n)%n]-lp)*k;d[i]=dry[i]+.32*lp}peakTo([d],.7);M.add(d,0,1,.1)},
  siren(M,sec,rt){const n=N(sec),dry=new Float32Array(n),d=new Float32Array(n),two=TAU/SR;let p1=0,p2=0;
    const wail=(u,f0,f1,r,h)=>{const x=u<r?u/r:u<r+h?1:Math.max(0,1-(u-r-h)/(1-r-h)),q=x*x*(3-2*x);return f0+(f1-f0)*(u<r?q:Math.pow(q,.85))};
    for(let i=0;i<n;i++){const t=i/SR,f1=wail((t/8)%1,290,600,.26,.4)*(1+.004*Math.sin(TAU*t*.9)),f2=wail(((t+3.1)/10)%1,255,535,.25,.34)*(1+.004*Math.sin(TAU*t*.7+1));
      p1+=two*f1*rt;p2+=two*f2*rt;const a1=.25+.75*(f1-290)/310,a2=.25+.75*(f2-255)/280;
      dry[i]=a1*(Math.sin(p1)+.5*Math.sin(2*p1)+.3*Math.sin(3*p1))+.75*a2*(Math.sin(p2)+.5*Math.sin(2*p2)+.28*Math.sin(3*p2))}
    for(let i=0;i<n;i++)d[i]=.4*dry[i];
    for(const [dl,gn,fc] of[[.7,.5,1800],[1.35,.46,1300],[2.2,.42,950],[3.3,.34,700],[4.6,.26,520]]){const k=op(fc),o=(dl*SR)|0;let lp=0;for(let i=o;i<n;i++){lp+=(dry[i-o]-lp)*k;d[i]+=gn*lp}}
    peakTo([d],.7);M.add(d,0,1,.1)}});
const NAMES2=[['tirethud','段差を越える','hit','car',''],['rattle','内装のびびり','hit','car',''],['roofhit','屋根に当たる','hit','car',''],['glasstap','窓を叩く','hit','car',''],['doorslam','扉が閉まる','hit','car',''],['scrape','屋根を擦る','hit','car',''],['wiper','ワイパー','hit','car','ひと拭き'],
  ['thunder','遠い雷鳴','hit','weather','10秒'],['rain','雨','bed','weather','粒と、さあっという音'],['wind','風切り音','bed','weather',''],['road','タイヤと路面','bed','weather',''],
  ['cannon','遠い砲声','hit','far',''],['aagun','高射砲','hit','far','ドン'],['flak','上空の炸裂','hit','far','パン'],['brrt','ガトリング砲','hit','far','ブーーー'],['zudon','ズドン','hit','far','重い一発'],['blast','爆風の轟き','hit','far',''],['stomp','地響き','hit','far',''],['surf','崖に崩れる海','hit','far','9秒'],['jet','爆撃機が通りすぎる','hit','far',''],['heli','ヘリ','bed','far',''],['siren','遠いサイレン','bed','far','40秒でひとまわり'],
  ['laugh','子供の笑い声','hit','voice',''],['hum','鼻歌','hit','voice','8秒'],['puff','息','hit','voice','吸う・吐く・のむ']];
// どんな音でも、AM ラジオごしに
function radio(x,o){o=o||{};rs=o.seed!=null?((o.seed*2654435761)>>>0)||1:(Math.random()*4294967296)>>>0;const st=Array.isArray(x),A=st?x:[x],sr=o.rate||x.rate||SR,n=A[0].length,m=new Float32Array(n);
  for(const c of A)for(let i=0;i<n;i++)m[i]+=c[i]/A.length;amRadio(m,sr);peakTo([m],.8);
  if(!st){m.rate=sr;return m}const out=A.map(()=>m.slice());out.rate=sr;out.seconds=n/sr;return out}
const NAMES=[['heartbeat','心拍','hit','二連打'],['thump','心拍の一打','hit',''],['bell','鐘','hit','調和しない倍音。音程が垂れ下がる'],['toll','鐘を何打か','hit','6.4秒おき'],['boom','轟音','hit',''],['reel','引き寄せる','hit',''],['devour','飲みこむ','hit',''],['feed','捕食','hit','引き寄せて、飲みこむ'],
  ['suck','吸いこみ','hit','だんだん大きくなって、ぷつりと切れる'],['sting','スティング','hit','吸いこみ、無音、一撃'],['rage','激昂','hit','無音のあと、すべてが同時に'],['scream','悲鳴','hit',''],['tinnitus','耳鳴り','hit',''],
  ['drone','低いうなり','bed',''],['cluster','ぶつかった和音','bed',''],['shepard','下がりつづける音','bed',''],['breath','呼吸','bed',''],['whisper','ささやき','bed',''],['rumble','地鳴り','bed','']].map(([name,label,kind,note])=>({name,label,kind,group:'horror',note})).concat(NAMES2.map(([name,label,kind,group,note])=>({name,label,kind,group,note})));
function render(name,o){o=o||{};rs=o.seed!=null?((o.seed*2654435761)>>>0)||1:(Math.random()*4294967296)>>>0;const rt=Math.pow(2,(o.st||0)/12),rv=o.reverb!=null?o.reverb:1,tail=rv>0?3.5:0;let M;
  const hit=(sec,f)=>{M=Mix(sec+tail);f()};
  if(BED[name]){const sec=o.sec||8;M=Mix(sec+tail);BED[name](M,sec,rt,o);const f=N(.25),e=N(sec);for(const A of [M.L,M.Rr,M.W])for(let i=0;i<M.n;i++){const a=Math.min(1,i/f),b=i<e-f?1:Math.max(0,(e-i)/f);A[i]*=a*b}}
  else if(name==='thump')hit(1.5,()=>thump(M,0,o.amp||.8,o.f||46,rt));
  else if(name==='heartbeat'){const g=o.agit||0,a=.6+.5*g;hit(2.2,()=>{thump(M,0,a,46,rt);thump(M,.5-.15*g,a*.62,54,rt)})}
  else if(name==='bell'){const d=o.decay||1;hit(19*d+(o.echo===false?0:5),()=>strike(M,0,o.f||146.83,o.amp||.4,o.bend!=null?o.bend:25,rt,d,o.echo!==false))}
  else if(name==='toll'){const c=o.count||3;hit(c*6.4+20,()=>{for(let k=0;k<c;k++)strike(M,k*6.4,o.f||146.83,.34-k*.03,25,rt)})}
  else if(name==='boom')hit(8,()=>boom(M,0,o.amp||1));
  else if(name==='reel'){const s=o.sec||5;hit(s+.6,()=>reel(M,0,s))}
  else if(name==='devour')hit(20,()=>devour(M,0,rt));
  else if(name==='feed'){const s=o.sec||5;hit(s+20,()=>{reel(M,0,s);devour(M,s,rt)})}
  else if(name==='suck'){const s=o.sec||7;hit(s+.2,()=>suck(M,0,s))}
  else if(name==='sting'){const s=o.sec||7;hit(s+1.1+20,()=>{suck(M,0,s);boom(M,s+1.1,1);strike(M,s+1.1,73.42,.5,60,rt)})}
  else if(name==='rage'){const l=o.lead!=null?o.lead:1.6;hit(l+20,()=>rageHit(M,l,rt))}
  else if(name==='scream')hit(4.8,()=>scream(M,0));
  else if(name==='tinnitus')hit(9.2,()=>tinnitus(M,0));
  else if(name==='thunder')hit(10,()=>thunder(M,o));
  else if(GEN[name]){const G=GEN[name],len=typeof G[0]==='function'?G[0](o):G[0];hit(len,()=>{const n=N(len),d=new Float32Array(n);G[1](d,n,o,rt);if(o.radio)amRadio(d,SR);peakTo([d],.8);const fo=Math.min(n,(SR*.004)|0);for(let i=0;i<fo;i++)d[n-1-i]*=i/fo;M.add(d,0,1,G[2])})}
  else throw new Error('OtoFX: 知らない音「'+name+'」（使えるのは '+NAMES.map(x=>x.name).join(' ')+'）');
  reverb(M,.55*rv);const g=o.gain!=null?o.gain:1,soft=v=>{const a=Math.abs(v);return a<=.6?v:Math.sign(v)*(.6+.38*Math.tanh((a-.6)/.38))};
  for(let i=0;i<M.n;i++){M.L[i]=soft(M.L[i]*g*.5);M.Rr[i]=soft(M.Rr[i]*g*.5)}
  const out=[M.L,M.Rr];out.rate=SR;out.seconds=M.n/SR;return out}
function buffer(ac,x){const b=ac.createBuffer(2,x[0].length,x.rate||SR);b.copyToChannel(x[0],0);b.copyToChannel(x[1],1);return b}
return{VERSION,SR,render,buffer,radio,NAMES};
})();
if(typeof module==='object'&&module.exports)module.exports=OtoFX;else(typeof self!=='undefined'?self:this).OtoFX=OtoFX;
