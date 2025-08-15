phina.globalize();


var SCREEN_WIDTH    = 900;
var SCREEN_HEIGHT   = 1400;

var BLOCK_SIZE = SCREEN_WIDTH / 5;
var Group;
var ObjectGroup;
var BlockGroup;
var EnemyGroup;
var ColisionGroup;
var ShootBlockGroup;
var OtehonGroup;
var EffectGroup;
var EffectGroup2;

var margin_top = 80;

var BlockColor;
var strokeColor;


var BULLET_POINT = 20;
var DANMAKU_POINT = 10;


var GAMEMAIN;

var ASSETS = {
  image: {
    
    'idol':'img/player.png',
    'ota':'img/joushi.png',
    'LHand':'img/LHand.png',
    'Kamae':'img/kamae.png',
    'Guard':'img/guard.png',

    'otaRed':'img/joushiRed.png',
    'otaYellow':'img/joushiYellow.png',

    'Crash':'img/Crash.png',
    'Hit':'img/hit.png',

    'Heart':'img/heart.png',
  
    'BG':'img/bg.png',
    
    'cachacacha':'img/logo.png',
    'Retry':'img/Retry.png',
    'Reload':'img/reload.png',
    'Tweet':'img/Tweet.png',
    'Back':'img/Back.png',
    'utyo':'img/utyo.png',

    'OK':'img/OKButton.png',
    'Ko':'img/Ko.png'

  },
  spritesheet: {
    'Player_SS': 'spriteSS/PlayerSS.ss',
    'Ota_SS': 'spriteSS/OtaSS.ss',
    'Crash_SS': 'spriteSS/CrashSS.ss',
    'Hit_SS': 'spriteSS/HitSS.ss',

    'Ko_SS': 'spriteSS/KoSS.ss',

  },
  sound: {
    'Bgm':'sound/Battle-YAMATO_loop.mp3',
    'HitL':'sound/kick-middle1.mp3',
    'HitR':'sound/punch-high1.mp3',
    'Damage':'sound/sword-slash3.mp3',
    'Crash':'sound/punch-high2.mp3',
    'Sway':'sound/highspeed-movement1.mp3',
    'Ko':'sound/ko1.mp3',
    'Guard':'sound/se_maoudamashii_battle15.wav',

    'Swing':'sound/swing2.mp3',
    'PunchStart':'sound/mens-ou1.mp3',
    'ok':'sound/ok.mp3',


  },
  font:{
    'def': './font/FAMania.woff',
  },

};

phina.main(function() {
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  app.replaceScene(SceneSequence());
  app.run();
});

// SceneSequenceクラス
phina.define("SceneSequence", {
  superClass: "phina.game.ManagerScene",

  // 初期化
  init: function() {
    this.superInit({
      scenes: [

        {
          label: "Loading", // ラベル。参照用
          className: "LoadingScene", // シーンAのクラス名
          nextLabel:"Title",
        },

        {
          label: "Title", // ラベル。参照用
          className: "TitleScene", // シーンAのクラス名
          nextLabel:"Tutorial",
        },

        {
          label: "Tutorial", // ラベル。参照用
          className: "TutorialScene", // シーンAのクラス名
          nextLabel:"Main",
        },

        {
          label: "CountDown", // ラベル。参照用
          className: "CountDownScene", // シーンAのクラス名
          nextLabel:"Main",
        },


        {
          label: "Main",
          className: "MainScene",
        },

        {
          label: "Result",
          className: "ResultScene",
        }

      ]
    });
  }
});

phina.define("LoadingScene", {
  superClass: "phina.game.LoadingScene",

  init: function(params) {
    this.superInit({
      assets: ASSETS,
      exitType: "auto",

    });

  }

});


phina.define('ResultScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit();
  },
});
