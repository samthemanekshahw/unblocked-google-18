phina.define("OtaYellow", {
  superClass: "Enemy",
  init: function(status) {
    this.superInit();


      this.sprite = Sprite('otaYellow').addChildTo(this);
      this.spriteSS= FrameAnimation('Ota_SS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('Stand');
      this.spriteSS.fit = false;

      this.setStatus(status);

      this.GuardCrashTimeBonus = 40;
      this.GuardCrashCountBonus = 10;
      this.GuardPenaltyTime = 5;
      this.GuardCrashPenaltyTime = 20;
      
      this.setProperty();


  },

});

