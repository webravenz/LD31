
LD.CandyShadow = function() {
    
    LD.Enemy.call(this, [PIXI.Texture.fromImage('img/candy-shadow.png')]);
    
    this.animationSpeed = 0.2;
    this.poolName = 'candyShadow';
};

LD.CandyShadow.constructor = LD.CandyShadow;
LD.CandyShadow.prototype = Object.create( LD.Enemy.prototype );

LD.CandyShadow.prototype.alloc = function(playerPos) {
  if(Math.random() > 0.7) {
    // place according to player position
    this.position.x = LD.Utils.randomBetween(playerPos.x - 150, playerPos.x + 150) + 90;
    this.position.y = LD.Utils.randomBetween(playerPos.y - 100, playerPos.y + 100) + 140;
    this.position.x = LD.Utils.boundary(this.position.x, this.width / 2, LD.Config.width * 0.6);
    this.position.y = LD.Utils.boundary(this.position.y, this.height / 2 + 50, LD.Config.height - this.height);
  } else {
    // place anywhere
    this.position.x = LD.Utils.randomBetween(this.width / 2, LD.Config.width * 0.6);
    this.position.y = LD.Utils.randomBetween(this.height / 2 + 50, LD.Config.height - this.height);
  }
  this.life = 1;
  this.speedX = 0;
  this.speedY = 0;

  LD.Enemy.prototype.alloc.call(this);
  
  this.alpha = 0.01;
  this.scale.x = this.scale.y = 0.01;
  this.coming = true;

};

LD.CandyShadow.prototype.updateTransform = function() {

    if(this.active) {
        if(this.coming) {
          this.alpha += 0.008;
          this.scale.x = this.scale.y = this.alpha;
          if(this.alpha >= 1) {
            this.alpha = 1;
            this.coming = false;
          }
        } else {
          this.alpha -= 0.05;
          if(this.alpha <= 0) {
            this.alpha = 0;
            this.canRealloc();
          }
        }
    }

    LD.Enemy.prototype.updateTransform.call( this );
};