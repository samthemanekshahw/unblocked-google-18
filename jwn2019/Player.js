phina.define("Player", {
  superClass: "DisplayElement",
  init: function() {
    this.superInit();


      this.DefaultX = SCREEN_WIDTH /2;
      this.DefaultY = 1000;
      
      this.x = this.DefaultX;
      this.y = this.DefaultY;

      this.vx = 0;
      this.vy = 0;
      this.vyMax = 8;

      this.dy = 0.5;

      this.rotationMAX = -30;
      this.rotationMIN = 10;

      this.g  = 0;

      this.width = 300;
      this.height = 300;

      this.MoveMode = "Normal"
      
      this.sprite = Sprite('idol').addChildTo(this);
      this.spriteSS= FrameAnimation('Player_SS')
      this.spriteSS.attachTo(this.sprite);
      this.spriteSS.gotoAndPlay('Normal');
      this.spriteSS.fit = false;
      this.sprite.setSize(1250,1250)

      this.scaleX = 1;
      this.scaleY = 1;

      this.setBoundingType("rect");
      this.color = "hsla(133, 100%, 50%, 1)";
      this.ColisionFLG = false;

      //コリジョン
      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      this.HitFLG = false;

      this.floor = SCREEN_HEIGHT - 40;


      this.movelock = false;


      this.MoveMode = "Start";
      this.Status = 'Stand';

      var self = this;





  },

  update: function(app) {

  },

  HitCheck: function(){
    //当たり判定
    var og = ObjectGroup.children;
    var self = this;
    og.each(function(Object) {
        if(self.hitTestElement(Object)){

          switch (Object.tag) {
            case "enemy":

              self.Hit();

              break;

          }

        }

    });

  },

  Hit: function(){
    switch (this.Status) {
      case "Stand":
        this.Damage();
        return true;

        break;

      case "Stand":
        return false;
        break;

      case "Stand":
        return false;
        break;

    }

  },

  Damage: function(){

    this.PositionReset();
    this.Status = 'Damage';
    SoundManager.play("Damage");

    this.spriteSS.gotoAndPlay('Damage');
    var self = this;

    if(GAMEMAIN.heart.missHeart()){

        //ゲームオーバー
        this.sprite.tweener
        .clear()
    //    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
        .by({y:620}, 350)    
        .call(function(){
          GAMEMAIN.gameOver();
          self.remove();
        })   

      }else{
        
        this.sprite.tweener
        .clear()
    //    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
        .by({y:220}, 50)    
        .wait(200)    
        .by({y:-10}, 30)   
        .by({y:-210}, 80)    
        .call(function(){
          self.spriteSS.gotoAndPlay('Normal');
          self.PositionReset();
        })


    }

  },


  SwayL: function(){
    this.PositionReset();
    SoundManager.play("Sway");

    this.Status = 'SwayL';

    this.spriteSS.gotoAndPlay('SwayL');     
    var self = this;
    
    this.sprite.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .by({x:-220}, 50)    
    .wait(250)    
    .by({x:10}, 30)   
    .by({x:210}, 80)    
    .wait(100)    
    .call(function(){
      self.spriteSS.gotoAndPlay('Normal');
      self.PositionReset();
      
    })

  },

  SwayR: function(){
    this.PositionReset();
    this.Status = 'SwayR';
    SoundManager.play("Sway");

    this.spriteSS.gotoAndPlay('SwayR');     
    
    var self = this;
    
    this.sprite.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .by({x:220}, 50)    
    .wait(250)    
    .by({x:-10}, 30)   
    .by({x:-210}, 80)    
    .wait(100)    
    .call(function(){
      self.spriteSS.gotoAndPlay('Normal');
      self.PositionReset();
      
    })
  },
    

  Punch: function(){
    this.PositionReset();
//    SoundManager.play("Swing");


    var rund = Math.floor( Math.random() * 2 ) ;

    if(rund == 0){
      this.spriteSS.gotoAndPlay('PunchStart');      
      this.sprite.scaleX = 1;   

    }else{
      this.spriteSS.gotoAndPlay('PunchStart');      
      this.sprite.scaleX = -1;   
    }
    
//    var punchcolision = PunchColision(rund).addChildTo(ColisionGroup);
    var punchcolision = PunchColision(rund,'Punch').addChildTo(ColisionGroup);
    
    var self = this;



    this.sprite.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")

    .by({y:-220}, 55)    
    .by({y:10}, 40)   
    .by({y:210}, 110)    
    .call(function(){
      self.spriteSS.gotoAndPlay('Normal');
      self.PositionReset();
      
    })


    
  },


  GuardCrash:function(){
    SoundManager.play("Swing");

    var self = this;

    var punchcolision = PunchColision(0,'GuardCrash').addChildTo(ColisionGroup);
    
    this.spriteSS.gotoAndPlay('CrashStart');
    this.PositionReset();
    this.sprite.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .by({y:-210}, 222,'easeInOutElastic')    
    .by({y:10}, 20)   
    .wait(10)        
    .by({y:200}, 50)    
    .call(function(){
      self.spriteSS.gotoAndPlay('Normal');
      self.PositionReset();
    })

  },


  PositionReset:function(){
    this.sprite.tweener.clear();
    this.sprite.x = 0;
    this.sprite.y = 0;    
    this.Status = 'Stand';

  },



  UP: function(){

  },



});
