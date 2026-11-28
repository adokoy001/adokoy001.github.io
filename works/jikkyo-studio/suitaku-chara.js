/*! 翠卓（3D リーチ麻雀）のキャラクター描画と名簿。character-renderer.js と roster.js は、元のファイルから手を入れずに写したもの */
/* 翠卓のキャラクター描画（character-renderer.js）を、卓と部屋なしで動かすための土台。
   character-renderer.js は MahjongTable3D を継いで、init・draw・setState・dispose・seat と、loc.aFace を使う。ここではその分だけを用意する */
(function(){'use strict';
class MahjongTable3D{
  constructor(canvas,options={}){
    this.canvas=canvas;this.options=options;this.supported=false;this.disposed=false;this.quality='high';this.view='seat';this.state=null;this.sceneTime=0;this.loc={aFace:-1};this.active=true;
    const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:true,preserveDrawingBuffer:false,powerPreference:'high-performance'});
    if(!gl)return;this.gl=gl;
    // 透明な地の上に描くので、透ける材質の重ね方は、不透明度を正しく積む形にする（色は SRC_ALPHA で混ぜ、不透明度は足していく）
    const bf=gl.blendFunc.bind(gl);gl.blendFunc=(s,d)=>gl.blendFuncSeparate(s,d,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl._blendFunc=bf;
    try{this.init();this.supported=true}catch(e){console.warn('VTuber WebGL:',e)}
  }
  init(){const gl=this.gl;gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);gl.clearColor(0,0,0,0)}
  draw(){}
  setState(s){this.state=s}
  seat(x,z,i){const a=i*Math.PI/2,c=Math.cos(a),s=Math.sin(a);return{x:x*c+z*s,z:-x*s+z*c,yaw:a}}
  dispose(){this.disposed=true}
}
window.MahjongTable3D=MahjongTable3D;
})();

