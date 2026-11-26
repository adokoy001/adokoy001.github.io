/* ===== 回：大きすぎる数（巨大数） =====
   1000倍のくりかえし → 宇宙の原子とグーゴル → 矢印表記 → 3の塔（3↑↑↑3）→ チェーン表記 → グラハム数 → 最後の10けた → 果て。
   どの場面も「くりかえしの、くりかえし」が目で見えるように作っている。
   ・立方体：1000個のかたまりが、次の段では1個の立方体になる（無限にズームアウトしつづける入れ子）
   ・塔：前の答えが、次の塔の高さになる。3↑↑↑3 の塔は、1段1センチで太陽までの半分（目盛り1つで10倍）
   ・グラハム数：64階建て。各階の矢印の本数は、下の階の答え
   ・最後の10けた：3の塔を1段ずつ高くすると、下のけたが右から順に止まっていく（11段で10けたが止まる）
   数字は、出典で確かめたもの（グラハム数の定義・チェーン表記での挟み方・最後の10けた・もとの問題の下限13）と、
   ここで計算したもの（3↑↑4 のけた数と頭のけた、塔の高さ、秒の換算、塔の下10けた）。原子の数は見積もり（10の78〜82乗くらい）。
   場面の動きは、場面ごとの目標へ寄せる作り（セリフの長さに頼らない）。KETA の段の増え方だけは、場面に入ってからの秒で決める */
