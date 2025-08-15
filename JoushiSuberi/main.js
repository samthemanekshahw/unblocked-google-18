/*
 * runstant
 */

phina.globalize();

/*
var WORKER_URL = (function() {
  var script = "(function(b){function a(b,d){if({}.hasOwnProperty.call(a.cache,b))return a.cache[b];var e=a.resolve(b);if(!e)throw new Error('Failed to resolve module '+b);var c={id:b,require:a,filename:b,exports:{},loaded:!1,parent:d,children:[]};d&&d.children.push(c);var f=b.slice(0,b.lastIndexOf('/')+1);return a.cache[b]=c.exports,e.call(c.exports,c,c.exports,f,b),c.loaded=!0,a.cache[b]=c.exports}a.modules={},a.cache={},a.resolve=function(b){return{}.hasOwnProperty.call(a.modules,b)?a.modules[b]:void 0},a.define=function(b,c){a.modules[b]=c},a.define('/gif.worker.coffee',function(d,e,f,g){var b,c;b=a('/GIFEncoder.js',d),c=function(a){var c,e,d,f;return c=new b(a.width,a.height),a.index===0?c.writeHeader():c.firstFrame=!1,c.setTransparent(a.transparent),c.setRepeat(a.repeat),c.setDelay(a.delay),c.setQuality(a.quality),c.addFrame(a.data),a.last&&c.finish(),d=c.stream(),a.data=d.pages,a.cursor=d.cursor,a.pageSize=d.constructor.pageSize,a.canTransfer?(f=function(c){for(var b=0,d=a.data.length;b<d;++b)e=a.data[b],c.push(e.buffer);return c}.call(this,[]),self.postMessage(a,f)):self.postMessage(a)},self.onmessage=function(a){return c(a.data)}}),a.define('/GIFEncoder.js',function(e,h,i,j){function c(){this.page=-1,this.pages=[],this.newPage()}function b(a,b){this.width=~~a,this.height=~~b,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.out=new c}var f=a('/TypedNeuQuant.js',e),g=a('/LZWEncoder.js',e);c.pageSize=4096,c.charMap={};for(var d=0;d<256;d++)c.charMap[d]=String.fromCharCode(d);c.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(c.pageSize),this.cursor=0},c.prototype.getData=function(){var d='';for(var a=0;a<this.pages.length;a++)for(var b=0;b<c.pageSize;b++)d+=c.charMap[this.pages[a][b]];return d},c.prototype.writeByte=function(a){this.cursor>=c.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=a},c.prototype.writeUTFBytes=function(b){for(var c=b.length,a=0;a<c;a++)this.writeByte(b.charCodeAt(a))},c.prototype.writeBytes=function(b,d,e){for(var c=e||b.length,a=d||0;a<c;a++)this.writeByte(b[a])},b.prototype.setDelay=function(a){this.delay=Math.round(a/10)},b.prototype.setFrameRate=function(a){this.delay=Math.round(100/a)},b.prototype.setDispose=function(a){a>=0&&(this.dispose=a)},b.prototype.setRepeat=function(a){this.repeat=a},b.prototype.setTransparent=function(a){this.transparent=a},b.prototype.addFrame=function(a){this.image=a,this.getImagePixels(),this.analyzePixels(),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.writePalette(),this.writePixels(),this.firstFrame=!1},b.prototype.finish=function(){this.out.writeByte(59)},b.prototype.setQuality=function(a){a<1&&(a=1),this.sample=a},b.prototype.writeHeader=function(){this.out.writeUTFBytes('GIF89a')},b.prototype.analyzePixels=function(){var g=this.pixels.length,d=g/3;this.indexedPixels=new Uint8Array(d);var a=new f(this.pixels,this.sample);a.buildColormap(),this.colorTab=a.getColormap();var b=0;for(var c=0;c<d;c++){var e=a.lookupRGB(this.pixels[b++]&255,this.pixels[b++]&255,this.pixels[b++]&255);this.usedEntry[e]=!0,this.indexedPixels[c]=e}this.pixels=null,this.colorDepth=8,this.palSize=7,this.transparent!==null&&(this.transIndex=this.findClosest(this.transparent))},b.prototype.findClosest=function(e){if(this.colorTab===null)return-1;var k=(e&16711680)>>16,l=(e&65280)>>8,m=e&255,c=0,d=16777216,j=this.colorTab.length;for(var a=0;a<j;){var f=k-(this.colorTab[a++]&255),g=l-(this.colorTab[a++]&255),h=m-(this.colorTab[a]&255),i=f*f+g*g+h*h,b=parseInt(a/3);this.usedEntry[b]&&i<d&&(d=i,c=b),a++}return c},b.prototype.getImagePixels=function(){var a=this.width,g=this.height;this.pixels=new Uint8Array(a*g*3);var b=this.image,c=0;for(var d=0;d<g;d++)for(var e=0;e<a;e++){var f=d*a*4+e*4;this.pixels[c++]=b[f],this.pixels[c++]=b[f+1],this.pixels[c++]=b[f+2]}},b.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4);var b,a;this.transparent===null?(b=0,a=0):(b=1,a=2),this.dispose>=0&&(a=dispose&7),a<<=2,this.out.writeByte(0|a|0|b),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},b.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.firstFrame?this.out.writeByte(0):this.out.writeByte(128|this.palSize)},b.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},b.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes('NETSCAPE2.0'),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},b.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var b=768-this.colorTab.length;for(var a=0;a<b;a++)this.out.writeByte(0)},b.prototype.writeShort=function(a){this.out.writeByte(a&255),this.out.writeByte(a>>8&255)},b.prototype.writePixels=function(){var a=new g(this.width,this.height,this.indexedPixels,this.colorDepth);a.encode(this.out)},b.prototype.stream=function(){return this.out},e.exports=b}),a.define('/LZWEncoder.js',function(e,g,h,i){function f(y,D,C,B){function w(a,b){r[f++]=a,f>=254&&t(b)}function x(b){u(a),k=i+2,j=!0,l(i,b)}function u(b){for(var a=0;a<b;++a)h[a]=-1}function A(z,r){var g,t,d,e,y,w,s;for(q=z,j=!1,n_bits=q,m=p(n_bits),i=1<<z-1,o=i+1,k=i+2,f=0,e=v(),s=0,g=a;g<65536;g*=2)++s;s=8-s,w=a,u(w),l(i,r);a:while((t=v())!=c){if(g=(t<<b)+e,d=t<<s^e,h[d]===g){e=n[d];continue}if(h[d]>=0){y=w-d,d===0&&(y=1);do if((d-=y)<0&&(d+=w),h[d]===g){e=n[d];continue a}while(h[d]>=0)}l(e,r),e=t,k<1<<b?(n[d]=k++,h[d]=g):x(r)}l(e,r),l(o,r)}function z(a){a.writeByte(s),remaining=y*D,curPixel=0,A(s+1,a),a.writeByte(0)}function t(a){f>0&&(a.writeByte(f),a.writeBytes(r,0,f),f=0)}function p(a){return(1<<a)-1}function v(){if(remaining===0)return c;--remaining;var a=C[curPixel++];return a&255}function l(a,c){g&=d[e],e>0?g|=a<<e:g=a,e+=n_bits;while(e>=8)w(g&255,c),g>>=8,e-=8;if((k>m||j)&&(j?(m=p(n_bits=q),j=!1):(++n_bits,n_bits==b?m=1<<b:m=p(n_bits))),a==o){while(e>0)w(g&255,c),g>>=8,e-=8;t(c)}}var s=Math.max(2,B),r=new Uint8Array(256),h=new Int32Array(a),n=new Int32Array(a),g,e=0,f,k=0,m,j=!1,q,i,o;this.encode=z}var c=-1,b=12,a=5003,d=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];e.exports=f}),a.define('/TypedNeuQuant.js',function(A,F,E,D){function C(A,B){function I(){o=[],q=new Int32Array(256),t=new Int32Array(a),y=new Int32Array(a),z=new Int32Array(a>>3);var c,d;for(c=0;c<a;c++)d=(c<<b+8)/a,o[c]=new Float64Array([d,d,d,0]),y[c]=e/a,t[c]=0}function J(){for(var c=0;c<a;c++)o[c][0]>>=b,o[c][1]>>=b,o[c][2]>>=b,o[c][3]=c}function K(b,a,c,e,f){o[a][0]-=b*(o[a][0]-c)/d,o[a][1]-=b*(o[a][1]-e)/d,o[a][2]-=b*(o[a][2]-f)/d}function L(j,e,n,l,k){var h=Math.abs(e-j),i=Math.min(e+j,a),g=e+1,f=e-1,m=1,b,d;while(g<i||f>h)d=z[m++],g<i&&(b=o[g++],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c),f>h&&(b=o[f--],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c)}function C(p,s,q){var h=2147483647,k=h,d=-1,m=d,c,j,e,n,l;for(c=0;c<a;c++)j=o[c],e=Math.abs(j[0]-p)+Math.abs(j[1]-s)+Math.abs(j[2]-q),e<h&&(h=e,d=c),n=e-(t[c]>>i-b),n<k&&(k=n,m=c),l=y[c]>>g,y[c]-=l,t[c]+=l<<f;return y[d]+=x,t[d]-=r,m}function D(){var d,b,e,c,h,g,f=0,i=0;for(d=0;d<a;d++){for(e=o[d],h=d,g=e[1],b=d+1;b<a;b++)c=o[b],c[1]<g&&(h=b,g=c[1]);if(c=o[h],d!=h&&(b=c[0],c[0]=e[0],e[0]=b,b=c[1],c[1]=e[1],e[1]=b,b=c[2],c[2]=e[2],e[2]=b,b=c[3],c[3]=e[3],e[3]=b),g!=f){for(q[f]=i+d>>1,b=f+1;b<g;b++)q[b]=d;f=g,i=d}}for(q[f]=i+n>>1,b=f+1;b<256;b++)q[b]=n}function E(j,i,k){var b,d,c,e=1e3,h=-1,f=q[i],g=f-1;while(f<a||g>=0)f<a&&(d=o[f],c=d[1]-i,c>=e?f=a:(f++,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3])))),g>=0&&(d=o[g],c=i-d[1],c>=e?g=-1:(g--,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3]))));return h}function F(){var c,f=A.length,D=30+(B-1)/3,y=f/(3*B),q=~~(y/w),n=d,o=u,a=o>>h;for(a<=1&&(a=0),c=0;c<a;c++)z[c]=n*((a*a-c*c)*m/(a*a));var i;f<s?(B=1,i=3):f%l!==0?i=3*l:f%k!==0?i=3*k:f%p!==0?i=3*p:i=3*j;var r,t,x,e,g=0;c=0;while(c<y)if(r=(A[g]&255)<<b,t=(A[g+1]&255)<<b,x=(A[g+2]&255)<<b,e=C(r,t,x),K(n,e,r,t,x),a!==0&&L(a,e,r,t,x),g+=i,g>=f&&(g-=f),c++,q===0&&(q=1),c%q===0)for(n-=n/D,o-=o/v,a=o>>h,a<=1&&(a=0),e=0;e<a;e++)z[e]=n*((a*a-e*e)*m/(a*a))}function G(){I(),F(),J(),D()}function H(){var b=[],g=[];for(var c=0;c<a;c++)g[o[c][3]]=c;var d=0;for(var e=0;e<a;e++){var f=g[e];b[d++]=o[f][0],b[d++]=o[f][1],b[d++]=o[f][2]}return b}var o,q,t,y,z;this.buildColormap=G,this.getColormap=H,this.lookupRGB=E}var w=100,a=256,n=a-1,b=4,i=16,e=1<<i,f=10,B=1<<f,g=10,x=e>>g,r=e<<f-g,z=a>>3,h=6,t=1<<h,u=z*t,v=30,o=10,d=1<<o,q=8,m=1<<q,y=o+q,c=1<<y,l=499,k=491,p=487,j=503,s=3*j;A.exports=C}),a('/gif.worker.coffee')}.call(this,this))";
  var url =  URL.createObjectURL(new Blob([script],{type:"text/javascript"}));
  return url;
})();

*/