/* Eight adult opponents. bodyProfile.height is cm; shape factors are relative to the seated 168 cm source. */
(function(root){
'use strict';
root.MahjongRoster=[
  {
    "id": "mio",
    "name": "ミオ",
    "short": "MIO",
    "tag": "やわらかな笑顔で、卓の空気を読む",
    "role": "小さな喫茶店の店主",
    "hobby": "観葉植物を育てること・焼き菓子づくり",
    "description": "小さな喫茶店を営む、やわらかな口調の店主。何気ない表情の変化にも気づく。気持ちよく勝負できる空気を大切にしながら、素直な手順で一局を育てる。",
    "backstory": "仕事のあと、常連と卓を囲んだのが麻雀との出会い。誰かが失敗しても居心地を悪くしない、その気配りが店でも卓でも変わらない。勝負どころには、静かに自分の一打を選ぶ。",
    "adult": true,
    "age": 25,
    "accent": "#d6bb8b",
    "style": "balanced",
    "skill": 1,
    "facePreset": "mio",
    "hairStyle": "bob",
    "hairColor": "#815543",
    "eyeColor": "#be7b35",
    "skinColor": "#f2dfe0",
    "bodyLabel": "小柄で均整のとれたシルエット",
    "heightCm": 160,
    "signatureAccessory": {
      "name": "葉のブローチと髪のリボン",
      "description": "店の窓辺で育てる葉をかたどったブローチ。髪のリボンは、仕事の日から卓の日までのお気に入り。"
    },
    "bodyProfile": {
      "height": 160,
      "shoulder": 0.93,
      "chest": 0.99,
      "waist": 0.92,
      "hip": 1.02,
      "leg": 0.96,
      "headScale": 1.02
    },
    "defaultOutfit": "mio_atelier",
    "defaultWardrobe": {
      "outfit": "mio_atelier",
      "topStyle": "signature",
      "bottomStyle": "signature",
      "top": "#9bac89",
      "bottom": "#625344",
      "accent": "#d8bd87",
      "accessory": true
    }
  },
  {
    "id": "aoi",
    "name": "アオイ",
    "short": "AOI",
    "tag": "静かに測り、危険をかわす",
    "role": "天文台の観測機器設計者",
    "hobby": "星図の収集・夜明け前の散歩",
    "description": "観測機器を設計する、静かな視線の持ち主。小さな変化を見逃さず、無理な押しを避ける。必要な場面では迷わず進み、相手の丁寧な判断にも敬意を示す。",
    "backstory": "精密な機器を扱う仕事で身についたのは、確かめることと待つこと。麻雀でも焦りに手順を乱されない。ただ、仲間がよい勝負を選んだときには、控えめな笑顔がこぼれる。",
    "adult": true,
    "age": 29,
    "accent": "#73b4db",
    "style": "defensive",
    "skill": 3,
    "facePreset": "cool",
    "hairStyle": "long",
    "hairColor": "#273a52",
    "eyeColor": "#579bc9",
    "skinColor": "#eadce4",
    "bodyLabel": "背が高く、細身で長い脚",
    "heightCm": 173,
    "signatureAccessory": {
      "name": "細い眼鏡と三日月のクリップ",
      "description": "軽いフレームの眼鏡と、観測室の夜を思わせる三日月の髪留め。装飾も道具も、必要なだけを選ぶ。"
    },
    "bodyProfile": {
      "height": 173,
      "shoulder": 0.9,
      "chest": 0.9,
      "waist": 0.84,
      "hip": 0.91,
      "leg": 1.07,
      "headScale": 0.95
    },
    "defaultOutfit": "aoi_observatory",
    "defaultWardrobe": {
      "outfit": "aoi_observatory",
      "topStyle": "knit",
      "bottomStyle": "signature",
      "top": "#34598b",
      "bottom": "#293245",
      "accent": "#95becd",
      "accessory": true
    }
  },
  {
    "id": "rin",
    "name": "リン",
    "short": "RIN",
    "tag": "勝負どころへ、まっすぐ踏み込む",
    "role": "元短距離選手・スポーツ店スタッフ",
    "hobby": "朝のランニング・スニーカーの手入れ",
    "description": "高いポニーテールが目印の元スプリンター。決めた瞬間には前へ出て、仕掛けもためらわない。負けの悔しさを隠さず、相手のいいあがりにはさっぱりと拍手する。",
    "backstory": "競技生活を終えたあとも、一歩を踏み出す感覚は残っている。麻雀は速さだけで決まらないから面白い。仲間をよく励まし、自分の負けも次の勝負への力にする。",
    "adult": true,
    "age": 27,
    "accent": "#dd806c",
    "style": "aggressive",
    "skill": 2,
    "facePreset": "confident",
    "hairStyle": "pony",
    "hairColor": "#914b4a",
    "eyeColor": "#c58a4e",
    "skinColor": "#edcdb9",
    "bodyLabel": "肩幅のある、引き締まった体格",
    "heightCm": 168,
    "signatureAccessory": {
      "name": "イヤーカフと星のヘアクリップ",
      "description": "走る日にも邪魔になりにくい小さなイヤーカフ。星のクリップは、気合いを入れる日の定番。"
    },
    "bodyProfile": {
      "height": 168,
      "shoulder": 1.13,
      "chest": 1.01,
      "waist": 0.96,
      "hip": 0.98,
      "leg": 1.03,
      "headScale": 1
    },
    "defaultOutfit": "rin_rally",
    "defaultWardrobe": {
      "outfit": "rin_rally",
      "topStyle": "sleeveless",
      "bottomStyle": "shorts",
      "top": "#c8665d",
      "bottom": "#393d4d",
      "accent": "#efc778",
      "accessory": true
    }
  },
  {
    "id": "tsumugi",
    "name": "ツムギ",
    "short": "TSUMUGI",
    "tag": "糸をつなぐように、美しい手を育てる",
    "role": "染めと織りを手がけるテキスタイル作家",
    "hobby": "草木染め・季節の花を飾ること",
    "description": "布の色と手触りを大切にする、穏やかな作家。牌のつながりを眺め、役をじっくり育てる。小さな進展にも喜び、違う打ち方が同じ卓に並ぶことを楽しんでいる。",
    "backstory": "ほどいて織り直す作業が、日々の制作の一部。流局も失点も、次の形をつくる時間だと考える。持ち物には少しずつ自作の布を使い、麻雀卓でも色の重なりを見つける。",
    "adult": true,
    "age": 30,
    "accent": "#b8c992",
    "style": "value",
    "skill": 2,
    "facePreset": "gentle",
    "hairStyle": "wave",
    "hairColor": "#9a765d",
    "eyeColor": "#829b69",
    "skinColor": "#f2dece",
    "bodyLabel": "やわらかく、丸みのある輪郭",
    "heightCm": 163,
    "signatureAccessory": {
      "name": "花のバレッタとタッセル",
      "description": "花をかたどった髪留めに、短い糸のタッセル。揺れと色の組み合わせまで、作家らしく整える。"
    },
    "bodyProfile": {
      "height": 163,
      "shoulder": 1,
      "chest": 1.1,
      "waist": 1.02,
      "hip": 1.13,
      "leg": 0.95,
      "headScale": 1.01
    },
    "defaultOutfit": "tsumugi_komorebi",
    "defaultWardrobe": {
      "outfit": "tsumugi_komorebi",
      "topStyle": "knit",
      "bottomStyle": "signature",
      "top": "#6b8d7a",
      "bottom": "#4e6567",
      "accent": "#dcc296",
      "accessory": true
    }
  },
  {
    "id": "rei",
    "name": "レイ",
    "short": "REI",
    "tag": "間を整え、一打をきちんと置く",
    "role": "室内楽のヴィオラ奏者",
    "hobby": "古い楽譜を読むこと・静かな街歩き",
    "description": "室内楽を奏でる、長身で端正な人。礼儀正しく、気持ちを言葉にしすぎない。落ち着いた手順で局に向き合い、よい勝負のあとには短い言葉で相手をねぎらう。",
    "backstory": "仲間の音を聴きながら自分の音を置く、その感覚が卓でも息づく。勝負を譲るわけではないが、誰かのよい判断は見逃さない。休日は古い譜面店を巡り、余白のある時間を楽しむ。",
    "adult": true,
    "age": 32,
    "accent": "#bac4de",
    "style": "balanced",
    "skill": 3,
    "facePreset": "sharp",
    "hairStyle": "center",
    "hairColor": "#c9c9d7",
    "eyeColor": "#687fbd",
    "skinColor": "#e9dce3",
    "bodyLabel": "もっとも長身で、細い肩と長い胴",
    "heightCm": 177,
    "signatureAccessory": {
      "name": "真珠の耳飾りと菱形のブローチ",
      "description": "小さな真珠と、譜面の余白のように端正な菱形。演奏の日にも、卓の日にも主張しすぎない光。"
    },
    "bodyProfile": {
      "height": 177,
      "shoulder": 0.88,
      "chest": 0.85,
      "waist": 0.83,
      "hip": 0.9,
      "leg": 0.98,
      "headScale": 0.93
    },
    "defaultOutfit": "rei_nocturne",
    "defaultWardrobe": {
      "outfit": "rei_nocturne",
      "topStyle": "signature",
      "bottomStyle": "mini",
      "top": "#e8dfca",
      "bottom": "#343d5c",
      "accent": "#aeb9d8",
      "accessory": true
    }
  },
  {
    "id": "hibiki",
    "name": "ヒビキ",
    "short": "HIBIKI",
    "tag": "いたずらな笑みが、勝負の瞬間に静まる",
    "role": "深夜帯のDJ",
    "hobby": "レコード探し・音響機材の手入れ",
    "description": "紫のボブ、半眼とギザ歯の笑顔が目印のDJ。相手の反応まで楽しむ、いたずら好きの勝負師。冗談を口にしていても、リーチを選ぶ瞬間には急に静かになる。",
    "backstory": "フロアの空気を変える間と、何も鳴らさず待つ間の両方が好き。卓でも人の表情を楽しむが、勝負の手順はおろそかにしない。見つけた古いレコードの話になると、少しだけ早口になる。",
    "adult": true,
    "age": 28,
    "accent": "#c6a1d9",
    "style": "aggressive",
    "skill": 3,
    "facePreset": "giza",
    "hairStyle": "asym",
    "hairColor": "#665181",
    "eyeColor": "#9abcb1",
    "skinColor": "#dfbfaa",
    "bodyLabel": "小柄で、くびれの際立つシルエット",
    "heightCm": 158,
    "signatureAccessory": {
      "name": "暗色のヘッドフォンと三角ピン",
      "description": "慣れた音を聴くためのヘッドフォンと、少し鋭い三角の髪留め。紫の髪とギザ歯の笑顔を引き立てる。"
    },
    "bodyProfile": {
      "height": 158,
      "shoulder": 0.96,
      "chest": 1.14,
      "waist": 0.82,
      "hip": 1.14,
      "leg": 0.94,
      "headScale": 1.03
    },
    "defaultOutfit": "hibiki_backbeat",
    "defaultWardrobe": {
      "outfit": "hibiki_backbeat",
      "topStyle": "sleeveless",
      "bottomStyle": "mini",
      "top": "#71517f",
      "bottom": "#342d47",
      "accent": "#cb9bce",
      "accessory": true
    }
  },
  {
    "id": "yuzu",
    "name": "ユズ",
    "short": "YUZU",
    "tag": "好奇心の足どりで、先の一局へ",
    "role": "旅するフォトグラファー",
    "hobby": "地図集め・路地の看板を撮ること",
    "description": "明るい琥珀色の髪と、大きな青緑の瞳を持つ写真家。見つけた機会へ軽やかに進み、鳴きで局のテンポをつくる。歓声も悔しさも素直で、小さなあがりを大切にする。",
    "backstory": "旅先で同じ卓を囲むと、言葉より早く人と仲よくなれると気づいた。知らない景色へ飛び込む度胸と、撮りたい一瞬を逃さない目を持つ。写真も麻雀も、一度の大きさより積み重ねが好き。",
    "adult": true,
    "age": 24,
    "accent": "#ebba70",
    "style": "speed",
    "skill": 2,
    "facePreset": "bright",
    "hairStyle": "twin",
    "hairColor": "#c88b5f",
    "eyeColor": "#49a7a7",
    "skinColor": "#f7dfca",
    "bodyLabel": "もっとも小柄で、細身の輪郭",
    "heightCm": 151,
    "signatureAccessory": {
      "name": "ティールのゴーグルと星のピン",
      "description": "頭に乗せたゴーグルと、旅先で見つけた星のピン。動きやすい服と一緒に、行きたい景色へ向かう。"
    },
    "bodyProfile": {
      "height": 151,
      "shoulder": 0.87,
      "chest": 0.86,
      "waist": 0.84,
      "hip": 0.9,
      "leg": 0.94,
      "headScale": 1.04
    },
    "defaultOutfit": "yuzu_fieldtrip",
    "defaultWardrobe": {
      "outfit": "yuzu_fieldtrip",
      "topStyle": "signature",
      "bottomStyle": "shorts",
      "top": "#d5a456",
      "bottom": "#3f797b",
      "accent": "#eedaba",
      "accessory": true
    }
  },
  {
    "id": "vesper",
    "name": "ヴェスパー",
    "short": "VESPER",
    "tag": "余韻を残す微笑みで、大きな手を待つ",
    "role": "ラウンジシンガー",
    "hobby": "古い映画を見ること・香りを選ぶこと",
    "description": "黒に近い長い姫カットと梅色の瞳を持つ、ラウンジの歌い手。余裕のある会話の奥で、打点のある形をじっくり育てる。勝っても声は荒らげず、最後に少しだけ笑顔をほどく。",
    "backstory": "歌い終えたあとの余韻を、急いで切らないことが好き。麻雀でも待つ時間を含めて一局を味わう。ただし穏やかさは遠慮ではなく、価値のある勝負には静かに踏み込む。",
    "adult": true,
    "age": 35,
    "accent": "#d0ad78",
    "style": "value",
    "skill": 3,
    "facePreset": "elegant",
    "hairStyle": "hime",
    "hairColor": "#282b3b",
    "eyeColor": "#a078a3",
    "skinColor": "#eddbd6",
    "bodyLabel": "背が高く、曲線のあるシルエット",
    "heightCm": 170,
    "signatureAccessory": {
      "name": "三日月の耳飾りと月のペンダント",
      "description": "三日月と月を、小さく重ねたアクセサリー。ドレスの静かな光と、歌い終えたあとの余韻に似合う。"
    },
    "bodyProfile": {
      "height": 170,
      "shoulder": 1.03,
      "chest": 1.19,
      "waist": 0.92,
      "hip": 1.16,
      "leg": 1.04,
      "headScale": 0.98
    },
    "defaultOutfit": "vesper_moonlight",
    "defaultWardrobe": {
      "outfit": "vesper_moonlight",
      "topStyle": "signature",
      "bottomStyle": "signature",
      "top": "#663e58",
      "bottom": "#342d43",
      "accent": "#d0b37b",
      "accessory": true
    }
  }
];
root.MahjongWardrobeStyles=[
  {
    "id": "mio_atelier",
    "ownerId": "mio",
    "name": "アトリエ",
    "label": "エプロンドレス＋パフスリーブ",
    "description": "肩と腕に沿う短い袖に、胸当てと肩紐のあるエプロンドレス。葉のブローチと髪のリボンが、喫茶店主ミオの目印。",
    "defaultPalette": {
      "top": "#9bac89",
      "bottom": "#625344",
      "accent": "#d8bd87"
    }
  },
  {
    "id": "aoi_observatory",
    "ownerId": "aoi",
    "name": "オブザーバトリー",
    "label": "フィットニット＋端正なパンツ",
    "description": "体に沿うサファイア色のニットと、端正なダークカラーのパンツ。細い眼鏡と三日月のクリップが、夜の観測室に似合う落ち着いた装い。",
    "defaultPalette": {
      "top": "#34598b",
      "bottom": "#293245",
      "accent": "#95becd"
    }
  },
  {
    "id": "rin_rally",
    "ownerId": "rin",
    "name": "ラリー",
    "label": "ノースリーブ＋ショートパンツ",
    "description": "コーラル色のノースリーブと、体に沿うダークカラーのショートパンツ。イヤーカフと星のヘアクリップを添えた、元アスリートらしい軽快な装い。",
    "defaultPalette": {
      "top": "#c8665d",
      "bottom": "#393d4d",
      "accent": "#efc778"
    }
  },
  {
    "id": "tsumugi_komorebi",
    "ownerId": "tsumugi",
    "name": "こもれび",
    "label": "フィットニット＋巻きスカート",
    "description": "柔らかな緑のニットと、腰から膝に沿う巻きスカート。花のバレッタから下がるタッセルが、テキスタイル作家らしい布の表情をつなぐ。",
    "defaultPalette": {
      "top": "#6b8d7a",
      "bottom": "#4e6567",
      "accent": "#dcc296"
    }
  },
  {
    "id": "rei_nocturne",
    "ownerId": "rei",
    "name": "ノクターン",
    "label": "テーラードケープ＋ミニスカート",
    "description": "肩を包む短いケープと、きちんとしたベストに、深い青のミニスカート。真珠の耳飾りと菱形のブローチが静かに光る、端正な演奏家の装い。",
    "defaultPalette": {
      "top": "#e8dfca",
      "bottom": "#343d5c",
      "accent": "#aeb9d8"
    }
  },
  {
    "id": "hibiki_backbeat",
    "ownerId": "hibiki",
    "name": "バックビート",
    "label": "ノースリーブ＋ミニスカート",
    "description": "紫のノースリーブに、細かなプリーツのミニスカート。暗色のヘッドフォンと三角のヘアピンを添えた、夜のDJらしいすっきりした装い。",
    "defaultPalette": {
      "top": "#71517f",
      "bottom": "#342d47",
      "accent": "#cb9bce"
    }
  },
  {
    "id": "yuzu_fieldtrip",
    "ownerId": "yuzu",
    "name": "フィールドトリップ",
    "label": "フーディー＋ショートパンツ",
    "description": "旅先でも動きやすい暖かな黄色のフーディーと、ティールのショートパンツ。頭に乗せたゴーグルと星のピンが、旅する写真家の目印。",
    "defaultPalette": {
      "top": "#d5a456",
      "bottom": "#3f797b",
      "accent": "#eedaba"
    }
  },
  {
    "id": "vesper_moonlight",
    "ownerId": "vesper",
    "name": "ムーンライト",
    "label": "ベルベットドレス＋ケープレット",
    "description": "プラム色のドレスに、肩を柔らかく囲むケープレット。三日月の耳飾りと月のペンダントが、ラウンジシンガーの落ち着いた装いを結ぶ。",
    "defaultPalette": {
      "top": "#663e58",
      "bottom": "#342d43",
      "accent": "#d0b37b"
    }
  }
];
// Borrowing a character's outfit includes that outfit's authored top and bottom.
for(const style of root.MahjongWardrobeStyles){
  const wardrobe=root.MahjongRoster.find(c=>c.id===style.ownerId).defaultWardrobe;
  style.defaultPieces={topStyle:wardrobe.topStyle,bottomStyle:wardrobe.bottomStyle};
}
/* Older untouched default colours migrate to new signature palettes; deliberate recolours survive. */
root.MahjongLegacyWardrobeDefaults={
  "mio": {
    "style": "casual",
    "top": "#e7d6be",
    "bottom": "#424a60",
    "accent": "#b36b55"
  },
  "aoi": {
    "style": "smart",
    "top": "#d8e8ed",
    "bottom": "#2d3c55",
    "accent": "#6ea8bd"
  },
  "rin": {
    "style": "casual",
    "top": "#a65051",
    "bottom": "#3c3445",
    "accent": "#efc587"
  },
  "tsumugi": {
    "style": "cardigan",
    "top": "#8eaa90",
    "bottom": "#4d6261",
    "accent": "#e2d2a9"
  },
  "rei": {
    "style": "smart",
    "top": "#e5e0e8",
    "bottom": "#393f58",
    "accent": "#bab1ce"
  },
  "hibiki": {
    "style": "dress",
    "top": "#7d597b",
    "bottom": "#50435f",
    "accent": "#dac498"
  },
  "yuzu": {
    "style": "casual",
    "top": "#edbe76",
    "bottom": "#526c70",
    "accent": "#f4e7bd"
  },
  "vesper": {
    "style": "dress",
    "top": "#6b3b55",
    "bottom": "#45334b",
    "accent": "#cbae77"
  }
};
})(typeof window!=='undefined'?window:globalThis);



