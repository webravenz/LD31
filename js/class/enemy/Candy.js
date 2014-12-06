
LD.Candy = function() {
    
    LD.Enemy.call(this, [PIXI.Texture.fromImage('img/candy'+LD.Utils.randomBetween(1, 6)+'.png')]);
    
    this.animationSpeed = 0.2;
    this.poolName = 'candy';
    this.hitOffset = {x: 0, y: 140};
};

LD.Candy.constructor = LD.Candy;
LD.Candy.prototype = Object.create( LD.Enemy.prototype );

LD.Candy.prototype.alloc = function(shadow) {
    this.position.x = shadow.position.x;
    this.position.y = shadow.position.y - 900;
    this.life = 1;
    this.speedX = 0;
    this.speedY = 0;
    this.fallen = false;

    LD.Enemy.prototype.alloc.call(this);
    
    this.waitTime = 40;
    this.hitArea = false;
    
};

LD.Candy.prototype.updateTransform = function() {
  

  if(this.active) {
    this.waitTime--;
    if(this.waitTime <= -89) {
      this.speedY = 0;
      this.alpha -= 0.05;
      
      if(this.alpha < 0.2) {
        if(!this.fallen) {
          this.fallen = true;
          this.hitArea = new LD.Rectangle(this.position.x, this.position.y, 210, 70);
          LD.Sounds.play('candyfall');
        }
      } else {
        this.hitArea = false;
      }
      
      if(this.alpha <= 0) {
        this.alpha = 0;
        this.canRealloc();
      }
    } else if(this.waitTime <= 0) {
      this.speedY += 0.2;
    }
  }

  LD.Enemy.prototype.updateTransform.call( this );
};