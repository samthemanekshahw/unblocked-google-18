phina.define('TutorialScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#FFFFFF';


    this.bggroup = DisplayElement().addChildTo(this);

    var self = this;


    

    
    this.x = this.DefaultX;
    this.y = -300;

    this.width = 200;
    this.height = 200;


    this.charaLayer = DisplayElement().addChildTo(this);


    this.ota = Sprite('ota').addChildTo(this.charaLayer);
    this.ota.x = SCREEN_WIDTH / 2;
    this.ota.y = 550;

    this.otaSS= FrameAnimation('Ota_SS')
    this.otaSS.attachTo(this.ota);
    this.otaSS.gotoAndPlay('Stand');
    this.otaSS.fit = false;


    this.player = Sprite('idol').addChildTo(this.charaLayer);
    this.player.x = SCREEN_WIDTH /2;
    this.player.y = 1000;

    this.playerSS= FrameAnimation('Player_SS')
    this.playerSS.attachTo(this.player);
    this.playerSS.gotoAndPlay('Normal');
    this.playerSS.fit = false;
    this.player.setSize(1250,1250);



    var setumeilabel;
    setumeilabel = Label('せつめい').addChildTo(this);
    setumeilabel.setPosition(this.gridX.center(),this.gridY.center(-7.5));
    setumeilabel.strokeWidth = 8;
    setumeilabel.fontSize = 58; // フォントサイズを変更
    setumeilabel.fill= "hsla({0}, 80%, 45%, 0.75)".format(200); // フォントサイズを変更
    setumeilabel.fill= "Black"; // フォントサイズを変更


    this.setumeilabel2;
    this.setumeilabel2 = Label('タップして殴る').addChildTo(this);
    this.setumeilabel2.setPosition(this.gridX.center(),this.gridY.center(-6));
    this.setumeilabel2.strokeWidth = 8;
    this.setumeilabel2.fontSize = 78; // フォントサイズを変更
    this.setumeilabel2.fill= "hsla({0}, 80%, 45%, 0.75)".format(200); // フォントサイズを変更
    this.setumeilabel2.fill= "Black"; // フォントサイズを変更
    this.setumeilabel2.tweener

    this.pagecnt = 0;
    
    var OK = Sprite('OK').addChildTo(this);
    OK.scaleX = 1.5;
    OK.scaleY = 1.5;

    OK.setPosition(this.gridX.center(5),this.gridY.center(6));
    OK.setInteractive(true);


    var self = this;

    OK.onpointend = function(e) {
      if(self.pagecnt == 0){
        self.resetPosition();
        self.Sway();
        self.pagecnt++;
        self.setumeilabel2.text = "左右フリックでスウェー";
      }
      else if(self.pagecnt == 1){
        self.resetPosition();
        self.Guard();
        self.pagecnt++;
        self.setumeilabel2.text = "下フリックでガード崩し";


      }
      else if(self.pagecnt == 2){

        self.exit();

      }

    };

    this.Punch();

  },

  update: function(app){

  },

  resetPosition(){
    this.ota.remove();
    this.ota = Sprite('ota').addChildTo(this.charaLayer);
    this.ota.x = SCREEN_WIDTH / 2;
    this.ota.y = 550;

    this.otaSS= FrameAnimation('Ota_SS')
    this.otaSS.attachTo(this.ota);
    this.otaSS.gotoAndPlay('Stand');
    this.otaSS.fit = false;

    this.player.remove();
    this.player = Sprite('idol').addChildTo(this.charaLayer);
    this.player.x = SCREEN_WIDTH /2;
    this.player.y = 1000;

    this.playerSS= FrameAnimation('Player_SS')
    this.playerSS.attachTo(this.player);
    this.playerSS.gotoAndPlay('Normal');
    this.playerSS.fit = false;
    this.player.setSize(1250,1250);

  },

  Punch:function(){
    var self = this;
    var rund = Math.floor( Math.random() * 2 ) ;
    this.playerSS.gotoAndPlay('PunchStart');      

    if(rund == 0){
      this.player.scaleX = 1;
    }else{
      this.player.scaleX = -1;
    }
    
    this.player.tweener
    .clear()
    .by({y:-220}, 55)    
    .by({y:10}, 40)   
    .by({y:210}, 110)    
    .call(function(){
      self.playerSS.gotoAndPlay('Normal');
      
    })



    if(rund == 0){
      this.otaSS.gotoAndPlay('HitR');
      SoundManager.play("HitR");

      vx = 100;
    }else{
      this.otaSS.gotoAndPlay('HitL');
      SoundManager.play("HitL");

      vx = -100;
    }
    this.ota.tweener
    .clear()
    .by({x:vx,y:-120}, 55)    
    .by({y:10}, 50)   
    .wait(30)       
    .by({x:-vx,y:110}, 50)    
    .call(function(){
      self.otaSS.gotoAndPlay('Stand');
    })
    .wait(1000)
    .call(function(){
      self.Punch();
    })
    

  },


  
  Sway:function(){

    var self = this;
    var rund = Math.floor( Math.random() * 2 ) ;
    if(rund == 0){

      this.player.tweener
      .clear()
      .wait(600)
      .call(function(){
        self.playerSS.gotoAndPlay('SwayL');
        SoundManager.play("Sway");

      })    
      .by({x:-220}, 50)    
      .wait(200)    
      .by({x:10}, 30)   
      .by({x:210}, 80)    
      .wait(100)    
      .call(function(){
        self.playerSS.gotoAndPlay('Normal');

      })
  
    }else{
      this.player.tweener
      .clear()
      .wait(600)
      .call(function(){
        self.playerSS.gotoAndPlay('SwayR');
        SoundManager.play("Sway");

      })    
      .by({x:220}, 50)    
      .wait(200)    
      .by({x:-10}, 30)   
      .by({x:-210}, 80)    
      .wait(100)    
      .call(function(){
        self.playerSS.gotoAndPlay('Normal');
      })

    }

    var Kamae = Sprite('Kamae').addChildTo(this.ota);
    Kamae.y = 50;
    Kamae.x = 10;
    var punch;
    SoundManager.play("PunchStart");

    this.otaSS.gotoAndPlay('PunchStart');

    this.ota.tweener
    .clear()
    .by({y:100}, 700,'easeInBack')
    .call(function(){
      Kamae.remove();
        
      punch = Sprite('LHand').addChildTo(self.ota);
      punch.x = -80;
      punch.y = 200;

      SoundManager.play("Swing");


    })
    .wait(150)
    .call(function(){
      punch.remove();  
      self.otaSS.gotoAndPlay('Stand');

    })
    .by({y:-100}, 100)
    .wait(1500)
    .call(function(){
      self.Sway();

    })


  },

  GuardCrash:function(){
    var self = this;
    this.playerSS.gotoAndPlay('CrashStart');
    SoundManager.play("Crash");

    this.player.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .by({y:-220}, 222,'easeInOutElastic')    
    .by({y:10}, 40)   
    .wait(100)        
    .by({y:210}, 110)    
    .call(function(){
      self.playerSS.gotoAndPlay('Normal');
    })
    .wait(1000)
    .call(function(){
      self.Guard();
    })
    var CrashSprite = Sprite('Crash').addChildTo(this.ota);
    CrashSprite.y = -50;
    CrashSprite.scaleX = 1.3;
    CrashSprite.scaleY = 1.3;
    
    
    var CrashSpriteSS= FrameAnimation('Crash_SS')
    CrashSpriteSS.attachTo(CrashSprite);
    CrashSpriteSS.gotoAndPlay('Crash');
    CrashSpriteSS.fit = false;

    this.otaSS.gotoAndPlay('HitR');

    this.ota.tweener
    .clear()
    .by({x:5}, 50)    
    .by({x:-5}, 50)
    .setLoop(true);   


  },

  Guard:function(){
    var GuardSprite = Sprite('Guard').addChildTo(this.ota);
    GuardSprite.y = -70;
    this.otaSS.gotoAndPlay('Stand');

    var self = this;

    this.ota.x = SCREEN_WIDTH /2;
    this.ota.tweener
      .clear()



    this.player.tweener
    .wait(800)
    .call(function(){
      GuardSprite.remove();
      self.GuardCrash();
    })


  },



  playerPositionReset:function(){
    this.player.tweener.clear();
    this.player.x = 0;
    this.player.y = 0;    
  },

  onpointend: function(){
    if(this.pagecnt == 0){

    }
    else if(this.pagecnt == 1){


    }
    else if(this.pagecnt == 2){

      

    }
    else if(this.pagecnt == 3){

      
    }
  },



});


phina.define("OKButton", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit();

        this.x = SCREEN_WIDTH /2 ;
        this.y = 1185;
        this.sprite = Sprite('OK').addChildTo(this);

    },

    update: function(app) {

    },


    onpointend: function(){

    },

});


    //	this.x = this.mx + GameMain.Player.x;
    //	this.y = this.my + GameMain.Player.y;
