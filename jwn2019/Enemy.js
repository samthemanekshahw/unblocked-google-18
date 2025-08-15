phina.define("Enemy", {
  superClass: "DisplayElement",
  init: function(status) {
    this.superInit();


      this.DefaultX = SCREEN_WIDTH /2;
      this.DefaultY = 450;
      
      this.x = this.DefaultX;
      this.y = -300;

      this.width = 200;
      this.height = 200;

      this.scaleX = 1;
      this.scaleY = 1;

      this.ColisionFLG = false;
      //コリジョン
      this.colision = RectangleShape().addChildTo(this);
      this.colision.width = this.width;
      this.colision.height = this.height;
      this.colision.alpha = 0; //コリジョン可視化 = 1

      this.HitFLG = false;

      var self = this;

      this.Status = 'Stand';
      this.Status = 'Entry';
    

      this.entry();


  },

  setStatus:function(status){

    this.HitPoint = status.HitPoint;
    this.TameTimer = status.TameTimer;
    this.GuardMax = status.GuardMax;
    this.GuardMin = status.GuardMin;
    this.PunchTimeMax = status.PunchTimeMax;
    this.PunchTimeMin = status.PunchTimeMin;



  },

  update: function(app) {
    switch (this.Status) {
      case 'Stand':
        this.NextPunchTimer--;
        if(this.NextPunchTimer <= 0){
          this.PunchStart();
        } 

      break;
    
      case 'PunchStart':


      break;
  
      case 'Punch':
      
      break;
      
      case 'Guard':
        this.NextPunchTimer--;
        if(this.NextPunchTimer <= 0){
          this.GuardSprite.remove();          
          this.PunchStart();
        } 

      break;
  

      default:
        break;
    }


  },

  setProperty: function(){
    this.NextPunchTimer = Math.floor( Math.random() * (this.PunchTimeMax + 1 - this.PunchTimeMin) ) + this.PunchTimeMin ;
    this.GuardCount = Math.floor( Math.random() * (this.GuardMax + 1 - this.GuardMin) ) + this.GuardMin ;
    
  },

  entry: function(){

    var self = this;
    this.tweener
    .clear()   
    .to({y:this.DefaultY},400,"easeOutBack")    
    .call(function(){
      self.PositionReset();
      self.Status = 'Stand';
      
    })

  },

  Hit: function(rund,type){
    switch (this.Status) {
      case 'Stand':


      if(type == 'Punch'){
        if(this.GuardCount > 0){

          if(this.HitPoint > 0){
            this.Damage(rund);
            this.GuardCount--;    
          }else{
            this.knockOut(rund);
          }
        }
        else{
          this.GuardStart();
        }  
      }
      if(type == 'GuardCrash'){
        this.NextPunchTimer -= this.GuardCrashPenaltyTime;
        
      }
      
      break;

      case 'Guard':
        if(type == 'GuardCrash'){
          this.GuardCrash();                          
        }
        if(type == 'Punch'){
          this.Guard();                
        }
          
      break;
        

      default:
        break;
    }

  },


  Damage: function(rund){
    this.PositionReset();
    this.HitPoint--;
    
    var vx = 0;
    var sX =1;
    if(rund == 0){
      this.spriteSS.gotoAndPlay('HitR');
      SoundManager.play("HitR");
      sX = -1;

      vx = 100;
    }else{
      this.spriteSS.gotoAndPlay('HitL');
      SoundManager.play("HitL");

      vx = -100;
    }
    

    var hit = Sprite('Hit').addChildTo(EffectGroup);
    var max = 200;
    hit.y = this.y - Math.floor(Math.random() * Math.floor(max));
    hit.x = this.x + Math.floor(Math.random() * Math.floor(max)) -100;
    hit.scaleX = sX;
    
    var hit_SS= FrameAnimation('Hit_SS')
    hit_SS.attachTo(hit);
    hit_SS.fit = false; // ←ここ
    hit_SS.gotoAndPlay('play');
    hit_SS.fit = false;

    hit.setSize(800,800); // ←サイズ変更



    hit.tweener
    .clear()
    .wait(300)
    .call(function(){
      hit.remove();
      hit_SS.remove();
    })




    var self = this;



    this.sprite.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")

    .by({x:vx,y:-120}, 55)    
    .by({y:10}, 50)   
    .wait(30)       
    .by({x:-vx,y:110}, 50)    
    .call(function(){
      self.spriteSS.gotoAndPlay('Stand');
      self.PositionReset();
      
    })


  },
  knockOut: function(rund){
    this.PositionReset();    

    GAMEMAIN.addScore();

    this.Status = 'KnockOut';
    var vx = 0;
    SoundManager.play("Ko");

    if(rund == 0){
      this.spriteSS.gotoAndPlay('HitR');
      vx = 400;


      var Ko = Sprite('Ko').addChildTo(EffectGroup);
      Ko.y = this.y - 100;
      Ko.x = this.x + 100;
      Ko.scaleX = -1;
      
      var Ko_SS= FrameAnimation('Ko_SS')
      Ko_SS.attachTo(Ko);
      Ko_SS.gotoAndPlay('Crash');
      Ko_SS.fit = false;
  
      Ko.setSize(1500,1500);

      Ko.tweener
      .clear()
      .wait(400)
      .call(function(){
        Ko.remove();
        Ko_SS.remove();
      })


    }else{
      this.spriteSS.gotoAndPlay('HitL');
      vx = -400;


      var Ko = Sprite('Ko').addChildTo(EffectGroup);
      Ko.y = this.y - 100;
      Ko.x = this.x - 100;
    
      var Ko_SS= FrameAnimation('Ko_SS')
      Ko_SS.attachTo(Ko);
      Ko_SS.gotoAndPlay('Crash');
      Ko_SS.fit = false;

      Ko.setSize(1500,1500);


      Ko.tweener
      .clear()
      .wait(400)
      .call(function(){
        Ko.remove();
        Ko_SS.remove();
      })

    }

    GAMEMAIN.meishi.exit();

    var self = this;
    this.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .by({x:vx,y:-800}, 325,"easeOutCubic")    
    .call(function(){
      self.remove();
      GAMEMAIN.nextOtaku();

    })
  },
    
  GuardStart: function(){
    this.spriteSS.gotoAndPlay('Stand');    
    this.Status = 'Guard';
    this.GuardSprite = Sprite('Guard').addChildTo(this);
    this.GuardSprite.y = -70;

    this.NextPunchTimer+= this.GuardPenaltyTime;    

    this.Guard();

  },

  Guard: function(){
    this.PositionReset();
    SoundManager.play("Guard");

    var self = this;
    
    this.NextPunchTimer-= this.GuardPenaltyTime;

    this.tweener
    .clear()
    .by({y:-30}, 55)    
    .by({y:30}, 50)   
    .call(function(){
      self.PositionReset();
      
    })

       
  },


  GuardCrash: function(){
    this.PositionReset();
    var self = this;
    this.GuardSprite.remove();
    SoundManager.play("Crash");


    this.sprite.tweener
    .clear()
    .by({y:-110,rotation:-20}, 500)
    .by({y:50,rotation:20}, 50,'easeInBack')


    var CrashSprite = Sprite('Crash').addChildTo(EffectGroup);
    CrashSprite.x = this.x;
    CrashSprite.y = this.y - 50;
    CrashSprite.scaleX = 2;
    CrashSprite.scaleY = 2;
    
    
    var CrashSpriteSS= FrameAnimation('Crash_SS')
    CrashSpriteSS.attachTo(CrashSprite);
    CrashSpriteSS.gotoAndPlay('Crash');
    CrashSpriteSS.fit = false;

    
    CrashSprite.tweener
    .clear()
    .wait(400)
    .call(function(){
      CrashSprite.remove();
      CrashSpriteSS.remove();

    })



    this.Status = 'Stand';


    this.NextPunchTimer = this.GuardCrashTimeBonus;
    this.GuardCount = this.GuardCrashCountBonus;

    this.spriteSS.gotoAndPlay('HitL');
    
    this.sprite.tweener
    .clear()
    .to({x:5}, 50)    
    .to({x:-5}, 50)
    .setLoop(true);   

       
  },

  PunchStart: function(){
    this.PositionReset();
    SoundManager.play("PunchStart");

    this.Status = 'PunchStart';
    this.spriteSS.gotoAndPlay('PunchStart');
    var Kamae = Sprite('Kamae').addChildTo(this);
    Kamae.y = 50;
    Kamae.x = 10;
    
    var self =this;

    this.tweener
    .clear()
    .by({y:300}, this.TameTimer,'easeInBack')
    .call(function(){
      Kamae.remove();
      self.Punch();      
    })

  },

  Punch: function(){
//    this.PositionReset();
    this.Status = 'Punch';
    SoundManager.play("Swing");

    var punch = Sprite('LHand').addChildTo(this);
    punch.x = -50;
    punch.y = 100;
    punch.rotation=-20;
    punch.setSize(600,600);


    var punchColision = EnemyPunchColision().addChildTo(ColisionGroup);

    var self = this;    
    this.tweener
    .wait(150)
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .call(function(){
      self.PunchEnd();
      punch.remove();  

      punchColision.remove();
      
    })
    .by({y:-300}, 100)





    
  },

  PunchEnd: function(){

    this.Status = 'Stand';
    this.spriteSS.gotoAndPlay('Stand');
    this.NextPunchTimer = Math.floor( Math.random() * (this.PunchTimeMax + 1 - this.PunchTimeMin) ) + this.PunchTimeMin;
    this.GuardCount = Math.floor( Math.random() * (this.GuardMax + 1 - this.GuardMin) ) + this.GuardMin;
  },


  PositionReset:function(){
    this.sprite.tweener.clear();
    this.sprite.x = 0;
    this.sprite.y = 0;    
    this.x = this.DefaultX;
    this.y = this.DefaultY;
    this.rotation = 0;
    this.sprite.rotation = 0;
    
  },



  UP: function(){

  },

  gameover: function(){
    var self = this;
    this.Status = "gameover";
    this.tweener
    .clear()
    .by({y:800}, 1000,'easeInBack')
    .call(function(){
      self.remove();
    })

  },

});
