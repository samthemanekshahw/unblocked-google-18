phina.define("MainScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,

    });
    GAMEMAIN = this;
    SoundManager.playMusic("Bgm");

    var back = Sprite('BG').addChildTo(this);
    back.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    back.setPosition(this.gridX.center(),this.gridY.center());

    this.meishi = Meishi().addChildTo(this);





    var label = Label('FIGHT').addChildTo(this);
    label.setPosition(this.gridX.center(),this.gridY.center());
    label.fill = "yellow"; // 色を変更
    label.stroke = "red"; // 色を変更
    label.fontFamily = "def"; // 色を変更
    label.strokeWidth = 18;
    label.fontSize = 54; // フォントサイズを変更
    label.scaleY = 1; // フォントサイズを変更
    label.tweener
    .clear()
//    .to({scaleX:20,scaleY:20}, 800,"easeOutCubic")
    .to({scaleX:11,scaleY:11,alpha:0}, 1000,"easeOutSine")    
    .call(function(){
        label.remove();
    })



    
    this.score = 0;



    EnemyGroup = DisplayElement().addChildTo(this);


    this.Player = Player().addChildTo(this);


    EffectGroup = DisplayElement().addChildTo(this); //ブロックグループ作成


    this.heart = Heart().addChildTo(this);
    this.heart.setPosition(this.gridX.center(-6.5),this.gridY.center(7));
    


    ColisionGroup = DisplayElement().addChildTo(this); //ブロックグループ作成
    
    var flickArea = RectangleShape().addChildTo(this);
    flickArea.width = SCREEN_WIDTH;
    flickArea.height = SCREEN_HEIGHT;
    flickArea.setPosition(this.gridX.center(),this.gridY.center());
    flickArea.alpha = 0; //コリジョン可視化 = 1
    flickArea.stroke = 'Black';  
    flickArea.fill = 'red';  
    flickArea.strokeWidth = 10;  
    flickArea.cornerRadius = 10;  

    this.Level = 0;
    this.initOta();
    this.nextOtaku();


    var flickable = Flickable().attachTo(flickArea);
    // 横のみ許可
    flickable.horizontal = false;
    flickable.vertical = false;

    this.TouchFLG = false;
    var self = this;
    
    flickable.onflickstart = function(e) {

        var angle = e.direction.toAngle().toDegree()|0;


        if(self.Player.Status != 'Damage'){
          //下
          if (50 < angle && angle < 130) {
            self.Player.GuardCrash();
          }
          //上
          if (215 < angle && angle < 325) {
            self.Player.Punch();
          }
          //左
          if (130 < angle && angle < 215) {
            self.Player.SwayL();
          }
          //右
          if (0 <= angle && angle < 50  || 325 < angle && angle <=360) {
            self.Player.SwayR();
            
          }

        }


    };

    flickable.onflickcancel = function(e) {
      this.cancel()
      if(self.Player.Status != 'Damage'){
        self.Player.Punch();
      }

    };

    this.timerlabel = Label('Time:').addChildTo(this);
    this.timerlabel.setPosition(this.gridX.center(6.2),this.gridY.center(-7.2));
    this.timerlabel.fill = BlockColor; // 色を変更
    this.timerlabel.strokeWidth = 8;
    this.timerlabel.fontSize = 64; // フォントサイズを変更

    this.timer = 90000;
  //  this.timer = 3000;
    

    this.Combo = 0;


    this.GameOverFLG = false;

    this.koCount =  KoCount().addChildTo(this);



  },

  onpointend(){

  },

  update: function(app) {
    if (this.Player.Status === 'SwayL') {
      var ai = Afterimage('SwayL').addChildTo(EffectGroup);
      ai.setPosition(this.Player.x + this.Player.sprite.x, this.Player.y,this.Player.sprite.y);
    }
    if (this.Player.Status === 'SwayR') {
      var ai = Afterimage('SwayR').addChildTo(EffectGroup);
      ai.setPosition(this.Player.x + this.Player.sprite.x, this.Player.y,this.Player.sprite.y);
    }

  },

  gameOver: function() {
    var result = Result().addChildTo(this);

    var og = EnemyGroup.children;
    var self = this;
    og.each(function(Object) {
      Object.gameover();
    });


  },

  addScore: function(){
    this.score++;
    this.koCount.updateScore(this.score);
  },

  initOta: function() {


    this.OTALEVEL = {
      "status":[
        {
          "Type":"Blue",
          "HitPoint":3,
          "TameTimer":800,
          "GuardMax":12,
          "GuardMin":3,
          "PunchTimeMax":110,
          "PunchTimeMin":80,
        },
        {
          "Type":"Red",
          "HitPoint":2,
          "TameTimer":800,
          "GuardMax":16,
          "GuardMin":6,
          "PunchTimeMax":90,
          "PunchTimeMin":60,
        },
    
        {
          "Type":"Yellow",
          "HitPoint":4,
          "TameTimer":800,
          "GuardMax":5,
          "GuardMin":1,
          "PunchTimeMax":120,
          "PunchTimeMin":100,
        },
    
      ]
    };

    
  },


  nextOtaku: function() {
    
    var status = this.OTALEVEL.status[this.Level];
    var ota;
    if(status.Type == "Red"){
      ota = OtaRed(status).addChildTo(EnemyGroup);
    }
    else if(status.Type == "Blue"){
      ota = Ota(status).addChildTo(EnemyGroup);
    }
    else if(status.Type == "Yellow"){
      ota = OtaYellow(status).addChildTo(EnemyGroup);
    }

    this.OTALEVEL.status[this.Level].HitPoint+=0.4;

    if(status.TameTimer > 200){
      this.OTALEVEL.status[this.Level].TameTimer -= 5;
    }
    if(status.PunchTimeMax > 30){
      this.OTALEVEL.status[this.Level].PunchTimeMax -= 2;
    }
    if(status.PunchTimeMin > 10){
      this.OTALEVEL.status[this.Level].PunchTimeMin -= 2;
    }

    this.Level++;
    if(this.Level > 2){
      this.Level = 0;
    }
    this.meishi.nextMeishi();


  },



});



