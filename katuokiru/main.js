phina.globalize();


var SCREEN_WIDTH    = 900;
var SCREEN_HEIGHT   = 1400;

var BLOCK_SIZE = SCREEN_WIDTH / 5;
var Group;
var ObjectGroup;
var BlockGroup;
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
    

    'cachacacha':'img/logo.png',
    'Retry':'img/Retry.png',

    'ikari':'img/ikari.png',

    'Tweet':'img/Tweet.png',
    'Back':'img/Back.png',
    'utyo':'img/utyo.png',


    'fukuro':'img/katsuobushi.png',
    'slash':'img/pipo-btleffect001.png',


    'background':'img/background.png',
    

  },
  spritesheet: {
    'slashSS': './slash.ss',
  },
  sound: {
    'slash': './sound/se_maoudamashii_battle03.wav',

    'great': './sound/philly-horn-hit.wav',
    'perfect': './sound/orchhit6.wav',


    'bgm': './sound/130_straight-up-bright-house.wav',

  },


};

phina.main(function() {
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
    fps: 60

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
