phina.define("PunchColision", {
  superClass: "DisplayElement",
  init: function(rund,type) {
    this.superInit();

      this.rund = rund;
      this.type = type;

      this.DefaultX = SCREEN_WIDTH /2;
      this.DefaultY = 550;
      
      this.x = this.DefaultX;
      this.y = this.DefaultY;


      this.width = 50;
      this.height = 95;

      this.MoveMode = "Normal"



      this.setBoundingType("rect");
      this.color = "red";
      this.ColisionFLG = false;

      //コリジョン
      this.colision = RectangleShape().addChildTo(this);
      this.colision.fill = 'red';
      
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      this.HitFLG = false;

      this.floor = SCREEN_HEIGHT - 40;

      this.MoveMode = "Start";

      var self = this;


      this.timer = 10;


  },

  update: function(app) {
    this.HitCheck();

    if(this.timer <= 0){
      this.remove();
    }
    this.timer--;

  },

  HitCheck: function(){
    //当たり判定
    var og = EnemyGroup.children;
    var self = this;
    og.each(function(enemy) {
      if(enemy.Status != 'KnockOut'){
        if(self.hitTestElement(enemy)){
          
                    enemy.Hit(self.rund,self.type);
                    self.remove();
          
        }          
      }

    });

  },

  Hit: function(){
    switch (this.MoveMode) {
      case "Normal":
        this.vx = -10;
        this.vy = -15;
        this.g  = 1;
        this.MoveMode = "Hit";

        break;
      }

  },



});
