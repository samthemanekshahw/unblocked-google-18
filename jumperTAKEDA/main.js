/*
 * constant
 */
var SCREEN_WIDTH   = 490;
var SCREEN_HEIGHT   = 800;
var SCREEN_CENTER_X = SCREEN_WIDTH/2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;

var blockGroup;

var ASSETS = {
    "title":  "./image/title.png",
    "back":  "./image/back.png",
    "player":  "./image/player.png",
    "playerSS":  "./playerSS.tmss",
    "block": "./image/block.png",
    "gugu": "./image/gugu.png",
    "Gameover": "./image/Gameover.png",
    "setumei": "./image/setumei.png",
};

var KYORI;

//リザルト画面
var RESULT_PARAM = {
        score: 0,
        msg:      "",
        url:      "http://cachacacha.com/jumperTAKEDA/",
        backgroundImage:  "Gameover",
        hashtags: "ジャンプ武田",
        width:    SCREEN_WIDTH,
        height:   SCREEN_HEIGHT,
        related:  "tmlib.js Tutorial testcording",
};
//ゲーム画面のラベル
var UI_DATA = {
    main: { // MainScene用ラベル
        children: [{
            //スコア
                type: "Label",
                name: "kyori",
                fontSize: 32,
                fillStyle: "White",
                shadowColor: "blue",
                shadowBlur: 4,
                x: 20,
                y: 40,
            },
            {
                type: "Label",
                name: "Timelabel",
                x: 320,
                y: 40,
                shadowColor: "blue",
                shadowBlur: 4,
                fillStyle: "white",
                text: " ",
                fontSize: 40,
             }],

    }
};

//
tm.main(function() {
    var app = tm.app.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();

    var loading = tm.app.LoadingScene({
        assets: ASSETS,
        nextScene: TitleScene,
    });
    
    app.replaceScene(loading);

    //app.replaceScene(TitleScene());
    //app.replaceScene(MainScene());

    app.run();
});


//タイトル画面
tm.define("TitleScene", {
    superClass : "tm.app.TitleScene",
 
    init : function() {
        this.superInit({
            title :  "",
            width :  SCREEN_WIDTH,
            height : SCREEN_HEIGHT
        });


        this.title = tm.app.Sprite("title", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this);
        this.title.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);


        // 画面(シーンの描画箇所)をタッチした時の動作
        this.addEventListener("pointingend", function(e) {
            // シーンの遷移
            //e.app.replaceScene(MainScene());
            e.app.replaceScene(setumeScene());
        });


    },
});


tm.define("setumeScene", {
    superClass : "tm.app.TitleScene",
 
    init : function() {
        this.superInit({
            width :  SCREEN_WIDTH,
            height : SCREEN_HEIGHT
        });


        this.title = tm.app.Sprite("setumei", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this);
        this.title.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);


        // 画面(シーンの描画箇所)をタッチした時の動作
        this.addEventListener("pointingend", function(e) {
            // シーンの遷移
            e.app.replaceScene(MainScene());
        });


    },
});


//リザルト画面
tm.define("EndScene", {
    superClass : "tm.app.ResultScene",
 
    init : function(point) {
        RESULT_PARAM.score = point + " M";
        RESULT_PARAM.msg = GameoverMSG();
        this.superInit(RESULT_PARAM);

        //this.Gameover = tm.app.Sprite("Gameover", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this);
        //this.Gameover.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);


        this.Name = tm.app.Label("サイト:").addChildTo(this);
        this.Name
            .setPosition(310, 740)
            .setFillStyle("#000001")
            .setFontSize(25);
            var tweetButton = this.tweetButton = tm.ui.GlossyButton(180, 40, "#32cd32", "かちゃコム").addChildTo(this);
            tweetButton.setPosition(350, 770);
            tweetButton.onclick = function() {
                window.open("http://cachacacha.com");
            };

			var tweetButton = this.tweetButton = tm.ui.GlossyButton(120, 50, "blue", "Tweet").addChildTo(this);
            tweetButton.setPosition(SCREEN_WIDTH/2 - 65, SCREEN_HEIGHT/2 + 50);
            tweetButton.onclick = function() {
                window.open(tweetButton);
            };


    },

    onnextscene: function (e) {
        e.target.app.replaceScene(MainScene());
    },

});

