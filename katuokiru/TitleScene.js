phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#FFFFFF';



    var startlabel;
    startlabel = Label('カツオブシキル').addChildTo(this);
    startlabel.setPosition(this.gridX.center(),this.gridY.center(-6));
    startlabel.strokeWidth = 8;
    startlabel.fontSize = 128; // フォントサイズを変更
    startlabel.fill= "hsla({0}, 80%, 45%, 0.95)".format(10);; // フォントサイズを変更
    startlabel.fontFamily = "def"; // フォントサイズを変更    


    var ikari = Sprite('fukuro').addChildTo(this);
    ikari.setPosition(this.gridX.center(),this.gridY.center(-2));


    var startlabel;
    startlabel = Label('start').addChildTo(this);
    startlabel.setPosition(this.gridX.center(),this.gridY.center(4));
    startlabel.strokeWidth = 8;
    startlabel.fontSize = 88; // フォントサイズを変更
    startlabel.fill= "hsla({0}, 80%, 45%, 0.95)".format(210);; // フォントサイズを変更
    startlabel.fontFamily = "def"; // フォントサイズを変更    
    startlabel.tweener
    .clear()
    .to({alpha:1,scaleX:1,scaleY:1}, 700,"easeOutSine")
    .wait(400)
    .to({alpha:0,scaleX:0.8,scaleY:0.8}, 700,"easeInSine")
    .setLoop(true);


    this.onclick = function() {
      if (!this.isStart) {
        var context = phina.asset.Sound.getAudioContext();
        context.resume();
        SoundManager.play("slash");

        this.exit();

      }

    };




  },





});