FrameAnimation.prototype._updateFrame= function() {
      var anim = this.currentAnimation;
      if (anim) {
        if (this.currentFrameIndex >= anim.frames.length) {
          if (anim.next) {
            this.gotoAndPlay(anim.next);
            return ;
          }
          else {
            this.paused = true;
            this.finished = true;
            return ;
          }
        }
      }

      var index = anim.frames[this.currentFrameIndex];
      var frame = this.ss.getFrame(index);
      var target = this.target;

      target.srcRect.x = frame.x;
      target.srcRect.y = frame.y;
      target.srcRect.width = frame.width;
      target.srcRect.height = frame.height;
      // target.width = frame.width;
      // target.height = frame.height;
    };

var SCREEN_WIDTH    = 1280;
var SCREEN_HEIGHT   = 720;

var Group;
var CarGroup;

var ObjectGroup;

var GameMain;

var SPEED = 800;


var ASSETS = {
  image: {
    'Ground': 'img/Ground.png',

    'Player': 'img/Player.png',
    'Car': 'img/car.png',
    'Mikan': 'img/mikan.png',
    'Joushi':'img/Joushi.png',
    'Buka':'img/BukaA.png',
    'Ball':'img/Ball.png',
    'Back':'img/Back.png',
    'Yubi':'img/yubi.png',

    'Logo':'img/logo.png',
    'Retry':'img/Retry.png',
    'Tweet':'img/Tweet.png',
    'OniButton':'img/OniButton.png',


    'Office':'img/office.png',
    'Tukue':'img/tukue.png',
    'Isu':'img/isu.png',
    'Mado':'img/mado.png',
    'Garasu':'img/garasu.png',
    'Gami':'img/gami.png',

    'Title':'img/title.png',


  },
  spritesheet: {
    'BukaSS': 'BukaSS2.ss',
    'JoushiSS': 'JoushiSS.ss',

  },
  sound: {

  },
};

