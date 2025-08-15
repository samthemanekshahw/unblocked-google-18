var SPEED;
var LIMIT = 40;

phina.define("MainScene", {
    superClass: "DisplayScene",
    init: function() {
        this.superInit({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,

        });

        SoundManager.playMusic("bgm");

        GAMEMAIN = this;

        SPEED = 20;
        LIMIT = 40;
        var back = Sprite('background').addChildTo(this);
        back.setPosition(this.gridX.center(),this.gridY.center());

        this.backGroup = DisplayElement().addChildTo(this);


        this.KatuoBushiGroup = DisplayElement().addChildTo(this);
        this.fukuroGroup = DisplayElement().addChildTo(this);

        this.effectGroup = DisplayElement().addChildTo(this);



        this.centerLine = CenterLine().addChildTo(this);
        this.centerLine.setPosition(this.gridX.center(),this.gridY.center());

        var label = Label('Start').addChildTo(this);
        label.setPosition(this.gridX.center(),this.gridY.center());
        label.fill = "hsla({0}, 80%, 45%, 0.75)".format(200); // 色を変更
        label.strokeWidth = 8;
        label.fontSize = 114; // フォントサイズを変更
        label.scaleY = 1; // フォントサイズを変更
        label.tweener
        .clear()
        //    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
        .to({scaleX:5,scaleY:5,alpha:0}, 500)    
        .call(function(){
            label.remove();
        })


        var random = Math.random();

        var protonLayer = ProtonLayer({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
          }).setPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT/2).addChildTo(this.KatuoBushiGroup);
      
          // FireworksEmitterをprotonLayerに追加する
          this.emitter = FireworksEmitter().addChildTo(protonLayer);


          this.next = 60;
          this.timer = 0;

          this.fx= 0;


        this.comboUI = ComboUI().addChildTo(this);

        this.comboUI.setPosition(this.gridX.center(),this.gridY.center(6));


        this.clearFukuroCount = 0;
        this.hassyaFukuroCount = 0;

        this.fukuroMax = 100;

        this.score = 0;




    },


    update: function(app) {
        this.timer++;


        if(this.fukuroMax > this.hassyaFukuroCount){
            

            if(this.next < this.timer){

                var r = Math.floor( Math.random() * 2);
    
                if(r == 1){
                    this.fx+=5;
                }else{
                    this.fx-=5;
                }
    
                if(this.fx > 5){
                    this.fx = -5;
                }
                if(this.fx < -5){
                    this.fx = 5;
                }
    
    
                var fukuro = Fukuro().addChildTo(this.fukuroGroup);
                fukuro.setPosition(this.gridX.center(this.fx),this.gridY.center(-11));
    
                this.timer = 0;
    
                this.next = Math.floor( Math.random() * LIMIT ) + 3;
                this.hassyaFukuroCount++;
    

    
            }
    


        }


    },

    reStart:function(){

        this.clearFukuroCount = 0;
        this.hassyaFukuroCount = 0;
        this.timer = 0;
        this.score = 0;
        
        this.comboUI.comboCount = 0;


    },

    addScore:function(point){
        this.score += point;

        this.clearFukuroCount++;

        if(this.clearFukuroCount >= this.fukuroMax){
            this.GameOver();
        }
    },



    nextTarget: function(){
      

    },

    GameOver:function(){


        var label = Label('そこまで').addChildTo(this);
        label.setPosition(this.gridX.center(),this.gridY.center(-4));
        label.fill = "black"; // 色を変更
        label.strokeWidth = 8;
        label.fontSize = 111; // フォントサイズを変更
        label.scaleX = 0;
        label.scaleY = 0;
    

        var self = this;

        label.tweener
        .clear()
        .by({scaleX:1,scaleY:1}, 1000,"easeOutBack")
        .wait(500)
        .to({alpha:0},300)
        .call(function(){
            self.comboUI.countLabel.text = "";
            self.comboUI.comboLabel.text = "";

          var result = Result().addChildTo(self);
        })

    },



});


phina.define('CenterLine', {
    superClass: 'DisplayElement',
    
    init: function() {
        this.superInit('');

        this.width = SCREEN_WIDTH;
        this.height = 10;


        this.vy = 13;


        this.Colision = RectangleShape().addChildTo(this);
        this.Colision.width = this.width;
        this.Colision.height = this.height;
        this.Colision.alpha = 0;

    },

    update: function(app) {


    },
    


});

phina.define('Fukuro', {
    superClass: 'DisplayElement',
    
    init: function() {
        this.superInit('');

        this.width = 320;
        this.height = 360;

        this.y = -this.height;

        var ikari = Sprite('fukuro').addChildTo(this);

        this.vy = SPEED;

        this.Colision = RectangleShape().addChildTo(this);
        this.Colision.width = this.width;
        this.Colision.height = this.height;
        this.Colision.alpha = 0;

        this.setInteractive(true);

    },

    update: function(app) {
        this.y += this.vy;
        if(this.y > SCREEN_HEIGHT + this.height){
            GAMEMAIN.comboUI.addCombo(100);
            this.remove();

        }


    },


    onpointstart:function() {

        if(this.hitTestElement(GAMEMAIN.centerLine)){
            this.hit();
        }

    },

    hit: function(){
        SoundManager.play("slash");

        var slash = EffectAnime('slash').addChildTo(GAMEMAIN);
        slash.setPosition(this.x,SCREEN_HEIGHT /2)

        var center_y = SCREEN_HEIGHT / 2 ;
        var sabun = center_y - this.y;
        var r = (this.height / 2 + sabun) / this.height;
        var kiri = Math.floor(r * 100) /100;

        var c = Crash(kiri).addChildTo(GAMEMAIN.backGroup);
        c.setPosition(this.x,this.y)


        GAMEMAIN.emitter._emit(this.x,this.y);

        var point = Math.floor((Math.abs(sabun) / 180) * 100 );

        GAMEMAIN.comboUI.addCombo(point);
        this.remove();

/*
        this.vy = 0;
        this.tweener
        .wait(300)
        .call(function() {
            var c = Crash().addChildTo(GAMEMAIN);
            c.setPosition(this.x,this.y)
    
            this.remove();
        }, this);
*/

    },


});


