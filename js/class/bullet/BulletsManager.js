LD.BulletsManager = function() {
    PIXI.DisplayObjectContainer.call( this );
    
    this.bSpeed = 12;
    this.bSpeed2 = 8;
    
    var totalBullets = 40;
    this.bullets = [];
    var tmpBullets = [];
    while(totalBullets--) {
        var b = new LD.Bullet();
        this.addChild(b);
        this.bullets.push(b);
        tmpBullets.push(b);
    }
    this.pool = new LD.Pool(tmpBullets);
}

LD.BulletsManager.constructor = LD.BulletsManager;
LD.BulletsManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

LD.BulletsManager.prototype.shoot = function(x, y, direction) {
    var scope = this;
    
    this.pool.act(function(b, pool) {
        b.alloc();
        
        switch(direction) {
          case 0:
            y -= 30;
            b.rotation = -Math.PI / 2;
            b.speedX = 0;
            b.speedY = -scope.bSpeed;
            break;
          case 1:
            y -= 25;
            x += 25;
            b.rotation = -Math.PI / 4;
            b.speedX = scope.bSpeed2;
            b.speedY = -scope.bSpeed2;
            break;
          case 2:
            x += 35;
            b.rotation = 0;
            b.speedX = scope.bSpeed;
            b.speedY = 0;
            break;
          case 3:
            y += 25;
            x += 25;
            b.rotation = Math.PI / 4;
            b.speedX = scope.bSpeed2;
            b.speedY = scope.bSpeed2;
            break;
          case 4:
            y += 35;
            b.rotation = Math.PI / 2;
            b.speedX = 0;
            b.speedY = scope.bSpeed;
            break;
          case 5:
            y += 25;
            x -= 25;
            b.rotation = (Math.PI * 3) / 4;
            b.speedX = -scope.bSpeed2;
            b.speedY = scope.bSpeed2;
            break;
          case 6:
            x -= 35;
            b.rotation = Math.PI;
            b.speedX = -scope.bSpeed;
            b.speedY = 0;
            break;
          case 7:
            y -= 25;
            x -= 25;
            b.rotation = -(Math.PI * 3) / 4;
            b.speedX = -scope.bSpeed2;
            b.speedY = -scope.bSpeed2;
            break;
        }
        
        b.position.x = x;
        b.position.y = y;
        
        LD.Sounds.play('bullet');
    });
};


LD.BulletsManager.prototype.removeAll = function() {
  for(var i = 0; i < this.bullets.length; i++) {
    if(this.bullets[i].visible) this.bullets[i].canRealloc();
  }
};