/* 聴きくらべの見本。text＝いまの版に読ませる文、rows＝手で書いた行（Claude が、聴かずに、音声学の目安から書いたもの） */
(function(root){
const E=[
{id:'tenki',title:'きょうは いい てんきですね。',voice:'onna',text:"きょ'うわ い'い て'んきですね。",note:'アクセントの山で声を張り、句の終わりへゆるめる。澄んだ子音のあとは高く入り、濁った子音で少し沈む。「ね」は長く、上がって下がる。',rows:`voice onna
f0 215
# きょ'うは
k    60   asp 20
j    66   p +4.6
o    150  p +5.4 +5.8@25 +4.0@60 +1.8@100   soft .3 bright .7
w    55   p +1.0
a    100  p +0.8 +1.3 +1.8                  soft .5 bright .55
# い'い
i    165  p +3.4 +4.2@30 +2.6@65 +0.8@100   soft .35 bright .65 vol 1.3
# て'んきですね
t    62   asp 28
e    72   p +4.4 +3.6 +3.0                  soft .35 bright .65
N    82   p +1.6 -0.2
k    60   asp 16
i    64   p -0.4 -1.6 -2.2                  soft .5 bright .55 vol 1.3
d    45   p -3.0
e    62   p -2.6 -3.0 -3.2
s    75
u    40   p -3.6                            vol .7
n    52   p -3.9
e    170  p -3.7 -1.6@40 -1.2@60 -3.4@100   soft .7 breathy .3
_    300
`},
{id:'matte',title:'ちょっと まって ください。',voice:'seinen',text:"ちょ'っと ま'って くださ'い。",note:'「っ」は、閉じている長さで書く。頼みごとなので、語尾は下げきって、息まじりに、少しきしませる。',rows:`voice seinen
f0 130
# ちょ'っと
tS   127
o    56   p +4.2 +4.6 +4.2                  soft .3 bright .7
t    150  asp 22
o    72   p +1.4 +0.6 +0.3                  soft .5 bright .55
# ま'って
m    55   p +1.2
a    62   p +3.0 +3.7 +3.4                  soft .35 bright .65
t    140  asp 22
e    100  p +0.6 -0.5 -1.0                  soft .5 bright .55
# くださ'い
k    58   asp 16
u    44   p -0.4 -1.0                       vol .8
d    45   p -1.7
a    66   p -0.9 +0.3 +1.0
s    82
a    78   p +2.3 +2.5 +1.6                  soft .4 bright .6
i    160  p +0.4 -2.6@50 -5.6@100           soft .75 breathy .35 creak .3 vol .85
_    300
`},
{id:'hontou',title:'えっ、ほんとうに？',voice:'musume',text:"えっ、ほんとうに？",note:'おどろき。「えっ」は高く短く切り、間を置く。「に」を長く伸ばして、大きく上げる。',rows:`voice musume
f0 218
e    105  p +2.6 +4.8                       soft .3 bright .8
_    240
h    60
o    62   p -1.6 -0.8 +0.1                  soft .5 bright .6
n    86   p +0.9
t    58   asp 26
o    155  p +2.6 +2.8@35 +2.2@100
n    50   p +1.8
i    200  p +1.6 +2.4@35 +8.6@100           soft .45 bright .7 breathy .2
_    300
`},
{id:'uta',title:'かぜに なって（節をつけて）',voice:'onna',text:"かぜに なって。",note:'高さを音名で書いた例。語りと歌のあいだ。音の頭は下からしゃくり、伸ばす音にゆらしを入れる。話し声の芯（16kHz）で鳴らしているので、歌声の芯とは音がちがう。',rows:`voice onna
k    60   asp 25
a    340  p C4-90 C4@22 C4@100  vib .3 5.4 170   soft .5 bright .6
z    70   p D4-40
e    330  p D4-60 D4@20 D4@100  vib .3 5.5 160
n    60   p E4-30
i    340  p E4-50 E4@20 E4@100  vib .35 5.5 160
n    60   p F4-30
a    240  p F4-40 F4@25 F4@100
t    160  asp 25
e    900  p G4-80 G4@12 G4@88 G4-60@100  vib .5 5.6 260  soft .6 breathy .2
_    300
`}];
/* 子音の聴きくらべ：1音だけちがう組を、続けて読む */
const C=[
{id:'sa',show:'さ、し、す、せ、そ。しゃ、しゅ、しょ。',aim:'さ行としゃ行の雑音。お・う の前で低くなるか',text:"さ、し、す、せ、そ。しゃ、しゅ、しょ。"},
{id:'za',show:'ざ、じ、ず、ぜ、ぞ。かぜ、かず、もじ。',aim:'濁った摩擦音が、声と一体に聞こえるか',text:"ざ、じ、ず、ぜ、ぞ。か'ぜ、か'ず、も'じ。"},
{id:'ra',show:'ら、り、る、れ、ろ。からだ、あられ、だれ。',aim:'ら行のはじく感じ。だ行との区別',text:"ら、り、る、れ、ろ。からだ、あられ、だ'れ。"},
{id:'pa',show:'ぱ、た、か。ば、だ、が。',aim:'破裂の頭のはじける感じ',text:"ぱ、た、か。ば、だ、が。"},
{id:'tsu',show:'つき、ちず、つち、ひふ。',aim:'つ・ち・ひ・ふ の雑音',text:"つき'、ち'ず、つち'、ひ'ふ。"},
{id:'bun',show:'さくらが、ざわざわと ゆれる。',aim:'文の中で',text:"さくらが、ざ'わざわと ゆれる。"},
{id:'sin',show:'sin, thin, fin.',aim:'s・th・f の区別',text:"[ 'sIn, 'TIn, 'fIn. ]"},
{id:'sip',show:'sip, zip, ship.',aim:'s・z・sh の区別',text:"[ 'sIp, 'zIp, 'SIp. ]"},
{id:'pat',show:'pat, bat. ten, den. cap, gap.',aim:'澄んだ破裂音と濁った破裂音',text:"[ 'p{t, 'b{t. 'tEn, 'dEn. 'k{p, 'g{p. ]"},
{id:'jeep',show:'cheap, jeep. very, berry.',aim:'破擦音と、v・b',text:"[ 'tSip, 'dZip. 'vEri, 'bEri. ]"},
{id:'zebra',show:'The zebra is very lazy.',aim:'文の中で',text:"[ D@ 'zibr@ Iz 'vEri 'leIzi. ]"}];
root.OtoConPairs=C;
root.OtoRowsExamples=E;if(typeof module!=='undefined'&&module.exports)module.exports=Object.assign(E,{pairs:C});
})(typeof self!=='undefined'?self:this);