phina.main(function() {
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  app.replaceScene(SceneSequence());
  app.run();
});

// SceneSequenceクラス
phina.define("SceneSequence", {
  superClass: "phina.game.ManagerScene",

  // 初期化
  init: function() {
    this.superInit({
      scenes: [

        {
          label: "Loading", // ラベル。参照用
          className: "LoadingScene", // シーンAのクラス名
          nextLabel:"Title",
        },

        {
          label: "Title", // ラベル。参照用
          className: "TitleScene", // シーンAのクラス名
          nextLabel:"Main",
        },

        {
          label: "Main",
          className: "MainScene",
        },

        {
          label: "Result",
          className: "ResultScene",
        }

      ]
    });
  }
});

phina.define("LoadingScene", {
  superClass: "phina.game.LoadingScene",

  init: function(params) {
    this.superInit({
      assets: ASSETS,
      exitType: "auto",

    });

  }

});


phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#444';



    var back = Sprite('Back',SCREEN_WIDTH,SCREEN_HEIGHT).addChildTo(this);
    back.setPosition(this.gridX.center(),this.gridY.center());



    this.Office = Sprite('Office',SCREEN_WIDTH,SCREEN_HEIGHT).addChildTo(this);
    this.Office.setPosition(this.gridX.center(),this.gridY.center());


    this.garasugroup = DisplayElement().addChildTo(this);


    this.isu = Sprite('Isu',133,225).addChildTo(this);
    this.isu.setPosition(this.gridX.center(6.5),this.gridY.center(2.4));

    this.joushi = Sprite('Joushi',500,500).addChildTo(this);
    this.joushiss = FrameAnimation('JoushiSS');
    this.joushiss.attachTo(this.joushi);
    this.joushiss.gotoAndPlay('PunPun');

    this.joushi.setPosition(this.gridX.center(5.5),this.gridY.center(1));



    this.tukue = Sprite('Tukue',205,165).addChildTo(this);
    this.tukue.setPosition(this.gridX.center(4),this.gridY.center(3));

    this.buka = Sprite('Buka',500,500).addChildTo(this);
    this.bukass = FrameAnimation('BukaSS');
    this.bukass.attachTo(this.buka);
    this.bukass.gotoAndPlay('PekoPeko');
    this.buka.setPosition(this.gridX.center(1),this.gridY.center(1.1));

    this.gami  = Sprite('Gami',140,80).addChildTo(this);
    this.gami.x = 1030;
    this.gami.y = 240;

    this.gami.tweener
      .clear()
      .to({x:1030,y:240,rotation:30,scaleX:1.2,scaleY:1.2}, 250,"easeInSine")
      .to({x:950,y:190,rotation:-20,scaleX:1.6,scaleY:1.6}, 250,"easeOutBounce")
      .setLoop(true);


    this.gami2  = Sprite('Gami',140,80).addChildTo(this);
    this.gami2.x = 1130;
    this.gami2.y = 240;
    this.gami2.tweener
      .clear()
      .to({x:1130,y:240,rotation:-20,scaleX:1.5,scaleY:1.5}, 250,"easeInSine")
      .to({x:1150,y:140,rotation:30,scaleX:2,scaleY:2}, 300,"easeOutBounce")
      .setLoop(true);


    this.mado = Sprite('Mado',66,370).addChildTo(this);
    this.mado.setPosition(this.gridX.center(8),this.gridY.center(-0.7));

    this.titlelogo = Sprite('Title',1200,600).addChildTo(this);
    this.titlelogo.setPosition(this.gridX.center(0),this.gridY.center(-3.3));
    this.titlelogo.scaleX = 0.6;
    this.titlelogo.scaleY = 0.6;

    this.titlelogo.tweener
      .clear()
      .by({y:-10}, 2000)
      .by({y:+10}, 2000)
      .setLoop(true);

      // ラベルを表示
      this.startlabel = Label('タッチではじめる').addChildTo(this);
      this.startlabel.setPosition(this.gridX.center(0),this.gridY.center(6.3));
      this.startlabel.fill = 'brack'; // 色を変更
      this.startlabel.strokeWidth = 8;
      this.startlabel.fontSize = 64; // フォントサイズを変更
      this.startlabel.tweener
        .clear()
        .to({alpha:1,scaleX:1,scaleY:1}, 700,"easeOutSine")
        .wait(400)
        .to({alpha:0,scaleX:0.8,scaleY:0.8}, 700,"easeInSine")
        .setLoop(true);

    this.StartFLG = false;


    this.flg = false;
  },

  update: function(app){
    /*
    var keyboard = app.keyboard;

    // 左右移動
    if (keyboard.getKey('r')) {
      if(!this.flg){
        this.Record();
          this.flg = true;
      }

    }
    */
  },

  Record: function() {
    // レコーダー生成
    var r = CanvasRecorder(this.app.canvas);

    r.setOption({
      workerScript: WORKER_URL,
      quality:512,// 低いほうがハイクオリティ 1~512ぐらい?
      repeat:-1,//リピートしない ,0 = リピートする
    });

    // レコード完了後コールバック
    r.onfinished = function() {
      var button = document.createElement('button');
      button.innerHTML = 'download gif';
      document.body.appendChild(button);
      r.open();

      button.onclick = function() {
        // ファイルを開く
        r.open();
      };
    };

    // 録画開始
    r.start(30, 4000);
  },

  onpointend: function(){

    if(!this.StartFLG){
      this.Start();
      this.StartFLG = true;

      //Debug
      //this.exit();
      //
    }
  },

  Start: function(){


    var phase1 = 20;
    var phase2 = 450;
    var phase3 = 2050;
    var phase4 = 200;
    var phase5 = 500;

    this.oraa = Label('オラアアアアアアアアアアア！！！').addChildTo(this.garasugroup);
    this.oraa.setPosition(this.gridX.center(22),this.gridY.center(-5.3));
    this.oraa.fill = 'brack'; // 色を変更
    this.oraa.fontSize =174; // フォントサイズを変更
    this.oraa.tweener
      .clear()
      .by({x:-3700}, 2000)



    this.titlelogo.remove();
    this.startlabel.remove();

    this.gami.remove();
    this.gami2.remove();

    this.mado.remove();
    this.garasu = Sprite('Garasu',400,400).addChildTo(this.garasugroup);
    this.garasu.scaleX = 1.2;
    this.garasu.scaleY = 1.2;

    this.garasu.setPosition(this.gridX.center(10),this.gridY.center(-0.7));



    var self = this;
    this.bukass.gotoAndPlay('Kick');
    this.buka.tweener
      .clear()
      .by({x:50,y:-70}, phase1)
      .by({x:-250,y:-75}, phase2)
      .by({x:10,y:-20}, phase3)
      .call(function(){
        self.bukass.gotoAndPlay('PekoPeko');
        self.bukass.gotoAndPlay('Normal');
        self.buka.y += 30;
        self.buka.x += 10;

      })
      .by({x:20,y:4}, phase4)
      .by({x:810,y:710}, phase5,"easeInOutQuad")
      .wait(400)
      .call(function(){
        self.exit();
      })



   this.joushiss.gotoAndPlay('Hit');
   this.joushi.tweener
     .clear()
     .by({x:50,y:-50}, phase1)
     .by({x:-420,y:-70,rotation:20}, phase2)
     .by({x:-190,y:70,rotation:40}, phase3)
     .by({x:20,y:10}, phase4)
     .by({x:810,y:710}, phase5,"easeInOutQuad")


   this.tukue.tweener
     .clear()
     .by({x:50,y:-70,rotation:20}, phase1)
     .by({x:-125,y:-130,rotation:20}, phase2 /2)
     .by({x:-120,y:70,rotation:20}, phase2 /2)
     .by({x:250,y:270,rotation:80}, phase3)
     .by({x:20,y:4,rotation:5}, phase4)

     .by({x:250,y:270,rotation:80}, phase5,"easeInOutQuad")

   this.isu.tweener
     .clear()
     .by({x:0,y:-70,rotation:20}, phase1)
     .by({x:0,y:-10,rotation:40}, phase2)
     .by({x:50,y:120,rotation:40}, phase3)
     .by({x:20,y:4,rotation:5}, phase4)
     .by({x:250,y:270,rotation:80}, phase5,"easeInOutQuad")

   this.garasu.tweener
     .clear()
     .by({x:-850,scaleX:0.3,scaleY:0.5,alpha:-0}, phase2)
     .by({x:-300,alpha:-1}, phase3)

   this.Office.tweener
    .clear()
    .by({x:-1000}, phase2)
    .by({x:-300}, phase3)

  },




});