phina.define('Crash', {
    superClass: 'DisplayElement',
  
    init: function(center) {
      this.superInit();

  
      this.l = Sprite('fukuro').addChildTo(this);
      this.l.setFrameIndex(0, this.l.width, this.l.height * center);
      this.l.height *= center;
      this.l.originY = 1;
      this.l.tweener
        .by({
          x: -280,
          y: -100,
        }, 250, 'easeOutCubic')
        .by({
            alpha: -1,
          }, 250, 'easeOutCubic')
  

      var ccc = 1 - center;
      console.log('ccc ' + ccc);

      this.r = Sprite('fukuro').addChildTo(this);
      this.r.setFrameIndex(1, this.r.width, this.r.height * 0.5);
      this.r.height *= ccc;
      this.r.originY = 0;
      this.r.tweener
        .by({
          x: 280,
          y: 100,
        }, 250, 'easeOutCubic')
        .by({
            alpha: -1,
          }, 150, 'easeOutCubic')
  
      this.tweener
        .wait(500)
        .call(function() {
          this.remove();
        }, this);
    },
});
  


phina.define('EffectAnime', {
    superClass: 'Sprite',
    
        init: function(img) {
            this.superInit(img);


    
            this.anim = FrameAnimation(img + 'SS').attachTo(this);
            this.anim.gotoAndPlay('run');
            this.anim.fit = false;
    
            this.width = 800;
            this.height = 800;

            this.hitFLG = false;

            this.rotation = 45;
    
        },
    
        update: function(app) {
            if (this.anim.finished) { 
                this.remove();
            }
    
        },
  });




function rand(n){
  return Math.floor(Math.random() * (n + 1));
}
  

phina.define('ComboUI', {
    superClass: 'DisplayElement',
  
    init: function(combo) {
      this.superInit();


      this.comboCount = 0;
      this.comboMax = 0;
      
      this.comboTimer = 0;
      this.comboRemit = 80;
      
      this.comboLabel = Label('').addChildTo(this);
      this.comboLabel.fill = '#323424'; // 色を変更
      this.comboLabel.strokeWidth = 8;
      this.comboLabel.fontSize = 133; // フォントサイズを変更
      this.comboLabel.y =65;
      this.comboLabel.fontFamily = 'def';

      this.countLabel = Label('').addChildTo(this);
      this.countLabel.fill = '#FE7F66'; // 色を変更
      this.countLabel.strokeWidth = 8;
      this.countLabel.fontSize = 223; // フォントサイズを変更
      this.countLabel.fontFamily = 'e_bullet';
      this.countLabel.fontFamily = 'def';
      this.countLabel.y =-165;

      this.countLabel.scaleY = 0;



      this.timer = 0;

    },
  
    update: function() {

    },
    
    addCombo:function(hantei){



        console.log(hantei);

        var hyouka = '';
        var color = '#000000';

        var point = 0;

        //0に近いほど高得点　0 ～１００
        if(hantei <= 10){
            hyouka = 'PERFECT';
            color = '#FFBA59'
            SoundManager.play("perfect");

            point = 400;
            

        }
        else if(hantei <= 30){
            hyouka = 'GREAT';
            color = '#F26079'
            SoundManager.play("great");


            point = 300;


        }
        else if(hantei <= 70){
            hyouka = 'GOOD';
            color = '#097AB2'

            point = 200;


        }
        else if(hantei > 70){
            hyouka = 'BAD';
            color = '#6D1CD1'

            point = 0;

            this.comboCount = 0;
        }

        point += point *  (1 + (this.comboCount / 10));

        console.log(point);

        this.comboLabel.text=hyouka;
        this.comboLabel.fill=color;

        this.countLabel.fill=color;



        if(hyouka === 'BAD'){
            this.countLabel.text= "";
        }else{
            this.comboCount++;

            this.countLabel.text=this.comboCount;
            this.countLabel.scaleY = 0;  
            this.countLabel.tweener.clear()
            .to({scaleY:1},200,'easeOutBack');
        }




        GAMEMAIN.addScore(point);        


    },

    resetCombo:function(){

      if(this.comboMax < this.comboCount){
        this.comboMax = this.comboCount;
      }

      this.comboCount = 0;
      this.comboTimer = 0;    
      this.comboLabel.text = "";
      this.countLabel.text = "";
      this.expBonus.text= "";
      this.expBonus.value = 0;
      this.itemBonus.alpha= 0;
      this.itemBonus.value = 0;

    },


    
  });