phina.define('Afterimage', {
  superClass: 'Sprite',

  init: function(anim) {
    this.superInit('idol');


    this.spriteSS= FrameAnimation('Player_SS')
    this.spriteSS.attachTo(this);
    this.spriteSS.gotoAndPlay(anim);
    this.spriteSS.fit = false;
    this.setSize(1150,1150);

    this.tweener
      .fadeOut(256)
      .call(function() {
        this.remove();
      }, this);
  },
});



function rand(n){
  return Math.floor(Math.random() * (n + 1));
}
  

phina.define("KoCount", {
  superClass: "DisplayElement",
  init: function() {
    this.superInit();


    this.y = GAMEMAIN.gridY.center(-6.5);
    this.x = GAMEMAIN.gridX.center(7.2);


    var label = DisplayElement().addChildTo(this);
    label.x= -160;
    label.y= -70;

    this.label1 = Label('0').addChildTo(label);
    this.label1.fill = "yellow"; // 色を変更
    this.label1.stroke = "red"; 
    this.label1.strokeWidth = 22;
    this.label1.fontSize = 85; // フォントサイズを変更
    this.label1.scaleY = 1; // フォントサイズを変更
    this.label1.align = "right";
    this.label1.fontFamily = "def";
    this.label1.y = 105;
    this.label1.x = 175;



    
    this.label2 = Label('K.O').addChildTo(label);
    this.label2.fill = "yellow"; // 色を変更
    this.label2.stroke = "red"; 
    this.label2.strokeWidth = 22;
    this.label2.fontSize = 60; // フォントサイズを変更
    this.label2.scaleY = 1; // フォントサイズを変更
    this.label2.align = "left";
    this.label2.fontFamily = "def";
    this.label2.x = 20;

  },

  update: function(app) {

  },

  updateScore :function(score){
    this.label1.text = score;
  },






});



