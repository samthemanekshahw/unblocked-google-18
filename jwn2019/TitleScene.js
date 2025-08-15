phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#FFFFFF';

    var back = Sprite('BG').addChildTo(this);
    back.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    back.setPosition(this.gridX.center(),this.gridY.center());

    this.wait =0;

    var startlabel;
    startlabel = Label('新入社員\n暴力くん').addChildTo(this);
    startlabel.setPosition(this.gridX.center(),this.gridY.center(-3));
    startlabel.stroke = "Black";
    startlabel.strokeWidth = 28;
    startlabel.fontSize = 168; // フォントサイズを変更
    startlabel.fill= "white"; // フォントサイズを変更

    var startlabel;
    startlabel = Label('スタート').addChildTo(this);
    startlabel.setPosition(this.gridX.center(),this.gridY.center(4));
    startlabel.strokeWidth = 8;
    startlabel.fontSize = 118; // フォントサイズを変更
    startlabel.fill= "black"; // フォントサイズを変更
    startlabel.fontFamily = "def"; // フォントサイズを変更    
    startlabel.tweener
    .clear()
    .to({alpha:1,scaleX:1,scaleY:1}, 700,"easeOutSine")
    .wait(400)
    .to({alpha:0,scaleX:0.8,scaleY:0.8}, 700,"easeInSine")
    .setLoop(true);


  },

  update: function(app){

  },

 
  onclick(){
    var context = phina.asset.Sound.getAudioContext();
    context.resume();
    
        if(!this.StartFLG){
          SoundManager.play("ok");
          this.exit();
    
          //Debug
          //this.exit();
          //
        }
  },

  Start: function(){
    this.exit();
  },

});
