phina.define("Heart", {
  superClass: "DisplayElement",
  init: function() {
    this.superInit();

      this.hearts = [];
      this.hearts[0] = Sprite('Heart').addChildTo(this);
      this.hearts[1] = Sprite('Heart').addChildTo(this);
      this.hearts[1].x = 100;
      this.hearts[2] = Sprite('Heart').addChildTo(this);
      this.hearts[2].x = 200;
      this.hearts[3] = Sprite('Heart').addChildTo(this);
      this.hearts[3].x = 300;
      this.heartCount = 3;
      

  },

  update: function(app) {

  },

  missHeart:function(){
    this.hearts[this.heartCount].tweener
      .clear()
      .by({y:-80,scaleX:-1,scaleY:-1,rotation:360}, 500)    

    this.heartCount--;

    if(this.heartCount < 0){
      return true;
    }else{
      return false;
    }
    

  }


});