phina.define('ResultScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit();


  },
});

phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#444';

    GameMain = this;
    this.GameSpeed = 30;

    this.RoadAngle = 25;

    var back = Sprite('Back',SCREEN_WIDTH,SCREEN_HEIGHT).addChildTo(this);
    back.setPosition(this.gridX.center(),this.gridY.center());

    //地面のグループ（配列）を作る（まとめて動かすため）.
    this.groundGroup = DisplayElement().addChildTo(this);
    var self = this;
    //地面作りたい.
     for (var i = 0; i < 3; i++) {
      var ground = Sprite('Back',SCREEN_WIDTH,SCREEN_HEIGHT).addChildTo(self.groundGroup);

      ground.y = self.gridY.center();
      ground.left =  SCREEN_WIDTH * i;//横座標
    }
    //地面
    this.groundwork = Sprite('Ground',SCREEN_WIDTH,SCREEN_HEIGHT).addChildTo(this);
    this.groundwork.setPosition(this.gridX.center(),this.gridY.center());

    this.borderGroup = DisplayElement().addChildTo(this);
    Group = DisplayElement().addChildTo(this);
    ObjectGroup = DisplayElement().addChildTo(this);

    this.player = Player().addChildTo(this);

    var flickable = Flickable().attachTo(this);
    // 横のみ許可
    flickable.horizontal = false;
    flickable.vertical = false;
    var self = this;
    flickable.onflickstart = function(e) {

      if(!self.FlickFLG){

      }
      else{
        // キャンセル
        this.cancel();

        var angle = e.direction.toAngle().toDegree()|0;
        var a = 135;
        var b = 45;
        var c = 225;
        var d = 315;

        //下
        if (80 < angle && angle < 100) {
        //  self.onenter();
        }
        //上
        if (215 < angle && angle < 325) {
          self.player.Jump();

        }
        //左
        if (100 < angle && angle < 215) {

          if(self.player.MoveMode !== "Guard" && self.player.MoveMode !== "Kick"){
            self.player.Guard();
          }
        }
        //右
        if (0 <= angle && angle < 80  || 325 < angle && angle <=360) {
          if(self.player.MoveMode !== "Guard" && self.player.MoveMode !== "Kick"){
            self.player.Kick();
          }
        }
      }
      // 角度を表示
      console.log();

    };


    this.objecttimer=0;
    this.timer = 0;
    this.carttimer=0;
    this.balltimer=0;

    this.GameOverFLG = false;
    this.FlickFLG = false;
    this.GameMode = "Start";
    this.TutorialCount = 0;
    //this.NextWave();


    // ラベルを表示

    this.Score = 0;
    this.ScoreText = Label('0 M').addChildTo(this);
    this.ScoreText.setPosition(230,800);
    this.ScoreText.fill = 'white'; // 色を変更
    this.ScoreText.fontSize = 80; // フォントサイズを変更


    this.StartText = Label('START!!').addChildTo(this);
    this.StartText.scaleX = 0;
    this.StartText.scaleY = 0;
    this.StartText.setPosition(SCREEN_WIDTH /2,SCREEN_HEIGHT/2);
    this.StartText.fill = 'white'; // 色を変更
    this.StartText.fontSize = 64; // フォントサイズを変更
    this.StartText.tweener
      .clear()
      .wait(2500)
      .to({scaleX:2.5,scaleY:2.5}, 800,"easeOutSine")
      .call(function(){

        self.FlickFLG = true;
      })
      .wait(500)
      .call(function(){
       self.GameMode = "Tutorial";
       //Debug
       /*
       self.GameMode = "Run";
       self.NextWave();
*/
       //

        self.FlickFLG = true;
        self.ScoreText.tweener
          .clear()
          .to({y:600}, 500,"easeOutSine")

        self.StartText.remove();
      });

      this.MinLevel = 1;
      this.MaxLevel = 5;


      //Debug
      /*
      var level = 9;
      this.MinLevel = 45;
      this.MaxLevel = 50;
*/

      //

  },




  TutorialWave:function(){

    this.waves = WAVEDATA.waves[0];
    this.wavecount = 0;
    this.nexttime = this.waves.wave[this.wavecount].next;
    this.obj = this.waves.wave[this.wavecount].obj;
    this.objtimer = 0;

    this.CreateObj();


  },


  LevelCheck:function(){

    if(this.Score > 1000){
      this.MaxLevel = 1;
      this.MinLevel = 10;

    }
    if(this.Score > 1500){
      this.MinLevel = 1;
      this.MaxLevel = 16;

    }
    if(this.Score > 2000){
      this.MinLevel = 5;
      this.MaxLevel = 23;
    }
    if(this.Score > 2500){
      this.MinLevel = 10;
      this.MaxLevel = 25;
    }
    if(this.Score > 3000){
      this.MaxLevel = 14;
      this.MaxLevel = 30;
    }
    if(this.Score > 3500){
      this.MinLevel = 15;
      this.MaxLevel = 33;
    }
    if(this.Score > 4000){
      this.MinLevel = 15;
      this.MaxLevel = 36;
    }
    if(this.Score > 4500){
      this.MinLevel = 17;
      this.MaxLevel = 38;
    }
    if(this.Score > 5000){
      this.MinLevel = 18;
      this.MaxLevel = 40;
    }
    if(this.Score > 5500){
      this.MinLevel = 20;
      this.MaxLevel = 41;
    }
    if(this.Score > 6000){
      this.MinLevel = 23;
      this.MaxLevel = 42;
    }
    if(this.Score > 6500){
      this.MinLevel = 25;
      this.MaxLevel = 43;
    }
    if(this.Score > 7000){
      this.MinLevel = 27;
      this.MaxLevel = 45;
    }
    if(this.Score > 7500){
      this.MinLevel = 30;
      this.MaxLevel = 46;
    }
    if(this.Score > 8000){
      this.MinLevel = 33;
      this.MaxLevel = 47;
    }
    if(this.Score > 8500){
      this.MinLevel = 36;
      this.MaxLevel = 48;
    }
    if(this.Score > 9000){
      this.MinLevel = 38;
      this.MaxLevel = 49;
    }
    if(this.Score > 9500){
      this.MinLevel = 40;
      this.MaxLevel = 50;
    }


  },

  TutorialWave:function(){

    this.waves = WAVEDATA.waves[0];
    this.wavecount = 0;
    this.nexttime = this.waves.wave[this.wavecount].next;
    this.obj = this.waves.wave[this.wavecount].obj;
    this.objtimer = 0;

    this.CreateObj();


  },

  NextWave: function(){



    var rand = Math.floor( ( Math.random() * (  (this.MaxLevel + 1) -  this.MinLevel ) ) + this.MinLevel );

    this.waves = WAVEDATA.waves[rand];
    this.wavecount = 0;
    this.nexttime = this.waves.wave[this.wavecount].next;
    this.obj = this.waves.wave[this.wavecount].obj;
    this.objtimer = 0;

    this.CreateObj();


  },

  NextObj: function(){
    this.wavecount++;
    this.nexttime = this.waves.wave[this.wavecount].next;
    this.objtimer = 0;
    this.obj = this.waves.wave[this.wavecount].obj;

    this.CreateObj();

  },

  CreateObj: function(){
    switch (this.obj) {
      case "Car":
        var car = Car().addChildTo(ObjectGroup);

        break;
      case "Mikan":
        var mikan = Mikan().addChildTo(ObjectGroup);

        break;

      case "Ball":
        var ball = Ball().addChildTo(ObjectGroup);

        break;

      case "HighBall":
        var highball = HighBall().addChildTo(ObjectGroup);

        break;

      default:
    }

  },

  Record: function() {
    // レコーダー生成
    var r = CanvasRecorder(this.app.canvas);

    r.setOption({
      workerScript: WORKER_URL,
      quality:512,// 低いほうがハイクオリティ 1~512ぐらい?
      repeat:-1,//リピートしない ,0 = リピートする
    });

    // レコード完了後コールバック
    r.onfinished = function() {
      var button = document.createElement('button');
      button.innerHTML = 'download gif';
      document.body.appendChild(button);

      button.onclick = function() {
        // ファイルを開く
        r.open();
      };
    };

    // 録画開始
    r.start(30, 2000);
  },

  update: function(app){


    this.LevelCheck();
    this.ScoreText.text = this.Score + " M";

    //地面動かす(ちょっと長いので注意).
    this.groundGroup.children.some(function(ground){
      //地面を左上に動かす.
      ground.x -= 5;
        //左上に消えたら右下へ.
      if(ground.left <= -ground.width){
          ground.left = SCREEN_WIDTH;
      }
    });

    this.timer++;

    if(this.timer > 20){
      var border = Border().addChildTo(this.borderGroup);
      this.timer = 0;
    }


    switch (this.GameMode) {
      case "GameOver":


        break;
      case "Start":


        break;
      case "Run":
        this.Score++;

        if(this.objtimer > this.nexttime){
          if(this.obj === "End"){
            this.NextWave();
          }
          else{
            this.NextObj();
          }
        }
        this.objtimer++;

        break;

      case "Tutorial":
        this.TutorialWave();
        this.GameMode = "TutorialRun";
        this.TutorialCount = 0;

        // ラベルを表示
        this.HintText = Label('').addChildTo(this);
        this.HintText.setPosition(this.gridX.center(2),this.gridY.center(-5));
        this.HintText.fill = 'brack'; // 色を変更
        this.HintText.fontSize = 84; // フォントサイズを変更
        this.HintText.tweener
          .clear()
          .to({alpha:1}, 300,"easeOutSine")
          .wait(200)
          .to({alpha:0}, 300,"easeInSine")
          .setLoop(true);


        this.yubi = Sprite('Yubi',200,157).addChildTo(this);
        this.yubi.setPosition(720,500);
        this.yubi.rotation = -95;
        this.yubi.alpha = 0;
        var Hint

        break;

      case "TutorialRun":
      this.Score++;

        if(this.objtimer > this.nexttime){

          if(this.obj === "End"){
            this.GameMode = "Run";
            this.NextWave();

            this.yubi.remove();
            this.HintText.remove();
          }
          else{
            this.NextObj();
          }
        }
        this.objtimer++;


        if(this.objtimer == 50){
          this.TutorialCount++;

          switch (this.TutorialCount) {
            case 1:
              this.HintText.text = "上フリックでジャンプ";
              this.yubi.alpha = 1;
              this.yubi.rotation =-125;
              this.yubi.setPosition(220,600);

              var self = this;
              this.yubi.tweener
                .clear()
                .by({y:-200,x:30,rotation:55}, 500,"easeOutSine")
                .wait(100)
                .to({alpha:0}, 300,"easeInSine")
                .call(function(){
                  self.yubi.alpha = 1;
                  self.yubi.rotation =-125;

                  self.yubi.setPosition(220,600);

                })
                .setLoop(true);



              break;
            case 2:
            this.HintText.text = "右フリックでキック";
            this.yubi.setPosition(220,600);
            this.yubi.rotation =-125;
            var self = this;
            this.yubi.tweener
              .clear()
              .by({y:30,x:300,rotation:85}, 500,"easeOutSine")
              .wait(100)
              .to({alpha:0}, 300,"easeInSine")
              .call(function(){
                self.yubi.alpha = 1;
                self.yubi.rotation =-125;

                self.yubi.setPosition(220,600);

              })
              .setLoop(true);
              break;
            case 3:
            this.HintText.text = "左フリックでブロック";

            this.yubi.setPosition(420,600);

            this.yubi.rotation =-70;
            var self = this;
            this.yubi.tweener
              .clear()
              .by({y:30,x:-300,rotation:-65}, 500,"easeOutSine")
              .wait(100)
              .to({alpha:0}, 300,"easeInSine")
              .call(function(){
                self.yubi.alpha = 1;
                self.yubi.rotation =-70;

                self.yubi.setPosition(420,600);

              })
              .setLoop(true);


              break;

            default:

          }

        }



        break;



    }






  },

  WaveManager: function(){


  },

  GameOver: function(){
    this.FlickFLG = false;

    if(this.GameMode === "TutorialRun"){
      this.HintText.remove();
      this.yubi.remove();
    }
    this.GameMode = "GameOver";

    this.ScoreText.tweener
    .clear()
    .wait(500)
    .to({y:200,x:SCREEN_WIDTH /2,scaleX:2,scaleY:2}, 500,"easeOutSine")

    var result = Result().addChildTo(this);


  },

  Retry: function(){
    this.exit("Main");
  }


});





