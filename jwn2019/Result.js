phina.define("Result", {
  superClass: "DisplayElement",
  init: function() {
    this.superInit({
      width: 0,
      height: 0,
    });

    this.x = 0;
    this.y = 0;

/*
    GAMEMAIN.Score.tweener
    .clear()
    .to({x:GAMEMAIN.gridX.center(),y:300,scaleX:3,scaleY:3}, 1300,"easeOutQuart");
*/

    var tweet = Sprite('Tweet',200,70).addChildTo(this);

    var url = location.href;
    var score = 0;
    this.ResultTxt = GAMEMAIN.meishi.label1.text + " " + GAMEMAIN.meishi.label2.text + " " + GAMEMAIN.meishi.name.text + "に敗北!!";

    var Tweettxt = encodeURIComponent(GAMEMAIN.score  +  '人KO!! ' +  this.ResultTxt +  ' ' +  url + " #新入社員暴力くん #かちゃコム");

    tweet.x = GAMEMAIN.gridX.center(-3);
    tweet.y = GAMEMAIN.gridY.center();
    tweet.width = 300;
    tweet.height = 100;
    tweet.scaleX = 1;
    tweet.scaleY = 0;
    tweet.tweener
    .clear()
    .wait(500)
    .to({scaleY:1}, 500,"easeOutQuart");
    // タッチ判定を有効に
    tweet.setInteractive(true);
    // タッチ終了時に発火
    tweet.onclick = function() {
      // 自身を削除
      window.open("http://twitter.com/intent/tweet?text=" + Tweettxt);
    };

    var reload = Sprite('Retry').addChildTo(this);
    reload.x = GAMEMAIN.gridX.center(3);
    reload.y = GAMEMAIN.gridY.center();
    reload.width = 300;
    reload.height = 100;
    reload.scaleX = 0;
    reload.scaleY = 0;

    reload.tweener
    .clear()
    .to({scaleX:1,scaleY:1}, 800,"easeOutQuart");


    // タッチ判定を有効に
    reload.setInteractive(true);
    // タッチ終了時に発火
    reload.onclick = function() {

      EnemyGroup.children.clear();

      GAMEMAIN.exit("Main");
    };


    this.Scoretext = Label(GAMEMAIN.score + " KO").addChildTo(this);
    this.Scoretext.fill = "white"; // 色を変更
    this.Scoretext.stroke = "Black"; // 色を変更
    this.Scoretext.strokeWidth = 33; // 色を変更

    this.Scoretext.fontFamily = "def"; // 色を変更

    this.Scoretext.fontSize = 134; // フォントサイズを変更
    this.Scoretext.scaleY = 0;
    this.Scoretext.x = GAMEMAIN.gridX.center();
    this.Scoretext.y = GAMEMAIN.gridY.center(-4);
    this.Scoretext.tweener.clear()
    .wait(300)
    .to({scaleY:1}, 500,"easeOutQuart");
//    this.Scoretext.fontFamily = 'p_bullet';
    

  this.bgmlabel = Label("BGM:Wingless Seraph").addChildTo(this);
  this.bgmlabel.fill = "Black"; // 色を変更
  this.bgmlabel.fontSize = 39; // フォントサイズを変更
  this.bgmlabel.scaleY = 0;
  this.bgmlabel.x = GAMEMAIN.gridX.center(-4);
  this.bgmlabel.y = GAMEMAIN.gridY.center(7.3);

    // タッチ判定を有効に
    this.bgmlabel.setInteractive(true);
    // タッチ終了時に発火
    this.bgmlabel.onclick = function() {
        window.open("http://twitter.com/utyo");
    };


    this.bgmlabel.tweener.clear()
    .wait(300)
    .to({scaleY:1}, 500,"easeOutQuart");
    //    this.Scoretext.fontFamily = 'p_bullet';



    var back = Sprite('Back').addChildTo(this);
    back.setPosition(GAMEMAIN.gridX.center(),GAMEMAIN.gridY.center(4));
    back.scaleY = 0;

    back.tweener
    .clear()
    .wait(800)
    .to({scaleX:1,scaleY:1}, 1000,"easeOutQuart");


    var utyo_icon = DisplayElement().addChildTo(this);
    utyo_icon.width = 230;
    utyo_icon.height = 80;
    utyo_icon.setPosition(GAMEMAIN.gridX.center(5.8),GAMEMAIN.gridY.center(7));
    utyo_icon.sprite = Sprite('utyo').addChildTo(utyo_icon);
    utyo_icon.sprite.width = 70;
    utyo_icon.sprite.height = 70;
    utyo_icon.sprite.x = -65;
    utyo_icon.name = Label('@utyo').addChildTo(utyo_icon);
    utyo_icon.name.fill = '#888888'; // 色を変更
    utyo_icon.name.fontSize = 34; // フォントサイズを変更
    utyo_icon.name.x = 34; // フォントサイズを変更
    utyo_icon.name = Label('@utyo').addChildTo(utyo_icon);
    utyo_icon.name.fill = '#1e90ff'; // 色を変更
    utyo_icon.name.fontSize = 34; // フォントサイズを変更
    utyo_icon.name.x = 34; // フォントサイズを変更
    
    // タッチ判定を有効に
    utyo_icon.setInteractive(true);
    // タッチ終了時に発火
    utyo_icon.onclick = function() {
        window.open("http://twitter.com/utyo");
    };

    utyo_icon.scaleY = 0; // フォントサイズを変更

    utyo_icon.tweener.clear()
    .wait(1000)
    .to({scaleY:1}, 500,"easeOutQuart");


/*
    var cachacacha = Sprite('cachacacha').addChildTo(this);
    cachacacha.x = GAMEMAIN.gridX.center(15);
    cachacacha.y = GAMEMAIN.gridY.center(4);
    cachacacha.scaleX = 1.5;
    cachacacha.scaleY = 1.5;

    cachacacha.tweener
    .clear()
    .wait(1700)
    .to({x:GAMEMAIN.gridX.center()}, 1300,"easeOutQuart");
    // タッチ判定を有効に
    cachacacha.setInteractive(true);
    // タッチ終了時に発火
    cachacacha.onclick = function() {
      // 自身を削除
      window.open("http://www.cachacacha.com/");
    };

*/




  },

  update: function(app) {

  },



});