phina.define("Meishi", {
  superClass: "DisplayElement",
  init: function() {
    this.superInit();


    this.y = GAMEMAIN.gridY.center(-16.5);
    this.x = GAMEMAIN.gridX.center(-4.7);

    this.defalut_y = GAMEMAIN.gridY.center(-6.5);

    //コリジョン
    meishi = RectangleShape().addChildTo(this);
    meishi.width = 350;
    meishi.height = 210;
    meishi.stroke = 'black';  
    meishi.strokeWidth = 11;
    meishi.fill = "white";





    var label = DisplayElement().addChildTo(this);
    label.x= -160;
    label.y= -70;

    this.label1 = Label('総務部').addChildTo(label);
    this.label1.fill = "black"; // 色を変更
    this.label1.strokeWidth = 8;
    this.label1.fontSize = 34; // フォントサイズを変更
    this.label1.scaleY = 1; // フォントサイズを変更
    this.label1.align = "left";
    
    this.label2 = Label('主任').addChildTo(label);
    this.label2.fill = "black"; // 色を変更
    this.label2.strokeWidth = 8;
    this.label2.fontSize = 40; // フォントサイズを変更
    this.label2.scaleY = 1; // フォントサイズを変更
    this.label2.align = "left";
    this.label2.y = 55;






    this.name = Label('太田').addChildTo(label);
    this.name.fill = "black"; // 色を変更
    this.name.strokeWidth = 8;
    this.name.fontSize = 94; // フォントサイズを変更
    this.name.scaleY = 1; // フォントサイズを変更
    this.name.align = "left";
    this.name.x = 110;
    this.name.y = 120



  },

  update: function(app) {

  },

  exit:function(){
    this.tweener
    .clear()
    .to({y:-300,scaleX:0,scaleY:0,rotation:360}, 300)    
    ;

    ;
  },

  nextMeishi:function(){
    this.changeName();

    this.rotation = 0;
    this.scaleY = 1;
    this.scaleX = 0;

    this.y = GAMEMAIN.gridY.center(-11.5);
    this.x = GAMEMAIN.gridX.center(-4.7);
    this.tweener
    .clear()
    .to({y:this.defalut_y,scaleX:1}, 500,"easeOutSine")    
    ;

  },

  changeName:function(){

    var names = [
      '佐藤',
      '木村',
      '鈴木',
      '高橋',
      '田中',
      '伊藤',
      '渡辺',
      '山本',
      '中村',
      '小林',
      '吉田',
      '山田',
      '山口',
      '松本',
      '井上',
      '木村',
      '斎藤',
      '林',
      '清水',
      '山崎',
      '森',
      '池田',
      '橋本',
      '阿部',
      '石川',
      '山下',
      '小川',
      '遠藤',
      '中野',
      '酒井',
      '宮崎',
      '横山',
      '安藤',
      '高木',
      '平田',
      '浜田',
      '石原',
      '馬場',
    ];

    var positions = [
      '班長',
      '室長',
      '主任',
      '係長',
      '課長代理',
      '次長',
      '課長',
      '部長代理',
      '部長',
      '最高経営責任者',
      '代表取締役社長',
      '取締役会長',
    ];

    var busyos = [
      '総務部',
      '人事部',
      '法務部',
      '経理部',
      '購買部',
      '財務経理部',
      '製造技術部',
      '規格管理部',
      '営業企画部',
      '営業開発部',
      '第二営業部',
      '商品開発部',
      '業務部',
      '経営企画部',
      '知的財産権部',
      '業務企画部',
      '情報システム部',
      '債権管理部',
      '経営戦略部',
      '開発部',
      '技術部',
      '技術管理部',
      '技術研究部',
      '技術推進部',
      '研究企画部',
      '総合企画部',
      '事務管理部',
      '海外事業部',
      '開発三部',
      '企画部',
      '生産技術部',
      '財務経理部',
      '製造２部',

    ];


    var name_id = Math.floor( Math.random() * 38 );
    var position_id = Math.floor( Math.random() * 8 );
    var busyo_id = Math.floor( Math.random() * 33 );
    this.name.text = names[name_id];

    this.label1.text = "";
    this.label2.text = "";

    if(position_id > 9){
      this.label1.text = busyos[position_id];

    }else{

      this.label1.text = busyos[busyo_id];
      this.label2.text = positions[position_id];

    }





  },





});