phina.define("Result", {
    superClass: "DisplayElement",
    init: function() {
      this.superInit({
        width: 0,
        height: 0,
      });

      this.x = 0;
      this.y = 0;



      var tweet = Sprite('Tweet',200,70).addChildTo(this);

      var url = "http://cachacacha.com/GAME/JoushiSuberi/";
      var score = 0;
      this.ResultTxt = "";

      var Tweettxt = encodeURIComponent("Score " + GameMain.Score + "M" + this.ResultTxt + " " + url + "  #上司すべり #かちゃコム");

      tweet.x = 500;
      tweet.y = -100;
      tweet.tweener
      .clear()
      .wait(1000)
      .to({y:400}, 1300,"easeOutQuart");
      // タッチ判定を有効に
      tweet.setInteractive(true);
      // タッチ終了時に発火
      tweet.onclick = function() {
        // 自身を削除
        window.open("http://twitter.com/intent/tweet?text=" + Tweettxt);
      };





      var retry = Sprite('Retry',200,70).addChildTo(this);
      retry.x = 760;
      retry.y = -100;
      retry.tweener
      .clear()
      .wait(1100)
      .to({y:400}, 1300,"easeOutQuart");
      // タッチ判定を有効に
      retry.setInteractive(true);
      // タッチ終了時に発火
      retry.onclick = function() {
        // 自身を削除
        GameMain.Retry();

      };

      if(GameMain.Score >= 4000){
        var OniButton = Sprite('OniButton',360,135).addChildTo(this);
        OniButton.x = SCREEN_WIDTH +OniButton.width;
        OniButton.y = SCREEN_HEIGHT - 120;
        OniButton.tweener
        .clear()
        .wait(1700)
        .to({x:SCREEN_WIDTH / 2}, 1300,"easeOutQuart");
        // タッチ判定を有効に
        OniButton.setInteractive(true);
        // タッチ終了時に発火
        OniButton.onclick = function() {
          // 自身を削除
          window.open("http://cachacacha.com/GAME/JoushiSuberiOni/");
        };
      }



      var logo = Sprite('Logo',240,90).addChildTo(this);
      logo.x = SCREEN_WIDTH + logo.width;
      logo.y = SCREEN_HEIGHT - logo.height;
      logo.tweener
      .clear()
      .wait(1700)
      .by({x:-360}, 1300,"easeOutQuart");
      // タッチ判定を有効に
      logo.setInteractive(true);
      // タッチ終了時に発火
      logo.onclick = function() {
        // 自身を削除
        window.open("http://www.cachacacha.com/");
      };



    },

    update: function(app) {


    },


});