(function () {
  const B = Kaisetsu.BGM;
  // くりかえし：3拍子のマリンバ。3つずつ増えていく感じ
  B.kyo_kazu = { label: '巨大数：くりかえし', gain: 0.85, score: `
title kyo_kazu
tempo 100
meter 3
reverb 3
delay 0.75
@arp marimba vol=0.32 rev=0.4 dly=0.25 len=0.5
[D4 A4 E5 A4 D5 A4 | D4 A4 E5 A4 D5 A4 | Bb3 F4 C5 F4 Bb4 F4 | Bb3 F4 C5 F4 Bb4 F4 | C4 G4 D5 G4 C5 G4 | C4 G4 D5 G4 C5 G4 | A3 E4 B4 E4 A4 E4 | A3 E4 C#5 E4 A4 E4 |]*R
@bell kalimba vol=0.18 rev=0.6 dly=0.4
[-:3 | -:2 A5 | -:3 | -:2 F5 | -:3 | -:2 G5 | -:3 | E5:3 |]*R
@pad pad vol=0.16 rev=0.6 cut=1600
[D3+A3+F4:3 | D3+A3+E4:3 | Bb2+F3+D4:3 | Bb2+F3+C4:3 | C3+G3+E4:3 | C3+G3+D4:3 | A2+E3+C4:3 | A2+E3+C#4:3 |]*R
@bass sub vol=0.28
[D2:3 | D2:3 | Bb1:3 | Bb1:3 | C2:3 | C2:3 | A1:3 | A1:3 |]*R
@tick drums vol=0.12 len=0.5
[[h? - h?? h? - h?? |]*8]*R
` };
  // のぼりつづける：シェパード音階。6オクターブを重ね、半音ずつ上がる。音量は対数周波数の上の釣鐘（F#4 が頂点）なので、
  // ひろがる：オルガンの細かい音型と、時計の刻み。3拍子。sodai1 → 2 → 3 と、同じ8小節のまま楽器が増える
  B.kyo_sodai1 = { label: '巨大数：ひろがる（うすい）', gain: 0.95, score: `
title kyo_sodai1
tempo 108
meter 3
reverb 5.5
delay 0.5
def o1 = D5 F5 D5 F5 D5 F5 | E5 G5 E5 G5 E5 G5 | F5 A5 F5 A5 F5 A5 | F5 A5 F5 A5 D6 A5 | F5 Bb5 F5 Bb5 F5 Bb5 | G5 C6 G5 C6 G5 C6 | A5 C6 A5 C6 A5 C6 | G5 C6 G5 C6 E5 G5 |
def ch = Bb2+F3+Bb3+D4:3 | C3+G3+C4+E4:3 | D3+A3+D4+F4:3 | D3+A3+D4+F4:3 | Bb2+F3+Bb3+D4:3 | C3+G3+C4+E4:3 | F3+C4+F4+A4:3 | E3+C4+E4+G4:3 |
def chH = D4+F4+Bb4:3 | E4+G4+C5:3 | F4+A4+D5:3 | F4+A4+D5:3 | F4+Bb4+D5:3 | G4+C5+E5:3 | A4+C5+F5:3 | G4+C5+E5:3 |
def bs = Bb1:3 | C2:3 | D2:3 | D2:3 | Bb1:3 | C2:3 | F1:3 | E1:3 |
def mel = D5:3 | E5:3 | F5:6 | F5:3 | G5:3 | A5:3 | G5:2 E5:1 |
def mel2 = A5:3 | G5:3 | A5:6 | D6:3 | C6:3 | C6:3 | C6:2 G5:1 |
@ost organ vol=0.34 rev=0.6 dly=0.2 len=0.5
[$o1]*R
@tick drums vol=0.13 len=0.5
[[w? - w?? - w?? - |]*8]*R
@pad pad vol=0.16 rev=0.7 cut=1800
[$ch]*R
@sub sub vol=0.26
[$bs]*R
` };
  // ひろがる：弦の長い旋律とコーラスを重ねる
  B.kyo_sodai2 = { label: '巨大数：ひろがる（弦とコーラス）', gain: 0.95, score: `
title kyo_sodai2
tempo 108
meter 3
reverb 5.5
delay 0.5
def o1 = D5 F5 D5 F5 D5 F5 | E5 G5 E5 G5 E5 G5 | F5 A5 F5 A5 F5 A5 | F5 A5 F5 A5 D6 A5 | F5 Bb5 F5 Bb5 F5 Bb5 | G5 C6 G5 C6 G5 C6 | A5 C6 A5 C6 A5 C6 | G5 C6 G5 C6 E5 G5 |
def ch = Bb2+F3+Bb3+D4:3 | C3+G3+C4+E4:3 | D3+A3+D4+F4:3 | D3+A3+D4+F4:3 | Bb2+F3+Bb3+D4:3 | C3+G3+C4+E4:3 | F3+C4+F4+A4:3 | E3+C4+E4+G4:3 |
def chH = D4+F4+Bb4:3 | E4+G4+C5:3 | F4+A4+D5:3 | F4+A4+D5:3 | F4+Bb4+D5:3 | G4+C5+E5:3 | A4+C5+F5:3 | G4+C5+E5:3 |
def bs = Bb1:3 | C2:3 | D2:3 | D2:3 | Bb1:3 | C2:3 | F1:3 | E1:3 |
def mel = D5:3 | E5:3 | F5:6 | F5:3 | G5:3 | A5:3 | G5:2 E5:1 |
def mel2 = A5:3 | G5:3 | A5:6 | D6:3 | C6:3 | C6:3 | C6:2 G5:1 |
@ost organ vol=0.34 rev=0.6 dly=0.2 len=0.5
[$o1]*R
@tick drums vol=0.13 len=0.5
[[w? - w?? - w?? - |]*8]*R
@pad pad vol=0.16 rev=0.7 cut=1800
[$ch]*R
@sub sub vol=0.26
[$bs]*R
@str strings vol=0.32 rev=0.75
[$mel]*R
@cho choir vol=0.24 rev=0.8
[$chH]*R
` };
  // ひろがる：低いオルガンの厚い和音・金管・太鼓・高い鐘まで全部
  B.kyo_sodai3 = { label: '巨大数：ひろがる（全部）', gain: 0.95, score: `
title kyo_sodai3
tempo 108
meter 3
reverb 5.5
delay 0.5
def o1 = D5 F5 D5 F5 D5 F5 | E5 G5 E5 G5 E5 G5 | F5 A5 F5 A5 F5 A5 | F5 A5 F5 A5 D6 A5 | F5 Bb5 F5 Bb5 F5 Bb5 | G5 C6 G5 C6 G5 C6 | A5 C6 A5 C6 A5 C6 | G5 C6 G5 C6 E5 G5 |
def ch = Bb2+F3+Bb3+D4:3 | C3+G3+C4+E4:3 | D3+A3+D4+F4:3 | D3+A3+D4+F4:3 | Bb2+F3+Bb3+D4:3 | C3+G3+C4+E4:3 | F3+C4+F4+A4:3 | E3+C4+E4+G4:3 |
def chH = D4+F4+Bb4:3 | E4+G4+C5:3 | F4+A4+D5:3 | F4+A4+D5:3 | F4+Bb4+D5:3 | G4+C5+E5:3 | A4+C5+F5:3 | G4+C5+E5:3 |
def bs = Bb1:3 | C2:3 | D2:3 | D2:3 | Bb1:3 | C2:3 | F1:3 | E1:3 |
def mel = D5:3 | E5:3 | F5:6 | F5:3 | G5:3 | A5:3 | G5:2 E5:1 |
def mel2 = A5:3 | G5:3 | A5:6 | D6:3 | C6:3 | C6:3 | C6:2 G5:1 |
@ost organ vol=0.34 rev=0.6 dly=0.2 len=0.5
[$o1]*R
@tick drums vol=0.13 len=0.5
[[w? - w?? - w?? - |]*8]*R
@pad pad vol=0.16 rev=0.7 cut=1800
[$ch]*R
@sub sub vol=0.26
[$bs]*R
@str strings vol=0.32 rev=0.75
[$mel2]*R
@cho choir vol=0.24 rev=0.8
[$chH]*R
@big organ vol=0.5 rev=0.8
[$ch]*R
@brs brass vol=0.3 rev=0.7
[Bb2:3 | C3:3 | D3:6 | Bb2:3 | C3:3 | F3:3 | E3:3 |]*R
@hi bell vol=0.16 rev=0.8 dly=0.3 len=0.5 oct=1
[$o1]*R
@tim drums vol=0.55 rev=0.6 len=1
[[k - - | - - - | k - - | - - k? |]*2]*R
` };
  // かけあがる：同じ和音を4拍子で速く。オルガンの16分音符に、4つ打ちのキックとシンセベース（クラシックの楽器＋テクノのリズム）
  B.kyo_drive1 = { label: '巨大数：かけあがる', gain: 0.9, score: `
title kyo_drive1
tempo 138
reverb 4.5
delay 0.75
def o1 = D5 F5 D5 F5 D5 F5 D5 F5 D5 F5 D5 F5 D5 F5 D5 F5 | E5 G5 E5 G5 E5 G5 E5 G5 E5 G5 E5 G5 E5 G5 E5 G5 | F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 | F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 D6 A5 F5 A5 | F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 | G5 C6 G5 C6 G5 C6 G5 C6 G5 C6 G5 C6 G5 C6 G5 C6 | A5 C6 A5 C6 A5 C6 A5 C6 A5 C6 A5 C6 A5 C6 A5 C6 | G5 C6 G5 C6 G5 C6 G5 C6 E5 G5 E5 G5 E5 G5 E5 G5 |
def ac = Bb1 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb2 | C2 C2 C3 C2 C2 C3 C2 C3 C2 C2 C3 C2 C2 C3 C2 C3 | D2 D2 D3 D2 D2 D3 D2 D3 D2 D2 D3 D2 D2 D3 D2 D3 | D2 D2 D3 D2 D2 D3 D2 D3 D2 D2 D3 D2 D2 D3 D2 D3 | Bb1 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb2 | C2 C2 C3 C2 C2 C3 C2 C3 C2 C2 C3 C2 C2 C3 C2 C3 | F1 F1 F2 F1 F1 F2 F1 F2 F1 F1 F2 F1 F1 F2 F1 F2 | E1 E1 E2 E1 E1 E2 E1 E2 E1 E1 E2 E1 E1 E2 E1 E2 |
def st = D4+F4 D4+F4 D4+F4 D4+F4 D4+F4 D4+F4 D4+F4 D4+F4 | E4+G4 E4+G4 E4+G4 E4+G4 E4+G4 E4+G4 E4+G4 E4+G4 | F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 | F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 | F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 | G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 | A4+C5 A4+C5 A4+C5 A4+C5 A4+C5 A4+C5 A4+C5 A4+C5 | G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 |
def ar = Bb4 D5 F5 Bb5 Bb4 D5 F5 Bb5 Bb4 D5 F5 Bb5 Bb4 D5 F5 Bb5 | C5 E5 G5 C6 C5 E5 G5 C6 C5 E5 G5 C6 C5 E5 G5 C6 | D5 F5 A5 D6 D5 F5 A5 D6 D5 F5 A5 D6 D5 F5 A5 D6 | D5 A5 D6 F6 D5 A5 D6 F6 D5 A5 D6 F6 D5 A5 D6 F6 | Bb4 F5 Bb5 D6 Bb4 F5 Bb5 D6 Bb4 F5 Bb5 D6 Bb4 F5 Bb5 D6 | C5 G5 C6 E6 C5 G5 C6 E6 C5 G5 C6 E6 C5 G5 C6 E6 | F5 A5 C6 F6 F5 A5 C6 F6 F5 A5 C6 F6 F5 A5 C6 F6 | E5 G5 C6 E6 E5 G5 C6 E6 E5 G5 C6 E6 E5 G5 C6 E6 |
def ch = Bb2+F3+Bb3+D4:4 | C3+G3+C4+E4:4 | D3+A3+D4+F4:4 | D3+A3+D4+F4:4 | Bb2+F3+Bb3+D4:4 | C3+G3+C4+E4:4 | F3+C4+F4+A4:4 | E3+C4+E4+G4:4 |
def chH = D4+F4+Bb4:4 | E4+G4+C5:4 | F4+A4+D5:4 | F4+A4+D5:4 | F4+Bb4+D5:4 | G4+C5+E5:4 | A4+C5+F5:4 | G4+C5+E5:4 |
def bs = Bb1:4 | C2:4 | D2:4 | D2:4 | Bb1:4 | C2:4 | F1:4 | E1:4 |
def mel = D4:4 | E4:4 | F4:6 A4:2 | D5:4 | C5:4 | A4:4 | G4:2 E4:2 |
def mel2 = A4:4 | G4:4 | A4:6 D5:2 | F5:4 | E5:4 | C5:4 | C5:2 E5:2 |
@ost organ vol=0.3 rev=0.55 dly=0.2 len=0.25
[$o1]*R
@pad pad vol=0.18 rev=0.7 cut=1800
[$ch]*R
@hat drums vol=0.2 len=0.25
[[- - h?? - - - h? - - - h?? - - - h? - |]*8]*R
@kick drums vol=0.6 len=0.25
[[k - - - k - - - k - - - k - - - |]*8]*R
@acid acid vol=0.3 len=0.25 cut=1400
[$ac]*R
@sub sub vol=0.26
[$bs]*R
` };
  // かけあがる：スネア・弦の刻み・金管の旋律・厚いオルガン・コーラス・シンセのアルペジオまで全部
  B.kyo_drive2 = { label: '巨大数：かけあがる（全部）', gain: 0.9, score: `
title kyo_drive2
tempo 138
reverb 4.5
delay 0.75
def o1 = D5 F5 D5 F5 D5 F5 D5 F5 D5 F5 D5 F5 D5 F5 D5 F5 | E5 G5 E5 G5 E5 G5 E5 G5 E5 G5 E5 G5 E5 G5 E5 G5 | F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 | F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 F5 A5 D6 A5 F5 A5 | F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 F5 Bb5 | G5 C6 G5 C6 G5 C6 G5 C6 G5 C6 G5 C6 G5 C6 G5 C6 | A5 C6 A5 C6 A5 C6 A5 C6 A5 C6 A5 C6 A5 C6 A5 C6 | G5 C6 G5 C6 G5 C6 G5 C6 E5 G5 E5 G5 E5 G5 E5 G5 |
def ac = Bb1 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb2 | C2 C2 C3 C2 C2 C3 C2 C3 C2 C2 C3 C2 C2 C3 C2 C3 | D2 D2 D3 D2 D2 D3 D2 D3 D2 D2 D3 D2 D2 D3 D2 D3 | D2 D2 D3 D2 D2 D3 D2 D3 D2 D2 D3 D2 D2 D3 D2 D3 | Bb1 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb1 Bb2 Bb1 Bb2 | C2 C2 C3 C2 C2 C3 C2 C3 C2 C2 C3 C2 C2 C3 C2 C3 | F1 F1 F2 F1 F1 F2 F1 F2 F1 F1 F2 F1 F1 F2 F1 F2 | E1 E1 E2 E1 E1 E2 E1 E2 E1 E1 E2 E1 E1 E2 E1 E2 |
def st = D4+F4 D4+F4 D4+F4 D4+F4 D4+F4 D4+F4 D4+F4 D4+F4 | E4+G4 E4+G4 E4+G4 E4+G4 E4+G4 E4+G4 E4+G4 E4+G4 | F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 | F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 F4+A4 | F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 F4+Bb4 | G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 | A4+C5 A4+C5 A4+C5 A4+C5 A4+C5 A4+C5 A4+C5 A4+C5 | G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 G4+C5 |
def ar = Bb4 D5 F5 Bb5 Bb4 D5 F5 Bb5 Bb4 D5 F5 Bb5 Bb4 D5 F5 Bb5 | C5 E5 G5 C6 C5 E5 G5 C6 C5 E5 G5 C6 C5 E5 G5 C6 | D5 F5 A5 D6 D5 F5 A5 D6 D5 F5 A5 D6 D5 F5 A5 D6 | D5 A5 D6 F6 D5 A5 D6 F6 D5 A5 D6 F6 D5 A5 D6 F6 | Bb4 F5 Bb5 D6 Bb4 F5 Bb5 D6 Bb4 F5 Bb5 D6 Bb4 F5 Bb5 D6 | C5 G5 C6 E6 C5 G5 C6 E6 C5 G5 C6 E6 C5 G5 C6 E6 | F5 A5 C6 F6 F5 A5 C6 F6 F5 A5 C6 F6 F5 A5 C6 F6 | E5 G5 C6 E6 E5 G5 C6 E6 E5 G5 C6 E6 E5 G5 C6 E6 |
def ch = Bb2+F3+Bb3+D4:4 | C3+G3+C4+E4:4 | D3+A3+D4+F4:4 | D3+A3+D4+F4:4 | Bb2+F3+Bb3+D4:4 | C3+G3+C4+E4:4 | F3+C4+F4+A4:4 | E3+C4+E4+G4:4 |
def chH = D4+F4+Bb4:4 | E4+G4+C5:4 | F4+A4+D5:4 | F4+A4+D5:4 | F4+Bb4+D5:4 | G4+C5+E5:4 | A4+C5+F5:4 | G4+C5+E5:4 |
def bs = Bb1:4 | C2:4 | D2:4 | D2:4 | Bb1:4 | C2:4 | F1:4 | E1:4 |
def mel = D4:4 | E4:4 | F4:6 A4:2 | D5:4 | C5:4 | A4:4 | G4:2 E4:2 |
def mel2 = A4:4 | G4:4 | A4:6 D5:2 | F5:4 | E5:4 | C5:4 | C5:2 E5:2 |
@ost organ vol=0.3 rev=0.55 dly=0.2 len=0.25
[$o1]*R
@pad pad vol=0.18 rev=0.7 cut=1800
[$ch]*R
@hat drums vol=0.2 len=0.25
[[- - h?? - - - h? - - - h?? - - - h? - |]*8]*R
@kick drums vol=0.6 len=0.25
[[k - - - k - - - k - - - k - - - |]*8]*R
@acid acid vol=0.3 len=0.25 cut=1400
[$ac]*R
@sub sub vol=0.26
[$bs]*R
@snr drums vol=0.42 len=0.25
[[- - - - s - - - - - - - s - - - |]*7 - - - - s - - - - - s - s s? s s |]*R
@stac violins vol=0.26 rev=0.5 len=0.5
[$st]*R
@brs brass vol=0.3 rev=0.65
[$mel]*R
@big organ vol=0.42 rev=0.75
[$ch]*R
@cho choir vol=0.24 rev=0.8
[$chH]*R
@arp lead vol=0.16 rev=0.5 dly=0.3 len=0.25
[$ar]*R
@strm strings vol=0.26 rev=0.7 oct=1
[$mel2]*R
@crash drums vol=0.4 len=4
[y -:28]*R
` };
  // 1周（6小節）で1オクターブ上がって元の和音に戻る＝ループの継ぎ目でも、ずっと上がりつづけて聞こえる
  B.kyo_noboru = { label: '巨大数：のぼりつづける', gain: 0.9, score: `
title kyo_noboru
tempo 72
reverb 4
delay 0.5
@o2 sine vol=0.043 rev=0.55 dly=0.15
[C2??:2 C#2??:2 | D2??:2 D#2??:2 | E2??:2 F2??:2 | F#2??:2 G2??:2 | G#2?:2 A2?:2 | A#2:2 B2:2 |]*R
@o3 sine vol=0.269 rev=0.55 dly=0.15
[C3??:2 C#3??:2 | D3??:2 D#3??:2 | E3?:2 F3?:2 | F#3?:2 G3?:2 | G#3?:2 A3:2 | A#3:2 B3:2 |]*R
@o4 sine vol=0.36 rev=0.55 dly=0.15
[C4:2 C#4:2 | D4:2 D#4:2 | E4:2 F4:2 | F#4:2 G4:2 | G#4:2 A4:2 | A#4:2 B4:2 |]*R
@o5 sine vol=0.291 rev=0.55 dly=0.15
[C5:2 C#5:2 | D5:2 D#5:2 | E5?:2 F5?:2 | F#5?:2 G5?:2 | G#5??:2 A5??:2 | A#5??:2 B5??:2 |]*R
@o6 sine vol=0.053 rev=0.55 dly=0.15
[C6:2 C#6:2 | D6?:2 D#6?:2 | E6??:2 F6??:2 | F#6??:2 G6??:2 | G#6??:2 A6??:2 | A#6??:2 B6??:2 |]*R
@o7 sine vol=0.01 rev=0.55 dly=0.15
[C7:2 C#7?:2 | D7?:2 D#7??:2 | E7??:2 F7??:2 | F#7??:2 G7??:2 | G#7??:2 A7??:2 | A#7??:2 B7??:2 |]*R
@air pad vol=0.08 rev=0.7 cut=900
[D3+A3:4 | D3+A3:4 | D3+Bb3:4 | D3+Bb3:4 | D3+A3:4 | D3+A3:4 |]*R
@tick drums vol=0.14 len=0.5
[[w? - - - w?? - - - |]*6]*R
` };
  // 果て：低いうなりと、遠い鐘だけ
  B.kyo_hate = { label: '巨大数：果て', gain: 0.95, score: `
title kyo_hate
tempo 50
reverb 7
@drone sub vol=0.3
[D2:4 | D2:4 | D2:4 | D2:4 | D2:4 | D2:4 | D2:4 | D2:4 |]*R
@air pad vol=0.1 rev=0.85 cut=900
[D3+A3:8 | Eb3+A3:8 | D3+G3:8 | D3+A3:8 |]*R
@bell bell vol=0.07 rev=0.9 dly=0.5
[A5??:4 | -:4 | -:4 | -:4 | D6??:4 | -:4 | -:4 | -:4 |]*R
` };
})();