/* VESPER bodies with the original MIO head meshes, shared across the cast. */
(function(){
'use strict';
const Base=window.MahjongTable3D;
const DEFAULT_IDS=['mio','aoi','rin','tsumugi','rei','hibiki','yuzu','vesper'];
const bytes=s=>{const str=atob(s),a=new Uint8Array(str.length);for(let i=0;i<str.length;i++)a[i]=str.charCodeAt(i);return a;};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function color(value,fallback=[1,1,1]){if(Array.isArray(value)&&value.length>=3)return value.slice(0,3).map(v=>clamp(Number(v)||0,0,1));if(typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value))return [1,3,5].map(i=>parseInt(value.slice(i,i+2),16)/255);return fallback.slice();}
function ratio(a,b){return a.map((v,i)=>clamp(v/Math.max(.08,b[i]),.12,2.4));}
function program(gl,vs,fs){const p=gl.createProgram();for(const [type,src]of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));gl.attachShader(p,s);gl.deleteShader(s);}gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p;}
function cast(){const r=window.MahjongRoster;return Array.isArray(r)?r:Array.isArray(r?.characters)?r.characters:[];}
function rotation(y,x,z){const cy=Math.cos(y),sy=Math.sin(y),cx=Math.cos(x),sx=Math.sin(x),cz=Math.cos(z),sz=Math.sin(z);return [cy*cz+sy*sx*sz,cx*sz,-sy*cz+cy*sx*sz,-cy*sz+sy*sx*cz,cx*cz,sy*sz+cy*sx*cz,sy*cx,-sx,cy*cx];}
function combined(a,b){const out=[];for(let j=0;j<3;j++)for(let i=0;i<3;i++)out[j*3+i]=a[i]*b[j*3]+a[3+i]*b[j*3+1]+a[6+i]*b[j*3+2];return out;}
function transformed(r,p){return [r[0]*p[0]+r[3]*p[1]+r[6]*p[2],r[1]*p[0]+r[4]*p[1]+r[7]*p[2],r[2]*p[0]+r[5]*p[1]+r[8]*p[2]];}
function model(r,position,scale=8){return new Float32Array([r[0]*scale,r[1]*scale,r[2]*scale,0,r[3]*scale,r[4]*scale,r[5]*scale,0,r[6]*scale,r[7]*scale,r[8]*scale,0,position[0],position[1],position[2],1]);}
function expression(mood,kind){const value=String(mood||kind||'neutral').toLowerCase();if(/win|happy|joy|smile|greet|greeting|cheer|thank|call|chi|pon|kan/.test(value))return 'smile';if(/riichi|reach|confiden|proud|declar/.test(value))return 'proud';if(/surpris|shock|alert|danger|ron/.test(value))return 'surprise';if(/sad|lose|loss|disappoint|defeat|regret/.test(value))return 'sad';if(/focus|think|tense|serious|caution|defend/.test(value))return 'focus';return 'neutral';}
const AMBIENT={mio:['settle','approve','consider'],aoi:['consider','nod','settle'],rin:['approve','settle','hesitate'],tsumugi:['nod','consider','settle'],rei:['settle','consider','nod'],hibiki:['hesitate','approve','consider'],yuzu:['settle','approve','hesitate'],vesper:['consider','settle','approve']};
function motionHash(id,n=0){let h=2166136261;for(const c of String(id))h=Math.imul(h^c.charCodeAt(0),16777619);h=Math.imul(h^(n>>>0),2246822507);h=Math.imul(h^(h>>>13),3266489909);return (h^(h>>>16))>>>0;}
const softPulse=(t,a,b)=>pulse(t,a,b)**2;
const PERSONALITY={mio:[.92,.94,.3],aoi:[.73,.58,1.4],rin:[1.12,1.04,2.1],tsumugi:[.81,.72,3.4],rei:[.76,.53,4.1],hibiki:[1.01,.88,5.2],yuzu:[1.19,1.16,6.3],vesper:[.69,.56,7.1]};
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a),0,1);return t*t*(3-2*t);};
const HIP=[.000446071947366549,.5651317484501734,-.007861027593084127];
function bodyProfile(person){const p=person?.bodyProfile||{},height=clamp(Number(p.height||p.heightCm)||168,140,195),leg=clamp(Number(p.leg)||1,.85,1.20);return {height,torso:(height/168)*(1+.4*(1-leg)),shoulder:clamp(Number(p.shoulder)||1,.65,1.40),chest:clamp(Number(p.chest)||1,.65,1.40),waist:clamp(Number(p.waist)||1,.65,1.40),hip:clamp(Number(p.hip)||1,.65,1.40),leg,headScale:clamp(Number(p.headScale)||1,.82,1.15)};}
function bodyPoint(p,profile,arm=0){let sx=profile.hip,sz=profile.hip;for(const [a,b,x,z]of [[.61,.77,profile.waist,profile.waist],[.78,.89,profile.chest,profile.chest],[.91,1,profile.shoulder,1],[1.01,1.08,profile.headScale,profile.headScale]]){const w=smooth(a,b,p[1]);sx+=(x-sx)*w;sz+=(z-sz)*w;}const lower=1-smooth(.45,.66,p[1]);sz+=(profile.leg-sz)*lower;sx+=(1-sx)*arm;sz+=(1-sz)*arm;return [HIP[0]+(p[0]-HIP[0])*sx,p[1]+(p[1]-HIP[1])*(profile.torso-1)*smooth(HIP[1],.72,p[1])*(1-arm),HIP[2]+(p[2]-HIP[2])*sz];}
function pulse(t,start,end){if(t<=start||t>=end)return 0;return Math.sin((t-start)/(end-start)*Math.PI);}
function gestureFor(event){if(event?.gesture)return event.gesture;const k=event?.kind||'';return /welcome|finish/.test(k)?'bow':/riichi/.test(k)?'declare':/win|comeback/.test(k)?'cheer':/loss/.test(k)?'sigh':/threat|respect/.test(k)?'look':/late|idle|think/.test(k)?'think':'nod';}
class SeatedMahjongTable extends Base{
  init(){super.init();this.initCharacters();}
  initCharacters(){
    const gl=this.gl,assets=window.MahjongCharacterAssets||window.SeatedCharacterAssets;
    const loadGeneration=this._characterLoadGeneration=(this._characterLoadGeneration||0)+1;this._characterImagesReady=false;
    this.characterMeshes=[];this.characterTextures=[];this.characterHeads={};this.characterOutfits={};this.characterAccessories={};this.characterBody=[];this.characterBareLegs=[];this.characterModularTops={};this.characterModularBottoms={};this._characterClothingCache=new Map();
    this._characterMode=this._characterMode||'all';this._lineup=this._lineup||DEFAULT_IDS.slice(0,4);this._wardrobe=this._wardrobe||{};this._reactions=this._reactions||{};
    this._actorMotionPreference=window.matchMedia?.('(prefers-reduced-motion: reduce)')||null;this.charactersReady=Promise.resolve(false);if(!assets)return;this.characterAssets=assets;
    this.characterProgram=program(gl,`
      attribute vec3 aPosition;attribute vec3 aNormal;attribute vec2 aUV;attribute vec2 aArmWeight;
      uniform mat4 uModel;uniform mat4 uVP;uniform mat3 uNormal;
      uniform vec3 uExpressionCenter;uniform mediump float uExpressionPart;uniform mediump float uBlink;uniform mediump float uBlinkPlane;uniform float uTalk;uniform float uBreath;
      uniform vec3 uBodyMotion;uniform vec3 uArmMotion;uniform float uMotionEnabled;
      uniform vec3 uHairSway;uniform vec3 uHairRange;uniform float uHairMotion;
      uniform vec4 uUpperProfile;uniform vec4 uLowerProfile;uniform float uProfileEnabled;
      uniform vec3 uLeftArmPivot;uniform vec3 uRightArmPivot;uniform vec3 uTorsoPivot;
      uniform float uAccessoryOffset;
      varying vec3 vNormal;varying vec3 vWorld;varying vec2 vUV;
      vec3 rotX(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(v.x,c*v.y-s*v.z,s*v.y+c*v.z);}
      vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}
      vec2 blendWeight(float a,float b,float y){float t=clamp((y-a)/(b-a),0.0,1.0);return vec2(t*t*(3.0-2.0*t),6.0*t*(1.0-t)/(b-a));}
      vec2 blendScale(vec2 from,float to,vec2 w){return vec2(mix(from.x,to,w.x),from.y*(1.0-w.x)+(to-from.x)*w.y);}
      void profileBody(inout vec3 p,inout vec3 n,float arm){
        float y=p.y;vec2 sx=vec2(uLowerProfile.x,0.0),sz=sx;
        sx=blendScale(sx,uUpperProfile.w,blendWeight(.61,.77,y));sz=blendScale(sz,uUpperProfile.w,blendWeight(.61,.77,y));
        sx=blendScale(sx,uUpperProfile.z,blendWeight(.78,.89,y));sz=blendScale(sz,uUpperProfile.z,blendWeight(.78,.89,y));
        sx=blendScale(sx,uUpperProfile.y,blendWeight(.91,1.0,y));sz=blendScale(sz,1.0,blendWeight(.91,1.0,y));
        sx=blendScale(sx,uLowerProfile.z,blendWeight(1.01,1.08,y));sz=blendScale(sz,uLowerProfile.z,blendWeight(1.01,1.08,y));
        vec2 lower=blendWeight(.45,.66,y);sz=blendScale(sz,uLowerProfile.y,vec2(1.0-lower.x,-lower.y));
        sx=vec2(mix(sx.x,1.0,arm),sx.y*(1.0-arm));sz=vec2(mix(sz.x,1.0,arm),sz.y*(1.0-arm));
        vec2 up=blendWeight(.56513174845,.72,y);float h=(uUpperProfile.x-1.0)*(1.0-arm),dy=1.0+h*(up.x+(y-.56513174845)*up.y);
        float nx=n.x/sx.x,nz=n.z/sz.x;float ny=(n.y-(p.x-.00044607195)*sx.y*nx-(p.z+.00786102759)*sz.y*nz)/dy;n=vec3(nx,ny,nz);
        p=vec3(.00044607195+(p.x-.00044607195)*sx.x,y+(y-.56513174845)*h*up.x,-.00786102759+(p.z+.00786102759)*sz.x);
      }
      void main(){
        vec3 p=aPosition,n=aNormal;if(uBlinkPlane>.5)p+=aNormal*uBlink*.0012;
        if(uExpressionPart>.5&&uExpressionPart<1.5&&uBlinkPlane<.5){float eyeX=clamp((p.x-uExpressionCenter.x)/.035,-1.0,1.0);p.y=uExpressionCenter.y+(p.y-uExpressionCenter.y)*(1.0-uBlink*.93)+uBlink*.0022*(1.0-eyeX*eyeX);}
        if(uExpressionPart>1.5&&uExpressionPart<2.5)p.y=uExpressionCenter.y+(p.y-uExpressionCenter.y)*(1.0+uTalk*.22);
        p.z+=uAccessoryOffset;if(uProfileEnabled>.5)profileBody(p,n,clamp(aArmWeight.x+aArmWeight.y,0.0,1.0));
        if(uMotionEnabled>.5){
          vec3 left=uLeftArmPivot,right=uRightArmPivot;
          float la=uArmMotion.x*aArmWeight.x;
          float ra=uArmMotion.y*aArmWeight.y;
          p=left+rotX(p-left,la);n=rotX(n,la);p=right+rotX(p-right,ra);n=rotX(n,ra);
          float weight=smoothstep(.72,1.01,aPosition.y);
          vec3 pivot=uTorsoPivot;p=pivot+rotX(rotZ(p-pivot,uBodyMotion.y*weight),uBodyMotion.x*weight);
          n=rotX(rotZ(n,uBodyMotion.y*weight),uBodyMotion.x*weight);p.y+=uBodyMotion.z*weight+uBreath*smoothstep(.72,1.01,aPosition.y);
        }
        if(uHairMotion>.5){float tip=1.0-smoothstep(uHairRange.y,uHairRange.x,p.y);p+=uHairSway*tip*tip;}
        vec4 w=uModel*vec4(p,1.0);vWorld=w.xyz;vNormal=uNormal*n;vUV=aUV;gl_Position=uVP*w;
      }
    `,`
      precision mediump float;
      uniform sampler2D uTexture;uniform vec3 uColor;uniform vec3 uTint;uniform vec3 uEye;
      uniform float uHair;uniform float uFaceSkin;uniform float uUseTexture;uniform float uOpacity;uniform float uAlphaTest;uniform float uUnlit;uniform float uAccent;uniform float uDoubleSide;
      uniform vec3 uFinish;
      uniform mediump float uBlink;uniform mediump float uBlinkPlane;uniform mediump float uExpressionPart;
      varying vec3 vNormal;varying vec3 vWorld;varying vec2 vUV;
      void main(){
        vec4 tex=vec4(1.0);if(uUseTexture>.5)tex=texture2D(uTexture,vUV);
        if(uExpressionPart>.5&&uExpressionPart<1.5&&uBlink>.01){
          if(uBlinkPlane>.5){
            float x=(vUV.x-.52)/.29,curve=.335+.072*(1.0-x*x)+.026*x,line=(1.0-smoothstep(.014,.026,abs(vUV.y-curve)))*(1.0-smoothstep(.86,.98,abs(x)));
            float opening=.48*(1.0-uBlink);tex.a*=1.0-smoothstep(opening,opening+.024,abs(vUV.y-.325));
            float lid=smoothstep(.30,.90,uBlink);vec4 closed=vec4(.15,.105,.135,line);tex=mix(tex,closed,lid);
          }else if(uBlink>.65)discard;
        }
        float alpha=tex.a*uOpacity;if(alpha<uAlphaTest)discard;
        vec3 n=normalize(vNormal);if(uDoubleSide>.5&&!gl_FrontFacing)n=-n;
        vec3 light=normalize(vec3(-.35,.85,.52)),eye=normalize(uEye-vWorld);
        float d=dot(n,light);float shade=.72+.34*smoothstep(-.30,.65,d);
        if(uFaceSkin>.5)shade=.92+.075*smoothstep(-.35,.65,d);
        if(uHair>.5)shade=.64+.16*smoothstep(-.22,.10,d)+.18*smoothstep(.29,.58,d);
        float rim=pow(1.0-max(dot(n,eye),0.0),3.0)*.055;
        vec3 col=tex.rgb*uColor*uTint;col*=mix(shade,1.0,uUnlit);
        if(uHair>.5){vec3 halfway=normalize(light+eye);col+=(vec3(.23,.27,.32)+col*.52)*pow(max(dot(n,halfway),0.0),16.0)*.08;}
        if(uHair<.5&&uUnlit<.5&&uFaceSkin<.5){vec3 halfway=normalize(light+eye);float shine=pow(max(dot(n,halfway),0.0),mix(6.0,64.0,1.0-uFinish.x));col+=mix(vec3(.83,.87,.91),col,uFinish.y)*shine*uFinish.z;}
        col+=vec3(.68,.83,.77)*rim*(uFaceSkin>.5?.28:1.0)+vec3(.012,.025,.017)*uAccent;
        gl_FragColor=vec4(clamp(col,0.0,1.0),alpha);
      }
    `);
    const loc=this.characterLoc={};for(const name of ['aPosition','aNormal','aUV','aArmWeight'])loc[name]=gl.getAttribLocation(this.characterProgram,name);
    for(const name of ['uHair','uFaceSkin','uFinish','uModel','uVP','uNormal','uTexture','uColor','uTint','uEye','uUseTexture','uOpacity','uAlphaTest','uUnlit','uAccent','uDoubleSide','uExpressionCenter','uExpressionPart','uBlink','uBlinkPlane','uTalk','uBreath','uBodyMotion','uArmMotion','uMotionEnabled','uHairSway','uHairRange','uHairMotion','uUpperProfile','uLowerProfile','uProfileEnabled','uLeftArmPivot','uRightArmPivot','uTorsoPivot','uAccessoryOffset'])loc[name]=gl.getUniformLocation(this.characterProgram,name);
    const compiled=new Map(),compile=source=>{
      if(compiled.has(source))return compiled.get(source);
      const data=bytes(source.vertices),vertices=new Float32Array(data.buffer),vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
      let ib=null,indexBytes=null;if(source.indices){indexBytes=bytes(source.indices);ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indexBytes.buffer),gl.STATIC_DRAW);}
      let center=source.expressionCenter||source.center;if(!Array.isArray(center)){const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];for(let i=0;i<vertices.length;i+=8)for(let j=0;j<3;j++){lo[j]=Math.min(lo[j],vertices[i+j]);hi[j]=Math.max(hi[j],vertices[i+j]);}center=lo.map((v,j)=>(v+hi[j])/2);}
      const mat=assets.materials[source.material]||{},vertexCount=source.vertexCount||data.byteLength/32,weights=source.motionWeights?bytes(source.motionWeights):new Uint8Array(vertexCount*2),armBuffer=gl.createBuffer();
      if(weights.length!==vertexCount*2)throw new Error('Character arm weights do not match the baked mesh.');
      gl.bindBuffer(gl.ARRAY_BUFFER,armBuffer);gl.bufferData(gl.ARRAY_BUFFER,weights,gl.STATIC_DRAW);
      const mesh={vb,ib,armBuffer,count:ib?(source.indexCount||source.count||indexBytes.length/2):vertexCount,material:mat,materialIndex:source.material,part:source.part||'body',attachment:source.attachment||'body',clothingLayer:source.clothingLayer,replaceWithBareLegs:source.replaceWithBareLegs===true,outfitOffsets:source.outfitOffsets,accessoryKey:source.accessoryKey,expressionPart:source.expressionPart||mat.expressionPart||'',center};
      compiled.set(source,mesh);this.characterMeshes.push(mesh);return mesh;
    };
    const compileGroup=group=>(Array.isArray(group)?group:group?[group]:[]).map(compile).sort((a,b)=>(a.material.transparent||a.material.opacity<1?1:0)-(b.material.transparent||b.material.opacity<1?1:0));
    if(assets.version>=2&&assets.heads){this.characterBody=compileGroup(assets.body);this.characterBareLegs=compileGroup(assets.bodyBareLegs);for(const [id,group]of Object.entries(assets.heads))this.characterHeads[id]=compileGroup(group);for(const [id,group]of Object.entries(assets.outfits||{}))this.characterOutfits[id]=compileGroup(group);for(const [id,group]of Object.entries(assets.modularTops||{}))this.characterModularTops[id]=compileGroup(group);for(const [id,group]of Object.entries(assets.modularBottoms||{}))this.characterModularBottoms[id]=compileGroup(group);for(const [id,group]of Object.entries(assets.accessories||{}))this.characterAccessories[id]=compileGroup(group);}
    else{this.characterBody=compileGroup(assets.meshes);this._legacyCharacters=true;}
    this.setLineup(this._lineup);
    const jobs=(assets.textures||[]).map((tex,i)=>{
      const texture=gl.createTexture();this.characterTextures[i]=texture;gl.bindTexture(gl.TEXTURE_2D,texture);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([255,255,255,255]));
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      return new Promise(resolve=>{const image=new Image();image.onload=()=>{try{if(this.disposed||this._characterLoadGeneration!==loadGeneration||gl.isContextLost&&gl.isContextLost()){resolve(false);return;}gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,tex.flipY?1:0);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,0);resolve(true);}catch(e){console.warn('Character texture',e);resolve(false);}};image.onerror=()=>resolve(false);image.src=tex.src;});
    });
    this.charactersReady=Promise.all(jobs).then(r=>{if(this.disposed||this._characterLoadGeneration!==loadGeneration)return false;this._characterImagesReady=true;return r.every(Boolean);});
  }
  sceneNow(){return Number.isFinite(this.sceneTime)?this.sceneTime:0;}
  setState(state){super.setState(state);this.characterPublicState(state);}
  baselineCharacterMotion(state=this.state){
    const events=Array.isArray(state?.events)?state.events:[];
    this._actorPublicMatch=`${state?.matchId||''}:${state?.roundIndex||0}:${state?.honba||0}`;
    this._actorEventCursor=Math.max(Number(state?.eventSeq)||0,...events.map(e=>Number(e.seq)||0));
    this._actorClips={};this._actorAmbient={};this._actorTurns={};
    if(Number.isInteger(state?.current))this._actorTurns[state.current]={start:this.sceneNow(),seq:this._actorEventCursor};
  }
  characterPublicState(state){
    if(!state)return;const match=`${state.matchId||''}:${state.roundIndex||0}:${state.honba||0}`,events=Array.isArray(state.events)?state.events:[],seq=Math.max(Number(state.eventSeq)||0,...events.map(e=>Number(e.seq)||0));
    if(this._actorPublicMatch!==match||!Number.isFinite(this._actorEventCursor)||seq<this._actorEventCursor){this.baselineCharacterMotion(state);return;}
    const now=this.sceneNow();for(const event of events){if(!(event.seq>this._actorEventCursor))continue;const seat=event.player;if(!Number.isInteger(seat)||seat<0||seat>3)continue;const id=this._lineup?.[seat]||DEFAULT_IDS[seat],pick=motionHash(id,event.seq);
      if(event.kind==='draw'||event.kind==='call'){
        this._actorTurns[seat]={start:now,seq:event.seq};
        if(seat!==0&&pick%4===0)this._actorClips[seat]={start:now+20,duration:480+pick%120,gesture:pick%3===0?'hesitate':'consider',expression:'focus',turn:true,seq:event.seq};
      }else if(event.kind==='discard'){
        if(this._actorTurns[seat])this._actorTurns[seat].ended=true;
        if(pick%4===0)this._actorClips[seat]={start:now,duration:800+pick%200,gesture:'approve',expression:'neutral',seq:event.seq};else if(this._actorClips[seat]?.turn)delete this._actorClips[seat];
      }else if(event.kind==='kanDeclared'||event.kind==='riichi'){
        for(let other=0;other<4;other++)if(other!==seat&&motionHash(this._lineup?.[other]||DEFAULT_IDS[other],event.seq)%2===0)this._actorClips[other]={start:now,duration:1100,gesture:'recoil',expression:'surprise',targetPlayer:seat,seq:event.seq};
      }
    }this._actorEventCursor=seq;
  }
  characterAmbient(seat,id,now,current){
    if(!['cpu','discard','response'].includes(this.state?.phase)||this.tableCycle)return null;
    this._actorAmbient=this._actorAmbient||{};const seed=motionHash(id,seat),turn=this._actorTurns?.[seat];
    let idle=this._actorAmbient[seat];if(!idle||idle.id!==id)idle=this._actorAmbient[seat]={id,serial:0,next:now+2600+seed%3500,turnSeq:null,clip:null};
    if(current&&seat===0&&turn&&idle.turnSeq!==turn.seq){idle.turnSeq=turn.seq;idle.next=turn.start+6000+motionHash(id,turn.seq)%4000;idle.clip=null;}
    if(idle.clip&&now>=idle.clip.start+idle.clip.duration)idle.clip=null;
    if(!idle.clip&&now>=idle.next){const pick=motionHash(id,++idle.serial),gesture=current?'consider':AMBIENT[id]?.[pick%AMBIENT[id].length]||'settle';idle.clip={start:now,duration:1100+pick%500,gesture,expression:gesture==='approve'||gesture==='nod'?'smile':gesture==='consider'||gesture==='hesitate'?'focus':'neutral'};idle.next=now+6000+pick%4000;}
    return idle.clip;
  }
  characterId(id){const keys=Object.keys(this.characterHeads||{});return keys.includes(id)?id:(keys[0]||DEFAULT_IDS.includes(id)&&id||'mio');}
  characterClothing(style,profile={}){
    const signature=Array.isArray(this.characterOutfits[style])?this.characterOutfits[style]:[],split=signature.every(mesh=>['top','bottom','footwear','always'].includes(mesh.clothingLayer));
    const pieces=(window.MahjongWardrobeStyles||[]).find(s=>s.id===style)?.defaultPieces||profile;
    const topStyle=split&&['sleeveless','knit'].includes(pieces.topStyle)&&this.characterModularTops[pieces.topStyle]?.length?pieces.topStyle:'signature';
    const bottomStyle=split&&['shorts','mini'].includes(pieces.bottomStyle)&&this.characterModularBottoms[pieces.bottomStyle]?.length&&this.characterBareLegs.length&&this.characterBody.some(mesh=>mesh.replaceWithBareLegs)?pieces.bottomStyle:'signature';
    const key=`${style}:${topStyle}:${bottomStyle}`;if(this._characterClothingCache.has(key))return this._characterClothingCache.get(key);
    const body=bottomStyle==='signature'?this.characterBody:[...this.characterBody.filter(mesh=>!mesh.replaceWithBareLegs),...this.characterBareLegs];
    const outfit=[...signature.filter(mesh=>(topStyle==='signature'||mesh.clothingLayer!=='top')&&(bottomStyle==='signature'||mesh.clothingLayer!=='bottom')),...(topStyle==='signature'?[]:this.characterModularTops[topStyle]),...(bottomStyle==='signature'?[]:this.characterModularBottoms[bottomStyle])];
    const clothing={style,topStyle,bottomStyle,body,outfit,accessoryStyle:topStyle==='signature'?style:topStyle};this._characterClothingCache.set(key,clothing);return clothing;
  }
  characterBodyProfile(id){return bodyProfile(cast().find(p=>p.id===id));}
  characterBodyPoint(point,id,arm=0){return bodyPoint(point,this.characterBodyProfile(id),clamp(arm,0,1));}
  characterEyeHeight(){const id=this._lineup?.[0]||'mio',assets=this.characterAssets||window.MahjongCharacterAssets,person=cast().find(p=>p.id===id);if(!assets||!person)return 3.05;const anchor=assets.headAnchor||[.00045,1.085,.00592],shape=bodyProfile(person),eyes=(this.characterHeads?.[id]||[]).filter(m=>(m.expressionPart==='eye'||m.expressionPart==='eyes')&&m.material.texture!==null&&m.material.texture!==undefined),sourceEyes=eyes.length?eyes.map(m=>m.center):((assets.heads?.[id]||[]).filter(m=>(m.expressionPart==='eye'||m.expressionPart==='eyes')&&assets.materials[m.material]?.texture!==null&&assets.materials[m.material]?.texture!==undefined).map(m=>m.expressionCenter||m.center).filter(Boolean));if(!sourceEyes.length)return 3.05;const eyeY=sourceEyes.reduce((n,p)=>n+p[1],0)/sourceEyes.length;return -5.92+8*(bodyPoint(anchor,shape)[1]+(eyeY-anchor[1])*shape.headScale);}
  setLineup(ids){const input=Array.isArray(ids)?ids:DEFAULT_IDS,next=Array.from({length:4},(_,i)=>this.characterId(input[i]||DEFAULT_IDS[i]));if(this._lineup&&next.some((id,i)=>this._lineup[i]!==id)){this._reactions={};this._reactionKeys={};this._actorGaze={};this.baselineCharacterMotion();}this._lineup=next;return this._lineup.slice();}
  setWardrobe(profiles){this._wardrobe={};if(profiles&&typeof profiles==='object')for(const [id,p]of Object.entries(profiles)){if(p&&typeof p==='object')this._wardrobe[id]={...p};}return this;}
  previewCharacter(id,profile){const selected=this.characterId(id),old=this._characterPreview,greeting=old?.id===selected?old.greeting:{start:this.sceneNow(),duration:1550,kind:'welcome',gesture:'nod',expression:'smile'};this._characterPreview={id:selected,profile:profile&&typeof profile==='object'?{...profile}:null,greeting};return this._characterPreview.id;}
  endPreview(){this._characterPreview=null;return this;}
  setCharacters(mode){this._characterMode=['all','opponents','off'].includes(mode)?mode:'all';}
  setReaction(event){if(!event)return;const player=Number(event.player);if(!Number.isInteger(player)||player<0||player>3)return;const key=event.id||event.eventSeq!==undefined&&`${event.eventSeq}:${event.kind}:${player}`;this._reactionKeys=this._reactionKeys||{};if(key&&this._reactionKeys[player]===key)return;if(key)this._reactionKeys[player]=key;const duration=clamp(Number(event.duration)||2200,450,8000);this._reactions[player]={...event,start:this.sceneNow(),duration,expression:expression(event.mood,event.kind)};}
  characterMotion(seat,id,now,preview){
    now=Number.isFinite(this.sceneTime)?this.sceneTime:Number(now)||0;
    const [pace,expressive,phase]=PERSONALITY[id]||PERSONALITY.mio,still=!!this._portraitStill,reduced=this.reducedMotion===true||!!this._actorMotionPreference?.matches;
    const turn=this._actorTurns?.[seat],current=!preview&&this.state?.current===seat&&['cpu','discard'].includes(this.state?.phase)&&!turn?.ended;
    const reaction=preview?this._characterPreview?.greeting:this._reactions?.[seat],reactionElapsed=reaction?now-reaction.start:0,reactionActive=!!reaction&&reactionElapsed>=0&&reactionElapsed<reaction.duration;
    let activity=reactionActive?reaction:null,source=activity?'reaction':'quiet';
    if(!activity&&!preview&&!still&&!reduced){const cue=this._actorClips?.[seat];if(cue&&now>=cue.start&&now<cue.start+cue.duration&&(!cue.turn||current)){activity=cue;source='public';}else{activity=this.characterAmbient(seat,id,now,current);if(activity)source='ambient';}}
    const elapsed=activity?now-activity.start:0,t=activity?clamp(elapsed/activity.duration,0,1):1,active=!!activity;
    let gesture=active?gestureFor(activity):'idle',mood=active?activity.expression||'neutral':current?'focus':'neutral';
    if(gesture==='look'&&mood==='surprise')gesture='recoil';
    let target=active&&Number.isInteger(activity.targetPlayer)?activity.targetPlayer:this.state?.current;
    if(!Number.isInteger(target)||target<0||target>3)target=this.state?.lastDiscard?.player;
    if(active&&gesture==='bow'&&!Number.isInteger(activity.targetPlayer))target=0;
    if(still||reduced)return {yaw:0,pitch:-.015,roll:0,body:[0,0,0],arms:[0,0,0],hair:[0,0,0],breath:0,blink:0,talk:0,mood:still?'neutral':mood,gesture:still?'idle':gesture,source:'static',targetPlayer:Number.isInteger(target)?target:null,current};
    let gaze=0;if(!preview&&Number.isInteger(target)&&target!==seat){const a=this.seat(0,8.55,seat),b=this.seat(0,8.55,target),dx=b.x-a.x,dz=b.z-a.z,c=Math.cos(a.yaw),s=Math.sin(a.yaw),lx=dx*c-dz*s,lz=dx*s+dz*c;gaze=clamp(Math.atan2(-lx,-lz),-.70,.70);}
    this._actorGaze=this._actorGaze||{};const attention=this._actorGaze[seat]||{yaw:0,time:now};const dt=clamp((now-attention.time)/1000,0,.08),oldYaw=attention.yaw;attention.yaw+=(gaze-attention.yaw)*(1-Math.exp(-dt*4.8));if(dt>0)attention.delta=attention.yaw-oldYaw;attention.time=now;this._actorGaze[seat]=attention;
    let yaw=attention.yaw,pitch=current?-.055:-.018,roll=Math.sin(now*.00043*pace+phase)*.009;
    let lean=current?-.006:0,sway=Math.sin(now*.00057*pace+phase)*.0035,lift=0,left=0,right=0;
    const amp=expressive*(preview?.65:1),envelope=active?Math.sin(t*Math.PI)**2:0,doubleNod=softPulse(t,.04,.27)+softPulse(t,.34,.60),bow=softPulse(t,.06,.73),hand=motionHash(id)%2;
    if(active){
      if(gesture==='bow'){pitch-=bow*.27*amp;lean-=bow*.045*amp;roll+=bow*.015*amp;}
      else if(gesture==='declare'){pitch+=envelope*.115*amp;lean-=envelope*.037*amp;right=softPulse(t,.09,.37)*.13*amp;roll-=envelope*.019*amp;}
      else if(gesture==='cheer'){pitch+=envelope*.065*amp-doubleNod*.17*amp;roll+=envelope*.053*amp;lift=envelope*.008*amp;right=softPulse(t,.13,.69)*.18*amp;left=softPulse(t,.29,.71)*.10*amp;}
      else if(gesture==='sigh'){pitch-=envelope*.20*amp;roll-=envelope*.04*amp;lean-=envelope*.031*amp;lift=-envelope*.003;}
      else if(gesture==='hesitate'){yaw+=Math.sin(t*Math.PI*3.4)*envelope*.12*amp;pitch-=envelope*.09*amp;roll+=envelope*.023*amp;lean-=envelope*.014*amp;right=softPulse(t,.35,.86)*.11*amp;}
      else if(gesture==='consider'||gesture==='think'){pitch-=envelope*.115*amp;roll+=envelope*.035*amp*(hand?1:-1);lean-=envelope*.021*amp;if(hand)right=softPulse(t,.10,.78)*.14*amp;else left=softPulse(t,.10,.78)*.14*amp;}
      else if(gesture==='settle'){pitch+=envelope*.04*amp;lean-=envelope*.016*amp;sway+=Math.sin(t*Math.PI*2)*envelope*.016*amp;lift=envelope*.004*amp;if(hand)left=softPulse(t,.1,.76)*.07*amp;else right=softPulse(t,.1,.76)*.07*amp;}
      else if(gesture==='approve'){pitch-=softPulse(t,.1,.63)*.11*amp;roll+=envelope*.026*amp*(hand?1:-1);right=softPulse(t,.13,.74)*.07*amp;}
      else if(gesture==='recoil'){const back=softPulse(t,.01,.57);pitch+=back*.10*amp;lean+=back*.012*amp;roll+=back*.045*amp;left=back*.08*amp;right=back*.12*amp;pitch-=softPulse(t,.48,.88)*.05*amp;if(source!=='reaction'&&t>.65)mood='focus';}
      else if(gesture==='look'){pitch+=envelope*.015;roll+=envelope*.022*amp;}
      else{pitch-=doubleNod*.17*amp;right=softPulse(t,.10,.36)*.045*amp;}
    }
    if(preview){yaw=Math.sin(now*.00032*pace+phase)*.022;if(!active){pitch=-.015;lean=0;roll=Math.sin(now*.00043*pace+phase)*.009;}}
    const breath=this.quality==='low'?0:Math.sin(now*.00145*pace+phase)*.00135+Math.sin(now*.00241*pace+phase)*.00022;
    const period=4300+Math.round(phase*167),blinkPhase=(now+phase*1157)%period,blink=this.quality==='low'?0:blinkPhase<150?Math.sin(blinkPhase/150*Math.PI):0;
    const talk=source==='reaction'&&!/focus|think|idle|late/.test(activity.kind||'')&&elapsed%690<510?(.5+.5*Math.sin(elapsed*.026+phase))*(.65+.35*Math.sin(elapsed*.013))*envelope:0;
    const hair=[clamp(Math.sin(now*.0016*pace+phase)*.0013+roll*.035-(attention.delta||0)*.045,-.006,.006),0,clamp(Math.sin(now*.0012*pace+phase)*.0008+pitch*.016,-.0045,.0045)];
    return {yaw:clamp(yaw,-.73,.73),pitch:clamp(pitch,-.37,.19),roll:clamp(roll,-.085,.085),body:[clamp(lean,-.062,.015),clamp(sway,-.022,.022),clamp(lift,-.004,.010)],arms:[clamp(left,0,.22),clamp(right,0,.22),0],hair,breath,blink,talk,mood,gesture,source,targetPlayer:Number.isInteger(target)?target:null,current};
  }
  draw(now){if(this.quality==='low'&&this._lastSceneFrame&&now-this._lastSceneFrame<30)return;this._lastSceneFrame=now;super.draw(now);if(this.supported)this.drawCharacters(this.sceneNow());}
  drawCharacters(now=this.sceneNow()){
    now=this.sceneNow();
    if(!this.characterMeshes?.length||this._characterMode==='off'&&!this._characterPreview)return;
    const gl=this.gl,l=this.characterLoc,assets=this.characterAssets,roster=cast();
    gl.useProgram(this.characterProgram);gl.uniformMatrix4fv(l.uVP,false,this.vp);gl.uniform3fv(l.uEye,this.eye);gl.uniform1i(l.uTexture,0);
    if(this.loc.aFace>=0)gl.disableVertexAttribArray(this.loc.aFace);
    for(const a of [l.aPosition,l.aNormal,l.aUV,l.aArmWeight])if(a>=0)gl.enableVertexAttribArray(a);
    this._drawnCharacters=[];
    for(let seat=0;seat<4;seat++){
      const preview=this._characterPreview;if(preview&&seat!==2)continue;
      if(!preview&&seat===0&&(this._characterMode==='opponents'||this.view==='first'))continue;
      const id=preview?preview.id:this._lineup[seat],person=roster.find(p=>p.id===id)||{},profile={...(person.wardrobe||person.defaultWardrobe||{}),...(this._wardrobe[id]||{}),...(preview?.profile||{})};
      const requestedStyle=profile.outfit||profile.style||person.defaultOutfit||person.outfit||'casual',style=Array.isArray(this.characterOutfits[requestedStyle])?requestedStyle:Array.isArray(this.characterOutfits[person.defaultOutfit])?person.defaultOutfit:'casual',clothing=this.characterClothing(style,profile),heads=this.characterHeads[id]||[],accessories=profile.accessory===false?[]:this.characterAccessories[id]||[],shape=bodyProfile(person);
      const meshes=[...clothing.body,...clothing.outfit,...heads,...accessories].sort((a,b)=>(a.material.transparent||a.material.opacity<1?1:0)-(b.material.transparent||b.material.opacity<1?1:0));
      const pos=this.seat(0,8.55,seat),baseRotation=rotation(pos.yaw,0,0),basePosition=[pos.x,-5.92,pos.z],pose=this.characterMotion(seat,id,now,!!preview);
      const torsoRotation=rotation(0,pose.body[0],pose.body[1]),localRotation=combined(torsoRotation,rotation(pose.yaw,pose.pitch,pose.roll)),headRotation=combined(baseRotation,localRotation),anchor=assets.headAnchor||[.00045,1.085,.00592],warpedAnchor=bodyPoint(anchor,shape),torsoPivot=bodyPoint([0,.72,0],shape),leftPivot=bodyPoint([-.292,.774,-.030],shape,1),rightPivot=bodyPoint([.293,.774,-.030],shape,1);
      const raisedAnchor=transformed(torsoRotation,warpedAnchor.map((v,i)=>v-torsoPivot[i])).map((v,i)=>v+torsoPivot[i]+(i===1?pose.body[2]+pose.breath:0)),turned=transformed(localRotation,anchor.map(v=>v*shape.headScale)),offset=transformed(baseRotation,raisedAnchor.map((v,i)=>v-turned[i]));
      const baseModel=model(baseRotation,basePosition),headModel=model(headRotation,basePosition.map((v,i)=>v+offset[i]*8),8*shape.headScale);
      const overrides=assets.expressions?.[id]?.[pose.mood]?.materialTextureOverrides||{};
      this._drawnCharacters.push({seat,id,outfit:style,topStyle:clothing.topStyle,bottomStyle:clothing.bottomStyle,mood:pose.mood,meshes:meshes.length,accessories:accessories.length,bodyProfile:shape,headAnchor:warpedAnchor,pose});
      gl.uniform3fv(l.uBodyMotion,pose.body);gl.uniform3fv(l.uArmMotion,pose.arms);gl.uniform3fv(l.uHairSway,pose.hair);gl.uniform3fv(l.uHairRange,[1.24,.96,0]);
      gl.uniform4fv(l.uUpperProfile,[shape.torso,shape.shoulder,shape.chest,shape.waist]);gl.uniform4fv(l.uLowerProfile,[shape.hip,shape.leg,shape.headScale,0]);gl.uniform3fv(l.uTorsoPivot,torsoPivot);gl.uniform3fv(l.uLeftArmPivot,leftPivot);gl.uniform3fv(l.uRightArmPivot,rightPivot);
      for(const mesh of meshes){
        const mat=mesh.material,category=mat.category||mat.tag||'other',isHead=mesh.part==='head'||mesh.part==='accessory'&&mesh.attachment==='head';
        gl.uniformMatrix4fv(l.uModel,false,isHead?headModel:baseModel);gl.uniformMatrix3fv(l.uNormal,false,new Float32Array(isHead?headRotation:baseRotation));
        gl.uniform1f(l.uAccent,pose.current?1:0);gl.uniform1f(l.uBreath,isHead?0:pose.breath);gl.uniform3fv(l.uExpressionCenter,mesh.center);
        gl.uniform1f(l.uProfileEnabled,isHead?0:1);gl.uniform1f(l.uAccessoryOffset,!isHead&&mesh.part==='accessory'?Number(mesh.outfitOffsets?.[clothing.accessoryStyle])||0:0);gl.uniform1f(l.uMotionEnabled,isHead?0:1);gl.uniform1f(l.uHairMotion,isHead&&category==='hair'?1:0);
        const part=mesh.expressionPart;gl.uniform1f(l.uExpressionPart,part==='eyes'||part==='eye'?1:part==='mouth'?2:0);gl.uniform1f(l.uBlink,pose.blink);gl.uniform1f(l.uBlinkPlane,(part==='eyes'||part==='eye')&&mat.texture!==null&&mat.texture!==undefined?1:0);gl.uniform1f(l.uTalk,pose.talk);
        gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vb);
        for(const [a,size,offset]of [[l.aPosition,3,0],[l.aNormal,3,12],[l.aUV,2,24]])if(a>=0)gl.vertexAttribPointer(a,size,gl.FLOAT,false,32,offset);
        if(l.aArmWeight>=0){gl.bindBuffer(gl.ARRAY_BUFFER,mesh.armBuffer);gl.vertexAttribPointer(l.aArmWeight,2,gl.UNSIGNED_BYTE,true,2,0);}
        let tint=[1,1,1];if(mat.colorSlot)tint=color(profile[mat.colorSlot]||profile[mat.colorSlot+'Color'],color(person[mat.colorSlot+'Color']||person.color));
        else if(category==='skin'){const authored=isHead?color(person.skinColor||person.skin,[242/255,223/255,224/255]):[242/255,223/255,224/255];tint=ratio(color(profile.skinColor||person.skinColor||person.skin,authored),authored);}
        else if(category==='hair'&&profile.hairColor)tint=ratio(color(profile.hairColor),color(person.hairColor||person.hair,mat.color||[1,1,1]));
        gl.uniform1f(l.uHair,category==='hair'?1:0);gl.uniform1f(l.uFaceSkin,isHead&&category==='skin'?1:0);gl.uniform3fv(l.uColor,mat.color||[1,1,1]);gl.uniform3fv(l.uTint,tint);
        const finish=mat.finish||'cotton',shine={cotton:.007,knit:.004,satin:.058,leather:.045,metal:.18}[finish]||.007;gl.uniform3fv(l.uFinish,[clamp(Number(mat.roughness??.7),.08,1),clamp(Number(mat.metalness)||0,0,1),shine]);
        const textureId=Object.prototype.hasOwnProperty.call(overrides,mesh.materialIndex)?overrides[mesh.materialIndex]:mat.texture;
        const texture=textureId===null||textureId===undefined?null:this.characterTextures[textureId];gl.uniform1f(l.uUseTexture,texture?1:0);if(texture)gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.uniform1f(l.uOpacity,mat.opacity??1);gl.uniform1f(l.uAlphaTest,Math.max(mat.alphaTest||0,texture?.01:0));
        gl.uniform1f(l.uUnlit,category==='eyes'||category==='eyelash'||category==='mouth'||category==='brows'||mat.unlit?1:0);gl.uniform1f(l.uDoubleSide,mat.side===2?1:0);
        if(mat.side===2)gl.disable(gl.CULL_FACE);else{gl.enable(gl.CULL_FACE);gl.cullFace(mat.side===1?gl.FRONT:gl.BACK);}
        if(mat.transparent||(mat.opacity??1)<1){gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);}else{gl.disable(gl.BLEND);gl.depthMask(true);}
        if(mesh.ib){gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.ib);gl.drawElements(gl.TRIANGLES,mesh.count,gl.UNSIGNED_SHORT,0);}else gl.drawArrays(gl.TRIANGLES,0,mesh.count);
      }
    }
    gl.depthMask(true);gl.disable(gl.BLEND);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);
  }
  dispose(){if(this.gl){for(const mesh of this.characterMeshes||[]){this.gl.deleteBuffer(mesh.vb);if(mesh.ib)this.gl.deleteBuffer(mesh.ib);if(mesh.armBuffer)this.gl.deleteBuffer(mesh.armBuffer);}for(const tex of this.characterTextures||[])this.gl.deleteTexture(tex);if(this.characterProgram)this.gl.deleteProgram(this.characterProgram);}super.dispose();}
}
window.MahjongTable3D=SeatedMahjongTable;
})();