//キックの当たり判定----------------------------------------------------------------
phina.define("Player", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 80,
        height: 120,
        fill: "green",
        stroke: null,

      });


        this.floor = 340;



        this.v = phina.geom.Vector2(0, 0);

        this.x = -50;
        this.y = -300;




        this.mx = X;
        this.my = Y;


        this.joushi = Sprite('Joushi',200,200).addChildTo(this);
        this.joushiss = FrameAnimation('JoushiSS');
        this.joushiss.attachTo(this.joushi);
        this.joushiss.gotoAndPlay('Normal');


        this.joushi.rotation = -3;

        this.joushi.tweener
          .clear()
          .to({y:3,x:0},50)
          .to({y:0,x:0},50)
          .setLoop(true);

        this.buka = Sprite('Buka',200,200).addChildTo(this);
        this.bukass = FrameAnimation('BukaSS');
        this.bukass.attachTo(this.buka);
        this.bukass.gotoAndPlay('Normal');



        this.scaleX = 1;
        this.scaleY = 1;


        this.tweener
          .clear()
          .to({x:200,y:this.floor}, 500)
          .by({x:260,y:190,scaleX:0.6,scaleY:0.6}, 800,"easeOutQuad")
          .to({x:350,y:this.floor,scaleX:1,scaleY:1}, 800,"easeInSine");



        this.setBoundingType("rect");

        this.color = "hsla(133, 100%, 50%, 1)";

        this.ColisionFLG = false;


        this.gravity = 5;
        this.jumppower = 44;

        this.MoveMode = "Normal";
        this.JumpFLG = false;

        //コリジョン可視化
        this.colision = RectangleShape().addChildTo(this);
        this.colision.width = this.width;
        this.colision.height = this.height;
        this.colision.alpha = 0;

        this.kickcolision = KickColision(this.x,this.y).addChildTo(Group);


        this.HitFLG = false;



    },

    update: function(app) {
      this.colision.width = this.width;
      this.colision.height = this.height;


      if(!this.HitFLG){
        this.HitCheck();
      }


      if(this.JumpFLG){
        this.Air();
      }


      switch (this.MoveMode) {
        case "Normal":

          break;

        case "Air":

          //this.Air();

          break;


        default:

      }

    //	this.x = this.mx + GameMain.Player.x;
    //	this.y = this.my + GameMain.Player.y;

    },

    Kick: function(){
      this.kickcolision.ReleaseColision();
      this.MoveMode ="Kick";
      this.bukass.gotoAndPlay('Kick');
      this.kickcolision.SetColision(this.x);

      var self = this;
      this.buka.tweener
        .clear()
        .to({x:20}, 50,"easeOutBounce")
        .wait(150)
        .to({x:0,y:0}, 50,"easeInSine")
        .call(function(){
          self.SetNormal();
        });

    },

    Guard: function(){
      this.kickcolision.ReleaseColision();
      this.bukass.gotoAndPlay('Guard');
      this.joushiss.gotoAndPlay('Guard');
      this.MoveMode = "Guard";

      var self = this;
      this.buka.tweener
        .clear()
        .to({x:-20}, 50,"easeOutBounce")
        .wait(150)
        .to({x:0,y:0}, 50,"easeInSine")
        .call(function(){
          self.SetNormal();

        });





    },


    Jump: function(){



      if(this.JumpFLG == false){

        this.kickcolision.ReleaseColision();
        this.buka.tweener.clear();
        this.bukass.gotoAndPlay('Jump');
        this.joushiss.gotoAndPlay('Jump');

        this.vy = -this.jumppower;
        this.MoveMode = "Air";
        this.JumpFLG = true;
      }
    },



    //空中
    Air: function(){
      this.y += this.vy;
      this.vy+= this.gravity;

      if(this.y > this.floor){
        this.y = this.floor;
        this.JumpFLG = false;


        if(this.MoveMode === "Air"){
          this.MoveMode = "Normal";
          this.bukass.gotoAndPlay('Normal');
          this.joushiss.gotoAndPlay('Normal');

        }



      }
    },


    HitCheck: function(){
      //ブロックとの当たり判定
      var og = ObjectGroup.children;
      var self = this;
      og.each(function(Object) {
        //  if(clash(self,block)){
          if(self.hitTestElement(Object)){

            switch (Object.tag) {
              case "Car":
                self.Hit();

                break;


              case "Ball":

                if(self.MoveMode === "Guard"){
                  Object.Hit();

                }
                else{
                  self.Hit();

                }


                break;

              case "Mikan":

                if(self.MoveMode === "Attack"){

                }
                else{
                  self.Hit();
                }


                break;

            }

          }

      });

    },

    SetNormal: function(){
      this.MoveMode = "Normal";
      this.bukass.gotoAndPlay('Normal');
      this.joushiss.gotoAndPlay('Normal');
      this.kickcolision.ReleaseColision();

    },

    Hit: function(){

      GameMain.GameOver();


      this.kickcolision.ReleaseColision();

      this.HitFLG = true;

      this.MoveMode = "Hit";

      this.bukass.gotoAndPlay('Hit');
      this.joushiss.gotoAndPlay('Normal');

      this.buka.tweener
        .clear()
        .by({x:-100,y:-150}, 600,"easeOutBack")
        .by({y:800,rotation:-180}, 600, "easeInCubic")


      this.joushi.tweener
        .clear()
        .by({x:1000,y:550}, 1800 ,"easeInBack")

    }

});