Kaisetsu.episode({
  id: 'kyodai', fileName: '大きすぎる数',
  title: '大きすぎる数', titleLines: ['大きすぎる数'], eyebrow: '巨大数',
  background: '#070C22',
  cast: {
    A: { name: 'ノア', role: '解説', color: '#B0487A', voice: { voice: 'otona', speed: 1.05 },
         look: { hair: 'bob', hairColor: 'budou', eye: 'sumire', ornament: 'orbit', hat: 'none' } },
    B: { name: 'ヒナ', role: '聞き役', color: '#C9762C', voice: { voice: 'shoujo', speed: 1.1 },
         look: { hair: 'short', hairColor: 'akagane', eye: 'midori', ornament: 'none', hat: 'knit' } },
  },
  chapters: [['1000倍', ['hako', 'sen', 'man', 'oku', 'cho']], ['宇宙の原子', ['genshi', 'googol']], ['矢印', ['tashi', 'yaji', 'ue', 'kotae1']], ['1段ずつ', ['dan12', 'dan3', 'dan4', 'yomu']],
    ['3の塔', ['tou', 'nobori']], ['グラハム数', ['kusari', 'g1', 'g2', 'g64', 'hasamu', 'kotae']], ['果て', ['keta', 'hate']]],
  // 数が大きくなる場面は「ひろがる」（3拍子、ゆったり）、手に負えなくなる場面は「かけあがる」（4拍子、速い）。説明の場面は、もとのマリンバ
  bgm: { hako: 'kyo_sodai1', sen: 'kyo_sodai1', man: 'kyo_sodai1', oku: 'kyo_sodai1', cho: 'kyo_sodai1', genshi: 'kyo_sodai2', googol: 'kyo_sodai2',
    tashi: 'kyo_kazu', yaji: 'kyo_kazu', ue: 'kyo_kazu', kotae1: 'kyo_kazu', dan12: 'kyo_drive1', dan3: 'kyo_drive1', dan4: 'kyo_noboru', yomu: 'kyo_noboru',
    tou: 'kyo_drive1', nobori: 'kyo_drive2', kusari: 'kyo_kazu', g1: 'kyo_drive1', g2: 'kyo_drive2', g64: 'kyo_sodai3', hasamu: 'kyo_sodai3',
    kotae: 'wonder', keta: 'tension', hate: 'kyo_hate' },

  world(K) {
    const T = K.THREE, V3 = T.Vector3, scene = K.scene, cam = K.camera, PI = Math.PI;
    const { toon, outline, glow, clamp, lerp, sstep } = K;
    const rnd = K.rand(27182);
    const BG = '#070C22', INK = '#0B1230';
    const FONT = '"Zen Maru Gothic","Hiragino Maru Gothic ProN","Hiragino Sans","Noto Sans JP",system-ui,sans-serif';
    const MONO = '"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';
    scene.fog = new T.Fog(BG, 30, 80);
    const amb = scene.children.find(o => o.isAmbientLight), sun = K.sun;

    /* ---------- 道具 ---------- */
    // 不透明度：材質が配列の物にも効く版
    const fadeAll = (obj, a) => { obj.visible = a > 0.01; obj.traverse(o => { const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      for (const m of ms) { if (m.userData.base === undefined) m.userData.base = m.opacity; m.transparent = a < 0.999; m.opacity = m.userData.base * a; } }); };
    // 字は、ページの字体の読み込みが終わってから描き直す
    const redraws = [];
    try { document.fonts && document.fonts.ready.then(() => redraws.forEach(f => f())); } catch (e) {}
    function ctex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; const t = new T.CanvasTexture(c); t.anisotropy = 4;
      const run = () => { draw(c.getContext('2d'), w, h); t.needsUpdate = true; }; run(); redraws.push(run); return t; }
    // 数の札：表に字、側面は無地。set(字, 地の色) で書きかえる
    function card(text, o) {
      o = Object.assign({ w: 1, h: 1, d: 0.14, bg: '#FFF4D6', fg: '#161C33', side: '#D9C493', font: FONT, weight: 900, fs: 0.66 }, o || {});
      const cw = Math.min(2048, Math.round(o.w * 220)), ch = Math.min(512, Math.round(o.h * 220));
      const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch; const tex = new T.CanvasTexture(cv); tex.anisotropy = 4;
      let cur = String(text), bg = o.bg;
      const draw = () => { const x = cv.getContext('2d'); x.fillStyle = bg; x.fillRect(0, 0, cw, ch); x.fillStyle = o.fg;
        let fs = ch * o.fs; x.font = `${o.weight} ${fs}px ${o.font}`; const mw = x.measureText(cur).width;
        if (mw > cw * 0.86) { fs *= cw * 0.86 / mw; x.font = `${o.weight} ${fs}px ${o.font}`; }
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cur, cw / 2, ch / 2 + fs * 0.05); tex.needsUpdate = true; };
      draw(); redraws.push(draw);
      const sideM = toon(o.side), frontM = toon('#ffffff', { map: tex });
      const m = new T.Mesh(new T.BoxGeometry(o.w, o.h, o.d), [sideM, sideM, sideM, sideM, frontM, sideM]);
      const ol = outline(m, INK); ol.scale.set(1 + 0.07 / o.w, 1 + 0.07 / o.h, 1 + 0.07 / o.d);
      m.userData.set = (t, b) => { t = String(t); b = b || bg; if (t !== cur || b !== bg) { cur = t; bg = b; draw(); } };
      return m;
    }
    const shaftGeo = new T.CylinderGeometry(0.045, 0.045, 0.4, 8), headGeo = new T.ConeGeometry(0.13, 0.24, 12);
    const ARROW = '#7CE0FF', arrowMat = toon(ARROW), arrowOl = new T.MeshBasicMaterial({ color: INK, side: T.BackSide });
    function arrow() { const g = new T.Group(); const s = new T.Mesh(shaftGeo, arrowMat); s.position.y = -0.1; const h = new T.Mesh(headGeo, arrowMat); h.position.y = 0.21; g.add(s, h);
      for (const m of [s, h]) { const o = new T.Mesh(m.geometry, arrowOl); o.scale.setScalar(1.12); m.add(o); } return g; }
    const M4 = new T.Matrix4(), Q4 = new T.Quaternion(), S4 = new T.Vector3(), P4 = new T.Vector3(), SC = new T.Vector3(), UP = new V3(0, 1, 0);

    // 星空：カメラについてくる
    const sp = []; for (let i = 0; i < 1600; i++) { const u = rnd() * 2 - 1, a = rnd() * PI * 2, r = Math.sqrt(1 - u * u); sp.push(r * Math.cos(a) * 400, u * 400, r * Math.sin(a) * 400); }
    const starGeo = new T.BufferGeometry(); starGeo.setAttribute('position', new T.Float32BufferAttribute(sp, 3));
    const starMat = new T.PointsMaterial({ color: '#cfd8ff', size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.75 });
    const stars = new T.Points(starGeo, starMat); stars.frustumCulled = false; scene.add(stars);

    /* ======================= 1000倍の入れ子（x = 0） =======================
       10×10×10 の立方体。いちばん手前の角の1個（9,9,9）を「いまの単位」にして、ブロックの手前の角を中心に縮める。
       縮みきると、ブロック全体が、次の段の1個とぴったり重なる（ズームの比は10、1周で個数は1000倍） */
    const REC = new T.Group(); scene.add(REC);
    const CELLC = '#7CE0FF', EDGE = '#0E2A52';
    const borderTex = ctex(128, 128, (x, w, h) => { x.fillStyle = CELLC; x.fillRect(0, 0, w, h); x.strokeStyle = EDGE; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8); });
    const gridTex = ctex(256, 256, (x, w, h) => { x.fillStyle = CELLC; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(14,42,82,.62)'; x.lineWidth = 2.6;
      for (let i = 1; i < 10; i++) { const p = i * w / 10; x.beginPath(); x.moveTo(p, 0); x.lineTo(p, h); x.moveTo(0, p); x.lineTo(w, p); x.stroke(); }
      x.strokeStyle = EDGE; x.lineWidth = 3.4; x.strokeRect(1.7, 1.7, w - 3.4, h - 3.4); });
    const cellGeo = new T.BoxGeometry(1, 1, 1);
    const recM = { fB: toon('#ffffff', { map: borderTex }), fG: toon('#ffffff', { map: gridTex }), aB: toon('#ffffff', { map: borderTex }), aG: toon('#ffffff', { map: gridTex }), bG: toon('#ffffff', { map: gridTex }) };
    const cellPos = [], cellR = [], cellS = [];
    for (let ix = 0; ix < 10; ix++) for (let iy = 0; iy < 10; iy++) for (let iz = 0; iz < 10; iz++) if (ix || iy || iz) {
      cellPos.push(new V3(ix + 0.5, iy + 0.5, iz + 0.5)); cellR.push(Math.hypot(ix, iy, iz) / Math.hypot(9, 9, 9)); cellS.push(Math.max(ix, iy, iz)); }
    const lvA = new T.Group(); REC.add(lvA);
    const focus = new T.Mesh(cellGeo, recM.fB); focus.position.set(0.5, 0.5, 0.5);
    const sibA = new T.InstancedMesh(cellGeo, recM.aB, cellPos.length); sibA.frustumCulled = false; sibA.userData.sc = -1; lvA.add(focus, sibA);
    // まわりの999個を、ちょうど n 個だけ置く（n は小数。端数の1個は途中まで育つ）。
    // 置く順は、隅からの殻の順（2×2×2 → 3×3×3 → …）、殻の中は隅に近い順。ズームの1周（f が 0→1）で n ＝ 1000^f − 1 なので、
    // 画面の立方体の数が、いつもそのまま「いまの単位が何個か」になる（3段で止まると、1兆のかたまりが7個と少し）
    const order = cellPos.map((p, i) => i).sort((a, b) => (cellS[a] - cellS[b]) || (cellR[a] - cellR[b]));
    function growSibs(im, n) {
      const q = Math.round(n * 100) / 100; if (im.userData.sc === q) return; im.userData.sc = q;
      order.forEach((i, r) => { const k = Math.max(0.0001, clamp(q - r, 0, 1)); M4.makeScale(k, k, k); M4.setPosition(cellPos[i]); im.setMatrixAt(i, M4); });
      im.instanceMatrix.needsUpdate = true; im.visible = q > 0.001;
    }
    // 格子の部屋：床と奥の2枚の壁。ブロックは部屋の奥の隅を中心に縮むので、隅を通る3枚の面は動かない。
    // 線の間隔は「いまの立方体1個の大きさ c」の 10倍ずつ（c/10・c・10c・100c・1000c）。線の濃さは間隔だけで決まるので、
    // 1000倍を1周して c が10倍に戻っても、格子の見た目は継ぎ目なくつながる（どこまでも縮みつづける方眼紙）
    const gridU = { c: { value: 10 }, base: { value: new T.Color('#0B1434') }, line: { value: new T.Color('#6F8CF0') }, fogC: { value: new T.Color(BG) }, near: { value: 45 }, far: { value: 130 } };
    const gridMat = new T.ShaderMaterial({ uniforms: gridU, extensions: { derivatives: true }, side: T.DoubleSide, polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 2,
      vertexShader: `varying vec2 vUV; varying float vDist;
        void main(){ vUV = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vDist = length(mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform float c; uniform vec3 base, line, fogC; uniform float near, far; varying vec2 vUV; varying float vDist;
        float lines(float X, float px){ vec2 g = vUV / X; vec2 w = max(fwidth(g), vec2(1e-6));
          vec2 d = abs(fract(g - 0.5) - 0.5) / (w * px); float l = 1.0 - min(min(d.x, d.y), 1.0);
          return l * (1.0 - smoothstep(0.1, 0.3, max(w.x, w.y))); }
        float inten(float X){ float e = log(X) / log(10.0); return smoothstep(-1.0, 0.2, e) * mix(0.3, 1.0, smoothstep(0.2, 1.0, e)); }
        void main(){
          float a = 0.0, X = c * 0.1;
          for (int j = 0; j < 5; j++) { float i = inten(X); a = max(a, i * lines(X, 0.8 + 1.1 * i)); X *= 10.0; }
          vec3 col = mix(base, line, a * 0.85);
          gl_FragColor = vec4(mix(col, fogC, smoothstep(near, far, vDist)), 1.0); }` });
    const ROOM = new T.Group(); scene.add(ROOM);
    const RW = 160;
    { // 床（y = 0）：uv ＝ (x, z)
      const fl = new T.Mesh(new T.PlaneGeometry(RW, RW), gridMat); fl.rotation.x = -PI / 2; fl.position.set(RW / 2, 0, RW / 2);
      { const uv = fl.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * RW, RW - uv.getY(i) * RW); }
      // x = 0 の壁：uv ＝ (z, y)
      const wx = new T.Mesh(new T.PlaneGeometry(RW, RW), gridMat); wx.rotation.y = PI / 2; wx.position.set(0, RW / 2, RW / 2);
      { const uv = wx.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, RW - uv.getX(i) * RW, uv.getY(i) * RW); }
      // z = 0 の壁：uv ＝ (x, y)
      const wz = new T.Mesh(new T.PlaneGeometry(RW, RW), gridMat); wz.position.set(RW / 2, RW / 2, 0);
      { const uv = wz.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * RW, uv.getY(i) * RW); }
      ROOM.add(fl, wx, wz); }
    const Z3 = Math.log10(7625597484987) / 3;           // 3↑↑3 ＝ 1000倍を 4.294回
    const ZT = { hako: 0, sen: 1, man: 2, oku: 3, cho: 4, genshi: 27, googol: 100 / 3, dan12: 1, dan3: Z3, dan4: Z3 };

    /* ---------- 3の塔を、1000倍の物差しで測る（dan12・dan3・dan4） ----------
       unitG は「最初の1個」の大きさの世界（ズームしても、最初の立方体の大きさについていく）。
       dan12：1000個ぶんの枠と、黄色の立方体 3個 → 27個（列 → 面 → 立方体）。
       dan3：枠が埋まってから、1000倍を 4.294回ズーム。dan4：1000倍の回数が止まらない（見た目のズームは1秒に1.8回まで）。
       場面の中の時刻は、声の長さ（ノア otona・速さ1.05、ヒナ shoujo・速さ1.1）から見積もった値 */
    const unitG = new T.Group(); scene.add(unitG);
    const wire = new T.Group(), wireM = new T.MeshBasicMaterial({ color: '#DDE6FF', transparent: true }); wire.material = wireM; unitG.add(wire);
    for (const a of [0, 10]) for (const b of [0, 10]) {
      const ex = new T.Mesh(new T.BoxGeometry(10.08, 0.08, 0.08), wireM); ex.position.set(5, a, b);
      const ey = new T.Mesh(new T.BoxGeometry(0.08, 10.08, 0.08), wireM); ey.position.set(a, 5, b);
      const ez = new T.Mesh(new T.BoxGeometry(0.08, 0.08, 10.08), wireM); ez.position.set(a, b, 5); wire.add(ex, ey, ez); }
    const LIT = []; for (let i = 0; i < 3; i++) LIT.push([i, 0, 0]);
    for (let iz = 0; iz < 3; iz++) for (let ix = 0; ix < 3; ix++) if (iz) LIT.push([ix, 0, iz]);
    for (let iy = 1; iy < 3; iy++) for (let iz = 0; iz < 3; iz++) for (let ix = 0; ix < 3; ix++) LIT.push([ix, iy, iz]);
    const litM = new T.InstancedMesh(new T.BoxGeometry(0.9, 0.9, 0.9), toon('#FFD166', { transparent: true }), 27);
    const litO = new T.InstancedMesh(new T.BoxGeometry(0.97, 0.97, 0.97), new T.MeshBasicMaterial({ color: '#3A2608', side: T.BackSide, transparent: true }), 27);
    LIT.forEach(([x, y, z], i) => { M4.makeTranslation(x + 0.5, y + 0.5, z + 0.5); litM.setMatrixAt(i, M4); litO.setMatrixAt(i, M4); });
    litM.frustumCulled = litO.frustumCulled = false; unitG.add(litM, litO);
    // dan12：「1段なら、3個」で3個、「2段なら」から27個まで育つ
    const litCount = t => t < 6.6 ? 0 : t < 8.0 ? 3 : Math.round(3 + 24 * sstep(8.0, 9.8, t));
    // dan4：1000倍の回数（対数で）。「4段は？」のあと動きだし、ヒナの声に合わせて 27回（宇宙の原子）・33回（グーゴル）を越え、
    // 「約1兆2千億回」で止まる
    const D4 = { t0: 2.4, t27: 3.6, t33: 4.6, tEnd: 11.0, L0: Math.log10(Z3), L27: Math.log10(27), L33: Math.log10(100 / 3), LE: Math.log10(1.2128e12) };
    const d4Log = t => t <= D4.t0 ? D4.L0 : t <= D4.t27 ? lerp(D4.L0, D4.L27, (t - D4.t0) / (D4.t27 - D4.t0)) : t <= D4.t33 ? lerp(D4.L27, D4.L33, (t - D4.t27) / (D4.t33 - D4.t27))
      : t <= D4.tEnd ? D4.L33 + (D4.LE - D4.L33) * Math.pow((t - D4.t33) / (D4.tEnd - D4.t33), 2) : D4.LE;
    const d4Z = t => { const v = 1.8, zE = Z3 + v * (D4.tEnd - D4.t0); if (t <= D4.t0) return Z3; if (t <= D4.tEnd) return Z3 + v * (t - D4.t0);
      let r = Math.ceil(zE) - zE; if (r < 0.3) r += 1; const T2 = 2 * r / v, u = Math.min(1, (t - D4.tEnd) / T2); return zE + r * (1 - (1 - u) * (1 - u)); };   // 速さを落として、ちょうど1000個そろったところで止まる
    const jaNum = n => n < 1e4 ? String(Math.floor(n)) : n < 1e8 ? Math.floor(n / 1e4) + '万' : n < 1e12 ? Math.floor(n / 1e8) + '億' : (n / 1e12).toFixed(1) + '兆';
    const countName = m => ['1個', '1000個', '100万個', '10億個', '1兆個'][m] || `10の${3 * m}乗個`;

    /* ======================= 矢印の階段と、3の塔（x = 300） ======================= */
    const OX = 300, OPS = new T.Group(); OPS.position.x = OX; scene.add(OPS);
    const STEPS = ['3＋3＋3 ＝ 3×3', '3×3×3 ＝ 3↑3', '3↑3↑3 ＝ 3↑↑3'];
    const stepG = STEPS.map((s, i) => { const g = new T.Group(); g.position.set(-3.6 + i * 3.6, i * 1.3, 0); OPS.add(g);
      const slab = new T.Mesh(new T.BoxGeometry(3.4, 0.3, 1.6), toon('#2E62D9')); slab.position.y = -0.15; g.add(slab); outline(slab, INK, 1.03);
      const c = card(s, { w: 3.2, h: 0.8, fs: 0.5 }); c.position.set(0, 0.55, 0.3); g.add(c); return g; });
    const PT = new T.Group(); PT.position.set(9, 0, 0); OPS.add(PT);
    const YEL = { bg: '#FFD166', side: '#C99A2E' };
    const t0 = card('3', Object.assign({ w: 1.5, h: 1.5, d: 0.3 }, YEL)); t0.position.set(0, 0.9, 0);
    const t1 = card('3', Object.assign({ w: 0.95, h: 0.95, d: 0.22 }, YEL)); t1.position.set(1.15, 2.1, 0);
    const t2 = card('3', Object.assign({ w: 0.6, h: 0.6, d: 0.16 }, YEL)); t2.position.set(1.85, 2.95, 0);
    const big = card('7,625,597,484,987', { w: 5.4, h: 1.1, d: 0.26, fs: 0.55, bg: '#FFF4D6' }); big.position.set(1.0, 1.4, 0.3);
    PT.add(t0, t1, t2, big);

    /* ======================= 3↑↑↑3 の塔（x = 600）：高さは目盛り1つで10倍 ======================= */
    const TX = 600, TOU = new T.Group(); TOU.position.x = TX; scene.add(TOU);
    const DEC = 4;                    // 目盛り1つ（10倍）の高さ
    const small = []; for (let i = 0; i < 3; i++) { const c = card('3', Object.assign({ w: 0.8, h: 0.8, d: 0.2 }, YEL)); c.position.set(-3.2, 0.45 + i * 0.86, 0); TOU.add(c); small.push(c); }
    const threeTex = ctex(128, 128, (x, w, h) => { x.fillStyle = '#FFD166'; x.fillRect(0, 0, w, h); x.fillStyle = '#3A2608'; x.font = `900 100px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('3', w / 2, h / 2 + 6);
      x.fillStyle = 'rgba(58,38,8,.55)'; x.fillRect(0, 0, w, 4); });
    const colTex = threeTex.clone(); colTex.needsUpdate = true; colTex.wrapS = colTex.wrapT = T.RepeatWrapping; colTex.repeat.set(4, 13 * DEC / 0.5);
    redraws.push(() => { colTex.needsUpdate = true; });
    const column = new T.Mesh(new T.CylinderGeometry(0.55, 0.55, 13 * DEC, 24, 1, false), toon('#ffffff', { map: colTex }));
    column.position.set(1.5, 13 * DEC / 2 - 0.02, 0); TOU.add(column);
    const cap = glow('#FFE9A8', 3); cap.position.set(1.5, 12.88 * DEC, 0); TOU.add(cap);
    const earth = new T.Mesh(new T.SphereGeometry(2.6, 40, 28), toon('#3E7BD6')); earth.position.set(1.5, -2.6, 0); TOU.add(earth); outline(earth, INK, 1.01);
    for (let i = 0; i < 9; i++) { const l = new T.Mesh(new T.SphereGeometry(0.8 + rnd() * 0.6, 12, 8), toon('#5BBF6A')); const a = rnd() * PI * 2, b = rnd() * 1.2 - 0.4;
      l.position.set(Math.cos(a) * Math.cos(b) * 2.2, Math.sin(b) * 2.2, Math.sin(a) * Math.cos(b) * 2.2); l.scale.set(1, 0.4, 1); l.quaternion.setFromUnitVectors(UP, l.position.clone().normalize()); earth.add(l); }
    for (let d = 0; d <= 13; d++) { const ring = new T.Mesh(new T.TorusGeometry(0.78, 0.035, 8, 36), new T.MeshBasicMaterial({ color: '#7CE0FF' })); ring.rotation.x = PI / 2; ring.position.set(1.5, d * DEC, 0); TOU.add(ring); }
    const fuji = new T.Group(); fuji.position.set(3.6, 5.58 * DEC, 0); TOU.add(fuji);
    { const c = new T.Mesh(new T.ConeGeometry(0.9, 0.75, 6), toon('#5D6E9E')); fuji.add(c); outline(c, INK, 1.04);
      const s = new T.Mesh(new T.ConeGeometry(0.33, 0.28, 6), toon('#FFFFFF')); s.position.y = 0.24; fuji.add(s); }
    const moon = new T.Mesh(new T.SphereGeometry(0.9, 28, 18), toon('#C9CCD6')); moon.position.set(5.2, 10.58 * DEC, -1); TOU.add(moon); outline(moon, INK, 1.02);
    const sunM = new T.Mesh(new T.SphereGeometry(5, 36, 24), new T.MeshBasicMaterial({ color: '#FFC24A' })); sunM.position.set(17, 13.17 * DEC, -10); TOU.add(sunM);
    const sunG = glow('#FFB13B', 24); sunG.position.copy(sunM.position); TOU.add(sunG);

    /* ======================= 3↑↑4 の数の帯（x = 750） ======================= */
    const YX = 750, YOMU = new T.Group(); YOMU.position.x = YX; scene.add(YOMU);
    const DIG = '12580142906274913178603906982032812155180467143165960151896749443812110113000177853108039032962401156958517553074515956731226398874843702136934195367433603702358978848578121703801265542160999785399101';
    for (let i = 0; i < 4; i++) { const c = card('3', Object.assign({ w: 0.7, h: 0.7, d: 0.2 }, YEL)); c.position.set(-2.4, 2.75 + i * 0.76, 0); YOMU.add(c); }
    const tapeTex = ctex(4096, 64, (x, w, h) => { x.fillStyle = '#FFF4D6'; x.fillRect(0, 0, w, h); x.fillStyle = '#161C33'; x.font = `500 34px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'center';
      for (let i = 0; i < DIG.length; i++) x.fillText(DIG[i], 8 + (i + 0.5) * (w - 16) / DIG.length, h / 2 + 2);
      x.fillStyle = 'rgba(22,28,51,.25)'; x.fillRect(0, 0, w, 3); x.fillRect(0, h - 3, w, 3); });
    const tape = new T.Mesh(new T.PlaneGeometry(41, 0.64), toon('#ffffff', { map: tapeTex, side: T.DoubleSide })); tape.position.set(19.0, 3.0, 0); YOMU.add(tape);
    const tapeEnd = new T.Mesh(new T.PlaneGeometry(60, 0.64), toon('#FFF4D6', { side: T.DoubleSide })); tapeEnd.position.set(69.5, 3.0, 0); YOMU.add(tapeEnd);

    /* ======================= チェーン表記（x = 900） ======================= */
    const CX = 900, CH = new T.Group(); CH.position.x = CX; scene.add(CH);
    const linkGeo = new T.TorusGeometry(0.2, 0.055, 10, 22), linkMat = toon('#B9C3E6');
    function chain(vals, y, z, w) {
      const g = new T.Group(); g.position.set(0, y, z); CH.add(g); const gap = w || 2.3, x0 = -(vals.length - 1) * gap / 2;
      vals.forEach((v, i) => { const c = card(v, Object.assign({ w: v.length > 1 ? 1.05 : 0.9, h: 0.9, d: 0.2 }, YEL)); c.position.set(x0 + i * gap, 0, 0); g.add(c);
        if (i) for (let j = 0; j < 3; j++) { const l = new T.Mesh(linkGeo, linkMat); l.position.set(x0 + (i - 1) * gap + 0.62 + j * (gap - 1.24) / 2, 0, 0); l.rotation.y = j % 2 ? PI / 2 : 0; g.add(l); } });
      return g;
    }
    const rowK = chain(['3', '3', '3'], 0, 0);
    const rowLo = chain(['3', '3', '64', '2'], 1.7, -14, 2.0), rowHi = chain(['3', '3', '65', '2'], -1.7, -14, 2.0);
    const gCard = card('グラハム数', { w: 3.0, h: 0.8, fs: 0.55, bg: '#FFE27A', side: '#C99A2E' }); gCard.position.set(0, 0, -14); CH.add(gCard);
    const gGl = glow('#FFE27A', 5); gGl.position.set(0, 0, -14.3); CH.add(gGl);

    /* ======================= グラハム数：64階建て（x = 1200） ======================= */
    const GX = 1200, GR = new T.Group(); GR.position.x = GX; scene.add(GR);
    const FH = 2.4, NA = 120;
    const three = card('3', Object.assign({ w: 0.8, h: 0.8, d: 0.2 }, YEL));
    const slabMat = toon('#1E2A55'), slabGeo = new T.BoxGeometry(10, 0.22, 3.2), threadMat = new T.MeshBasicMaterial({ color: '#FFD166' }), threadGeo = new T.CylinderGeometry(0.03, 0.03, FH - 0.62, 6);
    const SIGNS = new Set([1, 2, 3, 4, 8, 16, 24, 32, 40, 48, 56, 63, 64]);
    for (let k = 1; k <= 64; k++) {
      const y = (k - 1) * FH;
      const slab = new T.Mesh(slabGeo, k === 64 ? toon('#5B3FA0') : slabMat); slab.position.set(1.5, y - 0.11, 0); GR.add(slab);
      const c = three.clone(); c.position.set(-3.8, y + 0.55, 0.4); GR.add(c);
      if (k === 1) { for (let i = 0; i < 4; i++) { const a = arrow(); a.position.set(-2.75 + i * 0.5, y + 0.55, 0.4); GR.add(a); } const c2 = three.clone(); c2.position.set(-0.45, y + 0.55, 0.4); GR.add(c2); }
      if (SIGNS.has(k)) {
        const s = card(k === 1 ? '矢印 4本' : `矢印の本数 ＝ g${k - 1}`, { w: 3.4, h: 0.55, d: 0.1, fs: 0.56, bg: '#E8EEFF', side: '#9AA8D8' }); s.position.set(-1.6, y + 1.45, 0.2); GR.add(s);
        const n = card(k === 64 ? 'G' : `g${k}`, { w: 0.9, h: 0.6, d: 0.12, fs: 0.62, bg: k === 64 ? '#FFE27A' : '#E8EEFF', side: '#9AA8D8' }); n.position.set(-5.05, y + 0.55, 0.4); GR.add(n);
      }
      if (k >= 2) { const th = new T.Mesh(threadGeo, threadMat); th.position.set(-1.6, y + 1.45 - FH / 2, 0.2); GR.add(th); }
    }
    const shafts = new T.InstancedMesh(shaftGeo, arrowMat, 63 * NA), heads = new T.InstancedMesh(headGeo, arrowMat, 63 * NA);
    shafts.frustumCulled = heads.frustumCulled = false;
    for (let k = 2, i = 0; k <= 64; k++) for (let j = 0; j < NA; j++, i++) {
      const x = -2.75 + j * 0.5, y = (k - 1) * FH + 0.55;
      M4.makeTranslation(x, y - 0.1, 0.4); shafts.setMatrixAt(i, M4); M4.makeTranslation(x, y + 0.21, 0.4); heads.setMatrixAt(i, M4); }
    GR.add(shafts, heads);
    const crown = glow('#FFE27A', 9); crown.position.set(-2, 63 * FH + 1.2, 0); GR.add(crown);
    const gyAt = t => 63 * FH * sstep(0.3, 5.6, t);      // 64階まで、5秒ほどで上がる

    /* ======================= もとの問題：立方体の頂点を、2色の線で全部結ぶ。3次元 → 4次元（x = 1500） ======================= */
    const QX = 1500, QG = new T.Group(); QG.position.x = QX; scene.add(QG);
    const V4 = []; for (let i = 0; i < 16; i++) V4.push([(i & 1) ? 1 : -1, (i & 2) ? 1 : -1, (i & 4) ? 1 : -1, (i & 8) ? 1 : -1]);
    const E = []; for (let a = 0; a < 16; a++) for (let b = a + 1; b < 16; b++) E.push([a, b]);
    const rods = new T.InstancedMesh(new T.CylinderGeometry(0.02, 0.02, 1, 6), toon('#ffffff'), E.length); rods.frustumCulled = false;
    const cRed = new T.Color('#FF5A6E'), cBlue = new T.Color('#4DA3FF'), cDim = new T.Color('#1B2444'), cTmp = new T.Color();
    // 色は乱数で決める。ただし、1つの面（頂点 0〜3）の6本は、わざと全部赤にしておく＝「同じ平面の4点を結ぶ線が、ぜんぶ同じ色」の例
    const ECOL = E.map(() => rnd() < 0.5 ? cRed : cBlue), EHL = E.map(([p, q]) => p < 4 && q < 4);
    E.forEach((e, i) => { if (EHL[i]) ECOL[i] = cRed; rods.setColorAt(i, ECOL[i]); });
    const dots = new T.InstancedMesh(new T.SphereGeometry(0.08, 14, 10), toon('#FFF4D6'), 16); dots.frustumCulled = false;
    QG.add(rods, dots);
    const P3 = V4.map(() => new V3());
    // 場面の中の時刻（声の長さからの見積もり）：点だけの立方体 → 5.8秒「線で結んで、赤か青で塗る」→ 10.7秒「同じ平面の4点」を太く →
    // 17.2秒「次元を上げていくと」で、内側から2つ目の立方体が出てきて4次元の立方体になる
    const QT = { e: [6.2, 9.0], h: [11.0, 12.0, 16.6, 17.6], d: [17.8, 21.5] };
    function hyper(Tt, t) {
      const e3 = sstep(QT.e[0], QT.e[1], t), hl = sstep(QT.h[0], QT.h[1], t) - sstep(QT.h[2], QT.h[3], t), d4 = sstep(QT.d[0], QT.d[1], t);
      const a = 0.35 * Math.max(0, t - QT.d[0] - 1.2), b = Tt * 0.23, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b), big = lerp(1.75, 1, d4);
      V4.forEach((v, i) => { let [x, y, z, w] = v; if (i >= 8) w = lerp(-1, 1, d4); [x, w] = [x * ca - w * sa, x * sa + w * ca]; [y, z] = [y * cb - z * sb, y * sb + z * cb];
        const k = 2.5 / (3.4 - w) * big; P3[i].set(x * k * 1.25, y * k * 1.25, z * k * 1.25);
        const ds = (i < 8 ? 1 : d4) * (i < 4 ? 1 + 0.9 * hl : 1) * lerp(1.5, 1, d4); M4.compose(P3[i], Q4.identity(), SC.set(ds, ds, ds).addScalar(0.0001)); dots.setMatrixAt(i, M4); });
      E.forEach(([p, q], i) => { const A = P3[p], Bq = P3[q]; P4.addVectors(A, Bq).multiplyScalar(0.5); S4.subVectors(Bq, A); const len = S4.length();
        const th = e3 * (q < 8 ? 1 : d4) * (EHL[i] ? 1 + 2.4 * hl : 1) * lerp(1.4, 1, d4) + 0.0001;
        Q4.setFromUnitVectors(UP, S4.normalize()); M4.compose(P4, Q4, SC.set(th, len, th)); rods.setMatrixAt(i, M4);
        cTmp.copy(ECOL[i]); if (!EHL[i]) cTmp.lerp(cDim, 0.8 * hl); rods.setColorAt(i, cTmp); });
      rods.instanceMatrix.needsUpdate = true; dots.instanceMatrix.needsUpdate = true; rods.instanceColor.needsUpdate = true;
    }

    /* ======================= 最後の10けた（x = 1800）：3の塔を1段ずつ高くする ======================= */
    const KX = 1800, KE = new T.Group(); KE.position.x = KX; scene.add(KE);
    // 3↑↑n の下10けた（n = 1〜14。この回のために計算した値。11段から上は 2464195387 で止まる＝グラハム数の最後の10けた）
    const LAST = ['3', '27', '5597484987', '6100739387', '9660355387', '5126595387', '3200195387', '5504195387', '8064195387', '6464195387', '2464195387', '2464195387', '2464195387', '2464195387'];
    const FINAL = '2464195387', pad = s => ('          ' + s).slice(-10);
    const stableFrom = FINAL.split('').map((ch, i) => { let n = LAST.length; while (n > 1 && pad(LAST[n - 2])[i] === ch) n--; return n; });
    const ktower = []; for (let j = 0; j < 14; j++) { const c = card('3', Object.assign({ w: 0.66, h: 0.48, d: 0.16, fs: 0.8 }, YEL)); c.position.set(6.3, 0.3 + j * 0.53, 0); KE.add(c); ktower.push(c); }
    const kdig = []; for (let i = 0; i < 10; i++) { const c = card(' ', { w: 0.78, h: 1.1, d: 0.16, fs: 0.72, font: MONO, weight: 500 }); c.position.set(-3.6 + i * 0.86, 1.4, 0); KE.add(c); kdig.push(c); }
    const kSteps = t => clamp(1 + Math.floor((t - 0.6) / 0.62), 1, 14);

    /* ======================= 果て（x = 2100）：数直線 ======================= */
    const HX = 2100, HA = new T.Group(); HA.position.x = HX; scene.add(HA);
    const lineM = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 4000, 8), new T.MeshBasicMaterial({ color: '#9FB3FF' })); lineM.rotation.x = PI / 2; lineM.position.set(0, 0, -1996); HA.add(lineM);
    const ticks = new T.InstancedMesh(new T.BoxGeometry(0.03, 0.26, 0.03), new T.MeshBasicMaterial({ color: '#9FB3FF' }), 400); ticks.frustumCulled = false;
    for (let i = 0; i < 400; i++) { M4.makeTranslation(0, 0, 1.6 - i * 1.0); ticks.setMatrixAt(i, M4); } HA.add(ticks);
    const zero = card('0', { w: 0.32, h: 0.32, d: 0.08 }); zero.position.set(0, 0.36, 1.6); HA.add(zero);
    const gDot = new T.Mesh(new T.SphereGeometry(0.2, 24, 16), new T.MeshBasicMaterial({ color: '#FFE27A' })); gDot.position.set(0, 0, 0.9); HA.add(gDot);
    const gGlow = glow('#FFE27A', 1.6); gGlow.position.copy(gDot.position); HA.add(gGlow);
    const hateZ = t => 5.5 - 75 * Math.pow(sstep(2.5, 34, t), 1.4);

    /* ---------- カメラ ---------- */
    const st = { z: 0, star: 0, ue: 0, k1: 0, amb: 0.55, sun: 1.05, fn: 30, ff: 80 };
    const CAM = {
      hako:    t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      sen:     t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      man:     t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      oku:     t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      cho:     t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      genshi:  t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      googol:  t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      dan12:   t => [new V3(17 + Math.sin(t * 0.2) * 0.4, 13.5, 20.5), new V3(4.4, 3.8, 4.4)],
      dan3:    t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      dan4:    t => [new V3(21 + Math.sin(t * 0.2) * 0.6, 19, 26), new V3(5, 6.2, 5)],
      tashi:   t => [new V3(OX + Math.sin(t * 0.15) * 0.8, 3.4, 11), new V3(OX, 1.4, 0)],
      yaji:    t => [new V3(OX + 10.4 + Math.sin(t * 0.2) * 0.4, 2.7, 6.6), new V3(OX + 10.0, 1.9, 0)],
      ue:      t => [new V3(OX + 10.4 + Math.sin(t * 0.2) * 0.4, 2.7, 6.6), new V3(OX + 10.0, 1.9, 0)],
      kotae1:  t => [new V3(OX + 10.2, 2.2, 7.4), new V3(OX + 10.0, 1.5, 0)],
      tou:     t => [new V3(TX + 4.2, 2.6 + Math.min(t, 25) * 0.04, 8.2), new V3(TX - 0.6, 2.2 + Math.min(t, 25) * 0.08, 0)],
      nobori:  t => { const y = 13 * DEC * sstep(0.6, 10.5, t); return [new V3(TX + 7.8, y + 2.4, 10), new V3(TX + 2.2, y + 0.6, 0)]; },
      yomu:    t => { const x = 14 * sstep(1.5, 26, t); return [new V3(YX + x - 1.0, 3.3, 9.5), new V3(YX + x + 2.2, 2.7, 0)]; },
      kusari:  t => [new V3(CX + Math.sin(t * 0.2) * 0.5, 1.3, 7.2), new V3(CX, 0.2, 0)],
      g1:      () => [new V3(GX + 0.4, 1.6, 6.2), new V3(GX - 2.0, 0.7, 0)],
      g2:      () => [new V3(GX + 1.0, 3.6, 10.2), new V3(GX - 2.6, 2.0, 0)],
      g64:     t => { const y = gyAt(t); return [new V3(GX + 3.0, y + 2.4, 10.5), new V3(GX - 1.0, y + 0.6, 0)]; },
      hasamu:  t => [new V3(CX + Math.sin(t * 0.2) * 0.5, 0.6, -14 + 12.5), new V3(CX - 0.6, 0.9, -14)],
      kotae:   t => [new V3(QX + Math.sin(t * 0.15) * 0.6, 1.2, 9.4), new V3(QX, 1.0, 0)],
      keta:    () => [new V3(KX + 1.8, 4.2, 14.5), new V3(KX + 1.6, 4.4, 0)],
      hate:    t => { const z = hateZ(t); return [new V3(HX + 2.0, 1.1, z), new V3(HX - 0.3, 0.3, z - 9)]; },
    };
    const FOG = { hako: [45, 130], sen: [45, 130], man: [45, 130], oku: [45, 130], cho: [45, 130], genshi: [45, 130], googol: [45, 130], dan12: [45, 130], dan3: [45, 130], dan4: [45, 130], tou: [30, 120], nobori: [40, 140], yomu: [14, 46], g64: [18, 60], g1: [16, 60], g2: [16, 60], hate: [5, 60], keta: [20, 60] };

    let lastT = -1e9;
    function update(dt, t, Tt, name) {
      const jump = dt === 0 || Math.abs(Tt - lastT) > 0.5; lastT = Tt;
      const k = jump ? 1 : 1 - Math.exp(-dt * 3);
      stars.position.copy(cam.position);
      // 明かりと霧
      const dim = name === 'hate' ? 1 - 0.6 * sstep(6, 30, t) : 1;
      st.amb = lerp(st.amb, 0.55 * dim, k); st.sun = lerp(st.sun, 1.05 * dim, k); if (amb) amb.intensity = st.amb; sun.intensity = st.sun;
      const fg = FOG[name] || [30, 80]; st.fn = lerp(st.fn, fg[0], k); st.ff = lerp(st.ff, name === 'hate' ? lerp(60, 22, sstep(10, 32, t)) : fg[1], k);
      scene.fog.near = st.fn; scene.fog.far = st.ff;
      st.star = jump ? (ZT[name] !== undefined ? 0 : 1) : lerp(st.star, ZT[name] !== undefined ? 0 : 1, k); starMat.opacity = 0.75 * dim * st.star;
      gridU.near.value = st.fn; gridU.far.value = st.ff; ROOM.visible = st.star < 0.99;

      // 1000倍の入れ子
      if (name === 'dan4') st.z = d4Z(t);
      else if (ZT[name] !== undefined) {
        const zt = name === 'dan3' && t < 1.5 ? 1 : ZT[name];
        if (jump) st.z = zt; else { const d = zt - st.z, v = Math.min(3.2, 0.3 + 1.4 * Math.abs(d)); st.z += Math.sign(d) * Math.min(Math.abs(d), v * dt); }
      }
      // z がちょうど整数 m のときは「m 周目が終わったところ」＝1000個がそろったかたまり。そこから先へ進むと、
      // かたまり全体が1個の立方体になり（ズームの比10）、まわりの999個が育つ
      { const n = st.z > 0 ? Math.ceil(st.z - 1e-9) - 1 : 0, f = st.z - n, s = Math.pow(10, 1 - f);
        lvA.scale.setScalar(s); gridU.c.value = s;
        focus.material = n === 0 ? recM.fB : recM.fG; sibA.material = n === 0 ? recM.aB : recM.aG;
        // dan12 は枠だけ（1000個は、まだ空っぽ）。dan3 の頭で、枠が埋まる
        const fill = name === 'dan12' ? 0 : name === 'dan3' && st.z < 1.0001 ? sstep(0.2, 1.4, t) : 1;
        growSibs(sibA, Math.pow(1000, n === 0 && f > 0.999 ? fill : f) - 1); focus.visible = fill > 0.001;
        const u = Math.pow(10, 1 - st.z), showU = (name === 'dan12' || name === 'dan3') && st.z < 1.6;
        unitG.visible = showU; unitG.scale.setScalar(u);
        if (showU) { litM.count = litO.count = name === 'dan12' ? litCount(t) : 27; const la = 1 - sstep(0.4, 1.3, name === 'dan3' ? t : 0);
          litM.material.opacity = la; litO.material.opacity = la; litM.visible = litO.visible = la > 0.01; wire.material.opacity = 0.9 * (1 - fill); wire.visible = fill < 0.999; } }

      // チェーン：いまの場面の列だけ
      rowK.visible = name === 'kusari'; rowLo.visible = rowHi.visible = gCard.visible = gGl.visible = name === 'hasamu';
      // 矢印の階段と、3の塔
      { const hi = name === 'tashi' ? [1, 1, 0.25] : [0.35, 0.35, 1]; stepG.forEach((g, i) => fadeAll(g, hi[i]));
        const tu = name === 'ue' ? 1 : name === 'kotae1' ? 1 : 0, tk = name === 'kotae1' ? 1 : 0;
        st.ue = jump ? tu : lerp(st.ue, tu, 1 - Math.exp(-dt * 1.6)); st.k1 = jump ? tk : lerp(st.k1, tk, 1 - Math.exp(-dt * 1.6));
        t2.position.set(lerp(1.85, 1.15, st.ue), lerp(2.95, 2.1, st.ue), 0); fadeAll(t2, 1 - sstep(0.4, 0.9, st.ue));
        t1.userData.set(st.ue > 0.55 ? '27' : '3', st.ue > 0.55 ? '#FFB86B' : '#FFD166');
        t1.position.set(lerp(1.15, 0.2, st.k1), lerp(2.1, 1.2, st.k1), 0); fadeAll(t1, 1 - sstep(0.3, 0.7, st.k1)); fadeAll(t0, 1 - sstep(0.4, 0.8, st.k1));
        fadeAll(big, sstep(0.5, 1.0, st.k1)); big.scale.setScalar(lerp(0.6, 1, sstep(0.5, 1, st.k1))); }


      // もとの問題
      if (name === 'kotae' || jump) hyper(Tt, name === 'kotae' ? t : 99);

      // 最後の10けた
      { const n = name === 'keta' ? kSteps(t) : 14;
        ktower.forEach((c, j) => { c.visible = j < n; });
        const s = pad(LAST[n - 1]); kdig.forEach((c, i) => c.userData.set(s[i] === ' ' ? '·' : s[i], n >= stableFrom[i] ? '#FFD166' : '#FFF4D6')); }
    }

    function labels(name, t) {
      const L = [];
      if (name === 'dan12') { const n = litCount(t); if (!n) L.push({ id: 'box', p: new V3(5, 10.4, 5), t: '1000個ぶんの箱', dot: '#DDE6FF' }); if (n) L.push({ id: 'lit', p: new V3(1.5, n > 9 ? 3.3 : 1.3, 1.5), t: `${n}個`, sub: '1000個のうち', dot: '#FFD166' }); }
      else if (name === 'dan4') { const N = Math.pow(10, d4Log(t));
        const sub = t >= D4.tEnd ? '3を4段積んだ数' : N >= 1000 ? 'まだ止まらない' : N >= 100 / 3 ? 'グーゴルを越えた' : N >= 27 ? '宇宙の原子を越えた' : '';
        L.push({ id: 'rec', p: new V3(5, 10.4, 5), t: `1000倍×${t >= D4.tEnd ? '約1.2兆' : jaNum(N)}回`, sub, dot: '#FFD166' }); }
      else if (ZT[name] !== undefined) {
        const m = Math.ceil(st.z - 0.002), near = Math.abs(st.z - ZT[name]) < 0.05;
        let txt = countName(Math.max(0, m)), sub;
        if (name === 'oku' && near) sub = '10億秒 ≒ 約32年';
        if (name === 'cho' && near) sub = '1兆秒 ≒ 約3万2千年';
        if (name === 'genshi' && near) sub = '宇宙の原子の数ほど';
        if (name === 'googol' && near) { txt = 'グーゴル'; sub = '10の100乗'; }
        if (name === 'dan3' && near) { txt = '7兆6千億個'; sub = '1000倍を4回ちょっと'; }
        L.push({ id: 'rec', p: new V3(5, 10.4, 5), t: txt, sub, dot: CELLC });
      }
      if (name === 'tashi') { L.push({ id: 's0', p: new V3(OX - 3.6, 1.1, 0.3), t: '足し算のくりかえし', dot: '#FFD166' }); L.push({ id: 's1', p: new V3(OX, 2.4, 0.3), t: 'かけ算のくりかえし', dot: '#FFD166' }); }
      if (name === 'yaji') L.push({ id: 'pt', p: new V3(OX + 10.9, 3.3, 0), t: '3↑↑3', sub: '3を3段', dot: '#FFD166' });
      if (name === 'ue' && st.ue > 0.6) L.push({ id: 'pt', p: new V3(OX + 10.15, 2.7, 0), t: '3の3乗 ＝ 27', dot: '#FFB86B' });
      if (name === 'kotae1' && st.k1 > 0.7) L.push({ id: 'pt', p: new V3(OX + 10.0, 2.1, 0.3), t: '3の27乗', dot: '#FFD166' });
      if (name === 'tou') { L.push({ id: 'sm', p: new V3(TX - 3.2, 2.9, 0), t: '3↑↑3', sub: '3を3段', dot: '#FFD166' }); L.push({ id: 'col', p: new V3(TX + 1.5, 3.5, 0.6), t: '3↑↑↑3', sub: '高さ 7.6兆段', dot: '#FFD166' }); }
      if (name === 'nobori') {
        const y = cam.position.y, near = p => Math.abs(p.y - y) < 14;
        const ms = [{ id: 'cm', p: new V3(TX + 1.5, 0.2, 0.7), t: '1段 ＝ 1センチ', dot: '#FFD166' }, { id: 'fj', p: new V3(TX + 3.6, 5.58 * DEC + 0.5, 0), t: '富士山', sub: '約37万段', dot: '#7CE0FF' },
          { id: 'mn', p: new V3(TX + 5.2, 10.58 * DEC + 1, -1), t: '月', sub: '約384億段', dot: '#C9CCD6' }, { id: 'tp', p: new V3(TX + 1.5, 12.88 * DEC + 0.6, 0.6), t: 'てっぺん', sub: '約7600万km', dot: '#FFE9A8' },
          { id: 'sn', p: new V3(TX + 17, 13.17 * DEC + 5.5, -10), t: '太陽', sub: '約1億5千万km', dot: '#FFC24A' }, { id: 'rg', p: new V3(TX + 2.3, 2 * DEC, 0), t: '目盛り1つで10倍', dot: '#7CE0FF' }];
        for (const m of ms) if (near(m.p)) L.push(m);
      }
      if (name === 'yomu') { L.push({ id: 'y4', p: new V3(YX - 2.4, 5.7, 0), t: '3↑↑4', sub: '3を4段', dot: '#FFD166' }); if (t > 6) L.push({ id: 'ye', p: new V3(YX + 34, 3.6, 0), t: 'まだまだ続く', sub: '3兆6383億けた', dot: '#FFD166' }); }
      if (name === 'kusari') L.push({ id: 'ch', p: new V3(CX + 2.3, 0.6, 0), t: '矢印の本数', dot: '#7CE0FF' });
      if (name === 'g1') L.push({ id: 'g1', p: new V3(GX - 2.0, 1.0, 0.4), t: '矢印4本', sub: '3↑↑↑↑3', dot: '#7CE0FF' });
      if (name === 'g2') L.push({ id: 'g2', p: new V3(GX + 4, FH + 0.95, 0.4), t: '矢印 g1本', sub: '終わりが見えない', dot: '#7CE0FF' });
      if (name === 'g64' && gyAt(t) > 60 * FH) L.push({ id: 'gt', p: new V3(GX - 2, 63 * FH + 1.6, 0.4), t: 'グラハム数', sub: '64段目の答え', dot: '#FFE27A' });
      if (name === 'hasamu') { L.push({ id: 'hu', p: new V3(CX, 2.4, -14), t: 'グラハム数より小さい', dot: '#7CE0FF' }); L.push({ id: 'hd', p: new V3(CX, -2.4, -14), t: 'グラハム数より大きい', dot: '#7CE0FF' }); }
      if (name === 'kotae') {
        if (t < 17.8) L.push({ id: 'q', p: new V3(QX + 2.2, 2.2, 0), t: '立方体', sub: t > 6.2 ? '頂点8個を、ぜんぶ結ぶ（28本）' : '頂点8個', dot: '#FFF4D6' });
        else L.push({ id: 'q', p: new V3(QX + 2.2, 2.2, 0), t: '4次元の立方体', sub: '頂点16個（線は120本）', dot: '#FF5A6E' });
        if (t > 11.6 && t < 17.0) L.push({ id: 'qh', p: P3[1].clone().add(new V3(QX, 0, 0.1)), t: '同じ平面の4点', sub: '6本とも赤＝これを避けたい', dot: '#FF5A6E' });
        if (t > 24.4) L.push({ id: 'qa', p: new V3(QX - 2.4, -0.6, 0), t: '答えは13次元以上', sub: 'どこからかは、まだ分からない', dot: '#FFD166' });
      }
      if (name === 'keta') { const n = kSteps(t); L.push({ id: 'kt', p: new V3(KX + 6.3, 0.3 + n * 0.53, 0), t: `3の塔 ${n}段`, dot: '#FFD166' }); L.push({ id: 'kd', p: new V3(KX + 0.3, 2.1, 0), t: '下10けた', dot: '#FFD166' }); }
      if (name === 'hate') { L.push({ id: 'g', p: new V3(HX, 0.35, 0.9), t: 'グラハム数', dot: '#FFE27A' }); if (t > 4) L.push({ id: 'inf', p: new V3(HX, 0.6, hateZ(t) - 30), t: 'この先も、ずっと', dot: '#9FB3FF' }); }
      return L;
    }

    return {
      scenes: Object.keys(CAM),
      enter(name) { if (name === 'dan12') st.z = 1; },
      update,
      camera: (name, t) => (CAM[name] || CAM.hako)(t),
      labels,
    };
  },

  lines: [
    { w: 'B', s: 'hako', t: 'ねえノア、数って、どこまで大きくなるの？',
      k: "ねえ のあ、かずって、ど'こまで おおきく なるの？" },
    { w: 'A', s: 'hako', t: 'どこまでも。でも今日は、行けるところまで、行ってみましょう。',
      k: "ど'こまでも。で'も きょ'うわ、いける ところまで、いって みましょ'う。" },
    { w: 'A', s: 'hako', t: 'まずは、この立方体が1個。これを縦・横・高さに、10個ずつ並べると？',
      k: "ま'ずわ、この りっぽ'うたいが い'っこ。これお たて'、よこ、たかさ'に、じゅっこずつ ならべると？" },
    { w: 'B', s: 'sen', t: '10かける10かける10で……1000個！',
      k: "じゅう かける じゅう かける じゅうで… せ'んこ！" },
    { w: 'A', s: 'sen', t: 'じゃあ、この1000個のかたまりを1個だと思って、また1000個並べる。',
      k: "じゃあ、この せ'んこの かたまりお い'っこだと おも'って、ま'た せ'んこ ならべる。" },
    { w: 'B', s: 'man', t: '……100万個！',
      k: "ひゃくま'んこ！" },
    { w: 'A', s: 'oku', t: 'もう1回くりかえすと、10億。1秒を1個とすると、10億秒は約32年。',
      k: "もう いっか'い くりかえすと、じゅうお'く。い'ちびょうお い'っこと すると、じゅうお'くびょうわ やく さんじゅうに'ねん。" },
    { w: 'A', s: 'cho', t: 'もう1回で、1兆。1兆秒は、約3万2千年。',
      k: "もう いっか'いで、いっちょ'う。いっちょ'うびょうわ、やく さんまん にせ'ん ねん。",
      b: { h: '1000倍を、くりかえす', r: ['1000 → 100万 → 10億 → 1兆', '10億秒 ＝ 約32年', '1兆秒 ＝ 約3万2千年'] } },
    { w: 'B', s: 'cho', t: 'まだ4回しか、くりかえしてないのに……。',
      k: "ま'だ よ'んかいしか、くりかえして ないのに…。" },
    { w: 'A', s: 'genshi', t: 'この「1000倍」を27回くりかえすと、10の81乗。',
      k: "この せ'んばいお、にじゅうなな'かい くりかえすと、じゅうの はちじゅういち じょう。" },
    { w: 'A', s: 'genshi', t: '観測できる宇宙にある原子の数は、10の80乗くらいと見積もられているわ。',
      k: "かんそく できる う'ちゅうに ある げ'んしの かずわ、じゅうの はちじゅう じょう くらいと みつもられて いるわ。",
      b: { h: '宇宙の原子', r: ['1000倍を27回 ＝ 10の81乗', '観測できる宇宙の原子 ＝ 10の80乗くらい', '（原子の数の見積もりには、幅がある）'] } },
    { w: 'B', s: 'genshi', e: { B: 'surprise' }, t: '宇宙の原子、ぜんぶ？ たった27回で？',
      k: "う'ちゅうの げ'んし、ぜ'んぶ？ たった にじゅうなな'かいで？" },
    { w: 'A', s: 'googol', t: '10の100乗には、「グーゴル」という名前もあるの。1のあとに、0が100個。',
      k: "じゅうの ひゃく じょうにわ、ぐ'ーごるって なまえも あるの。い'ちの あとに、ぜ'ろが ひゃっこ。",
      b: { h: 'グーゴル', r: ['10の100乗', '1のあとに、0が100個'] } },
    { w: 'A', s: 'googol', t: 'でも、書くだけなら、まだ簡単。本当に大きいのは、ここからよ。',
      k: "で'も、か'く だけなら、ま'だ かんたん。ほんとうに おおき'いのわ、ここからよ。" },
    { w: 'B', s: 'tashi', t: 'もっと大きい数は、どうやって書くの？',
      k: "もっと おおき'い かずわ、ど'うやって か'くの？" },
    { w: 'A', s: 'tashi', t: 'くりかえしを、くりかえすの。足し算をくりかえすと、かけ算。かけ算をくりかえすと？',
      k: "くりかえしお、くりかえすの。たしざんお くりかえすと、かけざん。かけざんお くりかえすと？" },
    { w: 'B', s: 'tashi', t: 'べき乗！ 3の3乗、みたいな。',
      k: "べきじょう！ さんの さん じょう、みたいな。" },
    { w: 'A', s: 'tashi', t: 'そう。べき乗を、矢印1本で書くの。3↑3は、3を3回かけて、27。',
      k: "そ'う。べきじょうお、やじるし いっぽんで か'くの。さん やじるし さんわ、さんお さんかい かけて、にじゅうな'な。",
      b: { h: '矢印表記', r: ['3↑3 ＝ 3×3×3 ＝ 27', '矢印を1本ふやす ＝ 1つ前をくりかえす'] } },
    { w: 'A', s: 'yaji', t: '矢印2本は、べき乗をくりかえす。3↑↑3は、3を3段積んだ塔。',
      k: "やじるし にほんわ、べきじょうお くりかえす。さん やじるし やじるし さんわ、さんお さんだん つ'んだ とう。" },
    { w: 'A', s: 'ue', t: '塔は上から計算するの。てっぺんの3の3乗が27。その下は、3の27乗。',
      k: "とうわ うえ'から けいさん するの。てっぺんの さんの さん じょうが にじゅうな'な。その し'たわ、さんの にじゅうなな じょう。" },
    { w: 'B', s: 'kotae1', t: '3の27乗って……？',
      k: "さんの にじゅうなな じょうって…？" },
    { w: 'A', s: 'kotae1', t: '7兆6255億9748万4987。',
      k: "ななちょ'う ろくせん にひゃく ごじゅうご お'く きゅうせん ななひゃく よんじゅうはち ま'ん よんせん きゅうひゃく はちじゅうな'な。",
      b: { h: '3↑↑3', r: ['3を3段積んだ塔。上から計算する', '＝ 3の27乗', '＝ 7兆6255億9748万4987'] } },
    { w: 'B', s: 'kotae1', e: { B: 'surprise' }, t: '3を、3つ積んだだけなのに！',
      k: "さんお、みっつ つ'んだ だけなのに！" },
    { w: 'A', s: 'dan12', t: 'じゃあ、さっきの立方体で、3の塔を1段ずつ測ってみましょう。',
      k: "じゃあ、さっきの りっぽ'うたいで、さんの とうお いちだんずつ はか'って みましょ'う。" },
    { w: 'A', s: 'dan12', t: '1段なら、3個。',
      k: "いちだんなら、さ'んこ。" },
    { w: 'A', s: 'dan12', t: '2段なら、3の3乗で、27個。',
      k: "にだんなら、さんの さん じょうで、にじゅうな'なこ。" },
    { w: 'B', s: 'dan12', t: 'まだ、最初の1000個の中だね。',
      k: "ま'だ、さいしょの せ'んこの な'かだね。" },
    { w: 'A', s: 'dan3', t: '3段は、7兆6千億。1000倍を4回くりかえして、まだ少しあまる。',
      k: "さんだんわ、ななちょ'う ろくせんおく。せ'んばいお よ'んかい くりかえして、ま'だ すこ'し あまる。",
      b: { h: '3段', r: ['3↑↑3 ＝ 7兆6255億9748万4987', '1000倍を4回くりかえして、まだあまる'] } },
    { w: 'B', s: 'dan3', e: { B: 'surprise' }, t: '1段ふやしただけで、もう1兆を越えちゃった……。',
      k: "いちだん ふやした だけで、もう いっちょ'うお こえちゃった…。" },
    { w: 'A', s: 'dan4', t: 'じゃあ、4段は？',
      k: "じゃあ、よんだんわ？" },
    { w: 'B', s: 'dan4', e: { B: 'surprise' }, p: 0.4, t: '宇宙の原子を越えた……グーゴルも……！',
      k: "う'ちゅうの げ'んしお こえた… ぐ'ーごるも…！" },
    { w: 'B', s: 'dan4', st: 'panic', t: '止まらない……！ どこまで行くの？',
      k: "とまらない…！ ど'こまで いくの？" },
    { w: 'A', s: 'dan4', t: '4段は、1000倍を、約1兆2千億回。',
      k: "よんだんわ、せ'んばいお、やく いっちょ'う にせ'ん おく かい。",
      b: { h: '3の塔を、1000倍で測る', r: ['1段 3 ／ 2段 27', '3段 7兆6千億（1000倍を4回ちょっと）', '4段 1000倍を、約1兆2千億回'] } },
    { w: 'A', s: 'yomu', t: '4段の答えは、3兆6千億けた以上。頭から読んでみるわね。',
      k: "よんだんの こたえわ、さんちょ'う ろくせんおく けた いじょう。あたまから よんで みるわね。" },
    { w: 'A', s: 'yomu', t: '1、2、5、8、0、1、4、2、9、0、6、2……',
      k: "い'ち、に'、ご'、は'ち、ぜ'ろ、い'ち、よ'ん、に'、きゅ'う、ぜ'ろ、ろ'く、に'…" },
    { w: 'B', s: 'yomu', e: { B: 'jito' }, t: '待って。それ、いつ終わるの？',
      k: "ま'って。それ、い'つ おわるの？" },
    { w: 'A', s: 'yomu', t: '1秒に3けた読んでも、約3万8千年。',
      k: "い'ちびょうに さんけた よんでも、やく さんまん はっせ'ん ねん。",
      b: { h: '3↑↑4（塔4段）', r: ['3兆6383億3464万25けた', '頭は 1258014290627…', '1秒に3けた読んで、約3万8千年'] } },
    { w: 'A', s: 'yomu', t: '3けたで、1000倍1回分。さっきのズームを1秒に1回やっても、3万8千年かかるの。',
      k: "さんけたで、せ'んばい いっかいぶん。さっきの ず'ーむお い'ちびょうに いっか'い やっても、さんまん はっせ'ん ねん かかるの。" },
    { w: 'A', s: 'tou', t: '矢印3本は、矢印2本をくりかえす。3↑↑↑3は、3の塔。その高さが……',
      k: "やじるし さんぼんわ、やじるし にほんお くりかえす。さん やじるし やじるし やじるし さんわ、さんの とう。その たかさ'が…" },
    { w: 'A', s: 'tou', t: 'さっきの答え。7兆6255億9748万4987段。',
      k: "さっきの こたえ。ななちょ'う ろくせん にひゃく ごじゅうご お'く きゅうせん ななひゃく よんじゅうはち ま'ん よんせん きゅうひゃく はちじゅうな'な だん。",
      b: { h: '3↑↑↑3', r: ['3の塔', '高さ ＝ 3↑↑3 ＝ 7兆6255億9748万4987段'] } },
    { w: 'B', s: 'tou', e: { B: 'surprise' }, t: '前の答えが、次の塔の高さになるの？',
      k: "ま'えの こたえが、つぎ'の とうの たかさ'に なるの？" },
    { w: 'A', s: 'tou', t: 'そう。それが、矢印を1本ふやすということ。くりかえしの、くりかえし。',
      k: "そ'う。それが、やじるしお いっぽん ふやすと いう こと。くりかえしの、くりかえし。" },
    { w: 'A', s: 'nobori', t: '3を1段1センチで積むと、富士山を越えて、月を越えて……',
      k: "さんお いちだん いっせ'んちで つ'むと、ふじ'さんお こえて、つ'きお こえて…" },
    { w: 'A', s: 'nobori', t: 'てっぺんは、約7600万キロ。太陽までの、半分くらいの高さ。',
      k: "てっぺんわ、やく ななせん ろっぴゃくまん き'ろ。たいようまでの、はんぶん くらいの たかさ'。" },
    { w: 'B', s: 'nobori', st: 'whisper', t: '4段で、3万8千年……。7兆段だったら……。',
      k: "よんだんで、さんまん はっせ'ん ねん…。ななちょ'うだん だったら…。" },
    { w: 'A', s: 'nobori', t: '宇宙の原子1個に1けたずつ書いても、けた数さえ書ききれないわ。',
      k: "う'ちゅうの げ'んし い'っこに ひとけたずつ か'いても、けたすうさえ かききれないわ。" },
    { w: 'A', s: 'kusari', t: '矢印の本数も、数で書けるようにしたのが、コンウェイのチェーン表記。',
      k: "やじるしの ほんすうも、かずで かけるように したのが、こんうぇいの ちぇ'ーん ひょうき。" },
    { w: 'A', s: 'kusari', t: '3→3→3は、3と3のあいだに矢印3本。つまり、さっきの塔。',
      k: "さん さん さんの ちぇ'ーんわ、さんと さんの あいだに やじるし さんぼん。つまり、さっきの とう。",
      b: { h: 'チェーン表記', r: ['a→b→c ＝ aとbのあいだに矢印c本', '3→3→3 ＝ 3↑↑↑3'] } },
    { w: 'A', s: 'g1', t: 'じゃあ、グラハム数。まず、3と3のあいだに矢印4本。これが1段目。',
      k: "じゃあ、ぐらはむすう。ま'ず、さんと さんの あいだに やじるし よんほん。これが いちだんめ。" },
    { w: 'B', s: 'g1', t: 'さっきの塔より、矢印が1本多い……。',
      k: "さっきの とうより、やじるしが いっぽん おお'い…。" },
    { w: 'A', s: 'g2', t: '2段目は、矢印の本数が、1段目の答え。',
      k: "にだんめわ、やじるしの ほんすうが、いちだんめの こたえ。" },
    { w: 'B', s: 'g2', e: { B: 'surprise' }, t: '矢印の本数が、あの数……？',
      k: "やじるしの ほんすうが、あの かず…？" },
    { w: 'A', s: 'g2', t: '3段目は、矢印の本数が、2段目の答え。これを、64段目までくりかえす。',
      k: "さんだんめわ、やじるしの ほんすうが、にだんめの こたえ。これお、ろくじゅうよ'ん だんめまで くりかえす。",
      b: { h: 'グラハム数', r: ['1段目 ＝ 3↑↑↑↑3', '次の段の矢印の本数 ＝ 前の段の答え', '64段目の答え ＝ グラハム数'] } },
    { w: 'A', s: 'g64', t: '64段目の答えが、グラハム数。',
      k: "ろくじゅうよ'ん だんめの こたえが、ぐらはむすう。" },
    { w: 'B', s: 'g64', st: 'whisper', t: '……もう、何も想像できない。',
      k: "もう、な'にも そうぞう できない。" },
    { w: 'A', s: 'hasamu', t: 'なのに、チェーン表記なら、4つの数で、はさめるの。',
      k: "なのに、ちぇ'ーん ひょうきなら、よっつの かずで、はさめるの。",
      b: { h: 'チェーン表記ではさむ', r: ['3→3→64→2 ＜ グラハム数', 'グラハム数 ＜ 3→3→65→2'] } },
    { w: 'A', s: 'kotae', t: 'もともとは、ある問題の答えの上限として、紹介された数なの。',
      k: "もともとわ、あ'る もんだいの こたえの じょうげんと して、しょうかい された かずなの。" },
    { w: 'A', s: 'kotae', t: '立方体の頂点を、ぜんぶ線で結んで、線を赤か青で塗る。',
      k: "りっぽうたいの ちょうて'んお、ぜ'んぶ せ'んで むすんで、せ'んお あ'かか あ'おで ぬる。" },
    { w: 'A', s: 'kotae', t: '同じ平面にある4つの点を結ぶ線が、ぜんぶ同じ色。そうならないように、塗りたいの。',
      k: "おなじ へいめんに ある よっつの てんお むすぶ せ'んが、ぜ'んぶ おなじ いろ'。そう ならない ように、ぬりたいの。" },
    { w: 'A', s: 'kotae', t: 'でも、立方体の次元を上げていくと、どう塗っても避けられなくなる。それは、何次元から？',
      k: "で'も、りっぽうたいの じげんお あげて いくと、ど'う ぬっても さけられなく なる。それわ、なんじげんから？",
      b: { h: 'もとの問題', r: ['n次元の立方体の頂点をすべて結び、2色で塗る', '同じ平面の4点を結ぶ線が、ぜんぶ同じ色', 'どう塗ってもそうなるのは、何次元から？'] } },
    { w: 'A', s: 'kotae', t: '本当の答えは、13以上。上限は、いまではずっと小さくなったけれど、それでも途方もない数。',
      k: "ほんとうの こたえわ、じゅうさん いじょう。じょうげんわ、い'まで'わ ずっと ちい'さく なったけれど、それでも とほうも ない かず。" },
    { w: 'B', s: 'kotae', e: { B: 'surprise' }, t: 'えっ、13かもしれないの？',
      k: "/eq/、じゅうさ'ん かも しれないの？" },
    { w: 'A', s: 'kotae', e: { A: 'smile' }, t: 'かもしれないわ。',
      k: "かも しれないわ。" },
    { w: 'B', s: 'keta', t: 'グラハム数って、どんな数字が並んでるの？',
      k: "ぐらはむすうって、ど'んな すうじが ならんでるの？" },
    { w: 'A', s: 'keta', t: '最後の10けたは、分かっているの。……2464195387。',
      k: "さ'いごの じゅっけたわ、わかって いるの。<pause 0.3>に'、よ'ん、ろ'く、よ'ん、い'ち、きゅ'う、ご'、さ'ん、は'ち、な'な。",
      b: { h: 'グラハム数の最後の10けた', r: ['…2464195387', '3の塔は、11段から上で下10けたが変わらない'] } },
    { w: 'A', s: 'keta', t: '3の塔は、高くすると、下のけたが動かなくなる。11段から上は、もう変わらない。',
      k: "さんの とうわ、たかく すると、し'たの けたが うごかなく なる。じゅういちだんから うえ'わ、もう かわらない。" },
    { w: 'B', s: 'keta', t: 'じゃあ、最初の数字は？',
      k: "じゃあ、さいしょの すうじわ？" },
    { w: 'A', s: 'keta', t: '分かっていないわ。',
      k: "わかって いないわ。" },
    { w: 'A', s: 'hate', t: '宇宙の原子1個に1けたずつ書いても、グラハム数は書ききれない。',
      k: "う'ちゅうの げ'んし い'っこに ひとけたずつ か'いても、ぐらはむすうわ かききれない。" },
    { w: 'A', s: 'hate', t: 'そのけた数を書こうとしても、書ききれない。けた数の、けた数も。',
      k: "その けたすうお かこうと しても、かききれない。けたすうの、けたすうも。" },
    { w: 'B', s: 'hate', st: 'whisper', t: '宇宙より、大きいんだ……。',
      k: "う'ちゅうより、おおき'いんだ…。" },
    { w: 'A', s: 'hate', t: 'でもね、グラハム数より小さい数には、限りがある。',
      k: "で'もね、ぐらはむすうより ちいさ'い かずにわ、かぎ'りが ある。" },
    { w: 'A', s: 'hate', t: 'その先は、無限。どんな数を思いうかべても、ほとんどすべての数は、それより大きいの。',
      k: "その さ'きわ、むげん。ど'んな かずお おもいうかべても、ほとんど すべての かずわ、それより おおき'いの。",
      b: { h: 'グラハム数より大きい数', r: ['無限にある'] } },
    { w: 'B', s: 'hate', st: 'whisper', t: '……数って、こわいね。',
      k: "かずって、こわ'いね。" },
    { w: 'A', s: 'hate', e: { A: 'smile' }, p: 0.6, t: '次は、長すぎる時間の話をしましょう。',
      k: "つぎ'わ、なが'すぎる じかんの はなし'お しましょ'う。" },
  ],
});
