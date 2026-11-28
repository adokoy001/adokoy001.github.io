/* 2.0.0 で足した書き方の見本（声のテンプレート、歌い方の改良、音符ごとの指定、音素の歌詞）。詞・旋律・伴奏とも、確認のために作ったもの */
(window.OtoVoiceSongs=window.OtoVoiceSongs||[]).push({title:"ひかりのほうへ",kind:"2.0 の歌い方の見本",note:"声をテンプレート（やさしい女）にして、歌い方の改良を入れ、音符ごとに、しゃくり・ゆらし・高さの線を書いた8小節。おわりは、音素で書いた歌詞。",voices:"やさしい女（as=yasashii）",bpm:92,sec:22,text:`title ひかりのほうへ
// 2.0.0 の書き方の見本：as=声の名前、nat=1（歌い方の改良）、音符の { }、音素の歌詞
tempo 92
reverb 2.4
@pf epiano vol=0.5 rev=0.3
C4+E4+G4:4 | A3+C4+E4:4 | F3+A3+C4:4 | G3+B3+D4:4 | C4+E4+G4:4 | A3+C4+E4:4 | F3+A3+C4:2 G3+B3+D4:2 | C4+E4+G4:4 |
@bs bass vol=0.7
C2:4 | A1:4 | F1:4 | G1:4 | C2:4 | A1:4 | F1:2 G1:2 | C2:4 |
@uta voice as=yasashii nat=1 vol=1.0 rev=0.35
E4{scoop 1.5} G4 G4 A4 | G4:1.5 E4:0.5 D4:2{vib 1.4, delay .25} |
ひかりの ほうへ
F4 A4 A4 C5 | B4:1 G4:2{vib 1.3, scoop 1} -:1 |
あるいて ゆく
E4 G4 G4 A4 | C5:1.5{scoop 2} A4:0.5 G4:2{vib 1.2} |
かぜが ふいても
F4 E4 D4{cent -10} E4 | C4:4{p 0@0/0@70/-1@100, vib 1.2, delay .5} |
/ma jo wa zu ni/
`});