phina.define('KickColision', {
  superClass: 'RectangleShape',

  init: function(x,y) {
    this.superInit({
      width: 70,
      height: SCREEN_HEIGHT,
      fill: "green",
      stroke: null,

    });
    this.y = SCREEN_HEIGHT / 2;
    this.alpha  = 0;
    this.x = x + 80;
    this.myy = 0;


    this.ColisionFLG = false;



  },

  SetColision: function(x){
    this.x = x + 80;
    this.ColisionFLG = true;
    this.alpha  = 0;

  },

  ReleaseColision:function(){
    this.ColisionFLG = false;

    this.alpha  = 0;

  },


  update: function(app){

    if(this.ColisionFLG){
      this.HitCheck();
    }
  },

  HitCheck: function(){
    //ブロックとの当たり判定
    var og = ObjectGroup.children;
    var self = this;
    og.each(function(Object) {
      //  if(clash(self,block)){
        if(self.hitTestElement(Object)){

          switch (Object.tag) {

            case "Mikan":
              Object.Hit();



              break;

          }

        }

    });

  },
});


phina.define("Ball", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 48,
        height: 48,
        fill: "green",
        stroke: null,

      });

      this.tag = "Ball";

      this.sprite = Sprite('Ball',50,50).addChildTo(this);
      this.sprite.rotation = GameMain.RoadAngle;


      this.setBoundingType("rect");

      this.color = "hsla(133, 100%, 50%, 1)";

      this.ColisionFLG = false;

      this.alpha = 1;

      this.x  = SCREEN_WIDTH + this.width;
      this.y = 20;

      var colision = RectangleShape().addChildTo(this);
      colision.width = this.width;
      colision.height = this.height;
      colision.alpha = 0;

      this.Power = GameMain.GameSpeed ;
      var rot = GameMain.RoadAngle;

      this.vx = Math.cos(rot * Math.PI / 180) * this.Power;
      this.vx *= -1;
    	this.vy = Math.sin(rot * Math.PI / 180) * this.Power;

    },

    update: function(app) {

      if(this.tag === "Ball"){
        this.Move(app);
      }

      this.sprite.rotation += 10;

      if(this.x < -this.width){
        this.remove();
      }

    },

    Move: function(app){


      if(this.y > 420){

        var rot = -65;
        this.vx = Math.cos(rot * Math.PI / 180) * this.Power;
        this.vx *= -1;
        this.vy = Math.sin(rot * Math.PI / 180) * this.Power;
      }

      this.x += this.vx;
      this.y += this.vy;




    },

    Hit: function(){
      this.tag === "Hit";
      var self = this;
      this.tweener
        .clear()
        .by({x:1200,y:-800}, 700)
        .call(function(){
          self.remove();
        });

    }

});