//ゲーム画面0-----------------------------------------------------------------
tm.define("MainScene", {
    superClass: "tm.app.Scene",

    init: function() {
        // 親の初期化
        this.superInit();
        this.map = tm.app.Sprite("back", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this);
        this.map.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);

        // Player
        this.player = Player().addChildTo(this);

        //ビル生成
        blockGroup = tm.app.CanvasElement().addChildTo(this); //ブロックグループ作成
        var block = blocks(100,700,200).addChildTo(blockGroup);



        //ラベル生成
        this.fromJSON(UI_DATA.main);
        KYORI = 0;
        this.kyori.text = KYORI + " M";

        //タイム
        this.timer = 0;

        //ビルのでかさ
        this.BWD = 0;   //ビルの幅　だんだん小さくなる
        this.BHG = 200; //ビルの長さ、だんだん大きくなる
        this.MAXBWD = 350; //ビルの最大の大きさ

        this.GOBLOCK = 60; //ブロックの間隔




 
    },

    update: function(app) {
        this.timer++;

        //スコア加算
        if(this.timer % 2 == 0){
            KYORI += 1;
        }
        this.kyori.text = KYORI + " M";

        //ブロックの生成
        if(this.timer % this.GOBLOCK == 0){
        var block = blocks(SCREEN_WIDTH,this.MAXBWD - rand(this.BWD),rand(this.BHG) + 100).addChildTo(blockGroup);

        }

        if(KYORI > 300){
            this.BWD = 50;
            this.BHG = 400;
            this.MAXBWD = 300;

        }


        if(KYORI > 600){
            this.BWD = 100;
            this.BHG = 500
            this.MAXBWD = 250

        }

        if(KYORI > 1000){
            this.BWD = 100;
            this.BHG = 600;
            this.MAXBWD = 230
            this.GOBLOCK = 50;


        }

        if(KYORI > 1500){
            this.BWD = 130;
            this.BHG = 650;
            this.MAXBWD = 200;
            this.GOBLOCK = 50;
        }

        if(KYORI > 2000){
            this.BWD = 150;
            this.BHG = 680;
            this.MAXBWD = 190;
            this.GOBLOCK = 50;


        }


        if(KYORI > 2500){
            this.BWD = 150;
            this.BHG = 680;
            this.MAXBWD = 180;
            this.GOBLOCK = 50;


        }

        if(KYORI > 3000){
            this.BWD = 100;
            this.BHG = 680;
            this.MAXBWD = 130;
            this.GOBLOCK = 50;


        }

        if(KYORI > 4000){
            this.BWD = 80;
            this.BHG = 680;
            this.MAXBWD = 100;
            this.GOBLOCK = 40;


        }

        if(KYORI > 5000){
            this.BWD = 40;
            this.BHG = 680;
            this.MAXBWD = 50;
            this.GOBLOCK = 40;


        }







    },

});



tm.define("Player", {
    superClass: "tm.app.AnimationSprite",

    init: function () {
        this.superInit("playerSS");
        this.gotoAndPlay("run");

        this.width = 50;
        this.height = 50;


        this.x = 50;
        this.y = 400;
        this.origin.x = 0;
        this.origin.y = 0;

        this.v = tm.geom.Vector2(0, 0);
        this.vy = 1;

        this.Pflg = 2;  //プレイヤーの状態フラグ　0:走ってる 1:地上　2:空中

        this.power = 10;
    },

    update: function(app) {

        this.L = this.x + 20;
        this.R = this.x + 40;
        this.T = this.y;
        this.B = this.y + this.height + this.vy; //足の当たり判定に加速度を足す。めり込み防止

        this.y += this.vy;
        this.vy+=1;

        var bc = blockGroup.children;
        var self = this;
        bc.each(function(block) {
            //地面にいるとき
            if(clash(self,block)){
                self.vy = 0;
                self.y = block.y - self.height + 3; //めりこみ防止
                //着地時
                if(self.Pflg == 2){
                    self.gotoAndPlay("tyakuti")
                }
                self.Pflg = 1;
               }
           });


        //タッチされたら
        if (app.pointing.getPointing() == true) {
            //力をためる
            if(this.power < 37){
            this.power += 1;

            if(this.power == 11){
                    this.gugu = tm.app.Sprite("gugu", 40,40).addChildTo(this);
            }

            //this.gotoAndPlay("tame");
            //this.Pflg = 2;
            }


               
                        
        }
       if (app.pointing.getPointingEnd() == true) {
            //ジャンプする
            if(this.Pflg == 1){
            this.vy = 0;
            this.vy -= this.power;
            

            this.gotoAndPlay("tame");
            this.Pflg = 2
            }
            this.power = 10;

            this.gugu.remove();
                        
        }


        //おちたとき
        if(this.y > SCREEN_HEIGHT + this.vy + 300){
                //リザルト画面へ
                app.replaceScene(EndScene(KYORI));
                
                //デバッグ用
                //this.y = 0;
        }


    },

});

//ブロッククラス
tm.define("blocks", {
    superClass: "tm.app.Sprite",
    
    init: function(x,WD,HG) {
        this.superInit("block");
        
        this.width = WD;
        this.height = HG;

        this.vx = -7;
        this.vy = 0;

        this.x = x;
        this.y = SCREEN_HEIGHT - this.height;
        this.origin.x = 0;
        this.origin.y = 0;




        //this.v = tm.geom.Vector2(0, 0);
    },
    
    update: function(app) {

        this.L = this.x;
        this.R = this.x + this.width;
        this.T = this.y;
        this.B = this.y + this.height + 3;

        this.x += this.vx;
        this.y += this.vy;


        if(this.x < -1000){
            this.remove();

        }

    },
    
});

function GameoverMSG(){

    var msg = "ただの武田";

    if(KYORI > 300){
            var msg = "はなたれジャンパー武田";
    }

    if(KYORI > 600){
            var msg = "かけだしジャンパー武田";
    }

    if(KYORI > 1000){
            var msg = "はんにんまえジャンパー武田";
    }


    if(KYORI > 1500){
            var msg = "いっちょまえジャンパー武田";
    }

    if(KYORI > 2000){
            var msg = "プロジャンパー武田";
    }

    if(KYORI > 2500){
            var msg = "大ベテランジャンパー武田";
    }

    if(KYORI > 3000){
            var msg = "伝説のジャンパー武田";
    }

    if(KYORI > 4000){
            var msg = "ゴッドジャンパー武田";
    }

    if(KYORI > 5000){
            var msg = "天空の覇者武田";
    }

    return msg;

}

function clash(a,b){
    if((a.L <= b.R) && (a.R >= b.L) 
    && (a.T + 20  <= b.T) && (a.B >= b.T))
    {
            return true
    }

    return false;
    
}

function rand(n){
    return Math.floor(Math.random() * (n));
}


