
LD.Bullet = function() {
    
    PIXI.Sprite.call( this, PIXI.Texture.fromImage('img/bullet.png') );
    
    //this.anchor.x = this.anchor.y = 0.5;
    
    this.visible = false;
    
    this.damage = 1;
};

LD.Bullet.constructor = LD.Bullet;
// Bullet object extend PIXI Sprite object
LD.Bullet.prototype = Object.create( PIXI.Sprite.prototype );

LD.Bullet.prototype.alloc = function() {
    this.speedX = LD.Utils.randomBetween(10, 12);
    this.speedY = LD.Utils.randomBetween(-0.5, 0.5);
    this.visible = true;
};
LD.Bullet.prototype.canRealloc = function() {
    this.visible = false;
    this.parent.pool.add(this);
};
LD.Bullet.prototype.updateTransform = function() {
    if(this.visible)  {
        this.position.x += this.speedX;
        this.position.y += this.speedY;
        
        if(this.position.x > LD.Config.width) {
            this.canRealloc();
        }
    }
    PIXI.Sprite.prototype.updateTransform.call( this );
};