phina.define("HighBall", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 48,
        height: 48,
        fill: "green",
        stroke: null,

      });

      this.tag = "Ball";

      this.sprite = Sprite('Ball',50,50).addChildTo(this);
      this.sprite.rotation = GameMain.RoadAngle;


      this.setBoundingType("rect");

      this.color = "hsla(133, 100%, 50%, 1)";

      this.ColisionFLG = false;

      this.alpha = 1;

      this.x  = SCREEN_WIDTH + this.width;
      this.y = 140;

      var colision = RectangleShape().addChildTo(this);
      colision.width = this.width;
      colision.height = this.height;
      colision.alpha = 0;

      this.Power = GameMain.GameSpeed ;
      var rot = 0;

      this.vx = Math.cos(rot * Math.PI / 180) * this.Power;
      this.vx *= -1;
    	this.vy = Math.sin(rot * Math.PI / 180) * this.Power;

    },

    update: function(app) {

      if(this.tag === "Ball"){
        this.Move(app);
      }

      this.sprite.rotation += 10;

      if(this.x < -this.width){
        this.remove();
      }

    },

    Move: function(app){


      if(this.y > 420){

        var rot = -65;
        this.vx = Math.cos(rot * Math.PI / 180) * this.Power;
        this.vx *= -1;
        this.vy = Math.sin(rot * Math.PI / 180) * this.Power;
      }

      this.x += this.vx;
      this.y += this.vy;




    },

    Hit: function(){
      this.tag === "Hit";
      var self = this;
      this.tweener
        .clear()
        .by({x:1200,y:-800}, 700)
        .call(function(){
          self.remove();
        });

    }

});



phina.define("Car", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 100,
        height: 100,
        fill: "green",
        stroke: null,

      });

      this.tag = "Car";

      this.sprite = Sprite('Car',190,190).addChildTo(this);
      this.sprite.rotation = GameMain.RoadAngle;
      this.sprite.x = -10;
      this.sprite.y = -10;

      this.setBoundingType("rect");

      this.color = "hsla(133, 100%, 50%, 1)";

      this.ColisionFLG = false;

      this.alpha = 1;

      this.x  = SCREEN_WIDTH + this.width;
      this.y = 810;

      var colision = RectangleShape().addChildTo(this);
      colision.width = this.width;
      colision.height = this.height;
      colision.alpha = 0;


      var Power = GameMain.GameSpeed;
      var rot = GameMain.RoadAngle;

      this.vx = Math.cos(rot * Math.PI / 180) * Power;
      this.vx *= -1;
    	this.vy = Math.sin(rot * Math.PI / 180) * Power;
      this.vy *= -1;


    },

    update: function(app) {


      this.x += this.vx;
      this.y += this.vy;

/*
      this.x -= this.mySpeed * app.deltaTime / 1000;
      this.y -= this.mySpeed * app.deltaTime / 2200;
*/
      if(this.x < -this.width){
        this.remove();
      }
    },


});


phina.define("Mikan", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 100,
        height: 360,
        fill: "green",
        stroke: null,

      });

      this.tag = "Mikan";




      this.mikan0 = Sprite('Mikan',90,90).addChildTo(this);
      this.mikan0.y= 130;

      this.mikan1 = Sprite('Mikan',90,90).addChildTo(this);
      this.mikan1.y= 65;

      this.mikan2 = Sprite('Mikan',90,90).addChildTo(this);



      this.mikan3 = Sprite('Mikan',90,90).addChildTo(this);
      this.mikan3.y = -65;

      this.mikan4 = Sprite('Mikan',90,90).addChildTo(this);
      this.mikan4.y = -130;



      this.setBoundingType("rect");

      this.color = "hsla(133, 100%, 50%, 1)";

      this.ColisionFLG = false;

      this.alpha = 1;

      this.x  = SCREEN_WIDTH + this.width;
      this.y = 720;


      //コリジョン可視化

      var colision = RectangleShape().addChildTo(this);
      colision.width = this.width;
      colision.height = this.height;
      colision.alpha = 0;



      var Power = GameMain.GameSpeed;
      var rot = GameMain.RoadAngle;

      this.vx = Math.cos(rot * Math.PI / 180) * Power;
      this.vx *= -1;
    	this.vy = Math.sin(rot * Math.PI / 180) * Power;
      this.vy *= -1;

      this.DestroyTimer = 0;

    },

    update: function(app) {

      if(this.tag == "Mikan"){
        this.Move(app);
      }

      if(this.x < -this.width){
        this.remove();
      }

      if(this.tag === "Hit"){
        this.DestroyTimer++;
        if(this.DestroyTimer>50){
          this.remove();
        }
      }
    },

    Move: function(app){
      this.x += this.vx;
      this.y += this.vy;


    },

    Hit: function(){
      this.tag = "Hit";
      self = this;

      this.mikan0.tweener
        .clear()
        .to({x:300,y:100,rotation:180,alpha:0}, 800,"easeOutCirc");

      this.mikan1.tweener
        .clear()
        .to({x:400,y:300,rotation:230,alpha:0}, 800,"easeOutCirc");

      this.mikan2.tweener
        .clear()
        .to({x:500,y:-50,rotation:180,alpha:0}, 800,"easeOutCirc");

      this.mikan3.tweener
        .clear()
        .to({x:400,y:-100,rotation:280,alpha:0}, 800,"easeOutCirc");

      this.mikan4.tweener
        .clear()
        .to({x:350,y:-200,rotation:120,alpha:0}, 800,"easeOutCirc")





    },

});



phina.define('Border', {
  superClass: 'RectangleShape',

  init: function(y) {
    this.superInit({
      width: 160,
      height: 15,
      fill: "white",
      stroke: null,

    });

    this.x  = SCREEN_WIDTH + this.width;
    this.y = SCREEN_HEIGHT + 130;

    this.y+=80;

    this.rotation = 25;


    var Power = GameMain.GameSpeed;
    var rot = GameMain.RoadAngle;

    this.vx = Math.cos(rot * Math.PI / 180) * Power;
    this.vx *= -1;
    this.vy = Math.sin((rot - 0.5) * Math.PI / 180) * Power;
    this.vy *= -1;


  },

  update: function(app){

    this.x += this.vx;
    this.y += this.vy;

    if(this.x < -this.width){
      this.remove();
    }

  },
});
