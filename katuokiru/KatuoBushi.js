
// FireworksEmitterを定義する
phina.define('FireworksEmitter', {
    superClass: 'ProtonEmitter',
    init: function() {
      this.superInit({
          
        rate: new Proton.Rate(Proton.getSpan(10, 30)),
        initialize: [
          new Proton.Body("img/katuobushi.png"),
          new Proton.Mass(1),
          new Proton.Life(2, 3),
        ],
        behaviour: [
          new Proton.Gravity(31),
          new Proton.Scale(new Proton.Span(0.8, 2), 0.3),
          new Proton.Alpha(1, 0),
          new Proton.Rotate(0, Proton.getSpan(-8, 9), 'add')
          
        ]
      });
  
      // 使用する色のリスト
      this.colors = [
        '1abc9c', '2ecc71', '3498db', '9b59b6',
        'f1c40f', 'e67e22', 'e74c3c'
      ];
  
      // velocityとcolorをエミッターに追加する
      this.velocity = new Proton.Velocity();
      this.color = new Proton.Color();
      this.addInitialize(this.velocity);
  
      // tweenerを利用して一定のタイミングで_emit()を呼ぶ


    },
  
    _emit: function(x,y) {
      // 放射速度を変える
     // this.velocity.reset(Math.random()+3.5, Proton.getSpan(0, 360), 'p');
      this.velocity.reset(new Proton.Span(12, 32), new Proton.Span(0, 21, true), 'polar');

      
      // 色を変える
      this.color.reset(this.colors.pickup());
      // 位置を変える
      this.setPosition(x, y);
      // 放射する間隔に関係なく、一度だけ放射する
      this.emit('once');
    }
  });